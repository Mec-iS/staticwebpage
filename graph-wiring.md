---
title: Graph Wiring
layout: timeline
---

# From ArrowSpace to Graph Wiring

## Fields of application

* Vector database and retrieval
* Training data curation for LLMs
* Online supervision and safety
* Structural and mechanistic analysis of embedding models / LLMs
* Spectral/topological search supervision
* generic algorithm design (search, diffusion, classification, ...)

A short chronology of how **ArrowSpace**, topology-aware evaluation and *epiplexity* experiments converged into the **Graph Wiring** framework.

<div class="timeline timeline--vertical">

  <!-- 2025-09-10 ArrowSpace -->
  <div class="timeline-item">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <div class="timeline-item__date">September 10, 2025</div>
      <h2 class="timeline-item__title">
        ArrowSpace: Spectral Indexing of Embeddings using taumode (λτ)
      </h2>
      <p class="timeline-item__meta">
        <strong>Paper:</strong>
        <a href="https://www.techrxiv.org/users/685780/articles/1329993-arrowspace-spectral-indexing-of-embeddings-using-taumode-%CE%BB%CF%84" target="_blank" rel="noopener">
          TechRxiv preprint
        </a>
        · <strong>Author:</strong> Lorenzo Moriondo
      </p>
      <ul class="timeline-item__bullets">
        <li>Introduces ArrowSpace as a spectral vector search library that blends semantic similarity with graph Laplacian energies via the synthetic λτ (taumode) index.</li>
        <li>Establishes the core idea that a single bounded λτ score can act as a computationally cheap proxy for "how much an item deviates from learned structure," operationally useful for active learning, RAG tails, and OOD detection.</li>
        <li>Provides the initial Laplacian-based data model and pipelines that later get abstracted into more general <em>graph wiring</em> over feature manifolds, and sets the invariant that the manifold is built in feature space rather than item space.</li>
      </ul>
      <p class="timeline-item__links">
        <strong>Code:</strong>
        <a href="https://github.com/tuned-org-uk/arrowspace" target="_blank" rel="noopener">arrowspace (Rust library)</a>
        · <a href="https://github.com/tuned-org-uk/pyarrowspace/tree/af8d97b4ea20267b2bd49a1a902b8013b63a5248/tests/output/v0_25/1771182601_test_2" target="_blank" rel="noopener">CVE benchmark &amp; tails analysis</a>
       · <a href="https://github.com/tuned-org-uk/pyarrowspace/blob/af8d97b4ea20267b2bd49a1a902b8013b63a5248/tests/test_2_CVE_db.py" target="_blank" rel="noopener">Testable code</a>
      </p>
    </div>
  </div>

  <!-- 2026-02-27 Graph Wiring -->
  <div class="timeline-item">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <div class="timeline-item__date">February 27, 2026</div>
      <h2 class="timeline-item__title">
        Graph Wiring: Eigenstructures for Vector Datasets and LLM Operations
      </h2>
      <p class="timeline-item__meta">
        <strong>Paper:</strong>
        <a href="https://www.techrxiv.org/users/685780/articles/1391083-graph-wiring-eigenstructures-for-vector-datasets-and-llm-operations" target="_blank" rel="noopener">
          TechRxiv preprint
        </a>
        · <strong>Author:</strong> Lorenzo Moriondo
      </p>
      <ul class="timeline-item__bullets">
        <li>Generalises the ArrowSpace intuition into a <em>graph wiring</em> framework that builds discrete graphs from arbitrary vector spaces by transposing data into feature space and wiring features via nearest‑neighbour pairing.</li>
        <li>Shows that the resulting feature‑space Laplacian behaves as a discrete Laplace–Beltrami operator; minimising its Rayleigh quotient corresponds to minimising Dirichlet energy, which under conformal constraints is equivalent to constructing a discrete minimal surface (worldsheet) in feature space.</li>
        <li>Provides the theoretical foundation that ties together λ‑style indices, epiplexity interpretations, and topology‑aware metrics like MRR‑Top0 into a unified manifold‑based view of vector datasets and LLM operations.</li>
      </ul>
      <p class="timeline-item__links">
        <strong>Code:</strong>
        <a href="https://github.com/tuned-org-uk/graph-wiring-paper" target="_blank" rel="noopener">graph-wiring-paper</a>
        · <a href="https://github.com/tuned-org-uk/arrowspace" target="_blank" rel="noopener">arrowspace</a>
        · <a href="https://github.com/tuned-org-uk/surfface" target="_blank" rel="noopener">surfface</a>
      </p>
    </div>
  </div>

  <!-- 2026-03-06 MRR-Top0 -->
  <div class="timeline-item">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <div class="timeline-item__date">March 6, 2026</div>
      <h2 class="timeline-item__title">
        MRR-Top0: A Topology-Aware Extension of Mean Reciprocal Rank
      </h2>
      <p class="timeline-item__meta">
        <strong>Paper:</strong>
        <a href="https://github.com/tuned-org-uk/topological-pagerank/blob/main/mrr-top0-paper.pdf" target="_blank" rel="noopener">
          preprint
        </a>
        · <strong>Author:</strong> Lorenzo Moriondo
      </p>
      <ul class="timeline-item__bullets">
        <li>Extends classical MRR with a topology-aware score (MRR‑Top0) that evaluates the full top‑k list using graph signals such as personalized PageRank, conductance, and modularity, rather than only the first relevant hit.</li>
        <li>Provides a quantitative lens on "tails quality" of retrieval results, critical for long‑term multi‑query stability in RAG systems and for comparing spectral/topological search methods like ArrowSpace's λτ against cosine baselines.</li>
        <li>Establishes <strong>Topological PageRank (MRR‑Top0)</strong> as a central metric for assessing spectral manifolds and measuring whether λ‑aware search truly improves semantic coherence and tail stability in practice.</li>
      </ul>
      <p class="timeline-item__links">
        <strong>Code:</strong>
        <a href="https://github.com/tuned-org-uk/topological-pagerank" target="_blank" rel="noopener">topological-pagerank / MRR‑Top0</a>
      </p>
    </div>
  </div>

  <!-- 2026-03-15 Epiplexity & Graph Wiring -->
  <div class="timeline-item">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <div class="timeline-item__date">March 15, 2026</div>
      <h2 class="timeline-item__title">
        Epiplexity And Graph Wiring: An Empirical Study for the Design of a Generic Algorithm
      </h2>
      <p class="timeline-item__meta">
        <strong>Paper:</strong>
        <a href="https://github.com/tuned-org-uk/graph-wiring-epiplexity/blob/main/paper/Epiplexity_A_measure_on_Graph_Wiring.pdf" target="_blank" rel="noopener">
          preprint
        </a>
        · <strong>Author:</strong> Lorenzo Moriondo
      </p>
      <ul class="timeline-item__bullets">
        <li>Connects ArrowSpace's λ scores and the emerging <em>graph wiring</em> perspective to <strong>epiplexity</strong>, treating λ as a cheap proxy for how much an item deviates from the learned manifold structure.</li>
        <li>Uses MRR‑Top0 and tails‑sensitive scores (developed on the CVE benchmarks) to study how epiplexity‑weighted retrieval behaves, with a focus on tail behavior, OOD items, and active learning candidates.</li>
        <li>Empirically tests how a generic algorithm can use Laplacian‑derived λ, epiplexity, and topological quality metrics together to design spectral/topological search strategies better aligned with RAG workloads.</li>
      </ul>
      <p class="timeline-item__links">
        <strong>Code:</strong>
        <a href="https://github.com/tuned-org-uk/graph-wiring-epiplexity" target="_blank" rel="noopener">epiplexity and Graph Wiring</a>
        · <a href="https://github.com/tuned-org-uk/pyarrowspace/blob/af8d97b4ea20267b2bd49a1a902b8013b63a5248/tests/test_2_CVE_db.py" target="_blank" rel="noopener"><code>test_2_CVE_db.txt</code></a> and related CVE pipelines in arrowspace experiments
      </p>
    </div>
  </div>

</div>

<div class="scroll-down-indicator">
  <div>Scroll down</div>
  <div class="scroll-down-indicator__arrow"></div>
</div>