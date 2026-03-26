import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/divider";
import { Divider } from "../../../src/elements/divider";
import { baseArgsTypes } from "../helper";

type DividerArgs = {} & Divider;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Components/Layout & Structure/Divider",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-divider ${spread(args)}></ssk-divider>`;
  },
  argTypes: {
    label: {
      if: {
        arg: "orientation",
        eq: "horizontal",
      },
      description:
        "Label to show in divider, only 'horizontal' orientation is supported",
      table: {
        category: "Props",
        type: {
          summary: "string",
        },
      },
      control: {
        type: "text",
      },
    },
    orientation: {
      description: "The orientation for a divider",
      options: ["horizontal", "vertical"],
      table: {
        category: "Props",
        defaultValue: {
          summary: "horizontal",
        },
        type: {
          summary: "string",
        },
      },
      control: {
        type: "inline-radio",
      },
    },
    size: baseArgsTypes.size,
    themeColor: baseArgsTypes.themeColor,
    color: baseArgsTypes.color,
    gap: baseArgsTypes.gap,
    padding: baseArgsTypes.padding,
    margin: baseArgsTypes.margin,
    "?hidden": baseArgsTypes["?hidden"],
  },
} satisfies Meta<DividerArgs>;

export default meta;

type Story = StoryObj<DividerArgs>;

export const Default: Story = {
  args: {
    orientation: "horizontal",
    size: "md",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1084-66910&mode=design&t=aZnYIj6wbvwQJakA-0",
    },
  },
};

export const DividerWithText: Story = {
  args: {
    orientation: "horizontal",
    size: "md",
    label: "label",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1084-66910&mode=design&t=aZnYIj6wbvwQJakA-0",
    },
  },
};
