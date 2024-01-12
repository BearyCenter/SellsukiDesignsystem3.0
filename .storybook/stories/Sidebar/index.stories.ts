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
    "?expanded": true,
    size: "md",
    ".selectedItems": [],
    ".expandedGroups": ["product", "dashboard"],
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
      <style>
        .company-header {
          display: grid;
          grid-template-areas: "avatar name" "avatar branch";
          grid-template-columns: min-content 1fr;
          align-items: center;
          gap: 0 12px;
        }

        .company-header .avatar {
          grid-area: avatar;
        }

        .company-header .name {
          grid-area: name;
          font-size: 24px;
          color: var(--ssk-colors-text-900);
          text-align: start;
        }

        .company-header .branch {
          grid-area: branch;
          font-size: 20px;
          color: var(--ssk-colors-primary-500);
          text-align: start;
        }
      </style>

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
        <ssk-sidebar-header slot="header">
          <ssk-avatar
            src="/public/Avatar.png"
            alt="demo avatar"
            shape="circle"
            padding="16px 0"
            slot="mini"
          ></ssk-avatar>
          <!-- Expanded -->
          <ssk-dropdown themeColor="primary" width="full" hideChevron>
            <ssk-dropdown-preview slot="selected">
              <div class="company-header">
                <ssk-avatar
                  class="avatar"
                  src="/public/Avatar.png"
                  alt="demo avatar"
                  shape="circle"
                ></ssk-avatar>
                <label class="name">Sellsuki company</label>
                <label class="branch">สาขา รัชดาภิเษก</label>
              </div>
            </ssk-dropdown-preview>

            <ssk-dropdown-item>item 1</ssk-dropdown-item>
            <ssk-dropdown-item>item 2</ssk-dropdown-item>
            <ssk-dropdown-item>item 3</ssk-dropdown-item>
          </ssk-dropdown>
        </ssk-sidebar-header>

        <ssk-sidebar-list>
          <ssk-sidebar-group label="Dashboard" key="dashboard">
            <ssk-sidebar-item key="dashboard-item-1">
              <ssk-icon
                slot="prefix"
                name="outline-building-storefront"
              ></ssk-icon>
              item
            </ssk-sidebar-item>
            <ssk-sidebar-item key="dashboard-item-2">
              <ssk-icon slot="prefix" name="outline-inbox-stack"></ssk-icon>
              item 2
            </ssk-sidebar-item>
            <ssk-sidebar-item key="dashboard-item-3" disabled>
              <ssk-icon slot="prefix" name="solid-signal"></ssk-icon>
              item 3
            </ssk-sidebar-item>
          </ssk-sidebar-group>
          <ssk-sidebar-group label="Product" key="product">
            <ssk-sidebar-item key="product-item-1">
              <ssk-icon slot="prefix" name="outline-shopping-bag"></ssk-icon>
              item 1
            </ssk-sidebar-item>
            <ssk-sidebar-item key="product-item-2">
              <ssk-icon slot="prefix" name="outline-squares-plus"></ssk-icon>
              item 2
            </ssk-sidebar-item>
          </ssk-sidebar-group>
        </ssk-sidebar-list>

        <ssk-sidebar-item slot="footer">
          <ssk-icon slot="prefix" name="outline-user-group"></ssk-icon>
          Support
        </ssk-sidebar-item>
        <ssk-sidebar-item slot="footer">
          <ssk-icon slot="prefix" name="outline-cog-8-tooth"></ssk-icon>
          Setting
        </ssk-sidebar-item>
      </ssk-sidebar>
    `;
  },
};
