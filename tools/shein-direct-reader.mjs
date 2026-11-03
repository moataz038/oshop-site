// Adapted from shein-cart by Ibrahim Hajjaj (MIT); see vendor/shein-cart/NOTICE.md.
// This reader is read-only: it resolves public cart shares and calls SHEIN's
// shared-cart landing endpoint. It does not authenticate, mutate a cart, or buy.
import { randomBytes } from "node:crypto";

const UA = "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36";
const BFF_PATH = "/bff-api/order/cart/share/landing?_ver=1.1.8&_lang=en";
const MAX_INPUT_CHARS = 4096;
const MAX_PAGE_BYTES = 1024 * 1024;
const MAX_JSON_BYTES = 2 * 1024 * 1024;
const MAX_ITEMS = 80;
const TOTAL_BUDGET_MS = 45_000;
const PER_REQUEST_MS = 10_000;

const SITE_MAP = [
  ["m.shein.com/us", ["us"]],
  ["m.shein.com.mx", ["mx"]],
  ["m.shein.com/es", ["es"]],
  ["m.shein.com/it", ["it"]],
  ["m.shein.com/fr", ["fr"]],
  ["m.shein.com/de", ["de", "at", "lu"]],
  ["m.shein.in", ["in"]],
  ["m.shein.tw", ["tw"]],
  ["m.shein.co.uk", ["gb"]],
  ["m.shein.com/au", ["au"]],
  ["m.shein.com/ru", ["ru", "by", "kz"]],
  ["m.shein.com/ar", ["sa", "kw", "ae", "qa", "om", "bh"]],
  ["m.shein.com.vn", ["vn"]],
  ["m.shein.com.hk", ["hk"]],
  ["m.shein.com/th", ["th"]],
  ["m.shein.com/il", ["il"]],
  ["m.shein.com/ca", ["ca"]],
  ["m.shein.se", ["se"]],
  ["m.shein.com/eur", ["be", "bg", "cz", "dk", "ee", "fi", "gr", "hu", "lv", "lt", "ro", "sk", "si", "ie", "cy", "mt", "hr"]],
  ["m.shein.com/cl", ["cl"]],
  ["m.shein.com/ma", ["ma"]],
  ["m.shein.com/br", ["br"]],
  ["m.shein.com/za", ["za"]],
  ["m.shein.com/sg", ["sg"]],
];
const FALLBACK_SITES = ["m.shein.com", "m.shein.com/au", "m.shein.com/ar", "m.shein.com.mx"];
const MOBILE_SITES = new Set([...SITE_MAP.map(([site]) => site), ...FALLBACK_SITES]);
const SITE_HOSTS = new Set([...MOBILE_SITES].map((site) => site.split("/")[0]));
const URL_RE = /(?:https?:\/\/|sheinlink:\/\/)[^\s<>"'`]+/gi;

export class ShareLinkError extends Error {
  constructor(code, status = 502) {
    super("SHEIN shared cart could not be read.");
    this.name = "ShareLinkError";
    this.code = code;
    this.status = status;
  }
}

function fail(code, status) {
  throw new ShareLinkError(code, status);
}

function safeString(value, max = 400) {
  if (value == null || typeof value === "object") return "";
  return String(value).replace(/<[^>]*>/g, " ").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function hasSafeOrigin(url) {
  return url instanceof URL && url.protocol === "https:" && !url.username && !url.password && !url.port && !url.hash;
}

function validOnelinkUrl(url) {
  return hasSafeOrigin(url) && url.hostname.toLowerCase() === "onelink.shein.com" && /^\/\d{1,4}\/[a-z0-9_-]{4,160}\/?$/i.test(url.pathname);
}

function siteParts(site) {
  const [host, ...parts] = site.split("/");
  return { host, prefix: parts.join("/") };
}

function siteForLanding(url) {
  if (!hasSafeOrigin(url) || !SITE_HOSTS.has(url.hostname.toLowerCase())) return "";
  const groupId = url.searchParams.get("group_id") || "";
  if (!/^\d{6,30}$/.test(groupId)) return "";
  for (const site of MOBILE_SITES) {
    const { host, prefix } = siteParts(site);
    if (host !== url.hostname.toLowerCase()) continue;
    const expected = `/${prefix ? `${prefix}/` : ""}cart/share/landing`;
    if (url.pathname === expected || url.pathname === `${expected}/`) return site;
  }
  return "";
}

function validateTextUrl(input) {
  let url;
  try { url = input instanceof URL ? input : new URL(input); } catch { fail("bad_link", 400); }
  if (!hasSafeOrigin(url)) fail("bad_link", 400);
  const host = url.hostname.toLowerCase();
  if (validOnelinkUrl(url)) return url;
  if (host === "api-shein.shein.com" && url.pathname === "/h5/sharejump/appjump") return url;
  if (siteForLanding(url)) return url;
  fail("bad_link", 400);
}

function findLinks(text) {
  const raw = String(text || "").trim();
  if (!raw || raw.length > MAX_INPUT_CHARS) fail("bad_link", 400);
  const links = (raw.match(URL_RE) || []).map((value) => value.replace(/[),.;!?،؛؟\]}]+$/u, ""));
  for (const link of links) {
    try { return validateTextUrl(link); } catch (error) {
      if (!(error instanceof ShareLinkError) || error.code !== "bad_link") throw error;
    }
  }
  fail("bad_link", 400);
}

