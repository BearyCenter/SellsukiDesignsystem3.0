import { spreadProps } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/icon";
import * as Icons from "../../../src/components/icon";
import { baseArgsTypes } from "../helper.ts";

type IconArgs = {
  icon: keyof typeof Icons;
} & Icons.IconOutlineAcademicCap;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Icon",
  tags: ["autodocs"],
  render: ({ icon, ...args }) => {
    const spreadedArgs = spreadProps(args);

    return html`<style>
        main {
          width: 100%;
          display: flex;
          flex-flow: row wrap;
          gap: 1rem;
        }

        .icon-card {
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          gap: 0.5rem;
          max-width: 10rem;
        }
      </style>
      <main>${icon}</main>`;
  },
  argTypes: {
    ...baseArgsTypes,

    icon: {
      options: Object.values(Icons),
      control: {
        type: "select",
      },
    },
  },
} satisfies Meta<IconArgs>;

export default meta;

type Story = StoryObj<IconArgs>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    size: "lg",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1103%3A78477",
    },
  },
};
