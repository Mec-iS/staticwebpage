/**
 * chart-deltas.js  —  plot_metric_deltas() port
 * 3 bar charts showing Hybrid and Taumode delta vs Cosine baseline:
 *   1. Δ Tail/Head Ratio vs Cosine
 *   2. Δ Semantic Recall vs Cosine
 *   3. Δ Tolerant Recall vs Cosine
 */
const DELTAS_BASE = 'https://raw.githubusercontent.com/tuned-org-uk/pyarrowspace/main/neurips/CVE/output/v2/';
const DELTA_COLORS = { Hybrid: '#ff7f0e', Taumode: '#2ca02c' };

async function fetchCSVDeltas(url) {
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

function normD(raw) {
  if (!raw) return null;
  const r = raw.toLowerCase();
  if (r.includes('cosine')) return 'Cosine';
  if (r.includes('hybrid')) return 'Hybrid';
  if (r.includes('tau')) return 'Taumode';
  return raw;
}

function buildDeltaCharts() {
  Promise.all([
    fetchCSVDeltas(DELTAS_BASE + 'cve_tail_metrics.csv'),
    fetchCSVDeltas(DELTAS_BASE + 'cve_semantic_recall_metrics.csv'),
  ]).then(([tailRows, recallRows]) => {
    const tailByQM = {};
    tailRows.forEach(r=>{ const m=normD(r.tau_method); const q=r.query_id; if(!m||!q)return; if(!tailByQM[q])tailByQM[q]={}; tailByQM[q][m]=r; });
    const recallByQM = {};
    recallRows.forEach(r=>{ const m=normD(r.tau_method); const q=r.query_id; if(!m||!q)return; if(!recallByQM[q])recallByQM[q]={}; recallByQM[q][m]=r; });

    const qids = Object.keys(tailByQM).sort((a,b)=>+a-+b);
    const queryLabels = qids.map(q=>`Q${q}`);
    const hTH=[],tTH=[],hSem=[],tSem=[],hTol=[],tTol=[];

    qids.forEach(qid=>{
      const tm=tailByQM[qid]||{}; const rm=recallByQM[qid]||{};
      const cosTH=+(tm.Cosine?.tail_to_head_ratio??0);
      hTH.push((+(tm.Hybrid?.tail_to_head_ratio??0))-cosTH);
      tTH.push((+(tm.Taumode?.tail_to_head_ratio??0))-cosTH);
      const cosSem=rm.Cosine?.semantic_recall==='nan'?0:+(rm.Cosine?.semantic_recall??0);
      hSem.push((rm.Hybrid?.semantic_recall==='nan'?0:+(rm.Hybrid?.semantic_recall??0))-cosSem);
      tSem.push((rm.Taumode?.semantic_recall==='nan'?0:+(rm.Taumode?.semantic_recall??0))-cosSem);
      const cosTol=+(rm.Cosine?.tolerant_recall??0);
      hTol.push((+(rm.Hybrid?.tolerant_recall??0))-cosTol);
      tTol.push((+(rm.Taumode?.tolerant_recall??0))-cosTol);
    });

    const container=document.getElementById('deltas-container');
    if(!container)return;
    container.innerHTML='';

    [['Δ Tail/Head Ratio vs Cosine',hTH,tTH],['Δ Semantic Recall vs Cosine',hSem,tSem],['Δ Tolerant Recall vs Cosine',hTol,tTol]]
    .forEach(([title,hyb,tau])=>{
      const canvas=document.createElement('canvas');
      canvas.style.marginBottom='2rem';
      container.appendChild(canvas);
      new Chart(canvas,{
        type:'bar',
        data:{ labels:queryLabels, datasets:[
          {label:'Hybrid − Cosine',data:hyb,backgroundColor:DELTA_COLORS.Hybrid+'cc',borderColor:DELTA_COLORS.Hybrid,borderWidth:1},
          {label:'Taumode − Cosine',data:tau,backgroundColor:DELTA_COLORS.Taumode+'cc',borderColor:DELTA_COLORS.Taumode,borderWidth:1},
        ]},
        options:{
          responsive:true, interaction:{mode:'index',intersect:false},
          plugins:{ title:{display:true,text:title,font:{size:14,weight:'bold'}},
            annotation:{annotations:{zeroLine:{type:'line',yMin:0,yMax:0,borderColor:'#333',borderWidth:1}}},
            zoom:{zoom:{wheel:{enabled:true},mode:'x'},pan:{enabled:true,mode:'x'}}
          },
          scales:{ x:{title:{display:true,text:'Query'},ticks:{maxRotation:45}}, y:{title:{display:true,text:'Delta'}} }
        }
      });
    });
  }).catch(e=>console.error('deltas fetch error',e));
}

document.addEventListener('DOMContentLoaded', buildDeltaCharts);
