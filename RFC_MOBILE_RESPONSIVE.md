# RFC: Mobile Responsive Support for DS3 Components

**Date:** 2026-05-19
**Status:** Draft for discussion
**Source:** Real-world issues hit while building a mobile-responsive POS prototype in `sellercenter-frontend` (sales/cart flow)

---

## Summary

DS3 components ทำงานได้ดีบน desktop แต่เมื่อนำมาใช้ใน flow ที่ต้อง responsive บน mobile (≤640px) มี friction ซ้ำๆ ในหลาย component — ทำให้ทีม consumer ต้องเขียน workaround เยอะมาก (custom replacement, shadow DOM injection, `!important` overrides) งานที่ควรใช้เวลา 1 ชั่วโมงกลายเป็นครึ่งวันต่อ component

RFC นี้รวบรวม **14 issue ที่เจอจริง** พร้อมเสนอแนวทางแก้เพื่อให้ DS3 รองรับ mobile โดย consumer ไม่ต้อง bypass component

---

## Issue 1 — `ssk-modal` no responsive width API

**Problem:**
- Internal CSS: `width: var(--width); max-width: calc(100dvw - var(--padding-container, 24px))`
- ไม่มี mobile mode → consumer ต้อง set `--width: 100dvw; --padding-container: 0` เพื่อให้เต็มจอ
- Default `25vw` (จาก wrapper) บน mobile 360px = 90px → modal narrow มาก ข้อความ wrap ทั้งหมด

**Proposed API:**
```html
<ssk-modal mobile-mode="fullscreen">     <!-- เต็มจอบน mobile -->
<ssk-modal mobile-mode="sheet">          <!-- bottom sheet slide-up -->
<ssk-modal mobile-mode="fit">            <!-- default 25vw with safe min/max -->
<ssk-modal mobile-breakpoint="640">      <!-- override threshold -->
```

Internal media query handles `width / height / border-radius / position` switch.

---

## Issue 2 — `ssk-drawer` width prop ตายตัว

**Problem:**
- `width="550px"` ต้อง hard-code → บน mobile กว้างกว่าจอ ล้นซ้าย
- ต้อง bind reactively ใน Svelte: `width={isMobile ? '100vw' : '550px'}`

**Proposed API:**
```html
<ssk-drawer width="550px" mobile-width="100vw">
<!-- OR: shorthand -->
<ssk-drawer width="550px" responsive>  <!-- auto: 100vw บน mobile -->
```

---

## Issue 3 — `ssk-dropdown` ไม่ portal panel ออกจาก parent stacking context

**Problem:** Panel ถูก clip โดย ancestor ที่มี `transform`, `overflow:hidden`, หรือ `filter`. เกิดบ่อยมากเพราะ:
- Hide-on-scroll patterns ใช้ `transform: translateY()`
- ScrollArea container มี `overflow: hidden`

**ตอนนี้ consumer ต้องทำ:**
- Replace ทั้งตัวด้วย custom dropdown บน mobile
- Render panel เป็น sibling ของ `<main>` (ไม่ใช่ inside trigger wrapper)
- `position: fixed; z-index: 1000`

**Proposed:** เพิ่ม `portal` prop เพื่อ teleport panel ไปยัง `document.body`:
```html
<ssk-dropdown portal>           <!-- portal panel to body -->
<ssk-dropdown portal="#anchor"> <!-- portal to specific element -->
```

Implementation: ใน `connectedCallback`, ย้าย dropdown panel slot ออกไป append ที่ body แล้ว position ด้วย `getBoundingClientRect()` ของ trigger.

---

## Issue 4 — `ssk-sidebar` ไม่มี mobile drawer mode

**Problem:**
- บน desktop = vertical sidebar (good)
- บน mobile = ต้องการ slide-in overlay (hamburger menu pattern)
- ตอนนี้ DS3 ทำได้แค่ `expanded={false}` → collapsed icon-only, ยังกินพื้นที่จอ

**Proposed:**
```html
<ssk-sidebar mode="overlay" open={menuOpen}>
<!-- หรือ -->
<ssk-sidebar mobile-mode="drawer" mobile-breakpoint="640">
```

`mode="overlay"`:
- `position: fixed; left: 0; top: 0; bottom: 0`
- Slide-in animation
- Backdrop layer
- Dispatch `close` event เมื่อ tap backdrop / route change

---

## Issue 5 — `ssk-top-navbar` ไม่มี responsive / hide-on-scroll

**Problem:** ไม่มี mobile behavior เช่น hide-on-scroll, compact mode, sticky transform animation

**Proposed:**
```html
<ssk-top-navbar hide-on-scroll mobile-compact>
```

