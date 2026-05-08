/**
 * Token Spec Gate — DS 3.0
 *
 * Scans every component/element source file and fails on:
 *   1. font-size below 18px (hard fail)
 *   2. Tailwind text-xs / text-sm classes (hard fail)
 *   3. Hardcoded hex colors in CSS not wrapped in var() (hard fail)
 *   4. font-size bypassing tokens (soft warn — baseline enforced)
 *
 * Run: npm test
 */

import { describe, it, expect } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, "..");

// ── File collection ──────────────────────────────────────────────────────────

function collectFiles(dir: string, files: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["__tests__", "node_modules"].includes(entry.name)) continue;
      collectFiles(full, files);
    } else if (entry.name.endsWith(".ts") && !entry.name.endsWith(".test.ts")) {
      files.push(full);
    }
  }
  return files;
}

const STORYBOOK_ROOT = path.resolve(SRC, "..", ".storybook", "stories");

// Component source — full strict enforcement
const componentFiles = collectFiles(path.join(SRC, "elements"))
  .concat(collectFiles(path.join(SRC, "components")));

// Stories — font-size enforced, color is soft gate (demo files may use fixed colors)
const storyFiles = collectFiles(STORYBOOK_ROOT);

const sourceFiles = [...componentFiles, ...storyFiles];

// Files excluded from color checks — generated or intentionally non-token
const COLOR_EXCLUDE_FILES = new Set([
  "elements/icon/country-icon.ts", // generated SVG flag colors — never touch
]);

// ── Patterns ─────────────────────────────────────────────────────────────────

const HARDCODED_FONT_SIZE = /font-size:\s*(\d+(?:\.\d+)?)px/g;
const FORBIDDEN_TAILWIND  = /\b(text-xs|text-sm)\b/g;

// Hex color in CSS property — NOT inside var(), parseVariables, rgba, etc.
const CSS_HEX_COLOR =
  /(?:^|;|\{)\s*(?:color|background(?:-color)?|border(?:-color)?|fill|stroke|outline-color)\s*:\s*(#[0-9a-fA-F]{3,8})\b/;

function isColorSafeLine(line: string): boolean {
  const t = line.trim();
  return (
    t.startsWith("//") ||
    t.startsWith("*") ||
    line.includes("var(") ||
    line.includes("parseVariables(") ||
    line.includes("rgba(") ||
    line.includes("getColorValue") ||
    line.includes("cssVar(")
  );
}

const FONT_EXCEPTIONS = [
  /avatar\.fontSize\.(xs|sm)/,      // avatar initials — visual-only
  /\.empty-icon\s*\{.*font-size/,   // empty-state icon — no token match
];

function isFontException(line: string): boolean {
  return FONT_EXCEPTIONS.some((p) => p.test(line));
}

// ── Violation ────────────────────────────────────────────────────────────────

interface Violation { file: string; line: number; content: string; rule: string }

function failReport(label: string, violations: Violation[]): void {
  const report = violations
    .map((v) => `  ${v.file}:${v.line}\n    → ${v.rule}\n    ${v.content}`)
    .join("\n\n");
  expect.fail(`[${label}] ${violations.length} violation(s):\n\n${report}`);
}

// ── Scanners ─────────────────────────────────────────────────────────────────

function scanFontSize(filePath: string): Violation[] {
  const rel = path.relative(SRC, filePath).replace(/\\/g, "/");
  const violations: Violation[] = [];
  for (const [i, line] of fs.readFileSync(filePath, "utf-8").split("\n").entries()) {
    if (isFontException(line) || line.includes("var(")) continue;
    HARDCODED_FONT_SIZE.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = HARDCODED_FONT_SIZE.exec(line)) !== null) {
      if (parseFloat(m[1]) < 18) {
        violations.push({
          file: rel, line: i + 1, content: line.trim(),
          rule: `font-size: ${m[1]}px is below minimum 18px → use var(--font-size-caption, 18px)`,
        });
      }
    }
  }
  return violations;
}

function scanTailwind(filePath: string): Violation[] {
  const rel = path.relative(SRC, filePath).replace(/\\/g, "/");
  const violations: Violation[] = [];
  for (const [i, line] of fs.readFileSync(filePath, "utf-8").split("\n").entries()) {
    FORBIDDEN_TAILWIND.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = FORBIDDEN_TAILWIND.exec(line)) !== null) {
      violations.push({
        file: rel, line: i + 1, content: line.trim(),
        rule: `'${m[1]}' = ${m[1] === "text-xs" ? "12px" : "14px"} — below DS 3.0 minimum 18px`,
      });
    }
  }
  return violations;
}

