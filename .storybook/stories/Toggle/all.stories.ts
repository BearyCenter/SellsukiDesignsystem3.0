import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import { Toggle } from "../../../src/elements/toggle";
import "../../../src/elements/toggle";
import { baseArgsTypes } from "../helper";

type ToggleArgs = {} & Toggle;

const state = [
  {
    "?disabled": true,
  },
  {
    "?disabled": false,
  },
];

const checked = [
  {
    "?checked": true,
  },
  {
    "?checked": false,
  },
];
const size: Toggle["size"][] = ["xl", "lg", "md", "sm", "xs"];

const meta = {
  title: "Example/Toggle",
  tags: [],
  render: ({ click, ...args }) => {
    return html` <style>
        main {
          display: flex;
          justify-content: space-between;
          align-items: center;
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
          grid-template-columns: repeat(${state.length}, auto);
          gap: 0.5em;
        }
      </style>
      <main>
        <section>
          <div class="container">
            ${checked.map(
              (v) => html`<section>
                <div class="container">
                  ${size.map((sz) =>
                    state.map(
                      (s) => html`<ssk-toggle
                        testId=${`button-${v}-${sz}-${s["?disabled"]}`}
                        ${spread({ ...args, ...s, ...v, size: sz })}
                      ></ssk-toggle>`,
                    ),
                  )}
                </div>
              </section>`,
            )}
          </div>
        </section>
        ,
      </main>`;
  },
  argTypes: {
    ...baseArgsTypes,
  },
} satisfies Meta<ToggleArgs>;

export default meta;

type Story = StoryObj<ToggleArgs>;

export const ShowCase: Story = {
  args: {
    themeColor: "primary",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=878%3A60282&mode=design&t=pVpeabGs2Rg87lde-1",
    },
  },
};
