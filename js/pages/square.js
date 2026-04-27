document.addEventListener('DOMContentLoaded', function () {
  populateAssets();

  // Tab switching between discover / follow / nearby
  var tabs = document.querySelectorAll('.square-tab[data-tab]');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.dataset.tab;
      Router.go(target + '.html');
    });
  });
});
