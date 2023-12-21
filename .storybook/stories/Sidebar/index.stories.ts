import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/sidebar/index";
import "../../../src/components/sidebar/group";
import "../../../src/components/sidebar/items";
import "../../../src/components/sidebar/list";
import "../../../src/elements/avatar";
import { Sidebar } from "../../../src/components/sidebar";
import "../../../src/elements/icon";
import { baseArgsTypes, genericEvents } from "../helper";

type SidebarArgs = {} & Sidebar;

const meta = {
  title: "Example/Sidebar/Sidebar",
  tags: ["autodocs"],
  argTypes: {
    "?collapsed": {
      description: "When true gives the sidebar a collapsed apparence",
      table: {
        category: "Props Sidebar",
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
    "?collapsed": false,
    size: "md",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1259-74722&mode=design&t=MziV72cf9HzxkHHr-0",
    },
  },
  render: ({ ...agrs }) => {
    return html`
      <ssk-sidebar ${spread(agrs)}>
        <ssk-sidebar-list
          slot="header"
          label1="Sellsuki company"
          label2="สาขา รัชดาภิเษก"
        >
          <ssk-avatar
            src="https://placehold.co/40x40"
            alt="demo avatar"
            shape="circle"
            slot="prefix"
          ></ssk-avatar>
        </ssk-sidebar-list>
        <ssk-sidebar-group label="Dashboard" slot="header" size="sm">
          <ssk-sidebar-items size="md">
            <ssk-icon
              slot="prefix"
              name="outline-building-storefront"
              size="md"
            ></ssk-icon>
            item
          </ssk-sidebar-items>
          <ssk-sidebar-items size="md" active>
            <ssk-icon
              slot="prefix"
              name="outline-inbox-stack"
              size="md"
            ></ssk-icon>
            item
          </ssk-sidebar-items>
        </ssk-sidebar-group>
        <ssk-sidebar-group label="Product" slot="header" size="sm">
          <ssk-sidebar-items size="md">
            <ssk-icon
              slot="prefix"
              name="outline-shopping-bag"
              size="md"
            ></ssk-icon>
            item
          </ssk-sidebar-items>
          <ssk-sidebar-items size="md">
            <ssk-icon
              slot="prefix"
              name="outline-squares-plus"
              size="md"
            ></ssk-icon>
            item
          </ssk-sidebar-items>
        </ssk-sidebar-group>
        <ssk-sidebar-items slot="footer" size="md">
          <ssk-icon
            slot="prefix"
            name="outline-user-group"
            size="md"
          ></ssk-icon>
          Support
        </ssk-sidebar-items>
        <ssk-sidebar-items slot="footer" size="md">
          <ssk-icon
            slot="prefix"
            name="outline-cog-8-tooth"
            size="md"
          ></ssk-icon>
          Setting
        </ssk-sidebar-items>
      </ssk-sidebar>
    `;
  },
};
