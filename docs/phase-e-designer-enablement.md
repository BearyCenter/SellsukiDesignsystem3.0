# Phase E — Designer enablement

> **Parent plan:** `DS3_VIBECODE_PRODUCTION_PLAN.md` §13 + §12.2.2 /lead-uxui addendum
> **Parent Epic:** [DES-2035](https://sellsuki.atlassian.net/browse/DES-2035)
> **Status:** Scoping outline — not yet ticketed
> **Goal:** Designer team understands enough about DS 3.0 internals to vibe-code-test outputs and spot regressions without dev help

---

## 1. Why this phase exists

Suki Designer skill `CONTEXT.md` says: **Designer team owns DS 3.0 codebase**. But during this session it became clear designers can't currently:
- Distinguish `<ssk-button>` vs `<ssk-tag>` vs `<ssk-badge>` for status states
- Decide when something is `<ssk-heading>` vs `<ssk-text>`
- Read MCP output critically (e.g. spot when MCP says "deprecated" but skill says required — see DES-2036)
- Verify vibe-code output meets the 18px font minimum + correct provider wrap

Without enablement, every vibe-code Designer test still needs Dev assist → bottleneck → fewer Patterns shipped per quarter.

## 2. Audience tiers (different needs)

| Tier | Who | What they need | Time investment |
|------|-----|----------------|-----------------|
| **Tier 1** | Designer team (5-8 people) | Can vibe-code-test + give actionable feedback | 2 × 1-hr workshop + cheatsheet + weekly office hours |
| **Tier 2** | Product team (10+ people) | Can recognize DS 3.0 output vs DS 1.0 legacy + brief Designer team correctly | 1-hr overview session |
| **Tier 3** | New hires (ongoing) | Self-serve onboarding | Cheatsheet + recorded workshop |

## 3. Workshop curriculum (Tier 1)

### Session 1 — DS 3.0 mental model (1 hr)

**Outcome:** Designer can read `DS3_VIBECODE_PRODUCTION_PLAN.md` and `~/.claude/skills/suki-designer/` and apply the rules.

**Topics:**
1. Why DS 3.0 = DS 1.0 architecture + DS 2.0 visual (20 min, with timeline visual)
2. Token layers explained — primitive (`--ssk-colors-*`) → semantic (`--bg-primary`, `--text-primary`) → brand override → component (15 min)
3. Provider model — why `<ssk-theme-provider brand="ccs3">` is non-negotiable (10 min, with broken-vs-fixed demo)
4. Suki Designer skill — how to invoke + what each file does (10 min)
5. Q&A (5 min)

### Session 2 — Component picking + vibe-code test (1 hr)

**Outcome:** Designer can vibe-code a Feature Page and verify the output meets DoD.

**Topics:**
1. Component picking decision tree — handout 1 (15 min)
   - Need status indicator? → badge (variant=subtle) for state, tag for category, button if user clicks it
   - Need text? → heading for hierarchy, label for forms, p for body, caption for hints
   - Need layout? → page-header for title row, filter-bar for search/filter, app-shell for full app
2. Run a vibe-code prompt end-to-end (20 min) — use Order Management as worked example
3. DoD checklist walk-through (15 min) — open `DS3_VIBECODE_PRODUCTION_PLAN.md` §8 and tick boxes against the live output
4. Spot the bug exercise — 5 broken outputs, identify root cause (10 min)

## 4. Cheatsheet — 1-pager handout

Two-sided A4, lamination optional:

**Side A — Token cheatsheet**
- Color tokens table (semantic only — never `--ssk-colors-*` directly)
- Font scale (h1..h4 / p / label / caption / button) with size + weight + use case
- Spacing tokens (page / section / container / stack / row / cluster / table-cell)
- Radius / Elevation tokens
- Brand list (3 strict: patona / ccs3 / oc2plus) + 5 friendly aliases

**Side B — Component picking + vibe-code DoD**
- Decision tree (text → heading/label/p/caption · status → badge/tag/button · layout → page-header/filter-bar/app-shell)
- DoD checklist (10 items from Plan §8)
- "If MCP and Suki Designer disagree, skill wins"
- Top 5 traps (themeColor enum, customCell dataIndex, CDN imports, CSS export, font ≥18px)

## 5. Office hours weekly (Tier 1)

- 30 minutes every Wednesday afternoon
- DS team member rotates as host
- Designer team brings vibe-code outputs that confused them
- Run live debug → output goes to memory `feedback_*` files for AI to reuse

## 6. Success metrics

| Metric | Baseline | Target after 1 month |
|--------|----------|----------------------|
| Designer-led vibe-code attempts per week | 0 (today) | ≥ 3 |
| Outputs passing DoD on first try | unknown (no measurement) | ≥ 70% |
| Time-to-fix when output broken | "ask Dev" | < 15 min self-serve via cheatsheet |
| Post-workshop survey "confidence to vibe-code" | 1-2/5 (assumed) | 4-5/5 |

## 7. Owner + timeline

| Role | Responsibility |
|------|----------------|
| **Designer Lead** | Run workshops + own cheatsheet content |
| **DS team** | Provide content for token/provider/component sections + live debugging in office hours |
| **PM** | Schedule sessions + track metrics |

**Timeline (parallel to Phase A-D):**

```
Week 1: Designer Lead + DS team co-author cheatsheet draft
Week 2: Cheatsheet v1 + Session 1 recorded
Week 3: Session 1 live + iterate from Q&A
Week 4: Session 2 live + start office hours
Week 5+: Office hours weekly + measure success metrics monthly
```

## 8. Tickets to file (when Designer Lead approves)

- DES-XXXX — [P-E-1] Author DS 3.0 cheatsheet 1-pager (Designer Lead + DS team)
- DES-XXXX — [P-E-2] Run Workshop Session 1 (Designer Lead)
- DES-XXXX — [P-E-3] Run Workshop Session 2 + start office hours (Designer Lead)
- DES-XXXX — [P-E-4] Tier 2 Product team overview (Designer Lead + PM)

---

## Reference

- /lead-uxui review: `DS3_VIBECODE_PRODUCTION_PLAN.md` §12.2.2
- Suki Designer skill stakeholders: `~/.claude/skills/suki-designer/CONTEXT.md` last section
- Top 5 traps: `~/.claude/projects/.../memory/feedback_ds3_vibe_code_traps.md`
