import { spread } from "@open-wc/lit-helpers";
import { useArgs } from "@storybook/client-api";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/dropdown";
import "../../../src/components/sidebar";
import { Sidebar } from "../../../src/components/sidebar";
import "../../../src/elements/avatar";
import "../../../src/elements/icon";
import { AutoLitProperty, baseArgsTypes, genericEvents } from "../helper";

type SidebarArgs = AutoLitProperty<Sidebar>;

const meta = {
  title: "Example/Sidebar/Sidebar",
  tags: ["autodocs"],
  argTypes: {
    "?expanded": {
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
    ".expandedGroups": {
      description: "Array of expanded groups",
      control: {
        type: "array",
      },
    },
    ".selectedItems": {
      description: "Array of selected items",
      control: {
        type: "array",
      },
    },
    size: baseArgsTypes.size,
    themeColor: baseArgsTypes.themeColor,
    "?hidden": baseArgsTypes["?hidden"],
    "@click": genericEvents["@click"],
  },
} satisfies Meta<SidebarArgs>;

export default meta;

type Story = StoryObj<SidebarArgs>;

export const Default: Story = {
  args: {
    "?expanded": false,
    size: "md",
    ".selectedItems": [],
    ".expandedGroups": [],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1259-74722&mode=design&t=MziV72cf9HzxkHHr-0",
    },
  },
  render: ({ ...args }) => {
    const [{}, updateArgs] = useArgs();

    return html`
      <ssk-sidebar
        ${spread(args)}
        @expanded-changed=${(e: CustomEvent) => {
          updateArgs({ expanded: e.detail.expanded });
        }}
        @selected-items-changed=${(e: CustomEvent) => {
          if (e.detail.selected) {
            updateArgs({
              ".selectedItems": [e.detail.key],
            });
          }
        }}
        @expanded-groups-changed=${(e: CustomEvent) => {
          if (e.detail.expanded) {
            updateArgs({
              ".expandedGroups": [...args[".expandedGroups"], e.detail.key],
            });
          } else {
            updateArgs({
              ".expandedGroups": args[".expandedGroups"].filter(
                (item) => item !== e.detail.key
              ),
            });
          }
        }}
      >
        <ssk-sidebar-header
          slot="header"
          label1="Sellsuki company"
          label2="สาขา รัชดาภิเษก"
        >
          <ssk-avatar
            src="/public/Avatar.png"
            alt="demo avatar"
            shape="circle"
            padding="12px 0"
            slot="mini"
          ></ssk-avatar>
          <!-- Expanded -->
          <ssk-dropdown themeColor="primary" width="full">
            <ssk-dropdown-preview slot="selected">
              <ssk-avatar
                src="/public/Avatar.png"
                alt="demo avatar"
                shape="circle"
              ></ssk-avatar>
              hello
            </ssk-dropdown-preview>

            <ssk-dropdown-item>item 1</ssk-dropdown-item>
            <ssk-dropdown-item>item 2</ssk-dropdown-item>
            <ssk-dropdown-item>item 3</ssk-dropdown-item>
          </ssk-dropdown>
        </ssk-sidebar-header>

        <div>
          <ssk-sidebar-group
            label="Dashboard"
            key="dashboard"
            slot="header"
            size="sm"
          >
            <ssk-sidebar-item size="md" key="dashboard-item-1">
              <ssk-icon
                slot="prefix"
                name="outline-building-storefront"
                size="md"
              ></ssk-icon>
              item
            </ssk-sidebar-item>
            <ssk-sidebar-item size="md" key="dashboard-item-2">
              <ssk-icon
                slot="prefix"
                name="outline-inbox-stack"
                size="md"
              ></ssk-icon>
              item 2
            </ssk-sidebar-item>
            <ssk-sidebar-item size="md" key="dashboard-item-3" disabled>
              <ssk-icon slot="prefix" name="solid-signal" size="md"></ssk-icon>
              item 3
            </ssk-sidebar-item>
          </ssk-sidebar-group>
          <ssk-sidebar-group
            label="Product"
            key="product"
            slot="header"
            size="sm"
          >
            <ssk-sidebar-item size="md" key="product-item-1">
              <ssk-icon
                slot="prefix"
                name="outline-shopping-bag"
                size="md"
              ></ssk-icon>
              item 1
            </ssk-sidebar-item>
            <ssk-sidebar-item size="md" key="product-item-2">
              <ssk-icon
                slot="prefix"
                name="outline-squares-plus"
                size="md"
              ></ssk-icon>
              item 2
            </ssk-sidebar-item>
          </ssk-sidebar-group>
        </div>

        <ssk-sidebar-item slot="footer" size="md">
          <ssk-icon
            slot="prefix"
            name="outline-user-group"
            size="md"
          ></ssk-icon>
          Support
        </ssk-sidebar-item>
        <ssk-sidebar-item slot="footer" size="md">
          <ssk-icon
            slot="prefix"
            name="outline-cog-8-tooth"
            size="md"
          ></ssk-icon>
          Setting
        </ssk-sidebar-item>
      </ssk-sidebar>
    `;
  },
};
