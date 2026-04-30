import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/app-shell/provider";

const meta = {
  title: "Design Tokens/Radius",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: "DS 3.0 Border-radius tokens — shared across all brands." },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const radiusTokens = [
  { token: "--radius-none", value: "0px" },
  { token: "--radius-xxs",  value: "2px" },
  { token: "--radius-xs",   value: "4px" },
  { token: "--radius-sm",   value: "6px" },
  { token: "--radius-md",   value: "8px" },
  { token: "--radius-lg",   value: "12px" },
  { token: "--radius-xl",   value: "16px" },
  { token: "--radius-2xl",  value: "20px" },
  { token: "--radius-3xl",  value: "24px" },
  { token: "--radius-4xl",  value: "32px" },
  { token: "--radius-full", value: "9999px" },
];

export const Default: Story = {
  render: () => html`
    <ssk-app-shell-provider brand="ccs3">
      <div style="padding: 32px; display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-end;">
        ${radiusTokens.map((r) => html`
          <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
            <div style="
              width: 80px;
              height: 80px;
              background: var(--bg-brand-secondary, #e0f2fe);
              border: 2px solid var(--fg-brand-primary, #32a9ff);
              border-radius: var(${r.token});
            "></div>
            <code style="font-size: 12px; color: #1b8bf5; font-family: monospace; text-align: center;">${r.token}</code>
            <span style="font-size: 12px; color: #6b7280; font-family: sans-serif;">${r.value}</span>
          </div>
        `)}
      </div>
    </ssk-app-shell-provider>
  `,
};
