import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/logo";
import { Logo } from "../../../src/elements/logo";
import { baseArgsTypes } from "../helper";

type LogoArgs = {} & Logo;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Logo",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-logo ${spread(args)}></ssk-logo>`;
  },
  argTypes: {
    src: {
      control: {
        type: "text",
      },
    },
    alt: {
      control: {
        type: "text",
      },
    },
    boxSize: {
      control: {
        type: "text",
      },
    },
    ...baseArgsTypes,
  },
} satisfies Meta<LogoArgs>;

export default meta;

type Story = StoryObj<LogoArgs>;

export const Default: Story = {
  args: {
    src: "https://placehold.co/72x72",
    alt: "demo brand",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1230-75136&mode=design&t=msssbAIeiiWmkqdQ-0",
    },
  },
};
