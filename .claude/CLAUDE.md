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

### Heading tokens are for ACTUAL headings only (DS 3.0 vs DS 1.0 drift)

DS 1.0 used `--font-size-h4` (24px) as a generic "important text" size. **DS 3.0 reverses this:**
heading tokens (h1–h4) belong to real headings only. UI body contexts use `--font-size-p`,
`--font-size-label`, `--font-size-button`, or `--font-size-caption`.

| Component context | Correct token | Size |
|-------------------|---------------|------|
| Sidebar item, list item, menu item | `--font-size-p` | 20px |
| Form input value, table cell value, body paragraph | `--font-size-p` | 20px |
| Form label, UI label, table column header | `--font-size-label` | 20px |
| **KPI / stat card label** (e.g. "ยอดขายวันนี้") | `--font-size-label` | 20px |
| **Tab pill text** (e.g. "ทั้งหมด", "รอยืนยัน") | `--font-size-label` | 20px |
| Button text, chip text | `--font-size-button` | 18px |
| Helper text, hint, badge content | `--font-size-caption` | 18px |
| **Table cell timestamp** (e.g. "2026-05-08 14:23") | `--font-size-caption` | 18px |
| **KPI delta** (e.g. "↗ 12.5% vs yesterday") | `--font-size-caption` | 18px |
| **Page header subtitle / description** (under `<ssk-page-header>` title) | `--font-size-p` | 20px |
| Page title (most pages, via `<ssk-page-header>`) | `--font-size-h4` | 24px |
| Card title, modal subsection title, toast title | `--font-size-h4` | 24px |
| Section heading, modal title | `--font-size-h3` | 28px |
| Hero / landing standalone page title | `--font-size-h2` | 36px |
| Marketing hero | `--font-size-h1` | 44px |
| KPI value (big stat number) | `--font-size-h2`/`h3` (visual UI) | 36/28px |

> **Rule of thumb:** if removing the element's text would still leave a meaningful
> heading hierarchy on the page, it's a heading → use `h*`. Otherwise → `p`/`label`/`caption`.

> **Enforced by:** `src/__tests__/token-spec.test.ts` — "non-heading components do not
> use --font-size-h[1-4] for body text" — ratchet rule. Adding new misuse fails CI.

## Spacing Tokens (body content composition)

DS 3.0 ships **semantic spacing tokens** for body content layout. Pattern + component
authors MUST use these tokens, not hardcoded px values, so UX/UI can tune spacing
globally without touching every file.

| Context | Token | Default |
|---------|-------|---------|
| **Page padding** (horizontal) | `--space-page-x` | 24px |
| **Page padding** (vertical) | `--space-page-y` | 24px |
| **Section gap** (between major page sections) | `--space-section` | 24px |
| **Container padding** (card/panel content inline) | `--space-container-x` | 20px |
| **Container padding** (toolbar/header/footer block) | `--space-container-y` | 16px |
| **Stack gap** (vertical column flex / grid rows) | `--space-stack` | 16px |
| **Row gap** (horizontal toolbars) | `--space-row` | 12px |
| **Cluster gap** (icon+text, button group, tight inline) | `--space-cluster` | 8px |
| **Table cell** (padding inline) | `--space-table-cell-x` | 20px |
| **Table cell** (padding block) | `--space-table-cell-y` | 14px |

```css
/* CORRECT */
padding: var(--space-page-y, 24px) var(--space-page-x, 24px);
gap:     var(--space-stack, 16px);
padding: var(--space-table-cell-y, 14px) var(--space-table-cell-x, 20px);

/* FORBIDDEN (in components/patterns) */
padding: 24px;           /* hardcode */
gap: 16px;               /* hardcode */
margin: 12px;            /* hardcode */
```

> **Enforced by:** `src/__tests__/token-spec.test.ts` — "components should use
> semantic spacing tokens" — ratchet rule, baseline 114. Adding new hardcoded
> spacing without a token fails CI.

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
| `DS3_VIBECODE_PRODUCTION_PLAN.md` | Active plan — vibecode quality blockers + roadmap |

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
