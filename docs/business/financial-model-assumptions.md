# Financial Model Assumptions — Sovereign Warden Platform

**Version:** 1.1  
**Date:** July 2026  
**Parent document:** [sovereign-warden-business-plan.md](sovereign-warden-business-plan.md)  
**Track A strategy:** [mid-market-track-a-strategy.md](mid-market-track-a-strategy.md)  
**Seed funding:** [seed-funding-implications.md](seed-funding-implications.md)  
**Plan inputs:** [archive/replan-july-2026/thread-04-pricing-unit-economics.md](archive/replan-july-2026/thread-04-pricing-unit-economics.md)  
**Executive plan:** [plan.md](plan.md)

This document provides editable inputs for 3-year revenue and cost projections across three scenarios. Copy values into a spreadsheet or adjust directly for sensitivity analysis.

---

## How to Use This Document

1. Edit the **Input Assumptions** section for your specific situation.
2. Review **Scenario Overrides** for conservative, base, and optimistic projections.
3. Check **Output Tables** for calculated revenue, costs, and margins.
4. Run **Sensitivity Analysis** to identify which variables matter most.

---

## 1. Input Assumptions (Defaults)

### 1.1 Pricing (AUD, ex GST)

| Input | Variable | Default | Range |
|-------|----------|---------|-------|
| Discovery workshop fee | `DISC_FEE` | $22,000 | $18,000–$25,000 |
| Paid pilot fee (small, 15–30 users) | `PILOT_S` | $70,000 | $55,000–$85,000 |
| Paid pilot fee (medium, 30–50 users) | `PILOT_M` | $100,000 | $85,000–$120,000 |
| Department deployment fee | `DEPT_DEPLOY` | $200,000 | $150,000–$280,000 |
| Enterprise deployment fee | `ENT_DEPLOY` | $450,000 | $350,000–$650,000 |
| Hardware bundle (dept tier) | `HW_BUNDLE` | $30,000 | $18,000–$45,000 |
| Hardware margin % | `HW_MARGIN` | 12% | 10–15% |
| Support fee (% of deployment) | `SUPPORT_PCT` | 18% | 15–20% |
| Support minimum (annual) | `SUPPORT_MIN` | $36,000 | $30,000–$48,000 |
| Managed ops (monthly) | `MANAGED_MO` | $15,000 | $10,000–$22,000 |
| Founding customer pilot discount | `FOUNDING_DISC` | $55,000 | $45,000–$55,000 |

### 1.2 Conversion Rates

| Input | Variable | Y1 | Y2 | Y3 |
|-------|----------|----|----|-----|
| Discovery → pilot conversion | `DISC_TO_PILOT` | 50% | 60% | 65% |
| Pilot → deployment conversion | `PILOT_TO_DEPLOY` | 33% | 50% | 63% |
| Dept vs enterprise split (of deploys) | `DEPT_SPLIT` | 100% | 67% | 60% |
| Support renewal rate | `SUPPORT_RENEW` | — | 80% | 85% |
| Managed ops attach rate (enterprise) | `MANAGED_ATTACH` | 0% | 50% | 60% |

### 1.3 Volume (Base Case)

| Input | Variable | Y1 | Y2 | Y3 |
|-------|----------|----|----|-----|
| Discovery workshops sold | `DISC_COUNT` | 6 | 10 | 12 |
| Pilots sold (calculated or override) | `PILOT_COUNT` | 3 | 6 | 8 |
| Deployments (calculated or override) | `DEPLOY_COUNT` | 1 | 3 | 5 |
| — Department deployments | `DEPT_COUNT` | 1 | 2 | 3 |
| — Enterprise deployments | `ENT_COUNT` | 0 | 1 | 2 |
| Managed ops clients | `MANAGED_COUNT` | 0 | 1 | 3 |

### 1.4 Cost Assumptions

