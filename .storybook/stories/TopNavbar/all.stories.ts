import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import "../../../src/elements/top-navbar/index";
import { TopNavbar } from "../../../src/elements/top-navbar/index";
import "../../../src/elements/icon";
import { baseArgsTypes } from "../helper";

type TopNavbarArgs = {} & TopNavbar;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/TopNavbar",
  tags: [],
  render: ({ level, leftImgSrc, rightImgSrc, ...args }) => {
    return html`<ssk-top-navbar
        .leftImgSrc=${leftImgSrc}
        .rightImgSrc=${rightImgSrc}
        ${spread(args)}
      >
        <ssk-icon
          name="outline-bars-3-center-left"
          ${spread(args)}
          slot="left-col"
        ></ssk-icon>
        <ssk-icon
          name="outline-bell"
          ${spread(args)}
          slot="right-col"
        ></ssk-icon>
        <ssk-icon
          name="solid-squares-2x2"
          ${spread(args)}
          slot="right-col"
        ></ssk-icon>
      </ssk-top-navbar>
      <ssk-top-navbar .leftImgSrc=${leftImgSrc} ${spread(args)}>
        <ssk-icon
          name="outline-bars-3-center-left"
          ${spread(args)}
          slot="left-col"
        ></ssk-icon>

        <ssk-button ${spread(args)} slot="right-col" variant="outline"
          ><ssk-icon
            name="outline-ellipsis-horizontal-circle"
            ${spread(args)}
          ></ssk-icon>
          Sign in</ssk-button
        >
        <ssk-button ${spread(args)} slot="right-col"
          ><ssk-icon
            name="solid-ellipsis-horizontal-circle"
            ${spread(args)}
          ></ssk-icon>
          Sign up</ssk-button
        >
      </ssk-top-navbar> `;
  },
  argTypes: {
    type: {
      options: ["text", "hidden"],
      control: {
        type: "select",
      },
    },
    ...baseArgsTypes,
  },
} satisfies Meta<TopNavbarArgs>;

export default meta;

type Story = StoryObj<TopNavbarArgs>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const ShowCase: Story = {
  args: {
    placeholder: "Placeholder",
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
