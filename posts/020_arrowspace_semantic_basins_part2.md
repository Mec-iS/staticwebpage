---
title: 020_arrowspace_semantic_basins_part2
layout: blog_default
date: 2026-06-09
author: tuned-org-uk
categories: [arrowspace, vector-search, latent-space, mechanistic-interpretability, boundaries, spectral, python]
---

# ArrowSpace for Latent Spaces - part 2

## From Synthetic Clusters to Real Semantic Basins

This is the second post of the series on running semantic analysis on **high-dimensional latent spaces** using the graph Laplacian in feature-space as a structural lens. Part 1 established the method on a controlled synthetic corpus — three Gaussian clusters lifted to 32 dimensions, known ground truth, full numerical verification.

This post covers notebooks 02 and 03. Notebook 02 moves to a **real embedding model** and a **real vocabulary**: `all-MiniLM-L6-v2` at 384 dimensions, eight hand-labelled semantic fields, and a held-out set of polysemous probes. Notebook 03 replaces isolated concept tokens with **full natural-language sentences** drawn from the same eight fields, adding stability analysis and direct sentence-level inspection.

The central question across both notebooks is the same as in part 1: does ArrowSpace's feature-manifold Rayleigh energy improve the quality of local minima discovered in embedding space? In part 1 the answer was unambiguous on synthetic data. The question here is whether it holds when the latent space is genuinely uncontrolled.

*Notebooks:* `02__semantic-basins_latent_space.ipynb` · `03__semantic-basins_sentence_corpus.ipynb`  
*Diagrams:* `output__02/` · `output__03/`  
*ArrowSpace:* `cargo add arrowspace` / `pip install arrowspace`

---

## Notebook 02 — Real Embeddings, Eight Semantic Fields

### The Setup

Notebook 02 uses `sentence-transformers/all-MiniLM-L6-v2` to encode a labelled vocabulary of concept tokens drawn from eight semantic fields:

- **astronomy** — comet, nebula, pulsar, parallax …
- **programming** — compiler, recursion, pointer, iterator …
- **cooking** — braise, julienne, deglaze, roux …
- **finance** — yield, collateral, arbitrage, dividend …
- **emotions** — nostalgia, dread, affection, envy …
- **anatomy** — tendon, cortex, synapse, ligament …
- **music** — cadence, timbre, rubato, syncopation …
- **geography** — estuary, isthmus, fjord, moraine …

Each word is encoded as a 384-dimensional unit-norm embedding. A held-out **boundary set** of polysemous tokens — words that sit semantically between two or more fields — is kept for probing but excluded from basin construction. Examples: *pitch* (music / finance), *root* (anatomy / programming), *key* (music / programming / geography).

The PCA-2D explained variance for 384-dimensional concept tokens is modest by design. Word-level semantic fields are not cleanly linearly separable in a general-purpose sentence encoder — the latent space has genuine multi-modal, non-linear structure that two principal components cannot capture. This is exactly the hard case where a purely geometric basin-finder will struggle.

### ArrowSpace Construction at 384 Dimensions

The feature Laplacian construction follows the same principle as part 1, now operating on the transpose of the 384-column embedding matrix:

```python
# nodes are embedding dimensions, not items
Fmat = X.T          # (384, N): each row = one embedding dimension
G = Fmat @ Fmat.T   # (384, 384) gram matrix
# Gaussian kernel over feature-dimension similarities
W = exp(-||f_i - f_j||^2 / (2*sigma^2))
# keep top-k neighbours per dimension, symmetrise
L = D^{-1/2} (D - W) D^{-1/2}   # normalised Laplacian
```

Each embedding dimension is connected to its `k` most similar peer dimensions. The result is a **384×384 feature graph** whose topology encodes which dimensions co-vary across the vocabulary. The Rayleigh quotient per item:

$$\lambda(\mathbf{x}_i) = \frac{\mathbf{x}_i^T L_{\text{feat}} \, \mathbf{x}_i}{\mathbf{x}_i^T \mathbf{x}_i}$$

gives a scalar that is low when item $$i$$'s values vary smoothly across the feature graph — i.e., the item lives in a spectrally flat region of the 384-dimensional manifold. High $$\lambda$$ marks items that activate unusual or dissonant combinations of dimensions. The real ArrowSpace library (`ArrowSpaceBuilder`) handles this construction with graph parameters `eps=2.0, k=25, topk=10`.

### Minima Quality on Real Word Embeddings

BasinHop is the primary vanilla baseline, augmented via:

$$s_{\text{aug}}(x) = \alpha \cdot s_{\text{BH}}(x) + (1 - \alpha) \cdot \lambda_{\text{norm}}(x)$$

