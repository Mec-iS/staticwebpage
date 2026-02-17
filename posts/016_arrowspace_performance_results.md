---
title: 016_arrowspace_performance_results
layout: blog_default
date: 2026-02-17
author: tuned-org-uk
categories: [arrowspace, vector-search, knowledge-graphs, string-theory, surfaces, interfaces]
---

# Capabilities, speed and accuracy 

`arrowspace` v0.25.14 is available.

You can find `arrowspace` in the:

* [Rust repository](https://github.com/Mec-iS/arrowspace-rs) ↪️ `cargo add arrowspace`
* and [Python repository](https://github.com/tuned-org-uk/pyarrowspace) ↪️ `pip install arrowspace`

## Summing up

It is now six months that the [Spectral Indexing](/arrowspace-paper) paper has been published and it is time to account for the current state of development with a showdown of perfomance in different dimensions: capabilities, speed, accuracy.

You can read something about performace in the [previous post](/posts/015_arrowspace_stress-test_on_dorothea_dataset.md), in this one I am going to extend the analysis to every aspect thanks to the results returned by a major test campaign leveraging two datasets at the opposite edges of vector spaces applications: text embeddings (Sentence Transformer on the [CVE dataset](https://cve.org), high semantic content) and biochemical data (Dorothea 100K dimensions for biochemical markers classifications, sparse, one-hot, non-embedded).

These datasets have been selected because they stand as opposites in the spectrum of vector spaces characteristics so to highlight strenghts and non-covered areas for `arrowspace`. Briefly, text embeddings are dense representation with high semantic content used for text documents and AI/Transformers workloads while Dorothea 100K is a one-hot sparse representation mostly used for numerical analysis and biochemistry classification. In general, the first one has been used to test what `arrowspace` can do, the second for what it cannot do.

| dataset | link | results |
|----------|----------|----------|
| CVE | [data](https://www.cve.org/Downloads) | [v0.25.x](https://github.com/tuned-org-uk/pyarrowspace/tree/main/tests/output/v0_25/1771184871_test_2_5K_clusters) |
| Dorothea 100K | [data](https://archive.ics.uci.edu/dataset/169/dorothea) | [experiment 7 on v0.25.14](https://github.com/tuned-org-uk/arrowspace_dorothea/tree/main/storage) |

For the building-up to this level of testing, please see previous posts: [004](/posts/004_beyond_cosine_similarity), [005](/posts/005_fast_approximate_nearest_neighbours),  [008](/posts/008_arrowspace_proof_of_concept_energy_informed_search), [015](/posts/015_arrowspace_stress-test_on_dorothea_dataset).

---

## CVE dense embeddings Search Performance: Method Comparison

Here is the full visual analysis of the CVE spectral search test across 18 vulnerability queries, comparing **Cosine (τ=1.0)**, **Hybrid (τ=0.72)**, and **Taumode (τ=0.42)** methods. Unlike the Dorothea classification experiment where λ failed, the CVE search results show **Taumode delivering consistent improvements** — the manifold L = Laplacian(Cᵀ) provides operationally useful structure for retrieval.

### Score Decay by Rank

Taumode maintains the highest scores at every rank position (1–15), with an average score of 0.887 versus Cosine's 0.833 — a **+0.054 absolute lift** across all 270 query-rank cells. The shaded bands show Taumode also has tighter variance.

<img src="../assets/blog/016/cve/cve_c1_score_decay.png" alt="diagram 1" width="88%"/>

### Score Lift Over Cosine

The per-rank lift is consistently positive for both spectral methods, with Taumode gaining +0.04 to +0.07 at every position. The lift is strongest at rank 1 and remains significant even at rank 15 — critical for RAG tail stability.

<img src="../assets/blog/016/cve/cve_c2_score_lift.png" alt="diagram 2 Score Lift" width="88%"/>

### Per-Query Score Curves

All 18 individual query curves confirm the pattern: green (Taumode) sits above orange (Hybrid) which sits above blue (Cosine) with near-perfect consistency. Only Q14 (command injection) shows Taumode with slightly steeper tail decay.

<img src="../assets/blog/016/cve/cve_c7_per_query_curves.png" alt="diagram 7 Per Query Score Curves" width="88%"/>

## Ranking Agreement \& NDCG

### NDCG@10 per Query

Taumode vs Hybrid achieves NDCG ≥ 0.93 on 15/18 queries, meaning the spectral methods largely agree on ranking. The Taumode-vs-Cosine NDCG is more variable (mean 0.685, std 0.407), reflecting that spectral re-ranking genuinely reshuffles results for some queries (Q1, Q4, Q7, Q14).

<img src="../assets/blog/016/cve/cve_c3_ndcg.png" alt="diagram 3 NDCG" width="88%"/>

### Rank Correlation Heatmap

The Spearman/Kendall heatmap reveals three query categories: fully concordant (green rows like Q2, Q3, Q5, Q15, Q18), partially concordant (Q6, Q10, Q12), and divergent (Q1, Q4, Q7, Q14 with ρ ≈ 0). Divergent queries are where the spectral manifold injects the most novel structure.

<img src="../assets/blog/016/cve/cve_c4_rank_corr.png" alt="diagram 4 Rank Correlation" width="88%"/>

### Ranking Agreement Categories

7 of 18 queries have perfect agreement across all methods, while 6 show "spectral divergence" where Hybrid and Taumode agree but diverge from Cosine. This pattern is useful: λ provides a computationally cheap proxy for detecting where learned manifold structure differs from raw cosine similarity.

<img src="../assets/blog/016/cve/cve_c8_agreement.png" alt="diagram 8 Ranking Agreement" width="88%"/>

### Tail Quality Analysis (RAG Stability)

Per the scoring methodology, tail quality metrics are the primary indicators of multi-query stability for RAG systems.

#### Tail/Head Ratio

Taumode achieves the highest T/H ratio (0.990) versus Cosine (0.989), meaning scores decay less from head to tail. While the absolute difference is small (~0.001), Taumode wins on 14/18 queries — a statistically meaningful pattern.

<img src="../assets/blog/016/cve/cve_c5_th_ratio.png" alt="diagram 5 RAG Stability" width="88%"/>

#### Tail Coefficient of Variation

Lower CV means more stable tail scores. Taumode achieves the lowest CV on 14/18 queries (avg 0.0028 vs Cosine's 0.0029). The advantage is most pronounced on harder queries like Q3 (deserialization) and Q14 (command injection).

<img src="../assets/blog/016/cve/cve_c6_tail_cv.png" alt="diagram 6 Tail Coefficient Variation" width="88%"/>

#### Tail Decay Rate by Difficulty

When sorted by query difficulty (hardest left), Taumode consistently shows lower or comparable decay rates. The exception is Q14 (command injection) where Taumode's aggressive re-ranking creates a steeper tail — a known tradeoff of stronger spectral weighting.

<img src="../assets/blog/016/cve/cve_c13_decay_rate.png" alt="diagram 13 Tail Decay Tail" width="88%"/>
---

### Explorative Visualizations

#### Spectral Boost Map

This query × rank heatmap shows the exact score difference (Taumode − Cosine) at every cell. The nearly uniform green confirms that spectral search provides a **global score elevation**, not just a top-k effect. The few yellow/red cells indicate where re-ranking shifts results rather than just boosting.

<img src="../assets/blog/016/cve/cve_c14_boost_map.png" alt="diagram 14 Spectral Boost Map" width="88%"/>

#### Head Score: Cosine vs Taumode

Every point sits above the diagonal, confirming Taumode improves head scores for **all 18 queries**. Point size encodes T/H ratio improvement — queries with larger bubbles benefit most from spectral search in the tail.

<img src="../assets/blog/016/cve/cve_c9_head_scatter.png" alt="diagram 9 Head Score" width="88%"/>

#### Score Distribution Violins

Pooling all 270 scores per method, the violins show Taumode's entire distribution is shifted ~0.05 higher than Cosine. The Cosine distribution has a wider lower tail (more low-scoring results), which Taumode compresses upward.

<img src="../assets/blog/016/cve/cve_c12_violin.png" alt="diagram 12 Score Dist Violins Head" width="88%"/>

#### Top-10 Result Overlap

Hybrid–Taumode overlap averages ~0.85, confirming the spectral methods retrieve similar items. Cosine–Taumode overlap is lower (~0.65), particularly on divergent queries Q1, Q4, Q7, Q14 where spectral structure surfaces different CVEs.

<img src="../assets/blog/016/cve/cve_c11_overlap.png" alt="diagram 11 Results Overlap" width="88%"/>

#### Re-ranking Position Shifts

The histogram of rank shifts (Cosine → Taumode) shows a sharp peak at 0 with symmetric tails, meaning Taumode mostly preserves cosine ordering while making targeted swaps. This is the ideal profile: not random reshuffling, but structured refinement.

<img src="../assets/blog/016/cve/cve_c15_rerank_hist.png" alt="diagram 15 Re-ranking Position Shift" width="88%"/>

#### Cumulative Score Advantage

The running cumulative advantage shows Taumode accumulating **+0.65 total score** over Cosine by rank 15, growing linearly. This linearity means the spectral advantage doesn't diminish deeper in the results — exactly the property needed for stable RAG retrieval.

<img src="../assets/blog/016/cve/cve_c22_cumul_adv.png" alt="diagram 22 Cumulative Score Advantage" width="88%"/>

#### Cross-Query Stability

Taumode reduces inter-query score variability at the tail ranks (10–15), meaning it produces more **predictable scores regardless of query difficulty**. This is the multi-query stability property that the test_2_CVE_db scoring prioritises.

<img src="../assets/blog/016/cve/cve_c17_stability.png" alt="diagram 17 Cross Query Stability" width="88%"/>

#### Score Landscape Heatmaps

The side-by-side query×rank heatmaps show Taumode's surface is uniformly brighter (higher scores) with less dark patches in the lower-left (hard queries, deep ranks).

<img src="../assets/blog/016/cve/cve_c20_landscape.png" alt="diagram 20 Score Heatmap" width="88%"/>

### Method Dominance

Taumode wins top-1 score on **all 18 queries**, T/H ratio on 14/18, and lowest tail CV on 14/18. Cosine wins lowest decay on only 3 queries (typically ones where Taumode's re-ranking creates slightly steeper drops).

<img src="../assets/blog/016/cve/cve_c19_wins.png" alt="diagram 19 Method Wins" width="88%"/>

### Spectral Score Lift per Query

Every query shows positive lift, ranging from +0.02 (Q14) to +0.07 (Q3). This confirms that even when the spectral re-ranking diverges from cosine, it produces higher absolute scores.

<img src="../assets/blog/016/cve/cve_c16_benefit.png" alt="diagram 16 Spectral Score Lift" width="88%"/>

### CVE Dataset Summary Table

| Metric | Cosine | Hybrid | Taumode |
| :-- | :-- | :-- | :-- |
| Avg Top-1 Score | 0.8434 | 0.8734 | **0.8970**  |
| Avg T/H Ratio | 0.9891 | 0.9896 | **0.9903**  |
| Avg Tail CV | 0.0029 | 0.0030 | **0.0028**  |
| NDCG vs Cosine | — | 0.763 | 0.685  |
| Top-1 Wins | 0/18 | 0/18 | **18/18**  |

The CVE results validate the operationally useful interpretation: even if the epiplexity reading of λ is approximate, the manifold L = Laplacian(Cᵀ) provides a computationally cheap spectral proxy that consistently improves search scores and tail stability across diverse vulnerability queries.

---

## Dorothea 100K sparse one-hot classification and search

### Classification Performance

#### Method F1 Comparison

The grouped bar chart shows that **pure lambda k-NN achieves F1=0.000 across all five graph configurations**, while cosine k-NN reaches F1=0.867 consistently. Hybrid methods only approach cosine performance when alpha nears 1.0 (minimal spectral component).

<img src="../assets/blog/016/dorothea/chart1_f1_comparison.png" alt="diagram 1 F1 Comparison" width="88%"/>


#### Balanced Accuracy Heatmap

The heatmap reveals a stark binary pattern: methods involving cosine similarity show green (balanced accuracy ~0.93), while lambda-only and UMAP methods show red (~0.50, random chance). No graph wiring configuration improves the outcome for pure spectral classification.

<img src="../assets/blog/016/dorothea/chart2_balanced_acc_heatmap.png" alt="diagram 2 Balanced Acc Heatmap" width="88%"/>

#### Method Ranking

The horizontal ranking confirms cosine k-NN as the clear winner, with hybrid methods degrading monotonically as spectral weight increases (lower alpha). Lambda k-NN and UMAP 2D both fail to classify the minority class.

<img src="../assets/blog/016/dorothea/chart25_verdict.png" alt="diagram 25 Summary" width="88%"/>

### Search / Hybrid Analysis

#### Alpha Sweep: F1 Response

F1 monotonically increases with alpha across all configurations, meaning **more cosine = better performance** on this dataset. The tight_clusters config shows the strongest hybrid result (F1=0.857 at α=0.9), but still below pure cosine.

<img src="../assets/blog/016/dorothea/chart3_alpha_sweep_f1.png" alt="diagram 3 Alpha sweep F1" width="88%"/>

#### Precision-Recall Tradeoff

The dual panel reveals that lower alpha values sacrifice recall heavily while providing only marginal precision gains in some configs. The precision-recall curves show that spectral weighting creates an unfavorable tradeoff for classification tasks.

<img src="../assets/blog/016/dorothea/chart4_alpha_tradeoffs.png" alt="diagram 4 Alpha tradeoffs" width="88%"/>

#### Time vs F1 Tradeoff

Hybrid search takes ~390s per query versus ~45s for pure cosine—an **8× slowdown for equal or worse F1**. The star markers (cosine baseline) consistently sit higher than hybrid points that cost 8× more compute.

<img src="../assets/blog/016/dorothea/chart15_time_vs_f1.png" alt="diagram 15 Time vs F1" width="88%"/>

#### k-Sensitivity Curves

Lambda k-NN produces flat-zero lines for F1, precision, and recall regardless of k, while cosine k-NN stabilizes quickly at k≥3. UMAP shows noisy, near-zero signals. This confirms the failure mode is structural, not parametric.

<img src="../assets/blog/016/dorothea/chart13_k_sensitivity.png" alt="diagram 13 K-sensitivity" width="88%"/>

### Spectral Diagnostics (Novel)

#### Lambda Distributions: Class Overlap

The violin plots deliver the core diagnostic: **positive and negative class lambda distributions are nearly identical**. Cohen's d ranges from 0.046 to 0.086 (negligible effect size) across all configurations.

<img src="../assets/blog/016/dorothea/chart5_lambda_violins.png" alt="diagram 5 Lambda distribution violins" width="88%"/>

#### Lambda Density Landscape

The KDE comparison shows that different graph configs shift the lambda mean (0.21–0.35) but classes remain inseparable within every config. The manifold L = Laplacian(Cᵀ) captures geometric structure but not the biochemical class boundary.

<img src="../assets/blog/016/dorothea/chart12_lambda_kde.png" alt="diagram 12 Lambda Density" width="88%"/>

#### Lambda CDF with KS Test

The cumulative distribution functions for positive vs negative classes are nearly superimposed. KS statistics are small and p-values large, formally confirming no distributional separation via lambda.

<img src="../assets/blog/016/dorothea/chart24_lambda_cdf_ks.png" alt="diagram 24 cumulative distribution functions" width="88%"/>

#### Lambda Quantile Class Composition

Breaking items into lambda deciles shows that **no quantile consistently enriches the positive class** above the 9.8% base rate. This rules out even threshold-based spectral classification strategies.


<img src="../assets/blog/016/dorothea/chart16_lambda_quantile_class.png" alt="diagram 16 Lambda Quantile" width="88%"/>


### Novel Structural Visualizations

#### Lambda Contour Fields Over UMAP

The contour maps interpolate lambda as a continuous field over UMAP 2D space. The × markers (positive class) scatter across all lambda regions without clustering into distinct spectral zones—lambda topology doesn't align with class boundaries.

<img src="../assets/blog/016/dorothea/chart22_lambda_contour.png" alt="diagram 22 UMAP Lambdas Contours" width="88%"/>

#### Lambda-UMAP Fusion

Coloring UMAP scatter plots by lambda value reveals that spectral energy is **spatially diffuse**: high-lambda and low-lambda items are interleaved with no class-correlated spatial patterns.

<img src="../assets/blog/016/dorothea/chart8_lambda_umap_fusion.png" alt="diagram 8 Lambda UMAP Fusion" width="88%"/>

#### Spectral Quality Radar Profiles

Each graph configuration produces a distinct spectral fingerprint, but none achieves the combination needed for classification: high Cohen's d + low overlap. HiCompress shows the highest spectral gap but worst Cohen's d.

<img src="../assets/blog/016/dorothea/chart6_spectral_radar.png" alt="diagram 6 Spectral Radar" width="88%"/>


#### Spectral-Performance Correlation Matrix

The correlation analysis reveals a **negative correlation (-0.73) between best alpha and best hybrid F1**. Lambda std (+0.75) and lambda mean (+0.60) correlate positively with F1—but this reflects that configs with wider lambda spread allow the cosine component to do more work at higher alpha, not that spectral features help.

<img src="../assets/blog/016/dorothea/chart14_correlation_matrix.png" alt="diagram 14 Spectral Correlation Matrix" width="88%"/>


#### Rank Stability Across Configs

The Spearman rank-order correlation between lambda orderings across configs is **near zero** (ρ ∈ [-0.05, 0.11]). This means the manifold Laplacian assigns items to different spectral positions depending on config—lambda is not a stable item property on Dorothea.

<img src="../assets/blog/016/dorothea/chart20_rank_stability.png" alt="diagram 20 Spearman Rank-order correlation" width="88%"/>


#### Effective Rank vs Participation Ratio

Both metrics sit near N=800 (the number of items), indicating the Laplacian spectrum is **near full-rank with minimal compression**. The manifold captures little low-dimensional structure from the 100k sparse features—there's no spectral bottleneck to exploit.

<img src="../assets/blog/016/dorothea/chart17_rank_vs_participation.png" alt="diagram 17 Rank vs Participation" width="88%"/>


#### Information Bottleneck Pipeline

The pipeline visualization traces dimensionality from 100k → 220 (JL projection) → 50 (clusters) → 220 (Laplacian) → 1 (lambda). Classification signal survives through the cosine path but is completely lost at the lambda compression stage.

<img src="../assets/blog/016/dorothea/chart21_info_bottleneck.png" alt="diagram 21 Information Bottleneck" width="88%"/>


#### Method Dominance Sankey

The Sankey flow visualizes how all five configs route through four method types into performance tiers. **Only cosine reaches the "High F1" tier**; lambda and UMAP flow entirely to "Failed."

<img src="../assets/blog/016/dorothea/chart23_sankey.png" alt="diagram 23 Sankey method flows" width="88%"/>


#### Spectral Diagnostic Bubble

The bubble chart places each config in Cohen's d × F1 space, sized by Fiedler value and colored by overlap. All configs cluster in the low-d, moderate-F1 region—confirming that spectral class separation is the binding constraint.

<img src="../assets/blog/016/dorothea/chart9_spectral_diagnostic.png" alt="diagram 9 Spectral Diagnostic bubble" width="88%"/>



#### Parallel Coordinates: Config Signatures

Each config traces a unique path through spectral metrics but **converges to identical cosine F1 (0.867)** while diverging on hybrid F1. This confirms that spectral variation affects only the spectral component, which is net-negative for this task.

---

## Conclusion

Consider joining the [next online event about all this](https://luma.com/n9zexz3g).

Take aways:
* `arrowspace` eigenmaps excels in semantically linked features.
* to work on non-semantically linked (sparse) features, energymaps will be tested if they perform better; `surfface` will be probably a better tool also for classification because it redesigns the compression step and build a much more information-dense laplacian (we will try to see also how this is related to the concept of Epiplexity). There is a lot to understand in terms of distribution of lambdas and/or how to build a better 1D representation. **taumode** works for searching-indexing but other 1D scores can be designed for other purpose using the same base provided by [Graph Wiring](/posts/014_arrowspace_and_string_theory_minimal_surfaces).
* **Graph Wiring** has potential to be a general-purpose technique for graph search, classification and analysis. Any vector space with semantic linking can leverage Graph Wiring; or semantic linking can be built up from any dense vector space with enough data to allow linking of features-space. This can be seen in general terms as the inverse operation for Graph Embeddings and my guess is that the two operations can meet in the middle-ground between graphs and spaces to unlock next-gen applications (see [Genefold](https://docs.google.com/presentation/d/1Mtz-_85qpVROnp4U2VrnlSHn0266Z1yc_HfjUtfxYLs/) as example).

⚠️ `arrowspace` is not meant for or fails in these cases:
* Supervised Classification (Dorothea results):
* Spectral features needs to replace semantic features for class boundaries
* Lambda-only classification is non-viable; 1D lambdas are not a classification tool
* High-dimensional sparse domains without semantic structure: Biochemical data, genomics
* Domains where features are independent, not manifold-structured

✅ STRONG Product Potential:
* Spectral Vector Database for RAG/Search
* Built-in OOD detection via lambda deviation
* Superior tail quality for semantic search (proven in CVE test)
* Data drift monitoring via spectral signatures
* Active learning guidance (high-lambda items = high epiplexity)

According to my current understanding:
* There is a hint about `arrowspace`, despite being not a classification algorithm yet, performing better that UMAP on an 100K dataset in terms of classification.
* `arrowspace` provides better long-term multi-query multi-iteration tails-aware search for RAG systems; in times when the incidence of "large tails" has taken place in the discussion, I think this could be a mitigating factor for problems like: systems that get stuck in local minima for lack of variety in querying options and systems that seems to not consider outcomes from previous iterations. This is possbile through the lift provided by the spectral querying and the potential accumulation of relevant memory due to in-process query's alpha adjustments and lambda-aware feedback. 
