#!/usr/bin/env python3
"""Wire Oshop's reviewed bundle to its fail-closed, shared Redis store."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
API = ROOT / "vercel-output/functions/api.func/index.cjs"
MARKER = "/*OSHOP_SHARED_STORAGE_V1*/"


def replace_exact(text: str, old: str, new: str, label: str) -> str:
    if text.count(old) != 1:
        raise SystemExit(f"Expected one match for {label}; found {text.count(old)}.")
    return text.replace(old, new, 1)


def validate(text: str) -> None:
    required = [
        MARKER,
        'require("./shared-store.cjs").createSharedStore()',
        'async function Vs(){return __oshopStore.getSettings(jTe)}',
        'async function E$(t)',
        'c=await E$(',
        'o=await E$(',
        'f.negotiation&&await HTe(',
        'content:eCe(e,r,__oshopPromptSettings)',
        'system:eCe(e,r,await Vs())',
        'cfg=await Vs()',
        '__oshopSecurity.asyncHandler(async(r,i)=>i.json(await Vs()))',
        'r.oshopRequestRecord||await WTe(',
    ]
    for item in required:
        if item not in text:
            raise SystemExit(f"Missing shared-storage integration assertion: {item}")
    for item in ['X0=[]', 'um=[]', '$Te={...jTe}', 'i=Vs()', 't=Vs()', 'e=Vs()', 'cfg=Vs()']:
        if item in text:
            raise SystemExit(f"Old process-local store or synchronous settings read remains: {item}")


def main() -> None:
    if not (API.parent / "shared-store.cjs").is_file():
        raise SystemExit("Missing shared-store.cjs; refusing a partial build.")
    text = API.read_text(encoding="utf-8")
    if MARKER in text:
        validate(text)
        print("Oshop shared-storage integration verified (already applied).")
        return

    start = text.index('var jTe={rateMode:"official"')
    end = text.index('var k$={USD:1', start)
    old = text[start:end]
    if 'function E$(t){let e=X0.length+1' not in old or 'function GTe(){return{requests:X0.length' not in old:
        raise SystemExit("Unexpected application storage block; refusing an unsafe patch.")
    defaults = old[len('var jTe='):old.index(',$Te=')]
    replacement = (
        MARKER + 'var jTe=' + defaults + ';'
        'var __oshopStore=require("./shared-store.cjs").createSharedStore();'
        'async function Vs(){return __oshopStore.getSettings(jTe)}'
        'async function UTe(t){return __oshopStore.updateSettings(t,jTe)}'
        'async function E$(t){let c=__oshopSecurity.createDownloadCapability(),e=await __oshopStore.createRequest({...t,created_at:new Date().toISOString(),downloadTokenHash:c.tokenHash,downloadTokenExpiresAt:c.expiresAt});return{id:e,downloadToken:c.token}}'
        'async function zTe(t=50){return __oshopStore.listRequests(t)}'
        'async function WTe(t){return __oshopStore.getRequest(t)}'
        'async function HTe(t){let e=new Date().toISOString();return __oshopStore.createNegotiation({request_id:t.requestId,created_at:e,updated_at:e,supplier:t.supplier,product:t.product,url:t.url??null,image:t.image??null,status:"needs_approval",data:t.data})}'
        'async function XTe(){return __oshopStore.listNegotiations(100)}'
        'async function VTe(t,e){return __oshopStore.updateNegotiationStatus(t,e,new Date().toISOString())}'
        'async function GTe(){return __oshopStore.stats()}'
    )
    text = text[:start] + replacement + text[end:]

    edits = [
        ('async function jC(t){let e=Vs(),', 'async function jC(t){let e=await Vs(),', 'currency settings read'),
        ('async function YTe(){let t=Vs(),', 'async function YTe(){let t=await Vs(),', 'FX settings read'),
        ('async function T$(){let t=Vs(),', 'async function T$(){let t=await Vs(),', 'sourcing settings read'),
        ('function eCe(t,e){let r=Mxt[e],i=Vs(),n=', 'function eCe(t,e,i){let r=Mxt[e],n=', 'explicit prompt settings snapshot'),
        ('f=t.some(g=>g.image),p=g=>{let y=[{role:"system",content:eCe(e,r)}]', 'f=t.some(g=>g.image),__oshopPromptSettings=await Vs(),p=g=>{let y=[{role:"system",content:eCe(e,r,__oshopPromptSettings)}]', 'OpenAI prompt settings snapshot'),
        ('system:eCe(e,r),tools:tCe', 'system:eCe(e,r,await Vs()),tools:tCe', 'Anthropic prompt settings read'),
        ('c=E$({brand:r,kind:"sourcing"', 'c=await E$({brand:r,kind:"sourcing"', 'await durable sourcing request'),
        ('o=E$({brand:r,kind:"compare"', 'o=await E$({brand:r,kind:"compare"', 'await durable comparison request'),
        ('f.negotiation&&HTe({requestId:c.id', 'f.negotiation&&await HTe({requestId:c.id', 'await durable negotiation'),
        ('let cfg=Vs(),rate=', 'let cfg=await Vs(),rate=', 'SHEIN shared settings read'),
        ('e.get("/api/fx",async(r,i)=>i.json(await YTe()))', 'e.get("/api/fx",__oshopSecurity.asyncHandler(async(r,i)=>i.json(await YTe())))', 'FX async error boundary'),
    ]
    for old, new, label in edits:
        text = replace_exact(text, old, new, label)

    old_routes = 'e.get("/api/settings",(r,i)=>i.json(Vs())),e.put("/api/settings",(r,i)=>{let n=r.body??{},a=o=>Number.isFinite(Number(o))&&Number(o)>=0?Number(o):void 0,s={};(n.rateMode==="official"||n.rateMode==="parallel")&&(s.rateMode=n.rateMode);for(let o of["officialUsd","parallelUsd","airUsdPerKg","seaUsdPerCbm","serviceFeePercent","customsPercent"]){let u=a(n[o]);u!==void 0&&(s[o]=u)}i.json(UTe(s))}),e.get("/api/staff/overview",(r,i)=>i.json({stats:GTe(),requests:zTe(30),negotiations:XTe()})),e.post("/api/staff/negotiations/:id",(r,i)=>{let n=r.body?.status;if(!["approved","rejected","needs_approval","sent"].includes(n))return i.status(400).json({error:"bad status"});VTe(Number(r.params.id),n),i.json({ok:!0})}),e.get("/api/requests/:id/excel",async(r,i)=>{let n=WTe(Number(r.params.id));if(!n||n.kind!=="sourcing")return i.status(404).json({error:"not found"});let a=(0,cCe.join)((0,uCe.tmpdir)(),`oshop-${n.id}.xlsx`);await hSe(n.payload,await T$(),a),i.download(a,`oshop-report-${n.id}.xlsx`)})'
    new_routes = (
        'e.get("/api/settings",__oshopSecurity.asyncHandler(async(r,i)=>i.json(await Vs()))),'
        'e.put("/api/settings",__oshopSecurity.asyncHandler(async(r,i)=>{let n=r.body??{},a=o=>Number.isFinite(Number(o))&&Number(o)>=0?Number(o):void 0,s={};(n.rateMode==="official"||n.rateMode==="parallel")&&(s.rateMode=n.rateMode);for(let o of["officialUsd","parallelUsd","airUsdPerKg","seaUsdPerCbm","serviceFeePercent","customsPercent"]){let u=a(n[o]);u!==void 0&&(s[o]=u)}i.json(await UTe(s))})),'
        'e.get("/api/staff/overview",__oshopSecurity.asyncHandler(async(r,i)=>{let[stats,requests,negotiations]=await Promise.all([GTe(),zTe(30),XTe()]);i.setHeader("Cache-Control","no-store");i.json({stats,requests,negotiations})})),'
        'e.post("/api/staff/negotiations/:id",__oshopSecurity.asyncHandler(async(r,i)=>{let n=r.body?.status,a=Number(r.params.id);if(!Number.isSafeInteger(a)||a<1||!["approved","rejected","needs_approval","sent"].includes(n))return i.status(400).json({error:"bad request"});if(!await VTe(a,n))return i.status(404).json({error:"not found"});i.json({ok:!0})})),'
        'e.get("/api/requests/:id/excel",__oshopSecurity.asyncHandler(async(r,i)=>{let n=r.oshopRequestRecord||await WTe(Number(r.params.id));if(!n||n.kind!=="sourcing")return i.status(404).json({error:"not found"});let a=(0,cCe.join)((0,uCe.tmpdir)(),`oshop-${n.id}.xlsx`);await hSe(n.payload,await T$(),a),i.download(a,`oshop-report-${n.id}.xlsx`)}))'
    )
    text = replace_exact(text, old_routes, new_routes, "shared settings, staff and export routes")
    validate(text)
    API.write_text(text, encoding="utf-8")
    print("Oshop shared-storage integration applied.")


if __name__ == "__main__":
    main()
