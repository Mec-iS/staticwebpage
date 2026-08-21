---
title: Home
layout: default
---

<style>

/* ── hero ─────────────────────────────────────────────── */

.home-hero {
  margin: 3rem 0 4rem;
  max-width: none;
  text-align: left;
}
.hero-kicker {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent-amber-ink);
  margin: 0 0 1rem;
}
.home-hero h1 {
  font-size: clamp(2.5rem, 6vw, 3.75rem);
  font-weight: 750;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 0 0 1rem;
  color: var(--color-text);
}
.hero-lead {
  font-size: clamp(1.08rem, 2vw, 1.28rem);
  color: var(--color-text-muted);
  line-height: 1.55;
  max-width: 58ch;
  margin: 0 0 1.75rem;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}
.hero-actions a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.65rem 1.2rem;
  border-radius: var(--radius-md);
  font-size: 0.98rem;
  font-weight: 600;
  text-decoration: none;
  transition: background var(--transition), border-color var(--transition), color var(--transition);
}
a.btn-primary {
  background: var(--color-accent-amber);
  color: #17110a;
  border: 1px solid var(--color-accent-amber);
}
a.btn-primary:hover {
  background: #ffc477;
  border-color: #ffc477;
  color: #17110a;
}
a.btn-ghost {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
a.btn-ghost:hover {
  border-color: var(--color-text-muted);
}

/* ── section headers ──────────────────────────────────── */

.featured-works {
  margin: 0 auto;
  max-width: none;
}
.featured-works-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  text-align: left;
  margin-bottom: 1.75rem;
}
.featured-kicker {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent-amber-ink);
  margin: 0 0 0.5rem;
}
.featured-works-header h2 {
  font-size: 1.65rem;
  font-weight: 750;
  letter-spacing: -0.015em;
  color: var(--color-text);
  margin: 0;
}
.featured-works-header p {
  font-size: 0.92rem;
  color: var(--color-text-muted);
  margin: 0;
  max-width: 34ch;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
}
.featured-grid .triad-card:first-child {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 0.9fr);
  gap: 2rem;
  align-items: center;
  padding: clamp(1.75rem, 3.5vw, 2.5rem);
}
.featured-grid .triad-card:first-child .triad-card__title {
  font-size: clamp(1.45rem, 2.6vw, 1.85rem);
  letter-spacing: -0.02em;
}
.featured-grid .triad-card:first-child .triad-card__abstract {
  font-size: 1rem;
  max-width: 60ch;
}

@media (max-width: 860px) {
  .featured-grid {
    grid-template-columns: 1fr;
  }
  .featured-grid .triad-card:first-child {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  .featured-works-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

/* ── shared badge ─────────────────────────────────────── */

.card-badge {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-full);
  background: color-mix(in srgb, #ffb454 16%, transparent);
  color: var(--color-accent-amber-ink);
  width: fit-content;
}

/* ── podcast band (inverted) ──────────────────────────── */

.media-feature {
  --band-text: #e8eef1;
  --band-muted: #9db0b8;
  margin: 4.5rem auto 0;
  max-width: none;
  background: #10151b;
  color: var(--band-text);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  padding: clamp(1.75rem, 4vw, 2.75rem);
}
.media-feature-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: clamp(1.5rem, 3.5vw, 2.75rem);
  align-items: center;
  background: none;
  border: none;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  overflow: visible;
}
.media-feature .card-badge {
  background: rgba(255, 180, 84, 0.14);
  color: #ffb454;
  margin-bottom: 0.75rem;
}
.media-feature .section-subtitle {
  color: var(--band-text);
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.01em;
  margin: 0 0 0.75rem;
  max-width: 44ch;
}
.media-feature-points {
  margin: 0;
  padding-left: 1.25rem;
  color: var(--band-muted);
  line-height: 1.65;
  font-size: 0.95rem;
}
.media-feature-links {
  margin: 1.25rem 0 0;
}
.media-feature-links a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: var(--band-text);
  font-weight: 600;
  font-size: 0.93rem;
  text-decoration: none;
  transition: border-color var(--transition), color var(--transition);
}
.media-feature-links a:hover {
  border-color: #ffb454;
  color: #ffb454;
}
.media-frame-wrap {
  min-width: 0;
}
.media-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: calc(var(--radius-lg) - 0.25rem);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: #0b0f13;
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

/* ── book banner ──────────────────────────────────────── */

