/**
 * chart-recall.js  —  plot_semantic_recall_comparison() port
 * 3×3 grid per method (Cosine / Hybrid / Taumode):
 *   Col 0: Grouped bars Traditional / Semantic / Tolerant per query
 *   Col 1: Scatter Traditional vs Semantic Recall, coloured by #SemanticNeighbors, + y=x diagonal
 *   Col 2: Histogram Tolerant − Traditional uplift + red line at 0, orange line at mean
 */
const RECALL_BASE = 'https://raw.githubusercontent.com/tuned-org-uk/pyarrowspace/main/neurips/CVE/output/v2/';
const RECALL_METHOD_COLORS = { traditional: '#4c72b0', semantic: '#55a868', tolerant: '#dd8452' };

async function fetchCSVRecall(url) {
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

function buildRecallCharts() {
  fetchCSVRecall(RECALL_BASE + 'cve_semantic_recall_metrics.csv').then(rows => {
    const byMethod = {};
    rows.forEach(r => {
      let m = r.tau_method;
      if (!m) return;
      if (m.toLowerCase().includes('hybrid')) m = 'Hybrid';
      else if (m.toLowerCase().includes('tau')) m = 'Taumode';
      else if (m.toLowerCase().includes('cosine')) m = 'Cosine';
      if (!byMethod[m]) byMethod[m] = [];
      byMethod[m].push({
        qid: +r.query_id, query: r.query_text,
        trad: +r.traditional_recall,
        sem: r.semantic_recall === 'nan' ? null : +r.semantic_recall,
        tol: +r.tolerant_recall,
        n_sn: +r.n_semantic_neighbors,
        uplift: r.tolerant_minus_traditional === 'nan' ? null : +r.tolerant_minus_traditional,
      });
    });

    const container = document.getElementById('recall-container');
    if (!container) return;
    container.innerHTML = '';

    const METHOD_ORDER = ['Cosine', 'Hybrid', 'Taumode'];
    const TAU_DISPLAY = { Cosine: 'Cosine (τ=1.0)', Hybrid: 'Hybrid (τ=0.72)', Taumode: 'Taumode (τ=0.42)' };

    METHOD_ORDER.forEach(method => {
      const data = (byMethod[method] || []).sort((a,b)=>a.qid-b.qid);
      if (!data.length) return;

      const section = document.createElement('div');
      section.className = 'chart-section';
      section.innerHTML = `<h3>${TAU_DISPLAY[method]||method}</h3><div class="recall-grid"><canvas id="recall-bars-${method}"></canvas><canvas id="recall-scatter-${method}"></canvas><canvas id="recall-hist-${method}"></canvas></div>`;
      container.appendChild(section);

      const queryLabels = data.map(d => `Q${d.qid}`);

      // Col 0: Grouped bars
      new Chart(document.getElementById(`recall-bars-${method}`), {
        type: 'bar',
        data: { labels: queryLabels, datasets: [
          { label: 'Traditional', data: data.map(d=>d.trad), backgroundColor: RECALL_METHOD_COLORS.traditional+'da', borderWidth:0 },
          { label: 'Semantic',    data: data.map(d=>d.sem??0), backgroundColor: RECALL_METHOD_COLORS.semantic+'da', borderWidth:0 },
          { label: 'Tolerant',    data: data.map(d=>d.tol),  backgroundColor: RECALL_METHOD_COLORS.tolerant+'da', borderWidth:0 },
        ]},
        options: {
          plugins: { title: { display:true, text:'Recall per Query' } },
          scales: { x: { title:{display:true,text:'Query'}, ticks:{maxRotation:45} }, y: { title:{display:true,text:'Recall@k'}, min:0, max:1.15 } },
          barPercentage: 0.85, categoryPercentage: 0.9,
        }
      });

      // Col 1: Scatter + y=x diagonal
      const valid = data.filter(d=>d.sem!==null);
      const maxSN = Math.max(...valid.map(d=>d.n_sn),1);
      const pts = valid.map(d=>({ x:d.trad, y:d.sem, label:`Q${d.qid}`, sn:d.n_sn }));
      new Chart(document.getElementById(`recall-scatter-${method}`), {
        type: 'scatter',
        data: { datasets: [
          { label:'#SemanticNeighbors', data: pts,
            backgroundColor: pts.map(p=>{ const t=p.sn/maxSN; return `rgba(${Math.round(68+(253-68)*t)},${Math.round(1+(231-1)*t)},${Math.round(84+(37-84)*t)},0.8)`; }),
            pointRadius:7 },
          { label:'y = x', data:[{x:0,y:0},{x:1,y:1}], type:'line',
            borderColor:'rgba(220,50,50,0.7)', borderDash:[5,5], borderWidth:1.5, pointRadius:0, fill:false }
        ]},
        options: {
          plugins: { title:{display:true,text:'Traditional vs Semantic Recall'},
            tooltip:{callbacks:{label:ctx=>`${ctx.raw.label}: (${ctx.parsed.x.toFixed(3)}, ${ctx.parsed.y.toFixed(3)})`}} },
          scales: { x:{title:{display:true,text:'Traditional Recall'},min:-0.05,max:1.1}, y:{title:{display:true,text:'Semantic Recall'},min:-0.05,max:1.1} }
        }
      });

      // Col 2: Uplift histogram
      const uplifts = data.map(d=>d.uplift).filter(v=>v!==null);
      if (!uplifts.length) return;
      const meanU = uplifts.reduce((a,b)=>a+b,0)/uplifts.length;
      const minU = Math.min(...uplifts), maxU = Math.max(...uplifts);
      const nBins = Math.min(15,uplifts.length);
      const step = (maxU-minU)/nBins||0.01;
      const bins = Array.from({length:nBins},(_,i)=>minU+i*step);
      const counts = bins.map((s,i)=>{ const e=bins[i+1]??maxU+step; return uplifts.filter(v=>v>=s&&v<e).length; });
      const binLabels = bins.map(v=>v.toFixed(3));
      const zeroIdx = binLabels.findIndex(v=>+v>=0)-0.5;
      const meanIdx = binLabels.findIndex(v=>+v>=meanU)-0.5;

      new Chart(document.getElementById(`recall-hist-${method}`), {
        type: 'bar',
        data: { labels: binLabels, datasets: [{ label:'Query Count', data:counts, backgroundColor: RECALL_METHOD_COLORS.tolerant+'cc', borderWidth:0 }]},
        options: {
          plugins: { title:{display:true,text:'Tolerant − Traditional Uplift'},
            annotation:{ annotations:{
              zeroLine:{type:'line',xMin:zeroIdx,xMax:zeroIdx,borderColor:'rgba(220,50,50,0.85)',borderDash:[5,4],borderWidth:2,label:{content:'0',display:true,position:'start',color:'red',font:{size:9}}},
              meanLine:{type:'line',xMin:meanIdx,xMax:meanIdx,borderColor:'rgba(255,165,0,0.9)',borderWidth:2,label:{content:`Mean:${meanU>0?'+':''}${meanU.toFixed(3)}`,display:true,position:'end',color:'orange',font:{size:9}}}
            }}
          },
          scales: { x:{title:{display:true,text:'Tolerant − Traditional Recall'},ticks:{maxRotation:45}}, y:{title:{display:true,text:'Query Count'}} },
          barPercentage:1.0, categoryPercentage:1.0,
        }
      });
    });
  }).catch(e=>console.error('recall fetch error',e));
}

document.addEventListener('DOMContentLoaded', buildRecallCharts);
