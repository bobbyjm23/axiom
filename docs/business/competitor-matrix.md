# Competitor Matrix — Sovereign Warden Platform

**Version:** 1.0  
**Date:** July 2026  
**Parent document:** [sovereign-warden-business-plan.md](sovereign-warden-business-plan.md)

This matrix compares Sovereign Warden Platform against direct and indirect competitors in the Australian enterprise AI market. Pricing for competitors is largely opaque (custom quotes) unless publicly listed.

---

## Category Overview

| Category | Competitors | Threat level | Our response |
|----------|-------------|--------------|--------------|
| Cloud SaaS AI | Microsoft Copilot, ChatGPT Enterprise, Google Gemini | High (default choice) | TCO comparison; sovereignty narrative |
| AU sovereign cloud SaaS | Macquarie Launch AI | Medium | Employee UX; client-owned infra |
| AU sovereign on-prem | Cetus AI, Premya, Allayze, Torrens AI | High (direct) | Pilot speed; transparent pricing; UX |
| Global SI / dev shops | TechAhead, DEV.co, local MSPs | Low–Medium | Productised platform; lower cost |

---

## Feature Comparison Matrix

| Feature | **Sovereign Warden Platform** | **Microsoft Copilot** | **ChatGPT Enterprise** | **Macquarie Launch AI** | **Cetus AI (Songlines)** | **Premya** | **Allayze** |
|---------|---------------------------|----------------------|------------------------|-------------------------|--------------------------|------------|-------------|
| **Deployment model** | On-prem, hybrid POC, air-gap | Cloud SaaS (M365) | Cloud SaaS (OpenAI) | AU sovereign private cloud | On-prem, private cloud, air-gap | On-prem appliance | On-prem, air-gap, classified cloud |
| **Employee chat UX** | AnythingLLM Desktop (ChatGPT-class) | M365 apps (Word, Teams, Outlook) | ChatGPT web/app | API-centric | Control plane + gateway | Secure web interface | Custom / project-based |
| **RAG / document Q&A** | Yes, with citations | SharePoint/Graph RAG | Yes, with connectors | Yes (platform-dependent) | Yes | Yes | Yes |
| **Agents / tool use** | Yes (AnythingLLM agents) | M365 Copilot agents | Custom GPTs, limited agents | Platform-dependent | Yes (Songlines Control) | Limited | Project-dependent |
| **RBAC / multi-user** | Admin / Manager / Default | M365 roles + admin centre | Workspace admin | Enterprise admin | Enterprise RBAC | SSO, RBAC, audit | RBAC, mTLS, SAML |
| **SSO (Entra ID)** | Phase 2 (oauth2-proxy) | Native M365 | SAML/OIDC | Enterprise SSO | Enterprise SSO | Yes | Entra ID, LDAP |
| **White-label branding** | Yes (logo, name, theme) | Microsoft branding | OpenAI branding | Macquarie branding | Cetus branding | Premya branding | Client branding |
| **Air-gap capable** | Yes (Phase 3 K8s) | No | No | No (private cloud) | Yes | Yes | Yes |
| **Data stays in AU** | Yes (on-prem profile) | No (US processing) | No (US processing) | Yes (AU data centres) | Yes (on-prem) | Yes (on-prem) | Yes (on-prem) |
| **Prompts leave org network** | No (on-prem profile) | Yes (always) | Yes (always) | Depends on config | No (on-prem) | No | No |
| **Open-weight models** | Llama, Mistral, Qwen via LiteLLM | GPT-4 (OpenAI) | GPT-4 (OpenAI) | Platform-dependent | Llama, Mistral | Llama 70B+ | Llama, Mistral, Qwen |
| **Model provider lock-in** | Low (LiteLLM abstraction) | High (Microsoft/OpenAI) | High (OpenAI) | Medium | Low | Low | Low |
| **POC → production path** | Profile switch (zero code change) | N/A (same SaaS) | N/A (same SaaS) | Platform migration | Phased (Control → Gateway → Platform) | Appliance scaling | Custom project |
| **SharePoint ingest** | Phase 2 (scaffolded) | Native (Graph API) | Via connectors | Platform-dependent | Enterprise ecosystem | Not advertised | Project-dependent |
| **Audit logging** | LiteLLM logs → PostgreSQL | M365 compliance centre | OpenAI admin logs | Platform logs | Immutable audit trails | Audit pack | Immutable log, signed artefacts |
| **IRAP-ready** | Not yet (aligned docs planned) | IRAP assessed (M365) | Not IRAP | Not advertised | IRAP evidence packages | Not advertised | IRAP-aligned |
| **Essential Eight aligned** | Documented (Phase 3) | Microsoft alignment | Not advertised | Not advertised | Yes | Not advertised | Yes |
| **Desktop app (native)** | Yes (Electron, Option B) | M365 desktop apps | No (web/mobile) | No | No | No | No |
| **Time to first demo** | Days (POC built) | Days (M365 tenant) | Days (OpenAI account) | Weeks (engagement) | Weeks (engagement) | Weeks (engagement) | Weeks–months (project) |
| **Time to paid pilot** | 2–4 weeks (deployment) | N/A (trial licenses) | N/A (trial) | 4–8 weeks | 4–8 weeks | 4–8 weeks | 8–14 weeks |

