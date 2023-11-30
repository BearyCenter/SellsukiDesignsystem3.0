import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/group-menu";
import { GroupMenu } from "../../../src/elements/group-menu";
import { baseArgsTypes } from "../helper";

type GroupMenuArgs = {} & GroupMenu;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/GroupMenu",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-group-menu ${spread(args)}></ssk-group-menu>`;
  },
  argTypes: {
    ...baseArgsTypes,
  },
} satisfies Meta<GroupMenuArgs>;

export default meta;

type Story = StoryObj<GroupMenuArgs>;

export const Default: Story = {
  args: {
    items: [
      { label: "Item 1", onClick: () => console.log("Item 1 clicked") },
      { label: "Item 2", onClick: () => console.log("Item 2 clicked") },
    ],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1263-77181&mode=design&t=NfmaX8E7GKhqRbxg-0",
    },
  },
};
