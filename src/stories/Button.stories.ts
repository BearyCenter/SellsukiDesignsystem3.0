import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../my-element";
import type { ButtonProps } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Button",
  tags: ["autodocs"],
  render: (args) => html`<my-element></my-element>`,
  argTypes: {
    backgroundColor: { control: "color" },
    onClick: { action: "onClick" },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },

  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File",
    },
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File",
    },
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File",
    },
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File",
    },
  },
};
