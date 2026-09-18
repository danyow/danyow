// One-time, hash-verified binary transport for the nine approved archive images.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const hash=(b,algorithm='sha256')=>createHash(algorithm).update(b).digest('hex');
const manifest=JSON.parse(fs.readFileSync('.github/gallery/import.json','utf8'));
assert(manifest.schema===1 && manifest.files.length===8, 'INVALID_IMPORT');
const outputs=[],remove=[],errors=[];
for(const entry of manifest.files){
 assert(/^[a-z]+(?:-[a-z]+)*$/.test(entry.id)&&Number.isInteger(entry.bytes)&&entry.bytes<20000,'INVALID_IMAGE_SPEC');
 let encoded='';
 for(let i=0;i<entry.parts.length;i++){
  const file='.github/gallery/imports/'+entry.id+'-'+String(i).padStart(2,'0')+'.b64';
  const bytes=fs.readFileSync(file);
  const actual=hash(Buffer.concat([Buffer.from('blob '+bytes.length+'\0'),bytes]),'sha1');
  if(actual!==entry.parts[i]) errors.push(file+': expected '+entry.parts[i]+' got '+actual);
  encoded+=bytes.toString('ascii').trim();remove.push(file);
 }
 assert(/^[A-Za-z0-9+/]*={0,2}$/.test(encoded),'INVALID_BASE64');
 const bytes=Buffer.from(encoded,'base64');
 if(bytes.length!==entry.bytes||hash(bytes)!==entry.sha256) errors.push(entry.id+': decoded file integrity mismatch');
 outputs.push({file:'static/gallery/images/history/'+entry.id+'.webp',bytes});
}
if(errors.length) throw Error(errors.join('\n'));
for(const {file,bytes} of outputs){
 assert(bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WEBP'&&bytes.readUInt32LE(4)+8===bytes.length,'INVALID_WEBP');
 assert(!fs.existsSync(file),'REFUSE_OVERWRITE');
}
for(const {file,bytes} of outputs){fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,bytes);console.log(file+' sha256='+hash(bytes));}
for(const file of remove)fs.unlinkSync(file);
fs.unlinkSync('.github/gallery/import.json');
console.log('All archive binaries reconstructed with exact hashes.');
