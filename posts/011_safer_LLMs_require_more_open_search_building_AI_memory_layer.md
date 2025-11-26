---
title: 011_safer_LLMs_require_more_open_search_building_AI_memory_layer
layout: blog_default
date: 2025-11-26
author: tuned-org-uk
categories: arrowspace, ai-safety, vector-search
---

# Safer LLMs require open search - Building the AI Memory Layer

TLDR; `arrowspace` reframes AI retrieval as an open, topology‑aware search problem so that systems can keep the benefits of intuitive pattern‑finding while structurally detecting and constraining subtle hallucinations.

`arrowspace` v0.24.3 is out with improvements.

You can find `arrowspace` in the:

* [Rust repository](https://github.com/Mec-iS/arrowspace-rs) ↪️ `cargo add arrowspace`
* and [Python repository](https://github.com/tuned-org-uk/pyarrowspace) ↪️ `pip install arrowspace`

I am building a **datastore** based on `arrowspace`, follow me for news. 

## Intro

`arrowspace` was designed to go beyond treating embedding spaces as just geometric space; every dataset hides also a graph with energy flowing over the manifold of features; focusing only on the connections of its elements gives a partial perspective. This same shift — from closed, purely geometric similarity to open, energy-informed topology — is exactly what is needed to tackle subtle hallucinations without giving up on useful intuitions.

## When retrieval becomes a hallucination engine

A relevant fraction of LLM hallucinations does not come from bad generation steps but from the slow accumulation of errors in retrieval and semantic caching. Recent work shows that as you incrementally inject context with some relevant, slightly off information LLM internal representations drift in a consistent direction until the model “locks in” to an incorrect answer that still looks well supported by the surrounding text.  Other studies on multi‑turn systems call this *context drift*: a gradual erosion of the original intent where summaries and follow‑up answers stay fluent while silently drifting away from the user’s goal.[^1][^2][^3]

Semantic caches and naive RAG pipelines amplify this effect. If the cache is tuned only on geometric similarity, even small threshold mistakes can produce extremely high false‑positive rates, to the point where almost every cache hit is wrong . Systematic analyses of RAG failures show that retrieval errors and domain‑mismatched hits are a primary driver of hallucinations, especially when the model confidently stitches together partially wrong snippets into a coherent narrative.[^4][^5][^6]

### Intuitions, subtle hallucinations, and safety

My 2022 paper ["Cybernetics Interfaces and Networks: intuitions as a toolbox"](https://www.techrxiv.org/users/685780/articles/679427-cybernetics-interfaces-and-networks-intuitions-as-a-toolbox) reflects on intuitions in tools using: pattern proposals that are valuable exactly because they are *not* yet commitments. In an LLM context, the danger appears when those intuitive jumps are silently promoted to "facts" by the surrounding retrieval context and ranking logic, instead of being flagged and interrogated as hypotheses. How to skim these patterns when every search focuses on the geometrical relations of documents and concepts?

According to common consensus, the safety issue is not the easily debunked mistake, but the subtle plausible error that passes through ranking, caching, and user interfaces without any visible sign that the system has left the reliable part of its knowledge graph.[^1]

### Why geometry‑only search is brittle

Today’s vector databases mostly operate as *geometric* engines: each embedding is a point, similarity is a distance (cosine, dot product, L2), and the system returns the nearest neighbors. This setup has no explicit notion of manifold structure, communities, or how information flows across the dataset; it only knows that points happen to be close in a high‑dimensional space, which is precisely where semantic caches accumulate false positives under domain shift and noisy inputs . The selection between intuition and hallucinatory pathways is stochastic, so the necessity of redundancy in retrieval to keep the drifting from happening. 

Pure geometry also has no language to talk about *drift* or *coherence* of a retrieved set. Evaluation metrics like recall@k treat each item independently and ignore whether the top‑k results form a tight, well‑connected region in the corpus graph or a scattered, unstable subgraph that signals emerging hallucination risk.  In other words, the current search layer is blind to exactly the structural signals that could tell us the characteristics of intuitions compared to subtle hallucinations.

## Arrowspace as “open search”

Arrowspace starts from the opposite assumption: any vector dataset is a graph. Vectors define local edges (via similarity), features induce topology over those edges, and from that `arrowspace` builds a graph Laplacian whose eigenvectors and eigenvalues encode both global topology and local geometry. An enedrgy dispersion network is built on the features graph to simulate semantic coherence (calling geometric-only search based on datapoints distance as "semantic" is indeed a subtle hallucination in my opinion as there is no meaning involved, but that's a philosophical non-actionable point). 

From the Laplacian `arrowspace` derives **eigenmaps** and **energymaps** — indices that capture how smooth or rough signals are over the graph and how energy disperses across communities.  The taumode scorer then blends classic semantic similarity with Rayleigh‑quotient energy and dispersion statistics into bounded, comparable scores, so that the datapoints are "close in the the manifold". The embeddings space becomes more representative and actual semantic data (metadata, the data that represents the relations among the properties of the datapoints, as in "Semantic Web" or "Web 2.0" data).

This combination is what I mean for *open search* here:

- The index is not just a black‑box distance function; it exposes topological coordinates, energy levels, and community structure that can be inspected, logged, and audited.
- Search is not restricted to a local metric ball; you can reason about trajectories, flows, and motifs in the result subgraph, and compare snapshots over time to detect drift.
- The outcome is an open space to search for intuitions, not a closed space prone to drifting and self-replication. Energy maps based on topology embeds spotting faulting pathways.


### Spotting subtle hallucinations in the topology

Once retrieval lives in a topological, energy‑aware space, subtle hallucinations become detectable as *structural anomalies* (pathways with excess smoothness or roughness) rather than just content mistakes. If a query has historically pulled a cluster with low conductance, high modularity, and stable spectral signatures, a new batch of results that is geometrically similar but spectrally incoherent can be flagged and removed from the context.

`arrowspace`’s evaluation work already leans into this idea. The proposed [`MRR‑Top0`](/posts/006_a_score_for_topological_quality.md) metric extends classic MRR by weighting reciprocal ranks with topology factors derived from personalized PageRank, conductance, and modularity, so a ranking that looks fine geometrically but sits in a noisy, poorly connected subgraph scores worse. The same machinery can run online as a guardrail: if the current context’s retrieval set has low topology communities, high energy dispersion where past queries were smooth, the system can downgrade trust, widen the search, or explicitly mark the answer as "speculative". This also allows pre-computing pathways of search that follow or not the speculative assumptions, these pathways can themselves be represented as `ArrowSpace`s.

### Keeping the intuitions, losing the risk

Intuitions are exactly the kind of pattern jumps that live off the main geometric manifold: weak signals, long‑tail neighborhoods, surprising but potentially valuable connections.  `arrowspace`’s energy‑informed search is designed to surface these by following dispersion patterns and spectral signatures, not just local distances, so models can discover associations traditional cosine search never sees. This is leads naturally to the extension of the manifold via selected pathways.

Hypotheticall it is possible to treat these off‑manifold results as a different "modes" of search. In practice, this means:
- Maintaining two simultaneous views for a query: a high‑confidence, low‑energy, topologically coherent core, and an exploratory, higher‑energy fringe where intuitions live.
- Using topology‑aware scores (like `MRR‑Top0` and related subgraph quality indices) to gate what enters the “authoritative” context fed to the LLM, while still exposing intuitive candidates as marked hypotheses the model can reason about explicitly.


## Takeaways

Under this lens, "making LLMs good at patterns beyond geometry" and "spotting subtle hallucinations early" are just two sides of the same safety coin. The same `arrowspace` machinery that lets you follow energy dispersion into interesting, non‑local neighborhoods is also what tells you when the system is leaving the safe manifold and when an apparently reasonable intuition should be treated as a suspect hallucination.

- Hallucinations often arise from accumulated retrieval and semantic‑cache errors: geometrically close but structurally wrong documents slowly pollute context until fluent but unreliable answers emerge.
- Geometry‑only vector search cannot see this drift because it ignores the dataset’s manifold and motives-subgraphs structure, so it has no way to score whether a retrieved set is coherent or topologically unstable.
- `arrowspace` adds a graph Laplacian and energy‑informed spectral indexing (taumode) on top of embeddings, letting search reason about smoothness, dispersion, and subgraph quality—not just distance—so it can flag risky, off‑manifold neighborhoods where subtle hallucinations live.
- This same machinery supports a dual mode of operation: a stable, low‑energy core for factual grounding and a clearly marked, higher‑energy fringe for intuitive exploration, preserving creativity while making its risks spottable.

### References

[^1]: https://arxiv.org/html/2505.16894v1

[^2]: https://arxiv.org/html/2510.07777v1

[^3]: https://www.nature.com/articles/s41598-025-15203-5

[^4]: https://www.tredence.com/blog/mitigating-hallucination-in-large-language-models

[^5]: https://www.scalegen.ai/blog-v1.0/addressing-llm-hallucination-with-rag-innovative-solutions

[^6]: https://arxiv.org/html/2507.18910v1
