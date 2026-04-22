## What changed
<!-- Describe the change clearly -->

## Why
<!-- Reason / Jira ticket link -->

## Components affected
<!-- List components changed e.g. ssk-button, ds-input -->

## ประเภทงาน
- [ ] feat — component / feature ใหม่
- [ ] fix — bug fix
- [ ] refactor — ปรับโครงสร้าง ไม่เพิ่ม feature
- [ ] style — visual / token เท่านั้น
- [ ] ci — pipeline / tooling
- [ ] docs — documentation

## Checklist
- [ ] `:host` display is set in `static styles`
- [ ] Token-only styles — no hardcoded color/size values
- [ ] Both `ds-*` canonical **and** `ssk-*` alias registered with guard pattern
- [ ] Storybook story created or updated
- [ ] No regressions in existing stories (smoke tested locally)
- [ ] `npm run build` ผ่าน
- [ ] `npm run type-check` ผ่าน
- [ ] ไม่มี `console.log` หลงเหลือ

## Screenshots (ถ้ามี visual change)