function decodeAttribute(value) {
  return String(value || "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x2F;/gi, "/");
}

function fromDeeplink(value) {
  const match = String(value || "").match(/[?&]data=([^&]+)/);
  if (!match) return null;
  try {
    const data = JSON.parse(decodeURIComponent(match[1]));
    const groupId = String(data.group_id || "");
    if (!/^\d{6,30}$/.test(groupId)) return null;
    return {
      groupId,
      shc: safeString(data.shc, 200),
      localCountry: safeString(data.local_country || "OTHER", 8).toUpperCase(),
      urlFrom: safeString(data.url_from, 100),
    };
  } catch {
    return null;
  }
}

function extractAssignedObject(html, name) {
  const match = new RegExp(`${name}\\s*=\\s*`).exec(html);
  if (!match) return null;
  const start = html.indexOf("{", match.index + match[0].length);
  if (start < 0) return null;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < html.length; i++) {
    const ch = html[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === "{") depth++;
    else if (ch === "}" && --depth === 0) return html.slice(start, i + 1);
  }
  return null;
}

function safeRedirectTarget(location, currentUrl, method) {
  if (method !== "GET") fail("redirect", 502);
  let next;
  try { next = new URL(location, currentUrl); } catch { fail("redirect", 502); }
  return validateTextUrl(next);
}

function getDeadlineSignal(deadline) {
  const remaining = deadline - Date.now();
  if (remaining <= 0) fail("timeout", 504);
  return AbortSignal.timeout(Math.max(1, Math.min(PER_REQUEST_MS, remaining)));
}

async function fetchManual(url, init, deadline) {
  try {
    return await fetch(url, { ...init, redirect: "manual", signal: getDeadlineSignal(deadline) });
  } catch (error) {
    if (error?.name === "TimeoutError" || error?.name === "AbortError") fail("timeout", 504);
    fail("network", 502);
  }
}

async function readLimitedText(response, maxBytes) {
  const declared = Number(response.headers?.get?.("content-length"));
  if (Number.isFinite(declared) && declared > maxBytes) fail("response_too_large", 502);
  if (!response.body?.getReader) {
    const text = await response.text();
    if (new TextEncoder().encode(text).byteLength > maxBytes) fail("response_too_large", 502);
    return text;
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let total = 0;
  let text = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel().catch(() => {});
      fail("response_too_large", 502);
    }
    text += decoder.decode(value, { stream: true });
  }
  return text + decoder.decode();
}

