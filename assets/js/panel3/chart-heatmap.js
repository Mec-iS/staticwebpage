/**
 * chart-heatmap.js  —  plot_win_loss_heatmap() port
 * D3 heatmap: rows=metrics, cols=queries
 * Cell colour = winner method colour; letter annotation C/H/T
 */
const HM_BASE = 'https://raw.githubusercontent.com/tuned-org-uk/pyarrowspace/main/neurips/CVE/output/v2/';
const HM_COLORS = { Cosine: '#1f77b4', Hybrid: '#ff7f0e', Taumode: '#2ca02c' };
const METRIC_NAMES = ['T/H Ratio', 'Tail CV', 'Tail Decay', 'Semantic Recall', 'Tolerant Recall'];
const HIGHER_BETTER = new Set(['T/H Ratio', 'Semantic Recall', 'Tolerant Recall']);

async function fetchCSVHM(url) {
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

function normHM(raw) {
  if (!raw) return null;
  const r = raw.toLowerCase();
  if (r.includes('cosine')) return 'Cosine';
  if (r.includes('hybrid')) return 'Hybrid';
  if (r.includes('tau')) return 'Taumode';
  return raw;
}

function buildHeatmap() {
  Promise.all([
    fetchCSVHM(HM_BASE + 'cve_tail_metrics.csv'),
    fetchCSVHM(HM_BASE + 'cve_semantic_recall_metrics.csv'),
  ]).then(([tailRows, recallRows]) => {
    const tailByQM = {};
    tailRows.forEach(r=>{ const m=normHM(r.tau_method); const q=r.query_id; if(!m||!q)return; if(!tailByQM[q])tailByQM[q]={}; tailByQM[q][m]=r; });
    const recallByQM = {};
    recallRows.forEach(r=>{ const m=normHM(r.tau_method); const q=r.query_id; if(!m||!q)return; if(!recallByQM[q])recallByQM[q]={}; recallByQM[q][m]=r; });

    const qids = Object.keys(tailByQM).sort((a,b)=>+a-+b);

    const winMatrix = METRIC_NAMES.map(metric => qids.map(qid => {
      const tm=tailByQM[qid]||{}; const rm=recallByQM[qid]||{};
      const metricValues = {
        'T/H Ratio': { Cosine:+(tm.Cosine?.tail_to_head_ratio??-Infinity), Hybrid:+(tm.Hybrid?.tail_to_head_ratio??-Infinity), Taumode:+(tm.Taumode?.tail_to_head_ratio??-Infinity) },
        'Tail CV':   { Cosine:+(tm.Cosine?.tail_cv??Infinity), Hybrid:+(tm.Hybrid?.tail_cv??Infinity), Taumode:+(tm.Taumode?.tail_cv??Infinity) },
        'Tail Decay':{ Cosine:+(tm.Cosine?.tail_decay_rate??Infinity), Hybrid:+(tm.Hybrid?.tail_decay_rate??Infinity), Taumode:+(tm.Taumode?.tail_decay_rate??Infinity) },
        'Semantic Recall':{ Cosine:rm.Cosine?.semantic_recall==='nan'?-Infinity:+(rm.Cosine?.semantic_recall??-Infinity), Hybrid:rm.Hybrid?.semantic_recall==='nan'?-Infinity:+(rm.Hybrid?.semantic_recall??-Infinity), Taumode:rm.Taumode?.semantic_recall==='nan'?-Infinity:+(rm.Taumode?.semantic_recall??-Infinity) },
        'Tolerant Recall':{ Cosine:+(rm.Cosine?.tolerant_recall??-Infinity), Hybrid:+(rm.Hybrid?.tolerant_recall??-Infinity), Taumode:+(rm.Taumode?.tolerant_recall??-Infinity) },
      };
      const mv = metricValues[metric];
      const winner = HIGHER_BETTER.has(metric)
        ? Object.entries(mv).reduce((b,[k,v])=>v>b[1]?[k,v]:b,['',- Infinity])[0]
        : Object.entries(mv).reduce((b,[k,v])=>v<b[1]?[k,v]:b,['',Infinity])[0];
      return { winner, annotation: winner ? winner[0] : '?' };
    }));

    const container = document.getElementById('heatmap-container');
    if (!container) return;
    container.innerHTML = '';

    const CELL_H = 44, CELL_W = Math.max(18, Math.min(40, 900 / qids.length));
    const W = CELL_W * qids.length;
    const H = CELL_H * METRIC_NAMES.length;
    const MARGIN = { top:44, right:20, bottom:50, left:120 };

    const svg = d3.select(container).append('svg')
      .attr('width', '100%')
      .attr('viewBox', `0 0 ${W+MARGIN.left+MARGIN.right} ${H+MARGIN.top+MARGIN.bottom}`)
      .style('overflow','visible');

    const g = svg.append('g').attr('transform',`translate(${MARGIN.left},${MARGIN.top})`);

    const xScale = d3.scaleBand().domain(qids).range([0,W]).padding(0.05);
    const yScale = d3.scaleBand().domain(METRIC_NAMES).range([0,H]).padding(0.08);

    g.append('g').attr('transform',`translate(0,${H})`).call(d3.axisBottom(xScale).tickFormat(d=>`Q${d}`))
      .selectAll('text').attr('transform','rotate(-45)').style('text-anchor','end').style('font-size','10px');
    g.append('g').call(d3.axisLeft(yScale)).selectAll('text').style('font-size','12px');

    METRIC_NAMES.forEach((metric,mi) => {
      qids.forEach((qid,qi) => {
        const cell = winMatrix[mi][qi];
        const x=xScale(qid), y=yScale(metric), cw=xScale.bandwidth(), ch=yScale.bandwidth();
        g.append('rect').attr('x',x).attr('y',y).attr('width',cw).attr('height',ch)
          .attr('fill',HM_COLORS[cell.winner]||'#ccc').attr('rx',2);
        g.append('text').attr('x',x+cw/2).attr('y',y+ch/2+1)
          .attr('text-anchor','middle').attr('dominant-baseline','middle')
          .attr('fill','white').attr('font-weight','bold')
          .attr('font-size',Math.min(cw*0.55,13)+'px').text(cell.annotation);
      });
    });

    svg.append('text').attr('x',(W+MARGIN.left+MARGIN.right)/2).attr('y',18)
      .attr('text-anchor','middle').style('font-size','13px').style('font-weight','bold')
      .text('Per-query metric winners (C=Cosine, H=Hybrid, T=Taumode)');

    const leg = svg.append('g').attr('transform',`translate(${MARGIN.left},${H+MARGIN.top+32})`);
    Object.entries(HM_COLORS).forEach(([name,color],i)=>{
      leg.append('rect').attr('x',i*130).attr('y',0).attr('width',16).attr('height',16).attr('fill',color);
      leg.append('text').attr('x',i*130+22).attr('y',12).style('font-size','12px').text(name);
    });

  }).catch(e=>console.error('heatmap fetch error',e));
}

document.addEventListener('DOMContentLoaded', buildHeatmap);
