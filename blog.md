---
title: Blog
layout: default
---
<style> .blog-container { margin: 2em auto 0 auto; max-width: 800px; } .blog-header { margin-bottom: 2em; color: #2c3e50; text-align: center; } .blog-posts { display: flex; flex-direction: column; gap: 2em; } .blog-post-card { background: white; padding: 2em; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: transform 0.3s ease, box-shadow 0.3s ease; border-left: 4px solid #3498db; margin-top: 0.5em;} .blog-post-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); } .blog-post-meta { color: #7f8c8d; font-size: 0.9em; margin-bottom: 0.5em; } .blog-post-title { margin: 0 0 0.8em 0; font-size: 1.6em; color: #2c3e50; } .blog-post-title a { text-decoration: none; color: inherit; transition: color 0.2s ease; } .blog-post-title a:hover { color: #3498db; } .blog-post-abstract { color: #555; line-height: 1.6; margin-bottom: 1em; } .blog-read-more { color: #3498db; text-decoration: none; font-weight: 600; transition: color 0.2s ease; } .blog-read-more:hover { color: #2980b9; } </style>

<div class="blog-container">
    <div class="blog-header">
        <h1>All the posts</h1>
        <p>Thoughts on AI, machine learning, distributed systems, and open-source development</p>
    </div>

    <div class="blog-posts">
<!-- Blog Post 15: Graph Wiring -->
<article class="blog-post-card">
    <div class="blog-post-meta">February 5, 2026</div>
    <h2 class="blog-post-title">
        <a href="/posts/015_arrowspace_stress-test_on_dorothea_dataset">
            `ArrowSpace` Performance Analysis: 100K Dimensions on Dorothea
        </a>
    </h2>
    <div class="blog-post-abstract">
        <p><strong>Training</strong> Graph Wiring on the Dorothea dataset.</p>
        <ul>
            <li>How fast is `arrowspace` on a 100K dimensions dataset</li>
            <li>What are the potential applications for Graph Wiring</li>
            <li>What is the connection between Rayleigh score and epiplexity</li>
        </ul>
    </div>
    <a href="/posts/015_arrowspace_stress-test_on_dorothea_dataset" class="blog-read-more">Read more →</a>
</article>

<!-- Blog Post 14: Graph Wiring -->
<article class="blog-post-card">
    <div class="blog-post-meta">February 5, 2026</div>
    <h2 class="blog-post-title">
        <a href="/posts/014_arrowspace_and_string_theory_minimal_surfaces">
            Graph Wiring and Minimal Surface problem in String Theory
        </a>
    </h2>
    <div class="blog-post-abstract">
        <p><strong>Training</strong> An hypothesis for arrowspace as minimal surface approximator.</p>
        <ul>
            <li>Meng et al. (2026) study physical networks (connectomes, vasculature, corals, plants) and argue that classical "wiring minimization" misses key observed motifs.</li>
            <li>arrowspace may be an efficient, graph-algorithmic route to approximate minimal-surface-like solutions in a discrete setting.</li>
            <li>Why I’m calling it "Graph Wiring"</li>
        </ul>
    </div>
    <a href="/posts/014_arrowspace_and_string_theory_minimal_surfaces" class="blog-read-more">Read more →</a>
</article>

<!-- Blog Post 13: Training Tauformer -->
<article class="blog-post-card">
    <div class="blog-post-meta">January 18, 2026</div>
    <h2 class="blog-post-title">
        <a href="/posts/013_the_topological_transformer_training_tauformer">
            The Topological Transformer: Training Tauformer (30M TauGPT runbook)
        </a>
    </h2>
    <div class="blog-post-abstract">
        <p><strong>Training</strong> notes for a 30M-class TauGPT run including the data pipeline, validation routing, and stabilization knobs.</p>
        <ul>
            <li>Streams training data via an IterableDataset-style loader, with a routed split where every 20th batch goes to validation (~5%).</li>
            <li>Uses AdamW with LR warmup (100 steps) then a constant base LR, with optional plateau-based scaling logic.</li>
            <li>Documents taumode calibration and strategy controls (fixed/adaptive/gradient) for reproducible restarts and diagnostics.</li>
        </ul>
    </div>
    <a href="/posts/013_the_topological_transformer_training_tauformer" class="blog-read-more">Read more →</a>
</article>

<!-- Blog Post 12: Tauformer / Topological Transformer -->
<article class="blog-post-card">
    <div class="blog-post-meta">January 5, 2026</div>
    <h2 class="blog-post-title">
    <a href="/posts/012_topological_transformer_tauformer_domain_memory_in_attention">The Topological Transformer: Tauformer (domain-memory and faster attention)</a></h2>
    <div class="blog-post-abstract">
        <p><strong>Domain memory</strong> injected directly inside self-attention via a persistent Graph Laplacian (distilled knowledge graphs with <code>arrowspace</code>).</p>
        <ul>
            <li>Replaces the dot-product attention kernel with a topology-aware scalar signal (taumode / λ-distance), so attention is driven by distances in a domain manifold rather than raw geometry.</li>
            <li>Targets scaling pain points: ~50% KV-cache savings (values + λ<sub>k</sub> instead of K+V) and ~20% faster time-per-token vs a nanoGPT baseline in the reported benchmarks.</li>
        </ul>
    </div>
    <a href="/posts/012_topological_transformer_tauformer_domain_memory_in_attention" class="blog-read-more">Read more →</a>
</article>

<!-- Blog Post 11: Safer Is a More Open Search -->
<article class="blog-post-card">
    <div class="blog-post-meta">November 26, 2025</div>
    <h2 class="blog-post-title">
    <a href="/posts/011_safer_LLMs_require_more_open_search_building_AI_memory_layer">Safer LLMS require open search - Building the AI Memory Layer</a></h2>
    <div class="blog-post-abstract">
        <p><strong>AI safety</strong> through topology‑aware, energy‑informed retrieval that separates stable facts from risky intuitions.</p>
        <ul>
            <li>Shows how geometry‑only vector search and semantic caching accumulate retrieval errors, turning context drift into subtle hallucinations.</li>
            <li>Introduces arrowspace as an “open search” layer where graph Laplacians, energy dispersion, and topology‑quality scores expose and constrain off‑manifold results instead of hiding them inside black‑box similarity.</li>
        </ul>
    </div>
    <a href="/posts/011_safer_LLMs_require_more_open_search_building_AI_memory_layer" class="blog-read-more">Read more →</a>
</article>

<!-- Blog Post 10: Why `arrowspace` is game-changing for data operations at scale -->
<article class="blog-post-card">
    <div class="blog-post-meta">November 12, 2025</div>
    <h2 class="blog-post-title"> 
    <a href="/posts/010_game_changer_unifying_vectors_and_features_graphs">Why <code>arrowspace</code> is game-changing for data operations at scale</a></h2>
    <div class="blog-post-abstract"> <p><strong>Test‑bed milestone</strong> for a unified vector, graph, and key‑value engine built on spectral indexing and energy‑informed search. <ul> <li>Turns any dataset into a features graph, enabling manifold‑aware search, matching, ranking, and dataset characterization at any lifecycle stage.</li> <li>Designed for high dimensions by default: robust on biotech‑scale sequences, large vocabularies, and model‑sized embedding spaces.</li> </ul></p> </div>
    <a href="/posts/010_game_changer_unifying_vectors_and_features_graphs" class="blog-read-more">Read more →</a>
</article>

<!-- Blog Post 9: NanoGPT: A deep dive into the architecture of a Rust-powered GPT-2 -->
<article class="blog-post-card">
    <div class="blog-post-meta">November 07, 2025</div>
    <h2 class="blog-post-title">
    <a href="/posts/009_llms_nanogpt_model_in_rust">Efficient GPT training: a dive into the architecture of a Rust-powered GPT-2</a></h2>
    <div class="blog-post-abstract">
        <p><strong>Deep Dive</strong> into a Rust implementation of a decoder-only transformer inspired by Karpathy's nanochat. <ul> <li>Breaks down the architecture of a modern LLM, explaining the role of key components for an experienced audience.</li><li>Covers modern techniques such as Rotary Position Embeddings (RoPE), Multi-Query Attention (MQA), RMSNorm, and the use of a Squared ReLU in the MLP.</li></ul></p>
    </div>
    <a href="/posts/009_llms_nanogpt_model_in_rust" class="blog-read-more">Read more →</a>
</article>

<!-- Blog Post 8: ArrowSpace v0.21.0 Energy-Informed Search POC -->
<article class="blog-post-card">
    <div class="blog-post-meta">October 29, 2025</div> 
    <h2 class="blog-post-title"> 
    <a href="/posts/008_arrowspace_proof_of_concept_energy_informed_search">ArrowSpace v0.21.0: Proof of Concept for Energy-Informed Context Search</a></h2>
    <div class="blog-post-abstract">
        <p><strong>Milestone release</strong> completes the search–matching–ranking pipeline with stabilized energymaps module, delivering spectral vector search that finds matches beyond geometric proximity.<ul> <li>Two complete build paths: eigenmaps (spectral indexing from Laplacians) and energymaps (pure energy-first with optical compression, diffusion-split subcentroids, and automatic λτ computation).</li><li>CVE corpus diffusion sweep (300K docs) achieves Avg MRR 0.75, NDCG@10 0.7239 (η=0.22, steps=8) with stable 75–83s build times, confirming negligible diffusion overhead and strong spectral ranking quality.</li></ul></p>
    </div>
    <a href="/posts/008_arrowspace_proof_of_concept_energy_informed_search" class="blog-read-more">Read more →</a>
</article>


<!-- Blog Post 7: DeepSeek Optical Compression and Energy Search -->
<article class="blog-post-card">
    <div class="blog-post-meta">October 24, 2025</div> 
    <h2 class="blog-post-title"> 
    <a href="/posts/007_deepseek_optical_compression_rust">DeepSeek-OCR Optical Compression Meets Energy Search: Rust Implementation in ArrowSpace v0.18.0</a></h2>
    <div class="blog-post-abstract">
        <p>Rust implementation of DeepSeek-OCR compression achieves 10× token reduction, while ArrowSpace v0.18.0 introduces energy-informed retrieval that replaces cosine similarity with spectral graph properties.<ul> <li>DeepEncoder architecture (SAM + CLIP + projector) replicated in Rust using burn.dev with cross-platform GPU support and five resolution modes from 64 to 400 tokens.</li><li>Energy search with diffusion parameter sweep on CVE corpus achieves NDCG@10 ≈ 0.99 (η=0.05, steps=6) and MRR=1.0 (η=0.05, steps=4) without any cosine similarity.</li></ul></p>
    </div>
    <a href="/posts/007_deepseek_optical_compression_rust" class="blog-read-more">Read more →</a>
</article>

<!-- Blog Post 5: Fast Nearest Neighbours -->
<article class="blog-post-card">
    <div class="blog-post-meta">October 17, 2025</div> 
    <h2 class="blog-post-title"> 
    <a href="/posts/005_fast_approximate_nearest_neighbours">Fast (not approximate?) Nearest Neighbours</a></h2>
    <div class="blog-post-abstract">
        <p>Version 0.16.0 is out with quite relevant news and encouraging results for `arrowspace` to be <strong>one of the fastest approximate nearest neighbours algorithm available in the open</strong>.</p>
    </div>
    <a href="/posts/005_fast_approximate_nearest_neighbours" class="blog-read-more">Read more →</a>
</article>

<!-- Blog Post 4: CVE-scale results -->
<article class="blog-post-card">
    <div class="blog-post-meta">October 13, 2025</div> 
    <h2 class="blog-post-title"> 
    <a href="/posts/004_beyond_cosine_similarity">taumode: Beyond Cosine Similarity on the CVE dataset</a></h2>
    <div class="blog-post-abstract">
        <p>Evaluation on a CVE corpus spanning 1999 to 2025 shows spectral modes preserve head agreement with cosine while enhancing long‑tail relevance for analyst discovery.<ul> <li>Dataset loader sweeps years 1999 to 2025, generating 384‑D embeddings and shared candidate pools for cosine, hybrid, and taumode.</li><li>taumode achieves the highest Tail/Head ratio (≈0.9593) with the lowest tail variability across queries. </li></ul></p>
    </div>
    <a href="/posts/004_beyond_cosine_similarity" class="blog-read-more">Read more →</a>
</article>

<!-- Blog Post 3: Performance improvements -->
<article class="blog-post-card">
<div class="blog-post-meta">October 10, 2025</div>
<h2 class="blog-post-title">
<a href="/posts/003_performance_improvements">Road for `arrowspace` to scale: Condense, Project, and Sparsify</a>
</h2>
<div class="blog-post-abstract">
    <p>This release rethinks how `arrowspace` builds and queries graph structure from high‑dimensional embedding up to 10⁵ items and 10³ features. <ul>The Laplacian computation now:
        <li>condenses data with clustering and density‑aware sampling,</li>
        <li>projects dimensionality proportionally to the problem size (centroids) and keeps queries consistent with that projection, and </li>
        <li>sparsifies the graph with a fast spectral method to preserve structure while slashing cost.</li></ul></p>
</div>
<a href="/posts/003_performance_improvements" class="blog-read-more">Read more →</a>
</article>

<!-- Blog Post 2: October improvements -->
<article class="blog-post-card">
<div class="blog-post-meta">October 6, 2025</div>
<h2 class="blog-post-title">
<a href="/posts/002_early_october_improvements">Three Improvements That Opens up to Graph-Based Spectral Analysis</a>
</h2>
<div class="blog-post-abstract">
    <p>`ArrowSpace` has evolved with three critical enhancements that improve both performance and analytical capabilities for high-dimensional data processing. These improvements address fundamental challenges in graph construction, data scaling, and computational efficiency—delivering measurable gains that matter to production systems</p>
</div>
<a href="/posts/002_early_october_improvements" class="blog-read-more">Read more →</a>
</article>

<!-- Blog Post 1: Energy-Informed Vector Search -->
<article class="blog-post-card">
<div class="blog-post-meta">October 1, 2025</div>
<h2 class="blog-post-title">
<a href="/posts/001_energy_informed_db">The Next Evolution in AI Memory: Energy-Informed Vector Search</a>
</h2>
<div class="blog-post-abstract">
    <p>Vector databases have become the backbone of modern AI workflows, particularly in RAG systems. But traditional approaches are fundamentally limited—they miss the deeper structural patterns that define how information relates within domains. Discover how ArrowSpace introduces energy-informed indexing through taumode, enabling AI systems with memory that truly understands domain contexts through spectral signatures and graph Laplacian energy.</p>
</div>
<a href="/posts/001_energy_informed_db" class="blog-read-more">Read more →</a>
</article>
</div>