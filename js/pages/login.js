document.addEventListener('DOMContentLoaded', function () {
  populateAssets();

  var checkbox    = document.getElementById('terms-checkbox');
  var checkboxBtn = document.getElementById('terms-toggle');
  var checkboxImg = document.getElementById('checkbox-img');
  var termsRow    = document.querySelector('.login-terms');
  var wechatBtn   = document.getElementById('btn-wechat');
  var qqBtn       = document.getElementById('btn-qq');
  var phoneBtn    = document.getElementById('btn-phone');
  var appleBtn    = document.getElementById('btn-apple');
  var uncheckedSrc = '../assets/images/login_unchecked.svg?v=2';
  var checkedSrc = '../assets/images/hint_checked.svg?v=2';

  function syncCheckboxImage() {
    if (!checkbox || !checkboxImg) return;
    checkboxImg.src = checkbox.checked ? checkedSrc : uncheckedSrc;
  }

  function onLoginAttempt(provider) {
    if (checkbox && checkbox.checked) {
      Auth.setLoggedIn();
      Router.go('home.html');
    } else {
      // Show terms dialog — navigate to hint page
      Router.go('hint.html');
    }
  }

  if (wechatBtn) wechatBtn.addEventListener('click', function () { onLoginAttempt('wechat'); });
  if (qqBtn)     qqBtn.addEventListener('click',     function () { onLoginAttempt('qq'); });
  if (phoneBtn)  phoneBtn.addEventListener('click',  function () { Router.go('phone-verify.html'); });
  if (appleBtn)  appleBtn.addEventListener('click',  function () { onLoginAttempt('apple'); });

  if (checkbox) {
    checkbox.addEventListener('change', syncCheckboxImage);
    syncCheckboxImage();
  }

  if (checkboxBtn && checkbox) {
    checkboxBtn.addEventListener('click', function (event) {
      event.stopPropagation();
      checkbox.checked = !checkbox.checked;
      syncCheckboxImage();
    });
  }

  // Allow tapping the whole terms row (except links) to toggle.
  if (termsRow && checkbox) {
    termsRow.addEventListener('click', function (event) {
      if (event.target.classList.contains('login-terms__link')) return;
      checkbox.checked = !checkbox.checked;
      syncCheckboxImage();
    });
  }
});
