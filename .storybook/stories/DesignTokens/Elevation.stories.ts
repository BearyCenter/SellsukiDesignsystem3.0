import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/app-shell/provider";

const meta = {
  title: "Design Tokens/Elevation",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: "DS 3.0 Elevation (box-shadow) tokens — shared across all brands." },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const elevationTokens = [
  { token: "--elevation-sm", label: "sm",  usage: "Subtle card" },
  { token: "--elevation-md", label: "md",  usage: "Default card" },
  { token: "--elevation-lg", label: "lg",  usage: "Floating panel / dropdown" },
  { token: "--elevation-xl", label: "xl",  usage: "Modal / overlay" },
];

export const Default: Story = {
  render: () => html`
    <ssk-app-shell-provider brand="ccs3">
      <div style="padding: 48px; display: flex; flex-wrap: wrap; gap: 40px; align-items: flex-start; background: var(--bg-secondary, #f3f4f6);">
        ${elevationTokens.map((e) => html`
          <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
            <div style="
              width: 140px;
              height: 100px;
              background: var(--bg-primary, #ffffff);
              border-radius: var(--radius-md, 8px);
              box-shadow: var(${e.token});
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <span style="
                font-size: var(--font-size-h4, 24px);
                font-family: var(--font-p);
                font-weight: var(--font-weight-medium, 500);
                color: var(--text-primary, #1f2937);
              ">${e.label}</span>
            </div>
            <code style="font-size: 12px; color: #1b8bf5; font-family: monospace; text-align: center;">${e.token}</code>
            <span style="font-size: 12px; color: #6b7280; font-family: sans-serif; text-align: center;">${e.usage}</span>
          </div>
        `)}
      </div>
    </ssk-app-shell-provider>
  `,
};
