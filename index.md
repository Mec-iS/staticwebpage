---
title: Home
layout: default
---

<style>

.research-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(260px, 100%), 1fr));
  gap: 1.25rem;
  transition: all var(--transition);
}

.research-card {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 1.25rem 1.25rem 1rem;
  display: flex; flex-direction: column; gap: 0.5rem;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition), box-shadow var(--transition), opacity 0.25s ease;
  position: relative; overflow: hidden;
  text-decoration: none; color: inherit;
}
.research-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--card-accent, var(--color-text));
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
}
.research-card:hover::before, .research-card:focus-visible::before { transform: scaleX(1); }
.research-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
.research-card:focus-visible {
  outline: 2px solid var(--color-text);
  outline-offset: 2px;
}
.research-card.hidden {
  opacity: 0; pointer-events: none;
  transform: scale(0.97);
  display: none;
}

.card-top {
  display: flex; align-items: center; justify-content: space-between;
}
.card-badge {
  font-size: 0.68rem; font-weight: 600; letter-spacing: 0.06em;
  text-transform: uppercase; padding: 0.2rem 0.5rem;
  border-radius: var(--radius-full);
  background: color-mix(in oklch, var(--card-accent, var(--color-text)) 15%, transparent);
  color: var(--card-accent, var(--color-text));
}
.card-arrow {
  width: 20px; height: 20px; color: var(--color-text-faint);
  transition: transform var(--transition), color var(--transition);
}
.research-card:hover .card-arrow { transform: translate(3px,-3px); color: var(--card-accent, var(--color-text)); }

.card-title {
  font-size: 1.05rem; font-weight: 700;
  color: var(--color-text); line-height: 1.2;
  letter-spacing: -0.01em;
}
.card-desc {
  font-size: 0.85rem; color: var(--color-text-muted);
  line-height: 1.5; flex: 1;
}
.card-meta {
  display: flex; align-items: center; gap: 0.4rem;
  font-size: 0.72rem; color: var(--color-text-faint);
  margin-top: 0.2rem;
}
.card-meta svg { flex-shrink: 0; }

.detail-overlay {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(0,0,0,0.55); backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center; padding: 1rem;
  opacity: 0; pointer-events: none;
  transition: opacity 0.25s ease;
}
.detail-overlay.open { opacity: 1; pointer-events: auto; }
.detail-panel {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  max-width: 520px; width: 100%;
  padding: 2rem;
  box-shadow: var(--shadow-lg);
  transform: translateY(24px) scale(0.97);
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
  position: relative;
  border-top: 4px solid var(--panel-accent, var(--color-text));
}
.detail-overlay.open .detail-panel { transform: translateY(0) scale(1); }
.detail-close {
  position: absolute; top: 1rem; right: 1rem;
  background: var(--color-surface-offset); border: none;
  border-radius: var(--radius-full); width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: var(--color-text-muted);
  transition: all var(--transition);
}
.detail-close:hover { background: var(--color-border); color: var(--color-text); }
.detail-badge {
  display: inline-block;
  font-size: 0.68rem; font-weight: 600; letter-spacing: 0.06em;
  text-transform: uppercase; padding: 0.2rem 0.5rem;
  border-radius: var(--radius-full);
  background: color-mix(in oklch, var(--panel-accent, var(--color-text)) 15%, transparent);
  color: var(--panel-accent, var(--color-text));
  margin-bottom: 0.75rem;
}
.detail-title {
  font-size: 1.5rem; font-weight: 700; color: var(--color-text);
  letter-spacing: -0.02em; margin-bottom: 0.75rem;
}
.detail-desc { font-size: 0.93rem; color: var(--color-text-muted); line-height: 1.65; margin-bottom: 1.5rem; }
.detail-link {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: var(--color-text);
  color: var(--color-bg); text-decoration: none;
  padding: 0.6rem 1.25rem; border-radius: var(--radius-full);
  font-size: 0.85rem; font-weight: 600;
  transition: opacity var(--transition), transform var(--transition);
}
.detail-link:hover { opacity: 0.85; transform: translateX(2px); }

.empty-state {
  display: none; flex-direction: column; align-items: center;
  text-align: center; padding: 4rem 2rem; color: var(--color-text-muted);
  grid-column: 1 / -1;
}
.empty-state.visible { display: flex; }
.empty-state p { max-width: 30ch; margin-top: 0.5rem; font-size: 0.9rem; }

.count-label {
  text-align: center; font-size: 0.78rem;
  color: var(--color-text-faint); margin-bottom: 1rem;
  min-height: 1.2em;
}

.featured-works {
  margin: 2.5rem auto 0;
  max-width: 900px;
}

