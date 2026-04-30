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

const sourceFiles = collectFiles(path.join(SRC, "elements"))
  .concat(collectFiles(path.join(SRC, "components")));

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
    const violations = sourceFiles.flatMap(scanColors);
    if (violations.length > 0) failReport("color-token", violations);
    expect(violations).toHaveLength(0);
  });

  it("font-size values use var(--font-size-*) tokens [soft — baseline ≤1]", () => {
    const pattern = /font-size:\s*\d+px(?!.*var\()/g;
    const nonTokenized: string[] = [];
    for (const file of sourceFiles) {
      const rel = path.relative(SRC, file).replace(/\\/g, "/");
      pattern.lastIndex = 0;
      if (pattern.test(fs.readFileSync(file, "utf-8"))) nonTokenized.push(rel);
    }
    if (nonTokenized.length > 0) {
      console.warn(
        `[token-spec] ${nonTokenized.length} file(s) have hardcoded font-size ≥18px:\n` +
          nonTokenized.map((f) => `  - ${f}`).join("\n"),
      );
    }
    expect(nonTokenized.length).toBeLessThanOrEqual(1);
  });

});
