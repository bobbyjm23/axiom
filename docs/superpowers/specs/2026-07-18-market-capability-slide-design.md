# Concept deck — Market · Capability slide redesign

**Date:** 2026-07-18  
**Status:** Spec approved; implementation plan at `docs/superpowers/plans/2026-07-18-market-capability-slide.md`  
**Scope:** Refocus slide 3 (`Market · Capability`) in the Sovereign Warden Concept deck — less noise, one causal story

## Goal

Feedback: the current slide is too noisy and overwhelming (line chart + dense task table + economics callout).

Refocus the slide on the **changing environment and the costs that come with it**:

1. Open-source and frontier capability are converging (left)
2. The cost of a capable inference box / server rack has fallen dramatically (right)
3. Together, that makes Sovereign Warden’s proposition — open source + your own rack — viable

## Placement

Unchanged. Remains **slide 3** in Act 1 — Market Outlook, between `Market · Today` and `Market · Tomorrow`.

| Order | Slide | Change |
|------:|-------|--------|
| 3 | **Market · Capability** | Redesign in place |

## Layout approach

**C · Sequential story** (approved)

One causal chain left → right, not two equal peer facts:

`1 · Capability` → `2 · Hardware cost`

Mint slide background (`slide--mint`), consistent with current deck.

## Copy (approved)

| Element | Text |
|---------|------|
| Eyebrow | `Market · Capability` |
| Headline | Models converged. **Racks became reachable.** (accent on second sentence) |
| Lead | Open source met frontier capability. The cost of a capable inference box fell with it — so owning the rack is a real option. |
| Panel 1 label | `1 · Capability` |
| Panel 1 title | Open source catching frontier |
| Panel 2 label | `2 · Hardware cost` |
| Panel 2 title | A capable inference box |
| Panel 2 closer | Open source on your own server rack is now a viable path. |

**Headline constraints (locked):**

- Do not use “good enough” (implies lesser models)
- Do not use “iron” (unclear jargon)

## Left panel — Capability bars

- **Chart type:** Grouped bar chart (not a line chart)
- **Periods:** Four — 3 yrs ago, 2 yrs ago, 1 yr ago, Today
- **Series:** Open source (mint `#12EACB`) beside Frontier (muted charcoal)
- **Story:** Frontier stays near the top; open source rises until nearly level by Today
- **Labels:** Relative heights only — **no percentage labels**
- **Legend:** Open source | Frontier (minimal)

## Right panel — Hardware cost

- **Form:** Strong before/after contrast (not a multi-year chart, not copy-only)
- **Subject:** Cost of a **capable inference box / server rack** (what a firm buys) — not GPU $/performance curves
- **Labels:** Qualitative only — no dollar figures

| Then (3 yrs ago) | Now (Today) |
|------------------|---------------|
| High | Reachable |
| Lab / enterprise spend | Dept / mid-market rack |

- Closing line under the contrast ties to Sovereign Warden’s OSS + own-rack proposition

## Remove from current slide

- SVG line chart (capability gap over time)
- Percentage point labels on the chart
- Nine-row task comparison table (Frontier vs open source by task)
- “The economics are changing” callout box

## Implementation notes

- Source of truth: `desktop/investor-pack/public/concept/index.html` (and `docs/business/concept/index.html` if kept in sync)
- Update concept README outline bullet for slide 3 (line chart + table → sequential bars + before/after)
- Prefer inline SVG/HTML + existing theme CSS; no new image assets
- Keep slide printable as one page; avoid reintroducing density

## Out of scope

- Other Concept slides
- Adding hard dollar hardware prices or capability benchmark citations
- Restoring the task-by-task comparison table (belongs elsewhere if needed later)
