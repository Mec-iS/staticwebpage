---
title: "arrowspace for Latent Spaces — part 4: basins, epiplexity, and the six orientations"
layout: blog_default
date: 2026-11-12
permalink: /posts/2026-11-12-024_arrowspace_basins_epiplexity_six_orientations/
categories: [arrowspace, epiplexity, mechanistic-interpretability, transformers, spectral-analysis, semantic-basins]
excerpt: "The basin typology from part 3, audited against a new mechanistic interpretability survey: explicit positioning among six research orientations, hypotheses restated as evaluation claims, and the failure modes the protocol now owns."
---

# ArrowSpace for Latent Spaces — part 4: basins, epiplexity, and the six orientations

<p class="post-eyebrow">Research Update<span class="sep">/</span>Post 024<span class="sep">/</span>12 November 2026</p>

A [companion notebook](https://github.com/tuned-org-uk/arrowspace-analysis/blob/main/notebooks/07_arrowspace_basins_epiplexity_typology.ipynb) is available.

In [part 3](/posts/2026-07-28-022_arrowspace_basins_and_epiplexity_part_3/), I combined ArrowSpace locality with epiplexity to separate trivial basins from useful ones, and I closed with four hypotheses and a synthetic demonstration. Since then, a survey of mechanistic interpretability for AI safety ([arXiv:2611.08438](https://arxiv.org/abs/2611.08438)) came out. Reading that survey against my own post was uncomfortable, and useful.

The survey does three things this post needs. It maps the field into six research orientations, each with stated goals, assumptions, and trade-offs. It proposes a five-dimension framework for evaluating interpretability claims. And it is blunt about failure modes: partial analyses that create false confidence, proxies that reproduce behaviour without sharing mechanism, interventions that fail silently.

This post upgrades part 3 along those three axes. First, I state which orientation this work belongs to, and which assumptions I am buying. Second, I restate my hypotheses as evaluation claims with concrete protocols. Third, I own the failure modes instead of leaving them implicit.

## What the survey asks

The survey defines an orientation as a coherent research programme defined by its goals, assumptions, and trade-offs, and it insists that no orientation is universally preferable. The six are:

| Orientation | Goal | Core assumption | Trade-off |
|---|---|---|---|
| Pragmatic | Safety-relevant interventions now, without full mechanistic accounts | Full understanding is not required for safety impact | Short-term impact, high scalability, but interventions need not explain the mechanism |
| Ambitious | Reverse-engineer models into transparent, predictive theories | Partial understanding cannot rule out hidden failure modes | High robustness to deception, but low scalability and long time to impact |
| Developmental | Explain how representations and capabilities form during training | The learning process has measurable signatures | Long-term science, not forecasting; needs checkpoint access |
| Across Time | Predict and steer training before unwanted behaviour develops | Learning-based knowledge can be predictive, causal, and precise enough to intervene | Mostly retrospective evidence so far |
| Introspective | Use the model as its own explainer | Privileged access to internal information | Plausible but unfaithful self-reports; low robustness to deception |
| Automated | Scale discovery, explanation, and verification by automation | Manual analysis is the bottleneck | Error propagation and automation bias without human validation |

For evaluation, the survey proposes five complementary dimensions and states that no single one suffices: attribution faithfulness (do scores reflect causal effects), completeness (how much behaviour is explained), stability (do findings survive seeds, hyperparameters, paraphrases), causal validity (are components necessary, sufficient, and specific), and human interpretability (do explanations help humans predict and act).

Most important for this post is the survey's scope bar. Mechanistic interpretability, in its definition, requires both engagement with model internals and causal claims established through interventions. Behavioural evaluation establishes what a model does; mechanistic analysis reveals how.

## An honest reclassification

By that bar, part 3 as published is not mechanistic interpretability. It engages internals — weight matrices, layer-role subspaces, feature-space Laplacians — but it makes no causal claims. Every result in the typology notebook is geometric and correlational. The survey has a name for this category of evidence, and it sits on the behavioural side of the divide.

There is a second concession, and it cuts deeper. The survey warns that probes with high accuracy show decodability, not that the model uses the information. Epiplexity has the same shape of problem. $S_{\mathrm{cross}}$ measures what an external bounded observer can learn from local geometry. A high score means the geometry is learnable — by that observer. It does not mean the model uses that structure to compute anything.

So the honest statement of part 3 is: a spectral-geometric targeting heuristic with a clean synthetic demonstration. That is worth having. It is not yet evidence about mechanism. The rest of this post is about closing that gap.

## Where the protocol sits among the six orientations

The survey says orientations are not mutually exclusive. Good, because the basin protocol is a hybrid. Its primary home is a combination of two:

**Ambitious, structurally.** The [dual-space decomposition](/posts/020_arrowspace_semantic_basins_part2/) treats weight matrices as spectral operators on a semantic graph, and Rayleigh-style energies as a candidate language for describing what an operator does. If that language ever carries its weight, it is a step toward the survey's "transparent, predictive theory of internal algorithms". The assumption I buy here: spectral structure in feature space is a faithful description level for transformer computation. The cost the survey names applies in full: fine-grained analysis of frontier models is expensive, and coverage so far is a handful of layers on small models.

**Pragmatic, operationally.** Hypothesis H4 — epiplexity as a filter for intervention targets — is a Pragmatic claim. The survey's key metric for that orientation is performance in proxy tasks, not faithfulness of explanation. The filter does not need to be a correct theory of the model. It needs to select better ablation, probing, and steering targets than smoothness alone. That is testable this quarter, on current models, without a complete mechanistic account.

Three secondary hooks, stated with their survey-given caveats:

- **Developmental.** Spectral transition zones are candidate formation signatures, and per-operator epiplexity is a complexity signal in the spirit of the Local Learning Coefficient. The survey's caveat: LLC-style transition evidence is largely retrospective, and refined estimates are expensive and demonstrated mostly on toy models. My checkpoints are toy models too.
- **Across Time.** $\lambda\tau$ and $S^\phi$ trajectories across checkpoints are candidate monitoring signals. Same caveat, stronger: prospective forecasting of capability transitions has not been demonstrated.
- **Automated.** The reservoir estimator is closed-form. Scoring every token-neighborhood in every subspace costs matrix arithmetic, not sequential pruning like ACDC or combinatorial patching. The survey's warning applies: automation without human validation propagates systematic errors, and a spectral score that fires on spurious structure will do so at scale.

One deliberate contrast. **Introspective** interpretability uses the model as its own explainer. The basin protocol is the opposite: an external, mathematically specified observer with no privileged access. The two are complementary in the survey's sense — self-reports for rapid triage and hypothesis generation, spectral scores as one independent instrument for checking them.

Stated in the survey's own terms, the pipeline's profile is: expected time to impact, short-term (target selection); scalability, high (closed-form scores); robustness to deception, unknown — nothing here has been tested against a model that adapts to the monitor.

## The assumptions I am buying

The survey characterizes orientations by their assumptions. Mine, stated plainly:

1. **A1.** Local spectral coherence in feature space marks semantically meaningful sites. The typology exists because this can fail: trivial basins are smooth.
2. **A2.** High local epiplexity marks sites of useful internal work. This mirrors the probe caution: learnable-by-an-observer does not imply used-by-the-model. Only interventions can close that gap.
3. **A3.** The reservoir observer $\phi$ is a fair bounded learner. The ridge suppresses chance correlations, but the choice of reservoir is a modelling choice, and the survey's warning about sensitivity to assumptions applies directly.
4. **A4.** Token-level $k$-NN neighborhoods in layer-role subspaces are the right unit of analysis. Sub-token and multi-token phenomena are outside this protocol's reach.

## Upgraded evaluation claims

The original hypotheses, restated as evaluation claims under the survey's five dimensions. This is the core of the upgrade.

| Hypothesis | Dimension | Protocol | Metric |
|---|---|---|---|
| H1: local rank agreement appears inside semantically active subspaces | Attribution faithfulness | Correlate basin scores with measured ablation and patching effects; test counterfactual recovery by patching top-ranked components | Intervention-effect agreement (Spearman); effect-size error; recovery fraction |
| H2: Probe B lifts epiplexity where sharpening appears | Stability | Paraphrase consistency; cross-probe and cross-checkpoint agreement | Consistency of intervention effects across paraphrases, probes, checkpoints |
| H3: the best mechanistic sites are not the smoothest | Causal validity | Ablate top-ranked, smoothest, and matched-size random neighborhoods; include control behaviours | Necessity, sufficiency, specificity |
| H4: epiplexity is a filter for intervention targets | Pragmatic key metric | End-to-end intervention study | Intervention effectiveness vs smoothness-only and random selection |
| H5 (new): the typology covers a meaningful share of behaviour | Completeness | Behavioural coverage of identified basins; loss recovery under reconstruction; unexplained variance | Coverage fraction; recovery fraction; variance accounted for |

Two notes on the protocols, both taken from the survey's recommended procedures.

First, necessity and sufficiency both need matched-size random controls. Ablating a top-ranked neighborhood and observing degradation proves nothing if random neighborhoods of the same size degrade equally. The comparison set is the claim.

Second, stability is cheap to test and I should have tested it already. The original synthetic demonstration used one reservoir draw and one seed. The survey reports that dictionary-learning features often share fewer than half their members across seeds; I have no reason to assume basin rankings are more stable until I measure them. The protocol now includes: multiple reservoir draws, multiple seeds where training is involved, paraphrased inputs where probes are linguistic, and checkpoint-to-checkpoint consistency of the typology itself.

## The upgraded protocol

The original pipeline was: token-level ArrowSpace index, then local basins, then epiplexity scoring, then rank and filter. The upgrade adds a fifth stage the survey effectively demands — a ground-truth loop:

1. Re-run part 2 at token level, as before.
2. Build local neighborhoods per token and subspace, as before.
3. Compute $S_{\mathrm{cross}}$ and $S_{\mathrm{op}}$, as before.
4. Rank within each subspace, as before.
5. **New: intervene.** For the top-ranked, the smoothest, and matched random neighborhoods: ablate for necessity, replace surroundings for sufficiency, patch between behaviours for interchange effects, and measure side effects on control behaviours for specificity.
6. **New: report honestly.** Coverage and unexplained variance alongside the headline scores; robust findings and fragile findings in the same table.

The survey notes that circuits typically explain 60–80% of behavioural variance. I should expect basins to explain less, and say so in numbers.

## Failure modes I now own

The survey's risk catalogue, imported without softening.

**Proxy fidelity.** ArrowSpace's $\lambda$ is used as a cheap proxy for structural deviation, and the reservoir observer is a proxy for a bounded learner. The survey's proxy fidelity problem states the risk exactly: an interpretable proxy may reproduce behaviour using a different algorithm from the target. Finding no learnable structure in a neighborhood does not establish the model does none; finding some does not establish the model uses it.

**Plausibility is not faithfulness.** The survey's sharpest one-liners — activation reconstruction is not computation reconstruction; feature plausibility is not feature faithfulness — have direct analogues here. Basin smoothness is not basin usefulness. Spectral structure is not causal role. The typology is a hypothesis about where to look, and the intervention loop is what converts it into evidence.

**Silent failure.** A steering target selected by epiplexity can stop working under distribution shift, and it will fail silently unless monitored. The survey's recommendation applies: live monitoring, behavioural safeguards, adversarial testing, graceful degradation.

**False confidence from partial maps.** The survey's example is claiming no deception circuit exists when 70% of computations were unexamined. The basin analogue is claiming a subspace is "clean" because its neighborhoods scored low, when three layers of thirty-two were mapped. Spectral maps of a few subspaces on a small model are a starting grid, not a coverage claim.

**Opportunity cost.** The survey counts GPU-hours and researcher-hours against alternative uses. The reservoir estimator is cheap, which is the point, but the intervention loop is not free. The Pragmatic framing is the defence: the filter earns its keep only if it demonstrably improves target selection per unit of compute spent.

## What success would look like now

The original success criterion was three bullets about rank agreement. The upgraded criterion is narrower and harder:

- Top-ranked neighborhoods, selected by the joint filter, produce larger and more specific intervention effects than smoothness-selected and matched random neighborhoods, with the comparison against matched controls reported.
- The rankings are stable across reservoir draws and, where applicable, across paraphrases and checkpoints — with fragile findings reported as fragile.
- Coverage is reported in the same table as the headline scores.

If those hold, the filter is useful as a Pragmatic instrument, and the spectral language earns another season as an Ambitious research programme. If they do not, the null result still teaches something the survey makes explicit: the geometry a bounded observer finds learnable and the structure the model actually uses are different objects, and the distinction matters.

## Why this matters for ArrowSpace

ArrowSpace's deeper promise remains: semantic structure treated as geometry, guiding both interpretation and control. What the survey adds is discipline about the second half of that sentence. Geometry guides control only after interventions confirm the guide.

The basin typology survives this revision as what it should have been labeled all along: a hypothesis-generation layer. The six orientations tell me what kind of programme it serves. The five evaluation dimensions tell me what would count as evidence. The failure catalogue tells me what not to claim in the meantime.

Not every basin deserves attention. The ones that matter are where local spectral structure, local learnability, and measured causal effect meet.
