import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/alert";
import { Alert } from "../../../src/elements/alert";
import { baseArgsTypes } from "../helper";

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
  title: "Example/Alert",
  tags: [],
  render: ({ ...args }) => {
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
        ${type.map(
          (t) => html` <section class="${t}">
            <div class="container">
              <ssk-alert ${spread({ ...args, type: t })}
                ><ssk-icon
                  name=${getIcon(t)}
                  themeColor="${t}"
                  slot="icon-slot"
                ></ssk-icon>
              </ssk-alert>
            </div>
          </section>`,
        )}
      </main>`;
  },
  argTypes: {
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
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1223-74500&mode=design&t=yXcQnF7GyIy2CKb6-0",
    },
  },
};
