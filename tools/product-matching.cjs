/**
 * Oshop product matching rules.
 * الوظيفة: منع عرض نتيجة قريبة كأنها مطابقة لطلب العميل.
 * هذا الملف هو مصدر القواعد القابل للاختبار؛ لا تعدّل النسخة المحقونة يدويًا.
 */
const PRODUCT_TYPES = [
  { id: "sneaker", query: ["sneaker", "sneakers", "running shoe", "sports shoe", "حذاء رياضي", "سنيكر", "كوتشي", "كنادر", "كندرة", "صبابيط", "صباط رياضي", "سبور"], titles: ["sneaker", "sneakers", "trainer", "trainers", "running shoe", "sports shoe", "حذاء رياضي", "سنيكر", "كوتشي", "كنادر", "كندرة", "صباط"] },
  { id: "boot", query: ["boot", "boots", "ankle boot", "جزمة", "بوت"], titles: ["boot", "boots", "ankle boot", "جزمة", "بوت"] },
  { id: "sandal", query: ["sandal", "sandals", "صندل", "صنادل", "نعال"], titles: ["sandal", "صندل", "صنادل", "نعال"] },
  { id: "slipper", query: ["slipper", "slippers", "slide", "slides", "flip flop", "flip-flops", "شبشب", "شباشب", "سليبر", "بلاج"], titles: ["slipper", "slippers", "slide", "slides", "flip flop", "flip-flops", "شبشب", "شباشب", "سليبر", "بلاج"] },
  { id: "heel", query: ["high heel", "high heels", "heels", "كعب عالي", "حذاء بكعب"], titles: ["high heel", "heels", "stiletto", "كعب عالي", "حذاء بكعب"] },
  { id: "abaya", query: ["abaya", "abayas", "عباية", "عبايات", "عباءة", "عباءات"], titles: ["abaya", "عباية", "عباءة"] },
  { id: "handbag", query: ["handbag", "handbags", "purse", "purses", "شنطة يد", "حقيبة يد"], titles: ["handbag", "handbags", "purse", "purses", "شنطة يد", "حقيبة يد"] },
  { id: "backpack", query: ["backpack", "rucksack", "شنطة ظهر", "حقيبة ظهر"], titles: ["backpack", "rucksack", "شنطة ظهر", "حقيبة ظهر"] },
  { id: "tote", query: ["tote bag", "tote", "شنطة تسوق", "حقيبة تسوق"], titles: ["tote bag", "tote", "شنطة تسوق", "حقيبة تسوق"] },
  { id: "bag", query: ["bag", "bags", "شنطة", "شنط", "حقيبة", "حقائب"], titles: ["bag", "handbag", "purse", "backpack", "rucksack", "tote", "satchel", "شنطة", "حقيبة"] },
  { id: "belt", query: ["belt", "belts", "حزام", "أحزمة", "احزمة"], titles: ["belt", "حزام", "أحزمة", "احزمة"] },
  { id: "watch", query: ["watch", "watches", "ساعة", "ساعات"], titles: ["watch", "watches", "ساعة", "ساعات"] },
  { id: "dress", query: ["dress", "dresses", "gown", "فستان", "فساتين", "elbise"], titles: ["dress", "gown", "فساتين", "فستان", "elbise"] },
  { id: "perfume", query: ["perfume", "parfum", "fragrance", "عطر", "عطور"], titles: ["perfume", "parfum", "fragrance", "eau de parfum", "عطر", "عطور"] },
  { id: "wallet", query: ["wallet", "wallets", "محفظة", "محافظ"], titles: ["wallet", "محفظة", "محافظ"] },
  { id: "shirt", query: ["shirt", "shirts", "blouse", "قميص", "قمصان", "بلوزة", "بلوزات"], titles: ["shirt", "blouse", "قميص", "بلوزة"] },
  { id: "coat", query: ["coat", "coats", "jacket", "jackets", "معطف", "جاكيت", "بالطو"], titles: ["coat", "jacket", "معطف", "جاكيت", "بالطو"] },
  { id: "pants", query: ["pants", "trousers", "jeans", "بنطال", "بنطلون", "جينز", "سروال"], titles: ["pants", "trousers", "jeans", "بنطال", "بنطلون", "جينز", "سروال"] },
  { id: "jewelry", query: ["jewelry", "jewellery", "necklace", "bracelet", "earrings", "ring", "مجوهرات", "قلادة", "سوار", "أقراط", "خاتم", "سلسلة", "حلق"], titles: ["jewelry", "jewellery", "necklace", "bracelet", "earrings", "ring", "مجوهرات", "قلادة", "سوار", "أقراط", "خاتم", "سلسلة", "حلق"] },
  { id: "sunglasses", query: ["sunglasses", "sun glasses", "glasses", "نظارات شمسية", "نظارة", "نظارات", "شمسية"], titles: ["sunglasses", "sun glasses", "glasses", "نظارة", "نظارات"] },
  { id: "shoes", query: ["shoe", "shoes", "footwear", "حذاء", "أحذية", "احذية", "كنادر", "كندرة", "صبابيط", "صباط", "سبور"], titles: ["shoe", "shoes", "footwear", "sneaker", "trainer", "boot", "sandal", "heel", "slipper", "حذاء", "أحذية", "احذية", "سنيكر", "كوتشي", "جزمة", "بوت", "صندل", "شبشب", "كنادر", "صباط"] },
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
  { id: "beige", query: ["beige", "بيج", "كريمي", "cream"], titles: ["beige", "بيج", "كريمي", "cream"] },
  { id: "brown", query: ["brown", "بني", "بنية"], titles: ["brown", "بني", "بنية"] },
  { id: "grey", query: ["grey", "gray", "رمادي", "رمادية"], titles: ["grey", "gray", "رمادي", "رمادية"] },
  { id: "navy", query: ["navy", "كحلي"], titles: ["navy", "كحلي"] },
  { id: "embroidered", query: ["embroidery", "embroideries", "embroidered", "embroider", "تطريز", "تطريزات", "مطرز", "مطرزة", "مطرزات"], titles: ["embroidery", "embroideries", "embroidered", "embroider", "تطريز", "مطرز", "مطرزة"] },
  { id: "lace", query: ["lace", "lacework", "دانتيلا", "دانتيل"], titles: ["lace", "lacework", "دانتيلا", "دانتيل"] },
  { id: "sequins", query: ["sequin", "sequins", "paillette", "ترتر", "ترتره"], titles: ["sequin", "sequins", "paillette", "ترتر"] },
  { id: "floral", query: ["floral", "flower", "flowers", "ورود", "ورود مطبوعة"], titles: ["floral", "flower", "flowers", "ورود"] },
  { id: "leather", query: ["leather", "جلد", "جلدي", "جلدية"], titles: ["leather", "جلد", "جلدي", "جلدية"] },
  { id: "suede", query: ["suede", "شامواه"], titles: ["suede", "شامواه"] },
  { id: "satin", query: ["satin", "ساتان"], titles: ["satin", "ساتان"] },
  { id: "silk", query: ["silk", "حرير", "حريري"], titles: ["silk", "حرير", "حريري"] },
  { id: "chiffon", query: ["chiffon", "شيفون"], titles: ["chiffon", "شيفون"] },
  { id: "cotton", query: ["cotton", "قطن", "قطني"], titles: ["cotton", "قطن", "قطني"] },
  { id: "velvet", query: ["velvet", "مخمل"], titles: ["velvet", "مخمل"] },
  { id: "denim", query: ["denim", "جينز"], titles: ["denim", "جينز"] },
  { id: "quilted", query: ["quilted", "quilting", "مبطن", "مبطنة"], titles: ["quilted", "quilting", "مبطن", "مبطنة"] },
  { id: "chain", query: ["chain", "chain strap", "سلسلة", "سير سلسلة"], titles: ["chain", "سلسلة"] },
  { id: "long", query: ["long", "طويل", "طويلة"], titles: ["long", "طويل", "طويلة"] },
  { id: "short", query: ["short", "قصير", "قصيرة"], titles: ["short", "قصير", "قصيرة"] },
  { id: "midi", query: ["midi", "ميدي"], titles: ["midi", "ميدي"] },
  { id: "maxi", query: ["maxi", "ماكسي"], titles: ["maxi", "ماكسي"] },
  { id: "striped", query: ["striped", "stripes", "مقلّم", "مقلم", "مخطط"], titles: ["striped", "stripes", "مقلّم", "مقلم", "مخطط"] },
  { id: "printed", query: ["printed", "print", "مطبوع", "مطبوعة"], titles: ["printed", "print", "مطبوع", "مطبوعة"] },
  { id: "oversized", query: ["oversized", "واسع", "واسعة"], titles: ["oversized", "واسع", "واسعة"] },
];

