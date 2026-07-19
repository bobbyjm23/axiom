# Marketing Operating System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a founder-operable marketing OS in-repo — LinkedIn company profile copy, 4-week content calendar, $500/mo paid runbook, tracking/KPI sheet, and master checklist — wired into the business docs index.

**Architecture:** Create `docs/business/marketing/` as the single ops home. Each file is one job (profile, content, paid, tracking, checklist). Spec remains the source of truth for strategy; these files are paste-ready execution collateral. No website redesign in this plan (tracking tags only if already supported; otherwise document the install steps).

**Tech Stack:** Markdown docs in `docs/business/`; LinkedIn Campaign Manager; Google Ads; GA4 or Plausible; Notion/sheet for logs (external).

**Spec:** `docs/superpowers/specs/2026-07-19-marketing-operating-system-design.md`

## Global Constraints

- Company name: **Sovereign Warden**
- Website: **https://sovereignwarden.com**
- HQ: **Melbourne, Australia**
- Monthly ad budget: **$500 AUD** — LinkedIn **$300** / Google Search **$200**
- Primary LinkedIn voice: **company page first**; founder amplifies
- CTA phase 1: authority / sovereignty brief (soft) until Adneo proof
- CTA phase 2: Book 30-min fit call after Adneo signed + usable proof
- ICP: AU mid-market 50–250; law #1, accounting #2 — align with `docs/business/strategy/market-and-icp.md`
- No free law pilots in any marketing copy
- Do not invent case studies or customer logos that do not exist
- Association channels (Law Society / CPA) stay Q3–Q4 — not in this build

## File map

| File | Responsibility |
|------|----------------|
| `docs/business/marketing/README.md` | Index, phases, weekly rhythm, links to all ops files |
| `docs/business/marketing/linkedin-company-profile.md` | Paste-ready LinkedIn Company fields + About + cover brief |
| `docs/business/marketing/content-calendar.md` | Pillars, schedule, 4-week themes, 12 post drafts |
| `docs/business/marketing/paid-media.md` | LinkedIn + Google setup, audiences, keywords, kill rules |
| `docs/business/marketing/tracking-and-kpis.md` | UTMs, tags, 5 KPIs, Friday ritual, lead log columns |
| `docs/business/marketing/master-checklist.md` | Executable A–F checklist with owners/timing |
| `docs/business/marketing/sovereignty-brief-outline.md` | 1–2 page brief outline for PDF/export |
| `docs/business/README.md` | Add Marketing section linking the new folder |
| `docs/business/strategy/gtm-pipeline.md` | One-line channel pointer to marketing OS |

---

### Task 1: Marketing folder index

**Files:**
- Create: `docs/business/marketing/README.md`

**Interfaces:**
- Consumes: Spec sections 1 and 4 (architecture, rhythm)
- Produces: Hub page other tasks link from

- [ ] **Step 1: Create `docs/business/marketing/README.md`**

```markdown
# Marketing Operating System

**Brand:** Sovereign Warden · Melbourne · [sovereignwarden.com](https://sovereignwarden.com)  
**Spec:** [2026-07-19-marketing-operating-system-design.md](../../superpowers/specs/2026-07-19-marketing-operating-system-design.md)  
**GTM align:** [gtm-pipeline.md](../strategy/gtm-pipeline.md) · [market-and-icp.md](../strategy/market-and-icp.md)

## Phase

| Phase | When | Primary CTA |
|-------|------|-------------|
| **1 — Authority** | Until Adneo signed + one usable proof point | Follow / sovereignty brief / soft contact |
| **2 — Pipeline** | After proof | Book 30-min fit call |

## Ops files

| File | Use |
|------|-----|
| [linkedin-company-profile.md](linkedin-company-profile.md) | Set up / update Company Page |
| [content-calendar.md](content-calendar.md) | Weekly posting |
| [paid-media.md](paid-media.md) | $500/mo LinkedIn + Google |
| [tracking-and-kpis.md](tracking-and-kpis.md) | UTMs, tags, Friday review |
| [sovereignty-brief-outline.md](sovereignty-brief-outline.md) | Phase 1 lead magnet |
| [master-checklist.md](master-checklist.md) | Stand-up checklist |

## Weekly rhythm

| Block | Work |
|-------|------|
| Mon ~30 min | Schedule 3 company posts (see content calendar) |
| Daily 10–15 min | Founder amplify + reply to comments |
| Fri 15 min | Ads kill rule + KPI note |
| Monthly 45 min | Phase check, creative refresh, ≤$50 budget tilt |

## Budget

**$500/mo** — LinkedIn $300 · Google Search $200. Do not raise until a proven winner (see paid-media kill/scale rules).
```

