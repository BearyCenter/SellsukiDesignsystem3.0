import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/app-shell/provider";

const meta = {
  title: "Design Tokens/Typography",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "DS 3.0 Typography tokens — font-size, font-family, font-weight. Minimum = 18px (`--font-size-caption`).",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const fontSizeTokens = [
  { token: "--font-size-h1",      px: "44px", weight: "--weight-h1",      role: "Page title" },
  { token: "--font-size-h2",      px: "36px", weight: "--weight-h2",      role: "Section title" },
  { token: "--font-size-h3",      px: "28px", weight: "--weight-h3",      role: "Heading" },
  { token: "--font-size-h4",      px: "24px", weight: "--weight-h4",      role: "Sub-heading" },
  { token: "--font-size-p",       px: "20px", weight: "--weight-p",       role: "Body text" },
  { token: "--font-size-label",   px: "20px", weight: "--weight-label",   role: "Label" },
  { token: "--font-size-caption", px: "18px", weight: "--weight-caption", role: "Caption (minimum)" },
  { token: "--font-size-button",  px: "18px", weight: "--weight-button",  role: "Button" },
];

const fontWeightTokens = [
  { token: "--font-weight-normal",   value: "400", label: "Normal" },
  { token: "--font-weight-medium",   value: "500", label: "Medium" },
  { token: "--font-weight-semibold", value: "600", label: "Semibold" },
  { token: "--font-weight-bold",     value: "700", label: "Bold" },
];

export const FontSize: Story = {
  render: () => html`
    <ssk-app-shell-provider brand="ccs3">
      <div style="padding: 32px; display: flex; flex-direction: column; gap: 0;">
        <div style="
          display: grid;
          grid-template-columns: 220px 80px 120px 1fr;
          gap: 0;
          padding: 8px 16px;
          background: #f9fafb;
          border-radius: 8px 8px 0 0;
          border: 1px solid #e5e7eb;
          font-size: 13px;
          font-weight: 600;
          color: #6b7280;
        ">
          <span>Token</span>
          <span>Size</span>
          <span>Weight</span>
          <span>Preview</span>
        </div>
        ${fontSizeTokens.map((t, i) => html`
          <div style="
            display: grid;
            grid-template-columns: 220px 80px 120px 1fr;
            gap: 0;
            align-items: center;
            padding: 16px;
            border: 1px solid #e5e7eb;
            border-top: none;
            ${i === fontSizeTokens.length - 1 ? "border-radius: 0 0 8px 8px;" : ""}
            ${t.token === "--font-size-caption" ? "background: #fffbeb; border-left: 3px solid #f59e0b;" : ""}
          ">
            <code style="font-size: 13px; color: #1b8bf5; font-family: monospace;">${t.token}</code>
            <span style="font-size: 13px; color: #6b7280;">${t.px}</span>
            <span style="font-size: 13px; color: #6b7280;">${t.weight}</span>
            <span style="
              font-size: var(${t.token});
              font-family: var(--font-p);
              font-weight: var(${t.weight});
              color: var(--text-primary, #1f2937);
              line-height: 1.2;
            ">${t.role}</span>
          </div>
        `)}
        <p style="margin-top: 12px; font-size: 13px; color: #f59e0b; font-family: monospace;">
          ⚠️ --font-size-caption (18px) = absolute minimum — ห้ามต่ำกว่านี้
        </p>
      </div>
    </ssk-app-shell-provider>
  `,
};

export const FontWeight: Story = {
  render: () => html`
    <ssk-app-shell-provider brand="ccs3">
      <div style="padding: 32px; display: flex; flex-direction: column; gap: 16px;">
        ${fontWeightTokens.map((w) => html`
          <div style="display: flex; align-items: center; gap: 24px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <code style="font-size: 13px; color: #1b8bf5; font-family: monospace; width: 240px;">${w.token}</code>
            <span style="font-size: 13px; color: #6b7280; width: 40px;">${w.value}</span>
            <span style="
              font-size: var(--font-size-p, 20px);
              font-family: var(--font-p);
              font-weight: var(${w.token});
              color: var(--text-primary, #1f2937);
            ">The quick brown fox — ${w.label}</span>
          </div>
        `)}
      </div>
    </ssk-app-shell-provider>
  `,
};

export const FontFamily: Story = {
  render: () => html`
    <ssk-app-shell-provider brand="ccs3">
      <div style="padding: 32px; display: flex; flex-direction: column; gap: 16px;">
        ${["--font-h1","--font-h2","--font-h3","--font-h4","--font-p","--font-label","--font-caption","--font-button"].map((t) => html`
          <div style="display: flex; align-items: center; gap: 24px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <code style="font-size: 13px; color: #1b8bf5; font-family: monospace; width: 180px;">${t}</code>
            <span style="
              font-size: var(--font-size-p, 20px);
              font-family: var(${t});
              color: var(--text-primary, #1f2937);
            ">DB HeaventRounded — ก ข ค ง จ ฉ ช</span>
          </div>
        `)}
      </div>
    </ssk-app-shell-provider>
  `,
};
