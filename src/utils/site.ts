import data from '../../.generated/site-content.json'
export interface Entry{route:string;source:string;kind:string;channel?:string;label:string;title:string;date:string|null;description:string;html:string;plain:string;tags:string[];placeholder:boolean;sha256?:string;revision?:number;raw?:string;aliases:string[]}
export const entries=data.entries as Entry[]
export const stats=data.stats
export const groupByKind=(kind:string)=>entries.filter(e=>e.kind===kind)
