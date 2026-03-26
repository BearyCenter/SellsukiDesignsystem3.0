import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/icon";
import "../../../src/elements/textarea";
import { Textarea } from "../../../src/elements/textarea";
import { AutoLitProperty, baseArgsTypes, genericEvents } from "../helper";

type TextareaWithLabel = AutoLitProperty<Textarea> & { label: string };

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Components/Form & Input/Textarea",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-textarea ${spread({ ...args })}> </ssk-textarea>`;
  },
  argTypes: {
    label: {
      description: "The content of the textarea",
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
    value: {
      description: "",
      control: "text",
    },
    resize: {
      description: "The resize textarea",
      options: ["none", "both", "horizontal", "vertical"],
      control: {
        type: "select",
      },
    },
    "@click": genericEvents["@click"],
    "@input": genericEvents["@input"],
    "@change": genericEvents["@change"],
    ...baseArgsTypes,
  },
} satisfies Meta<TextareaWithLabel>;

export default meta;

type Story = StoryObj<TextareaWithLabel>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Medium: Story = {
  args: {
    size: "md",
    label: "Textarea",
    placeholder: "Placeholder",
    helperText: "Helper text",
    value: "",
    limit: 69,
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
    label: "Textarea",
    placeholder: "Placeholder",
    helperText: "Helper text",
    value: "",
    limit: 69,
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
    size: "sm",
    label: "Textarea",
    placeholder: "Placeholder",
    helperText: "Helper text",
    value: "",
    limit: 69,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1123-65244",
    },
  },
};
