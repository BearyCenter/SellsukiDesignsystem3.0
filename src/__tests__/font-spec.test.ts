/**
 * Font Spec Gate — DS 3.0
 *
 * Scans every component/element source file and fails if any font-size
 * value violates the DS 3.0 minimum-18px rule or bypasses tokens.
 *
 * Run: npm test
 */

import { describe, it, expect } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, "..");

// ── Collect all .ts source files (exclude tests, generated) ─────────────────

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

// ── Patterns ─────────────────────────────────────────────────────────────────

// Matches hardcoded font-size px values NOT wrapped in var()
// Captures the numeric value so we can check < 18
const HARDCODED_FONT_SIZE = /font-size:\s*(\d+(?:\.\d+)?)px(?!\s*;\s*\/\*|.*var\()/g;

// Tailwind utility classes that produce sub-18px font sizes
const FORBIDDEN_TAILWIND = /\b(text-xs|text-sm)\b/g;

// Known exceptions — visual-only elements where sub-spec sizes are intentional
const EXCEPTION_PATTERNS = [
  /avatar\.fontSize\.(xs|sm)/,   // avatar initials
  /\.empty-icon\s*\{.*font-size:\s*32px/,  // empty state icon
];

function isException(line: string): boolean {
  return EXCEPTION_PATTERNS.some((p) => p.test(line));
}

// ── Helpers ──────────────────────────────────────────────────────────────────

interface Violation {
  file: string;
  line: number;
  content: string;
  rule: string;
}

function scanFile(filePath: string): Violation[] {
  const rel = path.relative(SRC, filePath).replace(/\\/g, "/");
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const violations: Violation[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isException(line)) continue;

    // Check hardcoded font-size values below 18px
    HARDCODED_FONT_SIZE.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = HARDCODED_FONT_SIZE.exec(line)) !== null) {
      const px = parseFloat(m[1]);
      if (px < 18 && !line.includes("var(")) {
        violations.push({
          file: rel,
          line: i + 1,
          content: line.trim(),
          rule: `font-size: ${m[1]}px — below minimum 18px. Use var(--font-size-caption, 18px).`,
        });
      }
    }

    // Check forbidden Tailwind size classes inside template literals / strings
    FORBIDDEN_TAILWIND.lastIndex = 0;
    while ((m = FORBIDDEN_TAILWIND.exec(line)) !== null) {
      violations.push({
        file: rel,
        line: i + 1,
        content: line.trim(),
        rule: `'${m[1]}' produces sub-18px font size. Use var(--font-size-caption, 18px) or ssk-text component.`,
      });
    }
  }

  return violations;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("DS 3.0 Font Spec Gate", () => {
  it("no component uses hardcoded font-size below 18px", () => {
    const allViolations: Violation[] = [];
    for (const file of sourceFiles) {
      allViolations.push(...scanFile(file));
    }

    if (allViolations.length > 0) {
      const report = allViolations
        .map((v) => `  ${v.file}:${v.line}\n    → ${v.rule}\n    code: ${v.content}`)
        .join("\n\n");
      expect.fail(
        `Found ${allViolations.length} font-size violation(s):\n\n${report}\n\nFix: use var(--font-size-caption, 18px) as minimum.`,
      );
    }

    expect(allViolations).toHaveLength(0);
  });

  it("no component uses forbidden Tailwind text-size classes", () => {
    const tailwindViolations: Violation[] = [];
    for (const file of sourceFiles) {
      const rel = path.relative(SRC, file).replace(/\\/g, "/");
      const lines = fs.readFileSync(file, "utf-8").split("\n");
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        FORBIDDEN_TAILWIND.lastIndex = 0;
        let m: RegExpExecArray | null;
        while ((m = FORBIDDEN_TAILWIND.exec(line)) !== null) {
          tailwindViolations.push({ file: rel, line: i + 1, content: line.trim(), rule: `'${m[1]}' forbidden` });
        }
      }
    }

    if (tailwindViolations.length > 0) {
      const report = tailwindViolations
        .map((v) => `  ${v.file}:${v.line} — ${v.content}`)
        .join("\n");
      expect.fail(`Found Tailwind size class violations:\n\n${report}`);
    }

    expect(tailwindViolations).toHaveLength(0);
  });

  it("all font-size values in components use var(--font-size-*) tokens", () => {
    // Soft check — warns about hardcoded px values ≥ 18px that bypass tokens
    // Does not fail CI but documents non-compliant files for tracking
    const nonTokenized: string[] = [];
    const hardcodedPattern = /font-size:\s*\d+px(?!.*var\()/g;

    for (const file of sourceFiles) {
      const rel = path.relative(SRC, file).replace(/\\/g, "/");
      const content = fs.readFileSync(file, "utf-8");
      hardcodedPattern.lastIndex = 0;
      if (hardcodedPattern.test(content)) {
        nonTokenized.push(rel);
      }
    }

    // Log for visibility but do not fail — this is a soft gate
    if (nonTokenized.length > 0) {
      console.warn(
        `[font-spec] ${nonTokenized.length} file(s) still have hardcoded font-size px (≥18px):\n` +
        nonTokenized.map((f) => `  - ${f}`).join("\n") +
        "\n  Consider converting to var(--font-size-*) tokens.",
      );
    }

    // Only fail when count grows beyond baseline (currently 1: empty-icon 32px)
    expect(nonTokenized.length).toBeLessThanOrEqual(1);
  });
});
