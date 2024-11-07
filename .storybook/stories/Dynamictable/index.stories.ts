import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/dynamic-table";
import { DynamicTable } from "../../../src/components/dynamic-table";
import "../../../src/components/pagination";
import "../../../src/elements/button";
import "../../../src/elements/image";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type TableArgs = AutoLitProperty<DynamicTable>;

const meta = {
  title: "Example/DynamicTable",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`
      <ssk-dynamic-table ${spread({ ...args })}>
        <ssk-header-cell
          slot="headers"
          sortable
          sortDirection="asc"
          align="left"
          >First Name</ssk-header-cell
        >
        <ssk-header-cell slot="headers" sortable>Last Name</ssk-header-cell>
        <ssk-header-cell slot="headers">Age</ssk-header-cell>
        <ssk-header-cell slot="headers">Action</ssk-header-cell>

        <ssk-table-cell align="left">John</ssk-table-cell>
        <ssk-table-cell>Doe</ssk-table-cell>
        <ssk-table-cell>30</ssk-table-cell>
        <ssk-table-cell>
          <ssk-button>Click me</ssk-button>
          <ssk-button themeColor="pink">
            <ssk-icon iconName="solid-user-plus"></ssk-icon>
          </ssk-button>
        </ssk-table-cell>

        <ssk-table-cell align="left">Jane</ssk-table-cell>
        <ssk-table-cell>Doe</ssk-table-cell>
        <ssk-table-cell>25</ssk-table-cell>
        <ssk-table-cell>
          <ssk-button>Click me</ssk-button>
          <ssk-button themeColor="pink">
            <ssk-icon iconName="solid-user-plus"></ssk-icon>
          </ssk-button>
        </ssk-table-cell>

        <ssk-table-cell align="left">James</ssk-table-cell>
        <ssk-table-cell>Smith</ssk-table-cell>
        <ssk-table-cell>40</ssk-table-cell>
        <ssk-table-cell>
          <ssk-button>Click me</ssk-button>
          <ssk-button themeColor="pink">
            <ssk-icon iconName="solid-user-plus"></ssk-icon>
          </ssk-button>
        </ssk-table-cell>

        <ssk-table-cell align="left">John</ssk-table-cell>
        <ssk-table-cell>Doe</ssk-table-cell>
        <ssk-table-cell>30</ssk-table-cell>
        <ssk-table-cell>
          <ssk-button>Click me</ssk-button>
          <ssk-button themeColor="pink">
            <ssk-icon iconName="solid-user-plus"></ssk-icon>
          </ssk-button>
        </ssk-table-cell>

        <ssk-table-cell align="left">Jane</ssk-table-cell>
        <ssk-table-cell>Doe</ssk-table-cell>
        <ssk-table-cell>25</ssk-table-cell>
        <ssk-table-cell>
          <ssk-button>Click me</ssk-button>
          <ssk-button themeColor="pink">
            <ssk-icon iconName="solid-user-plus"></ssk-icon>
          </ssk-button>
        </ssk-table-cell>

        <ssk-table-cell align="left">James</ssk-table-cell>
        <ssk-table-cell>Smith</ssk-table-cell>
        <ssk-table-cell>40</ssk-table-cell>
        <ssk-table-cell>
          <ssk-button>Click me</ssk-button>
          <ssk-button themeColor="pink">
            <ssk-icon iconName="solid-user-plus"></ssk-icon>
          </ssk-button>
        </ssk-table-cell>

        <ssk-table-cell align="left">John</ssk-table-cell>
        <ssk-table-cell>Doe</ssk-table-cell>
        <ssk-table-cell>30</ssk-table-cell>
        <ssk-table-cell>
          <ssk-button>Click me</ssk-button>
          <ssk-button themeColor="pink">
            <ssk-icon iconName="solid-user-plus"></ssk-icon>
          </ssk-button>
        </ssk-table-cell>

        <ssk-table-cell align="left">John</ssk-table-cell>
        <ssk-table-cell>Doe</ssk-table-cell>
        <ssk-table-cell>30</ssk-table-cell>
        <ssk-table-cell>
          <ssk-button>Click me</ssk-button>
          <ssk-button themeColor="pink">
            <ssk-icon iconName="solid-user-plus"></ssk-icon>
          </ssk-button>
        </ssk-table-cell>

        <ssk-table-cell align="left">Jane</ssk-table-cell>
        <ssk-table-cell>Doe</ssk-table-cell>
        <ssk-table-cell>25</ssk-table-cell>
        <ssk-table-cell>
          <ssk-button>Click me</ssk-button>
          <ssk-button themeColor="pink">
            <ssk-icon iconName="solid-user-plus"></ssk-icon>
          </ssk-button>
        </ssk-table-cell>

        <ssk-table-cell align="left">James</ssk-table-cell>
        <ssk-table-cell>Smith</ssk-table-cell>
        <ssk-table-cell>40</ssk-table-cell>
        <ssk-table-cell>
          <ssk-button>Click me</ssk-button>
          <ssk-button themeColor="pink">
            <ssk-icon iconName="solid-user-plus"></ssk-icon>
          </ssk-button>
        </ssk-table-cell>

        <ssk-table-cell align="left">John</ssk-table-cell>
        <ssk-table-cell>Doe</ssk-table-cell>
        <ssk-table-cell>30</ssk-table-cell>
        <ssk-table-cell>
          <ssk-button>Click me</ssk-button>
          <ssk-button themeColor="pink">
            <ssk-icon iconName="solid-user-plus"></ssk-icon>
          </ssk-button>
        </ssk-table-cell>

        <ssk-table-cell align="left">John</ssk-table-cell>
        <ssk-table-cell>Doe</ssk-table-cell>
        <ssk-table-cell>30</ssk-table-cell>
        <ssk-table-cell>
          <ssk-button>Click me</ssk-button>
          <ssk-button themeColor="pink">
            <ssk-icon iconName="solid-user-plus"></ssk-icon>
          </ssk-button>
        </ssk-table-cell>

        <ssk-table-cell align="left">Jane</ssk-table-cell>
        <ssk-table-cell>Doe</ssk-table-cell>
        <ssk-table-cell>25</ssk-table-cell>
        <ssk-table-cell>
          <ssk-button>Click me</ssk-button>
          <ssk-button themeColor="pink">
            <ssk-icon iconName="solid-user-plus"></ssk-icon>
          </ssk-button>
        </ssk-table-cell>

        <ssk-table-cell align="left">James</ssk-table-cell>
        <ssk-table-cell>Smith</ssk-table-cell>
        <ssk-table-cell>40</ssk-table-cell>
        <ssk-table-cell>
          <ssk-button>Click me</ssk-button>
          <ssk-button themeColor="pink">
            <ssk-icon iconName="solid-user-plus"></ssk-icon>
          </ssk-button>
        </ssk-table-cell>

        <ssk-table-cell align="left">John</ssk-table-cell>
        <ssk-table-cell>Doe</ssk-table-cell>
        <ssk-table-cell>30</ssk-table-cell>
        <ssk-table-cell>
          <ssk-button>Click me</ssk-button>
          <ssk-button themeColor="pink">
            <ssk-icon iconName="solid-user-plus"></ssk-icon>
          </ssk-button>
        </ssk-table-cell>

        <ssk-pagination
          slot="footer"
          showrowspage
          showRowsPerPage
          totalPages="10"
        ></ssk-pagination>
      </ssk-dynamic-table>
    `;
  },
  argTypes: {
    ...baseArgsTypes,
  },
} satisfies Meta<TableArgs>;

