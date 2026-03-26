import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/button";
import "../../../src/elements/icon";
import "../../../src/elements/input";
import "../../../src/elements/top-navbar/index";
import { TopNavbar } from "../../../src/elements/top-navbar/index";
import { baseArgsTypes } from "../helper";

type TopNavbarArgs = {} & TopNavbar;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Components/Navigation/TopNavbar",
  tags: [],
  render: ({ ...args }) => {
    return html`
      <style>
        .item-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
      </style>
      <ssk-top-navbar ${spread(args)}>
        <div slot="left" class="item-container">
          <ssk-icon
            name="outline-bars-3-center-left"
            ${spread(args)}
          ></ssk-icon>

          <ssk-logo
            ${spread(args)}
            srcLogo="https://placehold.co/40x40"
            altLogo="demo brand"
            srcLogoName="https://placehold.co/70x40"
            altLogoName="demo brand name"
            fullLogo
          ></ssk-logo>
        </div>

        <ssk-input ${spread(args)} placeholder="Placeholder" value="">
          <ssk-icon
            ${spread({ ...args })}
            name="outline-magnifying-glass"
            slot="prefix"
          ></ssk-icon>
        </ssk-input>

        <div slot="right" class="item-container">
          <ssk-icon name="outline-bell" ${spread(args)}></ssk-icon>
          <ssk-icon name="solid-point-3x3" ${spread(args)}></ssk-icon>
          <ssk-avatar
            ${spread(args)}
            src="https://placehold.co/40x40"
            alt="demo avatar"
            shape="circle"
          ></ssk-avatar>
        </div>
      </ssk-top-navbar>
    `;
  },
  argTypes: {
    ...baseArgsTypes,
  },
} satisfies Meta<TopNavbarArgs>;

export default meta;

type Story = StoryObj<TopNavbarArgs>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const ShowCase: Story = {
  args: {},
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1207-74259&mode=design&t=MziV72cf9HzxkHHr-0",
    },
  },
};
