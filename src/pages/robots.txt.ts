import {themeConfig,base} from '@/config'
export function GET(){return new Response(`User-agent: *\nAllow: /\nSitemap: ${themeConfig.site.url}${base}/sitemap.xml\n`)}
