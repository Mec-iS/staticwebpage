(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var filterBtns = document.querySelectorAll('.tl-filter-btn');
  var timelineItems = document.querySelectorAll('.timeline-item[data-type]');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.dataset.filter;
      filterBtns.forEach(function (b) { b.classList.toggle('active', b === btn); });
      timelineItems.forEach(function (item) {
        var match = filter === 'all' || item.dataset.type === filter;
        item.classList.toggle('tl-hidden', !match);
        if (match && !item.classList.contains('is-visible')) {
          if (reducedMotion) {
            item.classList.add('is-visible');
          } else {
            var obs = new IntersectionObserver(
              function (entries, ob) {
                entries.forEach(function (entry) {
                  if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    ob.unobserve(entry.target);
                  }
                });
              },
              { root: null, rootMargin: '0px', threshold: 0.12 }
            );
            obs.observe(item);
          }
        }
      });
    });
  });

  document.querySelectorAll('.tl-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var drawer = btn.nextElementSibling;
      var isOpen = drawer.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
      btn.textContent = isOpen ? 'Hide details ↑' : 'Show details ↓';
    });
  });
})();
