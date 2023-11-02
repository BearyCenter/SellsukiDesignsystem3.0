import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/icon";
import "../../../src/elements/input";
import { Input } from "../../../src/elements/input";
import { baseArgsTypes } from "../helper";

type InputWithLabel = Input & { label: string };

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Input",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-input ${spread({ ...args })}></ssk-input>`;
  },
  argTypes: {
    label: {
      description: "The content of the input",
      control: "text",
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    hidden: {
      control: {
        type: "boolean",
      },
    },
    onClick: {
      action: "onClick",
    },
    ...baseArgsTypes,
  },
} satisfies Meta<InputWithLabel>;

export default meta;

type Story = StoryObj<InputWithLabel>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Medium: Story = {
  args: {
    size: "md",
    label: "Input",
    placeholder: "Placeholder",
    helperText: "Helper text",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1123-65244",
    },
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "Input",
    placeholder: "Placeholder",
    helperText: "Helper text",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1123-65244",
    },
  },
};

export const Small: Story = {
  args: {
    size: "xl",
    label: "Input",
    placeholder: "Placeholder",
    helperText: "Helper text",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1123-65244",
    },
  },
};
