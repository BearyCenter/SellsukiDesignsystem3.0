# DS 3.0 Testing

This is a component library. Primary quality gate is:

1. **Build** — `npm run build` zero errors, zero warnings
2. **Type-check** — `npm run type-check` zero errors
3. **Storybook** — `npm run build-storybook` — every story renders
4. **Visual** — manual comparison vs DS 2.0 reference (https://sellsukidesignsystemv12.vercel.app)

## Story requirements (CSF3)

Every component must have stories for:
- `Default` — happy path with realistic data
- `Loading` — if the component has a loading state
- `Empty` — if the component handles empty/no-data
- `Disabled` — if the component has a disabled prop

Story file location: `.storybook/stories/<ComponentName>/index.stories.ts`

### Story template

```typescript
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/<name>";

const meta = {
  title: "Components/<Category>/<Name>",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`<ds-foo .prop=${"value"}></ds-foo>`,
};
```

## Build checks

```bash
npm run build         # must pass before every commit
npm run type-check    # zero TypeScript errors
npm run lint          # zero ESLint errors
npm run build-storybook  # all stories must render
```
