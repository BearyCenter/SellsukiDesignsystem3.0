import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/table";
import "../../../src/elements/tag";
import "../../../src/elements/text";
import "../../../src/elements/button";
import "../../../src/elements/icon";
import { Table } from "../../../src/components/table";
import { AutoLitProperty, baseArgsTypes, genericEvents } from "../helper";

type TableWithData = AutoLitProperty<Table>;

const meta = {
  title: "Example/Table",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html` <ssk-table ${spread({ ...args })}> </ssk-table> `;
  },

  argTypes: {
    ".headers": {
      description: "The Header of the table",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    ".itemValue": {
      description: "The bady data of the table",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    "?selectEnabled": {
      description: "When true gives the menu a active apparence",
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: {
          summary: "boolean",
        },
      },
      control: {
        type: "boolean",
      },
    },
    "?showFooter": {
      description: "When true gives the menu a active apparence",
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: {
          summary: "boolean",
        },
      },
      control: {
        type: "boolean",
      },
    },
    "?showRowPerPage":{
      description: "When true gives the menu a active apparence",
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: {
          summary: "boolean",
        },
      },
      control: {
        type: "boolean",
      },
    },
    "?showBtnPage":{
      description: "When true gives the menu a active apparence",
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: {
          summary: "boolean",
        },
      },
      control: {
        type: "boolean",
      },
    },
    "?showGoToPage":{
      description: "When true gives the menu a active apparence",
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: {
          summary: "boolean",
        },
      },
      control: {
        type: "boolean",
      },
    },
    "@click": genericEvents["@click"],
    ...baseArgsTypes,
  },
} satisfies Meta<TableWithData>;

export default meta;

type Story = StoryObj<TableWithData>;

export const Default: Story = {
  args: {
    ".headers": [
      {
        name: "name",
        text: "Name",
      },
      {
        name: "age",
        text: "Age",
      },
      {
        name: "email",
        text: "Email",
      },
    ],
    ".itemValue": [
      {
        name: "testData",
        age: "28",
        email: "testData@test.com",
      },
      {
        name: "Manapong",
        age: "25",
        email: "Manapongi@test.com",
      },
    ],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1145%3A69931&mode=dev",
    },
  },
};
export const TableWithHeader: Story = {
  args: {
    ".headers": [
      { text: "ID", name: "id" },
      { text: "Image", name: "image" },
      { text: "Product", name: "product" },
      { text: "Pricing", name: "price" },
      { text: "Payment", name: "payment" },
      { text: "Create Date", name: "date" },
      { text: "Status", name: "status" },
      { text: "", name: "copy" },
      { text: "button", name: "button" },
      { text: "", name: "action" },
    ],
    ".itemValue": [
      {
        id: "SSKU0011A",
        image: "img123",
        product: "SSK Pay",
        price: "1,000 THB",
        payment: "complete",
        date: "18/09/2023",
        status: "Active",
        copy: "a",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0012A",
        image: "img212",
        product: "LINE Official",
        price: "767 THB",
        payment: "pading",
        date: "06/05/2023",
        status: "Inactive",
        copy: "b",
        button: "Button",
        action: "icon",
      },
    ],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1145%3A69931&mode=dev",
    },
  },
  render: ({ ...args }) => {
    return html`
      <ssk-table ${spread({ ...args })}>
        <template id="header-id">
          <div style="display: flex; align-items: center;">
            {{text}}
            <ssk-icon name="outline-chevron-up-down" size="xs"></ssk-icon>
          </div>
        </template>
        <template id="header-price">
          <div style="display: flex; align-items: center;">
            {{text}}
            <ssk-icon name="outline-chevron-up-down" size="xs"></ssk-icon>
          </div>
        </template>
        <template id="header-date">
          <div style="display: flex; align-items: center;">
            {{text}}
            <ssk-icon name="outline-chevron-up-down" size="xs"></ssk-icon>
          </div>
        </template>
      </ssk-table>
    `;
  },
};

