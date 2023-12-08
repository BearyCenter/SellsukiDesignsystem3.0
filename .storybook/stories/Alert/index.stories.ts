import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/alert";
import "../../../src/elements/icon";
import "../../../src/elements/button";

import { Alert, Type } from "../../../src/elements/alert";
import { baseArgsTypes } from "../helper";

type AlertArgs = {} & Alert;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const alertType: Type[] = ["default", "error", "info", "success", "warning"];
const meta = {
  title: "Example/Alert",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-alert ${spread(args)}
      ><ssk-icon
        name="outline-information-circle"
        themeColor="${args.type}"
        slot="icon-slot"
      ></ssk-icon>
    </ssk-alert>`;
  },
  argTypes: {
    message: {
      description: "The description to show in alert",
      table: {
        category: "Props",
        type: {
          summary: "string",
        },
      },
      control: "text",
    },
    topic: {
      description: "The title to show in alert",
      table: {
        category: "Props",
        type: {
          summary: "string",
        },
      },
      control: "text",
    },
    type: {
      description: "The type of alert",
      options: alertType,
      table: {
        category: "Props",
        type: {
          summary: "string",
        },
      },
      control: "select",
    },
    size: baseArgsTypes.size,
    padding: baseArgsTypes.padding,
    margin: baseArgsTypes.margin,
    rounded: baseArgsTypes.rounded,
    width: baseArgsTypes.width,
    "?hidden": baseArgsTypes["?hidden"],
  },
} satisfies Meta<AlertArgs>;

export default meta;

type Story = StoryObj<AlertArgs>;

export const Default: Story = {
  args: {
    type: "default",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquidpariatur, ipsum dolor.",
    topic: "Alert header",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=6658-7777&mode=design&t=qckIvE75lPnkGzw0-4",
    },
  },
};

export const AlertWithFooter: Story = {
  args: {
    type: "default",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquidpariatur, ipsum dolor.",
    topic: "Alert header",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=6658-7777&mode=design&t=qckIvE75lPnkGzw0-4",
    },
  },
  render: ({ ...args }) => {
    return html` <ssk-alert ${spread(args)}
      ><ssk-icon
        name="outline-information-circle"
        themeColor="${args.type}"
        slot="icon-slot"
      ></ssk-icon>
      <ssk-button
        themeColor="gray"
        padding="sm"
        variant="ghost"
        slot="close-button-slot"
      >
        <ssk-icon
          slot="postfix"
          size="sm"
          name="outline-ellipsis-horizontal-circle"
          size="md"
        ></ssk-icon>
        Dismiss
      </ssk-button>
      <ssk-button padding="sm" variant="ghost" slot="ok-button-slot">
        <ssk-icon
          slot="postfix"
          size="sm"
          name="outline-ellipsis-horizontal-circle"
          size="md"
        ></ssk-icon>
        View changes
      </ssk-button>
    </ssk-alert>`;
  },
};
