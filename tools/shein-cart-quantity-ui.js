/* Local-only SHEIN quantity review card. All displayed text is rendered as React text, never HTML. */
function KBSheinCartQuantityCard({ card }) {
  var result = card && card.result;
  var sourceItems = result && Array.isArray(result.items) ? result.items : [];
  var core = typeof globalThis !== "undefined" ? globalThis.__KBSheinQuantityCore : null;
  var priceCurrency = String(result && result.priceCurrency || "").toUpperCase();
  var rateConfigured = !!result && result.exchangeRateConfigured === true && typeof result.exchangeRate === "number" && Number.isFinite(result.exchangeRate) && result.exchangeRate > 0 && priceCurrency === "USD";
  var [draftQtys, setDraftQtys] = N.useState(function () {
    return sourceItems.map(function (item) { return String(item.qty == null ? "" : item.qty); });
  });
  var trusted = !!core && core.canRecalculate(result);
  var quantities = draftQtys.map(function (value) {
    return /^\d+$/.test(String(value)) ? Number(value) : NaN;
  });
  var totals = trusted ? core.recalculate(result, quantities) : { ok: false, reason: "price-or-result-unavailable" };
  var missingPrice = sourceItems.some(function (item) {
    var rawPriceKnown = item && ((typeof item.unitPrice === "number" && Number.isFinite(item.unitPrice) && item.unitPrice >= 0) || (typeof item.priceText === "string" && item.priceText.trim()));
    var usdPriceKnown = item && item.priceKnown === true && typeof item.unitUsd === "number" && Number.isFinite(item.unitUsd) && item.unitUsd >= 0;
    return item && item.available && (priceCurrency === "USD" ? !usdPriceKnown : !rawPriceKnown);
  });
  var missingRate = priceCurrency === "USD" && !rateConfigured;
  var unsupportedCurrency = priceCurrency !== "USD";
  var noAvailableItems = sourceItems.length > 0 && sourceItems.every(function (item) { return !item || item.available !== true; });
  var missingQuantity = sourceItems.some(function (item) {
    return !item || !Number.isInteger(item.qty) || item.qty < 1;
  });
  var invalidQuantity = trusted && !totals.ok && totals.reason === "invalid-quantities";
  var rows = sourceItems.map(function (item, index) {
    var currentQuantity = quantities[index];
    var hasQuantity = Number.isInteger(currentQuantity) && currentQuantity >= 0 && currentQuantity <= 100000;
    var unit = item && item.priceKnown === true && typeof item.unitUsd === "number" && Number.isFinite(item.unitUsd) && item.unitUsd >= 0 ? item.unitUsd : null;
    var unitLyd = unit === null || !rateConfigured ? null : Math.round(unit * result.exchangeRate * 100) / 100;
    var lineLyd = unitLyd === null || !hasQuantity ? null : Math.round(unit * currentQuantity * result.exchangeRate * 100) / 100;
    var label = String(item && item.title || "منتج SHEIN");
    return c.jsxs("div", {
      "data-testid": "shein-quantity-row-" + index,
      style: { display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: 10, alignItems: "center", padding: "10px 0", borderTop: "1px solid var(--line)" },
      children: [
        c.jsxs("div", { style: { minWidth: 0, display: "grid", gap: 4 }, children: [
          c.jsx("div", { style: { fontWeight: 600, overflowWrap: "anywhere" }, children: label }),
          c.jsx("div", { className: "faint", style: { fontSize: ".76rem", lineHeight: 1.6 }, children: [
            item && item.sku ? "الكود: " + item.sku : "",
            item && item.color ? " · اللون: " + item.color : "",
            item && item.size ? " · المقاس: " + item.size : "",
            item && item.options ? " · " + item.options : ""
          ].join("") || "تفاصيل المنتج حسب القراءة الأخيرة" }),
          c.jsx("div", { className: "faint", style: { fontSize: ".76rem" }, children: item && item.available
            ? (unsupportedCurrency ? "السعر كما عرضه SHEIN: " + String(item.priceText || (item.unitPrice == null ? "غير متاح" : item.unitPrice)) + (item.priceCurrency ? " " + item.priceCurrency : " · العملة غير واضحة") + " · لن أستخدم سعر USD/LYD لتحويل هذه العملة أو حساب إجمالي." : unit === null ? "السعر غير متاح من القارئ؛ لا يدخل في إعادة الحساب." : !rateConfigured ? "سعر الوحدة " + (item.priceText || unit + " USD") + " · لم يُحوّل للدينار لأن سعر الصرف الإداري غير مضبوط." : "سعر الوحدة " + (item.priceText || unit + " USD") + " = " + unitLyd.toLocaleString("en-US", { maximumFractionDigits: 2 }) + " د.ل · " + (lineLyd === null ? (Number.isInteger(item.qty) ? "أدخل كمية صحيحة" : "أدخل كمية هذا الصنف؛ لا أفترض 1") : "قيمة الصنف " + lineLyd.toLocaleString("en-US", { maximumFractionDigits: 2 }) + " د.ل"))
            : "غير متاح حسب القراءة الأخيرة؛ مستبعد من الإجمالي." })
        ] }),
        c.jsxs("label", { style: { display: "grid", gap: 4, justifyItems: "center", fontSize: ".75rem", whiteSpace: "nowrap" }, children: [
          c.jsx("span", { children: "الكمية" }),
          c.jsx("input", {
            type: "number", inputMode: "numeric", min: 0, max: 100000, step: 1,
            value: draftQtys[index] == null ? "" : draftQtys[index],
            disabled: !trusted,
            "aria-label": "كمية " + label,
            "data-testid": "shein-quantity-input-" + index,
            onChange: function (event) {
              var value = event.target.value;
              if (value !== "" && (!/^\d+$/.test(value) || Number(value) > 100000)) return;
              setDraftQtys(function (current) { var next = current.slice(); next[index] = value; return next; });
            },
            style: { width: 76, padding: "7px 5px", border: "1px solid var(--line)", borderRadius: 8, background: "var(--surface)", color: "var(--text)", textAlign: "center" }
          })
        ] })
      ]
    }, "shein-item-" + index);
  });
  var summary = "تعذر عرض نتيجة سلة موثوقة. أعد تحليل الرابط من داخل KB.";
  if (totals.ok) {
    var detailLines = totals.items.map(function (item, index) {
      var line = "القطعة " + (index + 1) + ": " + String(item.title || "منتج SHEIN") +
        "\nالكود: " + String(item.sku || "غير متوفر") +
        "\nاللون: " + String(item.color || "غير مذكور") +
        "\nالمقاس: " + String(item.size || "غير مذكور") +
        "\nالكمية: " + item.qty;
      if (item.priceKnown) line += "\nسعر الوحدة: " + item.unitUsd + " USD = " + item.unitLyd.toLocaleString("en-US", { maximumFractionDigits: 2 }) + " د.ل" + (item.qty > 0 ? "\nقيمة الصنف: " + item.totalLyd.toLocaleString("en-US", { maximumFractionDigits: 2 }) + " د.ل" : "");
      else line += "\nالسعر غير متاح";
      if (!item.available) line += "\nمستبعد من الإجمالي حسب القراءة الأخيرة";
      if (item.options) line += "\nالخيارات: " + String(item.options);
      return line;
    }).join("\n\n");
    summary = "تفاصيل سلة شي إن — مراجعة محلية للكميات:\n\n" + detailLines +
      "\n\nعدد القطع في القائمة: " + totals.totalPieces +
      " · غير المتاح: " + totals.excludedPieces +
      "\nالإجمالي قبل التقريب: " + totals.totalBeforeRoundingLyd.toLocaleString("en-US", { maximumFractionDigits: 2 }) + " د.ل" +
      "\nالإجمالي المطلوب وفق قاعدة KB الحالية: " + totals.totalLyd.toLocaleString("en-US", { maximumFractionDigits: 2 }) + " د.ل" +
      "\n\nتأكيد قبل المتابعة: هل تؤكد أن إجمالي الكمية المطلوبة هو " + totals.totalPieces + " قطعة؟";
  } else if (noAvailableItems) {
    summary = "لا توجد عناصر متاحة حسب قراءة SHEIN؛ لم أعرض إجماليًا صفريًا كأنه سعر الطلب.";
  } else if (unsupportedCurrency) {
    summary = "عملة السعر " + (priceCurrency || "غير معروفة") + "; تظهر الأسعار كما أعادها SHEIN، لكن سعر المدير USD/LYD لا يصلح لتحويلها. لن أعرض إجماليًا بالدينار.";
  } else if (missingRate) {
    summary = "سعر الصرف USD/LYD غير مضبوط من لوحة المدير. تظهر أسعار الأصناف بالدولار فقط؛ لن أعرض تحويلًا أو إجماليًا بالدينار حتى يضبط المدير السعر ثم تُعاد قراءة السلة.";
  } else if (missingPrice) {
    summary = "تعذر إعادة حساب الإجمالي لأن سعر عنصر متاح غير موجود أو غير صالح. لم أقدّر سعرًا بديلًا، وعطّلت تحرير الكميات حتى لا يظهر إجمالي مضلل.";
  } else if (invalidQuantity) {
    summary = "أدخل كمية كل صنف كعدد صحيح من 0 إلى 100000. بعدها يظهر إجمالي القطع وإجمالي السلة؛ إذا عرفت العدد الإجمالي فقط فحدّد توزيعه على الأصناف، ولن أفترض قطعة واحدة أو أوزع الكمية عنك.";
  } else if (missingQuantity) {
    summary = "لم يرسل القارئ كميةً لبعض الأصناف. أدخل كمية كل صنف؛ سيظهر إجمالي القطع بعد تحديدها. لن أفترض كمية أو أوزع إجماليًا على أصناف مختلفة الأسعار.";
  }
  return c.jsxs("section", {
    className: "card p-4",
    dir: "rtl",
    "data-testid": "shein-cart-quantity-card",
    style: { display: "grid", gap: 10 },
    children: [
      c.jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "start", flexWrap: "wrap" }, children: [
        c.jsx("h3", { style: { margin: 0, fontSize: "1rem" }, children: "مراجعة كمية كل منتج" }),
        c.jsx("button", { type: "button", className: "btn btn-white", "data-testid": "shein-quantity-reset", disabled: !trusted, onClick: function () {
          setDraftQtys(sourceItems.map(function (item) { return String(item.qty == null ? "" : item.qty); }));
        }, children: "استعادة الكميات المقروءة" })
      ] }),
      c.jsx("p", { className: "faint", style: { margin: 0, fontSize: ".78rem", lineHeight: 1.7 }, children: "التغيير محلي لهذا العرض فقط، ويستخدم سعر الدولار الذي ضبطه المدير. لا يغيّر سلة SHEIN أو التوفر، ولا ينشئ طلبًا؛ لا أفترض الكميات، ويظهر إجمالي القطع بعد إدخال كمية كل صنف." }),
      c.jsx("div", { style: { display: "grid", gap: 2 }, children: rows }),
      c.jsx("div", { className: "bubble-ai whitespace-pre-wrap", "data-testid": "shein-local-summary", children: summary }),
      c.jsx("p", { className: "faint", role: "status", "data-testid": "shein-quantity-status", style: { margin: 0, fontSize: ".75rem", lineHeight: 1.6 }, children: totals.ok
        ? "الإجمالي مبني على العناصر المتاحة فقط؛ القطع غير المتاحة مستبعدة مثل قاعدة KB الحالية. التعديل غير محفوظ ولا يرسل أي بيانات إلى SHEIN."
        : noAvailableItems
          ? "لا توجد منتجات متاحة؛ لا يوجد إجمالي قابل للشراء."
          : missingRate
          ? "سعر الصرف غير مضبوط؛ تظهر الأسعار بالدولار فقط والتحرير معطل."
          : missingPrice
          ? "لا يوجد سعر موثوق لعنصر متاح؛ لا يمكن عرض مبلغ جديد بأمان."
          : invalidQuantity || missingQuantity ? "أدخل كمية كل صنف ليظهر إجمالي القطع والسلة؛ لا تُفترض كمية 1." : "بيانات السعر أو نتيجة القراءة غير مكتملة؛ التحرير معطل." })
    ]
  });
}
