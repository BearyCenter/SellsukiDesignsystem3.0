import type { Meta, StoryObj } from "@storybook/web-components";
import { action } from "@storybook/addon-actions";
import { html } from "lit";
import "../../../src/components/toast";

interface ToastArgs {
  testId?: string;
  width?: string;
  hidden: boolean;
  hideCloseButton: boolean;
  heading?: string;
  content?: string;
  type: "success" | "error" | "warning" | "info";
}

const meta = {
  title: "Components/Overlay & Notification/Toast",
  tags: ["autodocs"],
  render: (args: ToastArgs) => html`
    <style>
      .background {
        background-color: rgba(0, 0, 0, 0.2);
        padding: 20px;
      }
    </style>
    <div class="background">
      <ssk-toast
        .testId=${args.testId}
        .width=${args.width}
        .hidden=${args.hidden}
        .hideCloseButton=${args.hideCloseButton}
        .heading=${args.heading}
        .content=${args.content}
        .type=${args.type}
        @close=${action("close")}
      ></ssk-toast>
    </div>
  `,
  argTypes: {
    testId:         { control: "text",    table: { category: "Props" } },
    width:          { control: "text",    table: { category: "Props" } },
    hidden:         { control: "boolean", table: { category: "Props" } },
    hideCloseButton:{ control: "boolean", table: { category: "Props" } },
    heading:        { control: "text",    table: { category: "Props" } },
    content:        { control: "text",    table: { category: "Props" } },
    type: {
      options: ["success", "error", "warning", "info"],
      control: { type: "select" },
      table: { category: "Props" },
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=882%3A60391&mode=dev",
    },
  },
} satisfies Meta<ToastArgs>;

export default meta;

type Story = StoryObj<ToastArgs>;

const baseArgs: ToastArgs = {
  testId:          "default-toast",
  hidden:          false,
  hideCloseButton: false,
  heading:         "Default Toast",
  content:         "This is a default toast message.",
  type:            "info",
};

export const Default: Story = {
  args: { ...baseArgs },
};

export const Success: Story = {
  args: { ...baseArgs, testId: "success-toast", heading: "Success Toast", content: "This is a success toast message.", type: "success" },
};

export const Error: Story = {
  args: { ...baseArgs, testId: "error-toast", heading: "Error Toast", content: "This is an error toast message.", type: "error" },
};

export const Warning: Story = {
  args: { ...baseArgs, testId: "warning-toast", heading: "Warning Toast", content: "This is a warning toast message.", type: "warning" },
};

export const Hidden: Story = {
  args: { ...baseArgs, testId: "hidden-toast", hidden: true },
};

export const NoCloseButton: Story = {
  args: { ...baseArgs, testId: "no-close-button-toast", hideCloseButton: true },
};
