
import { Toggle } from "../../../src/elements/toggle";
import "../../../src/elements/toggle";
import { spread } from "@open-wc/lit-helpers";
import { html } from "lit";
import { baseArgsTypes, genericEvents } from "../helper";
import { ArgTypes, Meta, StoryObj } from "@storybook/web-components";

type ToggleArgs = {} & Toggle;

const meta = {
  title: "Components/Form & Input/Toggle",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-toggle ${spread(args)}></ssk-toggle>`;
  },
  argTypes: {
    "?disabled": {
      control: {
        type: "boolean",
      },
    },
    "?checked": {
      control: {
        type: "boolean",
      }
    },
    themeColor: baseArgsTypes.themeColor,
    color: baseArgsTypes.color,
    backgroundColor: baseArgsTypes.backgroundColor,
    size: baseArgsTypes.size,
    fontSize: baseArgsTypes.fontSize,
    margin: baseArgsTypes.margin,
    ...genericEvents,
  }
} satisfies Meta<ToggleArgs>;

export default meta;

type Story = StoryObj<ToggleArgs>;

export const Default: Story = {
  args: {
    size: "md",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=878%3A60282&mode=design&t=pVpeabGs2Rg87lde-1",
    },
  },
};
