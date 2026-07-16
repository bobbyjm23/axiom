# Website Concept Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `website/index.html` so the homepage narrative mirrors the Concept deck (Market → Product → Economics → Close), then Insights + Contact — with Concept as the only content source of truth.

**Architecture:** Keep the existing Mach42 website design system. Replace Business Plan sections (approach / packages / journeys) with one scroll section per Concept slide. Port sovereignty SVGs, product-orbit markup, and TCO table from Concept; compress capability + feature-compare. Verification is structural (grep / section-id checks) plus local browser preview — this is a static HTML site with no unit-test harness.

**Tech Stack:** Static HTML, CSS, vanilla JS (`website/js/main.js`), assets copied from `docs/business/concept/assets/`

**Spec:** `docs/superpowers/specs/2026-07-17-website-concept-alignment-design.md`

## Global Constraints

- Source of truth: `docs/business/concept/index.html` — not the Business Plan
- Do not reintroduce `#approach`, `#packages`, `#journeys`, AUD package prices, or Track A/B ICP cards
- Strip investor-only language (“Confidential…”, “Next: Pitch Deck…”, “Before the numbers”)
- Hero H1 must be: `Private AI for organisations that can't use Claude.`
- Keep Insights + Contact after Close
- Density: keep sovereignty / orbit / TCO visuals; compress capability chart and full feature matrix
- Compare section: exactly five differentiators — (1) self-hosted / on-prem, (2) desktop chat assistant, (3) RAG with source citations Day 1, (4) prompt & request audit logs, (5) client branding
- Homepage remains a scroll marketing page (no slide counter / arrow deck chrome)
- Bump `?v=` on `css/main.css` and `js/main.js` whenever those files change

## File map

| File | Responsibility |
|------|----------------|
| `website/assets/logos/*` | Integration + OS logos for orbit (copied from Concept) |
| `website/assets/icons/*` | Market / close icon PNGs (copied from Concept) |
| `website/css/main.css` | Timeline, icon cards, sovereignty, orbit, TCO, compare list, motion |
| `website/index.html` | Nav + full section rewrite |
| `website/js/main.js` | Scroll spy works on new IDs (usually no logic change; verify dark-section detection covers `#owning` / `#now`) |
| `website/README.md` | Document new section IDs if structure list is present |

---

### Task 1: Copy Concept assets into website

**Files:**
- Create: `website/assets/logos/` (directory + files)
- Create: `website/assets/icons/` (directory + files)

**Interfaces:**
- Consumes: `docs/business/concept/assets/logos/*`, `docs/business/concept/assets/icons/*`
- Produces: website-local asset paths used by later HTML (`assets/logos/…`, `assets/icons/…`)

- [ ] **Step 1: Create directories and copy logos + icons**

```bash
mkdir -p website/assets/logos website/assets/icons
cp docs/business/concept/assets/logos/android.svg \
   docs/business/concept/assets/logos/apple.svg \
   docs/business/concept/assets/logos/windows.svg \
   docs/business/concept/assets/logos/microsoft365.svg \
   docs/business/concept/assets/logos/atlassian.svg \
   docs/business/concept/assets/logos/google-workspace.svg \
   docs/business/concept/assets/logos/xero.svg \
   docs/business/concept/assets/logos/myob.svg \
   docs/business/concept/assets/logos/leap.svg \
   docs/business/concept/assets/logos/clio.svg \
   docs/business/concept/assets/logos/xplan.svg \
   docs/business/concept/assets/logos/midwinter.svg \
   docs/business/concept/assets/logos/sharepoint.svg \
   website/assets/logos/
cp docs/business/concept/assets/icons/shadow-ai.png \
   docs/business/concept/assets/icons/saas-default.png \
   docs/business/concept/assets/icons/build-paralysis.png \
   docs/business/concept/assets/icons/regulation.png \
   docs/business/concept/assets/icons/economics.png \
   docs/business/concept/assets/icons/proof.png \
   website/assets/icons/
```

- [ ] **Step 2: Verify counts**

```bash
ls website/assets/logos | wc -l
ls website/assets/icons | wc -l
```

Expected: `13` logos, `6` icons.

- [ ] **Step 3: Commit**

```bash
git add website/assets/logos website/assets/icons
git commit -m "$(cat <<'EOF'
Add Concept logos and icons for the marketing homepage.

EOF
)"
```

---

### Task 2: Port Concept section CSS into `main.css`

**Files:**
- Modify: `website/css/main.css` (append new component blocks; bump is done in HTML later)

