---
title: references
layout: blog_default
---

# Research Papers in Vector Search & AI Systems

Field of application: **Vector Databases, Spectral Methods, and Agentic AI**

A curated collection of foundational and emerging papers that inform the design and implementation of `arrowspace`, optical compression, and next-generation retrieval systems.

---
## Graph-based Vector Search

### Paper: Graph-Based Vector Search: An Experimental Evaluation of the State-of-the-Art

Authors: Ilias Azizi, Karima Echihabi, Themis Palpanas, Vassilis Christophides.​
Link: https://openreview.net/pdf?id=ALnwJjieOi​

Comprehensive experimental evaluation of twelve state‑of‑the‑art graph‑based ANN vector search methods on up to billion‑scale datasets; identification of incremental insertion plus neighborhood diversification as the most effective current paradigm; analysis of how base‑graph design impacts scalability and search quality; and articulation of open directions, especially more data‑adaptive seed selection and diversification strategies for future vector search systems

Key contributions: the paper highlights limitations: quality–latency tradeoffs, sensitivity to choice of base graph, lack of sophisticated data‑adaptive diversification, and open needs for more adaptive, structure‑aware strategies to build and traverse graphs.

#### What arrowspace can bring to the table

* Spectral re‑ranking layer: `arrowspace` can take any of these graph indices as a base and add a per‑vector spectral score (taumode) derived from a Laplacian over the dataset, allowing re‑ranking of graph‑returned candidates by both cosine distance and spectral smoothness, which targets systemically relevant but geometrically “outlier” neighbours the surveyed methods may miss.​​
* Data‑adaptive diversification: Instead of purely local degree or heuristic pruning, diversification can be guided by differences in spectral scores and eigenstructure, encouraging candidate sets that span distinct spectral modes of the dataset manifold, directly addressing the paper’s call for more data‑adaptive diversification strategies.​​
* Better seed selection: Seed nodes for graph search can be chosen using spectral signatures (e.g., low‑energy, “central” signals or high‑energy, “boundary” signals), making initial entry points more robust to embedding drifts and cluster imbalances than purely metric‑based seeds discussed in the evaluation.​
* Multi‑vector and subvector search: ArrowSpace’s ability to index subvectors and aggregate spectral scores per item gives a principled route to multi‑vector queries on top of the existing graph methods, which the evaluated algorithms largely treat as single‑query problems.

### Paper: A Quantitative Analysis and Performance Study for Similarity-Search Methods in High-Dimensional Spaces
Authors: Roger Weber, Hans-J. Schek, Stephen Blott

Foundational analysis of similarity search in high-dimensional vector spaces, proving that tree- and partition-based indexes (R*-tree, X-tree, etc.) degrade to linear scan as dimensionality grows and introducing the VA-file as an approximation-based layout that makes this unavoidable scan as efficient as possible. This connects to arrowspace by precisely characterizing the “dimensionality curse” that spectral indexing aims to escape, suggesting that instead of fighting geometric sparsity with ever more complex trees, one should change the representation (e.g., spectral graph + taumode) so that similarity is no longer driven solely by fragile high‑d metric properties.​

Key contributions: Formal cost model and lower bounds for high‑dimensional nearest neighbor search, empirical demonstration that classic multidimensional indexes are outperformed by sequential scan beyond ~10–20 dimensions, and proposal of the VA‑file as a practical, approximation‑based alternative for similarity search in HDVSs.

#### What arrowspace can bring to the table

`arrowspace` complements this paper by attacking the dimensionality curse at the signal and graph level instead of only in the raw metric space, so it can keep using simple approximate indexes (including VA‑like layouts) while prioritizing candidates that are structurally meaningful in very high dimensions.

Spectral rather than purely geometric structure: `arrowspace` first builds a graph Laplacian over items (using approximate k‑NN plus random projection if needed), then computes per‑feature Rayleigh energies that reflect how smoothly each signal varies over that graph, capturing a low‑dimensional spectral structure even when the original embedding dimension is large.​

