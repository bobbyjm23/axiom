# Hosted vs On-Prem COGS

**Purpose:** Economics of inference and infrastructure — for mentors, investors, and sales.  
**Strategic focus:** **Option B (hosted)** is the wedge; **Option A (on-prem turnkey)** is the primary product after pilots convert.  
**Related:** [unit-economics.md](unit-economics.md) · [../../hardware-sizing.md](../../hardware-sizing.md) · [../../k8s/aws-eks-notes.md](../../k8s/aws-eks-notes.md)

---

## Strategic model

```
PHASE 1 — WEDGE (now)              PHASE 2 — FOCUS (post-pilot)
─────────────────────────          ─────────────────────────────
Hosted AU + cloud API (Gemini)  →  On-prem turnkey + open-source LLMs
Fast pilot, no CapEx               Customer-owned GPU, full sovereignty
Competes with Copilot              Competes with Cetus, Premya
Low your COGS, disclose DPA        Best unit economics for you + client
```

**Do not build the business on renting AWS GPUs for open-source models.** Clients who want Llama/Qwen on their own infrastructure should buy hardware — not pay you $15k+/mo for cloud GPU.

---

## Three deployment profiles

| Profile | Inference | Who pays infra | Typical use |
|---------|-----------|----------------|-------------|
| **A — Hosted wedge** | Gemini / cloud API | You (EKS + API) | 6-week QuickStart; Adneo; law pilot entry |
| **B — AWS GPU hosted** | vLLM on your EKS | You (EKS + GPU nodes) | **Avoid** as steady state — COGS kills margin |
| **C — On-prem turnkey** | vLLM / Ollama on customer GPU | **Customer** (CapEx) | Production; sovereignty buyers; primary focus |

---

## Your COGS (what it costs Sovereign Warden to run)

### Profile A — Hosted wedge (Gemini)

*Per shared EKS cluster, 1–2 pilot tenants. Inference via third-party API.*

| Cost line | AUD/mo | Notes |
|-----------|--------|-------|
| EKS + nodes + storage + ALB | **$600–800** | See [aws-eks-notes.md](../../k8s/aws-eks-notes.md) |
| Gemini API (15 users, moderate) | **$100–500** | Usage-dependent; not in infra estimate |
| Your ops time | Variable | Not modelled here |
| **Total COGS (infra + API)** | **~$700–1,300/mo** | Split across tenants if shared |

**Revenue if Managed Lite:** $3,500/mo → **~40% gross margin** only if tenants share cluster and API usage stays moderate. **One tenant per cluster** tightens margin fast.

### Profile B — AWS GPU hosted (open-source LLM)

*You run Llama 3.3 70B on EKS GPU nodes (current k8s manifest: 4× GPU).*

| Cost line | AUD/mo | Notes |
|-----------|--------|-------|
| EKS control plane + app/data nodes | ~$600–800 | Same as Profile A |
| GPU node group (e.g. 4× A10G class) | **$15,000–30,000+** | Dominates economics |
| **Total COGS** | **~$16,000–31,000/mo** | |

**Revenue if Managed Lite:** $3,500/mo → **deeply negative**. Would need **$18–25k+/mo** managed fee to break even — competes with Cetus/Macquarie on their terms.

**Verdict:** Bridge only (3–6 months) if customer hardware is on order. Not the business model.

### Profile C — On-prem turnkey (customer GPU)

*You deploy software; customer buys hardware. Open-source models on their metal.*

| Cost line | Who pays | Typical amount |
|-----------|----------|----------------|
| GPU server CapEx | **Customer** | **$15,000–40,000** (dept tier) |
| Your deploy fee | Customer → you | **$55,000–90,000** (Team Production) |
| Annual support | Customer → you | **$6,000–18,000/yr** |
| **Your COGS** | You | **Delivery labour only** — no GPU rent |

**Hardware margin:** Pass-through default; optional **10–15%** on turnkey bundles.

**Verdict:** Best alignment with sovereignty ICP and your margins. **Primary revenue focus after wedge.**

---

## Customer TCO — 3-year comparison (50 users, dept tier)

Illustrative totals for **buyer** decision-making (AUD, ex GST).

| Option | Y1 | Y2 | Y3 | **3-year total** | Sovereignty |
|--------|----|----|-----|------------------|-------------|
| **Microsoft Copilot** | $27k | $27k | $27k | **$81k** | US cloud |
| **SW Hosted wedge** (pilot + Managed Lite) | $12k QS + $42k | $42k | $42k | **~$138k** | AU hosted; API leaves network |
| **SW AWS GPU** (you host OSS) | $12k + $216k | $216k | $216k | **~$660k+** | AU cloud; unrealistic pricing |
| **SW On-prem turnkey** | $70k prod + $25k HW | $12k support | $12k support | **~$119k** | Full; prompts on their LAN |
| **Cetus-style SI** | $150k+ | $50k+ | $50k+ | **$250k+** | Full; slow |

