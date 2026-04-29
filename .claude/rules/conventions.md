# DS 3.0 Code Conventions

## Naming

- **Element class**: `PascalCase` matching tag name — `class DropdownButton extends LitElement`
- **Tag names**: `ssk-kebab-case` เท่านั้น
- **File names**: `kebab-case.ts` per class, `index.ts` for barrel
- **Private methods/state**: prefix `_` — `_open`, `_handleClick`, `_doHighlight`

## Token usage

Always use semantic tokens with a fallback:

```css
color: var(--text-primary, #111827);
background: var(--bg-primary, #fff);
border-color: var(--stroke-primary, #e5e7eb);
color: var(--fg-brand-primary, #0ea5e9);
background: var(--bg-brand-secondary, #e0f2fe);
```

**Never** use `--ssk-colors-*` primitives directly in component styles.
**Never** hardcode pixel sizes below 18px for text (--font-caption minimum).

## Semantic token quick reference

| Purpose | Token |
|---------|-------|
| Primary text | `--text-primary` |
| Secondary text | `--text-secondary` |
| Disabled text | `--text-disabled` |
| Page background | `--bg-primary` |
| Hover background | `--bg-primary-hover` |
| Disabled background | `--bg-disabled` |
| Brand accent background | `--bg-brand-secondary` |
| Brand accent foreground | `--fg-brand-primary` |
| Default border | `--stroke-primary` |
| Subtle border | `--stroke-secondary` |
| **Font family** | |
| H1–H4 font | `--font-h1` … `--font-h4` |
| Body font | `--font-p` |
| Label font | `--font-label` |
| Caption font | `--font-caption` |
| Button font | `--font-button` |
| **Font size** | |
| H1 size | `--font-size-h1` (44px) |
| H2 size | `--font-size-h2` (36px) |
| H3 size | `--font-size-h3` (28px) |
| H4 size | `--font-size-h4` (24px) |
| Body size | `--font-size-p` (20px) |
| Label size | `--font-size-label` (20px) |
| Caption size | `--font-size-caption` (18px) |
| Button size | `--font-size-button` (18px) |
| **Font weight** | |
| H1/H2/body weight | `--weight-h1`, `--weight-h2`, `--weight-p` (400) |
| H3 weight | `--weight-h3` (700) |
| H4 weight | `--weight-h4` (500) |
| Label/caption weight | `--weight-label`, `--weight-caption` (400) |
| Button weight | `--weight-button` (600) |
| **Elevation** | |
| Subtle card shadow | `--elevation-sm` |
| Default card shadow | `--elevation-md` |
| Floating panel shadow | `--elevation-lg` |
| Modal / overlay shadow | `--elevation-xl` |

## Custom events

All `dispatchEvent` calls must include:

```typescript
this.dispatchEvent(new CustomEvent("event-name", {
  detail: { ... },
  bubbles: true,    // required — crosses Shadow DOM
  composed: true,   // required — crosses Shadow DOM
}));
```

## Slot-based filtering

To filter slotted content without MutationObserver:

```typescript
const slot = this.shadowRoot?.querySelector("slot:not([name])") as HTMLSlotElement | null;
slot?.assignedElements().forEach((el) => {
  (el as HTMLElement).style.display = condition ? "" : "none";
});
```

## Single registration guard

```typescript
if (!customElements.get("ssk-foo")) { customElements.define("ssk-foo", FooElement); }
```

And in the class:

```typescript
declare global {
  interface HTMLElementTagNameMap {
    "ssk-foo": FooElement;
  }
}
```
