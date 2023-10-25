import { spreadProps } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/text";
import { Text } from "../../../src/elements/text";
import { baseArgsTypes } from "../helper";

type TextArgs = {
  content: string;
} & Omit<Text, "size">;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Text",
  tags: [],
  render: ({ content, ...args }) => {
    return html`<div>
      <ssk-text ${spreadProps(args)} size="4xl">${content}</ssk-text>
      <ssk-text ${spreadProps(args)} size="3xl">${content}</ssk-text>
      <ssk-text ${spreadProps(args)} size="2xl">${content}</ssk-text>
      <ssk-text ${spreadProps(args)} size="xl">${content}</ssk-text>
      <ssk-text ${spreadProps(args)} size="lg">${content}</ssk-text>
      <ssk-text ${spreadProps(args)} size="md">${content}</ssk-text>
      <ssk-text ${spreadProps(args)} size="sm">${content}</ssk-text>
      <ssk-text ${spreadProps(args)} size="xs">${content}</ssk-text>
    </div>`;
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

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const ShowCase: Story = {
  args: {
    content: "Don't forget to be awesome!",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=801-59140",
    },
  },
};