const STOP_WORDS = new Set((
  "a an the with for of in on from to and or by women woman womens women's men mens men's s kids child children baby brand branded original authentic genuine new cheap cheaper lowest low price lower deal deals best quality style model type size color colour item product find search looking want please ladies lady female male " +
  "نبي نبيلي نبيلك ابي اريد ابغى ابغي نحوس دورلي دور لي هات عطيني وريني لو سمحت من في على الى إلي و او فيها بها يكون تكون لل لي للزبونة للزبون نوع نوعا شكل موديل ماركة ماركه اصلي اصليه اصليا سعر ارخص اقل مختلف اخرى اخر فقط برشا توا قداش شن شني واش هاد هذي هذا هذيك تبي تحب نلقالك نلقى حاجة حاجه شي بربي عايز عاوز محتاج طلب طلبي يدور يدورلي ابحث ابحثي حوس حوسي وريني جيبلي جيب عايزة محتاجة نفس مثل كيما حتى ولا بس بين زي كان عندك عندكم حق حقت " +
  "kadin kadın erkek bayan bayanlar erkekler icin için yeni kaliteli uygun ucuz en iyi elbise urun ürün istiyorum bana bul göster"
).split(/\s+/).map(normalizeProductText));

/** Arabic letters are commonly written with a leading conjunction/article: بالذهبي، الذهبي، والذهبي، بتطريز. */
const ARABIC_PREFIXES = ["", "ال", "بال", "وال", "كال", "فال", "لل", "و", "ب", "ل", "ك", "ف"];

