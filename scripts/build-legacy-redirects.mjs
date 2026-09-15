// The project Pages site is a redirect-only entrance to the canonical root site.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const ORIGIN = 'https://danyow.cn';
export const MARKER = 'danyow-legacy-redirect-v1';

// Self-contained so exactly the same implementation can run in the browser.
export function redirectTarget(href) {
  let current;
  try { current = new URL(href); } catch { return null; }
  if (!['http:', 'https:'].includes(current.protocol) ||
      !['danyow.cn', 'danyow.github.io'].includes(current.hostname)) return null;
  const prefix = '/danyow';
  let pathname = current.pathname;
  if (pathname !== prefix && !pathname.startsWith(prefix + '/')) return null;
  // This is a retired namespace, including accidentally duplicated old prefixes.
  while (pathname === prefix || pathname.startsWith(prefix + '/')) {
    pathname = pathname.slice(prefix.length) || '/';
    pathname = '/' + pathname.replace(/^\/+/, '');
  }
  const target = new URL('https://danyow.cn/');
  target.pathname = pathname; // Fixed origin: never interpret a path as another host.
  target.search = current.search;
  target.hash = current.hash;
  if (target.pathname === prefix || target.pathname.startsWith(prefix + '/')) return null;
  return target.href;
}

const escape = value => String(value).replace(/[&<>"']/g,
  c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));

export function redirectPage(targetPath = null) {
  if (targetPath !== null && (!targetPath.startsWith('/') || targetPath.startsWith('//') ||
      /[\\\r\n?#]/.test(targetPath) || targetPath === '/danyow' || targetPath.startsWith('/danyow/'))) {
    throw Error('INVALID_REDIRECT_TARGET');
  }
  const target = new URL(ORIGIN + (targetPath || '/')).href;
  const canonical = targetPath === null ? '' : `<link rel="canonical" href="${escape(target)}">`;
  const noScript = targetPath === null ? '' : `<noscript><meta http-equiv="refresh" content="0;url=${escape(target)}"></noscript>`;
  return `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>正在前往新地址</title><meta name="robots" content="noindex,follow">
<meta name="legacy-redirect" content="${MARKER}">${canonical}${noScript}
<script>(function(){const target=(${redirectTarget.toString()})(window.location.href);if(target)window.location.replace(target);})();</script>
</head><body><p>页面已搬到新地址。<a id="destination" href="${escape(target)}">前往新页面</a></p>
<script>(function(){const target=(${redirectTarget.toString()})(window.location.href);if(target)document.getElementById('destination').href=target;})();</script>
</body></html>\n`;
}

function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(entry => {
    const file = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) throw Error('SYMLINK_NOT_ALLOWED');
    return entry.isDirectory() ? walk(file) : [file];
  }).sort();
}

export function buildRedirects(input = 'dist', output = '.generated/legacy-redirects', sourceCommit = 'local') {
  input = path.resolve(input); output = path.resolve(output);
  if (input === output || input.startsWith(output + path.sep) || output.startsWith(input + path.sep) ||
      path.dirname(output) === output || output === process.cwd()) throw Error('UNSAFE_OUTPUT_DIRECTORY');
  if (!fs.existsSync(path.join(input, 'index.html'))) throw Error('ROOT_BUILD_MISSING');
  if (fs.lstatSync(input).isSymbolicLink() || (fs.existsSync(output) && fs.lstatSync(output).isSymbolicLink())) throw Error('SYMLINK_NOT_ALLOWED');
  if (sourceCommit !== 'local' && !/^[a-f0-9]{40}$/.test(sourceCommit)) throw Error('INVALID_SOURCE_COMMIT');
  const pages = walk(input).filter(file => file.endsWith('.html')).map(file => {
    const relative = path.relative(input, file).split(path.sep).join('/');
    if (relative === '404.html') return null;
    if (relative.startsWith('danyow/')) throw Error('ROOT_BUILD_CONTAINS_LEGACY_NAMESPACE');
    const targetPath = '/' + relative.replace(/(^|\/)index\.html$/, '$1');
    return {file:relative, targetPath, html:redirectPage(targetPath)};
  }).filter(Boolean);
  fs.rmSync(output, {recursive:true, force:true});
  for (const page of [...pages, {file:'404.html', html:redirectPage()}]) {
    const destination = path.join(output, page.file);
    fs.mkdirSync(path.dirname(destination), {recursive:true});
    fs.writeFileSync(destination, page.html, 'utf8');
  }
  fs.writeFileSync(path.join(output, '.nojekyll'), '');
  const manifest = {schema:1, mode:'client-redirect-only', marker:MARKER,
    from_prefix:'/danyow', target_origin:ORIGIN, source_commit:sourceCommit,
    routes:pages.map(p => ({from:'/danyow' + p.targetPath, to:ORIGIN + p.targetPath}))};
  fs.writeFileSync(path.join(output, 'redirect-manifest.json'), JSON.stringify(manifest) + '\n');
  return {pages:pages.length, output, source_commit:sourceCommit, mode:manifest.mode};
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(buildRedirects(process.argv[2], process.argv[3], process.env.GITHUB_SHA || 'local')));
}
