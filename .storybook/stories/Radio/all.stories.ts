import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/Radio";
import { Radio } from "../../../src/elements/Radio";

type RadioArgs = {} & Omit<Radio, "level">;
const size: Radio["size"][] = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
];

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Radio",
  tags: [],
  render: ({ ...args }) => {
    return html`<style>
        main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 1rem;
        }

        section.horizontal {
          display: flex;
          flex-direction: column;
        }

        section.vertical {
          display: flex;
          flex-direction: row;
        }
      </style>
      <main>
        <section class="show-checked">
          <ssk-radio
            ${spread(args)}
            disabled="true"
            label="radio disabled"
          >
          </ssk-radio>
          <ssk-radio ${spread(args)} checked="true" label="radio
          checked">
          </ssk-radio>
          <ssk-radio
            ${spread(args)}
            disabled="true"
            checked="true"
            label="radio checked disabled"
          >
          </ssk-radio>
        </section>
        <section class="show-indeterminate">
          <ssk-radio
            ${spread(args)}
            indeterminate="true"
            label="radio indeterminate"
          >
          </ssk-radio>
          <ssk-radio
            ${spread(args)}
            disabled="true"
            indeterminate="true"
            label="radio indeterminate disabled"
          >
          </ssk-radio>
        </section>
        <section class="show-size">
          ${size.map(
            (sz) => html`
              <ssk-radio
                ${spread(args)}
                size=${sz}
                label="radio size ${sz}">
              </ssk-radio>
            `,
          )}
        </section>
      </main>`;
  },
  argTypes: {},
} satisfies Meta<RadioArgs>;

export default meta;

type Story = StoryObj<RadioArgs>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const ShowCase: Story = {
  args: {},
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=854-63034&mode=design",
    },
  },
};