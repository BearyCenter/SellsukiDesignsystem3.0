#!/usr/bin/env node
/**
 * add-element-guard.mjs
 *
 * Transforms every Lit custom element source file to prevent double-registration
 * errors that occur when the same package is loaded more than once (e.g. micro-
 * frontends, multiple script tags).
 *
 * For each `.ts` file that contains `@customElement("ssk-xxx")` the script:
 *   1. Removes the `@customElement(...)` decorator line.
 *   2. Removes `customElement` from the `lit/decorators.js` import (drops the
 *      entire import statement when it is the only named export).
 *   3. Appends a guarded `customElements.define` call at the end of the file:
 *
 *        if (!customElements.get("ssk-xxx")) {
 *          customElements.define("ssk-xxx", ClassName);
 *        }
 *
 * Usage:
 *   node scripts/add-element-guard.mjs
 */

import fs from "fs";
import { glob } from "glob";

// ─── helpers ────────────────────────────────────────────────────────────────

/**
 * Remove `customElement` from the `lit/decorators.js` import statement.
 * Handles single-line, multi-line, single-quoted, and double-quoted variants.
 * Returns the updated file content.
 */
function removeCustomElementImport(content) {
  return content.replace(
    /import\s*\{([^}]*)\}\s*from\s*(['"])lit\/decorators\.js\2\s*;?([ \t]*\r?\n)?/,
    (fullMatch, importedNames, quoteChar, trailingWS) => {
      const hasSemi = fullMatch.includes(";");
      const nl = trailingWS ?? "\n";
      const q = quoteChar;

      const names = importedNames
        .split(",")
        .map((n) => n.replace(/[\r\n]/g, "").trim())
        .filter((n) => n && n !== "customElement");

      // Drop the whole import when customElement was the only export
      if (names.length === 0) {
        return "";
      }

      const semi = hasSemi ? ";" : "";
      const isMultiline = /\n/.test(importedNames);

      if (isMultiline) {
        return `import {\n  ${names.join(",\n  ")},\n} from ${q}lit/decorators.js${q}${semi}${nl}`;
      }

      return `import { ${names.join(", ")} } from ${q}lit/decorators.js${q}${semi}${nl}`;
    },
  );
}

// ─── main ────────────────────────────────────────────────────────────────────

const files = glob.sync("./src/**/*.ts", {
  ignore: ["**/*.test.ts", "**/*.spec.ts"],
});

let modified = 0;
let alreadyGuarded = 0;
let skipped = 0;

for (const filePath of files) {
  const original = fs.readFileSync(filePath, "utf8");

  // Nothing to do if the file never uses @customElement
  if (!/@customElement\(/.test(original)) {
    skipped++;
    continue;
  }

  // Idempotency: skip files that already have a guard
  if (/customElements\.get\(/.test(original)) {
    console.log(`⏭  Already guarded : ${filePath}`);
    alreadyGuarded++;
    continue;
  }

  // ── extract (tagName, className) pairs ───────────────────────────────────
  //
  // Pattern matches:
  //   @customElement("ssk-foo")\nexport class Foo ...
  //   @customElement('ssk-foo')\nexport class Foo ...
  //   @customElement("ssk-foo")\nexport abstract class Foo ...
  //
  const decoratorClassRe =
    /@customElement\(\s*["']([^"']+)["']\s*\)[ \t]*\r?\nexport\s+(?:abstract\s+)?class\s+(\w+)/g;

  const matches = [...original.matchAll(decoratorClassRe)];

  if (matches.length === 0) {
    console.warn(`⚠  Could not parse decorator in : ${filePath}`);
    skipped++;
    continue;
  }

  const guards = matches.map(([, tagName, className]) => ({ tagName, className }));

  // ── transform ─────────────────────────────────────────────────────────────

  let content = original;

  // 1. Remove the @customElement(...) decorator lines
  content = content.replace(/@customElement\(\s*["'][^"']+["']\s*\)[ \t]*\r?\n/g, "");

  // 2. Update the lit/decorators.js import
  content = removeCustomElementImport(content);

  // 3. Append guarded customElements.define calls
  const guardCode = guards
    .map(
      ({ tagName, className }) =>
        `if (!customElements.get("${tagName}")) {\n  customElements.define("${tagName}", ${className});\n}`,
    )
    .join("\n");

  content = content.trimEnd() + "\n\n" + guardCode + "\n";

  fs.writeFileSync(filePath, content);

  const tags = guards.map((g) => g.tagName).join(", ");
  console.log(`✓  ${filePath}\n   tags: ${tags}`);
  modified++;
}

console.log(
  `\n${"─".repeat(50)}\n` +
    `  Modified       : ${modified}\n` +
    `  Already guarded: ${alreadyGuarded}\n` +
    `  Skipped        : ${skipped}\n` +
    `${"─".repeat(50)}`,
);