**Interfaces:**
- Consumes: Concept CSS patterns for timeline, icon-card, footnote-stat, economics-callout, ul.clean, sovereignty-*, product-orbit-*, tco-compare, bridge-cta
- Produces: CSS classes available for homepage markup in Tasks 3–6

- [ ] **Step 1: Append CSS** at the end of `website/css/main.css` (adapt Concept styles; replace `.slide.active` motion triggers with `.is-inview` for scroll):

```css
/* ── Concept-aligned homepage sections (2026-07-17) ── */

.section-title .accent,
.block-hero__title .accent { color: var(--teal); }

.timeline {
  display: flex;
  gap: 0;
  margin-top: 1.5rem;
  max-width: 56rem;
  flex-wrap: wrap;
}

.timeline-item {
  flex: 1;
  min-width: 10rem;
  padding: 1rem 1rem 0 0;
  border-top: 2px solid var(--border);
}

.timeline-item.is-active { border-color: var(--teal); }

.timeline-item .phase {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--teal);
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.timeline-item h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.timeline-item p {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.45;
}

.icon-card { text-align: center; padding: 1.25rem 1rem; }
.icon-card img.icon {
  width: 4.675rem;
  height: auto;
  display: block;
  margin: 0 auto 0.75rem;
}
.section--dark .icon-card img.icon { filter: brightness(0) invert(1); }
.icon-card h3 { font-size: 1rem; margin-bottom: 0.35rem; }
.icon-card p {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0 auto;
  max-width: 14rem;
  line-height: 1.45;
}
.section--dark .icon-card p { color: rgba(255, 255, 255, 0.65); }

.footnote-stat {
  margin-top: 2rem;
  font-size: 0.875rem;
  color: var(--text-muted);
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.footnote-stat .stat {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--navy);
}
.footnote-stat .stat-label { max-width: 36rem; }

.economics-callout {
  margin-top: 1.5rem;
  padding: 1.15rem 1.25rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--white);
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--text-muted);
  max-width: 40rem;
}
.economics-callout strong {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--navy);
}

.contrast-list {
  list-style: none;
  margin-top: 1.5rem;
  display: grid;
  gap: 0.75rem;
  max-width: 36rem;
}
.contrast-list li {
  position: relative;
  padding-left: 1.1rem;
  color: var(--text-muted);
  line-height: 1.45;
}
.contrast-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--teal);
}

ul.clean {
  list-style: none;
  margin-top: 1rem;
  max-width: 40rem;
}
ul.clean li {
  position: relative;
  padding-left: 1.1rem;
  margin-bottom: 0.6rem;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.45;
}
ul.clean li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--teal);
}

.section-quote {
  margin: 1.5rem 0 0;
  font-size: clamp(1.15rem, 2.2vw, 1.5rem);
  font-weight: 400;
  line-height: 1.35;
  color: var(--white);
  max-width: 36ch;
}

.diff-list {
  list-style: none;
  margin-top: 1.5rem;
  max-width: 40rem;
  display: grid;
  gap: 0.85rem;
}
.diff-list li {
  display: grid;
  grid-template-columns: 1.5rem 1fr;
  gap: 0.75rem;
  align-items: start;
  color: var(--text-muted);
  line-height: 1.45;
}
.diff-list .check-yes {
  color: var(--teal);
  font-weight: 700;
}
.diff-list strong { color: var(--navy); }

/* Sovereignty compare — ported from Concept */
.sovereignty-compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem;
  margin-top: 1.5rem;
  align-items: start;
}
@media (max-width: 900px) {
  .sovereignty-compare { grid-template-columns: 1fr; }
}
.sovereignty-panel { display: flex; flex-direction: column; gap: 0.85rem; }
.sovereignty-panel__art {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1rem 1.1rem 0.85rem;
  overflow: hidden;
}
.sovereignty-panel__art svg { display: block; width: 100%; height: auto; }
.sovereignty-panel__title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--navy);
  margin: 0;
}
.sovereignty-panel__title--warn { color: #a04030; }
.sovereignty-panel__title--teal { color: var(--navy); }
.sovereignty-panel__title--teal .accent { color: var(--teal); }
.sovereignty-panel__caption {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.45;
}
.sovereignty-svg .office-fill { fill: var(--mint); }
.sovereignty-svg .office-stroke { fill: none; stroke: rgba(29, 43, 56, 0.22); stroke-width: 2; }
.sovereignty-svg .office-stroke--teal { stroke: var(--teal); stroke-width: 2.5; }
.sovereignty-svg .device-body { fill: var(--navy); }
.sovereignty-svg .device-screen { fill: #fff; }
.sovereignty-svg .rack-body { fill: var(--navy); }
.sovereignty-svg .rack-slot { fill: rgba(255, 255, 255, 0.18); }
.sovereignty-svg .rack-led { fill: var(--teal); }
.sovereignty-svg .cloud-shape {
  fill: rgba(29, 43, 56, 0.1);
  stroke: rgba(29, 43, 56, 0.35);
  stroke-width: 1.5;
}
.sovereignty-svg .label {
  font-family: var(--font);
  font-size: 11px;
  font-weight: 700;
  fill: var(--navy);
}
.sovereignty-svg .label--muted { fill: var(--text-muted); font-weight: 400; }
.sovereignty-svg .label--warn { fill: #a04030; }
.sovereignty-svg .label--stack { font-size: 10px; }
.sovereignty-svg .map-outline {
  fill: rgba(29, 43, 56, 0.2);
  stroke: rgba(29, 43, 56, 0.35);
  stroke-width: 2;
}
.sovereignty-svg .map-outline--warn {
  fill: rgba(160, 64, 48, 0.15);
  stroke: #a04030;
}
.sovereignty-svg .map-outline--teal {
  fill: rgba(18, 234, 203, 0.2);
  stroke: var(--teal);
}
.sovereignty-svg .exit-path {
  fill: none;
  stroke: #a04030;
  stroke-width: 1.5;
  stroke-dasharray: 4 3;
}
.sovereignty-svg .link-path {
  fill: none;
  stroke: var(--teal);
  stroke-width: 1.75;
}
.sovereignty-svg .badge { fill: var(--teal); }
.sovereignty-svg .badge-text {
  fill: var(--navy);
  font-size: 9px;
  font-weight: 700;
  font-family: var(--font);
}

@keyframes sovereignty-exit-pulse {
  0%, 100% { stroke-opacity: 0.45; }
  50% { stroke-opacity: 1; }
}
@keyframes sovereignty-link-pulse {
  0%, 100% { stroke-opacity: 0.55; }
  50% { stroke-opacity: 1; }
}
.sovereignty-compare.is-inview .sovereignty-svg .exit-path {
  animation: sovereignty-exit-pulse 2.4s ease-in-out infinite;
}
.sovereignty-compare.is-inview .sovereignty-svg .link-path {
  animation: sovereignty-link-pulse 2.4s ease-in-out infinite;
}
.sovereignty-compare.is-inview .sovereignty-svg .link-path:nth-of-type(2) { animation-delay: 0.2s; }
.sovereignty-compare.is-inview .sovereignty-svg .link-path:nth-of-type(3) { animation-delay: 0.4s; }
.sovereignty-compare.is-inview .sovereignty-svg .link-path:nth-of-type(4) { animation-delay: 0.6s; }

/* Product orbit — ported from Concept */
.product-orbit {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}
.product-orbit__stage {
  position: relative;
  width: min(100%, 42rem);
  aspect-ratio: 1;
  container-type: size;
}
.product-orbit__hub {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  width: 42%;
}
.product-orbit__logo {
  width: clamp(8rem, 28cqmin, 12rem);
  height: auto;
  margin: 0 auto 0.5rem;
  display: block;
}
.product-orbit__platforms {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}
.product-orbit__os {
  display: flex;
  justify-content: center;
  gap: 0.65rem;
}
.product-orbit__os img { width: 2.1rem; height: 2.1rem; }
.product-orbit__node {
  position: absolute;
  left: var(--x);
  top: var(--y);
  transform: translate(-50%, -50%);
  width: 3.5rem;
  text-align: center;
  z-index: 2;
}
.product-orbit__node-icon img {
  width: 3rem;
  height: 3rem;
  display: block;
  margin: 0 auto 0.25rem;
}
.product-orbit__node span {
  display: block;
  font-size: 0.62rem;
  font-weight: 700;
  color: var(--navy);
  line-height: 1.2;
  max-width: 4.5rem;
  margin: 0 auto;
}
.product-orbit__spokes {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.product-orbit__spokes line {
  stroke: rgba(29, 43, 56, 0.12);
  stroke-width: 0.35;
}
@keyframes orbit-spoke-pulse {
  0%, 100% { stroke: rgba(29, 43, 56, 0.1); }
  50% { stroke: rgba(18, 234, 203, 0.45); }
}
.product-orbit.is-inview .product-orbit__spokes line {
  animation: orbit-spoke-pulse 3s ease-in-out infinite;
}
.product-orbit.is-inview .product-orbit__spokes line:nth-child(odd) { animation-delay: 0.35s; }

@media (max-width: 740px) {
  .product-orbit__stage { width: min(100%, 22rem); }
  .product-orbit__node { width: 2.8rem; }
  .product-orbit__node-icon img { width: 2.2rem; height: 2.2rem; }
  .product-orbit__node span { font-size: 0.5rem; max-width: 3.2rem; }
}

/* TCO table */
.tco-note {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}
.tco-compare {
  width: 100%;
  max-width: 68rem;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  border-collapse: collapse;
  display: block;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.tco-compare thead,
.tco-compare tbody { display: table; width: 100%; min-width: 52rem; }
.tco-compare th,
.tco-compare td {
  padding: 0.7rem 0.6rem;
  border-bottom: 1px solid var(--border);
  vertical-align: top;
  text-align: left;
  line-height: 1.35;
}
.tco-compare th {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  font-weight: 700;
}
.tco-compare th.tco-compare__num,
.tco-compare td.tco-compare__num {
  text-align: right;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.tco-compare td:first-child {
  font-weight: 700;
  color: var(--navy);
  white-space: nowrap;
}
.tco-compare td.tco-compare__prose {
  font-size: 0.75rem;
  color: var(--text-muted);
  max-width: 16rem;
}
.tco-compare tr.tco-compare__highlight td {
  background: rgba(18, 234, 203, 0.08);
}
.tco-compare tr.tco-compare__highlight td.tco-compare__num {
  font-weight: 700;
  color: var(--navy);
}
.tco-compare tr:last-child td { border-bottom: none; }

.bridge-cta {
  margin-top: 2rem;
  padding: 1.25rem 1.5rem;
  border-radius: 10px;
  border: 1px solid rgba(18, 234, 203, 0.35);
  background: rgba(18, 234, 203, 0.08);
  max-width: 36rem;
}
.bridge-cta p {
  margin: 0;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.45;
}
.bridge-cta a {
  color: var(--teal);
  font-weight: 700;
  text-decoration: none;
}
.bridge-cta a:hover { text-decoration: underline; }

.close-line {
  margin-top: 1.5rem;
  color: var(--teal);
  font-size: 1.1rem;
}

/* Hero entrance motion */
@keyframes hero-fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.block-hero__title {
  animation: hero-fade-up 700ms ease-out both;
}
.block-hero__text {
  animation: hero-fade-up 700ms ease-out 120ms both;
}
.block-hero__actions {
  animation: hero-fade-up 700ms ease-out 220ms both;
}

@media (prefers-reduced-motion: reduce) {
  .block-hero__title,
  .block-hero__text,
  .block-hero__actions,
  .sovereignty-compare.is-inview .sovereignty-svg .exit-path,
  .sovereignty-compare.is-inview .sovereignty-svg .link-path,
  .product-orbit.is-inview .product-orbit__spokes line {
    animation: none !important;
  }
}
```

