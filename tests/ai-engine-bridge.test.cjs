'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const ROOT = path.resolve(__dirname, '..');
const hash = text => crypto.createHash('sha256').update(text).digest('hex');
function source(overrides={}) {
  const meta={schema:1,date:'2026-09-11',timezone:'Asia/Shanghai',title:'测试日报',revision:1,publication:'publish',review_status:'generated',summary:['测试内容，不是真实新闻。'],events:[],...overrides};
  return '---\n'+JSON.stringify(meta,null,2)+'\n---\n# 测试日报\n\n测试正文。\n';
}
function env(options={}) {
  const props={GITHUB_OWNER:'test-owner',GITHUB_REPO:'ai-engine-watch',GITHUB_TOKEN:'TEST_ONLY',SOURCE_EMAIL:'owner@example.org',SOURCE_START_DATE:'2026-09-11',PAGES_BASE_URL:'https://test-owner.github.io/ai-engine-watch',RECIPIENT_EMAILS_JSON:'["owner@example.org","push@example.org"]',PUBLIC_SITE_APPROVED:'true',PUBLIC_REPOSITORY_APPROVED:'true',DRY_RUN:'false',ENABLE_NOTIFICATIONS:'true',ENABLE_WATCHDOG:'false',...options.props};
  let sourceText=options.source||source(); const sent=[];const triggers=[];const files=new Map(); const calls=[];
  const makeMsg=(id,subject,body,from='Owner <owner@example.org>',to='owner@example.org')=>({getId:()=>id,getSubject:()=>subject,getPlainBody:()=>body,getFrom:()=>from,getTo:()=>to,getAttachments:()=>[]});
  const msg=makeMsg('msg001','[AIENGINE-SOURCE] 2026-09-11',sourceText,options.from||'Owner <owner@example.org>');
  let ctx;
  const response=(status,data)=>({getResponseCode:()=>status,getContentText:()=>typeof data==='string'?data:JSON.stringify(data)});
  const propsService={getProperties:()=>({...props}),getProperty:k=>props[k]||null,setProperty:(k,v)=>{props[k]=v;return propsService},deleteProperty:k=>{delete props[k];return propsService}};
  const sandbox={console:{log:()=>{},warn:()=>{}},Date,JSON,Number,Object,Array,String,RegExp,Math,isFinite,encodeURIComponent,unescape,
    PropertiesService:{getScriptProperties:()=>propsService},Session:{getEffectiveUser:()=>({getEmail:()=> 'owner@example.org'})},
    LockService:{getScriptLock:()=>({tryLock:()=>!options.locked,releaseLock:()=>{}})},
    Utilities:{DigestAlgorithm:{SHA_256:'sha256'},Charset:{UTF_8:'utf8'},computeDigest:(_,s)=>Array.from(crypto.createHash('sha256').update(s).digest()),base64Encode:s=>Buffer.from(s).toString('base64'),base64Decode:s=>Array.from(Buffer.from(s,'base64')),newBlob:b=>({getDataAsString:()=>Buffer.from(b).toString('utf8')}),formatDate:(_,__,format)=>format==='HH'?'13':'2026-09-11'},
    GmailApp:{
      search:(q,start=0,limit=30)=>{
        if(q.includes('subject:AIENGINE-SOURCE'))return start===0?[{getMessages:()=>[msg]}]:[];
        return [{getMessages:()=>sent.map((s,i)=>makeMsg('sent'+i,s.subject,s.body,'owner@example.org',s.to))}];
      },getMessageById:()=>msg,
      sendEmail:(to,subject,body,opts)=>{if(options.failRecipient===to && subject.includes('AIENGINE-DAILY')) {if(options.acceptThenThrow)sent.push({to,subject,body,opts});throw new Error('send timeout');}sent.push({to,subject,body,opts});}
    },
    UrlFetchApp:{fetch:(url,opts)=>{
      calls.push({url,method:opts.method});
      if(url.startsWith('https://api.github.com/')) {
        if(options.githubStatus)return response(options.githubStatus,'test failure');
        if(!url.includes('/contents/')) return response(200,{permissions:{push:true}});
        const filePath=url.split('/contents/')[1].split('?')[0];
        if(opts.method==='put') {const payload=JSON.parse(opts.payload);files.set(filePath,{sha:'blob-sha',encoding:'base64',content:payload.content});return response(201,{content:{sha:'blob-sha'}});}
        if(files.has(filePath))return response(200,files.get(filePath));
        return response(404,'not found');
      }
      if(options.pages404)return response(404,'not deployed');
      const doc=ctx.DailyCore.parse(sourceText);const h=options.wrongHash?'f'.repeat(64):hash(doc.text);
      if(url.includes('/receipts/'))return response(200,{schema:1,date:doc.meta.date,revision:doc.meta.revision,sha256:h,html:'reports/'+doc.meta.date,summary:doc.meta.summary});
      return response(200,'<code>source-sha256:'+h+'</code>');
    }},
    ScriptApp:{getProjectTriggers:()=>[...triggers],deleteTrigger:t=>triggers.splice(triggers.indexOf(t),1),newTrigger:name=>{const b={timeBased:()=>b,everyMinutes:n=>{b.minutes=n;return b},create:()=>triggers.push({getHandlerFunction:()=>name,minutes:b.minutes})};return b;}}
  };
  ctx=vm.createContext(sandbox);
  for(const name of ['Core.gs','Code.gs']) vm.runInContext(fs.readFileSync(path.join(ROOT,'ai-engine-watch/bridge',name),'utf8'),ctx,{filename:name});
  return {ctx,props,sent,files,calls,triggers,state:()=>JSON.parse(props.STATE_msg001||'null'),setText:s=>{sourceText=s;},daily:()=>sent.filter(s=>s.subject.includes('AIENGINE-DAILY'))};
}