#### How `arrowspace` sidesteps the curse of dimensionality

- Spectral rather than purely geometric structure: `arrowspace` first builds a graph Laplacian over items (using approximate k‑NN plus random projection if needed), then computes per‑feature Rayleigh energies that reflect how smoothly each signal varies over that graph, capturing a low‑dimensional spectral structure even when the original embedding dimension is large.
- Bounded taumode score as a second axis: These Rayleigh energies are transformed into a bounded, comparable scalar $$\lambda_\tau$$ per feature (taumode), and per‑item scores can be aggregated, so search is performed in a joint space “cosine distance × spectral roughness” instead of only Euclidean/cosine distance in $$d$$ dimensions, which reduces reliance on fragile high‑dimensional metric properties highlighted by Weber et al.
- Compatible with VA‑style layouts: Because `arrowspace` stores dense arrays plus a single extra scalar per row and does not require storing the full graph at query time, it can be overlaid on VA‑file‑like or HNSW‑like approximate indices: the coarse approximate index prunes by geometry, while `arrowspace` re‑ranks and filters by spectral score, effectively using high $$d$$ only once at index‑build time rather than repeatedly at query time.
- Targeting non‑uniform, structured data: The Weber–Schek–Blott analysis assumes uniform, independent dimensions; `arrowspace` explicitly exploits non‑uniformity (clusters and manifolds) via the Laplacian, so the “everything degenerates to a scan” result no longer applies in the same way for real‑world structured datasets where spectral energies concentrate in a few modes.


#### `arrowspace` improvements vs. VA‑file and trees

- Where VA‑file speeds up the *inevitable scan* in high $$d$$, `arrowspace` reduces *how much of the dataset is relevant* by focusing on spectrally consistent neighbours, so for a fixed approximate index (tree, graph, or VA‑style), fewer candidates need full scoring to reach useful recall.
- Tree and partition indexes degrade because their bounding regions expand in effective volume at high $$d$$; `arrowspace` instead builds its main discriminative signal (taumode) from a sparse graph on items, whose complexity depends on the number of items and local k‑NN degrees, not directly on the original feature dimension after optional random projection.
- In practice, this means: keep simple approximate indexing (including VA‑like) for coarse filtering, and let ArrowSpace’s spectral index handle fine‑grained selection and ranking, turning the “curse” into a manageable one‑off preprocessing cost rather than a per‑query explosion.

### Paper: Leveraging Graph Dimensions in Online Graph Search
Authors:  Zhu, Yu, Qin

Propose a distance- and structure-preserving (DS-preserved) mapping that automatically selects a small set of informative subgraphs as dimensions, enabling fast top‑k similarity search over large graph databases without expensive NP-hard operations.

#### Core conceptual link
The paper learns a graph dimension: a small set of subgraphs that become coordinates of a multidimensional space, so that distances in that space approximate graph edit/MCS distances while preserving query‑time structure.
​
`arrowspace` builds a spectral index over an embedding matrix, using Laplacian‑based structure to define a space where similarity scores (λτ) reflect both content and dataset topology, not just raw cosine geometry.

---
## Graph Embeddings

### Ontology Embedding: A Survey of Methods, Applications and Resources

**Authors**: Jiaoyan Chen, Olga Mashkova, Ernesto Jiménez-Ruiz, Ian Horrocks, Diego M. López, Przemyslaw Andrzej Nowak, et al.
**arXiv**: 2406.10964 (2024), accepted to IEEE TKDE

Comprehensive survey of ontology embedding, covering formal definitions, method categories, resources, and applications across ontology engineering, machine learning augmentation, and life sciences, consolidating works from AI and bioinformatics venues. This connects to `arrowspace` by framing how logical structure can be embedded into vector spaces to complement spectral and graph-based similarity in hybrid search.

