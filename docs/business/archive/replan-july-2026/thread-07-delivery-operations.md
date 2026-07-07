# Agent Thread 7: Delivery and Operations

**Purpose:** Prove scalable delivery without founder burnout.

**Status:** Draft — runbook exists in codebase; timing needs validation.

---

## Key Decisions

| Decision | Recommendation |
|----------|----------------|
| Max concurrent QuickStarts (solo founder) | **1** until hire #1 |
| Max concurrent QuickStarts (founder + engineer) | **2** per delivery person |
| Capacity cap rule | Stop selling when 2 pilots in delivery queue |
| Managed Lite ($2.5–5k/mo) | **Defer** until 3+ production customers |
| QuickStart deploy target | **&lt;5 business days** by Month 6 (C4) |

---

## Decision Questions and Answers

| # | Question | Answer |
|---|----------|--------|
| 7.1 | QuickStart bottlenecks? | Client doc readiness; env provisioning; branding; user onboarding scheduling |
| 7.2 | Documented vs in head? | Bootstrap script documented; workspace templates partial; SOW/handoff not final |
| 7.3 | Sales → delivery handoff? | **SOW template needed** — outline in business plan Appendix A |
| 7.4 | Client responsibilities in SOW? | Provide doc corpus (10+ docs); name admin; attend kickoff + training; network access if hosted |
| 7.5 | Pilot success metrics? | ≥70% user activation; ≥3 use-case wins; NPS ≥7; CISO data-flow sign-off |
| 7.6 | 2 concurrent QuickStarts solo? | **Breaks** — sales, support, and delivery contend; quality drops |

---

## QuickStart Runbook (Step-by-Step)

| Step | Activity | Owner | Est. hours | Automated? |
|------|----------|-------|------------|------------|
| 0 | Kickoff call; confirm doc corpus | Founder | 1 | No |
| 1 | Provision env (cloud POC or client VM) | Engineer | 2–4 | Partial |
| 2 | `bootstrap-poc.sh` + health checks | Engineer | 1–2 | **Yes** |
| 3 | Configure 3 workspaces from template | Engineer | 1–2 | Template |
| 4 | Apply branding (logo, name) | Engineer | 1–2 | Partial |
| 5 | Ingest client documents | Engineer + client | 4–8 | Manual Y1 |
| 6 | Create user accounts / invites | Engineer | 1–2 | Partial |
| 7 | Desktop installer distribution | Engineer | 1 | Docs exist |
| 8 | Admin training (30 min) | Founder | 0.5 | Slide deck TBD |
| 9 | User onboarding email + tips | Founder | 1 | Template TBD |
| 10 | Week 2–4 check-in; success report | Founder | 2–3 | Template TBD |
| **Total** | | | **15–26 hrs** | Target ≤20 by M6 |

---

## Bottleneck Analysis (7.1)

| Bottleneck | Severity | Fix |
|------------|----------|-----|
| Client slow on documents | High | SOW prerequisite: 10 docs at kickoff |
| Manual ingest | Medium | Bulk upload script; SharePoint Phase 2 |
| Branding customization | Low | Standard theme + logo only for QuickStart |
| Founder scheduling onboarding | Medium | Templatise comms; engineer runs training |
| No ticketing system | Low | Email + shared inbox until 5 customers |

---

## Sales → Delivery Handoff

### Required before delivery starts

- [ ] Signed QuickStart SOW + 50% deposit
- [ ] Executive sponsor named
- [ ] Technical contact named
- [ ] Document corpus received (min 10 files)
- [ ] Deployment profile chosen (cloud POC default)

### Handoff artefact

**Delivery packet** (create folder per client):

- SOW copy
- Contact list
- Branding assets
- Doc corpus location
- Env credentials (secure store)
- Success criteria checklist

---

## Support Model (Track A)

| Tier | Annual fee | Includes | SLA |
|------|------------|----------|-----|
| Support Standard | $6,000 | Email support business hours; quarterly check-in; platform updates | 2 business days |
| Support Plus | $12,000 | Above + 1 training refresh/yr; priority queue | 1 business day |
| Support Premium | $18,000 | Above + 4-hour critical incident | 4 hours critical |

**Excludes:** New workspaces, major scope changes, SSO implementation (change order).

---

## Capacity Model

| Team size | Max concurrent QuickStarts | Max concurrent Team Pilots | Quarterly throughput |
|-----------|---------------------------|------------------------------|---------------------|
| Solo founder | 1 | 0 | 3–4 QuickStarts |
| Founder + 1 engineer | 2 | 1 | 6–8 QuickStarts |
| Founder + 2 engineers (seed) | 4 | 2 | 12–16 QuickStarts |

**Rule:** 1 engineer supports max **8 active pilots/quarter** at 5-day deploy (seed target).

---

## Tooling Stack

| Function | Tool (recommended) | Status |
|----------|-------------------|--------|
| CRM / pipeline | HubSpot free or Notion | **FOUNDER INPUT** |
| SOW / contracts | DocuSign + templates | To build |
| Secrets / credentials | 1Password vault per client | Adopt |
| Monitoring | Uptime Kuma or similar | Optional QuickStart |
| Time tracking | Toggl / Clockify | **Required for C4 margin proof** |

---

## What Breaks at 2 Concurrent QuickStarts (Solo)

| Failure mode | Impact |
|--------------|--------|
| Sales pipeline stalls | No new fit calls during delivery crunch |
| Onboarding quality drops | Users don't activate; conversion suffers (K2) |
| Founder burnout | Kill criteria K5 |
| Margin overrun | Delivery &gt;32 hrs each → K3 |

**Mitigation:** Hard cap 1 concurrent; hire engineer at 2 signed SOWs.

---

## Output Checklist

- [x] QuickStart runbook outline
- [x] Capacity model
- [x] Support tier definition
- [x] Handoff checklist
- [ ] Timed dry-run (founder) — validates C4
- [ ] SOW templates adapted for Track A
- [ ] Success report template
