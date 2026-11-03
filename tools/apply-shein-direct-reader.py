#!/usr/bin/env python3
"""Install the read-only, privacy-safe direct SHEIN shared-cart reader."""
from pathlib import Path
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
API = ROOT / "vercel-output/functions/api.func/index.cjs"
SOURCE = ROOT / "tools/shein-direct-reader.mjs"
OUTPUT = ROOT / "vercel-output/functions/api.func/shein-direct-reader.mjs"
MARK = "/* KB_SHEIN_DIRECT_READER_V1 */"
IMPORT_MARK = "/* KB_SHEIN_DIRECT_READER_LOADER_V1 */"
TOOL_START = '/* KB_SHEIN_ITEM_QUANTITY_API_V1 */if(t==="calculate_shein_cart"){'
TOOL_END = 'if(t==="track_shipment")'
HELPER_ANCHOR = "function iCe(){"
DIRECT_CALL = '__KBSheinReaderSafeLog({response:err&&Number.isInteger(err.status)?{ok:false,status:err.status}:null,error:err?.code==="timeout"?{name:"TimeoutError"}:err?.code==="network"?{name:"TypeError"}:null,hasData:false,providerError:false})'
BRANCH = '''/* KB_SHEIN_ITEM_QUANTITY_API_V1 */if(t==="calculate_shein_cart"){let n=String(e.url||"").trim();try{let reader=await __KBSheinCartReaderPromise,cart=await reader.getCart(n,{currency:"USD"}),cfg=await Vs(),rateConfig=__KBSheinCartRouting.resolveRate(cfg),rate=rateConfig.configured?rateConfig.rate:null,raw=Array.isArray(cart?.items)?cart.items:[];if(!raw.length)return{error:"لم يعثر قارئ SHEIN على أصناف متاحة في رابط المشاركة."};if(raw.length>80)return{error:"السلة تحتوي عناصر أكثر من الحد الآمن للقراءة."};let items=raw.map(item=>{let rawPrice=item?.price?.amount,price=rawPrice==null||String(rawPrice).trim()===""?null:Number(rawPrice),priceAmount=price!==null&&Number.isFinite(price)&&price>=0?price:null,priceCurrency=String(item?.currency||item?.price?.currency||cart?.currency||"").toUpperCase(),priceKnown=priceAmount!==null&&priceCurrency==="USD",rawOptions=item?.attr??null,options=typeof rawOptions==="string"?rawOptions:Array.isArray(rawOptions)?rawOptions.join("، "):null;return{id:String(item?.id||item?.sku||"shein-item").slice(0,100),title:String(item?.name||"منتج SHEIN").slice(0,300),qty:null,unitUsd:priceKnown?priceAmount:null,unitPrice:priceAmount,priceText:typeof item?.price?.text==="string"?item.price.text.slice(0,100):null,priceCurrency,priceKnown,available:item?.status==="normal"&&!item?.soldOut,sku:String(item?.sku||"").slice(0,100),color:String(item?.color||"").slice(0,120),size:String(item?.size||"").slice(0,80),options:typeof options==="string"?options.slice(0,300):null}});let currencies=[...new Set(items.map(item=>item.priceCurrency).filter(Boolean))],priceCurrency=currencies.length===1?currencies[0]:currencies.length>1?"MIXED":String(cart?.currency||"").toUpperCase(),details=items.map((item,index)=>{let lines=[`الصنف ${index+1}: ${item.title}`,`الكود: ${item.sku||"غير متوفر"}`,`اللون: ${item.color||"غير مذكور"}`,`المقاس: ${item.size||"غير مذكور"}`];if(item.priceKnown)lines.push(`سعر الوحدة: ${item.priceText||`${item.unitUsd} USD`}`);else if(item.priceText)lines.push(`السعر كما عرضه SHEIN: ${item.priceText}${item.priceCurrency?` (${item.priceCurrency})`:""}`);else lines.push("السعر غير متاح من القراءة");if(item.options)lines.push(`الخيارات: ${item.options}`);if(!item.available)lines.push("غير متاح حسب القراءة الأخيرة");return lines.join("\\n")}).join("\\n\\n"),customerSummary=`تفاصيل سلة SHEIN المقروءة مباشرة:\\n\\n${details}\\n\\nلم تُعتمد كمية أي صنف. حدّد كمية كل صنف أولًا؛ لا يظهر إجمالي قبل ذلك.`,result={source:"shein-cart",live:true,currency:priceCurrency,priceCurrency,exchangeRate:rate,exchangeRateConfigured:rateConfig.configured,rateMode:rateConfig.rateMode,shippingLyd:0,serviceFeeLyd:0,subtotalLyd:null,totalBeforeRoundingLyd:null,totalLyd:null,items,customerSummary,warnings:["الأسعار والخيارات كما أعادها موقع SHEIN وقت القراءة وقد تتغير.","لم تُقرأ أو تُفترض كميات؛ أدخل كمية كل صنف قبل أي إجمالي.",...(priceCurrency!=="USD"?["الأسعار ليست بعملة USD؛ لم تُحوّل إلى الدينار ولم يُحتسب إجمالي LYD."]:[])]};return i.push({type:"shein_cart",result}),result}catch(err){if(err&&(err.status===403||err.status>=500||err.code==="network"||err.code==="timeout"))__KBSheinReaderSafeLog({response:err&&Number.isInteger(err.status)?{ok:false,status:err.status}:null,error:err?.code==="timeout"?{name:"TimeoutError"}:err?.code==="network"?{name:"TypeError"}:null,hasData:false,providerError:false});let message=err?.code==="bad_link"?"أرسل رابط مشاركة SHEIN صالحًا من onelink.shein.com.":err?.code==="expired"?"يبدو أن رابط مشاركة SHEIN منتهي أو غير متاح.":err?.code==="not_cart"?"الرابط لا يشير إلى سلة مشاركة من SHEIN.":err?.code==="risk"?"رفضت SHEIN قراءة السلة مؤقتًا؛ لم أغيّر السلة ولم أنفذ شراءً.":err?.code==="timeout"?"انتهت مهلة القراءة المباشرة من SHEIN؛ لم أعرض نتائج أو إجماليًا.":"تعذرت قراءة سلة SHEIN مباشرة الآن؛ لم أعرض نتائج أو إجماليًا.";return{error:message}}}'''
BRANCH = BRANCH.replace('if(t==="calculate_shein_cart"){', 'if(t==="calculate_shein_cart"){/* KB_SHEIN_DIRECT_READER_V1 */', 1)
BRANCH = BRANCH.replace('priceCurrency=String(item?.currency||item?.price?.currency||cart?.currency||"").toUpperCase()', 'priceCurrency=String(item?.currency||item?.price?.currency||"").toUpperCase()', 1)
BRANCH = BRANCH.replace('priceCurrency=currencies.length===1?currencies[0]:currencies.length>1?"MIXED":String(cart?.currency||"").toUpperCase()', 'priceCurrency=currencies.length===1&&items.every(item=>item.priceCurrency===currencies[0])?currencies[0]:currencies.length?"MIXED":""', 1)


