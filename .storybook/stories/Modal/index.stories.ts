import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/modal";
import { Modal } from "../../../src/components/modal";
import "../../../src/elements/button";
import "../../../src/elements/icon";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type ModalWithLabel = AutoLitProperty<Modal> & { label: string };

const meta: Meta<ModalWithLabel> = {
  title: "Example/Modal",
  render: ({ label, ...args }) => {
    return html`
      <ssk-modal ${spread(args)}>
        <div slot="header">${label}</div>
        <div slot="body">Modal Content Goes Here</div>
        <div slot="footer">
          <ssk-button @click=${args["@close"]}> Close </ssk-button>
        </div>
      </ssk-modal>
    `;
  },
  argTypes: {
    label: {
      description: "The header content of the modal",
      control: "text",
      table: {
        category: "Props",
      },
    },
    width: {
      description: "The width of the modal",
      control: "text",
      table: {
        category: "Props",
      },
    },
    hidden: {
      description: "Whether the modal is initially hidden",
      control: "boolean",
      table: {
        category: "Props",
      },
    },
    "@close": {
      description: "The event that is fired when the modal is closed",
      action: "@close",
      table: {
        category: "Events",
      },
    },
    testId: {
      description: "The test ID for the modal",
      control: "text",
      table: {
        category: "Props",
      },
    },
    ...baseArgsTypes, // Assuming you have a baseArgsTypes definition
  },
};

export default meta;

type Story = StoryObj<ModalWithLabel>;

export const BasicModal: Story = {
  args: {
    label: "Example Modal",
    width: "500px",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1253%3A77658&mode=dev",
    },
  },
};
