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
  render: ({ ...args }) => {
    return html`<ssk-top-navbar ${spread(args)}>
        <ssk-icon
          name="outline-bars-3-center-left"
          ${spread(args)}
          slot="left-slot"
        ></ssk-icon>
        <ssk-logo
          ${spread(args)}
          srcLogo="https://placehold.co/40x40"
          altLogo="demo brand"
          srcName="https://placehold.co/70x40"
          altName="demo brand name"
          fullLogo
          slot="left-slot"
        ></ssk-logo>
        <ssk-input
          ${spread(args)}
          slot="center-slot"
          placeholder="Placeholder"
          value=""
        >
          <ssk-icon
            ${spread({ ...args })}
            name="outline-magnifying-glass"
            slot="prefix"
          ></ssk-icon>
        </ssk-input>
        <ssk-icon
          name="outline-bell"
          ${spread(args)}
          slot="right-slot"
        ></ssk-icon>
        <ssk-icon
          name="solid-squares-2x2"
          ${spread(args)}
          slot="right-slot"
        ></ssk-icon>
        <ssk-avatar
          ${spread(args)}
          slot="right-slot"
          src="https://placehold.co/70x40"
          alt="demo avatar"
          shape="circle"
        ></ssk-avatar>
      </ssk-top-navbar>

      <ssk-top-navbar ${spread(args)}>
        <ssk-icon
          name="outline-bars-3-center-left"
          ${spread(args)}
          slot="left-slot"
        ></ssk-icon>
        <ssk-logo
          ${spread(args)}
          srcLogo="https://placehold.co/40x40"
          altLogo="demo brand"
          srcName="https://placehold.co/40x40"
          altName="demo brand name"
          fullLogo
          slot="left-slot"
        ></ssk-logo>
        <ssk-input
          ${spread(args)}
          slot="center-slot"
          placeholder="Placeholder"
          value=""
        >
          <ssk-icon
            ${spread({ ...args })}
            name="outline-magnifying-glass"
            slot="prefix"
          ></ssk-icon>
        </ssk-input>
        <ssk-button ${spread(args)} slot="right-slot" variant="outline"
          ><ssk-icon
            name="outline-ellipsis-horizontal-circle"
            ${spread(args)}
          ></ssk-icon>
          Sign in</ssk-button
        >
        <ssk-button ${spread(args)} slot="right-slot"
          ><ssk-icon
            name="outline-ellipsis-horizontal-circle"
            ${spread(args)}
          ></ssk-icon>
          Sign up</ssk-button
        >
      </ssk-top-navbar> `;
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
