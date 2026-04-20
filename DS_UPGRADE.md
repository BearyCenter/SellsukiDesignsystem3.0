# DS 3.0 Upgrade — Master Plan

> **Production Grade · Enterprise Scale**
> Last updated: 2026-04-20

---

## Vision

DS 3.0 = **DS 1.0 Architecture** (Lit Web Components, framework-agnostic) + **DS 2.0 Visual Quality** (token values, component set, font standards, design language)

ทุก Product อัปเดต package version เดียว — ไม่ต้องเขียนใหม่ ไม่มี breaking changes

---

## Core Principles

| Principle | คำอธิบาย |
|-----------|----------|
| **Framework-agnostic** | Web Components ทำงานได้ใน React, Vue, Angular, Vanilla JS |
| **Token-push visual update** | เปลี่ยนค่า token ทีเดียว ทุก product อัปเดต visual พร้อมกัน |
| **Zero migration debt** | `--ssk-*` backward-compat bridge ทำให้ product เก่าไม่แตก |
| **DS 2.0 as visual reference** | Token values, font sizes, component behavior ยึด DS 2.0 เป็น ground truth |
| **Token-only styling** | Component ห้าม hardcode color/size — ใช้ semantic token เท่านั้น |
| **ds-* canonical + ssk-* alias** | ทุก element register ทั้งสองชื่อด้วย guard pattern |

---

## Package

```
@uxuissk/design-system-core@3.0.0
```

Published via CI/CD — trigger on git tag `v*`

---

## Overall Progress

```
Phase 0  ██████████  9/10  Visual Parity + Infra        (0.6 deferred — รอ design spec)
Phase 1  █████░░░░░  4/7   Port Missing Components       (1.3 ✅ 1.4 ✅ 1.6 ✅ 1.7 ✅)
Phase 2  ░░░░░░░░░░  0/8   Component Quality Upgrade
Phase 3  ░░░░░░░░░░  0/5   AppShell + Layout System
Phase 4  ██░░░░░░░░  1/6   Publish + Deprecate DS 1.0   (4.1 ✅ package name done)
─────────────────────────────
Total    ████░░░░░░  14/36
```

---

## Key Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Non-React product frameworks | Timeline ต่างกันต่อ product | ประเมิน migration timeline แยกต่อ product |
| I18n ไม่มีใน DS 3.0 | Product ที่ใช้ i18n ต้องหา solution เอง | แนะนำ `react-i18next` หรือ `i18next` |
| Lit knowledge ในทีม | งานช้า / คุณภาพต่ำ | ต้อง Dev ที่รู้ Lit อย่างน้อย 1 คน |
| React 18 Web Component event friction | Event handler ทำงานผิดปกติ | ใช้ wrapper utility สำหรับ React 18 |
| `cssVar()` deeply embedded | การ refactor component ทำได้ช้า | คงไว้ primitive layer, component ใหม่ใช้ semantic token โดยตรง |
| Storybook 7→8 breaking changes | Build พัง, stories หาย | ทำใน branch แยก, ไม่รวมกับงาน component |

---

## Token Architecture

```
ชั้น 1 — Primitive (คงเดิม ไม่แตะ)
  --ssk-colors-gray-800: #1F2937
  --ssk-font-family-sans: "DB HeaventRounded"

ชั้น 2 — Semantic (DS 2.0 canonical names)
  --text-primary:   var(--ssk-colors-gray-800)
  --bg-primary:     var(--ssk-colors-white-50)
  --stroke-primary: var(--ssk-colors-gray-200)
  --font-p:         20px
  --font-label:     20px
  --font-caption:   18px
  --font-h1..h4:    ...
  --radius-sm/md/lg/xl: ...

ชั้น 3 — Backward Compat Bridge (1 ไฟล์)
  --background-primary: var(--bg-primary)   ← DS 1.0 old name
  --ssk-primary: var(--brand)               ← product เก่าใช้ได้ต่อ

ชั้น 4 — Brand Override (per brand)
  injectSemanticTokens("patona") → `:root` override
```