export const TableWithBody: Story = {
  args: {
    ".headers": [
      { text: "ID", name: "id" },
      { text: "Image", name: "image" },
      { text: "Product", name: "product" },
      { text: "Pricing", name: "price" },
      { text: "Payment", name: "payment" },
      { text: "Create Date", name: "date" },
      { text: "Status", name: "status" },
      { text: "", name: "copy" },
      { text: "button", name: "button" },
      { text: "", name: "action" },
    ],
    ".itemValue": [
      {
        id: "SSKU0011A",
        image: "img123",
        product: "SSK Pay",
        price: "1,000 THB",
        payment: "complete",
        date: "18/09/2023",
        status: "Active",
        copy: "",
        button: "Button1",
        action: "",
      },
      {
        id: "SSKU0011A4",
        image: "img",
        product: "SSK Pay",
        price: "1,000 THB",
        payment: "complete",
        date: "18/09/2023",
        status: "Active",
        copy: "",
        button: "Button2",
        action: "",
      },
      {
        id: "SSKU0012A5",
        image: "img2",
        product: "LINE Official",
        price: "767 THB",
        payment: "pading",
        date: "06/05/2023",
        status: "Inactive",
        copy: "",
        button: "Button3",
        action: "",
      },
      {
        id: "SSKU0011A6",
        image: "img",
        product: "SSK Pay",
        price: "1,000 THB",
        payment: "complete",
        date: "18/09/2023",
        status: "Active",
        copy: "",
        button: "Button4",
        action: "",
      },
      {
        id: "SSKU0012A7",
        image: "img2",
        product: "LINE Official",
        price: "767 THB",
        payment: "pading",
        date: "06/05/2023",
        status: "Inactive",
        copy: "",
        button: "Button5",
        action: "",
      },
      {
        id: "SSKU0012A",
        image: "img212",
        product: "LINE Official",
        price: "767 THB",
        payment: "pading",
        date: "06/05/2023",
        status: "Inactive",
        copy: "",
        button: "Button6",
        action: "",
      },
    ],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1145%3A69931&mode=dev",
    },
  },
  render: ({ ...args }) => {
    const { ".headers": headers, ".itemValue": itemValue } = args;
    return html`
      <ssk-table .headers="${headers}" .itemValue="${itemValue}">
        <template id="content-payment">
          <div style="display: flex; align-items: center;">
            <ssk-tag variant="subtle" size="md"
              ><ssk-icon size="xs" name="outline-sun"></ssk-icon
              >{{value}}</ssk-tag
            >
          </div>
        </template>
        <template id="content-copy">
          <div style="display: flex; align-items: center;">
            {{value}}
            <ssk-icon name="outline-document-duplicate" size="xs"></ssk-icon>
          </div>
        </template>
        <template id="content-action">
          <div style="display: flex; align-items: center;">
            {{value}}
            <ssk-icon name="outline-ellipsis-vertical" size="xs"></ssk-icon>
          </div>
        </template>
        <template id="content-button">
          <ssk-button
            padding="sm"
            variant="outline"
            slot="ok-button-slot"
          >
            <ssk-icon
                slot="prefix"
                size="sm"
                name="outline-ellipsis-horizontal-circle"
                size="md"
            ></ssk-icon>
            {{value}}
          </ssk-button>
        </template>
    `;
  },
};
export const TableWithSelect: Story = {
  args: {
    ".headers": [
      { text: "ID", name: "id" },
      { text: "Image", name: "image" },
      { text: "Product", name: "product" },
      { text: "Pricing", name: "price" },
      { text: "Payment", name: "payment" },
      { text: "Create Date", name: "date" },
      { text: "Status", name: "status" },
      { text: "", name: "copy" },
      { text: "button", name: "button" },
      { text: "", name: "action" },
    ],
    ".itemValue": [
      {
        id: "SSKU0011A",
        image: "img123",
        product: "SSK Pay",
        price: "1,000 THB",
        payment: "complete",
        date: "18/09/2023",
        status: "Active",
        copy: "a",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0012A",
        image: "img212",
        product: "LINE Official",
        price: "767 THB",
        payment: "pading",
        date: "06/05/2023",
        status: "Inactive",
        copy: "b",
        button: "Button",
        action: "icon",
      },
    ],
    "?selectEnabled": true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1145%3A69931&mode=dev",
    },
  },
  render: ({ ...args }) => {
    return html`
      <ssk-table ${spread({ ...args })}>
        <div slot="copy">
          <ssk-icon name="outline-document-duplicate" size="xs"></ssk-icon>
        </div>
        <div slot="copy2">
          <ssk-icon name="outline-document-duplicate" size="xs"></ssk-icon>
        </div>
      </ssk-table>
    `;
  },
};