| Input | Variable | Y1 | Y2 | Y3 |
|-------|----------|----|----|-----|
| Founder salary | `SALARY_FOUNDER` | $150,000 | $180,000 | $200,000 |
| Delivery engineer(s) | `SALARY_ENG` | $100,000 | $200,000 | $350,000 |
| Sales / marketing | `SALES_MKTG` | $50,000 | $120,000 | $200,000 |
| Cloud POC / demo costs | `CLOUD_COST` | $18,000 | $24,000 | $30,000 |
| Legal, accounting, insurance | `LEGAL_INS` | $30,000 | $40,000 | $50,000 |
| Tools & infrastructure | `TOOLS` | $18,000 | $25,000 | $35,000 |
| Office / misc | `MISC` | $0 | $12,000 | $24,000 |
| Headcount (FTE) | `HEADCOUNT` | 2.5 | 5.5 | 9 |

### 1.5 Gross Margin Assumptions

| Revenue stream | Variable | Margin |
|----------------|----------|--------|
| Discovery | `GM_DISC` | 64% |
| Pilot | `GM_PILOT` | 57% |
| Deployment | `GM_DEPLOY` | 45% |
| Support | `GM_SUPPORT` | 72% |
| Managed ops | `GM_MANAGED` | 55% |
| Hardware margin | `GM_HW` | 12% |

---

## 2. Scenario Overrides

### 2.1 Conservative Scenario

*"Slow start: founder network weaker than expected; 25% pilot conversion; hiring delayed 6 months."*

| Override | Y1 | Y2 | Y3 |
|----------|----|----|-----|
| `DISC_COUNT` | 4 | 7 | 10 |
| `DISC_TO_PILOT` | 25% | 40% | 50% |
| `PILOT_TO_DEPLOY` | 25% | 33% | 50% |
| `PILOT_COUNT` | 1 | 3 | 5 |
| `DEPT_COUNT` | 0 | 1 | 2 |
| `ENT_COUNT` | 0 | 0 | 1 |
| `SALARY_ENG` | $0 | $120,000 | $250,000 |
| `HEADCOUNT` | 1.5 | 3 | 6 |

### 2.2 Base Scenario

*"Plan case: 50% discovery conversion; 1 dept deployment in Y1; engineer hired Month 7."*

Uses all defaults from Section 1. No overrides.

### 2.3 Optimistic Scenario

*"Strong network: 70% discovery conversion; channel partner contributes 2 leads/year; faster hiring."*

| Override | Y1 | Y2 | Y3 |
|----------|----|----|-----|
| `DISC_COUNT` | 8 | 14 | 16 |
| `DISC_TO_PILOT` | 63% | 70% | 75% |
| `PILOT_TO_DEPLOY` | 50% | 60% | 70% |
| `PILOT_COUNT` | 5 | 10 | 12 |
| `DEPT_COUNT` | 2 | 4 | 5 |
| `ENT_COUNT` | 0 | 2 | 4 |
| `SALES_MKTG` | $60,000 | $150,000 | $250,000 |
| `HEADCOUNT` | 3 | 7 | 12 |

---

## 3. Revenue Calculation Formulas

```
Discovery Revenue     = DISC_COUNT × DISC_FEE
Pilot Revenue         = PILOT_COUNT × weighted_avg(PILOT_S, PILOT_M, FOUNDING_DISC)
Deployment Revenue    = (DEPT_COUNT × DEPT_DEPLOY) + (ENT_COUNT × ENT_DEPLOY)
Support Revenue       = prior_deployments × DEPLOY_FEE × SUPPORT_PCT (min SUPPORT_MIN)
Managed Revenue       = MANAGED_COUNT × MANAGED_MO × 12
Hardware Revenue      = deploys_with_hw × HW_BUNDLE
Hardware Margin       = Hardware Revenue × HW_MARGIN / (1 + HW_MARGIN)
Total Revenue         = Sum of above
```

### Weighted Average Pilot Fee

For base case with 3 pilots (2 standard + 1 founding):
```
Pilot Revenue = (2 × $70,000) + (1 × $55,000) = $195,000
```
Adjust `PILOT_COUNT` and mix as needed.

---

## 4. Output Tables

### 4.1 Base Case — Revenue

