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
  tags: ["autodocs"],
  render: ({ label, ...args }) => {
    return html`
      <ssk-modal ${spread(args)}>
        <div slot="header">${label}</div>
        <div slot="body">Modal Content Goes Here</div>
        <div slot="footer">
          <ssk-button slot="footer" @click=${args["@close"]}>
            Close
          </ssk-button>
        </div>
        <div slot="footer">
          <ssk-button slot="footer" @click=${args["@close"]}>
            Save Changes
          </ssk-button>
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
    "?hideCloseButton": {
      description: "Hide button top close",
      control: "boolean",
      table: {
        category: "Props",
      },
    },
    "?show": {
      description: "Whether the modal is initially show",
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
    "?show": true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1253-75169&mode=design&t=pTwjadNPUzRZF6jG-0",
    },
  },
};

export const GridModal: Story = {
  args: {
    label: "Example Modal",
    width: "500px",
    "?show": true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1253-75169&mode=design&t=pTwjadNPUzRZF6jG-0",
    },
  },
  render: ({ label, ...args }) => {
    return html`
      <style>
        ssk-modal {
          --footer-display: grid;
          --footer-justify-content: normal;
        }
      </style>
      <ssk-modal ${spread(args)}>
        <div slot="header">${label}</div>
        <div slot="body">Modal Content Goes Here</div>
        <div slot="footer">
          <ssk-button width="full" @click=${args["@close"]}> Close </ssk-button>
        </div>
        <div slot="footer">
          <ssk-button width="full" @click=${args["@close"]}>
            Save Changes
          </ssk-button>
        </div>
      </ssk-modal>
    `;
  },
};
