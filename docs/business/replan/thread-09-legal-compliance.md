# Agent Thread 9: Legal, Compliance, and Risk

**Purpose:** De-risk regulated-market story without over-investing pre-revenue.

**Status:** Draft — entity status and insurance require founder confirmation.

---

## Key Decisions

| Decision | Recommendation |
|----------|----------------|
| IRAP-aligned docs start | **Month 12** (Track B prep) — not blocking Track A |
| Pre-first-customer legal spend | **~$3–5k** (entity + SOW review + insurance) |
| Compliance spend deferred to seed | **~$90k** for IRAP + ISO scoping at seed |
| Vertical compliance focus Year 1 | Law + accounting: vendor questionnaire + DPA |

---

## Decision Questions and Answers

| # | Question | Answer |
|---|----------|--------|
| 9.1 | Pty Ltd + IP assigned? | **FOUNDER INPUT REQUIRED** — action plan below |
| 9.2 | Insurance before first client? | **PI + cyber recommended** — est. **$3–8k/yr** for startup |
| 9.3 | Law firm security review asks? | Data residency, subprocessors, access control, audit logs, DPA, breach notification |
| 9.4 | Pass vendor questionnaire today? | **Partial** — demo [security-policy.md](../../../demo/documents/security-policy.md) helps; gaps: formal SOC, pen test, DPA template |
| 9.5 | Compliance deferred to seed? | IRAP pack, ISO 27001, formal pen test — defer; basic security docs + DPA required now |
| 9.6 | Open-source copyleft risk? | **Low** — core stack MIT/Apache; audit recommended before enterprise |

---

## Entity Action Plan

| Step | Action | Est. cost | Timeline |
|------|--------|-----------|----------|
| 1 | Register **Sovereign Warden Pty Ltd** (or chosen name) | $500–1,000 | Week 1 |
| 2 | Founder IP assignment deed (code, docs, brand) | $1,500–2,500 | Week 2 |
| 3 | Shareholder agreement (if co-founder later) | $2,000+ | Before co-founder |
| 4 | Standard contracts: MSA, SOW, DPA | $2,000–3,000 | Before first SOW |
| 5 | PI + cyber insurance quotes | $3,000–8,000/yr | Before first SOW |

**FOUNDER INPUT:** Mark each step complete with date.

---

## Compliance Readiness Checklist

### Track A (required before first paid client)

| Item | Status | Owner |
|------|--------|-------|
| Pty Ltd registered | ⬜ FOUNDER | Founder |
| IP assigned to company | ⬜ FOUNDER | Founder |
| Professional indemnity insurance | ⬜ | Founder |
| Cyber liability insurance | ⬜ | Founder |
| MSA template | ⬜ | Lawyer |
| QuickStart SOW template | ⬜ | Founder + lawyer |
| DPA (Privacy Act aligned) | ⬜ | Lawyer |
| Security one-pager for clients | 🟡 Partial | Adapt security-policy.md |
| Data flow diagram | ✅ | architecture.md |
| Incident response outline | ⬜ | Draft from security-policy |

### Track B (seed / Month 12+)

| Item | Status | Est. cost |
|------|--------|-----------|
| IRAP-aligned documentation | ⬜ | $25k pre-seed + $90k seed |
| ISO 27001 scoping | ⬜ | Part of seed compliance budget |
| Penetration test report | ⬜ | $15–25k |
| Essential Eight mapping | 🟡 Documented Phase 3 | In architecture |

---

## Law Firm Security Review (9.3)

Typical mid-tier firm vendor assessment:

| Question area | Our answer source | Gap |
|---------------|-------------------|-----|
| Where is data processed? | POC: Gemini (disclose); on-prem path available | Must disclose POC subprocessors |
| Who can access data? | RBAC; admin audit | Document role matrix |
| Encryption at rest/transit | TLS; Postgres; Qdrant | Document in security pack |
| Subprocessors | Google (POC), Qdrant Cloud if used | List in DPA |
| Audit logging | LiteLLM → PostgreSQL | Export procedure TBD |
| Breach notification | | **Draft clause in DPA** |
| Right to delete | Workspace admin can delete | Document procedure |

---

## Open-Source License Audit (9.6)

| Component | License | Copyleft risk |
|-----------|---------|---------------|
| AnythingLLM | MIT | None |
| LiteLLM | MIT | None |
| Qdrant | Apache 2.0 | None |
| PostgreSQL | PostgreSQL License | None |
| vLLM | Apache 2.0 | None |
| Electron | MIT | None |

**Action:** Run `license-checker` or similar before enterprise deals; add NOTICE file to distributions.

---

## Contract Structure

| Document | Purpose |
|----------|---------|
| **MSA** | Master terms, liability cap, IP, confidentiality |
| **SOW** | Scope, price, timeline, acceptance criteria per QuickStart/Pilot |
| **DPA** | Privacy Act; subprocessor list; data handling |
| **Support agreement** | Annual support tier |

---

## Output Checklist

- [x] Compliance readiness checklist
- [x] Entity action plan with costs
- [x] Law firm security review prep
- [x] OSS license summary
- [ ] Entity registered (founder)
- [ ] Insurance bound (founder)
- [ ] SOW/DPA templates signed off by lawyer (founder)
