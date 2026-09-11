/** Pure functions shared by the archive builder, Apps Script and tests. */
var DailyCore = (function () {
  'use strict';
  var EMAIL = /[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+/;
  var SECRET = /github_pat_[\w]+|gh[pousr]_[\w]{16,}|https:\/\/[^\s)"<>]*(?:\/bot\/v2\/hook\/|\/services\/T[A-Z0-9]+\/)|(?:api[_-]?key|access[_-]?token|secret)\s*[:=]\s*["']?[\w-]{16,}/i;
  function normalize(text) { return String(text).replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').trim() + '\n'; }
  function date(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('BAD_DATE');
    var d = new Date(value + 'T00:00:00Z');
    if (!isFinite(d.getTime()) || d.toISOString().slice(0, 10) !== value) throw new Error('BAD_DATE');
    return value;
  }
  function url(value) {
    return typeof value === 'string' && /^https?:\/\/[^\s/@?#]+(?:[/?#][^\s]*)?$/.test(value) && !/[?&](?:token|secret|api_key)=/i.test(value);
  }
  function parse(text, expectedDate) {
    text = normalize(text);
    if (unescape(encodeURIComponent(text)).length > 120000) throw new Error('REPORT_TOO_LARGE');
    if (EMAIL.test(text) || SECRET.test(text)) throw new Error('PRIVATE_DATA_IN_REPORT');
    var parts = /^---\n(\{[\s\S]*?\})\n---\n([\s\S]+)$/.exec(text);
    if (!parts) throw new Error('BAD_MARKDOWN_ENVELOPE');
    var m;
    try { m = JSON.parse(parts[1]); } catch (_) { throw new Error('BAD_JSON_METADATA'); }
    var keys = ['schema','date','timezone','title','revision','publication','review_status','summary','events'];
    if (!m || Array.isArray(m) || keys.some(function (k) { return !(k in m); }) || Object.keys(m).some(function (k) { return keys.indexOf(k) < 0; })) throw new Error('BAD_METADATA_KEYS');
    if (m.schema !== 1 || m.timezone !== 'Asia/Shanghai') throw new Error('BAD_SCHEMA_OR_TIMEZONE');
    date(m.date);
    if (expectedDate && m.date !== expectedDate) throw new Error('SUBJECT_DATE_MISMATCH');
    if (!Number.isInteger(m.revision) || m.revision < 1 || m.revision > 999) throw new Error('BAD_REVISION');
    if (['hold','publish'].indexOf(m.publication) < 0) throw new Error('BAD_PUBLICATION');
    if (['generated','imported-unverified','reviewed'].indexOf(m.review_status) < 0) throw new Error('BAD_REVIEW_STATUS');
    if (typeof m.title !== 'string' || !m.title.length || m.title.length > 120) throw new Error('BAD_TITLE');
    if (!Array.isArray(m.summary) || m.summary.length < 1 || m.summary.length > 5 || m.summary.some(function (s) { return typeof s !== 'string' || !s.length || s.length > 280; })) throw new Error('BAD_SUMMARY');
    if (!Array.isArray(m.events) || m.events.length > 40) throw new Error('BAD_EVENTS');
    var eventKeys = ['project','title','kind','event_date','publication_date','discovered_date','evidence','source'];
    m.events.forEach(function (e) {
      if (!e || Array.isArray(e) || eventKeys.some(function (k) { return !(k in e); }) || Object.keys(e).some(function (k) { return eventKeys.indexOf(k) < 0; })) throw new Error('BAD_EVENT_KEYS');
      if (typeof e.project !== 'string' || !/^[a-z0-9][a-z0-9-]{0,79}$/.test(e.project)) throw new Error('BAD_PROJECT');
      if (typeof e.title !== 'string' || !e.title.length || e.title.length > 180) throw new Error('BAD_EVENT_TITLE');
      if (['release','paper','code','demo','funding','industry','correction','other'].indexOf(e.kind) < 0 || ['verified','source-claim','analysis','unverified'].indexOf(e.evidence) < 0) throw new Error('BAD_EVENT_KIND');
      ['event_date','publication_date'].forEach(function (k) { if (e[k] !== null) date(e[k]); });
      date(e.discovered_date);
      if (e.discovered_date > m.date || !url(e.source)) throw new Error('BAD_EVENT_DATE_OR_URL');
    });
    var body = parts[2].trim() + '\n';
    if (!/^# /.test(body) || /<\/?[A-Za-z][^>]*>/i.test(body) || /^(?:import|export)\s/m.test(body) || /(?:javascript|vbscript|data):/i.test(body)) throw new Error('UNSAFE_OR_INVALID_MARKDOWN');
    return {meta: m, text: text, body: body};
  }
  function address(value) {
    var match = /<([^<>]+)>/.exec(String(value));
    return (match ? match[1] : String(value)).trim().toLowerCase();
  }
  function config(p, effectiveEmail) {
    var owner = p.GITHUB_OWNER || '', repo = p.GITHUB_REPO || 'danyow';
    if (!/^[A-Za-z0-9][A-Za-z0-9-]{0,38}$/.test(owner) || !/^[A-Za-z0-9][A-Za-z0-9._-]{0,99}$/.test(repo)) throw new Error('SET_GITHUB_OWNER_AND_REPO');
    if (!p.GITHUB_TOKEN) throw new Error('SET_GITHUB_TOKEN_IN_SCRIPT_PROPERTIES');
    var base = String(p.PAGES_BASE_URL || '').replace(/\/$/, '');
    if (!/^https:\/\/[a-zA-Z0-9.-]+(?:\/[a-zA-Z0-9._-]+)*$/.test(base)) throw new Error('SET_HTTPS_PAGES_BASE_URL');
    var source = address(p.SOURCE_EMAIL || effectiveEmail), account = address(effectiveEmail);
    if (!EMAIL.test(source) || source !== account) throw new Error('SOURCE_MUST_BE_EFFECTIVE_GMAIL_ACCOUNT');
    var receivers;
    try { receivers = JSON.parse(p.RECIPIENT_EMAILS_JSON || '[]'); } catch (_) { throw new Error('BAD_RECIPIENTS_JSON'); }
    if (!Array.isArray(receivers) || receivers.length > 4 || receivers.some(function (e) { return typeof e !== 'string' || !/^[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/.test(e); })) throw new Error('BAD_RECIPIENTS');
    receivers = Array.from(new Set(receivers.map(function (e) { return e.toLowerCase(); })));
    var enabled = p.ENABLE_NOTIFICATIONS === 'true';
    if (p.DRY_RUN === 'false' && p.PUBLIC_REPOSITORY_APPROVED !== 'true') throw new Error('APPROVE_PUBLIC_REPOSITORY_BEFORE_COMMIT');
    if (enabled && (p.PUBLIC_SITE_APPROVED !== 'true' || !receivers.length)) throw new Error('APPROVE_PUBLIC_SITE_AND_RECIPIENTS_BEFORE_DELIVERY');
    var start = date(p.SOURCE_START_DATE || new Date().toISOString().slice(0, 10));
    return {owner: owner, repo: repo, token: p.GITHUB_TOKEN, branch: 'main', base: base,
      source: source, recipients: receivers, ownerEmail: source, startDate: start,
      dryRun: p.DRY_RUN !== 'false', notifications: enabled, watchdog: p.ENABLE_WATCHDOG === 'true'};
  }
  function path(d) { date(d); return 'ai-engine-watch/reports/' + d.slice(0,4) + '/' + d.slice(5,7) + '/' + d + '.md'; }
  function escape(value) { return String(value).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  return {normalize: normalize, parse: parse, config: config, address: address, date: date, path: path, escape: escape};
})();
if (typeof module !== 'undefined') module.exports = DailyCore;
