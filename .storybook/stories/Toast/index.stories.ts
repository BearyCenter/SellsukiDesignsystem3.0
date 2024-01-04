import { action } from "@storybook/addon-actions";
import { html } from "lit";
import "../../../src/components/toast";

export default {
  title: "Example/Toast",
  component: "ssk-toast",
  argTypes: {
    testId: { control: "text" },
    width: { control: "text" },
    hidden: { control: "boolean" },
    hideCloseButton: { control: "boolean" },
    heading: { control: "text" },
    content: { control: "text" },
    type: {
      options: ["success", "error", "warning", "info"],
      control: {
        type: "select",
      },
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=882%3A60391&mode=dev",
    },
  },
};

const Template = ({
  testId,
  width,
  hidden,
  hideCloseButton,
  heading,
  content,
  type,
}) => html`
  <style>
    .background {
      background-color: rgba(0, 0, 0, 0.2);
      padding: 20px;
    }
  </style>
  <div class="background">
    <ssk-toast
      .testId=${testId}
      .width=${width}
      .hidden=${hidden}
      .hideCloseButton=${hideCloseButton}
      .heading=${heading}
      .content=${content}
      .type=${type}
      @close=${action("close")}
    ></ssk-toast>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  testId: "default-toast",
  hidden: false,
  hideCloseButton: false,
  heading: "Default Toast",
  content: "This is a default toast message.",
  type: "info",
};

export const Success = Template.bind({});
Success.args = {
  ...Default.args,
  testId: "success-toast",
  heading: "Success Toast",
  content: "This is a success toast message.",
  type: "success",
};

export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  testId: "error-toast",
  heading: "Error Toast",
  content: "This is an error toast message.",
  type: "error",
};

export const Warning = Template.bind({});
Warning.args = {
  ...Default.args,
  testId: "warning-toast",
  heading: "Warning Toast",
  content: "This is a warning toast message.",
  type: "warning",
};

export const Hidden = Template.bind({});
Hidden.args = {
  ...Default.args,
  testId: "hidden-toast",
  hidden: true,
};

export const NoCloseButton = Template.bind({});
NoCloseButton.args = {
  ...Default.args,
  testId: "no-close-button-toast",
  hideCloseButton: true,
};
