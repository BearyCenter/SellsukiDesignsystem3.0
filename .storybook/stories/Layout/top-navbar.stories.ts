import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/layout/top-navbar";
import { TopNavbar } from "../../../src/elements/layout/top-navbar";
import "../../../src/elements/icon";
import { baseArgsTypes } from "../helper";

type TopNavbarArgs = {} & TopNavbar;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Layout/TopNavbar",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-top-navbar
      leftIconSrc="${args.leftImgSrc}"
      rightIconSrc="${args.rightImgSrc}"
      ${spread(args)}
    >
      <ssk-icon
        name="outline-bars-3-center-left"
        size="sm"
        slot="left-icons"
      ></ssk-icon>
      <ssk-icon name="outline-bell" size="sm" slot="right-icons"></ssk-icon>
      <ssk-icon
        name="solid-squares-2x2"
        size="sm"
        slot="right-icons"
      ></ssk-icon>
    </ssk-top-navbar>`;
  },
  argTypes: {
    ...baseArgsTypes,
    leftImgSrc: { control: "text" },
    rightImgSrc: { control: "text" },
  },
} satisfies Meta<TopNavbarArgs>;

export default meta;

type Story = StoryObj<TopNavbarArgs>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Default: Story = {
  args: {
    leftImgSrc: "https://placehold.co/80x40",
    rightImgSrc: "https://placeholder.com/40x40",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1207-74259&mode=design&t=MziV72cf9HzxkHHr-0",
    },
  },
};
