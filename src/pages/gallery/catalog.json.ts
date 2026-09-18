import type {APIRoute} from 'astro'
import catalog from '../../../gallery/catalog.json'
export const GET:APIRoute = () => new Response(JSON.stringify(catalog)+'\n',{
  headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-cache'},
})
