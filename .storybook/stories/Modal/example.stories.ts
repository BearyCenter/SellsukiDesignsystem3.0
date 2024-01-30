import { spread } from "@open-wc/lit-helpers";
import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/client-api";
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
    const [{}, updateArgs] = useArgs();

    return html`
      <style>
        .footer {
          padding: 16px;
          background-color: var(--background-color-footer);
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }
      </style>
      <ssk-button
        @click=${() => {
          updateArgs({ "?hidden": false });
        }}
      >
        Show Modal
      </ssk-button>
      <ssk-modal
        ${spread(args)}
        @close=${() => {
          updateArgs({ "?hidden": true });
          action("@close")(); // Triggering the @close event
        }}
      >
        <div slot="header">${label}</div>
        <div slot="body">Modal Content Goes Here</div>
        <div slot="footer" class="footer">
          <ssk-button
            @click=${() => {
              updateArgs({ "?hidden": true });
            }}
          >
            Close
          </ssk-button>
          <ssk-button
            @click=${() => {
              updateArgs({ "?hidden": true });
            }}
          >
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
    "?hidden": {
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

export const ExampleModal: Story = {
  args: {
    label: "Example Modal",
    width: "500px",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1253-75169&mode=design&t=pTwjadNPUzRZF6jG-0",
    },
  },
};