export default meta;

type Story = StoryObj<TableArgs>;

export const Default: Story = {
  args: {
    testId: "test-id",
    ".columnsWidth": ["300px", "150px", "80px", "auto"],
    ".backgroundColor": "#fff",
    ".stripedBackgroundColor": "gray",
    ".height": "800px",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1145%3A69931&mode=dev",
    },
  },
};

export const LoadingTable: Story = {
  args: {
    testId: "test-id",
    ".columnsWidth": ["300px", "150px", "80px", "auto"],
    ".backgroundColor": "#fff",
    ".stripedBackgroundColor": "gray",
    ".height": "800px",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1145%3A69931&mode=dev",
    },
  },
  render: ({ ...args }) => {
    return html`
      <style>
        .content {
          display: grid;
          place-items: center;
          height: 100%;
        }

        .content ssk-icon {
          animation: spin 1s cubic-bezier(0.6, 0.28, 0.735, 0.045) infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      </style>
      <ssk-dynamic-table ${spread({ ...args })}>
        <ssk-header-cell
          slot="headers"
          sortable
          sortDirection="asc"
          align="left"
          >First Name</ssk-header-cell
        >
        <ssk-header-cell slot="headers" sortable>Last Name</ssk-header-cell>
        <ssk-header-cell slot="headers">Age</ssk-header-cell>
        <ssk-header-cell slot="headers">Action</ssk-header-cell>

        <ssk-pagination
          slot="footer"
          showrowspage
          showRowsPerPage
          totalPages="10"
        ></ssk-pagination>

        <div class="content" slot="placeholder">
          <ssk-icon iconName="solid-spinner" size="64px"></ssk-icon>
        </div>
      </ssk-dynamic-table>
    `;
  },
};

