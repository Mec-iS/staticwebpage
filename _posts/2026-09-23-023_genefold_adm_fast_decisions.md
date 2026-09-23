---
title: "Genefold AI: Fast Decisions Without Token-by-Token Generation"
layout: blog_default
date: 2026-09-23
permalink: /posts/2026-09-23-023_genefold_adm_fast_decisions/
categories: [genefold-ai, arrowspace, decision-models, semantic-search, autoresearch]
excerpt: "Meet ADM, Genefold AI's proprietary non-autoregressive decision runtime. Our private research combines semantic representations, calibrated decision heads, and automated experiments—with measured progress against Laya and opportunities for research and commercial partnerships."
---

<p class="post-eyebrow">Research Update<span class="sep">/</span>Post 023<span class="sep">/</span>23 September 2026</p>

# Genefold AI: ADM, a Fast Decision Model

<p class="lede">At <strong>Genefold AI</strong>, we are building a different way to make AI decisions on the same wave of current Jev-like systems.</p>

What Jev is for? Many applications do not need a model to write a paragraph. They need it to choose a route, classify a request, apply a policy, or decide whether to ask for more evidence. For these tasks, generating an answer token by token can add work that the application does not need.

<div class="def-box" markdown="1">
<p class="def-term">ADM <span class="def-expansion">— the arro-decision-model</span></p>

Our answer: Genefold AI's **proprietary System 1 typed decision runtime**, built around embeddings, explicit choices, and measurable evidence.

</div>

ADM is developed in a **private repository**. This post presents results from our internal research program and invites discussion with prospective partners. The software and its research artifacts are not a public source release.

<div class="manifesto">
<p>No autoregressive answer generation.</p>
<p>A finite decision space.</p>
<p>A decision layer that can run in microseconds.</p>
</div>

We are using automated research loops to improve its accuracy, test its limits, and find the right mix of representations and decision methods. The latest experiments show clear progress—and give us a practical map of what to build next.

<div class="stat-strip" role="list" aria-label="Headline results">
  <div class="stat" role="listitem">
    <span class="stat-value">3–9&times;</span>
    <span class="stat-label">end-to-end p50 speed vs Laya on identical text-to-decision work, same machine, embedding included</span>
  </div>
  <div class="stat" role="listitem">
    <span class="stat-value">+36.5 pts</span>
    <span class="stat-label">accuracy lead over Laya on the Banking77 slice, with 77 candidate intents</span>
  </div>
  <div class="stat" role="listitem">
    <span class="stat-value">30 / 30</span>
    <span class="stat-label">bounded experiments across two research loops, with every test guard passing</span>
  </div>
</div>

## <span class="sec-no" aria-hidden="true">01</span> A small decision layer on top of learned representations

ADM builds on pretrained semantic embeddings. Instead of asking a language model to generate a label, it evaluates the available choices and returns a probability distribution. The broader runtime also supports explicit abstention and evidence-based policies.

This means we can develop a task-specific decision layer **without training a language model**.

The distinction matters: the current measured recipes use **labeled calibration examples** to fit centroids, feature scaling, label-definition mixtures, and probability calibration. They are not fully zero-shot or training-free. We reuse the encoder's learned representation, then fit a much smaller decision layer for the task.

That is an attractive engineering direction: move useful knowledge into a reusable representation, keep the decision step small, and make its behavior visible through structured outputs and repeatable tests.

## <span class="sec-no" aria-hidden="true">02</span> Built on Genefold's latent-space research

ADM grows out of our work on **ArrowSpace** (Open Source library) and **eugenio** (proprietary latent space layer).

ArrowSpace uses graph-Laplacian structure to study and search vector representations. A graph Laplacian describes relationships and variation across a graph, giving us a mathematical basis for spectral analysis and diffusion. Eugenio supplies the dual-space fusion layer that ADM can consume as decision evidence.

This stack lets us investigate more than raw vector proximity: structure, boundaries, diffusion, and the relationship between representations and decisions.

We test those ideas against simpler alternatives. In the classification experiments reported here, our strongest recent results came from a **calibrated raw-embedding semantic head**.

<aside class="pull-quote">
<p>The architecture gives us room to explore, and the experiments tell us which components earn their place.</p>
</aside>

## <span class="sec-no" aria-hidden="true">03</span> Where ADM stands against Laya

We compared ADM with **Laya**, an open-weight System 1 decision model, on the same task examples. The current comparisons below use matching label descriptions. We also include the earlier CLINC150 evaluation as a clearly marked historical result.

[![ADM versus Laya: accuracy across five datasets with latency comparison. CLINC150 is a historical v0.3.0 result; the latency columns in this figure use the earlier head-only framing, superseded by the same-workload end-to-end measurements in section 04.](/assets/blog/023/ADM-table-v0.3.0.png)](/assets/blog/023/ADM-table-v0.3.0.png)

