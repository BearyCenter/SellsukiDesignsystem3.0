/**
 * Type declarations for `scripts/audit-cem-jsdoc/index.js`. The script itself
 * is plain JS (matches the rest of `scripts/`); this `.d.ts` exists so the
 * vitest ratchet at `src/__tests__/cem-jsdoc-spec.test.ts` can import it
 * with full type information.
 */

export interface CoverageBucket {
  total: number;
  withDescription: number;
}

export interface ComponentBucket extends CoverageBucket {
  /** Tag names of components whose class-level description is missing/empty. */
  missing: string[];
}

export interface AuditResult {
  components:    ComponentBucket;
  attributes:    CoverageBucket;
  fields:        CoverageBucket;
  events:        CoverageBucket;
  slots:         CoverageBucket;
  cssParts:      CoverageBucket;
  cssProperties: CoverageBucket;
}

/**
 * Walks `dist/custom-elements.json` and returns JSDoc-coverage counts per
 * category, or `null` when the manifest hasn't been built yet.
 */
export function auditManifest(manifestPath?: string): AuditResult | null;
