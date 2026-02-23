---
title: Graph Wiring
layout: default
css: paper-abstract
---
# Graph Wiring

## Fields of application

* Vector database and retrieval
* Training data curation for LLMs
* Online supervision and safety
* Structural and mechanistic analysis of embedding models / LLMs
* Spectral/topological search supervision

# Paper

Read the [paper PDF](https://github.com/tuned-org-uk/graph-wiring-paper/blob/main/graph_wiring.pdf).

<div class="abstract-section">
<h2>Abstract</h2>
<div class="abstract-content">
<p> *Graph wiring* builds discrete graphs from arbitrary vector spaces, leveraging Laplacians for search, partitioning, and topological analysis. **This new technique enables faster, semantic-aware exploration of datasets and latent spaces** in LLMs and embedding models. Starting from any vector space, it is based on transposing any matrix into feature space and constructing a wiring graph via nearest-neighbour pairing. I show that the resulting graph Laplacian acts as a discrete Laplace–Beltrami operator and that, minimising its Rayleigh quotient, the core operation is equivalent to minimising the Dirichlet energy of the feature manifold. Under specific metric constraints (conformal gauge), this Dirichlet minimisation is mathematically equivalent to area minimisation, implying that *graph wiring* implementations effectively construct a discrete minimal surface (or worldsheet) in feature space.</p>
<p>This result establishes a bridge between surface-optimisation principles in physical networks — where minimal surfaces map to string-theoretic worldsheets — and spectral graph algorithms. I develop this theoretical foundation, demonstrating how the synthetic λ_τ index acts as a probe of this worldsheet geometry, and show that invariants of the wired graph enable advanced operations on high-dimensional data unavailable to purely geometric methods.</p>

<p>The technique and its performance (no reliance on O(N²) computations) as an approximating algorithm opens the door to **next-generation methods and tools to analyse, measure, operate, and supervise large high-dimensional collections** of vectors such as LLM model weights. Implementations are presented in the `arrowspace` and `surfface` codebases.</p>
</div>
</div>



<div class="citation-box">
DOI under assignment
</div>

<embed src="assets/graph_wiring.pdf" type="application/pdf"
       style="width:100%; min-height:60vh; background:#111; border-radius:6px; box-sizing:border-box;" />