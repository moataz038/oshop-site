/* Local-only SHEIN quantity review card. All displayed text is rendered as React text, never HTML. */
function KBSheinCartQuantityCard({ card }) {
  var result = card && card.result;
  var sourceItems = result && Array.isArray(result.items) ? result.items : [];
  var core = typeof globalThis !== "undefined" ? globalThis.__KBSheinQuantityCore : null;
  var [draftQtys, setDraftQtys] = N.useState(function () {
    return sourceItems.map(function (item) { return String(item.qty == null ? "" : item.qty); });
  });
  var trusted = !!core && core.canRecalculate(result);
  var quantities = draftQtys.map(function (value) {
    return /^\d+$/.test(String(value)) ? Number(value) : NaN;
  });
  var totals = trusted ? core.recalculate(result, quantities) : { ok: false, reason: "price-or-result-unavailable" };
  var missingPrice = sourceItems.some(function (item) {
    return item && item.available && !(item.priceKnown === true && typeof item.unitUsd === "number" && Number.isFinite(item.unitUsd) && item.unitUsd >= 0);
  });
  var invalidQuantity = trusted && !totals.ok && totals.reason === "invalid-quantities";
  var rows = sourceItems.map(function (item, index) {
    var currentQuantity = quantities[index];
    var hasQuantity = Number.isInteger(currentQuantity) && currentQuantity >= 0 && currentQuantity <= 100000;
    var unit = item && item.priceKnown === true && typeof item.unitUsd === "number" && Number.isFinite(item.unitUsd) && item.unitUsd >= 0 ? item.unitUsd : null;
    var lineLyd = unit === null || !hasQuantity ? null : Math.round(unit * currentQuantity * Number(result.exchangeRate) * 100) / 100;
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
            ? (unit === null ? "السعر غير متاح من القارئ؛ لا يدخل في إعادة الحساب." : "سعر الوحدة " + unit + " USD · " + (lineLyd === null ? "أدخل كمية صحيحة" : lineLyd.toLocaleString("en-US", { maximumFractionDigits: 2 }) + " د.ل"))
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
      if (item.priceKnown) line += "\nسعر القطعة: " + item.unitUsd + " USD = " + item.totalLyd.toLocaleString("en-US", { maximumFractionDigits: 2 }) + " د.ل";
      else line += "\nالسعر غير متاح";
      if (!item.available) line += "\nمستبعد من الإجمالي حسب القراءة الأخيرة";
      if (item.options) line += "\nالخيارات: " + String(item.options);
      return line;
    }).join("\n\n");
    summary = "تفاصيل سلة شي إن — مراجعة محلية للكميات:\n\n" + detailLines +
      "\n\nعدد القطع في القائمة: " + totals.totalPieces +
      " · غير المتاح: " + totals.excludedPieces +
      "\nالإجمالي قبل التقريب: " + totals.totalBeforeRoundingLyd.toLocaleString("en-US", { maximumFractionDigits: 2 }) + " د.ل" +
      "\nالإجمالي المطلوب وفق قاعدة KB الحالية: " + totals.totalLyd.toLocaleString("en-US", { maximumFractionDigits: 2 }) + " د.ل";
  } else if (invalidQuantity) {
    summary = "أدخل لكل عنصر متاح عددًا صحيحًا من 0 إلى 100000؛ لن يظهر إجمالي حتى تصبح الكميات صالحة.";
  } else if (missingPrice) {
    summary = "تعذر إعادة حساب الإجمالي لأن سعر عنصر متاح غير موجود أو غير صالح. لم أقدّر سعرًا بديلًا، وعطّلت تحرير الكميات حتى لا يظهر إجمالي مضلل.";
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
      c.jsx("p", { className: "faint", style: { margin: 0, fontSize: ".78rem", lineHeight: 1.7 }, children: "التغيير محلي لهذا العرض فقط، ويستخدم أسعار القراءة الأخيرة وسعر الصرف الحالي في النتيجة وقاعدة التقريب نفسها. لا يغيّر سلة SHEIN أو التوفر، ولا ينشئ طلبًا؛ إعادة القراءة تعرض كميات SHEIN من جديد." }),
      c.jsx("div", { style: { display: "grid", gap: 2 }, children: rows }),
      c.jsx("div", { className: "bubble-ai whitespace-pre-wrap", "data-testid": "shein-local-summary", children: summary }),
      c.jsx("p", { className: "faint", role: "status", "data-testid": "shein-quantity-status", style: { margin: 0, fontSize: ".75rem", lineHeight: 1.6 }, children: totals.ok
        ? "الإجمالي مبني على العناصر المتاحة فقط؛ القطع غير المتاحة مستبعدة مثل قاعدة KB الحالية. التعديل غير محفوظ ولا يرسل أي بيانات إلى SHEIN."
        : missingPrice
          ? "لا يوجد سعر موثوق لعنصر متاح؛ لا يمكن عرض مبلغ جديد بأمان."
          : invalidQuantity ? "الكمية غير صالحة؛ صححها لمشاهدة المجموع." : "بيانات السعر أو نتيجة القراءة غير مكتملة؛ التحرير معطل." })
    ]
  });
}