- [ ] **Step 2: Verify file exists and links resolve**

Run: `test -f docs/business/marketing/README.md && head -n 5 docs/business/marketing/README.md`  
Expected: file prints with `# Marketing Operating System`

- [ ] **Step 3: Commit**

```bash
git add docs/business/marketing/README.md
git commit -m "$(cat <<'EOF'
docs: add marketing operating system index

EOF
)"
```

---

### Task 2: LinkedIn company profile paste pack

**Files:**
- Create: `docs/business/marketing/linkedin-company-profile.md`

**Interfaces:**
- Consumes: Spec §2 identity + About structure
- Produces: Copy the founder pastes into LinkedIn UI

- [ ] **Step 1: Create `docs/business/marketing/linkedin-company-profile.md`**

Write the full file with these exact sections and copy:

```markdown
# LinkedIn Company Profile — Sovereign Warden

Use this to create or update the Company Page. Voice: company page first; founder amplifies daily.

## Fields

| Field | Value |
|-------|--------|
| Name | Sovereign Warden |
| Tagline | Sovereign AI for Australian professional firms — on your infrastructure, under your control |
| Website | https://sovereignwarden.com |
| Industry | Information Technology & Services |
| Company size | 1–10 employees |
| Headquarters | Melbourne, Victoria, Australia |
| Hashtags (follow) | #DataSovereignty #LegalTech #PrivacyAct #AustralianBusiness |

## CTA button

| Phase | Button | Destination |
|-------|--------|-------------|
| 1 | Visit website | https://sovereignwarden.com?utm_source=linkedin&utm_medium=company&utm_campaign=profile |
| 2 | Book appointment | Fit-call / Calendly URL with same UTM pattern `utm_campaign=fit-call` |

## About (paste)

Staff already use ChatGPT and Claude on client matters. Approval and data control have not caught up — and that is a Privacy Act and professional-duty problem for mid-market firms.

Sovereign Warden is an approved AI assistant with citations from your firm documents. Start AU-hosted; move to on-prem open-source models on your hardware without rebuilding the product.

Built for Australian mid-tier law, accounting, and advisory firms (50–250 people) that need ChatGPT-class UX without sending prompts offshore by default.

[Phase 1] Get the sovereignty brief → sovereignwarden.com  
[Phase 2] Book a 30-minute fit call → [booking URL]

## Cover brief (designer / Canva)

- Full-bleed dark navy / mint atmosphere consistent with website
- One line only: **AI that stays inside the firm**
- No stat badges, no pill clusters, no floating labels on the image
- Logo: use current Sovereign Warden mark (square for profile; wordmark optional on cover corner only if needed)

## Featured (order)

1. Sovereignty brief (PDF or landing) — phase 1  
2. Website — How sovereignty works  
3. Fit-call booking — phase 2 only  

## Admin

- [ ] Founder = Super Admin  
- [ ] Page notifications on  
- [ ] No Showcase pages in Year 1  

## Founder profile companion

| Item | Spec |
|------|------|
| Headline | Include “Sovereign Warden” + sovereignty / private AI for AU firms |
| Featured | Company page + sovereignwarden.com |
| Daily | Comment on 5–10 ICP posts; reply to all company-page comments &lt;24h |
| Weekly | Share 1–2 company posts with a 2-line personal take; ≤1 personal original post |
```

- [ ] **Step 2: Verify tagline length ≤120 characters**

Run: `python3 -c "t='Sovereign AI for Australian professional firms — on your infrastructure, under your control'; print(len(t))"`  
Expected: prints a number ≤ 120

