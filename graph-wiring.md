---
title: Graph Wiring
layout: timeline
---

# From ArrowSpace to Graph Wiring

## Timeline

A short chronology of how **ArrowSpace**, topology-aware evaluation and *epiplexity* experiments converged into the **Graph Wiring** framework.

<style>
/* ── Filter bar ──────────────────────────────── */
.tl-filter-bar {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 0 auto 2rem;
  max-width: 900px;
}
.tl-filter-btn {
  padding: 0.3rem 0.85rem;
  border-radius: 9999px;
  border: 1px solid var(--color-border, #d4d1ca);
  background: var(--color-surface, #f9f8f5);
  color: var(--color-text-muted, #7a7974);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background 180ms, color 180ms, border-color 180ms;
}
.tl-filter-btn:hover {
  background: var(--color-surface-offset, #f3f0ec);
  color: var(--color-text, #28251d);
}
.tl-filter-btn.active {
  background: var(--color-primary, #01696f);
  color: #fff;
  border-color: var(--color-primary, #01696f);
}

/* ── Timeline item base ──────────────────────── */
.timeline-item {
  opacity: 0;
  transform: translateY(36px);
  transition: opacity 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275),
              transform 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.timeline-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}
.timeline-item .timeline-dot,
.timeline-item .timeline-line {
  opacity: 0;
  transition: opacity 0.4s ease-in 0.25s;
}
.timeline-item.is-visible .timeline-dot,
.timeline-item.is-visible .timeline-line {
  opacity: 1;
}
.timeline-item.tl-hidden {
  display: none;
}

/* ── Type-specific dot colours ───────────────── */
.timeline-item[data-type="paper"] .timeline-dot {
  background: var(--color-primary, #01696f);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary, #01696f) 20%, transparent);
}
.timeline-item[data-type="blog"] .timeline-dot {
  background: var(--color-gold, #d19900);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-gold, #d19900) 18%, transparent);
  width: 0.6rem !important;
  height: 0.6rem !important;
}
.timeline-item[data-type="milestone"] .timeline-dot {
  background: var(--color-orange, #da7101);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-orange, #da7101) 22%, transparent);
}
.timeline-item[data-type="code"] .timeline-dot {
  background: var(--color-blue, #5591c7);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-blue, #5591c7) 20%, transparent);
  width: 0.65rem !important;
  height: 0.65rem !important;
}

/* ── Category badge ──────────────────────────── */
.tl-badge {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  margin-bottom: 0.3rem;
}
.tl-badge.paper     { background: color-mix(in srgb, var(--color-primary, #01696f) 15%, transparent); color: var(--color-primary, #01696f); }
.tl-badge.blog      { background: color-mix(in srgb, var(--color-gold, #d19900) 15%, transparent);    color: #9a6f00; }
.tl-badge.milestone { background: color-mix(in srgb, var(--color-orange, #da7101) 15%, transparent);  color: var(--color-orange, #da7101); }
.tl-badge.code      { background: color-mix(in srgb, var(--color-blue, #5591c7) 15%, transparent);    color: var(--color-blue, #5591c7); }

/* ── Value chip ──────────────────────────────── */
.tl-value-chip {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.55rem;
  border-radius: 9999px;
  background: color-mix(in srgb, var(--color-success, #437a22) 12%, transparent);
  color: var(--color-success, #437a22);
  margin-left: 0.4rem;
  vertical-align: middle;
}

/* ── Download stats chips ────────────────────── */
.tl-dl-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0.4rem 0 0.2rem;
}
.tl-dl-chip {
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.12rem 0.5rem;
  border-radius: 9999px;
  border: 1px solid var(--color-border, #d4d1ca);
  background: var(--color-surface-offset, #f3f0ec);
  color: var(--color-text-muted, #7a7974);
}
.tl-dl-chip.total  { color: var(--color-blue, #5591c7); border-color: color-mix(in srgb, var(--color-blue, #5591c7) 35%, transparent); background: color-mix(in srgb, var(--color-blue, #5591c7) 8%, transparent); }
.tl-dl-chip.recent { color: var(--color-success, #437a22); border-color: color-mix(in srgb, var(--color-success, #437a22) 35%, transparent); background: color-mix(in srgb, var(--color-success, #437a22) 8%, transparent); }

/* ── Expand drawer ───────────────────────────── */
.tl-drawer {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.tl-drawer.open { max-height: 600px; }
.tl-drawer-inner {
  padding: 0.75rem 0 0.5rem;
  font-size: 0.88rem;
  color: var(--color-text-muted, #7a7974);
  line-height: 1.6;
}
.tl-drawer-inner ul {
  padding-left: 1.1rem;
  margin: 0.4rem 0 0.6rem;
}
.tl-drawer-inner li { margin-top: 0.3rem; }
.tl-toggle {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--color-primary, #01696f);
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  margin-top: 0.3rem;
  letter-spacing: 0.02em;
}
.tl-toggle:hover { text-decoration: underline; }

/* ── Sponsor strip ───────────────────────────── */
.sponsor-strip {
  max-width: 900px;
  margin: 3rem auto 2rem;
  padding: 1.5rem 2rem;
  background: color-mix(in srgb, var(--color-primary, #01696f) 7%, var(--color-surface, #f9f8f5));
  border: 1px solid color-mix(in srgb, var(--color-primary, #01696f) 25%, transparent);
  border-radius: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
}
.sponsor-strip-stats {
  font-size: 0.82rem;
  color: var(--color-text-muted, #7a7974);
  line-height: 1.7;
}
.sponsor-strip-stats strong {
  color: var(--color-text, #28251d);
  font-size: 0.95rem;
  display: block;
  margin-bottom: 0.3rem;
}
.stat-pill {
  display: inline-block;
  background: var(--color-surface, #f9f8f5);
  border: 1px solid var(--color-border, #d4d1ca);
  border-radius: 9999px;
  padding: 0.15rem 0.6rem;
  font-size: 0.72rem;
  font-weight: 600;
  margin: 0.15rem 0.15rem 0 0;
  color: var(--color-text, #28251d);
}
.sponsor-strip-cta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.6rem;
}
.sponsor-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: var(--color-primary, #01696f);
  color: #fff;
  text-decoration: none;
  padding: 0.55rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 700;
  transition: opacity 180ms;
}
.sponsor-btn:hover { opacity: 0.85; }
@media (max-width: 600px) {
  .sponsor-strip { flex-direction: column; align-items: flex-start; }
  .sponsor-strip-cta { align-items: flex-start; }
}

/* ── Blog impact panel ───────────────────────── */
.blog-panel {
  max-width: 900px;
  margin: 2rem auto 3rem;
}
.blog-panel-title {
  font-size: clamp(1.1rem, 1rem + 0.6vw, 1.45rem);
  font-weight: 700;
  margin-bottom: 1.25rem;
  color: var(--color-text, #28251d);
}
.blog-panel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
  gap: 1rem;
}
.bp-card {
  background: var(--color-surface, #f9f8f5);
  border: 1px solid var(--color-border, #d4d1ca);
  border-radius: 0.75rem;
  padding: 1.15rem 1.15rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  transition: transform 180ms cubic-bezier(0.16,1,0.3,1), box-shadow 180ms;
}
.bp-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--bp-accent, var(--color-primary, #01696f));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
}
.bp-card:hover::before { transform: scaleX(1); }
.bp-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px oklch(0.2 0.01 80 / 0.1);
}
.bp-meta { font-size: 0.7rem; color: var(--color-text-faint, #bab9b4); text-transform: uppercase; letter-spacing: 0.07em; }
.bp-title { font-size: 0.95rem; font-weight: 700; line-height: 1.25; color: var(--color-text, #28251d); }
.bp-metric {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-success, #437a22);
  background: color-mix(in srgb, var(--color-success, #437a22) 10%, transparent);
  border-radius: 9999px;
  padding: 0.15rem 0.55rem;
  display: inline-block;
  width: fit-content;
}
.bp-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: auto; padding-top: 0.3rem; }
.bp-tag {
  font-size: 0.63rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.1rem 0.45rem;
  border-radius: 9999px;
  background: var(--color-surface-offset, #f3f0ec);
  color: var(--color-text-muted, #7a7974);
  border: 1px solid var(--color-border, #d4d1ca);
}
.bp-readmore {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--bp-accent, var(--color-primary, #01696f));
  margin-top: 0.4rem;
}
</style>

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
      <div class="timeline-item__date">October 2025 (≈ 8 months ago)</div>
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
      <div class="timeline-item__date">November 2025 (≈ 6 months ago)</div>
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
      <div class="timeline-item__date">November 2025 (≈ 6 months ago)</div>
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
      <div class="timeline-item__date">November 2025 (≈ 6 months ago)</div>
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
      <div class="timeline-item__date">December 2025 (≈ 5 months ago)</div>
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
      <div class="timeline-item__date">February 2026 (≈ 4 months ago)</div>
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
      <div class="timeline-item__date">March 2026 (≈ 3 months ago)</div>
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
      <div class="timeline-item__date">April 2026 (≈ 2 months ago)</div>
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

<!-- ── Sponsor strip ──────────────────────────────────── -->
<div class="sponsor-strip">
  <div class="sponsor-strip-stats">
    <strong>Research so far</strong>
    <div>
      <span class="stat-pill">5 papers</span>
      <span class="stat-pill">11 blog posts</span>
      <span class="stat-pill">2 pip packages</span>
      <span class="stat-pill">11 Rust crates</span>
      <span class="stat-pill">1 podcast</span>
      <span class="stat-pill">NeurIPS 2026 submitted</span>
    </div>
    <div style="margin-top:0.55rem; font-size:0.78rem;">
      Sponsor independent research on spectral vector databases and graph-based LLM operations.
    </div>
  </div>
  <div class="sponsor-strip-cta">
    <a href="https://github.com/sponsors/tuned-org-uk" target="_blank" rel="noopener noreferrer" class="sponsor-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21.593c-.425-.394-8.507-7.77-8.507-12.194C3.493 5.272 7.076 2 12 2s8.507 3.272 8.507 7.399c0 4.424-8.082 11.8-8.507 12.194z"/></svg>
      Sponsor on GitHub
    </a>
  </div>
</div>

<!-- ── Blog impact panel ───────────────────────────────── -->
<section class="blog-panel">
  <h2 class="blog-panel-title">📝 Selected Posts — Value Delivered</h2>
  <div class="blog-panel-grid">

    <a href="/posts/020_arrowspace_semantic_basins_part2" class="bp-card" style="--bp-accent:#01696f">
      <div class="bp-meta">Jun 11, 2026 · #020</div>
      <div class="bp-title">`arrowspace` for Latent Spaces — part 2</div>
      <div class="bp-metric">36 weight-role subspaces · bias 7–16% documented</div>
      <div class="bp-tags">
        <span class="bp-tag">mechanistic-interpretability</span>
        <span class="bp-tag">latent-space</span>
      </div>
      <div class="bp-readmore">Read post →</div>
    </a>

    <a href="/posts/019_arrowspace_local_minima_walkthrough" class="bp-card" style="--bp-accent:#01696f">
      <div class="bp-meta">Jun 2, 2026 · #019</div>
      <div class="bp-title">`arrowspace` for Latent Spaces — part 1</div>
      <div class="bp-metric">100% cluster purity at α=0.35</div>
      <div class="bp-tags">
        <span class="bp-tag">KDE</span>
        <span class="bp-tag">diffusion-maps</span>
        <span class="bp-tag">spectral</span>
      </div>
      <div class="bp-readmore">Read post →</div>
    </a>

    <a href="/posts/017_arrowspace_search_final_assessment" class="bp-card" style="--bp-accent:#27ae60">
      <div class="bp-meta">Mar 8, 2026 · #017</div>
      <div class="bp-title">`arrowspace` hits the spot for semantic augmented retrieval</div>
      <div class="bp-metric">cosine geometry fails at tail — MRR-Top0 validates topo-quality</div>
      <div class="bp-tags">
        <span class="bp-tag">RAG</span>
        <span class="bp-tag">evaluation</span>
        <span class="bp-tag">MRR-Top0</span>
      </div>
      <div class="bp-readmore">Read post →</div>
    </a>

    <a href="/posts/016_arrowspace_performance_results" class="bp-card" style="--bp-accent:#3498db">
      <div class="bp-meta">Feb 17, 2026 · #016</div>
      <div class="bp-title">`arrowspace`: Capabilities, speed and accuracy</div>
      <div class="bp-metric">dense CVE: high MRR/NDCG · limits on sparse Dorothea documented</div>
      <div class="bp-tags">
        <span class="bp-tag">benchmarks</span>
        <span class="bp-tag">RAG</span>
        <span class="bp-tag">spectral</span>
      </div>
      <div class="bp-readmore">Read post →</div>
    </a>

    <a href="/posts/012_topological_transformer_tauformer_domain_memory_in_attention" class="bp-card" style="--bp-accent:#db9834">
      <div class="bp-meta">Jan 5, 2026 · #012</div>
      <div class="bp-title">The Topological Transformer: Tauformer</div>
      <div class="bp-metric">~50% KV-cache savings · ~20% faster vs nanoGPT</div>
      <div class="bp-tags">
        <span class="bp-tag">transformer</span>
        <span class="bp-tag">attention</span>
        <span class="bp-tag">LLM</span>
      </div>
      <div class="bp-readmore">Read post →</div>
    </a>

    <a href="/posts/011_safer_LLMs_require_more_open_search_building_AI_memory_layer" class="bp-card" style="--bp-accent:#9b59b6">
      <div class="bp-meta">Nov 26, 2025 · #011</div>
      <div class="bp-title">Safer LLMs require open search — Building the AI Memory Layer</div>
      <div class="bp-metric">geometry-only search → hallucination accumulation</div>
      <div class="bp-tags">
        <span class="bp-tag">AI safety</span>
        <span class="bp-tag">RAG</span>
        <span class="bp-tag">hallucination</span>
      </div>
      <div class="bp-readmore">Read post →</div>
    </a>

    <a href="/posts/010_game_changer_unifying_vectors_and_features_graphs" class="bp-card" style="--bp-accent:#27ae60">
      <div class="bp-meta">Nov 12, 2025 · #010</div>
      <div class="bp-title">Why `arrowspace` is game-changing for data ops at scale</div>
      <div class="bp-metric">unified vector+graph+KV engine · biotech-scale robust</div>
      <div class="bp-tags">
        <span class="bp-tag">data engineering</span>
        <span class="bp-tag">graph</span>
        <span class="bp-tag">scale</span>
      </div>
      <div class="bp-readmore">Read post →</div>
    </a>

    <a href="/posts/009_llms_nanogpt_model_in_rust" class="bp-card" style="--bp-accent:#e74c3c">
      <div class="bp-meta">Nov 7, 2025 · #009</div>
      <div class="bp-title">Efficient GPT training: Rust-powered GPT-2 deep dive</div>
      <div class="bp-metric">RoPE · MQA · RMSNorm · Squared ReLU — full Rust impl</div>
      <div class="bp-tags">
        <span class="bp-tag">LLM</span>
        <span class="bp-tag">Rust</span>
        <span class="bp-tag">architecture</span>
      </div>
      <div class="bp-readmore">Read post →</div>
    </a>

    <a href="/posts/007_deepseek_optical_compression_rust" class="bp-card" style="--bp-accent:#f39c12">
      <div class="bp-meta">Oct 24, 2025 · #007</div>
      <div class="bp-title">DeepSeek-OCR + Energy Search in ArrowSpace v0.18.0</div>
      <div class="bp-metric">10× token reduction · NDCG@10 ≈ 0.99 · MRR=1.0</div>
      <div class="bp-tags">
        <span class="bp-tag">OCR</span>
        <span class="bp-tag">energy-search</span>
        <span class="bp-tag">benchmarks</span>
      </div>
      <div class="bp-readmore">Read post →</div>
    </a>

    <a href="/posts/005_fast_approximate_nearest_neighbours" class="bp-card" style="--bp-accent:#3498db">
      <div class="bp-meta">Oct 17, 2025 · #005</div>
      <div class="bp-title">Fast (not approximate?) Nearest Neighbours</div>
      <div class="bp-metric">v0.16.0 — among fastest open ANN algorithms</div>
      <div class="bp-tags">
        <span class="bp-tag">ANN</span>
        <span class="bp-tag">performance</span>
        <span class="bp-tag">Rust</span>
      </div>
      <div class="bp-readmore">Read post →</div>
    </a>

    <a href="/posts/001_energy_informed_db" class="bp-card" style="--bp-accent:#01696f">
      <div class="bp-meta">Oct 1, 2025 · #001</div>
      <div class="bp-title">The Next Evolution in AI Memory: Energy-Informed Vector Search</div>
      <div class="bp-metric">founding post — taumode · spectral signatures · Laplacian energy</div>
      <div class="bp-tags">
        <span class="bp-tag">vector-db</span>
        <span class="bp-tag">RAG</span>
        <span class="bp-tag">foundation</span>
      </div>
      <div class="bp-readmore">Read post →</div>
    </a>

  </div>
</section>

<!-- ── Scroll down indicator ──────────────────────────── -->
<div class="scroll-down-indicator">
  <div>Scroll down</div>
  <div class="scroll-down-indicator__arrow"></div>
</div>

<script>
document.addEventListener("DOMContentLoaded", function () {

  // ── 1. Scroll-reveal (IntersectionObserver) ────────────────
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: '0px', threshold: 0.12 }
  );
  document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));

  // ── 2. Filter toggle ───────────────────────────────────────
  const filterBtns = document.querySelectorAll('.tl-filter-btn');
  const timelineItems = document.querySelectorAll('.timeline-item[data-type]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.toggle('active', b === btn));
      timelineItems.forEach(item => {
        const match = filter === 'all' || item.dataset.type === filter;
        item.classList.toggle('tl-hidden', !match);
        if (match && !item.classList.contains('is-visible')) {
          observer.observe(item);
        }
      });
    });
  });

  // ── 3. Expand / collapse drawer ───────────────────────────
  document.querySelectorAll('.tl-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const drawer = btn.nextElementSibling;
      const isOpen = drawer.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
      btn.textContent = isOpen ? 'Hide details ↑' : 'Show details ↓';
    });
  });

});
</script>
