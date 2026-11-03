#!/usr/bin/env python3
"""Install deterministic, fail-closed SHEIN share-link routing in the generated API."""
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
API = ROOT / "vercel-output/functions/api.func/index.cjs"
CORE = ROOT / "tools/shein-cart-routing-core.cjs"
STORE = ROOT / "vercel-output/functions/api.func/shared-store.cjs"
MARK = "/* KB_SHEIN_CART_ROUTE_V1 */"
STORE_MARK = "-- SHEIN_FX_CONFIGURED_V1"
ROUTE_ANCHOR = 'let n=[],a=[],last=t[t.length-1]?.text||"";if(isProductRequest(last)){'
ROUTE_REPLACEMENT = 'let n=[],a=[],last=t[t.length-1]?.text||"",route=__KBSheinCartRouting.classify(last,Boolean(__KBSheinCartReaderPromise),isProductRequest(last));if(route.kind==="cart-unavailable")return __KBSheinCartRouting.unavailableResponse();if(route.kind==="cart"){let invocation=__KBSheinCartRouting.dispatch(route,url=>rCe("calculate_shein_cart",{url},e,n)),result=await invocation.value;return __KBSheinCartRouting.mapCartRead(result,n)}if(route.kind==="product-search"){'


def fail(message):
    raise SystemExit(message)


def replace_once(text, old, new, label):
    count = text.count(old)
    if count != 1:
        fail(f"expected exactly one {label} anchor, got {count}")
    return text.replace(old, new, 1)


def patch_store(text):
    count = text.count(STORE_MARK)
    if count not in (0, 1):
        fail(f"invalid configured-rate marker count: {count}")
    old = """local patch = cjson.decode(ARGV[2])
for k,v in pairs(patch) do
  if k ~= 'usdToLyd' then base[k] = v end
end
if base.rateMode == 'parallel' then"""
    new = """local patch = cjson.decode(ARGV[2])
-- SHEIN_FX_CONFIGURED_V1
local rateTouched = patch.rateMode ~= nil or patch.officialUsd ~= nil or patch.parallelUsd ~= nil
for k,v in pairs(patch) do
  if k ~= 'usdToLyd' and k ~= 'usdToLydConfigured' then base[k] = v end
end
if rateTouched then
  local configuredRate = tonumber(base.rateMode == 'parallel' and base.parallelUsd or base.officialUsd)
  base.usdToLydConfigured = configuredRate ~= nil and configuredRate > 0
elseif base.usdToLydConfigured ~= true then
  base.usdToLydConfigured = false
end
if base.rateMode == 'parallel' then"""
    if count == 0:
        text = replace_once(text, old, new, "admin-only configured-rate persistence")
    required = (
        "local rateTouched = patch.rateMode ~= nil or patch.officialUsd ~= nil or patch.parallelUsd ~= nil",
        "k ~= 'usdToLydConfigured'",
        "base.usdToLydConfigured = configuredRate ~= nil and configuredRate > 0",
    )
    if not all(token in text for token in required):
        fail("configured-rate store logic is incomplete")
    return text


