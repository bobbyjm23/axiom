# Sovereign Warden — Angel Investor Pitch Deck

Browser-based HTML pitch deck for pre-seed / angel conversations.

## Open the deck

```bash
open docs/business/pitch-deck/index.html
```

Or serve locally (recommended for font loading):

```bash
cd docs/business/pitch-deck && python3 -m http.server 8080
# Visit http://localhost:8080
```

## Navigation

| Action | Control |
|--------|---------|
| Next slide | `→` · `Space` · `Page Down` · swipe left |
| Previous slide | `←` · `Page Up` · swipe right |
| First / last | `Home` / `End` |
| Deep link | `#slide-7` (e.g. `index.html#slide-13` for The Ask) |

## Export to PDF

1. Open in Chrome or Edge
2. `File → Print` (or `Cmd+P`)
3. Destination: **Save as PDF**
4. Layout: **Landscape** (optional — slides are responsive)
5. Enable **Background graphics**
6. Each slide prints as a separate page (print CSS included)

## Before sending to investors

Replace placeholders on **Slide 14 (Team)** and **Slide 15 (Close)**:

- `[Founder Name]`, `[email]`, `[phone]`
- Founder and technical lead bios
- Avatar photos (replace `.avatar` divs with `<img>` if desired)

## Slide outline (15 slides)

1. **Title** — Hook and positioning
2. **Problem** — Shadow AI vs compliance
3. **Solution** — Product summary
4. **Why Now** — Regulation, economics, market proof
5. **Product** — Architecture and data sovereignty
6. **Market** — TAM/SAM and two-track GTM
7. **Business Model** — Pricing ladder
8. **Traction** — POC status and 12-month milestones
9. **Go-to-Market** — Verticals and sales motion
10. **Competition** — Positioning matrix
11. **Unit Economics** — LTV, CAC, margins
12. **Financials** — 3-year projections
13. **The Ask** — $650k pre-seed, use of funds
14. **Team** — Founders + hire plan
15. **Vision** — Close and contact

## Source data

Figures sourced from:

- [sovereign-warden-business-plan.md](../sovereign-warden-business-plan.md)
- [mid-market-track-a-strategy.md](../mid-market-track-a-strategy.md)
- [seed-funding-implications.md](../seed-funding-implications.md)
