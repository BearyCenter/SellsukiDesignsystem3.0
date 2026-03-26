import { spread } from "@open-wc/lit-helpers";
import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/client-api";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/drawer";
import { Drawer } from "../../../src/components/drawer";
import "../../../src/elements/button";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type DrawerWithLabel = AutoLitProperty<Drawer> & { label: string };

const meta: Meta<DrawerWithLabel> = {
  title: "Components/Overlay & Notification/Drawer",
  tags: ["autodocs"],
  render: ({ label, ...args }) => {
    const [{}, updateArgs] = useArgs();

    const openDrawer = () => {
      updateArgs({ "?show": true });
    };

    return html`
      <ssk-button @click=${() => openDrawer()}>Open Drawer</ssk-button>

      <ssk-drawer
        ${spread(args)}
        @close=${() => {
          updateArgs({ "?show": false });
          action("@close")();
        }}
      >
        <ssk-drawer-header
          slot="header"
          title=${label}
          description="Drawer description goes here"
          @close=${() => updateArgs({ "?show": false })}
          ?hideCloseButton=${args["?hideCloseButton"]}
        >
          <ssk-button @click=${() => alert(1)}> Action </ssk-button>
        </ssk-drawer-header>
        <div slot="body">Drawer content from the ${args.side} goes here</div>
        <div slot="footer">
          <ssk-button @click=${() => updateArgs({ "?show": false })}>
            Close
          </ssk-button>
        </div>
        <div slot="footer">
          <ssk-button @click=${() => updateArgs({ "?show": false })}>
            Save Changes
          </ssk-button>
        </div>
      </ssk-drawer>
    `;
  },
  argTypes: {
    label: {
      description: "The header content of the drawer",
      control: "text",
      table: { category: "Props" },
    },
    bodyPadding: {
      description: "The body padding",
      control: "text",
      table: { category: "Props" },
    },
    "?hideCloseButton": {
      description: "Hide top right close button",
      control: "boolean",
      table: { category: "Props" },
    },
    "?show": {
      description: "Whether the drawer is shown",
      control: "boolean",
      table: { category: "Props" },
    },
    "?hideDivider": {
      description: "Hide divider lines",
      control: "boolean",
      table: { category: "Props" },
    },
    side: {
      description: "Drawer slide direction",
      control: "select",
      options: ["left", "right"],
      table: { category: "Props" },
    },
    width: {
      description: "Drawer width",
      control: "text",
      table: { category: "Props" },
    },
    "@close": {
      description: "Emitted when drawer is closed",
      action: "@close",
      table: { category: "Events" },
    },
    testId: {
      description: "Test ID for the drawer",
      control: "text",
      table: { category: "Props" },
    },
    ...baseArgsTypes,
  },
};

export default meta;

type Story = StoryObj<DrawerWithLabel>;

export const OpenFromLeftOrRight: Story = {
  args: {
    label: "Drawer",
    width: "400px",
    side: "right",
    "?show": true,
    "?hideDivider": false,
    bodyPadding: "24px",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=22924-459&t=iw9gl2meaBJaLBAg-0",
    },
  },
};
