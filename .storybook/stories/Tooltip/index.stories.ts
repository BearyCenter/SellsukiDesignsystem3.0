import { Tooltip } from "../../../src/components/tooltip";
import "../../../src/components/tooltip";
import "../../../src/elements/text";
import "../../../src/elements/image";
import "../../../src/elements/container";

import { spread } from "@open-wc/lit-helpers";
import { html } from "lit";
import { baseArgsTypes, genericEvents } from "../helper";
import { ArgTypes, Meta, StoryObj } from "@storybook/web-components";

type TooltipArgs = {} & Tooltip;

const meta = {
  title: "Example/Tooltip",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html` <style>
        div.container {
          margin: auto;
          margin-top: 25%;
          width: 60%;
          display: flex;
          justify-content: center;
        }
      </style>

      <div class="container">
        <ssk-tooltip ${spread(args)}>
          <ssk-text>Hover me</ssk-text>
          <ssk-text slot="content"> yeahhh!! </ssk-text>
        </ssk-tooltip>
      </div>`;
  },
  argTypes: {
    placement: {
      options: [
        "top",
        "bottom",
        "left",
        "right",
        "topleft",
        "topright",
        "bottomleft",
        "bottomright",
        "lefttop",
        "leftbottom",
        "righttop",
        "rightbottom",
      ],
      description: "The type of placement",
      control: "select",
      table: {
        category: "Props",
        defaultValue: {
          summary: "top",
        },
        type: {
          summary: "string",
        },
      },
    },
    trigger: {
      options: ["hover", "click"],
      description: "The type of trigger when show tooltip",
      control: "select",
      table: {
        category: "Props",
        defaultValue: {
          summary: "hover",
        },
        type: {
          summary: "string",
        },
      },
    },
    "?hideArrow": {
      description: "When true gives the arrow of tooltips disapparence",
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
    "?hideCloseButton": {
      description:
        "When true gives the close button in tooltip will disapparence",
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
    themeColor: baseArgsTypes.themeColor,
    color: baseArgsTypes.color,
    size: baseArgsTypes.size,
    ...genericEvents,
  },
} satisfies Meta<TooltipArgs>;

export default meta;

type Story = StoryObj<TooltipArgs>;

export const Default: Story = {
  args: {
    size: "md",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=2870-27764&mode=design&t=JZk8oYHsyfXqi2od-4",
    },
  },
};

export const NoCloseButton: Story = {
  args: {
    size: "md",
    "?hideCloseButton": true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=2870-27764&mode=design&t=JZk8oYHsyfXqi2od-4",
    },
  },
};

export const NoArrow: Story = {
  args: {
    size: "md",
    "?hideArrow": true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=2870-27764&mode=design&t=JZk8oYHsyfXqi2od-4",
    },
  },
};

export const MoreContent: Story = {
  args: {
    size: "md",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=2870-27764&mode=design&t=JZk8oYHsyfXqi2od-4",
    },
  },
  render: ({ ...args }) => {
    return html`<style>
        div.container {
          margin: auto;
          margin-top: 25%;
          width: 60%;
          display: flex;
          justify-content: center;
        }
      </style>

      <div class="container">
        <ssk-tooltip ${spread(args)}>
          <ssk-text>Hover me</ssk-text>
          <div class="content" slot="content">
            <ssk-text>Text</ssk-text>
            <ssk-image
              src="https://example.com/404.jpg"
              fallbacksrc="https://placehold.co/200x100"
              alt="demo image"
            >
            </ssk-image>
            <ssk-text
              >Modal body goes here. You have several styles to choose from just
              in case.Modal body goes here.
            </ssk-text>
          </div>
        </ssk-tooltip>
      </div>`;
  },
};
