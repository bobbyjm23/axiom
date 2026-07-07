# Agent Thread 9: Legal, Compliance, and Risk

**Purpose:** De-risk regulated-market story without over-investing pre-revenue.

**Status:** Complete — July 2026 founder input. Entity/insurance execution TBD.

---

## Key Decisions

| Decision | Locked |
|----------|--------|
| IRAP / ISO | **Scoping + applications begin during angel bridge**; full certification budget at seed |
| Pre-first-customer legal spend | **~$2–4k** minimal (entity + IP deed + SOW/DPA fact-check) |
| Security pack | **Founder-authored**; lawyer fact-check before Adneo / angels |
| Insurance | Adneo vendor req first; bind post-first payment ($3–8k/yr budget approved) |
| Vertical compliance Year 1 | Law + accounting: vendor questionnaire + DPA |

---

## Decision Questions and Answers

| # | Question | Answer | Notes |
|---|----------|--------|-------|
| 9.1 | Pty Ltd + IP assigned? | **In progress** | DIN: check eligibility. Lawyer + accountant: will engage. IP personal (not NZ co). **Adneo conflict gap** |
| 9.2 | Insurance before first client? | **Adneo-led + post-payment** | Ask Adneo vendor req first; bind after first payment; $3–8k/yr budget approved |
| 9.3 | Contracts — minimal scope? | **SOW + DPA only** | Defer full MSA to customer #2; Adneo: free/discounted pilot → paid production |
| 9.4 | Pass vendor questionnaire today? | **Founder-led pack** | Founder drafts security/compliance policies; lawyer **fact-check** before Adneo / angels |
| 9.5 | IRAP / ISO timing? | **Bridge + seed** | ISO + IRAP **applications / scoping** funded from angel bridge; full cert spend at seed |
| 9.6 | Open-source copyleft risk? | **Low** | MIT/Apache stack; run license audit before enterprise |

---

## Entity Action Plan

**Current state:** Founder has a **NZ trading company**. Sovereign Warden will operate through a new **AU Pty Ltd**.

| Step | Action | Est. cost | Timeline | Status |
|------|--------|-----------|----------|--------|
| 0 | Obtain **Director ID** (ABRS) | $0 | Before registration | ⬜ **Check eligibility / process** |
| 1 | Register **Sovereign Warden Pty Ltd** (AU) + registered office | $500–1,000 | **Before Adneo SOW** | ⬜ Planned |
| 2 | **IP assignment deed** — founder → AU Pty Ltd (NZ co not in chain) | $1,500–2,500 | **Within 2 weeks of step 1** | ⬜ Planned — lawyer engaged |
| 3 | ABN + business bank account | $0–500 | Week 2–3 | ⬜ Accountant engaged |
| 4 | **Minimal contracts:** pilot SOW (Adneo) + short DPA | $1,000–1,500 | Before Adneo SOW | ⬜ Lawyer fact-check |
| 4b | Defer full MSA + support agreement | — | Customer #2+ | Deferred |
| 5 | PI + cyber insurance quotes | $3,000–8,000/yr | **After Adneo vendor req confirmed; bind post-first payment** | ⬜ Ask Adneo first |
| 6 | Shareholder agreement (if co-founder later) | $2,000+ | Before co-founder | ⬜ |
| 7 | **Security / compliance pack** (founder draft) | Founder time | Before Adneo / angels | ⬜ In progress |
| 8 | Lawyer **fact-check** security pack + contracts | $500–1,000 | Before Adneo / angels | ⬜ |
| 9 | **ISO + IRAP scoping / applications** (bridge-funded) | $15,000–25,000 | Months 1–6 post-bridge | ⬜ Planned |

**NZ trading company:** Retained for other activities; **does not hold Sovereign Warden IP** (founder personal → AU Pty Ltd via deed). Confirm shareholding structure with accountant.

**Adneo employment / conflict (9.1c — gap):**

| Status | Detail |
|--------|--------|
| ✅ | Written email declaring side project; acknowledgment founder **may work on something** outside employment |
| ⬜ | **No explicit conflict clearance** for Sovereign Warden as **vendor to Adneo** |
| **Action before SOW** | Obtain written OK for independent vendor relationship + board/exec sign-off on procurement path |

**Professional support:** AU corporate lawyer (~$2–2.5k minimal scope) and AU/NZ accountant — **will engage**.

---

## Compliance Readiness Checklist

### Track A (required before first paid client)

