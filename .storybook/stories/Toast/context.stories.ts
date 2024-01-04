import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/toast";
import "../../../src/contexts/toast";
import { ToastData } from "../../../src/contexts/toast";
import "../../../src/elements/button";
import { AutoLitProperty } from "../helper";

type ToastWithLabel = AutoLitProperty<ToastData>;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Toast",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-button
        @click=${() => {
          window.__SSK_TOAST_STORE__.addToast(args);
        }}
      >
        Add toast
      </ssk-button>
      <ssk-button
        themeColor="danger"
        @click=${() => {
          window.__SSK_TOAST_STORE__.clearToasts();
        }}
      >
        Clear toast
      </ssk-button>`;
  },
  argTypes: {
    title: { control: "text" },
    message: { control: "text" },
    type: {
      options: ["success", "error", "warning", "info"],
      control: {
        type: "select",
      },
    },
    timeout: { control: "number" },
  },
} satisfies Meta<ToastWithLabel>;

export default meta;

type Story = StoryObj<ToastWithLabel>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const ContextToast: Story = {
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=882%3A60391&mode=dev",
    },
  },
  args: {
    title: "Heading",
    message: "Content",
    type: "info",
    timeout: 5000,
  },
};
