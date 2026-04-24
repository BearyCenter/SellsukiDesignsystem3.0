# Upgrade Preview 3.0 — Plan & Progress

## Known Issues (defer — แก้เมื่อเกิดปัญหาจริง)

| Issue | รายละเอียด | วิธีแก้ |
|-------|-----------|---------|
| Blank screen on initial load | `await import('@uxuissk/design-system-core')` block render ทั้งแอปก่อนโหลด DS 3.0 เสร็จ — bundle หนัก (gridstack+shiki+prismjs) | เพิ่ม CSS spinner ใน `index.html` ก่อน bootstrap() render |
| Block non-DS3 pages | หน้า Roadmap / DS 2.0 showcases ต้องรอ DS 3.0 load ทั้งที่ไม่ใช้ | Lazy load DS 3.0 เฉพาะ DS3 showcase pages |

## Context

| Item | Detail |
|------|--------|
| DS 2.0 source repo | https://github.com/BearyCenter/Sellsukidesignsystemv12 |
| DS 2.0 preview | https://sellsukidesignsystemv12-2bee.vercel.app |
| DS 3.0 core package | `@uxuissk/design-system-core@3.0.1` (published) |
| Preview 3.0 repo | https://github.com/BearyCenter/Design-system-SSK-3 |
| DS 3.0 component lib | `feat/storybook-v8` branch — 36/36 dev tasks complete |

## Goal

สร้าง documentation/preview site สำหรับ DS 3.0 โดย:
- **โครงสร้าง layout** = ใช้จาก DS 2.0 ทั้งหมด (sidebar, topbar, token colors, design)
- **ไส้ใน component showcase** = ใช้ DS 3.0 Lit Web Components จริง (`<ds-button>`, `<ds-input>`, ...)
- **ไม่แตะ** DS 2.0 pages — ทั้ง 80 ไฟล์ยังทำงานอยู่ปกติ

## DS 2.0 Site Stack (source)

```
Tech:     React + TypeScript + TailwindCSS 4 + Vite
Routes:   50+ routes via PAGE_MAP in App.tsx
Sidebar:  8+ groups, icon+label+badge, มี 2.0/3.0 mode toggle อยู่แล้ว
Factory:  _showcase-factory.tsx → Section, DemoCard, APITable, DemoBox
Pages:    80+ showcase files (button, input, table, modal, ...)
```

## DS 3.0 Component List (ใช้ใน preview ใหม่)

### Elements (atomic)
```
ds-button  ds-input  ds-textarea  ds-checkbox  ds-radio  ds-toggle
ds-badge   ds-avatar ds-icon      ds-text      ds-heading ds-divider
ds-spinner ds-skeleton ds-tag     ds-alert     ds-image  ds-card-select
ds-date-display ds-logo ds-container ds-menu-items ds-menu-group
```

### Components (composite)
```
ds-dropdown  ds-modal    ds-toast      ds-tabs       ds-table
ds-stepper   ds-progress-bar ds-sidebar ds-calendar  ds-time-picker
ds-drawer    ds-tooltip  ds-accordion  ds-timeline   ds-card
ds-widget-grid ds-line-chart ds-bar-chart ds-donut-chart
```

## Plan

### Step 1 — Setup repo (Design-system-SSK-3)
- [ ] Fork/copy DS 2.0 app shell (layout only — no DS 2.0 component logic)
- [ ] `npm install @uxuissk/design-system-core@3.0.1`
- [ ] `import '@uxuissk/design-system-core'` ที่ `src/main.tsx`
- [ ] เพิ่ม `ds3-types.d.ts` สำหรับ TypeScript custom element declarations

### Step 2 — Getting Started page
- [ ] `src/app/pages/ds3/getting-started.tsx` — ใช้ layout เดิม เนื้อหา DS 3.0
- [ ] wire route ใน App.tsx PAGE_MAP
- [ ] เปิด 3.0 mode ใน sidebar

### Step 3 — Component showcase pages (DS 3.0)
Priority order:

