---
title: Book
layout: default
---

<style>
.book-hero {
  display: grid;
  grid-template-columns: minmax(200px, 280px) 1fr;
  gap: 2rem;
  align-items: start;
  margin: 1rem auto 3rem;
  max-width: 900px;
}
.book-cover {
  aspect-ratio: 2 / 3;
  border-radius: var(--radius-xl);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  text-align: center;
}
.book-cover__title {
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text);
  margin: 0 0 0.5rem;
}
.book-cover__author {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}
.book-details h1 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 0.75rem;
  color: var(--color-text);
}
.book-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  font-size: 0.88rem;
  color: var(--color-text-muted);
  margin-bottom: 1.25rem;
}
.book-meta span {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}
.book-desc {
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}
.book-desc p + p {
  margin-top: 1rem;
}
.book-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-accent-orange);
  color: #fff;
  text-decoration: none;
  padding: 0.7rem 1.4rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  transition: opacity var(--transition);
}
.book-cta:hover {
  opacity: 0.9;
}
@media (max-width: 640px) {
  .book-hero {
    grid-template-columns: 1fr;
  }
  .book-cover {
    max-width: 220px;
    margin: 0 auto;
  }
}
</style>

<div class="book-hero">
  <div class="book-cover" aria-hidden="true">
    <div class="book-cover__title">Human-Machine Search</div>
    <div class="book-cover__title" style="font-size: 1rem; font-weight: 500; color: var(--color-text-muted);">Synthetic Intelligence</div>
    <div class="book-cover__author">Lorenzo Moriondo</div>
  </div>

  <div class="book-details">
    <h1>Human-Machine Search: Synthetic Intelligence</h1>
    <div class="book-meta">
      <span>Kindle & Hardcover</span>
      <span>151 pages</span>
      <span>English</span>
      <span>July 12, 2026</span>
    </div>

    <div class="book-desc">
      <p>A philosophical and personal journey from information technology to AI. This collection of articles and essays traces how the world of information processing has changed over the last fifteen years, moving through Big Data, Machine Learning and Large Language Models.</p>
      <p>Technical and philosophical themes are woven together with a framing of personal research, aiming to set down foundational concepts for identifying what computers are doing now, what they are likely to do next, and how humans and human society adapt to a newer artificial landscape.</p>
    </div>

    <a href="https://www.amazon.com/dp/B0H7Q9HMZ7" class="book-cta" target="_blank" rel="noopener noreferrer">
      View on Amazon
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
    </a>
  </div>
</div>
