import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/avatar";
import { Avatar } from "../../../src/elements/avatar";
import { baseArgsTypes } from "../helper";

type AvatarArgs = {} & Avatar;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Components/Media & Branding/Avatar",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-avatar ${spread(args)}></ssk-avatar>`;
  },
  argTypes: {
    shape: {
      options: ["circle", "rounded"],
      control: {
        type: "select",
      },
    },
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
    objectFit: {
      options: ["fill", "contain", "cover", "none", "scale-down"],
      control: {
        type: "select",
      },
    },
    label: {
      control: {
        type: "text",
      },
    },
    ...baseArgsTypes,
  },
} satisfies Meta<AvatarArgs>;

export default meta;

type Story = StoryObj<AvatarArgs>;

export const Default: Story = {
  args: {
    src: "/public/Avatar.png",
    alt: "demo avatar",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1230-74988&mode=design&t=q6xYkXSoidIAD1Sz-0",
    },
  },
};

export const Circle: Story = {
  args: {
    shape: "circle",
    src: "/public/Avatar.png",
    alt: "demo avatar",
    themeColor: "primary",
    label: "william wilson",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1230-74988&mode=design&t=q6xYkXSoidIAD1Sz-0",
    },
  },
};

export const InitialDefault: Story = {
  args: {
    themeColor: "primary",
    label: "william wilson",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1230-74988&mode=design&t=q6xYkXSoidIAD1Sz-0",
    },
  },
};

export const InitialCircle: Story = {
  args: {
    themeColor: "primary",
    label: "william wilson",
    shape: "circle",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1230-74988&mode=design&t=q6xYkXSoidIAD1Sz-0",
    },
  },
};
