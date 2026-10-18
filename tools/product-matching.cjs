const PRODUCT_TYPES = [
  { id: "sneaker", query: ["sneaker", "sneakers", "running shoe", "sports shoe", "حذاء رياضي", "سنيكر", "كوتشي"], titles: ["sneaker", "sneakers", "trainer", "trainers", "running shoe", "sports shoe", "حذاء رياضي", "سنيكر", "كوتشي"] },
  { id: "boot", query: ["boot", "boots", "ankle boot", "جزمة", "بوت"], titles: ["boot", "boots", "ankle boot", "جزمة", "بوت"] },
  { id: "sandal", query: ["sandal", "sandals", "صندل", "صنادل"], titles: ["sandal", "صندل", "صنادل"] },
  { id: "heel", query: ["high heel", "high heels", "heels", "كعب عالي", "حذاء بكعب"], titles: ["high heel", "heels", "stiletto", "كعب عالي", "حذاء بكعب"] },
  { id: "abaya", query: ["abaya", "abayas", "عباية", "عبايات", "عباءة", "عباءات"], titles: ["abaya", "عباية", "عباءة"] },
  { id: "handbag", query: ["handbag", "handbags", "purse", "purses", "شنطة يد", "حقيبة يد"], titles: ["handbag", "handbags", "purse", "purses", "شنطة يد", "حقيبة يد"] },
  { id: "backpack", query: ["backpack", "rucksack", "شنطة ظهر", "حقيبة ظهر"], titles: ["backpack", "rucksack", "شنطة ظهر", "حقيبة ظهر"] },
  { id: "tote", query: ["tote bag", "tote", "شنطة تسوق", "حقيبة تسوق"], titles: ["tote bag", "tote", "شنطة تسوق", "حقيبة تسوق"] },
  { id: "bag", query: ["bag", "bags", "شنطة", "شنط", "حقيبة", "حقائب"], titles: ["bag", "handbag", "purse", "backpack", "rucksack", "tote", "satchel", "شنطة", "حقيبة"] },
  { id: "belt", query: ["belt", "belts", "حزام", "أحزمة", "احزمة"], titles: ["belt", "حزام", "أحزمة", "احزمة"] },
  { id: "watch", query: ["watch", "watches", "ساعة", "ساعات"], titles: ["watch", "watches", "ساعة", "ساعات"] },
  { id: "dress", query: ["dress", "dresses", "gown", "فستان", "فساتين", "elbise"], titles: ["dress", "gown", "فساتين", "فستان", "elbise"] },
  { id: "perfume", query: ["perfume", "parfum", "fragrance", "عطر", "عطور"], titles: ["perfume", "parfum", "fragrance", "عطر", "عطور"] },
  { id: "wallet", query: ["wallet", "wallets", "محفظة", "محافظ"], titles: ["wallet", "محفظة", "محافظ"] },
  { id: "shirt", query: ["shirt", "shirts", "blouse", "قميص", "قمصان", "بلوزة", "بلوزات"], titles: ["shirt", "blouse", "قميص", "بلوزة"] },
  { id: "coat", query: ["coat", "coats", "jacket", "jackets", "معطف", "جاكيت"], titles: ["coat", "jacket", "معطف", "جاكيت"] },
  { id: "pants", query: ["pants", "trousers", "jeans", "بنطال", "بنطلون", "جينز"], titles: ["pants", "trousers", "jeans", "بنطال", "بنطلون", "جينز"] },
  { id: "jewelry", query: ["jewelry", "jewellery", "necklace", "bracelet", "earrings", "مجوهرات", "قلادة", "سوار", "أقراط"], titles: ["jewelry", "jewellery", "necklace", "bracelet", "earrings", "مجوهرات", "قلادة", "سوار", "أقراط"] },
  { id: "shoes", query: ["shoe", "shoes", "footwear", "حذاء", "أحذية", "احذية"], titles: ["shoe", "shoes", "footwear", "sneaker", "trainer", "boot", "sandal", "heel", "حذاء", "أحذية", "احذية", "سنيكر", "كوتشي", "جزمة", "بوت", "صندل"] },
];

