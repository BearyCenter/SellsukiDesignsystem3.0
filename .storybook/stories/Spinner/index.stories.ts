import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/spinner"; // import your spinner component
import { Spinner } from "../../../src/elements/spinner";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type SpinnerProps = AutoLitProperty<Spinner>;

const sizes = ["sm", "md", "lg"];

const meta = {
  title: "Components/Feedback & Loading/Spinner",
  tags: [],
  render: ({ ...args }) => {
    return html`
      <style>
        .spinner-grid {
          display: grid;
          grid-template-columns: repeat(3, auto);
          gap: 1rem;
          align-items: center;
        }
      </style>
      <div class="spinner-grid">
        ${sizes.map(
          (sz) =>
            html`<ssk-spinner
              testId="spinner--${sz}"
              ${spread({ ...args, size: sz })}
            ></ssk-spinner>`
        )}
      </div>
    `;
  },
  argTypes: {
    size: {
      control: "select",
      options: sizes,
      description: "Size of the spinner",
    },
    ...baseArgsTypes,
  },
} satisfies Meta<SpinnerProps>;

export default meta;

type Story = StoryObj<SpinnerProps>;

export const ShowCase: Story = {
  args: {
    size: "md",
    ".color": "primary",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=8367-55638&t=7SJJONT3t5M9fpM2-0",
    },
  },
};
