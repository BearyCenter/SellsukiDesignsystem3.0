/**
 * Pattern registry — single iteration point for tests + MCP.
 *
 * Each pattern registers itself by importing this module's `register()` helper
 * from its `index.ts`. The contract test loops `listPatterns()`; ds3-mcp uses
 * `getPattern(name)` to lookup a specific pattern.
 */

import type { Brand, PatternElementClass, PatternMetadata } from "./types";

const _registry = new Map<string, PatternElementClass<unknown>>();

export function register(cls: PatternElementClass<unknown>): void {
  if (_registry.has(cls.metadata.name)) {
    return; // idempotent — re-registration during HMR is safe
  }
  _registry.set(cls.metadata.name, cls);
}

export function listPatterns(): PatternElementClass<unknown>[] {
  return [..._registry.values()];
}

export function getPattern(
  name: string,
): PatternElementClass<unknown> | undefined {
  return _registry.get(name);
}

export function listMetadata(): PatternMetadata<unknown>[] {
  return listPatterns().map((cls) => cls.metadata);
}

/** Convenience: render a pattern by name to HTML string. Returns undefined if not found. */
export function renderPatternHtml(
  name: string,
  brand: Brand,
  data?: unknown,
): string | undefined {
  return _registry.get(name)?.toHtmlString(brand, data);
}
