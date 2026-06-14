/**
 * chart-headk.js  —  plot_headk_sweep() port
 * 3 line charts with ±1 std shaded band:
 *   1. Mean Tail/Head Ratio vs HEAD_K
 *   2. Mean Tail CV vs HEAD_K
 *   3. Mean Tail Decay vs HEAD_K
 * Fetches: cve_headk_sweep.csv
 */
const HEADK_BASE = 'https://raw.githubusercontent.com/tuned-org-uk/pyarrowspace/main/neurips/CVE/output/v2/';
const HEADK_COLORS = { Cosine: '#1f77b4', Hybrid: '#ff7f0e', Taumode: '#2ca02c' };

async function fetchCSVHeadK(url) {
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

function normHK(raw) {
  if (!raw) return null;
  const r = raw.toLowerCase();
  if (r.includes('cosine')) return 'Cosine';
  if (r.includes('hybrid')) return 'Hybrid';
  if (r.includes('tau')) return 'Taumode';
  return raw;
}

const arrMean = a => a.length ? a.reduce((s,v)=>s+v,0)/a.length : NaN;
const arrStd  = a => { if(a.length<2)return 0; const m=arrMean(a); return Math.sqrt(a.reduce((s,v)=>s+(v-m)**2,0)/a.length); };

function buildHeadKCharts() {
  fetchCSVHeadK(HEADK_BASE + 'cve_headk_sweep.csv').then(rows => {
    const grouped = {};
    rows.forEach(r => {
      const h = +r.head_k;
      const m = normHK(r.tau_method);
      if (!m) return;
      if (!grouped[h]) grouped[h] = {};
      if (!grouped[h][m]) grouped[h][m] = { tail_to_head_ratio:[], tail_cv:[], tail_decay_rate:[] };
      grouped[h][m].tail_to_head_ratio.push(+r.tail_to_head_ratio);
      grouped[h][m].tail_cv.push(+r.tail_cv);
      grouped[h][m].tail_decay_rate.push(+r.tail_decay_rate);
    });

    const headKs = Object.keys(grouped).map(Number).sort((a,b)=>a-b);
    const methods = ['Cosine','Hybrid','Taumode'];
    const container = document.getElementById('headk-container');
    if (!container) return;
    container.innerHTML = '';

    [
      { key:'tail_to_head_ratio', title:'Mean Tail/Head Ratio vs HEAD_K', sub:'higher is better' },
      { key:'tail_cv',            title:'Mean Tail CV vs HEAD_K',          sub:'lower is better' },
      { key:'tail_decay_rate',    title:'Mean Tail Decay vs HEAD_K',       sub:'lower is better' },
    ].forEach(({key,title,sub}) => {
      const canvas = document.createElement('canvas');
      canvas.style.marginBottom = '2.5rem';
      container.appendChild(canvas);

      const datasets = [];
      methods.forEach(m => {
        const means = headKs.map(h => arrMean(grouped[h]?.[m]?.[key]||[]));
        const stds  = headKs.map(h => arrStd(grouped[h]?.[m]?.[key]||[]));
        datasets.push({
          label: m,
          data: means,
          borderColor: HEADK_COLORS[m],
          backgroundColor: 'transparent',
          pointRadius: 5, tension: 0.2, order: 1,
        });
        // Upper bound (fill to next = lower bound)
        datasets.push({
          label: `${m} +std`,
          data: means.map((v,i)=>v+stds[i]),
          borderColor: 'transparent',
          backgroundColor: HEADK_COLORS[m]+'2a',
          pointRadius: 0, tension: 0.2, fill: '+1', order: 2,
        });
        // Lower bound
        datasets.push({
          label: `${m} -std`,
          data: means.map((v,i)=>v-stds[i]),
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          pointRadius: 0, tension: 0.2, fill: false, order: 3,
        });
      });

      new Chart(canvas, {
        type: 'line',
        data: { labels: headKs, datasets },
        options: {
          responsive: true,
          interaction: { mode:'index', intersect:false },
          plugins: {
            title: { display:true, text:`${title} (${sub})`, font:{size:13,weight:'bold'} },
            legend: { labels:{ filter: item => !item.text.endsWith('+std') && !item.text.endsWith('-std') } }
          },
          scales: {
            x: { title:{display:true,text:'HEAD_K'}, ticks:{stepSize:1} },
            y: { title:{display:true,text:'Metric value'} }
          }
        }
      });
    });
  }).catch(e => console.error('headk fetch error', e));
}

document.addEventListener('DOMContentLoaded', buildHeadKCharts);
