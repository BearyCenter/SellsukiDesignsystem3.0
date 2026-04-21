# DS 1.0 → DS 3.0 Migration Guide

> DS 3.0 = DS 1.0 Architecture + DS 2.0 Visual Quality  
> **No breaking changes** — `ssk-*` aliases and `--ssk-*` tokens continue to work.

---

## Quick Start

```bash
# Remove DS 1.0
npm uninstall @sellsuki-org/sellsuki-components

# Install DS 3.0
npm install @uxuissk/design-system-core@3.0.0
```

Update your import:

```typescript
// Before
import "@sellsuki-org/sellsuki-components";

// After
import "@uxuissk/design-system-core";
```

That's it for most projects. Everything else below is optional hardening.

---

## Package name

| DS 1.0 | DS 3.0 |
|--------|--------|
| `@sellsuki-org/sellsuki-components` | `@uxuissk/design-system-core` |

---

## Element names

All `ssk-*` names still work. The canonical names are now `ds-*`.

| DS 1.0 `ssk-*` | DS 3.0 `ds-*` |
|----------------|---------------|
| `ssk-button` | `ds-button` |
| `ssk-dropdown` | `ds-dropdown` |
| `ssk-sidebar` | `ds-sidebar` |
| `ssk-modal` | `ds-modal` |
| `ssk-date-picker` | `ds-date-picker` |
| `ssk-dynamic-table` | `ds-dynamic-table` |
| `ssk-code-block` | `ds-code-block` |
| `ssk-app-shell` | `ds-app-shell` *(new)* |
| `ssk-line-chart` | `ds-line-chart` *(new)* |
| `ssk-bar-chart` | `ds-bar-chart` *(new)* |
| `ssk-donut-chart` | `ds-donut-chart` *(new)* |

Deprecation warnings appear in the console when `ssk-*` tags are used — they do not break anything.

---

## Token mapping

DS 3.0 uses **semantic tokens** on Layer 2. Primitive tokens (`--ssk-colors-*`) still resolve,
but components internally use semantics — so overriding a primitive may not affect the component
if the semantic layer stands in the way.

**To customize a color, override the semantic token, not the primitive.**

### Text

| DS 1.0 primitive | DS 3.0 semantic |
|-----------------|-----------------|
| `--ssk-colors-black-900` | `--text-primary` |
| `--ssk-colors-text-400` / `--ssk-colors-gray-500` | `--text-secondary` |
| `--ssk-colors-gray-400` | `--text-disabled` |
| `--ssk-colors-gray-400` (placeholder) | `--text-placeholder` |
| `--ssk-colors-theme-*` (brand text) | `--text-brand-primary` |

### Background

| DS 1.0 primitive | DS 3.0 semantic |
|-----------------|-----------------|
| `--ssk-colors-white-50` / `white` | `--bg-primary` |
| `--ssk-colors-gray-50` | `--bg-primary-hover` |
| `--ssk-colors-gray-100` | `--bg-secondary` |
| `--ssk-colors-gray-200` | `--bg-disabled` |
| `--ssk-colors-background-50` | `--bg-primary` |
| `--ssk-colors-theme-*` (brand solid) | `--bg-brand-solid` |
| `--ssk-colors-theme-*` (brand light) | `--bg-brand-secondary` |

### Stroke / border

| DS 1.0 primitive | DS 3.0 semantic |
|-----------------|-----------------|
| `--ssk-colors-gray-200` | `--stroke-primary` |
| `--ssk-colors-gray-300` | `--stroke-secondary` |
| `--ssk-colors-theme-*` (brand border) | `--stroke-brand` |

### Foreground / icon

| DS 1.0 primitive | DS 3.0 semantic |
|-----------------|-----------------|
| `--ssk-colors-info-500` / `--ssk-colors-theme-*` | `--fg-brand-primary` |
| `--ssk-colors-gray-500` (icon) | `--icon-primary` |

### Typography

| DS 1.0 approach | DS 3.0 semantic |
|-----------------|-----------------|
| hardcoded `font-size: 14px` | `var(--font-size-caption, 18px)` — minimum 18px |
| hardcoded `font-size: 16px` | `var(--font-size-p, 20px)` |
| hardcoded `font-family: ...` | `var(--font-p, sans-serif)` |

---

## Brand / theme injection

### DS 1.0

```typescript
import { injectSemanticTokens } from "@sellsuki-org/sellsuki-components";
injectSemanticTokens("patona");
```

### DS 3.0 — provider component (recommended)

```html
<ds-app-shell-provider brand="patona">
  <ds-app-shell>
    <!-- app content -->
  </ds-app-shell>
</ds-app-shell-provider>
```

Supported `brand` values:

