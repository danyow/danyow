import { base } from '@/config'
import { getLocalizedPath } from '@/i18n/path'
export function getPageInfo(path:string) {
  const p=path.slice(base.length).replace(/\/$/,'')
  const isPost=['ai-engine-watch/reports','note','docs','blog'].some(kind=>p.startsWith('/'+kind+'/'))
  return {currentLang:'zh' as const,isPost,isHome:!p,getLocalizedPath:(target:string)=>getLocalizedPath(target,'zh')}
}
