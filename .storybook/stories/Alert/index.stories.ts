import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/alert";
import { Alert } from "../../../src/elements/alert";
import { baseArgsTypes } from "../helper";

type AlertArgs = {} & Alert;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Alert",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-alert ${spread(args)}
      ><ssk-icon
        name="outline-information-circle"
        themeColor="${args.type}"
        slot="icon-slot"
      ></ssk-icon
    ></ssk-alert>`;
  },
  argTypes: {
    ...baseArgsTypes,
  },
} satisfies Meta<AlertArgs>;

export default meta;

type Story = StoryObj<AlertArgs>;

export const Default: Story = {
  args: {
    type: "default",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=6658-7777&mode=design&t=qckIvE75lPnkGzw0-4",
    },
  },
};
