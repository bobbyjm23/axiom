# Website ↔ Concept Deck Alignment — Design Spec

**Date:** 2026-07-17  
**Status:** Approved for planning (pending user review of this file)  
**Source of truth:** `docs/business/concept/index.html` (Concept slides)  
**Explicitly not a source:** Business Plan / pricing ladder / ICP tracks / SAFE ask

## Goal

Refactor the public marketing homepage (`website/index.html`) so its section narrative mirrors the Concept pitch deck, adapted for a public buyer audience. Drop Business Plan–derived homepage content (packages, approach steps, ICP journeys).

## Decisions (locked)

| Decision | Choice |
|----------|--------|
| Narrative fidelity | **A** — Section-for-section Concept arc (Market → Product → Economics → Close) |
| Density | **C** — Keep strong visuals (sovereignty, integrations, TCO); compress capability chart and full feature matrix |
| Bookends | **A** — Insights + Contact after Close |
| Hero message | **A** — Concept frame: “Private AI for organisations that can’t use Claude” |
| Page structure | **1** — One homepage section per Concept slide, then Insights, then Contact |

## Page architecture

### Remove from homepage

- `#approach` — Land with a pilot / delivery steps  
- `#packages` — Service packages and AUD pricing cards  
- `#journeys` — Track A / Track B ICP cards  

Also remove related nav and footer links.

### New scroll order

| Order | Section ID | Concept slide | Notes |
|-------|------------|---------------|-------|
| 1 | `#top` | 1 · The Concept | Hero |
| 2 | `#market-today` | 2 · Where AI is today | Timeline + three pain cards |
| 3 | `#capability` | 3 · Gap shrinking | Compressed — no full chart/table |
| 4 | `#owning` | 4 · Rent → own | Dark band |
| 5 | `#sovereignty` | 5 · Sovereignty | Keep compare visual |
| 6 | `#platform` | 6 · Platform & integrations | Keep orbit / integrations |
| 7 | `#compare` | 7 · Feature compare | Compressed differentiators |
| 8 | `#tco` | 8 · 3-year TCO | Keep indicative TCO table |
| 9 | `#now` | 9 · Why this matters now | Dark close → buyer CTA |
| 10 | `#insights` | — | Existing articles block |
| 11 | `#contact` | — | Existing CTA |

### Navigation

Short set (not one link per section), e.g.:

- Market → `#market-today`  
- Sovereignty → `#sovereignty`  
- Platform → `#platform`  
- TCO → `#tco`  
- Insights → `#insights`  
- Contact → `#contact` (existing pill CTA)

Update header, mobile menu, footer, and scroll-spy targets accordingly.

## Content mapping

Copy and claims come from Concept only. Public polish allowed; investor-only lines must be removed.

### Hero (`#top`)

- **H1:** “Private AI for organisations that can’t use Claude.”  
- **Lead:** Public rewrite of slide 1 lead (regulated Australian firms / private AI inevitability). Drop “Before the numbers”, “Confidential — for accredited investor…”, and investor act framing as primary CTA copy.  
- **CTAs:** Book discovery + secondary scroll (e.g. See sovereignty / platform).  
- **Remove:** Current stats band (3–6 wks / package-adjacent claims). Optional light Market · Position cues only if they don’t clutter the first viewport.

### Market today (`#market-today`)

- H2 + lead from slide 2.  
- Timeline: 2023–24 Consumer boom → 2025 Board mandate → 2026 Compliance reckoning.  
- Cards: Shadow AI · SaaS default · Build paralysis.  
- Include ABS 46% footnote from Concept.

### Capability (`#capability`) — compressed

- H2 + lead from slide 3.  
- Short callout: open source close enough for everyday work; trade small quality gap for privacy, predictable cost, control.  
- **Do not** port the full line chart or task-percentage table.  
- Include 3 contrast bullets: Privacy · Cost · Control (from Concept economics callout).

### Owning (`#owning`) — dark

- H2, lead, blockquote, and three bullets from slide 4 (light public polish only).

