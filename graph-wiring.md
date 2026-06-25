---
title: Graph Wiring
layout: timeline
---

# From ArrowSpace to Graph Wiring

<link rel="stylesheet" href="assets/css/dashboard.css">
<link rel="stylesheet" href="assets/css/panel1-timeline.css">
<link rel="stylesheet" href="assets/css/panel2-figures.css">
<link rel="stylesheet" href="assets/css/panel3-neurips.css">

<!-- ══════════════════════════════════════════════
     PANEL NAV
     ══════════════════════════════════════════════ -->
<nav class="dash-nav" role="tablist" aria-label="Dashboard panels">
  <button class="dash-nav-btn active" role="tab" aria-selected="true"  aria-controls="panel-1" data-panel="1">📅 Timeline</button>
  <button class="dash-nav-btn"        role="tab" aria-selected="false" aria-controls="panel-2" data-panel="2">📊 Blog Figures</button>
  <button class="dash-nav-btn"        role="tab" aria-selected="false" aria-controls="panel-3" data-panel="3">⭐ NeurIPS 2026</button>
  <button class="dash-nav-btn"        role="tab" aria-selected="false" aria-controls="panel-4" data-panel="4">❤️ Sponsor</button>
</nav>

<!-- ══════════════════════════════════════════════
     PANEL 1 — TIMELINE
     ══════════════════════════════════════════════ -->
<section id="panel-1" class="dash-panel active" role="tabpanel" aria-labelledby="panel-1-tab">

<!-- ── Filter bar ─────────────────────────────────── -->
<div class="tl-filter-bar" role="group" aria-label="Filter timeline events">
  <button class="tl-filter-btn active" data-filter="all">All</button>
  <button class="tl-filter-btn" data-filter="paper">📄 Papers</button>
  <button class="tl-filter-btn" data-filter="blog">✍️ Blog</button>
  <button class="tl-filter-btn" data-filter="milestone">🏆 Milestones</button>
  <button class="tl-filter-btn" data-filter="code">📦 Code</button>
</div>

