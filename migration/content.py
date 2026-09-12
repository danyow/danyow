from pathlib import Path
root=Path.cwd()
def put(name,text):
    p=root/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text.strip()+'\n')
put('scripts/prepare-content.mjs',r'''
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
import YAML from 'yaml';
import Archive from './build-ai-engine-archive.cjs';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export function walk(dir){
 if(!fs.existsSync(dir))return [];
 return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{if(e.isSymbolicLink())throw Error('SYMLINK_NOT_ALLOWED');const p=path.join(dir,e.name);return e.isDirectory()?walk(p):/\.mdx?$/.test(e.name)?[p]:[]}).sort();
}
export function readLegacy(text){
 text=text.replace(/^\uFEFF/,'').replace(/\r\n?/g,'\n');const match=/^---\n([\s\S]*?)\n---(?:\n|$)/.exec(text);
 return {meta:match?(YAML.parse(match[1])||{}):{},body:match?text.slice(match[0].length):text};
}
export function articleDate(value){
 if(value instanceof Date)return value.toISOString().slice(0,10);
 const m=/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/.exec(String(value||''));if(!m)return null;
 const date=`${m[1]}-${m[2].padStart(2,'0')}-${m[3].padStart(2,'0')}`;const parsed=new Date(date+'T00:00:00Z');
 return Number.isFinite(parsed.getTime())&&parsed.toISOString().startsWith(date)?date:null;
}
export function legacyRoute(source,meta={}){
 if(meta.slug)return String(meta.slug).replace(/^\//,'').replace(/\/$/,'');
 let route=source.replace(/\.mdx?$/,'');
 if(source.startsWith('note/')||source.startsWith('docs/')){const parts=route.split('/');if(parts.at(-1).toLowerCase()===parts.at(-2).toLowerCase())parts.pop();route=parts.join('/')}
 return route;
}
export function safeRender(body,source,routes,base){
 const md=new MarkdownIt({html:true,linkify:true,typographer:false,breaks:false});const ids=new Map();
 md.core.ruler.push('preserve-headings-and-source-links',state=>{
  const visit=tokens=>tokens.forEach((token,i)=>{
   if(token.type==='heading_open'){
    const next=tokens[i+1];const text=next?.children?.filter(c=>c.type==='text'||c.type==='code_inline').map(c=>c.content).join('')||next?.content||'';
    let id=text.toLowerCase().trim().replace(/[\s]+/g,'-').replace(/[^\p{L}\p{N}_-]/gu,'');const count=ids.get(id)||0;ids.set(id,count+1);if(count)id+='-'+count;token.attrSet('id',id);
   }
   for(const attr of ['href','src']){
    const value=token.attrGet(attr);if(!value||/^(?:https?:|mailto:|tel:|data:|\/\/|#)/i.test(value))continue;
    const [target,fragment]=value.split('#');let decoded;try{decoded=decodeURIComponent(target)}catch{decoded=target}
    if(decoded.startsWith(base+'/')||decoded===base)continue;
    const sourcePath=decoded.startsWith('/')?decoded.slice(1):path.posix.normalize(path.posix.join(path.posix.dirname(source),decoded));
    if(routes.has(sourcePath))token.attrSet(attr,base+'/'+routes.get(sourcePath)+'/'+(fragment?'#'+fragment:''));
    else if(value.startsWith('/'))token.attrSet(attr,base+value);
   }
   if(token.type==='link_open'&&/^https?:\/\//.test(token.attrGet('href')||''))token.attrSet('rel','noopener noreferrer');
   if(token.children)visit(token.children);
  });visit(state.tokens);
 });
 const html=md.render(body.replace(/^\s*# [^\n]+\n?/,'').replace(/^Title:\s*/gm,''));
 return sanitizeHtml(html,{allowedTags:[...sanitizeHtml.defaults.allowedTags,'img','figure','figcaption','details','summary'],allowedAttributes:{'*':['id','class'],'a':['href','title','rel'],'img':['src','alt','title','width','height','loading']},allowedSchemes:['http','https','mailto','tel'],allowedSchemesByTag:{img:['http','https','data']}});
}
export function prepare(root=ROOT,baseUrl=process.env.SITE_BASE_URL||'/danyow/'){
 if(!/^\/(?:[A-Za-z0-9._-]+\/)*$/.test(baseUrl))throw Error('INVALID_BASE_URL');const base=baseUrl.replace(/\/$/,'');Archive.build(root,{baseUrl});
 const entries=[];const routes=new Map();const stats={note:0,docs:0,blog:0,news:0,drafts:0};
 for(const kind of ['note','docs','blog'])for(const file of walk(path.join(root,kind))){
  const source=path.relative(root,file).split(path.sep).join('/');const {meta,body}=readLegacy(fs.readFileSync(file,'utf8'));
  if(meta.published===false||meta.draft===true){stats.drafts++;continue;}
  const route=legacyRoute(source,meta);routes.set(source,route);const h1=/^#\s+(.+)$/m.exec(body);const title=String(meta.title||h1?.[1]||path.basename(file,'.md'));
  const categories=Array.isArray(meta.tags)?meta.tags:Array.isArray(meta.categories)?meta.categories:String(meta.categories||'').split(/\s+/);
  entries.push({source,route,kind,label:({note:'笔记',docs:'文档',blog:'旧博客'})[kind],title,date:articleDate(meta.date)||articleDate(typeof meta.published==='boolean'?null:meta.published),body,tags:categories.filter(t=>typeof t==='string'&&t.trim()&&!/[\/<>]/.test(t)),placeholder:!body.replace(/^# [^\n]+\n?/,'').trim(),aliases:[],description:String(meta.description||'')});stats[kind]++;
 }
 for(const report of Archive.load(root)){
  const {meta,body,file,sha256}=report;
  entries.push({source:file,route:'ai-engine-watch/reports/'+meta.date,kind:'news',label:'AI 引擎日报',title:'AI 引擎日报｜'+meta.date,date:meta.date,body,description:meta.summary.join(' '),tags:['AI','游戏引擎','日报'],placeholder:false,aliases:[],sha256,revision:meta.revision,raw:`raw/${meta.date.slice(0,4)}/${meta.date.slice(5,7)}/${meta.date}.md`});stats.news++;
 }
 const unique=new Set();for(const e of entries){if(unique.has(e.route))throw Error('DUPLICATE_ROUTE '+e.route);unique.add(e.route)}
 for(const e of entries){e.html=safeRender(e.body,e.source,routes,base);e.plain=sanitizeHtml(e.html,{allowedTags:[],allowedAttributes:{}}).replace(/&[^;]+;/g,' ').replace(/\s+/g,' ').trim();if(!e.description)e.description=e.placeholder?'保留原始提纲，待补充。':e.plain.slice(0,82)+(e.plain.length>82?'…':'');delete e.body;}
 entries.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.route.localeCompare(b.route,'zh-CN'));
 fs.mkdirSync(path.join(root,'.generated'),{recursive:true});fs.writeFileSync(path.join(root,'.generated/site-content.json'),JSON.stringify({schema:1,stats,entries},null,2)+'\n');
 fs.writeFileSync(path.join(root,'static/search-index.json'),JSON.stringify(entries.map(e=>({title:e.title,url:base+'/'+e.route+'/',text:e.plain,date:e.date,label:e.label})))+'\n');return {stats,entries};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log(JSON.stringify(prepare().stats));
''')
put('scripts/check-site.mjs',r'''
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
''')
put('tests/content-migration.test.mjs',r'''
import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {readLegacy,legacyRoute,articleDate,safeRender} from '../scripts/prepare-content.mjs';
test('legacy boolean published is not a date',()=>{assert.equal(articleDate(true),null);assert.equal(readLegacy('---\ntitle: test\npublished: false\n---\n# Draft').meta.published,false)});
test('legacy date formats retain original day',()=>{assert.equal(articleDate('2019-8-2 17:00:00 +0800'),'2019-08-02');assert.equal(articleDate('2020/6/14 14:55:00 +0800'),'2020-06-14');assert.equal(articleDate(undefined),null)});
test('folder home routes preserve old URLs',()=>{assert.equal(legacyRoute('note/csharp/csharp.md'),'note/csharp');assert.equal(legacyRoute('note/framework/Framework.md'),'note/framework');assert.equal(legacyRoute('note/framework/ETFramework.md'),'note/framework/ETFramework');assert.equal(legacyRoute('docs/least.md'),'docs/least')});
test('nested blog URLs preserve original path',()=>assert.equal(legacyRoute('blog/2019/python/object.md'),'blog/2019/python/object'));
test('relative original links use preserved routes',()=>assert.match(safeRender('[b](../docs/least.md)','note/a.md',new Map([['docs/least.md','docs/least']]),'/danyow'),/href="\/danyow\/docs\/least\/"/));
test('raw scripts and event handlers removed',()=>{const h=safeRender('# hi\n<script>alert(1)</script><img src="https://example.org/x.png" onerror="alert(2)">','docs/a.md',new Map(),'/danyow');assert.ok(!h.includes('<script'));assert.ok(!h.includes('onerror'));assert.ok(h.includes('<img'))});
test('draft source retained in repository',()=>assert.ok(fs.existsSync('blog/2019/voyager.md')));
test('theme config excludes author services',()=>{const t=fs.readFileSync('src/config.ts','utf8');assert.ok(!t.includes('radishzz'));assert.ok(/mode:\s*'dark'/.test(t))});
''')
# Fix the concise legacy redirect route independently of content rendering.
put('src/pages/blog/[...legacy].astro',r'''
---
import {base} from '@/config'
export function getStaticPaths(){return ['archive','page/2','page/3'].map(legacy=>({params:{legacy}}))}
return Astro.redirect(base+'/blog/',301)
---
''')
