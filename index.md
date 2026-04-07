---
title: Home
layout: default
---

<style>
/* ── Design tokens ─────────────────────────────── */
:root, [data-theme="light"] {
  --color-bg:             #f7f6f2;
  --color-surface:        #f9f8f5;
  --color-surface-2:      #ffffff;
  --color-surface-offset: #f0ede8;
  --color-border:         rgba(40,37,29,0.12);
  --color-text:           #28251d;
  --color-text-muted:     #7a7974;
  --color-text-faint:     #bab9b4;
  --color-primary:        #01696f;
  --color-primary-hover:  #0c4e54;
  --shadow-sm: 0 1px 3px rgba(40,37,29,0.07);
  --shadow-md: 0 4px 16px rgba(40,37,29,0.10);
  --shadow-lg: 0 12px 36px rgba(40,37,29,0.13);
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;
  --font-body: 'Satoshi', 'Inter', sans-serif;
  --transition: 200ms cubic-bezier(0.16,1,0.3,1);
}
[data-theme="dark"] {
  --color-bg:             #141312;
  --color-surface:        #1c1b19;
  --color-surface-2:      #232220;
  --color-surface-offset: #2a2927;
  --color-border:         rgba(255,255,255,0.10);
  --color-text:           #d4d3d0;
  --color-text-muted:     #8a8987;
  --color-text-faint:     #56554f;
  --color-primary:        #4f98a3;
  --color-primary-hover:  #7bbfc8;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.25);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.35);
  --shadow-lg: 0 12px 36px rgba(0,0,0,0.45);
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: var(--font-body);
  background: var(--color-bg);
  color: var(--color-text);
  min-height: 100dvh;
  padding: 3rem 1.5rem;
  -webkit-font-smoothing: antialiased;
  transition: background var(--transition), color var(--transition);
}

/* ── Theme toggle ──────────────────────────────── */
.theme-toggle {
  position: fixed; top: 1rem; left: 1.25rem;
  background: var(--color-surface); border: 1px solid var(--color-border);
  border-radius: var(--radius-full); padding: 0.4rem 0.75rem;
  cursor: pointer; font-size: 0.8rem; color: var(--color-text-muted);
  display: flex; align-items: center; gap: 0.4rem;
  box-shadow: var(--shadow-sm); transition: all var(--transition); z-index: 100;
}
.theme-toggle:hover { color: var(--color-text); box-shadow: var(--shadow-md); }

/* ── Section header ────────────────────────────── */
.research-container { max-width: 1100px; margin: 0 auto; margin-top: 8%; }
.research-header {
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 600; color: var(--color-text);
  text-align: center; margin-bottom: 2rem;
  letter-spacing: -0.01em;
}
.research-header span { color: var(--color-primary); }

