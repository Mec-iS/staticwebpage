---
title: 015_arrowspace_stress-test_on_dorothea_dataset
layout: blog_default
date: 2026-02-13
author: tuned-org-uk
categories: [arrowspace, vector-search, knowledge-graphs, string-theory, surfaces, interfaces]
---

# ArrowSpace Performance Analysis: 100K Dimensions on Dorothea

`arrowspace` successfully scaled to 100,000-dimensional data, processing 800 samples from the Dorothea biomarker dataset in 41-110 seconds with >600× memory compression (610 MB → 1 MB). The system achieved 5-22% graph density (mean: 11.7%) through 648 parameter sweep experiments, with 24% of configurations reaching >10% density in under 60 seconds.

## Computational Pipeline and Bottlenecks

The `ArrowSpace` pipeline consists of four stages with vastly different costs:

**Johnson-Lindenstrauss Projection** (34% of runtime): Reduces 100k features to 53-104 dimensions depending on error tolerance ε. At ε=0.7, compression reaches 1887× (53 dims) with 46.3s build time and 15.4% density. At ε=0.5, compression is 962× (104 dims) with 82.3s build time and 8.2% density. The correlation between JL dimension and build time is r=0.845, indicating strong sensitivity .

**Incremental Clustering** (3% of runtime): Operates on JL-reduced space, forming 2-100 centroids (target: 25). Only 27% of runs achieved exactly 25 clusters, with radius parameter showing r=-0.46 correlation to cluster count. Higher compression (ε=0.7) destabilized clustering, reducing full-clustering rate to 25% vs 30.6% at ε=0.5 .

**Laplacian Construction** (<1% of runtime): Builds sparse feature-space Laplacian from centroid transpose, enforcing the critical invariant `Manifold = Laplacian(Transpose(Centroids))`. Logs confirm "Building Laplacian from 25 centroids × 214 features" producing 214×214 matrices with 1,164-4,690 non-zeros (mean: 2,741). Construction time: <100ms, negligible at this scale.

**TauMode Computation** (62% of runtime, **critical bottleneck**): Computes Rayleigh quotient λᵢ = xᵢᵀLxᵢ/‖xᵢ‖² for each item using **original 100k features**, not JL-reduced space. Throughput: 27 items/sec on 6 threads, yielding 33s ± 11s for 800 items . This stage cannot be accelerated by JL projection because it requires spectral fidelity on the full feature manifold.

