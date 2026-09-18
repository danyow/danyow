import type {APIRoute} from 'astro'
import {entries} from '@/utils/site'
import {base,themeConfig} from '@/config'
export const GET:APIRoute=()=>{const paths=['','ai-engine-watch','note','docs','blog','gallery','archive','tags',...entries.map(e=>e.route)];const urls=paths.map(p=>`<url><loc>${new URL(base+'/'+p+(p?'/':''),themeConfig.site.url).href.replace(/&/g,'&amp;')}</loc></url>`).join('');return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,{headers:{'Content-Type':'application/xml'}})}
