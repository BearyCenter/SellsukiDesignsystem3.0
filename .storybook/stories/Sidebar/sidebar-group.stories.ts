import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/sidebar/group";
import "../../../src/components/sidebar/items";
import "../../../src/elements/icon";
import { baseArgsTypes, genericEvents } from "../helper";
import { SidebarGroup } from "../../../src/components/sidebar/group";

type SidebarArgs = {} & SidebarGroup;

const meta = {
  title: "Example/Sidebar/Group",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`
      <ssk-sidebar-group ${spread(args)}>
        <ssk-sidebar-items variant="outline">
          <ssk-icon
            slot="prefix"
            name="outline-ellipsis-horizontal-circle"
            size="md"
          ></ssk-icon>
          item
          <ssk-icon
            slot="postfix"
            name="solid-chevron-down"
            size="md"
          ></ssk-icon>
        </ssk-sidebar-items>
        <ssk-sidebar-items variant="outline" active>
          <ssk-icon
            slot="prefix"
            name="outline-ellipsis-horizontal-circle"
            size="md"
          ></ssk-icon>
          item
          <ssk-icon
            slot="postfix"
            name="solid-chevron-down"
            size="md"
          ></ssk-icon>
        </ssk-sidebar-items>
      </ssk-sidebar-group>
    `;
  },
  argTypes: {
    "?collapsed": {
      description: "When true gives the sidebar a collapsed apparence",
      table: {
        category: "Props Group Sidebar",
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
      description: "Header to show in group",
      table: {
        category: "Props Group Sidebar",
        type: {
          summary: "string",
        },
      },
      control: {
        type: "text",
      },
    },
    "?isOpen": {
      description: "When true gives the group sidebar a isOpen apparence",
      table: {
        category: "Props Group Sidebar",
        defaultValue: { summary: false },
        type: {
          summary: "boolean",
        },
      },
      control: {
        type: "boolean",
      },
    },
    "?hiddenIcon": {
      description: "When true gives the group menu a hidden icon apparence",
      table: {
        category: "Props Group Sidebar",
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
    label: "Group Menu",
    size: "md",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1259-74722&mode=design&t=MziV72cf9HzxkHHr-0",
    },
  },
};