export const TableWithFooter: Story = {
  args: {
    ".headers": [
      { text: "ID", name: "id" },
      { text: "Image", name: "image" },
      { text: "Product", name: "product" },
      { text: "Pricing", name: "price" },
      { text: "Payment", name: "payment" },
      { text: "Create Date", name: "date" },
      { text: "Status", name: "status" },
      { text: "", name: "copy" },
      { text: "button", name: "button" },
      { text: "", name: "action" },
    ],
    ".itemValue": [
      {
        id: "SSKU0011A0",
        image: "img",
        product: "SSK Pay",
        price: "1,000 THB",
        payment: "complete",
        date: "18/09/2023",
        status: "Active",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0012A1",
        image: "img2",
        product: "LINE Official",
        price: "767 THB",
        payment: "pading",
        date: "06/05/2023",
        status: "Inactive",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0011A2",
        image: "img",
        product: "SSK Pay",
        price: "1,000 THB",
        payment: "complete",
        date: "18/09/2023",
        status: "Active",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0012A3",
        image: "img2",
        product: "LINE Official",
        price: "767 THB",
        payment: "pading",
        date: "06/05/2023",
        status: "Inactive",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0011A4",
        image: "img",
        product: "SSK Pay",
        price: "1,000 THB",
        payment: "complete",
        date: "18/09/2023",
        status: "Active",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0012A5",
        image: "img2",
        product: "LINE Official",
        price: "767 THB",
        payment: "pading",
        date: "06/05/2023",
        status: "Inactive",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0011A6",
        image: "img",
        product: "SSK Pay",
        price: "1,000 THB",
        payment: "complete",
        date: "18/09/2023",
        status: "Active",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0012A7",
        image: "img2",
        product: "LINE Official",
        price: "767 THB",
        payment: "pading",
        date: "06/05/2023",
        status: "Inactive",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0011A8",
        image: "img",
        product: "SSK Pay",
        price: "1,000 THB",
        payment: "complete",
        date: "18/09/2023",
        status: "Active",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0012A9",
        image: "img2",
        product: "LINE Official",
        price: "767 THB",
        payment: "pading",
        date: "06/05/2023",
        status: "Inactive",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0011A10",
        image: "img",
        product: "SSK Pay",
        price: "1,000 THB",
        payment: "complete",
        date: "18/09/2023",
        status: "Active",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0012A11",
        image: "img2",
        product: "LINE Official",
        price: "767 THB",
        payment: "pading",
        date: "06/05/2023",
        status: "Inactive",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0011A12",
        image: "img",
        product: "SSK Pay",
        price: "1,000 THB",
        payment: "complete",
        date: "18/09/2023",
        status: "Active",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0012A13",
        image: "img2",
        product: "LINE Official",
        price: "767 THB",
        payment: "pading",
        date: "06/05/2023",
        status: "Inactive",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0011A14",
        image: "img",
        product: "SSK Pay",
        price: "1,000 THB",
        payment: "complete",
        date: "18/09/2023",
        status: "Active",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0012A15",
        image: "img2",
        product: "LINE Official",
        price: "767 THB",
        payment: "pading",
        date: "06/05/2023",
        status: "Inactive",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0011A16",
        image: "img",
        product: "SSK Pay",
        price: "1,000 THB",
        payment: "complete",
        date: "18/09/2023",
        status: "Active",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0012A17",
        image: "img2",
        product: "LINE Official",
        price: "767 THB",
        payment: "pading",
        date: "06/05/2023",
        status: "Inactive",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0011A18",
        image: "img",
        product: "SSK Pay",
        price: "1,000 THB",
        payment: "complete",
        date: "18/09/2023",
        status: "Active",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0012A19",
        image: "img2",
        product: "LINE Official",
        price: "767 THB",
        payment: "pading",
        date: "06/05/2023",
        status: "Inactive",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0011A20",
        image: "img",
        product: "SSK Pay",
        price: "1,000 THB",
        payment: "complete",
        date: "18/09/2023",
        status: "Active",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0012A21",
        image: "img2",
        product: "LINE Official",
        price: "767 THB",
        payment: "pading",
        date: "06/05/2023",
        status: "Inactive",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0011A22",
        image: "img",
        product: "SSK Pay",
        price: "1,000 THB",
        payment: "complete",
        date: "18/09/2023",
        status: "Active",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0012A23",
        image: "img2",
        product: "LINE Official",
        price: "767 THB",
        payment: "pading",
        date: "06/05/2023",
        status: "Inactive",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0011A24",
        image: "img",
        product: "SSK Pay",
        price: "1,000 THB",
        payment: "complete",
        date: "18/09/2023",
        status: "Active",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0012A25",
        image: "img2",
        product: "LINE Official",
        price: "767 THB",
        payment: "pading",
        date: "06/05/2023",
        status: "Inactive",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0011A26",
        image: "img",
        product: "SSK Pay",
        price: "1,000 THB",
        payment: "complete",
        date: "18/09/2023",
        status: "Active",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0012A27",
        image: "img2",
        product: "LINE Official",
        price: "767 THB",
        payment: "pading",
        date: "06/05/2023",
        status: "Inactive",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0011A28",
        image: "img",
        product: "SSK Pay",
        price: "1,000 THB",
        payment: "complete",
        date: "18/09/2023",
        status: "Active",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0012A29",
        image: "img2",
        product: "LINE Official",
        price: "767 THB",
        payment: "pading",
        date: "06/05/2023",
        status: "Inactive",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0011A30",
        image: "img",
        product: "SSK Pay",
        price: "1,000 THB",
        payment: "complete",
        date: "18/09/2023",
        status: "Active",
        copy: "",
        button: "Button",
        action: "icon",
      },
      {
        id: "SSKU0012A31",
        image: "img2",
        product: "LINE Official",
        price: "767 THB",
        payment: "pading",
        date: "06/05/2023",
        status: "Inactive",
        copy: "",
        button: "Button",
        action: "icon",
      },
    ],
    "?showFooter": true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1145%3A69931&mode=dev",
    },
  },
  render: ({ ...args }) => {
    return html` <ssk-table ${spread({ ...args })}> </ssk-table> `;
  },
};