**Sales anchor:** On-prem turnkey beats Copilot over 3 years **and** beats hosted recurring **while** delivering real sovereignty. QuickStart hosted is the **entry ramp**, not the destination.

---

## Break-even: AWS GPU rent vs customer CapEx

When does customer-owned hardware beat you renting AWS GPU?

| Monthly AWS GPU COGS (you) | Customer CapEx ($25k dept box) | Break-even |
|----------------------------|--------------------------------|------------|
| $15,000/mo | $25,000 | **~1.7 months** |
| $20,000/mo | $25,000 | **~1.25 months** |
| $15,000/mo | $40,000 | **~2.7 months** |

After break-even, customer **owns the asset**; you earn deploy + support without carrying GPU COGS.

**Pitch line:** *"For less than two months of cloud GPU rent, you own the inference server outright."*

---

## Open-source LLM stack (on-prem)

| Component | Role |
|-----------|------|
| **vLLM** | Primary chat (Llama 3.3 70B 4-bit, Qwen, Mistral) |
| **Ollama** | Embeddings (`nomic-embed-text`), smaller fallback models |
| **LiteLLM** | Model routing, audit logs |
| **AnythingLLM** | RAG, workspaces, desktop UX |

Sizing: [hardware-sizing.md](../../hardware-sizing.md)

| Tier | Users | GPU | CapEx |
|------|-------|-----|-------|
| Pilot | 5–15 | 1× RTX 4090 / L40S | $3k–8k |
| Department | 20–50 | 2× L40S or 1× A100 | $15k–40k |
| Enterprise | 100+ | 4–8× H100 | $150k–400k+ |

No per-token bill. Predictable cost = hardware + support.

---

## Revenue focus by phase

| Phase | SKU | Inference | Your revenue streams |
|-------|-----|-----------|---------------------|
| **Wedge (Y1)** | Option B hosted | Gemini | QuickStart $12k; Adneo production; case study |
| **Convert (Y1–2)** | Option A on-prem | Customer vLLM/Ollama | Team Production $55–90k; hardware pass-through; support $6–18k/yr |
| **Scale (Y2+)** | Option A majority | Customer-owned | Production + support ARR; Managed Lite only where client insists |

**Target mix (Y2):** 60%+ revenue from on-prem production + support, not hosted GPU or Managed Lite.

---

## What to say in sales

### Hosted QuickStart (wedge)

> "Start approved in six weeks on AU infrastructure. Prove adoption with your documents. No hardware procurement yet."

*Disclose:* inference may use cloud API during pilot; data residency for app + vectors in AU.

### On-prem production (focus)

> "Move to your own GPU server — Llama or Qwen, fully on your network. Same desktop app, same workspaces. One profile switch, no rebuild. Hardware pays for itself in weeks versus cloud GPU rent."

### Never pitch (steady state)

> "We'll run a 70B model for you on our AWS GPUs for $3,500 a month."

---

## Collateral to build (GTM)

| Asset | Purpose |
|-------|---------|
| **TCO one-pager** | Copilot vs hosted wedge vs on-prem turnkey (3-year) |
| **Hardware bundle sheet** | Dept tier specs + CapEx from hardware-sizing |
| **Migration one-pager** | Hosted pilot → on-prem profile switch (technical + commercial) |
| **Break-even slide** | 2 months cloud GPU rent = owned L40S box |

---

## Sensitivity — when hosted wedge still wins

| Situation | Prefer hosted wedge |
|-----------|---------------------|
| No CapEx approval this quarter | Yes |
| Internal efficiency (Adneo) not client-matter sovereignty | Yes |
| Need logo in 30 days | Yes |
| Procurement cycle for hardware > 90 days | Yes — hosted bridge only |
| Law firm post-incident / partner mandate on client data | **No** — lead on-prem |
| Buyer asks for open-source models only | **No** — on-prem |

---

## Model assumptions (validate)

| Assumption | Value | Validate by |
|------------|-------|-------------|
| EKS infra (shared) | $600–800/mo | AWS Cost Explorer after first deploy |
| Gemini 15-user pilot | $100–500/mo | LiteLLM spend logs |
| AWS 4× GPU node group | $15–30k/mo | AWS pricing calculator, ap-southeast-2 |
| Dept GPU CapEx | $15–40k | Vendor quotes (Leader, Xion, local integrators) |
| Managed Lite margin target | ~40% | Only on shared hosted; not on GPU |

---

*Last updated: July 2026. Update after first on-prem deploy with actual hardware quotes and delivery hours.*
