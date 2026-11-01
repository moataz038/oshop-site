const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const Q = require('./shein-cart-quantity-core.cjs');

function item(overrides = {}) {
  return {
    id: 'sku-1', title: 'قميص', qty: 2, unitUsd: 10, priceKnown: true,
    available: true, sku: 'sku-1', color: 'أسود', size: 'M', options: null,
    ...overrides
  };
}
function result(overrides = {}) {
  return {
    source: 'omkar', live: true, exchangeRate: 8, shippingLyd: 0, serviceFeeLyd: 0,
    items: [item()], ...overrides
  };
}

test('result is recalculated from trusted unit prices using existing line rounding and 5 LYD ceiling', () => {
  const source = result({ items: [item({ unitUsd: 1.01, qty: 2 })] });
  const frozen = JSON.stringify(source);
  const calc = Q.recalculate(source, [3]);
  assert.equal(calc.ok, true);
  assert.equal(calc.items[0].totalUsd, 3.03);
  assert.equal(calc.items[0].totalLyd, 24.24);
  assert.equal(calc.subtotalLyd, 24.24);
  assert.equal(calc.totalBeforeRoundingLyd, 24.24);
  assert.equal(calc.totalLyd, 25);
  assert.equal(calc.totalPieces, 3);
  assert.equal(calc.changed, true);
  assert.equal(JSON.stringify(source), frozen, 'source result is immutable');
});

test('quantity zero removes only that available line from the local estimate', () => {
  const source = result({ items: [item({ qty: 2 }), item({ id: 'sku-2', qty: 1, unitUsd: 2, title: 'حزام' })] });
  const calc = Q.recalculate(source, [0, 1]);
  assert.equal(calc.ok, true);
  assert.equal(calc.totalPieces, 1);
  assert.equal(calc.subtotalLyd, 16);
  assert.equal(calc.totalLyd, 20);
});

test('unavailable items can be edited locally but remain excluded from every total', () => {
  const source = result({ items: [item(), item({ id: 'sku-x', title: 'نفد', qty: 3, unitUsd: 4, available: false })] });
  const calc = Q.recalculate(source, [2, 4]);
  assert.equal(calc.ok, true);
  assert.equal(calc.totalPieces, 6);
  assert.equal(calc.excludedPieces, 4);
  assert.equal(calc.subtotalLyd, 160);
  assert.equal(calc.totalLyd, 160);
});

test('missing or invalid price on an available item blocks recalculation instead of inventing zero', () => {
  const legacy = item({ unitUsd: 10 });
  delete legacy.priceKnown;
  const cases = [
    item({ unitUsd: null, priceKnown: false }),
    item({ unitUsd: 0, priceKnown: false }),
    item({ unitUsd: NaN, priceKnown: true }),
    item({ unitUsd: -1, priceKnown: true }),
    legacy // old result without explicit trust marker
  ];
  for (const missing of cases) {
    const source = result({ items: [missing] });
    assert.equal(Q.canRecalculate(source), false);
    assert.equal(Q.recalculate(source, [1]).ok, false);
  }
});

test('explicit zero price from a trusted source is distinct from a missing price', () => {
  const source = result({ items: [item({ unitUsd: 0, priceKnown: true })] });
  const calc = Q.recalculate(source, [4]);
  assert.equal(calc.ok, true);
  assert.equal(calc.subtotalLyd, 0);
  assert.equal(calc.totalLyd, 0);
});

test('invalid quantities, mismatched arrays and unsupported result shapes fail closed', () => {
  const source = result();
  for (const bad of [[-1], [1.5], [100001], [NaN], ['2'], []]) {
    assert.equal(Q.recalculate(source, bad).ok, false);
  }
  assert.equal(Q.canRecalculate({ ...source, live: false }), false);
  assert.equal(Q.canRecalculate({ ...source, exchangeRate: 0 }), false);
  assert.equal(Q.canRecalculate({ ...source, shippingLyd: NaN }), false);
});

test('generated API and UI fail closed on missing prices and are restricted to the KB host', () => {
  const root = path.resolve(__dirname, '..');
  const api = fs.readFileSync(path.join(root, 'vercel-output/functions/api.func/index.cjs'), 'utf8');
  const bundle = fs.readFileSync(path.join(root, 'vercel-output/static/assets/index-6ttDirym.js'), 'utf8');
  assert.match(api, /KB_SHEIN_ITEM_QUANTITY_API_V1/);
  assert.match(api, /rawPrice=.*priceKnown=price!==null&&\(typeof rawPrice==="number"\|\|typeof rawPrice==="string"\)&&Number\.isFinite\(price\)&&price>=0/);
  assert.match(api, /pricesComplete=available\.every\(item=>item\.priceKnown===true\)/);
  assert.match(api, /totalBeforeRoundingLyd:pricesComplete\?Math\.round\(subtotal\*100\)\/100:null/);
  assert.match(bundle, /KB_SHEIN_ITEM_QUANTITY_CALL_V1/);
  assert.match(bundle, /\["kb-online-store\.vercel\.app","localhost","127\.0\.0\.1"\]\.includes\(window\.location\.hostname\)/);
  assert.match(bundle, /تعذر إعادة حساب الإجمالي لأن سعر عنصر متاح غير موجود أو غير صالح/);
});

test('the generated API price parser accepts only explicit finite numbers or numeric strings', () => {
  const root = path.resolve(__dirname, '..');
  const api = fs.readFileSync(path.join(root, 'vercel-output/functions/api.func/index.cjs'), 'utf8');
  const start = api.indexOf('let rawPrice=');
  const end = api.indexOf(',qty=', start);
  assert.ok(start >= 0 && end > start, 'API price expression must be present');
  const parsePrice = new Function('item', api.slice(start, end) + '; return { rawPrice, price, priceKnown };');
  assert.deepEqual(parsePrice({ pricing: { sale_price: { amount_usd: '12.5' } } }),
    { rawPrice: '12.5', price: 12.5, priceKnown: true });
  assert.deepEqual(parsePrice({ pricing: { sale_price: { amount_usd: 0 } } }),
    { rawPrice: 0, price: 0, priceKnown: true });
  assert.equal(parsePrice({ pricing: { sale_price: { amount_usd: false } } }).priceKnown, false);
  assert.equal(parsePrice({ pricing: { sale_price: { amount_usd: [] } } }).priceKnown, false);
  assert.equal(parsePrice({ pricing: { sale_price: { amount_usd: 'not-a-price' } } }).priceKnown, false);
  assert.equal(parsePrice({}).priceKnown, false);
});

test('patcher is idempotent and generated JavaScript remains syntactically valid', () => {
  const root = path.resolve(__dirname, '..');
  const paths = [
    path.join(root, 'vercel-output/functions/api.func/index.cjs'),
    path.join(root, 'vercel-output/static/assets/index-6ttDirym.js')
  ];
  cp.execFileSync('python3', ['tools/apply-shein-cart-quantity.py'], { cwd: root, stdio: 'pipe' });
  const first = paths.map(file => fs.readFileSync(file, 'utf8'));
  cp.execFileSync('python3', ['tools/apply-shein-cart-quantity.py'], { cwd: root, stdio: 'pipe' });
  const second = paths.map(file => fs.readFileSync(file, 'utf8'));
  assert.deepEqual(second, first);
  cp.execFileSync('node', ['--check', paths[0]], { cwd: root });
  cp.execFileSync('node', ['--input-type=module', '--check'], { cwd: root, input: second[1] });
});
