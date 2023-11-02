import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/button";
import { Button } from "../../../src/elements/button";
import { baseArgsTypes } from "../helper";

type ButtonWithLabel = Omit<
  Button,
  "variant" | "disabled" | "loading" | "size"
> & {
  label: string;
};

const variant: Button["variant"][] = ["solid", "outline", "ghost"];
const state = [
  {
    "?disabled": true,
  },
  {
    "?disabled": false,
  },
];
const size: Button["size"][] = ["xl", "lg", "md", "sm", "xs"];

const meta = {
  title: "Example/Button",
  tags: [],
  render: ({ label, click, ...args }) => {
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
        ${variant.map(
          (v) => html`<section>
            <div class="container">
              ${size.map((sz) =>
                state.map(
                  (s) => html`<ssk-button
                    testId=${`button-${v}-${sz}-${s["?disabled"]}`}
                    ${spread({ ...args, ...s, size: sz })}
                    variant=${v}
                    >${label}</ssk-button
                  >`,
                ),
              )}
            </div>
          </section>`,
        )}
      </main>`;
  },
  argTypes: {
    label: {
      description: "The content of the button",
      control: "text",
    },
    ...baseArgsTypes,
  },
} satisfies Meta<ButtonWithLabel>;

export default meta;

type Story = StoryObj<ButtonWithLabel>;

export const ShowCase: Story = {
  args: {
    themeColor: "primary",
    label: "Button",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1103%3A78477",
    },
  },
};