- [ ] **Step 2: Add IntersectionObserver helpers** at the end of `website/js/main.js` (inside the existing IIFE, after DOMContentLoaded / init):

```javascript
  function observeInview(selector) {
    var nodes = document.querySelectorAll(selector);
    if (!nodes.length || !("IntersectionObserver" in window)) {
      nodes.forEach(function (el) { el.classList.add("is-inview"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
          }
        });
      },
      { threshold: 0.35 }
    );
    nodes.forEach(function (el) { io.observe(el); });
  }

  // Call from existing init after header/nav wiring:
  // observeInview(".sovereignty-compare, .product-orbit");
```

Wire `observeInview(".sovereignty-compare, .product-orbit");` into the existing init path (wherever `setHeaderState` / listeners are attached).

- [ ] **Step 3: Verify CSS classes exist**

```bash
rg -n "sovereignty-compare|product-orbit|tco-compare|timeline-item|diff-list|economics-callout" website/css/main.css | head
rg -n "observeInview" website/js/main.js
```

Expected: matches in both files.

- [ ] **Step 4: Commit**

```bash
git add website/css/main.css website/js/main.js
git commit -m "$(cat <<'EOF'
Add Concept-aligned section styles and scroll-inview motion.

EOF
)"
```

---

### Task 3: Update nav, meta, and remove Business Plan sections

