# DS 3.0 Vibecode Contract — Golden Fixtures

These HTML fixtures are the **canonical reference** for what a DS 3.0 vibecode template
must look like. They are validated by `vibecode-contract.test.ts` against DS 3.0 standards.

## Consumers

- **`@uxuissk/ds3-mcp`** — its CI imports these fixtures to verify template generators emit
  output that conforms to DS 3.0 (no hardcoded hex, valid `brand`, `ssk-*` tags only, etc.)
- **Product teams** — when vibe-coding a new screen, use these as "what good looks like"

## Files

| File | Purpose |
|------|---------|
| `feature-page.{ccs3,patona,oc2plus}.html` | Brand-switching reference — same template, all 3 brands |
| `product-list.ccs3.html` | List page pattern (table + filters + bulk actions) |
| `product-form.ccs3.html` | Form page pattern (inputs + actions) |
| `analytics-widget.ccs3.html` | Dashboard widget pattern (chart card + KPI) |

## Adding a new template

1. Create `<template-name>.<brand>.html` in this directory
2. Validate it: `npm test -- vibecode-contract`
3. If it fails — fix the fixture (DS 3.0 violations are **always wrong**)
