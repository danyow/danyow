'use strict';
// Markdown is the source of truth; Docusaurus renders the generated .md files.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {execFileSync} = require('node:child_process');
const Core = require('../ai-engine-watch/bridge/Core.gs');
const ROOT = path.resolve(__dirname, '..');
const PREFIX = 'ai-engine-watch/reports/';
const digest = text => crypto.createHash('sha256').update(text, 'utf8').digest('hex');
const json = value => JSON.stringify(value, null, 0) + '\n';
const quote = value => JSON.stringify(value);
function files(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => {
    if (e.isSymbolicLink()) throw new Error('SYMLINK_NOT_ALLOWED');
    const p = path.join(dir, e.name);
    return e.isDirectory() ? files(p) : e.name.endsWith('.md') ? [p] : [];
  }).sort();
}
function load(root) {
  return files(path.join(root, PREFIX)).map(p => {
    const relative = path.relative(root, p).split(path.sep).join('/');
    const r = Core.parse(fs.readFileSync(p, 'utf8'), path.basename(p, '.md'));
    if (relative !== Core.path(r.meta.date)) throw new Error('INVALID_REPORT_PATH');
    if (r.meta.publication !== 'publish' || r.meta.review_status === 'imported-unverified')
      throw new Error('HELD_OR_UNVERIFIED_REPORT_IN_PUBLIC_REPOSITORY');
    return {...r, file:relative, sha256:digest(r.text)};
  }).sort((a,b) => b.meta.date.localeCompare(a.meta.date));
}
function checkRevisions(root, base) {
  if (!/^[a-f0-9]{40}$/i.test(base) || /^0+$/.test(base)) throw new Error('INVALID_BASE_COMMIT');
  const git = args => execFileSync('git', args, {cwd:root, encoding:'utf8', stdio:['ignore','pipe','pipe']});
  const previous = git(['ls-tree','-r','--name-only',base,'--',PREFIX]).trim().split('\n').filter(p => p.endsWith('.md'));
  for (const p of previous) {
    if (!fs.existsSync(path.join(root,p))) throw new Error('REPORT_DELETION_REQUIRES_MANUAL_ARCHIVE_REVIEW');
    const old = Core.parse(git(['show',`${base}:${p}`]));
    const current = Core.parse(fs.readFileSync(path.join(root,p),'utf8'));
    if (current.text !== old.text && current.meta.revision <= old.meta.revision) throw new Error('INCREMENT_REVISION_FOR_CORRECTION');
  }
}
function write(file, content) {
  fs.mkdirSync(path.dirname(file), {recursive:true});
  fs.writeFileSync(file, content, 'utf8');
}
function build(root=ROOT, {baseUrl='/danyow/'}={}) {
  if (!/^\/(?:[A-Za-z0-9._-]+\/)*$/.test(baseUrl)) throw new Error('INVALID_BASE_URL');
  const reports = load(root);
  const docs = path.join(root,'.generated/ai-engine-watch');
  const assets = path.join(root,'static/ai-engine-watch');
  for (const dir of [docs,assets]) {
    if (fs.existsSync(dir) && fs.lstatSync(dir).isSymbolicLink()) throw new Error('SYMLINK_OUTPUT_NOT_ALLOWED');
  }
  fs.rmSync(docs,{recursive:true,force:true}); fs.rmSync(assets,{recursive:true,force:true});
  fs.mkdirSync(docs,{recursive:true}); fs.mkdirSync(assets,{recursive:true});
  const base = baseUrl + 'ai-engine-watch';
  const months = new Map(); const entries = [];
  for (const r of reports) {
    const m=r.meta, d=m.date, route=`reports/${d}`, raw=`raw/${d.slice(0,4)}/${d.slice(5,7)}/${d}.md`;
    const entry={date:d,title:m.title,revision:m.revision,summary:m.summary,sha256:r.sha256,html:route,raw,source:r.file};
    entries.push(entry);
    const month=d.slice(0,7);
    if (!months.has(month)) months.set(month,{schema:1,month,timezone:'Asia/Shanghai',reports:[],events:[]});
    months.get(month).reports.push(entry);
    for (const event of m.events) months.get(month).events.push({...event,report_date:d,report:r.file,raw,revision:m.revision});
    write(path.join(assets,raw),r.text);
    write(path.join(assets,`receipts/${d}.json`),json({schema:1,date:d,revision:m.revision,sha256:r.sha256,html:route,raw}));
    const header=`---\nid: ${quote(d)}\ntitle: ${quote(`${d} | ${m.title}`)}\nslug: ${quote('/'+route)}\nhide_title: true\n---\n\n`;
    const links=`\n\n---\n\n[历史归档](${base}/) · [Markdown 原稿](${base}/${raw})\n\n北京时间 · 修订 ${m.revision}\n\n原稿版本：\`source-sha256:${r.sha256}\`\n`;
    write(path.join(docs,d+'.md'),header+r.body+links);
  }
  for (const [month,content] of months) write(path.join(assets,`index/${month}.json`),json(content));
  const cutoff=reports.length ? new Date(Date.parse(reports[0].meta.date+'T00:00:00Z')-30*86400000).toISOString().slice(0,10) : '9999-12-31';
  write(path.join(assets,'index/recent.json'),json({schema:1,timezone:'Asia/Shanghai',reports:entries.filter(r=>r.date>=cutoff),events:[...months.values()].flatMap(m=>m.events).filter(e=>e.report_date>=cutoff)}));
  write(path.join(assets,'index/catalog.json'),json({schema:1,timezone:'Asia/Shanghai',months:[...months.keys()],total:entries.length}));
  let listing='# AI 原生游戏引擎每日观察\n\nMarkdown 原稿归档，网页用于阅读，邮件仅发送摘要和当日固定链接。所有日期按北京时间记录。\n\n';
  if (!entries.length) listing+='## 归档入口已准备\n\n暂时没有已发布的日报。历史邮件样本没有被自动公开；每日检索和手机推送是否已接通，请以各执行系统的实际记录为准。\n\n';
  for (const [month,data] of months) {
    listing+=`## ${month}\n\n`;
    for (const r of data.reports) listing+=`### [${r.date}](${base}/${r.html})\n\n${r.summary.map(s=>Core.escape(s)).join(' / ')}\n\n`;
  }
  listing+=`## 机器读取入口\n\n[近期索引](${base}/index/recent.json) · [月份目录](${base}/index/catalog.json)\n\n查询历史时先定位月份和事件，再读取命中的 Markdown 原稿。不需要反复读取网页 HTML。\n`;
  write(path.join(docs,'index.md'),'---\nid: index\ntitle: AI 原生游戏引擎每日观察\nhide_title: true\nslug: /\n---\n\n'+listing);
  return {reports:reports.length,months:months.size};
}
if (require.main===module) {
  try {
    const args=process.argv.slice(2);
    if (args[0]==='--check-revisions') checkRevisions(ROOT,args[1]);
    else console.log(JSON.stringify(build(ROOT,{baseUrl:process.env.SITE_BASE_URL || '/danyow/'})));
  } catch (error) { console.error(error.message); process.exitCode=1; }
}
module.exports={build,load,checkRevisions,digest};