| Stream | Y1 | Y2 | Y3 |
|--------|----|----|-----|
| Discovery | $132,000 | $220,000 | $264,000 |
| Pilots | $195,000 | $420,000 | $560,000 |
| Deployments | $200,000 | $890,000 | $1,720,000 |
| Support | $0 | $28,800 | $277,200 |
| Managed ops | $0 | $90,000 | $540,000 |
| Hardware (incl. in deploy) | $5,000 | $25,000 | $60,000 |
| **Total** | **$532,000** | **$1,673,800** | **$3,421,200** |

*Note: Slight variance from business plan totals due to rounding and pilot mix. Business plan uses simplified averages.*

### 4.2 Base Case — Costs

| Category | Y1 | Y2 | Y3 |
|----------|----|----|-----|
| Founder salary | $150,000 | $180,000 | $200,000 |
| Delivery engineers | $100,000 | $200,000 | $350,000 |
| Sales & marketing | $50,000 | $120,000 | $200,000 |
| Cloud / demo | $18,000 | $24,000 | $30,000 |
| Legal / insurance | $30,000 | $40,000 | $50,000 |
| Tools | $18,000 | $25,000 | $35,000 |
| Office / misc | $0 | $12,000 | $24,000 |
| **Total opex** | **$366,000** | **$601,000** | **$889,000** |

### 4.3 Base Case — P&L Summary

| Metric | Y1 | Y2 | Y3 |
|--------|----|----|-----|
| Total revenue | $532,000 | $1,673,800 | $3,421,200 |
| COGS (at blended ~48% GM) | $276,640 | $870,384 | $1,779,024 |
| **Gross profit** | **$255,360** | **$803,416** | **$1,642,176** |
| Gross margin | 48% | 48% | 48% |
| Total opex | $366,000 | $601,000 | $889,000 |
| **EBITDA** | **-$110,640** | **$202,416** | **$753,176** |
| EBITDA margin | -21% | 12% | 22% |
| Cumulative EBITDA | -$110,640 | $91,776 | $844,952 |

### 4.4 Scenario Comparison — Total Revenue

| Scenario | Y1 | Y2 | Y3 | 3-Year Total |
|----------|----|----|-----|-------------|
| Conservative | $320,000 | $980,000 | $1,850,000 | $3,150,000 |
| **Base** | **$532,000** | **$1,674,000** | **$3,421,000** | **$5,627,000** |
| Optimistic | $780,000 | $2,100,000 | $3,800,000 | $6,680,000 |

### 4.5 Scenario Comparison — EBITDA

| Scenario | Y1 | Y2 | Y3 | Cash break-even |
|----------|----|----|-----|-----------------|
| Conservative | -$180,000 | $50,000 | $520,000 | Month 20 |
| **Base** | **-$111,000** | **$202,000** | **$753,000** | **Month 16** |
| Optimistic | -$50,000 | $450,000 | $1,200,000 | Month 12 |

*Cash break-even assumes $750k pre-seed funding at Month 0.*

---

## 5. Sensitivity Analysis

### 5.1 Revenue Sensitivity (Year 1)

Impact of ±20% change in key variables on Year 1 revenue ($532k base):

| Variable | -20% | Base | +20% | Swing |
|----------|------|------|------|-------|
| `DISC_COUNT` (6) | $506k | $532k | $558k | $52k |
| `PILOT_TO_DEPLOY` (33%) | $464k | $532k | $600k | $136k |
| `DEPT_DEPLOY` ($200k) | $492k | $532k | $572k | $80k |
| `PILOT_COUNT` (3) | $397k | $532k | $667k | $270k |

**Most sensitive variable:** `PILOT_COUNT` — each additional pilot adds ~$70k revenue. Focus GTM on discovery → pilot conversion.

### 5.2 Break-Even Sensitivity

| Variable | Value needed for Y1 EBITDA = $0 |
|----------|--------------------------------|
| Pilots (at $70k, no deploy) | 6 pilots (vs 3 base) |
| Deployments (at $200k, no pilots) | 2 dept deploys (vs 1 base) |
| Blended revenue | $762k (vs $532k base) |
| Opex reduction | -$111k (30% cut) |

