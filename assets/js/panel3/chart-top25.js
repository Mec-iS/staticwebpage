/**
 * chart-top25.js  —  plot_comparison() port
 * Grouped bar chart: ranks 1-25 per method, per query.
 * One Chart.js instance per query (3 bars per rank: Cosine/Hybrid/Taumode).
 * Requires: Chart.js 4, chartjs-plugin-annotation 3
 */
const TOP25_BASE = 'https://raw.githubusercontent.com/tuned-org-uk/pyarrowspace/main/neurips/CVE/output/v2/';
const COLORS = { Cosine: '#1f77b4', Hybrid: '#ff7f0e', Taumode: '#2ca02c' };
const METHODS = ['Cosine', 'Hybrid', 'Taumode'];

async function fetchCSV(url) {
  const r = await fetch(url);
  const txt = await r.text();
  const lines = txt.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(l => {
    const vals = l.split(',');
    const obj = {};
    headers.forEach((h, i) => obj[h.trim()] = vals[i]?.trim());
    return obj;
  });
}

function normalizeMethod(raw) {
  if (!raw) return null;
  const r = raw.toLowerCase();
  if (r === 'cosine') return 'Cosine';
  if (r.includes('hybrid')) return 'Hybrid';
  if (r.includes('tau')) return 'Taumode';
  return raw;
}

function buildTop25Charts() {
  fetchCSV(TOP25_BASE + 'cve_search_results.csv').then(rows => {
    const byQuery = {};
    rows.forEach(r => {
      const qid = r.query_id;
      const method = normalizeMethod(r.tau_method);
      if (!qid || !method) return;
      if (!byQuery[qid]) byQuery[qid] = { query: r.query_text, methods: {} };
      if (!byQuery[qid].methods[method]) byQuery[qid].methods[method] = [];
      byQuery[qid].methods[method].push({ rank: +r.rank, score: +r.score, cve_id: r.cve_id });
    });

    const container = document.getElementById('top25-container');
    if (!container) return;
    container.innerHTML = '';

    Object.keys(byQuery).sort((a,b)=>+a-+b).forEach(qid => {
      const qdata = byQuery[qid];
      const section = document.createElement('div');
      section.className = 'chart-section';
      section.innerHTML = `<h3>Q${qid}: ${(qdata.query||'').slice(0,80)}</h3>`;
      const canvas = document.createElement('canvas');
      canvas.height = 280;
      section.appendChild(canvas);
      container.appendChild(section);

      const ranks = Array.from({length: 25}, (_, i) => i + 1);
      const datasets = METHODS.map(m => {
        const methodRows = (qdata.methods[m] || []).sort((a,b)=>a.rank-b.rank);
        return {
          label: m,
          data: ranks.map(r => { const found = methodRows.find(x => x.rank === r); return found ? found.score : null; }),
          backgroundColor: COLORS[m] + 'bf',
          borderColor: COLORS[m],
          borderWidth: 1,
        };
      });

      const cosineRows = (qdata.methods['Cosine'] || []).sort((a,b)=>a.rank-b.rank);
      const rankLabels = ranks.map(r => {
        const found = cosineRows.find(x => x.rank === r);
        return found ? found.cve_id.split('-')[1] || r : r;
      });

      new Chart(canvas, {
        type: 'bar',
        data: { labels: rankLabels, datasets },
        options: {
          responsive: true,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { position: 'top' },
            tooltip: { mode: 'index' },
            zoom: { zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' }, pan: { enabled: true, mode: 'x' } }
          },
          scales: {
            x: { title: { display: true, text: 'Rank (CVE Year)' }, ticks: { maxRotation: 45, font: { size: 10 } } },
            y: { title: { display: true, text: 'Score' }, beginAtZero: false }
          }
        }
      });
    });
  }).catch(e => console.error('top25 fetch error', e));
}

document.addEventListener('DOMContentLoaded', buildTop25Charts);