def patch_api(text, core):
    count = text.count(MARK)
    if count not in (0, 1):
        fail(f"invalid SHEIN routing marker count: {count}")
    export_line = "module.exports = createSheinCartRoutingCore();"
    if core.count(export_line) != 1:
        fail("routing core export anchor changed")
    inline_core = core.replace(export_line, "var __KBSheinCartRouting = createSheinCartRoutingCore();", 1)
    if count == 0:
        text = replace_once(
            text,
            "async function A$(t,e,r,i){",
            MARK + "\n" + inline_core.rstrip() + "\nasync function A$(t,e,r,i){",
            "chat handler helper injection",
        )
        text = replace_once(text, ROUTE_ANCHOR, ROUTE_REPLACEMENT, "chat intent route")
    else:
        helper_start = text.index(MARK) + len(MARK)
        helper_end = text.find("\nasync function A$(t,e,r,i){", helper_start)
        if helper_end < 0:
            fail("cannot locate the chat handler after the routing helper")
        text = text[:helper_start] + "\n" + inline_core.rstrip() + text[helper_end:]
        old_reader_classifier = "__KBSheinCartRouting.classify(last,Boolean(process.env.OMKAR_API_KEY),isProductRequest(last))"
        new_reader_classifier = "__KBSheinCartRouting.classify(last,Boolean(__KBSheinCartReaderPromise),isProductRequest(last))"
        if old_reader_classifier in text:
            text = replace_once(text, old_reader_classifier, new_reader_classifier, "direct reader availability check")
        required = (
            "__KBSheinCartRouting.classify(last,Boolean(__KBSheinCartReaderPromise),isProductRequest(last))",
            'if(route.kind==="cart-unavailable")',
            'if(route.kind==="cart")',
            'if(route.kind==="product-search")',
            'dispatch(route,url=>rCe("calculate_shein_cart",{url},e,n))',
        )
        if "/* KB_SHEIN_DIRECT_READER_V1 */" in text:
            reader_required = (
                'source:"shein-cart"',
                "qty:null",
                "totalLyd:null",
                'exchangeRateConfigured:rateConfig.configured',
            )
        else:
            reader_required = (
                'quantitiesComplete=items.every(item=>Number.isInteger(item.qty)&&item.qty>=1)',
                'totalsComplete=exchangeRateConfigured&&available.length>0&&pricesComplete&&quantitiesComplete',
                'unitLyd:priceKnown&&exchangeRateConfigured?Math.round(price*rate*100)/100:null',
                'exchangeRateConfigured,rateMode,shippingLyd:0',
                'qty=Number.isInteger(numericQty)&&numericQty>=1&&numericQty<=100000?numericQty:null',
                'for(let attempt=0;attempt<1;attempt++)',
                'if(!resp?.ok||!data||data.error)',
            )
        if not all(token in text for token in (*required, *reader_required)):
            fail("partial or incomplete deterministic SHEIN route detected")

    default_old = 'var jTe={rateMode:"official",officialUsd:6.43,parallelUsd:9.9,usdToLyd:6.43,airUsdPerKg:9,seaUsdPerCbm:280,serviceFeePercent:5,customsPercent:0};'
    default_new = 'var jTe={rateMode:"official",officialUsd:6.43,parallelUsd:9.9,usdToLyd:6.43,usdToLydConfigured:false,airUsdPerKg:9,seaUsdPerCbm:280,serviceFeePercent:5,customsPercent:0};'
    if default_old in text:
        text = replace_once(text, default_old, default_new, "unconfigured default exchange rate")

    old_cart_prompt = "لو أرسل الزبون رابط مشاركة سلة SHEIN (خصوصًا onelink.shein.com)، استعمل أداة calculate_shein_cart فورًا. لا تطلب منه نسخ المنتجات ولا تحيله لحاسبة خارجية. الأداة تقرأ السلة الحقيقية وتعيد أسماء المنتجات والأسعار والألوان والمقاسات والتوفر، ثم اعرض الإجمالي بالدينار الليبي. لا تقل إن البيانات توضيحية ولا تخترع منتجات أو أسعارًا؛ إذا تعذر القارئ قل إن خدمة قراءة السلة غير متاحة مؤقتًا."
    new_cart_prompt = "لو أرسل الزبون رابط سلة SHEIN الأصلية أو رابط المشاركة الأصلي (خصوصًا onelink.shein.com)، استخدم calculate_shein_cart فورًا ولا تحوّله إلى بحث منتجات. تعرض الأداة أسماء الأصناف والألوان والخيارات والأسعار الأصلية بالدولار. حوّل سعر الوحدة فقط عند usdToLydConfigured=true وبسعر USD/LYD المضبوط من المدير؛ وإلا اعرض الدولار فقط وقل إن المدير لم يضبط سعر الصرف. لا تخمّن كمية: إذا غابت، اطلب كمية كل صنف ولا تعرض إجماليًا حتى تتحدد كل الكميات. لا تخترع منتجات أو أسعارًا؛ إذا فشل القارئ أو انتهت مهلته قل بوضوح إن قراءة السلة غير متاحة مؤقتًا، ولا تعرض 0 اقتراحات أو إجماليًا صفريًا."
    if old_cart_prompt in text:
        text = replace_once(text, old_cart_prompt, new_cart_prompt, "original SHEIN cart prompt")
    old_exchange_prompt = '- الأسعار بالدينار الليبي. سعر الدولار المعتمد توا: ${i.usdToLyd} د.ل (${i.rateMode==="parallel"?"السوق الموازي":"السعر الرسمي"}).'
    new_exchange_prompt = '- الأسعار بالدينار الليبي. سعر الدولار المعتمد توا: ${i.usdToLyd} د.ل (${i.rateMode==="parallel"?"السوق الموازي":"السعر الرسمي"}). لسلة SHEIN استخدم هذا السعر فقط إذا كان usdToLydConfigured=true؛ وإلا اعرض الأسعار الأصلية بالدولار فقط ولا تعرض تحويلًا أو إجماليًا بالدينار.'
    if old_exchange_prompt in text:
        text = replace_once(text, old_exchange_prompt, new_exchange_prompt, "SHEIN FX prompt guard")
    fx_guard_phrase = ' لسلة SHEIN استخدم هذا السعر فقط إذا كان usdToLydConfigured=true؛ وإلا اعرض الأسعار الأصلية بالدولار فقط ولا تعرض تحويلًا أو إجماليًا بالدينار.'
    while fx_guard_phrase + fx_guard_phrase in text:
        text = text.replace(fx_guard_phrase + fx_guard_phrase, fx_guard_phrase)
    old_tool_description = 'description:"يقرأ رابط مشاركة سلة SHEIN ويحسب قيمة المنتجات بالدينار الليبي داخل المحادثة. استعملها تلقائيًا عند وجود رابط onelink.shein.com أو رابط مشاركة SHEIN."'
    new_tool_description = 'description:"يقرأ رابط سلة SHEIN الأصلي ويعيد الأصناف والخيارات والأسعار بالدولار؛ يحوّل سعر الوحدة فقط بسعر USD/LYD الذي ضبطه المدير. لا يفترض كمية ولا يحسب إجماليًا حتى تُعرف كميات جميع الأصناف. استعملها تلقائيًا عند وجود رابط onelink.shein.com أو رابط مشاركة SHEIN."'
    if old_tool_description in text:
        text = replace_once(text, old_tool_description, new_tool_description, "SHEIN cart tool contract")

    quantity_old = 'qty=Math.max(1,Number(item.quantity??item.qty??item.quantity_selected??item.purchase_quantity??1)||1)'
    quantity_new = 'rawQty=item.quantity??item.qty??item.quantity_selected??item.purchase_quantity??null,numericQty=rawQty==null||String(rawQty).trim()===""?NaN:Number(rawQty),qty=Number.isInteger(numericQty)&&numericQty>=1&&numericQty<=100000?numericQty:null'
    if quantity_old in text:
        text = replace_once(text, quantity_old, quantity_new, "explicit-only SHEIN quantity parser")

    old_retry = "for(let attempt=0;attempt<3;attempt++){"
    if old_retry in text:
        text = replace_once(text, old_retry, "for(let attempt=0;attempt<1;attempt++){", "single bounded Omkar attempt")
    retry_delay = "if(attempt<2)await new Promise(resolve=>setTimeout(resolve,1500))"
    text = text.replace(retry_delay, "")
    null_response_guard = "if(!resp.ok||!data||data.error)"
    if null_response_guard in text:
        text = replace_once(text, null_response_guard, "if(!resp?.ok||!data||data.error)", "null-safe reader error mapping")
    old_rate = 'let cfg=await Vs(),rate=Number(cfg.usdToLyd||cfg.officialUsd||cfg.parallelUsd)||8,raw=Array.isArray(data.items)?data.items:[],items=raw.map(item=>{'
    new_rate = 'let cfg=await Vs(),rateConfig=__KBSheinCartRouting.resolveRate(cfg),exchangeRateConfigured=rateConfig.configured,rate=rateConfig.rate,rateMode=rateConfig.rateMode,raw=Array.isArray(data.items)?data.items:[],items=raw.map(item=>{'
    if old_rate in text:
        text = replace_once(text, old_rate, new_rate, "manager-configured SHEIN exchange rate")

    old_totals = '}),available=items.filter(item=>item.available),pricesComplete=available.every(item=>item.priceKnown===true),subtotal=pricesComplete?available.reduce((sum,item)=>sum+item.totalLyd,0):null,rounded=pricesComplete?Math.ceil(subtotal/5)*5:null,details=items.map'
    new_totals = '});if(!items.length)return{error:"لم يعثر القارئ على عناصر في رابط السلة."};let available=items.filter(item=>item.available),pricesComplete=available.every(item=>item.priceKnown===true),quantitiesComplete=items.every(item=>Number.isInteger(item.qty)&&item.qty>=1),totalsComplete=items.length>0&&pricesComplete&&quantitiesComplete,subtotal=totalsComplete?available.reduce((sum,item)=>sum+item.totalLyd,0):null,rounded=totalsComplete?Math.ceil(subtotal/5)*5:null,details=items.map'
    if old_totals in text:
        text = replace_once(text, old_totals, new_totals, "empty-cart and complete-total guard")
    old_total_gate = "totalsComplete=items.length>0&&pricesComplete&&quantitiesComplete"
    new_total_gate = "totalsComplete=exchangeRateConfigured&&items.length>0&&pricesComplete&&quantitiesComplete"
    if old_total_gate in text:
        text = replace_once(text, old_total_gate, new_total_gate, "exchange-rate total guard")
    old_available_gate = "totalsComplete=exchangeRateConfigured&&items.length>0&&pricesComplete&&quantitiesComplete"
    new_available_gate = "totalsComplete=exchangeRateConfigured&&available.length>0&&pricesComplete&&quantitiesComplete"
    if old_available_gate in text:
        text = replace_once(text, old_available_gate, new_available_gate, "available-products total guard")

    old_item_prices = 'unitUsd:price,priceKnown,totalUsd:priceKnown&&qty!==null?Math.round(price*qty*100)/100:null,totalLyd:priceKnown&&qty!==null?Math.round(price*qty*rate*100)/100:null'
    new_item_prices = 'unitUsd:price,unitLyd:priceKnown&&exchangeRateConfigured?Math.round(price*rate*100)/100:null,priceKnown,totalUsd:priceKnown&&qty!==null?Math.round(price*qty*100)/100:null,totalLyd:priceKnown&&qty!==null&&exchangeRateConfigured?Math.round(price*qty*rate*100)/100:null'
    if old_item_prices in text:
        text = replace_once(text, old_item_prices, new_item_prices, "configured per-unit LYD and quantity-gated line totals")

    old_qty_label = 'الكمية: ${item.qty}'
    new_qty_label = 'الكمية: ${item.qty===null?"غير مذكورة":item.qty}'
    if old_qty_label in text:
        text = replace_once(text, old_qty_label, new_qty_label, "non-guessed quantity label")
    old_price_detail = '${item.priceKnown?`سعر القطعة: ${item.unitUsd} USD = ${Math.round(item.totalLyd*100)/100} د.ل`:"السعر غير متاح"}'
    new_price_detail = '${!item.priceKnown?"السعر غير متاح":item.unitLyd===null?`سعر الوحدة: ${item.unitUsd} USD؛ سعر الصرف غير مضبوط، لا يوجد تحويل للدينار`:`سعر الوحدة: ${item.unitUsd} USD = ${item.unitLyd} د.ل${item.qty===null?"":`; قيمة الصنف: ${item.totalLyd} د.ل`}`}'
    if old_price_detail in text:
        text = replace_once(text, old_price_detail, new_price_detail, "configured per-unit customer price summary")

    if 'subtotalLyd:pricesComplete?Math.round(subtotal*100)/100:null,totalBeforeRoundingLyd:pricesComplete?Math.round(subtotal*100)/100:null' in text:
        text = replace_once(
            text,
            'subtotalLyd:pricesComplete?Math.round(subtotal*100)/100:null,totalBeforeRoundingLyd:pricesComplete?Math.round(subtotal*100)/100:null',
            'subtotalLyd:totalsComplete?Math.round(subtotal*100)/100:null,totalBeforeRoundingLyd:totalsComplete?Math.round(subtotal*100)/100:null',
            "quantity-gated cart totals",
        )
    if "customerSummary:pricesComplete?" in text:
        text = replace_once(text, "customerSummary:pricesComplete?", "customerSummary:totalsComplete?", "quantity-gated customer summary")
    text = text.replace("تعذر حساب الإجمالي: سعر موثوق لمنتج متاح غير متوفر.", "تعذر حساب الإجمالي؛ الكميات أو أسعار بعض العناصر غير مكتملة.")
    text = text.replace("الكميات مأخوذة من بيانات السلة، وإذا لم يرسل الرابط الكمية تُحسب القطعة بكمية 1.", "الكميات تُستخدم فقط إذا أرسلها القارئ؛ لا تُفترض كمية بديلة.")
    text = text.replace("تعذر حساب الإجمالي؛ الكميات أو أسعار بعض العناصر غير مكتملة.", "تعذر حساب الإجمالي؛ سعر الصرف غير مضبوط أو الكميات/الأسعار غير مكتملة.")
    text = text.replace('...(pricesComplete?[]:["تعذر احتساب الإجمالي لغياب سعر موثوق لمنتج متاح."])', '...(totalsComplete?[]:["تعذر احتساب الإجمالي قبل تأكيد الكميات والأسعار."])')
    text = text.replace('...(totalsComplete?[]:["تعذر احتساب الإجمالي قبل تأكيد الكميات والأسعار."])', '...(totalsComplete?[]:["تعذر احتساب الإجمالي قبل ضبط سعر الصرف وتأكيد الكميات والأسعار."])')
    if 'currency:"USD",exchangeRate:rate,shippingLyd:0' in text:
        text = replace_once(text, 'currency:"USD",exchangeRate:rate,shippingLyd:0', 'currency:"USD",exchangeRate:rate,exchangeRateConfigured,rateMode,shippingLyd:0', "configured exchange-rate result metadata")

    # The generated API is patchable repeatedly, but must fail rather than leave a partial route.
    required = (
        MARK,
        'if(route.kind==="cart-unavailable")',
        'if(route.kind==="cart")',
        'usdToLydConfigured:false',
        'لسلة SHEIN استخدم هذا السعر فقط إذا كان usdToLydConfigured=true',
    )
    if "/* KB_SHEIN_DIRECT_READER_V1 */" in text:
        reader_required = ('source:"shein-cart"', 'qty:null', 'totalLyd:null')
    else:
        reader_required = (
            'quantitiesComplete=items.every(item=>Number.isInteger(item.qty)&&item.qty>=1)',
            'totalsComplete=exchangeRateConfigured&&available.length>0&&pricesComplete&&quantitiesComplete',
            'unitLyd:priceKnown&&exchangeRateConfigured?Math.round(price*rate*100)/100:null',
            'exchangeRateConfigured,rateMode,shippingLyd:0',
            'qty=Number.isInteger(numericQty)&&numericQty>=1&&numericQty<=100000?numericQty:null',
            'for(let attempt=0;attempt<1;attempt++)',
            'if(!resp?.ok||!data||data.error)',
            'if(!items.length)return{error:"لم يعثر القارئ على عناصر في رابط السلة."}',
        )
    if not all(token in text for token in (*required, *reader_required)):
        fail("SHEIN routing patch is incomplete; refusing to write generated API")
    if "qty=Math.max(1,Number(item.quantity??item.qty??item.quantity_selected??item.purchase_quantity??1)||1)" in text:
        fail("a default quantity of one remains in the SHEIN reader")
    return text


def main():
    api_text = API.read_text()
    store_text = STORE.read_text()
    core = CORE.read_text()
    if not core.strip():
        fail("SHEIN routing core is empty")
    next_api = patch_api(api_text, core)
    next_store = patch_store(store_text)
    if next_api != api_text:
        API.write_text(next_api)
    if next_store != store_text:
        STORE.write_text(next_store)
    subprocess.run(["node", "--check", str(API)], check=True)
    subprocess.run(["node", "--check", str(STORE)], check=True)
    print("SHEIN share routing and configured-rate patch applied safely")


if __name__ == "__main__":
    main()
