# Agent Thread 4: Pricing and Unit Economics

**Purpose:** Prove the business makes money per customer, not just in spreadsheet defaults.

**Status:** Draft — delivery hours need founder validation via timed dry-run.

---

## Key Decisions (Locked from Track A)

| Decision | Value |
|----------|-------|
| Founding QuickStart floor | **$12,000** — no discount below; reduce scope instead |
| Pilot → production credit | **100%** if signed within **45 days** |
| Support pricing (Track A) | **Fixed tier $6–18k/yr** — not % of deploy |
| Pricing publication | **Recommend published ranges** on website — transparency is differentiator |
| Hardware | **Pass-through + 10–15% margin** optional; investor story = pass-through keeps deal simple |

---

## Decision Questions and Answers

| # | Question | Answer |
|---|----------|--------|
| 4.1 | Actual cost to stand up current POC? | **FOUNDER INPUT** — estimate: 40–80 hrs × $150 = $6–12k (sunk) |
| 4.2 | Max delivery hours at $12k QuickStart (&lt;65% GM)? | **~32 hours** at $150/hr loaded (delivery cost max $4,200) |
| 4.3 | Conversion rate for Y1 base case? | **40%** pilot→production; model breaks below **25%** after 4 pilots |
| 4.4 | Publish pricing? | **Yes** — publish QuickStart/Team Pilot ranges |
| 4.5 | Hardware story for investors? | Pass-through default; margin on turnkey GPU bundles optional |
| 4.6 | Target LTV:CAC? | **&gt;10:1** founder-led; **&gt;6:1** at seed with inside sales |
| 4.7 | Hire #2 trigger for margins? | **4 active customers** or **2 concurrent deliveries** |

---

## Track A Pricing Ladder

| Package | Users | Price (AUD ex GST) | Target delivery cost | Target GM |
|---------|-------|-------------------|---------------------|-----------|
| QuickStart (founding) | 10–15 | $12,000 | $4,000–$5,500 | 65–70% |
| QuickStart (standard) | 10–15 | $15,000–$18,000 | $4,000–$5,500 | 65–70% |
| Team Pilot | 15–30 | $25,000–$35,000 | $10,000–$14,000 | 55–60% |
| Team Production | 30–75 | $55,000–$90,000 | $30,000–$45,000 | 45–50% |
| Annual Support | — | $6,000–$18,000/yr | $2,000–$4,000 | 70–80% |
| Managed Lite | — | $2,500–$5,000/mo | ~$1,500/mo | ~40% |

*Source: [mid-market-track-a-strategy.md](../../mid-market-track-a-strategy.md)*

---

## Delivery Hours Model (Estimated)

| Task | QuickStart hrs | Team Pilot hrs | Notes |
|------|----------------|----------------|-------|
| Env provision + bootstrap | 4–8 | 6–12 | Automate target: 2 |
| Branding + workspace config | 2–4 | 4–6 | Templates reduce |
| Document ingest | 4–8 | 8–16 | Manual upload Track A |
| User onboarding + training | 2–4 | 4–8 | |
| Success report | 2 | 4 | |
| **Total** | **14–26** | **26–46** | QuickStart within 32h margin cap |

**FOUNDER INPUT:** Time your next dry-run deploy and replace estimates.

---

## Copilot TCO Reference (50 Users)

| Item | Annual cost (AUD) |
|------|-------------------|
| Copilot 50 × $45/mo × 12 | **$27,000** |
| Sovereign Warden QuickStart (founding) | **$12,000** (one-time, 6 weeks) |
| SW support Year 2+ | **$6,000–$12,000** |

**Anchor:** QuickStart ≈ 6 months of Copilot for half the team — with ownership path.

---

## Conversion Sensitivity (Y1 Revenue)

Base case: 8 pilots × $28k avg × 40% conversion → 3 production × $70k.

| Pilot→prod rate | Production deals | Prod revenue | Total Y1 impact |
|-----------------|------------------|--------------|-----------------|
| 25% | 2 | $140k | −$70k vs base |
| 40% | 3 | $210k | Base |
| 50% | 4 | $280k | +$70k vs base |

**Kill threshold:** &lt;25% after 4 pilots → reassess scope/pricing (viability K2).

---

## Customer Lifecycle Economics

| Stage | Revenue | Delivery cost | Gross profit |
|-------|---------|---------------|--------------|
| QuickStart | $15,000 | $5,000 | $10,000 |
| Team Production | $70,000 | $38,000 | $32,000 |
| Support (3 yr) | $36,000 | $9,000 | $27,000 |
| **3-year LTV** | **$121,000** | **$52,000** | **$69,000** (57% GM) |

*Source: [seed-funding-implications.md](../../seed-funding-implications.md)*

---

## CAC Model

| Channel | Est. CAC | LTV:CAC (at $69k GP) |
|---------|----------|----------------------|
| Founder outbound | $3,000–$5,000 | 14–23:1 |
| Inside sales (seed) | $8,000–$12,000 | 6–9:1 |
| Partner referral | $5,000–$8,000 | 9–14:1 |

**Founder-led CAC components:** CRM, travel, founder time (don't fully load founder salary in pre-seed CAC — investors expect this).

---

## Updated Financial Model Inputs

Copy these into [financial-model-assumptions.md](../../financial-model-assumptions.md) when validated:

| Variable | Recommended value | Notes |
|----------|-------------------|-------|
| `QUICKSTART_FEE` | $12,000 (founding) → $15,000 | New Track A variable |
| `PILOT_TO_DEPLOY` Y1 | 40% | Track A base |
| `PILOT_COUNT` Y1 | 8 | Requires pipeline execution |
| `SALARY_FOUNDER` | $150,000 | Pre-seed |
| `SALARY_ENG` | $120,000 from M5 | Earlier than enterprise plan |
| `GM_QUICKSTART` | 68% | Target |
| Pre-seed raise | $650,000 | Thread 8 |

---

## Output Checklist

- [x] Pricing ladder documented
- [x] LTV/CAC model
- [x] Conversion sensitivity
- [x] Copilot TCO anchor
- [ ] Dry-run delivery hours (founder)
- [ ] Update financial-model-assumptions.md with actuals
