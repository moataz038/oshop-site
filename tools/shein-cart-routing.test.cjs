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
  return [{ type: 'shein_cart', result: { source: 'omkar', live: true, exchangeRate: 8, exchangeRateConfigured: true, rateMode: 'official', items } }];
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

test('successful mapping asks for item quantities and never assumes one per item', () => {
  const knownItems = [{ title: 'قميص', qty: 2 }, { title: 'حذاء', qty: 3 }];
  const known = routing.mapCartRead({ items: knownItems, exchangeRate: 8, exchangeRateConfigured: true }, cartCard(knownItems));
  assert.match(known.reply, /5 قطعة/);
  assert.match(known.reply, /أكّد/);

  const unknownItems = [{ title: 'قميص', qty: null }, { title: 'حذاء', qty: 3 }];
  const unknown = routing.mapCartRead({ items: unknownItems, exchangeRate: 8, exchangeRateConfigured: true }, cartCard(unknownItems));
  assert.match(unknown.reply, /أدخل كمية كل صنف/);
  assert.match(unknown.reply, /لن أفترض/);
  assert.doesNotMatch(unknown.reply, /4 قطع/);
});

test('a successful cart read with no configured rate shows USD only and no LYD amount', () => {
  const items = [{ title: 'قميص', qty: null, unitUsd: 10 }];
  const result = { items, exchangeRate: 6.43, exchangeRateConfigured: false, rateMode: 'official' };
  const response = routing.mapCartRead(result, cartCard(items));
  assert.match(response.reply, /بالدولار فقط/);
  assert.match(response.reply, /يضبط المدير سعر USD\/LYD/);
  assert.doesNotMatch(response.reply, /\d+(?:\.\d+)?\s*د\.ل|\d+(?:\.\d+)?\s*LYD/);
});

test('generated /api/chat route is deterministic, configuration-gated and single-attempt', () => {
  const api = fs.readFileSync(apiPath, 'utf8');
  const classifier = api.indexOf('__KBSheinCartRouting.classify(last,Boolean(process.env.OMKAR_API_KEY),isProductRequest(last))');
  const cartBranch = api.indexOf('if(route.kind==="cart")', classifier);
  const productBranch = api.indexOf('if(route.kind==="product-search")', cartBranch);
  assert.ok(classifier >= 0 && cartBranch > classifier && productBranch > cartBranch);
  assert.ok(api.includes('dispatch(route,url=>rCe("calculate_shein_cart",{url},e,n))'));
  assert.ok(api.includes('usdToLydConfigured:false'));
  assert.ok(api.includes('rateConfig=__KBSheinCartRouting.resolveRate(cfg)'));
  assert.ok(api.includes('exchangeRateConfigured=rateConfig.configured'));
  assert.ok(api.includes('totalsComplete=exchangeRateConfigured&&available.length>0&&pricesComplete&&quantitiesComplete'));
  assert.ok(api.includes('لسلة SHEIN استخدم هذا السعر فقط إذا كان usdToLydConfigured=true'));
  const readerStart = api.indexOf('if(t==="calculate_shein_cart")');
  const readerEnd = api.indexOf('if(t==="track_shipment")', readerStart);
  assert.ok(readerStart >= 0 && readerEnd > readerStart);
  const readerCode = api.slice(readerStart, readerEnd);
  assert.doesNotMatch(readerCode, /YTe\(|open\.er-api|exchange-rate-api/i);
  assert.ok(api.includes('for(let attempt=0;attempt<1;attempt++)'));
  assert.ok(!api.includes('for(let attempt=0;attempt<3;attempt++)'));
});

test('routing patcher is idempotent and generated API stays syntactically valid', () => {
  const first = fs.readFileSync(apiPath, 'utf8');
  cp.execFileSync('python3', ['tools/apply-shein-cart-routing.py'], { cwd: root, stdio: 'pipe' });
  const second = fs.readFileSync(apiPath, 'utf8');
  assert.equal(second, first);
  cp.execFileSync('node', ['--check', apiPath], { cwd: root });
});