| Priority | Component | File |
|----------|-----------|------|
| 1 | Button | `ds3/button.tsx` |
| 2 | Input | `ds3/input.tsx` |
| 3 | Badge | `ds3/badge.tsx` |
| 4 | Modal | `ds3/modal.tsx` |
| 5 | Table | `ds3/table.tsx` |
| 6 | Dropdown | `ds3/dropdown.tsx` |
| 7 | Toast | `ds3/toast.tsx` |
| 8 | Tabs | `ds3/tabs.tsx` |
| 9 | Card | `ds3/card.tsx` |
| 10 | Charts | `ds3/charts.tsx` |

### Step 4 — Sidebar DS 3.0 nav items
เพิ่ม items ใหม่ที่มีเฉพาะใน DS 3.0 (ไม่มีใน DS 2.0):
- `ds-widget-grid`
- `ds-line-chart` / `ds-bar-chart` / `ds-donut-chart`
- `ds-app-shell-provider`

### Step 5 — Deploy
- [ ] Push to `main` branch
- [ ] Vercel deploy `Design-system-SSK-3`
- [ ] Verify ทุก page render ถูกต้อง

## Rules (ห้ามทำ)

1. ❌ อย่าแก้ DS 2.0 showcase pages (80 ไฟล์เดิม)
2. ❌ อย่า hardcode color/font — ใช้ token จาก TailwindCSS / DS 3.0 ตามเดิม
3. ❌ อย่า import `@uxuissk/design-system` (DS 2.0) ใน DS 3.0 pages
4. ❌ อย่าใช้ `ssk-*` prefix ใน showcase — ใช้ `ds-*` เท่านั้น

## Showcase Page Pattern

```tsx
// src/app/pages/ds3/button.tsx
import { Section, DemoCard, APITable } from '../_showcase-factory'

export default function DS3ButtonPage() {
  return (
    <>
      <Section title="Button" description="ds-button — Lit Web Component">
        <DemoCard label="Variants">
          <ds-button variant="primary">Primary</ds-button>
          <ds-button variant="outline">Outline</ds-button>
          <ds-button variant="ghost">Ghost</ds-button>
        </DemoCard>
        <DemoCard label="Sizes">
          <ds-button size="sm">Small</ds-button>
          <ds-button size="md">Medium</ds-button>
          <ds-button size="lg">Large</ds-button>
        </DemoCard>
        <DemoCard label="States">
          <ds-button disabled>Disabled</ds-button>
          <ds-button loading>Loading</ds-button>
        </DemoCard>
      </Section>
      <APITable rows={[
        { prop: 'variant', type: 'primary|outline|ghost|danger', def: 'primary', desc: 'รูปแบบ button' },
        { prop: 'size',    type: 'sm|md|lg',                     def: 'md',      desc: 'ขนาด' },
        { prop: 'disabled',type: 'boolean',                       def: 'false',   desc: 'ปิดการใช้งาน' },
        { prop: 'loading', type: 'boolean',                       def: 'false',   desc: 'แสดง spinner' },
      ]} />
    </>
  )
}
```

## MCP 3.0 Plan (หลัง preview สำเร็จ)

```
mcp-contracts/ (อยู่ใน @uxuissk/design-system-core)
  components.json       ← component API จริง
  tokens.json           ← semantic tokens
  quick-start.md        ← DS 3.0 setup guide
  contracts/
    sellsuki.vibecode.rules.json
    sellsuki.brand.structure.json

MCP Server DS3 (instance แยกจาก DS 2.0 MCP)
  ← อ่านจาก npm package โดยตรง
  ← tool names prefix ด้วย ds3_
```

## Progress

- [x] DS 3.0 core library — 36/36 tasks complete
- [x] npm publish `@uxuissk/design-system-core@3.0.1`
- [ ] Design-system-SSK-3 repo setup
- [ ] Getting Started page
- [ ] Component showcase pages (0/10 priority components)
- [ ] Sidebar DS 3.0 items
- [ ] Vercel deploy