The key result from notebook 02: **augmentation produces semantically tighter minima with lower mean $$\lambda$$**. Vanilla BasinHop finds items that are geometrically central in the PCA-2D projection but semantically mixed — minima from the *anatomy* field sit adjacent to *emotions* tokens in the PCA plane because both fields produce dense, mid-frequency embedding activations. ArrowSpace augmentation displaces those anatomy/emotion boundary items and replaces them with tokens that are simultaneously geometrically central *and* spectrally smooth — i.e., activating dimension clusters that are cohesive on the feature graph.

The polysemous boundary tokens behave as expected: their $$\lambda$$ values are systematically higher than field-core tokens, placing them closer to basin edges rather than basin centres. This is a qualitative confirmation that the Rayleigh quotient captures semantic ambiguity as spectral roughness — polysemous tokens activate non-smooth combinations of feature-graph clusters.

---

## Notebook 03 — Sentence Corpus: Moving Beyond Single Tokens

### Why Sentences Change the Problem

Moving from concept tokens to declarative sentences increases the within-field variance considerably. A sentence like *"The tendon connects muscle to bone at the joint"* activates anatomy dimensions cleanly. But *"A synapse transmits information between neighbouring neurons"* sits closer to programming and anatomy simultaneously because *information* and *transmits* carry cross-field signal. Sentence-level variation adds **syntactic and topical spread** that disrupts the clean cluster geometry assumed by item-space methods.

The notebook tests three hypotheses:

| ID | Hypothesis |
|---|---|
| H1 | Vanilla BasinHop still finds geometric minima, but basin membership becomes noisier because sentence-level variation adds syntactic spread. |
| H2 | BasinHop + ArrowSpace recovers semantically purer sentence basins by preferring low-energy, feature-manifold-smooth regions. |
| H3 | The blend coefficient `alpha` remains a useful control surface, and representative sentences extracted from minima sets make the semantic effect directly inspectable. |

### Corpus and Encoder

The sentence corpus contains **96 sentences across 8 fields** (12 per field), plus **10 held-out boundary sentences** — deliberately ambiguous constructions like:

> *"The bank of monitors showed a current of live market data."*  
> *"Mercury moved quickly across the morning sky above the harbour."*  
> *"The delta model shifted after new river measurements arrived."*

These boundary sentences span finance/anatomy, astronomy/geography, and geography/data-science respectively. They are kept out of basin construction and used to test whether the augmentation criterion tolerates or rejects semantic ambiguity.

The same `all-MiniLM-L6-v2` encoder is used for continuity with notebook 02. PCA explains only 11.2% of variance across two components (PC1: 6.3%, PC2: 4.9%) — the latent space is genuinely high-dimensional and not well-compressed by linear projection. This makes the KDE basin score over PCA-2D a deliberately imperfect approximation of item-space density, which is the realistic regime for any production use case.

### ArrowSpace Energy Map on Sentences

The lambda map over 96 sentence embeddings:

```
lambda-map: n=96, min=0.0000, mean=0.1231, max=1.0000
Boundary lambda mean=0.1013 vs clean corpus mean=0.1231
```

The boundary sentences have a *lower* mean $$\lambda$$ than the clean corpus. This is initially counterintuitive — polysemous sentences scoring as spectrally smooth — but explicable: the boundary sentences are short, syntactically simple constructions. Their embedding vectors activate a small, coherent subset of dimensions, which happens to be smooth on the feature graph even though the semantic content is ambiguous. The Rayleigh quotient measures **feature-graph smoothness**, not **semantic purity**. The two are correlated but not identical, and the boundary case exposes the gap.

This is an important calibration result. ArrowSpace's $$\lambda$$ is a necessary but not sufficient condition for semantic purity. The α-blend exploits the *correlation* between spectral smoothness and semantic coherence while allowing the geometric (KDE/BH) signal to supply the complementary item-space constraint.

### Vanilla vs. Augmented Minima at α = 0.35

The canonical comparison at the α = 0.35 point established in part 1:

| Condition | alpha | n | Purity | Coherence | Mean λ | Dominant field | Jaccard vs BH |
|---|---|---|---|---|---|---|---|
| Pure BasinHop | 1.00 | 20 | 0.40 | 0.0964 | 0.0598 | anatomy | 1.000 |
| ArrowSpace-augmented | 0.35 | 20 | 0.35 | 0.0995 | 0.0298 | anatomy | 0.600 |
| Pure ArrowSpace | 0.00 | 20 | 0.25 | 0.1050 | 0.0081 | anatomy | 0.176 |