<div class="timeline timeline--vertical">

  <!-- 2024-02 smartcore v0.5.0 (Rust) -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Rust Crate</span>
      <div class="timeline-item__date">2024 (earliest release in corpus)</div>
      <h2 class="timeline-item__title"><a href="https://crates.io/crates/smartcore" target="_blank" rel="noopener"><code>smartcore</code> v0.5.0</a></h2>
      <p class="timeline-item__meta">Machine Learning in Rust. Foundation library underpinning spectral clustering and manifold utilities across the stack.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">📥 contributor</span>
      </div>
    </div>
  </div>

  <!-- 2025-09-10 ArrowSpace paper -->
  <div class="timeline-item" data-type="paper">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge paper">Paper</span>
      <div class="timeline-item__date">September 10, 2025</div>
      <h2 class="timeline-item__title">ArrowSpace: Spectral Indexing of Embeddings using taumode (λτ)</h2>
      <p class="timeline-item__meta">
        <strong>DOI:</strong>
        <a href="https://doi.org/10.21105/joss.09002" target="_blank" rel="noopener">
          <img src="https://zenodo.org/badge/DOI/10.21105/09002.svg" alt="DOI:joss.10.21105.09002" loading="lazy">
        </a>
      </p>
      <button class="tl-toggle" aria-expanded="false">Show details ↓</button>
      <div class="tl-drawer" role="region">
        <div class="tl-drawer-inner">
          <ul>
            <li>Introduces ArrowSpace: spectral vector search blending semantic similarity with graph Laplacian energies via the synthetic λτ (taumode) index.</li>
            <li>Establishes λτ as a computationally cheap proxy for structural deviation — operationally useful for active learning, RAG tails, and OOD detection.</li>
            <li>Sets the invariant that the manifold is built in <em>feature space</em> rather than item space.</li>
          </ul>
          <p class="timeline-item__links">
            <strong>Code:</strong>
            <a href="https://github.com/tuned-org-uk/arrowspace" target="_blank" rel="noopener">arrowspace (Rust)</a>
            · <a href="https://github.com/tuned-org-uk/pyarrowspace/tree/af8d97b4ea20267b2bd49a1a902b8013b63a5248/tests/output/v0_25/1771182601_test_2" target="_blank" rel="noopener">CVE benchmark</a>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- 2025-10-01 Post 001 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">October 1, 2025</div>
      <h2 class="timeline-item__title">The Next Evolution in AI Memory: Energy-Informed Vector Search
        <span class="tl-value-chip">founding post</span>
      </h2>
      <p class="timeline-item__links"><a href="/posts/001_energy_informed_db">Read post →</a></p>
    </div>
  </div>

  <!-- ~2025-10 optical-embeddings v0.3.0 -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Rust Crate</span>
      <div class="timeline-item__date">October 2025</div>
      <h2 class="timeline-item__title"><a href="https://crates.io/crates/optical-embeddings" target="_blank" rel="noopener"><code>optical-embeddings</code> v0.3.0</a></h2>
      <p class="timeline-item__meta">DeepSeek-OCR — compress text into images. Optical token-compression for dense-context pipelines.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">📥 225 total</span>
        <span class="tl-dl-chip recent">⚡ 5 recent</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/optical-embeddings-rs" target="_blank" rel="noopener">Repository</a> · <a href="https://docs.rs/optical-embeddings-rs" target="_blank" rel="noopener">Docs</a></p>
    </div>
  </div>

  <!-- 2025-10-17 Post 005 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">October 17, 2025</div>
      <h2 class="timeline-item__title">Fast (not approximate?) Nearest Neighbours
        <span class="tl-value-chip">v0.16.0 — fastest open ANN</span>
      </h2>
      <p class="timeline-item__links"><a href="/posts/005_fast_approximate_nearest_neighbours">Read post →</a></p>
    </div>
  </div>

  <!-- 2025-10-24 Post 007 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">October 24, 2025</div>
      <h2 class="timeline-item__title">DeepSeek-OCR + Energy Search in ArrowSpace v0.18.0
        <span class="tl-value-chip">NDCG@10 ≈ 0.99 · MRR=1.0</span>
      </h2>
      <p class="timeline-item__links"><a href="/posts/007_deepseek_optical_compression_rust">Read post →</a></p>
    </div>
  </div>

  <!-- 2025-11-07 Post 009 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">November 7, 2025</div>
      <h2 class="timeline-item__title">Efficient GPT training: a Rust-powered GPT-2 deep dive</h2>
      <p class="timeline-item__links"><a href="/posts/009_llms_nanogpt_model_in_rust">Read post →</a></p>
    </div>
  </div>

  <!-- ~2025-11 nanogpt v0.1.0 -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Rust Crate</span>
      <div class="timeline-item__date">November 2025</div>
      <h2 class="timeline-item__title"><a href="https://crates.io/crates/nanogpt" target="_blank" rel="noopener"><code>nanogpt</code> v0.1.0</a></h2>
      <p class="timeline-item__meta">Nanochat in Rust. Companion to the GPT-2 deep-dive post; full transformer impl with RoPE, MQA, RMSNorm.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">📥 22 total</span>
        <span class="tl-dl-chip recent">⚡ 5 recent</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/nanogpt-rs" target="_blank" rel="noopener">Repository</a> · <a href="https://docs.rs/nanogpt-rs" target="_blank" rel="noopener">Docs</a></p>
    </div>
  </div>

  <!-- ~2025-11 dspm-rs v0.1.0 -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Rust Crate</span>
      <div class="timeline-item__date">November 2025</div>
      <h2 class="timeline-item__title"><a href="https://crates.io/crates/dspm-rs" target="_blank" rel="noopener"><code>dspm-rs</code> v0.1.0</a></h2>
      <p class="timeline-item__meta">Graph dimensionality reduction for vector similarities via subgraphs.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">📥 21 total</span>
        <span class="tl-dl-chip recent">⚡ 3 recent</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/topolog-embeddings" target="_blank" rel="noopener">Repository</a></p>
    </div>
  </div>

  <!-- ~2025-11 javelin-tui v0.10.0 -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Rust Crate</span>
      <div class="timeline-item__date">November 2025</div>
      <h2 class="timeline-item__title"><a href="https://crates.io/crates/javelin-tui" target="_blank" rel="noopener"><code>javelin-tui</code> v0.10.0</a></h2>
      <p class="timeline-item__meta">TUI for displaying and working with Lance matrices — developer tooling for the ArrowSpace ecosystem.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">📥 142 total</span>
        <span class="tl-dl-chip recent">⚡ 3 recent</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/javelin-tui" target="_blank" rel="noopener">Repository</a></p>
    </div>
  </div>

  <!-- 2025-11-12 Post 010 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">November 12, 2025</div>
      <h2 class="timeline-item__title">Why <code>arrowspace</code> is game-changing for data operations at scale</h2>
      <p class="timeline-item__links"><a href="/posts/010_game_changer_unifying_vectors_and_features_graphs">Read post →</a></p>
    </div>
  </div>

  <!-- 2025-11-26 Post 011 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">November 26, 2025</div>
      <h2 class="timeline-item__title">Safer LLMs require open search — Building the AI Memory Layer
        <span class="tl-value-chip">AI safety</span>
      </h2>
      <p class="timeline-item__links"><a href="/posts/011_safer_LLMs_require_more_open_search_building_AI_memory_layer">Read post →</a></p>
    </div>
  </div>

  <!-- ~2025-12 deep-delta-learn v0.1.0 -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Rust Crate</span>
      <div class="timeline-item__date">December 2025</div>
      <h2 class="timeline-item__title"><a href="https://crates.io/crates/deep-delta-learn" target="_blank" rel="noopener"><code>deep-delta-learn</code> v0.1.0</a></h2>
      <p class="timeline-item__meta">Implementation of Deep Delta Learning (paper 2601.00417). Structured incremental learning for spectral models.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">📥 22 total</span>
        <span class="tl-dl-chip recent">⚡ 4 recent</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/deep-delta-learn" target="_blank" rel="noopener">Repository</a> · <a href="https://docs.rs/deep-delta-learn" target="_blank" rel="noopener">Docs</a></p>
    </div>
  </div>

  <!-- 2026-01-05 Post 012 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">January 5, 2026</div>
      <h2 class="timeline-item__title">The Topological Transformer: Tauformer
        <span class="tl-value-chip">~50% KV-cache · ~20% faster</span>
      </h2>
      <p class="timeline-item__links"><a href="/posts/012_topological_transformer_tauformer_domain_memory_in_attention">Read post →</a></p>
    </div>
  </div>

  <!-- ~2026-02 kalman_clustering v0.3.0 -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Rust Crate</span>
      <div class="timeline-item__date">February 2026</div>
      <h2 class="timeline-item__title"><a href="https://crates.io/crates/kalman_clustering" target="_blank" rel="noopener"><code>kalman_clustering</code> v0.3.0</a></h2>
      <p class="timeline-item__meta">Clustering vectors using Kalman Filter. Powers the diffusion-split subcentroids and spectral partitioning approach.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">📥 446 total</span>
        <span class="tl-dl-chip recent">⚡ 364 recent</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/kalman_centroids" target="_blank" rel="noopener">Repository</a> · <a href="https://docs.rs/kalman_centroids" target="_blank" rel="noopener">Docs</a></p>
    </div>
  </div>

  <!-- 2026-02-17 Post 016 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">February 17, 2026</div>
      <h2 class="timeline-item__title"><code>arrowspace</code>: Capabilities, speed and accuracy</h2>
      <p class="timeline-item__links"><a href="/posts/016_arrowspace_performance_results">Read post →</a></p>
    </div>
  </div>

  <!-- 2026-02-27 Graph Wiring paper -->
  <div class="timeline-item" data-type="paper">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge paper">Paper</span>
      <div class="timeline-item__date">February 27, 2026</div>
      <h2 class="timeline-item__title">Graph Wiring: Eigenstructures for Vector Datasets and LLM Operations</h2>
      <p class="timeline-item__meta">
        <strong>DOI:</strong>
        <a href="https://doi.org/10.36227/techrxiv.177220780.02840438/v1" target="_blank" rel="noopener">
          <img src="https://zenodo.org/badge/DOI/177220780/02840438.svg" alt="DOI:au.177220780.02840438" loading="lazy">
        </a>
      </p>
      <button class="tl-toggle" aria-expanded="false">Show details ↓</button>
      <div class="tl-drawer" role="region">
        <div class="tl-drawer-inner">
          <ul>
            <li>Generalises ArrowSpace into a graph wiring framework; builds discrete graphs from arbitrary vector spaces by transposing data into feature space.</li>
            <li>Feature-space Laplacian behaves as a discrete Laplace–Beltrami operator; minimising Rayleigh quotient ≡ constructing a discrete minimal surface in feature space.</li>
            <li>Provides the theoretical foundation tying together λ-indices, epiplexity, and MRR-Top0 into a unified manifold-based view.</li>
          </ul>
          <p class="timeline-item__links">
            <strong>Code:</strong>
            <a href="https://github.com/tuned-org-uk/arrowspace" target="_blank" rel="noopener">arrowspace</a>
            · <a href="https://github.com/tuned-org-uk/surfface" target="_blank" rel="noopener">surfface</a>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- 2026-03-06 MRR-Top0 paper -->
  <div class="timeline-item" data-type="paper">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge paper">Paper</span>
      <div class="timeline-item__date">March 6, 2026</div>
      <h2 class="timeline-item__title">MRR-Top0: A Topology-Aware Extension of Mean Reciprocal Rank</h2>
      <p class="timeline-item__meta">
        <strong>DOI:</strong>
        <a href="https://www.authorea.com/users/685780/articles/1397240-mrr-top0-a-topology-aware-extension-of-mean-reciprocal-rank-for-semantic-sensitive-retrieval-evaluation" target="_blank" rel="noopener">
          <img src="https://zenodo.org/badge/DOI/177430061/18235541.svg" alt="DOI:au.177430061.18235541" loading="lazy">
        </a>
      </p>
      <button class="tl-toggle" aria-expanded="false">Show details ↓</button>
      <div class="tl-drawer" role="region">
        <div class="tl-drawer-inner">
          <ul>
            <li>Extends MRR with topology-aware score using PPR, conductance, and modularity — evaluates full top-k list, not just the first relevant hit.</li>
            <li>Quantitative lens on "tails quality" critical for long-term multi-query RAG stability.</li>
            <li>Establishes Topological PageRank as a central metric for spectral manifold assessment.</li>
          </ul>
          <p class="timeline-item__links">
            <strong>Code:</strong>
            <a href="https://github.com/tuned-org-uk/topological-pagerank" target="_blank" rel="noopener">topological-pagerank / MRR-Top0</a>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- 2026-03-08 Post 017 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">March 8, 2026</div>
      <h2 class="timeline-item__title"><code>arrowspace</code> hits the spot for semantic augmented retrieval
        <span class="tl-value-chip">geometry-only cosine fails at tail</span>
      </h2>
      <p class="timeline-item__links"><a href="/posts/017_arrowspace_search_final_assessment">Read post →</a></p>
    </div>
  </div>

  <!-- 2026-03-15 Epiplexity paper -->
  <div class="timeline-item" data-type="paper">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge paper">Paper</span>
      <div class="timeline-item__date">March 15, 2026</div>
      <h2 class="timeline-item__title">Epiplexity And Graph Wiring: An Empirical Study for the Design of a Generic Algorithm</h2>
      <p class="timeline-item__meta">
        <strong>DOI:</strong>
        <a href="https://www.authorea.com/users/685780/articles/1397239-epiplexity-and-graph-wiring-an-empirical-study-for-the-design-of-a-generic-algorithm" target="_blank" rel="noopener">
          <img src="https://zenodo.org/badge/DOI/177430060/02394540.svg" alt="DOI:au.177430060.02394540" loading="lazy">
        </a>
      </p>
      <button class="tl-toggle" aria-expanded="false">Show details ↓</button>
      <div class="tl-drawer" role="region">
        <div class="tl-drawer-inner">
          <ul>
            <li>Connects ArrowSpace λ scores to epiplexity; treats λ as proxy for manifold deviation.</li>
            <li>Studies epiplexity-weighted retrieval tail behaviour and OOD items using CVE benchmarks.</li>
            <li>Empirically tests a generic algorithm combining λ, epiplexity, and topological quality for spectral search. <code>pip install epiplexity</code></li>
          </ul>
          <p class="timeline-item__links">
            <strong>Code:</strong>
            <a href="https://github.com/tuned-org-uk/graph-wiring-epiplexity" target="_blank" rel="noopener">epiplexity and Graph Wiring</a>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- ~2026-03 Python: epiplexity (pip) -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Python Package</span>
      <div class="timeline-item__date">March 2026</div>
      <h2 class="timeline-item__title"><a href="https://pypi.org/project/epiplexity/" target="_blank" rel="noopener"><code>epiplexity</code></a> <code style="font-size:0.75rem; color:var(--color-text-faint)">pip install epiplexity</code></h2>
      <p class="timeline-item__meta">Python interface to the epiplexity + Graph Wiring algorithm. Companion to the empirical study paper.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">🐍 PyPI</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/graph-wiring-epiplexity" target="_blank" rel="noopener">Repository</a></p>
    </div>
  </div>

  <!-- 2026-03-27 Podcast milestone -->
  <div class="timeline-item" data-type="milestone">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge milestone">Milestone</span>
      <div class="timeline-item__date">March 27, 2026</div>
      <h2 class="timeline-item__title">🎙️ arrowspace: Vector Spaces and Graph Wiring — MLOps Community Podcast</h2>
      <div class="media-feature-card">
        <div class="media-feature-copy">
          <ul class="media-feature-points">
            <li>How Graph Wiring reframes vector datasets as feature-space manifolds.</li>
            <li>Why epiplexity matters for retrieval, curation, and model operations.</li>
            <li>What is structural information and how to generate information from datasets.</li>
          </ul>
          <p class="media-feature-links">
            <a href="https://www.youtube.com/watch?v=S5xbQXBiLs4" target="_blank" rel="noopener noreferrer" class="blog-read-more">
              Watch on YouTube <span aria-hidden="true">→</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- ~2026-03 constraint-decoding-trie v0.1.0 -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Rust Crate</span>
      <div class="timeline-item__date">March 2026</div>
      <h2 class="timeline-item__title"><a href="https://crates.io/crates/constraint-decoding-trie" target="_blank" rel="noopener"><code>constraint-decoding-trie</code> v0.1.0</a></h2>
      <p class="timeline-item__meta">Generative Retrieval: Transition Matrix Trie for Constraint Decoding (STATIC). Companion implementation to the Spectral IDs paper.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">📥 16 total</span>
        <span class="tl-dl-chip recent">⚡ 4 recent</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/constraint-decoding-trie-static" target="_blank" rel="noopener">Repository</a> · <a href="https://docs.rs/constraint-decoding-trie-static" target="_blank" rel="noopener">Docs</a></p>
    </div>
  </div>

  <!-- 2026-04-10 Spectral IDs paper -->
  <div class="timeline-item" data-type="paper">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge paper">Paper</span>
      <div class="timeline-item__date">April 10, 2026</div>
      <h2 class="timeline-item__title">Spectral-aware Unique Identifiers for Generative Retrieval and Vector Search</h2>
      <p class="timeline-item__meta">
        <strong>DOI:</strong>
        <a href="https://www.authorea.com/users/685780/articles/1400103-spectral-aware-unique-identifiers-for-generative-retrieval-and-vector-search" target="_blank" rel="noopener">
          <img src="https://zenodo.org/badge/DOI/177585107/76021942.svg" alt="DOI:au.177585107.76021942" loading="lazy">
        </a>
      </p>
      <button class="tl-toggle" aria-expanded="false">Show details ↓</button>
      <div class="tl-drawer" role="region">
        <div class="tl-drawer-inner">
          <ul>
            <li>Introduces spectral-aware IDs: composite codes pairing integer ID with an order key derived from taumode, aligning identifiers with the spectral manifold.</li>
            <li>Improves manifold consistency vs conventional generative retrieval identifiers; compatible with standard vector DBs and RAG pipelines.</li>
            <li>Bridge between ArrowSpace-style spectral indexing and modern generative retrieval.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- ~2026-04 Python: arrowspace (pip) -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Python Package</span>
      <div class="timeline-item__date">April 2026</div>
      <h2 class="timeline-item__title"><a href="https://pypi.org/project/arrowspace/" target="_blank" rel="noopener"><code>arrowspace</code></a> <code style="font-size:0.75rem; color:var(--color-text-faint)">pip install arrowspace</code></h2>
      <p class="timeline-item__meta">Python bindings to the ArrowSpace Rust engine. Full graph analysis, vector search, and energy-distribution stats from Python.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">🐍 PyPI</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/pyarrowspace" target="_blank" rel="noopener">Repository</a></p>
    </div>
  </div>

  <!-- ~2026-04 arrowspace (Rust crate) v0.26.2 -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Rust Crate</span>
      <div class="timeline-item__date">April 2026</div>
      <h2 class="timeline-item__title"><a href="https://crates.io/crates/arrowspace" target="_blank" rel="noopener"><code>arrowspace</code> v0.26.2</a></h2>
      <p class="timeline-item__meta">Graph Wiring for embeddings using physical networks wiring. Graph analysis, vector search, and energy-distribution stats.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">📥 6,604 total</span>
        <span class="tl-dl-chip recent">⚡ 736 recent</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/surfface-rs" target="_blank" rel="noopener">Repository</a> · <a href="https://docs.rs/surfface-rs" target="_blank" rel="noopener">Docs</a></p>
    </div>
  </div>

  <!-- ~2026-05 genegraph-storage v0.12.0 -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Rust Crate</span>
      <div class="timeline-item__date">May 2026 (≈ 25 days ago)</div>
      <h2 class="timeline-item__title"><a href="https://crates.io/crates/genegraph-storage" target="_blank" rel="noopener"><code>genegraph-storage</code> v0.12.0</a></h2>
      <p class="timeline-item__meta">Vector database: base Lance storage layer. Core persistence engine for the ArrowSpace graph wiring stack.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">📥 974 total</span>
        <span class="tl-dl-chip recent">⚡ 286 recent</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/genegraph-storage" target="_blank" rel="noopener">Repository</a> · <a href="https://docs.rs/genegraph-storage" target="_blank" rel="noopener">Docs</a></p>
    </div>
  </div>

  <!-- 2026-05-11 NeurIPS submission milestone -->
  <div class="timeline-item" data-type="milestone">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge milestone">Milestone</span>
      <div class="timeline-item__date">May 11, 2026</div>
      <h2 class="timeline-item__title">🏆 Submitted to NeurIPS 2026</h2>
    </div>
  </div>

  <!-- 2026-06-02 Post 019 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">June 2, 2026</div>
      <h2 class="timeline-item__title"><code>arrowspace</code> for Latent Spaces — part 1
        <span class="tl-value-chip">100% cluster purity at α=0.35</span>
      </h2>
      <p class="timeline-item__links"><a href="/posts/019_arrowspace_local_minima_walkthrough">Read post →</a></p>
    </div>
  </div>

  <!-- 2026-06-11 Post 020 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">June 11, 2026</div>
      <h2 class="timeline-item__title"><code>arrowspace</code> for Latent Spaces — part 2
        <span class="tl-value-chip">36 weight-role subspaces probed</span>
      </h2>
      <p class="timeline-item__links"><a href="/posts/020_arrowspace_semantic_basins_part2">Read post →</a></p>
    </div>
  </div>

  <!-- Future -->
  <div class="timeline-item" data-type="milestone">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge milestone">Milestone</span>
      <div class="timeline-item__date">..., 2026</div>
      <h2 class="timeline-item__title">⏳ Next? Become a sponsor to be part of this endeavour</h2>
    </div>
  </div>