- [ ] **Step 3: Commit**

```bash
git add docs/business/marketing/linkedin-company-profile.md
git commit -m "$(cat <<'EOF'
docs: add LinkedIn company profile paste pack

EOF
)"
```

---

### Task 3: Content calendar + 12 post drafts

**Files:**
- Create: `docs/business/marketing/content-calendar.md`

**Interfaces:**
- Consumes: Spec pillars + schedule + 4-week themes; site articles for source links
- Produces: Monday batch-scheduling input

- [ ] **Step 1: Create `docs/business/marketing/content-calendar.md`**

Include:

1. **Schedule table** — Tue 7:30–8:30am · Wed 12:00–1:00pm · Thu 7:30–8:30am AEST; Fri optional CTA only  
2. **Pillar mix** — 40% problem/education, 30% product/proof, 20% offer, 10% build-in-public  
3. **Format preference** — document carousel 5–8 slides &gt; native image + 800–1,200 chars &gt; 30–60s video biweekly  
4. **Four-week theme loop** as in spec  
5. **Twelve post drafts** (exact hooks below) — each with: theme, pillar, format, body draft, CTA phase note, source article if any  

Post drafts to include (bodies ~800–1,200 chars; no fake logos):

| # | Day theme | Hook (first line) |
|---|-----------|-------------------|
| 1 | Shadow AI | Staff already use ChatGPT on client matters. Approval has not caught up. |
| 2 | Product | An approved assistant is useless if answers cannot show their sources. |
| 3 | Insight | “Private AI” is not a slogan — it is a residency and control decision. |
| 4 | Copilot TCO | The shock is rarely the first Copilot seat. It is seat 50. |
| 5 | On-prem path | Hosted wedge today. On-prem open-source models on your GPU when you are ready — without a rebuild. |
| 6 | Myth | Myth: mid-market firms are too small for sovereign AI. |
| 7 | Privacy Act | If you cannot say where prompts and documents live, you do not have an AI policy — you have hope. |
| 8 | Audit | Partners do not ask for magic. They ask who saw the prompt. |
| 9 | Soft CTA | We wrote a short sovereignty brief for Australian professional firms. |
| 10 | Approved AI | What “approved AI” looks like in a 50–150 lawyer firm. |
| 11 | Citations | Firm documents in. Sourced answers out. |
| 12 | Soft CTA / phase note | Phase 1: brief. Phase 2 (after Adneo proof): fit call — do not post fit-call CTA until flip. |

Link sources where they exist:

- `website/articles/shadow-ai-to-approved-assistant/`
- `website/articles/copilot-vs-on-prem-tco/`
- `website/articles/privacy-act-data-sovereignty/`
- `website/articles/why-law-firms-need-sovereign-ai/`

Also include a blank **Week N+** table template for ongoing use.

- [ ] **Step 2: Verify 12 numbered drafts exist**

Run: `grep -c '^### Post ' docs/business/marketing/content-calendar.md`  
Expected: `12` (use `### Post 1` … `### Post 12` headings)

- [ ] **Step 3: Commit**

```bash
git add docs/business/marketing/content-calendar.md
git commit -m "$(cat <<'EOF'
docs: add LinkedIn content calendar and post drafts

EOF
)"
```

---

### Task 4: Paid media runbook

**Files:**
- Create: `docs/business/marketing/paid-media.md`

**Interfaces:**
- Consumes: Spec §3 audiences, keywords, kill/scale rules
- Produces: Campaign Manager / Google Ads setup checklist with exact copy starters

- [ ] **Step 1: Create `docs/business/marketing/paid-media.md`**

Must contain:

**Budget:** $300 LinkedIn / $200 Google monthly; ~$10/day and ~$6.50/day.

**Shared rules:** Australia only; UTM pattern; offer-match; kill at $40+ spend / 0 meaningful actions; ≤$50 reallocation after 2+ weeks only.

**LinkedIn:**
- Sponsored Content only  
- Audience A law 60% / Audience B accounting 40% with title and size lists from spec  
- 3 creative headlines + primary text starters matching the three creative themes  
- Phase 1 CTA Learn more → brief or site; Phase 2 Book discovery call  

