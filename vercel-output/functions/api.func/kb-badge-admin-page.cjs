'use strict';

module.exports = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow, noarchive" />
  <title>إدارة شارة KB</title>
  <style>
    :root { color-scheme: dark; font-family: system-ui, -apple-system, "Segoe UI", sans-serif; background: #090909; color: #f3eee2; }
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; padding: 28px 16px; display: grid; place-items: center; background: radial-gradient(ellipse at top, #211b0d 0, #090909 52%); }
    main { width: min(100%, 620px); padding: 26px; border: 1px solid #806835; border-radius: 20px; background: rgba(18, 17, 14, .96); box-shadow: 0 24px 70px rgba(0, 0, 0, .48); }
    .brand { display: grid; place-items: center; width: 58px; height: 58px; margin-bottom: 18px; border: 1px solid #b59a5c; border-radius: 16px; color: #d6bd78; font: 700 1.15rem Georgia, serif; letter-spacing: -.08em; }
    h1 { margin: 0 0 8px; font-size: 1.35rem; }
    p { color: #b3ab9a; line-height: 1.75; }
    #fields { display: grid; gap: 14px; margin: 24px 0; }
    label { display: grid; gap: 7px; font-weight: 600; }
    input { width: 100%; min-height: 48px; padding: 10px 12px; border: 1px solid #514a3b; border-radius: 10px; background: #0d0d0c; color: #f8f4e9; font: inherit; }
    input:focus { outline: 2px solid #b59a5c; outline-offset: 1px; }
    .actions { display: flex; gap: 10px; }
    button { min-height: 46px; padding: 10px 16px; border: 1px solid #9e854e; border-radius: 10px; background: linear-gradient(135deg, #9b7b3f, #c5a85f); color: #201b10; font: inherit; font-weight: 700; cursor: pointer; }
    button.secondary { background: #181713; color: #d8c995; }
    button:disabled { opacity: .55; cursor: wait; }
    #status { min-height: 1.7em; margin: 14px 0 0; }
    #status[data-error="true"] { color: #ffaaa0; }
    #status[data-success="true"] { color: #c8e8a4; }
    @media (max-width: 480px) { main { padding: 21px 17px; } .actions { flex-direction: column; } }
  </style>
</head>
<body>
  <main>
    <div class="brand" aria-label="KB">KB</div>
    <h1>إدارة عبارات شارة KB</h1>
    <p>عدّل العبارات الخمس التي تتناوب أسفل شعار المتجر. التغيير يقتصر على النصوص؛ شكل الشارة وحركتها يبقيان كما هما.</p>
    <form id="badge-form">
      <div id="fields" aria-live="polite"></div>
      <div class="actions">
        <button id="save" type="submit" disabled>حفظ العبارات</button>
        <button id="logout" class="secondary" type="button">تسجيل الخروج</button>
      </div>
      <p id="status" role="status" aria-live="polite"></p>
    </form>
  </main>
  <script defer src="/kb-badge-admin.js"></script>
</body>
</html>`;
