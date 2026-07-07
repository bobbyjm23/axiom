# Agent Thread 11: Investor Narrative and Materials

**Purpose:** Synthesise all threads into coherent pitch. **Run after threads 1–10.**

**Status:** Draft — product, revenue, and competitor sections locked July 2026; pitch deck HTML update pending.

---

## One-Liner (11.1)

> **Sovereign Warden gives regulated Australian mid-market firms ChatGPT-class AI on infrastructure they control — deploy in weeks at fixed pricing, with a path from AU-hosted pilot to full on-prem sovereignty.**

Variants by audience:

| Audience | Emphasis |
|----------|----------|
| Investor | Two-SKU platform; hosted wedge → on-prem upsell; logo velocity; ARR slope |
| Customer | Approved AI your people will use; start hosted, upgrade to owned infra |
| Partner | QuickStart SKU to resell; 10–15% referral |

---

## Decision Questions and Answers

| # | Question | Answer |
|---|----------|--------|
| 11.1 | One-liner | See above |
| 11.2 | Why now? | Privacy Act reforms; shadow ChatGPT incidents; Copilot cost backlash; AU sovereign AI funding validates market |
| 11.3 | Why you? | **Solo technical founder** — Head of Engineering at Adneo (ASX HR tech); POC operational; profile-switch architecture. GTM credibility via Adneo logo #1; law vertical via outbound + investor intros |
| 11.4 | Prove in 18 months? | **Founder path:** 5–6 logos, 2+ production, $200k+ Y1 booked, QuickStart &lt;5 days. **Plan stretch:** 8 logos, $350k+ ARR seed-ready |
| 11.5 | Path to $5M+ ARR? | **Path 1:** Volume mid-market (hosted + on-prem). **Path 2:** Move upmarket (Track B). **Path 3:** MSP platform licensing (Year 4+) |
| 11.6 | Feared investor questions | See [FAQ](#investor-faq) |

---

## Product Summary

### What it is

**Sovereign Warden** is a **productised sovereign AI platform** — not a custom SI project. Employees get ChatGPT-class AI over company documents with RBAC, citations, and audit logs. IT gets a clear data path and deployment options.

**Stack:** AnythingLLM (chat/RAG/RBAC) · LiteLLM (gateway/logging) · Qdrant · Postgres · optional vLLM/Ollama · forked Electron desktop client.

**Status:** Software **~3–4 weeks from production-ready** (founder time only). Bootstrap scripts and POC operational today.

### Two product options (same platform)

| | **Option B — Sovereign Hosted (AU)** | **Option A — Turnkey On-Prem** |
|--|--------------------------------------|--------------------------------|
| **Pitch** | "Approved AI in Australia — we run it, you get a private tenant" | "ChatGPT on your servers — turnkey software + hardware" |
| **Buyer gets** | Fast start; no CapEx; AU jurisdiction | Full sovereignty; prompts never leave the rack |
| **You provide** | AU-hosted private tenant; managed ops | Docker/K8s stack + hardware sizing/bundle |
| **Best for** | **Wedge** — Adneo, fast mid-market pilots | **Upsell** — law firms, air-gap, CapEx buyers |
| **Revenue** | QuickStart → Production → Managed Lite ($3.5k/mo) + support | Production + hardware margin + support |
| **Competes with** | Copilot, Macquarie Launch AI, internal build | Cetus, Premya, Allayze |

### Land → expand motion

```
Option B (hosted pilot)  →  prove ROI  →  Option A (on-prem) OR Managed recurring
         ↑                                        ↑
    Adneo logo #1                          Same codebase — profile switch, no rebuild
```

**Investor line:** *"Only productised offer that lands hosted in weeks and upgrades to on-prem without replatforming."*

### Commercial packages (Track A)

| Package | Price band | Deployment |
|---------|------------|------------|
| QuickStart / Pilot | $12–15k founding | Hosted (Option B) |
| Team Production | $55–70k | Hosted or on-prem |
| Turnkey on-prem + hardware | $70k + $18–45k HW | Option A |
| Annual support | $12k/yr | Attach |
| Managed Lite | $3.5k/mo ($42k/yr) | Option B recurring |

**Adneo path:** Free/discounted hosted pilot → paid production → case study + logo rights.

---

## Revenue Forecast

### Track A plan case (full pre-seed GTM)

Assumes $650k pre-seed, 8 pilot closes Y1, law outbound from month 1. Source: [financial-model-assumptions.md §9](../../financial-model-assumptions.md).

| Stream | Year 1 | Year 2 | Year 3 |
|--------|--------|--------|--------|
| Pilots | $224k | $540k | $768k |
| Production | $210k | $675k | $1,040k |
| Support + Managed | $58k | $315k | $696k |
| Track B enterprise | $0 | $450k | $900k |
| **Total** | **$492k** | **$1,980k** | **$3,404k** |

| Month (plan) | Cumulative revenue | Notes |
|--------------|-------------------|-------|
| 3 | $24k | 2 × founding QuickStart |
| 6 | $96k | 4 pilots + 1 prod deposit |
| 12 | **$492k** | Operating cash positive ~M11 |

### Founder path (locked narrative — July 2026)

Adneo-first; angel bridge $150–250k; law outbound from week 7; Adneo pilot discounted.

| | Year 1 (founder base) | Plan case |
|--|----------------------|-----------|
| **Revenue booked** | **~$200k** | $492k |
| **Logos** | 5–6 | 8 |
| **Production deals** | 1–2 | 3 |
| **Cash break-even** | Month 15–18+ | Month 11–12 |

#### Founder path — quarterly Y1

| Quarter | Activity | Revenue (booked) |
|---------|----------|------------------|
| Q1 | Adneo pilot live; entity + angels | $0–12k |
| Q2 | Bridge close; Adneo production SOW | $40–80k |
| Q3 | 2–3 law QuickStarts; 1 production | $60–100k |
| Q4 | More QuickStarts; support attach | $50–80k |
| **Y1 total** | | **~$200k** |

#### Funding milestones vs revenue

| Milestone | Revenue / traction needed |
|-----------|---------------------------|
| Angel bridge close | Adneo pilot + ROI story; demo + security pack |
| Bridge review (M6–9) | 2–3 logos; Adneo production paid |
| Institutional pre-seed ($650k) | $150k+ booked; 4–5 logos; case study |
| Seed ($1.5M) | $350–500k ARR; 10+ logos; 40% conversion |

### Per-customer economics (50 users — TCO anchor)

| | Copilot (3yr) | Sovereign Warden (3yr) |
|--|---------------|--------------------------|
| Total cost | $81k | **$48–51k** (founding QuickStart + support) |
| Year 2+ | $27k/yr | **$12k/yr** support only |

Lead law/accounting conversations with this comparison.

---

## Competitive Landscape (Two-SKU Model)

### Market map

```
FULL SOVEREIGNTY (customer owns infra)
        ▲
        │  Cetus · Premya · Allayze     ★ OPTION A (on-prem upsell)
        │
SLOW ◄──┼──► FAST / PRODUCTISED
        │
        │  Dev shops · SIs              ★ OPTION B (hosted wedge)
        ▼
        Macquarie Launch AI             Copilot · ChatGPT (US cloud)
MANAGED / CLOUD
```

### Competitor summary

| Category | Who | Threat | Your SKU |
|----------|-----|--------|----------|
| US cloud SaaS | Copilot, ChatGPT Enterprise | High (default) | Option B |
| AU sovereign hosted | **Macquarie Launch AI** | High | **Option B direct** |
| AU sovereign on-prem | Cetus, Premya, Allayze | High | **Option A direct** |
| Custom SI | TechAhead, DEV.co | Medium | Both |

### Option B — who you beat (hosted wedge)

| vs | You win because |
|----|-----------------|
| **Copilot** | AU control; TCO ($12k pilot vs $27k/yr); firm-doc RAG + desktop UX |
| **Macquarie** | Faster (weeks); published pricing; ChatGPT-class desktop; mid-market focus |
| **Internal build** | Productised; 3–4 weeks to prod; ongoing support path |

### Option A — who you beat (on-prem upsell)

| vs | You win because |
|----|-----------------|
| **Cetus** | Speed (weeks vs months); desktop UX; fixed $12–35k pilot; mid-market price |
| **Premya** | UX; hosted → on-prem same stack; flexible sizing |
| **Copilot** | Prompts never leave network; CapEx asset; no per-seat lock-in |

### Where you lose (walk away)

| Scenario | Winner | Why |
|----------|--------|-----|
| IRAP mandatory | Cetus, Allayze | Gap until bridge-funded scoping completes |
| M365-native, US data OK | Copilot | Zero friction |
| Macquarie brand for board | Macquarie | Procurement comfort |
| &lt;20 employees | Copilot / ChatGPT Team | Unit economics |
| No executive sponsor | Status quo (shadow ChatGPT) | No budget |

### Competitive narrative (investor paragraph)

> Competitors force a false choice: **US cloud** (Copilot), **AU enterprise on-prem** (Cetus — slow, opaque), or **AU managed cloud** (Macquarie — enterprise-only). Sovereign Warden **lands hosted in weeks at published prices** and **upgrades to on-prem without rebuild**. We don't beat Copilot in Outlook; we beat them on **TCO, firm-document RAG, and AU control**. We don't beat Cetus on IRAP Year 1; we beat them on **speed, UX, and mid-market price**.

### Gaps to close

| Gap | Plan |
|-----|------|
| No IRAP | ISO/IRAP scoping in angel bridge |
| No references | Adneo logo #1 |
| SSO | Phase 2 post-bridge |
| SharePoint ingest | Phase 2; manual upload OK Year 1 |

---

## Roadmap to Success

### Phase 0 — Production ready (weeks 1–4, founder time only)

| Deliverable | Outcome |
|-------------|---------|
| Demo env + security pack | Investor / board ready |
| Adneo ROI deck + pilot SOW | Move Adneo Lead → Proposal |
| AU Pty Ltd + IP deed | Legal entity |
| Runbook &lt;5 day deploy | Repeatable delivery |

### Phase 1 — Logo #1 + bridge (months 1–3)

Adneo hosted pilot (Option B) → production SOW → angel bridge $150–250k → case study.

### Phase 2 — Prove model (months 3–6)

Adneo production revenue; law Priority A outbound; logos #2–3; ISO/IRAP scoping begins.

### Phase 3 — Scale GTM (months 6–12)

5–6 logos; Option A first upsell; sales advisor; **~$200k Y1 booked**.

### Phase 4 — Seed-ready (months 12–18)

10+ logos; $350k+ ARR; institutional pre-seed or seed.

---

## Pitch Deck Outline (Update [pitch-deck/index.html](../../pitch-deck/index.html))

| Slide | Content | Source |
|-------|---------|--------|
| 1 | Title + one-liner | 11 |
| 2 | Problem: shadow AI + Copilot cost + sovereignty | 1, 5 |
| 3 | Solution: two-SKU platform (hosted + on-prem) | Product summary above |
| 4 | Demo + architecture; profile switch | 3, architecture.md |
| 5 | How it works: hosted pilot → production → on-prem | 7, 4 |
| 6 | Market: Track A SAM 10–17k orgs | 1 |
| 7 | Business model + pricing ladder | 4 |
| 8 | Traction: POC live; Adneo Lead; pipeline | 6 |
| 9 | Competition: Copilot / Macquarie / Cetus map | Competitive landscape above |
| 10 | Team + hiring plan | 2 |
| 11 | Financials: founder path $200k Y1 vs plan $492k | Revenue forecast above |
| 12 | Ask: **$150–250k angel bridge** post-Adneo SOW | 8 |
| 13 | Milestones: 18-month roadmap | Roadmap above |
| 14 | Appendix: TCO comparison (50 users) | 4 |

---

## Traction Slide (Current — July 2026)

| Claim | Evidence |
|-------|----------|
| Platform works | Live demo; bootstrap in 1 day |
| Architecture de-risked | Profile switch POC → on-prem |
| GTM defined | Adneo-first; Priority A law list; angel bridge path |
| Market validated | 5+ AU competitors; Privacy Act reforms |
| Logo #1 pipeline | **Adneo (Lead)** — ASX HR tech; independent vendor |
| Security / legal | Founder-drafted pack; AU Pty Ltd planned; lawyer fact-check |
| **In progress** | Adneo vendor clearance; 3 angel prospects (not contacted) |
| **Do not claim yet** | Revenue, signed logos, &lt;5 day deploy, law fit calls |

---

## Investor FAQ

### Q1: "You're solo — who sells?"

**A:** I am primary seller for 12 months. Adneo is logo #1 (hosted pilot → production). Law outbound from week 7. Hire #1 is delivery engineer at first paid SOW. Angel bridge extends runway to 2–3 logos before institutional round.

### Q2: "Services businesses don't scale."

**A:** Two-SKU productised platform — same bootstrap for hosted and on-prem. Target 40% pilot→production; Managed Lite + support ARR. Deploy time 10d → 5d → 2d proves repeatability. Year 1 founder path $200k; plan case $492k at scale.

### Q3: "Cetus is already funded."

**A:** Cetus = enterprise/gov, 8–14 week pilots, IRAP. We land **Option B hosted** in weeks at $12–35k for mid-market law/accounting, then upsell **Option A on-prem** without rebuild. Different ICP and velocity.

### Q4: "What if Copilot wins?"

**A:** Copilot wins when US data is OK and M365-native workflows dominate. We target firms where client confidentiality blocks public AI and $27k/yr for 50 users triggers scrutiny. **Option B** competes on AU hosting + TCO; **Option A** on full sovereignty.

### Q5: "What's the moat?"

**A:** Hosted-to-on-prem on one platform; runbook speed; transparent mid-market pricing; desktop UX vs API-only sovereign vendors. First 10 professional-services logos create reference density.

### Q6: "Why raise if software is almost ready?"

**A:** Product is weeks from prod-ready on founder time. Raise funds **delivery, GTM, and compliance** (ISO/IRAP scoping) after Adneo proves ROI — not R&D from zero.

### Q7: "Why angel bridge not $650k pre-seed?"

**A:** Self-fund until Adneo SOW. Bridge ($150–250k) funds engineer + GTM to 2–3 logos. Institutional pre-seed follows traction. SAFE at $2.5M cap ($2M with sector intros).

---

## Data Room Index

See [data-room-index.md](data-room-index.md) for full checklist.

---

## Category Positioning

| Option | Pros | Cons | **Choice** |
|--------|------|------|------------|
| "Sovereign AI infrastructure" | Differentiated | Sounds gov-heavy | Secondary message |
| "Mid-market AI deployment" | Clear buyer | Generic | **Primary category** |
| "AI services company" | Honest | Low VC appeal | Avoid as lead |

---

## Go / No-Go Gate (Post-Replan)

| Criterion | Status | Source |
|-----------|--------|--------|
| Market ≥3.5 viability | ✅ 4.0 | viability-review |
| Product technical feasibility | ✅ 4.5 | viability-review |
| Unit economics model | ✅ 4.0 | Thread 4 |
| Team readiness | 🟡 3.0 | Thread 2 — locked |
| Pipeline / C1 path | ✅ | Thread 6 — Adneo-first |
| Entity / legal ready | 🟡 In progress | Thread 9 — AU Pty Ltd planned |
| Product / two-SKU narrative | ✅ | This document |
| Revenue forecast (founder path) | ✅ | **~$200k Y1** |
| Competitive positioning | ✅ | Two-SKU landscape above |
| **Overall** | **PROCEED WITH CONDITIONS** | Same as viability-review |

**Conditions unchanged:** C1 Day 90; C2 Month 12; C4 Month 6.

---

## Output Checklist

- [x] Product summary + two-SKU model
- [x] Revenue forecast (plan vs founder path)
- [x] Competitive landscape (hosted + on-prem)
- [x] Roadmap to success
- [x] Investor FAQ (7 questions)
- [x] Founder 11.3 (why you)
- [ ] Update pitch-deck/index.html with replan data
- [ ] Traction slide updated after Adneo SOW signed
