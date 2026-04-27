/**
 * Centralized image asset registry.
 * All image URLs below use local files to avoid any CDN expiry.
 */
window.ASSETS = {

  /* ── Shared ────────────────────────────────────────────── */
  // iOS-style status bar system icons (used on all pages)
  // These are pure SVG in the HTML; no URLs needed here.

  /* ── Phone verify / auth pages (426-12540, 426-12628) ─── */
  phone_verify_deco:  '../assets/images/phone_verify_deco.png',

  /* ── Splash page (426-12527) ───────────────────────────── */
  splash_vibe_logo:   '../assets/images/splash_vibe_logo.png',

  /* ── Login page (426-12437) ────────────────────────────── */
  login_vibe_logo:    '../assets/images/login_vibe_logo.png',
  login_wechat_mask:  '../assets/images/login_wechat_mask.png',
  login_qq:           '../assets/images/login_qq.png',
  login_phone:        '../assets/images/login_phone.png',
  login_apple:        '../assets/images/login_apple.png',
  login_unchecked:    '../assets/images/login_unchecked.svg',
  login_checked:      '../assets/images/hint_checked.svg',

  /* ── Hint page (426-12474) ──────────────────────────────── */
  hint_vibe_logo:     '../assets/images/hint_vibe_logo.png',
  hint_wechat_mask:   '../assets/images/hint_wechat_mask.png',
  hint_qq:            '../assets/images/hint_qq.png',
  hint_phone:         '../assets/images/hint_phone.png',
  hint_apple:         '../assets/images/hint_apple.png',
  hint_checked:       '../assets/images/hint_checked.svg',

  /* ── Home page (426-12759) ──────────────────────────────── */
  home_vibe_logo:     '../assets/images/home_vibe_logo.png',
  home_bg_gradient:   '../assets/images/home_bg_gradient.svg',
  home_avatar_mask:   '../assets/images/home_avatar_mask.svg',

  // Friend avatars
  friend_cuipi:       '../assets/images/friend_cuipi.jpg',
  friend_douhua:      '../assets/images/friend_douhua.jpg',
  friend_luc:         '../assets/images/friend_luc.jpg',
  friend_liangshuf:   '../assets/images/friend_liangshuf.jpg',
  friend_erfen:       '../assets/images/friend_erfen.jpg',

  // Game card assets (你画我猜 - blue)
  game_doodle_bg:     '../assets/images/game_doodle_bg.svg',
  game_doodle_art:    '../assets/images/game_doodle_art.png',
  // Game card assets (拆弹蛙 - green)
  game_bomb_bg:       '../assets/images/game_bomb_bg.svg',
  game_bomb_art:      '../assets/images/game_bomb_art.png',
  // Game card assets (合成大西瓜 - yellow)
  game_watermelon_bg: '../assets/images/game_watermelon_bg.svg',
  game_watermelon_art:'../assets/images/game_watermelon_art.png',

  // Party discovery cards
  party_mask:         '../assets/images/party_mask.svg',
  party_img1:         '../assets/images/party_img1.png',
  party_img2:         '../assets/images/party_img2.png',
  party_img3:         '../assets/images/party_img3.jpg',
  party_img4:         '../assets/images/party_img4.jpg',

  // Party host avatars
  host1:              '../assets/images/host1.png',
  host2:              '../assets/images/host2.png',
  host3:              '../assets/images/host3.png',
  host4:              '../assets/images/host4.png',
};

/**
 * Populates all <img> elements that have a data-asset attribute.
 * Call on DOMContentLoaded if you use data-asset instead of src.
 * Usage in HTML: <img data-asset="splash_vibe_logo" alt="">
 */
window.populateAssets = function () {
  document.querySelectorAll('img[data-asset]').forEach(function (img) {
    var key = img.getAttribute('data-asset');
    if (window.ASSETS[key]) {
      img.src = window.ASSETS[key];
    }
  });
};

/**
 * Normalize top status bars to one iOS-like component.
 * This avoids per-page SVG drift and keeps all pages consistent.
 */
window.normalizeStatusBars = function () {
  document.querySelectorAll('.status-bar.status-bar--use-header-image').forEach(function (bar) {
    bar.classList.add('status-bar--image');
    bar.innerHTML = '<img class="status-bar__header-image" src="../assets/images/header.png" alt="status bar">';
  });
};

document.addEventListener('DOMContentLoaded', function () {
  function isNativeShell() {
    try {
      if (window.__NATIVE_SHELL__ === true) return true;
      if (window.Capacitor && typeof window.Capacitor.isNativePlatform === 'function') {
        return window.Capacitor.isNativePlatform();
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  function useNativeStatusBarIfAvailable() {
    try {
      if (!window.Capacitor || !window.Capacitor.Plugins || !window.Capacitor.Plugins.StatusBar) {
        return false;
      }
      var StatusBar = window.Capacitor.Plugins.StatusBar;
      // iOS native bar visible; web fallback stays available.
      if (typeof StatusBar.setOverlaysWebView === 'function') {
        StatusBar.setOverlaysWebView({ overlay: false });
      }
      if (typeof StatusBar.setStyle === 'function') {
        // 1 = Dark text/icons on light background in Capacitor iOS.
        StatusBar.setStyle({ style: 1 });
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  var nativeShell = isNativeShell();
  document.documentElement.classList.toggle('native-shell', nativeShell);
  document.documentElement.classList.toggle('web-shell', !nativeShell);

  // Native shell: prefer system realtime status bar.
  // Any failure automatically falls back to simulated status bar.
  if (nativeShell && useNativeStatusBarIfAvailable()) return;
  window.normalizeStatusBars();
});