.featured-works-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.featured-works-header h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.featured-works-header p {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin: 0.4rem 0 0;
}

.featured-works-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.software-section {
  margin: 2.5rem auto 0;
  max-width: 1100px;
}

.software-section-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.software-section-header h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.software-section-header p {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin: 0.4rem 0 0;
}

.software-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(240px, 100%), 1fr));
  gap: 1rem;
}

.home-footer-links {
  margin: 2rem auto 0;
  max-width: 600px;
  text-align: center;
}

.home-footer-links + .home-footer-links {
  margin-top: 1.5rem;
}

@media (max-width: 500px) {
  body { padding: 2rem 1rem; }
  .research-grid { gap: 0.75rem; }
  .research-card { padding: 1rem; }
  .software-grid { gap: 0.75rem; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}

.media-feature {
  margin: 2.5rem auto 0;
  max-width: 1100px;
}

.media-feature-card {
  display: grid;
  grid-template-columns: 1.05fr 1.25fr;
  gap: 1.25rem;
  align-items: stretch;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  padding: 1.25rem;
  overflow: hidden;
}

.media-feature-copy {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  justify-content: center;
}

.media-feature-points {
  margin: 0;
  padding-left: 1.25rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.media-feature-links {
  margin: 0.35rem 0 0;
}

.media-frame-wrap {
  min-width: 0;
}

.media-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: calc(var(--radius-xl) - 0.25rem);
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-surface-offset);
  box-shadow: var(--shadow-sm);
}

.media-frame iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

@media (max-width: 860px) {
  .media-feature-card {
    grid-template-columns: 1fr;
  }
}
</style>

# 🌐🛰️🐍🦀 Welcome!
<p><strong class="pure-menu-item">I am Lorenzo</strong> — AI Research Engineer — I produce novel research and code leveraging Large Language Models. I focus on <strong class="pure-menu-item">workflows automation with AI Agents and code generation</strong>.</p>
<p>An example of my my research on <a href="{{ "/graph-wiring" }}">a new generation of data engineering tools.</a>. More details on <a href="https://github.com/sponsors/tuned-org-uk">Github.</a></p>


<section class="media-feature" aria-labelledby="podcast-feature-title">
  <div class="media-feature-card">
    <div class="media-feature-copy">
      <span class="card-badge">Podcast</span>
      <p class="section-subtitle">
        A podcast conversation on Graph Wiring, epiplexity, and the next generation
        of tools for machine learning and LLM operations.
      </p>

      <ul class="media-feature-points">
        <li>How Graph Wiring reframes vector datasets as feature-space manifolds.</li>
        <li>Why epiplexity matters for retrieval, curation, and model operations.</li>
        <li>Where spectral tooling can improve ML and LLM infrastructure.</li>
        <li>What is structural information and how to generate information from datasets</li>
      </ul>

      <p class="media-feature-links">
        <a
          href="https://www.youtube.com/watch?v=S5xbQXBiLs4"
          target="_blank"
          rel="noopener noreferrer"
          class="artifact-link"
        >
          Watch on YouTube <span aria-hidden="true">→</span>
        </a>
      </p>
    </div>

    <div class="media-frame-wrap">
      <div class="media-frame">
        <iframe
          src="https://www.youtube-nocookie.com/embed/S5xbQXBiLs4"
          title="Podcast appearance on Graph Wiring, epiplexity, and next-gen ML and LLM operations"
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen>
        </iframe>
      </div>
    </div>
  </div>
</section>

  <div class="empty-state" id="empty-state" role="status" aria-live="polite">
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    <p>No projects match this filter yet.</p>
  </div>
</div>

<div class="detail-overlay" id="detail-overlay" role="dialog" aria-modal="true" aria-labelledby="detail-title">
  <div class="detail-panel" id="detail-panel">
    <button class="detail-close" id="detail-close" aria-label="Close">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
    <span class="detail-badge" id="detail-badge"></span>
    <div class="detail-title" id="detail-title"></div>
    <div class="detail-desc" id="detail-desc"></div>
    <a href="#" id="detail-link" class="detail-link" target="_blank" rel="noopener noreferrer">
      Read more
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
    </a>
  </div>
</div>

