import { spreadProps } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/divider";
import { Divider } from "../../../src/elements/divider";
import { baseArgsTypes } from "../helper";

type DividerArgs = {} & Divider;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Divider",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-divider ${spreadProps(args)}></ssk-divider>`;
  },
  argTypes: {
    orientation: {
      options: ["horizontal", "vertical"],
      control: {
        type: "inline-radio",
      },
    },
    ...baseArgsTypes,
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
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=801-59140",
    },
  },
};
