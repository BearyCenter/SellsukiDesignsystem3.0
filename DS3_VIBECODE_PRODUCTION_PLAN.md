# DS 3.0 — Vibe Code → Production Grade Plan

> **Goal:** ทำให้ vibe coding ด้วย DS 3.0 ส่งงาน Production-grade ได้สม่ำเสมอ
> **Version targeted:** `@uxuissk/design-system-core@3.4.2` (current) → publish 3.4.3 ขึ้นไป
> **Prepared:** 2026-05-15
> **Status:** Draft for /uxui-design-system + /lead-uxui review

---

## TL;DR

DS 3.0 codebase **มีคุณภาพดีระดับ library** (Pattern SoT track ลงแล้ว v3.4.0) **แต่ vibe code experience เสีย** เพราะ:

1. **MCP DS3 ขัดแย้งกับตัวเอง** — `get_brand_rules` บอก `ssk-theme-provider` deprecated, แต่ `get_quick_start` + ของจริงในซอร์ส + Suki Designer skill ใช้ `ssk-theme-provider` เป็น root wrapper
2. **MCP schema อายุ 2 version (3.1.2 / 3.2.0)** — bundle จริงเป็น 3.4.2 → tokens หาย ≥90%, props ไม่ตรง
3. **Package `style.css` export ชี้ไฟล์ที่ไม่มี** → consumer load CSS ไม่ได้, components render เพี้ยน
4. **CDN bundle มี bare imports `from "lit"`** ที่ browser resolve ไม่ได้ → vanilla HTML load ไม่ได้ตรงๆ ต้องมี importmap (ไม่ได้บอกไว้ที่ไหน)
5. **MCP ไม่คืน defaults / slots / events / enum values** → AI assistant เดา props ผิด (themeColor="brand" / "default" ที่ไม่อยู่ใน enum)

แก้ครบ → ทุก vibe code prompt ส่งงาน Production-grade ได้ตั้งแต่ครั้งแรก

---

## 1. Diagnostic — ทำไม MCP-DS3-ISSUES report ≠ session audit ของผม

ทั้ง 2 audit ถูกต้องในมุมของตัวเอง แต่ **partial** — ขาดข้อมูลสำคัญที่ Suki Designer skill มี

| Source | Tested against | Methodology | Key insight ที่มี | Key insight ที่ขาด |
|--------|---------------|-------------|------------------|-------------------|
| **MCP-DS3-ISSUES.md** (user) | v3.4.2 (latest) | npm install + grep bundle + MCP call | 113 tokens จริง, broken style.css, ssk-widget-matric demo image, ssk-text_2 | เชื่อ MCP get_brand_rules ว่า theme-provider deprecated → ผิด |
| **My session audit** | v3.2.0 (CDN) | unpkg + browser DevTools + source read | Provider behavior, customCell dataIndex bug, themeColor enum | ไม่รู้ Suki Designer skill เป็น authoritative source |
| **Suki Designer skill** | (canonical) | Hand-curated by Designer team | `ssk-theme-provider` = required wrapper, font ≥18px, token policy | – |

### Reconciliation table — เคสที่ขัดกัน

