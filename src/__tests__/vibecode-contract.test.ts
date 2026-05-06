/**
 * DS 3.0 Vibecode Contract Test
 *
 * Validates golden-fixture HTML templates in `fixtures/vibecode-templates/`
 * against DS 3.0 standards. These fixtures define what a vibe-coded screen
 * MUST look like — they are consumed by:
 *
 *   1. ds3-mcp CI    — to verify template generators emit conformant output
 *   2. Product team  — as "what good looks like" reference
 *   3. This repo     — as a regression gate against accidental drift
 *
 * Contract rules (all hard-fail):
 *   ① Root element MUST be <ssk-app-shell-provider brand="…">
 *   ② brand attribute MUST be one of: patona | ccs3 | oc2plus
 *   ③ NO hex color literals (#xxx / #xxxxxx) outside `var(...)`
 *   ④ NO inline `font-size: <18px`
 *   ⑤ Custom-element tags MUST start with `ssk-` (no `my-`, `app-`, etc.)
 *   ⑥ NO `text-xs` / `text-sm` Tailwind classes
 *   ⑦ Buttons MUST use `variant`+`tone` API (no legacy `themeColor` / `theme-color`)
 *   ⑧ File naming: <template>.<brand>.html where brand ∈ allowed set
 */

import { describe, it, expect } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = path.resolve(__dirname, "fixtures", "vibecode-templates");

const ALLOWED_BRANDS = ["patona", "ccs3", "oc2plus"] as const;

// ── Collect fixtures ─────────────────────────────────────────────────────────

interface Fixture {
  filename: string;
  templateName: string;
  brand: string;
  content: string;
}

function loadFixtures(): Fixture[] {
  return fs
    .readdirSync(FIXTURES_DIR)
    .filter((f) => f.endsWith(".html"))
    .map((filename) => {
      const match = filename.match(/^([a-z0-9-]+)\.([a-z0-9]+)\.html$/);
      if (!match) {
        throw new Error(
          `[vibecode-contract] Invalid fixture filename: "${filename}". ` +
            `Expected: <template-name>.<brand>.html (e.g. feature-page.ccs3.html)`,
        );
      }
      const [, templateName, brand] = match;
      const content = fs.readFileSync(path.join(FIXTURES_DIR, filename), "utf-8");
      return { filename, templateName, brand, content };
    });
}

const FIXTURES = loadFixtures();

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Strip HTML comments — they're documentation, not enforced output. */
function stripComments(html: string): string {
  return html.replace(/<!--[\s\S]*?-->/g, "");
}

