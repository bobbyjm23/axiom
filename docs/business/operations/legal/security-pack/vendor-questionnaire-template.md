# Vendor Security Questionnaire — Response Template

**DRAFT — REQUIRES FOUNDER COMPLETION PER ENGAGEMENT**

**Purpose:** Pre-filled responses for customer vendor security assessments (Adneo, law firms, accounting firms). Customise per questionnaire format.

---

## Company information

| Field | Response |
|-------|----------|
| Company name | Sovereign Warden Pty Ltd |
| ABN | [ABN] |
| ACN | [ACN] |
| Registered address | [REGISTERED_OFFICE_ADDRESS] |
| Website | [WEBSITE_URL] |
| Primary contact | [FOUNDER_NAME], [EMAIL] |
| Security contact | [SECURITY_EMAIL] |
| Date established | [DATE] |
| Number of employees | 1 (founder) + contractors as needed |

---

## 1. Data handling

| Question | Response | Reference |
|----------|----------|-----------|
| Where is data stored? | [AU-hosted tenant in Australia / Customer on-premises infrastructure] | [architecture.md](../../../../architecture.md) |
| Where is data processed? | POC: chat prompts sent to Google Gemini API (US). Documents and embeddings remain in designated storage. On-prem: all processing local. | [subprocessor-register.md](subprocessor-register.md) |
| Who can access customer data? | RBAC: Admin, Manager, Default roles. Provider admin access for support only, with customer authorisation. | [security-policy.md](security-policy.md) Section 4.4 |
| Is data encrypted in transit? | Yes — TLS 1.2+ | [security-policy.md](security-policy.md) Section 4.3 |
| Is data encrypted at rest? | Yes — provider-managed (hosted) or customer-managed (on-prem) | [security-policy.md](security-policy.md) Section 4.3 |
| Data retention period | Duration of contract + 30 days, then deleted | [dpa-template.md](../templates/dpa-template.md) |
| Data deletion procedure | Customer admin can delete workspaces; Provider deletes tenant data within 30 days of contract end | [dpa-template.md](../templates/dpa-template.md) |

---

## 2. Security controls

| Question | Response | Reference |
|----------|----------|-----------|
| Do you have a security policy? | Yes — v1.0 | [security-policy.md](security-policy.md) |
| Do you have an incident response plan? | Yes | [incident-response.md](incident-response.md) |
| Do you perform access reviews? | Quarterly | [security-policy.md](security-policy.md) Section 4.4 |
| Do you maintain audit logs? | Yes — LiteLLM inference logs + Warden Audit extension | [security-policy.md](security-policy.md) Section 4.5 |
| Penetration testing? | Planned at seed stage; not yet conducted | [legal-checklist.md](../legal-checklist.md) Track B |
| SOC 2 / ISO 27001? | ISO scoping planned (angel bridge); not certified Year 1 | [legal-and-compliance.md](../../legal-and-compliance.md) |
| Vulnerability management? | Dependency monitoring; git-based change control | [security-policy.md](security-policy.md) Section 5 |

---

## 3. Subprocessors

| Question | Response | Reference |
|----------|----------|-----------|
| Do you use subprocessors? | Yes — see register | [subprocessor-register.md](subprocessor-register.md) |
| Current subprocessors | Google (Gemini API — POC), [hosting provider], Qdrant Cloud (if used) | |
| How are customers notified of changes? | 30 days' written notice per DPA | [dpa-template.md](../templates/dpa-template.md) Section 7 |
| Subprocessor agreements? | Provider requires subprocessors to meet equivalent security standards | |

---

## 4. Privacy and compliance

| Question | Response | Reference |
|----------|----------|-----------|
| Privacy Act compliance? | Yes — DPA aligned with APPs | [dpa-template.md](../templates/dpa-template.md) |
| Notifiable Data Breaches? | 24-hour notification to customer; OAIC if required | [incident-response.md](incident-response.md) Section 4.4 |
| Data Processing Agreement available? | Yes | [dpa-template.md](../templates/dpa-template.md) |
| Cross-border data transfers? | POC: chat prompts to US (Gemini). Disclosed and consented. On-prem: no transfers. | [dpa-template.md](../templates/dpa-template.md) Section 8 |

---

## 5. Business continuity

| Question | Response |
|----------|----------|
| Backup procedures? | Hosted: provider-managed daily backups. On-prem: customer-managed per runbook. |
| Recovery time objective (RTO)? | Hosted: 4 hours target. On-prem: customer-dependent. |
| Key person dependency? | Solo founder; delivery engineer hire planned post-bridge. Documented runbooks. |

---

## 6. Insurance

| Question | Response |
|----------|----------|
| Professional indemnity? | To be bound post-first payment |
| Cyber liability? | To be bound post-first payment |
| Certificate available? | ⬜ Post-binding |

---

## 7. Open-source components

| Question | Response |
|----------|----------|
| Open-source used? | Yes — MIT/Apache stack (AnythingLLM, LiteLLM, Qdrant, PostgreSQL, vLLM, Electron) |
| Copyleft risk? | None — all permissive licences |
| Licence audit? | Planned before enterprise deals |

---

## Usage

1. Copy relevant sections into customer questionnaire
2. Customise deployment profile (hosted vs on-prem) per engagement
3. Update subprocessors and insurance status before submission
4. Attach security policy and incident response plan as supporting documents

---

*Complete per customer questionnaire. Lawyer fact-check before first submission to Adneo or law firms.*
