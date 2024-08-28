import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/download-file";
import "../../../src/elements/icon";
import "../../../src/components/progress-bar"
import { DownloadFile } from "../../../src/components/download-file";
import { AutoLitProperty, baseArgsTypes, genericEvents } from "../helper";

type DownloadFileWithLabel = AutoLitProperty<DownloadFile> & { label: string };

const meta: Meta<DownloadFileWithLabel> = {
  title: "Example/DownloadFile",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-download-file  ${spread(args)}
      ><ssk-icon
        name="outline-ellipsis-horizontal-circle"
        slot="icon-slot-prefix"
      ></ssk-icon>
      <div slot="label-name">
        <span>File Name</span>
      </div>
      <ssk-icon
        name="outline-ellipsis-horizontal-circle"
        slot="icon-slot-postfix"
        size="xs"
      ></ssk-icon>
      <div slot="footer">
        <ssk-progress-bar
          label="Loading Data..."
          size="sm"
          value="60"
        ></ssk-progress-bar>
      </div>
    </ssk-download-file>
    `;
  },
  argTypes: {
    size: {
      options: ['md', 'lg'],
      control: { type: 'select' },
      description: 'Size of the download file'
    },
    "?hideCloseButton": {
      description: "Hide button top close",
      control: "boolean",
      table: {
        category: "Props",
      },
    },
    "@click": genericEvents["@click"],
  },
};

export default meta;

type Story = StoryObj<DownloadFileWithLabel>;

export const DefaultMedium: Story = {
  args: {
    size: "md",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15545-18216&m=dev",
    },
  },
};

export const SizeLG: Story = {
  args: {
    size: "lg",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15545-18216&m=dev",
    },
  },
  render: ({ ...args }) => {
    return html`<ssk-download-file  ${spread(args)}
      ><ssk-icon
        name="outline-ellipsis-horizontal-circle"
        slot="icon-slot-prefix"
      ></ssk-icon>
      <div slot="label-name">
        <span>File Name LG</span>
      </div>
      <ssk-icon
        name="outline-ellipsis-horizontal-circle"
        slot="icon-slot-postfix"
        size="md"
      ></ssk-icon>
      <div slot="footer">
        <ssk-progress-bar
          label="Loading Data..."
          size="sm"
          value="60"
          status="in-progress"
          styleOfProgress="icon"
        ></ssk-progress-bar>
      </div>
    </ssk-download-file>
    `;
  },
};
export const DownloadDone: Story = {
  args: {
    size: "md",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15545-18216&m=dev",
    },
  },
  render: ({ ...args }) => {
    return html`<ssk-download-file  ${spread(args)}
      ><ssk-icon
        name="outline-ellipsis-horizontal-circle"
        slot="icon-slot-prefix"
      ></ssk-icon>
      <div slot="label-name">
        <span>File Name</span>
      </div>
      <ssk-icon
        name="outline-ellipsis-horizontal-circle"
        slot="icon-slot-postfix"
        size="xs"
      ></ssk-icon>
      <div slot="footer">
        <ssk-progress-bar
          label="Completed"
          size="sm"
          value="100"
          status="success"
          styleOfProgress="icon"
        ></ssk-progress-bar>
      </div>
    </ssk-download-file>
    `;
  },
};
export const DownloadProcessing: Story = {
  args: {
    size: "md",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15545-18216&m=dev",
    },
  },
  render: ({ ...args }) => {
    return html`<ssk-download-file  ${spread(args)}
      ><ssk-icon
        name="outline-ellipsis-horizontal-circle"
        slot="icon-slot-prefix"
      ></ssk-icon>
      <div slot="label-name">
        <span>FileName.xlsx</span>
      </div>
      <ssk-icon
        name="outline-pause"
        slot="icon-slot-postfix"
        size="xs"
      ></ssk-icon>
      <div slot="footer">
        <ssk-progress-bar
          label="Loading Data..."
          size="sm"
          status="in-progress"
          value="60"
        ></ssk-progress-bar>
      </div>
    </ssk-download-file>
    `;
  },
};
export const DownloadError: Story = {
  args: {
    size: "md",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15545-18216&m=dev",
    },
  },
  render: ({ ...args }) => {
    return html`<ssk-download-file  ${spread(args)}
      ><ssk-icon
        name="outline-ellipsis-horizontal-circle"
        slot="icon-slot-prefix"
      ></ssk-icon>
      <div slot="label-name">
        <span>FILE_NAME.xlsx</span>
      </div>
      <ssk-icon
        name="outline-arrow-path"
        slot="icon-slot-postfix"
        size="xs"
      ></ssk-icon>
      <div slot="footer">
        <ssk-progress-bar
          label="Download fail"
          size="sm"
          status="error"
          value="58"
          styleOfProgress="icon"
          color="error"
        ></ssk-progress-bar>
      </div>
    </ssk-download-file>
    `;
  },
};
