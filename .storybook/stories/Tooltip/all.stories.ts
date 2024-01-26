import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import { Tooltip, type Placement } from "../../../src/components/tooltip";
import "../../../src/components/tooltip";
import "../../../src/elements/button";

import { baseArgsTypes } from "../helper";

type TooltipArgs = {} & Tooltip;

const placement: Placement[] = [
  "topleft",
  "top",
  "topright",

  "left",
  "lefttop",
  "rightbottom",

  "right",
  "righttop",
  "leftbottom",

  "bottomleft",
  "bottom",
  "bottomright",
];

const meta = {
  title: "Example/Tooltip",
  tags: [],
  render: ({ ...args }) => {
    return html`
      <style>
        main.showcase {
          position: absolute;
          top: 30%;
          left: 30%;
        }
        section {
          display: grid;
          grid-template-columns: auto auto auto;
          align-self: center;
          gap: 40px;
        }
      </style>

      <main class="showcase">
        <section class="size">
          ${placement.map(
            (p) => html`
              <div class=${p}>
                <ssk-tooltip ${spread(args)} placement=${p}>
                  <ssk-button>${p}</ssk-button>
                  <ssk-text slot="content"> content in tooltip naja </ssk-text>
                </ssk-tooltip>
              </div>
            `,
          )}
        </section>
      </main>
    `;
  },
  argTypes: {
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
  },
} satisfies Meta<TooltipArgs>;

export default meta;

type Story = StoryObj<TooltipArgs>;

export const ShowCase: Story = {
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
