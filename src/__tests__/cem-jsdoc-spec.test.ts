/**
 * CEM JSDoc Coverage Ratchet — DS 3.0
 *
 * Asserts that JSDoc coverage in `dist/custom-elements.json` never regresses.
 * Authoring `@description` / `@example` / `@fires` / `@slot` blocks per
 * component is tracked in DES-2042; this gate makes sure the work, once shipped,
 * doesn't quietly slip back.
 *
 * Baselines below match the manifest emitted by `npm run build` at the time
 * the ratchet was introduced (2026-05-19, v3.5.2). Every JSDoc PR MUST lower
 * the relevant baseline by the count it improved.
 *
 * If `dist/custom-elements.json` doesn't exist (developer ran `vitest` without
 * a prior `npm run build`), the suite emits a console warning and skips — CI
 * runs `build` before `test` so the gate is enforced where it matters.
 */

import { describe, it, expect } from "vitest";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { auditManifest } from "../../scripts/audit-cem-jsdoc/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MANIFEST = path.resolve(__dirname, "..", "..", "dist", "custom-elements.json");

const audit = auditManifest(MANIFEST);

// Baselines captured against v3.5.2 (95 components, 1139 attrs).
// Ratchet rule: each PR that adds JSDoc must lower the relevant baseline.
//
// Update history:
//   2026-05-19  initial — events=41 missing, components=91 missing
//   2026-05-19  events JSDoc batch (24 components) — events 41→0, components 91→67
//   2026-05-19  class JSDoc batch (67 components) — components 67→0, slots 0→0
//               (60/60), cssParts 4→0 (5/5) [side-effect of slot/csspart tags
//               authored alongside class descriptions]
//   2026-05-20  attr/field JSDoc 7 batches (3.5.5 → 3.5.11) — attrs 1133→0,
//               fields 1282→144 (89%).
//   2026-05-20  field audit filter refined (skip registeredName / static /
//               `_`-prefixed) + final 8 real public fields authored — fields
//               144→0. ALL CATEGORIES NOW AT 100%; ratchet is zero-tolerance.
const BASELINE = {
  componentsMissing: 0,
  attributesMissing: 0,
  fieldsMissing:     0,
  eventsMissing:     0,
  slotsMissing:      0,
  cssPartsMissing:   0,
} as const;

describe.skipIf(audit === null)("CEM JSDoc coverage ratchet", () => {
  if (audit === null) {
    console.warn(
      "[cem-jsdoc] dist/custom-elements.json not found — run `npm run build` to enforce this gate.",
    );
    return;
  }

  it(`component classes: missing description count ≤ ${BASELINE.componentsMissing}`, () => {
    const missing = audit.components.total - audit.components.withDescription;
    if (missing > BASELINE.componentsMissing) {
      console.warn(
        `[cem-jsdoc] ${missing} components missing class-level description (baseline ${BASELINE.componentsMissing}):\n` +
          audit.components.missing
            .slice(0, 30)
            .map((t) => `  - ${t}`)
            .join("\n") +
          (audit.components.missing.length > 30
            ? `\n  ... +${audit.components.missing.length - 30} more`
            : ""),
      );
    }
    expect(missing).toBeLessThanOrEqual(BASELINE.componentsMissing);
  });

  it(`attributes: missing description count ≤ ${BASELINE.attributesMissing}`, () => {
    const missing = audit.attributes.total - audit.attributes.withDescription;
    expect(missing).toBeLessThanOrEqual(BASELINE.attributesMissing);
  });

  it(`public fields: missing description count ≤ ${BASELINE.fieldsMissing}`, () => {
    const missing = audit.fields.total - audit.fields.withDescription;
    expect(missing).toBeLessThanOrEqual(BASELINE.fieldsMissing);
  });

  it(`events: missing description count ≤ ${BASELINE.eventsMissing}`, () => {
    // Authoring `@fires <event-name> - description` blocks is high-priority for
    // AI consumers — events are how vibe-code wires interactivity, and an
    // un-described event is invisible to autocomplete.
    const missing = audit.events.total - audit.events.withDescription;
    expect(missing).toBeLessThanOrEqual(BASELINE.eventsMissing);
  });

  it(`slots: missing description count ≤ ${BASELINE.slotsMissing}`, () => {
    // Slots are 100% described today — keep them that way. Any new slot
    // without a `@slot <name> - description` line fails this test.
    const missing = audit.slots.total - audit.slots.withDescription;
    expect(missing).toBeLessThanOrEqual(BASELINE.slotsMissing);
  });

  it(`CSS parts: missing description count ≤ ${BASELINE.cssPartsMissing}`, () => {
    const missing = audit.cssParts.total - audit.cssParts.withDescription;
    expect(missing).toBeLessThanOrEqual(BASELINE.cssPartsMissing);
  });
});

// Sanity: make sure the audit shape itself is stable — regressions in the
// analyzer/expander pipeline that drop the manifest entirely should fail loudly.
describe.skipIf(audit === null)("CEM manifest sanity", () => {
  it("manifest contains at least 90 ssk-* components", () => {
    expect(audit!.components.total).toBeGreaterThanOrEqual(90);
  });

  it("manifest contains at least 1000 attributes", () => {
    expect(audit!.attributes.total).toBeGreaterThanOrEqual(1000);
  });
});

// Surface a one-time summary so devs running `vitest` see current coverage
// without invoking the audit script separately.
if (audit !== null && !process.env.CI) {
  const pct = (have: number, total: number) =>
    total === 0 ? "—" : `${Math.round((100 * have) / total)}%`;
  console.info(
    "\n[cem-jsdoc] coverage:" +
      `\n  components ${audit.components.withDescription}/${audit.components.total} (${pct(audit.components.withDescription, audit.components.total)})` +
      `\n  attributes ${audit.attributes.withDescription}/${audit.attributes.total} (${pct(audit.attributes.withDescription, audit.attributes.total)})` +
      `\n  fields     ${audit.fields.withDescription}/${audit.fields.total} (${pct(audit.fields.withDescription, audit.fields.total)})` +
      `\n  events     ${audit.events.withDescription}/${audit.events.total} (${pct(audit.events.withDescription, audit.events.total)})` +
      `\n  slots      ${audit.slots.withDescription}/${audit.slots.total} (${pct(audit.slots.withDescription, audit.slots.total)})\n`,
  );
}
