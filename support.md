---
title: Support the Lab
layout: default
---

<style>
  .support-hero {
    text-align: center;
    max-width: 640px;
    margin: 2rem auto;
  }

  .support-hero h1 {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-text);
    margin: 0 0 0.5rem;
  }

  .support-hero p {
    font-size: 0.95rem;
    color: var(--color-text-muted);
    line-height: 1.7;
  }

  .support-tiers {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    max-width: 700px;
    margin: 2rem auto;
  }

  .support-tier {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .support-tier__header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
  }

  .support-tier__name {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-text);
    margin: 0;
  }

  .support-tier__amount {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--color-accent-orange);
    white-space: nowrap;
  }

  .support-tier__desc {
    font-size: 0.88rem;
    color: var(--color-text-muted);
    line-height: 1.6;
    margin: 0;
  }

  .support-tier__items {
    margin: 0;
    padding-left: 1.25rem;
    font-size: 0.85rem;
    color: var(--color-text-muted);
    line-height: 1.7;
  }

  .support-cta {
    text-align: center;
    margin: 2.5rem auto;
  }

  .support-cta a {
    display: inline-block;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: var(--radius-md);
  }

  .support-cta-footnote {
    font-size: 0.85rem;
    color: var(--color-text-muted);
    margin-top: 1rem;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border: 0;
  }

  .support-artifacts {
    max-width: 700px;
    margin: 2.5rem auto;
  }

  .support-artifacts h2 {
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--color-text);
    margin: 0 0 1rem;
    text-align: center;
  }

  .support-artifacts-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (min-width: 600px) {
    .support-tiers {
      flex-direction: row;
    }
    .support-tier {
      flex: 1;
    }
  }
</style>

<div class="support-hero">
  <h1>Support the Lab</h1>
  <p>
    The Engine (tuned.org.uk) is an independent open-source research lab. 
    Funding goes directly toward compute, dataset licensing, and sustaining 
    reproducible research that pushes software engineering forward.
  </p>
</div>

<section class="support-tiers" aria-labelledby="tiers-heading">
  <h2 id="tiers-heading" class="sr-only">Sponsorship Tiers</h2>

  <div class="support-tier">
    <div class="support-tier__header">
      <h3 class="support-tier__name">Sustainer</h3>
      <span class="support-tier__amount">$10/mo</span>
    </div>
    <p class="support-tier__desc">
      Early access to research drafts, benchmark data, and runbooks before public release.
    </p>
    <ul class="support-tier__items">
      <li>Preprint access to all papers</li>
      <li>Benchmark reproduction scripts</li>
      <li>Lab mailing list inclusion</li>
    </ul>
  </div>

  <div class="support-tier">
    <div class="support-tier__header">
      <h3 class="support-tier__name">Patron</h3>
      <span class="support-tier__amount">$50/mo</span>
    </div>
    <p class="support-tier__desc">
      Direct line to shape research direction. Quarterly calls, prioritized feature requests, and licensing for internal use.
    </p>
    <ul class="support-tier__items">
      <li>Everything in Sustainer</li>
      <li>Quarterly research roadmap calls</li>
      <li>Priority feature requests</li>
      <li>Internal-use license for patented IP</li>
    </ul>
  </div>

  <div class="support-tier">
    <div class="support-tier__header">
      <h3 class="support-tier__name">Foundry</h3>
      <span class="support-tier__amount">$500/mo</span>
    </div>
    <p class="support-tier__desc">
      Enterprise partnership. Co-branded releases, dedicated integration support, and exclusive licensing for commercial deployment.
    </p>
    <ul class="support-tier__items">
      <li>Everything in Patron</li>
      <li>Co-branded research publications</li>
      <li>Dedicated Slack channel</li>
      <li>Exclusive commercial licensing</li>
    </ul>
  </div>
</section>

<div class="support-cta">
  <a href="https://github.com/sponsors/tuned-org-uk" target="_blank" rel="noopener noreferrer" class="sponsor-link">
    Become a sponsor on GitHub
  </a>
</div>

<section class="support-artifacts" aria-labelledby="artifacts-title">
  <h2 id="artifacts-title">Where your funding goes</h2>
  <div class="support-artifacts-grid">
    {% include triad-card.html
      title="ArrowSpace"
      abstract="Spectral vector search engine. Published at JOSS. Used by researchers in bioinformatics and MLops for topology-aware retrieval."
      paper_url="https://doi.org/10.21105/joss.09002"
      source_url="https://github.com/Mec-iS/arrowspace-rs"
      benchmark_url="/graph-wiring#panel-2"
    %}

    {% include triad-card.html
      title="Tauformer"
      abstract="Topological Transformer — domain-memory in attention heads. Benchmarked against nanoGPT baseline."
      paper_url="/posts/012_topological_transformer_tauformer_domain_memory_in_attention"
      source_url="https://github.com/Mec-iS/nanogpt-rs"
      benchmark_url="/graph-wiring#panel-2"
    %}

    {% include triad-card.html
      title="BMPP Agents Protocol"
      abstract="Formal protocol for multi-agent AI installations. W3C Web Agents Working Group contribution."
      paper_url="/bmpp-paper"
      source_url="https://github.com/Mec-iS/bmpp-agents-rs"
      benchmark_url="/graph-wiring#panel-2"
    %}
  </div>
</section>

<div class="support-cta">
  <p class="support-cta-footnote">
    tuned.org.uk is funded by grants and sponsorships based purely on the objective value of its output.
    No advertising, no tracking, no VC funding.
  </p>
</div>
