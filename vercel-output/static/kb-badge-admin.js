'use strict';
const form = document.getElementById('badge-form');
const fields = document.getElementById('fields');
const statusText = document.getElementById('status');
const saveButton = document.getElementById('save');
const logoutButton = document.getElementById('logout');
const ADMIN_API = '/api/staff/kb-badge-copy';

function showStatus(message, kind = '') {
  statusText.textContent = message;
  statusText.dataset.error = kind === 'error' ? 'true' : 'false';
  statusText.dataset.success = kind === 'success' ? 'true' : 'false';
}
function requireLogin(response) {
  if (response.status !== 401 || response.headers.get('X-Oshop-Admin-Auth') !== 'required') return false;
  window.location.replace('/kb-badge-admin-login.html?next=%2Fkb-badge-admin');
  return true;
}
function renderFields(items) {
  fields.replaceChildren();
  items.forEach((text, index) => {
    const label = document.createElement('label');
    label.textContent = `العبارة ${index + 1}`;
    const input = document.createElement('input');
    input.type = 'text';
    input.name = `item-${index + 1}`;
    input.maxLength = 80;
    input.autocomplete = 'off';
    input.value = text;
    input.setAttribute('aria-label', `العبارة ${index + 1}`);
    label.append(input);
    fields.append(label);
  });
  saveButton.disabled = false;
}
async function loadItems() {
  try {
    const response = await fetch(ADMIN_API, { credentials: 'same-origin', cache: 'no-store' });
    if (requireLogin(response)) return;
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !Array.isArray(result.items) || result.items.length !== 5) {
      showStatus(result.error || 'تعذر تحميل العبارات.', 'error');
      return;
    }
    renderFields(result.items);
    showStatus('تم تحميل العبارات الحالية.');
  } catch {
    showStatus('تعذر الاتصال بالخدمة. تحقق من الاتصال ثم أعد المحاولة.', 'error');
  }
}
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const items = [...fields.querySelectorAll('input')].map((input) => input.value.trim());
  if (items.length !== 5 || items.every((item) => !item)) {
    showStatus('أدخل عبارة واحدة على الأقل، مع إبقاء الحقول الخمسة.', 'error');
    return;
  }
  saveButton.disabled = true;
  showStatus('جارٍ حفظ العبارات…');
  try {
    const response = await fetch(ADMIN_API, {
      method: 'PUT',
      credentials: 'same-origin',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    if (requireLogin(response)) return;
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      showStatus(result.error || 'تعذر حفظ العبارات.', 'error');
      return;
    }
    renderFields(result.items);
    showStatus('تم حفظ العبارات بنجاح.', 'success');
  } catch {
    showStatus('تعذر الاتصال بالخدمة. لم يتم تأكيد الحفظ.', 'error');
  } finally {
    saveButton.disabled = false;
  }
});
logoutButton.addEventListener('click', async () => {
  logoutButton.disabled = true;
  try {
    await fetch('/api/kb-badge-admin/logout', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    });
  } finally {
    window.location.replace('/kb-badge-admin-login.html?next=%2Fkb-badge-admin');
  }
});
loadItems();
