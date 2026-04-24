#!/usr/bin/env node
/**
 * add-ds-aliases.mjs
 *
 * Adds `ds-*` canonical aliases alongside existing `ssk-*` guards.
 *
 * For each `.ts` file that already has a guarded `customElements.define("ssk-xxx", ...)`
 * this script prepends a matching `ds-xxx` guard (if not already present):
 *
 *   if (!customElements.get("ds-xxx")) {
 *     customElements.define("ds-xxx", ClassName);
 *   }
 *   if (!customElements.get("ssk-xxx")) {
 *     customElements.define("ssk-xxx", ClassName);
 *   }
 *
 * Usage:
 *   node scripts/add-ds-aliases.mjs
 */

import fs from "fs";
import { glob } from "glob";

const files = glob.sync("./src/**/*.ts", {
  ignore: ["**/*.test.ts", "**/*.spec.ts"],
});

let modified = 0;
let alreadyAliased = 0;
let skipped = 0;

for (const filePath of files) {
  const original = fs.readFileSync(filePath, "utf8");

  // Only process files that have ssk-* guards
  if (!original.includes('customElements.define("ssk-')) {
    skipped++;
    continue;
  }

  // Extract all ssk-* define pairs: (tagName, ClassName)
  // Use \r?\n to handle both LF and CRLF line endings
  const sskRe =
    /if \(!customElements\.get\("ssk-([^"]+)"\)\) \{\r?\n  customElements\.define\("ssk-[^"]+",\s*(\w+)\);\r?\n\}/g;

  const matches = [...original.matchAll(sskRe)];

  if (matches.length === 0) {
    console.warn(`⚠  Could not parse ssk guard in : ${filePath}`);
    skipped++;
    continue;
  }

  let content = original;
  let fileModified = false;

  for (const [fullMatch, tagSuffix, className] of matches) {
    const dsTag = `ds-${tagSuffix}`;

    // Idempotency: skip if ds-* alias already exists
    if (content.includes(`customElements.get("${dsTag}")`)) {
      alreadyAliased++;
      continue;
    }

    const dsGuard =
      `if (!customElements.get("${dsTag}")) {\n  customElements.define("${dsTag}", ${className});\n}`;

    // Insert ds-* guard before the ssk-* guard
    content = content.replace(fullMatch, `${dsGuard}\n${fullMatch}`);
    fileModified = true;
  }

  if (fileModified) {
    fs.writeFileSync(filePath, content);
    const tags = matches.map(([, s]) => `ds-${s} + ssk-${s}`).join(", ");
    console.log(`✓  ${filePath}\n   aliases: ${tags}`);
    modified++;
  }
}

console.log(
  `\n${"─".repeat(50)}\n` +
    `  Modified        : ${modified}\n` +
    `  Already aliased : ${alreadyAliased}\n` +
    `  Skipped         : ${skipped}\n` +
    `${"─".repeat(50)}`,
);
