(() => {
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (...args) => {
    const response = await originalFetch(...args);
    if (
      response.status === 401 &&
      response.headers.get('X-Oshop-Admin-Auth') === 'required' &&
      window.location.pathname !== '/admin-login.html'
    ) {
      window.location.replace('/admin-login.html');
    }
    return response;
  };
})();
