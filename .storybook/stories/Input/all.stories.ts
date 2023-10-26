import { spreadProps } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/input";
import { Input } from "../../../src/elements/input";
import { baseArgsTypes } from "../helper";

type InputWithLabel = Omit<Input, "disabled" | "size"> & {
  label: string;
};

const size: Input["size"][] = ["xl", "lg", "md", "sm", "xs"];

const meta = {
  title: "Example/Input",
  tags: [],
  render: ({ ...args }) => {
    return html` <style>
        main {
          display: flex;
          justify-content: space-between;
          align-items: start;
          gap: 2rem;
          flex-flow: column wrap;
        }

        section {
          display: flex;
          flex-direction: column;
        }

        div {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5em;
        }
      </style>
      <main>
        ${size.map(
          (s) => html`<section>
            <label>Size: ${s}</label>
            <div>
              <ssk-input
                testId=${`input-${s}`}
                ${spreadProps({ ...args })}
                size=${s}
              ></ssk-input>
              <ssk-input
                testId=${`input-${s}-disabled`}
                ${spreadProps({ ...args })}
                size=${s}
                disabled
              ></ssk-input>
            </div>
          </section>`,
        )}
      </main>`;
  },
  argTypes: {
    label: {
      description: "The content of the input",
      control: "text",
    },
    helperText: {
      description: "",
      control: "text",
    },

    hidden: {
      control: {
        type: "boolean",
      },
    },
    onChange: {
      action: "onChange",
    },
    ...baseArgsTypes,
  },
} satisfies Meta<InputWithLabel>;

export default meta;

type Story = StoryObj<InputWithLabel>;

export const ShowCase: Story = {
  args: {
    themeColor: "primary",
    label: "Input",
    placeholder: "Placeholder",
    helperText: "Helper text",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1123-65244",
    },
  },
};
