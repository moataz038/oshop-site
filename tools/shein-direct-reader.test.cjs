const test = require("node:test");
const assert = require("node:assert/strict");

const LINK = "https://onelink.shein.com/59/66xt9jtea33g?shc=2_RsCYK62VR14";
const originalFetch = global.fetch;
const readerPromise = import("./shein-direct-reader.mjs");

function pageResponse(text, status = 200, headers = {}) {
  return new Response(text, { status, headers: { "content-type": "text/html; charset=utf-8", ...headers } });
}
function cartResponse(info, status = 200) {
  return new Response(JSON.stringify({ code: "0", info }), { status, headers: { "content-type": "application/json" } });
}
function sampleInfo() {
  return {
    normalProducts: [{
      goods_id: "sku-1",
      goods_sn: "SH123",
      goods_name: "Jacket",
      goodsAttr: "Black / M",
      colorName: "Black",
      sizeName: "M",
      quantity: 17,
      salePrice: { amount: "10.50", amountWithSymbol: "$10.50" },
    }],
    outStock: [],
    unavailable: [],
  };
}
function setupShareAndCart(fetchCart) {
  const seen = [];
  const appjump = "https://api-shein.shein.com/h5/sharejump/appjump?share=1";
  global.fetch = async (input, init = {}) => {
    const url = new URL(typeof input === "string" ? input : input.url);
    seen.push({ url, init });
    if (url.hostname === "onelink.shein.com") {
      return pageResponse(`<input id="url" value="${appjump.replaceAll("&", "&amp;")}">`);
    }
    if (url.hostname === "api-shein.shein.com") {
      return pageResponse('var shareInfo = {"id":"123456789","share_type":"cart","localcountry":"OTHER"};\n');
    }
    if (url.pathname.includes("/bff-api/order/cart/share/landing")) return fetchCart(url, init, seen);
    throw new Error("Unexpected test request host");
  };
  return seen;
}

test.afterEach(() => { global.fetch = originalFetch; });

test("reads a public share through SHEIN only, returns product details, and omits quantities and share URLs", async () => {
  const seen = setupShareAndCart(async () => cartResponse(sampleInfo()));
  const reader = await readerPromise;
  const cart = await reader.getCart(LINK, { currency: "USD" });

  assert.equal(seen.length, 3);
  assert.deepEqual(seen.map((request) => request.url.hostname), ["onelink.shein.com", "api-shein.shein.com", "m.shein.com"]);
  assert.equal(seen[2].init.method, "POST");
  assert.equal(seen[2].url.pathname, "/bff-api/order/cart/share/landing");
  assert.equal(JSON.parse(seen[2].init.body).groupId, "123456789");
  assert.equal(seen[2].init.headers.authorization, undefined);
  assert.match(seen[2].init.headers.cookie, /^armorUuid=\d{14}[a-f0-9]{50}$/);

  assert.equal(cart.currency, "USD");
  assert.equal(cart.items.length, 1);
  assert.equal(cart.items[0].name, "Jacket");
  assert.equal(cart.items[0].sku, "SH123");
  assert.equal(cart.items[0].color, "Black");
  assert.equal(cart.items[0].size, "M");
  assert.equal(cart.items[0].price.amount, 10.5);
  assert.equal(cart.items[0].currency, "USD");
  assert.equal("qty" in cart.items[0], false);
  assert.equal("quantity" in cart.items[0], false);
  assert.equal("groupId" in cart, false);
  assert.equal("landingUrl" in cart, false);
  assert.doesNotMatch(JSON.stringify(cart), /66xt9jtea33g|123456789|onelink\.shein\.com|landingUrl/);
});

test("retries an HTTP 403 exactly once with a newly minted armorUuid", async () => {
  const bffCalls = [];
  setupShareAndCart(async (_url, init) => {
    bffCalls.push(init.headers.cookie);
    return bffCalls.length === 1 ? new Response("{}", { status: 403 }) : cartResponse(sampleInfo());
  });
  const reader = await readerPromise;
  const cart = await reader.getCart(LINK, { currency: "USD" });
  assert.equal(cart.items.length, 1);
  assert.equal(bffCalls.length, 2);
  assert.notEqual(bffCalls[0], bffCalls[1]);
  assert.match(bffCalls[0], /^armorUuid=\d{14}[a-f0-9]{50}$/);
  assert.match(bffCalls[1], /^armorUuid=\d{14}[a-f0-9]{50}$/);
});

test("rejects arbitrary hosts and unsafe redirects before following them", async () => {
  let calls = 0;
  global.fetch = async () => { calls++; return pageResponse("never"); };
  const reader = await readerPromise;
  await assert.rejects(reader.getCart("https://attacker.example/cart/share/landing?group_id=123456789"), (error) => error.code === "bad_link");
  assert.equal(calls, 0);

  global.fetch = async () => { calls++; return new Response(null, { status: 302, headers: { location: "https://attacker.example/steal" } }); };
  await assert.rejects(reader.getCart(LINK), (error) => error.code === "bad_link");
  assert.equal(calls, 1);
});

test("a SHEIN risk-control response fails closed without echoing response data", async () => {
  setupShareAndCart(async () => new Response(JSON.stringify({ code: "836100", msg: "private payload text" }), { status: 200 }));
  const reader = await readerPromise;
  await assert.rejects(reader.getCart(LINK), (error) => error.code === "risk" && !error.message.includes("private payload"));
});

test("regional bare-dollar prices are not guessed to be USD", async () => {
  const reader = await readerPromise;
  assert.equal(reader.__test.currencyCode(null, "$12.00", "m.shein.com/ar", "USD"), "");
  assert.equal(reader.__test.currencyCode(null, "$12.00", "m.shein.com", "USD"), "USD");
  assert.equal(reader.__test.currencyCode("SAR", "SR 12", "m.shein.com/ar", "USD"), "SAR");
});

test("reader source contains no persistent cart cache, logging, credentials, or mutation endpoints", async () => {
  const fs = require("node:fs");
  const path = require("node:path");
  const source = fs.readFileSync(path.join(__dirname, "shein-direct-reader.mjs"), "utf8");
  assert.doesNotMatch(source, /console\.(?:log|warn|error)|localStorage|redis|cartCache|siteCache|authorization|API-Key/i);
  assert.doesNotMatch(source, /\/bff-api\/order\/cart\/(?:add|update|delete|checkout|submit)/i);
  assert.match(source, /response\.status === 403/);
  assert.match(source, /randomBytes\(25\)/);
});