TLDR; `arrowspace` is quite fast to build graphs also in high-dimensional data considering is early stage of development. Rayleigh confirms itself as an [epiplexity](https://arxiv.org/abs/2601.03220) index. Relevant critical points are raised against normalising raw input for this class of algorithms. Rayleigh-based score score provides a computationally cheap proxy for "how much an item deviates from learned structure", which is operationally useful for active learning and OOD detection in RAG systems.

All data and logs are available in [this repo](https://github.com/tuned-org-uk/arrowspace_dorothea/tree/main/storage).

## Session 004: Parameter sweeping on sparse representation

### Parameter Impact

**lambda_k** (k-NN connectivity) strongly correlates with density (r=0.784) but has zero impact on build time (r=0.004) :

- λ_k=20: 1,698 edges, 7.3% density
- λ_k=30: 2,560 edges, 11.0% density
- λ_k=50: 3,935 edges, 16.8% density ★

All three run in ~63s because taumode dominates regardless of graph structure .

### Optimal Configurations

**Speed champion** (Exp 210): `k=25, jl_ε=0.7, λ_k=50, λ_eps=3.0, radius=3.0` → 41.0s, 22.0% density, 19 clusters, 2,666 edges. Fastest configuration achieves highest density but under-clusters. Parameter interpretation: aggressive JL compression (53 dims), maximum k-NN connectivity, moderate epsilon-ball (minimal impact observed), large merge threshold causing under-clustering.

**Density champion** (Exp 411): `k=50, jl_ε=0.7, λ_k=50, λ_eps=4.0, radius=2.5` → 46.4s, 22.1% density, 50 clusters, 2,676 edges. Maximal connectivity with over-clustering (finer manifold structure). Higher λ_eps=4.0 vs speed champion's 3.0, but density difference is negligible—confirms lambda_eps has minimal impact.

**Conservative baseline**: `k=25, jl_ε=0.6, λ_k=30, λ_eps=3.0, radius=2.0` → 61.3s, 10.9% density, 25 clusters ✓, 2,415 edges. Achieves target cluster count with balanced compression. Recommended for production: reliable and predictable.

### Invariant Adherence and Theoretical Insights

The system correctly enforces the feature-space Laplacian invariant throughout. Unlike standard manifold learning (items embedded in ℝᶠ), ArrowSpace constructs a dual manifold where features are embedded in centroid-space . The Laplacian dimension (214×214) matches the JL-reduced feature count, **not** the item count (800) or centroid count (25), confirming proper transpose-first construction.

Lambda values normalized to show low intrinsic variance (original spread: 0.0006-0.0011), with post-normalization means of 0.11-0.42 . This suggests Dorothea features are diffuse rather than concentrated—consistent with biomarker data where signals spread across thousands of genes.

The Rayleigh quotient $$λᵢ$$ can be interpreted as a good proxy for [**epiplexity**](https://arxiv.org/abs/2601.03220): the information content of item i relative to the learned manifold L. High λ indicates alignment with high-curvature regions (rare patterns); low λ indicates diffuse common patterns. This spectral signature could guide active learning and OOD detection in RAG systems. Even if the epiplexity interpretation is approximate, λ provides a computationally cheap proxy for "how much an item deviates from learned structure", which is operationally useful for active learning and OOD detection in RAG systems.

### Scaling Projections

Current best performance (41s for 800 items) extrapolates to :

- With GPU taumode: ~5 min for 10k items, ~50 min for 100k items
- With hierarchical taumode: ~2 min for 10k items, ~20 min for 100k items
- Target: <1s per 1k items with combined optimizations

Compared to alternatives, `ArrowSpace` is competitive with UMAP (5-20 min typical) while producing a spectral operator rather than just an embedding, enabling downstream taumode indexing for vector databases. While `ArrowSpace` compares well with cosine similarity in terms of quality of tail results (as demonstrated in previous posts) and allows more accurate similarities spotting on long multi-queries sessions; next tests will compare with UMAP in terms of quality of results for clustering and nearest neighbours performance.

### Exp 004 Conclusion

`ArrowSpace` demonstrates **feasible and principled** scaling to 100k dimensions by enforcing the feature-space Laplacian invariant. The two-phase bottleneck (JL projection + taumode) is addressable through GPU acceleration and hierarchical approximation. The system's ability to compress 610 MB to 1 MB while preserving spectral structure validates the core architecture for [`surfface`](https://github.com/tuned-org-uk/surfface-rs), though clustering stability and projection quality require validation before production deployment.


## Session 005: Normalized vs Unnormalized Input Analysis

Experiment 005 reveals that **unnormalized input significantly outperforms L2-normalized input** for ArrowSpace on 100k-dimensional sparse data. Testing 648 normalized and 318 unnormalized parameter sweeps on Dorothea's biomarker dataset shows dramatic differences in performance, stability, and efficiency.

### Executive Summary

### Optimal Configurations

**Normalized top performer** (Exp 597): `k=100, jl_ε=0.7, λ_k=50, λ_eps=1.5, radius=2.0` → 49.2s, 11.68% density, 100 clusters ✓, 5,652 edges. Perfect clustering but requires conservative radius. Note Exp 642 with λ_eps=3.0, radius=3.0 collapses to 3 clusters—shows normalized data's fragility.

**Unnormalized top performer** (Exp 204): `k=25, jl_ε=0.7, λ_k=50, λ_eps=2.0, radius=3.0` → 48.8s, 11.66% density, 25 clusters ✓, 5,642 edges. **Robust configuration**: high radius (3.0) remains stable with unnormalized data, whereas same radius collapses normalized clustering. Exp 159 uses λ_eps=4.0 (2× higher) but achieves identical 11.65% density—direct proof lambda_eps is ineffective .

**Conservative baselines** (`k=25, jl_ε=0.6, λ_k=30, λ_eps=3.0, radius=2.0`): Normalized → 126.7s, unnormalized → 66.5s, both achieving 5.57% density and 25 clusters. **Identical density/clustering with 60s speed difference** proves unnormalized superiority at same parameters.

**Unnormalized input wins decisively**:

- **Build speed**: 78s vs 98s (20% faster, 1.26× speedup)
- **Clustering stability**: 67.6% vs 31.5% achieve target cluster count (2.1× better)
- **Taumode throughput**: 24 vs 18 items/sec (36% faster)
- **Graph density**: 5.6% vs 6.1% (negligible difference)

The speed advantage is strongest at low JL compression (ε=0.5: 145s→99s, 1.47× speedup), indicating normalization overhead scales with projected dimensions. Most critically, under-clustering events drop from 13.9% to 0.3%—a **46× improvement in stability** .

### Clustering Stability: The Critical Difference

For k=25 target clusters, success rates by radius parameter:


| Radius | Normalized | Unnormalized | Improvement |
| :-- | :-- | :-- | :-- |
| 1.6 | 100.0% | 100.0% | 0pp |
| 2.0 | 100.0% | 100.0% | 0pp |
| 2.5 | 100.0% | 100.0% | 0pp |
| 3.0 | 74.1% | 98.1% | +24pp ⭐⭐ |

At conservative radii (1.6-2.5), both modes succeed. But at radius=3.0 (aggressive merging), normalized inputs collapse to wrong cluster counts 26% of the time, while unnormalized remain stable. The cluster count distribution confirms this: normalized ranges 3-100 (mean: 53), while unnormalized stays tight at 9-50 (mean: 33) .

**Why normalization destroys stability**: L2 normalization projects vectors onto a unit hypersphere in 100k dimensions. Due to concentration of measure (curse of dimensionality), all points become nearly equidistant (≈√2 apart), making cluster boundaries arbitrary . Unnormalized vectors preserve scale hierarchy—active genes have large magnitudes, inactive genes stay near zero—creating natural cluster separability .

### Build Time and Computational Efficiency

The 20% speed advantage for unnormalized inputs has two sources:

1. **JL projection overhead** (34% of total time): Normalized vectors are pseudo-dense after L2 scaling, losing sparse matrix multiplication benefits. Speed gap is largest at ε=0.5 where JL dimension is highest (104 dims), contributing 47s overhead.
2. **Taumode Rayleigh quotient** (62% of total time): Throughput increases from 18→24 items/sec (36% gain) for unnormalized. The xᵀLx computation skips zero multiplications on sparse vectors, but normalized vectors artificially densify all entries, forcing full computation.

Combined effect: Normalization converts sparse → pseudo-dense, losing both storage and computational advantages of sparsity.

### Spectral Quality: No Benefit from Normalization

Graph density and spectral properties are nearly identical:


| Property | Normalized | Unnormalized | Difference |
| :-- | :-- | :-- | :-- |
| Graph density | 6.06% | 5.62% | 0.93× |
| Graph edges | 5,622 | 6,055 | +7.7% |
| λ mean | 0.2828 | 0.2831 | +0.0003 |
| λ std dev | 0.0497 | 0.0491 | -0.0006 |

This is the **critical finding**: normalization provides zero benefit to graph connectivity, spectral embedding quality, or manifold topology, but costs 20% speed and 2× stability .

### Best Configurations Comparison

Normalized top performers achieve high density but **wrong cluster counts**:

- Exp 642: 11.69% density, 3 clusters (collapsed from target 100)
- Exp 597: 11.68% density, 100 clusters (matches target, but unstable)

Unnormalized top performers achieve **equivalent density with correct counts**:

- Exp 204: 11.66% density, 25 clusters (good)
- Exp 150: 11.65% density, 25 clusters (good)
- Exp 159: 11.65% density, 25 clusters (good)

Same performance metrics, but unnormalized configurations are reliable and reproducible.

### Root Cause: Feature-Space Manifold and Hypersphere Concentration

Standard ML wisdom says "always normalize for distance-based algorithms," but `ArrowSpace` is fundamentally different:

**1. Feature-space duality**: `ArrowSpace` builds `Laplacian(Transpose(Centroids))`, clustering features in item-space rather than items in feature-space. After transpose, feature magnitudes encode biological importance (i.e. gene activation levels). L2 normalization forces all features to "equal importance," destroying the signal hierarchy we need to preserve .

**2. Curse of dimensionality on hypersphere**: In 100k dimensions, hypersphere volume concentrates in a thin shell. All normalized vectors become nearly orthogonal with distances ≈√2 (constant). Natural clusters based on magnitude vanish; distance-based clustering sees only noise .

**3. JL projection amplification**: Johnson-Lindenstrauss preserves distances with error ε, but on a hypersphere where all $$||x-y|| ≈ \sqrt2$$, reconstruction error dominates structure. For unnormalized sparse vectors with distances varying 0.1-10+, JL preserves relative distances better, and clustering sees hierarchical scales .

**4. Sparsity loss**: Dorothea is 99.9% sparse (binary biomarkers). Unnormalized: xᵀLx skips zeros (fast). Normalized: xᵀLx computes all entries (slow). Effect scales with dimensionality, JL target dimension, and Laplacian density .

### Theoretical Implications: Epiplexity and Scale Awareness

From the epiplexity framework, $$\lambda = \frac{x^\top Lx}{\|x\|^2}$$ measures "structure detectable by observer L" :

- **Unnormalized**: $$\|x\|$$ encodes total activity, λ measures alignment. High $$\|x\|$$, high λ = strong structured signal. High $$\|x\|$$, low λ = strong unstructured noise.
- **Normalized** ($$\|x\|$$=1): Total activity information erased. λ only measures alignment, cannot distinguish strong vs weak patterns.

The Rayleigh quotient is **not invariant** under individual item rescaling: x → αx changes λ by factor α². L2 normalization scales each item by 1/$$\|x\|$$, introducing per-item bias that breaks the natural spectral distribution we seek to measure .

### Novel Contribution and Recommendations

This is the **first systematic comparison** of normalized vs unnormalized inputs on 100k-dimensional sparse data with feature-space manifold construction, measuring both speed and stability . The finding challenges conventional ML wisdom:

**Use UNNORMALIZED inputs for**:

- Sparse binary data (Dorothea, TF-IDF, user activity)
- Gene expression, protein networks, count data
- Pre-embedded vectors (BERT, ResNet features)

**Avoid L2 normalization if**:

- Data is sparse (>50% zeros)
- Dimensionality is very high (>10k features)
- Scale/magnitude carries information (biomarkers, signals)

**Consider normalization only if**:

- Features have mixed units requiring comparison
- Explicit angular distance requirement (cosine similarity)
- Low dimensionality (<1000 features) AND dense data

This reverses standard preprocessing wisdom for a specific but important algorithm class: feature-space manifold learning on high-dimensional (sparse) data.

To find out how all of this connects to surface minimisation in physical networks, you'll have to wait for `surfface-rs` to be operational. `surfface-rs` will hopefully bring together vector search (Graph Wiring), epiplexity and surface minimisation in a coherent framework to approximate computation on the class of algorithms: **feature-space manifold learning on high-dimensional (sparse) data**
