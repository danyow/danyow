import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { ROOT, LINKS, ASSETS, MOTTO, check, validateReadme, validateSvg, validateAssets, validatePublicHtml, checkPublic } from './check.mjs';

const readme = fs.readFileSync(ROOT + '/README.md', 'utf8');
const prefix = ROOT + '/.github/profile/assets/';
const manifest = JSON.parse(fs.readFileSync(prefix + 'manifest.json'));
const read = name => fs.readFileSync(prefix + name);
const rendered = '<article class="markdown-body entry-content">' + readme + '</article>';

test('approved compact personal profile and local asset checks pass', () => {
  assert(validateReadme(readme)); assert.equal(check().assets, 4);
});
test('legacy report blocks and card grids cannot return', () => {
  for (const addition of ['<!-- PROFILE:RECENT:START -->', '<table></table>', '持续观察', '日报']) {
    assert.throws(() => validateReadme(readme + addition), /NO_REPORT_FEED/);
  }
});
test('personal identity and original Chinese motto are retained', () => {
  assert.throws(() => validateReadme(readme.replace('>danyow</h1>', '>someone</h1>')), /PROFILE_NAME/);
  assert.throws(() => validateReadme(readme.replace(MOTTO, 'another quote')), /PERSONAL_COPY/);
});
test('unconfirmed biography, emails and invented quote attribution are rejected', () => {
  for (const text of ['Paul Graham', 'Independent Developer', 'mailto:private@example.test']) {
    assert.throws(() => validateReadme(readme + text), /UNAPPROVED/);
  }
});
test('only the three approved public links and local images are accepted', () => {
  assert.throws(() => validateReadme(readme.replace(LINKS[1], 'https://evil.test/')), /APPROVED_PUBLIC_LINKS/);
  assert.throws(() => validateReadme(readme.replace('.github/profile/assets/dusk-cover.webp', 'https://tracker.test/pixel')), /LOCAL_ASSETS/);
});
test('unsafe or GitHub-unsupported HTML is rejected', () => {
  for (const text of ['<script>bad()</script>', '<style>body{}</style>', '<p style="color:red">bad</p>', '<img onerror="bad()">']) {
    assert.throws(() => validateReadme(readme + text), /UNSUPPORTED_OR_UNSAFE/);
  }
});
test('native personal text and meaningful image alternatives remain available', () => {
  assert.throws(() => validateReadme(readme.replace('alt="Website · 个人网站"', 'alt=""')), /ALT_REQUIRED/);
  assert.throws(() => validateReadme(readme.replace('width="100%"', 'width="2000"')), /RESPONSIVE/);
});
test('the committed art and all icons match exact binary hashes', () => {
  assert.equal(validateAssets(read, manifest).assets, 4);
  assert.throws(() => validateAssets(name => name.endsWith('.webp') ? Buffer.from('corrupt') : read(name), manifest), /INTEGRITY/);
});
test('SVG files cannot execute code or load remote images', () => {
  const original = read('link-website.svg').toString();
  assert(validateSvg(original));
  for (const addition of ['<script>bad()</script>', '<image href="https://evil.test"/>', '<foreignObject/>', '<g onload="bad()"/>']) {
    assert.throws(() => validateSvg(original.replace('</svg>', addition + '</svg>')), /SELF_CONTAINED/);
  }
});
test('public render validation checks the README, not arbitrary page text', () => {
  assert(validatePublicHtml(rendered));
  assert.throws(() => validatePublicHtml('<p>not the profile</p>'), /NOT_UPDATED/);
  assert.throws(() => validatePublicHtml(rendered.replace('</article>', '<table></table></article>')), /FEED_REAPPEARED/);
});
test('public check verifies pinned assets and public HTML without credentials', async () => {
  const sha = 'a'.repeat(40), calls = [];
  await checkPublic(sha, async (url, options) => {
    calls.push(url); assert(!options.headers.Authorization); assert.equal(options.redirect, 'error');
    if (url === 'https://github.com/danyow') return new Response(rendered);
    assert(url.includes('/' + sha + '/'));
    if (url.endsWith('/README.md')) return new Response(readme);
    if (url.endsWith('/manifest.json')) return Response.json(manifest);
    return new Response(read(url.split('/').at(-1)));
  });
  assert.equal(calls.length, 7);
});
test('public HTTP failures cannot be reported as success', async () => {
  await assert.rejects(checkPublic('a'.repeat(40), async () => new Response('no', { status: 503 })), /HTTP_503/);
});
test('the checker is read-only and has no legacy write command', () => {
  const before = fs.readFileSync(ROOT + '/README.md');
  const result = spawnSync(process.execPath, [ROOT + '/.github/profile/check.mjs', '--write'], { encoding: 'utf8' });
  assert.equal(result.status, 1); assert(result.stderr.includes('READ_ONLY_CHECK'));
  check(); assert.deepEqual(fs.readFileSync(ROOT + '/README.md'), before);
});