**Files:**
- Modify: `website/index.html`

**Interfaces:**
- Consumes: section IDs from spec (`#market-today`, `#sovereignty`, `#platform`, `#tco`, `#insights`, `#contact`)
- Produces: clean shell ready for Concept sections in Tasks 4–6

- [ ] **Step 1: Update `<head>` meta** to Concept framing (no pilot/package language):

```html
<title>Sovereign Warden — Private AI for organisations that can't use Claude</title>
<meta name="description" content="Private AI for regulated Australian organisations. Sovereign deployment, desktop UX, and on-prem inference — without sending client data to US-hosted SaaS.">
<meta property="og:title" content="Sovereign Warden — Private AI for organisations that can't use Claude">
<meta property="og:description" content="AI is everywhere. Approval isn't. Sovereign Warden keeps prompts inside your office.">
<meta name="twitter:title" content="Sovereign Warden — Private AI for organisations that can't use Claude">
<meta name="twitter:description" content="Private AI for organisations that can't use Claude.">
```

Also bump stylesheet/script cache: `css/main.css?v=5` and `js/main.js?v=5`.

- [ ] **Step 2: Replace header + mobile nav links** with:

```html
<li><a href="#market-today">Market</a></li>
<li><a href="#sovereignty">Sovereignty</a></li>
<li><a href="#platform">Platform</a></li>
<li><a href="#tco">TCO</a></li>
<li><a href="#insights">Insights</a></li>
```

