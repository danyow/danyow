import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {ROOT,validateCatalog,digest,webpDimensions} from './check.mjs';
export async function verify(origin, fetcher=fetch) {
  assert(['https://danyow.cn','https://danyow.vercel.app'].includes(origin),'UNAPPROVED_GALLERY_ORIGIN');
  const expected=JSON.parse(fs.readFileSync(path.join(ROOT,'gallery/catalog.json'),'utf8'));
  async function get(relative) {
    const response=await fetcher(origin+relative,{redirect:'error',headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(15000)});
    assert(response.status===200,'GALLERY_HTTP_'+response.status+': '+relative);
    const bytes=Buffer.from(await response.arrayBuffer());assert(bytes.length<5000000,'OVERSIZED_GALLERY_RESPONSE');return bytes;
  }
  const nonce='?verify='+digest(Buffer.from(JSON.stringify(expected))).slice(0,16);
  const actual=JSON.parse((await get('/gallery/catalog.json'+nonce)).toString('utf8'));
  validateCatalog(actual); assert.deepEqual(actual,expected,'GALLERY_CATALOG_VERSION_PENDING');
  const html=(await get('/gallery/'+nonce)).toString('utf8');
  assert(html.includes('图集')&&html.includes('AI 生成')&&!html.includes('http-equiv="refresh"'),'NOT_GALLERY_PAGE');
  for(const e of actual.entries){
    assert(html.includes(e.image.path),'GALLERY_ENTRY_MISSING: '+e.id);
    const bytes=await get('/'+e.image.path);
    assert(bytes.length===e.image.bytes&&digest(bytes)===e.image.sha256,'PUBLIC_IMAGE_MISMATCH: '+e.id);
    assert.deepEqual(webpDimensions(bytes),[e.image.width,e.image.height]);
  }
  const receipt=JSON.parse((await get('/.well-known/danyow-deployment.json'+nonce)).toString('utf8'));
  assert(receipt.schema===1&&receipt.source_repository==='danyow/danyow'&&receipt.base==='/'&&/^[a-f0-9]{40}$/.test(receipt.source_commit),'INVALID_ROOT_RECEIPT');
  console.log(JSON.stringify({publicGallery:'verified',origin,images:actual.entries.length,source_commit:receipt.source_commit,request_commit:receipt.request_commit}));
  return true;
}
if(process.argv[1]&&pathToFileURL(path.resolve(process.argv[1])).href===import.meta.url){
  verify(process.argv[2]).catch(e=>{console.error(e.message);process.exitCode=1});
}
