# Information Security Policy

**DRAFT — REQUIRES AU LAWYER FACT-CHECK BEFORE CUSTOMER USE**

**Company:** Sovereign Warden Pty Ltd  
**Version:** 1.0  
**Effective date:** [DATE]  
**Owner:** [FOUNDER_NAME]  
**Review cycle:** Annual

---

## 1. Purpose

This policy defines how Sovereign Warden Pty Ltd ("the Company") protects information assets in the delivery and operation of the Sovereign Warden platform ("the Platform").

---

## 2. Scope

This policy applies to:

- all Company personnel (founder, contractors, resident director);
- the Platform in both hosted (AU) and on-premises deployment profiles;
- customer data processed under a Statement of Work and Data Processing Addendum; and
- Company systems used for development, operations, and business functions.

---

## 3. Data classification

| Level | Description | Examples | AI usage |
|-------|-------------|----------|----------|
| **Public** | Approved for external release | Marketing materials, website content | Allowed |
| **Internal** | Company-wide, not public | Business plans, architecture docs | Allowed on internal systems |
| **Confidential** | Restricted access | Customer contracts, financial data | Restricted — need-to-know |
| **Restricted** | Highly sensitive | Credentials, unredacted PII, health data | **Prohibited** in AI tools |

Customers define classification for their own data. The Platform supports role-based access to enforce restrictions.

---

## 4. Platform security

### 4.1 Architecture

The Platform uses a split client/server architecture:

- **Client:** AnythingLLM Desktop (Electron) — connects to central backend
- **Platform:** Dockerized services — AnythingLLM, LiteLLM, PostgreSQL, Redis, Nginx
- **Data:** Qdrant vector database, object storage (S3/MinIO)
- **Inference:** Profile-switchable — Gemini (POC) or vLLM/Ollama (on-prem)

See [architecture.md](../../../../architecture.md) for full details.

### 4.2 Data sovereignty

| Data type | Hosted (AU) | On-premises |
|-----------|-------------|-------------|
| Source documents | AU cloud storage | Customer infrastructure |
| Embeddings | AU Qdrant tenant | Local Qdrant |
| Chat history | AU PostgreSQL | Local PostgreSQL |
| LLM prompts | Gemini API (POC) — disclosed | Never leaves customer network |

### 4.3 Encryption

| Layer | Control |
|-------|---------|
| In transit | TLS 1.2+ for all client-server and API communications |
| At rest | Provider-managed encryption for hosted tenants; customer-managed for on-prem |
| Secrets | Environment variables and secrets manager; no credentials in source code |

### 4.4 Access control

| Role | Permissions |
|------|-------------|
| **Admin** | Full system configuration, user management, workspace setup |
| **Manager** | Workspace management, user assignment within workspace |
| **Default** | Chat access to assigned workspaces only |

- Authentication via platform login (username/password; SSO planned)
- Access reviews conducted quarterly
- Admin actions logged to audit trail

### 4.5 Audit logging

- LiteLLM logs all inference requests to PostgreSQL
- Warden Audit extension captures workspace-level events
- Logs retained for [12] months (configurable per customer)

---

## 5. Development security

| Control | Implementation |
|---------|----------------|
| Source code | Private git repository; access limited to authorised personnel |
| Dependencies | MIT/Apache stack; licence audit before enterprise deals |
| Secrets management | No secrets committed to git; `.env` files excluded |
| Change management | Git-based version control with commit history |

---

## 6. Vendor and subprocessor management

Third-party services used in Platform delivery are listed in the [subprocessor register](subprocessor-register.md). Customers are notified of subprocessors via the DPA.

---

## 7. Incident response

Security incidents are handled per the [Incident Response Plan](incident-response.md).

---

## 8. Business continuity

| Scenario | Mitigation |
|----------|------------|
| Hosted tenant outage | Provider-managed backups; target RTO [4] hours |
| On-prem failure | Customer-managed backups per deployment runbook |
| Key person risk | Documented runbooks; delivery engineer hire planned post-bridge |

---

## 9. Compliance posture (Year 1)

| Standard | Status |
|----------|--------|
| Privacy Act 1988 (Cth) | DPA template aligned |
| ISO 27001 | Scoping planned (angel bridge) |
| IRAP | Not pursued Year 1 |
| SOC 2 | Not required for mid-market ICP |
| Essential Eight | Documented in architecture (Phase 3 target) |

---

## 10. Policy review

This policy is reviewed annually or upon material changes to the Platform architecture. Next review: [DATE + 1 year].

---

## 11. Contact

**Security contact:** [SECURITY_EMAIL]  
**Company:** Sovereign Warden Pty Ltd

---

*Adapted from [demo/documents/security-policy.md](../../../../../demo/documents/security-policy.md). Lawyer fact-check required before sharing with customers or investors.*
