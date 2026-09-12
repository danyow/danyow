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
