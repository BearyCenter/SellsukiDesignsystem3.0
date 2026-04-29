# sellsuki-components (DS 3.0)

Design System 3.0 — Lit Web Components library.
Package: `@uxuissk/design-system-core`
Stack: **Lit 3**, TypeScript, Vite 6, Storybook 8, published to npm.

DS 3.0 = DS 1.0 Architecture (Lit Web Components, framework-agnostic) + DS 2.0 Visual Quality (token values, font standards, design language).

## Source layout

```
src/
  elements/       ← atomic elements (button, badge, avatar, input …)
  components/     ← composite components (dropdown, sidebar, charts …)
  contexts/       ← Lit context providers (theme, i18n, toast)
  types/          ← shared TypeScript types
  utils/          ← helpers
  assets/         ← fonts.css
  main.ts         ← barrel export (everything public)
.storybook/
  stories/        ← CSF3 stories, one folder per component
```

## Font Size Rules (STRICT — applies everywhere)

| Rule | Detail |
|------|--------|
| **Minimum 18px** | `--font-size-caption` (18px) is the absolute minimum for all text |
| **Token-only** | Always `var(--font-size-*)` — never hardcode px values |
| **No Tailwind size classes** | `text-xs` (12px), `text-sm` (14px) are **FORBIDDEN** for text |
| **No inline font-size** | Never `style="font-size: 14px"` or `fontSize: "12px"` |

```css
/* CORRECT */
font-size: var(--font-size-caption, 18px);   /* minimum — helper text */
font-size: var(--font-size-p, 20px);         /* body text */
font-size: var(--font-size-label, 20px);     /* labels */
font-size: var(--font-size-h4, 24px);        /* sub-heading */
font-size: var(--font-size-h3, 28px);        /* heading */
font-size: var(--font-size-h2, 36px);        /* section title */
font-size: var(--font-size-h1, 44px);        /* page title */

/* FORBIDDEN */
font-size: 12px;                  /* below minimum */
font-size: 14px;                  /* below minimum */
font-size: 16px;                  /* below minimum */
className="text-xs"               /* Tailwind 12px — FORBIDDEN */
className="text-sm"               /* Tailwind 14px — FORBIDDEN */
style={{ fontSize: "13px" }}      /* inline hardcode — FORBIDDEN */
```

> Exception: avatar initials at xs/sm size (10–12px) are intentional visual UI.
> Icon-only elements with no text may use visual sizing as needed.

## Component rules (every component must follow)

| Rule | Detail |
|------|--------|
| `:host { display: ... }` | Always set in `static styles` |
| Token-only styling | No hardcoded color/size/font — use semantic tokens |
| Single registration | `ssk-*` เท่านั้น — ไม่มี alias ไม่มี dual prefix |
| `bubbles + composed` | All custom events must have `bubbles: true, composed: true` |
| No `console.log` | In production code |

### Guard pattern (required for every element)

```typescript
if (!customElements.get("ssk-foo")) { customElements.define("ssk-foo", FooElement); }
```

## Token architecture

```
Layer 1 — Primitive   --ssk-colors-gray-800: #1F2937
Layer 2 — Semantic    --text-primary: var(--ssk-colors-gray-800)
                      --bg-primary, --stroke-primary, --fg-brand-primary …
Layer 3 — Compat      --background-primary: var(--bg-primary)  ← DS 1.0 bridge
Layer 4 — Brand       injectSemanticTokens("patona"|"ccs3"|"oc2plus")
```

Key semantic tokens: `--text-primary`, `--text-secondary`, `--bg-primary`, `--bg-primary-hover`,
`--stroke-primary`, `--stroke-secondary`, `--fg-brand-primary`, `--bg-brand-secondary`,
`--text-disabled`, `--bg-disabled`,
`--font-h1`..`--font-h4`, `--font-p`, `--font-label`, `--font-caption`, `--font-button`,
`--font-size-h1`..`--font-size-h4`, `--font-size-p`, `--font-size-label`, `--font-size-caption`,
`--weight-h1`..`--weight-h4`, `--weight-p`, `--weight-label`, `--weight-button`,
`--radius-sm`..`--radius-xl`, `--elevation-sm`..`--elevation-xl`.

Never use `--ssk-colors-*` primitives directly in components — always go through semantic tokens.

## Key files

| File | Purpose |
|------|---------|
| `src/main.ts` | Public barrel export |
| `src/contexts/theme/semantic-tokens.ts` | `injectSemanticTokens(brand)` + `Brand` type |
| `src/utils/deprecated-aliases.ts` | MutationObserver `ssk-*` deprecation warnings |
| `src/components/app-shell/index.ts` | `ds-app-shell` grid layout shell |
| `src/components/charts/` | Zero-dep SVG charts (line, bar, donut) |
| `.storybook/stories/` | All CSF3 stories |
| `DS_UPGRADE.md` | Phase-by-phase upgrade master plan |

## npm scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build library (`dist/`) |
| `npm run storybook` | Storybook 8 dev server |
| `npm run build-storybook` | Build Storybook static |
| `npm run type-check` | TypeScript check (no emit) |
| `npm run lint` | ESLint |
| `npm run generate:country` | Regenerate country icon component from SVGs |

## Rules (auto-loaded from `.claude/rules/`)

- `jira.md` — Jira MCP tool usage, rate limiting, correct parameter names
- `outline-collections.md` — Outline workspace collection IDs
- `project.md` — Jira project + team context

## Brand type

Only three values exist: `"patona"` | `"ccs3"` | `"oc2plus"`.
`AppShellProvider` maps friendly product names to these internally.
