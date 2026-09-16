import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { START, END, REPOSITORY, CHANNELS, bounds, selectReports, render, fetchSnapshot, checkReadme } from './update.mjs';
const DAY = '2026-09-16';
const report = (date = DAY, revision = 1) => ({ date, revision, sha256: 'a'.repeat(64),
  html: 'reports/' + date, raw: `raw/${date.slice(0,4)}/${date.slice(5,7)}/${date}.md`, summary: ['一条公开摘要。'] });
const snapshot = () => ({ schema: 1, repository: REPOSITORY, ref: 'b'.repeat(40),
  channels: Object.fromEntries(Object.keys(CHANNELS).map(c => [c, { schema: 1, reports: [report(), report('2026-09-15')] }])) });
const base = '手动介绍\n' + START + '\n' + END + '\n手动页脚\n';

test('only the marked section changes, preserving manual text byte for byte', () => {
  const next = render(base, snapshot(), DAY);
  assert(next.startsWith('手动介绍\n' + START)); assert(next.endsWith(END + '\n手动页脚\n'));
});
test('identical published content is idempotent, even on the next day', () => {
  const next = render(base, snapshot(), DAY);
  assert.equal(render(next, snapshot(), '2026-09-17'), next);
  const same = snapshot(); same.ref = 'c'.repeat(40);
  assert.equal(render(next, same, DAY), next);
});
test('missing, duplicated and reversed markers fail closed', () => {
  for (const text of ['', START, base + START, END + START]) assert.throws(() => bounds(text));
});
test('both channels required; empty or unavailable feeds cannot erase content', () => {
  const data = snapshot(); delete data.channels['voice-agent-watch'];
  assert.throws(() => render(base, data, DAY));
  assert.throws(() => selectReports({ schema: 1, reports: [] }, 'ai-engine-watch', DAY));
});
test('only a pinned public publication repository is accepted', () => {
  for (const change of [{ repository: 'danyow/private' }, { ref: 'main' }, { schema: 2 }]) {
    assert.throws(() => render(base, { ...snapshot(), ...change }, DAY));
  }
});
test('latest two unique dates sorted descending; highest revision wins', () => {
  const index = { schema: 1, reports: [report('2026-09-14'), report(), report('2026-09-15'), report(DAY, 2)] };
  const selected = selectReports(index, 'ai-engine-watch', DAY);
  assert.deepEqual(selected.map(r => [r.date, r.revision]), [[DAY, 2], ['2026-09-15', 1]]);
});
test('invalid dates, future dates, hashes and paths are rejected', () => {
  for (const change of [{ date: '2026-02-30' }, { date: '2099-01-01' }, { sha256: 'fake' }, { revision: 0 },
    { html: '../../private' }, { raw: 'https://evil.test/' }, { summary: [''] }, { summary: ['a\n<script>'] }]) {
    assert.throws(() => selectReports({ schema: 1, reports: [{ ...report(), ...change }] }, 'ai-engine-watch', DAY));
  }
});
test('untrusted summaries are escaped as text, never executable HTML', () => {
  const data = snapshot(); data.channels['ai-engine-watch'].reports[0].summary = ['<img src=x onerror="alert(1)"> & 说明'];
  const out = render(base, data, DAY);
  assert(out.includes('&lt;img')); assert(!out.includes('<img')); assert(out.includes('&amp;'));
});
test('stale data and version rollback are rejected', () => {
  const out = render(base, snapshot(), DAY);
  const stale = snapshot(); stale.channels['ai-engine-watch'].reports = [report('2026-09-14')];
  assert.throws(() => render(out, stale, DAY), /REFUSE_OLDER/);
  const newer = snapshot(); newer.channels['ai-engine-watch'].reports[0].revision = 2;
  assert.throws(() => render(render(base, newer, DAY), snapshot(), DAY), /REFUSE_REVISION/);
});
test('hash changes require a higher revision; ambiguous duplicate hashes are rejected', () => {
  const out = render(base, snapshot(), DAY), changed = snapshot();
  changed.channels['ai-engine-watch'].reports[0].sha256 = 'f'.repeat(64);
  assert.throws(() => render(out, changed, DAY), /UNVERSIONED_HASH/);
  changed.channels['ai-engine-watch'].reports[0].revision = 2;
  assert.doesNotThrow(() => render(out, changed, DAY));
  assert.throws(() => selectReports({ schema: 1, reports: [report(), { ...report(), sha256: 'f'.repeat(64) }] }, 'ai-engine-watch', DAY), /CONFLICTING/);
});
test('network uses one pinned publication and no credentials', async () => {
  const urls = [], fixture = snapshot();
  const result = await fetchSnapshot(async (url, options) => {
    urls.push(url); assert(!options.headers.Authorization); assert.equal(options.redirect, 'error');
    if (url.includes('/git/ref/')) return Response.json({ ref: 'refs/heads/gh-pages', object: { type: 'commit', sha: fixture.ref } });
    assert(url.includes('/' + fixture.ref + '/'));
    return Response.json(fixture.channels[url.includes('/ai-engine-watch/') ? 'ai-engine-watch' : 'voice-agent-watch']);
  });
  assert.equal(urls.length, 3); assert.equal(result.ref, fixture.ref);
});
test('network failure is an error, not an empty successful update', async () => {
  await assert.rejects(fetchSnapshot(async () => new Response('', { status: 503 })), /HTTP_503/);
});
test('profile on disk retains identity, docs links, bounded cards and no broken live widgets', () => {
  assert(checkReadme(fs.readFileSync(new URL('../../README.md', import.meta.url), 'utf8')));
});
