---
title: Blog
layout: default
---
<style> .blog-container { margin: 2em auto 0 auto; max-width: 800px; } .blog-header { margin-bottom: 2em; color: #2c3e50; text-align: center; } .blog-posts { display: flex; flex-direction: column; gap: 2em; } .blog-post-card { background: white; padding: 2em; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: transform 0.3s ease, box-shadow 0.3s ease; border-left: 4px solid #3498db; margin-top: 0.5em;} .blog-post-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); } .blog-post-meta { color: #7f8c8d; font-size: 0.9em; margin-bottom: 0.5em; } .blog-post-title { margin: 0 0 0.8em 0; font-size: 1.6em; color: #2c3e50; } .blog-post-title a { text-decoration: none; color: inherit; transition: color 0.2s ease; } .blog-post-title a:hover { color: #3498db; } .blog-post-abstract { color: #555; line-height: 1.6; margin-bottom: 1em; } .blog-read-more { color: #3498db; text-decoration: none; font-weight: 600; transition: color 0.2s ease; } .blog-read-more:hover { color: #2980b9; } </style>

<div class="blog-container">
    <div class="blog-header">
        <h1>Blog</h1>
        <p>Thoughts on AI, machine learning, distributed systems, and open-source development</p>
    </div>

    <div class="blog-posts">
    <!-- Blog Post: CVE-scale results -->
    <article class="blog-post-card">
        <div class="blog-post-meta">October 13, 2025</div> 
        <h2 class="blog-post-title"> 
        <a href="/posts/004_beyond_cosine_similarity">CVE experiment results: <bold>taumode</bold> boosts long‑tail quality</a></h2>
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