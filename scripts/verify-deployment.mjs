// Verify public content independently for each research channel.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {setTimeout as sleep} from 'node:timers/promises';
import Archive from './build-ai-engine-archive.cjs';
const origin=process.env.SITE_URL||'https://danyow.cn';
const base=process.env.SITE_BASE_URL||'/danyow/';
if(!/^https:\/\/[A-Za-z0-9.-]+$/.test(origin)||!/^\/(?:[A-Za-z0-9._-]+\/)*$/.test(base))throw Error('INVALID_SITE_ORIGIN_OR_BASE');
const out=path.resolve('dist');
const digest=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const read=relative=>fs.readFileSync(path.join(out,relative));
const channels=Object.keys(Archive.CHANNELS);
const receipts=channels.flatMap(channel=>{
 const dir=path.join(out,channel,'receipts');
 return fs.existsSync(dir)?fs.readdirSync(dir).filter(p=>/^\d{4}-\d{2}-\d{2}\.json$/.test(p)).sort().reverse().slice(0,3).map(p=>({channel,...JSON.parse(read(channel+'/receipts/'+p))})):[];
});
const revision=process.env.GITHUB_SHA||'local';
const deadline=Date.now()+6*60*1000;
async function request(relative,attempt){
 const url=new URL(base+relative,origin);url.searchParams.set('deployment',revision+'-'+attempt);
 const result=await fetch(url,{headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(10000)});
 if(!result.ok)throw Error('HTTP_'+result.status+':'+relative);
 return Buffer.from(await result.arrayBuffer());
}
async function verify(attempt){
 for(const relative of ['index.html','note/itinerary/index.html','docs/least/index.html',...channels.map(c=>c+'/index.html')]){
  if(digest(await request(relative,attempt))!==digest(read(relative)))throw Error('PUBLISHED_PAGE_VERSION_MISMATCH:'+relative);
 }
 for(const receipt of receipts){
  const prefix=receipt.channel+'/';
  const actual=JSON.parse((await request(prefix+'receipts/'+receipt.date+'.json',attempt)).toString('utf8'));
  if(actual.date!==receipt.date||actual.revision!==receipt.revision||actual.sha256!==receipt.sha256)throw Error('RECEIPT_VERSION_MISMATCH:'+prefix+receipt.date);
  const html=(await request(prefix+receipt.html+'/',attempt)).toString('utf8');
  if(!html.includes('source-sha256:'+receipt.sha256))throw Error('REPORT_PAGE_VERSION_MISMATCH:'+prefix+receipt.date);
  if(digest(await request(prefix+receipt.raw,attempt))!==receipt.sha256)throw Error('RAW_REPORT_HASH_MISMATCH:'+prefix+receipt.date);
 }
}
let success=false;
for(let attempt=1;Date.now()<deadline;attempt++){
 try{
  await verify(attempt);
  console.log(JSON.stringify({publicSite:origin+base,pages:'exact build matched',reports:receipts.map(r=>({channel:r.channel,date:r.date,revision:r.revision,sha256:r.sha256})),attempts:attempt}));success=true;break;
 }catch(error){
  console.log('Waiting for Pages publication: '+String(error.message).slice(0,180));
  if(Date.now()<deadline)await sleep(Math.min(15000,Math.max(0,deadline-Date.now())));
 }
}
if(!success)throw Error('PUBLIC_DEPLOYMENT_NOT_VERIFIED_WITHIN_SIX_MINUTES');