**Legend:** Yes = available today; Phase N = on roadmap; Not advertised = not found in public materials.

---

## Pricing Comparison

| Competitor | Pricing model | Public pricing | Estimated Year 1 cost (1,000 users) | Notes |
|------------|---------------|----------------|---------------------------------------|-------|
| **Sovereign Warden Platform** | Pilot + deploy + support | Yes (see business plan) | ~$528k (pilot + deploy + support + hardware) | Year 2+: ~$63k/year support only |
| **Microsoft Copilot** | Per-seat/month SaaS | Yes: ~AU$45/user/month (ex GST) | ~$540k/year (licenses only) | Requires M365 E3/E5 base license |
| **ChatGPT Enterprise** | Per-seat/month SaaS (custom) | No (negotiated) | ~$720k–900k/year (est. US$60/user) | 150-seat minimum; annual contract |
| **Google Gemini (Workspace)** | Bundled / add-on | Partial | ~$168k–252k/year (est. US$14–21/user) | Bundled into Workspace tiers |
| **Macquarie Launch AI** | Managed service / API | No (custom quote) | Unknown (likely $200k–500k/year) | Managed sovereign cloud; no per-seat public pricing |
| **Cetus AI (Songlines)** | Phased platform license + services | **Yes — $9,995/mo Control** (+$10k/mo Gateway; Platform contact sales) | ~$120k–240k/yr SaaS (+ Orchestrate services) | Control → Gateway → Platform journey. See [cetus-songlines-competitor-analysis.md](strategy/cetus-songlines-competitor-analysis.md) |
| **Premya** | Appliance + managed service | No (custom quote) | Unknown (likely $150k–400k Year 1) | No per-seat metering; appliance model |
| **Allayze** | Project-based deployment | No (custom quote) | Unknown (likely $200k–600k) | Defence/gov focus; high-assurance premium |
| **TechAhead / DEV.co** | Project-based (global SI) | Partial: pilots $60k–120k | $120k–600k+ depending on scope | No productised platform; custom build |

### Pricing Position Map

```
Cost (Year 1, 1,000 users)
│
│  ChatGPT Enterprise ████████████████████████████ ~$720k+
│  Cetus AI (est.)    ████████████████████████ ~$500k+
│  Copilot            ██████████████████████ ~$540k
│  Sovereign Warden       █████████████████████ ~$528k
│  Allayze (est.)     ████████████████████ ~$400k+
│  Premya (est.)      ████████████████ ~$300k+
│  Macquarie (est.)   ██████████████ ~$250k+
│
└──────────────────────────────────────────────
  Low                                          High
```

**Key insight:** Sovereign Warden Year 1 cost is comparable to Copilot but Year 2+ drops to ~12% of Copilot annual cost. Against on-prem competitors, transparent fixed-price pilot ($55k–120k) is a differentiator in a market where all pricing is opaque.

---

## Positioning Comparison

