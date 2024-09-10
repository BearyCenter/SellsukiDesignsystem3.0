import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/table";
import "../../../src/elements/tag";
import "../../../src/elements/button";
import "../../../src/elements/icon";
import "../../../src/components/table";
import "../../../src/elements/badge";
import "../../../src/elements/text";
import "../../../src/elements/image";
import { Table } from "../../../src/components/table";
import { AutoLitProperty, baseArgsTypes, genericEvents } from "../helper";

type TableWithData = AutoLitProperty<Table>;

const handleSort = (header: any, direction: string) => {
  console.log(`Sorting ${header.title} in ${direction} order`);
};

const commonData = [
  {
    id: "SSKU0001A",
    image: "image1.png",
    product: "Product Name A",
    pricing: "100.00 THB",
    payment: "Paid",
    date: "18/09/2023",
    status: "Active",
  },
  {
    id: "SSKU0002B",
    image: "image2.png",
    product: "Product Name B",
    pricing: "200.00 THB",
    payment: "Pending",
    date: "17/09/2023",
    status: "Inactive",
  },
  {
    id: "SSKU0003C",
    image: "image3.png",
    product: "Product Name C",
    pricing: "300.00 THB",
    payment: "Paid",
    date: "16/09/2023",
    status: "Active",
  },
  {
    id: "SSKU0004D",
    image: "image4.png",
    product: "Product Name D",
    pricing: "400.00 THB",
    payment: "Cancelled",
    date: "15/09/2023",
    status: "Inactive",
  },
  {
    id: "SSKU0005E",
    image: "image5.png",
    product: "Product Name E",
    pricing: "500.00 THB",
    payment: "Paid",
    date: "14/09/2023",
    status: "Active",
  },
  {
    id: "SSKU0006F",
    image: "image6.png",
    product: "Product Name F",
    pricing: "600.00 THB",
    payment: "Pending",
    date: "13/09/2023",
    status: "Inactive",
  },
  {
    id: "SSKU0007G",
    image: "image7.png",
    product: "Product Name G",
    pricing: "700.00 THB",
    payment: "Paid",
    date: "12/09/2023",
    status: "Active",
  },
  {
    id: "SSKU0008H",
    image: "image8.png",
    product: "Product Name H",
    pricing: "800.00 THB",
    payment: "Cancelled",
    date: "11/09/2023",
    status: "Inactive",
  },
  {
    id: "SSKU0009I",
    image: "image9.png",
    product: "Product Name I",
    pricing: "900.00 THB",
    payment: "Paid",
    date: "10/09/2023",
    status: "Active",
  },
  {
    id: "SSKU0010J",
    image: "image10.png",
    product: "Product Name J",
    pricing: "1000.00 THB",
    payment: "Pending",
    date: "09/09/2023",
    status: "Inactive",
  },
  {
    id: "SSKU0011K",
    image: "image11.png",
    product: "Product Name K",
    pricing: "1100.00 THB",
    payment: "Paid",
    date: "08/09/2023",
    status: "Active",
  },
  {
    id: "SSKU0012L",
    image: "image12.png",
    product: "Product Name L",
    pricing: "1200.00 THB",
    payment: "Cancelled",
    date: "07/09/2023",
    status: "Inactive",
  },
];

