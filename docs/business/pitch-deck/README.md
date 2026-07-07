# Sovereign Warden — Angel Investor Pitch Deck

Browser-based HTML pitch deck for angel bridge / pre-seed conversations.

**Design:** Mach42-inspired — Aeonik typography, navy (`#1D2B38`) + teal (`#12EACB`) palette, light mint backgrounds, pill navigation.

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
| Deep link | `#slide-7` (e.g. `index.html#slide-15` for The Ask) |

## Export to PDF

1. Open in Chrome or Edge
2. `File → Print` (or `Cmd+P`)
3. Destination: **Save as PDF**
4. Enable **Background graphics**
5. Each slide prints as a separate page (print CSS included)

## Before sending to investors

Replace placeholders on **Slide 16 (Team)** and **Slide 17 (Close)**:

- `[Founder Name]`, `[email]`, `[phone]`
- Founder bio and photo (replace `.avatar` divs with `<img>` if desired)

## Slide outline (17 slides)

1. **Title** — Hook and positioning
2. **Context: AI boom** — Hyperscaler CapEx, enterprise mandate, rent vs ownership
3. **Context: Open source & economics** — 95% capability already available; cloud GPU vs on-prem (dark slide)
4. **Problem** — Shadow AI vs compliance
5. **Solution** — Two options, one platform (hosted wedge → on-prem focus)
6. **Why Now** — Regulation, economics, market proof
7. **Product** — Architecture and data sovereignty (dark slide)
8. **Unit Economics** — Hosted wedge vs on-prem business model
9. **Market** — TAM/SAM and two-track GTM
10. **Business Model** — Pricing ladder
11. **Traction** — POC status, Adneo logo #1, Y1 targets
12. **Go-to-Market** — Verticals and 90-day plan
13. **Competition** — Positioning matrix (dark slide)
14. **Financials** — Founder path + 5-year forecast
15. **The Ask** — $150–250k angel bridge SAFE
16. **Team** — Founder + hire plan
17. **Vision** — Close and contact

## Source data

Figures sourced from:

- [plan.md](../plan.md)
- [finance/funding.md](../finance/funding.md)
- [finance/hosted-vs-onprem-cogs.md](../finance/hosted-vs-onprem-cogs.md)
- [finance/revenue-forecast.md](../finance/revenue-forecast.md)
- [investor/mentor-brief.md](../investor/mentor-brief.md)

## Assets

| File | Purpose |
|------|---------|
| `assets/logo.png` | Sovereign Warden logo (corner mark on every slide; hero on title slide) |
| `assets/fonts/Aeonik-*.woff2` | Bundled Aeonik Regular + Bold for offline rendering |

Aeonik is a licensed typeface — for investor distribution only, not for public web use.
