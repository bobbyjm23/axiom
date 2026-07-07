# Sovereign Warden — Executive Plan

**Version:** 1.0  
**Date:** July 2026  
**Founder:** Solo technical founder (Head of Engineering, Adneo)  
**Stage:** Pre-revenue; software ~3–4 weeks from production-ready

---

## One-liner

**Sovereign Warden gives regulated Australian mid-market firms ChatGPT-class AI on infrastructure they control — deploy in weeks at fixed pricing, with a path from AU-hosted pilot to full on-prem sovereignty.**

---

## Problem and opportunity

- Staff use **shadow ChatGPT** with client and confidential data.
- **Microsoft Copilot** costs ~$27k/yr for 50 users; data processed in the US.
- AU **sovereign AI vendors** (Cetus, Macquarie) take 8–14 weeks and opaque pricing.
- **~10,000–17,000** regulated mid-market organisations in Australia (Track A SAM).

---

## Product — two options, one platform

| | **Option B — Sovereign Hosted (AU)** | **Option A — Turnkey On-Prem** |
|--|--------------------------------------|--------------------------------|
| **What** | Private tenant on AU infrastructure we operate | Full stack on customer hardware |
| **For** | Fast pilot; no CapEx (**wedge only**) | Open-source LLMs; full sovereignty (**primary focus**) |
| **Inference** | Cloud API (Gemini) during pilot | vLLM / Ollama on customer GPU |
| **Competes with** | Copilot, Macquarie Launch AI | Cetus, Premya, Allayze |
| **Revenue** | QuickStart $12k → convert out | Production $55–90k + hardware + support |

**Land hosted → prove ROI → convert on-prem** — same codebase, profile switch, no rebuild. Do not scale on AWS GPU hosting; customer CapEx beats cloud GPU rent in ~2 months. See [finance/hosted-vs-onprem-cogs.md](finance/hosted-vs-onprem-cogs.md).

**Stack:** AnythingLLM · LiteLLM · Qdrant · Postgres · vLLM/Ollama · Electron desktop client.

---

## Business model (Track A)

| Package | Price | Notes |
|---------|-------|-------|
| QuickStart / Pilot | $12–15k founding | Hosted entry |
| Team Production | $55–70k | Hosted or on-prem |
| Annual support | $12k/yr | Recurring |
| Managed Lite | $3.5k/mo | Hosted recurring — **defer**; prefer on-prem conversion |

**Revenue focus (Y2+):** 60%+ from on-prem production + support, not hosted GPU or Managed Lite.

