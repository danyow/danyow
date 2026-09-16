// Deterministic profile updates. Only the marked public-reading block is writable.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const START = '<!-- PROFILE:RECENT:START -->';
export const END = '<!-- PROFILE:RECENT:END -->';
export const REPOSITORY = 'danyow/danyow.github.io';
export const CHANNELS = {
  'ai-engine-watch': {
    title: 'AI 原生游戏引擎', label: '01 · 游戏与世界模型',
    description: '跟进新引擎、交互世界模型与可复现的研究。',
  },
  'voice-agent-watch': {
    title: '电话语音 Agent', label: '02 · 语音与个人助手',
    description: '关注实时语音、耳机入口与能执行任务的助手。',
  },
};
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const SHA = /^[a-f0-9]{40}$/;
const HASH = /^[a-f0-9]{64}$/;
const RECORD = /<!-- profile-report:(ai-engine-watch|voice-agent-watch):(\d{4}-\d{2}-\d{2}):r(\d+):([a-f0-9]{64}) -->/g;
export const escapeHtml = text => String(text).replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]));
export const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai' }).format(new Date());

export function bounds(readme) {
  assert(typeof readme === 'string' && Buffer.byteLength(readme) < 30000, 'INVALID_README');
  assert(readme.split(START).length === 2 && readme.split(END).length === 2, 'PROFILE_MARKERS_MISSING_OR_DUPLICATED');
  const start = readme.indexOf(START) + START.length, end = readme.indexOf(END);
  assert(start <= end, 'PROFILE_MARKERS_REVERSED');
  return { start, end };
}

export function selectReports(index, channel, day = today()) {
  assert(Object.hasOwn(CHANNELS, channel), 'UNKNOWN_CHANNEL');
  assert(index?.schema === 1 && Array.isArray(index.reports) && index.reports.length > 0 &&
    index.reports.length <= 1000, 'INVALID_OR_EMPTY_PUBLISHED_INDEX');
  const byDate = new Map();
  for (const report of index.reports) {
    const date = report.date;
    assert(typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date), 'INVALID_REPORT_DATE');
    const parsed = new Date(date + 'T00:00:00Z');
    assert(Number.isFinite(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === date && date <= day,
      'INVALID_OR_FUTURE_REPORT_DATE');
    assert(Number.isInteger(report.revision) && report.revision >= 1 && report.revision <= 999 &&
      typeof report.sha256 === 'string' && HASH.test(report.sha256), 'INVALID_REPORT_VERSION');
    assert(report.html === 'reports/' + date && report.raw === 'raw/' + date.slice(0, 4) + '/' + date.slice(5, 7) + '/' + date + '.md',
      'UNSAFE_REPORT_PATH');
    assert(Array.isArray(report.summary) && report.summary.length >= 1 && report.summary.length <= 3 &&
      report.summary.every(s => typeof s === 'string' && s.trim().length > 0 && s.length <= 280 && !/[\u0000-\u001f\u007f]/.test(s)),
      'INVALID_REPORT_SUMMARY');
    const prior = byDate.get(date);
    if (prior?.revision === report.revision) assert(prior.sha256 === report.sha256, 'CONFLICTING_REPORT_HASH');
    if (!prior || report.revision > prior.revision) byDate.set(date, report);
  }
  return [...byDate.values()].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 2);
}

export function preventRollback(previousBlock, selected) {
  for (const [channel, reports] of Object.entries(selected)) {
    const old = [...previousBlock.matchAll(RECORD)].filter(m => m[1] === channel);
    const latest = old.map(m => m[2]).sort().at(-1);
    assert(!latest || reports[0].date >= latest, 'REFUSE_OLDER_PUBLISHED_INDEX');
    for (const m of old) {
      const current = reports.find(r => r.date === m[2]);
      if (!current) continue;
      assert(current.revision >= Number(m[3]), 'REFUSE_REVISION_ROLLBACK');
      if (current.revision === Number(m[3])) assert(current.sha256 === m[4], 'REFUSE_UNVERSIONED_HASH_CHANGE');
    }
  }
}

