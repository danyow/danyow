// Verify the live redirect-only Pages deployment, not merely a successful push.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {setTimeout as sleep} from 'node:timers/promises';
import {MARKER, redirectTarget} from './build-legacy-redirects.mjs';

const output = path.resolve(process.argv[2] || '.generated/legacy-redirects');
const manifest = JSON.parse(fs.readFileSync(path.join(output, 'redirect-manifest.json'), 'utf8'));
const expectedCommit = process.env.GITHUB_SHA || manifest.source_commit;
if (manifest.mode !== 'client-redirect-only' || manifest.source_commit !== expectedCommit) throw Error('INVALID_LOCAL_REDIRECT_MANIFEST');
const samples = ['/', '/note/itinerary/', '/docs/least/',
  '/ai-engine-watch/reports/2026-09-11/', '/voice-agent-watch/reports/2026-09-12/'];
const deadline = Date.now() + 360000;
async function get(url) {
  return fetch(url, {headers:{'Cache-Control':'no-cache'}, signal:AbortSignal.timeout(12000)});
}
function executeVerifiedScript(html, href) {
  const replaced = [], link = {};
  const context = vm.createContext({URL, window:{location:{href, replace:url=>replaced.push(url)}}, document:{getElementById:()=>link}});
  for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new vm.Script(match[1]).runInContext(context, {timeout:1000});
  const expected = redirectTarget(href);
  if (replaced.length !== 1 || replaced[0] !== expected || link.href !== expected) throw Error('REDIRECT_SCRIPT_TARGET_MISMATCH');
  return expected;
}
async function verify(attempt) {
  const suffix = '?redirect-check=' + expectedCommit + '-' + attempt;
  const response = await get('https://danyow.cn/danyow/redirect-manifest.json' + suffix);
  if (!response.ok) throw Error('PUBLIC_REDIRECT_MANIFEST_HTTP_' + response.status);
  const published = await response.json();
  if (published.source_commit !== expectedCommit || published.mode !== manifest.mode || published.marker !== MARKER) throw Error('REDIRECT_MANIFEST_PENDING');
  for (const targetPath of samples) {
    const href = 'https://danyow.cn/danyow' + targetPath + suffix + '#legacy-section';
    const result = await get(href);
    if (!result.ok) throw Error('OLD_PAGE_HTTP_' + result.status + ':' + targetPath);
    const html = await result.text();
    const expected = fs.readFileSync(path.join(output, targetPath, 'index.html'), 'utf8');
    if (html !== expected) throw Error('OLD_PAGE_STILL_HAS_ARTICLE_OR_STALE_STUB:' + targetPath);
    // Only execute scripts byte-matched to our locally built, reviewed artifact.
    const destination = executeVerifiedScript(html, href);
    const actual = await get(destination);
    if (!actual.ok || (await actual.text()).includes(MARKER)) throw Error('ROOT_DESTINATION_NOT_READY:' + targetPath);
  }
  const missing = 'https://danyow.cn/danyow/legacy-redirect-verification-missing/' + suffix;
  const fallback = await get(missing);
  const html = await fallback.text();
  if (fallback.status !== 404 || html !== fs.readFileSync(path.join(output, '404.html'), 'utf8')) throw Error('LEGACY_404_FALLBACK_NOT_DEPLOYED');
  executeVerifiedScript(html, missing);
}
let verified = false;
for (let attempt=1; Date.now()<deadline; attempt++) {
  try {
    await verify(attempt);
    console.log(JSON.stringify({legacyRedirects:'verified', mode:manifest.mode, source_commit:expectedCommit,
      checked:samples.length, unknownPathFallback:true, queryAndFragment:'preserved', attempts:attempt}));
    verified = true; break;
  } catch (error) {
    console.log('Waiting for redirect publication: ' + String(error.message).slice(0,200));
    if (Date.now()<deadline) await sleep(Math.min(15000, deadline-Date.now()));
  }
}
if (!verified) throw Error('LEGACY_REDIRECT_PUBLICATION_NOT_VERIFIED');
