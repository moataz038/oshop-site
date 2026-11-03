/* Local-only quantity edits for a SHEIN analysis result. No network, storage, or cart writes. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.__KBSheinQuantityCore = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var MAX_QTY = 100000;
  function finite(value) { return typeof value === "number" && Number.isFinite(value); }
  function round2(value) { return Math.round(value * 100) / 100; }

  function canRecalculate(result) {
    if (!result || result.source !== "omkar" || result.live !== true || !Array.isArray(result.items) || result.items.length === 0 || !result.items.some(function (item) { return item && item.available === true; }) ||
        result.exchangeRateConfigured !== true || !finite(result.exchangeRate) || result.exchangeRate <= 0 || !finite(result.shippingLyd) ||
        !finite(result.serviceFeeLyd) || result.shippingLyd < 0 || result.serviceFeeLyd < 0) return false;
    return result.items.every(function (item) {
      var quantityValid = item && (item.qty === null || (Number.isInteger(item.qty) && item.qty >= 1 && item.qty <= MAX_QTY));
      return !!item && typeof item.available === "boolean" && quantityValid &&
        (!item.available || (item.priceKnown === true && finite(item.unitUsd) && item.unitUsd >= 0));
    });
  }

  function recalculate(result, quantities) {
    if (!canRecalculate(result)) return { ok: false, reason: "price-or-result-unavailable" };
    if (!Array.isArray(quantities) || quantities.length !== result.items.length) return { ok: false, reason: "invalid-quantities" };

    var items = [];
    for (var index = 0; index < result.items.length; index++) {
      var source = result.items[index];
      var quantity = quantities[index];
      if (!Number.isInteger(quantity) || quantity < 0 || quantity > MAX_QTY) return { ok: false, reason: "invalid-quantities" };
      var unitUsd = source.priceKnown === true && finite(source.unitUsd) && source.unitUsd >= 0 ? source.unitUsd : null;
      var unitLyd = unitUsd === null ? null : round2(unitUsd * result.exchangeRate);
      var totalUsd = unitUsd === null ? null : round2(unitUsd * quantity);
      var totalLyd = unitUsd === null ? null : round2(unitUsd * quantity * result.exchangeRate);
      items.push({
        id: source.id,
        title: source.title,
        qty: quantity,
        unitUsd: unitUsd,
        unitLyd: unitLyd,
        priceKnown: unitUsd !== null,
        totalUsd: totalUsd,
        totalLyd: totalLyd,
        available: source.available,
        sku: source.sku,
        color: source.color,
        size: source.size,
        options: source.options
      });
    }

    var included = items.filter(function (item) { return item.available; });
    var subtotalLyd = round2(included.reduce(function (sum, item) { return sum + item.totalLyd; }, 0));
    var beforeRoundingLyd = round2(subtotalLyd + result.shippingLyd + result.serviceFeeLyd);
    var totalLyd = Math.ceil(beforeRoundingLyd / 5) * 5;
    return {
      ok: true,
      items: items,
      exchangeRate: result.exchangeRate,
      exchangeRateConfigured: true,
      rateMode: result.rateMode,
      shippingLyd: result.shippingLyd,
      serviceFeeLyd: result.serviceFeeLyd,
      subtotalLyd: subtotalLyd,
      totalBeforeRoundingLyd: beforeRoundingLyd,
      totalLyd: totalLyd,
      totalPieces: items.reduce(function (sum, item) { return sum + item.qty; }, 0),
      excludedPieces: items.reduce(function (sum, item) { return sum + (item.available ? 0 : item.qty); }, 0),
      changed: items.some(function (item, index) { return item.qty !== result.items[index].qty; })
    };
  }

  return { MAX_QTY: MAX_QTY, canRecalculate: canRecalculate, recalculate: recalculate };
});
