// Validate the public catalogue and image bytes. No private archive links are published.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath, pathToFileURL} from 'node:url';
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const HASH = /^[a-f0-9]{64}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const IMAGE = /^gallery\/images\/(?:history|\d{4}\/\d{2})\/[a-z0-9]+(?:-[a-z0-9]+)*\.webp$/;
function keys(value, expected) { assert(value && typeof value === 'object' && !Array.isArray(value)); assert.deepEqual(Object.keys(value).sort(), [...expected].sort(), 'UNEXPECTED_METADATA_FIELD'); }
export function validDate(value) {
  assert(typeof value === 'string' && DATE.test(value), 'INVALID_DATE');
  const date = new Date(value + 'T00:00:00Z');
  assert(Number.isFinite(date.valueOf()) && date.toISOString().slice(0,10) === value, 'INVALID_DATE');
}
export function webpDimensions(bytes) {
  assert(Buffer.isBuffer(bytes) && bytes.length >= 30 && bytes.toString('ascii',0,4) === 'RIFF' && bytes.toString('ascii',8,12) === 'WEBP', 'INVALID_WEBP');
  assert(bytes.readUInt32LE(4) + 8 === bytes.length, 'TRUNCATED_WEBP');
  for (let pos = 12; pos + 8 <= bytes.length;) {
    const kind = bytes.toString('ascii',pos,pos+4), size = bytes.readUInt32LE(pos+4), start = pos+8;
    assert(start + size <= bytes.length, 'TRUNCATED_WEBP_CHUNK');
    if (kind === 'VP8X') { assert(size >= 10 && !(bytes[start] & 2), 'ANIMATED_WEBP_NOT_ALLOWED'); return [bytes.readUIntLE(start+4,3)+1, bytes.readUIntLE(start+7,3)+1]; }
    if (kind === 'VP8 ') { assert(size >= 10 && bytes.subarray(start+3,start+6).equals(Buffer.from([157,1,42])), 'INVALID_VP8'); return [bytes.readUInt16LE(start+6)&16383,bytes.readUInt16LE(start+8)&16383]; }
    if (kind === 'VP8L') { assert(size >= 5 && bytes[start] === 47, 'INVALID_VP8L'); const bits=bytes.readUInt32LE(start+1); return [(bits&16383)+1,((bits>>>14)&16383)+1]; }
    pos=start+size+(size%2);
  }
  throw Error('MISSING_IMAGE_CHUNK');
}
export function validateCatalog(catalog, read = null) {
  keys(catalog,['schema','collection','entries']);
  assert(catalog.schema === 1 && catalog.collection === 'danyow-image-archive', 'INVALID_CATALOG');
  assert(Array.isArray(catalog.entries) && catalog.entries.length > 0 && catalog.entries.length <= 10000, 'INVALID_ENTRY_COUNT');
  const ids = new Set(), paths = new Set(), originals = new Set();
  for (const e of catalog.entries) {
    keys(e,['id','title','category','caption','created_on','archived_on','generated','original','image','order']);
    assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.id) && e.id.length <= 100 && !ids.has(e.id), 'DUPLICATE_OR_INVALID_ID'); ids.add(e.id);
    assert(['background','avatar','concept'].includes(e.category) && e.generated === true, 'INVALID_CATEGORY');
    for (const k of ['title','caption']) assert(typeof e[k] === 'string' && e[k].trim() && e[k].length <= 160 && !/[<>\x00-\x1f]/.test(e[k]), 'INVALID_PUBLIC_TEXT');
    validDate(e.archived_on); if(e.created_on !== null) { validDate(e.created_on); assert(e.created_on <= e.archived_on, 'DATE_ORDER'); }
    assert(Number.isInteger(e.order) && e.order >= 0, 'INVALID_ORDER');
    keys(e.original,['sha256','bytes','width','height']); keys(e.image,['path','sha256','bytes','width','height','format','representation']);
    for (const item of [e.original,e.image]) {
      assert(typeof item.sha256 === 'string' && HASH.test(item.sha256), 'INVALID_HASH');
      assert(Number.isInteger(item.bytes) && item.bytes > 0 && item.bytes <= 50000000, 'INVALID_BYTES');
      assert([item.width,item.height].every(n => Number.isInteger(n) && n > 0 && n <= 10000), 'INVALID_DIMENSIONS');
    }
    assert(!originals.has(e.original.sha256), 'DUPLICATE_ORIGINAL'); originals.add(e.original.sha256);
    assert(IMAGE.test(e.image.path) && !paths.has(e.image.path), 'UNSAFE_OR_DUPLICATE_IMAGE_PATH'); paths.add(e.image.path);
    assert(e.image.format === 'image/webp' && e.image.representation === 'optimized-preview' && e.image.bytes <= 400000, 'PREVIEW_CONTRACT');
    if (read) { const b=read(e.image.path); assert(b.length === e.image.bytes && digest(b) === e.image.sha256, 'IMAGE_INTEGRITY: '+e.id); assert.deepEqual(webpDimensions(b),[e.image.width,e.image.height], 'IMAGE_DIMENSIONS: '+e.id); }
  }
  return {images:ids.size,categories:[...new Set(catalog.entries.map(e=>e.category))]};
}
export function check(root = ROOT) {
  const catalog=JSON.parse(fs.readFileSync(path.join(root,'gallery/catalog.json'),'utf8'));
  const result=validateCatalog(catalog,p=>fs.readFileSync(path.join(root,'static',p)));
  console.log(JSON.stringify({gallery:'valid',...result})); return result;
}
if(process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  try { check(); } catch(e) { console.error(e); process.exitCode=1; }
}
