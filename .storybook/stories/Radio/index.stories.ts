import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/radio";
import "../../../src/elements/radio/group";
import { Radio } from "../../../src/elements/radio";
import { baseArgsTypes, genericEvents } from "../helper";

type RadioArgs = {} & Radio;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Radio",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-radio ${spread(args)}> </ssk-radio>`;
  },
  argTypes: {
    label: {
      description: "Label to show in radio",
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
      description: "When true gives the radio a disabled apparence",
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
      description: "When true gives the radio a checked apparence",
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
      description: "When true gives the radio a indeterminate apparence",
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
} satisfies Meta<RadioArgs>;

export default meta;

type Story = StoryObj<RadioArgs>;

export const Default: Story = {
  args: {
    label: "Radio",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=854-63034&mode=design",
    },
  },
};

export const RadioWithGroup: Story = {
  args: {
    label: "Radio Group",
    indeterminate: false,
    "@change": () => {
      console.log("change item");
    },
    ".group": {
      defaultValue: ["c1"],
      options: [
        {
          label: "radio1",
          value: "c1",
        },
        {
          label: "radio2",
          value: "c2",
        },
      ],
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=854-63034&mode=design",
    },
  },
  render: ({ ...agrs }) => {
    return html`
      <div>
        <ssk-radio-group ${spread(agrs)}> </ssk-radio-group>
      </div>
    `;
  },
};
