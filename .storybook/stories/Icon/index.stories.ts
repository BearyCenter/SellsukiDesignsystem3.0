import { spreadProps } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/icon/icon-outline-academic-cap.ts";
import { IconOutlineAcademicCap } from "../../../src/components/icon/icon-outline-academic-cap.ts";
import { baseArgsTypes } from "../helper.ts";

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Icon",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-icon-outline-academic-cap
      ${spreadProps(args)}
    ></ssk-icon-outline-academic-cap>`;
  },
  argTypes: {
    ...baseArgsTypes,

    onClick: {
      action: "onClick",
    },
  },
} satisfies Meta<IconOutlineAcademicCap>;

export default meta;

type Story = StoryObj<IconOutlineAcademicCap>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    size: "md",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1103%3A78477",
    },
  },
};
