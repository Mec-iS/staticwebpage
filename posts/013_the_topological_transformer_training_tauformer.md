---
title: 013_the_topological_transformer_training_tauformer
layout: blog_default
date: 2026-01-18
author: tuned-org-uk
categories: [tauformer, transformers, attention, arrowspace, vector-search, knowledge-graphs]
---

# Training a 30M parameters Topological Transformer

Tauformer is a **topological transformer** (see [paper](https://www.techrxiv.org/users/685780/articles/1375955-topological-transformer-a-redesign-for-domain-memory-and-cheaper-kernel-operations)) that replaces dot‑product attention with a Laplacian-derived scalar (taumode) per token/head, then attends using distances in that scalar space.
Below is a post-style overview of the idea and the first training signals from a 30M-parameter run.

## Tauformer in one idea

Tauformer’s goal is to inject **domain structure** directly into attention by using a Graph Laplacian built from a domain embedding space (a “domain memory”) as a persistent reference.
Instead of ranking keys by $$Q\cdot K$$, Tauformer ranks them by how similar their Laplacian-derived taumode scalars are, which is intended to bias attention toward domain-relevant relations rather than generic geometric similarity.

At the implementation level, Tauformer keeps the familiar Q/K/V projections, RoPE, causal masking, and stable softmax/value aggregation pipeline, but changes how attention logits are computed.
Each head vector is compressed into a scalar $$\lambda$$ using a bounded Rayleigh-quotient energy computed with a feature-space Laplacian $$L$$, then logits are computed as a negative distance $$-|\lambda_q-\lambda_k|/\text{temperature}$$. 

Key building blocks (as implemented):

- Taumode scalar: compute $$E_{\text{raw}}=(x^\top L x)/(x^\top x+\varepsilon)$$, then bound it as $$E_{\text{raw}}/(E_{\text{raw}}+\tau)$$ to produce $$\lambda\in[0,1)$$.
- Logits: $$\text{att}_{ij} = -\|\lambda^Q_i - \lambda^K_j\|/\text{temperature}$$, then reuse causal mask $$→$$ subtract row max $$→$$ softmax $$→$$ multiply by $$V$$. 


## Why it can be cheaper

Because scoring no longer needs full key vectors, Tauformer’s KV-cache can store values plus a compact key-side scalar stream rather than both K and V tensors.
Concretely, the cache payload is $$(V,\lambda_k)$$ (not $$(K,V)$$), which yields an approximate ~50% per-layer cache reduction for typical head dimensions (small overhead for storing the extra scalar).

The design also anticipates using a sparse Laplacian from a precomputed domain manifold so computing $$\lambda$$ can depend on Laplacian sparsity (nnz) rather than dense $$D^2$$ multiplication. It exchanges the long preliminary adjustment of weights with a pre-training shorter phase in which a Laplacian is built using `arrowspace`.

## Run setup (what was trained)

This run trains a 30M-class TauGPT.
Training uses AdamW with base LR $$5\times10^{-4}$$ and a warmup of 100 steps, then keeps the base LR constant unless the plateau logic scales it down.
Data comes from a local JSONL file (`train.jsonl`) streamed through an IterableDataset, with a routed split where every 20th batch is used for validation ($$≈5%$$).


| Category | Setting | Value |
| :-- | :-- | :-- |
| Model | Class / size | TauGPT ~30M parameters (as labeled in the script output/logging)  |
| Model | Layers (`n_layer`) | 6  |
| Model | Heads (`n_head`) | 6  |
| Model | Embedding size (`n_embd`) | 384  |
| Model | Sequence length (`seq_len`) | 1024  |
| Model | Vocabulary size (`vocab_size`) | 30522  |
| Optimizer | Optimizer | AdamW  |
| Optimizer | Base learning rate | 5e-4  |
| LR schedule | Warmup | 100 steps  |
| LR schedule | Post-warmup behavior | Constant LR (no decay unless manually/externally adjusted)  |
| Data | Source file | Local JSONL file `train.jsonl`  |
| Data | Loading mode | Streamed via an IterableDataset-style pipeline (no shuffle in DataLoader)  |
| Validation | Split rule | Routed split where every 20th batch is used for validation  |
| Validation | Approx. validation fraction | About 5%  |

## Results at a glance

At step 100 the run reports train loss 4.6772 and val loss 4.9255 (PPL 107.47), and by step 2000 it reaches val loss 2.3585 (Perplexity 6.59).
The best validation point in the log is step 4500 with `val_loss=1.9146`, after which validation regresses to `2.3746` by step 5000.
The final run summary records `step=5000`, `best_val_loss=1.914555`, `current_lr_scale=0.03125`, and `total_tokens=655360000`. That is a good result for $~2$ hours of training on the smallest model.

The early phase is strong: validation drops from 4.93 at step 100 to ~2.36 by step 2000, showing that the model and pipeline learn effectively at this scale.
After that, validation becomes noisy (e.g., rising back to 2.92 at step 2100 and peaking near 2.95 at step 4200) before the late "lucky break" to 1.91 at step 4500.
Throughout, the run holds a fixed taumode value which means the attention geometry is not being updated as weights evolve as this will be take place in the next iterations.

## Baseline: Closing note

All the model's files, data, training settings and logs will be published with a permissive license once the results are consolidated and tests will move to a larger scale model.

This baseline run kept taumode fixed throughout, while using a simple validation loop and plateau-triggered LR scaling, and it still converged quickly in the early-to-mid training window.

Because the later part of the run shows volatility and regression after the best checkpoint, the next experiments focus on "adaptive" taumode strategies where taumode is recalibrated at intervals (including the "gradient" strategy that detects energy drift and gates recalibration by performance of the gradient in the previous steps) plus more sophisticated validation behaviors already implemented in the training loop.

Considering the small model size and the short training horizon (5,000 steps total, lowest loss at 4600), these results support the architecture as promising, with broader evaluation and scaled tests planned next—especially at 100M parameters.

A very interesting question has been raised by this test: **what is the correlation between cross-entropy and taumode?** Model convergence brings the loss down but at the same time recalibrating the taumode used on the learned weights brings down the taumode.

## What may be correlated (and why)

Cross-entropy and taumode are likely correlated because Tauformer’s attention kernel is built from Laplacian-derived scalar energies (λ/taumode) rather than dot-product similarity, so changes in the λ distribution change attention behavior and therefore training dynamics.
In the current training loop, the observed “taumode convergence” is also mechanically explained by how taumode is recalibrated: on (re)start, the code can compute a median energy from **block0 key (K) vectors** produced by the *current* weights and then set that median as the global taumode.

## What "converging taumode" means here

The calibration is effectively computing a Rayleigh-style energy statistic on K vectors under a Laplacian (numerator/denominator), and then taking a median over the batch to set a single scalar taumode.
In the reference implementation, taumode/λ is based on a bounded Rayleigh quotient: $$E_{\text{raw}}(x) = \frac{x^\top L x}{x^\top x + \varepsilon}$$ and then $$\lambda_\tau(x)=\frac{E_{\text{raw}}}{E_{\text{raw}}+\tau}$$, which maps energies into $$[0,1)$$.

## Why taumode can drift downward as loss improves

* **Healthy interpretation:** as training progresses, the model may learn K representations that are "smoother" (lower-energy, so closer) with respect to the domain/manifold Laplacian, pushing the median energy down while also improving next-token prediction (lower cross-entropy).
* **Unhealthy interpretation (collapse risk):** median energy can also drop if K vectors collapse toward low-variance or less-discriminative configurations, which can reduce contrast in λ-distance logits even if loss continues improving short-term.
* **Key confound:** if taumode is recalibrated on resume, then taumode changes are not purely a passive "measurement of convergence"; they can act like a mid-training hyperparameter change, so correlation with loss does not automatically imply causality in the direction "lower taumode $$⇒$$ lower loss".

A strong explanation for "converging taumode" (as a property of learned representations, not an artifact) is: as weights converge, the distribution of per-token energies $$x^\top L x$$ stabilizes, so repeated measurements (median, p50) across batches and checkpoints become consistent and typically shift toward lower-energy manifold-aligned directions.
To validate that, it helps to separate (1) the fixed constant used by attention from (2) a purely diagnostic "current batch median energy", and track not just the median but also the spread (p05/p95), because collapse would show shrinking spread even when the median looks lower.

"lower loss $$⇒$$ lower taumode" is a plausible causal direction in Tauformer, because the cross-entropy gradient flows through the Tauformer attention path that depends on Laplacian-energy-derived scalars computed from Q/K (and in your calibration code, specifically from block0 K vectors). As the model improves next-token prediction, it can simultaneously learn representations whose Laplacian Rayleigh energy is lower, so any "recalibrate taumode from learned weights" procedure will tend to output a smaller median. If this it true, where is the optimal stopping state?

## Further readings
Some shift is happening in understanding information thanks to large scale learning machines!

In [this recent paper](https://arxiv.org/pdf/2601.03220), MDL refers to the "minimum description length principle", which says the best explanation/model is the one that minimizes the total code length needed to describe (1) the model and (2) the data given the model.
*Epiplexity* $$ST(X)$$ is defined as the program length of the compute-feasible model $$P$$ that minimizes time-bounded MDL, while time-bounded entropy HT(X) is the expected code length of the data under that model.
Operationally, the paper proposes practical estimators based on neural-network training dynamics (e.g., prequential "area under the loss curve above final loss") to approximate how much structure a bounded learner actually absorbs from data

Qualitatively, `arrowspace`, `taumode` and `tau-attention` are exactly the kind of deterministic computations that can increase usable/learnable structure for bounded learners, which is one of the central motivations for epiplexity.
Through the epiplexity lens, the operations carried on by `arrowspace` and Tauformer (converts each head vector into a bounded scalar λτ using a Rayleigh-quotient-style energy followed by a bounding map) is a deterministic compression that can re-factor information into a form that is cheaper for downstream computation to exploit, potentially increasing the amount of structure a bounded observer can learn from the same underlying signal.

I am happy I have somehow anticipated this switch in point of view in `arrowspace`. 

## Acknoledgements
I gratefully acknowledge Enverge Labs for kindly providing the computation time used to run these experiments on their H100 GPU cluster powered by clean and cheap energy, this aligns perfectly with the topological tranformer objective to provide cheaper computation for Transformers.