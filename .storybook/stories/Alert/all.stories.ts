import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/alert";
import "../../../src/elements/icon";
import "../../../src/elements/button";

import { Alert } from "../../../src/elements/alert";
import { baseArgsTypes } from "../helper";
import { useArgs } from "@storybook/client-api";
import { action } from "@storybook/addon-actions";

type AlertArgs = {} & Alert;
const type: Alert["type"][] = [
  "default",
  "info",
  "error",
  "warning",
  "success",
];
const size: Alert["size"][] = ["xl", "lg", "md", "sm"];
const hasFooter: Boolean[] = [true, false];
function getIcon(alertType: string): string {
  switch (alertType) {
    case "success":
      return "outline-check-circle";
    default:
      return "outline-information-circle";
  }
}

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Components/Overlay & Notification/Alert",
  tags: [],
  render: ({ ...args }) => {
    const [{ "?hidden": hidden }, updateArgs] = useArgs();
    return html`<style>
        main {
          display: flex;
          justify-content: space-between;
          align-items: start;
          gap: 2rem;
          flex-flow: row wrap;
        }

        section {
          display: flex;
          flex-direction: column;
          flex-flow: row nowrap;
        }

        div.container {
          display: grid;
          grid-template-columns: repeat(${size.length}, auto);
          gap: 0.5em;
        }
      </style>
      <main>
        <ssk-button @click=${() => updateArgs({ "?hidden": !hidden })}>
          ${hidden ? "Show" : "Hide"} Alert
        </ssk-button>
        ${hasFooter.map(
          (f) => html` <section class="alert-hasfooter-${f}">
            ${type.map(
              (t) => html`
                <div class="container">
                  <ssk-alert
                    ${spread({ ...args, type: t })}
                    @close=${() => {
                      updateArgs({ "?hidden": true });
                      action("@close")();
                    }}
                    ><ssk-icon
                      name=${getIcon(t)}
                      themeColor="${t}"
                      slot="icon-slot"
                    ></ssk-icon>
                    ${f &&
                    html`<ssk-button
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
                      <ssk-button
                        padding="sm"
                        variant="ghost"
                        slot="ok-button-slot"
                      >
                        <ssk-icon
                          slot="postfix"
                          size="sm"
                          name="outline-ellipsis-horizontal-circle"
                          size="md"
                        ></ssk-icon>
                        View changes
                      </ssk-button>`}
                  </ssk-alert>
                </div>
              `
            )}
          </section>`
        )}
      </main>`;
  },
  argTypes: {
    "@close": {
      description: "Emitted when alert is closed",
      action: "@close",
      table: { category: "Events" },
    },
    "?hideCloseButton": {
      description: "Hide button top close",
      control: "boolean",
      table: {
        category: "Props",
      },
    },
    "?hidden": baseArgsTypes["?hidden"],
    ...baseArgsTypes,
  },
} satisfies Meta<AlertArgs>;

export default meta;

type Story = StoryObj<AlertArgs>;

export const ShowCase: Story = {
  args: {
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquidpariatur, ipsum dolor.",
    topic: "Alert header",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=6658-7777&mode=design&t=dUMijHwCDWrl1XsT-4",
    },
  },
};
