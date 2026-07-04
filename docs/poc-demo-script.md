# POC Demo Script — Investor Walkthrough (15 minutes)

## Pre-Demo Checklist

- [ ] Stack running: `./scripts/bootstrap-poc.sh`
- [ ] Multi-user mode enabled in AnythingLLM admin
- [ ] Demo users created: `admin`, `manager-demo`, `employee-demo`
- [ ] Three workspaces configured (see below)
- [ ] Demo documents uploaded to Company Knowledge workspace
- [ ] Desktop client built and installed (or use browser at `http://localhost:3000`)
- [ ] Gemini API key configured and verified: `./scripts/verify-litellm.sh`

## Narrative Arc

> "We've built a sovereign AI platform that gives employees a ChatGPT-quality experience while keeping company data in our control. Today I'll show the POC running on cloud inference for speed — the same architecture swaps to on-prem GPUs with zero code changes."

---

## Act 1: The Employee Experience (5 min)

**Login as `employee-demo`**

1. Open the Sovereign AI desktop app (or browser).
2. Show the **exact AnythingLLM interface** — not a custom rebuild.
3. Open **General Assistant** workspace.
4. Ask: *"Summarize the key benefits of retrieval-augmented generation in enterprise AI."*
5. Point out streaming responses, markdown formatting, conversation history.

**Talking point:** Employees get a familiar ChatGPT-class experience from a desktop app they install once.

---

## Act 2: Company Knowledge / RAG (5 min)

**Stay logged in as `employee-demo`**

1. Switch to **Company Knowledge** workspace.
2. Show uploaded documents in the sidebar (HR handbook, security policy, leave policy).
3. Ask: *"What is our remote work policy?"*
4. Highlight **in-chat citations** linking to source documents.
5. Ask a follow-up: *"How many days of annual leave are employees entitled to?"*

**Talking points:**
- Documents and embeddings live in **our Qdrant Cloud tenant** — not sent to Google.
- Only the retrieved context chunks go into the prompt (controlled by workspace config).
- On-prem: vectors move to rack-local Qdrant; prompts never leave the building.

---

## Act 3: Governance & Admin (3 min)

**Login as `admin`**

1. Show **Admin → Users** — invite flow, role assignment (Admin / Manager / Default).
2. Show **Admin → Workspaces** — access control per workspace.
3. Show **Admin → Appearance** — white-label branding (logo, app name, theme).
4. Open **Agent Workspace** (admin only) — demonstrate agent with web browse or SQL skill.

**Talking point:** RBAC, audit logging via LiteLLM, and branding are enterprise-ready today.

---

## Act 4: Architecture & Sovereignty Path (2 min)

Show `docs/architecture.md` diagram or slide:

1. **Today (POC):** Gemini for inference, Qdrant Cloud for vectors, your VPC for everything else.
2. **Tomorrow (on-prem):** Swap `.env.onprem` → vLLM on H100/L40S, local Qdrant, air-gapped network.
3. **Same Electron app, same AnythingLLM UI, same compose manifests.**

**Closing line:**

> "We're not renting intelligence — we're building infrastructure we own. This POC proves the employee experience and investor story today; the rack purchase unlocks full sovereignty tomorrow."

---

## Demo Workspaces Reference

| Workspace | Model | RAG | Agent | Access |
|-----------|-------|-----|-------|--------|
| General Assistant | gemini-pro | Off | Off | All users |
| Company Knowledge | gemini-pro | On (demo PDFs) | Off | All users |
| Agent Workspace | gemini-pro | Off | On (web/SQL) | Admin, Manager |

## Demo Users Reference

| Username | Password (set at creation) | Role |
|----------|---------------------------|------|
| admin | (set during setup) | Admin |
| manager-demo | demo-manager-2024 | Manager |
| employee-demo | demo-employee-2024 | Default |

## Fallbacks

- **Gemini API down:** Switch workspace to `gemini-flash` or show pre-recorded chat screenshot.
- **Desktop app not built:** Use browser at `http://localhost:3000` — identical UI.
- **RAG not returning citations:** Re-embed documents; check Qdrant connection in admin logs.
