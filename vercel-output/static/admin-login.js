'use strict';

const form = document.getElementById('login-form');
const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('submit');
const statusText = document.getElementById('status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusText.textContent = '';
  statusText.dataset.error = 'false';
  submitButton.disabled = true;
  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: passwordInput.value }),
    });
    const result = await response.json().catch(() => ({}));
    passwordInput.value = '';
    if (!response.ok) {
      statusText.textContent = result.error || 'تعذر تسجيل الدخول. حاول مرة أخرى.';
      statusText.dataset.error = 'true';
      return;
    }
    const requested = new URLSearchParams(window.location.search).get('next');
    window.location.replace(requested === '/kb-badge-admin' ? requested : '/#/staff');
  } catch {
    passwordInput.value = '';
    statusText.textContent = 'تعذر الاتصال بالخدمة. تحقق من الاتصال ثم أعد المحاولة.';
    statusText.dataset.error = 'true';
  } finally {
    submitButton.disabled = false;
    passwordInput.focus();
  }
});
