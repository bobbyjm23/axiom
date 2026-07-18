# Concept deck — Market · Tomorrow economics redesign

**Date:** 2026-07-18  
**Status:** Design approved conversationally; awaiting spec review before implementation  
**Scope:** Refocus `Market · Tomorrow` on a basic 5-year cost table; remove the separate Economics · 3-year TCO slide

## Goal

Replace the abstract “where it’s heading” copy on Market · Tomorrow with a clear rent-vs-own economics story for **100 users**, while keeping the headline:

> The shift from renting intelligence to **owning** it.

Remove lead, blockquote, and bullet list. Retire the later Economics · 3-year TCO slide so the deck tells the cost story once.

## Placement / deck impact

| Before | After |
|--------|--------|
| Slide 5 · Market · Tomorrow (dark; quote + bullets) | Slide 5 · Market · Tomorrow (headline + cost table) |
| Slide 8 · Economics · 3-year TCO | **Deleted** |
| Slides 9 Close | Renumber → slide **8** Close |

Deck total: **8 slides** (was 9).

## Copy (keep)

| Element | Text |
|---------|------|
| Eyebrow | `Market · Tomorrow` |
| Headline | The shift from renting intelligence to **owning** it. (accent on “owning”) |

**Remove from Tomorrow:** lead paragraph, blockquote, bullet list.

**No** pros/cons columns. **No** scenario lead line (approach A).

## Table (basic)

**Audience size:** 100 users  
**Currency:** A$  
**Source:** Derive from former Economics TCO slide — Claude Team + Claude API combined into one Frontier row; self-hosted and rent-to-own extended to 5 years.

### Rows

1. **Frontier** — Claude Team seats + Claude API (combined)
2. **On-premises** — Sovereign Warden self-hosted path
3. **On-premises · rent to own** — same stack, CapEx financed

### Columns

| Option | Initial | Ongoing | 3-year | 5-year |
|--------|---------|---------|--------|--------|
| Frontier (Team + API) | A$0 | A$90,200/yr | A$270,000 | A$451,000 |
| On-premises | A$61,000 | A$3,000/yr | A$70,000 | A$76,000 |
| On-premises · rent to own | A$0 | ~A$30,333/yr | A$91,000 | A$98,800 |

### Derivation notes

- Team: A$36,700/yr · API: ~A$53,500/yr → Frontier ongoing A$90,200/yr
- Frontier 3-year / 5-year = ongoing × 3 / × 5 (aligned with prior rounded 3-year Team+API totals A$110k + A$160k = A$270k)
- On-premises: A$61,000 + A$3,000 × years
- **Rent to own = on-premises totals × 1.30** (30% more expensive than buying upfront):
  - 3-year: A$70,000 × 1.3 = **A$91,000** → ongoing ~A$30,333/yr over the financed term
  - 5-year: A$76,000 × 1.3 = **A$98,800**
- Initial for rent to own remains A$0

Highlight the On-premises row(s) lightly (existing `tco-compare__highlight` pattern) so owning stands out vs Frontier.

## Visual / theme

- Keep **dark** slide (`slide--dark`) to preserve Market · Tomorrow identity, **or** switch to mint if the table is hard to read on dark — prefer **reuse existing `.tco-compare` styles** adapted for dark (invert borders/text) so the table stays readable.
- Implementation choice: if dark table contrast is poor in practice, use `slide--mint` for this slide only; headline accent stays teal.

## Remove

- Entire former slide 8 section (`Economics · 3-year TCO`)
- Tomorrow lead, quote, bullets
- Pros/cons columns from any reused TCO markup

## Files

- Source of truth: `docs/business/concept/index.html`
- Sync: `desktop/investor-pack/public/concept/index.html`
- Update outlines in both concept READMEs (8 slides; Tomorrow description; drop Economics TCO bullet)
- Fix any “9 slides” / product-slide range comments if present

## Out of scope

- Changing CapEx/opex assumptions beyond the derivation above
- Adding Claude Team and API as separate rows
- Restoring pros/cons or narrative bullets on Tomorrow
