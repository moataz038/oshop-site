const test = require("node:test");
const assert = require("node:assert/strict");
const { productMatchesTitle, productTypeForQuery } = require("./product-matching.cjs");

// --- الاختبارات الأصلية (10) ---

test("accepts an abaya with the requested gold embroidery", () => {
  assert.equal(productMatchesTitle("Women's Gold Embroidered Abaya", "عباية بتطريزات ذهبية", "gold embroidered abaya"), true);
});

test("rejects a watch when the customer asked for an abaya", () => {
  assert.equal(productMatchesTitle("Gold Women's Quartz Watch", "عباية بتطريزات ذهبية", "gold embroidered abaya"), false);
});

test("rejects a belt when the customer asked for shoes", () => {
  assert.equal(productMatchesTitle("Women's Black Leather Belt", "حذاء أسود", "black women's shoes"), false);
});

test("keeps a shoe result with the requested color and material", () => {
  assert.equal(productMatchesTitle("Women's Black Leather Sneakers", "حذاء أسود جلد", "black leather sneakers for women"), true);
});

test("requires the requested bag brand, shape, and chain strap", () => {
  assert.equal(productMatchesTitle("Chanel Quilted Flap Bag with Chain Strap", "حقيبة شانيل بشكل flap ومقبض سلسلة", "Chanel quilted flap bag with chain strap"), true);
  assert.equal(productMatchesTitle("Chanel Tote Bag", "حقيبة شانيل بشكل flap ومقبض سلسلة", "Chanel quilted flap bag with chain strap"), false);
});

test("does not substitute a gold abaya without embroidery", () => {
  assert.equal(productMatchesTitle("Gold Abaya", "عباية بتطريزات ذهبية", "gold embroidered abaya"), false);
});

test("recognizes Arabic product and feature terms in marketplace titles", () => {
  assert.equal(productMatchesTitle("عباءة مطرزة بتفاصيل ذهبية", "عباية بتطريزات ذهبية", "gold embroidered abaya"), true);
});

test("fails closed when the title omits an unrecognized requested brand", () => {
  assert.equal(productMatchesTitle("Handbag with Chain Strap", "حقيبة من ماركة نوفا", "Nova handbag with chain strap"), false);
});

test("matches normal singular and plural forms from product titles", () => {
  assert.equal(productMatchesTitle("Red Embroideries on Abayas", "عبايات بتطريز أحمر", "red embroidered abaya"), true);
});

test("does not reject women's products when the marketplace omits the apostrophe-s", () => {
  assert.equal(productMatchesTitle("Abaya for Women", "عباية نسائية", "women's abaya"), true);
});

// --- اللهجة الليبية: «كنادر» ما تجيبش حقيبة ---

test("detects Libyan dialect product types", () => {
  assert.equal(productTypeForQuery("كنادر")?.id, "sneaker");
  assert.equal(productTypeForQuery("صبابيط")?.id, "sneaker");
  assert.equal(productTypeForQuery("شباشب")?.id, "slipper");
  assert.equal(productTypeForQuery("جزمة")?.id, "boot");
});

test("rejects a bag when the customer asked for كنادر", () => {
  assert.equal(productMatchesTitle("حقيبة يد جلدية نسائية", "كنادر", ""), false);
  assert.equal(productMatchesTitle("حقيبة ظهر", "صبابيط", ""), false);
  assert.equal(productMatchesTitle("حقيبة يد", "شباشب", ""), false);
});

test("keeps the right shoe for a dialect request", () => {
  assert.equal(productMatchesTitle("حذاء رياضي رجالي أسود", "كنادر", ""), true);
  assert.equal(productMatchesTitle("شبشب رجالي أسود", "شباشب", ""), true);
});

// --- السوابق العربية: «بالذهبي» = «ذهبي» ---

test("tolerates Arabic prefixes on requested features", () => {
  assert.equal(productMatchesTitle("عباية سوداء مطرزة بالذهبي", "عباية بتطريزات ذهبية", ""), true);
  assert.equal(productMatchesTitle("عباية بتطريز ذهبي", "عباية بتطريزات ذهبية", ""), true);
});

// --- الماركة المكتوبة بالعربي تُفرض على العنوان العربي ---

test("enforces an Arabic brand against an Arabic title", () => {
  assert.equal(productMatchesTitle("حقيبة يد سوداء", "حقيبة شانيل", ""), false);
  assert.equal(productMatchesTitle("حقيبة يد شانيل جلد", "حقيبة شانيل", ""), true);
});

test("does not let a brand slip through for bags or watches", () => {
  assert.equal(productMatchesTitle("ساعة يد رجالية", "ساعة رولكس", ""), false);
  assert.equal(productMatchesTitle("ساعة رولكس أصلية", "ساعة رولكس", ""), true);
});