**Google:**
- Search only; phrase + exact; partners/display off  
- Three ad groups with example keywords from spec  
- Seed negatives list from spec  
- RSA angle per ad group (3 headlines + 2 descriptions each — write them fully)  
- Bid: Maximize clicks with $2–4 cap or Manual CPC  

**Friday ritual:** 4 bullets from spec.

**Landing URLs:**

```
Phase 1: https://sovereignwarden.com/?utm_source=linkedin&utm_medium=paid&utm_campaign=YYYY-MM-authority
Phase 1 Google: https://sovereignwarden.com/?utm_source=google&utm_medium=paid&utm_campaign=YYYY-MM-{theme}
Phase 2: same host + /#contact or booking URL with utm_campaign=fit-call
```

- [ ] **Step 2: Verify kill rule and budget split are present**

Run: `grep -E '\$300|\$200|\$40' docs/business/marketing/paid-media.md`  
Expected: matches for all three amounts

- [ ] **Step 3: Commit**

```bash
git add docs/business/marketing/paid-media.md
git commit -m "$(cat <<'EOF'
docs: add LinkedIn and Google paid media runbook

EOF
)"
```

---

### Task 5: Tracking, UTMs, KPIs

**Files:**
- Create: `docs/business/marketing/tracking-and-kpis.md`

**Interfaces:**
- Consumes: Spec §4 KPIs + UTM rules  
- Produces: Install checklist + lead log schema + Friday template

- [ ] **Step 1: Create `docs/business/marketing/tracking-and-kpis.md`**

Include:

1. **Tags to install on sovereignwarden.com** — GA4 or Plausible; LinkedIn Insight Tag; Google Ads tag; conversion = form submit / booking  
2. **UTM convention table** — source `linkedin|google`, medium `paid|company|organic-social`, campaign `YYYY-MM-{theme}`  
3. **Five KPIs** with 90-day targets from spec  
4. **Lead log columns** (Notion/sheet): Date | Source | Campaign | Name/Firm | Role | Action (brief/fit-call/DM) | Status | Next step | Notes  
5. **Friday 15-min template** (copy-paste checklist)  
6. **Phase flip criteria** — Adneo signed + one metric or quote → update company CTA, ads CTAs, content calendar offer posts  

Note: if tags are not yet on the site, document exact install steps; do **not** refactor homepage layout in this task.

- [ ] **Step 2: Verify five KPI names appear**

Run: `grep -E 'posts shipped|Paid learning|Meaningful actions|Fit calls|Cost per meaningful' docs/business/marketing/tracking-and-kpis.md`  
Expected: all five concepts present

- [ ] **Step 3: Commit**

```bash
git add docs/business/marketing/tracking-and-kpis.md
git commit -m "$(cat <<'EOF'
docs: add marketing tracking and KPI runbook

EOF
)"
```

---

### Task 6: Sovereignty brief outline + master checklist

**Files:**
- Create: `docs/business/marketing/sovereignty-brief-outline.md`
- Create: `docs/business/marketing/master-checklist.md`

**Interfaces:**
- Consumes: Spec §5 checklist + phase 1 lead magnet  
- Produces: PDF outline + stand-up checklist the founder ticks in the real world

- [ ] **Step 1: Create `docs/business/marketing/sovereignty-brief-outline.md`**

Structure (1–2 pages when exported):

1. Title: **Sovereign AI for Australian professional firms**  
2. Problem: shadow ChatGPT / Claude on client data  
3. Why mid-market is stuck: Copilot cost + US inference default + no citations/audit  
4. What good looks like: approved UX, citations, audit logs, AU-hosted → on-prem path  
5. Who it’s for: 50–250 staff law / accounting / advisory  
6. What we do not claim: no fake logos; Adneo as design partner when cleared — not law ICP reference  
7. CTA phase 1: reply / form for brief conversation; phase 2 block left blank until flip  

- [ ] **Step 2: Create `docs/business/marketing/master-checklist.md`**