<section class="featured-works" aria-labelledby="featured-title">
  <div class="featured-works-header">
    <h2 id="featured-title">Featured Research</h2>
    <p>The theoretical foundations, implementation, and empirical proof for each project.</p>
  </div>

  <div class="featured-works-grid">
    {% include triad-card.html
      title="ArrowSpace: Spectral Search For Embeddings"
      abstract="Spectral indexing for vector similarity search combining cosine similarity with graph-Laplacian roughness (λτ-indexing) to produce topology-aware similarity scores. Published in the Journal of Open Source Software."
      paper_url="https://doi.org/10.21105/joss.09002"
      source_url="https://github.com/Mec-iS/arrowspace-rs"
      benchmark_url="/graph-wiring"
      tags="vector-search"
    %}

    {% include triad-card.html
      title="Vibrational Deduction Transformer"
      abstract="A transformer architecture that reasons through vibrational (oscillatory) modes in embedding spaces, using spectral decomposition to uncover latent structure beyond static attention patterns."
      paper_url="https://github.com/tuned-org-uk/vibrational-deduction-transformer"
      source_url="https://github.com/tuned-org-uk/vibrational-deduction-transformer"
      tags="transformer"
    %}

    {% include triad-card.html
      title="Graph Wiring: Vector Analysis & Retrieval"
      abstract="A library for vector analysis, retrieval and curation using graph-wiring techniques. Explores how topological structure in embedding spaces improves retrieval quality beyond naive cosine similarity."
      paper_url="/graph-wiring"
      source_url="https://github.com/Mec-iS/arrowspace-rs"
      benchmark_url="/graph-wiring"
      tags="graph"
    %}

    {% include triad-card.html
      title="Epiplexity: Spectral Feature Interactions in Embeddings"
      abstract="Epiplexity measures spectral feature interactions in high-dimensional embedding spaces, providing a formal framework for understanding how graph Laplacian eigenstructure influences retrieval quality and manifold geometry."
      paper_url="https://www.authorea.com/doi/full/10.22541/au.177430060.02394540/v1"
      source_url="https://github.com/tuned-org-uk/graph-wiring-epiplexity"
      tags="spectral-graph"
    %}
  </div>
</section>

<section class="software-section" aria-labelledby="software-title">
  <div class="software-section-header">
    <h2 id="software-title">Software</h2>
    <p>Open-source implementations, tools, and libraries.</p>
  </div>

  <div class="software-grid" role="list">
    {% include repo-card.html
      url="https://github.com/smartcorelib/smartcore"
      name="smartcore"
      description="Comprehensive Rust ML library — statistics, clustering, regression, dimensionality reduction"
    %}

    {% include repo-card.html
      url="https://github.com/tuned-org-uk/pyarrowspace"
      name="pyarrowspace"
      description="Python bindings for the ArrowSpace spectral vector search engine"
    %}

    {% include repo-card.html
      url="https://github.com/tuned-org-uk/genegraph-storage"
      name="genegraph-storage"
      description="Graph-based storage engine for genomic data with spectral indexing"
    %}

    {% include repo-card.html
      url="https://github.com/tuned-org-uk/graph-wiring-epiplexity"
      name="graph-wiring-epiplexity"
      description="Epiplexity-based graph analysis for spectral feature interactions in vector embeddings"
    %}

    {% include repo-card.html
      url="https://github.com/tuned-org-uk/constraint-decoding-trie-static"
      name="constraint-decoding-trie-static"
      description="Static trie for constrained decoding in LLM token generation"
    %}

    {% include repo-card.html
      url="https://github.com/tuned-org-uk/deep-delta-rs"
      name="deep-delta-rs"
      description="Delta encoding and change detection for deep learning model weights"
    %}

    {% include repo-card.html
      url="https://github.com/tuned-org-uk/nanogpt-rs"
      name="nanogpt-rs"
      description="Rust implementation of GPT-2 with RoPE, MQA, RMSNorm — nanoGPT inspired"
    %}

    {% include repo-card.html
      url="https://github.com/tuned-org-uk/dspm-rs"
      name="dspm-rs"
      description="Dynamic Sequential Pattern Mining in Rust"
    %}

    {% include repo-card.html
      url="https://github.com/tuned-org-uk/titans-pytorch"
      name="titans-pytorch"
      description="PyTorch implementation of the Titans architecture for long-term memory"
    %}

    {% include repo-card.html
      url="https://github.com/tuned-org-uk/kalman_clustering"
      name="kalman_clustering"
      description="Clustering algorithm using Kalman filter dynamics for temporal data"
    %}

    {% include repo-card.html
      url="https://github.com/tuned-org-uk/topological-transformer-pygpu"
      name="topological-transformer-pygpu"
      description="GPU-accelerated topological transformer with PyTorch CUDA kernels"
    %}
  </div>
</section>

<div class="intermission"></div>

<div class="home-footer-links">
  <strong>Dig my previous research at <a href="https://pramantha.net" class="artifact-link">pramantha.net</a></strong>
</div>

<div class="home-footer-links">
<strong>Curious?</strong>
Start exploring the pages above or reach out via the Contact page for questions, collaborations, or sponsorship info!
</div>
