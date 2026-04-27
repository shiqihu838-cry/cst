document.addEventListener('DOMContentLoaded', function () {
  populateAssets();

  // Verify code auto-focus to next input
  var inputs = document.querySelectorAll('.code-input');
  inputs.forEach(function (input, idx) {
    input.addEventListener('input', function () {
      if (input.value.length === 1 && idx < inputs.length - 1) {
        inputs[idx + 1].focus();
      }
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && input.value === '' && idx > 0) {
        inputs[idx - 1].focus();
      }
    });
  });

  var submitBtn = document.getElementById('submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      Auth.setLoggedIn();
      Router.go('home.html');
    });
  }
});