</div><!-- /.timeline -->

</section><!-- /#panel-1 -->

<!-- ══════════════════════════════════════════════
     PANEL 2 — BLOG FIGURES GALLERY
     ══════════════════════════════════════════════ -->
<section id="panel-2" class="dash-panel" role="tabpanel" aria-labelledby="panel-2-tab">
  <div class="fig-panel-wrap">

    <div class="fig-panel-header">
      <h2>📊 Blog Figures Gallery</h2>
      <p>All benchmark charts from published posts. Click any figure to expand.</p>
    </div>

    <!-- Post filter -->
    <div class="fig-filter-bar" role="group" aria-label="Filter figures by post">
      <button class="fig-filter-btn active" data-fig-filter="all">All posts</button>
      <button class="fig-filter-btn" data-fig-filter="016">Post 016 — Performance</button>
      <button class="fig-filter-btn" data-fig-filter="019">Post 019 — Latent Spaces pt.1</button>
    </div>

    <!-- ── Post 016 / CVE ──────────────────────────────────── -->
    <p class="fig-section-label" data-fig-group="016">Post 016 · arrowspace: Capabilities, speed and accuracy · CVE benchmark</p>
    <div class="fig-masonry" data-fig-group="016">

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c1_score_decay">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c1_score_decay.png"
             alt="Score decay across ranks (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Score decay across ranks</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c2_score_lift">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c2_score_lift.png"
             alt="Score lift (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Score lift</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c3_ndcg">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c3_ndcg.png"
             alt="NDCG@k (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">NDCG@k</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c4_rank_corr">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c4_rank_corr.png"
             alt="Rank correlation (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Rank correlation</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c5_th_ratio">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c5_th_ratio.png"
             alt="Threshold ratio (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Threshold ratio</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c6_tail_cv">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c6_tail_cv.png"
             alt="Tail CV (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Tail coefficient of variation</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c7_per_query_curves">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c7_per_query_curves.png"
             alt="Per-query precision curves (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Per-query precision curves</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c8_agreement">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c8_agreement.png"
             alt="Ranker agreement (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Ranker agreement</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c9_head_scatter">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c9_head_scatter.png"
             alt="Head-query scatter (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Head-query scatter</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c10_tail_radar">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c10_tail_radar.png"
             alt="Tail-query radar (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Tail-query radar</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c11_overlap">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c11_overlap.png"
             alt="Result overlap (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Result overlap</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c12_violin">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c12_violin.png"
             alt="Score distribution violin (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Score distribution violin</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c13_decay_rate">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c13_decay_rate.png"
             alt="Decay rate (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Decay rate</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c14_boost_map">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c14_boost_map.png"
             alt="Boost heatmap (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Boost heatmap</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c15_rerank_hist">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c15_rerank_hist.png"
             alt="Re-rank histogram (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Re-rank histogram</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c16_benefit">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c16_benefit.png"
             alt="Benefit analysis (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Benefit analysis</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c17_stability">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c17_stability.png"
             alt="Ranking stability (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Ranking stability</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c18_range">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c18_range.png"
             alt="Score range (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Score range</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c19_wins">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c19_wins.png"
             alt="Win-rate analysis (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Win-rate analysis</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c20_landscape">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c20_landscape.png"
             alt="Performance landscape (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Performance landscape</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c21_parcoords">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c21_parcoords.png"
             alt="Parallel coordinates (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Parallel coordinates</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c22_cumul_adv">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c22_cumul_adv.png"
             alt="Cumulative advantage (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Cumulative advantage</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c23_summary_table">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c23_summary_table.png"
             alt="Summary table (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Summary table</div>
        </div>
      </div>

    </div><!-- /.fig-masonry 016 -->

    <!-- ── Post 019 ──────────────────────────────────────── -->
    <p class="fig-section-label" data-fig-group="019">Post 019 · arrowspace for Latent Spaces — part 1</p>
    <div class="fig-masonry" data-fig-group="019">

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c1_arrowspace_energy">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c1_arrowspace_energy.png"
             alt="ArrowSpace energy distribution" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">ArrowSpace energy distribution</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c2_kde_vanilla">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c2_kde_vanilla.png"
             alt="KDE — vanilla embeddings" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">KDE — vanilla embeddings</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c3_kde_aug">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c3_kde_aug.png"
             alt="KDE — augmented embeddings" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">KDE — augmented embeddings</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c4_diff_vanilla">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c4_diff_vanilla.png"
             alt="Diffusion map — vanilla" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">Diffusion map — vanilla</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c5_diff_aug">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c5_diff_aug.png"
             alt="Diffusion map — augmented" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">Diffusion map — augmented</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c6_bh_overlay">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c6_bh_overlay.png"
             alt="Barnes-Hut overlay" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">Barnes-Hut overlay</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c7_quality_bar">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c7_quality_bar.png"
             alt="Cluster quality bar chart" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">Cluster quality bar chart</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c8_alpha_purity">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c8_alpha_purity.png"
             alt="α vs cluster purity" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">α vs cluster purity</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c9_alpha_lambda">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c9_alpha_lambda.png"
             alt="α vs λ energy" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">α vs λ energy</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c10_jaccard7">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c10_jaccard7.png"
             alt="Jaccard@7 overlap" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">Jaccard@7 overlap</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c11_r_vs_kde">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c11_r_vs_kde.png"
             alt="Radius vs KDE bandwidth" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">Radius vs KDE bandwidth</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c12_r_vs_diff">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c12_r_vs_diff.png"
             alt="Radius vs diffusion scale" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">Radius vs diffusion scale</div>
        </div>
      </div>

    </div><!-- /.fig-masonry 019 -->

  </div><!-- /.fig-panel-wrap -->
