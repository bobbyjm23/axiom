# Competitive Positioning

**Category:** Productised sovereign AI for mid-market professional services  
**Lead competitors:** Copilot (default), Macquarie (hosted), Cetus (on-prem)  
**Revenue focus:** Hosted wedge → **on-prem turnkey conversion** (open-source LLMs on customer hardware)

---

## Strategic economics

| | Hosted wedge | On-prem turnkey |
|--|--------------|-----------------|
| **Role** | QuickStart entry | **Primary product (Y2+)** |
| **Inference** | Gemini / cloud API | vLLM / Ollama on customer GPU |
| **Your COGS** | ~$700–1,300/mo | Delivery labour only |
| **Customer 3-yr TCO (50 users)** | ~$138k | **~$119k** + they own hardware |
| **Sovereignty** | Partial | Full |

Do not compete on AWS GPU hosting ($15–30k+/mo COGS). Full analysis: [hosted-vs-onprem-cogs.md](../finance/hosted-vs-onprem-cogs.md).

---

## Two-SKU competitive map

```
FULL SOVEREIGNTY (on-prem)          ★ Option A — upsell
        ▲
        │  Cetus · Premya · Allayze
        │
SLOW ◄──┼──► FAST / PRODUCTISED
        │
        │  Dev shops              ★ Option B — wedge
        ▼
MANAGED / CLOUD                     Copilot · Macquarie
```

**Only us:** Land hosted in weeks → upgrade on-prem **without replatforming**.

---

## Option B — Hosted (wedge)

| vs | We win because |
|----|----------------|
| **Copilot** | AU control; lower TCO ($12k pilot vs $27k/yr); firm-doc RAG; desktop UX |
| **Macquarie Launch AI** | Weeks not months; published pricing; ChatGPT-class desktop |
| **Internal build** | Productised; support path; 3–4 weeks to prod |

**We lose:** Macquarie brand for board; IRAP-mandatory; buyer wants zero vendor ops forever.

---

## Option A — On-prem (primary focus)

| vs | We win because |
|----|----------------|
| **Cetus** | Weeks vs months; desktop UX; $12–35k pilot vs opaque enterprise quotes |
| **Premya** | Flexible deploy; same stack as hosted pilot |
| **Copilot** | Prompts never leave network; CapEx asset; no per-token bill |
| **AWS GPU hosting** | Customer owns $25k box vs $15k+/mo rent — break-even in ~2 months |

**Pitch:** Open-source models (Llama, Qwen) on their hardware. Same desktop app after hosted pilot — profile switch only.

---

## Battlecards

| Competitor | Strength | Our counter | Walk away if |
|------------|----------|-------------|--------------|
| Copilot | M365 distribution | TCO; sovereignty; desktop UX | US data OK |
| Cetus | IRAP; enterprise | Speed; mid-market price | Gov IRAP required |
| Macquarie | Brand; managed AU cloud | Client-owned path; UX | Managed-only buyer |
| Dev shop | Custom scope | Productised; fixed price | Bespoke ML needed |

---

## TCO anchor (50 users, 3-year)

| Option | 3-year total | Notes |
|--------|--------------|-------|
| Copilot | $81k | US cloud; per-seat |
| SW hosted wedge + Managed Lite | ~$138k | Pilot entry; not destination |
| **SW on-prem turnkey** | **~$119k** | Production + HW + support; **best sovereignty** |
| AWS GPU hosted (you run OSS) | ~$660k+ | Do not sell |

*Source: [hosted-vs-onprem-cogs.md](../finance/hosted-vs-onprem-cogs.md)*

---

## Deals we don't pursue

- Government / IRAP-mandatory
- Big 4 and ASX 50
- &lt;20 employees
- No executive sponsor
- Price-only RFPs below $12k floor

---

## Investor narrative

> Competitors force a false choice: US cloud (Copilot), slow enterprise on-prem (Cetus), or expensive managed cloud (Macquarie). We land hosted in weeks, then convert to **customer-owned on-prem** with open-source LLMs — faster than Cetus, cheaper than cloud GPU rent, full sovereignty.

---

*Full feature matrix: [competitor-matrix.md](../competitor-matrix.md)*