Events:
- `hide` / `show` dispatch ตอน transform เปลี่ยน → consumer สามารถ sync UI อื่นได้

---

## Issue 6 — `ssk-tabs` tab strip + content scroll พร้อมกัน

**Problem:**
- ภายใน component, tab labels และ content slot อยู่ใน flow เดียวกัน
- ถ้า wrap ใน `overflow-x: auto` เพื่อให้ tab strip scroll, **content ถูก scroll horizontal ตามไปด้วย** ทำลาย product grid
- `widthtab="true"` แบ่งเท่ากัน แต่ tab text ยาวจะ truncate ไม่อ่าน
- `widthtab="false"` ไม่ scrollable เลย — overflow viewport

**Proposed:**
```html
<ssk-tabs strip-scroll="auto" widthtab="false">
<!-- หรือ -->
<ssk-tabs variant="chip-strip" mobile-chips>
```

Internal: tab labels container = `overflow-x: auto`, content panel = fixed width separate scroll context.

---

## Issue 7 — `ssk-toast-provider` hard-coded `60dvw`

**Problem:**
- Container CSS: `#toasts-container { width: 60dvw; top: 16px; left: 50%; transform: translateX(-50%) }`
- ไม่มี CSS variable / part
- บน mobile 360px = 216px → toast แคบ ข้อความ wrap
- Workaround ปัจจุบัน: JS hack inject `<style>` เข้า `shadowRoot` ตอน mount

**Proposed:**
```html
<ssk-toast-provider position="top-center" mobile-full-width>
```

CSS variables:
```css
--toast-width
--toast-mobile-width        /* default: calc(100vw - 24px) */
--toast-position-top
--toast-max-width
```

Expose CSS parts:
```css
ssk-toast-provider::part(container) { ... }
ssk-toast-provider::part(toast)     { ... }
```

---

## Issue 8 — `ssk-image` no fallback / hide on empty src

**Problem:**
- Renders broken image icon (browser default) เมื่อ `src=""` หรือ undefined
- Consumer ต้อง wrap ใน `{#if src}` ทุกที่

**Proposed:**
```html
<ssk-image src={maybeNull} fallback="hide">       <!-- hide if no src -->
<ssk-image src={maybeNull} fallback="placeholder"> <!-- show default placeholder -->
<ssk-image src={maybeNull} fallback-src="/default.png">
```

---

## Issue 9 — `ssk-logo` no responsive auto-collapse

**Problem:**
- `fullLogo` boolean — ตัดสินใจครั้งเดียวตอน render
- บน mobile อยากใช้ icon-only แต่ desktop อยากใช้ full → ต้องเขียน `{#if isMobile}` 2 ก้อน + listen resize เอง

**Proposed:**
```html
<ssk-logo full-logo="auto" mobile-breakpoint="640">
<ssk-logo full-logo="lg">   <!-- show full only at lg+ -->
```

---

## Issue 10 — `ssk-i18n-translate` no missing-key fallback

**Problem:**
- ถ้า key ไม่อยู่ในฐานข้อมูล → แสดง raw key เป็น UI ผู้ใช้เห็น `patona-sellercenter-sidebar-radio-addnewstore` แทนข้อความ
- ไม่มี global handler / dev warning

**Proposed:**
```html
<ssk-i18n-translate key="..." fallback="ระบบกำลังโหลด..." dev-warn />
```

หรือ provider-level:
```html
<ssk-i18n-provider missing-key-fallback="empty" warn-in-dev>
```

ค่า: `key` (default — current behavior), `empty`, `placeholder`, `slot`

---

## Issue 11 — Web component scoped CSS bleeds into shadow DOM (or rather: can't reach shadow DOM)

**Problem:** Light DOM CSS ไม่ทะลุ shadow → consumer override internal styling ไม่ได้ (padding, font-size ของ chip ภายใน tabs, etc.)

**Proposed:**
- Expose CSS parts ทุก component หลัก:
  - `ssk-tabs::part(strip)`, `::part(tab)`, `::part(panel)`
  - `ssk-button::part(button)`, `::part(prefix)`, `::part(suffix)`
  - `ssk-input::part(input)`, `::part(addon)`
  - `ssk-modal::part(header)`, `::part(body)`, `::part(footer)`, `::part(dialog)`
- Document parts ใน Storybook stories

---

## Issue 12 — `--width` CSS var ทำงาน แต่ host element ไม่ honor `width:` direct

**Problem:**
- ตั้ง `--width: 100vw` มี effect (max-width clamps it)
- ถ้าตั้ง `width: 100vw !important` บน host element → ignored เพราะ internal dialog ไม่ inherit
- Inconsistent — บางครั้ง CSS var ทำงาน บางครั้งต้อง direct property