</section><!-- /#panel-2 -->

<!-- ── Lightbox (shared, outside panels) ──────── -->
<div class="fig-lightbox" id="fig-lightbox" role="dialog" aria-modal="true" aria-label="Figure lightbox">
  <button class="fig-lightbox-close" aria-label="Close lightbox">✕</button>
  <img src="" alt="" id="fig-lightbox-img">
  <div class="fig-lightbox-caption" id="fig-lightbox-caption"></div>
</div>

<!-- ══════════════════════════════════════════════
     PANEL 3 — NEURIPS 2026 CVE RESULTS
     ══════════════════════════════════════════════ -->
<section id="panel-3" class="dash-panel" role="tabpanel" aria-labelledby="panel-3-tab">
  <div class="n3-wrap">

    <!-- Header -->
    <div class="n3-header">
      <div>
        <h2 class="n3-title">
          &#11088; NeurIPS 2026 CVE Results
          <span class="n3-star-badge">&#11088; Special Panel</span>
        </h2>
        <p class="n3-subtitle">Figures and interactive charts from the NeurIPS 2026 submission &middot; CVE benchmark &middot; v2 output</p>
      </div>
      <button class="n3-runinfo-btn" id="n3-runinfo-btn" aria-expanded="false" aria-controls="n3-runinfo-overlay">
        &#8505;&#65039; Run info
      </button>
    </div>

    <!-- Run-info modal -->
    <div class="n3-runinfo-overlay" id="n3-runinfo-overlay" role="dialog" aria-modal="true" aria-label="Run metadata">
      <div class="n3-runinfo-card">
        <button class="n3-runinfo-close" id="n3-runinfo-close" aria-label="Close run info">&#10005;</button>
        <h3>Run Metadata</h3>
        <table class="n3-runinfo-table" id="n3-runinfo-table">
          <tbody>
            <tr><td>Status</td><td>Loading&hellip;</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Summary CSV charts (lazy-loaded) -->
    <p class="n3-section-label">Quick overview &mdash; summary charts (from CSV data)</p>
    <div class="n3-charts-grid" id="n3-charts-grid">
      <div class="n3-skeleton n3-skeleton-chart"></div>
      <div class="n3-skeleton n3-skeleton-chart"></div>
      <div class="n3-skeleton n3-skeleton-chart"></div>
      <div class="n3-skeleton n3-skeleton-chart"></div>
    </div>

    <!-- Detailed interactive chart modules -->
    <p class="n3-section-label">Detailed analysis &mdash; interactive chart modules</p>

    <details open>
      <summary class="panel-section-header">Top-25 Score Comparison (per query)</summary>
      <p class="chart-desc">Grouped bar chart per query: 3 bars per rank (Cosine / Hybrid / Taumode). X labels show CVE year suffix. Scroll-zoom + pan enabled.</p>
      <div id="top25-container" class="charts-stack"></div>
    </details>

    <details>
      <summary class="panel-section-header">Tail Analysis (4 sub-charts per query)</summary>
      <p class="chart-desc">Score distribution with HEAD_K=3 split line; tail scores rank 4+; tail variability (mean &plusmn; std); tail metrics grouped bar.</p>
      <div id="tail-container" class="charts-stack"></div>
    </details>

    <details>
      <summary class="panel-section-header">Semantic Recall Comparison (3 &times; 3)</summary>
      <p class="chart-desc">Per method: Recall bars (Traditional / Semantic / Tolerant); scatter Traditional vs Semantic with y=x diagonal; Tolerant &minus; Traditional uplift histogram.</p>
      <div id="recall-container" class="charts-stack"></div>
    </details>

    <details>
      <summary class="panel-section-header">Metric Deltas vs Cosine baseline</summary>
      <p class="chart-desc">&Delta; Tail/Head Ratio, &Delta; Semantic Recall, &Delta; Tolerant Recall &mdash; Hybrid and Taumode relative to Cosine, per query.</p>
      <div id="deltas-container" class="charts-stack"></div>
    </details>

    <details>
      <summary class="panel-section-header">Win/Loss Heatmap (D3)</summary>
      <p class="chart-desc">Per-query winner for T/H Ratio, Tail CV, Tail Decay, Semantic Recall, Tolerant Recall. Cell colour = winning method; C/H/T annotation.</p>
      <div id="heatmap-container" class="heatmap-wrapper"></div>
    </details>

    <details>
      <summary class="panel-section-header">HEAD_K Sweep (&plusmn;1 std band)</summary>
      <p class="chart-desc">Mean Tail/Head Ratio, Tail CV, Tail Decay vs HEAD_K, with &plusmn;1 std shaded band per method.</p>
      <div id="headk-container" class="charts-stack"></div>
    </details>

  </div>

    <!-- Lightbox for panel 3 PNG zoom -->
    <div class="fig-lightbox" id="n3-lightbox" role="dialog" aria-modal="true" aria-label="Figure lightbox">
      <button class="fig-lightbox-close" aria-label="Close lightbox">&#10005;</button>
      <img src="" alt="" id="n3-lightbox-img">
      <div class="fig-lightbox-caption" id="n3-lightbox-caption"></div>
    </div>

  </div>
