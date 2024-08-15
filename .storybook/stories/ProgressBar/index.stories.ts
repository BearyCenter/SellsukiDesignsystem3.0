import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/modal";
import { Modal } from "../../../src/components/modal";
import "../../../src/elements/button";
import "../../../src/elements/icon";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type ProgressBarWithLabel = AutoLitProperty<Modal> & { label: string };

const meta: Meta<ProgressBarWithLabel> = {
  title: "Example/ProgressBar",
  tags: ["autodocs"],
  render: ({ label, ...args }) => {
    return html`
      <p>hi</p>
      <ssk-progress-bar 
      >
      </ssk-progress-bar>
    `;
  },
  argTypes: {
    ...baseArgsTypes, // Assuming you have a baseArgsTypes definition
  },
};

export default meta;

type Story = StoryObj<ProgressBarWithLabel>;

export const BasicProgress: Story = {
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
