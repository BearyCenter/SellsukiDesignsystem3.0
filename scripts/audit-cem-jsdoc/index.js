/**
 * DES-2040 / DES-2042 — JSDoc coverage audit for `dist/custom-elements.json`.
 *
 * Counts how many component classes, attributes, public fields, events, slots,
 * CSS parts, and CSS custom properties carry a non-empty description. The
 * quantity gap surfaced here is the work tracked by DES-2042 (author rich
 * `@description` / `@example` / `@fires` / `@slot` blocks per component).
 *
 * Why: AI consumers (vibe-code, MCP server, autocomplete) lean on these
 * description strings to suggest the right component / attribute. An empty
 * description means the AI has to guess from the type alone — that's how we
 * end up with `ssk-button` next to a hand-rolled `<button>` in generated code.
 *
 * Run:  node scripts/audit-cem-jsdoc/index.js          (one-shot CLI)
 *        npm run audit:cem-jsdoc                       (via package script)
 *
 * Ratchet enforcement lives in `src/__tests__/cem-jsdoc-spec.test.ts`.
 */

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const MANIFEST = path.join(ROOT, "dist", "custom-elements.json");

/**
 * @typedef {object} CoverageBucket
 * @property {number} total
 * @property {number} withDescription
 */

/**
 * @typedef {object} ComponentBucket
 * @property {number} total
 * @property {number} withDescription
 * @property {string[]} missing  Tag names of components missing class-level description.
 */

/**
 * @typedef {object} AuditResult
 * @property {ComponentBucket} components
 * @property {CoverageBucket}  attributes
 * @property {CoverageBucket}  fields
 * @property {CoverageBucket}  events
 * @property {CoverageBucket}  slots
 * @property {CoverageBucket}  cssParts
 * @property {CoverageBucket}  cssProperties
 */

/** A description "counts" as present when it is a non-empty trimmed string. */
function hasDescription(entry) {
  return typeof entry?.description === "string" && entry.description.trim().length > 0;
}

/**
 * Walks the manifest once and returns coverage counts + a sample of missing
 * component descriptions. Pure data — formatting / process.exit live in main().
 *
 * @param {string} [manifestPath]
 * @returns {AuditResult | null}  `null` when the manifest doesn't exist yet.
 */
export function auditManifest(manifestPath = MANIFEST) {
  if (!existsSync(manifestPath)) return null;
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

  const result = {
    components:    { total: 0, withDescription: 0, missing: [] },
    attributes:    { total: 0, withDescription: 0 },
    fields:        { total: 0, withDescription: 0 },
    events:        { total: 0, withDescription: 0 },
    slots:         { total: 0, withDescription: 0 },
    cssParts:      { total: 0, withDescription: 0 },
    cssProperties: { total: 0, withDescription: 0 },
  };

  for (const mod of manifest.modules ?? []) {
    for (const decl of mod.declarations ?? []) {
      // Only count classes that actually register a custom element — base
      // classes (`LitElement` subclasses without `tagName`) aren't shipped API.
      if (decl.kind !== "class" || !decl.tagName) continue;

      result.components.total++;
      if (hasDescription(decl)) {
        result.components.withDescription++;
      } else {
        result.components.missing.push(decl.tagName);
      }

      for (const attr of decl.attributes ?? []) {
        result.attributes.total++;
        if (hasDescription(attr)) result.attributes.withDescription++;
      }
      for (const member of decl.members ?? []) {
        // Public fields = the prop surface AI sees. Private/protected fields
        // are implementation detail — don't count them against coverage.
        if (member.kind === "field" && !member.privacy) {
          result.fields.total++;
          if (hasDescription(member)) result.fields.withDescription++;
        }
      }
      for (const ev of decl.events ?? []) {
        result.events.total++;
        if (hasDescription(ev)) result.events.withDescription++;
      }
      for (const slot of decl.slots ?? []) {
        result.slots.total++;
        if (hasDescription(slot)) result.slots.withDescription++;
      }
      for (const part of decl.cssParts ?? []) {
        result.cssParts.total++;
        if (hasDescription(part)) result.cssParts.withDescription++;
      }
      for (const prop of decl.cssProperties ?? []) {
        result.cssProperties.total++;
        if (hasDescription(prop)) result.cssProperties.withDescription++;
      }
    }
  }

  return result;
}

function formatRow(label, bucket) {
  const total = bucket.total;
  const have  = bucket.withDescription;
  const miss  = total - have;
  const pct   = total === 0 ? "—" : `${Math.round((100 * have) / total)}%`;
  return `  ${label.padEnd(22)} ${String(have).padStart(5)} / ${String(total).padEnd(5)}  ${pct.padStart(5)}   missing=${miss}`;
}

function formatReport(audit) {
  return [
    "Custom Elements Manifest — JSDoc coverage audit",
    "==============================================",
    "",
    formatRow("Component classes",     audit.components),
    formatRow("Attributes",            audit.attributes),
    formatRow("Public fields",         audit.fields),
    formatRow("Events",                audit.events),
    formatRow("Slots",                 audit.slots),
    formatRow("CSS parts",             audit.cssParts),
    formatRow("CSS custom properties", audit.cssProperties),
    "",
  ].join("\n");
}

// CLI entry — guard against being imported by the test runner.
// Using `realpathSync(argv[1])` keeps Windows path comparison stable.
const argvScript = process.argv[1] ? path.resolve(process.argv[1]) : "";
const thisScript = fileURLToPath(import.meta.url);
if (argvScript === thisScript) {
  const audit = auditManifest();
  if (!audit) {
    console.error("✗ dist/custom-elements.json not found — run `npm run build` first.");
    process.exit(1);
  }
  console.log(formatReport(audit));
  if (audit.components.missing.length > 0) {
    const sample = audit.components.missing.slice(0, 20);
    console.log(`Components missing class-level description (showing ${sample.length} of ${audit.components.missing.length}):`);
    for (const tag of sample) console.log(`  - ${tag}`);
    if (audit.components.missing.length > sample.length) {
      console.log(`  ... +${audit.components.missing.length - sample.length} more`);
    }
  }
}
