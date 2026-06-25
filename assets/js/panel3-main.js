(function () {
  'use strict';

  var N3_BASE = 'https://raw.githubusercontent.com/tuned-org-uk/pyarrowspace/1ca2c9b94228e11136b9ed282e4c30b206b683b9/neurips/CVE/output/v2/';

  var N3_CSVS = [
    { file: 'cve_summary.csv',                label: 'Summary metrics',          type: 'bar'  },
    { file: 'cve_comparison_metrics.csv',     label: 'Comparison metrics',       type: 'bar'  },
    { file: 'cve_semantic_recall_metrics.csv',label: 'Semantic recall',          type: 'line' },
    { file: 'cve_tail_metrics.csv',           label: 'Tail metrics',             type: 'bar'  },
    { file: 'cve_headk_sweep.csv',            label: 'Head-k sweep',             type: 'line' },
  ];

  var n3Loaded = false;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function parseCSV(text) {
    var lines = text.trim().split('\n');
    var headers = lines[0].split(',').map(function (h) { return h.trim(); });
    var rows = lines.slice(1).map(function (line) {
      var vals = line.split(',');
      var obj = {};
      headers.forEach(function (h, i) {
        obj[h] = isNaN(vals[i].trim()) ? vals[i].trim() : parseFloat(vals[i].trim());
      });
      return obj;
    });
    return { headers: headers, rows: rows };
  }

  function n3ErrorCard(msg) {
    var div = document.createElement('div');
    div.className = 'n3-error-card';
    div.textContent = '\u26A0 ' + msg;
    return div;
  }

  window.loadPanel3 = async function () {
    if (n3Loaded) return;
    n3Loaded = true;

    var chartsGrid = document.getElementById('n3-charts-grid');
    if (!chartsGrid) return;

    try {
      var metaRes = await fetch(N3_BASE + 'cve_run_metadata.json');
      var meta = await metaRes.json();
      var tbody = document.querySelector('#n3-runinfo-table tbody');
      if (tbody) {
        tbody.innerHTML = Object.entries(meta)
          .map(function (e) { return '<tr><td>' + e[0] + '</td><td>' + e[1] + '</td></tr>'; })
          .join('');
      }
    } catch (e) {
      var t = document.querySelector('#n3-runinfo-table tbody');
      if (t) {
        t.innerHTML = '<tr><td colspan="2" style="color:var(--color-text-muted)">Metadata unavailable</td></tr>';
      }
    }

    var Chart;
    try {
      var mod = await import('https://cdn.jsdelivr.net/npm/chart.js@4.4.3/+esm');
      Chart = mod.Chart;
      var regs = [
        mod.CategoryScale, mod.LinearScale, mod.PointElement, mod.LineElement,
        mod.BarElement, mod.ScatterController, mod.LineController, mod.BarController,
        mod.Tooltip, mod.Legend, mod.Filler
      ];
      Chart.register.apply(Chart, regs);
    } catch (e) {
      if (chartsGrid) {
        chartsGrid.innerHTML = '';
        chartsGrid.appendChild(n3ErrorCard('Chart.js failed to load: ' + e.message));
      }
      return;
    }

    chartsGrid.innerHTML = '';
    var PALETTE = [
      'var(--color-primary, #01696f)',
      'var(--color-blue, #5591c7)',
      'var(--color-gold, #d19900)',
      'var(--color-orange, #da7101)',
      'var(--color-purple, #7a39bb)',
    ];

    for (var i = 0; i < N3_CSVS.length; i++) {
      var item = N3_CSVS[i];
      var card = document.createElement('div');
      card.className = 'n3-chart-card';

      var title = document.createElement('div');
      title.className = 'n3-chart-title';
      title.textContent = item.label;
      card.appendChild(title);

      var wrap = document.createElement('div');
      wrap.className = 'n3-chart-wrap';
      var canvas = document.createElement('canvas');
      wrap.appendChild(canvas);
      card.appendChild(wrap);
      chartsGrid.appendChild(card);

      try {
        var res = await fetch(N3_BASE + item.file);
        var text = await res.text();
        var parsed = parseCSV(text);
        var xKey = parsed.headers[0];
        var yKeys = parsed.headers.slice(1);

        var labels = parsed.rows.map(function (r) { return r[xKey]; });
        var datasets = yKeys.map(function (key, j) {
          return {
            label: key,
            data: item.type === 'scatter'
              ? parsed.rows.map(function (r) { return { x: r[xKey], y: r[key] }; })
              : parsed.rows.map(function (r) { return r[key]; }),
            borderColor: PALETTE[j % PALETTE.length],
            backgroundColor: PALETTE[j % PALETTE.length] + '33',
            tension: 0.35,
            pointRadius: item.type === 'scatter' ? 4 : 3,
            borderWidth: 2,
            fill: item.type === 'line' && j === 0,
          };
        });

        new Chart(canvas, {
          type: item.type,
          data: item.type === 'scatter' ? { datasets: datasets } : { labels: labels, datasets: datasets },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: reducedMotion ? false : { duration: 500 },
            plugins: {
              legend: { labels: { font: { size: 11 }, boxWidth: 12 } },
              tooltip: { mode: 'index', intersect: false },
            },
            scales: {
              x: { ticks: { font: { size: 11 }, maxRotation: 45 } },
              y: { ticks: { font: { size: 11 } }, beginAtZero: false },
            },
          },
        });
      } catch (e) {
        wrap.replaceWith(n3ErrorCard('Failed to load ' + item.file + ': ' + e.message));
      }
    }
  };

  var n3RunInfoBtn = document.getElementById('n3-runinfo-btn');
  var n3RunInfoOverlay = document.getElementById('n3-runinfo-overlay');
  var n3RunInfoClose = document.getElementById('n3-runinfo-close');

  if (n3RunInfoBtn && n3RunInfoOverlay) {
    n3RunInfoBtn.addEventListener('click', function () {
      n3RunInfoOverlay.classList.add('open');
      n3RunInfoBtn.setAttribute('aria-expanded', 'true');
      if (n3RunInfoClose) n3RunInfoClose.focus();
    });
    if (n3RunInfoClose) {
      n3RunInfoClose.addEventListener('click', function () {
        n3RunInfoOverlay.classList.remove('open');
        n3RunInfoBtn.setAttribute('aria-expanded', 'false');
        n3RunInfoBtn.focus();
      });
    }
    n3RunInfoOverlay.addEventListener('click', function (e) {
      if (e.target === n3RunInfoOverlay) {
        n3RunInfoOverlay.classList.remove('open');
        n3RunInfoBtn.setAttribute('aria-expanded', 'false');
        n3RunInfoBtn.focus();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && n3RunInfoOverlay.classList.contains('open')) {
        n3RunInfoOverlay.classList.remove('open');
        n3RunInfoBtn.setAttribute('aria-expanded', 'false');
        n3RunInfoBtn.focus();
      }
    });
  }

  var n3Lightbox = document.getElementById('n3-lightbox');
  if (n3Lightbox) {
    var n3LbClose = n3Lightbox.querySelector('.fig-lightbox-close');
    var n3LbImg = document.getElementById('n3-lightbox-img');

    n3LbClose.addEventListener('click', function () {
      n3Lightbox.classList.remove('open');
      document.body.style.overflow = '';
    });
    n3Lightbox.addEventListener('click', function (e) {
      if (e.target === n3Lightbox) {
        n3Lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
    n3LbImg.addEventListener('click', function (e) { e.stopPropagation(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && n3Lightbox.classList.contains('open')) {
        n3Lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
})();
