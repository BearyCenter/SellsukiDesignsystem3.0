import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/heading";
import { Heading } from "../../../src/elements/heading";
import { baseArgsTypes } from "../helper";

type HeadingArgs = {
  content: string;
} & Omit<Heading, "level">;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Components/Typography/Heading",
  tags: [],
  render: ({ content, ...args }) => {
    return html`<div>
      <ssk-heading ${spread(args)} level="1">${content}</ssk-heading>
      <ssk-heading ${spread(args)} level="2">${content}</ssk-heading>
      <ssk-heading ${spread(args)} level="3">${content}</ssk-heading>
      <ssk-heading ${spread(args)} level="4">${content}</ssk-heading>
      <ssk-heading ${spread(args)} level="5">${content}</ssk-heading>
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
} satisfies Meta<HeadingArgs>;

export default meta;

type Story = StoryObj<HeadingArgs>;

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
