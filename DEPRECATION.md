# Deprecation Notice: @sellsuki-org/sellsuki-components

**Effective:** DS 3.0 release (v3.0.0)

---

## Summary

`@sellsuki-org/sellsuki-components` is deprecated and will no longer receive updates.

All products should migrate to:

```
@uxuissk/design-system-core@3.0.0
```

---

## Migration

See [MIGRATION.md](./MIGRATION.md) for the complete step-by-step migration guide.

The migration is designed to be **non-breaking**: `ssk-*` element names and `--ssk-*` CSS tokens
continue to work in DS 3.0. The only required change is the package name.

---

## Timeline

| Date | Action |
|------|--------|
| DS 3.0 release | `@sellsuki-org/sellsuki-components` frozen — no new features |
| 3 months after release | `@sellsuki-org/sellsuki-components` archived on GitLab |
| 6 months after release | `ssk-*` deprecation warnings promoted to `console.error` |

---

## What changed

- Package: `@sellsuki-org/sellsuki-components` → `@uxuissk/design-system-core`
- Element tags: `ssk-*` aliases remain, `ds-*` are canonical
- Tokens: `--ssk-colors-*` primitives remain, semantic tokens (`--text-primary`, `--bg-primary`, etc.) are the correct override layer
- Brand injection: same `injectSemanticTokens()` API, or use new `<ds-app-shell-provider brand="...">` component
- New components: AppShell, FeaturePageScaffold, AppShellProvider, Line/Bar/Donut charts, SidebarAccountSwitcher

---

## Questions

Contact the UX/UI Design System team or open a ticket in Jira project `LR`.
