from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
SERVER = ROOT / "vercel-output/functions/api.func/index.cjs"
FRONTEND = ROOT / "vercel-output/static/assets/index-6ttDirym.js"
HELPER = ROOT / "tools/product-matching.cjs"


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected one match, found {count}")
    return text.replace(old, new, 1)


server = SERVER.read_text(encoding="utf-8")
helper = HELPER.read_text(encoding="utf-8")
helper = re.sub(r"\nmodule\.exports\s*=\s*\{[^\n]*\};\s*$", "\n", helper)
if "function productMatchesTitle(" not in helper:
    raise SystemExit("product matching helper not found")

# Keep enough candidates to filter precisely, then filter every store's results against
# the original Arabic request plus that store's search language before persisting cards.
server = replace_once(server, "a.slice(0,4)}async function ZTe(", "a.slice(0,12)}async function ZTe(", "candidate pool")
# Inject the same pure matcher tested by node:test into the existing server bundle.
server = replace_once(server, "async function ZTe(", helper + "\nasync function ZTe(", "matcher injection")
server = replace_once(
    server,
    "s=a.flatMap(u=>u.items.slice(0,1).map(c=>({...c,country:u.country}))).sort((u,c)=>u.priceLyd-c.priceLyd)[0],",
    's=(a=a.map(m=>({...m,items:(m.items??[]).filter(x=>productMatchesTitle(x.title,e.query_ar||"",m.market==="trendyol"?e.query_tr||"":e.query_en||""))}))).flatMap(u=>u.items.slice(0,1).map(c=>({...c,country:u.country}))).sort((u,c)=>u.priceLyd-c.priceLyd)[0],',
    "strict result filtering",
)
server = replace_once(
    server,
    "function Lxt(t){return t.map(e=>({market:e.name,country:e.country,best:e.items[0]?{title:e.items[0].title.slice(0,80),priceLyd:e.items[0].priceLyd,price:`${e.items[0].price} ${e.items[0].currency}`}:null,error:e.error}))}",
    "function Lxt(t){return t.map(e=>({market:e.name,country:e.country,matches:e.items.slice(0,5).map(i=>({title:i.title.slice(0,100),priceLyd:i.priceLyd,price:`${i.price} ${i.currency}`})),best:e.items[0]?{title:e.items[0].title.slice(0,80),priceLyd:e.items[0].priceLyd,price:`${e.items[0].price} ${e.items[0].currency}`}:null,error:e.error}))}",
    "assistant-visible matches",
)

# Tell the model not to broaden the product request, and to offer only opt-in alternatives.
strict_prompt = (
    "- المطابقة الصارمة: التزم بنوع المنتج وماركتِه وكل صفة جوهرية ذكرها العميل (اللون، الخامة، الشكل، النقش، التطريز، المقاس). لا تعرض ساعة مع عباية أو حزامًا مع حذاء، ولا تعتبر المنتج القريب مطابقًا. ابحث بعبارة تتضمن هذه المواصفات؛ أداة البحث تستبعد النتائج غير المطابقة. "
    "اعرض أفضل 5 منتجات مطابقة كحد أقصى. إذا وجدت أقل من 5 فلا تملأ العدد ببدائل؛ اذكر عدد المطابقات واطلب إذن العميل لتوسيع البحث. "
    "بعد رد البحث أضف اقتراحات اختيارية قصيرة: نوع مختلف، سعر أقل لنفس النوع، أو توسيع المواصفات. لا تبحث عن بديل قبل أن يختاره العميل.\n- لو الزبون طلب منتج بالجملة (كمية كبيرة لمحل):"
)
server = replace_once(
    server,
    "- لو الزبون طلب منتج بالجملة (كمية كبيرة لمحل):",
    strict_prompt,
    "strict search instructions",
)
SERVER.write_text(server, encoding="utf-8")

front = FRONTEND.read_text(encoding="utf-8")
front = replace_once(
    front,
    'function nS({card:n}){const r=n.results.filter(a=>a.items?.length).map(a=>({...a,best:a.items[0]})).sort((a,l)=>a.best.priceLyd-l.best.priceLyd),s=n.results.filter(a=>!a.items?.length);',
    'function nS({card:n}){const r=n.results.flatMap(a=>(a.items??[]).map(best=>({...a,best}))).sort((a,l)=>a.best.priceLyd-l.best.priceLyd).slice(0,5),s=n.results.filter(a=>!a.items?.length&&a.error);',
    "five exact offers in comparison card",
)
front = replace_once(front, 'children:[r.length," أسواق · بالدينار"]', 'children:[r.length," اقتراحات مطابقة · بالدينار"]', "comparison count label")
front = replace_once(
    front,
    'children:["سعر المنتج في بلده بدون الشحن. اضغط اطلب ونكملولك الطلب على واتساب.",s.length?` ما قدرناش نجيب: ${s.map(a=>a.country).join("، ")}.`:""]',
    'children:[r.length?`نعرض ${r.length} من 5 خيارات مطابقة فقط. السعر في بلده بدون الشحن؛ اضغط اطلب ونكملولك الطلب على واتساب.`:"ما لقيناش عروضًا تطابق النوع والمواصفات المطلوبة. ما عرضنا منتجات مختلفة؛ قل لنا إذا تبي نوسّع البحث.",s.length?` تعذر جلب نتائج من: ${s.map(a=>a.country).join("، ")}.`:""]',
    "exact-match empty-state and footer",
)
front = replace_once(front, ']},a.market))}),c.jsxs("div",{className:"p-3 text-[0.68rem] faint"', ']},a.market+"-"+l))}),c.jsxs("div",{className:"p-3 text-[0.68rem] faint"', "unique row keys")
front = replace_once(front, 'data-testid":`button-order-${a.market}`', 'data-testid":`button-order-${a.market}-${l}`', "unique order button ids")
front = replace_once(
    front,
    'compare:["دورلي على ماركة أصلية","كم يوصلني لين ليبيا؟","فيه أرخص منه؟"]',
    'compare:["أريد نوعًا مختلفًا","ابحث عن سعر أقل لنفس النوع","وسّع المواصفات مع الحفاظ على النوع"]',
    "opt-in follow-up suggestions",
)
FRONTEND.write_text(front, encoding="utf-8")
print("Applied strict product matching, five-result presentation, and opt-in suggestion changes.")
