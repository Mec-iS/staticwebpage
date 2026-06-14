---
title: Graph Wiring
layout: timeline
---

# From ArrowSpace to Graph Wiring

<style>
/* ══════════════════════════════════════════════
   DASHBOARD SHELL
   ══════════════════════════════════════════════ */
:root {
  --panel-max: 960px;
  --panel-gap: clamp(1rem, 4vw, 3rem);
  --nav-h: 52px;
}

/* ── Panel nav ─────────────────────────────── */
.dash-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-bg, #f7f6f2);
  border-bottom: 1px solid var(--color-border, #d4d1ca);
  display: flex;
  gap: 0;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  height: var(--nav-h);
}
.dash-nav::-webkit-scrollbar { display: none; }

.dash-nav-btn {
  flex: 0 0 auto;
  padding: 0 1.25rem;
  height: 100%;
  border: none;
  border-bottom: 3px solid transparent;
  background: none;
  color: var(--color-text-muted, #7a7974);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  white-space: nowrap;
  transition: color 160ms, border-color 160ms;
}
.dash-nav-btn:hover { color: var(--color-text, #28251d); }
.dash-nav-btn.active {
  color: var(--color-primary, #01696f);
  border-bottom-color: var(--color-primary, #01696f);
}

/* ── Panel sections ────────────────────────── */
.dash-panel {
  display: none;
  padding-top: var(--panel-gap);
  padding-bottom: calc(var(--panel-gap) * 2);
  min-height: calc(100vh - var(--nav-h));
}
.dash-panel.active { display: block; }

/* ══════════════════════════════════════════════
   EXISTING TIMELINE STYLES (preserved)
   ══════════════════════════════════════════════ */
/* ── Filter bar ──────────────────────────────── */
.tl-filter-bar {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 0 auto 2rem;
  max-width: 900px;
}
.tl-filter-btn {
  padding: 0.3rem 0.85rem;
  border-radius: 9999px;
  border: 1px solid var(--color-border, #d4d1ca);
  background: var(--color-surface, #f9f8f5);
  color: var(--color-text-muted, #7a7974);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background 180ms, color 180ms, border-color 180ms;
}
.tl-filter-btn:hover {
  background: var(--color-surface-offset, #f3f0ec);
  color: var(--color-text, #28251d);
}
.tl-filter-btn.active {
  background: var(--color-primary, #01696f);
  color: #fff;
  border-color: var(--color-primary, #01696f);
}

/* ── Timeline item base ──────────────────────── */
.timeline-item {
  opacity: 0;
  transform: translateY(36px);
  transition: opacity 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275),
              transform 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@media (prefers-reduced-motion: reduce) {
  .timeline-item {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .timeline-item .timeline-dot,
  .timeline-item .timeline-line {
    opacity: 1;
    transition: none;
  }
}
.timeline-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}
.timeline-item .timeline-dot,
.timeline-item .timeline-line {
  opacity: 0;
  transition: opacity 0.4s ease-in 0.25s;
}
.timeline-item.is-visible .timeline-dot,
.timeline-item.is-visible .timeline-line {
  opacity: 1;
}
.timeline-item.tl-hidden {
  display: none;
}

/* ── Type-specific dot colours ───────────────── */
.timeline-item[data-type="paper"] .timeline-dot {
  background: var(--color-primary, #01696f);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary, #01696f) 20%, transparent);
}
.timeline-item[data-type="blog"] .timeline-dot {
  background: var(--color-gold, #d19900);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-gold, #d19900) 18%, transparent);
  width: 0.6rem !important;
  height: 0.6rem !important;
}
.timeline-item[data-type="milestone"] .timeline-dot {
  background: var(--color-orange, #da7101);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-orange, #da7101) 22%, transparent);
}
.timeline-item[data-type="code"] .timeline-dot {
  background: var(--color-blue, #5591c7);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-blue, #5591c7) 20%, transparent);
  width: 0.65rem !important;
  height: 0.65rem !important;
}

/* ── Category badge ──────────────────────────── */
.tl-badge {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  margin-bottom: 0.3rem;
}
.tl-badge.paper     { background: color-mix(in srgb, var(--color-primary, #01696f) 15%, transparent); color: var(--color-primary, #01696f); }
.tl-badge.blog      { background: color-mix(in srgb, var(--color-gold, #d19900) 15%, transparent);    color: #9a6f00; }
.tl-badge.milestone { background: color-mix(in srgb, var(--color-orange, #da7101) 15%, transparent);  color: var(--color-orange, #da7101); }
.tl-badge.code      { background: color-mix(in srgb, var(--color-blue, #5591c7) 15%, transparent);    color: var(--color-blue, #5591c7); }

/* ── Value chip ──────────────────────────────── */
.tl-value-chip {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.55rem;
  border-radius: 9999px;
  background: color-mix(in srgb, var(--color-success, #437a22) 12%, transparent);
  color: var(--color-success, #437a22);
  margin-left: 0.4rem;
  vertical-align: middle;
}

/* ── Download stats chips ────────────────────── */
.tl-dl-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0.4rem 0 0.2rem;
}
.tl-dl-chip {
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.12rem 0.5rem;
  border-radius: 9999px;
  border: 1px solid var(--color-border, #d4d1ca);
  background: var(--color-surface-offset, #f3f0ec);
  color: var(--color-text-muted, #7a7974);
}
.tl-dl-chip.total  { color: var(--color-blue, #5591c7); border-color: color-mix(in srgb, var(--color-blue, #5591c7) 35%, transparent); background: color-mix(in srgb, var(--color-blue, #5591c7) 8%, transparent); }
.tl-dl-chip.recent { color: var(--color-success, #437a22); border-color: color-mix(in srgb, var(--color-success, #437a22) 35%, transparent); background: color-mix(in srgb, var(--color-success, #437a22) 8%, transparent); }

/* ── Expand drawer ───────────────────────────── */
.tl-drawer {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
@media (prefers-reduced-motion: reduce) {
  .tl-drawer { transition: none; }
}
.tl-drawer.open { max-height: 600px; }
.tl-drawer-inner {
  padding: 0.75rem 0 0.5rem;
  font-size: 0.88rem;
  color: var(--color-text-muted, #7a7974);
  line-height: 1.6;
}
.tl-drawer-inner ul {
  padding-left: 1.1rem;
  margin: 0.4rem 0 0.6rem;
}
.tl-drawer-inner li { margin-top: 0.3rem; }
.tl-toggle {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--color-primary, #01696f);
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  margin-top: 0.3rem;
  letter-spacing: 0.02em;
}
.tl-toggle:hover { text-decoration: underline; }

/* ── Sponsor strip ───────────────────────────── */
.sponsor-strip {
  max-width: 900px;
  margin: 3rem auto 2rem;
  padding: 1.5rem 2rem;
  background: color-mix(in srgb, var(--color-primary, #01696f) 7%, var(--color-surface, #f9f8f5));
  border: 1px solid color-mix(in srgb, var(--color-primary, #01696f) 25%, transparent);
  border-radius: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
}
.sponsor-strip-stats {
  font-size: 0.82rem;
  color: var(--color-text-muted, #7a7974);
  line-height: 1.7;
}
.sponsor-strip-stats strong {
  color: var(--color-text, #28251d);
  font-size: 0.95rem;
  display: block;
  margin-bottom: 0.3rem;
}
.stat-pill {
  display: inline-block;
  background: var(--color-surface, #f9f8f5);
  border: 1px solid var(--color-border, #d4d1ca);
  border-radius: 9999px;
  padding: 0.15rem 0.6rem;
  font-size: 0.72rem;
  font-weight: 600;
  margin: 0.15rem 0.15rem 0 0;
  color: var(--color-text, #28251d);
}
.sponsor-strip-cta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.6rem;
}
.sponsor-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: var(--color-primary, #01696f);
  color: #fff;
  text-decoration: none;
  padding: 0.55rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 700;
  transition: opacity 180ms;
}
.sponsor-btn:hover { opacity: 0.85; }
@media (max-width: 600px) {
  .sponsor-strip { flex-direction: column; align-items: flex-start; }
  .sponsor-strip-cta { align-items: flex-start; }
}

/* ── Blog impact panel ───────────────────────── */
.blog-panel {
  max-width: 900px;
  margin: 2rem auto 3rem;
}
.blog-panel-title {
  font-size: clamp(1.1rem, 1rem + 0.6vw, 1.45rem);
  font-weight: 700;
  margin-bottom: 1.25rem;
  color: var(--color-text, #28251d);
}
.blog-panel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
  gap: 1rem;
}
.bp-card {
  background: var(--color-surface, #f9f8f5);
  border: 1px solid var(--color-border, #d4d1ca);
  border-radius: 0.75rem;
  padding: 1.15rem 1.15rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  transition: transform 180ms cubic-bezier(0.16,1,0.3,1), box-shadow 180ms;
}
.bp-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--bp-accent, var(--color-primary, #01696f));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
}
@media (prefers-reduced-motion: reduce) {
  .bp-card, .bp-card::before { transition: none; }
}
.bp-card:hover::before { transform: scaleX(1); }
.bp-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px oklch(0.2 0.01 80 / 0.1);
}
.bp-meta { font-size: 0.7rem; color: var(--color-text-faint, #bab9b4); text-transform: uppercase; letter-spacing: 0.07em; }
.bp-title { font-size: 0.95rem; font-weight: 700; line-height: 1.25; color: var(--color-text, #28251d); }
.bp-metric {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-success, #437a22);
  background: color-mix(in srgb, var(--color-success, #437a22) 10%, transparent);
  border-radius: 9999px;
  padding: 0.15rem 0.55rem;
  display: inline-block;
  width: fit-content;
}
.bp-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: auto; padding-top: 0.3rem; }
.bp-tag {
  font-size: 0.63rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.1rem 0.45rem;
  border-radius: 9999px;
  background: var(--color-surface-offset, #f3f0ec);
  color: var(--color-text-muted, #7a7974);
  border: 1px solid var(--color-border, #d4d1ca);
}
.bp-readmore {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--bp-accent, var(--color-primary, #01696f));
  margin-top: 0.4rem;
}

/* ══════════════════════════════════════════════
   PANEL 2 — BLOG FIGURES GALLERY
   ══════════════════════════════════════════════ */
.fig-panel-wrap {
  max-width: var(--panel-max);
  margin: 0 auto;
  padding: 0 1rem;
}
.fig-panel-header {
  margin-bottom: 1.5rem;
}
.fig-panel-header h2 {
  font-size: clamp(1.2rem, 1rem + 1vw, 1.6rem);
  font-weight: 700;
  margin-bottom: 0.3rem;
  color: var(--color-text, #28251d);
}
.fig-panel-header p {
  font-size: 0.88rem;
  color: var(--color-text-muted, #7a7974);
  margin: 0;
}

/* ── Post filter bar ─────────────────────────── */
.fig-filter-bar {
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
  margin-bottom: 1.75rem;
}
.fig-filter-btn {
  padding: 0.28rem 0.85rem;
  border-radius: 9999px;
  border: 1px solid var(--color-border, #d4d1ca);
  background: var(--color-surface, #f9f8f5);
  color: var(--color-text-muted, #7a7974);
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background 180ms, color 180ms, border-color 180ms;
}
.fig-filter-btn:hover {
  background: var(--color-surface-offset, #f3f0ec);
  color: var(--color-text, #28251d);
}
.fig-filter-btn.active {
  background: var(--color-primary, #01696f);
  color: #fff;
  border-color: var(--color-primary, #01696f);
}

/* ── Section label ───────────────────────────── */
.fig-section-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-faint, #bab9b4);
  margin: 0 0 0.75rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--color-divider, #dcd9d5);
}

/* ── Masonry grid ────────────────────────────── */
.fig-masonry {
  columns: 2 260px;
  column-gap: 0.85rem;
}
@media (min-width: 680px) { .fig-masonry { columns: 3 220px; } }
@media (min-width: 900px) { .fig-masonry { columns: 4 200px; } }

/* ── Figure card ─────────────────────────────── */
.fig-card {
  break-inside: avoid;
  margin-bottom: 0.85rem;
  background: var(--color-surface, #f9f8f5);
  border: 1px solid oklch(from var(--color-text, #28251d) l c h / 0.08);
  border-radius: 0.6rem;
  overflow: hidden;
  cursor: zoom-in;
  transition: transform 180ms cubic-bezier(0.16,1,0.3,1),
              box-shadow 180ms cubic-bezier(0.16,1,0.3,1);
}
@media (prefers-reduced-motion: reduce) { .fig-card { transition: none; } }
.fig-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px oklch(0.2 0.01 80 / 0.1);
}
.fig-card img {
  display: block;
  width: 100%;
  height: auto;
  background: var(--color-surface-offset, #f3f0ec);
}
.fig-card-caption {
  padding: 0.45rem 0.6rem 0.5rem;
}
.fig-card-post {
  display: inline-block;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 0.1rem 0.4rem;
  border-radius: 9999px;
  margin-bottom: 0.2rem;
  background: color-mix(in srgb, var(--color-primary, #01696f) 12%, transparent);
  color: var(--color-primary, #01696f);
}
.fig-card-name {
  font-size: 0.73rem;
  color: var(--color-text-muted, #7a7974);
  line-height: 1.35;
  word-break: break-word;
}

/* ── Lightbox ────────────────────────────────── */
.fig-lightbox {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: oklch(0.1 0 0 / 0.88);
  align-items: center;
  justify-content: center;
  padding: 1rem;
  cursor: zoom-out;
}
.fig-lightbox.open { display: flex; }
.fig-lightbox img {
  max-width: min(90vw, 1100px);
  max-height: 88vh;
  width: auto;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 24px 64px oklch(0 0 0 / 0.55);
  cursor: default;
}
.fig-lightbox-close {
  position: absolute;
  top: 1rem; right: 1.25rem;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 150ms;
}
.fig-lightbox-close:hover { opacity: 1; }
.fig-lightbox-caption {
  position: absolute;
  bottom: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  background: oklch(0.12 0 0 / 0.75);
  color: #e8e8e6;
  font-size: 0.8rem;
  padding: 0.35rem 0.9rem;
  border-radius: 9999px;
  white-space: nowrap;
  pointer-events: none;
}
/* ══════════════════════════════════════════════
   PANEL 3 — NeurIPS 2026 CVE RESULTS
   ══════════════════════════════════════════════ */

.n3-wrap {
  max-width: var(--panel-max);
  margin: 0 auto;
  padding: 0 1rem 3rem;
}

/* ── Header ──────────────────────────────────── */
.n3-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}
.n3-title {
  font-size: clamp(1.4rem, 1rem + 2vw, 2.1rem);
  font-weight: 700;
  color: var(--color-text, #28251d);
  line-height: 1.15;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  flex-wrap: wrap;
}
.n3-title .n3-star-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  background: color-mix(in srgb, var(--color-gold, #d19900) 18%, transparent);
  color: #8a5b00;
  border: 1px solid color-mix(in srgb, var(--color-gold, #d19900) 40%, transparent);
  vertical-align: middle;
}
.n3-subtitle {
  font-size: 0.88rem;
  color: var(--color-text-muted, #7a7974);
  margin-top: 0.3rem;
}

/* ── Run-info button + overlay ──────────────── */
.n3-runinfo-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-primary, #01696f);
  background: color-mix(in srgb, var(--color-primary, #01696f) 8%, var(--color-surface, #f9f8f5));
  border: 1px solid color-mix(in srgb, var(--color-primary, #01696f) 30%, transparent);
  border-radius: 9999px;
  padding: 0.35rem 0.85rem;
  cursor: pointer;
  transition: background 160ms, color 160ms;
  white-space: nowrap;
  align-self: flex-start;
  margin-top: 0.2rem;
}
.n3-runinfo-btn:hover {
  background: color-mix(in srgb, var(--color-primary, #01696f) 15%, var(--color-surface, #f9f8f5));
}
.n3-runinfo-overlay {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 9000;
  background: oklch(0.1 0 0 / 0.55);
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.n3-runinfo-overlay.open { display: flex; }
.n3-runinfo-card {
  background: var(--color-surface-2, #fbfbf9);
  border: 1px solid var(--color-border, #d4d1ca);
  border-radius: 1rem;
  padding: 1.75rem 2rem;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 16px 48px oklch(0 0 0 / 0.2);
  position: relative;
}
.n3-runinfo-card h3 {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-text, #28251d);
}
.n3-runinfo-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.83rem;
}
.n3-runinfo-table tr + tr td { border-top: 1px solid var(--color-divider, #dcd9d5); }
.n3-runinfo-table td {
  padding: 0.45rem 0.25rem;
  vertical-align: top;
  color: var(--color-text-muted, #7a7974);
}
.n3-runinfo-table td:first-child {
  font-weight: 700;
  color: var(--color-text, #28251d);
  white-space: nowrap;
  padding-right: 1rem;
  width: 38%;
}
.n3-runinfo-close {
  position: absolute;
  top: 0.85rem; right: 1rem;
  background: none; border: none;
  font-size: 1.35rem; line-height: 1;
  cursor: pointer;
  color: var(--color-text-muted, #7a7974);
  opacity: 0.7;
  transition: opacity 150ms;
}
.n3-runinfo-close:hover { opacity: 1; }

/* ── Skeleton loader ─────────────────────────── */
@keyframes n3-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
.n3-skeleton {
  background: linear-gradient(
    90deg,
    var(--color-surface-offset, #f3f0ec) 25%,
    var(--color-surface-dynamic, #e6e4df) 50%,
    var(--color-surface-offset, #f3f0ec) 75%
  );
  background-size: 200% 100%;
  animation: n3-shimmer 1.5s ease-in-out infinite;
  border-radius: 0.5rem;
}
@media (prefers-reduced-motion: reduce) {
  .n3-skeleton { animation: none; background: var(--color-surface-offset, #f3f0ec); }
}
.n3-skeleton-png   { height: 220px; margin-bottom: 1rem; }
.n3-skeleton-chart { height: 280px; margin-bottom: 1rem; }

/* ── Error card ──────────────────────────────── */
.n3-error-card {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.85rem 1rem;
  border-radius: 0.6rem;
  background: color-mix(in srgb, var(--color-error, #a12c7b) 8%, var(--color-surface, #f9f8f5));
  border: 1px solid color-mix(in srgb, var(--color-error, #a12c7b) 30%, transparent);
  font-size: 0.8rem;
  color: var(--color-error, #a12c7b);
  font-weight: 600;
}

/* ── Section label ───────────────────────────── */
.n3-section-label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--color-text-faint, #bab9b4);
  margin: 0 0 0.85rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--color-divider, #dcd9d5);
}

/* ── PNG grid ────────────────────────────────── */
.n3-png-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.9rem;
  margin-bottom: 2.5rem;
}
@media (max-width: 600px) {
  .n3-png-grid { grid-template-columns: 1fr; }
}
.n3-png-card {
  background: var(--color-surface, #f9f8f5);
  border: 1px solid oklch(from var(--color-text, #28251d) l c h / 0.08);
  border-radius: 0.65rem;
  overflow: hidden;
  cursor: zoom-in;
  transition: transform 180ms cubic-bezier(0.16,1,0.3,1), box-shadow 180ms;
}
@media (prefers-reduced-motion: reduce) { .n3-png-card { transition: none; } }
.n3-png-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px oklch(0.2 0.01 80 / 0.1);
}
.n3-png-card img {
  display: block;
  width: 100%;
  height: auto;
  background: var(--color-surface-offset, #f3f0ec);
}
.n3-png-caption {
  padding: 0.45rem 0.7rem 0.55rem;
}
.n3-png-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted, #7a7974);
  line-height: 1.3;
}

/* ── Chart.js interactive charts ────────────── */
.n3-charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;
}
@media (max-width: 660px) {
  .n3-charts-grid { grid-template-columns: 1fr; }
}
.n3-chart-card {
  background: var(--color-surface, #f9f8f5);
  border: 1px solid var(--color-border, #d4d1ca);
  border-radius: 0.75rem;
  padding: 1rem 1rem 0.75rem;
}
.n3-chart-title {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-text, #28251d);
  margin-bottom: 0.6rem;
  letter-spacing: 0.01em;
}
.n3-chart-wrap {
  position: relative;
  height: 240px;
}
</style>

<!-- ══════════════════════════════════════════════
     PANEL NAV
     ══════════════════════════════════════════════ -->
<nav class="dash-nav" role="tablist" aria-label="Dashboard panels">
  <button class="dash-nav-btn active" role="tab" aria-selected="true"  aria-controls="panel-1" data-panel="1">📅 Timeline</button>
  <button class="dash-nav-btn"        role="tab" aria-selected="false" aria-controls="panel-2" data-panel="2">📊 Blog Figures</button>
  <button class="dash-nav-btn"        role="tab" aria-selected="false" aria-controls="panel-3" data-panel="3">⭐ NeurIPS 2026</button>
  <button class="dash-nav-btn"        role="tab" aria-selected="false" aria-controls="panel-4" data-panel="4">❤️ Sponsor</button>
</nav>

<!-- ══════════════════════════════════════════════
     PANEL 1 — TIMELINE
     ══════════════════════════════════════════════ -->
<section id="panel-1" class="dash-panel active" role="tabpanel" aria-labelledby="panel-1-tab">

<!-- ── Filter bar ─────────────────────────────────── -->
<div class="tl-filter-bar" role="group" aria-label="Filter timeline events">
  <button class="tl-filter-btn active" data-filter="all">All</button>
  <button class="tl-filter-btn" data-filter="paper">📄 Papers</button>
  <button class="tl-filter-btn" data-filter="blog">✍️ Blog</button>
  <button class="tl-filter-btn" data-filter="milestone">🏆 Milestones</button>
  <button class="tl-filter-btn" data-filter="code">📦 Code</button>
</div>

<div class="timeline timeline--vertical">

  <!-- 2024-02 smartcore v0.5.0 (Rust) -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Rust Crate</span>
      <div class="timeline-item__date">2024 (earliest release in corpus)</div>
      <h2 class="timeline-item__title"><a href="https://crates.io/crates/smartcore" target="_blank" rel="noopener"><code>smartcore</code> v0.5.0</a></h2>
      <p class="timeline-item__meta">Machine Learning in Rust. Foundation library underpinning spectral clustering and manifold utilities across the stack.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">📥 contributor</span>
      </div>
    </div>
  </div>

  <!-- 2025-09-10 ArrowSpace paper -->
  <div class="timeline-item" data-type="paper">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge paper">Paper</span>
      <div class="timeline-item__date">September 10, 2025</div>
      <h2 class="timeline-item__title">ArrowSpace: Spectral Indexing of Embeddings using taumode (λτ)</h2>
      <p class="timeline-item__meta">
        <strong>DOI:</strong>
        <a href="https://doi.org/10.21105/joss.09002" target="_blank" rel="noopener">
          <img src="https://zenodo.org/badge/DOI/10.21105/09002.svg" alt="DOI:joss.10.21105.09002" loading="lazy">
        </a>
      </p>
      <button class="tl-toggle" aria-expanded="false">Show details ↓</button>
      <div class="tl-drawer" role="region">
        <div class="tl-drawer-inner">
          <ul>
            <li>Introduces ArrowSpace: spectral vector search blending semantic similarity with graph Laplacian energies via the synthetic λτ (taumode) index.</li>
            <li>Establishes λτ as a computationally cheap proxy for structural deviation — operationally useful for active learning, RAG tails, and OOD detection.</li>
            <li>Sets the invariant that the manifold is built in <em>feature space</em> rather than item space.</li>
          </ul>
          <p class="timeline-item__links">
            <strong>Code:</strong>
            <a href="https://github.com/tuned-org-uk/arrowspace" target="_blank" rel="noopener">arrowspace (Rust)</a>
            · <a href="https://github.com/tuned-org-uk/pyarrowspace/tree/af8d97b4ea20267b2bd49a1a902b8013b63a5248/tests/output/v0_25/1771182601_test_2" target="_blank" rel="noopener">CVE benchmark</a>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- 2025-10-01 Post 001 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">October 1, 2025</div>
      <h2 class="timeline-item__title">The Next Evolution in AI Memory: Energy-Informed Vector Search
        <span class="tl-value-chip">founding post</span>
      </h2>
      <p class="timeline-item__links"><a href="/posts/001_energy_informed_db">Read post →</a></p>
    </div>
  </div>

  <!-- ~2025-10 optical-embeddings v0.3.0 -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Rust Crate</span>
      <div class="timeline-item__date">October 2025 (≈ 8 months ago)</div>
      <h2 class="timeline-item__title"><a href="https://crates.io/crates/optical-embeddings" target="_blank" rel="noopener"><code>optical-embeddings</code> v0.3.0</a></h2>
      <p class="timeline-item__meta">DeepSeek-OCR — compress text into images. Optical token-compression for dense-context pipelines.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">📥 225 total</span>
        <span class="tl-dl-chip recent">⚡ 5 recent</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/optical-embeddings-rs" target="_blank" rel="noopener">Repository</a> · <a href="https://docs.rs/optical-embeddings-rs" target="_blank" rel="noopener">Docs</a></p>
    </div>
  </div>

  <!-- 2025-10-17 Post 005 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">October 17, 2025</div>
      <h2 class="timeline-item__title">Fast (not approximate?) Nearest Neighbours
        <span class="tl-value-chip">v0.16.0 — fastest open ANN</span>
      </h2>
      <p class="timeline-item__links"><a href="/posts/005_fast_approximate_nearest_neighbours">Read post →</a></p>
    </div>
  </div>

  <!-- 2025-10-24 Post 007 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">October 24, 2025</div>
      <h2 class="timeline-item__title">DeepSeek-OCR + Energy Search in ArrowSpace v0.18.0
        <span class="tl-value-chip">NDCG@10 ≈ 0.99 · MRR=1.0</span>
      </h2>
      <p class="timeline-item__links"><a href="/posts/007_deepseek_optical_compression_rust">Read post →</a></p>
    </div>
  </div>

  <!-- 2025-11-07 Post 009 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">November 7, 2025</div>
      <h2 class="timeline-item__title">Efficient GPT training: a Rust-powered GPT-2 deep dive</h2>
      <p class="timeline-item__links"><a href="/posts/009_llms_nanogpt_model_in_rust">Read post →</a></p>
    </div>
  </div>

  <!-- ~2025-11 nanogpt v0.1.0 -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Rust Crate</span>
      <div class="timeline-item__date">November 2025 (≈ 6 months ago)</div>
      <h2 class="timeline-item__title"><a href="https://crates.io/crates/nanogpt" target="_blank" rel="noopener"><code>nanogpt</code> v0.1.0</a></h2>
      <p class="timeline-item__meta">Nanochat in Rust. Companion to the GPT-2 deep-dive post; full transformer impl with RoPE, MQA, RMSNorm.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">📥 22 total</span>
        <span class="tl-dl-chip recent">⚡ 5 recent</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/nanogpt-rs" target="_blank" rel="noopener">Repository</a> · <a href="https://docs.rs/nanogpt-rs" target="_blank" rel="noopener">Docs</a></p>
    </div>
  </div>

  <!-- ~2025-11 dspm-rs v0.1.0 -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Rust Crate</span>
      <div class="timeline-item__date">November 2025 (≈ 6 months ago)</div>
      <h2 class="timeline-item__title"><a href="https://crates.io/crates/dspm-rs" target="_blank" rel="noopener"><code>dspm-rs</code> v0.1.0</a></h2>
      <p class="timeline-item__meta">Graph dimensionality reduction for vector similarities via subgraphs.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">📥 21 total</span>
        <span class="tl-dl-chip recent">⚡ 3 recent</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/topolog-embeddings" target="_blank" rel="noopener">Repository</a></p>
    </div>
  </div>

  <!-- ~2025-11 javelin-tui v0.10.0 -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Rust Crate</span>
      <div class="timeline-item__date">November 2025 (≈ 6 months ago)</div>
      <h2 class="timeline-item__title"><a href="https://crates.io/crates/javelin-tui" target="_blank" rel="noopener"><code>javelin-tui</code> v0.10.0</a></h2>
      <p class="timeline-item__meta">TUI for displaying and working with Lance matrices — developer tooling for the ArrowSpace ecosystem.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">📥 142 total</span>
        <span class="tl-dl-chip recent">⚡ 3 recent</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/javelin-tui" target="_blank" rel="noopener">Repository</a></p>
    </div>
  </div>

  <!-- 2025-11-12 Post 010 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">November 12, 2025</div>
      <h2 class="timeline-item__title">Why <code>arrowspace</code> is game-changing for data operations at scale</h2>
      <p class="timeline-item__links"><a href="/posts/010_game_changer_unifying_vectors_and_features_graphs">Read post →</a></p>
    </div>
  </div>

  <!-- 2025-11-26 Post 011 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">November 26, 2025</div>
      <h2 class="timeline-item__title">Safer LLMs require open search — Building the AI Memory Layer
        <span class="tl-value-chip">AI safety</span>
      </h2>
      <p class="timeline-item__links"><a href="/posts/011_safer_LLMs_require_more_open_search_building_AI_memory_layer">Read post →</a></p>
    </div>
  </div>

  <!-- ~2025-12 deep-delta-learn v0.1.0 -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Rust Crate</span>
      <div class="timeline-item__date">December 2025 (≈ 5 months ago)</div>
      <h2 class="timeline-item__title"><a href="https://crates.io/crates/deep-delta-learn" target="_blank" rel="noopener"><code>deep-delta-learn</code> v0.1.0</a></h2>
      <p class="timeline-item__meta">Implementation of Deep Delta Learning (paper 2601.00417). Structured incremental learning for spectral models.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">📥 22 total</span>
        <span class="tl-dl-chip recent">⚡ 4 recent</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/deep-delta-learn" target="_blank" rel="noopener">Repository</a> · <a href="https://docs.rs/deep-delta-learn" target="_blank" rel="noopener">Docs</a></p>
    </div>
  </div>

  <!-- 2026-01-05 Post 012 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">January 5, 2026</div>
      <h2 class="timeline-item__title">The Topological Transformer: Tauformer
        <span class="tl-value-chip">~50% KV-cache · ~20% faster</span>
      </h2>
      <p class="timeline-item__links"><a href="/posts/012_topological_transformer_tauformer_domain_memory_in_attention">Read post →</a></p>
    </div>
  </div>

  <!-- ~2026-02 kalman_clustering v0.3.0 -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Rust Crate</span>
      <div class="timeline-item__date">February 2026 (≈ 4 months ago)</div>
      <h2 class="timeline-item__title"><a href="https://crates.io/crates/kalman_clustering" target="_blank" rel="noopener"><code>kalman_clustering</code> v0.3.0</a></h2>
      <p class="timeline-item__meta">Clustering vectors using Kalman Filter. Powers the diffusion-split subcentroids and spectral partitioning approach.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">📥 446 total</span>
        <span class="tl-dl-chip recent">⚡ 364 recent</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/kalman_centroids" target="_blank" rel="noopener">Repository</a> · <a href="https://docs.rs/kalman_centroids" target="_blank" rel="noopener">Docs</a></p>
    </div>
  </div>

  <!-- 2026-02-17 Post 016 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">February 17, 2026</div>
      <h2 class="timeline-item__title"><code>arrowspace</code>: Capabilities, speed and accuracy</h2>
      <p class="timeline-item__links"><a href="/posts/016_arrowspace_performance_results">Read post →</a></p>
    </div>
  </div>

  <!-- 2026-02-27 Graph Wiring paper -->
  <div class="timeline-item" data-type="paper">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge paper">Paper</span>
      <div class="timeline-item__date">February 27, 2026</div>
      <h2 class="timeline-item__title">Graph Wiring: Eigenstructures for Vector Datasets and LLM Operations</h2>
      <p class="timeline-item__meta">
        <strong>DOI:</strong>
        <a href="https://doi.org/10.36227/techrxiv.177220780.02840438/v1" target="_blank" rel="noopener">
          <img src="https://zenodo.org/badge/DOI/177220780/02840438.svg" alt="DOI:au.177220780.02840438" loading="lazy">
        </a>
      </p>
      <button class="tl-toggle" aria-expanded="false">Show details ↓</button>
      <div class="tl-drawer" role="region">
        <div class="tl-drawer-inner">
          <ul>
            <li>Generalises ArrowSpace into a graph wiring framework; builds discrete graphs from arbitrary vector spaces by transposing data into feature space.</li>
            <li>Feature-space Laplacian behaves as a discrete Laplace–Beltrami operator; minimising Rayleigh quotient ≡ constructing a discrete minimal surface in feature space.</li>
            <li>Provides the theoretical foundation tying together λ-indices, epiplexity, and MRR-Top0 into a unified manifold-based view.</li>
          </ul>
          <p class="timeline-item__links">
            <strong>Code:</strong>
            <a href="https://github.com/tuned-org-uk/arrowspace" target="_blank" rel="noopener">arrowspace</a>
            · <a href="https://github.com/tuned-org-uk/surfface" target="_blank" rel="noopener">surfface</a>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- 2026-03-06 MRR-Top0 paper -->
  <div class="timeline-item" data-type="paper">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge paper">Paper</span>
      <div class="timeline-item__date">March 6, 2026</div>
      <h2 class="timeline-item__title">MRR-Top0: A Topology-Aware Extension of Mean Reciprocal Rank</h2>
      <p class="timeline-item__meta">
        <strong>DOI:</strong>
        <a href="https://www.authorea.com/users/685780/articles/1397240-mrr-top0-a-topology-aware-extension-of-mean-reciprocal-rank-for-semantic-sensitive-retrieval-evaluation" target="_blank" rel="noopener">
          <img src="https://zenodo.org/badge/DOI/177430061/18235541.svg" alt="DOI:au.177430061.18235541" loading="lazy">
        </a>
      </p>
      <button class="tl-toggle" aria-expanded="false">Show details ↓</button>
      <div class="tl-drawer" role="region">
        <div class="tl-drawer-inner">
          <ul>
            <li>Extends MRR with topology-aware score using PPR, conductance, and modularity — evaluates full top-k list, not just the first relevant hit.</li>
            <li>Quantitative lens on "tails quality" critical for long-term multi-query RAG stability.</li>
            <li>Establishes Topological PageRank as a central metric for spectral manifold assessment.</li>
          </ul>
          <p class="timeline-item__links">
            <strong>Code:</strong>
            <a href="https://github.com/tuned-org-uk/topological-pagerank" target="_blank" rel="noopener">topological-pagerank / MRR-Top0</a>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- 2026-03-08 Post 017 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">March 8, 2026</div>
      <h2 class="timeline-item__title"><code>arrowspace</code> hits the spot for semantic augmented retrieval
        <span class="tl-value-chip">geometry-only cosine fails at tail</span>
      </h2>
      <p class="timeline-item__links"><a href="/posts/017_arrowspace_search_final_assessment">Read post →</a></p>
    </div>
  </div>

  <!-- 2026-03-15 Epiplexity paper -->
  <div class="timeline-item" data-type="paper">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge paper">Paper</span>
      <div class="timeline-item__date">March 15, 2026</div>
      <h2 class="timeline-item__title">Epiplexity And Graph Wiring: An Empirical Study for the Design of a Generic Algorithm</h2>
      <p class="timeline-item__meta">
        <strong>DOI:</strong>
        <a href="https://www.authorea.com/users/685780/articles/1397239-epiplexity-and-graph-wiring-an-empirical-study-for-the-design-of-a-generic-algorithm" target="_blank" rel="noopener">
          <img src="https://zenodo.org/badge/DOI/177430060/02394540.svg" alt="DOI:au.177430060.02394540" loading="lazy">
        </a>
      </p>
      <button class="tl-toggle" aria-expanded="false">Show details ↓</button>
      <div class="tl-drawer" role="region">
        <div class="tl-drawer-inner">
          <ul>
            <li>Connects ArrowSpace λ scores to epiplexity; treats λ as proxy for manifold deviation.</li>
            <li>Studies epiplexity-weighted retrieval tail behaviour and OOD items using CVE benchmarks.</li>
            <li>Empirically tests a generic algorithm combining λ, epiplexity, and topological quality for spectral search. <code>pip install epiplexity</code></li>
          </ul>
          <p class="timeline-item__links">
            <strong>Code:</strong>
            <a href="https://github.com/tuned-org-uk/graph-wiring-epiplexity" target="_blank" rel="noopener">epiplexity and Graph Wiring</a>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- ~2026-03 Python: epiplexity (pip) -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Python Package</span>
      <div class="timeline-item__date">March 2026</div>
      <h2 class="timeline-item__title"><a href="https://pypi.org/project/epiplexity/" target="_blank" rel="noopener"><code>epiplexity</code></a> <code style="font-size:0.75rem; color:var(--color-text-faint)">pip install epiplexity</code></h2>
      <p class="timeline-item__meta">Python interface to the epiplexity + Graph Wiring algorithm. Companion to the empirical study paper.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">🐍 PyPI</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/graph-wiring-epiplexity" target="_blank" rel="noopener">Repository</a></p>
    </div>
  </div>

  <!-- 2026-03-27 Podcast milestone -->
  <div class="timeline-item" data-type="milestone">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge milestone">Milestone</span>
      <div class="timeline-item__date">March 27, 2026</div>
      <h2 class="timeline-item__title">🎙️ arrowspace: Vector Spaces and Graph Wiring — MLOps Community Podcast</h2>
      <div class="media-feature-card">
        <div class="media-feature-copy">
          <ul class="media-feature-points">
            <li>How Graph Wiring reframes vector datasets as feature-space manifolds.</li>
            <li>Why epiplexity matters for retrieval, curation, and model operations.</li>
            <li>What is structural information and how to generate information from datasets.</li>
          </ul>
          <p class="media-feature-links">
            <a href="https://www.youtube.com/watch?v=S5xbQXBiLs4" target="_blank" rel="noopener noreferrer" class="blog-read-more">
              Watch on YouTube <span aria-hidden="true">→</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- ~2026-03 constraint-decoding-trie v0.1.0 -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Rust Crate</span>
      <div class="timeline-item__date">March 2026 (≈ 3 months ago)</div>
      <h2 class="timeline-item__title"><a href="https://crates.io/crates/constraint-decoding-trie" target="_blank" rel="noopener"><code>constraint-decoding-trie</code> v0.1.0</a></h2>
      <p class="timeline-item__meta">Generative Retrieval: Transition Matrix Trie for Constraint Decoding (STATIC). Companion implementation to the Spectral IDs paper.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">📥 16 total</span>
        <span class="tl-dl-chip recent">⚡ 4 recent</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/constraint-decoding-trie-static" target="_blank" rel="noopener">Repository</a> · <a href="https://docs.rs/constraint-decoding-trie-static" target="_blank" rel="noopener">Docs</a></p>
    </div>
  </div>

  <!-- 2026-04-10 Spectral IDs paper -->
  <div class="timeline-item" data-type="paper">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge paper">Paper</span>
      <div class="timeline-item__date">April 10, 2026</div>
      <h2 class="timeline-item__title">Spectral-aware Unique Identifiers for Generative Retrieval and Vector Search</h2>
      <p class="timeline-item__meta">
        <strong>DOI:</strong>
        <a href="https://www.authorea.com/users/685780/articles/1400103-spectral-aware-unique-identifiers-for-generative-retrieval-and-vector-search" target="_blank" rel="noopener">
          <img src="https://zenodo.org/badge/DOI/177585107/76021942.svg" alt="DOI:au.177585107.76021942" loading="lazy">
        </a>
      </p>
      <button class="tl-toggle" aria-expanded="false">Show details ↓</button>
      <div class="tl-drawer" role="region">
        <div class="tl-drawer-inner">
          <ul>
            <li>Introduces spectral-aware IDs: composite codes pairing integer ID with an order key derived from taumode, aligning identifiers with the spectral manifold.</li>
            <li>Improves manifold consistency vs conventional generative retrieval identifiers; compatible with standard vector DBs and RAG pipelines.</li>
            <li>Bridge between ArrowSpace-style spectral indexing and modern generative retrieval.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- ~2026-04 Python: arrowspace (pip) -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Python Package</span>
      <div class="timeline-item__date">April 2026</div>
      <h2 class="timeline-item__title"><a href="https://pypi.org/project/arrowspace/" target="_blank" rel="noopener"><code>arrowspace</code></a> <code style="font-size:0.75rem; color:var(--color-text-faint)">pip install arrowspace</code></h2>
      <p class="timeline-item__meta">Python bindings to the ArrowSpace Rust engine. Full graph analysis, vector search, and energy-distribution stats from Python.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">🐍 PyPI</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/pyarrowspace" target="_blank" rel="noopener">Repository</a></p>
    </div>
  </div>

  <!-- ~2026-04 arrowspace (Rust crate) v0.26.2 -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Rust Crate</span>
      <div class="timeline-item__date">April 2026 (≈ 2 months ago)</div>
      <h2 class="timeline-item__title"><a href="https://crates.io/crates/arrowspace" target="_blank" rel="noopener"><code>arrowspace</code> v0.26.2</a></h2>
      <p class="timeline-item__meta">Graph Wiring for embeddings using physical networks wiring. Graph analysis, vector search, and energy-distribution stats.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">📥 6,604 total</span>
        <span class="tl-dl-chip recent">⚡ 736 recent</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/surfface-rs" target="_blank" rel="noopener">Repository</a> · <a href="https://docs.rs/surfface-rs" target="_blank" rel="noopener">Docs</a></p>
    </div>
  </div>

  <!-- ~2026-05 genegraph-storage v0.12.0 -->
  <div class="timeline-item" data-type="code">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge code">Rust Crate</span>
      <div class="timeline-item__date">May 2026 (≈ 25 days ago)</div>
      <h2 class="timeline-item__title"><a href="https://crates.io/crates/genegraph-storage" target="_blank" rel="noopener"><code>genegraph-storage</code> v0.12.0</a></h2>
      <p class="timeline-item__meta">Vector database: base Lance storage layer. Core persistence engine for the ArrowSpace graph wiring stack.</p>
      <div class="tl-dl-stats">
        <span class="tl-dl-chip total">📥 974 total</span>
        <span class="tl-dl-chip recent">⚡ 286 recent</span>
      </div>
      <p class="timeline-item__links"><a href="https://github.com/tuned-org-uk/genegraph-storage" target="_blank" rel="noopener">Repository</a> · <a href="https://docs.rs/genegraph-storage" target="_blank" rel="noopener">Docs</a></p>
    </div>
  </div>

  <!-- 2026-05-11 NeurIPS submission milestone -->
  <div class="timeline-item" data-type="milestone">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge milestone">Milestone</span>
      <div class="timeline-item__date">May 11, 2026</div>
      <h2 class="timeline-item__title">🏆 Submitted to NeurIPS 2026</h2>
    </div>
  </div>

  <!-- 2026-06-02 Post 019 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">June 2, 2026</div>
      <h2 class="timeline-item__title"><code>arrowspace</code> for Latent Spaces — part 1
        <span class="tl-value-chip">100% cluster purity at α=0.35</span>
      </h2>
      <p class="timeline-item__links"><a href="/posts/019_arrowspace_local_minima_walkthrough">Read post →</a></p>
    </div>
  </div>

  <!-- 2026-06-11 Post 020 -->
  <div class="timeline-item" data-type="blog">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge blog">Blog</span>
      <div class="timeline-item__date">June 11, 2026</div>
      <h2 class="timeline-item__title"><code>arrowspace</code> for Latent Spaces — part 2
        <span class="tl-value-chip">36 weight-role subspaces probed</span>
      </h2>
      <p class="timeline-item__links"><a href="/posts/020_arrowspace_semantic_basins_part2">Read post →</a></p>
    </div>
  </div>

  <!-- Future -->
  <div class="timeline-item" data-type="milestone">
    <div class="timeline-item__marker">
      <div class="timeline-dot"></div>
    </div>
    <div class="timeline-item__content">
      <span class="tl-badge milestone">Milestone</span>
      <div class="timeline-item__date">..., 2026</div>
      <h2 class="timeline-item__title">⏳ Next? Become a sponsor to be part of this endeavour</h2>
    </div>
  </div>

</div><!-- /.timeline -->

</section><!-- /#panel-1 -->

<!-- ══════════════════════════════════════════════
     PANEL 2 — BLOG FIGURES GALLERY
     ══════════════════════════════════════════════ -->
<section id="panel-2" class="dash-panel" role="tabpanel" aria-labelledby="panel-2-tab">
  <div class="fig-panel-wrap">

    <div class="fig-panel-header">
      <h2>📊 Blog Figures Gallery</h2>
      <p>All benchmark charts from published posts. Click any figure to expand.</p>
    </div>

    <!-- Post filter -->
    <div class="fig-filter-bar" role="group" aria-label="Filter figures by post">
      <button class="fig-filter-btn active" data-fig-filter="all">All posts</button>
      <button class="fig-filter-btn" data-fig-filter="016">Post 016 — Performance</button>
      <button class="fig-filter-btn" data-fig-filter="019">Post 019 — Latent Spaces pt.1</button>
    </div>

    <!-- ── Post 016 / CVE ──────────────────────────────────── -->
    <p class="fig-section-label" data-fig-group="016">Post 016 · arrowspace: Capabilities, speed and accuracy · CVE benchmark</p>
    <div class="fig-masonry" data-fig-group="016">

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c1_score_decay">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c1_score_decay.png"
             alt="Score decay across ranks (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Score decay across ranks</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c2_score_lift">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c2_score_lift.png"
             alt="Score lift (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Score lift</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c3_ndcg">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c3_ndcg.png"
             alt="NDCG@k (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">NDCG@k</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c4_rank_corr">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c4_rank_corr.png"
             alt="Rank correlation (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Rank correlation</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c5_th_ratio">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c5_th_ratio.png"
             alt="Threshold ratio (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Threshold ratio</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c6_tail_cv">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c6_tail_cv.png"
             alt="Tail CV (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Tail coefficient of variation</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c7_per_query_curves">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c7_per_query_curves.png"
             alt="Per-query precision curves (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Per-query precision curves</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c8_agreement">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c8_agreement.png"
             alt="Ranker agreement (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Ranker agreement</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c9_head_scatter">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c9_head_scatter.png"
             alt="Head-query scatter (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Head-query scatter</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c10_tail_radar">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c10_tail_radar.png"
             alt="Tail-query radar (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Tail-query radar</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c11_overlap">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c11_overlap.png"
             alt="Result overlap (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Result overlap</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c12_violin">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c12_violin.png"
             alt="Score distribution violin (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Score distribution violin</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c13_decay_rate">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c13_decay_rate.png"
             alt="Decay rate (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Decay rate</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c14_boost_map">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c14_boost_map.png"
             alt="Boost heatmap (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Boost heatmap</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c15_rerank_hist">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c15_rerank_hist.png"
             alt="Re-rank histogram (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Re-rank histogram</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c16_benefit">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c16_benefit.png"
             alt="Benefit analysis (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Benefit analysis</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c17_stability">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c17_stability.png"
             alt="Ranking stability (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Ranking stability</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c18_range">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c18_range.png"
             alt="Score range (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Score range</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c19_wins">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c19_wins.png"
             alt="Win-rate analysis (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Win-rate analysis</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c20_landscape">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c20_landscape.png"
             alt="Performance landscape (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Performance landscape</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c21_parcoords">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c21_parcoords.png"
             alt="Parallel coordinates (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Parallel coordinates</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c22_cumul_adv">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c22_cumul_adv.png"
             alt="Cumulative advantage (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Cumulative advantage</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="016" tabindex="0" role="button" aria-label="Open figure cve_c23_summary_table">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/016/cve/cve_c23_summary_table.png"
             alt="Summary table (CVE)" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">016</span>
          <div class="fig-card-name">Summary table</div>
        </div>
      </div>

    </div><!-- /.fig-masonry 016 -->

    <!-- ── Post 019 ──────────────────────────────────────── -->
    <p class="fig-section-label" style="margin-top:2rem" data-fig-group="019">Post 019 · arrowspace for Latent Spaces — part 1</p>
    <div class="fig-masonry" data-fig-group="019">

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c1_arrowspace_energy">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c1_arrowspace_energy.png"
             alt="ArrowSpace energy distribution" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">ArrowSpace energy distribution</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c2_kde_vanilla">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c2_kde_vanilla.png"
             alt="KDE — vanilla embeddings" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">KDE — vanilla embeddings</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c3_kde_aug">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c3_kde_aug.png"
             alt="KDE — augmented embeddings" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">KDE — augmented embeddings</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c4_diff_vanilla">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c4_diff_vanilla.png"
             alt="Diffusion map — vanilla" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">Diffusion map — vanilla</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c5_diff_aug">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c5_diff_aug.png"
             alt="Diffusion map — augmented" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">Diffusion map — augmented</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c6_bh_overlay">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c6_bh_overlay.png"
             alt="Barnes-Hut overlay" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">Barnes-Hut overlay</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c7_quality_bar">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c7_quality_bar.png"
             alt="Cluster quality bar chart" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">Cluster quality bar chart</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c8_alpha_purity">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c8_alpha_purity.png"
             alt="α vs cluster purity" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">α vs cluster purity</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c9_alpha_lambda">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c9_alpha_lambda.png"
             alt="α vs λ energy" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">α vs λ energy</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c10_jaccard7">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c10_jaccard7.png"
             alt="Jaccard@7 overlap" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">Jaccard@7 overlap</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c11_r_vs_kde">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c11_r_vs_kde.png"
             alt="Radius vs KDE bandwidth" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">Radius vs KDE bandwidth</div>
        </div>
      </div>

      <div class="fig-card" data-fig-post="019" tabindex="0" role="button" aria-label="Open figure c12_r_vs_diff">
        <img src="https://raw.githubusercontent.com/Mec-iS/staticwebpage/feat/multipanel-dashboard/assets/blog/019/c12_r_vs_diff.png"
             alt="Radius vs diffusion scale" loading="lazy" width="600" height="450">
        <div class="fig-card-caption">
          <span class="fig-card-post">019</span>
          <div class="fig-card-name">Radius vs diffusion scale</div>
        </div>
      </div>

    </div><!-- /.fig-masonry 019 -->

  </div><!-- /.fig-panel-wrap -->
</section><!-- /#panel-2 -->

<!-- ── Lightbox (shared, outside panels) ──────── -->
<div class="fig-lightbox" id="fig-lightbox" role="dialog" aria-modal="true" aria-label="Figure lightbox">
  <button class="fig-lightbox-close" aria-label="Close lightbox">✕</button>
  <img src="" alt="" id="fig-lightbox-img">
  <div class="fig-lightbox-caption" id="fig-lightbox-caption"></div>
</div>

<!-- ══════════════════════════════════════════════
     PANEL 3 — NEURIPS 2026 CVE RESULTS
     ══════════════════════════════════════════════ -->
<section id="panel-3" class="dash-panel" role="tabpanel" aria-labelledby="panel-3-tab">
  <div class="n3-wrap">

    <!-- Header -->
    <div class="n3-header">
      <div>
        <h2 class="n3-title">
          ⭐ NeurIPS 2026 CVE Results
          <span class="n3-star-badge">⭐ Special Panel</span>
        </h2>
        <p class="n3-subtitle">Figures and interactive charts from the NeurIPS 2026 submission · CVE benchmark · v2 output</p>
      </div>
      <button class="n3-runinfo-btn" id="n3-runinfo-btn" aria-expanded="false" aria-controls="n3-runinfo-overlay">
        ℹ️ Run info
      </button>
    </div>

    <!-- Run-info modal -->
    <div class="n3-runinfo-overlay" id="n3-runinfo-overlay" role="dialog" aria-modal="true" aria-label="Run metadata">
      <div class="n3-runinfo-card">
        <button class="n3-runinfo-close" id="n3-runinfo-close" aria-label="Close run info">✕</button>
        <h3>Run Metadata</h3>
        <table class="n3-runinfo-table" id="n3-runinfo-table">
          <tbody>
            <tr><td>Status</td><td>Loading…</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ── Static PNG figures ──────────────────────────────── -->
    <p class="n3-section-label">Static output figures</p>
    <div class="n3-png-grid" id="n3-png-grid">
      <!-- skeletons shown until images load -->
      <div class="n3-skeleton n3-skeleton-png"></div>
      <div class="n3-skeleton n3-skeleton-png"></div>
      <div class="n3-skeleton n3-skeleton-png"></div>
      <div class="n3-skeleton n3-skeleton-png"></div>
    </div>

    <!-- ── Interactive Chart.js charts ────────────────────── -->
    <p class="n3-section-label" style="margin-top:1.5rem">Interactive charts (from CSV data)</p>
    <div class="n3-charts-grid" id="n3-charts-grid">
      <div class="n3-skeleton n3-skeleton-chart"></div>
      <div class="n3-skeleton n3-skeleton-chart"></div>
      <div class="n3-skeleton n3-skeleton-chart"></div>
      <div class="n3-skeleton n3-skeleton-chart"></div>
    </div>

  </div>
</section>

<!-- Run-info lightbox (reuses fig-lightbox pattern for PNG zoom in panel 3) -->
<div class="fig-lightbox" id="n3-lightbox" role="dialog" aria-modal="true" aria-label="Figure lightbox">
  <button class="fig-lightbox-close" aria-label="Close lightbox">✕</button>
  <img src="" alt="" id="n3-lightbox-img">
  <div class="fig-lightbox-caption" id="n3-lightbox-caption"></div>
</div>

<!-- ══════════════════════════════════════════════
     PANEL 4 — SPONSOR (placeholder)
     ══════════════════════════════════════════════ -->
<section id="panel-4" class="dash-panel" role="tabpanel" aria-labelledby="panel-4-tab">
  <div style="max-width:var(--panel-max);margin:0 auto;padding:0 1rem">
    <h2 style="font-size:clamp(1.2rem,1rem+1vw,1.6rem);font-weight:700;margin-bottom:0.5rem">❤️ Sponsor</h2>
    <p style="color:var(--color-text-muted,#7a7974);font-size:0.9rem">Sponsor CTA and Value Delivered section — coming in next commit.</p>
  </div>
</section>

<script>
document.addEventListener("DOMContentLoaded", function () {

  // ── Panel nav ──────────────────────────────────────────────
  const navBtns = document.querySelectorAll('.dash-nav-btn');
  const panels  = document.querySelectorAll('.dash-panel');
  let   activeId = '1';

  function activatePanel(id, pushHistory) {
    activeId = String(id);
    navBtns.forEach(b => {
      const active = b.dataset.panel === activeId;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', String(active));
    });
    panels.forEach(p => p.classList.toggle('active', p.id === 'panel-' + activeId));
    document.querySelectorAll('#panel-' + activeId + ' .timeline-item:not(.is-visible)').forEach(el => {
      if (!prefersReducedMotion) observer.observe(el);
      else el.classList.add('is-visible');
    });
    if (pushHistory) history.replaceState(null, '', '#panel-' + activeId);
  }

  navBtns.forEach(btn => btn.addEventListener('click', () => activatePanel(btn.dataset.panel, true)));

  const rawHash = location.hash;
  const panelHash = rawHash.match(/^#panel-(\d+)$/);
  if (panelHash) {
    activatePanel(panelHash[1], false);
  } else if (rawHash === '#section-4b') {
    activatePanel('4', false);
    requestAnimationFrame(() => {
      const t = document.getElementById('section-4b');
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  const panelIO = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id.replace('panel-', '');
          if (id !== activeId) {
            activeId = id;
            navBtns.forEach(b => {
              const active = b.dataset.panel === activeId;
              b.classList.toggle('active', active);
              b.setAttribute('aria-selected', String(active));
            });
          }
        }
      });
    },
    { threshold: 0.35 }
  );
  panels.forEach(p => panelIO.observe(p));

  // ── prefers-reduced-motion ────────────────────────────────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Scroll-reveal ─────────────────────────────────────────
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: '0px', threshold: 0.12 }
  );

  if (prefersReducedMotion) {
    document.querySelectorAll('.timeline-item').forEach(el => el.classList.add('is-visible'));
  } else {
    document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));
  }

  // ── Timeline filter ───────────────────────────────────────
  const filterBtns    = document.querySelectorAll('.tl-filter-btn');
  const timelineItems = document.querySelectorAll('.timeline-item[data-type]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.toggle('active', b === btn));
      timelineItems.forEach(item => {
        const match = filter === 'all' || item.dataset.type === filter;
        item.classList.toggle('tl-hidden', !match);
        if (match && !item.classList.contains('is-visible')) {
          if (prefersReducedMotion) item.classList.add('is-visible');
          else observer.observe(item);
        }
      });
    });
  });

  // ── Expand / collapse drawer ──────────────────────────────
  document.querySelectorAll('.tl-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const drawer = btn.nextElementSibling;
      const isOpen = drawer.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
      btn.textContent = isOpen ? 'Hide details ↑' : 'Show details ↓';
    });
  });

  // ── Figure gallery filter ─────────────────────────────────
  const figFilterBtns = document.querySelectorAll('.fig-filter-btn');

  figFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.figFilter;
      figFilterBtns.forEach(b => b.classList.toggle('active', b === btn));

      // Show/hide section labels
      document.querySelectorAll('[data-fig-group]').forEach(el => {
        el.style.display = (f === 'all' || el.dataset.figGroup === f) ? '' : 'none';
      });

      // Show/hide individual cards
      document.querySelectorAll('.fig-card').forEach(card => {
        card.style.display = (f === 'all' || card.dataset.figPost === f) ? '' : 'none';
      });
    });
  });

  // ── Lightbox ──────────────────────────────────────────────
  const lightbox     = document.getElementById('fig-lightbox');
  const lbImg        = document.getElementById('fig-lightbox-img');
  const lbCaption    = document.getElementById('fig-lightbox-caption');
  const lbClose      = lightbox.querySelector('.fig-lightbox-close');

  function openLightbox(card) {
    const img     = card.querySelector('img');
    const caption = card.querySelector('.fig-card-name');
    const post    = card.querySelector('.fig-card-post');
    lbImg.src     = img.src;
    lbImg.alt     = img.alt;
    lbCaption.textContent = (post ? 'Post ' + post.textContent + ' · ' : '') + (caption ? caption.textContent : '');
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.fig-card').forEach(card => {
    card.addEventListener('click', () => openLightbox(card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(card); }
    });
  });

  lbClose.addEventListener('click', closeLightbox);

  // Click outside image closes lightbox
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });

  // Stop click-through on the image itself
  lbImg.addEventListener('click', e => e.stopPropagation());

});
</script>
