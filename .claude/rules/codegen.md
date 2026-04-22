# DS 3.0 Code Generation

## Country icon generation

The country icon component (`src/elements/icon/country-icon.ts`) is generated from SVG files:

```bash
npm run generate:country
# reads: scripts/generate-country/icons/*.svg
# writes: src/elements/icon/country-icon.ts
```

**Never manually edit** `country-icon.ts` — it will be overwritten on next generation.

To add a new country flag:
1. Add the SVG to `scripts/generate-country/icons/<ISO-3166-1-alpha2>.svg`
2. Run `npm run generate:country`

## Build output

`npm run build` outputs to `dist/` via Vite library mode.
Entry point: `src/main.ts`
Output format: ES module (`dist/sellsuki-components.es.js`) + types (`dist/types/`)

Do not manually edit anything in `dist/`.
