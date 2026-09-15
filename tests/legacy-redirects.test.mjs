import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import {redirectTarget, redirectPage, buildRedirects, MARKER} from '../scripts/build-legacy-redirects.mjs';

const cases = [
  ['/danyow', '/'],
  ['/danyow/', '/'],
  ['/danyow/voice-agent-watch/reports/2026-09-12/', '/voice-agent-watch/reports/2026-09-12/'],
  ['/danyow/ai-engine-watch/reports/2026-09-11?from=email#today', '/ai-engine-watch/reports/2026-09-11?from=email#today'],
  ['/danyow/note/itinerary/?q=a%2Bb&n=1&n=2#%E8%AE%A1%E5%88%92', '/note/itinerary/?q=a%2Bb&n=1&n=2#%E8%AE%A1%E5%88%92'],
  ['/danyow/docs/least/', '/docs/least/'],
  ['/danyow/not-published-yet/', '/not-published-yet/'],
  ['/danyow/danyow/note/', '/note/'],
  ['/danyow//external.example/x', '/external.example/x'],
  ['/danyow/%2F%2Fexternal.example/x', '/%2F%2Fexternal.example/x'],
  ['/danyow/index.html', '/index.html'],
];
for (const [oldPath, newPath] of cases) test('maps ' + oldPath, () => {
  const result = redirectTarget('https://danyow.cn' + oldPath);
  assert.equal(result, 'https://danyow.cn' + newPath);
  assert.equal(redirectTarget(result), null, 'no redirect loop on destination');
});
for (const url of ['https://danyow.cn/', 'https://danyow.cn/voice-agent-watch/',
  'https://danyow.cn/danyowish/', 'https://external.example/danyow/', 'file:///danyow/', 'invalid']) {
  test('does not redirect ' + url, () => assert.equal(redirectTarget(url), null));
}
test('old github.io project domain also reaches the custom root', () => {
  assert.equal(redirectTarget('https://danyow.github.io/danyow/note/itinerary/#a'), 'https://danyow.cn/note/itinerary/#a');
});
test('uses replace, preserves query and fragment, and updates manual fallback', () => {
  const html = redirectPage('/note/itinerary/');
  assert.ok(html.includes(MARKER));
  assert.ok(html.includes('noindex,follow'));
  assert.ok(html.includes('rel="canonical" href="https://danyow.cn/note/itinerary/"'));
  assert.ok(html.includes('<noscript><meta http-equiv="refresh"'));
  const replacements = [], link = {};
  const context = {URL, window:{location:{href:'https://danyow.cn/danyow/note/itinerary/?q=keep#part', replace:url=>replacements.push(url)}}, document:{getElementById:()=>link}};
  for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) vm.runInNewContext(match[1], context);
  assert.deepEqual(replacements, ['https://danyow.cn/note/itinerary/?q=keep#part']);
  assert.equal(link.href, replacements[0]);
});
test('404 fallback maps unknown old paths but leaves root 404s alone', () => {
  const html = redirectPage();
  assert.ok(!html.includes('http-equiv="refresh"'));
  assert.ok(!html.includes('rel="canonical"'));
  for (const [href, expected] of [['https://danyow.cn/danyow/missing/', ['https://danyow.cn/missing/']], ['https://danyow.cn/missing/', []]]) {
    const replacements = [];
    for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) vm.runInNewContext(match[1], {URL, window:{location:{href,replace:url=>replacements.push(url)}},document:{getElementById:()=>({})}});
    assert.deepEqual(replacements, expected);
  }
});
test('build replaces stale articles with small stubs, without copying content or assets', () => {
  const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'legacy-redirect-'));
  try {
    const input=path.join(tmp,'dist'),output=path.join(tmp,'legacy');
    for (const file of ['index.html','404.html','note/itinerary/index.html','voice-agent-watch/reports/2026-09-12/index.html','voice-agent-watch/raw/sample.md','_astro/style.css']) {
      fs.mkdirSync(path.dirname(path.join(input,file)),{recursive:true});fs.writeFileSync(path.join(input,file),'ORIGINAL_ARTICLE_SECRET');
    }
    fs.mkdirSync(output);fs.writeFileSync(path.join(output,'obsolete.html'),'OLD_BODY');
    const result=buildRedirects(input,output,'a'.repeat(40));
    assert.equal(result.pages,3);
    assert.ok(!fs.existsSync(path.join(output,'obsolete.html')));
    assert.ok(!fs.existsSync(path.join(output,'_astro')));
    assert.ok(!fs.existsSync(path.join(output,'voice-agent-watch/raw')));
    assert.ok(!fs.readFileSync(path.join(output,'index.html'),'utf8').includes('ORIGINAL_ARTICLE_SECRET'));
    const manifest=JSON.parse(fs.readFileSync(path.join(output,'redirect-manifest.json')));
    assert.equal(manifest.mode,'client-redirect-only');
    assert.equal(manifest.routes[0].to,'https://danyow.cn/');
    assert.throws(()=>buildRedirects(input,input),/UNSAFE_OUTPUT_DIRECTORY/);
    assert.throws(()=>buildRedirects(input,tmp),/UNSAFE_OUTPUT_DIRECTORY/);
  } finally {fs.rmSync(tmp,{recursive:true,force:true});}
});
test('rejects external and script-injected canonical paths', () => {
  for (const target of ['//external.example','javascript:alert(1)','/\\external.example','/danyow/foo','/foo?x=1']) assert.throws(()=>redirectPage(target),/INVALID_REDIRECT_TARGET/);
  assert.ok(!redirectPage('/quotes"<script>/').includes('href="https://danyow.cn/quotes"<script>'));
});
