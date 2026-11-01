'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const security = require('../vercel-output/functions/api.func/admin-security.cjs');
const HOST = 'kb-badge-admin.vercel.app';
const ORIGIN = `https://${HOST}`;
function response() { return { code: 200, headers: {}, setHeader(k,v) { this.headers[k.toLowerCase()] = v; }, status(n) { this.code=n; return this; }, end() { this.ended=true; return this; }, json(v) { this.body=v; this.ended=true; return this; } }; }
function run(options={}) { const req={path:'/api/staff/kb-badge-copy',method:'GET',headers:{host:HOST},...options}; const res=response(); let passed=false; security.createBadgeHostMiddleware()(req,res,()=>{passed=true;}); return {req,res,passed}; }

test('badge host guard fails closed before session/auth responses for public, unknown, malformed and spoofed hosts', () => {
  const paths=['/kb-badge-admin','/KB-BADGE-ADMIN/','//api//staff//kb-badge-copy/','/%6bb-badge-admin','/api/staff/kb-badge-admin','/api/staff/kb-badge-copy/child','/api/kb-badge-admin/login','/kb-badge-admin-login.html','/kb-badge-admin-login.js','/kb-badge-admin.js'];
  for (const host of ['kb-online-store.vercel.app','oshop-ly.vercel.app','preview.vercel.app','kb-badge-admin.vercel.app.evil.test','kb-badge-admin.vercel.app:444',' kb-badge-admin.vercel.app','',undefined]) {
    for (const path of paths) {
      const {res,passed}=run({path,headers:{host,'x-forwarded-host':HOST,cookie:'__Host-oshop_admin=valid-cookie-is-not-a-host-permission'}});
      assert.equal(passed,false,`${host} ${path}`); assert.equal(res.code,404); assert.equal(res.headers.location,undefined); assert.equal(res.headers['set-cookie'],undefined); assert.equal(res.headers['x-oshop-admin-auth'],undefined); assert.equal(res.headers['cache-control'],'no-store');
    }
  }
});

test('admin host exposes only badge backend routes and requires exact HTTPS origin for mutation', () => {
  for (const path of ['/api/settings','/api/chat','/api/staff/overview','/api/admin/login','/index.html']) assert.equal(run({path}).res.code,404,path);
  for (const origin of [undefined,'https://kb-online-store.vercel.app','http://kb-badge-admin.vercel.app','https://kb-badge-admin.vercel.app/path','https://kb-badge-admin.vercel.app.evil.test']) {
    const r=run({method:'PUT',headers:{host:HOST,origin}}); assert.equal(r.passed,false); assert.equal(r.res.code,403);
  }
  assert.equal(run({method:'PUT',headers:{host:HOST,origin:ORIGIN}}).passed,true);
  assert.equal(run({headers:{host:HOST,'x-forwarded-host':'evil.test'}}).passed,true);
  assert.equal(run({path:'/api/kb/badge-display',headers:{host:'kb-online-store.vercel.app'}}).passed,true);
  assert.equal(run({path:'/api/admin/login',method:'POST',headers:{host:'kb-online-store.vercel.app',origin:ORIGIN}}).res.code,404);
  assert.equal(run({path:'/api/admin/login',method:'POST',headers:{host:'oshop-ly.vercel.app'}}).passed,true);
});

test('badge writes cannot use a legacy allowed origin even with a valid signed session', async () => {
  const password='unit-only-password-01234567890123456789'; const now=1800000000000;
  const cookie=`${security.COOKIE_NAME}=${security.createSessionCookie(password,now)}`;
  for (const origin of ['https://oshop-ly.vercel.app','https://kb-online-store.vercel.app']) {
    const res=response(); let passed=false;
    await security.createAdminMiddleware({env:{OSHOP_ADMIN_PASSWORD:password},now:()=>now})({path:'/api/staff/kb-badge-copy',method:'PUT',headers:{host:HOST,origin,cookie}},res,()=>{passed=true;});
    assert.equal(passed,false); assert.equal(res.code,403);
  }
});

test('host guard is installed before all authentication handlers', () => {
  const registered=[]; const app={set(){},use(fn){registered.push(['use',fn]);},post(path,fn){registered.push([path,fn]);}};
  security.installAdminSecurity(app,{env:{}});
  assert.equal(registered[0][0],'use');
  assert.ok(registered.some(([path])=>path==='/api/kb-badge-admin/login'));
});

test('Vercel routes contain no unscoped badge rewrite and all gates precede filesystem/API', () => {
  const cfg=JSON.parse(fs.readFileSync('vercel-output/config.json'));
  const host=[{type:'host',value:{eq:HOST}}];
  const routes=cfg.routes; const api=routes.findIndex(r=>r.src==='^/api(/.*)?$'); const filesystem=routes.findIndex(r=>r.handle==='filesystem');
  const aliases=routes.filter(r=>r.dest==='/api/staff/kb-badge-admin'); assert.equal(aliases.length,1); assert.deepEqual(aliases[0].has,host);
  assert.ok(routes.findIndex(r=>r.status===404&&r.missing)<api);
  assert.ok(routes.findIndex(r=>r.status===404&&r.missing)<filesystem);
  const deny = new RegExp(routes.find(r=>r.status===404&&r.missing).src, 'i');
  for (const path of ['/kb-badge-admin.js','/kb-badge-admin-login.html','/kb-badge-admin-login.js','/kb-badge-admin-robots.txt']) assert.equal(deny.test(path),true,path);
  assert.ok(!routes.some(r=>r.src?.includes('admin-auth-redirect')&&r.status===404));
  const legacy=JSON.parse(fs.readFileSync('vercel.json')).rewrites.find(r=>r.source==='/kb-badge-admin'); assert.deepEqual(legacy.has,host);
  assert.doesNotMatch(fs.readFileSync('vercel-output/static/robots.txt','utf8'),/badge|admin|staff/);
});

test('primary staff hash is hidden synchronously without changing legacy staff behavior', () => {
  const source=fs.readFileSync('vercel-output/static/admin-auth-redirect.js','utf8');
  for (const hostname of ['kb-online-store.vercel.app','oshop-ly.vercel.app']) {
    let hash='#/staff'; let replacements=0; const listeners={};
    const window={location:{hostname,get hash(){return hash;},pathname:'/',replace(){replacements++;}},history:{replaceState(){hash='';replacements++;}},addEventListener(k,fn){listeners[k]=fn;},fetch:async()=>({status:200,headers:{get(){return null;}}})};
    vm.runInNewContext(source,{window});
    assert.equal(replacements,hostname==='kb-online-store.vercel.app'?1:0);
    if(listeners.hashchange){hash='#/STAFF';listeners.hashchange();assert.equal(hash,'');}
  }
});