async function getText(input, deadline) {
  let url = validateTextUrl(input);
  for (let hop = 0; hop <= 2; hop++) {
    const response = await fetchManual(url.href, {
      headers: { "user-agent": UA, accept: "text/html,*/*" },
      method: "GET",
    }, deadline);
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      if (hop === 2) fail("redirect", 502);
      const location = response.headers.get("location");
      if (!location) fail("redirect", 502);
      url = safeRedirectTarget(location, url, "GET");
      continue;
    }
    if (!response.ok) fail("upstream", 502);
    return readLimitedText(response, MAX_PAGE_BYTES);
  }
  fail("redirect", 502);
}

async function resolveAppjump(url, deadline) {
  const html = await getText(url, deadline);
  const encoded = extractAssignedObject(html, "shareInfo");
  if (!encoded) fail("upstream", 502);
  let info;
  try { info = JSON.parse(encoded); } catch { fail("upstream", 502); }
  if (info.share_type && info.share_type !== "cart") fail("not_cart", 422);
  const groupId = String(info.id || "");
  if (!/^\d{6,30}$/.test(groupId) || Number(info.status) < 0) fail("expired", 404);
  return {
    groupId,
    shc: "",
    localCountry: safeString(info.localcountry || "OTHER", 8).toUpperCase(),
    urlFrom: safeString(info.url_from, 100),
  };
}