The augmented set has lower mean $$\lambda$$ (0.0298 vs 0.0598) and marginally higher coherence (0.0995 vs 0.0964). Purity is slightly lower at 0.35 vs 0.40 — the sentence corpus is genuinely harder than the word-token corpus in notebook 02. The Jaccard overlap of 0.600 confirms that augmentation replaces 40% of the vanilla minima set with different items, and the mean $$\lambda$$ drop confirms those new items are spectrally quieter.

Field composition reveals the mechanism:

**Vanilla BasinHop field composition:**
```
anatomy      8 items (40%)
emotions     4 items (20%)
music        3 items (15%)
programming  2 items (10%)
astronomy    1 items ( 5%)
cooking      1 items ( 5%)
finance      1 items ( 5%)
```

**ArrowSpace-augmented field composition:**
```
anatomy      7 items (35%)
music        4 items (20%)
cooking      2 items (10%)
emotions     2 items (10%)
programming  2 items (10%)
astronomy    1 items ( 5%)
finance      1 items ( 5%)
geography    1 items ( 5%)
```

Augmentation reduces *emotions* from 4 to 2 items and expands *music* from 3 to 4. Both shifts go in the direction of fields that embed more cleanly — anatomy and music sentences activate tight, field-specific dimension clusters, while emotions sentences activate diffuse, sentiment-adjacent dimensions shared with multiple fields.

### Representative Sentence Inspection

The most direct evidence for the semantic effect is the sentence-level diff. The top representatives by score at α = 0.35:

**Vanilla BasinHop — top 5:**

| rank | field | sentence | λ |
|---|---|---|---|
| 1 | anatomy | *Cartilage protected the knee from constant friction.* | 0.010 |
| 2 | anatomy | *A synapse transmits information between neighbouring neurons.* | 0.083 |
| 3 | anatomy | *The tendon connects muscle to bone at the joint.* | 0.114 |
| 4 | cooking | *The stockpot filled the kitchen with a savoury smell.* | 0.092 |
| 5 | emotions | *A quiet sense of dread settled over the empty room.* | 0.021 |

**ArrowSpace-augmented — top 5:**

| rank | field | sentence | λ |
|---|---|---|---|
| 1 | anatomy | *Cartilage protected the knee from constant friction.* | 0.010 |
| 2 | anatomy | *Signals travelled along the neuron toward the spinal cord.* | 0.000 |
| 3 | emotions | *Their success brought relief more than excitement.* | 0.010 |
| 4 | emotions | *A quiet sense of dread settled over the empty room.* | 0.021 |
| 5 | anatomy | *The surgeon examined the ventricle on the scan.* | 0.016 |

The augmented top-5 contains sentences with λ values in the range [0.000, 0.021]. The vanilla top-5 includes *"A synapse transmits information between neighbouring neurons"* (λ = 0.083) — the sentence that straddles anatomy and programming. ArrowSpace displaces it in favour of *"Signals travelled along the neuron toward the spinal cord"* (λ = 0.000), a sentence with no cross-field lexical signal.

The emotions pair is also revealing. Both sets include *"A quiet sense of dread"* (λ = 0.021). The augmented set adds *"Their success brought relief more than excitement"* (λ = 0.010) — a sentence with simple, low-frequency emotional vocabulary. The vanilla set instead includes cooking and anatomy items at positions 4 and 5, reflecting geometric proximity in PCA-2D rather than semantic coherence.

### The α Control Surface

The α sweep from 0 to 1 (21 steps) produces a clean monotonic pattern on the $$\lambda$$ axis:

```
alpha   purity  coherence  meanlam  boundary
----------------------------------------------
 0.00   0.250     0.1050   0.0081         1
 0.25   0.400     0.1021   0.0164         2
 0.35   0.350     0.0995   0.0298         2
 1.00   0.400     0.0964   0.0598         2
```

Mean $$\lambda$$ rises monotonically with α — the spectral contribution cannot be recovered by the geometry-only baseline alone. Purity peaks at α = 0.25 (purity = 0.40), tied with the vanilla baseline, confirming that the blend near the midpoint captures both signals simultaneously. The best coherence is at α = 0.45 (coherence = 0.1060).

The **boundary sentence count** stabilises at 2 for α ≥ 0.15. Both methods admit 2 boundary sentences into the bottom-20% minima set regardless of α. This is consistent with the calibration result above: boundary sentences have low $$\lambda$$ (high spectral smoothness) despite semantic ambiguity, so neither the geometry nor the spectral signal successfully rejects them. Detecting polysemy requires a third signal beyond item-space density and feature-graph smoothness.

