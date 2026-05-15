# Phase C — Pattern SoT scale validation (Pattern #2)

> **Parent plan:** `DS3_VIBECODE_PRODUCTION_PLAN.md` §6 Phase C
> **Parent Epic:** [DES-2035](https://sellsuki.atlassian.net/browse/DES-2035)
> **Status:** Scoping draft — not yet ticketed
> **Goal:** Validate Pattern SoT scales — Pattern #2 (Product List) must be ≤ 30% of Pattern #1 effort

---

## 1. Why Pattern #2

Pattern #1 (Order Management) landed in v3.4.0 (committed `b567f66`). Memory `project_vibecode_push.md` notes:

> Pattern #2 (Product List) — Validates "scale claim" — effort target ≤30% of pattern #1

If Pattern #2 effort > 30% of Pattern #1, the Pattern SoT approach **does not scale** for the 4 Vibecode Templates roadmap → must pivot before investing in Patterns #3/#4.

## 2. Pattern #1 effort baseline (Order Management)

To measure relative effort accurately, baseline Pattern #1 first. Best evidence available:

| Artifact | Files / lines | Source |
|----------|--------------|--------|
| `src/patterns/types.ts` | `Pattern<T>` + `RichnessSpec` interfaces | Initial foundation work — counts once |
| `src/patterns/registry.ts` | `listPatterns()` / `getPattern()` lookup | Initial foundation work — counts once |
| `src/patterns/order-management/mock.ts` | Mock data | Pattern-specific |
| `src/patterns/order-management/index.ts` | Lit element + `render()` + `toHtmlString()` | Pattern-specific |
| `.storybook/stories/Patterns/OrderManagement/*.stories.ts` | 4 variants (incl. Bounded600) | Pattern-specific |
| `ds3-preview` integration | `<ssk-pattern-order-management>` consumed | Cross-repo (counts as integration, not Pattern #1 cost) |
| Contract test | 7 base rules × 3 brands | Reusable framework — counts once |

**Action 1.1 (DS team):** Open `src/patterns/order-management/` and compute:
- Lines of code for Pattern-specific files only (exclude types.ts / registry.ts / contract framework)
- Person-hours from git log between first commit creating the folder and the v3.4.0 release commit

**Action 1.2 (DS team):** Strip Pattern #1 work into 3 buckets:
- **Bucket A (one-time foundation):** types.ts, registry.ts, contract framework, Storybook decorator setup
- **Bucket B (Pattern #1 specific):** mock + Lit element + 4 stories
- **Bucket C (cross-repo integration):** ds3-preview consumption wire-up

→ **Pattern #2 effort is compared against Bucket B only** (not the whole stack)

## 3. Pattern #2 candidate — Product List

**Why Product List?**
- High-traffic in Sellsuki commerce products
- Exercises different DS components than Order Management:
  - Order Mgmt: table + status badges + filter tabs + page header
  - Product List: card grid OR table with image column + price + inventory + actions
- If both succeed → confirms Pattern SoT covers diverse layouts
- Real product team demand exists (per backlog discussions in memory)

**Alternative candidate to consider:** "Customer Detail" page — uses different layout primitives (info card + activity timeline + related lists)

## 4. Go / no-go criteria

### Effort target

```
Pattern #2 Bucket B effort ≤ 30% of Pattern #1 Bucket B effort
```

If Pattern #1 Bucket B = X hours, Pattern #2 Bucket B must be ≤ 0.3 × X.

### Quality gates (both must pass)

- [ ] Pattern #2 passes the same 7 contract rules × 3 brands × ≥4 Storybook variants
- [ ] Pattern #2 renders correctly in ds3-preview with no Pattern-specific code in ds3-preview repo (consumed via npm just like Pattern #1)
- [ ] Pattern #2 reuses Bucket A foundation unchanged — if foundation needs new fields/methods, count those changes as "Bucket A leak" red flag

### Red flags (any single one = no-go, pivot needed)

- 🚩 Pattern #2 requires new `types.ts` fields not in Pattern #1 → foundation underspec'd
- 🚩 Pattern #2 needs hand-written htmlSource (Pattern #1 also has this — must be auto-generated; tracked in memory as scaling work remaining)
- 🚩 Pattern #2 takes Designer > 50% of Pattern #1 actual designer time
- 🚩 ds3-preview consumption requires custom container in preview repo

## 5. Owner + timeline

| Role | Responsibility |
|------|----------------|
| **Designer team** | Owns Pattern definition (UX flow, content, rich data) — per Suki Designer `CONTEXT.md` Stakeholders section |
| **DS team** | Owns Lit element implementation + Storybook stories + ds3-preview integration |
| **Product team** | Validates Pattern #2 matches real product use case |

**Timeline (3 weeks per Plan §6):**

```
Week 1
  ├── Designer: Pattern #2 spec (use case, mock data shape, richness rules)
  ├── DS team: extract Bucket A learnings from Pattern #1, prep abstractions
  └── Product team: validate Pattern #2 candidate is real demand

Week 2
  ├── DS team: implement Pattern #2 (mock + Lit element + Storybook)
  ├── End-of-week checkpoint: effort tally, foundation leak check
  └── 🚦 GO/NO-GO retrospective decision (Designer + DS + Product)

Week 3
  ├── If GO: ds3-preview integration + npm publish + plan Pattern #3
  └── If NO-GO: retrospective + pivot proposal
```

## 6. Open questions for stakeholder meeting

1. Who owns measuring "Pattern #1 actual effort"? Designer team has the hours; DS team has the commit count.
2. Pattern #2 candidate — Product List vs Customer Detail vs other? Need Product team input.
3. Does foundation refactor (if Pattern #2 reveals gaps) count as Pattern #2 effort or Phase D infrastructure cost?
4. Pattern MCP endpoint (Plan §11.2.5 `list_patterns` / `get_pattern`) — ship with Pattern #2 or wait for #3?
5. If go-decision, who confirms Pattern #3 candidate before Week 4?

## 7. Tickets to file (when go-decision reached)

Draft for when Designer + DS + Product agree on candidate:

- DES-XXXX — [P-C-1] Define Pattern #2 spec (Designer)
- DES-XXXX — [P-C-2] Measure Pattern #1 Bucket B baseline (DS team)
- DES-XXXX — [P-C-3] Implement Pattern #2 mock + Lit element + 4 stories (DS team)
- DES-XXXX — [P-C-4] Pattern MCP endpoint scaffold (`list_patterns` / `get_pattern`)
- DES-XXXX — [P-C-5] Week-2 GO/NO-GO retrospective (all teams)

All file under [DES-2035](https://sellsuki.atlassian.net/browse/DES-2035).

---

## Reference

- Pattern SoT context: `~/.claude/projects/.../memory/project_vibecode_push.md` (v3.4.0)
- Three-repo architecture: `~/.claude/projects/.../memory/project_ds3_3repo_architecture.md`
- Active plan: `DS3_VIBECODE_PRODUCTION_PLAN.md`
