import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/misc-icon";
import { MiscIcon } from "../../../src/components/misc-icon";
import { Icon } from "../../../src/elements/icon";
import { baseArgsTypes, colors, customColors } from "../helper";

type IconArgs = {} & MiscIcon;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Misc Icon",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-misc-icon ${spread(args)}></ssk-misc-icon>`;
  },
  argTypes: {
    iconName: {
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
    variant: {
      description: "The icon's variant",
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: {
          summary: "string",
        },
      },
      options: ["solid", "light", "outline"],
      control: {
        type: "select",
      },
    },
    iconColor: {
      options: [...colors, ...customColors],
      description: "Color of inner icon (falls back to themeColor)",
      control: "select",
      table: {
        category: "Base props",
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
    iconName: "outline-academic-cap",
    size: "lg",
    themeColor: "primary",
    variant: "solid",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=9184-22334&t=W6UBZA2sK2Db9LaJ-4",
    },
  },
};
