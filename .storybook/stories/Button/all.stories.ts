import { spreadProps } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/button";
import { Button } from "../../../src/components/button";
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
    disabled: false,
    loading: false,
  },
  {
    disabled: false,
    loading: true,
  },
  {
    disabled: true,
    loading: false,
  },
  {
    disabled: true,
    loading: true,
  },
];
const size: Button["size"][] = ["xl", "lg", "md", "sm", "xs"];

const meta = {
  title: "Example/Button",
  tags: [],
  render: ({ label, ...args }) => {
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
                    ${spreadProps({ ...args, ...s, size: sz })}
                    variant=${v}
                    >${label}</ssk-button
                  >`
                )
              )}
            </div>
          </section>`
        )}
      </main>`;
  },
  argTypes: {
    label: {
      description: "The content of the button",
      control: "text",
    },

    hidden: {
      control: {
        type: "boolean",
      },
    },
    onClick: {
      action: "onClick",
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