Mobile menu: same links plus `<li><a href="#contact">Contact</a></li>`. Keep `Book a discovery call` pill → `#contact`.

- [ ] **Step 3: Delete** entire sections with `id="problem"`, `id="platform"` (old bleed), `id="approach"`, `id="packages"`, `id="journeys"`, `id="integrations"`, `id="why"`. Keep `#insights` and `#contact` blocks for now (rewrite Contact in Task 6). Temporarily leave a single HTML comment placeholder in `<main>` after hero:

```html
<!-- Concept sections: market-today → now (Tasks 4–6) -->
```

Hero can remain briefly outdated until Task 4 — or replace with a minimal stub if preferred. Prefer rewriting hero in Task 4 immediately after this cleanup in the same working session before committing if the page would otherwise break visually mid-PR; if committing after this task alone, rewrite hero in the same commit as Task 4.

**Preferred commit boundary:** finish Task 3 nav/meta/deletes, then immediately do Task 4 before committing if the page would lack middle content. If committing Task 3 alone, leave Insights + Contact intact so the page still ends cleanly.

- [ ] **Step 4: Update footer Navigate links**

```html
<li><a href="#market-today">Market</a></li>
<li><a href="#sovereignty">Sovereignty</a></li>
<li><a href="#platform">Platform</a></li>
<li><a href="#tco">TCO</a></li>
<li><a href="#insights">Insights</a></li>
<li><a href="#contact">Contact</a></li>
```

- [ ] **Step 5: Verify removals**

```bash
rg -n 'id="(approach|packages|journeys|problem|integrations|why)"' website/index.html || true
rg -n 'From \$18,000|Track A|Paid Pilot|hosted wedge' website/index.html || true
rg -n 'href="#(market-today|sovereignty|platform|tco|insights|contact)"' website/index.html
```

Expected: no approach/packages/journeys/problem/integrations/why IDs; no package price strings; new nav hrefs present.

- [ ] **Step 6: Commit** (only if Task 4 will land in a follow-up commit the same session; otherwise combine with Task 4)

```bash
git add website/index.html
git commit -m "$(cat <<'EOF'
Retarget site nav and remove Business Plan homepage sections.

EOF
)"
```

---

### Task 4: Hero + Market today + Capability + Owning

**Files:**
- Modify: `website/index.html` (`#top`, add `#market-today`, `#capability`, `#owning`)

**Interfaces:**
- Consumes: CSS from Task 2; icons from Task 1
- Produces: Act 1 Market sections live on the page

- [ ] **Step 1: Replace hero** (`#top`) with Concept slide 1 public framing:

```html
<section class="block-hero" id="top">
  <div class="block-hero__media">
    <div class="block-hero__media-bg"></div>
    <div class="block-hero__grid"></div>
  </div>
  <div class="block-hero__content">
    <div class="container">
      <h1 class="block-hero__title">Private AI for organisations that can't use <span class="accent">Claude.</span></h1>
      <p class="block-hero__text">Why private AI for regulated Australian firms is inevitable — and how Sovereign Warden keeps intelligence inside your walls.</p>
      <div class="block-hero__actions">
        <a href="#contact" class="btn--pill">Book a discovery call</a>
        <a href="#sovereignty" class="btn--pill-outline"><span>See how sovereignty works</span></a>
      </div>
    </div>
  </div>
</section>
```