const meta = {
  title: "Example/Table",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html` <ssk-table ${spread({ ...args })}> </ssk-table> `;
  },

  argTypes: {
    ".columns": {
      description: `This defines the structure of columns in the table. Each column is an object with the following properties:
- **title** (string): The text that will appear in the column header.
- **dataIndex** (string, optional): The key to access data in the row object. This links the column to the corresponding data field.
- **align** ("left" | "center" | "right", optional): Specifies the alignment of the text in the column.
- **width** (string, optional): Defines the width of the column. Can accept values such as '100px', '10%', or 'auto' to control the width of the column.
- **render** (function, optional): A custom rendering function for the cell. It receives three arguments: \`value\`, \`record\`, and \`rowIndex\`. This allows for custom content to be displayed in the cell.
- **sortable** (boolean, optional): If true, this column can be sorted.
- **sortDirection** ("asc" | "desc", optional): The default sorting direction for the column.
- **onSort** (function, optional): A callback function that is triggered when sorting occurs. It receives the current \`direction\` ("asc" or "desc").

**Example:**

\`\`\`js
  [
    {
      title: "Name",
      dataIndex: "name",
      align: "left",
      sortable: true
    },
    {
      title: "Age",
      dataIndex: "age",
      align: "right",
      render: (value) => { return \`\${value} years old\`}
    }
  ]
\`\`\`
      `,
      table: {
        category: "Props",
        type: {
          summary: "object",
        },
      },
      control: {
        type: "object",
      },
    },

    ".data": {
      description: `The content data to be displayed in the table. It should be an array of objects, where each object represents a row of data.

Each key in the object should correspond to a \`dataIndex\` from the \`.columns\` array, and the value associated with the key will be shown in the corresponding column.
      
**Example:**

\`\`\`js
  [
    { name: "John Doe", age: 30 },
    { name: "Jane Smith", age: 25 }
  ]
\`\`\`
      
In this example, if the \`columns\` have \`dataIndex\` values "name" and "age", the table will display "John Doe" and "Jane Smith" with their respective ages.
      `,
      table: {
        category: "Props",
        type: {
          summary: "object",
        },
      },
      control: {
        type: "object",
      },
    },

    "?showCheckbox": {
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
    "?showPaginationFooter": {
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

    "?showPageNavigation": {
      if: {
        arg: "?showPaginationFooter",
        eq: true,
      },
      description:
        "When true, displays the row page menu. Only visible if showPaginationFooter is true.",
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

    "?showRowsPerPageSelector": {
      if: {
        arg: "?showPaginationFooter",
        eq: true,
      },
      description:
        "When true, displays the rows per page menu. Only visible if showPaginationFooter is true.",
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

    "?showPageButtons": {
      if: {
        arg: "?showPaginationFooter",
        eq: true,
      },
      description:
        "When true, displays the button page menu. Only visible if showPaginationFooter is true.",
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

    "?showGoToPageInput": {
      if: {
        arg: "?showPaginationFooter",
        eq: true,
      },
      description:
        "When true, displays the go-to page menu. Only visible if showPaginationFooter is true.",
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
    ".columns": [
      { title: "Name", dataIndex: "name", align: "left" },
      { title: "Age", dataIndex: "age", align: "center" },
      { title: "Email", dataIndex: "email", align: "center" },
    ],
    ".data": [
      { name: "John Brown", age: 32, email: "John@test.com" },
      { name: "Jim Green", age: 42, email: "Jim@test.com" },
      { name: "Joe Black", age: 31, email: "Joe@test.com" },
    ],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1145%3A69931&mode=dev",
    },
  },
};

export const TableWithHeaderSort: Story = {
  args: {
    ".columns": [
      {
        title: "ID",
        dataIndex: "id",
        sortable: true,
        sortDirection: "asc",
        onSort: (direction: "asc" | "desc") =>
          handleSort({ title: "ID" }, direction),
      },
      { title: "Product", dataIndex: "product" },
      { title: "Pricing", dataIndex: "pricing" },
      { title: "Payment", dataIndex: "payment" },
      {
        title: "Create Date",
        dataIndex: "date",
        sortable: true,
        sortDirection: "asc",
        onSort: (direction: "asc" | "desc") =>
          handleSort({ title: "Create Date" }, direction),
      },
      { title: "Status", dataIndex: "status" },
    ],
    ".data": commonData,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1145%3A69931&mode=dev",
    },
  },
};

export const TableWithBody: Story = {
  args: {
    ".columns": [
      { title: "ID", dataIndex: "id" },
      { title: "Image", dataIndex: "image" },
      { title: "Product", dataIndex: "product" },
      { title: "Pricing", dataIndex: "pricing" },
      {
        title: "Payment",
        dataIndex: "payment",
        customCell: (value) => {
          return `<ssk-tag variant="subtle" size="md"><ssk-icon size="xs" name="outline-sun"></ssk-icon>${value}</ssk-tag>`;
        },
      },
      { title: "Create Date", dataIndex: "date" },
      {
        title: "Status",
        dataIndex: "status",
        customCell: (value) => {
          return value === "Active"
            ? `<ssk-badge variant="subtle" size="md" themeColor="success">${value}</ssk-badge>`
            : `<ssk-badge variant="subtle" size="md">${value}</ssk-badge>`;
        },
      },
      {
        title: "Icon",
        align: "center",
        customCell: () => {
          return `<ssk-icon name="outline-document-duplicate" size="xs"></ssk-icon>`;
        },
      },
      {
        title: "Button",
        customCell: (_, __, rowIndex: number) => {
          return `<ssk-button variant="solid" size="md">
    <ssk-icon slot="prefix" name="solid-users" size="md"></ssk-icon>
    Button ${rowIndex} </ssk-button>`;
        },
      },
      {
        title: "Action",
        align: "center",
        customCell: () => {
          return `<ssk-icon name="outline-ellipsis-vertical" size="xs"></ssk-icon>`;
        },
      },
    ],
    ".data": commonData,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1145%3A69931&mode=dev",
    },
  },
};

export const TableWithCustomWidth: Story = {
  args: {
    ".columns": [
      { title: "ID", dataIndex: "id", width: "150px" },
      { title: "Image", dataIndex: "image", width: "150px" },
      { title: "Product", dataIndex: "product", width: "150px" },
      { title: "Pricing", dataIndex: "pricing", width: "150px" },
      {
        title: "Payment",
        dataIndex: "payment",
        customCell: (value) => {
          return `<ssk-tag variant="subtle" size="md"><ssk-icon size="xs" name="outline-sun"></ssk-icon>${value}</ssk-tag>`;
        },
      },
      { title: "Create Date", dataIndex: "date" },
      {
        title: "Status",
        dataIndex: "status",
        width: "100px",
        customCell: (value) => {
          return value === "Active"
            ? `<ssk-badge variant="subtle" size="md" themeColor="success">${value}</ssk-badge>`
            : `<ssk-badge variant="subtle" size="md">${value}</ssk-badge>`;
        },
      },
      {
        title: "Icon",
        align: "center",
        customCell: () => {
          return `<ssk-icon name="outline-document-duplicate" size="xs"></ssk-icon>`;
        },
      },
      {
        title: "Button",
        customCell: (_, __, rowIndex: number) => {
          return `<ssk-button variant="solid" size="md">
    <ssk-icon slot="prefix" name="solid-users" size="md"></ssk-icon>
    Button ${rowIndex} </ssk-button>`;
        },
      },
      {
        title: "Action",
        align: "center",
        customCell: () => {
          return `<ssk-icon name="outline-ellipsis-vertical" size="xs"></ssk-icon>`;
        },
      },
    ],
    ".data": commonData,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1145%3A69931&mode=dev",
    },
  },
};

export const TableWithSelect: Story = {
  args: {
    ".columns": [
      { title: "ID", dataIndex: "id" },
      { title: "Image", dataIndex: "image" },
      { title: "Product", dataIndex: "product" },
      { title: "Pricing", dataIndex: "pricing" },
      {
        title: "Payment",
        dataIndex: "payment",
        customCell: (value) => {
          return `<ssk-tag variant="subtle" size="md"><ssk-icon size="xs" name="outline-sun"></ssk-icon>${value}</ssk-tag>`;
        },
      },
      { title: "Create Date", dataIndex: "date" },
      {
        title: "Status",
        dataIndex: "status",
        customCell: (value) => {
          return value === "Active"
            ? `<ssk-badge variant="subtle" size="md" themeColor="success">${value}</ssk-badge>`
            : `<ssk-badge variant="subtle" size="md">${value}</ssk-badge>`;
        },
      },
      {
        title: "Icon",
        align: "center",
        customCell: () => {
          return `<ssk-icon name="outline-document-duplicate" size="xs"></ssk-icon>`;
        },
      },
      {
        title: "Button",
        customCell: (_, __, rowIndex: number) => {
          return `<ssk-button variant="solid" size="md">
    <ssk-icon slot="prefix" name="solid-users" size="md"></ssk-icon>
    Button ${rowIndex} </ssk-button>`;
        },
      },
      {
        title: "Action",
        align: "center",
        customCell: () => {
          return `<ssk-icon name="outline-ellipsis-vertical" size="xs"></ssk-icon>`;
        },
      },
    ],
    ".data": commonData,
    "?showCheckbox": true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1145%3A69931&mode=dev",
    },
  },
};

