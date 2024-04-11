import { html } from "lit";
import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import "../../../src/elements/pin-code";
import { PinCode } from "../../../src/elements/pin-code";
import { baseArgsTypes, genericEvents } from "../helper";

type PinCodeProps = Partial<PinCode>;

const meta = {
  title: "Example/PinCode",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    const updatePinCodeValue = (event: Event) => {
      const code = (event.target as PinCode).Value;
      const pinCodeValue = document.getElementById("showValue");
      if (pinCodeValue) {
        pinCodeValue.textContent = `Pin Code Value: ${code}`;
      }
    };

    return html`<div>
      <ssk-pin-code
        ${spread({ ...args })}
        @input=${updatePinCodeValue}
      ></ssk-pin-code>
      <p id="showValue">Pin Code Value:</p>
    </div>`;
  },
  argTypes: {
    length: {
      description: "Special format for the pin code input field",
      table: {
        category: "Props",
        defaultValue: { summary: 3 },
        type: {
          summary: "Number",
        },
      },
      control: {
        type: "number",
      },
    },
    placeholder: {
      description:
        "Text to display in each pin code input field when no value is entered",
      table: {
        category: "Props",
        defaultValue: { summary: "0" },
        type: {
          summary: "text",
        },
      },
      control: {
        type: "text",
      },
    },
    type: {
      options: ["text", "number"],
      description: "Type of input (text or number)",
      table: {
        category: "Props",
        defaultValue: { summary: "number" },
        type: {
          summary: "select",
        },
      },
      control: {
        type: "select",
      },
    },
    "?error": {
      description:
        "Indicates whether the pin code input field is in an error state",
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: {
          summary: "boolean",
        },
      },
      control: {
        type: "boolean",
      },
    },
    "?disabled": {
      description: "When true gives the pin code a disabled apparence",
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: {
          summary: "boolean",
        },
      },
      control: {
        type: "boolean",
      },
    },
    size: baseArgsTypes.size,
    width: baseArgsTypes.width,
    height: baseArgsTypes.height,
    themeColor: baseArgsTypes.themeColor,
    color: baseArgsTypes.color,
    gap: baseArgsTypes.gap,
    padding: baseArgsTypes.padding,
    rounded: baseArgsTypes.rounded,
    borderColor: baseArgsTypes.borderColor,
    "?hidden": baseArgsTypes["?hidden"],
    "@input": genericEvents["@input"],
    "@change": genericEvents["@change"],
  },
} satisfies Meta<PinCodeProps>;

export default meta;

type Story = StoryObj<PinCodeProps>;

export const Default: Story = {
  args: { length: 3 },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=3015-6907&mode=design&t=CCw6JU3hnioeOxuv-0",
    },
  },
};

export const Error: Story = {
  args: { length: 3, error: true },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=3015-6907&mode=design&t=CCw6JU3hnioeOxuv-0",
    },
  },
};