*Accuracy at a glance. Click the image to view it at full size. The latency ratios shown in the figure compare different workloads; see section 04 for the corrected same-workload measurements.*
{:.figure-caption}

| Dataset | Test examples | ADM accuracy | Laya accuracy | Evaluation |
|---|---:|---:|---:|---|
| AG News | 400 | **86.25%** | 93.75% | Current retained semantic head |
| Emotion | 400 | **52.25%** | 54.50% | Current retained semantic head |
| Banking77 | 400 | **78.00%** | 41.50% | Current retained semantic head |
| TweetEval sentiment | 300 | **52.67%** | 56.33% | Fresh evaluation after the loop |
| CLINC150 | 600 | **87.33%** | No valid answers: 600 requests rejected | Historical v0.3.0 recipe |

**Banking77 is a particularly interesting result.** It presents 77 possible banking intents. ADM's current accuracy is 36.5 percentage points above Laya on this frozen slice. Large candidate sets are an important use case for a decision architecture that does not generate one answer token after another.

On AG News dataset, the matched comparison leaves a **7.5-percentage-point accuracy gap**. On Emotion, the gap is **2.25 points**. These are concrete targets for the next round of work, rather than a claim of general parity.

The confidence intervals for the matched accuracy differences on Emotion and fresh sentiment cross zero. That does not prove equivalence or superiority for either model.

### What happened on CLINC150?

Our earlier, balanced CLINC150 experiment included all 150 in-scope intent labels, with four calibration and four test examples per label. Out-of-scope examples were excluded.

The v0.3.0 MPNet/centered-centroid recipe improved accuracy from **83.83% to 87.33%**. The paired 95% interval for that gain was **+1.33 to +5.67 percentage points**.

Laya rejected all 600 requests because the question exceeded its head token limit. This is a **capacity result**, this is a clue that ADM may provide improved capacity.

We have not rerun CLINC150 with the latest semantic head. Its 87.33% result belongs to the earlier recipe.

## <span class="sec-no" aria-hidden="true">04</span> The speed opportunity—measured on the same workload

A speed ratio is only meaningful when both sides do the same work. So we timed ADM **end to end**: raw text in, decision out, embedding generation included, one request at a time, encoder on the device GPU (`mps:0`), model already loaded. Laya is measured the same way, as a full request. Both run on the same Apple-Silicon machine.

| Dataset | ADM end-to-end p50 | Laya full-request p50 | Laya / ADM |
|---|---:|---:|---:|
| AG News | 16.24 ms | 51.65 ms | **3.2×** |
| Emotion | 5.85 ms | 48.18 ms | **8.2×** |
| Banking77 | 11.15 ms | 102.64 ms | **9.2×** |
| Fresh TweetEval sentiment | 13.99 ms | 38.15 ms | **2.7×** |

Validity is built into the run: the timing head reproduces the served Rust predictions' argmax **100% on all four datasets**, so these timings cover the real model rather than a shortcut.

That is the honest headline: **on identical text-to-decision work, ADM's current pipeline is roughly 3–9× faster at the median than Laya on our hardware.** These are recorded single-request runs with warm models and loading excluded—not a controlled serving benchmark with concurrency and throughput.

Why is ADM faster end to end? Because its decision step is nearly free. Once an embedding exists, the fitted head contributes only **0.3–0.9% of ADM's own end-to-end time**; virtually all of it is the embedding encoder. That is the architectural point: a small, explicit decision layer keeps per-decision cost negligible, so end-to-end latency is governed by the representation you choose—and lighter encoders trade accuracy against speed in a controlled, measurable way.

<div class="caveat" markdown="1">
<p class="caveat-label">Correction</p>

An earlier version of this section reported head-only-versus-full-request ratios in the tens of thousands. Those compared different work and were wrong to emphasize. We have withdrawn them and re-measured on the same workload.

</div>

The economics improve further when representations are reused. If an application already produces or stores semantic embeddings, the decision head adds only microseconds per choice. That makes this architecture attractive for routing, classification, and policy systems where one representation can serve many decisions.

Our goal is to preserve that small decision step while closing the accuracy gaps that matter to users.

## <span class="sec-no" aria-hidden="true">05</span> Thirty experiments, with every failed idea recorded

After the v0.3.0 work, we ran **two bounded loops of 15 experiments each**.

Each experiment followed a simple discipline: make one focused change, version it, measure the result, run the test guards, and either keep it or explicitly revert it. Our internal research archive retains the prediction logs and the failed hypotheses as well as the winners.

The objective was the **mean positive accuracy shortfall against frozen historical Laya logs**. A dataset on which ADM already led contributed zero shortfall. Those historical references stayed fixed throughout both loops; the matching-description comparisons above are reported separately.

