/**
 * Auth utility — manages login state via sessionStorage.
 *
 * sessionStorage is scoped to the browser tab and survives navigation
 * but is cleared when the tab is closed. Splash.js explicitly clears
 * the flag so every visit to the root forces re-authentication.
 */
(function setupDynamicViewportHeight() {
  function applyViewportHeight() {
    var viewport = window.visualViewport;
    var height = viewport ? viewport.height : window.innerHeight;
    if (!height) return;
    document.documentElement.style.setProperty('--app-vh', (height * 0.01) + 'px');
  }

  applyViewportHeight();
  window.addEventListener('resize', applyViewportHeight);
  window.addEventListener('orientationchange', applyViewportHeight);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', applyViewportHeight);
  }
})();

window.Auth = {
  _KEY: 'vibe_authed',

  /** Call on successful login before navigating to a protected page. */
  setLoggedIn: function () {
    sessionStorage.setItem(this._KEY, '1');
  },

  /** Call at the top of every protected page. Redirects to splash if not logged in. */
  guard: function () {
    if (!sessionStorage.getItem(this._KEY)) {
      window.location.replace(
        window.location.pathname.includes('/pages/') ? 'splash.html' : 'pages/splash.html'
      );
    }
  },

  /** Call on splash page load to force re-authentication. */
  clear: function () {
    sessionStorage.removeItem(this._KEY);
  }
};
