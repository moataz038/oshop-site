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
    source: "shein-cart", live: true, priceCurrency: "USD", exchangeRate: 8, exchangeRateConfigured: true, rateMode: "official", shippingLyd: 0, serviceFeeLyd: 0,
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

test('a cart with no available products does not become a zero-LYD order total', () => {
  const source = result({ items: [item({ qty: 2, available: false })] });
  assert.equal(Q.canRecalculate(source), false);
  assert.equal(Q.recalculate(source, [2]).ok, false);
  const root = path.resolve(__dirname, '..');
  const bundle = fs.readFileSync(path.join(root, 'vercel-output/static/assets/index-6ttDirym.js'), 'utf8');
  assert.match(bundle, /لم أعرض إجماليًا صفريًا كأنه سعر الطلب/);
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
  assert.equal(Q.canRecalculate({ ...source, exchangeRateConfigured: false }), false);
  assert.equal(Q.canRecalculate({ ...source, shippingLyd: NaN }), false);
  assert.equal(Q.canRecalculate({ ...source, items: [] }), false);
  assert.equal(Q.recalculate({ ...source, items: [] }, []).ok, false);
});

test('missing quantities stay blank until the customer enters each item quantity', () => {
  const source = result({ items: [item({ qty: null }), item({ id: 'sku-2', title: 'حذاء', qty: null, unitUsd: 20 })] });
  assert.equal(Q.canRecalculate(source), true, 'valid USD prices and configured rate allow local quantity entry');
  assert.equal(Q.recalculate(source, [NaN, NaN]).ok, false, 'blank quantities cannot create a total');
  const calc = Q.recalculate(source, [2, 1]);
  assert.equal(calc.ok, true);
  assert.equal(calc.totalPieces, 3);
  assert.equal(calc.items[0].unitLyd, 80);
  assert.equal(calc.items[0].totalLyd, 160);
  assert.equal(calc.totalLyd, 320);
});

test('a numeric default rate is not trusted until the administrator explicitly configures it', () => {
  const defaultRate = result({ exchangeRate: 6.43, exchangeRateConfigured: false });
  assert.equal(Q.canRecalculate(defaultRate), false);
  assert.equal(Q.recalculate(defaultRate, [1]).ok, false);
});

test('generated API and UI use the direct reader, configured USD rate, and KB-host-only quantity card', () => {
  const root = path.resolve(__dirname, '..');
  const api = fs.readFileSync(path.join(root, 'vercel-output/functions/api.func/index.cjs'), 'utf8');
  const bundle = fs.readFileSync(path.join(root, 'vercel-output/static/assets/index-6ttDirym.js'), 'utf8');
  assert.match(api, /KB_SHEIN_ITEM_QUANTITY_API_V1/);
  assert.match(api, /KB_SHEIN_DIRECT_READER_V1/);
  assert.match(api, /var __KBSheinCartReaderPromise=import\("\.\/shein-direct-reader\.mjs"\)/);
  assert.match(api, /source:"shein-cart"/);
  assert.match(api, /qty:null/);
  assert.match(api, /totalLyd:null/);
  assert.match(api, /exchangeRateConfigured:rateConfig\.configured/);
  assert.doesNotMatch(api, /OMKAR_API_KEY|shein-scraper\.omkar\.cloud|API-Key/);
  assert.match(bundle, /KB_SHEIN_ITEM_QUANTITY_CALL_V1/);
  assert.match(bundle, /\["kb-online-store\.vercel\.app","localhost","127\.0\.0\.1"\]\.includes\(window\.location\.hostname\)/);
  assert.match(bundle, /أدخل كمية كل صنف ليظهر إجمالي القطع والسلة/);
  assert.match(bundle, /سعر الصرف USD\/LYD غير مضبوط من لوحة المدير/);
  assert.match(bundle, /لن أستخدم سعر USD\/LYD لتحويل هذه العملة أو حساب إجمالي/);
  assert.match(bundle, /سعر الوحدة .* USD/);
});

test('quantity core never converts a non-USD SHEIN price with the USD/LYD rate', () => {
  const foreign = result({ priceCurrency: 'SAR', items: [item({ unitUsd: null, unitPrice: 10, priceText: 'SR 10', priceCurrency: 'SAR', priceKnown: false })] });
  assert.equal(Q.canRecalculate(foreign), false);
  assert.equal(Q.recalculate(foreign, [2]).ok, false);
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
