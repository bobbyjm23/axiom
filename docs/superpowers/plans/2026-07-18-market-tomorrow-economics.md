# Market · Tomorrow Economics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans or implement inline. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Market · Tomorrow with a basic 100-user cost table (Frontier vs on-prem vs rent-to-own; initial / ongoing / 3-year / 5-year) and delete the separate Economics · 3-year TCO slide.

**Architecture:** Edit `docs/business/concept/index.html` — rewrite slide 5 markup, remove slide 8 TCO, renumber Close to 8. Reuse `.tco-compare` without pros/cons columns. Sync investor-pack public concept + READMEs.

**Tech Stack:** Static HTML/CSS in the Concept deck

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-18-market-tomorrow-economics-design.md`
- Headline only: `The shift from renting intelligence to owning it.` (accent on owning)
- No lead, quote, bullets, pros/cons
- 100 users · A$ · three rows · four cost columns
- Rent to own = on-premises totals × 1.30
- Numbers: Frontier A$0 / A$90,200/yr / A$270,000 / A$451,000; On-prem A$61,000 / A$3,000/yr / A$70,000 / A$76,000; Rent-to-own A$0 / ~A$30,333/yr / A$91,000 / A$98,800
- Source of truth: `docs/business/concept/` then sync `desktop/investor-pack/public/concept/`
- Deck becomes 8 slides

---

### Task 1: Rewrite Tomorrow + delete Economics TCO + sync

**Files:**
- Modify: `docs/business/concept/index.html`
- Modify: `docs/business/concept/README.md`
- Modify: `desktop/investor-pack/public/concept/index.html` (sync)
- Modify: `desktop/investor-pack/public/concept/README.md` (sync)

- [ ] **Step 1:** Replace Market · Tomorrow section with headline + basic `tco-compare` table (no prose columns). Use `slide--mint` for table readability; keep eyebrow `Market · Tomorrow`. Highlight both on-prem rows.

- [ ] **Step 2:** Delete the entire Economics · 3-year TCO section; renumber Close `data-slide="8"` and HTML comment.

- [ ] **Step 3:** Update concept README outline to 8 slides; Tomorrow bullet = 5-year cost table; remove Economics TCO bullet.

- [ ] **Step 4:** Sync both files to `desktop/investor-pack/public/concept/` and `diff -q`.

- [ ] **Step 5:** Verify — 8 `data-slide` values; no Economics eyebrow; table has exact numbers; no pros/cons; headline present.

- [ ] **Step 6:** Commit concept files only (exclude unrelated investor-pack WIP).
