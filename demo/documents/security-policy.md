# Information Security Policy (Demo Document)

## Data Classification

| Level | Description | Examples | AI Usage |
|-------|-------------|----------|----------|
| Public | Approved for external release | Marketing materials, press releases | Allowed |
| Internal | Company-wide, not public | Handbooks, org charts | Allowed on Sovereign AI |
| Confidential | Restricted access | Financial reports, contracts | Restricted — manager approval |
| Restricted | Highly sensitive | Credentials, PII, health data | **Prohibited** in AI tools |

## Sovereign AI Platform

The Sovereign AI Platform is the **approved** enterprise AI assistant. It runs on company-controlled infrastructure.

### What stays in-house (POC and on-prem)
- Uploaded documents and their embeddings
- Chat history and workspace configuration
- User accounts and access control logs

### POC interim state
During the proof-of-concept phase, chat prompts are processed by Google Gemini via our LiteLLM gateway. Documents are **not** sent to Google — only retrieved context chunks from our vector database.

### On-prem target state
All inference runs on company GPU servers. No data leaves the organizational network.

## Incident Response

Report suspected data breaches to security@company.internal within **1 hour**. The security team will assess scope and initiate containment within 4 hours.

## Access Control

AI platform access is granted by role:
- **Admin:** Full system configuration
- **Manager:** Workspace and user management
- **Default:** Chat access to assigned workspaces only

Access reviews are conducted quarterly.
