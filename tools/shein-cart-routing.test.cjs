const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const routing = require('./shein-cart-routing-core.cjs');
const root = path.resolve(__dirname, '..');
const apiPath = path.join(root, 'vercel-output/functions/api.func/index.cjs');

const shareUrl = 'https://onelink.shein.com/59/66xt9jtea33g?shc=2_RsCYK62VR14';

function cartCard(items) {
  return [{ type: 'shein_cart', result: { source: 'shein-cart', live: true, currency: 'USD', priceCurrency: 'USD', exchangeRate: 8, exchangeRateConfigured: true, rateMode: 'official', items } }];
}

test('share/cart links are routed to the cart reader before product search', () => {
  const route = routing.classify(`افحص هذه السلة ${shareUrl}`, true, true);
  assert.deepEqual(route, { kind: 'cart', url: shareUrl });
  assert.equal(routing.extractCartShareUrl(`راجع: ${shareUrl}).`), shareUrl);
  assert.equal(routing.classify('نبي فستان أسود', true, true).kind, 'product-search');
});

test('SHEIN product pages are not mistaken for share/cart links', () => {
  const productUrl = 'https://www.shein.com/Women-Dress-p-123456.html';
  assert.equal(routing.extractCartShareUrl(productUrl), null);
  assert.deepEqual(routing.classify(`نبي فستان من الرابط ${productUrl}`, true, true), { kind: 'product-search' });
  assert.equal(routing.classify('سؤال عام عن الفروع', true, false).kind, 'assistant');
});

test('the reader receives the original share URL only when configuration is available', () => {
  let calls = [];
  const unavailable = routing.classify(shareUrl, false, false);
  assert.deepEqual(unavailable, { kind: 'cart-unavailable' });
  assert.equal(routing.dispatch(unavailable, (url) => calls.push(url)).invoked, false);
  assert.deepEqual(calls, []);

  const ready = routing.classify(shareUrl, true, false);
  const invocation = routing.dispatch(ready, (url) => { calls.push(url); return { items: [] }; });
  assert.equal(invocation.invoked, true);
  assert.deepEqual(calls, [shareUrl]);
  assert.deepEqual(invocation.value, { items: [] });
});

test('the numeric default is not treated as an administrator-configured exchange rate', () => {
  assert.deepEqual(routing.resolveRate({ usdToLyd: 6.43, rateMode: 'official' }), { configured: false, rate: null, rateMode: 'official' });
  assert.deepEqual(routing.resolveRate({ usdToLyd: 12.5, usdToLydConfigured: true, rateMode: 'parallel' }), { configured: true, rate: 12.5, rateMode: 'parallel' });
  assert.equal(routing.resolveRate({ usdToLyd: 0, usdToLydConfigured: true }).configured, false);
  assert.equal(routing.resolveRate({ usdToLyd: 'not-a-rate', usdToLydConfigured: true }).configured, false);
});

test('timeout, reader error, empty items and missing card become clear failures, never zero suggestions or totals', () => {
  const cases = [
    [{ error: 'timeout' }, []],
    [{ items: [] }, []],
    [{ items: [{ qty: 1 }] }, []]
  ];
  for (const [result, cards] of cases) {
    const response = routing.mapCartRead(result, cards);
    assert.equal(response.cards.length, 0);
    assert.match(response.reply, /تعذرت قراءة سلة SHEIN/);
    assert.doesNotMatch(response.reply, /0 اقتراحات|0 د\.ل|إجماليًا صفريًا/);
  }
  assert.match(routing.unavailableResponse().reply, /لم أرسل الرابط للقارئ/);
});

test('successful mapping discards all quantities from the shared link and always asks the customer', () => {
  const knownItems = [{ title: 'قميص', qty: 2 }, { title: 'حذاء', qty: 3 }];
  const known = routing.mapCartRead({ items: knownItems, priceCurrency: 'USD', exchangeRate: 8, exchangeRateConfigured: true }, cartCard(knownItems));
  assert.match(known.reply, /حدّد كمية كل صنف/);
  assert.doesNotMatch(known.reply, /5 قطعة|مجموع الكميات/);
  assert.equal(known.cards[0].result.items[0].qty, null);
  assert.equal(known.cards[0].result.items[1].qty, null);
  assert.equal(known.cards[0].result.totalLyd, null);

  const unknownItems = [{ title: 'قميص', qty: null }, { title: 'حذاء', qty: 3 }];
  const unknown = routing.mapCartRead({ items: unknownItems, priceCurrency: 'USD', exchangeRate: 8, exchangeRateConfigured: true }, cartCard(unknownItems));
  assert.match(unknown.reply, /حدّد كمية كل صنف/);
  assert.doesNotMatch(unknown.reply, /4 قطع|مجموع الكميات/);
});