Remove `block-hero__bottom` / stats band entirely.

- [ ] **Step 2: Insert `#market-today`** (Concept slide 2):

```html
<section class="section-pad section--mint" id="market-today">
  <div class="container">
    <p class="eyebrow">Market · Today</p>
    <h2 class="section-title">AI is everywhere.<br>Approval <span class="accent">isn't.</span></h2>
    <p class="section-lead">Every firm's staff already use Claude and ChatGPT — compliance and procurement are still catching up.</p>
    <div class="timeline">
      <div class="timeline-item">
        <p class="phase">2023–24</p>
        <h3>Consumer boom</h3>
        <p>ChatGPT goes mainstream — staff adopt before IT does</p>
      </div>
      <div class="timeline-item">
        <p class="phase">2025</p>
        <h3>Board mandate</h3>
        <p>Every leadership team told to "do something with AI"</p>
      </div>
      <div class="timeline-item is-active">
        <p class="phase">2026</p>
        <h3>Compliance reckoning</h3>
        <p>Privacy Act scrutiny — shadow AI becomes a liability</p>
      </div>
    </div>
    <div class="cards-grid cards-grid--3" style="margin-top: 2rem;">
      <article class="card icon-card">
        <img class="icon" src="assets/icons/shadow-ai.png" alt="">
        <h3>Shadow AI</h3>
        <p>Client data in public tools, daily</p>
      </article>
      <article class="card icon-card">
        <img class="icon" src="assets/icons/saas-default.png" alt="">
        <h3>SaaS default</h3>
        <p>Copilot, Claude — offshore inference</p>
      </article>
      <article class="card icon-card">
        <img class="icon" src="assets/icons/build-paralysis.png" alt="">
        <h3>Build paralysis</h3>
        <p>Custom projects stall 6–12 months</p>
      </article>
    </div>
    <div class="footnote-stat">
      <span class="stat">46%</span>
      <span class="stat-label">of Australian businesses report AI innovation activity (ABS 2024–25)</span>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Insert `#capability`** (compressed Concept slide 3 — no chart/table):

```html
<section class="section-pad" id="capability">
  <div class="container">
    <p class="eyebrow">Market · Capability</p>
    <h2 class="section-title">The gap is shrinking <span class="accent">faster</span> than many expected.</h2>
    <p class="section-lead">Open source is close enough that many organisations accept a small quality trade-off for privacy, predictable costs, and control.</p>
    <div class="economics-callout">
      <strong>The economics are changing</strong>
      Five years ago, frontier models were clearly superior. Today, organisations trade a small quality gap for complete privacy, predictable costs, deployment control, and customisation.
    </div>
    <ul class="contrast-list">
      <li><strong>Privacy</strong> — complete control instead of cloud inference</li>
      <li><strong>Cost</strong> — hardware + electricity instead of ongoing API fees</li>
      <li><strong>Control</strong> — deploy and customise on your terms</li>
    </ul>
  </div>
</section>
```

- [ ] **Step 4: Insert `#owning`** (Concept slide 4, dark):

```html
<section class="section-pad section--dark" id="owning">
  <div class="container">
    <p class="eyebrow">Market · Tomorrow</p>
    <h2 class="section-title">The shift from renting intelligence to <span class="accent">owning</span> it.</h2>
    <p class="section-lead">Open-source models closed the capability gap — the next battle is where inference runs and who controls the stack.</p>
    <blockquote class="section-quote">"The gap isn't intelligence anymore — it's sovereign deployment for firms that can't paste client data into Claude."</blockquote>
    <ul class="clean">
      <li>Models are commoditising (Llama, Mistral, Qwen)</li>
      <li>Privacy Act pressure is structural, not cyclical</li>
      <li>Mid-market will adopt productised paths — not 12-month SI projects</li>
    </ul>
  </div>
</section>
```

- [ ] **Step 5: Verify**

```bash
rg -n 'id="(top|market-today|capability|owning)"' website/index.html
rg -n 'block-hero__stats|3–6 wks' website/index.html || true
```

Expected: four IDs present; no stats band.

- [ ] **Step 6: Commit**

```bash
git add website/index.html
git commit -m "$(cat <<'EOF'
Rewrite homepage hero and Market act from the Concept deck.

EOF
)"
```

---

### Task 5: Sovereignty + Platform sections

**Files:**
- Modify: `website/index.html` (insert `#sovereignty`, `#platform` after `#owning`)