/* ── Tag filter bar ────────────────────────────── */
.filter-bar {
  display: flex; gap: 0.5rem; flex-wrap: wrap;
  justify-content: center; margin-bottom: 2rem;
}
.filter-btn {
  padding: 0.35rem 0.9rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-muted);
  font-size: 0.8rem; font-weight: 500;
  cursor: pointer; transition: all var(--transition);
  font-family: var(--font-body);
}
.filter-btn:hover { color: var(--color-text); border-color: var(--color-primary); }
.filter-btn.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

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
  background: var(--card-accent, var(--color-primary));
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
  outline: 2px solid var(--color-primary);
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
  background: color-mix(in oklch, var(--card-accent, var(--color-primary)) 15%, transparent);
  color: var(--card-accent, var(--color-primary));
}
.card-arrow {
  width: 20px; height: 20px; color: var(--color-text-faint);
  transition: transform var(--transition), color var(--transition);
}
.research-card:hover .card-arrow { transform: translate(3px,-3px); color: var(--card-accent, var(--color-primary)); }

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
  border-top: 4px solid var(--panel-accent, var(--color-primary));
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
  background: color-mix(in oklch, var(--panel-accent, var(--color-primary)) 15%, transparent);
  color: var(--panel-accent, var(--color-primary));
  margin-bottom: 0.75rem;
}
.detail-title {
  font-size: 1.5rem; font-weight: 700; color: var(--color-text);
  letter-spacing: -0.02em; margin-bottom: 0.75rem;
}
.detail-desc { font-size: 0.93rem; color: var(--color-text-muted); line-height: 1.65; margin-bottom: 1.5rem; }
.detail-link {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: var(--panel-accent, var(--color-primary));
  color: #fff; text-decoration: none;
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

.blog-container {
  margin: 3em auto 0 auto;
  max-width: 800px;
}

.blog-header {
  margin-bottom: 2em;
  color: #2c3e50;
  text-align: center;
}

.blog-posts {
  display: flex;
  flex-direction: column;
  gap: 2em;
}

.blog-post-card {
  background: white;
  padding: 2em;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-left: 4px solid #3498db;
  margin-top: 0.5em;
}

.blog-post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.blog-post-meta {
  color: #7f8c8d;
  font-size: 0.9em;
  margin-bottom: 0.5em;
}

.blog-post-title {
  margin: 0 0 0.8em 0;
  font-size: 1.6em;
  color: #2c3e50;
}

.blog-post-title a {
  text-decoration: none;
  color: inherit;
  transition: color 0.2s ease;
}

.blog-post-title a:hover {
  color: #3498db;
}

.blog-post-abstract {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1em;
}

.blog-read-more {
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.blog-read-more:hover {
  color: #2980b9;
}
</style>

# 👋 Welcome!
<p><strong class="pure-menu-item">I am Lorenzo</strong> — AI Research Engineer — I produce novel research and code leveraging Large Language Models (GPTs and LLMs). I focus on <strong class="pure-menu-item">workflows automation with AI Agents and code generation</strong>.</p>
<p>An example of my my research on <a href="{{ "/graph-wiring" }}">a new generation of data engineering tools.</a>.</p>

<div class="research-container">
  <button class="theme-toggle" data-theme-toggle aria-label="Toggle theme">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
    Theme
  </button>
  <h2 class="research-header">
    🔬 Explore my <span>research</span>, protocols and open-source implementations
  </h2>

  <!-- Tag filter bar -->
  <div class="filter-bar" role="group" aria-label="Filter research by topic">
    <button class="filter-btn active" data-tag="all">All</button>
    <button class="filter-btn" data-tag="vector-search">Vector Search</button>
    <button class="filter-btn" data-tag="graph">Graph</button>
    <button class="filter-btn" data-tag="transformer">Transformer</button>
    <button class="filter-btn" data-tag="agents">Agents</button>
    <button class="filter-btn" data-tag="rust">Rust / OSS</button>
  </div>

  <p class="count-label" id="count-label"></p>

  <!-- Cards grid -->
  <div class="research-grid" id="research-grid" role="list">

    <a href="/graph-wiring" class="research-card"
       data-tags="vector-search,graph"
       data-accent="#27ae60"
       data-long="A library for vector analysis, retrieval and curation using graph-wiring techniques. Explores how topological structure in embedding spaces improves retrieval quality beyond naive cosine similarity."
       style="--card-accent:#27ae60"
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
       data-accent="#db9834"
       data-long="Tauformer redefines attention using topological (spectral) signals from ArrowSpace's lambda-scoring, giving attention heads domain-aware memory that adapts to the geometry of the input distribution."
       style="--card-accent:#db9834"
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
       data-accent="#3498db"
       data-long="ArrowSpace is a spectral vector database that blends cosine similarity with graph-Laplacian roughness (λτ-indexing) to produce topology-aware similarity scores, improving long-tail RAG retrieval."
       style="--card-accent:#3498db"
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
       data-accent="#e74c3c"
       data-long="smartcore is a comprehensive Rust machine learning library covering statistics, linear algebra, clustering, classification, regression, and dimensionality reduction — all in safe, idiomatic Rust."
       style="--card-accent:#e74c3c"
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
       data-accent="#f39c12"
       data-long="vibelang-rs introduces Meaning Typed Prompting — a typed prompt language for AI agents. Prompts become typed, composable functions, enabling compile-time reasoning over agent behaviour in Rust."
       style="--card-accent:#f39c12"
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
       data-accent="#9b59b6"
       data-long="BMPP Agents defines a scalable protocol for multi-agent AI installations. It specifies how independent agents publish capabilities, form coalitions, and execute distributed tasks without a central orchestrator."
       style="--card-accent:#9b59b6"
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
       data-accent="#27ae60"
       data-long="The BMPP paper provides a formal mathematical definition of AI agents, their interaction grammar, and composition rules. It establishes the theoretical foundation for the BMPP protocol and multi-agent reasoning."
       style="--card-accent:#27ae60"
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

<div class="blog-container">
  <div class="blog-header">
    <h2>📝 Selected Posts</h2>
  </div>

  <div class="blog-posts">
<!-- Blog Post 18: ArrowSpace using 1024-dimensional embeddings -->
<article class="blog-post-card">
    <div class="blog-post-meta">March 8, 2026</div>
    <h2 class="blog-post-title">
        <a href="/posts/018_arrowspace_and_higher_dimensions_embeddings">
            `arrowspace` tested with the new 1024-dim embeddings
        </a>
    </h2>
    <div class="blog-post-abstract">
        <p>Compare 384-dim embeddings with the new 1024-dim embeddings</p>
        <ul>
            <li>Comparative advantages of spectral indexing</li>
            <li>Improvements for cosine</li>
            <li>estimation of increased costs for 1024-dim embeddings</li>
        </ul>
    </div>
    <a href="/posts/018_arrowspace_and_higher_dimensions_embeddings" class="blog-read-more">Read more →</a>
</article> 

<!-- Blog Post 17: ArrowSpace hits the spot for semantic augmented retrieval -->
<article class="blog-post-card">
    <div class="blog-post-meta">March 8, 2026</div>
    <h2 class="blog-post-title">
        <a href="/posts/017_arrowspace_search_final_assessment">
            `arrowspace` hits the spot for semantic augmented retrieval
        </a>
    </h2>
    <div class="blog-post-abstract">
        <p><strong>Testing</strong> all aspect of Graph Wiring on semantic data.</p>
        <ul>
            <li>Why geometry fails in retrieval</li>
            <li>Measuring the win: MRR‑Top0</li>
            <li>`arrowspace` can relevantly improve RAG systems</li>
        </ul>
    </div>
    <a href="/posts/017_arrowspace_search_final_assessment" class="blog-read-more">Read more →</a>
</article>  

<!-- Blog Post 16: Capabilities, speed and accuracy -->
<article class="blog-post-card">
    <div class="blog-post-meta">February 17, 2026</div>
    <h2 class="blog-post-title">
        <a href="/posts/016_arrowspace_performance_results">
            `arrowspace`: Capabilities, speed and accuracy
        </a>
    </h2>
    <div class="blog-post-abstract">
        <p><strong>Testing</strong> all aspect of Graph Wiring on semantic data.</p>
        <ul>
            <li>How fast is `arrowspace`</li>
            <li>How accurate is `arrowspace`</li>
            <li>`arrowspace` can relevantly improve RAG systems</li>
        </ul>
    </div>
    <a href="/posts/016_arrowspace_performance_results" class="blog-read-more">Read more →</a>
</article>

<!-- Blog Post 12: Tauformer / Topological Transformer -->
<article class="blog-post-card">
    <div class="blog-post-meta">January 5, 2026</div>
    <h2 class="blog-post-title">
    <a href="/posts/012_topological_transformer_tauformer_domain_memory_in_attention">The Topological Transformer: Tauformer (domain-memory and faster attention)</a></h2>
    <div class="blog-post-abstract">
        <p><strong>Domain memory</strong> injected directly inside self-attention via a persistent Graph Laplacian (distilled knowledge graphs with <code>arrowspace</code>).</p>
        <ul>
            <li>Replaces the dot-product attention kernel with a topology-aware scalar signal (taumode / λ-distance), so attention is driven by distances in a domain manifold rather than raw geometry.</li>
            <li>Targets scaling pain points: ~50% KV-cache savings (values + λ<sub>k</sub> instead of K+V) and ~20% faster time-per-token vs a nanoGPT baseline in the reported benchmarks.</li>
        </ul>
    </div>
    <a href="/posts/012_topological_transformer_tauformer_domain_memory_in_attention" class="blog-read-more">Read more →</a>
</article>

<!-- Blog Post 11: Safer Is a More Open Search -->
<article class="blog-post-card">
    <div class="blog-post-meta">November 26, 2025</div>
    <h2 class="blog-post-title">
    <a href="/posts/011_safer_LLMs_require_more_open_search_building_AI_memory_layer">Safer LLMS require open search - Building the AI Memory Layer</a></h2>
    <div class="blog-post-abstract">
        <p><strong>AI safety</strong> through topology‑aware, energy‑informed retrieval that separates stable facts from risky intuitions.</p>
        <ul>
            <li>Shows how geometry‑only vector search and semantic caching accumulate retrieval errors, turning context drift into subtle hallucinations.</li>
            <li>Introduces arrowspace as an “open search” layer where graph Laplacians, energy dispersion, and topology‑quality scores expose and constrain off‑manifold results instead of hiding them inside black‑box similarity.</li>
        </ul>
    </div>
    <a href="/posts/011_safer_LLMs_require_more_open_search_building_AI_memory_layer" class="blog-read-more">Read more →</a>
</article>
  
<!-- Blog Post 10: Why `arrowspace` is game-changing for data operations at scale -->
<article class="blog-post-card">
    <div class="blog-post-meta">November 12, 2025</div>
    <h2 class="blog-post-title"> 
    <a href="/posts/010_game_changer_unifying_vectors_and_features_graphs">Why <code>arrowspace</code> is game-changing for data operations at scale</a></h2>
    <div class="blog-post-abstract"> <p><strong>Test‑bed milestone</strong> for a unified vector, graph, and key‑value engine built on spectral indexing and energy‑informed search. <ul> <li>Turns any dataset into a features graph, enabling manifold‑aware search, matching, ranking, and dataset characterization at any lifecycle stage.</li> <li>Designed for high dimensions by default: robust on biotech‑scale sequences, large vocabularies, and model‑sized embedding spaces.</li> </ul></p> </div>
    <a href="/posts/010_game_changer_unifying_vectors_and_features_graphs" class="blog-read-more">Read more →</a>
</article>

  <!-- Blog Post 9: NanoGPT: A deep dive into the architecture of a Rust-powered GPT-2 -->
  <article class="blog-post-card">
      <div class="blog-post-meta">November 07, 2025</div>
      <h2 class="blog-post-title">
      <a href="/posts/009_llms_nanogpt_model_in_rust">Efficient GPT training: a dive into the architecture of a Rust-powered GPT-2</a></h2>
      <div class="blog-post-abstract">
          <p><strong>Deep Dive</strong> into a Rust implementation of a decoder-only transformer inspired by Karpathy's nanochat. <ul> <li>Breaks down the architecture of a modern LLM, explaining the role of key components for an experienced audience.</li><li>Covers modern techniques such as Rotary Position Embeddings (RoPE), Multi-Query Attention (MQA), RMSNorm, and the use of a Squared ReLU in the MLP.</li></ul></p>
      </div>
      <a href="/posts/009_llms_nanogpt_model_in_rust" class="blog-read-more">Read more →</a>
  </article>

  <article class="blog-post-card">
      <div class="blog-post-meta">October 24, 2025</div> 
      <h2 class="blog-post-title"> 
      <a href="/posts/007_deepseek_optical_compression_rust">DeepSeek-OCR Optical Compression Meets Energy Search: Rust Implementation in ArrowSpace v0.18.0</a></h2>
      <div class="blog-post-abstract">
          <p>Rust implementation of DeepSeek-OCR compression achieves 10× token reduction, while ArrowSpace v0.18.0 introduces energy-informed retrieval that replaces cosine similarity with spectral graph properties.<ul> <li>DeepEncoder architecture (SAM + CLIP + projector) replicated in Rust using burn.dev with cross-platform GPU support and five resolution modes from 64 to 400 tokens.</li><li>Energy search with diffusion parameter sweep on CVE corpus achieves NDCG@10 ≈ 0.99 (η=0.05, steps=6) and MRR=1.0 (η=0.05, steps=4) without any cosine similarity.</li></ul></p>
      </div>
      <a href="/posts/007_deepseek_optical_compression_rust" class="blog-read-more">Read more →</a>
  </article>

  <!-- Blog Post 5: Fast Nearest Neighbours -->
  <article class="blog-post-card">
      <div class="blog-post-meta">October 17, 2025</div> 
      <h2 class="blog-post-title"> 
      <a href="/posts/005_fast_approximate_nearest_neighbours">Fast (not approximate?) Nearest Neighbours</a></h2>
      <div class="blog-post-abstract">
          <p>Version 0.16.0 is out with quite relevant news and encouraging results for `arrowspace` to be <strong>one of the fastest approximate nearest neighbours algorithm available in the open</strong>.</p>
      </div>
      <a href="/posts/005_fast_approximate_nearest_neighbours" class="blog-read-more">Read more →</a>
  </article>

  <!-- Blog Post 1: Energy-Informed Vector Search -->
  <article class="blog-post-card">
    <div class="blog-post-meta">October 1, 2025</div>
    <h2 class="blog-post-title">
      <a href="/posts/001_energy_informed_db">The Next Evolution in AI Memory: Energy-Informed Vector Search</a>
    </h2>
    <div class="blog-post-abstract">
      <p>Vector databases have become the backbone of modern AI workflows, particularly in RAG systems. But traditional approaches are fundamentally limited—they miss the deeper structural patterns that define how information relates within domains. Discover how ArrowSpace introduces energy-informed indexing through taumode, enabling AI systems with memory that truly understands domain contexts through spectral signatures and graph Laplacian energy.</p>
    </div>
    <a href="/posts/001_energy_informed_db" class="blog-read-more">Read more →</a>
  </article>
  </div>
</div>

<div class="intermission" style="min-height: 0.5em;"></div>

<div style="margin: 2em auto 0 auto; max-width: 600px; text-align: center;">
  <strong>Dig my previous research at <a href="https://pramantha.net">pramantha.net</a></strong>
</div>

<div style="margin: 1.6em auto 0 auto; max-width: 600px; text-align: center;">
<strong>Curious?</strong> 
Start exploring the pages above or reach out via the Contact page for questions, collaborations, or sponsorship info!
</div>

<script>
/* ── Theme toggle ─────────────────────────────── */
(function(){
  const toggle = document.querySelector('[data-theme-toggle]');
  const html = document.documentElement;
  let theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  html.setAttribute('data-theme', theme);
  toggle.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', theme);
    toggle.querySelector('svg').innerHTML = theme === 'dark'
      ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
      : '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
  });
})();

