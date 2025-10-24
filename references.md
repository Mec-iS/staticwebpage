---
title: references
layout: blog_default
---

# Research Papers in Vector Search & AI Systems

Field of application: **Vector Databases, Spectral Methods, and Agentic AI**

A curated collection of foundational and emerging papers that inform the design and implementation of `arrowspace`, optical compression, and next-generation retrieval systems.

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
