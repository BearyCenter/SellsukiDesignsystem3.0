# PAT-2002 Implementation Plan: Setup Spacing Tokens (CSS Variables)

**Jira:** https://sellsuki.atlassian.net/browse/PAT-2002
**Date:** 2026-03-10
**Complexity:** LOW

---

## Requirements Restatement

Create CSS Variables in a 2-tier system matching the new Figma Sellsuki Design System:
- **Tier 1 (Primitives):** `--space-*` — raw numeric values in rem
- **Tier 2 (Semantic):** `--spacing-*`, `--radius-*`, `--border-*` — alias Tier 1 via `var()`

**Out of scope:** No refactoring of existing components — structure setup only.

---

## Current State Analysis

| File | State |
|------|-------|
| `src/assets/global.css` | Scrollbar styles only, no `:root` spacing block |
| `src/contexts/theme/default.ts` | Has `defaultSize` but different scale (not aligned with new Figma tokens) |
| `src/types/theme.ts` | Has `parseThemeToCssVariables()` for runtime JS→CSS conversion |
| `.storybook/stories/Typography/Color.mdx` | Existing token doc page (Color palette) |

**Note:** The existing theme system uses JS-based tokens converted to CSS variables at runtime via `ssk-theme-provider`. The new spacing tokens are **static CSS variables** in `:root` — separate from the existing system, no conflict.

---

## Risks

| Level | Item |
|-------|------|
| LOW | Variable name collision — checked: `--space-`, `--spacing-`, `--radius-`, `--border-` prefixes do not exist in the project |
| LOW | Visual regression — no component refactoring, so no visual impact |
| LOW | Missing import — must ensure new file is imported at the right entry point |

---

## Implementation Phases

### Phase 1: Create CSS Token File

**New file:** `src/assets/spacing-tokens.css`

Separated from `global.css` for clarity — design tokens vs. utility styles.

```css
:root {
  /* Tier 1: Primitives */
  --space-0: 0;
  --space-1: 0.065rem;   /* 1px */
  /* ... */

  /* Tier 2: Semantic — Spacing */
  --spacing-none: var(--space-0);
  /* ... */

  /* Tier 2: Semantic — Border Radius */
  --radius-none: var(--space-0);
  /* ... */

  /* Tier 2: Semantic — Border Width */
  --border-none: var(--space-0);
  /* ... */
}
```

---

### Phase 2: Add Import

**Edit:** `src/assets/global.css`

```css
@import './spacing-tokens.css';
```

---

### Phase 3: Storybook Documentation

**New file:** `.storybook/stories/Typography/Spacing.mdx`

Displays all 3 Tier 2 token groups with visual previews. Follows the same pattern as the existing `Color.mdx`.

---

## File Summary

| Action | File | Note |
|--------|------|------|
| CREATE | `src/assets/spacing-tokens.css` | Token definitions (Tier 1 + Tier 2) |
| EDIT | `src/assets/global.css` | Add `@import` |
| CREATE | `.storybook/stories/Typography/Spacing.mdx` | Storybook docs |

**No component files modified.**

---

## Acceptance Criteria Checklist

- [x] `--spacing-none` to `--spacing-15xl` declared in `:root`
- [x] `--radius-none` to `--radius-full` declared in `:root`
- [x] `--border-none` to `--border-sm` declared in `:root`
- [x] All Tier 2 tokens alias Tier 1 via `var(--space-*)`
- [x] File imported in project (`global.css`)
- [x] No visual regression in existing components
- [x] Storybook page displays spacing tokens
