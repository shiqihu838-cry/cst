document.addEventListener('DOMContentLoaded', function () {
  populateAssets();

  var cancelBtn  = document.getElementById('modal-cancel');
  var confirmBtn = document.getElementById('modal-confirm');

  if (cancelBtn) {
    cancelBtn.addEventListener('click', function () {
      // Go back to login without accepting
      Router.back();
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', function () {
      Auth.setLoggedIn();
      Router.go('home.html');
    });
  }
});
