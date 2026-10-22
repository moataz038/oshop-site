# دليل التعديل السريع

قبل أي تعديل:

```bash
bash tools/verify.sh
```

بعد التعديل:

```bash
bash tools/build.sh
node --test tools/product-matching.test.cjs
git diff --check
git status --short
```

ابدأ دائمًا بقراءة [خريطة الكود](docs/CODE_MAP.md). لا تعدّل ملفات `index-*.js` أو `index-*.css` المضغوطة بشكل عشوائي، ولا تغيّر رابط module بإضافة query string. إذا كان المطلوب تعديل واجهة كبيرة، يجب أولًا توفير مصدر بناء غير مضغوط ثم تغيير `vercel.json` ليبني منه بدل ترقيع الناتج النهائي.

كل commit يجب أن يصف وظيفة التغيير، مثل:

```text
Fix welcome flow before chat
Document API and maintenance layout
Improve product matching for Arabic features
```

لا تضع مفاتيح API أو cookies أو بيانات العملاء في GitHub. الأسرار تظل داخل Environment Variables في Vercel.
