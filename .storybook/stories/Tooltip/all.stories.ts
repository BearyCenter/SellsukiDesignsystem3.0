import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import { Tooltip } from "../../../src/elements/tooltip";
import "../../../src/elements/tooltip";
import { baseArgsTypes } from "../helper";

type TooltipArgs = {} & Tooltip;

const size: Tooltip["size"][] = ["xl", "lg", "md", "sm", "xs"];

const meta = {
  title: "Example/Tooltip",
  tags: [],
  render: ({ click, ...args }) => {
    return html``;
  },
  argTypes: {
    ...baseArgsTypes,
  },
} satisfies Meta<TooltipArgs>;

export default meta;

type Story = StoryObj<TooltipArgs>;

export const ShowCase: Story = {
  args: {
    themeColor: "primary",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=878%3A60282&mode=design&t=pVpeabGs2Rg87lde-1",
    },
  },
};
