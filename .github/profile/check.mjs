// Read-only checks for the approved personal profile. Never generate a feed.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const MOTTO = '你做三四月的事，在八九月自有答案。';
export const LINKS = ['https://github.com/danyow', 'https://danyow.cn/', 'https://danyow.vercel.app/'];
export const ASSETS = ['dusk-cover.webp', 'link-github.svg', 'link-website.svg', 'link-mirror.svg'];
const PREFIX = '.github/profile/assets/';
const digest = bytes => createHash('sha256').update(bytes).digest('hex');

export function validateReadme(readme) {
  assert(typeof readme === 'string' && Buffer.byteLength(readme) < 4000, 'PROFILE_MUST_STAY_COMPACT');
  const html = readme.replace(/<!--[\s\S]*?-->/g, '');
  assert((html.match(/<h1\b/g) || []).length === 1 && html.includes('<h1 align="center">danyow</h1>'), 'PROFILE_NAME');
  assert(html.includes(MOTTO) && html.includes('在值得的事上，慢慢变好。'), 'PERSONAL_COPY');
  assert(!/PROFILE:RECENT|profile-report:|index\/recent\.json|<table\b|日报|持续观察/.test(readme), 'NO_REPORT_FEED');
  assert(!/Paul Graham|Independent Developer|mailto:|@gmail\.com|[\u2014]/i.test(html), 'NO_UNAPPROVED_IDENTITY_OR_ATTRIBUTION');
  assert(!/```|\b(?:npm ci|deployment\/source\.json)\b/.test(html), 'NO_OPERATIONS_MANUAL');
  assert(!/<\s*\/?(?:script|style|iframe|object|embed|form|input|picture|source)\b|\s(?:style|class|on\w+)\s*=|javascript:|data:/i.test(html), 'UNSUPPORTED_OR_UNSAFE_HTML');
  for (const m of html.matchAll(/<\/?([a-z][a-z0-9]*)\b/gi)) {
    assert(['p', 'img', 'h1', 'sub', 'br', 'a'].includes(m[1].toLowerCase()), 'UNSUPPORTED_PROFILE_ELEMENT');
  }
  const links = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(links, LINKS, 'ONLY_APPROVED_PUBLIC_LINKS');
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map(m => m[0]);
  assert(images.length === 4, 'BOUNDED_IMAGE_COUNT');
  assert.deepEqual(images.map(tag => tag.match(/src="([^"]+)"/)?.[1]), ASSETS.map(p => PREFIX + p), 'LOCAL_ASSETS_ONLY');
  for (const tag of images) assert(/alt="[^"]+"/.test(tag), 'IMAGE_ALT_REQUIRED');
  assert(/src="\.github\/profile\/assets\/dusk-cover\.webp" width="100%"/.test(html), 'RESPONSIVE_COVER');
  assert(images.slice(1).every(tag => /width="104" height="30"/.test(tag)), 'SMALL_LINK_BUTTONS');
  return true;
}

export function validateSvg(text) {
  assert(text.startsWith('<svg ') && text.includes('xmlns="http://www.w3.org/2000/svg"'), 'SVG_HEADER');
  assert(!/<\s*(?:script|foreignObject|image|use|a|style)\b|\bon\w+\s*=|\b(?:href|src)\s*=|<!ENTITY|<!DOCTYPE/i.test(text), 'SVG_MUST_BE_SELF_CONTAINED');
  assert(/<title>[^<]+<\/title>/.test(text), 'SVG_ACCESSIBLE_TITLE');
  return true;
}

export function validateAssets(read, manifest) {
  assert(manifest.schema === 1 && manifest.kind === 'static-personal-profile', 'ASSET_MANIFEST');
  assert.deepEqual(Object.keys(manifest.files).sort(), [...ASSETS].sort(), 'ASSET_MANIFEST_FILES');
  let total = 0;
  for (const name of ASSETS) {
    const bytes = read(name), item = manifest.files[name];
    assert(Buffer.isBuffer(bytes) && bytes.length === item.bytes && digest(bytes) === item.sha256, 'ASSET_INTEGRITY: ' + name);
    total += bytes.length;
    if (name.endsWith('.webp')) {
      assert(bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP', 'WEBP_HEADER');
      assert(bytes.readUInt32LE(4) + 8 === bytes.length, 'WEBP_CONTAINER_SIZE');
    } else validateSvg(bytes.toString('utf8'));
  }
  assert(total < 80000, 'PROFILE_ASSET_BUDGET');
  return { assets: ASSETS.length, bytes: total };
}

export function validatePublicHtml(html) {
  const articles = html.match(/<article\b[^>]*class="[^"]*markdown-body[^"]*"[^>]*>[\s\S]*?<\/article>/g) || [];
  const profile = articles.find(a => a.includes('dusk-cover.webp'));
  assert(profile, 'PUBLIC_PROFILE_NOT_UPDATED');
  assert(profile.includes(MOTTO) && profile.includes('在值得的事上，慢慢变好。'), 'PUBLIC_PERSONAL_COPY');
  assert(!/PROFILE:RECENT|profile-report:|持续观察|电话语音 Agent|<table\b/.test(profile), 'PUBLIC_FEED_REAPPEARED');
  for (const name of ASSETS) assert(profile.includes(name), 'PUBLIC_ASSET_REFERENCE: ' + name);
  for (const link of LINKS) assert(profile.includes('href="' + link + '"'), 'PUBLIC_LINK: ' + link);
  return true;
}

export function check(root = ROOT) {
  const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
  validateReadme(readme);
  const manifest = JSON.parse(fs.readFileSync(path.join(root, PREFIX, 'manifest.json'), 'utf8'));
  const result = validateAssets(name => fs.readFileSync(path.join(root, PREFIX, name)), manifest);
  for (const old of ['update.mjs', 'update.test.mjs']) {
    assert(!fs.existsSync(path.join(root, '.github/profile', old)), 'LEGACY_FEED_WRITER_MUST_BE_REMOVED');
  }
  console.log(JSON.stringify({ profile: 'valid', readOnly: true, ...result }));
  return result;
}

export async function checkPublic(sha, fetcher = fetch) {
  assert(/^[a-f0-9]{40}$/.test(sha || ''), 'EXPECTED_COMMIT_REQUIRED');
  const base = 'https://raw.githubusercontent.com/danyow/danyow/' + sha + '/';
  async function get(url) {
    const response = await fetcher(url, { redirect: 'error', signal: AbortSignal.timeout(20000),
      headers: { 'User-Agent': 'danyow-profile-check', 'Cache-Control': 'no-cache' } });
    assert(response.status === 200, 'PUBLIC_HTTP_' + response.status);
    const bytes = Buffer.from(await response.arrayBuffer());
    assert(bytes.length < 4000000, 'PUBLIC_RESPONSE_TOO_LARGE');
    return bytes;
  }
  const readme = (await get(base + 'README.md')).toString('utf8');
  validateReadme(readme);
  const manifest = JSON.parse((await get(base + PREFIX + 'manifest.json')).toString('utf8'));
  const files = new Map();
  for (const name of ASSETS) files.set(name, await get(base + PREFIX + name));
  validateAssets(name => files.get(name), manifest);
  validatePublicHtml((await get('https://github.com/danyow')).toString('utf8'));
  console.log(JSON.stringify({ publicProfile: 'verified', commit: sha, assets: ASSETS.length, unauthenticated: true }));
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  try {
    const args = process.argv.slice(2);
    if (args.length === 0) check();
    else if (args.length === 2 && args[0] === '--public') await checkPublic(args[1]);
    else throw Error('READ_ONLY_CHECK: expected no arguments or --public COMMIT_SHA');
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