.book-promo {
  margin: 1.5rem auto 0;
  max-width: none;
}
.book-promo-card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 1.5rem;
  align-items: center;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.25rem 1.5rem;
}
.book-promo-copy {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.book-promo-copy h2 {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
  line-height: 1.3;
}
.book-promo-copy p {
  color: var(--color-text-muted);
  line-height: 1.55;
  font-size: 0.92rem;
  margin: 0;
  max-width: 64ch;
}
.book-promo-cta {
  white-space: nowrap;
  font-weight: 600;
  font-size: 0.93rem;
  text-decoration-color: transparent;
}
.book-promo-cover {
  width: 84px;
  height: auto;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
}
@media (max-width: 720px) {
  .book-promo-card {
    grid-template-columns: 1fr;
  }
  .book-promo-cover {
    max-width: 96px;
  }
}

/* ── misc ─────────────────────────────────────────────── */

@media (max-width: 500px) {
  body { padding: 2rem 1rem; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>

<div class="home-hero">
  <p class="hero-kicker">AI Research Engineering &middot; London</p>
  <h1>Lorenzo Moriondo</h1>
  <p class="hero-lead">I build graph-wiring methods, spectral vector search, and agentic code-generation workflows &mdash; and ship them as open-source Rust and Python.</p>
  <div class="hero-actions">
    <a href="https://tuned-org-uk.github.io/" class="btn-primary" target="_blank" rel="noopener">Explore the research</a>
    <a href="https://github.com/tuned-org-uk" class="btn-ghost" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">&nearr;</span></a>
  </div>
</div>

<section class="featured-works" aria-labelledby="featured-title">
  <div class="featured-works-header">
    <div>
      <p class="featured-kicker">Selected work</p>
      <h2 id="featured-title">Featured Research</h2>
    </div>
    <p>The theoretical foundations, implementation, and empirical proof for each project.</p>
  </div>

  <div class="featured-grid">
    {% include triad-card.html
      title="ALD-SC: A Spectral Latent Diffusion Model"
      abstract="A spectral latent diffusion model where decoding runs on the feature-space manifold defined by a frozen ArrowSpace graph Laplacian. A graph-structured decoder replaces unconstrained convolutions with propagation along the Laplacian's smooth eigenvectors, gated by a Barontini entropic clock that terminates sampling intrinsically."
      paper_url="https://doi.org/10.5281/zenodo.21456829"
      source_url="https://github.com/tuned-org-uk/arrowspace-latent-diffusion"
      tags="latent-diffusion arrowspace spectral"
    %}

    {% include triad-card.html
      title="ArrowSpace: Spectral Search For Embeddings"
      abstract="Spectral indexing for vector similarity search combining cosine similarity with graph-Laplacian roughness (&lambda;&tau;-indexing) to produce topology-aware similarity scores. Published in the Journal of Open Source Software."
      paper_url="https://doi.org/10.21105/joss.09002"
      source_url="https://github.com/Mec-iS/arrowspace-rs"
      benchmark_url="/graph-wiring#panel-2"
      tags="vector-search"
    %}

    {% include triad-card.html
      title="Vibrational Deduction Transformer"
      abstract="A transformer architecture that reasons through vibrational (oscillatory) modes in embedding spaces, using spectral decomposition to uncover latent structure beyond static attention patterns."
      paper_url="https://doi.org/10.5281/zenodo.20816835"
      source_url="https://github.com/tuned-org-uk/vibrational-deduction-transformer"
      tags="transformer"
    %}

    {% include triad-card.html
      title="Graph Wiring: Vector Analysis &amp; Retrieval"
      abstract="A library for vector analysis, retrieval and curation using graph-wiring techniques. Explores how topological structure in embedding spaces improves retrieval quality beyond naive cosine similarity."
      paper_url="/graph-wiring#panel-1"
      source_url="https://github.com/Mec-iS/arrowspace-rs"
      benchmark_url="/graph-wiring#panel-2"
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

<section class="media-feature" aria-labelledby="podcast-feature-title">
  <div class="media-feature-card">
    <div class="media-feature-copy">
      <span class="card-badge">Podcast</span>
      <p class="section-subtitle" id="podcast-feature-title">
        Graph Wiring, epiplexity, and the next generation of tools for machine learning and LLM operations.
      </p>

      <ul class="media-feature-points">
        <li>How Graph Wiring reframes vector datasets as feature-space manifolds.</li>
        <li>Why epiplexity matters for retrieval, curation, and model operations.</li>
        <li>Where spectral tooling can improve ML and LLM infrastructure.</li>
        <li>What structural information is, and how to generate it from datasets.</li>
      </ul>

      <p class="media-feature-links">
        <a
          href="https://www.youtube.com/watch?v=S5xbQXBiLs4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch on YouTube <span aria-hidden="true">&nearr;</span>
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

<section class="book-promo" aria-labelledby="book-promo-title">
  <div class="book-promo-card">
    <img class="book-promo-cover" src="/assets/book_cover.png" alt="Book cover: Human-Machine Search: Synthetic Intelligence" width="200" height="300">
    <div class="book-promo-copy">
      <span class="card-badge">New Book</span>
      <h2 id="book-promo-title">Human-Machine Search: Synthetic Intelligence</h2>
      <p>A philosophical and personal journey from information technology to AI, tracing the shift from Big Data through Machine Learning to Large Language Models.</p>
    </div>
    <a href="/book" class="book-promo-cta artifact-link">Read more <span aria-hidden="true">&rarr;</span></a>
  </div>
</section>
