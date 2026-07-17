# Concept On-Prem Sovereignty Slide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a split-compare Product · Sovereignty slide (inline SVG) before Product · Today in the Concept deck.

**Architecture:** Single HTML/CSS change in `docs/business/concept/index.html` — new mint slide with two inline SVGs + captions; renumber subsequent slides; sync to investor-pack public copy and update READMEs.

**Tech Stack:** Static HTML, CSS, inline SVG (Aeonik / navy `#1D2B38` / teal `#12EACB` / mint `#F2F7F6`)

## Global Constraints

- Source of truth: `docs/business/concept/index.html`
- Sync: `desktop/investor-pack/public/concept/`
- No new image assets
- Eyebrow: `Product · Sovereignty`
- Headline: `Your prompts never leave the office.` (accent on office)
- Equal columns with captions under each SVG
- Active-slide-only motion

---

### Task 1: Add sovereignty slide CSS + markup and renumber

**Files:**
- Modify: `docs/business/concept/index.html`
- Modify: `docs/business/concept/README.md`
- Modify: `desktop/investor-pack/README.md`
- Modify: `desktop/investor-pack/public/concept/index.html` (sync)
- Modify: `desktop/investor-pack/public/concept/README.md` (sync)

**Interfaces:**
- Consumes: existing `.slide`, `.slide--mint`, `.eyebrow`, `h2`, `.lead`, `.accent` patterns
- Produces: new slide `data-slide="7"`; Product Today=`8`, Compare=`9`, Funnel=`10`

- [x] **Step 1: Add CSS** for `.sovereignty-compare`, panel captions, SVG animation keyframes scoped so they only run on `.slide.active`

- [x] **Step 2: Insert HTML** for the new slide after Close (after slide 6), before Product · Today

- [x] **Step 3: Renumber** Product Today → 8, Compare → 9, Funnel → 10; update product-slides CSS comment to `(8–10)`

- [x] **Step 4: Update READMEs** to 10-slide outline including Product · Sovereignty

- [x] **Step 5: Sync** docs concept → `desktop/investor-pack/public/concept/`

- [x] **Step 6: Verify**

```bash
grep -c 'data-slide=' docs/business/concept/index.html
grep 'Product · Sovereignty\|data-slide=' docs/business/concept/index.html
```

Expected: 10 slides; Sovereignty present as slide 7; no gaps in `data-slide` 1–10.
