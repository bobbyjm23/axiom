# Concept deck — On-prem sovereignty compare slide

**Date:** 2026-07-16  
**Status:** Approved (conversational design); awaiting spec review before implementation  
**Scope:** Add one graphic-led slide to the Sovereign Warden Concept deck

## Goal

Before **Product · Today**, insert a split-compare slide that makes the on-prem promise visceral: cloud assistants send prompts out of the office; Sovereign Warden keeps inference inside the building.

## Placement

| Order | Slide | Notes |
|------:|-------|-------|
| 1–6 | Existing (title → Close) | Unchanged |
| **7** | **Product · Sovereignty** (new) | Inserted here |
| 8 | Product · Today | Was 7 |
| 9 | Product · Compare | Was 8 |
| 10 | Go-to-market · Funnel | Was 9 |

Deck total: **10 slides**.

Source of truth: `docs/business/concept/index.html`  
Sync copy: `desktop/investor-pack/public/concept/index.html`  
Update outlines in both concept READMEs and `desktop/investor-pack/README.md` (slide count).

## Copy

- **Eyebrow:** `Product · Sovereignty`
- **Headline:** `Your prompts never leave the office.` (accent on “office”)
- **Lead:** One sentence contrasting offshore cloud assistants with on-prem inference inside the firm’s walls.

### Column captions (equal weight)

| Cloud path | On-prem path |
|---|---|
| **Leaves the building** | **Stays on-prem** |
| Staff → ChatGPT / Claude → overseas model | Staff → your rack → answers stay local |

## Visual design

- Background: mint (`slide--mint`), aligned with Product · Today
- Layout: two equal columns; SVG panel above; caption title + short line below each
- Implementation: **inline SVG + CSS only** — no new image assets

### Left panel — Cloud (warn / muted)

- Soft office silhouette
- 2–3 laptop glyphs inside
- Exit arrows leave the building toward a cloud + “Claude / ChatGPT” label
- Dashed warn-tone stroke on the exit path

### Right panel — On-prem (teal)

- Clear office boundary (solid teal outline)
- 3–4 laptops connected to a central server rack
- All connection lines stay inside the boundary
- Small “Local” (or lock) badge on the rack

### Motion

- Active-slide only: cloud arrows pulse outward; on-prem links pulse gently in place
- Prefer CSS keyframes; no motion when the slide is inactive

## Out of scope

- Hosted vs on-prem SKU pitch (removed earlier)
- Competitive Cetus burn/ROI narrative
- New raster/illustration assets
- Pitch deck or business-plan changes

## Acceptance criteria

1. New slide appears immediately before Product · Today in keyboard/hash navigation.
2. Split compare reads clearly at deck default viewport (~1200px content width) and stacks or remains legible at ≤900px.
3. Message “data/prompts stay in the office” is understandable without reading body copy beyond the column captions.
4. Bundle source (`docs/business/concept`) and public pack copy stay in sync after the change.
5. README slide outlines reflect 10 slides and the new sovereignty beat.
