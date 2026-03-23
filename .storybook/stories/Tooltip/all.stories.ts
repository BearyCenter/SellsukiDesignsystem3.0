import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import { Tooltip, type Placement } from "../../../src/components/tooltip";
import "../../../src/components/tooltip";
import "../../../src/elements/button";

import { baseArgsTypes } from "../helper";

type TooltipArgs = {} & Tooltip;

const placement: Placement[] = [
  "bottom",
  "top",

  "topright",
  "topleft",

  "left",
  "right",

  "lefttop",
  "righttop",

  "leftbottom",
  "rightbottom",

  "bottomright",
  "bottomleft",
];

const meta = {
  title: "Components/Overlay & Notification/Tooltip",
  tags: [],
  render: ({ ...args }) => {
    return html`
      <style>
        main.showcase {
          position: absolute;
          top: 10%;
          left: 40%;
        }
        section {
          display: grid;
          grid-template-columns: auto auto;
          justify-items: center;
          gap: 40px;
        }

        .tooltip-content {
          display: flex;
          align-items: center;
        }
      </style>

      <main class="showcase">
        <section class="size">
          ${placement.map(
            (p) => html`
              <div class=${p} style="width:100%;">
                <ssk-tooltip ${spread(args)} placement=${p}>
                  <ssk-button variant="outline" width="full">${p}</ssk-button>
                </ssk-tooltip>
              </div>
            `,
          )}
        </section>
      </main>
    `;
  },
  argTypes: {
    label: {
      description: "title of tooltip",
      control: "text",
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
    trigger: {
      options: ["hover", "click"],
      description: "The type of trigger for show tooltip",
      control: {
        type: "inline-radio",
      },
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
    maxWidth: {
      control: {
        type: "text",
      },
      description: "Maximum width of tooltip",
      table: {
        category: "Props",
        defaultValue: {
          summary: "max-content",
        },
        type: {
          summary: "string",
        },
      },
    },
    themeColor: baseArgsTypes.themeColor,
    color: baseArgsTypes.color,
    size: baseArgsTypes.size,
  },
} satisfies Meta<TooltipArgs>;

export default meta;

type Story = StoryObj<TooltipArgs>;

export const ShowCase: Story = {
  args: {
    size: "md",
    label: "content in tooltip naja",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=2870-27764&mode=design&t=JZk8oYHsyfXqi2od-4",
    },
  },
};
