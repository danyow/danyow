import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
const root=process.cwd(),out=path.join(root,'dist');const data=JSON.parse(fs.readFileSync(path.join(root,'.generated/site-content.json'),'utf8'));const base=(process.env.SITE_BASE_URL||'/danyow/').replace(/\/$/,'');let checked=0;const failures=[];
function exists(url,file){
 if(/^(https?:|mailto:|tel:|data:|\/\/)/i.test(url))return;
 let u;try{u=new URL(url.replace(/&amp;/g,'&'),'https://site.invalid'+base+'/'+path.relative(out,file).replace(/index\.html$/,''))}catch{return}
 let p;try{p=decodeURIComponent(u.pathname)}catch{p=u.pathname}
 if(!p.startsWith(base+'/')){failures.push('BASE_PATH '+file+' -> '+url);return;}
 p=p.slice(base.length+1);const target=path.join(out,p);
 if(!fs.existsSync(target)&&!fs.existsSync(path.join(target,'index.html'))&&!fs.existsSync(target+'.html'))failures.push(path.relative(out,file)+' -> '+url);
}
function crawl(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){
 const p=path.join(dir,item.name);if(item.isDirectory()){crawl(p);continue}if(!item.name.endsWith('.html'))continue;
 const html=fs.readFileSync(p,'utf8');checked++;for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g))exists(m[1],p);
 for(const forbidden of ['retypeset-comment.radishzz.cc','views.radishzz.cc','api.apiflash.com','googletagmanager.com'])if(html.includes(forbidden))failures.push('UNEXPECTED_SERVICE '+p);
}}
crawl(out);
for(const e of data.entries){
 const p=path.join(out,e.route,'index.html');if(!fs.existsSync(p)){failures.push('MISSING_ORIGINAL '+e.source);continue;}
 if(e.kind==='news'){const receipt=JSON.parse(fs.readFileSync(path.join(out,'ai-engine-watch/receipts',e.date+'.json'),'utf8'));const raw=fs.readFileSync(path.join(out,'ai-engine-watch',e.raw));const digest=crypto.createHash('sha256').update(raw).digest('hex');if(receipt.sha256!==digest||digest!==e.sha256||!fs.readFileSync(p,'utf8').includes('source-sha256:'+digest))failures.push('HASH_MISMATCH '+e.date);}
}
if(failures.length){console.error(failures.join('\n'));process.exitCode=1}else console.log(JSON.stringify({html_pages:checked,entries:data.stats,links:'passed',receipts:'matched',analytics:'none'}));
