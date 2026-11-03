#!/usr/bin/env python3
"""Safely inject local per-item quantity review into the generated KB cart UI."""
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
API = ROOT / "vercel-output/functions/api.func/index.cjs"
BUNDLE = ROOT / "vercel-output/static/assets/index-6ttDirym.js"
CORE = ROOT / "tools/shein-cart-quantity-core.cjs"
UI = ROOT / "tools/shein-cart-quantity-ui.js"
API_MARK = "/* KB_SHEIN_ITEM_QUANTITY_API_V1 */"
CORE_MARK = "/* KB_SHEIN_ITEM_QUANTITY_CORE_V1 */"
UI_MARK = "/* KB_SHEIN_ITEM_QUANTITY_UI_V1 */"
CALL_MARK = "/* KB_SHEIN_ITEM_QUANTITY_CALL_V1 */"
DIRECT_MARK = "/* KB_SHEIN_DIRECT_READER_V1 */"
OSC_ANCHOR = "function OSC("
CHAT_TEXT = 'n.text&&c.jsx("div",{className:"bubble-ai whitespace-pre-wrap",style:n.error?{borderColor:"var(--danger)"}:void 0,children:n.text})'
CHAT_CARD_END = 'l.type==="track"?c.jsx(rS,{data:l.data},h):null'


def fail(message):
    raise SystemExit(message)


def replace_once(text, old, new, label):
    count = text.count(old)
    if count != 1:
        fail(f"expected exactly one {label} anchor, got {count}")
    return text.replace(old, new, 1)


def patch_api(text):
    count = text.count(API_MARK)
    if count not in (0, 1):
        fail(f"invalid API marker count: {count}")
    if count:
        if DIRECT_MARK in text:
            direct_required = (
                'source:"shein-cart"',
                "qty:null",
                "totalLyd:null",
                'exchangeRateConfigured:rateConfig.configured',
                'priceKnown=priceAmount!==null&&priceCurrency==="USD"',
            )
            if not all(token in text for token in direct_required):
                fail("partial direct SHEIN quantity contract detected")
            return text
        old_guard = 'priceKnown=price!==null&&Number.isFinite(price)&&price>=0'
        safe_guard = 'priceKnown=price!==null&&(typeof rawPrice==="number"||typeof rawPrice==="string")&&Number.isFinite(price)&&price>=0'
        if old_guard in text and safe_guard not in text:
            text = replace_once(text, old_guard, safe_guard, "raw-price type guard")
        required = ("priceKnown", "pricesComplete", safe_guard)
        total_guard = "totalBeforeRoundingLyd:totalsComplete?" if "KB_SHEIN_CART_ROUTE_V1" in text else "totalBeforeRoundingLyd:pricesComplete?"
        if not all(token in text for token in required) or total_guard not in text:
            fail("partial API quantity patch detected")
        return text

    text = replace_once(text, 'if(t==="calculate_shein_cart"){let n=', API_MARK + 'if(t==="calculate_shein_cart"){let n=', "SHEIN cart API branch")
    text = replace_once(
        text,
        'let price=Number(item.pricing?.sale_price?.amount_usd??item.pricing?.sale_price?.amount??item.pricing?.retail_price?.amount_usd??item.pricing?.retail_price?.amount??0),qty=',
        'let rawPrice=item.pricing?.sale_price?.amount_usd??item.pricing?.sale_price?.amount??item.pricing?.retail_price?.amount_usd??item.pricing?.retail_price?.amount??null,price=rawPrice==null||String(rawPrice).trim()===""?null:Number(rawPrice),priceKnown=price!==null&&(typeof rawPrice==="number"||typeof rawPrice==="string")&&Number.isFinite(price)&&price>=0,qty=',
        "price extraction",
    )
    text = replace_once(
        text,
        'unitUsd:price,totalUsd:Math.round(price*qty*100)/100,totalLyd:Math.round(price*qty*rate*100)/100,available:',
        'unitUsd:price,priceKnown,totalUsd:priceKnown?Math.round(price*qty*100)/100:null,totalLyd:priceKnown?Math.round(price*qty*rate*100)/100:null,available:',
        "per-item totals",
    )
    text = replace_once(
        text,
        '),available=items.filter(item=>item.available),subtotal=available.reduce((sum,item)=>sum+item.totalLyd,0),rounded=Math.ceil(subtotal/5)*5,details=items.map',
        '),available=items.filter(item=>item.available),pricesComplete=available.every(item=>item.priceKnown===true),subtotal=pricesComplete?available.reduce((sum,item)=>sum+item.totalLyd,0):null,rounded=pricesComplete?Math.ceil(subtotal/5)*5:null,details=items.map',
        "available subtotal",
    )
    text = replace_once(
        text,
        'الكمية: ${item.qty}\nسعر القطعة: ${item.unitUsd} USD = ${Math.round(item.totalLyd*100)/100} د.ل${item.options?',
        'الكمية: ${item.qty}\n${item.priceKnown?`سعر القطعة: ${item.unitUsd} USD = ${Math.round(item.totalLyd*100)/100} د.ل`:"السعر غير متاح"}${item.options?',
        "customer detail price",
    )
    text = replace_once(
        text,
        'subtotalLyd:Math.round(subtotal*100)/100,totalBeforeRoundingLyd:Math.round(subtotal*100)/100,totalLyd:rounded,items,summary:data.summary||null,customerSummary:`تفاصيل سلة شي إن:\n\n${details}\n\nالإجمالي قبل التقريب: ${Math.round(subtotal*100)/100} د.ل\nالإجمالي المطلوب: ${rounded} د.ل`,warnings:["الأسعار مقروءة مباشرة من سلة SHEIN عبر Omkar.","الكميات مأخوذة من بيانات السلة، وإذا لم يرسل الرابط الكمية تُحسب القطعة بكمية 1.","الشحن مجاني حسب قواعد KB، والإجمالي مقرب لأقرب 5 د.ل."]',
        'subtotalLyd:pricesComplete?Math.round(subtotal*100)/100:null,totalBeforeRoundingLyd:pricesComplete?Math.round(subtotal*100)/100:null,totalLyd:rounded,items,summary:data.summary||null,customerSummary:pricesComplete?`تفاصيل سلة شي إن:\n\n${details}\n\nالإجمالي قبل التقريب: ${Math.round(subtotal*100)/100} د.ل\nالإجمالي المطلوب: ${rounded} د.ل`:`تفاصيل سلة شي إن:\n\n${details}\n\nتعذر حساب الإجمالي: سعر موثوق لمنتج متاح غير متوفر.`,warnings:["الأسعار مقروءة مباشرة من سلة SHEIN عبر Omkar.","الكميات مأخوذة من بيانات السلة، وإذا لم يرسل الرابط الكمية تُحسب القطعة بكمية 1.","الشحن مجاني حسب قواعد KB، والإجمالي مقرب لأقرب 5 د.ل.",...(pricesComplete?[]:["تعذر احتساب الإجمالي لغياب سعر موثوق لمنتج متاح."])]',
        "safe missing-price summary",
    )
    return text


