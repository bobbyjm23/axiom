# Market · Capability Slide Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refocus Concept deck slide 3 (`Market · Capability`) into a quiet sequential story — capability bars → hardware before/after — so open source + own rack reads as viable.

**Architecture:** Replace the noisy line-chart + task-table + callout block in both identical Concept HTML copies with a two-step layout (grouped bars → inference-box before/after). New CSS classes replace obsolete gap-chart / cap-table / economics-callout rules. READMEs updated to match.

**Tech Stack:** Static HTML, CSS, inline SVG (Aeonik, navy `#1D2B38`, teal `#12EACB`, mint slide `--mint`)

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-18-market-capability-slide-design.md`
- Source of truth: `docs/business/concept/index.html` — then sync to `desktop/investor-pack/public/concept/`
- No new image assets; inline SVG/HTML + CSS only
- Headline: `Models converged. Racks became reachable.` (accent on second sentence)
- Never use “good enough” or “iron”
- No percentage labels on bars; no dollar figures on hardware panel
- Sequential layout C: `1 · Capability` → `2 · Hardware cost`
- Keep printable as one page; do not reintroduce the task table or economics callout

## File map

| File | Role |
|------|------|
| `docs/business/concept/index.html` | Source of truth — CSS + slide 3 markup |
| `desktop/investor-pack/public/concept/index.html` | Sync copy (must stay identical) |
| `docs/business/concept/README.md` | Slide outline bullet for slide 3 |
| `desktop/investor-pack/public/concept/README.md` | Sync outline |

---

### Task 1: Replace capability-gap CSS with sequential-story styles

**Files:**
- Modify: `docs/business/concept/index.html` (CSS block ~lines 708–776)

**Interfaces:**
- Consumes: existing `.slide--mint`, `.grid-2`, `.card`, `.chart-legend`, `.accent`, CSS vars `--teal`, `--navy`, `--border`, `--white`, `--text-muted`
- Produces: classes `.cap-seq`, `.cap-seq__arrow`, `.cap-panel`, `.cap-panel--focus`, `.cap-bars`, `.cap-bar-group`, `.cap-bar`, `.cap-bar--oss`, `.cap-bar--frontier`, `.hw-compare`, `.hw-pill`, `.hw-pill--now`, `.cap-panel__closer`; removes dependency on `.gap-chart`, `.cap-table`, `.economics-callout` for this slide

- [ ] **Step 1: Confirm current CSS anchors exist**

Run:

```bash
rg -n "Line chart \(capability gap\)|gap-chart-wrap|economics-callout strong" docs/business/concept/index.html
```

Expected: matches in the ~708–776 region.

- [ ] **Step 2: Replace the CSS block** from `/* ── Line chart (capability gap) ── */` through `.economics-callout strong { ... }` with:

```css
    /* ── Market · Capability sequential story ── */
    .cap-seq {
      display: flex;
      align-items: stretch;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .cap-seq__arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 1.75rem;
      color: var(--teal);
      font-size: 1.35rem;
      font-weight: 700;
      line-height: 1;
    }

    .cap-panel {
      flex: 1.15;
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 1rem 1.1rem;
    }

    .cap-panel--focus {
      flex: 1;
      border-color: var(--teal);
      box-shadow: 0 0 0 1px rgba(18, 234, 203, 0.18);
    }

    .cap-panel__step {
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--teal);
      margin: 0 0 0.35rem;
    }

    .cap-panel__title {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--navy);
      margin: 0 0 0.85rem;
    }

    .cap-bars {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 0.55rem;
      height: 7.5rem;
      padding: 0 0.15rem;
    }

    .cap-bar-group {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.35rem;
      min-width: 0;
    }

    .cap-bar-group__bars {
      display: flex;
      align-items: flex-end;
      gap: 3px;
      height: 6.25rem;
    }

    .cap-bar {
      width: 0.85rem;
      border-radius: 3px 3px 0 0;
    }

    .cap-bar--oss { background: var(--teal); }
    .cap-bar--frontier { background: rgba(29, 43, 56, 0.28); }

    .cap-bar-group__label {
      font-size: 0.65rem;
      color: var(--text-muted);
    }

    .cap-bar-group__label--now {
      color: var(--navy);
      font-weight: 700;
    }

    .cap-legend {
      display: flex;
      gap: 1rem;
      margin-top: 0.75rem;
      font-size: 0.68rem;
      color: var(--text-muted);
    }

    .cap-legend span {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }

    .cap-legend__swatch {
      width: 0.7rem;
      height: 0.4rem;
      border-radius: 1px;
      display: inline-block;
    }

    .cap-legend__swatch--oss { background: var(--teal); }
    .cap-legend__swatch--frontier { background: rgba(29, 43, 56, 0.28); }

    .hw-compare {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.85rem;
    }

    .hw-pill {
      flex: 1;
      text-align: center;
      padding: 0.75rem 0.5rem;
      border-radius: 8px;
      background: rgba(29, 43, 56, 0.06);
    }

    .hw-pill--now {
      background: rgba(18, 234, 203, 0.12);
      border: 1px solid var(--teal);
    }

    .hw-pill__when {
      font-size: 0.65rem;
      color: var(--text-muted);
      margin-bottom: 0.25rem;
    }

    .hw-pill__level {
      font-size: 1rem;
      font-weight: 700;
      color: var(--navy);
      line-height: 1.2;
    }

    .hw-pill__note {
      font-size: 0.65rem;
      color: var(--text-muted);
      margin-top: 0.3rem;
    }

    .hw-pill--now .hw-pill__note {
      color: var(--navy);
      font-weight: 600;
    }

    .hw-compare__arrow {
      color: var(--teal);
      font-weight: 700;
      flex: 0 0 auto;
    }

    .cap-panel__closer {
      font-size: 0.78rem;
      color: var(--navy);
      line-height: 1.4;
      border-top: 1px solid var(--border);
      padding-top: 0.75rem;
      margin: 0;
      max-width: none;
    }

    @media (max-width: 900px) {
      .cap-seq { flex-direction: column; }
      .cap-seq__arrow { transform: rotate(90deg); flex-basis: auto; padding: 0.25rem 0; }
    }
