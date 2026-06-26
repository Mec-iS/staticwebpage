---
title: Home
layout: default
---

<style>

/* ── Cards grid ────────────────────────────────── */
.research-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(260px, 100%), 1fr));
  gap: 1.25rem;
  transition: all var(--transition);
}

/* ── Individual card ───────────────────────────── */
.research-card {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 1.4rem 1.4rem 1.2rem;
  display: flex; flex-direction: column; gap: 0.6rem;
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

/* Card top row: badge + arrow */
.card-top {
  display: flex; align-items: center; justify-content: space-between;
}
.card-badge {
  font-size: 0.68rem; font-weight: 600; letter-spacing: 0.06em;
  text-transform: uppercase; padding: 0.2rem 0.55rem;
  border-radius: var(--radius-full);
  background: color-mix(in oklch, var(--card-accent, var(--color-text)) 15%, transparent);
  color: var(--card-accent, var(--color-text));
}
.card-arrow {
  width: 20px; height: 20px; color: var(--color-text-faint);
  transition: transform var(--transition), color var(--transition);
}
.research-card:hover .card-arrow { transform: translate(3px,-3px); color: var(--card-accent, var(--color-text)); }

/* Card content */
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

/* ── Expanded detail panel (modal) ─────────────── */
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
  text-transform: uppercase; padding: 0.2rem 0.55rem;
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
  padding: 0.6rem 1.2rem; border-radius: var(--radius-full);
  font-size: 0.85rem; font-weight: 600;
  transition: opacity var(--transition), transform var(--transition);
}
.detail-link:hover { opacity: 0.85; transform: translateX(2px); }

/* ── Empty state ───────────────────────────────── */
.empty-state {
  display: none; flex-direction: column; align-items: center;
  text-align: center; padding: 4rem 2rem; color: var(--color-text-muted);
  grid-column: 1 / -1;
}
.empty-state.visible { display: flex; }
.empty-state p { max-width: 30ch; margin-top: 0.5rem; font-size: 0.9rem; }

/* ── Count label ───────────────────────────────── */
.count-label {
  text-align: center; font-size: 0.78rem;
  color: var(--color-text-faint); margin-bottom: 1rem;
  min-height: 1.2em;
}

/* ── Featured works / Triad Cards section ──────── */
.featured-works {
  margin: 2.5rem auto 0;
  max-width: 900px;
}

