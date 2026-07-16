# Sovereign Warden — Public Website

Static HTML/CSS/JS marketing site and article library. Design language extracted from [Mach42](https://mach42.ai/) — Aeonik typography, navy (`#1D2B38`) + teal (`#12EACB`) palette, pill navigation, hero bleed sections, feature lists, and card grids.

## Structure

```
website/
├── index.html              # One-page marketing site (anchor nav)
├── css/main.css            # Mach42-inspired design system
├── js/
│   ├── site-config.js      # GTM ID, social URLs, contact
│   ├── analytics.js        # Google Tag Manager loader
│   ├── share.js            # Social share + footer icons
│   └── main.js             # Header scroll state, mobile nav, scroll spy
├── assets/
│   ├── fonts/              # Aeonik (licensed — investor/internal use)
│   └── images/
└── articles/
    ├── index.html          # Article index
    ├── css/articles.css    # Article-specific styles
    └── <slug>/index.html   # Individual articles
```

## Homepage sections

`index.html` follows the Concept deck arc, one section per slide, ending in Insights + Contact bookends:

`#top` (hero) → `#market-today` → `#capability` → `#owning` → `#sovereignty` → `#platform` → `#compare` → `#tco` → `#now` → `#insights` → `#contact`

Business Plan pricing (Track A / Track B packages, hosted-wedge journeys) lives in the investor pack and Business Plan docs only — it is intentionally not on the public homepage.

## Local preview

```bash
cd website && python3 -m http.server 8080
# Visit http://localhost:8080
```

## Before production deploy

1. Edit `js/site-config.js`:
   - Set `gtmId` to your GTM container (e.g. `GTM-ABC123`)
   - Set `ga4MeasurementId` if configuring GA4 inside GTM
   - Update `siteUrl`, `contactEmail`, and social profile URLs
2. In GTM, create a GA4 Configuration tag and any future tags (LinkedIn Insight, etc.)
3. Replace placeholder domain in canonical/OG meta tags if different from `sovereignwarden.com.au`
4. Confirm Aeonik font licensing for public web use

## Adding a new article

1. Create `articles/<slug>/index.html` — copy an existing article as template
2. Add `articles/<slug>/header.svg` for the hero image
3. Link from `articles/index.html` and optionally from `index.html` insights section

## SEO & analytics

- Per-page `<title>`, meta description, canonical URLs
- Open Graph and Twitter Card tags on main pages
- JSON-LD Organization schema on homepage; Article schema on posts
- GTM loaded via `analytics.js` (skipped when `gtmId` is placeholder)

## Design components (from Mach42)

| Component | Usage |
|-----------|--------|
| `l-header` + `btn--pill` | Fixed nav with teal CTA pill |
| `block-hero` | Full-bleed hero with stats band |
| `block-text-features` | Two-column intro + feature list |
| `block-bleed-text` | Full-width media + overlay copy |
| `block-items` / `c-item` | Article cards with teal hover rule |
| `btn--pill-outline` | Secondary CTA on dark backgrounds |
