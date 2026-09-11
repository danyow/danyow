/** Gmail -> GitHub -> deployed receipt -> Gmail/pushplus. No model/API billing here. */
'use strict';
var STATE_PREFIX = 'STATE_';
function bridgeConfig_() {
  return DailyCore.config(PropertiesService.getScriptProperties().getProperties(), Session.getEffectiveUser().getEmail());
}
function stateKey_(id) { return STATE_PREFIX + id; }
function storeState_(s) { PropertiesService.getScriptProperties().setProperty(stateKey_(s.messageId), JSON.stringify(s)); }
function states_() {
  var p = PropertiesService.getScriptProperties().getProperties();
  return Object.keys(p).filter(function (k) { return k.indexOf(STATE_PREFIX) === 0; }).map(function (k) { return JSON.parse(p[k]); });
}
function sha256_(text) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, text, Utilities.Charset.UTF_8).map(function (b) { return ('0' + ((b + 256) % 256).toString(16)).slice(-2); }).join('');
}
function code_(e) {
  // Never log credentials, recipient addresses, raw HTTP bodies, or report text.
  var s = String(e && e.message || 'UNEXPECTED_FAILURE');
  return /^[A-Z0-9_: -]{1,100}$/.test(s) ? s : 'UNEXPECTED_FAILURE_SEE_EXECUTION_CONTEXT';
}
function fetchGithub_(cfg, suffix, method, payload) {
  var options = {method: method || 'get', muteHttpExceptions: true, followRedirects: false,
    headers: {Authorization: 'Bearer ' + cfg.token, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28'}};
  if (payload) { options.contentType = 'application/json'; options.payload = JSON.stringify(payload); }
  var result = UrlFetchApp.fetch('https://api.github.com/repos/' + cfg.owner + '/' + cfg.repo + suffix, options);
  var status = result.getResponseCode();
  var text = result.getContentText();
  var data = null;
  if (text && status >= 200 && status < 300) {
    try { data = JSON.parse(text); } catch (_) { throw new Error('GITHUB_BAD_JSON'); }
  }
  return {status: status, data: data};
}
function extractDocument_(message, expectedDate) {
  var attachments = message.getAttachments({includeInlineImages: false, includeAttachments: true}).filter(function (a) { return /\.md$/i.test(a.getName()); });
  var text;
  if (attachments.length) {
    if (attachments.length !== 1 || attachments[0].getName() !== expectedDate + '.md') throw new Error('BAD_MD_ATTACHMENT_NAME_OR_COUNT');
    text = attachments[0].getDataAsString('UTF-8');
  } else { text = message.getPlainBody(); }
  var doc = DailyCore.parse(text, expectedDate);
  doc.hash = sha256_(doc.text);
  return doc;
}
function commitDocument_(cfg, doc) {
  // This destination is PUBLIC. A hold flag does not make a GitHub file private.
  if (doc.meta.publication !== 'publish' || doc.meta.review_status === 'imported-unverified') throw new Error('DO_NOT_COMMIT_HELD_OR_UNVERIFIED_REPORT_TO_PUBLIC_REPOSITORY');
  var privateValues = [cfg.token].concat(cfg.recipients || []);
  (cfg.recipients || []).forEach(function (r) { if (/@yp9\.cn$/i.test(r)) privateValues.push(r.split('@')[0]); });
  if (privateValues.some(function (v) { return v && v.length >= 12 && doc.text.indexOf(v) >= 0; })) throw new Error('CONFIGURED_SECRET_IN_REPORT');
  var endpoint = '/contents/' + DailyCore.path(doc.meta.date);
  var existing = fetchGithub_(cfg, endpoint + '?ref=' + encodeURIComponent(cfg.branch));
  var fileSha;
  if (existing.status === 200) {
    if (!existing.data || existing.data.encoding !== 'base64') throw new Error('GITHUB_UNSUPPORTED_CONTENT');
    var oldText = Utilities.newBlob(Utilities.base64Decode(existing.data.content.replace(/\s/g, ''))).getDataAsString('UTF-8');
    var old = DailyCore.parse(oldText, doc.meta.date);
    if (sha256_(old.text) === doc.hash) return 'unchanged';
    if (doc.meta.revision <= old.meta.revision) throw new Error('REVISION_CONFLICT_INCREMENT_REVISION_FOR_CORRECTION');
    fileSha = existing.data.sha;
  } else if (existing.status !== 404) { throw new Error('GITHUB_READ_HTTP_' + existing.status); }
  if (cfg.dryRun) return 'dry-run';
  var payload = {message: 'archive: ' + doc.meta.date + ' r' + doc.meta.revision,
    content: Utilities.base64Encode(doc.text, Utilities.Charset.UTF_8), branch: cfg.branch};
  if (fileSha) payload.sha = fileSha;
  var response = fetchGithub_(cfg, endpoint, 'put', payload);
  if (response.status !== 200 && response.status !== 201) throw new Error('GITHUB_WRITE_HTTP_' + response.status);
  return 'committed';
}
function discoverSources_(cfg) {
  // Scan only this account's Sent mail; Gmail date operators are not Beijing dates.
  var query = 'in:sent subject:AIENGINE-SOURCE newer_than:30d';
  var threads = [];
  for (var offset = 0; offset < 150; offset += 30) {
    var batch = GmailApp.search(query, offset, 30);
    threads = threads.concat(batch);
    if (batch.length < 30) break;
  }
  var props = PropertiesService.getScriptProperties();
  threads.forEach(function (thread) {
    thread.getMessages().forEach(function (message) {
      var subject = /^\[AIENGINE-SOURCE\] (\d{4}-\d{2}-\d{2})$/.exec(message.getSubject());
      if (!subject || DailyCore.address(message.getFrom()) !== cfg.source || subject[1] < cfg.startDate) return;
      var id = message.getId();
      if (props.getProperty(stateKey_(id))) return;
      storeState_({messageId: id, date: subject[1], phase: 'new', createdAt: Date.now(), attempts: 0, deliveries: {}});
    });
  });
}
function getPublic_(url) {
  var r = UrlFetchApp.fetch(url, {method: 'get', muteHttpExceptions: true, followRedirects: true,
    headers: {'Cache-Control': 'no-cache'}});
  return {status: r.getResponseCode(), text: r.getContentText()};
}
function deployedReceipt_(cfg, s) {
  var receipt = getPublic_(cfg.base + '/receipts/' + s.date + '.json?v=' + s.hash);
  if (receipt.status !== 200) return null;
  var data;
  try { data = JSON.parse(receipt.text); } catch (_) { return null; }
  if (data.schema !== 1 || data.date !== s.date || data.sha256 !== s.hash || data.revision !== s.revision || data.html !== 'reports/' + s.date) return null;
  var page = getPublic_(cfg.base + '/' + data.html + '?v=' + s.hash);
  if (page.status !== 200 || page.text.indexOf('source-sha256:' + s.hash) < 0) return null;
  return data;
}
function notification_(cfg, s) {
  var link = cfg.base + '/reports/' + s.date;
  var title = '[AIENGINE-DAILY] ' + s.date + ' | AI 原生游戏引擎每日观察';
  if (s.revision > 1) title += ' | 修订 ' + s.revision;
  var marker = '日报投递编号：' + s.date + '-r' + s.revision + '-' + s.hash.slice(0,12);
  var text = title + '\n\n' + s.summary.map(function (x, i) { return (i+1) + '. ' + x; }).join('\n') + '\n\n阅读全文：' + link + '\n历史归档：' + cfg.base + '/\n\n' + marker;
  var html = '<div style="font-family:sans-serif;font-size:16px;line-height:1.8"><h2>' + DailyCore.escape(title) + '</h2><ol>' + s.summary.map(function (x) { return '<li>' + DailyCore.escape(x) + '</li>'; }).join('') + '</ol><p><a href="' + DailyCore.escape(link) + '">阅读完整日报</a></p><p><a href="' + DailyCore.escape(cfg.base) + '/">查看历史归档</a></p><p style="font-size:12px;color:#666">' + DailyCore.escape(marker) + '</p></div>';
  return {title: title, text: text, html: html, marker: marker};
}
function alreadySent_(cfg, address, n) {
  var threads = GmailApp.search('in:sent to:' + address + ' subject:AIENGINE-DAILY newer_than:30d', 0, 20);
  return threads.some(function (t) { return t.getMessages().some(function (m) {
    var to = m.getTo().split(',').map(DailyCore.address);
    return DailyCore.address(m.getFrom()) === cfg.source && to.indexOf(address.toLowerCase()) >= 0 && m.getSubject() === n.title && m.getPlainBody().indexOf(n.marker) >= 0;
  }); });
}
function notifyRecipients_(cfg, s) {
  if (cfg.dryRun || !cfg.notifications) return false;
  var n = notification_(cfg, s);
  var incomplete = false;
  cfg.recipients.forEach(function (recipient) {
    var key = sha256_(recipient).slice(0,16);
    var status = s.deliveries[key];
    if (status === 'sent') return;
    // Sending mail and storing state is not atomic. Resolve uncertainty via Sent.
    if (status === 'sending' || status === 'uncertain') {
      if (alreadySent_(cfg, recipient, n)) { s.deliveries[key] = 'sent'; storeState_(s); return; }
      s.deliveries[key] = 'uncertain'; storeState_(s); incomplete = true; return;
    }
    if (alreadySent_(cfg, recipient, n)) { s.deliveries[key] = 'sent'; storeState_(s); return; }
    s.deliveries[key] = 'sending'; storeState_(s);
    try {
      GmailApp.sendEmail(recipient, n.title, n.text, {htmlBody: n.html, name: 'AI Engine Observer'});
      s.deliveries[key] = 'sent'; storeState_(s);
    } catch (_) {
      s.deliveries[key] = 'uncertain'; storeState_(s); incomplete = true;
    }
  });
  return !incomplete && cfg.recipients.every(function (r) { return s.deliveries[sha256_(r).slice(0,16)] === 'sent'; });
}
function alertOnce_(cfg, s, reason) {
  if (cfg.dryRun || s.alerted) return;
  try {
    GmailApp.sendEmail(cfg.ownerEmail, '[AIENGINE-PIPELINE] ' + s.date + ' | 需要检查',
      '归档/投递流程需要检查。\n日期：' + s.date + '\n状态：' + reason + '\n请查看 Apps Script 执行记录、仓库 Actions 和对应日报状态。\n此消息不代表微信或飞书已经收到日报。');
    s.alerted = true; storeState_(s);
  } catch (_) { console.warn('ALERT_SEND_FAILED'); }
}
function processState_(cfg, s) {
  if (s.phase === 'sent' || s.phase === 'held' || s.phase === 'blocked' || s.phase === 'expired') return;
  try {
    if (s.phase === 'new') {
      var message = GmailApp.getMessageById(s.messageId);
      if (DailyCore.address(message.getFrom()) !== cfg.source || message.getSubject() !== '[AIENGINE-SOURCE] ' + s.date) throw new Error('SOURCE_MESSAGE_CHANGED');
      var doc = extractDocument_(message, s.date);
      commitDocument_(cfg, doc);
      if (cfg.dryRun) { console.log('DRY_RUN_VALIDATED ' + s.date); return; }
      s.hash = doc.hash; s.revision = doc.meta.revision; s.summary = doc.meta.summary;
      s.phase = 'waiting'; s.committedAt = Date.now(); storeState_(s);
    }
    if (s.phase === 'waiting' && cfg.notifications && !cfg.dryRun) {
      if (deployedReceipt_(cfg, s)) {
        s.phase = 'delivering'; storeState_(s);
      } else {
        var age = Date.now() - s.committedAt;
        if (age > 60 * 60 * 1000) alertOnce_(cfg, s, 'DEPLOYMENT_NOT_VERIFIED_AFTER_ONE_HOUR');
        if (age > 48 * 60 * 60 * 1000) { s.phase = 'expired'; storeState_(s); }
        return;
      }
    }
    if (s.phase === 'delivering') {
      if (!cfg.dryRun && cfg.notifications && !deployedReceipt_(cfg, s)) { s.phase = 'waiting'; storeState_(s); return; }
      if (notifyRecipients_(cfg, s)) { s.phase = 'sent'; s.sentAt = Date.now(); storeState_(s); }
      else if (Object.values(s.deliveries).indexOf('uncertain') >= 0) alertOnce_(cfg, s, 'EMAIL_SEND_UNCERTAIN_CHECK_SENT_BEFORE_RETRY');
    }
  } catch (e) {
    s.attempts += 1; s.lastError = code_(e); s.lastAttemptAt = Date.now();
    if (!/^GITHUB_(?:READ|WRITE)_HTTP_(429|500|502|503|504)$/.test(s.lastError) && s.lastError !== 'UNEXPECTED_FAILURE_SEE_EXECUTION_CONTEXT') s.phase = 'blocked';
    storeState_(s);
    if (s.phase === 'blocked' || s.attempts >= 3) alertOnce_(cfg, s, s.lastError);
    console.warn(s.date + ' ' + s.lastError);
  }
}
function dailyWatchdog_(cfg) {
  if (!cfg.watchdog || cfg.dryRun) return;
  var today = Utilities.formatDate(new Date(), 'Asia/Shanghai', 'yyyy-MM-dd');
  var hour = Number(Utilities.formatDate(new Date(), 'Asia/Shanghai', 'HH'));
  if (today < cfg.startDate || hour < 12 || states_().some(function (s) { return s.date === today && ['waiting','delivering','sent','held'].indexOf(s.phase) >= 0; })) return;
  var props = PropertiesService.getScriptProperties();
  if (props.getProperty('WATCHDOG_LAST_DATE') === today) return;
  GmailApp.sendEmail(cfg.ownerEmail, '[AIENGINE-PIPELINE] ' + today + ' | 尚未归档', '北京时间已到12点，但尚未发现当天成功归档的日报。请检查现有09:00检索任务、原始Markdown邮件和中转执行记录。此告警不等于已完成当日检索。');
  props.setProperty('WATCHDOG_LAST_DATE', today);
}
function pruneState_() {
  var cutoff = Date.now() - 120 * 24 * 60 * 60 * 1000;
  states_().forEach(function (s) { if (s.createdAt < cutoff && ['sent','held'].indexOf(s.phase) >= 0) PropertiesService.getScriptProperties().deleteProperty(stateKey_(s.messageId)); });
}
function runBridge() {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) return;
  try {
    var cfg = bridgeConfig_();
    var started = Date.now();
    discoverSources_(cfg);
    var pending = states_().sort(function (a,b) { return a.createdAt - b.createdAt; });
    for (var i = 0; i < pending.length; i++) {
      if (Date.now() - started > 240000) break;
      processState_(cfg, pending[i]);
    }
    dailyWatchdog_(cfg); pruneState_();
  } finally { lock.releaseLock(); }
}
function validateConfiguration() {
  var cfg = bridgeConfig_();
  var repo = fetchGithub_(cfg, '');
  if (repo.status !== 200) throw new Error('GITHUB_REPOSITORY_HTTP_' + repo.status);
  if (!repo.data || !repo.data.permissions || repo.data.permissions.push !== true) throw new Error('TOKEN_NEEDS_TARGET_REPOSITORY_CONTENTS_WRITE');
  console.log('CONFIG_VALIDATED; DRY_RUN=' + cfg.dryRun + '; NOTIFICATIONS=' + cfg.notifications);
}
function installBridgeTrigger() {
  validateConfiguration();
  removeBridgeTriggers();
  ScriptApp.newTrigger('runBridge').timeBased().everyMinutes(5).create();
  console.log('BRIDGE_TRIGGER_INSTALLED; THIS_DOES_NOT_SCHEDULE_THE_AI_RESEARCH_TASK');
}
function removeBridgeTriggers() {
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === 'runBridge') ScriptApp.deleteTrigger(t); });
}
function inspectBridgeState() {
  console.log(JSON.stringify(states_().map(function (s) { return {date: s.date, phase: s.phase, revision: s.revision || null, attempts: s.attempts, lastError: s.lastError || null}; })));
}
function retryBlockedOrExpired() {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) throw new Error('BRIDGE_BUSY');
  try {
    states_().forEach(function (s) {
      if (s.phase === 'blocked' || s.phase === 'expired') {
        s.phase = 'new'; s.attempts = 0; s.alerted = false; delete s.lastError; storeState_(s);
      }
    });
  } finally { lock.releaseLock(); }
}
