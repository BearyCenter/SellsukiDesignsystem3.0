import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/tooltip-v2";
import { TooltipV2, type Placement } from "../../../src/components/tooltip-v2";
import "../../../src/elements/button";

import { baseArgsTypes } from "../helper";

type TooltipArgs = {} & TooltipV2;

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
  title: "Example/Tooltip",
  tags: [],
  render: ({ ...args }) => {
    return html`
      <style>
        main.showcase {
          display: grid;
          place-items: center;
          height: 100vh;
        }

        section {
          display: grid;
          grid-template-columns: auto auto auto;
          gap: 40px;
          overflow: hidden;
        }
      </style>

      <main class="showcase">
        <section class="size">
          ${placement.map(
            (p) => html`
              <div>
                <ssk-tooltip ${spread(args)} placement=${p}>
                  <ssk-button variant="outline" width="full">${p}</ssk-button>
                </ssk-tooltip>
              </div>
            `
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
