# Paid Media Runbook — Sovereign Warden

$500 AUD / month learning budget. Goal: find one clear winner (LinkedIn audience or Google theme), not fill the calendar.

## Budget

| Channel | Monthly | Daily |
|---------|--------:|------:|
| LinkedIn Sponsored Content | **$300** | ~$10/day |
| Google Search | **$200** | ~$6.50/day |
| **Total** | **$500** | — |

Reallocate ≤$50 between LinkedIn ↔ Google only after 2+ weeks of data and only if one channel is clearly dead. No budget increase without a documented winner.

## Shared rules

| Rule | Spec |
|------|------|
| Geo | Australia only |
| UTMs | `utm_source=linkedin\|google` · `utm_medium=paid` · `utm_campaign=YYYY-MM-{theme}` |
| Offer match | Ad copy must match page H1/CTA |
| Kill rule | Pause any ad set/keyword with **$40+ spend and 0 meaningful actions** |
| Scale | Stay inside $500; tilt only after 2+ weeks |

**Meaningful action** = brief email, form submit, booking, or qualified DM.

---

## LinkedIn — $300/mo (~$10/day)

### Format

- Sponsored Content only (single image or document)
- No Conversation Ads / InMail at this budget
- Refresh creative every 3–4 weeks

### Audiences

**Audience A — Law (60% ≈ $180)**

| Filter | Value |
|--------|-------|
| Location | Australia |
| Functions | Legal / ops-adjacent |
| Seniority | Director–CXO–Partner–Owner |
| Titles | Managing Partner, Partner, COO, Practice Manager, Risk, GC, IT Manager |
| Company size | 51–200 and 201–500 |

**Audience B — Accounting / advisory (40% ≈ $120)**

| Filter | Value |
|--------|-------|
| Location | Australia |
| Functions | Accounting / Finance / Operations |
| Seniority | Same as A |
| Titles | Managing Partner, Partner, COO, CFO, Risk/Compliance, IT Manager |
| Company size | 51–200 and 201–500 |

**Exclusions (both):** Students, entry-level, companies &lt;11 employees.

### Creative starters (rotate 2–3)

| Theme | Headline | Primary text starter |
|-------|----------|----------------------|
| Shadow ChatGPT | Staff already use ChatGPT on client matters | Approval and data control have not caught up. For mid-market AU firms that is a Privacy Act and professional-duty problem — not an IT preference. |
| Copilot cost | The shock is rarely seat one | At 50–100 seats, Copilot TCO and offshore inference defaults collide. There is a path that keeps AI inside the firm. |
| Privacy Act education | Where do your prompts go? | Client data leaving AU by default is a residency and duty problem. Sovereign AI means AU-hosted today and on-prem when you are ready. |

### CTAs

| Phase | CTA | Destination |
|-------|-----|-------------|
| 1 | Learn more | Sovereignty brief or site (UTM below) |
| 2 | Book discovery call | Fit-call / `#contact` or booking URL |

---

## Google Search — $200/mo (~$6.50/day)

### Campaign settings

- Search only
- Match types: Phrase + Exact
- Search partners: **off**
- Display network: **off**
- Geo: Australia
- Bidding: Maximize clicks with **$2–4** cap, or Manual CPC

**Expectation:** ~40–80 clicks/mo — learn winning theme, not fill calendar.

### Ad groups & seed keywords

**Ad group 1 — Private / on-prem AI for firms**

| Match | Keywords |
|-------|----------|
| Exact | `[private ai for law firms]`, `[on-prem ai for professional firms]`, `[self hosted ai assistant australia]` |
| Phrase | `"private ai for firms"`, `"on premise ai law firm"`, `"sovereign ai australia"` |

**Ad group 2 — Data sovereignty / Privacy Act AI**

| Match | Keywords |
|-------|----------|
| Exact | `[data sovereignty ai australia]`, `[privacy act compliant ai]`, `[ai data residency australia]` |
| Phrase | `"privacy act ai"`, `"data residency ai"`, `"australian hosted ai"` |

**Ad group 3 — Copilot alternative / cost**

| Match | Keywords |
|-------|----------|
| Exact | `[microsoft copilot alternative]`, `[copilot cost law firm]`, `[copilot vs private ai]` |
| Phrase | `"copilot alternative australia"`, `"copilot tco professional firm"`, `"cheaper than copilot ai"` |

### Seed negatives

`free`, `course`, `job`, `salary`, `openai api`, `chatgpt login`, `consumer`, `school`, `university`, `template download`

Add as campaign-level negative keywords (broad) unless a search term proves useful after review.

### RSA copy (write fully)

**Ad group 1 — Private / on-prem AI**

| # | Headlines (≤30 chars) |
|---|------------------------|
| H1 | Private AI for AU Firms |
| H2 | AI That Stays In Your Firm |
| H3 | On-Prem Path, Not Just Cloud |

| # | Descriptions (≤90 chars) |
|---|--------------------------|
| D1 | Approved assistant with citations from firm docs. AU-hosted today; on-prem when ready. |
| D2 | Built for mid-market law and advisory. Keep client data inside Australian control. |

**Ad group 2 — Data sovereignty / Privacy Act**

| # | Headlines |
|---|-----------|
| H1 | Privacy Act–Ready Firm AI |
| H2 | AU Data Residency for AI |
| H3 | Sovereign AI for Mid-Market |

| # | Descriptions |
|---|--------------|
| D1 | Stop sending client prompts offshore by default. Sovereignty brief for Australian firms. |
| D2 | Citations, audit logs, and residency designed for regulated professional services. |

**Ad group 3 — Copilot alternative / cost**

| # | Headlines |
|---|-----------|
| H1 | Beyond Copilot Seat Shock |
| H2 | Copilot Alternative for Firms |
| H3 | Own AI Economics, Not Rent |

| # | Descriptions |
|---|--------------|
| D1 | Compare Copilot TCO at scale with a private path that does not assume US inference. |
| D2 | ChatGPT-class UX for partners and staff — without paying forever for rented seats. |

### Sitelinks (by phase)

| Phase | Sitelinks |
|-------|-----------|
| 1 | How sovereignty works · Privacy Act article · Sovereignty brief · About |
| 2 | Book fit call · How it works · Brief · Contact |

---

## Friday ads ritual (15 min)

1. Apply kill rule ($40+ spend / 0 meaningful actions → pause)
2. Note top LinkedIn creatives / Google search terms
3. Move ≤$50 between LinkedIn ↔ Google only if one channel is clearly dead (after 2+ weeks)
4. Log leads into Notion pipeline (same stages as GTM)

---

## Landing URLs

```
Phase 1 LinkedIn:
https://sovereignwarden.com/?utm_source=linkedin&utm_medium=paid&utm_campaign=YYYY-MM-authority

Phase 1 Google:
https://sovereignwarden.com/?utm_source=google&utm_medium=paid&utm_campaign=YYYY-MM-{theme}

Phase 2:
https://sovereignwarden.com/#contact?utm_source={linkedin|google}&utm_medium=paid&utm_campaign=fit-call
(or booking URL with the same utm_campaign=fit-call)
```

Replace `YYYY-MM` with campaign month; replace `{theme}` with `onprem`, `sovereignty`, or `copilot` to match the ad group.

---

## Setup checklist

- [ ] LinkedIn: Audience A (60%) + Audience B (40%); ~$10/day; 2–3 creatives live
- [ ] Google: 3 search ad groups; negatives; ~$6.50/day; RSAs live
- [ ] UTMs on all final URLs
- [ ] Tracking tags live (see tracking-and-kpis.md)
- [ ] Friday kill-rule reminder set
