import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/checkbox";
import { Checkbox } from "../../../src/elements/checkbox";
import { baseArgsTypes, genericEvents } from "../helper";

type CheckboxArgs = {} & Checkbox;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Checkbox",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-checkbox ${spread(args)}> </ssk-checkbox>`;
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
    "?indeterminate": {
      description: "When true gives the checkbox a indeterminate apparence",
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
    themeColor: baseArgsTypes.themeColor,
    color: baseArgsTypes.color,
    gap: baseArgsTypes.gap,
    padding: baseArgsTypes.padding,
    margin: baseArgsTypes.margin,
    rounded: baseArgsTypes.rounded,
    "?hidden": baseArgsTypes["?hidden"],
    "@change": genericEvents["@change"],
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

export const CheckboxWithChild: Story = {
  args: {
    label: "Checkbox",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=854-63033&mode=design&t=MQ1h7Rh93hzVCRMd-0",
    },
  },
  render: () => {
    return html`<style>
        div.child-container {
          margin-left: 30px;
        }
      </style>
      <div>
        <ssk-checkbox label="Parent checkbox" indeterminate="true">
        </ssk-checkbox>
        <div class="child-container">
          <ssk-checkbox label="Child checkbox1"> </ssk-checkbox>
          <ssk-checkbox label="Child checkbox2" checked="true"> </ssk-checkbox>
          <ssk-checkbox label="Child checkbox3"> </ssk-checkbox>
        </div>
      </div> `;
  },
};