def patch_bundle(text, core, ui):
    counts = {marker: text.count(marker) for marker in (CORE_MARK, UI_MARK, CALL_MARK)}
    if any(count not in (0, 1) for count in counts.values()):
        fail(f"invalid UI marker counts: {counts}")
    if any(counts.values()) and not all(counts.values()):
        fail("partial UI quantity patch detected")
    enabled = 'var KB_SHEIN_QTY_ENABLED=typeof window!=="undefined"&&["kb-online-store.vercel.app","localhost","127.0.0.1"].includes(window.location.hostname);'
    injected = f"{CORE_MARK}\n{core.rstrip()}\n{UI_MARK}\n{ui.rstrip()}\n{enabled}\n"
    if all(counts.values()):
        if "kb-online-store.vercel.app" not in text or "shein-cart-quantity-card" not in text:
            fail("incomplete UI quantity patch detected")
        if text.count(OSC_ANCHOR) != 1:
            fail(f"expected one OSC anchor, got {text.count(OSC_ANCHOR)}")
        start = text.index(CORE_MARK)
        end = text.index(OSC_ANCHOR, start)
        return text[:start] + injected + text[end:]

    if text.count(OSC_ANCHOR) != 1:
        fail(f"expected one OSC anchor, got {text.count(OSC_ANCHOR)}")
    if text.count(CHAT_TEXT) != 1:
        fail(f"expected one chat text renderer, got {text.count(CHAT_TEXT)}")
    if text.count(CHAT_CARD_END) != 1:
        fail(f"expected one chat card renderer end, got {text.count(CHAT_CARD_END)}")

    text = text.replace(OSC_ANCHOR, injected + OSC_ANCHOR, 1)
    new_chat_text = 'n.text&&!(KB_SHEIN_QTY_ENABLED&&n.cards?.some(x=>x.type==="shein_cart"))&&c.jsx("div",{className:"bubble-ai whitespace-pre-wrap",style:n.error?{borderColor:"var(--danger)"}:void 0,children:n.text})'
    text = replace_once(text, CHAT_TEXT, new_chat_text, "chat text renderer")
    new_card_end = 'l.type==="track"?c.jsx(rS,{data:l.data},h):l.type==="shein_cart"&&KB_SHEIN_QTY_ENABLED?c.jsx(KBSheinCartQuantityCard,{card:l},h):null'
    text = replace_once(text, CHAT_CARD_END, new_card_end, "chat cart card renderer")
    text = text.replace('l.type==="shein_cart"&&KB_SHEIN_QTY_ENABLED?', CALL_MARK + 'l.type==="shein_cart"&&KB_SHEIN_QTY_ENABLED?', 1)
    if any(text.count(marker) != 1 for marker in (CORE_MARK, UI_MARK, CALL_MARK)):
        fail("failed to produce one complete UI quantity patch")
    return text


def main():
    api_text = API.read_text()
    bundle_text = BUNDLE.read_text()
    core = CORE.read_text()
    ui = UI.read_text()
    if not core.strip() or not ui.strip():
        fail("quantity core/UI source is empty")
    next_api = patch_api(api_text)
    next_bundle = patch_bundle(bundle_text, core, ui)
    if next_api != api_text:
        API.write_text(next_api)
    if next_bundle != bundle_text:
        BUNDLE.write_text(next_bundle)
    # Fail before declaring success if either generated JavaScript is syntactically invalid.
    subprocess.run(["node", "--check", str(API)], check=True)
    subprocess.run(["node", "--input-type=module", "--check"], input=next_bundle, text=True, check=True)
    print("SHEIN per-item quantity review patch applied safely")


if __name__ == "__main__":
    main()
