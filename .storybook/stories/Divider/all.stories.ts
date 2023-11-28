import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/divider";
import { Divider } from "../../../src/elements/divider";
import { baseArgsTypes } from "../helper";

type DividerArgs = {} & Omit<Divider, "level">;
const size: Divider["size"][] = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
];

const orientation: Divider["orientation"][] = ["horizontal", "vertical"];
// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Divider",
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
        ${orientation.map(
          (o) => html`<section class=${o}>
            ${size.map(
              (sz) => html`
                ${o === "horizontal"
                  ? html`<ssk-divider
                      ${spread(args)}
                      label="label"
                      orientation=${o}
                      size=${sz}
                    ></ssk-divider>`
                  : null}
                <ssk-divider ${spread(args)} orientation=${o} size=${sz}>
                </ssk-divider>
              `
            )}
          </section> `
        )}
      </main>`;
  },
  argTypes: {
    ...baseArgsTypes,
  },
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