export const TableWithFooter: Story = {
  args: {
    ".columns": [
      {
        title: "ID",
        dataIndex: "id",
        sortable: true,
        sortDirection: "asc",
        onSort: (direction: "asc" | "desc") =>
          handleSort({ title: "ID" }, direction),
      },
      { title: "Image", dataIndex: "image" },
      { title: "Product", dataIndex: "product" },
      { title: "Pricing", dataIndex: "pricing" },
      {
        title: "Payment",
        dataIndex: "payment",
        customCell: (value) => {
          return `<ssk-tag variant="subtle" size="md"><ssk-icon size="xs" name="outline-sun"></ssk-icon>${value}</ssk-tag>`;
        },
      },
      {
        title: "Create Date",
        dataIndex: "date",
        sortable: true,
        sortDirection: "asc",
        onSort: (direction: "asc" | "desc") =>
          handleSort({ title: "Create Date" }, direction),
      },
      {
        title: "Status",
        dataIndex: "status",
        customCell: (value) => {
          return value === "Active"
            ? `<ssk-badge variant="subtle" size="md" themeColor="success">${value}</ssk-badge>`
            : `<ssk-badge variant="subtle" size="md">${value}</ssk-badge>`;
        },
      },
      {
        title: "Icon",
        align: "center",
        customCell: () => {
          return `<ssk-icon name="outline-document-duplicate" size="xs"></ssk-icon>`;
        },
      },
      {
        title: "Button",
        customCell: (_, __, rowIndex: number) => {
          return `<ssk-button variant="solid" size="md">
    <ssk-icon slot="prefix" name="solid-users" size="md"></ssk-icon>
    Button ${rowIndex} </ssk-button>`;
        },
      },
      {
        title: "Action",
        align: "center",
        customCell: () => {
          return `<ssk-icon name="outline-ellipsis-vertical" size="xs"></ssk-icon>`;
        },
      },
    ],
    ".data": commonData,
    "?showPaginationFooter": true,
    "?showPageNavigation": true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1145%3A69931&mode=dev",
    },
  },
};

