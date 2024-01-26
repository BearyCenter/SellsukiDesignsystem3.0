import { Tooltip } from "../../../src/elements/tooltip";
import "../../../src/elements/tooltip";
import "../../../src/elements/text";

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
          <ssk-text>Hover me naja eieiei</ssk-text>
          <ssk-text slot="content">
            yeahhh!! djshfksljdhfkjsdhfjkdshfkj ikdfjdikslfhlsdf
            sdjfhksjdfhdjksfhjsdf sdlofhjksdfhjksdfhjksfghkjdsf dsfhsjkdhf
          </ssk-text>
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
          summary: "b",
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
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=878%3A60282&mode=design&t=pVpeabGs2Rg87lde-1",
    },
  },
};