### 5.3 Funding Runway

| Scenario | Pre-seed ($750k) runway | Notes |
|----------|------------------------|-------|
| Base (no revenue) | 24 months | $750k / $31k monthly burn |
| Base (with revenue) | 30+ months | Revenue partially offsets burn from Month 4 |
| Conservative | 20 months | Lower revenue, same opex |
| Optimistic | 36+ months | Revenue exceeds opex by Month 12 |

---

## 6. Unit Economics Reference

### 6.1 Customer Acquisition Cost (CAC)

| Channel | Est. cost per customer | Notes |
|---------|----------------------|-------|
| Direct outbound | $15,000–$25,000 | Founder time + travel for 3–6 month cycle |
| Partner referral | $5,000–$10,000 | Referral fee or revenue share |
| Founding customer | $10,000 | Discounted pilot + case study production |

**Blended CAC (Year 1):** ~$18,000 (direct only, 1 customer)

### 6.2 Customer Lifetime Value (LTV)

| Stage | Revenue | Cumulative |
|-------|---------|------------|
| Discovery | $22,000 | $22,000 |
| Pilot | $70,000 | $92,000 |
| Deployment | $200,000 | $292,000 |
| Support (3 years) | $108,000 | $400,000 |
| Managed ops (2 years) | $360,000 | $760,000 |

**LTV (dept tier, 3 years, no managed):** ~$400,000  
**LTV (enterprise tier, 3 years, with managed):** ~$760,000

### 6.3 LTV:CAC Ratio

| Scenario | LTV | CAC | Ratio | Target |
|----------|-----|-----|-------|--------|
| Dept, no managed | $400k | $18k | 22:1 | >3:1 ✅ |
| Enterprise + managed | $760k | $25k | 30:1 | >3:1 ✅ |

*Ratios are healthy because CAC is founder time (sweat equity) in Year 1. Will compress as paid sales hires are added.*

---

## 7. Copilot TCO Comparison Inputs

For the TCO calculator (see business plan appendix):

| Input | 500 users | 1,000 users | 2,000 users |
|-------|-----------|-------------|-------------|
| Copilot annual license cost | $270,000 | $540,000 | $1,080,000 |
| Copilot 3-year TCO | $810,000 | $1,620,000 | $3,240,000 |
| Sovereign Warden Year 1 (pilot + deploy + hw + support) | $363,000 | $528,000 | $678,000 |
| Sovereign Warden Year 2+ (support only) | $36,000 | $63,000 | $90,000 |
| Sovereign Warden 3-year TCO | $435,000 | $654,000 | $858,000 |
| 3-year savings vs Copilot | $375,000 (46%) | $966,000 (60%) | $2,382,000 (74%) |
| Break-even month | Month 16 | Month 11 | Month 8 |

*Sovereign Warden costs assume department-tier deployment. Enterprise tier with air-gap would increase Year 1 cost but not affect Year 2+ support significantly.*

---

## 8. Key Metrics Dashboard (Track Monthly)

### Track A (Primary — Year 1)

| Metric | Y1 Target | Formula |
|--------|-----------|---------|
| Fit calls | 30 | Count |
| QuickStart / Team Pilot closes | 8 | Count |
| Pilot → production conversion | 40% | Production / Pilots |
| Active pilots (max concurrent) | 2 | Count |
| QuickStart deploy time | <5 business days | Timed runbook |
| Revenue booked | $492k | Sum of signed SOWs |
| ARR (support + managed) | $60k by M12 | Recurring contracts × 12 |
| Gross margin (QuickStart) | >60% | Per-deal tracking |
| CAC | <$5k | Founder outbound |
| Logos (cumulative) | 8 | Count |

### Track B (Enterprise — Year 2+)

| Metric | Y2 Target | Formula |
|--------|-----------|---------|
| Discovery calls | 20 | Count |
| Paid discoveries | 6 | Count |
| Enterprise deployments | 1–2 | Count |
| ARR (total) | $350–500k | Recurring |

---

## 9. Track A Financial Model (Primary GTM)

