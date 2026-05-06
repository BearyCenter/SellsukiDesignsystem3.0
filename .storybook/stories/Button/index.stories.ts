import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/button";
import { Button } from "../../../src/elements/button";
import "../../../src/elements/icon";
import { AutoLitProperty, baseArgsTypes, genericEvents } from "../helper";

type ButtonWithLabel = AutoLitProperty<Button> & { label: string };

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Components/Form & Input/Button",
  tags: ["autodocs"],
  render: ({ label, ...args }) => {
    return html`<ssk-button ${spread(args)}
      ><ssk-icon
        slot="prefix"
        name="solid-users"
        size="${args.size}"
      ></ssk-icon>
      ${label}</ssk-button
    >`;
  },
  argTypes: {
    label: {
      description: "The content of the button",
      control: "text",
      table: {
        category: "Props",
      },
    },

    variant: {
      options: ["solid", "outline", "ghost", "solid-light"],
      description: "The type of button",
      control: {
        type: "inline-radio",
      },
      table: {
        category: "Props",
        defaultValue: {
          summary: "solid",
        },
        type: {
          summary: "string",
        },
      },
    },
    tone: {
      options: ["brand", "danger", "success", "warning", "info"],
      description:
        "Semantic tone — communicates intent. " +
        "`brand` (default), `danger` (replaces legacy `error`), " +
        "`success` / `warning` / `info` (pending UXUI spec — see DES-2013).",
      control: { type: "inline-radio" },
      table: {
        category: "Props",
        defaultValue: { summary: "brand" },
        type: { summary: "ButtonTone" },
      },
    },
    "?disabled": {
      description: "When true gives the button a disabled apparence",
      control: {
        type: "boolean",
      },
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    "@click": genericEvents["@click"],
    ...baseArgsTypes,
  },
} satisfies Meta<ButtonWithLabel>;

export default meta;

type Story = StoryObj<ButtonWithLabel>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const SolidButton: Story = {
  args: {
    variant: "solid",
    size: "md",
    label: "solid button",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1103%3A78477",
    },
  },
};

export const OutlineButton: Story = {
  args: {
    variant: "outline",
    label: "Outline Button",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1103%3A78477",
    },
  },
};

export const GhostButton: Story = {
  args: {
    variant: "ghost",
    label: "Ghost Button",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1103%3A78477",
    },
  },
};

export const SolidLightButton: Story = {
  args: {
    variant: "solid-light",
    size: "md",
    label: "solid light button",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1103%3A78477",
    },
  },
};

// ── Tone variants (DS 3.0 — semantic intent over color) ───────────────────────

export const DangerSolid: Story = {
  args: { variant: "solid", tone: "danger", label: "Delete account" },
  parameters: {
    docs: {
      description: {
        story:
          "Use `tone=\"danger\"` for destructive actions. " +
          "Replaces legacy `themeColor=\"error\"`.",
      },
    },
  },
};

export const DangerOutline: Story = {
  args: { variant: "outline", tone: "danger", label: "Cancel order" },
};

export const DangerGhost: Story = {
  args: { variant: "ghost", tone: "danger", label: "Remove" },
};

// ── Matrix story — verify all variants × tones across brands ──────────────────

const TONES = ["brand", "danger", "success", "warning", "info"] as const;
const VARIANTS = ["solid", "outline", "ghost", "solid-light"] as const;

export const ToneMatrix: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Full tone × variant matrix — verify visual consistency across DS 3.0. " +
          "Switch the brand at the AppShellProvider level to see all 3 brands " +
          "(ccs3 / patona / oc2plus) update simultaneously.",
      },
    },
  },
  render: () => html`
    <style>
      .matrix {
        display: grid;
        grid-template-columns: 80px repeat(${VARIANTS.length}, 1fr);
        gap: 12px;
        align-items: center;
      }
      .matrix-header,
      .matrix-label {
        font-family: var(--font-label);
        font-size: var(--font-size-label);
        color: var(--text-primary);
      }
      .matrix-header {
        font-weight: var(--weight-h4);
        text-align: center;
      }
    </style>
    <div class="matrix">
      <div></div>
      ${VARIANTS.map(
        (v) => html`<div class="matrix-header">${v}</div>`,
      )}
      ${TONES.flatMap(
        (t) => html`
          <div class="matrix-label">${t}</div>
          ${VARIANTS.map(
            (v) => html`
              <div>
                <ssk-button variant=${v} tone=${t} size="md">${t}</ssk-button>
              </div>
            `,
          )}
        `,
      )}
    </div>
  `,
};

// ── Deprecation showcase — for migration documentation ────────────────────────

export const DeprecatedThemeColor: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "**⚠️ Deprecated** — `themeColor` will be removed in DS 3.4.0. " +
          "Use `tone` instead. " +
          "Migration: `themeColor=\"error\"` → `tone=\"danger\"`. " +
          "Open the browser console to see the deprecation warning.",
      },
    },
  },
  args: {
    // @ts-expect-error — deprecated prop, kept for migration documentation
    themeColor: "error",
    variant: "solid",
    label: "Legacy themeColor=error",
  },
};
