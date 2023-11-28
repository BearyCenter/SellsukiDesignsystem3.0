import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/button";
import { Button } from "../../../src/elements/button";
import "../../../src/elements/icon";
import { baseArgsTypes, genericEvents } from "../helper";

type ButtonWithLabel = Button & { label: string };

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Button",
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
      options: ["solid", "outline", "ghost"],
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