/* ── Filter logic ─────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const cards      = document.querySelectorAll('.research-card');
const countLabel = document.getElementById('count-label');
const emptyState = document.getElementById('empty-state');

function applyFilter(tag) {
  let visible = 0;
  cards.forEach(card => {
    const tags = card.dataset.tags.split(',');
    const show = tag === 'all' || tags.includes(tag);
    if (show) {
      card.classList.remove('hidden');
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });
  countLabel.textContent = tag === 'all'
    ? `${visible} projects`
    : `${visible} project${visible !== 1 ? 's' : ''} · ${tag}`;
  emptyState.classList.toggle('visible', visible === 0);
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.tag);
  });
});
applyFilter('all');

/* ── Detail modal ─────────────────────────────── */
const overlay    = document.getElementById('detail-overlay');
const panel      = document.getElementById('detail-panel');
const closeBtn   = document.getElementById('detail-close');
const detailBadge= document.getElementById('detail-badge');
const detailTitle= document.getElementById('detail-title');
const detailDesc = document.getElementById('detail-desc');
const detailLink = document.getElementById('detail-link');

function openDetail(card) {
  const accent = card.dataset.accent || 'var(--color-primary)';
  panel.style.setProperty('--panel-accent', accent);
  detailBadge.style.setProperty('--panel-accent', accent);
  detailBadge.textContent = card.querySelector('.card-badge').textContent;
  detailTitle.textContent = card.querySelector('.card-title').textContent;
  detailDesc.textContent  = card.dataset.long || card.querySelector('.card-desc').textContent;
  detailLink.href         = card.href;
  overlay.classList.add('open');
  closeBtn.focus();
  document.body.style.overflow = 'hidden';
}

function closeDetail() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Click cards to open modal (prevent default navigation — open modal instead)
cards.forEach(card => {
  card.addEventListener('click', e => {
    e.preventDefault();
    openDetail(card);
  });
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDetail(card); }
  });
});

closeBtn.addEventListener('click', closeDetail);
overlay.addEventListener('click', e => { if (e.target === overlay) closeDetail(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeDetail(); });
</script>