Copy Spec §5 sections A–F as checkboxes. Prefix each item with timing (`Wk1`, `Wk1–2`, `Wk2`, `Ongoing`, `Later`). Add a **Definition of done** block:

```markdown
## Definition of done (system live)

- [ ] Company page live with Melbourne + sovereignwarden.com + About pasted
- [ ] 3 posts scheduled for the current week
- [ ] Tracking tags verified (or explicitly deferred with owner/date)
- [ ] LinkedIn + Google campaigns live at $300 / $200
- [ ] Friday review blocked on calendar for next 4 weeks
```

- [ ] **Step 3: Verify checklist has Foundations and Paid sections**

Run: `grep -E '^### A\.|^### D\.' docs/business/marketing/master-checklist.md`  
Expected: both headings present

- [ ] **Step 4: Commit**

```bash
git add docs/business/marketing/sovereignty-brief-outline.md docs/business/marketing/master-checklist.md
git commit -m "$(cat <<'EOF'
docs: add sovereignty brief outline and marketing master checklist

EOF
)"
```

---

### Task 7: Wire into business docs index + GTM

**Files:**
- Modify: `docs/business/README.md`
- Modify: `docs/business/strategy/gtm-pipeline.md`
- Modify: `docs/business/marketing/README.md` (only if any link titles need fix after files exist)

**Interfaces:**
- Consumes: All marketing files from Tasks 1–6  
- Produces: Discoverable OS from business README and GTM channels table

- [ ] **Step 1: Add Marketing section to `docs/business/README.md`**

Under Document library (after Strategy or as its own subsection), add:

```markdown
### Marketing

| Document | Topic |
|----------|-------|
| [marketing/README.md](marketing/README.md) | Marketing OS index, phases, weekly rhythm |
| [marketing/master-checklist.md](marketing/master-checklist.md) | Stand-up checklist |
| [marketing/linkedin-company-profile.md](marketing/linkedin-company-profile.md) | Company page paste pack |
| [marketing/content-calendar.md](marketing/content-calendar.md) | Posting schedule + drafts |
| [marketing/paid-media.md](marketing/paid-media.md) | $500/mo LinkedIn + Google |
| [marketing/tracking-and-kpis.md](marketing/tracking-and-kpis.md) | UTMs, tags, KPIs |
```

- [ ] **Step 2: Update Channels table in `docs/business/strategy/gtm-pipeline.md`**

Change the LinkedIn row / add pointer so Channels includes:

| Channel | Timing |
|---------|--------|
| LinkedIn company + founder amplify | Week 1+ — see [marketing/README.md](../marketing/README.md) |
| Paid LinkedIn + Google ($500/mo) | Week 2+ after profile + tracking — [marketing/paid-media.md](../marketing/paid-media.md) |

Keep existing Law Society / CPA / referral rows unchanged.

- [ ] **Step 3: Verify links from business README**

Run:

```bash
for f in README.md master-checklist.md linkedin-company-profile.md content-calendar.md paid-media.md tracking-and-kpis.md sovereignty-brief-outline.md; do
  test -f "docs/business/marketing/$f" && echo "ok $f" || echo "MISSING $f"
done
```

Expected: all `ok`

- [ ] **Step 4: Commit**

```bash
git add docs/business/README.md docs/business/strategy/gtm-pipeline.md
git commit -m "$(cat <<'EOF'
docs: link marketing OS from business index and GTM

EOF
)"
```

---

## Self-review (author)

| Spec requirement | Task |
|------------------|------|
| System architecture / phases / rhythm | Task 1 |
| LinkedIn company profile structure | Task 2 |
| Posting schedule + content pillars | Task 3 |
| $300/$200 ads targeting + kill rules | Task 4 |
| Website wiring / UTMs / 5 KPIs | Task 5 |
| Master checklist + brief | Task 6 |
| Discoverability from business docs | Task 7 |

No TBD placeholders in task steps. Exact file paths locked. External UI work (actually clicking LinkedIn/Google) is checklist items for the founder inside `master-checklist.md`, not agent code tasks.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-19-marketing-operating-system.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline Execution** — execute tasks in this session with checkpoints  

Which approach?
