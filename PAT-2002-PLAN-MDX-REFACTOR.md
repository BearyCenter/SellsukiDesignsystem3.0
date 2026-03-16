# Plan: Refactor MDX Files to Match Color.mdx Pattern

**Date:** 2026-03-10 (updated 2026-03-13)
**Goal:** Remove all raw HTML from the 3 MDX files and use custom components the same way Color.mdx uses `ColorPalette` / `ColorItem`.

---

## How Color.mdx Works (Reference)

```mdx
import { Meta, ColorPalette, ColorItem } from '@storybook/blocks';
import { defaultTheme } from "../../../src/contexts/theme/default";

<Meta title="Typography/Colors" />

## Sellsuki Design System : Base Colors

<ColorPalette>
  {Object.entries(defaultTheme.colors).map(([k, v]) => (
    <ColorItem key={k} title={k} colors={{ ...v }} />
  ))}
</ColorPalette>
```

Key characteristics:
- Zero raw HTML (`<table>`, `<tr>`, `<td>`) in MDX
- MDX only does: import + Meta + heading + component
- Rendering logic lives in the component file, not in MDX

---

## Token Strategy Change (Updated 2026-03-13)

**Previous approach:** TokenPalette.tsx imports CSS files via `?raw` and parses tokens with regex.

**New approach:** Move token variables from the 3 CSS files into `src/contexts/theme/default.ts` as TypeScript exports. TokenPalette.tsx imports them directly — no CSS parsing needed. The CSS files are not used.

---

## TypeScript Variables in `default.ts`

No new types added to `src/types/theme.ts`.

### From `spacing.css`

```ts
export const defaultSpacePrimitives: Record<string, { rem: string; px: number | null }> = {
  "space-0":    { rem: "0",        px: 0    },
  "space-1":    { rem: "0.065rem", px: 1    },
  // ...
  "space-9999": { rem: "9999rem",  px: null }, // pill radius
};

export const defaultSpacingTokens: Record<string, string> = {
  "spacing-none": "space-0",
  "spacing-xxs":  "space-1",
  // ...
};
```

### From `border.css`

```ts
export const defaultBorderTokens: Record<string, string> = {
  "border-none": "space-0",
  "border-xxs":  "space-1",
  "border-xs":   "space-2",
  "border-sm":   "space-4",
};
```

### From `border-radius.css`

```ts
export const defaultRadiusTokens: Record<string, string> = {
  "radius-none": "space-0",
  "radius-xxs":  "space-2",
  // ...
  "radius-full": "space-9999",
};
```

---

## Target: What Our MDX Files Should Look Like

**Spacing.mdx:**
```mdx
import { Meta } from '@storybook/blocks';
import { SpacingPalette } from '../../components/TokenPalette';

<Meta title="Typography/Spacing" />

## Sellsuki Design System : Spacing

<SpacingPalette />
```

**BorderRadius.mdx:**
```mdx
import { Meta } from '@storybook/blocks';
import { RadiusPalette } from '../../components/TokenPalette';

<Meta title="Typography/Border Radius" />

## Sellsuki Design System : Border Radius

<RadiusPalette />
```

**Border.mdx:**
```mdx
import { Meta } from '@storybook/blocks';
import { BorderPalette } from '../../components/TokenPalette';

<Meta title="Typography/Border" />

## Sellsuki Design System : Border

<BorderPalette />
```

---

## Implementation Phases

### Phase 1 — Add token exports to `src/contexts/theme/default.ts`

Add `defaultSpacePrimitives`, `defaultSpacingTokens`, `defaultBorderTokens`, `defaultRadiusTokens` as exported constants using inline `Record<string, ...>` types. No changes to `src/types/theme.ts`.

### Phase 2 — Create `.storybook/components/TokenPalette.tsx`

Single component file. Exports 3 components that import token objects from `default.ts`:

| Component | Source | Renders |
|-----------|--------|---------|
| `SpacingPalette` | `defaultSpacePrimitives` + `defaultSpacingTokens` | Name / Primitive / rem / px / bar |
| `RadiusPalette` | `defaultRadiusTokens` + `defaultSpacePrimitives` | Name / Primitive / px / box |
| `BorderPalette` | `defaultBorderTokens` + `defaultSpacePrimitives` | Name / Primitive / px / border box |

No CSS `?raw` imports. No regex parsing.

### Phase 3 — Rewrite 3 MDX files

Replace all `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<td>` in each MDX with one component tag. Each MDX becomes ~7 lines total.

### Phase 4 — CSS files not used

`spacing.css`, `border.css`, `border-radius.css` are not imported anywhere. The 4 TypeScript variables in `default.ts` are the sole source of truth for these tokens.

---

## File Changes

| Action | File |
|--------|------|
| EDIT   | `src/contexts/theme/default.ts` — add 4 token exports |
| CREATE | `.storybook/components/TokenPalette.tsx` |
| EDIT   | `.storybook/stories/Typography/Spacing.mdx` |
| EDIT   | `.storybook/stories/Typography/BorderRadius.mdx` |
| EDIT   | `.storybook/stories/Typography/Border.mdx` |

---

## Risks

| Level | Item |
|-------|------|
| LOW | `.tsx` in `.storybook/` — Vite + Storybook handles TSX natively, no config needed |
| LOW | React must be available — confirmed, Storybook uses React for block rendering |
| NONE | No CSS parsing / regex — token values come directly from TS objects |

## Complexity: LOW

---

**WAITING FOR CONFIRMATION**: Proceed?
