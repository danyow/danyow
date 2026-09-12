import type {APIRoute} from 'astro'
import {entries} from '@/utils/site'
import {base,themeConfig} from '@/config'
const escape=(s:string)=>s.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]!))
export const GET:APIRoute=()=>{const channel=themeConfig.site.url+base+'/';const items=entries.filter(e=>e.kind==='news').slice(0,30).map(e=>`<item><title>${escape(e.title)}</title><link>${escape(channel+e.route+'/')}</link><guid isPermaLink="true">${escape(channel+e.route+'/')}</guid><pubDate>${new Date(e.date+'T09:00:00+08:00').toUTCString()}</pubDate><description>${escape(e.description)}</description></item>`).join('');return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Danyow · AI 引擎日报</title><link>${channel}</link><description>AI 与游戏开发的简短观察</description><language>zh-CN</language>${items}</channel></rss>`,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}})}
