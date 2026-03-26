import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/menu/items";
import "../../../src/elements/menu/group";
import "../../../src/elements/icon";
import { MenuItems } from "../../../src/elements/menu/items";
import { MenuGroup } from "../../../src/elements/menu/group";
import { baseArgsTypes, genericEvents } from "../helper";

type MenuArgs = {} & MenuItems & MenuGroup;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Components/Navigation/Menu",
  tags: ["autodocs"],
  render: ({ label, ...args }) => {
    return html`
      <ssk-menu-items ${spread(args)}>
        <ssk-icon
          slot="prefix"
          name="outline-ellipsis-horizontal-circle"
          size="${args.size}"
        ></ssk-icon>
        ${label}
        <ssk-icon
          slot="postfix"
          name="solid-chevron-down"
          size="${args.size}"
        ></ssk-icon>
      </ssk-menu-items>
    `;
  },
  argTypes: {
    header: {
      description: "Header to show in menu",
      table: {
        category: "Props",
        type: {
          summary: "string",
        },
      },
      control: {
        type: "text",
      },
    },
    label: {
      description: "Label to show in menu",
      table: {
        category: "Props",
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
      description: "The type of menu",
      control: {
        type: "inline-radio",
      },
      table: {
        category: "Props",
        defaultValue: {
          summary: "solid",
        },
        type: {
          summary: "string",
        },
      },
    },
    "?disabled": {
      description: "When true gives the menu a disabled apparence",
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
    "?active": {
      description: "When true gives the menu a active apparence",
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
    "?isOpen": {
      description: "When true gives the group menu a isOpen apparence",
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
    "?min": {
      description: "When true gives the menu a min apparence",
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
    "?hiddenIcon": {
      description: "When true gives the group menu a hidden icon apparence",
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
    size: baseArgsTypes.size,
    themeColor: baseArgsTypes.themeColor,
    margin: baseArgsTypes.margin,
    gap: baseArgsTypes.gap,
    color: baseArgsTypes.color,
    padding: baseArgsTypes.padding,
    rounded: baseArgsTypes.rounded,
    "?hidden": baseArgsTypes["?hidden"],
    "@click": genericEvents["@click"],
  },
} satisfies Meta<MenuArgs>;

export default meta;

type Story = StoryObj<MenuArgs>;

export const Default: Story = {
  args: {
    label: "item",
    variant: "solid",
    size: "md",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1259-74722&mode=design&t=VlH5Gt972cRnvCwy-0",
    },
  },
};

export const GroupMenu: Story = {
  args: {
    label: "item",
    header: "Group Menu",
    size: "md",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1259-74722&mode=design&t=VlH5Gt972cRnvCwy-0",
    },
  },
  render: ({ ...args }) => {
    return html`
      <ssk-menu-group ${spread(args)}>
        <ssk-menu-items>
          <ssk-icon
            slot="prefix"
            name="outline-ellipsis-horizontal-circle"
            size="md"
          ></ssk-icon>
          ${args.label}
          <ssk-icon
            slot="postfix"
            name="solid-chevron-down"
            size="md"
          ></ssk-icon>
        </ssk-menu-items>
        <ssk-menu-items active>
          <ssk-icon
            slot="prefix"
            name="outline-ellipsis-horizontal-circle"
            size="md"
          ></ssk-icon>
          ${args.label}
          <ssk-icon
            slot="postfix"
            name="solid-chevron-down"
            size="md"
          ></ssk-icon>
        </ssk-menu-items>
      </ssk-menu-group>
    `;
  },
};
