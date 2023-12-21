import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/sidebar/list";
import "../../../src/elements/icon";
import "../../../src/elements/avatar";
import { baseArgsTypes, genericEvents } from "../helper";
import { SidebarList } from "../../../src/components/sidebar/list";

type SidebarArgs = {} & SidebarList;

const meta = {
  title: "Example/Sidebar/List",
  tags: ["autodocs"],
  argTypes: {
    "?collapsed": {
      description: "When true gives the sidebar a collapsed apparence",
      table: {
        category: "Props Avatar Sidebar",
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
    label1: "item",
    label2: "item2",
    size: "md",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1259-74722&mode=design&t=MziV72cf9HzxkHHr-0",
    },
  },
  render: ({ ...args }) => {
    return html`
      <ssk-sidebar-list ${spread(args)}>
        <ssk-avatar
          src="https://placehold.co/50x50"
          alt="demo avatar"
          shape="circle"
          slot="prefix"
        ></ssk-avatar>
      </ssk-sidebar-list>
    `;
  },
};
