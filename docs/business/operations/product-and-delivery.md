# Product and Delivery

**Product:** Productised deployment stack — not custom SI  
**Production-ready:** ~3–4 weeks founder time  
**QuickStart target:** &lt;5 business days by Month 6

---

## Product moat

> Sovereign Warden is a productised deployment stack with ChatGPT-class desktop UX, profile-switch migration from cloud POC to on-prem with **zero application code changes**, and a documented QuickStart runbook that compresses competitor pilot timelines from 8–14 weeks to days.

---

## Two SKUs (same platform)

| SKU | Profile | Buyer | Competes with |
|-----|---------|-------|---------------|
| **Option B — Hosted (AU)** | Cloud POC | Fast pilot, no CapEx | Copilot, Macquarie |
| **Option A — On-prem** | K8s / air-gap | Full sovereignty | Cetus, Premya |

Migration = config profile switch. No rebuild. **Commercial goal:** every hosted QuickStart should have a documented path to on-prem production within 45–90 days of pilot success.

Economics: [hosted-vs-onprem-cogs.md](../finance/hosted-vs-onprem-cogs.md) · Hardware: [hardware-sizing.md](../../../hardware-sizing.md)

---

## Day 1 QuickStart deliverables

| Component | Customer gets |
|-----------|---------------|
| Platform | AnythingLLM + LiteLLM + Postgres + Redis + Nginx |
| Inference | Gemini (POC) or client GPU path documented |
| Vector store | Qdrant |
| Desktop app | Forked AnythingLLM Electron |
| Workspaces | General, Company Knowledge, Admin-only Agent |
| Security narrative | Adapted security policy template |
| Onboarding | User invites; 30-min admin training |

**Not included Day 1:** SSO, SharePoint sync, air-gap, IRAP pack.

---

## Feature classification

### Deal-winners

1. Desktop ChatGPT UX — employees adopt; API-only tools fail
2. POC → on-prem profile switch — de-risks procurement
3. Speed + transparent pricing — weeks not months

### Table stakes

1. RAG with citations
2. RBAC / workspace isolation
3. Prompt and request audit logging

### Roadmap (sold, not blocking Year 1)

- Entra ID SSO
- SharePoint / Confluence ingest
- Air-gap K8s
- IRAP evidence package

---

## QuickStart runbook

| Step | Activity | Est. hours |
|------|----------|------------|
| 0 | Kickoff; confirm doc corpus | 1 |
| 1 | Provision env | 2–4 |
| 2 | `bootstrap-poc.sh` + health checks | 1–2 |
| 3 | Configure 3 workspaces | 1–2 |
| 4 | Branding (logo, name) | 1–2 |
| 5 | Ingest client documents | 4–8 |
| 6 | User accounts / invites | 1–2 |
| 7 | Desktop installer distribution | 1 |
| 8 | Admin training | 0.5 |
| 9 | User onboarding comms | 1 |
| 10 | Week 2–4 check-in; success report | 2–3 |
| **Total** | | **15–26 hrs** |

**Margin cap:** ~32 hours at $12k QuickStart (65% GM at $150/hr loaded).

---

## Delivery handoff (before start)

- Signed QuickStart SOW + 50% deposit
- Executive sponsor named
- Technical contact named
- Document corpus received (min 10 files)
- Deployment profile chosen (cloud POC default)

---

## Pilot success metrics

| Metric | Target |
|--------|--------|
| User activation | ≥70% of invited users |
| Use-case wins | ≥3 documented |
| NPS | ≥7 |
| CISO sign-off | Data-flow approved |

---

## Bottlenecks and fixes

| Bottleneck | Fix |
|------------|-----|
| Client slow on documents | SOW prerequisite: 10 docs at kickoff |
| Manual ingest | Bulk upload script; SharePoint Phase 2 |
| Founder scheduling onboarding | Templatise comms; engineer runs training |

---

## Open-source dependencies

| Dependency | License | Mitigation |
|------------|---------|------------|
| AnythingLLM | MIT | Maintain fork; pin version |
| LiteLLM | MIT | Abstracts model routing |
| vLLM / Ollama | Apache 2.0 | Standard inference path |

---

*Architecture: [architecture.md](../../../architecture.md)*