**Key contributions**: Taxonomy of ontology embedding approaches, resource catalog, application landscape, and challenges/future directions in integrating symbolic semantics with embeddings.

### The RDF2vec Family of Knowledge Graph Embedding Methods

**Authors**: Petar Ristoski, Simone Paolo Ponzetto, Heiko Paulheim (and collaborators across variants)
**Journal**: Semantic Web – Interoperability, Usability, Applicability (SWJ), “The RDF2vec Family of Knowledge Graph Embedding Methods”

In-depth study of RDF2vec variants that generate embeddings from random walks over RDF graphs, with a comprehensive evaluation revealing representational strengths and weaknesses relative to other KG embedding methods. For `arrowspace`, this informs walk-based feature extraction that can be blended with Laplacian-based distances for structure- and path-aware retrieval.

**Key contributions**: Unified overview of RDF2vec techniques, large-scale comparative evaluation, and practical guidance for selecting variants by task characteristics.

---

## Graph Signal Processing & Spectral Methods

### The Emerging Field of Signal Processing on Graphs

**Authors**: David I Shuman, Sunil K. Narang, Pascal Frossard, Antonio Ortega, Pierre Vandergheynst  
**arXiv**: [1211.0053](https://arxiv.org/abs/1211.0053) (2012)

Foundational work extending classical signal processing operations to graph-structured data. This paper establishes the theoretical framework for spectral graph analysis used in `arrowspace`'s energy-distance metrics and Laplacian-based search.

**Key contributions**: Graph Fourier Transform, spectral filtering, and multi-resolution analysis on irregular graph domains.

### What Is Positive Geometry?

**Authors**: Kristian Ranestad, Bernd Sturmfels, Simon Telen  
**arXiv**: [2502.12815](https://arxiv.org/abs/2502.12815) (2025)

Foundational introduction to positive geometry—an interdisciplinary field bridging particle physics, cosmology, and algebraic geometry. Positive geometries are tuples $$(X, X_{\geq 0}, \Omega(X_{\geq 0}))$$ consisting of a complex algebraic variety, a semi-algebraic positive region, and a canonical differential form satisfying recursive axioms. The framework represents physical observables (scattering amplitudes, cosmological correlators) as geometric structures like amplituhedra and cosmological polytopes.

**Relevance to `arrowspace`**: The canonical form construction—recovering volume integrals from positive regions via $$\Omega(P) = \text{vol}(P-x)^\circ dx$$—directly parallels `arrowspace`'s energy map pipeline. Just as positive geometry "linearizes" high-dimensional semi-algebraic varieties into canonical differential forms, `arrowspace`'s [`energymaps.rs`](https://github.com/Mec-iS/arrowspace-rs/blob/332124a48dae03a710b2de93c9b0aeda156c69d9/src/energymaps.rs#L1) constructs a graph Laplacian over the data manifold and projects it onto a 1-dimensional taumode spectrum (Rayleigh quotients). Both frameworks encode complex geometric structures (amplituhedra / energy graphs) as scalar fields that preserve topological invariants while enabling efficient computation.

**Key contributions**: 
- Formal definition of positive geometries with recursive boundary factorization and canonical forms
- Connection between convex polytopes, Grassmannian amplituhedra, and universal barrier functions in optimization
- Integration of real, complex, and tropical algebraic geometry for computing scattering amplitudes and cosmological correlators

[Full PDF](https://arxiv.org/pdf/2502.12815)

---

## Agentic Systems & Planning

### RPG: A Repository Planning Graph for Unified and Scalable Codebase Generation

**Authors**: ZeroRepo Team  
**arXiv**: [2509.16198](https://arxiv.org/abs/2509.16198) (2025)

Introduces the Repository Planning Graph (RPG), a graph-driven framework for generating complete software repositories. Relevant to formal agent protocols and structured generation workflows.

**Key contributions**: Persistent graph representations unifying proposal- and implementation-level planning for autonomous code generation.

---

## Retrieval Fundamentals & Limitations

### On the Theoretical Limitations of Embedding-Based Retrieval

**Authors**: Orion Weller et al. (Google DeepMind)  
**arXiv**: [2508.21038](https://arxiv.org/abs/2508.21038) (2025)

Theoretical analysis proving fundamental limitations of single-vector embeddings for complex retrieval tasks. Introduces the LIMIT benchmark to expose failure modes in cosine-similarity-based retrieval.

**Key contributions**: Sign-rank bounds on embedding expressiveness, motivating energy-distance and spectral approaches beyond cosine similarity.

[Paper PDF](https://arxiv.org/pdf/2508.21038)

---

## Document Reranking

### jina-reranker-v3: Last but Not Late Interaction for Document Reranking

**Authors**: Feng Wang, Yuqing Li, Han Xiao  
**arXiv**: [2509.25085v2](https://arxiv.org/abs/2509.25085v2) (2025)

State-of-the-art 0.6B parameter multilingual document reranker achieving 61.94 nDCG@10 on BEIR. Demonstrates lightweight alternatives to generative listwise reranking.

**Key contributions**: Late-interaction architecture for efficient cross-encoder reranking with strong BEIR performance.

---

## Context Compression & Recursive Models

### Recursive Language Models

**Authors**: Alex Zhang, Omar Khattab (MIT CSAIL)  
**Paper**: [alexzhang13.github.io/blog/2025/rlm](https://alexzhang13.github.io/blog/2025/rlm/)

Proposes Recursive Language Models (RLMs), where models recursively call themselves to decompose and interact with unbounded context. RLM with GPT-4-mini outperforms full GPT-4 by 87% on long-context benchmarks.

**Key contributions**: Divide-and-conquer strategy for handling 10M+ token contexts without performance degradation, mitigating "context rot."

---

## Quantum Computing & Hybrid Systems

### Mind the Gaps: The Fraught Road to Quantum Advantage

**Authors**: Jens Eisert, John Preskill  
**arXiv**: [2510.19928](https://arxiv.org/abs/2510.19928) (2025)

Perspectives on the transition from noisy intermediate-scale quantum (NISQ) devices to fault-tolerant application-scale quantum computing. Identifies four key hurdles including error mitigation, scalable fault tolerance, and verifiable algorithms.

**Relevance**: Explores hybrid classical-quantum systems for optimization and simulation tasks relevant to graph algorithms and energy minimization.

---

## Computational Methods in Software Engineering

### Vulnerability2Vec: A Graph-Embedding Approach for Enhancing Vulnerability Classification

**Source**: [Tech Science Press - CMES 2025](https://file.techscience.com/files/CMES/2025/online/CMES0909/TSP_CMES_68723/TSP_CMES_68723.pdf)

Vulnerability2Vec converts Common Vulnerabilities and Exposures (CVE) text explanations to semantic graphs.

**Key contributions**: Security vulnerability; graph representation; graph-embedding; deep learning; node classification.

[Full PDF](https://file.techscience.com/files/CMES/2025/online/CMES0909/TSP_CMES_68723/TSP_CMES_68723.pdf)

---

## Implementation Resources

For practical implementations informed by these papers:

- **arrowspace**: Spectral vector database with energy-informed search  
  [GitHub](https://github.com/Mec-iS/arrowspace-rs) | [PyPI](https://pypi.org/project/arrowspace/) | [crates.io](https://crates.io/crates/arrowspace)

- **BMPP Agents**: Formal protocol for AI agent workflows  
  [Implementation page](/bmpp-agents-rs)

- **Optical Embeddings**: DeepSeek-OCR compression in Rust  
  [Blog post](/posts/005_optical_compression_energy_search)

---

**Interested in research collaboration or sponsorship?** Check the [Contact page](/contact) to discuss how these methods can accelerate your data infrastructure.
