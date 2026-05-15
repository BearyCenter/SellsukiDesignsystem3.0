# Phase D — Validator hardening + Visual Regression Test + Changeset

> **Parent plan:** `DS3_VIBECODE_PRODUCTION_PLAN.md` §6 Phase D + §11.2.1 + §11.2.4 /uxui-design-system addenda
> **Parent Epic:** [DES-2035](https://sellsuki.atlassian.net/browse/DES-2035)
> **Status:** Scoping draft — depends on P0-3 (DES-2038) for bundle size baseline
> **Goal:** No vibe-code regression ships unnoticed; package versioning is automated

---

## 1. Why Phase D depends on Phase A

Visual Regression Test (VRT) needs a stable bundle target. If Phase A delivers DES-2038 (bundled JS for CDN), VRT can compare bundled output across builds. If we set up VRT first with the ESM-external build, every Phase A change will produce false-positive regressions because the rendered HTML changes.

**Sequence:**
1. Phase A completes → bundle output stable
2. Phase D week 1: pick VRT tool + baseline screenshots
3. Phase D week 2: changeset automation + first managed release

## 2. VRT — tooling comparison

| Tool | Cost | Storage | Auto-baseline | Pros | Cons |
|------|------|---------|---------------|------|------|
| **Chromatic** | $149/mo for ~5 devs | Hosted | Yes (per-branch) | Already used by DS 1.2 (familiar to team); integrates with Storybook 8 natively | Paid; vendor lock-in |
| **Loki** | Free | Local Git LFS | Manual | Open source; full control | Slow; team needs Storybook addon setup |
| **Lost Pixel** | Free OSS / $29/mo cloud | Cloud or local | Yes | Cheap; modern; Storybook integration | Newer (less battle-tested) |
| **Playwright + percy.io** | $39/mo individual | Hosted | Yes | Cross-browser real | Heavier setup; needs separate test runner |

**Recommendation: Chromatic.** Reasoning:
- Designer team already familiar with it from DS 1.2 review workflow
- Storybook 8 integration is one-line addon
- DS 3.0 has 91 components × 4 brands × ~3 states avg = ~1000 stories to baseline — paid tier handles this
- Pivot cost low if needed (Lost Pixel migration in ~2 days)

## 3. VRT — coverage scope

| Story type | Coverage | Why |
|------------|----------|-----|
| Component stories (`.storybook/stories/<Name>/*.stories.ts`) | All — Default, Loading, Empty, Disabled per `testing.md` | Catches token regressions |
| Pattern stories (`.storybook/stories/Patterns/*`) | All 4 variants × 3 brands | Catches Pattern SoT regressions (Phase C output) |
| AppShell layout stories | Default + Bounded600 | Memory note: bounded-height container is a key invariant |
| Brand switcher stories | All 3 brands per pattern | Catches `injectSemanticTokens` regressions |

Total estimated stories under VRT: ~400 (after dedupe). Chromatic free tier = 5000 snapshots/mo, so even daily PR runs fit.

## 4. VRT — acceptance criteria

- [ ] Chromatic project created + linked to `BearyCenter/sellsuki-components-main` GitHub repo (note: this repo is on GitLab — may need GitLab Actions runner instead)
- [ ] `chromatic` npm script + GitHub/GitLab CI workflow
- [ ] PR comments show visual diffs per story
- [ ] Blocking on `main` branch — PR can't merge with ≥0.5% visual diff unless approved
- [ ] Baseline captured for current `main` state
- [ ] False-positive rate < 5% (e.g. animation timing jitter)
- [ ] Designer team trained on review workflow (overlap with Phase E)

## 5. Changeset automation

DS 1.2 uses `@changesets/cli` for semantic versioning. DS 3.0 today uses manual `npm version` bumps (most recent: `chore: bump version to 3.4.2`). This produces:
- No changelog generated → users don't know what changed in 3.4.2 vs 3.4.1
- Inconsistent version bumps (3.4.2 might be a feature, called a patch)
- No release notes on npm

**Fix — port DS 1.2's setup:**

```bash
npm install -D @changesets/cli
npx changeset init
```

Workflow:
1. Each PR adds a `.changeset/<name>.md` describing the change + bump type (patch/minor/major)
2. `main` branch CI runs `changeset version` to consume changesets → bumps `package.json` + appends `CHANGELOG.md`
3. After human review, `main` CI runs `changeset publish` → npm publish + git tag

### Changeset — acceptance criteria

- [ ] `@changesets/cli` installed + config
- [ ] CI workflow split: PR runs version preview, main runs publish
- [ ] `CHANGELOG.md` regenerated on every release
- [ ] Contributors trained on adding changeset to PRs
- [ ] First managed release: `3.4.3` (Phase A P0-2 patch)

## 6. Validator hardening (final piece)

After P0-5 (DES-2040) ships extended `get_component` schema with enum/defaults, the validator can become strict-by-default rather than warning-only:

- `validate_usage(code, { strict: true })` returns non-zero exit
- CI on ds3-preview repo + Pattern SoT contract tests use strict mode
- ds3-preview repo PR check: every committed pattern HTML must pass `validate_usage`

This depends on:
- DES-2040 (P0-5) — enum data
- DES-2041 (P1-1) — strict checks implemented
- DES-2049 (P1-9) — a11y checks

## 7. Owner + timeline

| Role | Responsibility |
|------|----------------|
| **DS team** | Tool integration + CI setup + changeset workflow |
| **Designer team** | Review VRT diffs + approve when intentional |

**Timeline (2 weeks per Plan §6, starts after Phase A):**

```
Week 1
  ├── Day 1-2: Chromatic project setup + first baseline run
  ├── Day 3-4: CI workflow + PR comment integration
  └── Day 5: False-positive triage + threshold tuning

Week 2
  ├── Day 1: @changesets/cli setup
  ├── Day 2-3: First managed release (3.4.3 = DES-2037 fix)
  ├── Day 4: Validator strict mode enabled in ds3-preview CI
  └── Day 5: Documentation + Designer team handoff (link to Phase E workshop)
```

## 8. Tickets to file

When ready (after Phase A done):

- DES-XXXX — [P-D-1] Set up Chromatic for sellsuki-components-main repo
- DES-XXXX — [P-D-2] Baseline + enforce VRT in CI
- DES-XXXX — [P-D-3] Set up @changesets/cli + CI publish workflow
- DES-XXXX — [P-D-4] Enable validator strict mode in ds3-preview CI

---

## Reference

- /uxui-design-system review: `DS3_VIBECODE_PRODUCTION_PLAN.md` §11.2.1 + §11.2.4
- DS 1.2 changesets setup for reference: `~/.claude/skills/uxui-design-system/SKILL.md`
- VRT depends on: DES-2038 (bundled JS) + DES-2040 (extended schema for validator)
