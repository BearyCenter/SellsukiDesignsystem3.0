import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/input";
import { Input } from "../../../src/elements/input";
import { baseArgsTypes } from "../helper";

type InputWithLabel = Omit<Input, "disabled" | "size"> & {
  label: string;
};

const size: Input["size"][] = ["lg", "md", "sm"];

const meta = {
  title: "Example/Input",
  tags: [],
  render: ({ ...args }) => {
    return html`<style>
        main.showcase {
          display: flex;
          justify-content: space-between;
          align-items: start;
          gap: 2rem;
          flex-flow: column wrap;
        }

        section.size {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        div.row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5em;
        }
      </style>
      <main class="showcase">
        ${size.map(
          (s) => html`<section class="size">
            <label>Size: ${s}</label>
            <div class="row">
              <ssk-input
                testId=${`input-${s}`}
                ${spread({ ...args })}
                size=${s}
              ></ssk-input>
              <ssk-input
                testId=${`input-${s}-disabled`}
                ${spread({ ...args })}
                size=${s}
                disabled
              ></ssk-input>
              <ssk-input
                testId=${`input-${s}-error`}
                ${spread({ ...args })}
                size=${s}
                error
              ></ssk-input>
            </div>
          </section>`
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
    value: {
      description: "",
      control: "text",
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
    value: "",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=806-59103&mode=design&t=PKQdplu46xZs3gqY-0",
    },
  },
};
