import { spread, spreadProps } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/checkbox";
import { Checkbox } from "../../../src/elements/checkbox";
import { baseArgsTypes } from "../helper";

type CheckboxArgs = {} & Checkbox;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Checkbox",
  tags: ["autodocs"],
  render: ({ options, ...args }) => {
    return html`<ssk-checkbox .options=${options} ${spread(args)}>
    </ssk-checkbox>`;
  },
  argTypes: {
    label: {
      description: "Label to show in checkbox",
      table: {
        category: "Props",
        type: {
          summary: "string",
        },
      },
      control: {
        type: "text",
      },
    },
    value: {
      description: "Used for setting the currently selected value",
      table: {
        category: "Props",
        type: {
          summary: "string",
        },
      },
      control: {
        type: "text",
      },
    },
    "?disabled": {
      description: "When true gives the checkbox a disabled apparence",
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
    "?checked": {
      description: "When true gives the checkbox a checked apparence",
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
    "?options": {
      description: "The object for child checkbox",
      table: {
        category: "Props",
        defaultValue: { summary: [] },
        type: {
          summary: "object",
        },
      },
      control: {
        type: "object",
      },
    },
    size: baseArgsTypes.size,
    themeColor: baseArgsTypes.themeColor,
    color: baseArgsTypes.color,
    gap: baseArgsTypes.gap,
    padding: baseArgsTypes.padding,
    margin: baseArgsTypes.margin,
    rounded: baseArgsTypes.rounded,
    "?hidden": baseArgsTypes["?hidden"],
  },
} satisfies Meta<CheckboxArgs>;

export default meta;

type Story = StoryObj<CheckboxArgs>;

export const Default: Story = {
  args: {
    label: "Checkbox",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=854-63033&mode=design&t=MQ1h7Rh93hzVCRMd-0",
    },
  },
};

export const GroupCheckbox: Story = {
  args: {
    label: "Parent Checkbox",
    value: "value1",
    "?options": [
      { label: "Child checkbox1", value: "value2" },
      { label: "Child checkbox2", value: "value3", disabled: true },
    ],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=854-63033&mode=design&t=MQ1h7Rh93hzVCRMd-0",
    },
  },
};