| Question | MCP get_brand_rules | MCP get_quick_start | My session | **Suki Designer (TRUTH)** |
|----------|--------------------:|--------------------:|-----------:|---------------------------:|
| Root wrapper component | `ssk-app-shell-provider` (says theme-provider deprecated) | `ssk-theme-provider` | `ssk-theme-provider` (after debug) | **`ssk-theme-provider brand="ccs3"`** |
| Brand value | `ccs3 / patona / oc2plus` | `ccs3` | `ccs3` | `ccs3` |
| CSS import needed? | – | – | (didn't check) | (not mentioned — but bundle bug means yes) |

→ **MCP `get_brand_rules` is the single biggest source of confusion.** ต้องแก้ทันที

---

## 2. Ground Truth — Authoritative sources ranked

| Rank | Source | Reliability | Use when |
|------|--------|-------------|----------|
| 🥇 1 | **`~/.claude/skills/suki-designer/`** | 100% | Vibe code setup / provider model / token policy |
| 🥇 1 | **Source code** (`src/`) ใน this repo | 100% | Component API / defaults / actual behavior |
| 🥈 2 | **`MIGRATION.md`** (repo) | 95% | Migration mapping DS 1.0 → DS 3.0 |
| 🥈 2 | **Storybook stories** (`.storybook/stories/`) | 90% | Working examples / decorator pattern |
| 🥉 3 | **MCP `get_component`** (DS3) | 60% | Quick prop list — ห้ามเชื่อ defaults / enum |
| 🥉 3 | **`preview/ds3-preview.html`** | 80% (visual) / 40% (API) | Visual reference only (มี note ใน memory ว่าอย่าใช้เป็น canonical) |
| ⬇ 4 | MCP `generate_page_layout` | 40% | Skeleton OK แต่ตัวอย่าง prop value ผิด |
| ⬇ 4 | MCP `get_brand_rules` | 30% | บอก theme-provider deprecated (ผิด) |
| ⬇ 4 | MCP `validate_usage` | 20% | ผ่านเคส invalid |
| ⬇ 5 | MCP `suggest_components` | 30% | Score = 1 หมด, description empty |
| ❌ | DS_UPGRADE.md | obsolete | Plan สำหรับ v3.1.0 ที่จบแล้ว — ก้าวมา 3 versions |
| ❌ | UPGRADEPREVIEW3.md | obsolete | Plan สำหรับ separate repo ที่ deployed แล้ว |

---

## 3. File cleanup recommendations

> **Policy:** แนะนำ + รอ user confirm ทีละไฟล์ (per session decision)

### `DS_UPGRADE.md` (448 lines) — **🟡 ARCHIVE candidate**

**สถานะ:** Phase plan สำหรับ v3.0 → v3.1.0 (completed April 2026). Repo ก้าวต่อมา v3.4.2 พร้อม Pattern SoT track ที่ไม่ได้เก็บไว้ใน doc นี้

**ปัญหา:**
- AI scan แล้วเข้าใจว่า "v3.1.0 = ปัจจุบัน" → ทำงานบน outdated mental model
- มี architectural context ดี (Token Architecture 4 ชั้น, DS 2.0 mapping table) ที่ควรเก็บ
- ไม่ track v3.2 → v3.4 พัฒนาการ (Pattern SoT, font migration)

**คำแนะนำ:**
- **Option A (recommend):** ย้ายไป `docs/archive/DS_UPGRADE-v3.1.md` + เพิ่ม "STATUS: HISTORICAL" header → AI ไม่ scan ซ้ำเพราะ CLAUDE.md ไม่ load archive
- **Option B:** ลบ + commit message log historical state ใน git
- **Option C:** Update เป็น living document (Phase 5+ Pattern SoT) — แต่ใช้เวลาเขียน

**ใครยังอ้างถึง:** `CLAUDE.md` line 80 ("`DS_UPGRADE.md` — Phase-by-phase upgrade master plan") → ต้องลบ reference นั้นพร้อมกัน

---

### `MIGRATION.md` (315 lines) — **🟢 KEEP**

**สถานะ:** Consumer migration guide (`@sellsuki-org/sellsuki-components` → `@uxuissk/design-system-core`) ยัง valid

**คำแนะนำ:** **เก็บไว้** — product teams ที่เริ่ม migrate ใช้ไฟล์นี้

**ปรับปรุง (optional):**
- Update package version ตัวอย่างจาก `3.0.0` → `3.4.x` (line 15)
- เพิ่ม section "Provider model" ที่ confirm `ssk-theme-provider` brand="ccs3"

---

### `UPGRADEPREVIEW3.md` (162 lines) — **🔴 DELETE candidate**

**สถานะ:** Planning doc สำหรับ **`Design-system-SSK-3` repo (different repo)** ที่ deployed แล้วที่ https://design-system-ssk-3.vercel.app

**ปัญหา:**
- อยู่ผิดที่ — เป็น plan ของ sibling repo ไม่ใช่ของ repo นี้
- Reference `@uxuissk/design-system-core@3.0.1` (outdated 4 versions)
- AI scan แล้ว confuse ว่ามี preview work ต้องทำใน repo นี้

**คำแนะนำ:**
- **Option A (recommend):** ลบ — ตามที่ user ระบุ
- **Option B:** ย้ายไป `Design-system-SSK-3` repo (ผมไม่มี access cross-repo ใน session นี้)

---

## 4. P0 Blockers (ต้องแก้ก่อน vibe code Production-grade)

### P0-1 — MCP self-contradiction: provider deprecation

**Severity:** 🔴 Critical — block vibe code accuracy

**Problem:**
```
MCP get_brand_rules(ccs3) →  "ssk-theme-provider deprecated, ใช้ ssk-app-shell-provider"
MCP get_quick_start(react) → "ssk-theme-provider brand=ccs3"
Suki Designer SETUP.md   →  "ssk-theme-provider brand=ccs3 ครอบ root เสมอ"
Source code              →  ssk-theme-provider has NO @deprecated annotation
```

**Action:**
1. แก้ MCP `get_brand_rules` output ลบ "deprecated" claim
2. ทั้ง 2 tools คืน example เดียวกัน:
   ```html
   <ssk-theme-provider brand="ccs3">
     <ssk-button variant="solid" themeColor="primary">Click</ssk-button>
   </ssk-theme-provider>
   ```
3. ถ้าจริงๆ `ssk-app-shell-provider` ตั้งใจเป็น brand switcher เสริม → MCP ต้องอธิบายชัดว่าใช้คู่กับ theme-provider ไม่ใช่แทน

**Owner:** DS team (ds3-mcp repo)
**Estimate:** S — แก้ string ใน MCP responses

---

### P0-2 — `package.json` declares broken `./style.css` export

**Severity:** 🔴 Critical — consumer ที่ทำ `import "@uxuissk/design-system-core/style.css"` ตาม pattern ใน Suki Designer skill จะ 404

**Problem:**
```json
"exports": {
  "./style.css": "./dist/style.css"   // ← ไฟล์ไม่มีจริง
}
```
ไฟล์จริงคือ `./dist/sellsuki-components.css`

**Action (เลือก 1):**
- **A (recommend):** แก้ exports ใน `package.json` ให้ point ไฟล์จริง:
  ```json
  "./style.css":  "./dist/sellsuki-components.css",
  "./styles.css": "./dist/sellsuki-components.css"  // เพิ่ม alias เพื่อ DX
  ```
- **B:** Rename `dist/sellsuki-components.css` → `dist/style.css` (กระทบ UMD reference)

**Owner:** DS team (sellsuki-components-main, this repo)
**Estimate:** XS — แก้ 1 บรรทัด + bump patch version → publish 3.4.3

---

### P0-3 — Bundle มี bare `from "lit"` imports — load CDN ตรงๆ ไม่ได้

**Severity:** 🔴 Critical — vanilla HTML usage broken (Suki Designer SETUP.md sample `<script type="module" src="https://unpkg.com/...">` จะไม่ทำงาน)

**Problem:**
```js
// dist/sellsuki-components.js — ยังเป็น bare imports
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
```
Browser resolve `"lit"` ไม่ได้ → script ตาย → custom elements ไม่ register

**Action (เลือก 1):**
- **A (recommend สำหรับ CDN UX):** เพิ่ม build target ใหม่ `dist/sellsuki-components.bundled.js` ที่ bundle lit เข้าด้วย (Vite library mode `rollupOptions.external = []`)
- **B:** Document importmap pattern ใน MCP `get_quick_start(vanilla)` + Suki Designer SETUP.md:
  ```html
  <script type="importmap">
  {"imports":{"lit":"https://esm.sh/lit@3","lit/":"https://esm.sh/lit@3/"}}
  </script>
  <script type="module" src="https://unpkg.com/@uxuissk/design-system-core@3.4.2/dist/sellsuki-components.js"></script>
  ```

Option A สะดวกกว่าสำหรับ vibe code (drop-in script tag)

**Owner:** DS team (this repo build config)
**Estimate:** S — vite.config edit + add bundled output

---

### P0-4 — MCP schema version lag (3.1.2 / 3.2.0 vs installed 3.4.2)

**Severity:** 🔴 Critical — tokens หาย 90% (11 vs 113), props ไม่ตรง

**Action:**
1. MCP server ต้อง parse `dist/` ของ installed package ที่ runtime ไม่ใช่ hand-maintain catalog
2. หรือ pin version: `npm install @uxuissk/design-system-core@latest` ใน MCP เพื่อ regenerate schema
3. เพิ่ม endpoint `mcp__ds3__version_info` ที่บอก schema version ปัจจุบัน → AI assistant ตรวจสอบเองได้

**Owner:** DS team (ds3-mcp repo)
**Estimate:** M — refactor MCP to read bundle CSS / type definitions

---

### P0-5 — `get_component` schema ขาด: defaults / valid enum values / slots / events / examples

**Severity:** 🔴 Critical — AI invent prop values (เช่น `themeColor="brand"` ที่ไม่อยู่ใน ColorRole enum)

**Problem (verified in session):**
```
MCP returns: "themeColor": { "type": "ColorRole | ColorName", "optional": false }
Actual valid: primary | secondary | success | warning | error | danger | info | light | dark | text | muted
AI guessed: "brand", "default" → silent fail
```

**Action — extend schema:**
```json
{
  "tag": "ssk-button",
  "props": [
    {
      "name": "themeColor",
      "type": "ColorRole | ColorName",
      "enum": ["primary", "secondary", "success", "warning", "error", "danger", "info", "light", "dark", "text", "muted", "background", "foreground", "shadow"],
      "default": "primary",
      "optional": false
    }
  ],
  "slots": [
    { "name": "default", "description": "Button label content" }
  ],
  "events": [
    { "name": "click", "detail": "MouseEvent" }
  ],
  "examples": [
    "<ssk-button variant=\"solid\" themeColor=\"primary\">Click</ssk-button>"
  ]
}
```

**Owner:** DS team (ds3-mcp repo)
**Estimate:** L — schema redesign + auto-extract from TypeScript decorators in source

---

## 5. P1 Quality issues

### P1-1 — MCP `validate_usage` ปล่อยผ่าน invalid code

**Severity:** 🟠 High

**Problem:** ใส่ `<span class="badge-pending">` → คืน `valid: true` ทั้งที่ละเมิด token policy

**Action:** Validator ต้อง catch:
- `themeColor` value นอก ColorRole enum
- Missing `<ssk-theme-provider>` wrap
- Duplicate `dataIndex` ใน `<ssk-table>` columns
- `font-size: <Npx>` ที่ N < 18
- Tailwind `text-xs` / `text-sm` ใน component code
- Hardcoded hex ใน inline style ที่มี semantic token เทียบเท่า

**Owner:** DS team (ds3-mcp repo)
**Estimate:** M

---

### P1-2 — Component descriptions empty 31/31

**Severity:** 🟠 High — discoverability + AI doesn't know component purpose

**Action:** เติม 1-2 บรรทัดต่อ component:
```
ssk-table-row → "Single row inside ssk-table. Must contain ssk-table-cell or ssk-header-cell children."
ssk-page-header → "Page-level title bar. Has 'actions' slot for buttons. Place under ssk-app-shell navbar."
```

**Owner:** UX/UI team (write copy) + DS team (sync to MCP)
**Estimate:** M — 91 components × 30 seconds = ~45 min copy work

---

### P1-3 — `ssk-widget-matric` ship hardcoded "demo image" + 11 required string props

**Severity:** 🟠 High — render placeholder text ใน production

**Action:**
1. ลบ hardcoded "demo image" string
2. ย้าย icon/image จาก props → slot pattern:
   ```html
   <ssk-widget-matric label="ออเดอร์วันนี้" value="248">
     <ssk-icon slot="icon-left" name="shopping-bag" />
     <ssk-tag slot="badge" tone="success">+12.4%</ssk-tag>
   </ssk-widget-matric>
   ```
3. ทำ required props ให้เป็น optional
4. Mark component `status: "experimental"` ใน MCP schema จนกว่าจะ stable

**Owner:** DS team (this repo)
**Estimate:** M — refactor component + update Storybook + bump version

---

### P1-4 — `ssk-text_2` naming inconsistency

**Severity:** 🟡 Medium

**Problem:** `list_components` คืน `ssk-text_2` แต่ docs/skill เขียน `ssk-text`

**Action:**
- ตรวจว่า `ssk-text` ปัจจุบันมีอยู่ใน source หรือเปล่า (อาจเป็น old class ที่ deprecated)
- ตัดสินใจ:
  - **A:** Rename `ssk-text_2` → `ssk-text` + ใส่ deprecation alias สำหรับ `_2` (1 release)
  - **B:** Document ทำไมมี `_2` suffix + เลิกใช้ `ssk-text` ใน docs

**Owner:** DS team (this repo)
**Estimate:** S

---

### P1-5 — ไม่มี icon catalog MCP tool

**Severity:** 🟡 Medium — AI เดา icon name → render fail

**Action:** เพิ่ม MCP tool:
```
list_icons() → { icons: ["plus", "shopping-bag", "funnel", "trash", ...] }
get_icon_catalog(category?: "navigation"|"action"|"status"|...)
```

หรือ embed list ใน `get_component(ssk-icon).props[name].enum`

**Owner:** DS team (ds3-mcp repo)
**Estimate:** S — read from `src/elements/icon/icon-data.ts` + expose

---

### P1-6 — `suggest_components` คืน score = 1 หมด + description empty

**Severity:** 🟡 Medium

**Action:**
- Implement ranking algorithm (vector similarity vs hand-curated tag list)
- Sync descriptions จาก P1-2

**Owner:** DS team (ds3-mcp repo)
**Estimate:** M

---

## 6. Phased roadmap

| Phase | Focus | Tickets | Duration | Owners |
|-------|-------|---------|----------|--------|
| **A — P0 Unblock** | Provider docs / CSS export / CDN load / MCP version sync | 5 tickets (P0-1..5) | 1 week | DS team + UX/UI |
| **B — P1 Schema completeness** | Slots/events/enum/defaults in MCP + descriptions | 6 tickets (P1-1..6) | 2 weeks | DS team + UX/UI copy |
| **C — Pattern SoT scale** | Pattern #2 (Product List), drop hand-written htmlSource, blocking CI richness rules | (existing track in memory `project_vibecode_push.md`) | 3 weeks | Designer team |
| **D — Validator hardening + auto-gen MCP** | MCP schema generated from source AST, validate_usage catches token violations | 2 tickets | 2 weeks | DS team |

**Total:** 8 weeks to "Vibe code = Production grade" (ส่งงานครั้งเดียวผ่าน)

---

## 7. Jira tickets (DES project — Designer space)

> **Status:** ✅ สร้างจริงแล้วใน DES project (board 52, backlog)
> **Note:** ไฟล์ rules `.claude/rules/jira.md` + `project.md` ระบุ LR แต่ DS 3.0 UXUI work อยู่ใต้ DES (Designer) — ต้องอัปเดต rules

### Created tickets

| ID | Type | Title | Status |
|----|------|-------|--------|
| [DES-2035](https://sellsuki.atlassian.net/browse/DES-2035) | **Epic** | DS 3.0 Vibecode Production Grade | 🟢 Created — parent of all P0 |
| [DES-2036](https://sellsuki.atlassian.net/browse/DES-2036) | Task | [P0-1] MCP DS3 — fix get_brand_rules false "theme-provider deprecated" claim | 🟢 |
| [DES-2037](https://sellsuki.atlassian.net/browse/DES-2037) | Task | [P0-2] @uxuissk/design-system-core — fix broken ./style.css export | 🟢 |
| [DES-2038](https://sellsuki.atlassian.net/browse/DES-2038) | Task | [P0-3] @uxuissk/design-system-core — ship bundled JS for CDN | 🟢 |
| [DES-2039](https://sellsuki.atlassian.net/browse/DES-2039) | Task | [P0-4] ds3-mcp — auto-sync schema with installed package version | 🟢 |
| [DES-2040](https://sellsuki.atlassian.net/browse/DES-2040) | Task | [P0-5] ds3-mcp — extend get_component schema (enum/defaults/slots/events/examples) | 🟢 Blocked by DES-2039 |
| [DES-2041](https://sellsuki.atlassian.net/browse/DES-2041) | Task | [P1-1] ds3-mcp — validate_usage strict checks (token/wrapper/duplicate violations) | 🟢 |
| [DES-2042](https://sellsuki.atlassian.net/browse/DES-2042) | Task | [P1-2] ds3-mcp — write component descriptions for all 91 components | 🟢 |
| [DES-2043](https://sellsuki.atlassian.net/browse/DES-2043) | Task | [P1-3] ssk-widget-matric refactor (drop demo image + slot pattern + optional props) | 🟢 |
| [DES-2044](https://sellsuki.atlassian.net/browse/DES-2044) | Task | [P1-4] resolve ssk-text vs ssk-text_2 naming | 🟢 |
| [DES-2045](https://sellsuki.atlassian.net/browse/DES-2045) | Task | [P1-5] ds3-mcp — add icon catalog tool (list_icons / get_icon_catalog) | 🟢 |
| [DES-2046](https://sellsuki.atlassian.net/browse/DES-2046) | Task | [P1-6] ds3-mcp — implement suggest_components ranking algorithm | 🟢 Depends on DES-2042 |
| [DES-2047](https://sellsuki.atlassian.net/browse/DES-2047) | Task | [P1-7] Shiki dynamic import to reduce bundle size | 🟢 |
| [DES-2048](https://sellsuki.atlassian.net/browse/DES-2048) | Task | [P1-8] ship React TypeScript type declarations | 🟢 |
| [DES-2049](https://sellsuki.atlassian.net/browse/DES-2049) | Task | [P1-9] ds3-mcp — add a11y (WCAG 2.1 AA) checks to validate_usage | 🟢 |
| [DES-2050](https://sellsuki.atlassian.net/browse/DES-2050) | Task | [P1-10] accept friendly brand names in get_brand_rules | 🟢 |

### Wrong project (to be cleaned up manually by user)

| ID | Reason | Action |
|----|--------|--------|
| LR-187..190 | Created in wrong project (LR ≠ DES Designer space) | User delete via Jira UI |

### Ticket drafts (original — kept for reference)

### P0-1
```
Type:        Tech Story
Project:     LR
Summary:     MCP DS3 — fix get_brand_rules to remove false "theme-provider deprecated" claim
Description:
   MCP `get_brand_rules` and `get_quick_start` return contradictory provider guidance.
   Suki Designer skill (authoritative) and source code confirm ssk-theme-provider is the
   correct root wrapper, not deprecated.

   Acceptance criteria:
   - get_brand_rules output uses ssk-theme-provider as primary example
   - "deprecated" claim removed
   - get_quick_start example matches get_brand_rules example
   - Cross-tool consistency verified by smoke test
Labels:      ds3-mcp, p0-blocker, vibecode-quality
```

### P0-2
```
Type:        Bug
Summary:     @uxuissk/design-system-core — fix broken ./style.css export in package.json
Description:
   package.json declares "./style.css": "./dist/style.css" but file doesn't exist.
   Real file is dist/sellsuki-components.css.
   Consumers following `import "@uxuissk/design-system-core/style.css"` get 404.

   Acceptance criteria:
   - exports field updated to point to actual CSS file
   - Alias "./styles.css" added for DX
   - Publish patch version 3.4.3
   - Suki Designer SETUP.md updated with CSS import example
Labels:      ds3-core, p0-blocker, publishing
```

### P0-3
```
Type:        Tech Story
Summary:     @uxuissk/design-system-core — ship bundled JS for direct CDN consumption
Description:
   Current dist/sellsuki-components.js has bare `from "lit"` imports.
   Vanilla HTML usage (per Suki Designer SETUP.md vanilla example) fails without importmap.
   Add dist/sellsuki-components.bundled.js with lit included for drop-in CDN use.

   Acceptance criteria:
   - New build output bundles lit + @lit/context inline
   - Two import patterns documented: ESM (light, bring your own lit) + Bundled (heavy, drop-in)
   - MCP get_quick_start(vanilla) uses bundled URL
   - Test: <script type="module" src="...bundled.js"> works without importmap
Labels:      ds3-core, p0-blocker, dx
```

### P0-4
```
Type:        Tech Story
Summary:     ds3-mcp — auto-sync schema with installed @uxuissk/design-system-core version
Description:
   MCP schema reports version 3.1.2 / 3.2.0 while real package is 3.4.2.
   Tokens missing 90% (11 reported, 113 in bundle). Token names AI generates fail at runtime.

   Acceptance criteria:
   - MCP parses dist/sellsuki-components.css at startup for token list
   - MCP parses TypeScript types for component props
   - get_version() endpoint reports installed package version
   - CI test: schema.version == package.json.version
Labels:      ds3-mcp, p0-blocker, automation
```

### P0-5
```
Type:        Tech Story
Summary:     ds3-mcp — extend get_component schema with enum/defaults/slots/events/examples
Description:
   Current schema returns prop names + types but lacks valid enum values, defaults,
   slots, events, examples. AI assistants invent invalid prop values like themeColor="brand"
   that aren't in ColorRole enum.

   Acceptance criteria:
   - Schema includes "enum" for typed props (extracted from TypeScript types)
   - Schema includes "default" from class property defaults
   - Schema includes "slots" array (name + description)
   - Schema includes "events" array (name + detail type)
   - Schema includes 1-3 working "examples" per component
   - 91 components covered
Labels:      ds3-mcp, p0-blocker, schema
```

### P1-1..P1-6
*(Drafts shorter — user confirm batch แล้วผมขยายตอนสร้างจริง)*

---

## 8. Definition of Done — Vibe Code = Production Grade

ปุ่ม "Vibe code Order Management feature with DS 3.0" จาก AI ส่งงานที่:

- [ ] โค้ดมี `<ssk-theme-provider brand="ccs3">` ครอบ root → component get tokens
- [ ] ทุก `themeColor` value อยู่ใน ColorRole enum (no `"brand"` / `"default"`)
- [ ] ทุก `font-size` ≥18px (caption token) — no Tailwind text-xs/sm
- [ ] CSS import statement ถูก (no 404)
- [ ] CDN script tag load สำเร็จ (bundled URL หรือมี importmap)
- [ ] Table มี unique `dataIndex` ต่อ column (no customCell collision)
- [ ] ทุก icon name มีอยู่จริงใน icon catalog
- [ ] No hardcoded hex / no `#XXXXXX` ใน component style
- [ ] Validator `mcp__ds3__validate_usage` ผ่าน — 0 issues

→ **Smoke test:** prompt เดียวกัน 3 ครั้งใน vibe code → 3/3 ครั้งผ่าน DoD

---

## 9. Skill / docs ที่ต้อง update หลัง implement plan

| File | Owner | Change |
|------|-------|--------|
| `~/.claude/skills/suki-designer/SETUP.md` | Designer team | เพิ่ม CSS import statement + bundled vs ESM choice |
| `~/.claude/skills/suki-designer/TOKEN-POLICY.md` | Designer team | เพิ่ม semantic token catalog ครบ (จาก bundle CSS) |
| `~/.claude/skills/suki-designer/_CHANGELOG.md` | Designer team | บันทึก v1.4 update |
| `MIGRATION.md` (this repo) | DS team | เพิ่ม section "Provider model" |
| `CLAUDE.md` (this repo) | DS team | ลบ reference ไป `DS_UPGRADE.md` ถ้าทำ archive |
| MCP `get_quick_start` output | DS team | ตรงกับ SETUP.md ใหม่ |

---

## 10. Open questions for review

1. **`ssk-app-shell-provider` ตั้งใจให้อยู่หรือไม่?** ถ้ายังต้องการ → docs ต้องอธิบายว่าใช้คู่ theme-provider ไม่ใช่แทน ถ้าไม่ใช้แล้ว → mark `@deprecated` ในซอร์ส + warning console
2. **`ssk-text` vs `ssk-text_2`** — เก็บตัวไหน? (Suki Designer ใช้ `ssk-text`)
3. **`preview/ds3-preview.html`** — memory note บอก "do not treat as canonical" แต่ session ก่อนหน้านี้ user ก็เปิดดู → ควร mark สถานะให้ชัด (banner ใน file header)
4. **Bundle size** — bundled.js จะใหญ่ขึ้นเท่าไหร่? lit ~30KB minified+gzip → acceptable
5. **Pattern SoT scale** — Pattern #2 (Product List) ใครเป็นคน drive? Memory บอก "validates scale claim ≤30% effort of pattern #1"

---

---

## 11. Review — `/uxui-design-system` perspective

> *มุมมองจาก skill ที่เป็นเจ้าของ DS infrastructure (npm publish, Storybook, build pipeline, MCP server, cross-framework support)*

### 11.1 จุดที่เห็นด้วย ✅

**P0-2 (broken style.css export) คือ root cause ใหญ่กว่าที่ plan บอก**
- ทุก consumer ที่ทำ `import "@uxuissk/design-system-core/style.css"` ตาม convention จะ 404
- นี่อธิบายทำไม Vibe code output ส่วนใหญ่ "หน้าตาเพี้ยน" — ไม่ใช่แค่ provider issue
- แก้ patch version (3.4.3) แล้ว publish ทันที — non-breaking

**P0-3 (bundled JS) ต้องทำ — เพราะ DS 1.2 React บรรจุ lit เข้าตรงๆ ได้ แต่ DS 3.0 ไม่**
- DS 1.2 (`@uxuissk/design-system`) ตอน publish bundle React + Radix ครบ — ไม่มี bare imports
- DS 3.0 (`@uxuissk/design-system-core`) Vite library mode ตั้ง `external: ['lit']` → ไม่ได้ bundle
- เป็น regression จาก DS 1.2 ในแง่ DX
- Ship 2 outputs (ESM external + Bundled) เป็น best practice

**P0-5 (extend get_component schema) คือ leverage สูงสุด**
- ถ้า AI ได้ enum/default/slots/events จาก MCP ทุก vibe code prompt จะแม่นขึ้น 80%
- ทุก downstream issue (themeColor invented, slot missed, event not wired) แก้ได้จุดเดียว

### 11.2 จุดที่ขาดในแผน — ผมเสริม

**11.2.1 — ไม่มี Visual Regression Test (VRT) ใน DoD**
- DS 1.2 ผ่าน Chromatic VRT ทุก PR — DS 3.0 ไม่มี VRT
- Definition of Done ควรเพิ่ม:
  ```
  - [ ] Chromatic VRT ผ่านบน Pattern SoT stories ทุกตัว (4 variants × 3 brands)
  - [ ] visual diff < 0.5% per story
  ```
- ใส่ใน Phase D หรือ Phase C end

**11.2.2 — Package บรรจุ Shiki + 100+ language files (per MCP-DS3-ISSUES Bonus#2)**
- Bundle size ใหญ่เกิน — ทุก consumer ดาวน์โหลด lang files ทั้งที่ใช้แค่ JS/TS/CSS
- ส่งกระทบ Vibecode load time (memory: blank screen on init)
- **ควรเพิ่ม P1-7:** dynamic import ของ Shiki languages — เลือก load เฉพาะที่ใช้
- **Estimate:** M — แก้ใน `src/components/code-block/`

**11.2.3 — ไม่มี TypeScript helper สำหรับ React consumer**
- DS 1.2 มี `.d.ts` ที่ declare `JSX.IntrinsicElements` ของ `ssk-*` tag → React user ใช้ได้เลย
- DS 3.0 ยังให้ user เขียน type declaration เอง (per SETUP.md line 53-65)
- **ควรเพิ่ม P1-8:** ship `@uxuissk/design-system-core/react-types.d.ts` ที่ declare ทุก `ssk-*` element
- **Estimate:** S — auto-generate จาก `src/main.ts` exports

**11.2.4 — ไม่มี changeset/changelog automation**
- DS 1.2 ใช้ `changesets` → semantic version bump อัตโนมัติ + changelog generate
- DS 3.0 ตอนนี้ manual bump (`chore: bump version to 3.4.2`)
- ส่งกระทบ vibecode-quality เพราะ user ไม่รู้ว่า 3.4.2 มีอะไรเปลี่ยน
- **ควรเพิ่ม Phase D ticket:** setup `.changeset/` + CI workflow

**11.2.5 — MCP ต้อง expose pattern catalog (ไม่ใช่แค่ component)**
- Pattern SoT ลงแล้ว (memory v3.4.0) แต่ MCP DS3 ยังไม่ expose pattern lookup
- Vibe code prompt "Order Management page" ควร hit pattern โดยตรง ไม่ต้องประกอบ component
- **ควรเพิ่ม:**
  ```
  list_patterns() → ["order-management", "product-list", ...]
  get_pattern(name) → { mockData, htmlSource, variants[] }
  ```
- ตรงกับ memory feedback "pattern source-of-truth approach"
- **Estimate:** M — endpoint แค่ wrap `src/patterns/registry.ts`

### 11.3 Concern — สิ่งที่ plan อาจประเมินต่ำเกินไป

**Concern A:** Phase A (1 week) อาจไม่พอ
- P0-3 (bundled output) ต้อง test cross-browser + cross-framework
- P0-4 (MCP version sync) ต้อง refactor MCP server pipeline
- → ปรับเป็น **1.5 week** หรือ split P0-3 ไป Phase B

**Concern B:** ไม่มี migration path สำหรับ existing vibe code outputs
- ตอนนี้มี users ที่ใช้ output แบบเก่า (ผิดทั้ง provider, themeColor) ใน prod แล้วหรือยัง?
- ถ้ามี → ต้องมี deprecation banner หรือ MCP `validate_existing_code(html_string)` ที่ทำ auto-fix
- ถ้าไม่มี → skip (vibecode track ยังใหม่)

**Concern C:** ไม่ track Shiki bundle bloat → Pattern SoT จะติด CI bundle size limit
- ถ้า publish bundled.js ที่บรรจุ lit + Shiki + 100 langs → อาจ ~5MB
- ควรตั้ง `bundlesize` ใน CI ก่อนกระทบ users

### 11.4 Endorsement

แผนนี้ถูกทิศทาง — P0 5 ตัวคือ critical path จริง ไม่มีเกินจำเป็น
ถ้าเพิ่ม P1-7 (Shiki dynamic) + P1-8 (TS types) + Pattern MCP endpoint → **ready to ship**

**Recommendation:** Approve plan with addenda 11.2.1–11.2.5

---

## 12. Review — `/lead-uxui` perspective

> *มุมมองจาก Lead UX/UI Designer — product design strategy, UX quality, designer/dev experience, cross-functional alignment*

### 12.1 ภาพรวมเชิง strategy

**แผนนี้ดี — แก้ root cause ของ "vibe code ส่งงานเพี้ยน" ไม่ใช่แค่ symptom**
- session ก่อนหน้านี้ผมเห็น user ติดทุกขั้น (CDN load, provider, themeColor, customCell) — นี่คือ pain ที่ designer/dev ทั้งทีมเจอ
- ถ้าแก้ครบ vibecode = design system in action (ไม่ใช่ design system + AI = chaos)

### 12.2 จุดที่ขาดในมุม design strategy

**12.2.1 — ขาด User Experience metric สำหรับ Vibe code**

แผนวัด "DoD = ส่งงานครั้งเดียวผ่าน" แต่ไม่มี:
- **Time-to-first-render** — prompt → ดูตา UI ครั้งแรกเวลาเท่าไหร่ (ตอนนี้ blank screen นาน 3-5s)
- **Round-trip count** — ต้อง iterate กับ AI กี่รอบกว่าจะถูก (ตอนนี้ session นี้ใช้ ~7 รอบ)
- **Visual parity score** — vs DS 2.0 reference (เป็น quality bar ที่ user กำหนดเอง — มี memory `reference_ds2_visual_bar.md`)

**Recommendation:** เพิ่ม Section 8.5 — UX metrics for vibe code track:
```
- Time-to-first-render p95: ≤ 1s after script load
- Round-trip-count p50: ≤ 2 prompts per feature
- Visual parity score: ≥ 90% match vs DS 2.0 vibe code demo
```

**12.2.2 — ขาด Designer onboarding plan**

ทีม designer ต้อง understand:
- `ssk-theme-provider` ไม่ใช่ technical detail — เป็น design constraint (brand inheritance)
- Token ทำงานยังไง (semantic vs primitive layer)
- เมื่อไหร่ใช้ `ssk-button` vs `ssk-tag` vs `ssk-badge`

ถ้าไม่ educate → designer drop hex / Tailwind text-sm ใน Figma → AI vibe code copy แล้ว fail

**Recommendation:** เพิ่ม Phase E (Designer enablement):
- Workshop 1 ชั่วโมง × 2 sessions
- Cheatsheet: Component picking guide (1-pager)
- Office hours weekly สำหรับ designer ที่เริ่ม vibe code

**12.2.3 — ขาด accessibility (a11y) blocker**

แผนไม่พูดถึง WCAG 2.1 AA แม้ DS_UPGRADE.md Definition of Done line 442 บอกว่า "A11y WCAG 2.1 AA ผ่านทุก component"
- vibe code อาจส่งงาน a11y fail (focus state, screen reader, contrast)
- เป็น brand risk เพราะ Sellsuki ลูกค้าหลายแบรนด์รวมราชการ

**Recommendation:** เพิ่ม P1-9:
```
MCP validate_usage ต้อง catch:
- Image without alt attribute
- Button without aria-label เมื่อ icon-only
- Form input without label / aria-label
- Color contrast < 4.5:1 (text) หรือ 3:1 (UI elements)
```

**12.2.4 — Pattern SoT scale validation strategy ไม่ชัด**

Memory `project_vibecode_push.md` บอก Pattern #2 (Product List) "validates scale claim — effort target ≤30% of pattern #1"
- ใครเป็นคน drive Pattern #2? Designer หรือ DS team?
- ถ้า effort > 30% → แปลว่า Pattern SoT approach ไม่ scale → ต้อง pivot
- **plan ปัจจุบันไม่ระบุ go/no-go criteria**

**Recommendation:** Phase C ต้องมี checkpoint:
- Week 2 end of Phase C: Pattern #2 done → calculate effort
- ถ้า > 30%: ประชุม retrospective + ตัดสินใจ continue / pivot
- ถ้า ≤ 30%: scale ต่อไป Pattern #3, #4

**12.2.5 — Brand multi-tenant strategy หาย**

Sellsuki มี 8 friendly brands (sellsuki/patona/shipmunk/akita/sellsukipay/sukispace/oc2plus/ccs3) map เป็น 3 strict (patona/ccs3/oc2plus)
- vibecode prompt "build for Shipmunk" — AI จะ map ยังไง?
- MCP `get_brand_rules` รับแค่ 3 strict — ไม่ครอบ friendly names
- product team (per memory `products` skill) ต้องการ brand-correct output

**Recommendation:** เพิ่ม P1-10:
```
MCP get_brand_rules รับ friendly names ด้วย:
- input: "shipmunk" → output: { brand: "ccs3", note: "Shipmunk uses CCS3 brand" }
- ระบุ alias mapping ชัด
- ตรงกับ AppShellProvider BRAND_MAP ใน source
```

### 12.3 ลำดับ Strategic priority — แตกต่างจาก plan

Plan จัด P0 ตาม technical severity แต่ในมุม strategy ผมจัดใหม่:

| Original | Strategic priority | เหตุผล |
|----------|-------------------|--------|
| P0-1 (MCP provider doc) | **#1 → ทำก่อนสุด** | กระทบทุก vibe code prompt — fix string 30 นาที |
| P0-2 (style.css export) | **#1 → ทำพร้อม P0-1** | Patch version ship ได้พร้อมกัน |
| P0-5 (extend get_component) | **#2** | Leverage สูงสุด — แก้แล้ว 80% downstream issues หาย |
| P0-3 (bundled JS) | **#3** | สำคัญแต่ workaround มี (importmap) |
| P0-4 (MCP version sync) | **#4** | Engineering improvement — user impact ทางอ้อม |

→ "ส่งของก่อน": P0-1 + P0-2 publish 3.4.3 + MCP update ใน 2 วัน → vibecode score กระโดดทันที

### 12.4 Concern เชิง business

**Concern D:** Pattern SoT ยังไม่ scale-proven — แต่ plan ลงทุน Phase C (3 weeks) บนสมมติฐานว่าจะ scale
- ถ้า Pattern #2 ใช้เวลา 80% ของ #1 → 3 patterns/month ไม่พอกับ product demand
- **มี backup plan ไหม?** เช่น semi-automated pattern generation จาก Storybook story

**Concern E:** Designer team ownership ของ DS 3.0 ตามที่ Suki Designer `CONTEXT.md` Stakeholders บอก — แต่ DS team อยู่ที่ไหน?
- Plan tickets owner = "DS team" แต่ใน Suki Designer = "Designer team Own DS 3.0 codebase"
- ต้อง clarify org structure ก่อน assign tickets

### 12.5 Endorsement

ผม endorse plan **แต่มี 5 condition:**
1. เพิ่ม UX metric DoD (12.2.1)
2. เพิ่ม Phase E designer enablement (12.2.2)
3. เพิ่ม a11y validation (12.2.3)
4. เพิ่ม Pattern SoT go/no-go criteria (12.2.4)
5. เพิ่ม brand alias mapping (12.2.5)

ปรับ priority ตาม 12.3 → ส่ง P0-1 + P0-2 ก่อนใน 2 วันแรก เพื่อ proof-of-progress ให้ stakeholder

**Recommendation:** Approve plan + 5 conditional addenda

---

## 13. Consolidated action items (post-review)

หลัง 2 skill review รวมแล้ว ผมเพิ่ม 5 P1 + 1 Phase ใน plan:

| Item | From | Add to | Priority |
|------|------|--------|----------|
| P1-7 — Shiki dynamic import | uxui-design-system 11.2.2 | Phase B | 🟡 |
| P1-8 — React TS types ship | uxui-design-system 11.2.3 | Phase B | 🟡 |
| P1-9 — a11y in validate_usage | lead-uxui 12.2.3 | Phase B | 🟠 |
| P1-10 — Brand alias mapping | lead-uxui 12.2.5 | Phase B | 🟡 |
| Pattern MCP endpoint | uxui-design-system 11.2.5 | Phase C | 🟠 |
| VRT in DoD | uxui-design-system 11.2.1 | Phase D | 🟠 |
| Changeset automation | uxui-design-system 11.2.4 | Phase D | 🟡 |
| UX metric DoD | lead-uxui 12.2.1 | Section 8 | 🟠 |
| Phase E — Designer enablement | lead-uxui 12.2.2 | New phase | 🟠 |
| Pattern SoT go/no-go gate | lead-uxui 12.2.4 | Phase C | 🟠 |

Adjusted total: **9 weeks** (vs 8 original) → ผม update timeline ในรอบหน้าถ้า approve

---

*End of plan. Awaiting user approval to:*
*(a) confirm file deletion (DS_UPGRADE.md / UPGRADEPREVIEW3.md)*
*(b) create Jira tickets P0 × 5 in LR project*
*(c) integrate Section 13 addenda into main plan*