function scanColors(filePath: string): Violation[] {
  const rel = path.relative(SRC, filePath).replace(/\\/g, "/");
  if (COLOR_EXCLUDE_FILES.has(rel)) return [];
  const violations: Violation[] = [];
  for (const [i, line] of fs.readFileSync(filePath, "utf-8").split("\n").entries()) {
    if (isColorSafeLine(line)) continue;
    const m = CSS_HEX_COLOR.exec(line);
    if (m) {
      violations.push({
        file: rel, line: i + 1, content: line.trim(),
        rule: `Hardcoded color ${m[1]} — use semantic token (var(--text-primary), var(--bg-primary), var(--stroke-primary), ...)`,
      });
    }
  }
  return violations;
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe("DS 3.0 Token Spec Gate", () => {

  it("no component uses hardcoded font-size below 18px", () => {
    const violations = sourceFiles.flatMap(scanFontSize);
    if (violations.length > 0) failReport("font-size", violations);
    expect(violations).toHaveLength(0);
  });

  it("no component uses forbidden Tailwind text-size classes", () => {
    const violations = sourceFiles.flatMap(scanTailwind);
    if (violations.length > 0) failReport("tailwind", violations);
    expect(violations).toHaveLength(0);
  });

  it("no component uses hardcoded hex colors in CSS outside var()", () => {
    // Hard fail — components only (stories are documentation, soft gate below)
    const violations = componentFiles.flatMap(scanColors);
    if (violations.length > 0) failReport("color-token", violations);
    expect(violations).toHaveLength(0);
  });

  it("stories color token usage [soft — baseline ≤13]", () => {
    const violations = storyFiles.flatMap(scanColors);
    if (violations.length > 0) {
      console.warn(
        `[token-spec] ${violations.length} story file(s) have hardcoded colors — migrate to tokens:\n` +
        violations.map((v) => `  ${v.file}:${v.line} — ${v.content}`).join("\n"),
      );
    }
    expect(violations.length).toBeLessThanOrEqual(13);
  });

  it("components must use semantic tokens, not palette primitives via cssVar('colors',...) [ratchet — baseline 45]", () => {
    // DS 3.0 standard: components consume --bg-brand-solid, --fg-primary, etc.
    // — never bind directly to palette like cssVar('colors', themeColor, 500).
    // This pattern bypasses semantic tokens and breaks brand-switching.
    //
    // Baseline (2026-05): 45 legacy components from DS 1.0 still use this pattern.
    //   - Button is being migrated under DES-2011 → baseline drops to 44
    //   - Remaining 44 tracked under a follow-up ticket (mass-migration in batches)
    //   - This is a RATCHET — every PR that fixes one MUST lower the baseline.
    const PRIMITIVE_PATTERN = /cssVar\(\s*["']colors["']/;
    const offenders: string[] = [];
    for (const file of componentFiles) {
      const rel = path.relative(SRC, file).replace(/\\/g, "/");
      if (rel === "elements/icon/country-icon.ts") continue; // generated
      if (PRIMITIVE_PATTERN.test(fs.readFileSync(file, "utf-8"))) {
        offenders.push(rel);
      }
    }
    if (offenders.length > 0) {
      console.warn(
        `[token-spec] ${offenders.length} component(s) use palette primitives via cssVar('colors',...) — migrate to semantic tokens (--bg-brand-solid, --fg-primary, etc.):\n` +
          offenders.map((f) => `  - ${f}`).join("\n"),
      );
    }
    expect(offenders.length).toBeLessThanOrEqual(44);
  });

  it("components font-size use var(--font-size-*) tokens [soft — baseline ≤1]", () => {
    const pattern = /font-size:\s*\d+px(?!.*var\()/g;
    const nonTokenized: string[] = [];
    for (const file of componentFiles) {
      const rel = path.relative(SRC, file).replace(/\\/g, "/");
      pattern.lastIndex = 0;
      if (pattern.test(fs.readFileSync(file, "utf-8"))) nonTokenized.push(rel);
    }
    if (nonTokenized.length > 0) {
      console.warn(
        `[token-spec] ${nonTokenized.length} component file(s) have hardcoded font-size ≥18px:\n` +
          nonTokenized.map((f) => `  - ${f}`).join("\n"),
      );
    }
    // Baseline: 1 file (advanced-data-table empty-icon 32px)
    expect(nonTokenized.length).toBeLessThanOrEqual(1);
  });

  it("non-heading components do not use --font-size-h[1-4] for body text [ratchet — baseline 4]", () => {
    // Heading tokens (h1=44 / h2=36 / h3=28 / h4=24) are reserved for actual
    // headings. UI body contexts (sidebar items, list items, table cells,
    // toast messages, modal body, timeline content, tab labels) MUST use
    // --font-size-p (20px), --font-size-label (20px), --font-size-button (18px),
    // or --font-size-caption (18px).
    //
    // DS 1.0 era: many components used h4 (24px) as the default "important text"
    // size. DS 3.0 spec separates: h-tokens for headings only.
    //
    // Baseline (2026-05-08, after sidebar/modal/stepper/timeline/toast/tab/
    // widget-table/widget-example migration): 4 legitimate uses remain:
    //   - modal/index.ts:187        .title          → modal heading (h3 ok)
    //   - page-header/index.ts:123  .title          → page heading (h4 ok)
    //   - stepper/index.ts:257      .circle-content → step number in 30px
    //                                                  visual circle (visual UI)
    //   - toast/index.ts:144        .title          → toast heading (h4 ok)
    //
    // RATCHET: any new component using --font-size-h[1-4] must justify it as
    // a heading or visual UI. If you migrate one of the 4 above, drop the
    // baseline by one. Adding new h4 misuse fails CI.
    const HEADING_TOKEN = /font-size:\s*var\(--font-size-h[1-4]\b/;
    const offenders: string[] = [];
    for (const file of componentFiles) {
      const rel = path.relative(SRC, file).replace(/\\/g, "/");
      // heading.ts is the heading element itself — it MUST use heading tokens
      if (rel === "elements/heading/index.ts") continue;
      const lines = fs.readFileSync(file, "utf-8").split("\n");
      lines.forEach((line, i) => {
        if (HEADING_TOKEN.test(line)) {
          offenders.push(`${rel}:${i + 1}`);
        }
      });
    }
    if (offenders.length > 0) {
      console.warn(
        `[token-spec] ${offenders.length} non-heading component line(s) use --font-size-h[1-4] — heading tokens are for actual headings only. Use --font-size-p (20px), --font-size-label (20px), --font-size-button (18px), or --font-size-caption (18px) for body text:\n` +
          offenders.map((s) => `  - ${s}`).join("\n"),
      );
    }
    expect(offenders.length).toBeLessThanOrEqual(4);
  });

});
