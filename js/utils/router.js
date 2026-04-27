/**
 * Simple client-side router — navigates between HTML pages.
 * All pages are relative to the /pages/ directory.
 */
window.Router = {
  /** Navigate to a page by filename (without path). */
  go: function (page) {
    var current = window.location.pathname;
    var inPages = current.includes('/pages/');
    var base = inPages ? '' : 'pages/';
    window.location.href = base + page;
  },

  /** Go back one step in history. */
  back: function () {
    window.history.back();
  },

  /** Replace current history entry (no back navigation). */
  replace: function (page) {
    var current = window.location.pathname;
    var inPages = current.includes('/pages/');
    var base = inPages ? '' : 'pages/';
    window.location.replace(base + page);
  }
};
