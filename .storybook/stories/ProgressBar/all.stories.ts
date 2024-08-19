import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/progress-bar";
import { ProgressBar } from "../../../src/elements/progress-bar";
import "../../../src/elements/button";
import "../../../src/elements/icon";
import { AutoLitProperty } from "../helper";

type ProgressBarWithLabel = AutoLitProperty<ProgressBar> & { label: string };

const meta = {
  title: "Example/ProgressBar",
  tags: ["autodocs"],
  render: (args) => html`
    <ssk-progress-bar
      size=${args.size}
      progress=${args.progress}
      labelPosition=${args.labelPosition}
      status=${args.status}
      styleOfProgress=${args.styleOfProgress}
    ></ssk-progress-bar>
  `,
  argTypes: {
    size: {
      control: { type: 'select', options: ['sm', 'md', 'lg'] }, // Adjust options as needed
      description: 'Size of the progress bar'
    },
    progress: {
      control: { type: 'number' },
      description: 'Progress percentage (0-100)'
    },
    labelPosition: {
      options: ['top', 'bottom', 'right'],
      control: {
        type: "select",
      },
      description: 'Position of the label relative to the progress bar'
    },
    status: {
      options: ['in-progress', 'error', 'success'],
      control: { type: 'select' },
      description: 'Current status of the progress bar'
    },
    styleOfProgress: {
      options: ['text', 'icon'],
      control: { type: 'select' },
      description: 'Style of the progress display'
    },
  },
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
