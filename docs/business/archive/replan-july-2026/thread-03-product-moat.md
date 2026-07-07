# Agent Thread 3: Product and Technical Moat

**Purpose:** Articulate what is product vs services, and what is defensible for investors.

**Status:** Complete (derived from codebase and existing docs).

---

## Moat Statement (Investor-Repeatable)

> Sovereign Warden is a **productised deployment stack** — not a custom SI project — with a ChatGPT-class desktop UX, profile-switch migration from cloud POC to on-prem with **zero application code changes**, and a documented 5-day QuickStart runbook that compresses competitor pilot timelines from 8–14 weeks to days.

---

## Decision Questions and Answers

| # | Question | Answer |
|---|----------|--------|
| 3.1 | Day 1 QuickStart without custom work? | Docker stack via `bootstrap-poc.sh`; 3 template workspaces; manual doc upload; native multi-user auth; desktop Electron client |
| 3.2 | Honest time to paid pilot today? | **5–10 business days** (internal POC: 1 day bootstrap; +client env, branding, doc ingest, onboarding) |
| 3.3 | 3 features that win vs 3 table stakes? | **Win:** Desktop ChatGPT UX, profile-switch sovereignty path, fixed-price speed. **Table stakes:** RAG+citations, RBAC, audit logging |
| 3.4 | AnythingLLM licensing fallback? | Maintain fork; upstream is MIT; worst case migrate UI layer or pin version; LiteLLM abstracts model routing |
| 3.5 | Repeatable runbook vs bespoke? | **~70% runbook / 30% bespoke** today; target 85% by Month 6 (C4) |
| 3.6 | Track B unlock milestone? | **SSO (Entra ID) + IRAP-aligned docs + air-gap K8s profile** — none required for Track A |
| 3.7 | oracle-ui product line? | **Internal tooling / demo pattern** — not a separate GTM SKU Year 1; AnythingLLM Desktop is customer-facing UX |

---

## Product Maturity Matrix

| Capability | Now | 6 months | 12 months |
|------------|-----|----------|-----------|
| POC Docker stack | ✅ Operational | Hardened multi-tenant demos | Automated QuickStart deploy |
| AnythingLLM Desktop (forked) | ✅ ChatGPT-class UX | Branded white-label | Auto-update channel |
| RAG + citations | ✅ Manual upload | Bulk ingest helpers | SharePoint connector (Phase 2) |
| RBAC (multi-user) | ✅ Native POC auth | Template roles | Entra ID SSO (Phase 2) |
| LiteLLM audit logging | ✅ PostgreSQL | Dashboard export | SIEM integration |
| On-prem inference (vLLM) | ✅ Profile switch | GPU sizing runbook | Standard hardware bundles |
| Air-gap K8s | Scaffolded | Documented | Production runbook |
| SharePoint ingest | Scaffolded | MVP for Track B | Production |
| IRAP-aligned docs | Not started | Begin Month 12 | Complete for Track B |
| SSO (Entra ID) | Phase 2 design | oauth2-proxy prod | Standard in Team Production |
| QuickStart deploy time | ~5–10 days | **&lt;5 days** (C4) | 2 days (scripted) |

---

## Day 1 QuickStart Deliverables (3.1)

From [architecture.md](../../../../architecture.md) and [bootstrap-poc.sh../../../../scripts/bootstrap-poc.sh):

| Component | Customer gets |
|-----------|---------------|
| Platform | AnythingLLM + LiteLLM + Postgres + Redis + Nginx |
| Inference | Gemini (POC profile) or client GPU path documented |
| Vector store | Qdrant (cloud or self-hosted per profile) |
| Desktop app | Forked AnythingLLM Electron — connects to backend |
| Workspaces | General, Company Knowledge, Admin-only Agent (templates) |
| Security narrative | Adapted from [security-policy.md](../../../../../demo/documents/security-policy.md) |
| Onboarding | User invites, 30-min admin training |

**Not included Day 1:** SSO, SharePoint sync, air-gap, IRAP pack.

---

## Feature Classification

### Deal-winners

1. **Desktop ChatGPT UX** — employees adopt; API-only tools fail
2. **POC → on-prem profile switch** — no rebuild; de-risks procurement
3. **Speed + transparent pricing** — QuickStart in weeks not months

### Table stakes

1. RAG with citations over firm documents
2. RBAC / workspace isolation
3. Prompt and request audit logging

### Roadmap (sold, not blocking Track A)

- Entra ID SSO
- SharePoint / Confluence ingest
- Air-gap K8s deployment
- IRAP evidence package

---

## Open-Source Dependency Risk (3.4)

| Dependency | License | Risk | Mitigation |
|------------|---------|------|------------|
| AnythingLLM | MIT | Fork drift, upstream direction | Maintain sovereign fork; desktop shell owned |
| LiteLLM | MIT | Low | Abstraction layer; swappable |
| Qdrant | Apache 2.0 | Low | Milvus alternative documented |
| vLLM / Ollama | Apache 2.0 | Low | Standard on-prem inference |

---

## Product vs Services Split

| Layer | Type | Margin implication |
|-------|------|-------------------|
| Bootstrap scripts + compose profiles | **Product** | High margin at scale |
| Desktop fork + branding | **Product** | High |
| Workspace templates + demo docs | **Product** | High |
| Client doc ingest + training | **Services** | Target 65% GM QuickStart |
| SSO / ingest customisation | **Services** | Team Production+ |
| Hardware procurement | **Pass-through** | 10–15% margin optional |

**Investor framing:** Services are the **wedge**; productised runbook is the **scale mechanism** trending toward platform leverage.

---

## oracle-ui (3.7)

| Attribute | Assessment |
|-----------|------------|
| Purpose | Next.js oracle browser — hybrid search, RAG chat over markdown corpora |
| Customer SKU? | **No** — Year 1 customer UX is AnythingLLM Desktop |
| Strategic value | Reference pattern for multi-oracle RAG; internal dogfooding |
| Future option | White-label doc portal for vertical packs (Year 2+) |

---

## Output Checklist

- [x] Product maturity matrix
- [x] Moat statement
- [x] Day 1 scope defined
- [x] oracle-ui positioning
- [ ] Validate 3.2 with timed dry-run (founder)
