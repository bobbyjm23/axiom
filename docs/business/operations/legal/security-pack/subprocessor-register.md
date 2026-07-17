# Subprocessor Register

**Company:** Sovereign Warden Pty Ltd  
**Last updated:** July 2026  
**Owner:** Founder

Current list of third parties that process customer data on behalf of Sovereign Warden. This register is referenced in the DPA and privacy policy. Customers are notified of changes per the DPA (30 days' notice).

---

## Active subprocessors

| Subprocessor | Service | Data processed | Location | Deployment phase | DPA status |
|------------|---------|----------------|----------|------------------|------------|
| Google (Gemini API) | LLM inference | Chat prompts and retrieved context chunks (not source documents) | United States | POC / pilot | Disclosed in DPA Schedule 1 |
| [CLOUD_HOSTING_PROVIDER] | AU-hosted tenant infrastructure (compute, storage, networking) | All customer data (hosted profile) | Australia | Production | ⬜ Confirm provider |
| Qdrant Cloud | Vector database (if used for hosted) | Document embeddings | [AU / US — specify] | POC / production | ⬜ Confirm if used |

---

## Not subprocessors (customer-controlled)

| Component | Notes |
|-----------|-------|
| On-premises deployment | All data on customer infrastructure — no Provider subprocessor for data storage |
| vLLM / Ollama (on-prem) | Inference runs on customer hardware |
| Local PostgreSQL | Customer-managed |
| Local Qdrant | Customer-managed |

---

## Development and business tools (no customer data)

| Tool | Purpose | Customer data? |
|------|---------|----------------|
| GitHub / git hosting | Source code repository | No |
| [EMAIL_PROVIDER] | Business email | No (unless support tickets contain customer info) |

---

## Subprocessor change log

| Date | Change | Customer notified? |
|------|--------|-------------------|
| July 2026 | Initial register created | N/A — pre-customer |
| | | |

---

## Adding a new subprocessor

Before engaging a new subprocessor that will process customer data:

1. Assess security posture (questionnaire or SOC 2 report)
2. Add to this register
3. Update DPA Schedule 1
4. Notify affected customers (30 days before go-live)
5. Update [privacy-policy.md](../templates/privacy-policy.md) if published

---

*Cross-reference: [architecture.md](../../../../architecture.md) for data flow details.*
