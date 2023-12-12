import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/icon";
import { Icon } from "../../../src/elements/icon";
import { baseArgsTypes } from "../helper";

type IconArgs = {} & Icon;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Icon",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-icon ${spread(args)}></ssk-icon>`;
  },
  argTypes: {
    name: {
      description: "The icon's name",
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: {
          summary: "string",
        },
      },
      options: Object.keys(Icon.svgs),
      control: {
        type: "select",
      },
    },
    "?spin": {
      description: "When true gives the icon a spinner apparence",
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
    ...baseArgsTypes,
  },
} satisfies Meta<IconArgs>;

export default meta;

type Story = StoryObj<IconArgs>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Default: Story = {
  args: {
    name: "outline-academic-cap",
    size: "lg",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=572-75068",
    },
  },
};