### DS 2.0 → DS 3.0 Token Mapping (สรุปจาก sellsuki-ds.css)

| Category | DS 2.0 Token | DS 3.0 Token | Status |
|----------|-------------|-------------|--------|
| Text | `--text-primary` | `--text-primary` | ✅ match |
| Text | `--text-secondary` | `--text-secondary` | ✅ match |
| Text | `--text-brand-primary` | `--text-brand-primary` | ✅ match |
| Background | `--bg-primary` | `--background-primary` | ⚠ rename needed |
| Background | `--bg-brand-primary` | missing | ❌ add |
| Foreground | `--fg-primary` | missing | ❌ add |
| Foreground | `--fg-secondary` | missing | ❌ add |
| Stroke | `--stroke-primary` | `--stroke-primary` | ✅ match |
| Stroke | `--stroke-brand` | `--stroke-brand` | ✅ match |
| Icon | `--icon-primary` | `--icon-primary` | ✅ match |
| Icon | `--icon-brand` | missing | ❌ add |
| Typography | `--font-h1..h4` | missing | ❌ add |
| Typography | `--font-label` | missing | ❌ add |
| Typography | `--font-p` | missing | ❌ add |
| Typography | `--font-caption` | missing | ❌ add |
| Typography | `--font-button` | missing | ❌ add |
| Radius | `--radius-sm..xl` | missing | ❌ add |
| Button | `--button-solid-bg` | missing | ❌ add |

---

## Cross-Phase Quality Standards

> ทุก Phase ต้องผ่านทุกข้อก่อน merge

```bash
# Build & Types
npm run build          # zero error, zero warning
npm run type-check     # zero error
npm run lint           # zero error

# Component checklist (ทุกตัว)
:host { display: ... }  ใน static styles
Token-only styles       ไม่มี hardcoded color/size/font
ds-* + ssk-* guard      ครบทุก element
No console.log          ใน production code
```

---

## Phase 0 — Visual Parity + Infra Upgrade

> ~3 สัปดาห์ | 0/10 tasks

### งาน

- [x] **0.1** Audit token values ทั้งหมดใน DS 1.0 (`--ssk-*`) เทียบ DS 2.0
  - Owner: UX/UI | Effort: S
  - Output: token audit spreadsheet — missing / mismatched / aligned

- [x] **0.2** Map DS 1.0 tokens → DS 2.0 token names
  - Owner: UX/UI | Effort: S
  - Output: mapping table (ดู Token Architecture ด้านบน)

- [x] **0.3** อัปเดต token values ใน `semantic-tokens.ts` ให้ตรง DS 2.0 visual identity
  - Owner: UX/UI | Effort: M
  - Files: `src/contexts/theme/semantic-tokens.ts`, `src/contexts/theme/default.ts`

- [x] **0.4** สร้าง Token Bridge CSS
  - Owner: Dev | Effort: S
  - Files: `src/tokens/ds3-semantic.css`, `src/tokens/backward-compat.css`
  - เพิ่ม typography tokens (`--font-h1..h4`, `--font-label`, `--font-p`, `--font-caption`, `--font-button`)
  - เพิ่ม radius tokens (`--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`)
  - เพิ่ม `--fg-*`, `--bg-*` layer ให้ครบ DS 2.0

- [x] **0.5** Fix font size overrides — ปรับ component ทุกตัวให้ใช้ semantic token
  - Owner: UX/UI | Effort: S
  - ไม่มี hardcoded px ต่ำกว่า spec (`--font-caption` = 18px minimum)
  - แทน `cssVar("font")` ด้วย `var(--font-p)`, `var(--font-label)` ใน component ใหม่

- [ ] **0.6** เพิ่ม brand configs ใหม่ (Shipmunk, Akita, SellsukiPay, Sukispace)
  - Owner: Both | Effort: M
  - รอ design spec จาก UX/UI ก่อนเริ่ม

- [x] **0.7** Upgrade Storybook 7 → 8 (`@storybook/web-components-vite`)
  - Owner: Dev | Effort: S
  - ทำใน branch แยก ไม่รวมกับงาน component

