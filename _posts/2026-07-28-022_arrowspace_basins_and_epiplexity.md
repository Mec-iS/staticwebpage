---
layout: post
title: "arrowspace for Latent Spaces — part 3"
subtitle: "Can epiplexity separate trivial basins from useful basins inside a subspace?"
date: 2026-07-26
categories: [AI, Research, Mechanistic Analysis]
tags: [arrowspace, epiplexity, mechanistic-interpretability, transformers, spectral-analysis, semantic-basins]
description: "A protocol for combining ArrowSpace local basin analysis with epiplexity to distinguish trivial smooth regions from useful learnable structure inside transformer subspaces."
---

In [part 2](/posts/020_arrowspace_semantic_basins_part2/), I used ArrowSpace to study transformer
 representations as dual geometric and semantic objects: token neighborhoods in item space, and
 operator-induced structure in feature space. The result was not just a list of "important layers" but
 a map of layer-role subspaces where semantic structure sharpens, especially along the dual/readout
 side of the model. That analysis exposed something important and I am going to extend it here leveraging
 part of the theory defined in [Intelligence From Learnable Novelty](https://arxiv.org/pdf/2607.18433)
 pre-print paper.

A low-energy basin is not automatically a useful basin. Some basins are smooth because they contain
 meaningful, compressible structure. Others are smooth because they are trivial: locally regular, easy
 to predict, and mechanically uninteresting. If mechanistic analysis is meant to tell us where the model
 is doing useful internal work, then smoothness alone is not enough.

This suggests a sharper question for Part 3:

> Can epiplexity separate trivial basins from useful basins inside a given subspace or transition zone?

The question comes from a recent paper on **learnable novelty**, which proposes epiplexity as a quantity
 that rewards structure that is surprising enough to matter but regular enough to be learned. That
 distinction matters here. ArrowSpace already gives me a way to locate local basins and spectral
 transition zones. Epiplexity may provide a second filter: not "where is the geometry smooth?”
 but "where is the geometry smooth in a way that still contains learnable structure?”

This is a different objective from the one I initially considered.

ArrowSpace and Epiplexity are *not* globally correlated, as if they were
 two imperfect thermometers for the same hidden variable. That would be too blunt, and it would probably
 miss the actual mechanistic opportunity. The more useful question is local and operational:

- Is a basin merely low-energy?
- Or is it also a site where the model has created useful learnable structure?
- Can that distinction help identify better targets for inspection, intervention, or ablation?

## A revised definition of semantic basin

Part 2 treated semantic basins primarily through local spectral structure: low Laplacian energy,
 coherent neighborhoods, and field-selective concentration in certain layer-role subspaces.
 For Part 3, I want to tighten that definition.

A **semantic basin** will no longer mean just a locally smooth region in one ArrowSpace view.
 Instead, I will treat it as the cross-section of two signals:

1. **ArrowSpace locality** — a neighborhood is spectrally coherent in item space and/or feature space.
2. **Epiplexity** — the same neighborhood supports learnable structure rather than mere regularity or noise.

Under this definition, a basin becomes interesting only when both conditions hold.

That immediately rules out two failure cases:

- **Trivial basin:** low spectral roughness, low epiplexity.
- **Noisy boundary:** high roughness, low learnability.

What remains is the more interesting case:

- **Useful basin or transition zone:** local coherence combined with non-trivial learnable structure.

This is the object I actually care about for mechanistic analysis.

## Why global correlation would be the wrong target

Part 2 already showed that semantic behavior is not uniformly distributed. It is concentrated in
 particular subspaces: specific layers, specific matrix roles, and especially the dual/readout
 directions where the model’s learned structure becomes easier to decode. If that is true,
 then a single global correlation coefficient is likely to flatten the very pattern I want to study.
 
So the protocol for Part 3 is deliberately local.

I want to rank neighborhoods *within* a subspace, compare those rankings across probes
 and check whether epiplexity helps discriminate between:

- smooth but uninteresting regions,
- noisy and unstable regions,
- and structured, inspectable regions where the model seems to be doing useful semantic work.

That is a mechanistic question, not a population-average one.

## Concrete protocol

The plan is as follows.

### 1. Re-run Part 2 at token level

Part 2 already works at the level of layer-role subspaces, and it already distinguishes:

- Probe A vs Probe B,
- primal/write vs dual/read,
- embeddings vs internal operators.

The first change is simple but important: re-run the analysis at the **token level**, not just as field means.

The objective is to keep local structure visible rather than averaging it away too early.

### 2. Build local neighborhoods per token and subspace

For each token in each projected subspace, construct a local $$k$$-nearest-neighbor neighborhood.

For each neighborhood, compute local ArrowSpace descriptors in both views:

- item-space spectral descriptors,
- feature-space spectral descriptors,
- local roughness or smoothness,
- and any local energy quantities already used in Part 2.

This replaces one global $$\lambda$$ per field with a local basin profile per token-neighborhood pair.

### 3. Define two epiplexity tasks

I want to use epiplexity in two distinct ways.

#### Cross-space learnability

Define:

- $$X =$$ local item-space coordinates,
- $$Y =$$ local feature-space spectral signature.

This gives a cross-space score:

$$
S_{\mathrm{cross}}
$$

The question here is whether the local geometry of neighboring items predicts the local
 semantic-feature pattern in a learnable way.

#### Operator learnability

Define:

- $$X =$$ pre-operator representation,
- $$Y =$$ post-operator representation.

This gives an operator score:

$$
S_{\mathrm{op}}
$$

The question here is whether a specific operator subspace is transforming inputs into outputs
 in a way that is not merely regular, but learnably structured.

This second score is especially relevant for mechanistic analysis, because it attaches
 learnability directly to the transformation performed by the model.

### 4. Rank, do not regress

Within each layer-role subspace, rank neighborhoods by:

- ArrowSpace local basin score,
- $$S_{\mathrm{cross}}$$,
- $$S_{\mathrm{op}}$$,
- contextual lift between Probe A and Probe B,
- and read/write asymmetry where relevant.

Then compare the rankings using:

- top-$$k$$ overlap,
- Spearman rank agreement,
- stability across probes,
- and concentration of high-scoring neighborhoods inside known semantically sharp subspaces.

This is better than forcing a single Pearson correlation across all points. I am not looking
 for a universal scalar law. I am looking for useful local agreement.

### 5. Prioritize FFN readout and late-layer dual subspaces

Part 2 already suggests where the most informative structure sits: late-layer readout directions,
 especially on the dual side.

So the first target is not "all subspaces equally.” The first target is:

- FFN readout,
- late-layer readout,
- and other subspaces where Part 2 already showed semantic sharpening.

If epiplexity adds value anywhere, it should add value there first.

## Working hypotheses

This protocol gives me four immediate hypotheses.

### H1. Global correlation may stay weak, but local agreement may appear inside the right subspaces

A weak global correlation would not be a failure.

The stronger prediction is narrower: inside the semantically active subspaces, local epiplexity rankings
 may align with ArrowSpace basin rankings even if the whole model does not show one clean cross-space trend.

### H2. Probe B should increase epiplexity where Part 2 already showed semantic sharpening

If Probe B is actually surfacing more usable semantic structure, then the neighborhoods highlighted by
 Probe B should show increased learnable novelty, not just increased dispersion.

This matters because it distinguishes sharpening from mere scattering.

### H3. The best mechanistic sites are not the smoothest ones overall

The most useful regions may be the neighborhoods with:

- strong epiplexity lift,
- tolerably low feature-space roughness,
- and stable local coherence.

That is a stricter condition than "low $$\lambda$$.”

### H4. Epiplexity is more useful as a filter for intervention targets than as a universal basin score

This may be the most important hypothesis.

If epiplexity helps rank which subspaces or neighborhoods are worth ablating, probing, or tracing,
 then it is already useful — even if it never becomes a universal semantic-basin metric.

That would still be a win for mechanistic analysis.

## A three-way basin typology

If this works, it gives a more precise vocabulary than Part 2 alone.

Each local neighborhood can be placed into one of three regimes:

| Regime | ArrowSpace profile | Epiplexity profile | Interpretation |
|---|---|---|---|
| Trivial basin | Smooth / low roughness | Low | Regular but mechanically uninteresting |
| Noisy boundary | Rough / unstable | Low | Surprising but not learnable |
| Useful basin | Locally coherent | High | Structured and learnable; strong intervention target |

This is the distinction I was missing before.

ArrowSpace alone is good at locating structure.

Epiplexity may help decide whether that structure is actually worth mechanistic attention.

## What success would look like

A successful result would **not** be "epiplexity correlates with everything.”

A successful result would look more like this:

- late readout subspaces contain neighborhoods with strong local rank agreement,
- Probe B increases epiplexity where semantic sharpening already appears,
- and the top-ranked neighborhoods are better ablation candidates than neighborhoods selected by smoothness alone.

That would justify redefining semantic basin as a joint object: local spectral coherence plus local
 learnable novelty.

## What failure would still teach

A null result would still be informative.

If epiplexity fails to separate useful basins from trivial ones, then that is evidence that ArrowSpace’s
 notion of basin structure and epiplexity’s notion of learnability are not aligned in these subspaces. That would not kill either framework. It would simply mean they are tracking different properties.

That is still valuable, because mechanistic analysis depends on getting the distinctions right.

## Why this matters for ArrowSpace

ArrowSpace has always been more than a retrieval trick or a vector indexing scheme. Its deeper promise is
 that semantic structure can be treated as geometry, and that this geometry can guide both interpretation and control.

What Part 3 adds is a stricter criterion for what counts as a meaningful geometric site.

Not every basin deserves attention.

The ones that matter are the ones where local spectral structure and local learnability meet.
