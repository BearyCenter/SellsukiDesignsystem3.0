import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/heading";
import { Heading } from "../../../src/elements/heading";
import { baseArgsTypes } from "../helper";

type HeadingArgs = {
  content: string;
} & Heading;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Components/Typography/Heading",
  tags: ["autodocs"],
  render: ({ content, ...args }) => {
    return html`<ssk-heading ${spread(args)}>${content}</ssk-heading>`;
  },
  argTypes: {
    level: {
      options: [1, 2, 3, 4, 5],
      control: {
        type: "select",
      },
    },
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

export const Default: Story = {
  args: {
    content: "Don't forget to be awesome!",
    level: 1,
    color: "black.900",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=801-59140",
    },
  },
};