| Research loop | Kept | Reverted | Mean positive Laya shortfall |
|---|---:|---:|---:|
| First 15 experiments | 6 | 9 | **9.50 → 5.42 percentage points** |
| Second 15 experiments | 2 | 13 | **5.42 → 4.58 percentage points** |

The first loop reduced the shortfall by **43.0%**. Its strongest changes were explicit semantic label definitions, fold-local variance scaling, and calibrated mixtures of label embeddings and class centroids.

The second loop reduced the remaining shortfall by **15.38%**. It retained regularized class-bias correction and bounded per-class logit scaling. All 30 experiment guards passed.

This is how we are using **autoresearch**: a bounded, traceable process for testing hypotheses—not a reason to hide regressions or declare every trial a success.

## <span class="sec-no" aria-hidden="true">06</span> What the latest loop taught us

The latest candidate improved AG News from **83.75% to 86.25%**, left Emotion accuracy unchanged, and reduced Banking77 from **79.50% to 78.00%**.

Why keep a candidate with a regression? Because it improved the chosen objective: Banking77 remained above Laya, so that loss did not increase positive shortfall. The result exposes a limitation of the objective itself. **It is progress toward the selected benchmark target, not a uniform improvement across tasks.**

The fresh sentiment check provides another useful boundary. Both the inherited and current ADM methods scored **52.67% accuracy**. The new method improved Brier score from **0.6080 to 0.5964** and negative log likelihood from **1.0240 to 0.9967**, with paired improvement intervals excluding zero. It improved probability quality, but did not demonstrate a fresh accuracy gain.

We also distinguish fitting from evaluation. Base scores use leave-one-out calibration. The new post-calibrators then learn from those out-of-fold scores and calibration labels. Their fitted NLL is not an unbiased nested leave-one-out estimate.

Finally, repeated use of the frozen test sets to accept or reject ideas makes those gains **exploratory**. Fresh datasets help us test transfer, and larger independent evaluations remain essential before broad deployment claims.

That level of detail is part of building a useful decision system. Accuracy, probability quality, capacity, and latency are separate properties. We want to improve the system across all four, not optimize a headline in isolation.

## <span class="sec-no" aria-hidden="true">07</span> What comes next

We are continuing to study embedding choices, calibration, label semantics, and the role of graph-based structure in different workloads.

Two practical next steps are on our internal roadmap:

- **Model packaging and delivery:** investigate packaging task-specific heads with pinned encoders, exact label order, repeatable inference, and clear model documentation. This includes evaluating Hugging Face tooling as a delivery option; access and distribution terms remain to be defined.
- **[Bespoke Nimble comparisons](https://github.com/bespokelabsai/nimble):** add another open-weight comparator under the same evaluation discipline. Nimble's native choice limit is 26, so high-cardinality workarounds will need separate reporting.

We also want to evaluate spectral methods on retrieval tasks with metrics that can credit semantically useful substitutions, rather than treating classification accuracy as the only test of their value.

**More comparisons, more benchmarks, and further research updates are coming.**

## <span class="sec-no" aria-hidden="true">08</span> Build this frontier with us

At [Genefold AI](https://genefold.ai), we are exploring how learned representations and explicit mathematical structure can support fast, bespoke AI decisions.

We are looking for **research partners, developers, and smart capital** to help turn that research into useful systems. We welcome teams with real routing and classification workloads, researchers who want to collaborate on calibration and spectral methods, and developers interested in working with Genefold AI to build AI-native infrastructure.

If this is a frontier you want to help shape, get in touch.

<div class="cta-card">
  <p class="cta-kicker">Partner with Genefold AI</p>
  <a class="cta-mail" href="mailto:business@genefold.ai">business@genefold.ai</a>
  <p class="cta-sub">Technical evaluations &middot; potential integrations &middot; research and commercial partnerships</p>
</div>

## <span class="sec-no" aria-hidden="true">09</span> Evidence behind the results

The figures in this post come from our internal benchmark archive. We retain versioned experiment ledgers, fitted heads, prediction logs, calibration settings, embedding provenance, and paired comparisons so that we can reproduce and review each result internally.

The tables and methodology here are our published account of those experiments. The source code, model artifacts, and detailed run records remain private. For a discussion of the evaluation protocol and supporting evidence relevant to a potential partnership, contact **[business@genefold.ai](mailto:business@genefold.ai)**.

<div class="tag-row" aria-label="Topics">
  <span>#GenefoldAI</span>
  <span>#ADM</span>
  <span>#ArrowSpace</span>
  <span>#DecisionModels</span>
  <span>#Autoresearch</span>
  <span>#AINative</span>
</div>
