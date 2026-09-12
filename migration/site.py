from pathlib import Path
import json
root=Path.cwd()
def put(name,text):
    p=root/name; p.parent.mkdir(parents=True,exist_ok=True); p.write_text(text.strip()+'\n')
put('package.json',json.dumps({'name':'danyow-news','version':'1.0.0','private':True,'type':'module','engines':{'node':'>=22.16.0'},'scripts':{'dev':'node scripts/prepare-content.mjs && astro dev','start':'npm run dev','build':'node scripts/prepare-content.mjs && astro build && node scripts/check-site.mjs','preview':'astro preview','test':'node --test tests/*.test.cjs tests/*.test.mjs','archive:test':'node --test tests/ai-engine-archive.test.cjs tests/ai-engine-bridge.test.cjs','archive:build':'node scripts/build-ai-engine-archive.cjs','check':'node scripts/prepare-content.mjs && astro check'},'dependencies':{'astro':'6.1.5','markdown-it':'14.1.1','sanitize-html':'2.17.2','yaml':'2.8.2','unocss':'66.6.8','@unocss/astro':'66.6.8','@unocss/preset-attributify':'66.6.8','unocss-preset-theme':'0.14.1'},'devDependencies':{'@astrojs/check':'0.9.8','@types/node':'25.6.0','@types/markdown-it':'14.1.2','@types/sanitize-html':'2.16.1','typescript':'6.0.2'}},ensure_ascii=False,indent=2))
put('astro.config.ts',r'''
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import { themeConfig } from './src/config'
export default defineConfig({
  site: themeConfig.site.url, base: themeConfig.site.base,
  output: 'static', outDir: './dist', trailingSlash: 'always', publicDir: './static',
  integrations: [UnoCSS({ injectReset: true })], devToolbar: { enabled: false },
})
''')
put('src/config.ts',r'''
import type { ThemeConfig } from '@/types'
const siteBase = process.env.SITE_BASE_URL || '/danyow/'
if (!/^\/(?:[A-Za-z0-9._-]+\/)*$/.test(siteBase)) throw new Error('INVALID_BASE_URL')
export const themeConfig: ThemeConfig = {
  site: {title:'Danyow',subtitle:'技术在变，慢慢看。',description:'关于 AI、游戏开发与新工具的短资讯。保留值得再读的笔记与文档。',i18nTitle:false,author:'danyow',url:'https://danyow.cn',base:siteBase,favicon:'/icons/favicon.svg'},
  color: {
    mode:'dark',
    light:{primary:'oklch(25% 0.005 298)',secondary:'oklch(40% 0.005 298)',background:'oklch(96% 0.005 298)',highlight:'oklch(0.93 0.195089 103.2532 / 0.5)'},
    dark:{primary:'oklch(92% 0.005 298)',secondary:'oklch(77% 0.005 298)',background:'oklch(22% 0.005 298)',highlight:'oklch(0.93 0.195089 103.2532 / 0.2)'},
  },
  global:{locale:'zh',moreLocales:[],fontStyle:'sans',dateFormat:'YYYY-MM-DD',toc:false,katex:false,reduceMotion:true},
  comment:{enabled:false},seo:{},preload:{},
  footer:{startYear:2019,links:[{name:'RSS',url:'/rss.xml'},{name:'GitHub',url:'https://github.com/danyow/danyow'}]},
}
export const base = siteBase.replace(/\/$/,'')
export const defaultLocale = themeConfig.global.locale
export const moreLocales = themeConfig.global.moreLocales
export const allLocales = [defaultLocale,...moreLocales]
''')
put('src/i18n/config.ts',"export type Language = 'zh'")
put('src/i18n/ui.ts',"export const ui = {zh:{title:'Danyow',subtitle:'技术在变，慢慢看。',description:'AI 与游戏开发观察'}}")
put('src/i18n/lang.ts',"import type { Language } from './config'\nexport const getLangFromPath = (_path: string): Language => 'zh'\nexport const getNextGlobalLang = (_lang: Language): Language => 'zh'")
put('src/i18n/path.ts',r'''
import type { Language } from './config'
import { base } from '@/config'
export function getLocalizedPath(path:string,_lang?:Language) {return base+'/'+path.replace(/^\/|\/$/g,'')+(path==='/'?'':'/')}
''')
put('src/utils/page.ts',r'''
import { base } from '@/config'
import { getLocalizedPath } from '@/i18n/path'
export function getPageInfo(path:string) {
  const p=path.slice(base.length).replace(/\/$/,'')
  const isPost=['ai-engine-watch/reports','note','docs','blog'].some(kind=>p.startsWith('/'+kind+'/'))
  return {currentLang:'zh' as const,isPost,isHome:!p,getLocalizedPath:(target:string)=>getLocalizedPath(target,'zh')}
}
''')
put('src/types/global.d.ts',"import type { AttributifyAttributes } from '@unocss/preset-attributify'\ndeclare global { namespace astroHTML.JSX { interface HTMLAttributes extends AttributifyAttributes {} } }\nexport {}")
put('src/layouts/Head.astro',r'''
---
import { base,themeConfig } from '@/config'
interface Props {postTitle?:string;postDescription?:string;noindex?:boolean}
const {postTitle,postDescription,noindex=false}=Astro.props
const title=postTitle?`${postTitle} | Danyow`:'Danyow · AI 与游戏观察'
const description=postDescription||themeConfig.site.description
const canonical=new URL(Astro.url.pathname,themeConfig.site.url)
---
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="generator" content={Astro.generator} />
<title>{title}</title><meta name="description" content={description} />
<meta name="theme-color" content="#202024" /><meta name="color-scheme" content="dark light" />
{noindex&&<meta name="robots" content="noindex,follow" />}
<link rel="canonical" href={canonical} />
<link rel="icon" type="image/svg+xml" href={`${base}/icons/favicon.svg`} />
<link rel="alternate" type="application/rss+xml" title="Danyow AI 引擎日报" href={`${base}/rss.xml`} />
<link rel="sitemap" href={`${base}/sitemap.xml`} />
<meta property="og:type" content={postTitle?'article':'website'} />
<meta property="og:title" content={title} /><meta property="og:description" content={description} /><meta property="og:url" content={canonical} />
<script is:inline>
try {const mode=localStorage.getItem('danyow-theme')||'dark';document.documentElement.classList.toggle('dark',mode!=='light')}catch(_){document.documentElement.classList.add('dark')}
</script>
</head>
''')
put('src/layouts/Layout.astro',r'''
---
import Header from '@/components/Header.astro'
import Navbar from '@/components/Navbar.astro'
import Footer from '@/components/Footer.astro'
import Head from '@/layouts/Head.astro'
import '@/styles/global.css'
import '@/styles/markdown.css'
import '@/styles/news.css'
interface Props {postTitle?:string;postDescription?:string;noindex?:boolean}
const {postTitle,postDescription,noindex}=Astro.props
---
<html lang="zh-CN" class="dark font-sans">
<Head {postTitle} {postDescription} {noindex} />
<body>
<a href="#content" class="skip-link">跳到正文</a>
<div class="mx-auto max-w-205.848 min-h-vh w-full min-h-dvh" p="x-[min(7.25vw,3.731rem)] y-10" lg="mx-[max(5.75rem,calc(50vw-34.25rem))] my-20 max-w-[min(calc(75vw-16rem),44rem)] min-h-full p-0">
<Header /><Navbar /><main id="content" class="mb-12"><slot /></main><Footer />
</div>
<script>
const button=document.getElementById('theme-toggle');
const update=()=>{const dark=document.documentElement.classList.contains('dark');button?.setAttribute('aria-label',dark?'切换为浅色':'切换为暗色');button?.setAttribute('aria-pressed',String(!dark));if(button)button.textContent=dark?'浅色':'暗色'};
update();button?.addEventListener('click',()=>{document.documentElement.classList.toggle('dark');try{localStorage.setItem('danyow-theme',document.documentElement.classList.contains('dark')?'dark':'light')}catch(_){}update()});
</script>
</body></html>
''')
put('src/components/Navbar.astro',r'''
---
import {base} from '@/config'
const current=decodeURI(Astro.url.pathname).replace(/\/$/,'')
const items=[{path:'/',label:'最新'},{path:'/ai-engine-watch/',label:'日报'},{path:'/note/',label:'笔记'},{path:'/docs/',label:'文档'},{path:'/archive/',label:'归档'},{path:'/search/',label:'搜索'}]
---
<nav aria-label="主导航" class="mb-10.5 text-3.6 font-semibold leading-2.45em font-navbar lg:(uno-desktop-column text-4 top-[calc(5rem+8rem)]) cjk:tracking-wide">
<ul class="site-nav">
{items.map(item=>{const href=base+item.path;const active=item.path==='/'?current===base:current===href.replace(/\/$/,'')||current.startsWith(href);return <li><a href={href} aria-current={active?'page':undefined} class:list={[active?'highlight-static c-primary font-bold':'highlight-hover hover:c-primary','after:bottom-0.7em']}>{item.label}</a></li>})}
<li><button id="theme-toggle" type="button" aria-label="切换为浅色" aria-pressed="false">浅色</button></li>
</ul></nav>
''')
put('src/styles/news.css',r'''
/* Retypeset typography with news-specific refinements. */
:root{font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif;color-scheme:light}html.dark{color-scheme:dark}body{margin:0;font-size:16px;line-height:1.8;overflow-wrap:anywhere}*{box-sizing:border-box}
.site-nav{display:flex;flex-wrap:wrap;gap:0 1.5rem;padding:0;list-style:none}.site-nav button{font:inherit;color:inherit;cursor:pointer;opacity:.72}.site-nav button:hover{opacity:1}
@media(min-width:1024px){.site-nav{display:block}.site-nav li{margin-bottom:.35rem}.site-nav li:last-child{margin-top:1.2rem}}
@media(max-height:740px) and (min-width:1024px){footer{position:static!important;width:auto!important;margin-top:4rem}nav{top:11rem!important}}
.skip-link{position:absolute;left:1rem;top:-5rem;z-index:100;background:#ffe78a;color:#202024;padding:.5rem}.skip-link:focus{top:1rem}:focus-visible{outline:2px solid currentColor;outline-offset:5px;border-radius:2px}
.edition{font-size:.76rem;letter-spacing:.16em;margin-bottom:1rem;opacity:.7}.section-title{font-size:1.45rem;font-weight:600;margin:0 0 1.1rem;letter-spacing:.04em}.lead{font-size:1rem;margin-bottom:2.7rem;line-height:1.95;max-width:36em}
.article-list{list-style:none;padding:0;margin:0}.article-list li{margin:0 0 2.5rem;padding:0 0 1.8rem;border-bottom:1px solid color-mix(in srgb,currentColor 12%,transparent)}.article-list h3{font-size:1.19rem;font-weight:550;line-height:1.6;margin:0 0 .6rem;letter-spacing:.035em}.article-list .excerpt{margin:.65rem 0 0;font-size:.94rem;line-height:1.9;opacity:.87}.entry-meta{font-size:.77rem;letter-spacing:.035em;opacity:.64;display:flex;gap:.8rem;flex-wrap:wrap}.entry-title:hover{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:5px}.section-link{font-size:.875rem;display:inline-block;margin:0 0 2.4rem;text-decoration:underline;text-underline-offset:4px}
.article-header{margin-bottom:2.2rem}.article-header h1{font-size:clamp(1.75rem,4.8vw,2.2rem);line-height:1.45;letter-spacing:.04em;font-weight:600;margin:0 0 .85rem;text-wrap:balance}.heti{line-height:1.95;font-size:1.02rem;overflow-wrap:anywhere}.heti :where(h2){font-size:1.35rem;margin-top:2.2rem}.heti :where(h3){font-size:1.14rem;margin-top:1.65rem}.heti :where(p:not(.no-heti):not(.no-heti *)){text-align:start}.heti :where(pre){font-size:.85rem;line-height:1.65;max-width:100%;tab-size:2}.heti :where(img,video){max-width:100%;height:auto}.heti :where(table){display:block;max-width:100%;overflow-x:auto;font-size:.9rem}.heti :where(code){overflow-wrap:anywhere}.heti :where(pre code){overflow-wrap:normal}
.article-footer{margin-top:3rem;padding-top:1.2rem;border-top:1px solid color-mix(in srgb,currentColor 15%,transparent);font-size:.8rem}.article-footer a{text-decoration:underline;text-underline-offset:4px;margin-right:1.2rem}.version{font-size:.66rem;margin-top:1rem;opacity:.52;word-break:break-all}.source-note{font-size:.84rem;opacity:.75;margin:.8rem 0 1.6rem}.archive-year{font-size:1.1rem;font-family:Georgia,serif;margin:2.2rem 0 1.3rem;opacity:.65}.filters{display:flex;gap:1.2rem;flex-wrap:wrap;font-size:.88rem;margin-bottom:2rem}.filters a{text-decoration:underline;text-underline-offset:4px}.search-input{display:block;width:100%;border:1px solid color-mix(in srgb,currentColor 25%,transparent);padding:.85rem 1rem;background:transparent;color:inherit;border-radius:3px;font:inherit;margin:1rem 0}#search-status{font-size:.85rem;margin-bottom:1.5rem;opacity:.7}footer{line-height:1.85!important;opacity:.74}
@media(max-width:600px){body{font-size:16px}.heti{font-size:1rem}.article-list li{margin-bottom:1.65rem;padding-bottom:1.4rem}.lead{margin-bottom:2rem}nav{margin-bottom:2.2rem!important}.article-header{margin-bottom:1.7rem}.site-nav{gap:0 1.25rem}.article-list h3{font-size:1.1rem}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
''')
put('src/components/EntryList.astro',r'''
---
import {base} from '@/config'
import type {Entry} from '@/utils/site'
interface Props{entries:Entry[];descriptions?:boolean}
const {entries,descriptions=true}=Astro.props
---
<ul class="article-list">{entries.map(entry=><li><h3><a class="entry-title" href={`${base}/${entry.route}/`}>{entry.title}</a></h3><div class="entry-meta"><span>{entry.label}</span>{entry.date?<time datetime={entry.date}>{entry.date}</time>:<span>日期未记录</span>}{entry.placeholder&&<span>待补充</span>}</div>{descriptions&&!entry.placeholder&&<p class="excerpt">{entry.description}</p>}</li>)}</ul>
''')
put('src/utils/site.ts',r'''
import data from '../../.generated/site-content.json'
export interface Entry{route:string;source:string;kind:string;label:string;title:string;date:string|null;description:string;html:string;plain:string;tags:string[];placeholder:boolean;sha256?:string;revision?:number;raw?:string;aliases:string[]}
export const entries=data.entries as Entry[]
export const stats=data.stats
export const groupByKind=(kind:string)=>entries.filter(e=>e.kind===kind)
''')
put('src/pages/index.astro',r'''
---
import Layout from '@/layouts/Layout.astro'
import EntryList from '@/components/EntryList.astro'
import {base} from '@/config'
import {groupByKind,stats} from '@/utils/site'
const news=groupByKind('news').slice(0,10)
---
<Layout><p class="edition">AI & GAMES · DAILY NOTES</p><h2 class="section-title">最新观察</h2><p class="lead">少一点术语，多一点值得知道的事。<br />记录 AI、游戏引擎与新工具的变化。</p><EntryList entries={news} /><a class="section-link" href={`${base}/ai-engine-watch/`}>查看全部日报 →</a><div class="uno-decorative-line" /><h2 class="section-title">留下来的笔记</h2><p class="lead">以前写过的东西，也放在这里。<br />{stats.note} 篇笔记、{stats.docs} 篇文档，还有旧博客。</p><div class="filters"><a href={`${base}/note/`}>笔记</a><a href={`${base}/docs/`}>文档</a><a href={`${base}/blog/`}>旧博客</a></div></Layout>
''')
put('src/pages/[...path].astro',r'''
---
import Layout from '@/layouts/Layout.astro'
import {entries} from '@/utils/site'
import {base} from '@/config'
export function getStaticPaths(){return entries.flatMap(entry=>[entry.route,...entry.aliases].map(route=>({params:{path:route},props:{entry}})))}
const {entry}=Astro.props
---
<Layout postTitle={entry.title} postDescription={entry.description}><article>
<header class="article-header"><p class="edition">{entry.label}</p><h1>{entry.title}</h1><div class="entry-meta">{entry.date?<time datetime={entry.date}>{entry.date}</time>:<span>日期未记录</span>}{entry.kind==='news'&&<span>北京时间</span>}</div></header>
{entry.kind!=='news'&&<p class="source-note">旧文存档，内容保持原样，文中的版本和操作可能已过时。</p>}
<div class="heti" id="post-content" set:html={entry.html} />
{entry.placeholder&&<p class="source-note">这篇笔记目前只有标题，保留原来的位置，待日后补充。</p>}
<footer class="article-footer"><a href={`${base}/${entry.kind==='news'?'ai-engine-watch':entry.kind==='docs'?'docs':entry.kind==='note'?'note':'blog'}/`}>返回列表</a><a href={entry.kind==='news'?`${base}/ai-engine-watch/${entry.raw}`:`https://github.com/danyow/danyow/blob/main/${entry.source}`}>Markdown 原稿</a>{entry.kind==='news'&&<p class="version">修订 {entry.revision} · <span>{`source-sha256:${entry.sha256}`}</span></p>}</footer>
</article></Layout>
''')
put('src/pages/[section]/index.astro',r'''
---
import Layout from '@/layouts/Layout.astro'
import EntryList from '@/components/EntryList.astro'
import {entries} from '@/utils/site'
import {base} from '@/config'
export function getStaticPaths(){return [{section:'ai-engine-watch',title:'AI 引擎日报',kind:'news',intro:'新在哪、有什么用、现在能用吗。每天讲清几件事。'},{section:'note',title:'笔记',kind:'note',intro:'保留以前记下的问题、想法和未完成的提纲。'},{section:'docs',title:'文档',kind:'docs',intro:'旧文档继续保留，内容不作自动改写。'},{section:'blog',title:'旧博客',kind:'blog',intro:'以前的学习记录与零散想法。保留原文，也保留当时的日期。'}].map(item=>({params:{section:item.section},props:item}))}
const {title,kind,intro}=Astro.props
const selected=entries.filter(e=>e.kind===kind)
---
<Layout postTitle={title}><h2 class="section-title">{title}</h2><p class="lead">{intro}</p><EntryList entries={selected} descriptions={kind!=='note'} />{kind==='news'&&<p class="source-note"><a href={`${base}/ai-engine-watch/index/catalog.json`}>月份索引</a> · <a href={`${base}/ai-engine-watch/index/recent.json`}>近期索引</a></p>}</Layout>
''')
put('src/pages/archive/index.astro',r'''
---
import Layout from '@/layouts/Layout.astro'
import EntryList from '@/components/EntryList.astro'
import {entries} from '@/utils/site'
import {base} from '@/config'
const groups=Map.groupBy(entries,e=>e.date?.slice(0,4)||'日期未记录')
---
<Layout postTitle="归档"><h2 class="section-title">归档</h2><p class="lead">按时间翻一翻，也可以按栏目找。</p><div class="filters"><a href={`${base}/ai-engine-watch/`}>日报</a><a href={`${base}/note/`}>笔记</a><a href={`${base}/docs/`}>文档</a><a href={`${base}/blog/`}>旧博客</a><a href={`${base}/tags/`}>标签</a></div>{Array.from(groups).map(([year,items])=><section><h3 class="archive-year">{year}</h3><EntryList entries={items} descriptions={false} /></section>)}</Layout>
''')
put('src/pages/tags/index.astro',r'''
---
import Layout from '@/layouts/Layout.astro'
import {entries} from '@/utils/site'
import {base} from '@/config'
const tags=Array.from(new Set(entries.flatMap(e=>e.tags))).sort()
---
<Layout postTitle="标签"><h2 class="section-title">标签</h2><div class="filters">{tags.map(tag=><a href={`${base}/tags/${encodeURIComponent(tag)}/`}>{tag}</a>)}</div></Layout>
''')
put('src/pages/tags/[tag].astro',r'''
---
import Layout from '@/layouts/Layout.astro'
import EntryList from '@/components/EntryList.astro'
import {entries} from '@/utils/site'
export function getStaticPaths(){return Array.from(new Set(entries.flatMap(e=>e.tags))).map(tag=>({params:{tag},props:{tag}}))}
const {tag}=Astro.props
---
<Layout postTitle={tag}><h2 class="section-title">{tag}</h2><EntryList entries={entries.filter(e=>e.tags.includes(tag))} /></Layout>
''')
put('src/pages/search/index.astro',r'''
---
import Layout from '@/layouts/Layout.astro'
import {base} from '@/config'
---
<Layout postTitle="搜索"><h2 class="section-title">搜索</h2><label for="search-input">搜索日报、笔记和旧文档</label><input class="search-input" id="search-input" type="search" placeholder="输入项目名、关键词或日期" autocomplete="off" data-index={`${base}/search-index.json`} /><p id="search-status" role="status">输入关键词后搜索，内容只在你的浏览器里匹配。</p><ul id="search-results" class="article-list"></ul><noscript><p>搜索需要启用 JavaScript，也可以直接打开<a href={`${base}/archive/`}>历史归档</a>。</p></noscript></Layout>
<script>
const input=document.getElementById('search-input') as HTMLInputElement;
const list=document.getElementById('search-results')!;const status=document.getElementById('search-status')!;
let index:{title:string;url:string;text:string;date:string|null;label:string}[]|null=null;let loading:Promise<void>|null=null;let timer:ReturnType<typeof setTimeout>;
async function search(){const query=input.value.trim().toLocaleLowerCase();list.replaceChildren();if(!query){status.textContent='输入关键词后搜索。';return}try{if(!index){if(!loading)loading=fetch(input.dataset.index!).then(r=>{if(!r.ok)throw Error('index');return r.json()}).then(data=>{index=data}).finally(()=>{loading=null});await loading}if(query!==input.value.trim().toLocaleLowerCase())return;const words=query.split(/\s+/);const found=index!.filter(e=>words.every(word=>(e.title+' '+e.text+' '+(e.date||'')).toLocaleLowerCase().includes(word))).slice(0,50);status.textContent=found.length?`找到 ${found.length} 条结果`:'暂时没有匹配的内容。';for(const e of found){const item=document.createElement('li'),title=document.createElement('h3'),link=document.createElement('a'),meta=document.createElement('div');link.href=e.url;link.textContent=e.title;link.className='entry-title';title.append(link);meta.className='entry-meta';meta.textContent=e.label+' · '+(e.date||'日期未记录');item.append(title,meta);list.append(item)}}catch(_){status.textContent='搜索索引暂时无法读取，请稍后重试。'}}
input.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(search,180)});
</script>
''')
put('src/pages/404.astro',r'''
---
import Layout from '@/layouts/Layout.astro'
import {base} from '@/config'
---
<Layout postTitle="页面未找到" noindex={true}><h2 class="section-title">这页暂时找不到</h2><p class="lead">旧的 Unity 和 Lua 文档已退出站点。其他内容可以到归档里找找。</p><a class="section-link" href={`${base}/archive/`}>查看归档 →</a></Layout>
''')
put('src/pages/blog/[...legacy].astro',r'''
---
import {base} from '@/config'
export function getStaticPaths(){return ['archive','page/2','page/3'].map(legacy=>({params:{legacy}})))}
return Astro.redirect(base+'/blog/',301)
---
''')
put('src/pages/rss.xml.ts',r'''
import type {APIRoute} from 'astro'
import {entries} from '@/utils/site'
import {base,themeConfig} from '@/config'
const escape=(s:string)=>s.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]!))
export const GET:APIRoute=()=>{const channel=themeConfig.site.url+base+'/';const items=entries.filter(e=>e.kind==='news').slice(0,30).map(e=>`<item><title>${escape(e.title)}</title><link>${escape(channel+e.route+'/')}</link><guid isPermaLink="true">${escape(channel+e.route+'/')}</guid><pubDate>${new Date(e.date+'T09:00:00+08:00').toUTCString()}</pubDate><description>${escape(e.description)}</description></item>`).join('');return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Danyow · AI 引擎日报</title><link>${channel}</link><description>AI 与游戏开发的简短观察</description><language>zh-CN</language>${items}</channel></rss>`,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}})}
''')
put('src/pages/sitemap.xml.ts',r'''
import type {APIRoute} from 'astro'
import {entries} from '@/utils/site'
import {base,themeConfig} from '@/config'
export const GET:APIRoute=()=>{const paths=['','ai-engine-watch','note','docs','blog','archive','tags',...entries.map(e=>e.route)];const urls=paths.map(p=>`<url><loc>${new URL(base+'/'+p+(p?'/':''),themeConfig.site.url).href.replace(/&/g,'&amp;')}</loc></url>`).join('');return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,{headers:{'Content-Type':'application/xml'}})}
''')
put('src/pages/robots.txt.ts',r'''
import {themeConfig,base} from '@/config'
export function GET(){return new Response(`User-agent: *\nAllow: /\nSitemap: ${themeConfig.site.url}${base}/sitemap.xml\n`)}
''')
put('static/icons/favicon.svg','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#202024"/><text x="15" y="47" fill="#ece9e1" font-size="46" font-family="Georgia,serif">D</text></svg>')
put('.gitignore','node_modules/\ndist/\nbuild/\n.astro/\n.generated/\n.docusaurus/\nstatic/ai-engine-watch/\nstatic/search-index.json\n.cache-loader/\n.DS_Store\n.idea/\n.env\n.env.*\n!.env.example\n*.log\ncoverage/\n_migration-upstream/\n')
put('THIRD_PARTY_NOTICES.md','''# Third-party notices

The presentation is a customized fork of Retypeset by radishzz, upstream commit `a636b6d393be714cab52d3fc4baddd3f3905f701`.

Upstream: https://github.com/radishzzz/astro-theme-retypeset
License: MIT, preserved in `LICENSE-Retypeset`.

Retypeset header/footer layout, UnoCSS configuration, global styles and Markdown typography are retained or adapted. Content loading, news navigation, legacy routes, search and publication checks are site-specific. Upstream demo articles, analytics, API keys, comment services, sound effects, remote-image calls and bundled fonts are not included.

The Markdown typography stylesheet credits Heti (https://github.com/sivan/heti), under MIT. That attribution remains in the source.

Original repository licenses (`LICENSE`, `LICENSE-docs`) remain unchanged. This migration does not relicense the original writing.
''')
put('README.md','''# Danyow · AI 与游戏观察

Astro + Retypeset 暗色资讯站。首页展示新资讯，旧笔记、文档和博客继续保留。

## 内容

- `ai-engine-watch/reports/YYYY/MM/YYYY-MM-DD.md`：日报唯一原稿。
- `note/`、`docs/`、`blog/`：旧文章原稿与日期保留；`published: false` 的草稿不进入公开构建。
- `lua/`、`unity/`：仅保留历史源文件，不参与构建或展示。

原有笔记、文档、博客与日报日期路径继续使用。没有把旧文章日期改成迁移日期，标题提纲不会自动补写。

## 开发

Node.js 22.16 及以上，使用 npm 锁文件。

```sh
npm ci
npm test
npm run dev
npm run build
npm run preview
```

构建读取 Markdown，生成静态 HTML 和搜索索引，再核对站内链接、原稿哈希和历史路径。不需要数据库或运行时服务器。

## 日报发布

定时任务提交 MD → Actions 构建 → gh-pages → Pages → 任务核验网页和回执 → 邮件发送摘要及阅读链接。

`ai-engine-watch/index/`、`raw/`、`receipts/` 保持兼容。私人邮箱和推送凭据不入库。

## 维护

默认暗色，可手动切换；不加载主题作者的评论或统计服务。主题来源见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)，迁移记录见 [REFACTOR_NOTES.md](REFACTOR_NOTES.md)。框架和主题升级通过 PR 测试，不自动覆盖定制代码。
''')
put('REFACTOR_NOTES.md','''# Retypeset 重构记录

2026-09-12 从 Docusaurus 迁为 Astro + Retypeset 定制版。30篇笔记、1篇文档、29篇博客原文件以及日报全部保留；其中一篇博客标记 `published: false`，不重新公开。只有标题的笔记仍保留提纲。

Unity/Lua只保留历史源文件，不再下载和生成。旧运行时、配置、Unity转换脚本、IDE配置和Yarn锁文件退出新构建。原许可证保留。

## 保留的接口

日报Markdown路径、日期链接、raw、JSON索引、SHA-256回执保持不变。笔记沿用原来的文件夹首页路由，博客及文档保持路径和大小写。旧的博客分页入口跳转到新博客列表。

## 展示

默认暗色，Retypeset留白与阅读排版，首页短摘要，独立笔记/文档/归档/搜索。排除主题演示稿、分析标识、远程截图服务、评论和声音效果。使用设备字体，不复制字体二进制。

## 回滚

迁移前主分支提交：`10e60c467eb5b1c268a1a53844f479a82b6a1f23`。出现问题时撤销迁移PR并重新构建，不强制回退，不删除后续日报。原文章与日报原稿在本次迁移中不改写。

构建通过、Pages部署成功、真实网页可访问和手机收到通知是不同的验证结果，分别记录。
''')
for rel in ['ai-engine-watch/README.md','ai-engine-watch/DEPLOYMENT.md','ai-engine-watch/TASK_INSTRUCTIONS.md']:
    p=root/rel
    if p.exists(): p.write_text(p.read_text().replace('Docusaurus','Astro + Retypeset').replace('yarn archive:test','npm run archive:test').replace('yarn archive:build','npm run archive:build').replace('yarn build','npm run build'))
