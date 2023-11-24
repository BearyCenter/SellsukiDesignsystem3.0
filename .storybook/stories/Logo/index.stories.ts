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
    srcLogo: {
      control: {
        type: "text",
      },
    },
    altLogo: {
      control: {
        type: "text",
      },
    },
    srcName: {
      control: {
        type: "text",
      },
    },
    altName: {
      control: {
        type: "text",
      },
    },
    boxSize: {
      control: {
        type: "text",
      },
    },
    "?fullLogo": {
      control: {
        type: "boolean",
      },
    },
    ...baseArgsTypes,
  },
} satisfies Meta<LogoArgs>;

export default meta;

type Story = StoryObj<LogoArgs>;

export const Default: Story = {
  args: {
    srcLogo: "https://placehold.co/72x72",
    altLogo: "demo brand logo",
    srcName: "https://placehold.co/72x72",
    altName: "demo brand name",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1230-75136&mode=design&t=msssbAIeiiWmkqdQ-0",
    },
  },
};
