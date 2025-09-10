---
title: ArrowSpace
layout: default
css: paper-abstract
---

# ArrowSpace: Spectral Search For Embeddings and Graph Analysis

Field of application: **Search-Rank of Vectors for Scientific Applications**

# Paper

<div class="abstract-section">
       <h2>Abstract</h2>
       <div class="abstract-content">
       <p><strong>ArrowSpace</strong> is a library that implements a novel spectral indexing approach for vector
       similarity search, combining traditional semantic similarity with graph-based spectral properties. The library introduces taumode (λτ , lambda-tau) indexing, which blends Rayleigh
       quotient smoothness energy from graph Laplacians with edge-wise dispersion statistics to create bounded, comparable spectral scores. This enables similarity search that considers both semantic content and spectral characteristics of high-dimensional vector datasets.</p>
       </div>
</div>

<div>
       <h2>Briefly</h2>
       <div class="abstract-content">
       <p>Existing vector database solutions are not fine-tuned to the domain they apply to, current solutions mostly target word embeddings and use standard distance metrics (L2 distance/Euclidean, cosine and similar) or use (not very much cost-effective compared to the quality of the outcome) hashing functions. <strong>Spectral indexing</strong> allows <strong>fine-tuning vector search to the spectral signature of the domain</strong> the dataset belongs to, this enables finding associations of vectors that are not spotted by existing solutions (there is an example called `compare_cosine` in <a href="https://github.com/Mec-iS/arrowspace-rs/tree/main/examples">the repository</a>). Imagine having an LLM that can find contexts that are related but not spotted by the same LLM using a traditional search, this means the possibility of discovering alternative patterns for the same problem-solving activity or even finding previously ignored meaningful connections. This comes with a simplification of the stack, one index can synthesise the spectrum of the vector; this gives advantages in index maintenance, interpretability and explainability of the dataset. These characteristics makes spectral indexing the perfect fit for medium-large datasets that need domain-specific precision in search (reference example: proteins structure datasets, like the `proteins_lookup` example in the <a href="https://github.com/Mec-iS/arrowspace-rs/tree/main/examples">the repository</a>). In more general terms, this approach can also help overcome the theoretical limitations of single-vector search as highlighted by <a href="https://arxiv.org/pdf/2508.21038">this paper</a>.
       </p>
       </div>
</div>

<div>
       <h2>Some characteristics:</h2>
       <div class="abstract-content">
       <ul> <li> <strong>Spectral fusion:</strong> Blends Rayleigh‑quotient smoothness from graph Laplacians with edge‑wise dispersion, producing a single λτ score per item or neighborhood. Captures both content similarity and how well items fit the dataset’s structural manifold, improving retrieval of subtle, systematic patterns. </li> <li> <strong>Domain‑tuned retrieval:</strong> Fine‑tunes search to a dataset’s spectral signature, enabling discovery of associations that traditional metrics overlook in medium‑large, domain‑specific corpora. Demonstrates advantages on specialized datasets (e.g., protein structures) where semantics alone underperform. </li> <li> <strong>Bounded comparability:</strong> Produces bounded, comparable spectral scores, simplifying calibration across collections, time windows, or model updates. Supports stable re‑ranking and thresholding strategies for production pipelines. </li> <li> <strong>Simpler indexing stack:</strong> A single spectral index can synthesize structural information, reducing dependence on multiple bespoke indices or heavy hashing schemes. Lowers maintenance overhead while increasing interpretability and explainability. </li> <li> <strong>Better explainability:</strong> Graph Laplacian energy and dispersion components provide interpretable rationales for why items are retrieved together. Aids review workflows that require auditability and post‑hoc analysis. </li> <li> <strong>Practical uplift:</strong> Recovers related contexts that standard search misses, enabling alternative solution patterns and uncovering overlooked connections. Particularly effective when high precision is required under domain shift or specialized embeddings. </li> </ul>
       </div>
</div>

Read the [paper PDF](assets/2025-arrowspace.pdf).

<div class="paper-embed">
<embed src="assets/2025-arrowspace.pdf" type="application/pdf"
       style="width:100%; min-height:60vh; background:#111; border-radius:6px; box-sizing:border-box;" />
</div>

<div class="citation-box">
<strong>Cite as:</strong> Lorenzo Moriondo. ArrowSpace: Spectral Indexing of Embeddings using taumode (λτ). August 28, 2025.<br>
<strong>DOI:</strong> [To be assigned]
</div>

## Implementation

[**Explore ArrowSpace for spectral vector search.**](https://github.com/Mec-iS/arrowspace-rs/tree/main/examples)  
Unlock powerful spectral search for your vector space.