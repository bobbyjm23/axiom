# Data Processing Addendum

**DRAFT — REQUIRES AU LAWYER REVIEW BEFORE USE**

**Short-form DPA for hosted AU and on-premises deployments.**

---

**Effective date:** [DATE]

**Between:**

1. **[CUSTOMER_LEGAL_NAME]** (ABN [CUSTOMER_ABN]) of [CUSTOMER_ADDRESS] ("the Customer")
2. **Sovereign Warden Pty Ltd** (ACN [ACN], ABN [ABN]) of [REGISTERED_OFFICE_ADDRESS] ("the Provider")

This Data Processing Addendum ("DPA") supplements the Statement of Work dated [SOW_DATE] ("the SOW") between the parties.

---

## 1. Definitions

**"Personal Information"** has the meaning given in the Privacy Act 1988 (Cth).

**"Customer Data"** means all data uploaded to, processed by, or stored in the Platform by or on behalf of the Customer, including documents, chat history, embeddings, user accounts, and audit logs.

**"Platform"** means the Sovereign Warden sovereign AI platform as described in the SOW.

**"Subprocessor"** means a third party engaged by the Provider to process Customer Data.

---

## 2. Roles

2.1 For Customer Data containing Personal Information:

(a) the **Customer** is the data controller (APP entity); and

(b) the **Provider** is the data processor, processing Customer Data only on the Customer's documented instructions.

2.2 For on-premises deployments where the Provider does not access Customer Data, the Provider acts as a technology supplier and this DPA applies only to the extent the Provider processes Customer Data.

---

## 3. Processing details

| Field | Detail |
|-------|--------|
| Subject matter | AI-assisted document search and chat over Customer documents |
| Duration | Term of the SOW plus [30] days for data deletion |
| Nature of processing | Storage, indexing, retrieval, inference, audit logging |
| Purpose | Providing the Platform services per the SOW |
| Data types | Documents, chat messages, user accounts, access logs, embeddings |
| Data subjects | Customer's employees and authorised users |
| Data location | [AU-hosted tenant in Australia / Customer on-premises infrastructure] |

---

## 4. Provider obligations

The Provider will:

4.1 process Customer Data only on the Customer's documented instructions (including the SOW and this DPA);

4.2 ensure persons authorised to process Customer Data are bound by confidentiality obligations;

4.3 implement appropriate technical and organisational security measures (see [security-policy.md](../security-pack/security-policy.md));

4.4 not engage a Subprocessor without the Customer's prior written consent (general consent granted for Subprocessors listed in Schedule 1, subject to 30 days' notice of changes);

4.5 assist the Customer in responding to requests from data subjects, to the extent permitted by law;

4.6 notify the Customer of a data breach without undue delay and in any event within **24 hours** of becoming aware;

4.7 delete or return Customer Data within **[30] days** of SOW termination, at the Customer's choice; and

4.8 make available information necessary to demonstrate compliance and allow audits (once per year, on reasonable notice).

---

## 5. Customer obligations

The Customer will:

5.1 ensure it has lawful authority to upload Customer Data to the Platform;

5.2 not upload Restricted data (credentials, health records, unredacted PII) unless separately agreed;

5.3 configure access controls appropriately; and

5.4 promptly notify the Provider of any suspected security incident.

---

## 6. Data breach notification

6.1 On becoming aware of a data breach affecting Customer Data, the Provider will notify the Customer within **24 hours** with:

(a) description of the breach;

(b) categories and approximate number of records affected;

(c) likely consequences; and

(d) measures taken or proposed.

6.2 The Provider will cooperate with the Customer's breach response, including notification to the OAIC if required under the Notifiable Data Breaches scheme.

---

## 7. Subprocessors

7.1 The Customer provides general written consent to the Subprocessors listed in **Schedule 1**.

7.2 The Provider will notify the Customer at least **30 days** before adding or replacing a Subprocessor. The Customer may object on reasonable grounds within 14 days.

7.3 The Provider remains liable for Subprocessor performance.

---

## 8. International transfers

8.1 **Hosted (AU):** Customer Data is stored in Australia. During POC/pilot, chat prompts (not documents) may be sent to Google Gemini API (US). See Schedule 1.

8.2 **On-premises:** No Customer Data leaves the Customer's network. Inference runs locally.

8.3 The Provider will not transfer Customer Data outside Australia without the Customer's prior written consent, except as disclosed in Schedule 1.

---

## 9. Security measures

The Provider maintains security measures described in its Security Policy ([security-policy.md](../security-pack/security-policy.md)), including:

- TLS encryption in transit
- Role-based access control
- Audit logging (LiteLLM → PostgreSQL)
- Regular access reviews
- Incident response procedures ([incident-response.md](../security-pack/incident-response.md))

---

## 10. Term

10.1 This DPA commences on the Effective Date and continues until all Customer Data is deleted or returned.

10.2 Clauses 4, 6, and 7 survive termination.

---

## 11. Governing law

New South Wales, Australia.

---

## 12. Signatures

**Sovereign Warden Pty Ltd**

| | |
|---|---|
| Signature | _________________________ |
| Name | [SIGNATORY_NAME] |
| Date | [DATE] |

**[CUSTOMER_LEGAL_NAME]**

| | |
|---|---|
| Signature | _________________________ |
| Name | [SIGNATORY_NAME] |
| Date | [DATE] |

---

## Schedule 1 — Subprocessors

| Subprocessor | Purpose | Data processed | Location | Phase |
|------------|---------|----------------|----------|-------|
| Google (Gemini API) | LLM inference for chat prompts | Chat prompts and retrieved context chunks (not source documents) | United States | POC / pilot |
| [Cloud hosting provider] | AU-hosted tenant infrastructure | All Customer Data (hosted profile) | Australia | Production |
| Qdrant Cloud (if used) | Vector database | Document embeddings | [AU/US — specify] | POC / production |

*Update this schedule before each engagement. See [subprocessor-register.md](../security-pack/subprocessor-register.md).*

---

*Cross-reference: [architecture.md](../../../../architecture.md) for data flow details.*