| Dimension | Sovereign Warden | Copilot | Cetus AI | Premya | Macquarie |
|-----------|-------------|---------|----------|--------|-----------|
| **Primary message** | "Infrastructure you own" | "AI in the apps you use" | "AI governance control plane" | "Private AI appliance" | "AU sovereign cloud AI" |
| **Target buyer** | CISO + CIO | CIO + business units | CISO + procurement | CIO + CTO | CIO + CDO |
| **Buyer trigger** | Data sovereignty mandate | M365 productivity | AI spend visibility + compliance | Cost per token at scale | Data residency without CapEx |
| **Sales motion** | Paid pilot → deploy | License expansion | Phased platform journey | Appliance + managed service | Managed cloud subscription |
| **Competitive wedge** | Employee UX + pilot speed | Ecosystem integration | Inline policy enforcement | No per-seat metering | No hardware to manage |
| **Weakness to exploit** | — | US data processing; per-seat cost | Complex phased journey; no desktop UX | WA-only presence; opaque pricing | Multi-tenant; no air-gap |
| **Strength to respect** | — | Brand, distribution, M365 integration | IRAP evidence, gov relationships | Appliance simplicity, TCO narrative | Brand (Macquarie), managed service |

---

## Win / Loss Scenarios

### Where We Win

| Scenario | Why we win | Competitor displaced |
|----------|-----------|---------------------|
| Regulated enterprise wants employee chat UX + sovereignty | Only offering with ChatGPT-class desktop + on-prem path | Cetus (control plane only), custom builds |
| M365-heavy org balking at Copilot cost for 500+ seats | 88% lower Year 2+ cost; same RAG over SharePoint (Phase 2) | Copilot |
| CISO requires air-gap for Confidential data | Full air-gap architecture documented | Copilot, ChatGPT, Macquarie |
| Innovation team wants 6-week proof, not 6-month project | Paid pilot at fixed price; platform already built | Global SIs, Allayze |
| Board wants CapEx asset, not recurring SaaS | Hardware ownership; depreciation vs OpEx | All cloud SaaS |

### Where We Lose

| Scenario | Why we lose | Competitor that wins |
|----------|------------|---------------------|
| Org already all-in on M365; Copilot "good enough" | Zero friction; IT already manages M365 | Copilot |
| Government requires IRAP assessment | We don't have it yet | Cetus, Allayze |
| Buyer wants zero infrastructure management | Managed service model | Macquarie, Premya managed tier |
| Buyer prioritises frontier model quality | GPT-4/Claude still ahead of open models for complex reasoning | ChatGPT Enterprise, Copilot |
| Procurement requires established vendor with 3+ references | We have zero references | Any incumbent |
| Price-sensitive SMB (<100 users) | Our model doesn't scale down economically | Copilot Business, ChatGPT Team |

---

## Strategic Recommendations

1. **Do not compete head-on with Copilot** in M365-native workflows (email drafting in Outlook, Teams meeting summaries). Compete on **sovereign knowledge work** (RAG over internal documents, policy queries, legal research).
2. **Do not compete with Cetus on IRAP** in Year 1. Target commercial regulated enterprises where IRAP is desirable but not mandatory.
3. **Lead every sales conversation with the 15-minute demo** — the employee UX is the most tangible differentiator against Cetus (control plane) and Macquarie (API platform).
4. **Publish pilot pricing** — transparency is a differentiator in a market where every competitor requires "contact us for pricing."
5. **Build the TCO calculator** as standard discovery collateral — the Copilot cost anchor is the most compelling financial argument.

---

## Sources

| Competitor | Source | Date accessed |
|------------|--------|---------------|
| Microsoft Copilot | microsoft.com/en-au/microsoft-365-copilot/pricing | July 2026 |
| ChatGPT Enterprise | openai.com/enterprise (market reports) | July 2026 |
| Cetus AI | cetusai.com.au, cetusai.com.au/songlines-platform.html | July 2026 |
| Premya | premya.ai | July 2026 |
| Macquarie Launch AI | macquariecloudservices.com/data-ai/launch-ai | July 2026 |
| Allayze | allayze.com.au/solutions/secure-ai | July 2026 |
| TechAhead | techaheadcorp.com/services/custom-llm-development | July 2026 |
| DEV.co | dev.co/ai/private-llm | July 2026 |

*Competitor pricing marked "estimated" is based on market reports and industry benchmarks, not confirmed quotes. Revalidate before investor presentations.*