test('a successful cart read with no configured rate shows USD only and no LYD amount', () => {
  const items = [{ title: 'قميص', qty: null, unitUsd: 10 }];
  const result = { items, priceCurrency: 'USD', exchangeRate: 6.43, exchangeRateConfigured: false, rateMode: 'official' };
  const response = routing.mapCartRead(result, cartCard(items));
  assert.match(response.reply, /بالدولار فقط/);
  assert.match(response.reply, /يضبط المدير سعر USD\/LYD/);
  assert.doesNotMatch(response.reply, /\d+(?:\.\d+)?\s*د\.ل|\d+(?:\.\d+)?\s*LYD/);
});

test('non-USD prices stay in their source currency and never inherit the USD/LYD rate', () => {
  const items = [{ title: 'حذاء', qty: 4, unitPrice: 9, priceText: 'SR 9', priceCurrency: 'SAR', available: true }];
  const response = routing.mapCartRead({ items, currency: 'SAR', priceCurrency: 'SAR', exchangeRate: 12.5, exchangeRateConfigured: true }, cartCard(items));
  assert.match(response.reply, /SAR/);
  assert.match(response.reply, /لا أستخدم سعر USD\/LYD/);
  assert.doesNotMatch(response.reply, /\d+(?:\.\d+)?\s*(?:د\.ل|LYD)/);
  assert.equal(response.cards[0].result.items[0].qty, null);
  assert.equal(response.cards[0].result.items[0].priceText, 'SR 9');
  assert.equal(response.cards[0].result.totalLyd, null);
});

test('generated /api/chat route uses the direct reader and does not depend on Omkar', () => {
  const api = fs.readFileSync(apiPath, 'utf8');
  const classifier = api.indexOf('__KBSheinCartRouting.classify(last,Boolean(__KBSheinCartReaderPromise),isProductRequest(last))');
  const cartBranch = api.indexOf('if(route.kind==="cart")', classifier);
  const productBranch = api.indexOf('if(route.kind==="product-search")', cartBranch);
  assert.ok(classifier >= 0 && cartBranch > classifier && productBranch > cartBranch);
  assert.ok(api.includes('dispatch(route,url=>rCe("calculate_shein_cart",{url},e,n))'));
  assert.ok(api.includes('var __KBSheinCartReaderPromise=import("./shein-direct-reader.mjs");'));
  assert.ok(api.includes('source:"shein-cart"'));
  assert.ok(api.includes('qty:null'));
  assert.ok(api.includes('totalLyd:null'));
  assert.doesNotMatch(api, /OMKAR_API_KEY|shein-scraper\.omkar\.cloud|API-Key/);
  assert.doesNotMatch(api, /source:"shein-cart",live:!0,url:/);
  assert.ok(api.includes('usdToLydConfigured:false'));
  assert.ok(api.includes('rateConfig=__KBSheinCartRouting.resolveRate(cfg)'));
  assert.ok(api.includes('exchangeRateConfigured:rateConfig.configured'));
  assert.ok(api.includes('priceKnown=priceAmount!==null&&priceCurrency==="USD"'));
  assert.doesNotMatch(api, /priceCurrency=String\(item\?\.currency\|\|item\?\.price\?\.currency\|\|cart\?\.currency/);
  assert.ok(api.includes('priceCurrency=currencies.length===1&&items.every(item=>item.priceCurrency===currencies[0])?currencies[0]:currencies.length?"MIXED":""'));
  assert.doesNotMatch(api, /priceCurrency=currencies\.length===1\?currencies\[0\]:currencies\.length>1\?"MIXED":String\(cart\?\.currency/);
  assert.ok(api.includes('لسلة SHEIN استخدم هذا السعر فقط إذا كان usdToLydConfigured=true'));
});

test('routing patcher is idempotent and generated API stays syntactically valid', () => {
  const first = fs.readFileSync(apiPath, 'utf8');
  cp.execFileSync('python3', ['tools/apply-shein-cart-routing.py'], { cwd: root, stdio: 'pipe' });
  const second = fs.readFileSync(apiPath, 'utf8');
  assert.equal(second, first);
  cp.execFileSync('node', ['--check', apiPath], { cwd: root });
});
