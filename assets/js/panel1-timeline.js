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

  // Relative dates: computed from data-date at view time so labels never go stale.
  // data-date is "YYYY-MM-DD" (day precision) or "YYYY-MM" (month precision).
  function relativeLabel(iso, now) {
    var parts = iso.split('-');
    var year = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1;
    var day = parts.length > 2 ? parseInt(parts[2], 10) : null;

    if (day === null) {
      var thenMonth = new Date(year, month, 1);
      var months = (now.getFullYear() - thenMonth.getFullYear()) * 12 +
                   (now.getMonth() - thenMonth.getMonth());
      if (months < 0) return 'upcoming';
      if (months <= 0) return 'this month';
      if (months === 1) return '≈ 1 month ago';
      if (months < 24) return '≈ ' + months + ' months ago';
      var years = Math.round(months / 12);
      return '≈ ' + years + ' year' + (years === 1 ? '' : 's') + ' ago';
    }

    var then = new Date(year, month, day);
    var days = Math.floor((now.getTime() - then.getTime()) / 86400000);
    if (days < 0) return 'upcoming';
    if (days <= 0) return 'today';
    if (days === 1) return '≈ 1 day ago';
    if (days < 14) return '≈ ' + days + ' days ago';
    if (days < 60) return '≈ ' + Math.round(days / 7) + ' weeks ago';
    if (days < 730) return '≈ ' + Math.round(days / 30.44) + ' months ago';
    var yrs = Math.round(days / 365.25);
    return '≈ ' + yrs + ' year' + (yrs === 1 ? '' : 's') + ' ago';
  }

  var now = new Date();
  document.querySelectorAll('.timeline-item__date[data-date]').forEach(function (el) {
    var iso = el.getAttribute('data-date');
    if (!/^\d{4}-\d{2}(-\d{2})?$/.test(iso)) return;
    var span = document.createElement('span');
    span.className = 'tl-rel';
    span.textContent = ' · ' + relativeLabel(iso, now);
    el.appendChild(span);
  });
})();
