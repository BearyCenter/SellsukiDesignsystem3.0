import { spreadProps } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/checkbox";
import { Checkbox } from "../../../src/elements/checkbox";
import { baseArgsTypes } from "../helper";

type CheckboxArgs = {} & Omit<Checkbox, "level">;

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
        <section class="horizontal">
          <ssk-checkbox
            ${spreadProps(args)}
            orientation="horizontal"
            size="xs"
          ></ssk-checkbox>
          <ssk-checkbox
            ${spreadProps(args)}
            orientation="horizontal"
            size="sm"
          ></ssk-checkbox>
          <ssk-checkbox
            ${spreadProps(args)}
            orientation="horizontal"
            size="md"
          ></ssk-checkbox>
          <ssk-checkbox
            ${spreadProps(args)}
            orientation="horizontal"
            size="lg"
          ></ssk-checkbox>
          <ssk-checkbox
            ${spreadProps(args)}
            orientation="horizontal"
            size="xl"
          ></ssk-checkbox>
          <ssk-checkbox
            ${spreadProps(args)}
            orientation="horizontal"
            size="2xl"
          ></ssk-checkbox>
          <ssk-checkbox
            ${spreadProps(args)}
            orientation="horizontal"
            size="3xl"
          ></ssk-checkbox>
          <ssk-checkbox
            ${spreadProps(args)}
            orientation="horizontal"
            size="4xl"
          ></ssk-checkbox>
        </section>
        <section class="vertical">
          <ssk-checkbox
            ${spreadProps(args)}
            orientation="vertical"
            size="xs"
          ></ssk-checkbox>
          <ssk-checkbox
            ${spreadProps(args)}
            orientation="vertical"
            size="sm"
          ></ssk-checkbox>
          <ssk-checkbox
            ${spreadProps(args)}
            orientation="vertical"
            size="md"
          ></ssk-checkbox>
          <ssk-checkbox
            ${spreadProps(args)}
            orientation="vertical"
            size="lg"
          ></ssk-checkbox>
          <ssk-checkbox
            ${spreadProps(args)}
            orientation="vertical"
            size="xl"
          ></ssk-checkbox>
          <ssk-checkbox
            ${spreadProps(args)}
            orientation="vertical"
            size="2xl"
          ></ssk-checkbox>
          <ssk-checkbox
            ${spreadProps(args)}
            orientation="vertical"
            size="3xl"
          ></ssk-checkbox>
          <ssk-checkbox
            ${spreadProps(args)}
            orientation="vertical"
            size="4xl"
          ></ssk-checkbox>
        </section>
      </main>`;
  },
  argTypes: {
    ...baseArgsTypes,
  },
} satisfies Meta<CheckboxArgs>;

export default meta;

type Story = StoryObj<CheckboxArgs>;

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