const PRODUCT_FEATURES = [
  { id: "gold", query: ["gold", "golden", "gold-colored", "ذهبي", "ذهبية", "ذهبيات", "بالذهب"], titles: ["gold", "golden", "gold-colored", "ذهبي", "ذهبية", "بالذهب"] },
  { id: "silver", query: ["silver", "silver-colored", "فضي", "فضية"], titles: ["silver", "silver-colored", "فضي", "فضية"] },
  { id: "black", query: ["black", "أسود", "اسود", "سوداء", "سودا"], titles: ["black", "أسود", "اسود", "سوداء", "سودا"] },
  { id: "white", query: ["white", "أبيض", "ابيض", "بيضاء", "بيضا"], titles: ["white", "أبيض", "ابيض", "بيضاء", "بيضا"] },
  { id: "red", query: ["red", "أحمر", "احمر", "حمراء"], titles: ["red", "أحمر", "احمر", "حمراء"] },
  { id: "blue", query: ["blue", "أزرق", "ازرق", "زرقاء"], titles: ["blue", "أزرق", "ازرق", "زرقاء"] },
  { id: "green", query: ["green", "أخضر", "اخضر", "خضراء"], titles: ["green", "أخضر", "اخضر", "خضراء"] },
  { id: "pink", query: ["pink", "وردي", "وردية", "زهري"], titles: ["pink", "وردي", "وردية", "زهري"] },
  { id: "embroidered", query: ["embroidery", "embroideries", "embroidered", "embroider", "تطريز", "تطريزات", "مطرز", "مطرزة", "مطرزات"], titles: ["embroidery", "embroideries", "embroidered", "embroider", "تطريز", "مطرز", "مطرزة"] },
  { id: "lace", query: ["lace", "lacework", "دانتيلا", "دانتيل"], titles: ["lace", "lacework", "دانتيلا", "دانتيل"] },
  { id: "sequins", query: ["sequin", "sequins", "paillette", "ترتر", "ترتره"], titles: ["sequin", "sequins", "paillette", "ترتر"] },
  { id: "floral", query: ["floral", "flower", "flowers", "ورود", "ورود مطبوعة"], titles: ["floral", "flower", "flowers", "ورود"] },
  { id: "leather", query: ["leather", "جلد", "جلدي", "جلدية"], titles: ["leather", "جلد", "جلدي", "جلدية"] },
  { id: "quilted", query: ["quilted", "quilting", "مبطن", "مبطنة"], titles: ["quilted", "quilting", "مبطن", "مبطنة"] },
  { id: "chain", query: ["chain", "chain strap", "سلسلة", "سير سلسلة"], titles: ["chain", "سلسلة"] },
  { id: "long", query: ["long", "طويل", "طويلة"], titles: ["long", "طويل", "طويلة"] },
  { id: "short", query: ["short", "قصير", "قصيرة"], titles: ["short", "قصير", "قصيرة"] },
];

const STOP_WORDS = new Set((
  "a an the with for of in on from to and or by women woman womens women's men mens men's s kids child children baby brand branded original authentic genuine new cheap cheaper lowest low price lower deal deals best quality style model type size color colour item product find search looking want please ladies lady female male " +
  "نبي نبيلي ابي اريد ابغى ابحث دورلي دور لي هات عطيني وريني لو سمحت من في على الى و او فيها بها يكون تكون لل لي للزبونة للزبون نوع نوعا شكل موديل ماركة ماركه اصلي اصليه سعر ارخص اقل مختلف اخرى اخر فقط " +
  "kadin kadın erkek bayan bayanlar erkekler icin için yeni kaliteli uygun ucuz en iyi elbise urun ürün istiyorum bana bul göster"
).split(/\s+/).map(normalizeProductText));

function normalizeProductText(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ı/g, "i")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function phrasePresent(text, phrase) {
  const haystack = ` ${normalizeProductText(text)} `;
  const words = normalizeProductText(phrase).split(" ").filter(Boolean);
  if (!words.length) return false;
  const last = words.at(-1);
  const variants = new Set([last, `${last}s`, `${last}es`]);
  if (last.endsWith("y") && last.length > 2) variants.add(`${last.slice(0, -1)}ies`);
  if (last.endsWith("s") && last.length > 2) variants.add(last.slice(0, -1));
  if (last.endsWith("ies") && last.length > 4) variants.add(`${last.slice(0, -3)}y`);
  const prefix = words.slice(0, -1);
  return [...variants].some((variant) => {
    const needle = ` ${[...prefix, variant].join(" ")} `;
    return needle.length > 2 && haystack.includes(needle);
  });
}

function productTypeForQuery(queryText) {
  const query = normalizeProductText(queryText);
  return PRODUCT_TYPES.find((rule) => rule.query.some((term) => phrasePresent(query, term))) ?? null;
}

function productTokenPresent(titleText, token) {
  const words = new Set(normalizeProductText(titleText).split(" "));
  if (words.has(token)) return true;
  if (token.length > 3 && words.has(`${token}s`)) return true;
  if (token.length > 4 && token.endsWith("s") && words.has(token.slice(0, -1))) return true;
  return false;
}

function productMatchesTitle(title, queryAr = "", localQuery = "") {
  const titleText = normalizeProductText(title);
  if (!titleText) return false;
  const fullQuery = `${queryAr} ${localQuery}`;
  const type = productTypeForQuery(fullQuery);
  if (type && !type.titles.some((term) => phrasePresent(titleText, term))) return false;

  const requestedFeatures = PRODUCT_FEATURES.filter((feature) =>
    feature.query.some((term) => phrasePresent(fullQuery, term)),
  );
  for (const feature of requestedFeatures) {
    if (!feature.titles.some((term) => phrasePresent(titleText, term))) return false;
  }

  const localTokens = normalizeProductText(localQuery).split(" ").filter(Boolean);
  const typeTokens = new Set((type?.query ?? []).flatMap((term) => normalizeProductText(term).split(" ")));
  const titleTypeTokens = new Set((type?.titles ?? []).flatMap((term) => normalizeProductText(term).split(" ")));
  const featureTokens = new Set(PRODUCT_FEATURES.flatMap((feature) => feature.query.concat(feature.titles).flatMap((term) => normalizeProductText(term).split(" "))));
  const descriptors = [...new Set(localTokens)].filter((token) =>
    token.length > 1 && !STOP_WORDS.has(token) && !typeTokens.has(token) && !titleTypeTokens.has(token) && !featureTokens.has(token),
  );
  return descriptors.every((token) => productTokenPresent(titleText, token));
}

module.exports = { normalizeProductText, productTypeForQuery, productMatchesTitle };
