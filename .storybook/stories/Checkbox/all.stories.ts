import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/checkbox";
import { Checkbox } from "../../../src/elements/checkbox";

type DividerArgs = {} & Omit<Checkbox, "level">;
const size: Checkbox["size"][] = ["xs", "sm", "md", "lg", "xl"];

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Checkbox",
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
        <section class="show-size">
          ${size.map(
            (sz) => html`
              <ssk-checkbox
                ${spread(args)}
                size=${sz}
                label="Checkbox size ${sz}"
              >
              </ssk-checkbox>
            `
          )}
        </section>
        <section class="show-case">
          <ssk-checkbox
            ${spread(args)}
            disabled="true"
            label="Checkbox disabled"
          >
          </ssk-checkbox>
          <ssk-checkbox ${spread(args)} checked="true" label="Checkbox checked">
          </ssk-checkbox>
          <ssk-checkbox
            ${spread(args)}
            disabled="true"
            checked="true"
            label="Checkbox checked disabled"
          >
          </ssk-checkbox>
        </section>
      </main>`;
  },
  argTypes: {},
} satisfies Meta<DividerArgs>;

export default meta;

type Story = StoryObj<DividerArgs>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const ShowCase: Story = {
  args: {},
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1084-66941",
    },
  },
};