.featured-works-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.featured-works-header h2 {
  font-size: 1.4rem;
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

/* ── Responsive ────────────────────────────────── */
@media (max-width: 500px) {
  body { padding: 2rem 1rem; }
  .research-grid { gap: 0.9rem; }
  .research-card { padding: 1.1rem; }
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
  gap: 0.9rem;
  justify-content: center;
}

.media-feature-points {
  margin: 0;
  padding-left: 1.15rem;
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

# 👋 Welcome!
<p><strong class="pure-menu-item">I am Lorenzo</strong> — AI Research Engineer — I produce novel research and code leveraging Large Language Models. I focus on <strong class="pure-menu-item">workflows automation with AI Agents and code generation</strong>.</p>
<p>An example of my my research on <a href="{{ "/graph-wiring" }}">a new generation of data engineering tools.</a>. More details on <a href="https://github.com/sponsors/tuned-org-uk">Github.</a></p>


<section class="media-feature" aria-labelledby="podcast-feature-title">
  <div class="media-feature-card">
    <div class="media-feature-copy">
      <span class="card-badge" style="--card-accent: var(--color-text);">Podcast</span>
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


<div class="research-container">
  <h2 class="research-header">
    🔬 Explore my <span>research</span>, protocols and open-source implementations
  </h2>

  <p class="count-label" id="count-label"></p>

  <!-- Cards grid -->
  <div class="research-grid" id="research-grid" role="list">

    <a href="/graph-wiring" class="research-card"
       data-tags="vector-search,graph"
       data-accent="#0055FF"
       data-long="A library for vector analysis, retrieval and curation using graph-wiring techniques. Explores how topological structure in embedding spaces improves retrieval quality beyond naive cosine similarity."
       style="--card-accent:#0055FF"
       role="listitem" tabindex="0">
      <div class="card-top">
        <span class="card-badge">Graph</span>
        <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
      </div>
      <div class="card-title">Graph Wiring</div>
      <div class="card-desc">Vector Analysis, Retrieval and Curation</div>
      <div class="card-meta">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
        Paper · OSS
      </div>
    </a>

    <a href="/posts/012_topological_transformer_tauformer_domain_memory_in_attention" class="research-card"
       data-tags="transformer,vector-search"
       data-accent="#0055FF"
       data-long="Tauformer redefines attention using topological (spectral) signals from ArrowSpace's lambda-scoring, giving attention heads domain-aware memory that adapts to the geometry of the input distribution."
       style="--card-accent:#0055FF"
       role="listitem" tabindex="0">
      <div class="card-top">
        <span class="card-badge">Transformer</span>
        <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
      </div>
      <div class="card-title">Tauformer</div>
      <div class="card-desc">The Topological Transformer</div>
      <div class="card-meta">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
        Research · Blog
      </div>
    </a>

    <a href="/arrowspace-paper" class="research-card"
       data-tags="vector-search,graph"
       data-accent="#0055FF"
       data-long="ArrowSpace is a spectral vector database that blends cosine similarity with graph-Laplacian roughness (λτ-indexing) to produce topology-aware similarity scores, improving long-tail RAG retrieval."
       style="--card-accent:#0055FF"
       role="listitem" tabindex="0">
      <div class="card-top">
        <span class="card-badge">Vector Search</span>
        <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
      </div>
      <div class="card-title">ArrowSpace</div>
      <div class="card-desc">Vector Similarities and Graph Analysis</div>
      <div class="card-meta">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
        Paper · Rust
      </div>
    </a>

    <a href="/smartcorelib" class="research-card"
       data-tags="rust"
       data-accent="#0055FF"
       data-long="smartcore is a comprehensive Rust machine learning library covering statistics, linear algebra, clustering, classification, regression, and dimensionality reduction — all in safe, idiomatic Rust."
       style="--card-accent:#0055FF"
       role="listitem" tabindex="0">
      <div class="card-top">
        <span class="card-badge">Rust · OSS</span>
        <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
      </div>
      <div class="card-title">smartcore</div>
      <div class="card-desc">Rust ML library — statistics &amp; machine learning</div>
      <div class="card-meta">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
        Open Source
      </div>
    </a>

    <a href="/vibelang-rs" class="research-card"
       data-tags="agents,rust"
       data-accent="#0055FF"
       data-long="vibelang-rs introduces Meaning Typed Prompting — a typed prompt language for AI agents. Prompts become typed, composable functions, enabling compile-time reasoning over agent behaviour in Rust."
       style="--card-accent:#0055FF"
       role="listitem" tabindex="0">
      <div class="card-top">
        <span class="card-badge">Agents · Rust</span>
        <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
      </div>
      <div class="card-title">vibelang-rs</div>
      <div class="card-desc">Generate code for AI agents using Meaning Typed Prompting</div>
      <div class="card-meta">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
        Open Source
      </div>
    </a>

    <a href="/bmpp" class="research-card"
       data-tags="agents"
       data-accent="#0055FF"
       data-long="BMPP Agents defines a scalable protocol for multi-agent AI installations. It specifies how independent agents publish capabilities, form coalitions, and execute distributed tasks without a central orchestrator."
       style="--card-accent:#0055FF"
       role="listitem" tabindex="0">
      <div class="card-top">
        <span class="card-badge">Agents</span>
        <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
      </div>
      <div class="card-title">BMPP Agents</div>
      <div class="card-desc">Protocol &amp; scalable AI multi-agent installations</div>
      <div class="card-meta">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
        Protocol · Research
      </div>
    </a>

    <a href="/bmpp-paper" class="research-card"
       data-tags="agents"
       data-accent="#0055FF"
       data-long="The BMPP paper provides a formal mathematical definition of AI agents, their interaction grammar, and composition rules. It establishes the theoretical foundation for the BMPP protocol and multi-agent reasoning."
       style="--card-accent:#0055FF"
       role="listitem" tabindex="0">
      <div class="card-top">
        <span class="card-badge">Paper</span>
        <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
      </div>
      <div class="card-title">BMPP Paper</div>
      <div class="card-desc">Formally define AI Agents</div>
      <div class="card-meta">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
        Academic Paper
      </div>
    </a>

  </div><!-- /.research-grid -->

  <!-- Empty state (hidden until needed) -->
  <div class="empty-state" id="empty-state" role="status" aria-live="polite">
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--color-text-faint)"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    <p>No projects match this filter yet.</p>
  </div>
</div>

<!-- Detail overlay / modal -->
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
      title="Tauformer: The Topological Transformer"
      abstract="Domain-aware attention heads that use topological (spectral) signals from ArrowSpace's lambda-scoring instead of raw dot-product geometry. Enables ~50% KV-cache savings and ~20% faster per-token inference."
      paper_url="/posts/012_topological_transformer_tauformer_domain_memory_in_attention"
      source_url="https://github.com/Mec-iS/nanogpt-rs"
      benchmark_url="/posts/012_topological_transformer_tauformer_domain_memory_in_attention#benchmarks"
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
  </div>
</section>

<div class="intermission" style="min-height: 0.5em;"></div>

<div style="margin: 2em auto 0 auto; max-width: 600px; text-align: center;">
  <strong>Dig my previous research at <a href="https://pramantha.net" class="artifact-link">pramantha.net</a></strong>
</div>

<div style="margin: 1.6em auto 0 auto; max-width: 600px; text-align: center;">
<strong>Curious?</strong>
Start exploring the pages above or reach out via the Contact page for questions, collaborations, or sponsorship info!
</div>