- [x] **0.8** Upgrade Vite 4 → 6 + update build pipeline
  - Owner: Dev | Effort: S
  - ทำ branch เดียวกับ 0.7

- [x] **0.9** Migrate/เขียน stories CSF3 format สำหรับ component ที่มีอยู่แล้ว
  - Owner: Dev | Effort: M
  - Reference: DS 2.0 Storybook (https://sellsukidesignsystemv12.vercel.app — 532 stories)

- [x] **0.10** Smoke test ทุก component ใน Storybook 8
  - Owner: Both | Effort: M

### Phase 0 Audit Gate ✋

```
✅ npm run build — zero error, zero warning
✅ npm run type-check — pass
✅ Storybook 8 build สำเร็จ — ทุก component render ได้
✅ Visual diff: DS 3.0 vs DS 2.0 screenshots (manual per component)
✅ Token coverage: 100% DS 2.0 semantic names มีใน DS 3.0
✅ Bundle size delta < +10% จาก Phase 0 baseline
✅ Breaking change check: product ที่ใช้ --ssk-* ยังทำงานได้
✅ backward-compat.css ครอบ --ssk-* ทุก token ที่ product เก่าใช้
✅ Font size: ไม่มีค่าต่ำกว่า 18px ใน component ใดเลย
```

---

## Phase 1 — Port Missing Components → Lit

> ~4 สัปดาห์ | 0/7 tasks
> Reference: DS 2.0 Storybook (https://sellsukidesignsystemv12.vercel.app)

### Priority A — Product Critical

- [ ] **1.1** `ImageCropper` → Lit wrapper (แทน Croppie.js)
  - Owner: Dev | Effort: M | ⚠ product image, avatar crop
  - `ds-image-cropper` + `ssk-image-cropper`

- [ ] **1.2** `PhoneCountryInput` → ปรับปรุง `ssk-addon-phone-country`
  - Owner: Dev | Effort: S | ⚠ Thailand + international shipping

- [x] **1.3** `PageHeader` → Lit component
  - Owner: Dev | Effort: S
  - `ds-page-header` + `ssk-page-header`

- [x] **1.4** `FilterBar` → Lit (multi-filter, search, date range)
  - Owner: Dev | Effort: M
  - `ds-filter-bar` + `ssk-filter-bar`

### Priority B — Data Heavy

- [ ] **1.5** `AdvancedDataTable` → Lit (server-side pagination, bulk actions, selection, expandable rows)
  - Owner: Dev | Effort: L
  - `ds-advanced-data-table` + `ssk-advanced-data-table`

- [x] **1.6** เขียน Storybook stories CSF3 สำหรับ component ใหม่ทุกตัว
  - Owner: Both | Effort: M
  - ต้องมี: default, loading, error, empty, disabled state

- [x] **1.7** อัปเดต DS 3.0 Preview site (`preview/ds3-preview.html`)
  - Owner: Dev | Effort: S

### Phase 1 Audit Gate ✋

```
✅ Visual parity: เทียบ DS 2.0 Storybook ทีละ component (screenshot diff)
✅ A11y: WCAG 2.1 AA — keyboard nav, ARIA labels, focus management
✅ Cross-framework: ทำงานได้ใน React 18, Vue 3, Vanilla JS
✅ Mobile responsive: 375px, 768px, 1280px
✅ ds-* + ssk-* registration guard ครบทุกตัว
✅ :host display set ใน static styles ทุกตัว
✅ Token-only styles — zero hardcoded color/size
✅ Storybook story ครบทุก state (default/loading/error/empty/disabled)
✅ npm run build — pass
```

---

## Phase 2 — Component Quality Upgrade

> ~3 สัปดาห์ | 0/8 tasks

- [ ] **2.1** `Dropdown` → multi-select, search, custom render (จาก DS 2.0)
  - Owner: Dev | Effort: M

- [ ] **2.2** `DatePicker` → range mode, keyboard navigation ครบ
  - Owner: Dev | Effort: M

- [ ] **2.3** `DynamicTable` → sort, selection, bulk action pattern DS 2.0
  - Owner: Dev | Effort: M

- [ ] **2.4** `Sidebar` → SidebarAccountSwitcher, collapse animation, nested group
  - Owner: Dev | Effort: S

- [ ] **2.5** `Charts` → Lit Web Component (Line, Bar, Donut, zero-dep SVG)
  - Owner: Dev | Effort: L

- [ ] **2.6** `CodeBlock` → migrate PrismJS → Shiki
  - Owner: Dev | Effort: S

- [ ] **2.7** `CountryIcon` → ISO 3166 complete + SVG flags
  - Owner: Dev | Effort: XS

- [ ] **2.8** UX/UI visual review ทุก component ที่ upgrade แล้ว
  - Owner: UX/UI | Effort: M

### Phase 2 Audit Gate ✋

```
✅ Regression test: component ที่ไม่ได้ upgrade ยังทำงานปกติ
✅ Interaction: keyboard, mouse, touch ครบ
✅ State machine: loading/error/empty/disabled ทุก component
✅ Animation: 60fps, no layout thrash (Chrome DevTools)
✅ Token-only: zero hardcoded color/size หลงเหลือ
✅ Storybook stories update ครบทุก variant ใหม่
✅ npm run build — pass
```

---

## Phase 3 — AppShell + Layout System

> ~3 สัปดาห์ | 0/5 tasks

- [ ] **3.1** `AppShell` → CSS slot-based shell (Navbar + Sidebar + Content)
  - Owner: Dev | Effort: L
  - `ds-app-shell` + `ssk-app-shell`
  - Framework-agnostic — ทำงานเป็น host ใน React / Vue / Vanilla

- [ ] **3.2** `AppShellProvider` → brand/theme injection
  - Owner: Dev | Effort: M

- [ ] **3.3** `FeaturePageScaffold` → Lit layout component
  - Owner: Dev | Effort: M

- [ ] **3.4** `WidgetGrid` → evaluate GridStack vs native CSS Grid → port
  - Owner: Dev | Effort: L
  - ⚠ Evaluate use case จริงก่อน implement

- [ ] **3.5** `StatCard`, `KPIRow` upgrades + Full page layout test ทุก brand
  - Owner: UX/UI | Effort: M
  - ทดสอบทุก 7 brands: Sellsuki, Patona, Shipmunk, Akita, SellsukiPay, Sukispace, OC2+

### Phase 3 Audit Gate ✋

```
✅ AppShell slot composition ทำงานถูกต้อง (named slots)
✅ Layout ไม่แตกใน React 18, Vue 3, Vanilla JS host
✅ Sidebar collapse / Navbar collapse ที่ breakpoint ถูกต้อง
✅ 7 brand visual test ผ่านทุก brand
✅ Performance: FCP < 2s, TTI < 3s บน low-end device (Lighthouse)
✅ npm run build — pass
```

---

## Phase 4 — Publish + Deprecate DS 1.0

> ~1 สัปดาห์ | 0/6 tasks (1 done)

- [x] **4.1** เปลี่ยน package name → `@uxuissk/design-system-core@3.0.0` ✅
  - CI/CD publish pipeline พร้อมแล้ว (trigger on `v*` tag)

- [ ] **4.2** เพิ่ม `console.warn` deprecated warning สำหรับ `ssk-*` element names
  - Owner: Dev | Effort: XS

- [ ] **4.3** สร้าง Migration Guide: DS 1.0 → DS 3.0
  - Owner: Both | Effort: M
  - เนื้อหา: token mapping table, API diff, code examples, brand migration

- [ ] **4.4** Deploy DS 3.0 Storybook → Vercel
  - Owner: Dev | Effort: S

- [ ] **4.5** ประกาศ deprecation `@sellsuki-org/sellsuki-components`
  - Owner: Both | Effort: XS

- [ ] **4.6** อัปเดต `CLAUDE.md` + `AGENTS.md` ให้ตรง DS 3.0 rules
  - Owner: UX/UI | Effort: S

### Phase 4 Audit Gate ✋

```
✅ Semantic versioning: tag v3.0.0, CHANGELOG.md สมบูรณ์
✅ npm publish ผ่าน CI/CD pipeline (ไม่ใช่ manual)
✅ Storybook deploy บน Vercel — ทุก story render ได้
✅ Migration guide: product team ทดสอบ upgrade ผ่านแล้ว
✅ backward-compat.css: --ssk-* bridge ยังทำงาน
✅ Zero console.error ใน production build
✅ Bundle size documented (v3.0.0 baseline สำหรับ minor versions)
```

---

## DS 2.0 Reference

DS 2.0 คงอยู่ในฐานะ **Visual Reference + Prototype Playground**

| Resource | URL |
|----------|-----|
| DS 2.0 Storybook | https://sellsukidesignsystemv12.vercel.app |
| DS 2.0 npm | `@uxuissk/design-system@0.8.16` |
| DS 2.0 token CSS | `node_modules/@uxuissk/design-system/dist/sellsuki-ds.css` |
| DS 3.0 Preview | `preview/ds3-preview.html` (serve via `npx serve . -p 4000`) |

DS 2.0 Storybook มี **532 stories** ใน 45+ components — ใช้เป็น visual spec สำหรับทุก phase

---

## Component Inventory

### มีใน DS 3.0 แล้ว (DS 1.0 base)

Accordion, Alert, Avatar, Badge, Button, Calendar, Card, CardExpandable, Checkbox, CodeBlock, DatePicker (single+range), DownloadFile, Drawer, Dropdown, DynamicTable, Heading, Icon, ImageCropper, Input, Logo, MiscIcon, Modal, Pagination, PhoneCountryInput, ProgressBar, Radio, Sidebar, Skeleton, Stepper, Table, Tabs, Text, Time, Timeline, Toast, Toggle, Tooltip, WaveIcon, WidgetGrid

### ต้อง Port จาก DS 2.0 (Phase 1)

FilterBar, PageHeader, AdvancedDataTable, ColorPicker, Tree, TransferList, RichTextEditor, TimePicker, ImageGallery, Charts (Line/Bar/Donut/Sparkline)

### ต้อง Upgrade คุณภาพ (Phase 2)

Dropdown (multi-select), DatePicker (range+keyboard), DynamicTable (bulk action), Sidebar (account switcher), CodeBlock (Shiki), CountryIcon (ISO 3166)

### ต้องสร้างใหม่ (Phase 3)

AppShell, AppShellProvider, FeaturePageScaffold, WidgetGrid (evaluate)

---

## Effort Summary

| Phase | Effort | Owner |
|-------|--------|-------|
| Phase 0 | ~3 สัปดาห์ | UX/UI + Dev |
| Phase 1 | ~4 สัปดาห์ | Dev (UX/UI review) |
| Phase 2 | ~3 สัปดาห์ | Dev + UX/UI review |
| Phase 3 | ~3 สัปดาห์ | Dev + UX/UI test |
| Phase 4 | ~1 สัปดาห์ | Dev + Both |
| **Total** | **~14 สัปดาห์** | |

---

## Definition of Done (DS 3.0 Complete)

```
□ ทุก component มี :host display ใน static styles
□ ทุก component ใช้ semantic token — ไม่มี hardcoded color/size
□ ทุก component มี ds-* + ssk-* registration guard
□ ทุก component มี Storybook story (CSF3) ครบทุก state
□ Token Bridge ครอบ DS 2.0 semantic names ทั้งหมด
□ backward-compat.css ครอบ --ssk-* ทุก token
□ Visual parity กับ DS 2.0 ผ่านทุก component
□ A11y WCAG 2.1 AA ผ่านทุก component
□ Cross-framework test ผ่าน (React 18, Vue 3, Vanilla)
□ 7 brands ทดสอบผ่านทุก brand
□ npm run build: zero error
□ Storybook deploy บน Vercel สำเร็จ
□ Migration Guide พร้อมสำหรับ product teams
```
