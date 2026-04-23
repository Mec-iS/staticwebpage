---
title: Graph Wiring
layout: timeline
---

# From ArrowSpace to Graph Wiring

## Timeline

A short chronology of how **ArrowSpace**, topology-aware evaluation and *epiplexity* experiments converged into the **Graph Wiring** framework.

<style>
/* Animation starting state */
.timeline-item {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
              transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Animation active state */
.timeline-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Add a slight delay to the dot/line appearance for a cascading effect */
.timeline-item .timeline-dot,
.timeline-item .timeline-line {
  opacity: 0;
  transition: opacity 0.5s ease-in 0.3s;
}

.timeline-item.is-visible .timeline-dot,
.timeline-item.is-visible .timeline-line {
  opacity: 1;
}
</style>

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
        <a href="https://doi.org/10.21105/joss.09002" target="_blank" rel="noopener">
          <img src="https://zenodo.org/badge/DOI/10.21105/09002.svg" alt="DOI:joss.10.21105.09002">
        </a>
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
        <a href="https://doi.org/10.36227/techrxiv.177220780.02840438/v1" target="_blank" rel="noopener">
          <img src="https://zenodo.org/badge/DOI/177220780/02840438.svg" alt="DOI:au.177220780.02840438">
        </a>
      </p>
      <ul class="timeline-item__bullets">
        <li>Generalises the ArrowSpace intuition into a <em>graph wiring</em> framework that builds discrete graphs from arbitrary vector spaces by transposing data into feature space and wiring features via nearest‑neighbour pairing.</li>
        <li>Shows that the resulting feature‑space Laplacian behaves as a discrete Laplace–Beltrami operator; minimising its Rayleigh quotient corresponds to minimising Dirichlet energy, which under conformal constraints is equivalent to constructing a discrete minimal surface (worldsheet) in feature space.</li>
        <li>Provides the theoretical foundation that ties together λ‑style indices, epiplexity interpretations, and topology‑aware metrics like MRR‑Top0 into a unified manifold‑based view of vector datasets and LLM operations.</li>
      </ul>
      <p class="timeline-item__links">
        <strong>Code:</strong>
        <a href="https://github.com/tuned-org-uk/arrowspace" target="_blank" rel="noopener">arrowspace</a>
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
        <a href="https://www.authorea.com/users/685780/articles/1397240-mrr-top0-a-topology-aware-extension-of-mean-reciprocal-rank-for-semantic-sensitive-retrieval-evaluation" target="_blank" rel="noopener">
          <img src="https://zenodo.org/badge/DOI/177430061/18235541.svg" alt="DOI:au.177430061.18235541">
        </a>
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
        <a href="https://www.authorea.com/users/685780/articles/1397239-epiplexity-and-graph-wiring-an-empirical-study-for-the-design-of-a-generic-algorithm" target="_blank" rel="noopener">
          <img src="https://zenodo.org/badge/DOI/177430060/02394540.svg" alt="DOI:au.177430060.02394540">
        </a>
      </p>
      <ul class="timeline-item__bullets">
        <li>Connects ArrowSpace's λ scores and the emerging <em>graph wiring</em> perspective to <strong>epiplexity</strong>, treating λ as a cheap proxy for how much an item deviates from the learned manifold structure.</li>
        <li>Uses MRR‑Top0 and tails‑sensitive scores (developed on the CVE benchmarks) to study how epiplexity‑weighted retrieval behaves, with a focus on tail behavior, OOD items, and active learning candidates.</li>
        <li>Empirically tests how a generic algorithm can use Laplacian‑derived λ, epiplexity, and topological quality metrics together to design spectral/topological search strategies better aligned with RAG workloads. Try it with `pip install epiplexity`</li>
      </ul>
      <p class="timeline-item__links">
        <strong>Code:</strong>
        <a href="https://github.com/tuned-org-uk/graph-wiring-epiplexity" target="_blank" rel="noopener">epiplexity and Graph Wiring</a>
        · <a href="https://github.com/tuned-org-uk/pyarrowspace/blob/af8d97b4ea20267b2bd49a1a902b8013b63a5248/tests/test_2_CVE_db.py" target="_blank" rel="noopener"><code>test_2_CVE_db.txt</code></a> and related CVE pipelines in arrowspace experiments
      </p>
    </div>
  </div>

  <!-- 2026-03-27 MLops Community Podcast -->
  <div class="timeline-item">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <div class="timeline-item__date">March 27, 2026</div>
      <h2 class="timeline-item__title">
        arrowspace: Vector Spaces and Graph Wiring
      </h2>
      <p class="timeline-item__meta">
        <strong>Interview/Podcast:</strong>
      </p>
      <div class="media-feature-card">
        <div class="media-feature-copy">
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
              class="blog-read-more"
            >
              Watch on YouTube <span aria-hidden="true">→</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- 2026-04-10 Spectral-aware IDs -->
  <div class="timeline-item">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <div class="timeline-item__date">April 10, 2026</div>
      <h2 class="timeline-item__title">
        Spectral-aware Unique Identifiers for Generative Retrieval and Vector Search
      </h2>
      <p class="timeline-item__meta">
        <strong>Paper:</strong>
        <a href="https://www.authorea.com/users/685780/articles/1400103-spectral-aware-unique-identifiers-for-generative-retrieval-and-vector-search" target="_blank" rel="noopener">
          <img src="https://zenodo.org/badge/DOI/177585107/76021942.svg" alt="DOI:au.177585107.76021942">
        </a>
      </p>
      <ul class="timeline-item__bullets">
        <li>Introduces spectral-aware unique identifiers as composite codes that pair a simple integer ID with an order key derived from taumode, aligning identifiers with the underlying spectral manifold.</li>
        <li>Shows how these IDs improve manifold consistency and interpretability compared with conventional generative retrieval identifiers, while remaining compatible with standard vector databases and RAG pipelines.</li>
        <li>Positions spectral-aware IDs as a bridge between ArrowSpace-style spectral indexing and modern generative retrieval, enabling topology-aware item addressing and routing in large vector spaces.</li>
      </ul>
    </div>
  </div>

  <!-- The Future -->
  <div class="timeline-item">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <div class="timeline-item__date">..., 2026</div>
      <h2 class="timeline-item__title">
        ...
      </h2>
    </div>
  </div>

</div>

<!-- Scroll down indicator -->
<div class="scroll-down-indicator">
  <div>Scroll down</div>
  <div class="scroll-down-indicator__arrow"></div>
</div>

<script>
document.addEventListener("DOMContentLoaded", function() {
  // Setup the Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Triggers when 15% of the item is in view
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Add the animation class if the item intersects with the viewport
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        
        // Optional: Stop observing the item once it has animated in
        // so it doesn't disappear and reappear if they scroll back up.
        observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  // Grab all timeline items and observe them
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    observer.observe(item);
  });
});
</script>