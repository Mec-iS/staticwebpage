(function () {
  'use strict';

  var lastTrigger = null;

  var figFilterBtns = document.querySelectorAll('.fig-filter-btn');

  figFilterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.dataset.figFilter;
      figFilterBtns.forEach(function (b) { b.classList.toggle('active', b === btn); });
      document.querySelectorAll('[data-fig-group]').forEach(function (el) {
        el.style.display = (f === 'all' || el.dataset.figGroup === f) ? '' : 'none';
      });
      document.querySelectorAll('.fig-card').forEach(function (card) {
        card.style.display = (f === 'all' || card.dataset.figPost === f) ? '' : 'none';
      });
    });
  });

  var lightbox = document.getElementById('fig-lightbox');
  if (!lightbox) return;

  var lbImg = document.getElementById('fig-lightbox-img');
  var lbCaption = document.getElementById('fig-lightbox-caption');
  var lbClose = lightbox.querySelector('.fig-lightbox-close');

  function openLightbox(card) {
    lastTrigger = card;
    var img = card.querySelector('img');
    var caption = card.querySelector('.fig-card-name');
    var post = card.querySelector('.fig-card-post');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = (post ? 'Post ' + post.textContent + ' \u00B7 ' : '') + (caption ? caption.textContent : '');
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  }

  document.querySelectorAll('.fig-card').forEach(function (card) {
    card.addEventListener('click', function () { openLightbox(card); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(card);
      }
    });
  });

  lbClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });

  lbImg.addEventListener('click', function (e) { e.stopPropagation(); });
})();