def fail(message):
    raise SystemExit(message)


def replace_once(text, old, new, label):
    count = text.count(old)
    if count != 1:
        fail(f"expected exactly one {label} anchor, got {count}")
    return text.replace(old, new, 1)


def patch_api(text):
    if text.count(TOOL_START) != 1 or text.count(TOOL_END) < 1:
        fail("cannot locate the SHEIN cart tool branch")
    start = text.index(TOOL_START)
    end = text.index(TOOL_END, start)
    if MARK in text[start:end]:
        current_branch = text[start:end]
        legacy_direct_branch = BRANCH.replace(
            'priceCurrency=currencies.length===1&&items.every(item=>item.priceCurrency===currencies[0])?currencies[0]:currencies.length?"MIXED":""',
            'priceCurrency=currencies.length===1?currencies[0]:currencies.length>1?"MIXED":String(cart?.currency||"").toUpperCase()',
            1,
        )
        earlier_direct_branch = legacy_direct_branch.replace(
            'priceCurrency=String(item?.currency||item?.price?.currency||"").toUpperCase()',
            'priceCurrency=String(item?.currency||item?.price?.currency||cart?.currency||"").toUpperCase()',
            1,
        )
        if current_branch in (legacy_direct_branch, earlier_direct_branch):
            text = text[:start] + BRANCH + text[end:]
        elif current_branch != BRANCH:
            fail("direct SHEIN reader branch is incomplete")
    else:
        text = text[:start] + BRANCH + text[end:]

    loader = IMPORT_MARK + chr(10) + 'var __KBSheinCartReaderPromise=import("./shein-direct-reader.mjs");' + chr(10)
    if text.count(IMPORT_MARK) == 0:
        text = replace_once(text, HELPER_ANCHOR, loader + HELPER_ANCHOR, "direct reader module loader")
    elif text.count(IMPORT_MARK) != 1:
        fail("invalid direct-reader loader marker count")
    if text.count("var __KBSheinCartReaderPromise=import(\"./shein-direct-reader.mjs\");") != 1:
        fail("direct reader loader is missing or duplicated")
    if text.count(MARK) != 1:
        fail("direct reader marker is missing or duplicated")
    forbidden = ("OMKAR_API_KEY", "shein-scraper.omkar.cloud", 'headers:{"API-Key"')
    if any(token in text for token in forbidden):
        fail("paid Omkar reader code remains in runtime API")
    required = (
        'source:"shein-cart"',
        "qty:null",
        "totalLyd:null",
        "exchangeRateConfigured:rateConfig.configured",
        DIRECT_CALL,
    )
    if not all(token in text[start:start + len(BRANCH) + 20] for token in required):
        fail("direct reader output contract is incomplete")
    return text


def main():
    if not SOURCE.is_file() or not SOURCE.read_text().strip():
        fail("direct reader source is missing")
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(SOURCE, OUTPUT)
    api_text = API.read_text()
    next_api = patch_api(api_text)
    if next_api != api_text:
        API.write_text(next_api)
    subprocess.run(["node", "--check", str(OUTPUT)], check=True)
    subprocess.run(["node", "--check", str(API)], check=True)
    print("Read-only direct SHEIN cart reader installed")


if __name__ == "__main__":
    main()