/** Strip everything inside `var(...)` so token references don't count as hex. */
function stripVarCalls(html: string): string {
  return html.replace(/var\([^)]*\)/g, "var(_)");
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe("DS 3.0 Vibecode Contract", () => {
  it("fixtures directory contains at least one template", () => {
    expect(FIXTURES.length).toBeGreaterThan(0);
  });

  it("fixture filename declares an allowed brand", () => {
    const offenders = FIXTURES.filter(
      (f) => !ALLOWED_BRANDS.includes(f.brand as (typeof ALLOWED_BRANDS)[number]),
    );
    if (offenders.length > 0) {
      const list = offenders
        .map((f) => `  ${f.filename} → brand="${f.brand}"`)
        .join("\n");
      expect.fail(
        `Filename brand must be one of ${ALLOWED_BRANDS.join("|")}:\n${list}`,
      );
    }
  });

  describe.each(FIXTURES)("$filename", (fixture) => {
    const body = stripComments(fixture.content);
    const bodyNoVar = stripVarCalls(body);

    it("① root element is <ssk-app-shell-provider>", () => {
      const trimmed = body.trim();
      expect(
        trimmed.startsWith("<ssk-app-shell-provider"),
        `Expected first non-comment element to be <ssk-app-shell-provider>, got:\n${trimmed.slice(0, 120)}…`,
      ).toBe(true);
    });

    it("② brand attribute matches filename and is in whitelist", () => {
      const m = body.match(/<ssk-app-shell-provider\s+brand="([^"]+)"/);
      expect(m, "Provider must declare brand attribute").not.toBeNull();
      const brand = m![1];
      expect(
        ALLOWED_BRANDS as readonly string[],
        `brand="${brand}" must be one of ${ALLOWED_BRANDS.join("|")}`,
      ).toContain(brand);
      expect(
        brand,
        `brand attribute "${brand}" must match filename brand "${fixture.brand}"`,
      ).toBe(fixture.brand);
    });

    it("③ no hex color literals outside var()", () => {
      const hex = bodyNoVar.match(/#[0-9a-fA-F]{3,8}\b/g) ?? [];
      // Whitelist common false positives: anchor IDs (#section), but vibecode
      // templates shouldn't have those — fail on any hex.
      expect(
        hex,
        `Found hardcoded hex color(s) — use semantic tokens via var(--bg-*, --fg-*, --text-*)`,
      ).toEqual([]);
    });

    it("④ no inline font-size below 18px", () => {
      const matches = body.matchAll(/font-size\s*:\s*(\d+(?:\.\d+)?)px/g);
      const offenders: string[] = [];
      for (const m of matches) {
        if (parseFloat(m[1]) < 18) offenders.push(m[0]);
      }
      expect(
        offenders,
        `font-size below 18px violates DS 3.0 minimum — use var(--font-size-caption) (18px) or larger`,
      ).toEqual([]);
    });

    it("⑤ custom-element tags must use ssk- prefix", () => {
      // Match any opening tag containing a hyphen (custom element)
      const tags = body.matchAll(/<([a-z][a-z0-9]*-[a-z0-9-]*)\b/g);
      const offenders: string[] = [];
      for (const m of tags) {
        if (!m[1].startsWith("ssk-")) offenders.push(m[1]);
      }
      const unique = [...new Set(offenders)];
      expect(
        unique,
        `Custom-element tags must use ssk-* prefix. Offenders: ${unique.join(", ")}`,
      ).toEqual([]);
    });

    it("⑥ no Tailwind text-xs / text-sm classes", () => {
      const found = body.match(/\b(text-xs|text-sm)\b/g) ?? [];
      expect(
        found,
        `Tailwind text-xs (12px) / text-sm (14px) violates DS 3.0 minimum 18px`,
      ).toEqual([]);
    });

    it("⑦ ssk-button uses variant + tone API (no legacy themeColor)", () => {
      const buttons = [...body.matchAll(/<ssk-button\b[^>]*>/g)].map((m) => m[0]);
      const offenders = buttons.filter((b) =>
        /\b(theme-?color|background-?color|font-?size)=/.test(b),
      );
      expect(
        offenders,
        `<ssk-button> must use variant+tone, not legacy props (themeColor/backgroundColor/fontSize):\n${offenders.join("\n")}`,
      ).toEqual([]);

      // Soft expectation: every button in production templates SHOULD have variant + tone.
      // (We don't hard-fail on missing tone since "brand" is the implicit default.)
      const missingVariant = buttons.filter((b) => !/\bvariant=/.test(b));
      expect(
        missingVariant,
        `<ssk-button> should declare explicit variant="solid|outline|ghost|solid-light"`,
      ).toEqual([]);
    });
  });

  // ── Cross-fixture brand-switching guarantee ─────────────────────────────────

  it("⑧ feature-page is identical across brands except brand attribute (brand-switching contract)", () => {
    const featurePages = FIXTURES.filter((f) => f.templateName === "feature-page");
    expect(
      featurePages.length,
      "Need at least 2 feature-page fixtures to verify brand-switching",
    ).toBeGreaterThanOrEqual(2);

    const normalized = featurePages.map((f) => ({
      brand: f.brand,
      // Replace `brand="x"` → `brand="_"` so we compare structure only
      shape: stripComments(f.content).replace(
        /(<ssk-app-shell-provider\s+brand=)"[^"]+"/,
        '$1"_"',
      ),
    }));

    const reference = normalized[0];
    for (const other of normalized.slice(1)) {
      expect(
        other.shape,
        `feature-page.${other.brand}.html must be structurally identical to ` +
          `feature-page.${reference.brand}.html (only the brand attribute may differ). ` +
          `If they differ, brand-switching cannot be guaranteed without code changes.`,
      ).toBe(reference.shape);
    }
  });
});
