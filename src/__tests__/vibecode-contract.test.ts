/**
 * DS 3.0 Vibecode Contract Test
 *
 * Validates golden-fixture HTML templates in `fixtures/vibecode-templates/`
 * using the public `runContract()` helper from `src/test-utils/vibecode-contract.ts`.
 * The same helper is exported from the package for ds3-mcp CI consumption.
 *
 * See: src/test-utils/vibecode-contract.ts for rule definitions.
 */

import { describe, it, expect } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import {
  runContract,
  compareBrandSwitching,
  ALLOWED_BRANDS,
} from "../test-utils/vibecode-contract";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = path.resolve(__dirname, "fixtures", "vibecode-templates");

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

describe("DS 3.0 Vibecode Contract — golden fixtures", () => {
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
    const result = runContract(fixture.content, {
      templateName: fixture.templateName,
      brand: fixture.brand,
    });

    it("passes all 7 contract rules", () => {
      if (!result.ok) {
        const list = result.violations
          .map((v) => `  [rule ${v.rule}/${v.ruleLabel}] ${v.message}`)
          .join("\n");
        expect.fail(
          `${fixture.filename} has ${result.violations.length} violation(s):\n${list}`,
        );
      }
      expect(result.ok).toBe(true);
    });
  });

  it("⑧ feature-page is identical across brands except brand attribute", () => {
    const featurePages = FIXTURES.filter((f) => f.templateName === "feature-page");
    expect(
      featurePages.length,
      "Need at least 2 feature-page fixtures to verify brand-switching",
    ).toBeGreaterThanOrEqual(2);

    const reference = featurePages[0];
    for (const other of featurePages.slice(1)) {
      const cmp = compareBrandSwitching(reference.content, other.content);
      expect(
        cmp.ok,
        `feature-page.${other.brand}.html structurally differs from ` +
          `feature-page.${reference.brand}.html — ${cmp.reason}`,
      ).toBe(true);
    }
  });
});

// ── runContract() unit tests ────────────────────────────────────────────────

describe("runContract() helper — unit tests", () => {
  const validHtml = `<ssk-app-shell-provider brand="ccs3">
    <ssk-app-shell>
      <main slot="main">
        <ssk-button variant="solid" tone="brand">Save</ssk-button>
      </main>
    </ssk-app-shell>
  </ssk-app-shell-provider>`;

  it("ok=true on conformant template", () => {
    const r = runContract(validHtml, { templateName: "x", brand: "ccs3" });
    expect(r.ok).toBe(true);
    expect(r.violations).toEqual([]);
  });

  it("rule 1: detects non-provider root", () => {
    const r = runContract(`<div>oops</div>`, { templateName: "x", brand: "ccs3" });
    expect(r.violations.some((v) => v.rule === 1)).toBe(true);
  });

  it("rule 2: rejects unknown brand", () => {
    const bad = validHtml.replace('brand="ccs3"', 'brand="acme"');
    const r = runContract(bad, { templateName: "x", brand: "acme" });
    expect(r.violations.some((v) => v.rule === 2)).toBe(true);
  });

  it("rule 2: brand mismatch detected", () => {
    const r = runContract(validHtml, { templateName: "x", brand: "patona" });
    expect(
      r.violations.find((v) => v.rule === 2 && v.ruleLabel === "brand-mismatch"),
    ).toBeDefined();
  });

  it("rule 3: hex outside var() flagged", () => {
    const bad = validHtml.replace(
      "<main slot=\"main\">",
      '<main slot="main" style="color: #ff0000;">',
    );
    const r = runContract(bad, { templateName: "x", brand: "ccs3" });
    expect(r.violations.some((v) => v.rule === 3)).toBe(true);
  });

  it("rule 3: hex inside var() ignored", () => {
    const ok = validHtml.replace(
      "<main slot=\"main\">",
      '<main slot="main" style="color: var(--text-primary, #333);">',
    );
    const r = runContract(ok, { templateName: "x", brand: "ccs3" });
    expect(r.violations.some((v) => v.rule === 3)).toBe(false);
  });

  it("rule 4: font-size below 18px flagged", () => {
    const bad = validHtml.replace(
      "Save",
      '<span style="font-size: 14px">Save</span>',
    );
    const r = runContract(bad, { templateName: "x", brand: "ccs3" });
    expect(r.violations.some((v) => v.rule === 4)).toBe(true);
  });

  it("rule 5: non-ssk custom tag flagged", () => {
    const bad = validHtml.replace("<ssk-button", "<my-button");
    // Need to also close — but rule scans opening tags only
    const r = runContract(bad, { templateName: "x", brand: "ccs3" });
    expect(r.violations.some((v) => v.rule === 5)).toBe(true);
  });

  it("rule 6: text-xs / text-sm flagged", () => {
    const bad = validHtml.replace("<ssk-button", '<ssk-button class="text-sm"');
    const r = runContract(bad, { templateName: "x", brand: "ccs3" });
    expect(r.violations.some((v) => v.rule === 6)).toBe(true);
  });

  it("rule 7: legacy themeColor flagged", () => {
    const bad = validHtml.replace(
      'variant="solid" tone="brand"',
      'themeColor="primary"',
    );
    const r = runContract(bad, { templateName: "x", brand: "ccs3" });
    expect(r.violations.some((v) => v.rule === 7)).toBe(true);
  });

  it("rule 7: missing variant flagged", () => {
    const bad = validHtml.replace('variant="solid" tone="brand"', "");
    const r = runContract(bad, { templateName: "x", brand: "ccs3" });
    expect(
      r.violations.find(
        (v) => v.rule === 7 && v.ruleLabel === "button-explicit-variant",
      ),
    ).toBeDefined();
  });

  it("compareBrandSwitching: identical except brand → ok", () => {
    const a = validHtml;
    const b = validHtml.replace('brand="ccs3"', 'brand="patona"');
    expect(compareBrandSwitching(a, b).ok).toBe(true);
  });

  it("compareBrandSwitching: structural diff → not ok", () => {
    const a = validHtml;
    const b = validHtml.replace("Save", "Submit");
    expect(compareBrandSwitching(a, b).ok).toBe(false);
  });
});
