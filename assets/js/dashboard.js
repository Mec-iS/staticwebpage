(function () {
  'use strict';

  var navBtns = document.querySelectorAll('.dash-nav-btn');
  var panels  = document.querySelectorAll('.dash-panel');
  var activeId = '1';
  var panelIO;

  function activatePanel(id, pushHistory) {
    activeId = String(id);
    navBtns.forEach(function (b) {
      var active = b.dataset.panel === activeId;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', String(active));
    });
    panels.forEach(function (p) {
      p.classList.toggle('active', p.id === 'panel-' + activeId);
    });

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var newItems = document.querySelectorAll('#panel-' + activeId + ' .timeline-item:not(.is-visible)');
    newItems.forEach(function (el) {
      if (el.classList.contains('tl-hidden')) return;
      if (reducedMotion) {
        el.classList.add('is-visible');
      } else {
        var scrollObserver = new IntersectionObserver(
          function (entries, obs) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
              }
            });
          },
          { root: null, rootMargin: '0px', threshold: 0.12 }
        );
        scrollObserver.observe(el);
      }
    });

    if (pushHistory) {
      history.replaceState(null, '', '#panel-' + activeId);
    }
  }

  navBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activatePanel(btn.dataset.panel, true);
      if (btn.dataset.panel === '3' && typeof loadPanel3 === 'function') {
        loadPanel3();
      }
    });
  });

  panelIO = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id.replace('panel-', '');
          if (id !== activeId) {
            activeId = id;
            navBtns.forEach(function (b) {
              var active = b.dataset.panel === activeId;
              b.classList.toggle('active', active);
              b.setAttribute('aria-selected', String(active));
            });
          }
        }
      });
    },
    { threshold: 0.35 }
  );
  panels.forEach(function (p) { panelIO.observe(p); });

  var rawHash = location.hash;
  var panelHash = rawHash.match(/^#panel-(\d+)$/);
  if (panelHash) {
    activatePanel(panelHash[1], false);
  } else if (rawHash === '#section-4b') {
    activatePanel('4', false);
    requestAnimationFrame(function () {
      var t = document.getElementById('section-4b');
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  } else {
    activatePanel('1', false);
  }

  if (location.hash === '#panel-3' && typeof loadPanel3 === 'function') {
    var checkLoaded = setInterval(function () {
      if (typeof loadPanel3 === 'function') {
        loadPanel3();
        clearInterval(checkLoaded);
      }
    }, 100);
  }
})();
