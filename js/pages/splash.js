document.addEventListener('DOMContentLoaded', function () {
  Auth.clear();
  populateAssets();
  setTimeout(function () {
    Router.replace('login.html');
  }, 3000);
});
