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
    var hasCard = Array.isArray(cards) && cards.some(function (card) {
      return card && card.type === "shein_cart" && card.result && Array.isArray(card.result.items) && card.result.items.length > 0;
    });
    if (!result || result.error || items.length === 0 || !hasCard) {
      return {
        reply: "تعذرت قراءة سلة SHEIN الآن، لذلك لم أعرض نتائج بحث بديلة أو أي إجمالي. جرّب لاحقًا.",
        cards: [],
        steps: ["calculate_shein_cart"],
        provider: "direct-shein-cart"
      };
    }
    var quantitiesKnown = items.every(function (item) {
      return item && Number.isInteger(item.qty) && item.qty >= 1;
    });
    var totalPieces = quantitiesKnown ? items.reduce(function (sum, item) { return sum + item.qty; }, 0) : null;
    var reply;
    if (!resolveRate(result).configured) {
      reply = "قرأت " + items.length + " عناصر. ستظهر أسعارها بالدولار فقط حتى يضبط المدير سعر USD/LYD؛ لن أعرض تحويلًا أو إجماليًا بالدينار قبل ذلك.";
    } else if (quantitiesKnown) {
      reply = "قرأت " + items.length + " عناصر، ومجموع الكميات المقروءة " + totalPieces + " قطعة. راجع القائمة أدناه وأكّد أن هذا هو إجمالي القطع المطلوب.";
    } else {
      reply = "قرأت " + items.length + " عناصر، لكن القارئ لم يرسل كمية بعض الأصناف. أدخل كمية كل صنف؛ بعدها يظهر إجمالي القطع والسلة. لن أفترض أن كل صنف قطعة واحدة أو أوزع إجمالي القطع عليك.";
    }
    return { reply: reply, cards: cards, steps: ["calculate_shein_cart"], provider: "direct-shein-cart" };
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
