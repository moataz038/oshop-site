(() => {
  const publicStore = window.location.hostname === 'kb-online-store.vercel.app';
  if (publicStore) {
    const hideStaffRoute = () => {
      let hash;
      try { hash = decodeURIComponent(window.location.hash); } catch { hash = ''; }
      while (hash.includes('//')) hash = hash.replace('//', '/');
      if (/^#\/staff(?:[/?]|$)/i.test(hash)) window.history.replaceState(null, '', '/');
    };
    hideStaffRoute();
    window.addEventListener('hashchange', hideStaffRoute);
  }
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (...args) => {
    const response = await originalFetch(...args);
    if (!publicStore && response.status === 401 && response.headers.get('X-Oshop-Admin-Auth') === 'required' && window.location.pathname !== '/admin-login.html') window.location.replace('/admin-login.html');
    return response;
  };
})();