export function render(readme, snapshot, day = today()) {
  const { start, end } = bounds(readme);
  assert(snapshot?.schema === 1 && snapshot.repository === REPOSITORY && SHA.test(snapshot.ref || ''), 'INVALID_PUBLIC_SNAPSHOT');
  const selected = Object.fromEntries(Object.keys(CHANNELS).map(channel => [channel,
    selectReports(snapshot.channels?.[channel], channel, day)]));
  preventRollback(readme.slice(start, end), selected);
  const cells = Object.entries(CHANNELS).map(([channel, info]) => {
    const entries = selected[channel].map((report, i) => {
      const excerpt = Array.from(report.summary[0].trim()).slice(0, 64).join('') +
        (Array.from(report.summary[0].trim()).length > 64 ? '…' : '');
      const route = '/' + channel + '/' + report.html + '/';
      return `<!-- profile-report:${channel}:${report.date}:r${report.revision}:${report.sha256} -->\n` +
        `<p><sub>${i === 0 ? '最新' : '往期'} · ${report.date}</sub><br/>\n` +
        `<b><a href="https://danyow.cn${route}">${escapeHtml(excerpt)}</a></b><br/>\n` +
        `<sub><a href="https://danyow.cn${route}">阅读全文 ↗</a> · <a href="https://danyow.vercel.app${route}">备用阅读</a></sub></p>`;
    }).join('\n');
    return `<td width="50%" valign="top">\n<sub>${info.label}</sub>\n<h3>${info.title}</h3>\n` +
      `<p>${info.description}</p>\n${entries}\n<p><a href="https://danyow.cn/${channel}/">浏览全部 →</a></p>\n</td>`;
  });
  const latest = Object.values(selected).flat().map(r => r.date).sort().at(-1);
  const block = '\n<table>\n<tr>\n' + cells.join('\n') + '\n</tr>\n</table>\n\n' +
    `<sub>摘要摘自已发布日报 · 最新内容 ${latest} · 只随内容变化更新</sub>\n`;
  return readme.slice(0, start) + block + readme.slice(end);
}

export async function fetchSnapshot(fetcher = fetch) {
  async function get(url) {
    const response = await fetcher(url, { redirect: 'error', headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(15000) });
    assert(response.status === 200, 'PUBLIC_SOURCE_HTTP_' + response.status);
    const text = await response.text();
    assert(Buffer.byteLength(text) <= 1500000, 'PUBLIC_SOURCE_TOO_LARGE');
    return JSON.parse(text);
  }
  const ref = await get('https://api.github.com/repos/' + REPOSITORY + '/git/ref/heads/gh-pages');
  assert(ref.ref === 'refs/heads/gh-pages' && ref.object?.type === 'commit' && SHA.test(ref.object.sha), 'INVALID_PUBLICATION_REF');
  const channels = {};
  // Pin both indexes to one publication so a concurrent deploy cannot mix versions.
  for (const channel of Object.keys(CHANNELS)) {
    channels[channel] = await get('https://raw.githubusercontent.com/' + REPOSITORY + '/' + ref.object.sha + '/' + channel + '/index/recent.json');
  }
  return { schema: 1, repository: REPOSITORY, ref: ref.object.sha, channels };
}

export function checkReadme(readme) {
  bounds(readme);
  assert(/<h1[^>]*>Danyow<\/h1>/.test(readme), 'PROFILE_IDENTITY_MISSING');
  assert(readme.includes('/.github/SITE.md') && readme.includes('/.github/PROFILE.md'), 'MAINTENANCE_LINKS_MISSING');
  assert(!/<(?:script|iframe|style)\b|onerror\s*=|javascript:/i.test(readme), 'UNSAFE_PROFILE_HTML');
  assert(!/github-readme-stats\.vercel\.app|komarev\.com|readme-typing-svg/i.test(readme), 'UNRELIABLE_LIVE_WIDGET');
  assert(!/^```/m.test(readme), 'DEVELOPER_MANUAL_MUST_NOT_REPLACE_PROFILE');
  const records = [...readme.matchAll(RECORD)];
  assert(records.length >= 2 && records.length <= 4, 'PROFILE_REPORT_COUNT');
  for (const channel of Object.keys(CHANNELS)) assert(records.some(m => m[1] === channel), 'PROFILE_CHANNEL_MISSING');
  return true;
}

async function main() {
  const args = process.argv.slice(2);
  const allowed = new Set(['--input', '--readme', '--write', '--check']);
  for (let i = 0; i < args.length; i++) {
    assert(allowed.has(args[i]), 'UNKNOWN_OPTION');
    if (args[i] === '--input' || args[i] === '--readme') assert(args[++i] && !args[i].startsWith('--'), 'MISSING_OPTION_VALUE');
  }
  const value = flag => { const i = args.indexOf(flag); return i < 0 ? undefined : args[i + 1]; };
  const file = path.resolve(value('--readme') || path.join(ROOT, 'README.md'));
  const original = fs.readFileSync(file, 'utf8');
  if (args.includes('--check')) { checkReadme(original); console.log('Profile structure: valid'); return; }
  const input = value('--input');
  const snapshot = input ? JSON.parse(fs.readFileSync(input, 'utf8')) : await fetchSnapshot();
  const next = render(original, snapshot);
  checkReadme(next);
  if (!args.includes('--write')) { process.stdout.write(next); return; }
  // Do not clobber a manual edit made while fetching public data.
  assert(fs.readFileSync(file, 'utf8') === original, 'README_CHANGED_DURING_UPDATE');
  if (next !== original) fs.writeFileSync(file, next);
  console.log(JSON.stringify({ changed: next !== original, reports: [...next.matchAll(RECORD)].map(m => ({ channel: m[1], date: m[2], revision: Number(m[3]) })) }));
}
if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