/**
 * Audience words (نسائي / رجالي / أطفال / women / men...) rarely survive
 * translation, so they are never used as hard requirements.
 */
const AUDIENCE = new Set(
  ("women womens woman ladies lady female girls girl men mens man male boys boy kids kid child children baby " +
    "نساء نسائي نساييه نسوان حريمي رجال رجالي رجاليه ولادي اولاد اطفال طفل اطفالي بيبي")
    .split(/\s+/)
    .map(normalizeProductText),
);

/** "بتطريز" -> ["بتطريز", "تطريز"] so prefixed words are recognised as features, not brands. */
function baseForms(token) {
  const forms = new Set([token]);
  for (const prefix of ARABIC_PREFIXES) {
    if (prefix && token.startsWith(prefix) && token.length > prefix.length + 1) forms.add(token.slice(prefix.length));
  }
  return [...forms];
}

function normalizeProductText(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ı/g, "i")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

/** All accepted surface forms of one word (plural + Arabic prefixes). */
function wordVariants(word) {
  const forms = new Set([word]);
  const last = word;
  forms.add(`${last}s`);
  forms.add(`${last}es`);
  if (last.endsWith("y") && last.length > 2) forms.add(`${last.slice(0, -1)}ies`);
  if (last.endsWith("s") && last.length > 2) forms.add(last.slice(0, -1));
  if (last.endsWith("ies") && last.length > 4) forms.add(`${last.slice(0, -3)}y`);
  for (const prefix of ARABIC_PREFIXES) forms.add(prefix + word);
  return [...forms];
}

/** Whole-phrase match, tolerant to plurals and Arabic prefixes (بالذهبي = الذهبي = ذهبي). */
function phrasePresent(text, phrase) {
  const haystack = ` ${normalizeProductText(text)} `;
  const words = normalizeProductText(phrase).split(" ").filter(Boolean);
  if (!words.length) return false;
  const lastWord = words.at(-1);
  const prefix = words.slice(0, -1);
  return wordVariants(lastWord).some((variant) => {
    const needle = ` ${[...prefix, variant].join(" ")} `;
    return needle.length > 2 && haystack.includes(needle);
  });
}

function productTypeForQuery(queryText) {
  const query = normalizeProductText(queryText);
  return PRODUCT_TYPES.find((rule) => rule.query.some((term) => phrasePresent(query, term))) ?? null;
}

function productTokenPresent(titleText, token) {
  const haystack = ` ${normalizeProductText(titleText)} `;
  return wordVariants(token).some((variant) => haystack.includes(` ${variant} `));
}

/**
 * Strict match between a marketplace title and what the customer asked for.
 * - The product type (shoes vs bag vs watch…) must match, in all three languages.
 * - Every colour / material / pattern / style word the customer mentioned must
 *   appear in the title (Arabic included, not just the marketplace-language query).
 * - Any remaining brand or model word from the request must appear as well;
 *   when we cannot verify it, the result is rejected rather than shown.
 */
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

  const typeTokens = new Set((type?.query ?? []).flatMap((term) => normalizeProductText(term).split(" ")));
  const titleTypeTokens = new Set((type?.titles ?? []).flatMap((term) => normalizeProductText(term).split(" ")));
  const featureTokens = new Set(PRODUCT_FEATURES.flatMap((feature) => feature.query.concat(feature.titles).flatMap((term) => normalizeProductText(term).split(" "))));

  // Arabic words can only be verified against an Arabic title; for English titles the
  // marketplace-language query already carries the same brand/spec words.
  const descriptorSource = /[\u0600-\u06FF]/.test(title) ? fullQuery : localQuery;
  const excluded = new Set([...typeTokens, ...titleTypeTokens, ...featureTokens]);
  const descriptors = [...new Set(normalizeProductText(descriptorSource).split(" "))].filter(
    (token) =>
      token.length > 1 &&
      !STOP_WORDS.has(token) &&
      !AUDIENCE.has(token) &&
      !baseForms(token).some((form) => excluded.has(form)),
  );
  return descriptors.every((token) => productTokenPresent(titleText, token));
}

module.exports = { normalizeProductText, productTypeForQuery, productMatchesTitle };
