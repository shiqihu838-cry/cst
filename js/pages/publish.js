document.addEventListener('DOMContentLoaded', function () {
  var backBtn = document.querySelector('.publish-topbar__back');
  var coverBtn = document.querySelector('.publish-cover');
  var coverImage = document.querySelector('.publish-cover__image');
  var coverPlus = document.querySelector('.publish-cover__plus');
  var tagButtons = document.querySelectorAll('.publish-tags button');
  var contentInput = document.querySelector('.publish-content');

  function applyCoverImage(src) {
    if (!coverImage || !coverPlus || !src) return;
    if (!/^data:image\//.test(src)) return;

    coverImage.onload = function () {
      coverImage.hidden = false;
      coverPlus.style.display = 'none';
      coverImage.onload = null;
      coverImage.onerror = null;
    };

    coverImage.onerror = function () {
      coverImage.hidden = true;
      coverImage.removeAttribute('src');
      coverPlus.style.display = 'inline-block';
      coverImage.onload = null;
      coverImage.onerror = null;
    };

    coverImage.src = src;
  }

  function storeCoverDataURL(dataUrl) {
    try {
      sessionStorage.setItem('vibe_publish_cover_dataurl', dataUrl);
    } catch (e) {
      // Ignore storage quota errors.
    }
  }

  function consumePendingCoverFromStorage() {
    var key = 'vibe_publish_cover_dataurl';
    var fromSession = '';

    try {
      fromSession = sessionStorage.getItem(key) || '';
      if (fromSession) {
        applyCoverImage(fromSession);
        sessionStorage.removeItem(key);
        return;
      }
    } catch (e) {
      // Ignore storage read errors.
    }

    var namePrefix = 'vibe_publish_cover_dataurl:';
    if (typeof window.name === 'string' && window.name.indexOf(namePrefix) === 0) {
      var fromWindowName = window.name.slice(namePrefix.length);
      if (fromWindowName) applyCoverImage(fromWindowName);
      window.name = '';
    }
  }

  if (backBtn) {
    backBtn.addEventListener('click', function () {
      Router.back();
    });
  }

  if (coverBtn) {
    coverBtn.addEventListener('click', function () {
      var input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.style.position = 'fixed';
      input.style.left = '-9999px';
      input.style.opacity = '0';

      document.body.appendChild(input);
      input.click();

      input.addEventListener('change', function () {
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function () {
            var dataUrl = String(reader.result || '');
            applyCoverImage(dataUrl);
            storeCoverDataURL(dataUrl);
          };
          reader.readAsDataURL(input.files[0]);
        }
        document.body.removeChild(input);
      }, { once: true });
    });
  }

  tagButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!contentInput) return;
      var tagText = (btn.textContent || '').trim();
      if (!tagText) return;

      var current = contentInput.value || '';
      var separator = current && !/\s$/.test(current) ? ' ' : '';
      contentInput.value = current + separator + tagText;
      contentInput.focus();
    });
  });

  consumePendingCoverFromStorage();
});