| Product | `brand` value |
|---------|--------------|
| Sellsuki / Shipmunk / Akita / SellsukiPay / Sukispace | `"sellsuki"` |
| Patona | `"patona"` |
| OC2+ | `"oc2plus"` |

### DS 3.0 — programmatic (same as DS 1.0)

```typescript
import { injectSemanticTokens } from "@uxuissk/design-system-core";
injectSemanticTokens("ccs3"); // "patona" | "ccs3" | "oc2plus"
```

---

## New components (DS 3.0 only)

### AppShell

```html
<ds-app-shell navbar-height="64px" sidebar-width="240px">
  <ds-top-navbar slot="navbar"></ds-top-navbar>
  <ds-sidebar slot="sidebar"></ds-sidebar>
  <!-- main content here -->
</ds-app-shell>
```

### FeaturePageScaffold

```html
<ds-feature-page-scaffold>
  <ds-page-header slot="header" title="Orders"></ds-page-header>
  <ds-filter-bar slot="filters"></ds-filter-bar>
  <!-- main content -->
  <div slot="footer">pagination</div>
</ds-feature-page-scaffold>
```

### Charts

```html
<ds-line-chart
  .series=${[{ label: "Revenue", values: [120, 195, 143] }]}
  .labels=${["Jan", "Feb", "Mar"]}
  height="280"
  ?smooth=${true}
  ?show-legend=${true}
></ds-line-chart>

<ds-bar-chart
  .series=${[{ label: "Sales", values: [40, 80, 60] }]}
  .labels=${["Q1", "Q2", "Q3"]}
  height="280"
></ds-bar-chart>

<ds-donut-chart
  .slices=${[
    { label: "Delivered", value: 64 },
    { label: "Pending", value: 22 },
    { label: "Cancelled", value: 14, color: "#ef4444" },
  ]}
  size="220"
  thickness="44"
  center-value="64%"
  center-label="Delivered"
  ?show-legend=${true}
></ds-donut-chart>
```

---

## Upgraded component APIs

### Dropdown — search filter

```html
<ds-dropdown ?search=${true} placeholder="Select...">
  <ds-dropdown-option value="a">Option A</ds-dropdown-option>
  <ds-dropdown-option value="b">Option B</ds-dropdown-option>
</ds-dropdown>
```

The `search` prop adds a text input that filters options by label text.

### Dropdown / all form elements — change event

`change` events now have `bubbles: true, composed: true`. They will propagate through
Shadow DOM and can be caught on any ancestor element:

```javascript
document.addEventListener("change", (e) => {
  if (e.target.tagName === "DS-DROPDOWN") {
    console.log(e.detail.value);
  }
});
```

### DatePicker — keyboard navigation

| Key | Action |
|-----|--------|
| `ArrowDown` / `Enter` | Open calendar |
| `Escape` | Close calendar |

### DynamicTable — row selection

```html
<ds-dynamic-table
  ?selectable=${true}
  .selectedRows=${selectedIds}
  @selection-change=${(e) => setSelectedIds(e.detail.selectedRows)}
>
  <div slot="bulk-actions">
    <button data-action="delete">Delete selected</button>
  </div>
</ds-dynamic-table>
```

Listen for `bulk-action` event: `e.detail = { action: "delete", selectedRows: [...] }`.

### Sidebar — account switcher

```html
<ds-sidebar-account-switcher
  .account=${{ id: "1", name: "John Doe", role: "Admin", avatar: "/avatar.png" }}
  .accounts=${[...]}
  ?expanded=${sidebarExpanded}
  @account-change=${(e) => setCurrentAccount(e.detail)}
></ds-sidebar-account-switcher>
```

### CodeBlock — Shiki syntax highlighting

```html
<ds-code-block
  language="typescript"
  shiki-theme="github-dark"
  .code=${codeString}
></ds-code-block>
```

Shiki renders async — the block updates when highlighting completes. PrismJS is no longer used.

---

## React 18 compatibility

Web Component events don't bubble into React's synthetic event system. Wrap with a ref:

```tsx
import { useRef, useEffect } from "react";

function MyDropdown({ onChange }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const handler = (e) => onChange(e.detail.value);
    el?.addEventListener("change", handler);
    return () => el?.removeEventListener("change", handler);
  }, [onChange]);

  return <ds-dropdown ref={ref} />;
}
```

---

## Checklist

```
□ Update package name in package.json
□ Update import in entry file
□ Verify brand injection (provider or programmatic)
□ Check custom CSS overrides — switch from --ssk-colors-* to semantic tokens
□ Test form elements: change events now bubble through shadow DOM
□ Test keyboard nav on DatePicker (Escape / ArrowDown)
□ Verify React event listeners are attached via addEventListener (not JSX props)
```
