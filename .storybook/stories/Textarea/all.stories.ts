import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/textarea";
import { Textarea } from "../../../src/elements/textarea";
import { baseArgsTypes } from "../helper";

type TextareaWithLabel = Omit<Textarea, "disabled" | "size"> & {
  label: string;
};

const size: Textarea["size"][] = ["lg", "md", "sm"];

const meta = {
  title: "Example/Textarea",
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
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 3em;
        }
      </style>
      <main class="showcase">
        ${size.map(
          (s) => html`<section class="size">
            <label>Size: ${s}</label>
            <div class="row">
              <ssk-textarea
                testId=${`textarea-${s}`}
                ${spread({ ...args })}
                size=${s}
              ></ssk-textarea>
              <ssk-textarea
                testId=${`textarea-${s}-disabled`}
                ${spread({ ...args })}
                size=${s}
                disabled
              ></ssk-textarea>
              <ssk-textarea
                testId=${`textarea-${s}-error`}
                ${spread({ ...args })}
                size=${s}
                error
              ></ssk-textarea>
            </div>
          </section>`,
        )}
      </main>`;
  },
  argTypes: {
    label: {
      description: "The content of the textarea",
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
    limit: {
      description: "",
      control: "number",
    },
    error: {
      control: {
        type: "boolean",
      },
    },
    resize: {
      description: "The resize textarea",
      options: ["none", "both", "horizontal", "vertical"],
      control: {
        type: "select",
      },
    },
    ...baseArgsTypes,
  },
} satisfies Meta<TextareaWithLabel>;

export default meta;

type Story = StoryObj<TextareaWithLabel>;

export const ShowCase: Story = {
  args: {
    themeColor: "primary",
    label: "Textarea",
    placeholder: "Placeholder",
    helperText: "Helper text",
    value: "",
    limit: 69,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=806-59103&mode=design&t=PKQdplu46xZs3gqY-0",
    },
  },
};
