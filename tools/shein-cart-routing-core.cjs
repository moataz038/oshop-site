function createSheinCartRoutingCore() {
  "use strict";

  function extractCartShareUrl(text) {
    var candidates = String(text || "").match(/https?:\/\/[^\s<>"'`]+/gi) || [];
    for (var candidate of candidates) {
      var raw = candidate.replace(/[),.;!?،؛؟\]}]+$/u, "");
      var parsed;
      try { parsed = new URL(raw); } catch { continue; }
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") continue;
      var host = parsed.hostname.toLowerCase();
      var isSheinHost = host === "shein.com" || host.endsWith(".shein.com");
      var isOneLink = host === "onelink.shein.com";
      var isSharePath = isSheinHost && /(?:^|\/)(?:share|cart|bag)(?:\/|$)/i.test(parsed.pathname);
      if (isOneLink || isSharePath) return raw;
    }
    return null;
  }

  function classify(text, readerAvailable, productIntent) {
    var url = extractCartShareUrl(text);
    if (url) return readerAvailable ? { kind: "cart", url: url } : { kind: "cart-unavailable" };
    if (productIntent) return { kind: "product-search" };
    return { kind: "assistant" };
  }

  function dispatch(route, reader) {
    if (!route || route.kind !== "cart" || typeof reader !== "function") {
      return { invoked: false, value: undefined };
    }
    return { invoked: true, value: reader(route.url) };
  }

  function resolveRate(settings) {
    var rawRate = settings ? (settings.usdToLyd == null ? settings.exchangeRate : settings.usdToLyd) : undefined;
    var rate = rawRate == null ? NaN : Number(rawRate);
    var configured = !!settings && (settings.usdToLydConfigured === true || settings.exchangeRateConfigured === true) && Number.isFinite(rate) && rate > 0;
    return {
      configured: configured,
      rate: configured ? rate : null,
      rateMode: settings && (settings.rateMode === "official" || settings.rateMode === "parallel") ? settings.rateMode : null
    };
  }

  function unavailableResponse() {
    return {
      reply: "تعذرت قراءة سلة SHEIN الآن؛ خدمة القراءة غير متاحة مؤقتًا. لم أرسل الرابط للقارئ ولم أحسب إجماليًا.",
      cards: [],
      steps: [],
      provider: "direct-shein-cart"
    };
  }

  function mapCartRead(result, cards) {
    var items = result && Array.isArray(result.items) ? result.items : [];
    var sourceCards = Array.isArray(cards) ? cards.filter(function (card) {
      return card && card.type === "shein_cart" && card.result && Array.isArray(card.result.items) && card.result.items.length > 0;
    }) : [];
    var hasCard = sourceCards.length > 0;
    if (!result || result.error || items.length === 0 || !hasCard) {
      return {
        reply: "تعذرت قراءة سلة SHEIN الآن، لذلك لم أعرض نتائج بحث بديلة أو أي إجمالي. جرّب لاحقًا.",
        cards: [],
        steps: ["calculate_shein_cart"],
        provider: "direct-shein-cart"
      };
    }
    var safeItems = items.map(function (item) {
      return {
        id: item && item.id,
        title: item && item.title,
        qty: null,
        unitUsd: item && item.unitUsd,
        unitPrice: item && item.unitPrice,
        priceText: item && item.priceText,
        priceCurrency: item && item.priceCurrency,
        priceKnown: item && item.priceKnown === true,
        available: item && item.available === true,
        sku: item && item.sku,
        color: item && item.color,
        size: item && item.size,
        options: item && item.options
      };
    });
    var priceCurrency = String(result.priceCurrency || result.currency || "").toUpperCase();
    var safeResult = {
      source: "shein-cart",
      live: true,
      currency: priceCurrency,
      priceCurrency: priceCurrency,
      exchangeRate: result.exchangeRate,
      exchangeRateConfigured: result.exchangeRateConfigured === true,
      rateMode: result.rateMode,
      shippingLyd: 0,
      serviceFeeLyd: 0,
      subtotalLyd: null,
      totalBeforeRoundingLyd: null,
      totalLyd: null,
      items: safeItems,
      customerSummary: "حدّد كمية كل صنف قبل طلب الإجمالي."
    };
    var safeCards = sourceCards.slice(0, 1).map(function (card) {
      return { type: "shein_cart", result: safeResult };
    });
    var reply;
    if (priceCurrency !== "USD") {
      reply = "قرأت " + safeItems.length + " أصناف. العملة " + (priceCurrency || "غير معروفة أو متعددة") + "؛ سأعرض الأسعار كما أعادها SHEIN، ولا أستخدم سعر USD/LYD لتحويل عملة أخرى. حدّد كمية كل صنف، ولن أعرض إجماليًا بالدينار.";
    } else if (!resolveRate(result).configured) {
      reply = "قرأت " + safeItems.length + " أصناف. ستظهر الأسعار بالدولار فقط حتى يضبط المدير سعر USD/LYD. حدّد كمية كل صنف؛ لن أعرض إجماليًا قبل تأكيد الكميات وسعر الصرف.";
    } else {
      reply = "قرأت " + safeItems.length + " أصناف. حدّد كمية كل صنف؛ لن أفترض قطعة واحدة ولن يظهر إجمالي قبل إدخال الكميات.";
    }
    return { reply: reply, cards: safeCards, steps: ["calculate_shein_cart"], provider: "direct-shein-cart" };
  }

  return {
    extractCartShareUrl: extractCartShareUrl,
    classify: classify,
    dispatch: dispatch,
    resolveRate: resolveRate,
    unavailableResponse: unavailableResponse,
    mapCartRead: mapCartRead
  };
}

module.exports = createSheinCartRoutingCore();
