---
title: Home
layout: default
---

<style>
.research-container {
  margin: 2em auto 0 auto;
  max-width: 1200px;
  text-align: center;
}

.research-header {
  margin-bottom: 2em;
  color: #2c3e50;
  font-size: 1.5em;
  font-weight: 600;
}

.research-grid {
  display: flex;
  flex-direction: row;
  gap: 1.5em;
  padding: 0 1em;
  overflow-x: auto;
  flex-wrap: wrap;
  justify-content: center;
}

.research-card {
  background: white;
  padding: 1.5em;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex: 0 0 calc(33.333% - 1em);
  min-width: 250px;
}

.research-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.research-card a {
  text-decoration: none;
  color: inherit;
}

.research-card h3 {
  margin: 0 0 0.5em 0;
  font-size: 1.2em;
}

.research-card p {
  margin: 0;
  color: #666;
  line-height: 1.5;
}

.card-arrowspace {
  border-top: 4px solid #3498db;
}
.card-arrowspace h3 {
  color: #3498db;
}

.card-smartcore {
  border-top: 4px solid #e74c3c;
}
.card-smartcore h3 {
  color: #e74c3c;
}

.card-vibelang {
  border-top: 4px solid #f39c12;
}
.card-vibelang h3 {
  color: #f39c12;
}

.card-bmpp-agents {
  border-top: 4px solid #9b59b6;
}
.card-bmpp-agents h3 {
  color: #9b59b6;
}

.card-bmpp-paper {
  border-top: 4px solid #27ae60;
}
.card-bmpp-paper h3 {
  color: #27ae60;
}

.blog-container {
  margin: 3em auto 0 auto;
  max-width: 800px;
}

.blog-header {
  margin-bottom: 2em;
  color: #2c3e50;
  text-align: center;
}

.blog-posts {
  display: flex;
  flex-direction: column;
  gap: 2em;
}

.blog-post-card {
  background: white;
  padding: 2em;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-left: 4px solid #3498db;
  margin-top: 0.5em;
}

.blog-post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.blog-post-meta {
  color: #7f8c8d;
  font-size: 0.9em;
  margin-bottom: 0.5em;
}

.blog-post-title {
  margin: 0 0 0.8em 0;
  font-size: 1.6em;
  color: #2c3e50;
}

.blog-post-title a {
  text-decoration: none;
  color: inherit;
  transition: color 0.2s ease;
}

.blog-post-title a:hover {
  color: #3498db;
}

.blog-post-abstract {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1em;
}

.blog-read-more {
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.blog-read-more:hover {
  color: #2980b9;
}
</style>

# 👋 Welcome!
<p><strong class="pure-menu-item">I am Lorenzo</strong> — I produce novel research and code leveraging Large Language Models. I focus on <strong class="pure-menu-item">workflows automation with AI Agents and code generation</strong>.<br/> Also check out my research on <a href="{{ "/posts/001_energy_informed_db" }}">a new generation of vector databases. **Make database think as LLMs think**.</a>.</p>

<div class="research-container">
  <h2 class="research-header">
    🔬 Explore my research, protocols and Open Source implementations
  </h2>

  <div class="research-grid">
    <div class="research-card card-arrowspace">
      <a href="{{ "/arrowspace-paper" }}">
        <h3>ArrowSpace</h3>
        <p>Vector Similarities and Graph Analysis</p>
      </a>
    </div>

    <div class="research-card card-smartcore">
      <a href="{{ "/smartcorelib" }}">
        <h3>smartcore</h3>
        <p>Rust ML library (statistics & machine learning)</p>
      </a>
    </div>

    <div class="research-card card-vibelang">
      <a href="{{ "/vibelang-rs" }}">
        <h3>vibelang-rs</h3>
        <p>Generate code for AI agents using Meaning Typed Prompting</p>
      </a>
    </div>

    <div class="research-card card-bmpp-agents">
      <a href="{{ "/bmpp" }}">
        <h3>BMPP Agents</h3>
        <p>Protocol & scalable AI multi-agent installations</p>
      </a>
    </div>

    <div class="research-card card-bmpp-paper">
      <a href="{{ "/bmpp-paper" }}">
        <h3>BMPP Paper</h3>
        <p>Formally define AI Agents</p>
      </a>
    </div>
    
    <div class="research-card card-arrowspace">
      <a href="{{ "/blog" }}">
        <h3>Blog</h3>
        <p>A collection of development logs</p>
      </a>
    </div>
  </div>
</div>

<div class="blog-container">
  <div class="blog-header">
    <h2>📝 Latest Blog Posts</h2>
  </div>

  <div class="blog-posts">
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
</div>

<div class="intermission" style="min-height: 0.5em;"></div>

<div style="margin: 2em auto 0 auto; max-width: 600px; text-align: center;">
  <strong>Dig my previous research at <a href="https://pramantha.net">pramantha.net</a></strong>
</div>

<div style="margin: 1.6em auto 0 auto; max-width: 600px; text-align: center;">
<strong>Curious?</strong> 
Start exploring the pages above or reach out via the Contact page for questions, collaborations, or sponsorship info!
</div>
