import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/progress-bar";
import { ProgressBar } from "../../../src/components/progress-bar";
import "../../../src/elements/button";
import "../../../src/elements/icon";
import { AutoLitProperty } from "../helper";

type ProgressBarWithLabel = AutoLitProperty<ProgressBar> & { label: string };

const meta = {
  title: "Example/ProgressBar",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`
      <ssk-progress-bar ${spread({ ...args })}> </ssk-progress-bar>
    `;
  },

  argTypes: {},
} satisfies Meta<ProgressBarWithLabel>;

export default meta;

type Story = StoryObj<ProgressBarWithLabel>;

export const ExampleProgress: Story = {
  args: {
    label: "Example Progress",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1253-75169&mode=design&t=pTwjadNPUzRZF6jG-0",
    },
  },
};