### Sovereignty (`#sovereignty`)

- H2 + lead from slide 5.  
- Port leaves-the-building vs stays-on-prem SVG compare from Concept.

### Platform (`#platform`)

- H2 from slide 6.  
- Port product orbit (Android / iOS / Desktop hub + integration nodes: Microsoft 365, Atlassian, Google Workspace, Xero, MYOB, LEAP, Clio, Iress Xplan, Midwinter, SharePoint).  
- **Do not** restore current “hosted wedge → on-prem” / named OSS stack marketing as the primary story.

### Compare (`#compare`) — compressed

- H2 from slide 7.  
- **Do not** ship the full Claude vs Sovereign Warden vs Cetus matrix.  
- Exactly five differentiators from Concept (SW column): (1) self-hosted / on-prem, (2) desktop chat assistant, (3) RAG with source citations Day 1, (4) prompt & request audit logs, (5) client branding. Frame against cloud SaaS assistants and governance-only platforms without pasting the whole table.

### TCO (`#tco`)

- H2 + lead from slide 8.  
- Keep indicative ~100-seat 3-year comparison: Claude Team, Claude API, self-hosted LLM, self-hosted rent-to-own.  
- Label as indicative. Buyer framing — not an investor ask.

### Why now (`#now`) — dark

- H1 + lead + Regulation / Economics / Proof from slide 9.  
- Replace “Next: Open the Pitch Deck…” with a buyer CTA into `#contact`.  
- Closing line: “Private AI for organisations that can’t use Claude.”

### Insights + Contact

- Keep existing Insights article cards and Contact block.  
- Tighten Contact copy to match Concept close; no package or AUD ladder language.

## Visual & technical treatment

### Design system

- Remain on the existing website Mach42 system (`website/css/main.css`): navy `#1D2B38`, teal `#12EACB`, Aeonik, section pads, mint/dark bands.  
- Homepage stays a **scroll marketing page**, not a slide deck (no slide counter, arrow keys, or deck chrome).

### Port / adapt from Concept

- Sovereignty compare SVGs + supporting CSS patterns → adapted into `main.css`.  
- Platform orbit markup and logo assets → copy into `website/assets/` as needed (do not rely on `docs/business/concept/` paths in production).  
- TCO table structure → site-appropriate table styling.

### Compress visually

- Capability: text + callout.  
- Compare: short differentiator list or slim checklist.

### Motion

Ship 2–3 intentional motions, e.g.:

1. Hero title/lead entrance  
2. Sovereignty panels or orbit nodes on scroll  
3. Subtle transition into dark bands (`#owning`, `#now`)

### Files in scope

- `website/index.html`  
- `website/css/main.css`  
- `website/js/main.js` (nav / scroll spy)  
- `website/assets/` (logos, icons, SVGs as required)  
- `website/README.md` only if structure docs must stay accurate  

### Out of scope

- Rewriting article bodies  
- Editing Business Plan documents  
- Changing the Concept deck itself (unless a later sync task)  
- Investor-pack Electron shell beyond shared assets if already duplicated  

## Public-audience adaptation rules

1. Concept is the claim/copy source; strip investor-confidential and pitch-deck bridge language.  
2. Do not reintroduce Business Plan packages, AUD service ladder, or Track A/B ICP cards.  
3. Prefer buyer verbs (book a call, see how it works) over investor verbs (ask, SAFE, traction).  
4. Keep indicative TCO numbers from Concept; do not invent new package prices on the homepage.

## Success criteria

- A reader can scroll the homepage and recognise the Concept story arc without opening the deck.  
- No homepage section depends on Business Plan pricing/package/ICP content.  
- Sovereignty, platform integrations, and TCO remain visually strong.  
- Capability and feature-compare are present but lighter than the deck.  
- Insights and Contact still work after Close.  
- Desktop and mobile layouts remain usable; nav/scroll-spy match new IDs.

## Implementation note

After this spec is approved, create an implementation plan via the writing-plans skill before coding.
