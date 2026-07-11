# Sovereign Warden — Concept Deck

Visual narrative primer for the investor/mentor pack — the reasoning and opportunity story before the pitch deck numbers.

**Design:** Same Mach42 system as the pitch deck — Aeonik typography, navy (`#1D2B38`) + teal (`#12EACB`) palette, light mint backgrounds, pill navigation.

**Audience flow:** Start here → Pitch Deck → Business Plan Explorer.

## Open the deck

```bash
open docs/business/concept/index.html
```

Or serve locally (recommended for font loading):

```bash
cd docs/business/concept && python3 -m http.server 8080
# Visit http://localhost:8080
```

Note: fonts and logo are copied from `pitch-deck/assets/` during Electron bundle prep. For standalone browser use, symlink or copy assets:

```bash
cp -R ../pitch-deck/assets .
```

## Navigation

| Action | Control |
|--------|---------|
| Next slide | `→` · `Space` · `Page Down` · swipe left |
| Previous slide | `←` · `Page Up` · swipe right |
| First / last | `Home` / `End` |
| Deep link | `#slide-5` (e.g. `index.html#slide-6` for costing) |

## Export to PDF

1. Open in Chrome or Edge
2. `File → Print` (or `Cmd+P`)
3. Destination: **Save as PDF**
4. Enable **Background graphics**
5. Each slide prints as a separate page (print CSS included)

## Slide outline (8 slides)

### Act 1 — Market Outlook

1. **The Concept** — Frame the deck; Market → Landscape → Position
2. **Where AI is today** — Universal adoption vs compliance gap; timeline + shadow AI
3. **The gap is shrinking** — Open-source vs frontier capability line chart + task comparison table
4. **Where it's heading** — Rent vs own thesis; sovereign deployment (dark slide)

### Act 2 — Landscape / Cetus

5. **First movers vs next generation** — Cetus implied burn/ROI trap; cannibalisation window (dark slide)

### Act 3 — Our Position

6. **The gap nobody owns** — CISO vs mid-market buyer; adoption-first
7. **What Sovereign Warden proposes** — Two-SKU platform + architecture (dark slide)
8. **Why this matters now** — Close + bridge to Pitch Deck (dark slide)

## What stays out (by design)

Unit economics, TAM/SAM, pricing ladder, traction, financial forecast, SAFE ask, and team — those live in the [pitch deck](../pitch-deck/README.md).

## Source data

- [cetus-songlines-competitor-analysis.md](../strategy/cetus-songlines-competitor-analysis.md)
- [competitive-positioning.md](../strategy/competitive-positioning.md)
- [market-and-icp.md](../strategy/market-and-icp.md)

## Electron pack

Bundled to `app-bundle/concept/` and served at `/concept` in the investor-pack app. Home screen lists Concept first as "Start here — the idea behind the business."
