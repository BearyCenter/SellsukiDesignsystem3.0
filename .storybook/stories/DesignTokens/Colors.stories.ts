import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/app-shell/provider";

const meta = {
  title: "Design Tokens/Colors",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "DS 3.0 Semantic color tokens — brand-aware, changes per patona/ccs3/oc2plus.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const colorGroups = [
  {
    group: "Text",
    tokens: [
      { token: "--text-primary",        label: "Primary" },
      { token: "--text-secondary",      label: "Secondary" },
      { token: "--text-disabled",       label: "Disabled" },
      { token: "--text-brand-primary",  label: "Brand" },
      { token: "--text-danger-primary", label: "Danger" },
      { token: "--text-success-primary",label: "Success" },
      { token: "--text-warning-primary",label: "Warning" },
      { token: "--text-info",           label: "Info" },
    ],
  },
  {
    group: "Background",
    tokens: [
      { token: "--bg-primary",          label: "Primary" },
      { token: "--bg-primary-hover",    label: "Primary Hover" },
      { token: "--bg-secondary",        label: "Secondary" },
      { token: "--bg-disabled",         label: "Disabled" },
      { token: "--bg-brand-primary",    label: "Brand Light" },
      { token: "--bg-brand-secondary",  label: "Brand" },
      { token: "--bg-brand-solid",      label: "Brand Solid" },
      { token: "--bg-danger-primary",   label: "Danger Light" },
      { token: "--bg-danger-solid",     label: "Danger Solid" },
      { token: "--bg-success-primary",  label: "Success Light" },
      { token: "--bg-success-solid",    label: "Success Solid" },
      { token: "--bg-warning-primary",  label: "Warning Light" },
      { token: "--bg-info-primary",     label: "Info Light" },
    ],
  },
  {
    group: "Stroke (Border)",
    tokens: [
      { token: "--stroke-primary",       label: "Primary" },
      { token: "--stroke-secondary",     label: "Secondary" },
      { token: "--stroke-disabled",      label: "Disabled" },
      { token: "--stroke-brand",         label: "Brand" },
      { token: "--stroke-brand-solid",   label: "Brand Solid" },
      { token: "--stroke-danger",        label: "Danger" },
      { token: "--stroke-danger-solid",  label: "Danger Solid" },
      { token: "--stroke-success",       label: "Success" },
      { token: "--stroke-success-solid", label: "Success Solid" },
      { token: "--stroke-warning",       label: "Warning" },
      { token: "--stroke-info",          label: "Info" },
    ],
  },
  {
    group: "Foreground (Icon/Accent)",
    tokens: [
      { token: "--fg-primary",          label: "Primary" },
      { token: "--fg-secondary",        label: "Secondary" },
      { token: "--fg-brand-primary",    label: "Brand" },
      { token: "--fg-danger-primary",   label: "Danger" },
      { token: "--fg-success-primary",  label: "Success" },
      { token: "--fg-warning-primary",  label: "Warning" },
    ],
  },
];

function colorGrid(brand: string) {
  return html`
    <ssk-app-shell-provider brand="${brand}">
      <div style="padding: 24px; display: flex; flex-direction: column; gap: 32px;">
        ${colorGroups.map((g) => html`
          <div>
            <h3 style="
              font-size: var(--font-size-h4, 24px);
              font-family: var(--font-p);
              font-weight: var(--font-weight-medium, 500);
              color: var(--text-primary, #1f2937);
              margin: 0 0 12px;
            ">${g.group}</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${g.tokens.map((t) => html`
                <div style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 6px;
                  width: 100px;
                ">
                  <div style="
                    width: 64px;
                    height: 64px;
                    border-radius: 8px;
                    background: var(${t.token});
                    border: 1px solid rgba(0,0,0,0.08);
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                  "></div>
                  <span style="font-size: 11px; color: #6b7280; text-align: center; font-family: monospace; line-height: 1.3;">${t.token}</span>
                  <span style="font-size: 11px; color: #374151; text-align: center; font-family: sans-serif;">${t.label}</span>
                </div>
              `)}
            </div>
          </div>
        `)}
      </div>
    </ssk-app-shell-provider>
  `;
}

export const Patona: Story = {
  render: () => colorGrid("patona"),
};

export const CCS3: Story = {
  name: "CCS3 (Sellsuki)",
  render: () => colorGrid("ccs3"),
};

export const OC2Plus: Story = {
  name: "OC2Plus",
  render: () => colorGrid("oc2plus"),
};
