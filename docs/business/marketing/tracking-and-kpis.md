# Tracking & KPIs — Sovereign Warden

Founder-operable measurement for the 90-day marketing sprint. Five KPIs only — ignore follower vanity and impression-only metrics for decisions.

**Spec:** [2026-07-19-marketing-operating-system-design.md §4](../../superpowers/specs/2026-07-19-marketing-operating-system-design.md)  
**Related:** [paid-media.md](paid-media.md) · [content-calendar.md](content-calendar.md) · [gtm-pipeline.md](../strategy/gtm-pipeline.md)

---

## Tags install checklist — sovereignwarden.com

Site loads analytics via `website/js/site-config.js` + `website/js/analytics.js` on all pages. Work through in order; check each box before turning on paid.

### Current state

| Tag | Status | Notes |
|-----|--------|-------|
| GA4 | **Configured** | `G-9HDYFEW7D4` in `site-config.js`; loads via `analytics.js` |
| GTM (optional) | **Configured** | `GTM-WBBH4L7R` in `site-config.js`; publish container before relying on it |
| LinkedIn Insight Tag | **Not installed** | Required for LinkedIn conversion tracking |
| Google Ads tag | **Not installed** | Required for Google conversion import |
| Conversion events | **Partial** | No form yet — contact is `mailto:`; wire events when brief form or booking goes live |

### Install steps

#### 1. GA4 (or Plausible) — verify live

