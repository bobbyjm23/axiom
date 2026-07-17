# Sovereign Warden — Concept Deck

Visual narrative primer for the investor/mentor pack — the reasoning and opportunity story before the pitch deck numbers.

**Design:** Same Mach42 system as the pitch deck — Aeonik typography, navy (`#1D2B38`) + teal (`#12EACB`) palette, light mint backgrounds, pill navigation.

**Audience flow:** Start here → Pitch Deck → Business Plan Explorer.

The concept deck includes product slides (5–7) before positioning/close: sovereignty compare, platform integrations, and feature comparison.

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
| Deep link | `#slide-5` (e.g. `index.html#slide-5` for positioning) |

## Export to PDF

1. Open in Chrome or Edge
2. `File → Print` (or `Cmd+P`)
3. Destination: **Save as PDF**
4. Enable **Background graphics**
5. Each slide prints as a separate page (print CSS included)

## Slide outline (9 slides)

### Act 1 — Market Outlook

1. **The Concept** — Frame the deck; Market → Position
2. **Where AI is today** — Universal adoption vs compliance gap; timeline + shadow AI
3. **The gap is shrinking** — Open-source vs frontier capability line chart + task comparison table
4. **Where it's heading** — Rent vs own thesis; sovereign deployment (dark slide)

### Act 2 — Product

5. **Sovereignty** — Cloud leaves the building vs on-prem stays local (SVG compare)
6. **Platform & integrations** — SW logo hub, Android/iOS/Desktop, service orbit nodes
7. **Feature comparison** — Claude vs Sovereign Warden vs Cetus

### Act 3 — Economics

8. **3-year TCO** — Claude Team vs Claude API vs self-hosted LLM

### Close

9. **Why this matters now** — Window for productised sovereign AI (dark slide)

## What stays out (by design)

Unit economics, TAM/SAM, pricing ladder, traction, financial forecast, SAFE ask, and team — those live in the [pitch deck](../pitch-deck/README.md).

## Source data

- [cetus-songlines-competitor-analysis.md](../strategy/cetus-songlines-competitor-analysis.md)
- [competitive-positioning.md](../strategy/competitive-positioning.md)
- [market-and-icp.md](../strategy/market-and-icp.md)

## Electron pack

Bundled to `app-bundle/concept/` and served at `/concept` in the investor-pack app. Home screen lists Concept first as "Start here — the idea behind the business."