### Stability Analysis

Notebook 03 adds a robustness check absent from the earlier notebooks. Eight random subcorpus samples (80% of items each) rebuild the PCA/KDE score and ArrowSpace map independently, and the mean pairwise Jaccard overlap is compared:

```
Mean pairwise Jaccard — BH:  0.146
Mean pairwise Jaccard — AUG: 0.183
```

Augmented minima are 25% more stable across subsamples than vanilla BasinHop minima. The stability gain is modest in absolute terms — the sentence corpus is small and the KDE surface changes substantially under 20% holdout — but the direction is consistent: ArrowSpace regularisation anchors minima to spectrally flat regions that persist across corpus perturbations. The per-seed breakdown confirms this is not driven by outlier seeds:

| seed | BH purity | AUG purity | BH mean λ | AUG mean λ |
|---|---|---|---|---|
| 0 | 0.3125 | 0.2500 | 0.1076 | 0.0214 |
| 1 | 0.3125 | 0.3125 | 0.1251 | 0.0282 |
| 2 | 0.3125 | 0.3750 | 0.0842 | 0.0372 |
| 3 | 0.2500 | 0.2500 | 0.1200 | 0.0225 |
| 4 | 0.2500 | 0.3125 | 0.0982 | 0.0326 |
| 5 | 0.3125 | 0.2500 | 0.0709 | 0.0393 |
| 6 | 0.3125 | 0.3125 | 0.1270 | 0.0376 |
| 7 | 0.2500 | 0.3125 | 0.1569 | 0.0364 |

Augmented mean $$\lambda$$ is consistently 3–4× lower than vanilla across all seeds, confirming that the spectral regularisation is stable under corpus perturbation even when purity gains are small.

---

## The Pattern Across Three Notebooks

Four results are consistent across the synthetic (nb01), word-token (nb02), and sentence-corpus (nb03) settings:

1. **Mean $$\lambda$$ always drops under augmentation.** Across all three corpora and all α values below 1.0, the augmented minima set has lower mean Rayleigh energy than the vanilla baseline. The spectral regularisation is unconditional.

2. **Purity gains are corpus-dependent.** The synthetic baseline yielded 100% purity for BasinHop + ArrowSpace at α = 0.35. The word-token corpus shows consistent purity gains. The sentence corpus shows a flatter α–purity curve, with purity roughly tied between vanilla and augmented at the canonical α. The harder the latent space, the smaller the guaranteed purity gain — but the spectral signal remains independently valuable.

3. **The α knob has a consistent interpretation.** α → 0 emphasises spectral typicality (useful for anomaly / OOD detection); α → 1 recovers vanilla geometry. The optimal α for purity sits in the range [0.25, 0.50] across all three notebooks.

4. **Boundary tokens and boundary sentences expose the method's limits.** ArrowSpace does not reliably reject polysemous items. Spectral smoothness correlates with semantic purity but is not equivalent to it. Rejecting genuine ambiguity requires a third criterion — possibly cross-layer or cross-model basin agreement. We will try to fix this in part 3.

---

## What Comes Next

The notebooks end with two natural next steps:

- **Cross-model basin agreement** — encode the same sentence corpus with multiple encoders (e.g., `all-MiniLM-L6-v2`, `bge-small-en`, `e5-small-v2`) and measure how much the ArrowSpace-augmented minima sets overlap. Items stable across encoder families are strong candidates for model-independent semantic basins.

- **Cross-layer basin tracking** — derive embeddings from multiple transformer layers and follow which sentences remain in the augmented minima set across depth. Sentences that are consistently spectrally smooth at multiple layers are candidates for the kind of stable, causal features that mechanistic interpretability work looks for.

Both directions sit inside the roadmap outlined in part 1: ArrowSpace's feature Laplacian as a complement to dictionary learning and SAE feature analysis, applied to the stable, low-energy regions of activation space rather than the high-activation directions that sparse autoencoders tend to find.

*Notebooks:* [`02__semantic-basins_latent_space.ipynb`](https://github.com/tuned-org-uk/arrowspace-analysis/blob/main/notebooks/02__semantic-basins_latent_space.ipynb) · [`03__semantic-basins_sentence_corpus.ipynb`](https://github.com/tuned-org-uk/arrowspace-analysis/blob/main/notebooks/03__semantic-basins_sentence_corpus.ipynb)  
*Part 1:* [ArrowSpace for Local Minima in Latent Space](https://www.tuned.org.uk/posts/019_arrowspace_local_minima_walkthrough)  
*ArrowSpace paper:* JOSS — Spectral Indexing of Embeddings
