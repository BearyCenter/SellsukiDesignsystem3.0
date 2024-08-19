import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/modal";
import "../../../src/elements/progress-bar";
import { ProgressBar } from "../../../src/elements/progress-bar";
import "../../../src/elements/icon";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type ProgressBarWithLabel = AutoLitProperty<ProgressBar> & { label: string };

const meta: Meta<ProgressBarWithLabel> = {
  title: "Example/ProgressBar",
  tags: ["autodocs"],
  render: ({ label, ...args }) => {
    return html`
      <ssk-progress-bar 
      ${spread({ ...args })}
      >
      </ssk-progress-bar>
    `;
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Progress label'
    },
    size: {
      options: ['sm', 'md'],
      control: { type: 'select' },
      description: 'Size of the progress bar'
    },
    value: {
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
};

export default meta;

type Story = StoryObj<ProgressBarWithLabel>;

export const DefaultProgress: Story = {
  args: {
    label: "Loading Data...",
    size: "md",
    value: 0,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=10732-22494&t=81k7fClxUSUgePbF-0",
    },
  },
};