- [ ] Open [GA4 Realtime](https://analytics.google.com/) while browsing https://sovereignwarden.com — confirm active user
- [ ] Confirm `ga4MeasurementId` in `website/js/site-config.js` matches the GA4 property for **sovereignwarden.com** (not `.com.au` staging)
- [ ] **Plausible alternative:** if switching, add Plausible script to site `<head>`, remove GA4 block from `analytics.js`, and update this checklist

#### 2. LinkedIn Insight Tag

- [ ] LinkedIn Campaign Manager → **Account assets → Insight Tag** → copy partner ID
- [ ] Add before `</head>` on all pages (or via GTM custom HTML tag):

```html
<script type="text/javascript">
_linkedin_partner_id = "PARTNER_ID";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script>
<script type="text/javascript">
(function(l) {
  if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
  window.lintrk.q=[]}
  var s = document.getElementsByTagName("script")[0];
  var b = document.createElement("script");
  b.type = "text/javascript";b.async = true;
  b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
  s.parentNode.insertBefore(b, s);})(window.lintrk);
</script>
<noscript>
  <img height="1" width="1" style="display:none;" alt=""
    src="https://px.ads.linkedin.com/collect/?pid=PARTNER_ID&fmt=gif" />
</noscript>
```

- [ ] Campaign Manager → **Conversions** → create conversion: **form submit / booking / brief download**
- [ ] Verify tag with LinkedIn Insight Tag Helper browser extension

#### 3. Google Ads tag

- [ ] Google Ads → **Tools → Conversions** → New conversion action → Website
- [ ] Copy global site tag (gtag) or add via GTM Google Ads Conversion Tracking tag
- [ ] If not using GTM, extend `analytics.js` with the Ads config call after GA4 init:

```javascript
gtag("config", "AW-XXXXXXXXX");
```

- [ ] Map same conversion events as GA4 (form submit, booking click)

#### 4. Conversion events

**Meaningful action** = brief email, form submit, booking, or qualified DM.

| Event | Phase | Trigger | GA4 event name | Ads / LI conversion |
|-------|-------|---------|----------------|---------------------|
| Contact mailto click | 1–2 | Click `#contact` mailto link | `contact_click` | Optional until form live |
| Brief form submit | 1 | Brief capture form success | `generate_lead` | Primary |
| Booking / fit call | 2 | Calendar confirm or `#contact` booking | `book_fit_call` | Primary |
| Qualified DM | 1–2 | Manual — log in lead sheet | — | — |

- [ ] GA4 → **Admin → Events** → mark `generate_lead` and `book_fit_call` as conversions
- [ ] Import GA4 conversions into Google Ads
- [ ] Link same events to LinkedIn conversion actions
- [ ] Until a brief form ships, count **mailto clicks + manual DMs** as interim meaningful actions and log every lead in the sheet below

#### 5. Pre-launch smoke test

- [ ] Visit site with `?utm_source=test&utm_medium=paid&utm_campaign=2026-07-smoke` — confirm UTMs appear in GA4 traffic source
- [ ] Submit test form / click mailto — confirm conversion fires in GA4 Realtime
- [ ] Run one test click from LinkedIn and Google ad preview — confirm tags fire

---

## UTM convention

Use on **all** paid final URLs, company Featured links, and tracked organic posts when testing a theme.

| Parameter | Allowed values | Example |
|-----------|----------------|---------|
| `utm_source` | `linkedin` \| `google` | `utm_source=linkedin` |
| `utm_medium` | `paid` \| `company` \| `organic-social` | `utm_medium=paid` |
| `utm_campaign` | `YYYY-MM-{theme}` | `utm_campaign=2026-07-sovereignty` |

### Campaign themes (`{theme}`)

| Theme slug | Use when |
|------------|----------|
| `authority` | General company-page / brand traffic |
| `shadow-ai` | Shadow ChatGPT education posts or ads |
| `sovereignty` | Privacy Act / data residency |
| `copilot` | Copilot TCO / alternative |
| `onprem` | Private / on-prem AI for firms |
| `fit-call` | Phase 2 booking CTA everywhere |

### Example URLs

```
Paid LinkedIn (phase 1):
https://sovereignwarden.com/?utm_source=linkedin&utm_medium=paid&utm_campaign=2026-07-authority

Paid Google (phase 1):
https://sovereignwarden.com/?utm_source=google&utm_medium=paid&utm_campaign=2026-07-copilot

Company page Featured (organic):
https://sovereignwarden.com/?utm_source=linkedin&utm_medium=company&utm_campaign=2026-07-authority

Phase 2 fit call:
https://sovereignwarden.com/#contact?utm_source=linkedin&utm_medium=paid&utm_campaign=2026-07-fit-call
```

**Rules:** lowercase only · hyphens in theme · one campaign per creative rotation · never omit UTMs on paid links.

---

## Five KPIs (90-day targets)

Track weekly in the Friday note. These are the **only** metrics that drive cut/scale decisions.

| KPI | 90-day target | How to measure |
|-----|---------------|----------------|
| **Company posts shipped** | ≥3/week average | Count published company-page posts; rolling 4-week average |
| **Paid learning** | ≥1 clear winner theme | Document which LinkedIn audience (A law vs B accounting) or Google ad group (onprem / sovereignty / copilot) has lowest cost per meaningful action after 2+ weeks |
| **Meaningful actions** | 8–20 total | Sum of brief emails, form submits, bookings, qualified DMs (from lead log) |
| **Fit calls (phase 2)** | 2–4 marketing-assisted | Fit calls booked where lead touched marketing (UTM, ad, or company post) in prior 30 days |
| **Cost per meaningful action** | Track; don't obsess until n≥10 | Total ad spend ÷ meaningful actions; review trend only after 10+ actions |

Ignore follower count, raw impressions, and click-through without a downstream action.

---

## Lead log (Notion or sheet)

One row per lead. Align **Status** with [gtm-pipeline.md](../strategy/gtm-pipeline.md) stages.

| Column | What to capture |
|--------|-----------------|
| **Date** | First touch date (YYYY-MM-DD) |
| **Source** | `linkedin-paid` · `google-paid` · `linkedin-company` · `linkedin-organic` · `referral` · `outbound` |
| **Campaign** | UTM campaign value or post theme (e.g. `2026-07-sovereignty`) |
| **Name / Firm** | Contact + firm name |
| **Role** | Partner · COO · GC · IT Manager · etc. |
| **Action** | `brief` · `fit-call` · `DM` |
| **Status** | GTM pipeline stage (e.g. New · Contacted · Discovery · Pilot · Won · Lost) |
| **Next step** | One concrete action + owner |
| **Notes** | Context, objections, ICP fit (Y/N), ad creative if paid |

Log within 24h of any meaningful action. Paid Friday ritual step 4 = "no unlogged leads from this week."

---

## Friday 15-min template

Copy into Notion / calendar each week. Same block covers ads + KPIs.

```
FRIDAY MARKETING REVIEW — [YYYY-MM-DD] — 15 min

ADS (see paid-media.md)
[ ] Kill rule: pause any ad set/keyword with $40+ spend and 0 meaningful actions
[ ] Note top LinkedIn creative + top Google search term this week
[ ] Reallocate ≤$50 LI ↔ Google only if one channel dead (2+ weeks data)
[ ] Log all new leads in lead sheet (Date | Source | Campaign | Name/Firm | Role | Action | Status | Next step | Notes)

KPI SNAPSHOT (5 numbers only)
[ ] Company posts shipped this week: __ / 3 target
[ ] 4-week post average: __ / week
[ ] Meaningful actions (90-day running total): __ / 8–20 target
[ ] Fit calls marketing-assisted (phase 2 only): __ / 2–4 target
[ ] Cost per meaningful action: $__ (note if n < 10 — trend only)
[ ] Paid learning note: winner theme or "still testing" → __

DECISIONS
[ ] Any creative refresh needed? (3–4 week cycle)
[ ] Phase flip check: Adneo signed + usable proof? Y/N
[ ] One-line priority for next week: __
```

---

## Phase flip criteria

Flip from **Phase 1 (authority / brief)** to **Phase 2 (fit-call primary)** when **both** are true:

1. **Adneo signed** — paying customer or signed agreement  
2. **One usable proof point** — quotable metric, logo permission, or anonymised outcome for posts/ads  

### When flipped, update everywhere (same week)

| Surface | Phase 1 | Phase 2 |
|---------|---------|---------|
| LinkedIn Company CTA button | Visit website / Contact us | Book appointment |
| LinkedIn Featured | Sovereignty brief · articles | Book fit call · brief |
| Paid ad CTAs | Learn more / brief | Book discovery call |
| Ad final URLs | Brief or site home | `#contact` or booking URL with `utm_campaign=…-fit-call` |
| Content calendar offer posts (~20%) | Soft brief CTA | Fit-call CTA with proof snippet |
| Site primary CTA | Brief preferred for ads; discovery OK on site | Book 30-min fit call as primary |

Document flip date in lead log Notes and KPI Friday template. Do not flip on pipeline hope — wait for signed + proof.

---

## Quick reference

| Item | Location |
|------|----------|
| GA4 / GTM config | `website/js/site-config.js` |
| Tag loader | `website/js/analytics.js` |
| Paid kill rule | [paid-media.md](paid-media.md) |
| Posting cadence KPI input | [content-calendar.md](content-calendar.md) |
| GTM pipeline stages | [gtm-pipeline.md](../strategy/gtm-pipeline.md) |