**Interfaces:**
- Consumes: SVG markup from Concept slide 5; orbit markup from Concept slide 6; logos from Task 1; CSS from Task 2
- Produces: Product act visuals live

- [ ] **Step 1: Insert `#sovereignty`**

Copy the sovereignty compare HTML from `docs/business/concept/index.html` slide 5 (`data-slide="5"`) — the `.sovereignty-compare` block with both inline SVGs — into:

```html
<section class="section-pad section--mint" id="sovereignty">
  <div class="container">
    <p class="eyebrow">Product · Sovereignty</p>
    <h2 class="section-title">Your prompts never leave the <span class="accent">office.</span></h2>
    <p class="section-lead">Cloud assistants ship client data offshore. On-prem keeps inference inside your walls.</p>
    <!-- paste .sovereignty-compare from Concept here unchanged -->
  </div>
</section>
```

Do not change SVG paths/geometry. Keep captions: “Leaves the building” / “Stays on-prem”.

- [ ] **Step 2: Insert `#platform`**

Copy `.product-orbit` from Concept slide 6 into:

```html
<section class="section-pad" id="platform">
  <div class="container">
    <p class="eyebrow">Product · Today</p>
    <h2 class="section-title">Sovereign AI that works <span class="accent">where you work.</span></h2>
    <!-- paste .product-orbit; rewrite asset paths -->
  </div>
</section>
```

Rewrite every Concept asset path:

- `assets/logo.png` → `assets/images/logo.svg` (existing site logo)
- `assets/logos/*.svg` → `assets/logos/*.svg` (already correct after Task 1)

- [ ] **Step 3: Verify**

```bash
rg -n 'id="(sovereignty|platform)"|sovereignty-compare|product-orbit' website/index.html
rg -n 'assets/logos/(microsoft365|clio|sharepoint)' website/index.html
test -f website/assets/logos/microsoft365.svg && echo OK
```

Expected: sections present; logo paths resolve.

- [ ] **Step 4: Commit**

```bash
git add website/index.html
git commit -m "$(cat <<'EOF'
Add Concept sovereignty compare and platform orbit to the homepage.

EOF
)"
```

---

### Task 6: Compare + TCO + Why now + Contact polish

**Files:**
- Modify: `website/index.html` (insert `#compare`, `#tco`, `#now`; tighten `#contact`)
- Modify: `website/README.md` (section list)

**Interfaces:**
- Consumes: Concept slide 7–9 copy/numbers; five locked differentiators from spec
- Produces: complete Concept arc + bookends

- [ ] **Step 1: Insert `#compare`** (compressed — five differentiators only):

```html
<section class="section-pad section--mint" id="compare">
  <div class="container">
    <p class="eyebrow">Product · Compare</p>
    <h2 class="section-title">Capability <span class="accent">by capability.</span></h2>
    <p class="section-lead">Where Sovereign Warden stands out against cloud SaaS assistants and governance-only platforms.</p>
    <ul class="diff-list">
      <li><span class="check-yes">✓</span><span><strong>Self-hosted / on-prem</strong> — profile switch to keep inference inside your perimeter</span></li>
      <li><span class="check-yes">✓</span><span><strong>Desktop chat assistant</strong> — familiar productivity UX staff will actually use</span></li>
      <li><span class="check-yes">✓</span><span><strong>RAG with source citations</strong> — Day 1, over firm documents</span></li>
      <li><span class="check-yes">✓</span><span><strong>Audit logs</strong> — prompt and request logging for compliance</span></li>
      <li><span class="check-yes">✓</span><span><strong>Client branding</strong> — logo, name, and theme for the approved assistant</span></li>
    </ul>
  </div>
</section>
```

Do **not** paste the full Claude/Cetus feature matrix.

- [ ] **Step 2: Insert `#tco`** using Concept slide 8 table rows/numbers exactly:

```html
<section class="section-pad" id="tco">
  <div class="container">
    <p class="eyebrow">Economics · 3-year TCO</p>
    <h2 class="section-title">Owning the stack beats <span class="accent">renting</span> Claude.</h2>
    <p class="section-lead">Indicative cost for ~100 seats — Claude Team, Claude API, and self-hosted LLM over three years.</p>
    <p class="tco-note">Figures are indicative for planning conversations — not a formal quote.</p>
    <table class="tco-compare">
      <!-- copy thead + tbody from Concept slide 8 unchanged (numbers + pros/cons) -->
    </table>
  </div>
</section>
```

- [ ] **Step 3: Insert `#now`** (Concept slide 9, buyer CTA):

