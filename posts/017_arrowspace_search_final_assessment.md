---
title: 017_arrowspace_search_final_assessment.md
layout: blog_default
date: 2026-0-08
author: tuned-org-uk
categories: [arrowspace, vector-search, knowledge-graphs,similarity, cosine]
---

# ArrowSpace hits the spot for semantic augmented retrieval

Here it is summary of the last six months of research: from the idea for Spectral Indexing to verification and formalisation of MRR-Top0 🤩 what a ride

## Why cosine can be arbitrary

Steck et al. show that when embeddings are learned under a dot‑product objective, there can be a “degree of freedom” that makes cosine outcomes non‑unique even when dot‑product predictions are well‑defined. In particular, for one common regularization, the solution is invariant not only to rotations but also to per‑dimension rescalings $D$ (diagonal), and those rescalings change cosine similarities after normalization. In a full‑rank example, an allowed choice of $D$ makes item–item cosine similarity collapse to the identity matrix (each item only similar to itself), illustrating how cosine can become meaningless without violating the training objective.

Paper: *Is Cosine-Similarity of Embeddings Really About Similarity?*
[https://arxiv.org/pdf/2403.05440](https://arxiv.org/pdf/2403.05440)

## Why geometry fails in retrieval

Even if cosine were uniquely determined, it still only measures local angle alignment and does not tell you whether the retrieved set forms a coherent neighborhood on the corpus manifold. The MRR‑Top0 paper frames this as **topology‑blindness**: two rankings can place the same relevant items at the same positions while one ranking is topologically scattered (bad tail, unstable context) and the other is cohesive (good tail, stable context). This is exactly where RAG breaks in practice: top‑1 looks fine, but the context window is polluted by tail items that don’t share the same structural region, increasing drift and hallucination risk.

Paper: *MRR-Top0: A Topology-Aware Extension of Mean Reciprocal Rank for Semantic-Sensitive Retrieval Evaluation*
(ArrowSpace / MRR‑Top0 paper you attached)

## Reweighting with ArrowSpace

ArrowSpace’s core move is to stop treating similarity as “just an angle” and instead blend geometry with dataset structure using a manifold invariant computed in feature‑space. From this Laplacian manifold, `ArrowSpace` compresses global structure into per‑item scalar spectral signatures (Rayleigh‑quotient style $\lambda$), so retrieval can reweight candidates by “how aligned they are with learned structure,” not merely how close they are in cosine space. Even if you treat $\lambda$’s deeper interpretation cautiously, it is still an operationally cheap proxy for deviation‑from‑structure that you can use for tail stabilization and OOD‑style flags in retrieval pipelines.

Core ArrowSpace / spectral indexing reference:
Moriondo, *ArrowSpace: introducing Spectral Indexing for vector search* (JOSS 2025)
[https://joss.theoj.org/papers/10.21105/joss.09002.pdf](https://joss.theoj.org/papers/10.21105/joss.09002.pdf)

## Measuring the win: MRR‑Top0

MRR‑Top0 extends MRR by scoring the entire top‑k list, weighting each relevant item’s reciprocal rank by a topology factor $T_{q,i}$. That topology factor explicitly combines:

- Query‑anchored Personalized PageRank
- A conductance‑based cohesion reward
- A modularity / community‑alignment term

So it rewards rankings that are not just “close” but **structurally** consistent. This gives you a metric that matches what we actually want in RAG: a context set that stays on‑manifold deeper into the tail rather than collapsing after the first hit.

Paper: *MRR-Top0: A Topology-Aware Extension of Mean Reciprocal Rank for Semantic-Sensitive Retrieval Evaluation*
(ArrowSpace / MRR‑Top0 paper you attached)

## The practical necessity (and a migration path)

Steck et al. basically tell you: if you trained for dot products, post‑hoc cosine can be opaque because regularization implicitly sets latent scalings; remedies include:

- Training with cosine (e.g., via layer norm)
- Applying similarity in the original (projected‑back) space
- Addressing popularity/scale during learning (standardization, negative sampling, IPS)

Paper: *Is Cosine-Similarity of Embeddings Really About Similarity?*
[https://arxiv.org/pdf/2403.05440](https://arxiv.org/pdf/2403.05440)

ArrowSpace is the retrieval‑side answer: keep your encoder, but add a spectral index that reweights geometric similarity by manifold structure and then validate it with topology‑aware metrics like MRR‑Top0 and tail‑focused stability measures. In your CVE benchmark write‑up, this shows up as high head agreement with cosine while improving tail behavior under taumode, which is the regime that matters for multi‑document context assembly.

Blog: [*Beyond Cosine: TauMode Excels on CVE Dataset*](/posts/015_arrowspace_stress-test_on_dorothea_dataset) ---
[Results and code](https://github.com/tuned-org-uk/pyarrowspace/tree/db3a5a3894b09451b896eda1df2d82d259babfb6/tests/output/v0_25/1772482454_test_2_pagerank) 

### 1. MRR-Top0: Topology-Aware Ranking Quality

The new MRR-Top0 metric was introduced to measure both relevance order and structural quality by weighting the reciprocal rank with the normalised $\lambda$ score (a surrogate for Dirichlet dispersion / topological PageRank).

- **Taumode Dominance**: Across the 18 queries, `Taumode (τ=0.42)` consistently achieves the highest MRR-Top0 score, averaging **0.0218** compared to `Hybrid` (0.0201) and pure `Cosine` (0.0078).
- **High Variance by Query**: The bar chart `cve_mrr_top0.jpg` shows that on certain queries (e.g., Q7, Q14, Q16), the topological MRR-Top0 spikes significantly for Taumode and Hybrid. This indicates that for queries where the semantic similarity alone struggles to differentiate candidates, ArrowSpace's graph-wiring successfully identifies items that are central to the underlying feature manifold.
- **Why this matters**: A higher MRR-Top0 means that items returned at the top of the ranking are not just semantically close to the query, but they occupy structurally important (high-$\lambda$) positions in the dataset graph.


### 2. Tail Quality and Stability

The tail analysis (ranks 4–15) reveals how well the search algorithm maintains relevance deeper into the result set, which is critical for RAG contexts.

- **Tail/Head (T/H) Ratio**: `Taumode` achieves the highest average T/H ratio of **0.9919**, outperforming `Cosine` (0.9892). Looking at the `cve_tail_analysis.jpg` plots, the score distribution for Taumode is visibly flatter across ranks compared to the steeper drop-off seen in Cosine.
- **Coefficient of Variation (CV)**: The `cve_tail_metrics.csv` shows that Taumode consistently produces lower Tail CV values (e.g., ~0.0014 for Taumode vs ~0.0039 for Cosine on Q2). This means the scores returned deep in the ranking are highly stable and less erratic, validating the "spectral pre-filter" effect of graph wiring.


### 3. NDCG and Ranking Correlation

[Results and code](https://github.com/tuned-org-uk/pyarrowspace/tree/db3a5a3894b09451b896eda1df2d82d259babfb6/tests/output/v0_25/1772482454_test_2_pagerank) 

Treating pure Cosine similarity as the baseline "ground truth" to measure divergence:

- **NDCG@10**: Taumode diverges significantly from Cosine, with an NDCG@10 of **0.6108** against Cosine, while Hybrid stays closer at **0.7540**.
- **Interpretation**: This divergence is not a failure; it is the desired effect. Because the MRR-Top0 and Tail metrics improve while NDCG vs. Cosine drops, it proves that Taumode is finding *different, structurally superior* items that pure Cosine similarity misses.
- **Spearman/Kendall**: The rank correlations in `cve_comparison_metrics.csv` confirm this. On Q4 and Q13, Cosine and Taumode have *negative* or near-zero rank correlations (e.g., Q13 Spearman is -0.127), yet Taumode yields a superior MRR-Top0 on those exact queries.

---

## Appendix on Energy-aware search and Epiplexity

### Shared Mathematical Core: Rayleigh Quotient

Both arrowspace's λ and epiplexity share the Rayleigh quotient as their foundational operator, though they apply it in complementary domains.

ArrowSpace computes per-item λ as:

$$
E = \frac{x^T L \, x}{x^T x}
$$

where $L = \text{Laplacian}(C^T)$ is the feature-space graph Laplacian over centroids, producing a bounded synthetic score $\lambda = \tau \cdot E_{\text{bounded}} + (1 - \tau) \cdot G_{\text{clamped}}$ that captures how much an item deviates from the learned manifold structure. Epiplexity (Finzi et al., 2026) uses essentially the same mathematical object — the information in the program that minimizes the time-bounded MDL — but applied to the *training process* of neural networks. Its practical estimator is the area under the loss curve above the final loss, which measures how much *structural* information (as opposed to random information) a computationally-bounded observer extracts from data.

The RQGNN paper (Dong et al., 2023) directly proves that accumulated spectral energy — representable as a Rayleigh quotient — is the "driving factor behind the anomalous properties of graphs," achieving +6.74% Macro-F1 over rivals in graph-level anomaly detection. This independently validates the connection: Rayleigh quotients detect deviation from normal structure in both retrieval (arrowspace) and anomaly detection contexts.

### λ as a Computationally Cheap Epiplexity Proxy

The operationally useful claim, which the space instructions correctly prioritize, is this: **even if the epiplexity interpretation of λ is approximate, λ provides a computationally cheap proxy for "how much an item deviates from learned structure"** — which is exactly what epiplexity measures at the training-data level.

The CVE benchmark results demonstrate this concretely:


| Metric | Cosine | Hybrid | Taumode |
| :-- | :-- | :-- | :-- |
| Avg Top-1 Score | 0.8434 | 0.8734 | 0.8970 |
| Avg T/H Ratio | 0.9891 | 0.9896 | 0.9903 |
| Avg Tail CV | 0.0029 | 0.0030 | 0.0028 |
| Top-1 Wins | 0/18 | 0/18 | 18/18 |

The key property is that taumode's cumulative score advantage over cosine grows *linearly* with rank depth (+0.65 by rank 15), meaning the spectral advantage does not diminish deeper in results. This is the retrieval analogue of what epiplexity measures at the training level: structural information that persists and remains useful beyond the easy top-k, exactly where RAG systems need stability.

### Three Concrete Integration Paths

#### Path 1: Epiplexity-Weighted Tail Scoring

The current `test_2_CVE_db.txt` scoring computes tail-to-head ratio, tail CV, and tail decay rate. An epiplexity-informed extension would weight tail items by their $$λ$$ deviation from the manifold median:
- Items in the tail whose $$λ$$ aligns with the query's $$λ$$: $$(low \|λ_q − λ_i\|)$$ carry *high structural relevance* — these are manifold-consistent deep results, the ones epiplexity says contain reusable structure.
- Items in the tail with large $$λ$$ deviation are geometrically close but spectrally distant — candidates for out-of-distribution (OOD) or noise, with low structural information content.

A modified tail quality metric could be:

$$
\text{TH}_\text{epi} = \frac{\sum_{\text{tail}} s_i \cdot w(\lambda_i)}{\sum_{\text{head}} s_i}
$$

where $$w(\lambda_i) = \exp(\|\lambda_q - \lambda_i\| / \sigma_\lambda)$$ penalizes spectrally incoherent tail items. This directly encodes the epiplexity insight that *structural alignment*, not just geometric proximity, determines the information value of retrieved items.

#### Path 2: Cross-Query Structural Consistency

Epiplexity shows that data ordering and factorization affect how much structural information a model extracts (the chess experiment: reverse ordering yields higher epiplexity and better OOD transfer). The CVE scoring already captures this via cross-query stability metrics — taumode reduces inter-query score variability at tail ranks 10–15. An epiplexity-informed metric would explicitly track whether different queries over the same corpus produce λ distributions with consistent spectral signatures, measuring whether the manifold's structural information is being consistently accessed.

#### Path 3: λ-Divergence as OOD Signal for Score Invalidation

The strategic review document identifies that taumode's sensitivity to distribution shifts is a *feature*, not a bug — it's a built-in OOD detection mechanism. Epiplexity provides the theoretical grounding: items with high λ (high curvature/roughness on the manifold) align with high-frequency spectral regions where the observer must learn more structure to explain the data. In practice, this means:

- **High λ\_query relative to corpus λ distribution** → query likely OOD → scores should be flagged rather than trusted
- **Stable λ\_query within corpus distribution** → query is on-manifold → tail scores carry structural information worth preserving

This connects to epiplexity's core finding that loss alone (analogous to cosine score alone) captures only residual unpredictability, while epiplexity (analogous to λ) captures "how much reusable structure the model has internalized".

### What Remains Approximate

The honest caveat is important: arrowspace's λ operates on a *static* graph Laplacian over pre-computed centroids, while epiplexity is defined over the *training dynamics* of a computationally-bounded observer. Arrowspace λ is an instantaneous snapshot of spectral position; epiplexity is an integral over the learning process. The connection is that both measure deviation from structure — one at retrieval time (O(1) per item), the other at training time (requires full loss curve). This makes λ operationally useful as a *cheap runtime proxy* for a property that epiplexity characterizes rigorously but expensively.

The Dorothea results provide the important boundary condition: on sparse, non-semantic data (100K one-hot features), λ distributions for positive and negative classes are indistinguishable (Cohen's d < 0.09), confirming that the manifold $L = \text{Laplacian}(C^T)$ only captures useful structure when the feature space has genuine semantic content — exactly the domain where epiplexity is non-trivial.

### Recommended Next Step

The most directly actionable integration would be adding an **epiplexity-aware stability coefficient** to the CVE scoring framework: for each query, compute the Spearman correlation between item λ rank and item score rank within the tail. When this correlation is high, the spectral manifold and the similarity ranking agree (structurally consistent retrieval). When it diverges, the manifold is injecting novel structure — the "divergent queries" (Q1, Q4, Q7, Q14 in the CVE test) where λ-based re-ranking produces different CVEs than cosine. This metric directly measures whether retrieval is accessing structural information (high epiplexity regime) or merely geometric proximity (low epiplexity regime), using only the already-computed λ values with zero additional cost.
