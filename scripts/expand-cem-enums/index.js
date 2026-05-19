/**
 * DES-2040 enum expansion — companion to `npm run analyze`.
 *
 * The Custom Elements Manifest analyzer keeps every attribute / property
 * `type.text` as a raw TypeScript type string (e.g. "ColorRole | ColorName",
 * "Size", "ButtonVariants"). AI consumers can't enumerate valid values from a
 * type name alone, so this script post-processes `dist/custom-elements.json`
 * and attaches a concrete `type.enum: string[]` whenever the type resolves to
 * a literal union (directly or via a named alias).
 *
 * Approach: scan `src tree` for every `export type X = "a" | "b" | ...`
 * declaration, build a `{ TypeName -> string[] }` lookup, then walk the
 * manifest's attributes + field members and expand:
 *
 *   "solid" | "outline"            →  ["solid", "outline"]              (literal union)
 *   Size                           →  ["3xs", "2xs", ..., "9xl"]        (named alias)
 *   ColorRole | ColorName          →  [...ColorRole, ...ColorName]      (named union, deduped)
 *   Size | undefined               →  [...Size]                         ("| undefined" stripped)
 *   Theme | undefined              →  (skipped — Theme is an object)
 *
 * Types like `Size` that include `| string` keep their literal suggestions
 * here but the type.text remains intact so consumers still know strings are
 * permitted — `enum` is *suggested* values, not strictly enforced.
 */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const MANIFEST = path.join(ROOT, "dist", "custom-elements.json");

// ── Step 1: harvest every `export type X = ...` literal union in src/ ────────

const SRC = path.join(ROOT, "src");
const EXCLUDE_SUFFIXES = [".test.ts", ".stories.ts"];
const EXCLUDE_FILES = new Set([
  path.join(SRC, "elements", "icon", "icon-data.ts"),
  path.join(SRC, "elements", "icon", "country-icon.ts"),
]);
const EXCLUDE_DIR_SEGMENTS = new Set(["__tests__"]);

function listSrcTypeScriptFiles() {
  const entries = readdirSync(SRC, { recursive: true, withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".ts"))
    .map((e) => path.join(e.parentPath ?? e.path ?? SRC, e.name))
    .filter((f) => !EXCLUDE_SUFFIXES.some((s) => f.endsWith(s)))
    .filter((f) => !EXCLUDE_FILES.has(f))
    .filter((f) => !f.split(path.sep).some((seg) => EXCLUDE_DIR_SEGMENTS.has(seg)));
}

/** Pull all `"literal"` strings out of the body of one `export type` declaration. */
function extractLiterals(declarationBody) {
  return [...declarationBody.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
}

/** Find every `export type Name = ...;` (single- or multi-line). */
function harvestTypes(filePath) {
  const src = readFileSync(filePath, "utf8");
  const found = {};
  // Non-greedy match to the next `;` — covers both inline and multi-line bodies.
  const re = /export\s+type\s+([A-Z][a-zA-Z0-9]*)\s*=\s*([\s\S]+?);/g;
  let match;
  while ((match = re.exec(src)) !== null) {
    const name = match[1];
    const body = match[2];
    // Skip object-shape types like `export type Theme = { ... }` — they have no
    // string literals at the top level we care about.
    if (body.trim().startsWith("{")) continue;
    const literals = extractLiterals(body);
    if (literals.length > 0) {
      found[name] = literals;
    }
  }
  return found;
}

const files = listSrcTypeScriptFiles();

const typeLookup = {};
for (const file of files) {
  Object.assign(typeLookup, harvestTypes(file));
}

// ── Step 2: read manifest, expand each prop's type to an enum where possible ─

const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));

let expandedAttrs = 0;
let expandedMembers = 0;
const unresolved = new Set();

/** Try to convert a TS type text into an enum string[]. Returns null when not resolvable. */
function expand(typeText) {
  if (!typeText || typeof typeText !== "string") return null;

  // Drop `| undefined` / `| null` — enum domain is what's actually meaningful.
  const cleaned = typeText
    .replace(/\s*\|\s*undefined\b/g, "")
    .replace(/\s*\|\s*null\b/g, "")
    .trim();

  if (!cleaned) return null;

  // Split on top-level `|` — note: this is naive but the analyzer's emitted
  // type.text is always already flattened, no nested generics with `|` inside.
  const parts = cleaned.split(/\s*\|\s*/).map((p) => p.trim());

  const out = [];
  let allResolved = true;

  for (const part of parts) {
    // Bare TS keyword like `string`, `number`, `boolean` — type accepts arbitrary
    // values; we still surface the literal suggestions from the other parts but
    // don't fail the expansion.
    if (/^(string|number|boolean|bigint|symbol|undefined|null|any|unknown|never|object)$/.test(part)) {
      continue;
    }
    // String literal: "foo"
    const lit = part.match(/^"([^"]+)"$/);
    if (lit) {
      out.push(lit[1]);
      continue;
    }
    // Numeric literal: 42
    const num = part.match(/^-?\d+(\.\d+)?$/);
    if (num) {
      out.push(num[0]);
      continue;
    }
    // Named type alias: `ColorRole`, `Size`, etc.
    if (/^[A-Z][a-zA-Z0-9]*$/.test(part) && typeLookup[part]) {
      out.push(...typeLookup[part]);
      continue;
    }
    // Couldn't resolve — likely a complex object type (`Theme`) or generic
    // (`Map<string, X>`). Bail out of this expansion.
    allResolved = false;
    if (/^[A-Z]/.test(part)) unresolved.add(part);
    break;
  }

  if (!allResolved || out.length === 0) return null;
  return [...new Set(out)]; // dedupe — handy when ColorRole + ColorName overlap
}

/** Visit one attribute or field-member entry and attach `type.enum` when possible. */
function visitTypedEntry(entry, kindForCount) {
  if (!entry?.type?.text) return;
  if (entry.type.enum) return; // already expanded (idempotent)
  const enumValues = expand(entry.type.text);
  if (enumValues) {
    entry.type.enum = enumValues;
    if (kindForCount === "attr") expandedAttrs++;
    else expandedMembers++;
  }
}

for (const mod of manifest.modules ?? []) {
  for (const decl of mod.declarations ?? []) {
    for (const attr of decl.attributes ?? []) {
      visitTypedEntry(attr, "attr");
    }
    for (const member of decl.members ?? []) {
      if (member.kind === "field") visitTypedEntry(member, "member");
    }
  }
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));

console.log(
  `✓ Expanded ${expandedAttrs} attribute(s) and ${expandedMembers} field member(s) — ${Object.keys(typeLookup).length} named type alias(es) harvested from src/`,
);
if (unresolved.size > 0) {
  console.log(
    `  (${unresolved.size} unresolved named type${unresolved.size === 1 ? "" : "s"} — object shapes or generics: ${[...unresolved].slice(0, 8).join(", ")}${unresolved.size > 8 ? ", ..." : ""})`,
  );
}
