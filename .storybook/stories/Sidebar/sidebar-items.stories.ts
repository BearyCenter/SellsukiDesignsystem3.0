import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/sidebar/items";
import "../../../src/elements/icon";
import { baseArgsTypes, genericEvents } from "../helper";
import { SidebarItems } from "../../../src/components/sidebar/items";

type SidebarArgs = {} & SidebarItems;

const meta = {
  title: "Example/Sidebar/Items",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`
      <ssk-sidebar-items ${spread(args)}>
        <ssk-icon
          slot="prefix"
          name="outline-ellipsis-horizontal-circle"
          size="${args.size}"
        ></ssk-icon>
        ${args.label}
        <ssk-icon slot="postfix" name="solid-chevron-down" size="md"></ssk-icon>
      </ssk-sidebar-items>
    `;
  },
  argTypes: {
    "?collapsed": {
      description: "When true gives the sidebar a collapsed apparence",
      table: {
        category: "Props Items Sidebar",
        defaultValue: { summary: false },
        type: {
          summary: "boolean",
        },
      },
      control: {
        type: "boolean",
      },
    },
    label: {
      description: "Label to show in item",
      table: {
        category: "Props Items Sidebar",
        type: {
          summary: "string",
        },
      },
      control: {
        type: "text",
      },
    },
    variant: {
      options: ["solid", "outline"],
      description: "The type of item",
      control: {
        type: "inline-radio",
      },
      table: {
        category: "Props Items Sidebar",
        defaultValue: {
          summary: "outline",
        },
        type: {
          summary: "string",
        },
      },
    },
    "?disabled": {
      description: "When true gives the menu a disabled apparence",
      table: {
        category: "Props Items Sidebar",
        defaultValue: { summary: false },
        type: {
          summary: "boolean",
        },
      },
      control: {
        type: "boolean",
      },
    },
    "?active": {
      description: "When true gives the menu a active apparence",
      table: {
        category: "Props Items Sidebar",
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
    "?hidden": baseArgsTypes["?hidden"],
    "@click": genericEvents["@click"],
  },
} satisfies Meta<SidebarArgs>;

export default meta;

type Story = StoryObj<SidebarArgs>;

export const Default: Story = {
  args: {
    label: "item",
    variant: "outline",
    "?active": false,
    size: "md",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1259-74722&mode=design&t=MziV72cf9HzxkHHr-0",
    },
  },
};