```

Also remove the print override that only targeted `.gap-slide-grid` if present (~line 855), or leave it harmless if unused after markup change.

- [ ] **Step 3: Grep that obsolete selectors are gone from CSS**

Run:

```bash
rg -n "gap-chart-wrap|\.gap-chart|\.cap-table|\.economics-callout" docs/business/concept/index.html
```

Expected: **no CSS matches** (HTML may still match until Task 2).

- [ ] **Step 4: Commit**

```bash
git add docs/business/concept/index.html
git commit -m "$(cat <<'EOF'
Restyle Market · Capability for the sequential story layout.

EOF
)"
```

---

### Task 2: Replace slide 3 markup

**Files:**
- Modify: `docs/business/concept/index.html` (section `data-slide="3"`, ~lines 1502–1585)

**Interfaces:**
- Consumes: classes from Task 1; existing `.slide.slide--mint`, `.slide-inner`, `.eyebrow`, `h2`, `.accent`, `.lead`
- Produces: sequential story markup with no task table / line chart / economics callout

- [ ] **Step 1: Locate the slide**

Run:

```bash
rg -n 'data-slide="3"|Market · Capability|The gap is shrinking' docs/business/concept/index.html
```

- [ ] **Step 2: Replace the entire `<section class="slide slide--mint" data-slide="3">...</section>`** with:

```html
  <!-- 3 · Models converged / racks reachable -->
  <section class="slide slide--mint" data-slide="3">
    <div class="slide-inner">
      <p class="eyebrow">Market · Capability</p>
      <h2>Models converged. <span class="accent">Racks became reachable.</span></h2>
      <p class="lead">Open source met frontier capability. The cost of a capable inference box fell with it — so owning the rack is a real option.</p>

      <div class="cap-seq">
        <div class="cap-panel">
          <p class="cap-panel__step">1 · Capability</p>
          <p class="cap-panel__title">Open source catching frontier</p>
          <div class="cap-bars" role="img" aria-label="Grouped bar chart: open-source capability rising toward frontier across three years ago, two years ago, one year ago, and today">
            <div class="cap-bar-group">
              <div class="cap-bar-group__bars">
                <div class="cap-bar cap-bar--oss" style="height:40%"></div>
                <div class="cap-bar cap-bar--frontier" style="height:100%"></div>
              </div>
              <span class="cap-bar-group__label">3 yrs</span>
            </div>
            <div class="cap-bar-group">
              <div class="cap-bar-group__bars">
                <div class="cap-bar cap-bar--oss" style="height:55%"></div>
                <div class="cap-bar cap-bar--frontier" style="height:100%"></div>
              </div>
              <span class="cap-bar-group__label">2 yrs</span>
            </div>
            <div class="cap-bar-group">
              <div class="cap-bar-group__bars">
                <div class="cap-bar cap-bar--oss" style="height:75%"></div>
                <div class="cap-bar cap-bar--frontier" style="height:100%"></div>
              </div>
              <span class="cap-bar-group__label">1 yr</span>
            </div>
            <div class="cap-bar-group">
              <div class="cap-bar-group__bars">
                <div class="cap-bar cap-bar--oss" style="height:92%"></div>
                <div class="cap-bar cap-bar--frontier" style="height:100%"></div>
              </div>
              <span class="cap-bar-group__label cap-bar-group__label--now">Today</span>
            </div>
          </div>
          <div class="cap-legend">
            <span><i class="cap-legend__swatch cap-legend__swatch--oss"></i> Open source</span>
            <span><i class="cap-legend__swatch cap-legend__swatch--frontier"></i> Frontier</span>
          </div>
        </div>

        <div class="cap-seq__arrow" aria-hidden="true">→</div>

        <div class="cap-panel cap-panel--focus">
          <p class="cap-panel__step">2 · Hardware cost</p>
          <p class="cap-panel__title">A capable inference box</p>
          <div class="hw-compare">
            <div class="hw-pill">
              <div class="hw-pill__when">3 yrs ago</div>
              <div class="hw-pill__level">High</div>
              <div class="hw-pill__note">Lab / enterprise spend</div>
            </div>
            <span class="hw-compare__arrow" aria-hidden="true">→</span>
            <div class="hw-pill hw-pill--now">
              <div class="hw-pill__when">Today</div>
              <div class="hw-pill__level">Reachable</div>
              <div class="hw-pill__note">Dept / mid-market rack</div>
            </div>
          </div>
          <p class="cap-panel__closer">Open source on your own server rack is now a viable path.</p>
        </div>
      </div>
    </div>
  </section>
