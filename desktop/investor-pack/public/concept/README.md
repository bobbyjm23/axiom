# Sovereign Warden — Concept Deck

Visual narrative primer for the investor/mentor pack — the reasoning and opportunity story before the pitch deck numbers.

**Design:** Same Mach42 system as the pitch deck — Aeonik typography, navy (`#1D2B38`) + teal (`#12EACB`) palette, light mint backgrounds, pill navigation.

**Audience flow:** Start here → Pitch Deck → Business Plan Explorer.

The concept deck opens with market context, then the sovereignty compare (slide 3), then capability/outlook, then platform integrations and feature comparison.

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
| Deep link | `#slide-5` (e.g. `index.html#slide-5`) |

## Export to PDF

1. Open in Chrome or Edge
2. `File → Print` (or `Cmd+P`)
3. Destination: **Save as PDF**
4. Enable **Background graphics**
5. Each slide prints as a separate page (print CSS included)

## Slide outline (10 slides)

1. **The Concept** — Frame the deck; Market → Position
2. **Where AI is today** — Confidentiality at risk: shadow AI, broken privacy agreements, policy pressure, cost vs ROI
3. **Sovereignty** — Cloud leaves the building vs on-prem stays local (SVG compare)
4. **Models converged / racks reachable** — Open-source vs frontier bar groups → inference-box before/after
5. **Rent vs own** — 100-user cost table: Claude/Copilot vs Sovereign Warden (initial / ongoing / 3-year / 5-year)
6. **Verticals** — Legal · Wealth · Accounting as prefabricated turnkey packs (volume model)
7. **Platform & integrations** — OS availability + integration logo grid (aligned with website)
8. **Feature comparison** — Claude vs Sovereign Warden
9. **Adneo · Pilot ask** — Box + full-time rate; 90-day delivery; visibility; open doors to sharpen the offer
10. **Why this matters now** — Window for productised sovereign AI (dark slide)

## What stays out (by design)

Unit economics, TAM/SAM, pricing ladder, traction, financial forecast, SAFE ask, and team — those live in the [pitch deck](../pitch-deck/README.md).

## Source data

- [cetus-songlines-competitor-analysis.md](../strategy/cetus-songlines-competitor-analysis.md)
- [competitive-positioning.md](../strategy/competitive-positioning.md)
- [market-and-icp.md](../strategy/market-and-icp.md)

## Electron pack

Bundled to `app-bundle/concept/` and served at `/concept` in the investor-pack app. Home screen lists Concept first as "Start here — the idea behind the business."
