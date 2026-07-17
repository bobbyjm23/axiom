# IP Protection Checklist

**DRAFT — REQUIRES AU LAWYER REVIEW BEFORE USE**

**Purpose:** Protect Sovereign Warden intellectual property after AU Pty Ltd registration.  
**Critical rule:** No customer contract, angel SAFE, or public "company owns IP" claim until IP assignment deed is executed.

---

## 1. IP protection overview

Company registration (ASIC) creates a legal entity — it does **not** automatically protect IP. Each asset type requires a separate step.

| IP type | Protection mechanism | Priority | Est. cost |
|---------|---------------------|----------|-----------|
| Software, docs, architecture | IP assignment deed + git history | **Critical** | $1,500–2,500 (lawyer) |
| Brand "Sovereign Warden" | AU trademark (Classes 9 + 42) | High | ~$250/class |
| Trade secrets | NDA + contractor IP clauses | High | In templates |
| Copyright | Automatic; deed confirms transfer | Covered by deed | — |
| Domain names | Register in Pty Ltd name | Medium | ~$20–50/yr |
| Open-source stack | License audit + NOTICE file | Medium | Founder time |
| Patents | Not recommended at this stage | Defer | — |

---

## 2. IP assignment deed

| # | Task | Status | Doc |
|---|------|--------|-----|
| 2.1 | List all IP assets to assign | ⬜ | [ip-register.md](../ip-register.md) |
| 2.2 | Draft IP assignment deed (founder → Pty Ltd) | ⬜ | [ip-assignment-deed.md](../templates/ip-assignment-deed.md) |
| 2.3 | Lawyer review and finalise | ⬜ | |
| 2.4 | Execute deed (within 2 weeks of Pty Ltd registration) | ⬜ | 🔒 private |
| 2.5 | Update IP register with assignment date | ⬜ | |
| 2.6 | Confirm NZ trading co has **never** held SW IP | ⬜ | |

### Assets to include in deed schedule

- Source code repository (`sovereign-ai-platform`)
- Product documentation and architecture
- Business plans, pitch decks, investor materials
- Brand assets (name, logo, taglines)
- Domain names (when registered)
- Demo environments and scripts
- AnythingLLM fork and custom extensions (e.g. warden-audit)

---

## 3. Trademark registration (IP Australia)

**Apply at:** [https://www.ipaustralia.gov.au/](https://www.ipaustralia.gov.au/)

| # | Task | Class | Status |
|---|------|-------|--------|
| 3.1 | Search existing marks for "Sovereign Warden" | — | ⬜ |
| 3.2 | File trademark application | Class 9 — downloadable software, AI platforms | ⬜ |
| 3.3 | File trademark application | Class 42 — SaaS, AI platform services | ⬜ |
| 3.4 | Record application numbers in IP register | — | ⬜ |
| 3.5 | Monitor examination timeline (~7+ months) | — | ⬜ |

**Note:** File in the name of Sovereign Warden Pty Ltd after registration. Consider filing within 30 days of Pty Ltd registration.

---

## 4. Domain names

| Domain | Registrar | Registrant | Status |
|--------|-----------|------------|--------|
| sovereignwarden.com.au | [REGISTRAR] | Sovereign Warden Pty Ltd | ⬜ |
| sovereignwarden.com | [REGISTRAR] | Sovereign Warden Pty Ltd | ⬜ |

Register in the **company name**, not founder personal name.

---

## 5. Open-source license audit

| Component | License | Copyleft risk | Status |
|-----------|---------|---------------|--------|
| AnythingLLM | MIT | None | ✅ |
| LiteLLM | MIT | None | ✅ |
| Qdrant | Apache 2.0 | None | ✅ |
| PostgreSQL | PostgreSQL License | None | ✅ |
| vLLM | Apache 2.0 | None | ✅ |
| Electron | MIT | None | ✅ |

| # | Task | Status |
|---|------|--------|
| 5.1 | Run `license-checker` or equivalent on all dependencies | ⬜ |
| 5.2 | Add NOTICE file to distributions | ⬜ |
| 5.3 | Document OSS stack in security pack | ⬜ |
| 5.4 | Re-audit before enterprise deals | ⬜ |

---

## 6. Trade secret protection

| # | Task | Status | Doc |
|---|------|--------|-----|
| 6.1 | Investor/mentor NDA in use | ✅ | [confidentiality-agreement.md](../../../../../desktop/investor-pack/content/confidentiality-agreement.md) |
| 6.2 | Contractor IP assignment clause ready | ⬜ | [contractor-ip-clause.md](../templates/contractor-ip-clause.md) |
| 6.3 | Employee IP clause (at first hire) | ⬜ | Lawyer to draft |
| 6.4 | Customer confidentiality in SOW/DPA | ⬜ | [dpa-template.md](../templates/dpa-template.md) |

---

## 7. What NOT to do

- Do **not** assign Sovereign Warden IP to the NZ trading company
- Do **not** sign customer SOW before IP deed is executed
- Do **not** claim "company owns the IP" in investor materials before deed is signed
- Do **not** register domains in founder personal name (assign to Pty Ltd)
- Do **not** skip trademark search before filing

---

## 8. IP register maintenance

After assignment, keep [ip-register.md](../ip-register.md) updated when:

- New product features are developed
- New trademarks are filed
- New domains are registered
- Contractors or employees create IP (ensure assignment clauses)
- Third-party IP is licensed (document licences)

---

*Confirm IP assignment deed with your AU corporate lawyer before execution.*
