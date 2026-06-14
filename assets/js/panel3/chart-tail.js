/**
 * chart-tail.js  —  plot_tail_comparison() port
 * 4 sub-charts per query:
 *   1. Score distribution (all 3 methods) + red dashed vertical at HEAD_K=3
 *   2. Tail score line (ranks HEAD_K+1 to 25)
 *   3. Tail variability (mean ± std bar)
 *   4. Tail metrics grouped bar (Tail Mean, T/H Ratio, Stability)
 */
const TAIL_BASE = 'https://raw.githubusercontent.com/tuned-org-uk/pyarrowspace/main/neurips/CVE/output/v2/';
const HEAD_K = 3;
const TAIL_COLORS = { Cosine: '#1f77b4', Hybrid: '#ff7f0e', Taumode: '#2ca02c' };
const TAIL_METHODS = ['Cosine', 'Hybrid', 'Taumode'];

function normalizeMethodTail(raw) {
  if (!raw) return null;
  const r = raw.toLowerCase();
  if (r.includes('cosine')) return 'Cosine';
  if (r.includes('hybrid')) return 'Hybrid';
  if (r.includes('tau')) return 'Taumode';
  return raw;
}

async function fetchCSVTail(url) {
  const resp = await fetch(url);
  const txt = await resp.text();
  const lines = txt.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(l => {
    const vals = l.split(',');
    const obj = {};
    headers.forEach((h, i) => obj[h.trim()] = vals[i]?.trim());
    return obj;
  });
}

function makeTailCharts() {
  Promise.all([
    fetchCSVTail(TAIL_BASE + 'cve_search_results.csv'),
    fetchCSVTail(TAIL_BASE + 'cve_tail_metrics.csv')
  ]).then(([searchRows, tailRows]) => {
    const byQuery = {};
    searchRows.forEach(r => {
      const qid = r.query_id;
      const m = normalizeMethodTail(r.tau_method);
      if (!qid || !m) return;
      if (!byQuery[qid]) byQuery[qid] = { query: r.query_text, methods: {} };
      if (!byQuery[qid].methods[m]) byQuery[qid].methods[m] = [];
      byQuery[qid].methods[m].push({ rank: +r.rank, score: +r.score });
    });
    const tailByQuery = {};
    tailRows.forEach(r => {
      const qid = r.query_id;
      const m = normalizeMethodTail(r.tau_method);
      if (!qid || !m) return;
      if (!tailByQuery[qid]) tailByQuery[qid] = {};
      tailByQuery[qid][m] = r;
    });

    const container = document.getElementById('tail-container');
    if (!container) return;
    container.innerHTML = '';

    Object.keys(byQuery).sort((a,b)=>+a-+b).forEach(qid => {
      const qdata = byQuery[qid];
      const tmdata = tailByQuery[qid] || {};

      const section = document.createElement('div');
      section.className = 'chart-section';
      section.innerHTML = `<h3>Q${qid} Tail Analysis: ${(qdata.query||'').slice(0,70)}</h3><div class="tail-grid"><canvas id="tail-dist-${qid}"></canvas><canvas id="tail-line-${qid}"></canvas><canvas id="tail-box-${qid}"></canvas><canvas id="tail-bar-${qid}"></canvas></div>`;
      container.appendChild(section);

      const maxRank = Math.max(...TAIL_METHODS.flatMap(m => (qdata.methods[m]||[]).map(x=>x.rank)));
      const allRanks = Array.from({length: maxRank}, (_, i) => i + 1);

      // Sub-chart 1: Score distribution + HEAD_K vertical
      new Chart(document.getElementById(`tail-dist-${qid}`), {
        type: 'line',
        data: {
          labels: allRanks,
          datasets: TAIL_METHODS.map(m => ({
            label: m,
            data: allRanks.map(r => { const f = (qdata.methods[m]||[]).find(x=>x.rank===r); return f ? f.score : null; }),
            borderColor: TAIL_COLORS[m], backgroundColor: 'transparent',
            pointRadius: 3, tension: 0.1, spanGaps: true,
          }))
        },
        options: {
          plugins: {
            title: { display: true, text: 'Score Distribution' },
            annotation: { annotations: { headLine: {
              type: 'line', xMin: HEAD_K + 0.5, xMax: HEAD_K + 0.5,
              borderColor: 'rgba(220,50,50,0.8)', borderWidth: 2, borderDash: [6,4],
              label: { content: 'HEAD_K=3', display: true, position: 'start', color: 'red', font: { size: 10 } }
            }}}
          },
          scales: { x: { title: { display: true, text: 'Rank' } }, y: { title: { display: true, text: 'Score' } } }
        }
      });

      // Sub-chart 2: Tail score line (rank > HEAD_K)
      const tailRanks = allRanks.filter(r => r > HEAD_K);
      new Chart(document.getElementById(`tail-line-${qid}`), {
        type: 'line',
        data: {
          labels: tailRanks,
          datasets: TAIL_METHODS.map(m => ({
            label: m,
            data: tailRanks.map(r => { const f = (qdata.methods[m]||[]).find(x=>x.rank===r); return f ? f.score : null; }),
            borderColor: TAIL_COLORS[m], backgroundColor: 'transparent',
            pointRadius: 4, pointStyle: 'rectRot', tension: 0.1, spanGaps: true,
          }))
        },
        options: {
          plugins: { title: { display: true, text: `Tail Scores (ranks ${HEAD_K+1}+)` } },
          scales: { x: { title: { display: true, text: 'Rank' } }, y: { title: { display: true, text: 'Score' } } }
        }
      });

      // Sub-chart 3: Tail variability (mean ± std)
      new Chart(document.getElementById(`tail-box-${qid}`), {
        type: 'bar',
        data: {
          labels: TAIL_METHODS,
          datasets: [{ label: 'Tail Mean', data: TAIL_METHODS.map(m => tmdata[m] ? +tmdata[m].tail_mean : null), backgroundColor: TAIL_METHODS.map(m => TAIL_COLORS[m] + '99'), borderColor: TAIL_METHODS.map(m => TAIL_COLORS[m]), borderWidth: 2 }]
        },
        options: {
          plugins: { title: { display: true, text: 'Tail Variability (Mean)' } },
          scales: { y: { title: { display: true, text: 'Score' } } }
        }
      });

      // Sub-chart 4: Tail metrics grouped bar
      const metricNames = ['Tail Mean', 'T/H Ratio', 'Stability'];
      new Chart(document.getElementById(`tail-bar-${qid}`), {
        type: 'bar',
        data: {
          labels: metricNames,
          datasets: TAIL_METHODS.map(m => {
            const tm = tmdata[m];
            const tailCV = tm ? +tm.tail_cv : 0;
            return {
              label: m,
              data: tm ? [+tm.tail_mean, +tm.tail_to_head_ratio, tailCV > 0 ? 1/(1+tailCV) : 1.0] : [null,null,null],
              backgroundColor: TAIL_COLORS[m] + 'bf', borderColor: TAIL_COLORS[m], borderWidth: 1,
            };
          })
        },
        options: {
          plugins: { title: { display: true, text: 'Tail Metrics' } },
          scales: { y: { title: { display: true, text: 'Value' } } }
        }
      });
    });
  }).catch(e => console.error('tail fetch error', e));
}

document.addEventListener('DOMContentLoaded', makeTailCharts);
