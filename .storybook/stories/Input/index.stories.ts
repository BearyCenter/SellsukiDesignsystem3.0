import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/icon";
import "../../../src/elements/input";
import { Input, InputRange } from "../../../src/elements/input";
import "../../../src/elements/input/addon";
import { AutoLitProperty, baseArgsTypes, genericEvents } from "../helper";

type InputWithLabel = AutoLitProperty<Input> &
  AutoLitProperty<InputRange> & { label: string };

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Input",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-input ${spread({ ...args })}> </ssk-input>`;
  },
  argTypes: {
    label: {
      description: "The content of the input",
      control: "text",
    },
    "?disabled": {
      control: {
        type: "boolean",
      },
    },
    "?hidden": {
      control: {
        type: "boolean",
      },
    },
    "?required": {
      control: {
        type: "boolean",
      },
    },
    "?showLimit": {
      control: {
        type: "boolean",
      },
    },
    "?error": {
      control: {
        type: "boolean",
      },
    },
    value: {
      description: "",
      control: "text",
    },
    limit: {
      description: "",
      control: "number",
    },
    type: {
      options: ["text", "number", "password", "email", "tel", "url"],
      control: {
        type: "select",
      },
    },
    autoComplete: {
      options: ["on", "off"],
      control: {
        type: "select",
      },
    },
    "@click": genericEvents["@click"],
    "@input": genericEvents["@input"],
    "@change": genericEvents["@change"],
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
    value: "",
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
    size: "sm",
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
export const WithRequired: Story = {
  args: {
    size: "md",
    label: "Input",
    placeholder: "Placeholder",
    helperText: "Helper text",
    value: "",
    required: true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=585%3A57607&mode=dev",
    },
  },
};

export const SearchField: Story = {
  args: {
    size: "md",
    label: "Input",
    placeholder: "Placeholder",
    helperText: "Helper text",
    value: "",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=585%3A57607&mode=dev",
    },
  },
  render: ({ ...args }) => {
    return html`<ssk-input ${spread({ ...args })}>
      <ssk-input-addon slot="prefix">
        <ssk-icon
          ${spread({ ...args })}
          name="outline-magnifying-glass"
        ></ssk-icon>
      </ssk-input-addon>
      <ssk-input-addon slot="postfix">
        <ssk-icon
          ${spread({ ...args })}
          name="outline-ellipsis-horizontal-circle"
        ></ssk-icon>
      </ssk-input-addon>
    </ssk-input>`;
  },
};

export const WithAddon: Story = {
  args: {
    size: "md",
    label: "Input",
    placeholder: "Placeholder",
    helperText: "Helper text",
    value: "",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=585%3A57607&mode=dev",
    },
  },
  render: ({ ...args }) => {
    return html`<ssk-input ${spread({ ...args })}>
      <ssk-input-addon slot="postfix">
        <ssk-icon name="outline-ellipsis-horizontal-circle"></ssk-icon>
      </ssk-input-addon>
      <ssk-input-addon slot="prefix" color="white.100" themeColor="primary">
        +69
      </ssk-input-addon>
    </ssk-input>`;
  },
};

export const WithLeftAddon: Story = {
  args: {
    size: "md",
    label: "Input",
    placeholder: "Placeholder",
    helperText: "Helper text",
    value: "",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=585%3A57607&mode=dev",
    },
  },
  render: ({ ...args }) => {
    return html`<ssk-input ${spread({ ...args })}>
      <ssk-input-addon slot="prefix" color="white.100" themeColor="primary">
        +69
      </ssk-input-addon>
    </ssk-input>`;
  },
};

export const WithRightAddon: Story = {
  args: {
    size: "md",
    label: "Input",
    placeholder: "Placeholder",
    helperText: "Helper text",
    value: "",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=585%3A57607&mode=dev",
    },
  },
  render: ({ ...args }) => {
    return html`<ssk-input ${spread({ ...args })}>
      <ssk-input-addon slot="postfix">
        <ssk-icon name="outline-ellipsis-horizontal-circle"></ssk-icon>
      </ssk-input-addon>
    </ssk-input>`;
  },
};

export const InputRangeWithRightAddon: Story = {
  args: {
    size: "md",
    label: "Input",
    placeholder: "Placeholder",
    helperText: "Helper text",
    valueTo: "",
    valueFrom: "",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=585%3A57607&mode=dev",
    },
  },
  render: ({ ...args }) => {
    return html`<ssk-input-range ${spread({ ...args })}>
      <ssk-input-addon slot="center">
        <ssk-icon name="solid-arrow-long-right"></ssk-icon>
      </ssk-input-addon>
      <ssk-input-addon slot="postfix">
        <ssk-icon name="outline-ellipsis-horizontal-circle"></ssk-icon>
      </ssk-input-addon>
    </ssk-input-range>`;
  },
};
