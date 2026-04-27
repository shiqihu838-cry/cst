document.addEventListener('DOMContentLoaded', function () {
  Auth.guard();
  populateAssets();

  document.querySelectorAll('.game-card[data-route]').forEach(function (card) {
    card.addEventListener('click', function () {
      Router.go(card.getAttribute('data-route'));
    });
  });
});
