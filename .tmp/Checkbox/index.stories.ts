import { spreadProps } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { baseArgsTypes } from "../../.storybook/stories/helper";
import "../../src/components/checkbox";
import { Checkbox } from "../../src/components/checkbox";

type CheckboxArgs = {} & Checkbox;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Checkbox",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-checkbox ${spreadProps(args)}></ssk-checkbox>`;
  },
  argTypes: {
    orientation: {
      options: ["horizontal", "vertical"],
      control: {
        type: "inline-radio",
      },
    },
    ...baseArgsTypes,
  },
} satisfies Meta<CheckboxArgs>;

export default meta;

type Story = StoryObj<CheckboxArgs>;

export const Default: Story = {
  args: {
    label: "checkbox",
    size: "md",
    color: "black.900",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=801-59140",
    },
  },
};