export const EmptyTable: Story = {
  args: {
    testId: "test-id",
    ".columnsWidth": ["300px", "150px", "80px", "auto"],
    ".backgroundColor": "#fff",
    ".stripedBackgroundColor": "gray",
    ".height": "800px",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1145%3A69931&mode=dev",
    },
  },
  render: ({ ...args }) => {
    return html`
      <style>
        .content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
        }
        .content ssk-text {
          margin-top: 1rem;
        }
      </style>
      <ssk-dynamic-table ${spread({ ...args })}>
        <ssk-header-cell
          slot="headers"
          sortable
          sortDirection="asc"
          align="left"
          >First Name</ssk-header-cell
        >
        <ssk-header-cell slot="headers" sortable>Last Name</ssk-header-cell>
        <ssk-header-cell slot="headers">Age</ssk-header-cell>
        <ssk-header-cell slot="headers">Action</ssk-header-cell>

        <ssk-pagination
          slot="footer"
          showrowspage
          showRowsPerPage
          totalPages="10"
        ></ssk-pagination>

        <div class="content" slot="placeholder">
          <ssk-image
            src="https://sellercenter.dev.patona.online/images/patona-logo-icon.svg"
            alt="empty-image"
          ></ssk-image>
          <ssk-text size="md" color="gray">ไม่มีข้อมูลให้แสดง</ssk-text>
        </div>
      </ssk-dynamic-table>
    `;
  },
};

export const EmptyTable2: Story = {
  args: {
    testId: "test-id",
    ".columnsWidth": ["300px", "150px", "80px", "auto"],
    ".backgroundColor": "#fff",
    ".stripedBackgroundColor": "gray",
    ".height": "800px",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1145%3A69931&mode=dev",
    },
  },
  render: ({ ...args }) => {
    return html`
      <style>
        .content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          background-color: #ffffff;
        }
        .content ssk-text {
          margin-top: 1rem;
        }
      </style>
      <ssk-dynamic-table ${spread({ ...args })}>
        <div class="content" slot="placeholder">
          <ssk-image
            src="https://sellercenter.dev.patona.online/images/patona-logo-icon.svg"
            alt="empty-image"
          ></ssk-image>
          <ssk-text size="md" color="gray">ไม่มีข้อมูลให้แสดง</ssk-text>
        </div>
      </ssk-dynamic-table>
    `;
  },
};