| Item | Status | Owner |
|------|--------|-------|
| Pty Ltd registered (AU) | ⬜ Planned — before Adneo SOW | Founder |
| IP assigned to AU Pty Ltd | ⬜ Planned — within 2 wks of registration | Founder |
| Professional indemnity insurance | ⬜ Post-first payment (after Adneo vendor req) | Founder |
| Cyber liability insurance | ⬜ Post-first payment (after Adneo vendor req) | Founder |
| MSA template | ⬜ **Deferred** — customer #2+ | — |
| Adneo pilot SOW (free/discounted → production) | ⬜ Draft + lawyer fact-check | Founder + lawyer |
| Short DPA (Privacy Act aligned) | ⬜ Draft + lawyer fact-check | Founder + lawyer |
| Security / compliance pack | ⬜ **Founder draft** | Founder — adapt [security-policy.md](../../../demo/documents/security-policy.md) |
| Lawyer fact-check (pack + contracts) | ⬜ Before Adneo / angels | Lawyer |
| Data flow diagram | ✅ | [architecture.md](../../architecture.md) |
| Incident response outline | ⬜ | Draft from security-policy |

### Track B — Bridge + seed (ISO / IRAP)

| Item | Status | Est. cost | Timing |
|------|--------|-----------|--------|
| ISO 27001 scoping + application prep | ⬜ Planned | $8–12k | **Angel bridge** (months 1–6) |
| IRAP-aligned scoping + application prep | ⬜ Planned | $10–15k | **Angel bridge** (months 1–6) |
| Full IRAP assessment | ⬜ | $90k+ | Seed |
| ISO 27001 certification | ⬜ | Part of seed compliance | Seed |
| Penetration test report | ⬜ | $15–25k | Seed / pre-law ICP |
| Essential Eight mapping | 🟡 Documented Phase 3 | — | In architecture |

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

## Contract Structure — Minimal Scope (locked)

| Document | Status | Notes |
|----------|--------|-------|
| **Pilot SOW (Adneo)** | **Now** | Free/discounted pilot → **paid production** later; case study + logo clause |
| **Short DPA** | **Now** | Privacy Act; subprocessor list (incl. Gemini POC); lawyer fact-check |
| **MSA** | **Deferred** | Customer #2+ or before first law-firm QuickStart |
| **Support agreement** | **Deferred** | At production conversion |
| **Paid QuickStart SOW ($12k)** | **Wk 7+** | Law/accounting ICP — standard founding terms |

### Adneo commercial path (9.3b)

1. **Phase 1:** Free or discounted pilot under pilot SOW (no or nominal fee).  
2. **Phase 2:** Production / Team deployment SOW with defined pricing after ROI proof.  
3. **Investor narrative:** Logo #1 + case study from Phase 1; revenue from Phase 2.

---

## Security Pack — Founder-Led (9.4)

Founder drafts from prior experience; lawyer fact-checks before Adneo approach or angel conversations.

| Document | Source / action |
|----------|-----------------|
| Security policy | Adapt [security-policy.md](../../../demo/documents/security-policy.md) |
| Data flow + subprocessors | [architecture.md](../../architecture.md) + Gemini/Qdrant disclosure |
| Access control / RBAC | Document role matrix from platform |
| Incident response | Draft from security-policy |
| Breach notification | Clause in DPA |
| Vendor questionnaire responses | Founder completes Adneo form when received |

**Gaps accepted pre-bridge:** No formal SOC2, no pen test (planned seed / pre-law outbound).

---

## Output Checklist

- [x] Compliance readiness checklist
- [x] Entity action plan with costs
- [x] Law firm security review prep
- [x] OSS license summary
- [x] SOW/DPA scope locked (founder) — minimal; MSA deferred
- [ ] Entity registered (founder)
- [ ] Insurance bound (founder) — post-first payment
- [ ] Security pack drafted + lawyer fact-checked (founder)
- [ ] Adneo vendor conflict clearance (founder)

---

## Legal Summary (One-Pager)

| Element | Locked answer |
|---------|---------------|
| **Entity** | AU Pty Ltd before Adneo SOW; NZ co holds no SW IP |
| **Lawyer scope** | IP deed + pilot SOW + short DPA fact-check (~$2–2.5k) |
| **Adneo commercial** | Free/discounted pilot → paid production |
| **Adneo conflict** | Side project acknowledged; **vendor clearance still required** |
| **Insurance** | Ask Adneo req; bind after first payment ($3–8k/yr) |
| **Security pack** | Founder drafts; lawyer fact-check before Adneo / angels |
| **ISO / IRAP** | Scoping + applications from **angel bridge** ($15–25k); full cert at seed |

---

## Next Actions

1. Check **Director ID** eligibility (ABRS).
2. Engage **AU lawyer** (minimal scope) + **accountant**.
3. Draft **security pack** from security-policy.md + architecture.md.
4. Register **AU Pty Ltd** + **IP deed**.
5. Obtain **Adneo vendor + conflict clearance** in writing.
6. Ask Adneo **vendor insurance requirements**.
7. Draft **pilot SOW** (free/discounted → production).
8. Lawyer **fact-check** pack + contracts → approach Adneo / angels.
9. Post-bridge: begin **ISO + IRAP scoping** from bridge budget.
