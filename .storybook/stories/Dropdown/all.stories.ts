import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/dropdown";
import { Dropdown } from "../../../src/components/dropdown";
import { baseArgsTypes } from "../helper";

type DropdownWithLabel = Omit<Dropdown, "disabled" | "size"> & {
  label: string;
};

const size: Dropdown["size"][] = ["lg", "md", "sm"];

const meta = {
  title: "Example/Dropdown",
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
              <ssk-dropdown
                testId=${`dropdown-${s}`}
                ${spread({ ...args })}
                size=${s}
              ></ssk-dropdown>
              <ssk-dropdown
                testId=${`dropdown-${s}-disabled`}
                ${spread({ ...args })}
                size=${s}
                disabled
              ></ssk-dropdown>
              <ssk-dropdown
                testId=${`dropdown-${s}-error`}
                ${spread({ ...args })}
                size=${s}
                error
              ></ssk-dropdown>
            </div>
          </section>`
        )}
      </main>`;
  },
  argTypes: {
    label: {
      description: "The content of the dropdown",
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
} satisfies Meta<DropdownWithLabel>;

export default meta;

type Story = StoryObj<DropdownWithLabel>;

export const ShowCase: Story = {
  args: {
    themeColor: "primary",
    label: "Dropdown",
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
