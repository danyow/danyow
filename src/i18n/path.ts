import type { Language } from './config'
import { base } from '@/config'
export function getLocalizedPath(path:string,_lang?:Language) {return base+'/'+path.replace(/^\/|\/$/g,'')+(path==='/'?'':'/')}
