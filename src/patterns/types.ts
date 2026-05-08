/**
 * DS 3.0 Page Patterns — public types
 *
 * A "Pattern" is a self-contained Lit custom element (`<ssk-pattern-*>`) that
 * renders a complete page or dashboard using DS 3.0 components. Patterns ship
 * with realistic baked-in mock data, support brand switching via the `brand`
 * attribute, and allow data override via the `.data` property.
 *
 * Pattern elements are consumed by:
 *   1. This repo's Storybook stories (visual development)
 *   2. The ds3-preview repo (drops <ssk-pattern-*> into the Vibecode Templates menu)
 *   3. The ds3-mcp server (serves a pattern's static HTML signature to AI clients)
 *   4. The vibecode-contract test suite (validates each pattern's emitted HTML)
 */

import type { Brand } from "../contexts/theme/semantic-tokens";

// ── Richness contract ────────────────────────────────────────────────────────
// Each pattern declares the structural minimums for its category. The contract
// test asserts these against the rendered HTML — failure = blocking CI red.

export interface RichnessSpec {
  /** Pattern must contain shell skeleton (provider + app-shell + sidebar + top-navbar). */
  requiresAppShell?: boolean;
  /** Minimum number of <ssk-card>-like blocks with numeric content (KPI cards). */
  minStatCards?: number;
  /** Minimum number of <ssk-input>/<ssk-textarea> for forms. */
  minInputs?: number;
  /** Pattern requires a table with ≥ this many body rows. */
  minTableRows?: number;
  /** Pattern requires <ssk-pagination>. */
  requiresPagination?: boolean;
  /** Pattern requires a search input (placeholder contains "ค้นหา" or "search"). */
  requiresSearch?: boolean;
  /** Pattern requires a chart element (line/bar/donut/area). */
  requiresChart?: boolean;
  /** Pattern requires <ssk-tabs>, <ssk-tab-header>, or role="tablist". */
  requiresTabs?: boolean;
}

// ── Pattern metadata (separate from the Lit class) ───────────────────────────
// We keep metadata as a plain object so tests + MCP can introspect without
// instantiating a custom element.

export interface PatternMetadata<TData = unknown> {
  /** Stable kebab-case identifier — used as MCP arg, contract templateName, story title. */
  readonly name: string;
  /** Tag name registered for the pattern element — e.g. "ssk-pattern-order-management". */
  readonly tagName: `ssk-pattern-${string}`;
  /** One-line description rendered in Storybook docs + MCP listings. */
  readonly description: string;
  /** Realistic sample data — used as the element's default `.data` and by `html()`. */
  readonly defaultData: TData;
  /** Required structural elements — enforced by contract test as blocking. */
  readonly richness: RichnessSpec;
}

// ── Pattern element interface ────────────────────────────────────────────────
// Each pattern class extends LitElement and implements this. The static fields
// expose metadata; the instance fields are the live, brand/data props.

export interface PatternElement<TData> {
  /** Brand attribute — controls AppShellProvider. */
  brand: Brand;
  /** Optional data override — falls back to defaultData when undefined. */
  data?: TData;
}

export interface PatternElementClass<TData = unknown> {
  readonly registeredName: PatternMetadata<TData>["tagName"];
  readonly metadata: PatternMetadata<TData>;
  /** Static helper — produces the HTML string consumed by MCP + contract test. */
  toHtmlString(brand: Brand, data?: TData): string;
  new (): PatternElement<TData>;
}

// ── Re-exports ───────────────────────────────────────────────────────────────

export type { Brand };
