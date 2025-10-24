---
title: 006_a_score_for_topological_quality
layout: blog_default
date: 2025-10-24
author: tuned.org.uk
---

# A Score for topological quality of embeddings

You can find `arrowspace` in the:
* [Rust repository](https://github.com/Mec-iS/arrowspace-rs) ↪️ `cargo add arrowspace`
* and [Python repository](https://github.com/tuned-org-uk/pyarrowspace) ↪️ `pip install arrowspace`

One of the motivation for building `arrowspace` is the drive to improve quality of records retrieved by a search. Let's start with a brief excursus on different scores for similarity and recall of document emebeddings, so to pave the way to **define a new score** that generalizes MRR to the entire top‑k by combining top‑weighted list metrics (nDCG, RBP, ERR) with **topology signals** computed on a query‑anchored feature graph such as conductance, modularity, and personalized PageRank to evaluate both content quality and structural coherence beyond geometric similarity alone. Concretely, we are going to use Graph‑aware RBP, Topology‑Discounted nDCG, Intent‑ and Topology‑aware ERR, a Subgraph Quality Index, and RBO‑based stability to score all k results by relevance distribution and graph structure while avoiding recall or direct comparisons to geometry‑only baselines.

## Why not recall@k or NDCG@10
Conventional recall@k aligns weakly with end-to-end utility in many vector-search applications and ignores the structure and decision context of range or neighborhood matching, motivating structure-aware alternatives such as range-search–oriented metrics like RSM and, here, `graph-topology–aware scoring`. A topology-augmented score makes ranking consistent with the dataset’s manifold and community structure instead of only matching a geometric ground truth list.

The score we are going to define improves on NDCG@10 by evaluating the whole k‑result set and how it sits inside the corpus feature graph (smoothness, conductance, clustering, modularity), reducing top‑position bias and capturing manifold coherence and diversity that NDCG does not measure. It is label‑agnostic and topology‑aware, so it can be applied even when explicit graded relevance judgments are sparse or incomplete, where NDCG’s reliability is known to degrade under pooling bias and shallow judgments.

## Goals
* Cover the entire top‑k rather than only the first relevant item, extending MRR’s focus on the first hit with list metrics that aggregate graded gains across ranks.​
* Incorporate topology via a kNN or feature graph to assess cohesion, community alignment, and random‑walk affinity of the result set in addition to per‑item geometric proximity.


### Comparison

<div class="table-container"> <table> <thead> <tr> <th>Aspect</th> <th>NDCG@10</th> <th>new score</th> </tr> </thead> <tbody> <tr> <td>Scope</td> <td>Top‑10 focus with logarithmic discount on positions 1–10</td> <td>Entire k‑set scored, including tail effects and within‑set balance</td> </tr> <tr> <td>Labels</td> <td>Requires graded relevance labels for DCG/IDCG</td> <td>Label‑agnostic; operates on feature graph and similarities</td> </tr> <tr> <td>Structure</td> <td>Ignores graph topology; purely rank and gain based</td> <td>Uses Laplacian smoothness, conductance, clustering, modularity</td> </tr> <tr> <td>Diversity</td> <td>No explicit redundancy control</td> <td>Penalizes intra‑set redundancy via MMR‑style term</td> </tr> <tr> <td>Robustness to incompleteness</td> <td>Sensitive to shallow/incomplete pooling judgments</td> <td>Computable without judgments; robust to label sparsity</td> </tr> <tr> <td>Calibration</td> <td>Can be unbounded with negative labels</td> <td>Components normalizable to bounded ranges</td> </tr> </tbody> </table> </div>

### Proposed scores (geometry + topology)

- Graph‑aware RBP (G‑RBP): to reward items that are relevant, well embedded in the growing result subgraph, and community‑aligned.
- Topology‑Discounted nDCG (TD‑nDCG): to reflect relevance, novelty, and structure jointly.
- Intent‑ and Topology‑aware ERR (IT‑ERR): blending ERR’s cascade with subtopic novelty and topology‑based satisfaction.
- Subgraph Quality Index (SQI@k): summarizing cohesion, community alignment, and query‑anchored random‑walk mass of the entire result set.
- RBO‑Stability (RBO‑S): compute $$RBO_p$$ between the observed ranking and rankings from mild query perturbations or index seeds to assess robustness of ordering without comparing geometric distances directly.

These are all part of the battery of tests to assure the quality of `arrowspace` towards the MS MARCO (BeIR) dataset. The test generate a graph using `networkx` to simulate communities, `arrowspace` is build with this dataset as reference and the above scores are computed to test *quality* of accurancy in broader terms than geometric distance. This dataset has been selected because in my experience it is a difficult bench for graph-aware embeddings compared to mathematical properties not related to text where representation of phenomena is not too dependant on the kind of embeddings models used; every texts embeddings dataset is very dependant from the model used to generate the raw input, while raw input from a sensor is more easily handled in terms of features relationship. Even in presence of this scenario, `arrowspace` is slightly better than plain geometric search, see data from the test below.

## MRR-Top0

**MRR-Top0** (Mean Reciprocal Rank with Topology) is a novel ranking metric that extends classic MRR to evaluate the entire top‑$$k$$ result set by weighting each relevant item's reciprocal rank contribution with a topology factor that captures graph structure, cohesion, and query‑anchored random‑walk affinity, thereby scoring both relevance order and structural quality beyond geometric similarity. It generalizes MRR's single‑hit focus to a multi‑rank harmonic mean weighted by personalized PageRank, conductance, and modularity, producing a unified score for retrieval effectiveness and graph coherence.

### Definition

`MRR-Top0` computes a topology‑weighted reciprocal rank for each query by summing the reciprocal of each relevant item's rank, scaled by a topology factor $$T_i$$ that reflects the item's structural quality within the result subgraph. The formula is:

$$
\text{MRR-Top0} = \frac{1}{|Q|} \sum_{q=1}^{|Q|} \sum_{i \in \mathrm{Rel}(q)} \frac{T_{q,i}}{\text{rank}_{q,i}}
$$

where $$Q$$ is the set of queries, $$\mathrm{Rel}(q)$$ is the set of relevant items for query $$q$$ up to rank $$k$$, $$\text{rank}_{q,i}$$ is the position of item $$i$$, and $$T_{q,i}$$ is the topology factor for item $$i$$ given query $$q$$.

### Topology factor

The topology factor $$T_{q,i}$$ combines **three graph signals** to reward items that are structurally well‑positioned:

$$
T_{q,i} = \lambda_1 \, \text{PPR}(q, i) + \lambda_2 \, \big(1 - \phi(S_{q,1:i})\big) + \lambda_3 \, \Delta Q(S_{q,1:i})
$$

- **Personalized PageRank** $$\text{PPR}(q, i)$$: random‑walk affinity from the query anchor to item $$i$$, capturing how well $$i$$ is connected to the query on the feature graph.
- **Conductance penalty** $$1 - \phi(S_{q,1:i})$$: cohesion of the partial result set up to rank $$i$$, where lower conductance indicates a tight subgraph.
- **Modularity gain** $$\Delta Q(S_{q,1:i})$$: community alignment of the partial result set, rewarding rankings that respect intrinsic clusters in the corpus.

The weights $$\lambda_1, \lambda_2, \lambda_3$$ (summing to 1) are tuned to task requirements, e.g., $$\lambda_1=0.5, \lambda_2=0.3, \lambda_3=0.2$$ for query‑centric retrieval.

### Key properties

**Generalization of MRR**: When $$T_{q,i}=1$$ for all $$i$$ and only the first relevant item is considered.

**Multi‑rank evaluation**: `MRR-Top0` aggregates contributions from all relevant items in the top‑$k$, not just the first hit, addressing MRR's limitation of ignoring deeper relevant results.

**Topology‑aware**: By weighting reciprocal ranks with PPR, conductance, and modularity, the metric scores how well the ranking reflects both relevance and graph structure, avoiding reliance on geometry alone.

**Harmonic mean interpretation**: The reciprocal of `MRR-Top0` corresponds to a topology‑weighted harmonic mean of relevant ranks, analogous to MRR's harmonic mean of first‑hit positions.

### Rationale

**Extend MRR coverage**: Classic MRR stops at the first relevant rank, ignoring whether additional relevant items appear at ranks 2, 3, etc., which matters when users examine multiple results.

**Reward structural coherence**: A result set with high conductance or low modularity may contain relevant items that are topologically scattered or poorly connected to the query, indicating potential topical drift; `MRR-Top0` penalizes such rankings via $$T_{q,i}$$.

**Query‑anchored weighting**: PPR focuses the topology signal on the query neighborhood, ensuring that distant but geometrically similar items receive lower $$T$$ if they are not well connected via the feature graph.

### Practical guidance

**Set $$k$$ cutoff**: Limit $$\mathrm{Rel}(q)$$ to top‑$$k$$ (e.g., $$k=10$$) to match user attention span and reduce computational cost of topology metrics.

**Normalize $$T_{q,i}$$**: Scale PPR, conductance, and modularity to \$\$ so the topology factor is bounded and interpretable; typical values are $T_{q,i} \in [0.2, 1.0]$ with well‑tuned weights.

**Graph construction**: Build a kNN or $$\epsilon$$‑radius graph on corpus embeddings (e.g., $$k=15$$, cosine similarity) and precompute community structure; update topology factors incrementally as results are ranked.

**Comparison baseline**: Report both MRR (geometry‑only) and `MRR-Top0` (geometry + topology) to quantify the added value of structural signals; improvements of 5–15% in `MRR-Top0` indicate meaningful topology contribution.

### Example calculation

Suppose query $$q$$ retrieves results at ranks 1, 3, 5 with relevance judgments $$\{1,3,5\} \in \mathrm{Rel}(q)$$ and topology factors $$T_{q,1}=0.9$$, $$T_{q,3}=0.7$$, $$T_{q,5}=0.5$$:

$$
\text{MRR-Top0}_q = \frac{0.9}{1} + \frac{0.7}{3} + \frac{0.5}{5} = 0.9 + 0.233 + 0.1 = 1.233
$$

Standard MRR would give $$\frac{1}{1}=1.0$$, ignoring ranks 3 and 5 and all topology, so `MRR-Top0`'s higher value reflects credit for multiple relevant items and their structural quality.

### Implementation snippet

```python
def mrr_topo(retrieved_ranks, relevance_dict, topology_factors, k=10):
    """
    Compute MRR-Top0 for a single query.
    
    Args:
        retrieved_ranks: List of (item_id, rank) tuples
        relevance_dict: Dict {item_id: relevance_score > 0 if relevant}
        topology_factors: Dict {item_id: T_i in [0,1]}
        k: Cutoff rank
    
    Returns:
        MRR-Top0 score (float)
    """
    score = 0.0
    for item_id, rank in retrieved_ranks:
        if rank > k:
            break
        if relevance_dict.get(item_id, 0) > 0:
            T_i = topology_factors.get(item_id, 1.0)
            score += T_i / rank
    return score
```


### Why MRR-Top0 satisfies the brief

**Generalizes MRR to top‑$$k$$**: The metric sums reciprocal ranks for all relevant items up to $$k$$, not just the first, extending MRR's scope to the entire result list.

**Incorporates topology**: The $$T_{q,i}$$ factor blends PPR, conductance, and modularity to assess both item‑level affinity and subgraph cohesion, moving beyond geometric similarity.

**Avoids direct geometry comparisons**: `MRR-Top0` does not compare vector distances or recall; instead **it weights reciprocal ranks by graph structure, grounding evaluation in user‑facing rank quality and topology**.

**Practical and interpretable**: As a natural extension of MRR with bounded topology weights, `MRR-Top0` retains MRR's simplicity while adding structural awareness, making it suitable for IR benchmarks and production retrieval systems.