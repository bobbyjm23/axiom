# Incident Response Plan

**DRAFT — REQUIRES AU LAWYER FACT-CHECK BEFORE CUSTOMER USE**

**Company:** Sovereign Warden Pty Ltd  
**Version:** 1.0  
**Effective date:** [DATE]  
**Owner:** [FOUNDER_NAME]

---

## 1. Purpose

This plan defines how Sovereign Warden Pty Ltd detects, responds to, and recovers from security incidents affecting the Platform or customer data.

---

## 2. Scope

Applies to:

- security incidents affecting hosted AU tenants;
- incidents reported by on-premises customers;
- incidents affecting Company systems (development, operations, business); and
- data breaches involving personal information (Notifiable Data Breaches scheme).

---

## 3. Incident classification

| Severity | Description | Example | Response time |
|----------|-------------|---------|---------------|
| **P1 — Critical** | Active breach; customer data exfiltrated or exposed | Unauthorised database access | Immediate (< 1 hour) |
| **P2 — High** | Potential breach; vulnerability actively exploited | Compromised admin credentials | < 4 hours |
| **P3 — Medium** | Security event; no confirmed data exposure | Failed intrusion attempt, malware on dev machine | < 24 hours |
| **P4 — Low** | Policy violation; no security impact | User sharing credentials internally | < 72 hours |

---

## 4. Response procedure

### 4.1 Detect

| Source | Action |
|--------|--------|
| Monitoring alerts | Review LiteLLM audit logs, platform health checks |
| Customer report | Log via [SECURITY_EMAIL] |
| Internal discovery | Report to founder immediately |
| Third-party notification | Assess and classify within 1 hour |

### 4.2 Triage (within 1 hour for P1/P2)

1. Confirm the incident is genuine (not false positive)
2. Classify severity (P1–P4)
3. Identify affected systems and data
4. Determine if personal information is involved
5. Assign incident lead (founder until team grows)

### 4.3 Contain

| Action | Detail |
|--------|--------|
| Isolate affected systems | Disable compromised accounts; block suspicious IPs |
| Preserve evidence | Snapshot logs; do not delete audit trail |
| Prevent spread | Rotate credentials; patch vulnerability |
| Communicate internally | Notify resident director if material |

### 4.4 Notify

| Audience | Timeline | Method |
|----------|----------|--------|
| Affected customers | Within **24 hours** of confirmation | Email to customer security contact |
| OAIC (if NDB applies) | As soon as practicable | Online notification |
| Affected individuals | As soon as practicable | Via customer (controller) or directly |
| Investors (if material) | Within 48 hours | Direct communication |

**Notifiable Data Breaches (NDB):** If a data breach is likely to result in serious harm to individuals, notify the OAIC and affected individuals per the Privacy Act 1988 (Cth).

### 4.5 Eradicate and recover

1. Remove root cause (patch, reconfigure, rotate secrets)
2. Restore from clean backups if needed
3. Verify systems are clean before returning to service
4. Monitor for recurrence (72 hours elevated monitoring)

### 4.6 Post-incident review

Within **5 business days** of resolution:

- Document timeline and root cause
- Identify preventive measures
- Update security policy and runbooks if needed
- Share lessons learned with affected customers (as appropriate)

---

## 5. Customer notification template

```
Subject: Security Incident Notification — Sovereign Warden

Dear [CUSTOMER_CONTACT],

We are writing to inform you of a security incident affecting [DESCRIPTION].

What happened: [BRIEF_DESCRIPTION]
When: [DATE/TIME]
What data was affected: [DATA_TYPES / "No customer data was accessed"]
What we are doing: [CONTAINMENT_AND_REMEDIATION]
What you should do: [CUSTOMER_ACTIONS_IF_ANY]

We take security seriously and are available to discuss this incident.
Contact: [SECURITY_EMAIL]

Sovereign Warden Pty Ltd
```

---

## 6. Roles and responsibilities

| Role | Person | Responsibility |
|------|--------|----------------|
| Incident lead | [FOUNDER_NAME] | Overall response coordination |
| Technical response | [FOUNDER_NAME] | Containment, eradication, recovery |
| Customer communication | [FOUNDER_NAME] | Customer and OAIC notification |
| Legal advice | [LAWYER_NAME] | NDB assessment, regulatory notification |

*Expand roles when delivery engineer (#1) is hired.*

---

## 7. Contact

**Report security incidents:** [SECURITY_EMAIL]  
**Response hours:** Business hours (AU/NZ); P1 incidents addressed outside hours

---

*Aligned with DPA breach notification clause ([dpa-template.md](../templates/dpa-template.md)). Lawyer fact-check required before customer use.*