export const TableWithScroll: Story = {
  args: {
    ".columns": [
      {
        title: "ID",
        dataIndex: "id",
        sortable: true,
        sortDirection: "asc",
        onSort: (direction: "asc" | "desc") =>
          handleSort({ title: "ID" }, direction),
      },
      { title: "Image", dataIndex: "image" },
      { title: "Product", dataIndex: "product" },
      { title: "Pricing", dataIndex: "pricing" },
      {
        title: "Payment",
        dataIndex: "payment",
        customCell: (value) => {
          return `<ssk-tag variant="subtle" size="md"><ssk-icon size="xs" name="outline-sun"></ssk-icon>${value}</ssk-tag>`;
        },
      },
      {
        title: "Create Date",
        dataIndex: "date",
        sortable: true,
        sortDirection: "asc",
        onSort: (direction: "asc" | "desc") =>
          handleSort({ title: "Create Date" }, direction),
      },
      {
        title: "Status",
        dataIndex: "status",
        customCell: (value) => {
          return value === "Active"
            ? `<ssk-badge variant="subtle" size="md" themeColor="success">${value}</ssk-badge>`
            : `<ssk-badge variant="subtle" size="md">${value}</ssk-badge>`;
        },
      },
      {
        title: "Icon",
        align: "center",
        customCell: () => {
          return `<ssk-icon name="outline-document-duplicate" size="xs"></ssk-icon>`;
        },
      },
      {
        title: "Button",
        customCell: (_, __, rowIndex: number) => {
          return `<ssk-button variant="solid" size="md">
    <ssk-icon slot="prefix" name="solid-users" size="md"></ssk-icon>
    Button ${rowIndex} </ssk-button>`;
        },
      },
      {
        title: "Action",
        align: "center",
        customCell: () => {
          return `<ssk-icon name="outline-ellipsis-vertical" size="xs"></ssk-icon>`;
        },
      },
    ],
    ".data": commonData,
    "?showPaginationFooter": true,
    "?showPageNavigation": true,
  },
  render: ({ ...args }) => {
    return html`
      <style lang="css">
        ssk-table {
          --height-table: 400px;
        }
      </style>
      <ssk-table ${spread({ ...args })}> </ssk-table>
    `;
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1145%3A69931&mode=dev",
    },
  },
};

export const TableEmpty: Story = {
  args: {
    ".columns": [
      {
        title: "ID",
        dataIndex: "id",
        sortable: true,
        sortDirection: "asc",
        onSort: (direction: "asc" | "desc") =>
          handleSort({ title: "ID" }, direction),
      },
      { title: "Image", dataIndex: "image" },
      { title: "Product", dataIndex: "product" },
      { title: "Pricing", dataIndex: "pricing" },
      {
        title: "Payment",
        dataIndex: "payment",
      },
      {
        title: "Create Date",
        dataIndex: "date",
        sortable: true,
        sortDirection: "asc",
        onSort: (direction: "asc" | "desc") =>
          handleSort({ title: "Create Date" }, direction),
      },
      {
        title: "Status",
        dataIndex: "status",
      },
      {
        title: "Icon",
        align: "center",
      },
      {
        title: "Button",
      },
      {
        title: "Action",
        align: "center",
      },
    ],
    "?showPaginationFooter": true,
    "?showPageNavigation": true,
  },
  render: ({ ...args }) => {
    return html`
      <style lang="css">
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 70dvh;
          background-color: #ffffff;
        }
        .content ssk-text {
          margin-top: 1rem;
        }
      </style>
      <ssk-table ${spread({ ...args })}>
        <div slot="empty-content">
          <div class="content">
            <ssk-image
              src="https://sellercenter.dev.patona.online/images/patona-logo-icon.svg"
              alt="empty-image"
            ></ssk-image>
            <ssk-text size="md" color="gray">ไม่มีข้อมูลให้แสดง</ssk-text>
          </div>
        </div>
      </ssk-table>
    `;
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1145%3A69931&mode=dev",
    },
  },
};