```

Bar heights are relative only (no % labels in the UI). Inline `height` percentages drive the visual story; they must not appear as text on the slide.

- [ ] **Step 3: Verify removed noise and required copy**

Run:

```bash
rg -n "gap is shrinking|cap-table|economics-callout|gap-chart|Models converged|Racks became reachable|1 · Capability|2 · Hardware cost|good enough|iron" docs/business/concept/index.html
```

Expected:
- Matches for new headline / panel labels
- **No** matches for `gap is shrinking`, `cap-table`, `economics-callout`, `gap-chart`, `good enough`, or `iron`

- [ ] **Step 4: Commit**

```bash
git add docs/business/concept/index.html
git commit -m "$(cat <<'EOF'
Rebuild Market · Capability as capability bars then rack cost.

EOF
)"
```

---

### Task 3: Update READMEs and sync investor-pack copy

**Files:**
- Modify: `docs/business/concept/README.md`
- Modify: `desktop/investor-pack/public/concept/README.md`
- Modify: `desktop/investor-pack/public/concept/index.html` (full sync from docs)

**Interfaces:**
- Consumes: final `docs/business/concept/index.html` from Tasks 1–2
- Produces: identical investor-pack public concept files; README bullet for slide 3

- [ ] **Step 1: Update outline bullets** in both READMEs

Replace the slide 3 line:

```markdown
3. **The gap is shrinking** — Open-source vs frontier capability line chart + task comparison table
```

with:

```markdown
3. **Models converged / racks reachable** — Open-source vs frontier bar groups → inference-box before/after
```

- [ ] **Step 2: Sync HTML + README to investor-pack**

```bash
cp docs/business/concept/index.html desktop/investor-pack/public/concept/index.html
cp docs/business/concept/README.md desktop/investor-pack/public/concept/README.md
diff -q docs/business/concept/index.html desktop/investor-pack/public/concept/index.html
diff -q docs/business/concept/README.md desktop/investor-pack/public/concept/README.md
```

Expected: both `diff -q` silent (files identical).

- [ ] **Step 3: Visual check**

```bash
# If investor-pack Vite is already on 5173:
open "http://localhost:5173/concept/index.html"
# Else open the file directly:
open docs/business/concept/index.html
```

Navigate to slide 3 (arrow keys / deck chrome). Confirm:
- Headline + lead match spec
- Four bar groups, no % text
- Before/after hardware panel with closer
- No task table

- [ ] **Step 4: Commit**

```bash
git add docs/business/concept/README.md desktop/investor-pack/public/concept/
git commit -m "$(cat <<'EOF'
Sync Capability slide redesign into investor-pack concept deck.

EOF
)"
```

---

## Spec coverage checklist

| Spec requirement | Task |
|------------------|------|
| Sequential layout C | Task 2 |
| Headline B + approved lead/panel copy | Task 2 |
| Grouped bars, 4 periods, no % labels | Task 2 |
| Hardware before/after, qualitative, inference box | Task 2 |
| Remove line chart, table, economics callout | Task 2 |
| New CSS / no new assets | Task 1 |
| README + sync both concept copies | Task 3 |

## Placeholder / consistency self-review

- No TBD/TODO left in steps
- Class names consistent across Task 1 CSS and Task 2 HTML
- Forbidden phrases (`good enough`, `iron`) checked in Task 2 verification