test('Core accepts Unicode Markdown',()=>{const e=env();assert.equal(e.ctx.DailyCore.parse(source()).meta.date,'2026-09-11')});
test('Core rejects HTML transport',()=>{assert.throws(()=>env().ctx.DailyCore.parse('<html>not Markdown</html>'))});
test('Core rejects email secret in public text',()=>{assert.throws(()=>env().ctx.DailyCore.parse(source()+'private@example.org'))});
test('Core rejects timezone regression',()=>{assert.throws(()=>env().ctx.DailyCore.parse(source({timezone:'America/Los_Angeles'})))});
test('Core rejects invalid date',()=>{assert.throws(()=>env().ctx.DailyCore.parse(source({date:'2026-02-30'})))});
test('Config defaults to dry run and disabled delivery',()=>{const e=env({props:{DRY_RUN:undefined,ENABLE_NOTIFICATIONS:undefined}});const c=e.ctx.bridgeConfig_();assert.equal(c.dryRun,true);assert.equal(c.notifications,false)});
test('Config rejects an unapproved public destination',()=>{assert.throws(()=>env({props:{PUBLIC_SITE_APPROVED:'false'}}).ctx.bridgeConfig_())});
test('Config rejects non-self sender',()=>{assert.throws(()=>env({props:{SOURCE_EMAIL:'someone@example.org'}}).ctx.bridgeConfig_())});
test('Config rejects plaintext or credential-bearing base URL',()=>{for(const b of ['http://example.org','https://user:pass@example.org','https://example.org?token=secret'])assert.throws(()=>env({props:{PAGES_BASE_URL:b}}).ctx.bridgeConfig_())});
test('End to end mock archives, verifies hash, and sends separately',()=>{const e=env();e.ctx.runBridge();assert.equal(e.files.size,1);assert.equal(e.state().phase,'sent');assert.equal(e.daily().length,2);assert.equal(e.daily()[0].to,'owner@example.org');assert.ok(e.daily()[0].body.includes('/reports/2026-09-11'))});
test('Rerun does not duplicate a successful delivery',()=>{const e=env();e.ctx.runBridge();e.ctx.runBridge();assert.equal(e.daily().length,2);assert.equal(e.calls.filter(c=>c.method==='put').length,1)});
test('No delivery before deployment',()=>{const e=env({pages404:true});e.ctx.runBridge();assert.equal(e.daily().length,0);assert.equal(e.state().phase,'waiting')});
test('Wrong published hash prevents notification',()=>{const e=env({wrongHash:true});e.ctx.runBridge();assert.equal(e.daily().length,0);assert.equal(e.state().phase,'waiting')});
test('Held source is never committed to this public repository',()=>{const e=env({source:source({publication:'hold'})});e.ctx.runBridge();assert.equal(e.files.size,0);assert.equal(e.state().phase,'blocked');assert.equal(e.daily().length,0)});
test('Dry run writes neither GitHub nor Gmail',()=>{const e=env({props:{DRY_RUN:'true'}});e.ctx.runBridge();assert.equal(e.files.size,0);assert.equal(e.sent.length,0);assert.equal(e.state().phase,'new')});
test('Delivery disabled still archives a valid source',()=>{const e=env({props:{ENABLE_NOTIFICATIONS:'false'}});e.ctx.runBridge();assert.equal(e.files.size,1);assert.equal(e.sent.length,0);assert.equal(e.state().phase,'waiting')});
test('Invalid inbound report is blocked, not published',()=>{const e=env({source:source()+'private@example.org'});e.ctx.runBridge();assert.equal(e.files.size,0);assert.equal(e.state().phase,'blocked');assert.equal(e.daily().length,0)});
test('Non-self message is not discovered',()=>{const e=env({from:'attacker@example.org'});e.ctx.runBridge();assert.equal(e.state(),null);assert.equal(e.files.size,0)});
test('Transient GitHub failure leaves source retryable',()=>{const e=env({githubStatus:503});e.ctx.runBridge();assert.equal(e.state().phase,'new');assert.equal(e.state().attempts,1);assert.equal(e.daily().length,0)});
test('Permission error blocks publishing',()=>{const e=env({githubStatus:403});e.ctx.runBridge();assert.equal(e.state().phase,'blocked');assert.equal(e.daily().length,0)});
test('Same source content in repository causes no extra commit',()=>{const e=env();const d=e.ctx.DailyCore.parse(source());d.hash=hash(d.text);const cfg=e.ctx.bridgeConfig_();assert.equal(e.ctx.commitDocument_(cfg,d),'committed');assert.equal(e.ctx.commitDocument_(cfg,d),'unchanged')});
test('Changed source requires revision increment',()=>{const e=env();const cfg=e.ctx.bridgeConfig_();const d=e.ctx.DailyCore.parse(source());d.hash=hash(d.text);e.ctx.commitDocument_(cfg,d);const changed=e.ctx.DailyCore.parse(source().replace('测试正文','改过的正文'));changed.hash=hash(changed.text);assert.throws(()=>e.ctx.commitDocument_(cfg,changed),/REVISION_CONFLICT/)});
test('Higher revision can update existing date',()=>{const e=env();const cfg=e.ctx.bridgeConfig_();for(const r of [1,2]){const d=e.ctx.DailyCore.parse(source({revision:r}));d.hash=hash(d.text);assert.equal(e.ctx.commitDocument_(cfg,d),'committed')}});
test('Uncertain second recipient does not resend first recipient',()=>{const e=env({failRecipient:'push@example.org'});e.ctx.runBridge();e.ctx.runBridge();assert.equal(e.daily().filter(s=>s.to==='owner@example.org').length,1);assert.equal(e.state().phase,'delivering');assert.ok(Object.values(e.state().deliveries).includes('uncertain'))});
test('Accepted-then-timeout is recovered from Sent without duplicate',()=>{const e=env({failRecipient:'push@example.org',acceptThenThrow:true});e.ctx.runBridge();e.ctx.runBridge();assert.equal(e.daily().length,2);assert.equal(e.state().phase,'sent')});
test('Script lock prevents concurrent duplicate processing',()=>{const e=env({locked:true});e.ctx.runBridge();assert.equal(e.files.size,0);assert.equal(e.sent.length,0)});
test('Installing trigger twice keeps only one 5-minute bridge trigger',()=>{const e=env();e.ctx.installBridgeTrigger();e.ctx.installBridgeTrigger();assert.equal(e.triggers.length,1);assert.equal(e.triggers[0].minutes,5)});
test('Watcher can be disabled without touching other jobs',()=>{const e=env();e.ctx.installBridgeTrigger();e.ctx.removeBridgeTriggers();assert.equal(e.triggers.length,0)});
test('Source date is filtered by metadata, not Gmail PST date operators',()=>{const e=env();e.ctx.runBridge();assert.equal(e.state().date,'2026-09-11');assert.ok(!fs.readFileSync(path.join(ROOT,'ai-engine-watch/bridge/Code.gs'),'utf8').includes("+ ' after:'"))});
test('Known private token is blocked even without a recognizable prefix',()=>{const secret='test-only-private-value-1234';const e=env({props:{GITHUB_TOKEN:secret},source:source()+'\n'+secret});e.ctx.runBridge();assert.equal(e.files.size,0);assert.equal(e.state().phase,'blocked')});
test('Manual recovery requeues permission failures, not uncertain deliveries',()=>{const e=env({githubStatus:403});e.ctx.runBridge();assert.equal(e.state().phase,'blocked');e.ctx.retryBlockedOrExpired();assert.equal(e.state().phase,'new')});
test('Unverified imported source is never public',()=>{const e=env({source:source({review_status:'imported-unverified'})});e.ctx.runBridge();assert.equal(e.files.size,0);assert.equal(e.state().phase,'blocked')});
test('Public repository approval is required before writing',()=>{assert.throws(()=>env({props:{PUBLIC_REPOSITORY_APPROVED:'false'}}).ctx.bridgeConfig_())});
