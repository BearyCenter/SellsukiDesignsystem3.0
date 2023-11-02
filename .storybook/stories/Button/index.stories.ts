import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/button";
import { Button } from "../../../src/elements/button";
import "../../../src/elements/icon";
import { baseArgsTypes } from "../helper";

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
    },

    variant: {
      options: ["solid", "outline", "ghost"],
      control: {
        type: "inline-radio",
      },
    },
    "?disabled": {
      control: {
        type: "boolean",
      },
    },
    ...baseArgsTypes,
  },
} satisfies Meta<ButtonWithLabel>;

export default meta;

type Story = StoryObj<ButtonWithLabel>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    themeColor: "primary",
    size: "md",
    label: "Button",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1103%3A78477",
    },
  },
};

export const Secondary: Story = {
  args: {
    themeColor: "secondary",
    size: "md",
    label: "Button",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1103%3A78477",
    },
  },
};

export const Large: Story = {
  args: {
    themeColor: "primary",
    size: "lg",
    label: "Button",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1103%3A78477",
    },
  },
};

export const Small: Story = {
  args: {
    themeColor: "primary",
    size: "sm",
    label: "Button",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1103%3A78477",
    },
  },
};
