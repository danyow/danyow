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
 if(!/^\/(?:[A-Za-z0-9._-]+\/)*$/.test(baseUrl))throw Error('INVALID_BASE_URL');const base=baseUrl.replace(/\/$/,'');
 // Validate every channel before replacing any generated output.
 for(const channel of Object.keys(Archive.CHANNELS)) Archive.load(root,{channel});
 for(const channel of Object.keys(Archive.CHANNELS)) Archive.build(root,{baseUrl,channel});
 const entries=[];const routes=new Map();const stats={note:0,docs:0,blog:0,news:0,drafts:0};
 for(const kind of ['note','docs','blog'])for(const file of walk(path.join(root,kind))){
  const source=path.relative(root,file).split(path.sep).join('/');const {meta,body}=readLegacy(fs.readFileSync(file,'utf8'));
  if(meta.published===false||meta.draft===true){stats.drafts++;continue;}
  const route=legacyRoute(source,meta);routes.set(source,route);const h1=/^#\s+(.+)$/m.exec(body);const title=String(meta.title||h1?.[1]||path.basename(file,'.md'));
  const categories=Array.isArray(meta.tags)?meta.tags:Array.isArray(meta.categories)?meta.categories:String(meta.categories||'').split(/\s+/);
  entries.push({source,route,kind,label:({note:'笔记',docs:'文档',blog:'旧博客'})[kind],title,date:articleDate(meta.date)||articleDate(typeof meta.published==='boolean'?null:meta.published),body,tags:categories.filter(t=>typeof t==='string'&&t.trim()&&!/[\/<>]/.test(t)),placeholder:!body.replace(/^# [^\n]+\n?/,'').trim(),aliases:[],description:String(meta.description||'')});stats[kind]++;
 }
 for(const [channel,info] of Object.entries(Archive.CHANNELS))for(const report of Archive.load(root,{channel})){
  const {meta,body,file,sha256}=report;
  entries.push({source:file,route:channel+'/reports/'+meta.date,channel,kind:'news',label:info.label,title:info.label+'｜'+meta.date,date:meta.date,body,description:meta.summary.join(' '),tags:info.tags,placeholder:false,aliases:[],sha256,revision:meta.revision,raw:`raw/${meta.date.slice(0,4)}/${meta.date.slice(5,7)}/${meta.date}.md`});stats.news++;
 }
 const unique=new Set();for(const e of entries){if(unique.has(e.route))throw Error('DUPLICATE_ROUTE '+e.route);unique.add(e.route)}
 for(const e of entries){e.html=safeRender(e.body,e.source,routes,base);e.plain=sanitizeHtml(e.html,{allowedTags:[],allowedAttributes:{}}).replace(/&[^;]+;/g,' ').replace(/\s+/g,' ').trim();if(!e.description)e.description=e.placeholder?'保留原始提纲，待补充。':e.plain.slice(0,82)+(e.plain.length>82?'…':'');delete e.body;}
 entries.sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.route.localeCompare(b.route,'zh-CN'));
 fs.mkdirSync(path.join(root,'.generated'),{recursive:true});fs.writeFileSync(path.join(root,'.generated/site-content.json'),JSON.stringify({schema:1,stats,entries},null,2)+'\n');
 fs.writeFileSync(path.join(root,'static/search-index.json'),JSON.stringify(entries.map(e=>({title:e.title,url:base+'/'+e.route+'/',text:e.plain,date:e.date,label:e.label})))+'\n');return {stats,entries};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log(JSON.stringify(prepare().stats));
