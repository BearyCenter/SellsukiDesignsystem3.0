import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/app-shell/provider";
import "../../../src/elements/logo";
import { Logo } from "../../../src/elements/logo";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type LogoArgs = AutoLitProperty<Logo>;

const meta = {
  title: "Components/Media & Branding/Logo",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-logo ${spread(args)}></ssk-logo>`;
  },
  argTypes: {
    brand: {
      control: { type: "select" },
      options: ["ccs3", "patona", "oc2plus"],
    },
    srcLogo:     { control: { type: "text" } },
    altLogo:     { control: { type: "text" } },
    srcLogoName: { control: { type: "text" } },
    altLogoName: { control: { type: "text" } },
    boxSize:     { control: { type: "text" } },
    "?fullLogo": { control: { type: "boolean" } },
    ...baseArgsTypes,
  },
} satisfies Meta<LogoArgs>;

export default meta;

type Story = StoryObj<LogoArgs>;

export const Default: Story = {
  args: { boxSize: "48px" },
  parameters: {
    docs: {
      description: {
        story:
          "Default brand mark — no props required. Resolves from `brandContext` (provided by `<ssk-app-shell-provider>` / `<ssk-theme-provider>`). Falls back to `ccs3` (Sellsuki) if no provider in scope.",
      },
    },
  },
};

export const FullWordmark: Story = {
  args: { "?fullLogo": true, boxSize: "48px" },
  parameters: {
    docs: { description: { story: "Full wordmark — brand mark + display name combined." } },
  },
};

export const BrandPatona: Story = {
  args: { brand: "patona", "?fullLogo": true, boxSize: "48px" },
  parameters: {
    docs: { description: { story: "Explicit `brand=\"patona\"` attribute overrides any inherited brandContext." } },
  },
};

export const BrandOc2plus: Story = {
  args: { brand: "oc2plus", "?fullLogo": true, boxSize: "48px" },
};

export const InheritedFromProvider: Story = {
  render: () => html`
    <div style="display: flex; gap: 32px; align-items: center;">
      <ssk-app-shell-provider brand="sellsuki">
        <div style="text-align: center;">
          <div style="font-size: var(--font-size-caption, 18px); color: var(--text-secondary, #6b7280); margin-bottom: 8px;">sellsuki</div>
          <ssk-logo fullLogo boxSize="48px"></ssk-logo>
        </div>
      </ssk-app-shell-provider>
      <ssk-app-shell-provider brand="patona">
        <div style="text-align: center;">
          <div style="font-size: var(--font-size-caption, 18px); color: var(--text-secondary, #6b7280); margin-bottom: 8px;">patona</div>
          <ssk-logo fullLogo boxSize="48px"></ssk-logo>
        </div>
      </ssk-app-shell-provider>
      <ssk-app-shell-provider brand="oc2plus">
        <div style="text-align: center;">
          <div style="font-size: var(--font-size-caption, 18px); color: var(--text-secondary, #6b7280); margin-bottom: 8px;">oc2plus</div>
          <ssk-logo fullLogo boxSize="48px"></ssk-logo>
        </div>
      </ssk-app-shell-provider>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "Logos auto-resolve from the nearest `<ssk-app-shell-provider>` — no prop required. Same `<ssk-logo>` element, three different brand assets, driven entirely by context.",
      },
    },
  },
};

export const ExplicitSourceOverride: Story = {
  args: {
    srcLogo: "https://placehold.co/72x72/0ea5e9/fff?text=X",
    altLogo: "custom override",
    boxSize: "48px",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Explicit `srcLogo` always wins over registry. Use when a single surface needs a custom logo (e.g. partner co-branding).",
      },
    },
  },
};