</section></section>

<!-- ══════════════════════════════════════════════
     PANEL 4 — SPONSOR
     ══════════════════════════════════════════════ -->
<section id="panel-4" class="dash-panel" role="tabpanel" aria-labelledby="panel-4-tab">
  <div class="n3-wrap">
    <div class="n3-header">
      <div>
        <h2 class="n3-title">&#10084;&#65039; Sponsor</h2>
        <p class="n3-subtitle">Support the ArrowSpace &amp; Graph Wiring ecosystem</p>
      </div>
    </div>
    <div class="sponsor-strip">
      <div class="sponsor-strip-stats">
        <strong>Invest in research-grade infrastructure</strong>
        Your sponsorship directly funds open-source development of spectral vector search, graph-based retrieval, and the tooling around it.
        <div class="sponsor-strip-pills">
          <span class="stat-pill">&#128640; ArrowSpace</span>
          <span class="stat-pill">&#128200; Graph Wiring</span>
          <span class="stat-pill">&#128220; Epiplexity</span>
          <span class="stat-pill">&#129302; Kalman Clustering</span>
        </div>
      </div>
      <div class="sponsor-strip-cta">
        <a href="https://github.com/sponsors/tuned-org-uk" target="_blank" rel="noopener noreferrer" class="sponsor-btn">
          &#9829; Become a sponsor
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Chart.js + plugins (CDN, UMD) -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@3.1.0/dist/chartjs-plugin-annotation.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/hammerjs@2.0.8/hammer.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-zoom@2.0.1/dist/chartjs-plugin-zoom.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js"></script>

<!-- Register Chart.js plugins -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  if (typeof Chart !== 'undefined' && typeof ChartAnnotation !== 'undefined') {
    Chart.register(ChartAnnotation);
  }
  if (typeof ChartZoom !== 'undefined') {
    Chart.register(ChartZoom);
  }
});
</script>

<!-- Dashboard scripts -->
<script src="assets/js/dashboard.js"></script>
<script src="assets/js/panel1-timeline.js"></script>
<script src="assets/js/panel2-figures.js"></script>
<script src="assets/js/panel3-main.js"></script>

<!-- Panel 3 interactive chart modules -->
<script src="assets/js/panel3/chart-top25.js"></script>
<script src="assets/js/panel3/chart-tail.js"></script>
<script src="assets/js/panel3/chart-recall.js"></script>
<script src="assets/js/panel3/chart-deltas.js"></script>
<script src="assets/js/panel3/chart-heatmap.js"></script>
<script src="assets/js/panel3/chart-headk.js"></script>
