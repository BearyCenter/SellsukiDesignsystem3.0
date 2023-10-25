import { spreadProps } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/divider";
import { Divider } from "../../../src/components/divider";
import { baseArgsTypes } from "../helper";

type DividerArgs = {} & Omit<Divider, "level">;

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
        <section class="horizontal">
          <ssk-divider
            ${spreadProps(args)}
            orientation="horizontal"
            size="xs"
          ></ssk-divider>
          <ssk-divider
            ${spreadProps(args)}
            orientation="horizontal"
            size="sm"
          ></ssk-divider>
          <ssk-divider
            ${spreadProps(args)}
            orientation="horizontal"
            size="md"
          ></ssk-divider>
          <ssk-divider
            ${spreadProps(args)}
            orientation="horizontal"
            size="lg"
          ></ssk-divider>
          <ssk-divider
            ${spreadProps(args)}
            orientation="horizontal"
            size="xl"
          ></ssk-divider>
          <ssk-divider
            ${spreadProps(args)}
            orientation="horizontal"
            size="2xl"
          ></ssk-divider>
          <ssk-divider
            ${spreadProps(args)}
            orientation="horizontal"
            size="3xl"
          ></ssk-divider>
          <ssk-divider
            ${spreadProps(args)}
            orientation="horizontal"
            size="4xl"
          ></ssk-divider>
        </section>
        <section class="vertical">
          <ssk-divider
            ${spreadProps(args)}
            orientation="vertical"
            size="xs"
          ></ssk-divider>
          <ssk-divider
            ${spreadProps(args)}
            orientation="vertical"
            size="sm"
          ></ssk-divider>
          <ssk-divider
            ${spreadProps(args)}
            orientation="vertical"
            size="md"
          ></ssk-divider>
          <ssk-divider
            ${spreadProps(args)}
            orientation="vertical"
            size="lg"
          ></ssk-divider>
          <ssk-divider
            ${spreadProps(args)}
            orientation="vertical"
            size="xl"
          ></ssk-divider>
          <ssk-divider
            ${spreadProps(args)}
            orientation="vertical"
            size="2xl"
          ></ssk-divider>
          <ssk-divider
            ${spreadProps(args)}
            orientation="vertical"
            size="3xl"
          ></ssk-divider>
          <ssk-divider
            ${spreadProps(args)}
            orientation="vertical"
            size="4xl"
          ></ssk-divider>
        </section>
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
