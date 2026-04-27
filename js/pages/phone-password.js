document.addEventListener('DOMContentLoaded', function () {
  populateAssets();

  var submitBtn = document.getElementById('submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      Auth.setLoggedIn();
      Router.go('home.html');
    });
  }
});
