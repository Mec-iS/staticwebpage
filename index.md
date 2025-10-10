---
title: Home
layout: default
---

<style>
.research-container {
  margin: 2em auto 0 auto;
  max-width: 800px;
  text-align: center;
}

.research-header {
  margin-bottom: 2em;
  color: #2c3e50;
  font-size: 1.5em;
  font-weight: 600;
}

.research-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5em;
  padding: 0 1em;
}

.research-card {
  background: white;
  padding: 1.5em;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
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


  <div class="intermission" style="min-height: 0.5em;"></div>

<div style="margin: 2em auto 0 auto; max-width: 600px; text-align: center;">

  <strong>Dig my previous research at <a href="https://pramantha.net">pramantha.net</a></strong>

</div>


<div style="margin: 1.6em auto 0 auto; max-width: 600px; text-align: center;">
<strong>Curious?</strong> 
Start exploring the pages above or reach out via the Contact page for questions, collaborations, or sponsorship info!
</div>

