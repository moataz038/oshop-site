const test = require("node:test");
const assert = require("node:assert/strict");
const { productMatchesTitle } = require("./product-matching.cjs");

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
