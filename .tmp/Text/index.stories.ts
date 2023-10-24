import { spreadProps } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { baseArgsTypes } from "../../.storybook/stories/helper";
import "../../src/components/text";
import { Text } from "../../src/components/text";

type TextArgs = {
  content: string;
} & Text;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Text",
  tags: ["autodocs"],
  render: ({ content, ...args }) => {
    return html`<ssk-text ${spreadProps(args)}>${content}</ssk-text>`;
  },
  argTypes: {
    content: {
      control: {
        type: "text",
      },
    },
    italic: {
      control: {
        type: "boolean",
      },
    },
    underline: {
      control: {
        type: "boolean",
      },
    },
    strike: {
      control: {
        type: "boolean",
      },
    },
    align: {
      options: ["left", "center", "right", "justify"],
      control: {
        type: "select",
      },
    },
    transform: {
      options: ["uppercase", "lowercase", "capitalize"],
      control: {
        type: "inline-radio",
      },
    },
    ...baseArgsTypes,
  },
} satisfies Meta<TextArgs>;

export default meta;

type Story = StoryObj<TextArgs>;

export const Default: Story = {
  args: {
    content: "Don't forget to be awesome!",
    size: "md",
    color: "black.900",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=801-59140",
    },
  },
};