**Proposed:** Document **exactly which CSS vars + parts** each component supports. Add Storybook docs section "Style customization" สำหรับทุก component หลัก:
```
ssk-modal supports:
  --width          (dialog width)
  --padding-body   (body padding)
  --padding-container (viewport gutter)
  ::part(dialog)   (the dialog box)
  ::part(backdrop) (the dim layer)
```

---

## Issue 13 — Svelte preprocessor `$' as` confusion in user code

**Problem (not DS3 fault but relevant):**
- Svelte 4 preprocessor scans `$identifier` for store auto-subscription
- Pattern `$'` ใน string literal ทำ parser พัง: `'^[0-9]+$'` → unterminated string
- Consumer ต้อง work around ด้วย `String.fromCharCode(36)` หรือ regex literal

**Proposed (DS3-side workaround docs):** เพิ่มในๅ DS3 examples / Storybook ที่ใช้ regex string ให้แนะนำ pattern `/regex/.source` แทน raw `'...$'` literal เพื่อกัน consumer สะดุดเรื่องเดียวกัน

---

## Issue 14 — ไม่มี `<ssk-app-shell>` / `<ssk-bottom-nav>` ระดับ layout

**Problem:** App layout pattern (top-navbar + sidebar + content + bottom-nav-mobile + hide-on-scroll + drawer overlay) ต้อง compose เองทุก consumer — งานเหมือนกันซ้ำๆ ทั่ว Patona, CCS3, Sellercenter

**Proposed:** เพิ่ม composite component:
```html
<ssk-app-shell mobile-breakpoint="640">
  <ssk-top-navbar slot="top">...</ssk-top-navbar>
  <ssk-sidebar slot="side">...</ssk-sidebar>
  <main slot="content">...</main>
  <ssk-bottom-nav slot="bottom-mobile">  <!-- mobile only -->
    <ssk-bottom-nav-item icon="..." label="..." active>
    <ssk-bottom-nav-item icon="..." label="..." primary>  <!-- center primary -->
    ...
  </ssk-bottom-nav>
</ssk-app-shell>
```

Handles automatically:
- CSS Grid responsive layout
- Sidebar overlay drawer on mobile
- Bottom nav safe-area-inset-bottom
- Hide-on-scroll for top
- Stacking context coordination

---

## Priority ranking (by frequency of friction in real work)

| Priority | Issue | Effort | Impact |
|----------|-------|--------|--------|
| 🔴 P0 | #1 `ssk-modal` mobile fullscreen | S | 🔥 หลายหน้า |
| 🔴 P0 | #2 `ssk-drawer` responsive width | XS | 🔥 ทุก drawer |
| 🔴 P0 | #3 `ssk-dropdown` portal | M | 🔥 dropdown ทุกตัวบน mobile |
| 🔴 P0 | #14 `ssk-app-shell` + `ssk-bottom-nav` | L | 🔥 ทุก app |
| 🟡 P1 | #4 `ssk-sidebar` overlay mode | M | 🔥 ทุก app |
| 🟡 P1 | #6 `ssk-tabs` strip scroll separation | M | mobile-heavy flows |
| 🟡 P1 | #7 `ssk-toast-provider` responsive | S | ทุก toast |
| 🟢 P2 | #5 `ssk-top-navbar` hide-on-scroll | S | mobile polish |
| 🟢 P2 | #8 `ssk-image` fallback | XS | data ที่ optional มี image |
| 🟢 P2 | #9 `ssk-logo` responsive | XS | quick win |
| 🟢 P2 | #10 `ssk-i18n-translate` fallback | S | dev experience |
| 🔵 P3 | #11 CSS parts exposure | L | unblocks fine-tuning |
| 🔵 P3 | #12 Document CSS vars + parts | M | discoverability |
| 🔵 P3 | #13 Doc note re: Svelte `$'` quirk | XS | dev-experience footnote |

---

## Not proposing breaking changes

ทั้งหมดเป็น **additive** — props/attrs ใหม่ มี default = behavior เดิม. Migration ไม่จำเป็น

---

## Real-world context

ทั้ง 14 ข้อนี้เจอจริงในการทำ POS sales prototype mobile responsive ที่ `sellercenter-frontend` (branch `feat/pat-2292-2293-2294-prototype`) — มี workaround เก็บไว้ในนั้นทุกข้อสำหรับ reference ถ้าทีม DS3 อยาก audit หรือดู use case จริง

ไม่ใช่ทุก issue ต้องแก้ทันที — แต่ถ้า fix P0+P1 ได้ก่อน จะตัด custom code ใน consumer apps ไป ~60% สำหรับ mobile work