```html
<section class="section-pad section--dark" id="now">
  <div class="container">
    <p class="eyebrow">Close</p>
    <h2 class="section-title">The window is open for productised <span class="accent">sovereign AI.</span></h2>
    <p class="section-lead">Market proof exists. The gap is speed, UX, and accessible pricing for firms too small for enterprise governance-first journeys.</p>
    <div class="cards-grid cards-grid--3" style="margin-top: 2rem;">
      <article class="card icon-card">
        <img class="icon" src="assets/icons/regulation.png" alt="">
        <h3>Regulation</h3>
        <p>Privacy Act scrutiny</p>
      </article>
      <article class="card icon-card">
        <img class="icon" src="assets/icons/economics.png" alt="">
        <h3>Economics</h3>
        <p>Copilot seat shock at scale</p>
      </article>
      <article class="card icon-card">
        <img class="icon" src="assets/icons/proof.png" alt="">
        <h3>Proof</h3>
        <p>Sovereign AI vendors validate demand</p>
      </article>
    </div>
    <div class="bridge-cta">
      <p><strong>Next:</strong> <a href="#contact">Book a discovery call</a> — we'll map use cases, data risk, and the right sovereign footprint.</p>
    </div>
    <p class="close-line">Private AI for organisations that can't use Claude.</p>
  </div>
</section>
```

Place `#now` **before** `#insights`.

- [ ] **Step 4: Tighten `#contact`**

```html
<section class="block-cta" id="contact">
  <div class="container">
    <h2>Bring intelligence in-house</h2>
    <p>Book a no-obligation discovery call. We'll map where shadow AI is leaking risk today — and what a productised sovereign path looks like for your firm.</p>
    <a href="mailto:hello@sovereignwarden.com.au" class="btn--pill">hello@sovereignwarden.com.au</a>
  </div>
</section>
```

- [ ] **Step 5: Update `website/README.md`** Structure / components notes to list Concept-aligned section IDs (market-today → now, insights, contact) and note Business Plan packages are not on the homepage.

- [ ] **Step 6: Full verification**

```bash
# Section order / presence
python3 - <<'PY'
from html.parser import HTMLParser
class P(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]
    def handle_starttag(self, tag, attrs):
        if tag=="section":
            d=dict(attrs)
            if "id" in d: self.ids.append(d["id"])
p=P(); p.feed(open("website/index.html").read())
print(p.ids)
assert p.ids == [
  "top","market-today","capability","owning","sovereignty","platform",
  "compare","tco","now","insights","contact"
], p.ids
print("ORDER OK")
PY

# No Business Plan leftovers
rg -n 'From \$|Track A|Approach|Packages|hosted wedge|Pitch Deck|Confidential' website/index.html || true

# Serve for visual check
cd website && python3 -m http.server 8080
# Open http://localhost:8080 — check desktop + narrow mobile width
```

Expected: assertion passes; no Business Plan / investor leftovers; page scrolls Concept arc → Insights → Contact.

- [ ] **Step 7: Commit**

```bash
git add website/index.html website/README.md
git commit -m "$(cat <<'EOF'
Finish Concept-aligned homepage: compare, TCO, close, and contact.

EOF
)"
```

---

## Spec coverage checklist

| Spec requirement | Task |
|------------------|------|
| Remove approach / packages / journeys | Task 3 |
| Section-per-slide order + Insights + Contact | Tasks 4–6 |
| Hero Concept H1, no stats band | Task 4 |
| Market today timeline + cards + ABS | Task 4 |
| Capability compressed (no chart/table) | Task 4 |
| Owning dark thesis | Task 4 |
| Sovereignty SVG compare | Task 5 |
| Platform orbit | Task 5 |
| Compare five differentiators only | Task 6 |
| TCO table from Concept | Task 6 |
| Why now + buyer CTA | Task 6 |
| Assets local to website | Task 1 |
| CSS + 2–3 motions | Task 2 |
| Nav / footer / meta | Task 3 |
| No Business Plan pricing | Tasks 3, 6 verify |

## Plan self-review notes

- No TBD/placeholder steps remain; SVG/orbit/TCO bodies are “copy from Concept” with explicit path rewrites because inlining multi-KB SVG twice would make the plan unreadable — implementers must copy from `docs/business/concept/index.html` slides 5, 6, and 8.
- Task 3+4 commit boundary called out to avoid a broken mid-page state.
- `main.js` dark detection already treats `section--dark` as dark — `#owning` / `#now` need no extra class list changes.