**Adneo (logo #1):** Free/discounted hosted pilot → paid production → case study + logo rights.

**ICP:** Mid-tier law (50–150 lawyers) primary; accounting secondary. 50–250 employees.

---

## Go-to-market (next 90 days)

| Phase | Timing | Focus |
|-------|--------|-------|
| Production ready | Weeks 1–4 | Demo env, security pack, AU Pty Ltd, runbook |
| Adneo close | Weeks 4–6 | Pilot SOW; vendor clearance in writing |
| Angel bridge | Post-Adneo SOW | $150–250k SAFE; 3 prospects identified |
| Law outbound | Week 7+ | 5 touches/week; Priority A accounts |

**Reference customer:** Adneo (ASX HR tech) — efficiency ROI, not law ICP.

**Sales:** Founder-led 12 months; delivery engineer at first paid SOW.

---

## Revenue forecast

### Founder path (active plan)

| | Year 1 |
|--|--------|
| **Revenue booked** | **~$200k** |
| **Logos** | 5–6 |
| **Production deals** | 1–2 |

| Quarter | Revenue |
|---------|---------|
| Q1 | $0–12k |
| Q2 | $40–80k (Adneo production) |
| Q3 | $60–100k |
| Q4 | $50–80k |

### Scale case (post institutional raise)

| | Y1 | Y2 | Y3 |
|--|----|----|-----|
| Revenue | $492k | $1.98M | $3.4M |
| Logos | 8 | 18+ | 24+ |

*Source: [financial-model-assumptions.md](financial-model-assumptions.md)*

### Combo path (Option A + B — active forecast)

| | Y1 | Y2 | Y3 | Y4 | Y5 |
|--|----|----|-----|-----|-----|
| **Total booked** | **~$200k** | **~$550k** | **~$880k** | **~$1.3M** | **~$1.8M** |
| Option A (on-prem) share | 46% | 63% | 70% | 75% | 80% |
| ARR exit | ~$24k | ~$96k | ~$230k | ~$420k | ~$580k |

Charts and quarterly detail: [finance/revenue-forecast.md](finance/revenue-forecast.md)

---

## Funding

| Round | Amount | Timing | Use |
|-------|--------|--------|-----|
| **Angel bridge** | **$150–250k** | Post-Adneo SOW | Engineer, GTM, ISO/IRAP scoping |
| Institutional pre-seed | $650k | After 2–3 logos | Scale team and GTM |
| Seed | $1.5M | Month 14–18+ | Sales, delivery, CS |

**SAFE cap:** $2.5M default; **$2M** if angel brings law/accounting intros.

**Self-fund until Adneo SOW signed.** Pivot only if Adneo fails AND no angel interest.

---

## Competition (summary)

| vs | We win on |
|----|-----------|
| **Copilot** | AU control, TCO, firm-doc RAG, desktop UX |
| **Macquarie** | Speed, published pricing, mid-market focus |
| **Cetus** | Weeks not months; UX; $12–35k pilot vs opaque enterprise quotes |

**We lose:** IRAP-mandatory gov deals (Year 1); M365-native buyers OK with US data.

---

## Team and legal

| Item | Status |
|------|--------|
| Founder | Solo; primary seller; technical credibility |
| Hire #1 | Delivery engineer at first paid SOW |
| Co-founder | Seeking technical (6-month window) |
| Entity | NZ trading co exists; **AU Pty Ltd before Adneo SOW** |
| Adneo conflict | Side project acknowledged; **vendor clearance still required** |
| Insurance | After first payment; ask Adneo vendor requirements |

---

## 18-month milestones

| Month | Milestone |
|-------|-----------|
| 0–1 | AU Pty Ltd; Adneo pilot live |
| 1–2 | Angel bridge closed |
| 2–3 | Adneo delivered; case study |
| 6 | 2–3 logos; **first on-prem conversion** in pipeline |
| 12 | ~$200k Y1 booked; on-prem production mix growing |
| 14–18 | Seed-ready: $350k+ ARR, 10+ logos (stretch) |

---

## Key risks

1. Adneo vendor clearance not obtained before SOW.
2. Weak law/accounting network until investor intros post-bridge.
3. Solo founder delivery + sales capacity.
4. No IRAP Year 1 (defer gov segment).

*Full register: [risk/risk-register.md](risk/risk-register.md)*

---

## Document map

| Need | Document |
|------|----------|
| Mentor / advisor entry | [investor/mentor-brief.md](investor/mentor-brief.md) |
| Investor FAQ | [investor/investor-faq.md](investor/investor-faq.md) |
| GTM and 90-day plan | [strategy/gtm-pipeline.md](strategy/gtm-pipeline.md) |
| Competition | [strategy/competitive-positioning.md](strategy/competitive-positioning.md) |
| Funding | [finance/funding.md](finance/funding.md) |
| Unit economics | [finance/unit-economics.md](finance/unit-economics.md) |
| **Hosted vs on-prem COGS** | [finance/hosted-vs-onprem-cogs.md](finance/hosted-vs-onprem-cogs.md) |
| **Y5 valuation / exit** | [finance/valuation-and-exit.md](finance/valuation-and-exit.md) |
| Team and hiring | [operations/team-and-hiring.md](operations/team-and-hiring.md) |
| Data room | [investor/data-room-index.md](investor/data-room-index.md) |
| Full index | [README.md](README.md) |
