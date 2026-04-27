/**
 * Bottom navigation bar controller.
 * Marks the correct tab as active based on the current page filename
 * and wires up navigation clicks.
 *
 * Usage: include nav.js at bottom of every page that has a .nav-bar.
 */
(function () {
  var PAGE_MAP = {
    'home.html':               'home',
    'square-discover.html':    'square',
    'square-follow.html':      'square',
    'square-nearby.html':      'square',
    'chat.html':               'chat',
    'profile.html':            'profile',
  };

  var NAV_TARGETS = {
    'home':    'home.html',
    'square':  'square-discover.html',
    'chat':    'chat.html',
    'profile': 'profile.html',
  };

  function createAddActionSheet() {
    var mountEl = document.querySelector('.phone-frame') || document.body;
    var root = document.createElement('div');
    root.className = 'nav-add-sheet';
    root.setAttribute('aria-hidden', 'true');
    root.innerHTML = ''
      + '<div class="nav-add-sheet__mask" data-close="true"></div>'
      + '<div class="nav-add-sheet__panel" role="dialog" aria-modal="true" aria-label="发布选项">'
      + '  <button type="button" class="nav-add-sheet__action" data-sheet-action="album">从相册选择</button>'
      + '  <button type="button" class="nav-add-sheet__action nav-add-sheet__action--camera" data-sheet-action="camera">'
      + '    <span class="nav-add-sheet__title">相机</span>'
      + '    <span class="nav-add-sheet__desc">拍摄与直播</span>'
      + '  </button>'
      + '  <button type="button" class="nav-add-sheet__action" data-sheet-action="text">写文字</button>'
      + '  <button type="button" class="nav-add-sheet__cancel" data-close="true">取消</button>'
      + '</div>';
    mountEl.appendChild(root);
    return root;
  }

  function openPicker(options) {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = options.accept || '*/*';
    if (options.capture) input.setAttribute('capture', options.capture);
    input.style.position = 'fixed';
    input.style.left = '-9999px';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.click();
    input.addEventListener('change', function () {
      document.body.removeChild(input);
    }, { once: true });
  }

  function bindAddSheet(sheetEl) {
    function closeSheet() {
      sheetEl.classList.remove('is-open');
      sheetEl.setAttribute('aria-hidden', 'true');
    }

    function openSheet() {
      sheetEl.classList.add('is-open');
      sheetEl.setAttribute('aria-hidden', 'false');
    }

    sheetEl.addEventListener('click', function (event) {
      var shouldClose = event.target && event.target.closest('[data-close="true"]');
      if (shouldClose) closeSheet();

      var actionEl = event.target && event.target.closest('[data-sheet-action]');
      if (!actionEl) return;

      var action = actionEl.getAttribute('data-sheet-action');
      if (action === 'album') {
        openPicker({ accept: 'image/*' });
        closeSheet();
      } else if (action === 'camera') {
        openPicker({ accept: 'image/*', capture: 'environment' });
        closeSheet();
      } else if (action === 'text') {
        closeSheet();
        Router.go('hint.html');
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeSheet();
    });

    return {
      open: openSheet,
      close: closeSheet,
    };
  }

  document.addEventListener('DOMContentLoaded', function () {
    var filename = window.location.pathname.split('/').pop();
    var activeKey = PAGE_MAP[filename] || '';
    var addSheet = bindAddSheet(createAddActionSheet());

    /* Set active state */
    document.querySelectorAll('.nav-bar__item[data-nav]').forEach(function (el) {
      if (el.dataset.nav === activeKey) {
        el.classList.add('is-active');
      }
      el.addEventListener('click', function () {
        if (el.dataset.nav === 'add') {
          addSheet.open();
          return;
        }
        var target = NAV_TARGETS[el.dataset.nav];
        if (target) Router.go(target);
      });
    });
  });
})();