See [mid-market-track-a-strategy.md](mid-market-track-a-strategy.md) for full narrative. Seed/pre-seed implications: [seed-funding-implications.md](seed-funding-implications.md).

### 9.1 Track A Pricing Inputs

| Input | Variable | Default |
|-------|----------|---------|
| QuickStart fee | `QS_FEE` | $15,000 |
| Team Pilot fee | `TP_FEE` | $30,000 |
| Team Production fee | `TPROD_FEE` | $70,000 |
| Annual support (fixed) | `TA_SUPPORT` | $12,000 |
| Managed Lite (monthly) | `TA_MANAGED` | $3,500 |
| Founding QuickStart discount | `QS_FOUNDING` | $12,000 |
| Enterprise deploy (Track B) | `ENT_DEPLOY` | $450,000 |

### 9.2 Track A Volume (Base Case)

| Input | Y1 | Y2 | Y3 |
|-------|----|----|-----|
| Pilot closes (`TA_PILOT_COUNT`) | 8 | 18 | 24 |
| Pilot → production (`TA_CONVERT`) | 40% | 50% | 55% |
| Production deals | 3 | 9 | 13 |
| Support attach | 60% | 75% | 80% |
| Managed Lite clients | 0 | 3 | 8 |
| Track B enterprise deals | 0 | 1 | 2 |

### 9.3 Track A Revenue Output

| Stream | Y1 | Y2 | Y3 |
|--------|----|----|-----|
| Pilots | $224,000 | $540,000 | $768,000 |
| Production | $210,000 | $675,000 | $1,040,000 |
| Support | $58,000 | $189,000 | $360,000 |
| Managed Lite | $0 | $126,000 | $336,000 |
| Track B enterprise | $0 | $450,000 | $900,000 |
| **Total** | **$492,000** | **$1,980,000** | **$3,404,000** |

### 9.4 Track A Opex (Primary GTM)

| Category | Y1 | Y2 (post-seed) | Y3 |
|----------|----|----------------|-----|
| Salaries | $270,000 | $1,140,000 | $1,650,000 |
| Cloud / demos | $24,000 | $60,000 | $90,000 |
| Sales & marketing | $65,000 | $144,000 | $220,000 |
| Compliance | $10,000 | $90,000 | $120,000 |
| G&A | $52,000 | $96,000 | $120,000 |
| **Total opex** | **$421,000** | **$1,530,000** | **$2,200,000** |

### 9.5 Track A P&L Summary

| Metric | Y1 | Y2 | Y3 |
|--------|----|----|-----|
| Revenue | $492,000 | $1,980,000 | $3,404,000 |
| Gross profit (~50%) | $246,000 | $990,000 | $1,770,000 |
| EBITDA | **-$175,000** | **-$540,000** | **-$430,000** |
| Cumulative EBITDA | -$175,000 | -$715,000 | -$1,145,000 |

*Year 2–3 EBITDA negative while scaling with seed capital. EBITDA positive projected Year 4 at ~35+ production customers and $800k+ ARR.*

### 9.6 Funding Summary (Track A)

| Round | Amount | Timing | Primary use |
|-------|--------|--------|-------------|
| Pre-seed | $650,000 | Month 0 | Founder + 1 engineer + QuickStart GTM |
| Seed | $1,500,000 | Month 14–18 | 2 sales + 2 delivery + CS |
| **Total to Year 3** | **$2,150,000** | | |

### 9.7 Copilot TCO — Track A Anchor (50 users)

| | Copilot (50 users) | Sovereign Warden QuickStart + Support |
|--|-------------------|-------------------------------|
| Year 1 | $27,000 | $15,000 (QuickStart) + $12,000 (support) = $27,000 |
| Year 2 | $27,000 | $12,000 (support only) |
| Year 3 | $27,000 | $12,000 |
| **3-year total** | **$81,000** | **$51,000** |

*At 50 users, QuickStart breaks even with Copilot in Year 1; support-only Years 2–3 are 56% cheaper.*

---

*Adjust inputs above to model your specific situation. All figures in AUD, excluding GST.*