async function resolveTarget(input, deadline) {
  const url = findLinks(input);
  const host = url.hostname.toLowerCase();
  if (host === "onelink.shein.com") {
    const html = await getText(url, deadline);
    const deeplink = html.match(/id=["']deeplink["'][^>]*\bvalue=["']([^"']+)["']/i);
    if (deeplink) {
      const data = fromDeeplink(decodeAttribute(deeplink[1]));
      if (data) return data;
    }
    const web = html.match(/id=["']url["'][^>]*\bvalue=["']([^"']+)["']/i);
    if (web) {
      let appjump;
      try { appjump = validateTextUrl(decodeAttribute(web[1])); } catch { fail("expired", 404); }
      if (appjump.hostname.toLowerCase() !== "api-shein.shein.com") fail("bad_link", 400);
      return resolveAppjump(appjump, deadline);
    }
    fail("expired", 404);
  }
  if (host === "api-shein.shein.com") return resolveAppjump(url, deadline);
  const site = siteForLanding(url);
  if (site) {
    return {
      groupId: url.searchParams.get("group_id"),
      shc: safeString(url.searchParams.get("shc"), 200),
      localCountry: safeString(url.searchParams.get("local_country") || "OTHER", 8).toUpperCase(),
      urlFrom: safeString(url.searchParams.get("url_from"), 100),
      preferredSite: site,
    };
  }
  fail("bad_link", 400);
}

function mobileSiteForCountry(country) {
  const code = safeString(country || "other", 8).toLowerCase();
  for (const [site, codes] of SITE_MAP) if (codes.includes(code)) return site;
  return "m.shein.com";
}

function siteOrder(target) {
  return [...new Set([target.preferredSite, mobileSiteForCountry(target.localCountry), ...FALLBACK_SITES].filter(Boolean))].slice(0, 4);
}

function bffUrl(site) {
  if (!MOBILE_SITES.has(site)) fail("bad_link", 400);
  const { host, prefix } = siteParts(site);
  return new URL(`https://${host}/${prefix ? `${prefix}/` : ""}${BFF_PATH.slice(1)}`);
}

function siteOfBff(input) {
  let url;
  try { url = input instanceof URL ? input : new URL(input); } catch { return ""; }
  if (!hasSafeOrigin(url) || !SITE_HOSTS.has(url.hostname.toLowerCase()) || !url.pathname.endsWith("/bff-api/order/cart/share/landing")) return "";
  for (const site of MOBILE_SITES) {
    const { host, prefix } = siteParts(site);
    if (host !== url.hostname.toLowerCase()) continue;
    const prefixPath = prefix ? `/${prefix}` : "";
    if (url.pathname === `${prefixPath}/bff-api/order/cart/share/landing`) return site;
  }
  return "";
}

function mintArmorCookie() {
  const timestamp = new Date().toISOString().replace(/\D/g, "").slice(0, 14);
  return `armorUuid=${timestamp}${randomBytes(25).toString("hex")}`;
}

function postInit(target, currency, site, cookie) {
  const { host } = siteParts(site);
  const landing = new URL(`https://${site}/cart/share/landing`);
  landing.searchParams.set("group_id", target.groupId);
  if (target.shc) landing.searchParams.set("shc", target.shc);
  return {
    method: "POST",
    headers: {
      "user-agent": UA,
      accept: "application/json, text/plain, */*",
      "content-type": "application/json",
      "x-requested-with": "XMLHttpRequest",
      origin: `https://${host}`,
      referer: landing.href,
      appcurrency: currency,
      cookie,
    },
    body: JSON.stringify({ groupId: String(target.groupId), localCountry: target.localCountry || "OTHER", userLocalSizeCountry: "" }),
  };
}

async function postCart(url, target, currency, site, cookie, deadline) {
  return fetchManual(url.href, postInit(target, currency, site, cookie), deadline);
}

function countItems(info) {
  return [info?.normalProducts, info?.outStock, info?.unavailable].reduce((sum, list) => sum + (Array.isArray(list) ? list.length : 0), 0);
}

async function askSite(site, target, currency, deadline) {
  let url = bffUrl(site);
  let response = await postCart(url, target, currency, site, mintArmorCookie(), deadline);
  if (response.status === 403) {
    // Preserve the upstream MIT behavior: mint one fresh armorUuid and retry once.
    response = await postCart(url, target, currency, site, mintArmorCookie(), deadline);
  }
  if (response.status === 302) {
    const location = response.headers.get("location");
    if (!location) fail("redirect", 502);
    let redirected;
    try { redirected = new URL(location, url); } catch { fail("redirect", 502); }
    const redirectedSite = siteOfBff(redirected);
    if (!redirectedSite) fail("redirect", 502);
    url = redirected;
    response = await postCart(url, target, currency, redirectedSite, mintArmorCookie(), deadline);
    if (response.status === 403) {
      response = await postCart(url, target, currency, redirectedSite, mintArmorCookie(), deadline);
    }
  }
  if (!response.ok) fail(response.status === 403 ? "risk" : "upstream", response.status);
  let data;
  try { data = JSON.parse(await readLimitedText(response, MAX_JSON_BYTES)); } catch (error) {
    if (error instanceof ShareLinkError) throw error;
    fail("upstream", 502);
  }
  if (String(data?.code) === "836100") fail("risk", 503);
  if (String(data?.code) !== "0" || !data?.info || typeof data.info !== "object") fail("upstream", 502);
  if (countItems(data.info) > MAX_ITEMS) fail("too_many_items", 422);
  return { info: data.info, site: siteOfBff(url) || site, requested: currency };
}

function currencyCode(value, text, site, requested) {
  const explicit = safeString(value, 8).toUpperCase();
  if (/^[A-Z]{3}$/.test(explicit)) return explicit;
  const source = String(text || "").trim();
  if (/\bUSD\b|^US\$/i.test(source)) return "USD";
  if (/€|\bEUR\b/i.test(source)) return "EUR";
  if (/^£|\bGBP\b/i.test(source)) return "GBP";
  if (/^SR\s?|\bSAR\b/i.test(source)) return "SAR";
  if (/^AED\b|\bAED\b/i.test(source)) return "AED";
  if (/^KD\s?|\bKWD\b/i.test(source)) return "KWD";
  if (/^QR\s?|\bQAR\b/i.test(source)) return "QAR";
  if (/^RO\s?|\bOMR\b/i.test(source)) return "OMR";
  if (/^BD\s?|\bBHD\b/i.test(source)) return "BHD";
  if (/^JD\s?|\bJOD\b/i.test(source)) return "JOD";
  if (/^TL\s?|₺|\bTRY\b/i.test(source)) return "TRY";
  if (/^CA\$|\bCAD\b/i.test(source)) return "CAD";
  if (/^AU\$|\bAUD\b/i.test(source)) return "AUD";
  if (/^MXN\b/i.test(source)) return "MXN";
  if (/^R\$|\bBRL\b/i.test(source)) return "BRL";
  if (/^R\d|\bZAR\b/i.test(source)) return "ZAR";
  if (/^₹|^Rs\b|\bINR\b/i.test(source)) return "INR";
  // The global SHEIN mobile host is asked explicitly for USD. A bare $ is
  // ambiguous on regional hosts, so it is not converted there.
  if (/^\$\s*\d/.test(source) && site === "m.shein.com" && requested === "USD") return "USD";
  return "";
}

function parseAmount(raw) {
  if (typeof raw !== "number" && typeof raw !== "string") return null;
  if (typeof raw === "string" && !raw.trim()) return null;
  const amount = Number(raw);
  return Number.isFinite(amount) && amount >= 0 ? amount : null;
}

function firstPrice(info) {
  const groups = [info.normalProducts, info.outStock, info.unavailable];
  for (const group of groups) {
    if (!Array.isArray(group)) continue;
    for (const product of group) {
      const price = product?.salePrice;
      if (price?.amountWithSymbol || price?.amount != null) return price;
    }
  }
  return null;
}

function normalizeInfo(info, target, site, requested) {
  const definitions = [
    [info.normalProducts, "normal"],
    [info.outStock, "outOfStock"],
    [info.unavailable, "unavailable"],
  ];
  const items = [];
  for (const [products, status] of definitions) {
    if (!Array.isArray(products)) continue;
    for (const product of products) {
      const sale = product?.salePrice;
      const amount = parseAmount(sale?.amount);
      const priceText = safeString(sale?.amountWithSymbol, 100);
      const explicitCurrency = sale?.currencyCode || sale?.currency_code || sale?.currency || product?.currencyCode || product?.currency_code || product?.currency;
      const currency = currencyCode(explicitCurrency, priceText, site, requested);
      const rawAttr = product?.goodsAttr ?? product?.goods_attr ?? product?.selectedOptions ?? product?.options;
      const options = Array.isArray(rawAttr) ? rawAttr.map((x) => safeString(typeof x === "object" ? (x?.name || x?.value) : x, 100)).filter(Boolean).join("، ") : safeString(rawAttr, 300);
      items.push({
        id: safeString(product?.goods_id || product?.sku_code || product?.itemSku, 100),
        sku: safeString(product?.sku_code || product?.itemSku || product?.goods_sn, 100),
        name: safeString(product?.goods_name, 300) || "منتج SHEIN",
        color: safeString(product?.colorName || product?.color_name || product?.color, 120),
        size: safeString(product?.sizeName || product?.size_name || product?.size, 80),
        attr: options,
        price: amount === null && !priceText ? null : { amount, text: priceText, currency },
        currency,
        status,
        soldOut: Boolean(product?.soldOutStatus) || status === "outOfStock",
      });
    }
  }
  const samplePrice = firstPrice(info);
  const sampleText = safeString(samplePrice?.amountWithSymbol, 100);
  const sampleExplicit = samplePrice?.currencyCode || samplePrice?.currency_code || samplePrice?.currency || info?.currencyCode || info?.currency_code || info?.currency;
  const shown = currencyCode(sampleExplicit, sampleText, site, requested);
  return { currency: shown, items };
}

export async function getCart(text, options = {}) {
  const deadline = Date.now() + TOTAL_BUDGET_MS;
  const target = await resolveTarget(text, deadline);
  const requested = /^[A-Z]{3}$/.test(String(options.currency || "USD").toUpperCase()) ? String(options.currency || "USD").toUpperCase() : "USD";
  let firstNonempty = null;
  for (const site of siteOrder(target)) {
    const found = await askSite(site, target, requested, deadline);
    const normalized = normalizeInfo(found.info, target, found.site, requested);
    if (normalized.items.length === 0) continue;
    if (!firstNonempty) firstNonempty = { ...normalized, site: found.site };
    if (normalized.currency === requested) return { currency: normalized.currency, items: normalized.items };
  }
  if (firstNonempty) return { currency: firstNonempty.currency, items: firstNonempty.items };
  fail("empty", 404);
}

export const __test = {
  currencyCode,
  findLinks,
  mintArmorCookie,
  normalizeInfo,
  siteOfBff,
};
