# DS 3.0 Component Architecture

## Layer map

```
src/elements/   ← atomic (no inter-element imports)
src/components/ ← composite (may import from elements, not vice-versa)
src/contexts/   ← Lit context providers (theme, i18n, toast)
src/utils/      ← pure helpers (no Lit, no DOM globals)
```

**Forbidden:**
- `elements/` importing from `components/`
- Any file importing concrete context implementations from another context
- Hardcoded `--ssk-colors-*` primitives inside component styles

## New component checklist

1. Create `src/elements/<name>/index.ts` (atomic) or `src/components/<name>/index.ts` (composite)
2. Export from `src/main.ts`
3. Register with guard pattern (`ssk-*` only)
4. Add `:host { display: ... }` in `static styles`
5. Use only semantic tokens — no hardcoded colors or pixel sizes below spec
6. Create CSF3 story in `.storybook/stories/<Name>/index.stories.ts`
7. All custom events: `bubbles: true, composed: true`

## Lit patterns

```typescript
// Property with attribute binding
@property({ type: Boolean, attribute: "show-legend" })
showLegend = true;

// Reactive state
@state() private _open = false;

// Custom event (always bubbles+composed)
this.dispatchEvent(new CustomEvent("change", {
  detail: { value },
  bubbles: true,
  composed: true,
}));

// ResizeObserver for responsive SVG
connectedCallback() {
  super.connectedCallback();
  this._ro = new ResizeObserver(entries => {
    this._width = entries[0].contentRect.width || 600;
  });
  this.updateComplete.then(() => this._ro?.observe(this));
}
disconnectedCallback() {
  super.disconnectedCallback();
  this._ro?.disconnect();
}
```
