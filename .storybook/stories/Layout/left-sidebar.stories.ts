import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/layout/left-sidebar";
import { LeftSidebar } from "../../../src/elements/layout/left-sidebar";
import "../../../src/elements/icon";
import { baseArgsTypes } from "../helper";
import { GroupMenu } from "../../../src/elements/layout/group-menu";

type LeftSidebarArgs = {} & LeftSidebar & GroupMenu;

const meta = {
  title: "Example/Layout/LeftSidebar",
  tags: ["autodocs"],
  render: ({ items, isOpen, isGroupOpen, ...args }) => {
    return html`<ssk-left-sidebar ${spread(args)} .isOpen=${isOpen}
      ><div slot="header">
        <ssk-group-menu
          labelGroup="menu 1"
          ${spread(args)}
          .isGroupOpen=${isGroupOpen}
          .item=${items}
        >
        </ssk-group-menu>
        <ssk-group-menu
          labelGroup="menu 2"
          ${spread(args)}
          .isGroupOpen=${isGroupOpen}
        >
        </ssk-group-menu>
      </div>

      <ssk-divider
        orientation="horizontal"
        size="xs"
        slot="divider-header"
      ></ssk-divider>

      <ssk-divider
        orientation="horizontal"
        size="xs"
        slot="divider-footer"
      ></ssk-divider>

      <div slot="footer">
        <ssk-group-menu
          ${spread(args)}
          .isGroupOpen=${isGroupOpen}
          .item=${items}
        >
        </ssk-group-menu>
      </div>
    </ssk-left-sidebar> `;
  },
  argTypes: {
    isOpen: { control: "boolean" },
    isGroupOpen: { control: "boolean" },
    ...baseArgsTypes,
  },
} satisfies Meta<LeftSidebarArgs>;

type Story = StoryObj<LeftSidebarArgs>;

export const Default: Story = {
  args: {
    size: "md",
    isOpen: true,
    isGroupOpen: false,
    ".items": [
      {
        title: "Item 1",
        path: "/item1",
        icon: "solid-home",
      },
      {
        title: "Item 2",
        path: "/item2",
        icon: "solid-hand-thumb-up",
      },
    ],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1259-74722&mode=design&t=MziV72cf9HzxkHHr-0",
    },
  },
};

export default meta;
