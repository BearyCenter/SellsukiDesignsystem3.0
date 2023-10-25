import { spreadProps } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/icon";
import { Icon } from "../../../src/elements/icon";
import { baseArgsTypes } from "../helper";

type IconArgs = {} & Icon;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Icon",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-icon ${spreadProps(args)}></ssk-icon>`;
  },
  argTypes: {
    name: {
      options: Object.keys(Icon.svgs),
      control: {
        type: "select",
      },
    },
    ...baseArgsTypes,
  },
} satisfies Meta<IconArgs>;

export default meta;

type Story = StoryObj<IconArgs>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    name: "outline-academic-cap",
    size: "lg",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=572-75068",
    },
  },
};
