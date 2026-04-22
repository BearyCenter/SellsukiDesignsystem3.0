import { spread } from "@open-wc/lit-helpers";
import { useArgs } from "@storybook/preview-api";
import { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import "../../../src/components/dynamic-table";
import { DynamicTable } from "../../../src/components/dynamic-table";
import "../../../src/components/pagination";
import "../../../src/elements/button";
import "../../../src/elements/image";
import "../../../src/elements/spinner";

import { AutoLitProperty, baseArgsTypes } from "../helper";

type TableArgs = AutoLitProperty<DynamicTable>;

const meta = {
  title: "Components/Table/DynamicTable",
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

export type Story = StoryObj<TableArgs>;

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
          gap: 1rem;
        }

        @keyframes spin-wobble {
          0%,
          100% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(90deg) scale(1.2);
          }
          50% {
            transform: rotate(180deg) scale(0.8);
          }
          75% {
            transform: rotate(270deg) scale(1.1);
          }
        }

        .content ssk-icon {
          animation: spin-wobble 3s cubic-bezier(0.68, -0.55, 0.27, 1.55)
            infinite;
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

export const LoadingMoreTable: Story = {
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

        @keyframes spin-squash {
          0% {
            transform: rotate(0deg) scale(1, 1);
          }
          25% {
            transform: rotate(90deg) scale(1.2, 0.8);
          }
          50% {
            transform: rotate(180deg) scale(1, 1);
          }
          75% {
            transform: rotate(270deg) scale(0.8, 1.2);
          }
          100% {
            transform: rotate(360deg) scale(1, 1);
          }
        }

        .content ssk-icon {
          animation: spin-squash 2s cubic-bezier(0.68, -0.55, 0.27, 1.55)
            infinite;
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

const fNames = [
  "Alex",
  "Bob",
  "Charlie",
  "David",
  "Emily",
  "Frank",
  "Grace",
  "Henry",
  "Isabella",
  "Jack",
  "Kate",
  "Liam",
  "Mia",
  "Noah",
  "Olivia",
  "Parker",
  "Quinn",
  "Riley",
  "Sophia",
  "Thomas",
  "Victoria",
  "William",
  "Xavier",
  "Yasmine",
  "Zachary",
];

const lNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Jones",
  "Brown",
  "Davis",
  "Miller",
  "Wilson",
  "Moore",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
  "White",
  "Harris",
  "Martin",
  "Thompson",
  "Garcia",
  "Martinez",
  "Robinson",
  "Clark",
  "Rodriguez",
  "Lewis",
  "Lee",
  "Walker",
  "Hall",
  "Allen",
  "Young",
  "Hernandez",
  "King",
  "Wright",
  "Lopez",
  "Hill",
  "Scott",
  "Green",
  "Adams",
  "Baker",
  "Gonzalez",
];

const expandedRows = new Set<number>();

const getRandomTableData = (): TableData => {
  return {
    firstName: fNames[Math.floor(Math.random() * fNames.length)],
    lastName: lNames[Math.floor(Math.random() * lNames.length)],
    age: Math.floor(Math.random() * 100),
  };
};

export const LazyLoadingTable: Story = {
  args: {
    testId: "test-id",
    ".columnsWidth": ["300px", "150px", "80px", "auto"],
    ".backgroundColor": "#fff",
    ".stripedBackgroundColor": "gray",
    ".height": "800px",
    loading: false,
    data: Array.from({ length: 5 }, (_, index) => ({
      firstName: fNames[index],
      lastName: lNames[index],
      age: fNames[index].length + lNames[index].length * 3,
    })),
  },

  argTypes: {
    data: {
      control: "object",
      description: "Table data (for lazy loading)",
    },
    loading: {
      control: "boolean",
      description: "Loading state (shows spinner in placeholder)",
    },
  },

  render: (args) => {
    const [{}, updateArgs] = useArgs();
    const handleScrollEnd = () => {
      if (args.loading) return;

      updateArgs({ loading: true });

      setTimeout(() => {
        const moreData = Array.from({ length: 10 }, getRandomTableData);

        updateArgs({
          data: [...args.data, ...moreData],
          loading: false,
        });
      }, Math.floor(Math.random() * 3000) + 1000);
    };

    return html`
      <style>
        .content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;

          padding: 2rem 0;
          gap: 8px;
          box-sizing: border-box;
        }
      </style>
      <ssk-dynamic-table ${spread(args)} @scrollend=${handleScrollEnd}>
        <ssk-header-cell
          slot="headers"
          sortable
          sortDirection="asc"
          align="left"
        >
          First Name
        </ssk-header-cell>
        <ssk-header-cell slot="headers" sortable>Last Name</ssk-header-cell>
        <ssk-header-cell slot="headers">Age</ssk-header-cell>
        <ssk-header-cell slot="headers">Action</ssk-header-cell>

        ${args.data.map(
          (item: any) => html`
            <ssk-table-cell align="left">${item.firstName}</ssk-table-cell>
            <ssk-table-cell>${item.lastName}</ssk-table-cell>
            <ssk-table-cell>${item.age}</ssk-table-cell>
            <ssk-table-cell>
              <ssk-button>Click me</ssk-button>
              <ssk-button themeColor="pink">
                <ssk-icon iconName="solid-user-plus"></ssk-icon>
              </ssk-button>
            </ssk-table-cell>
          `
        )}
        ${args.loading
          ? html`<div class="content" slot="placeholder">
              <ssk-spinner size="sm"></ssk-spinner>
              กำลังโหลดข้อมูล
            </div>`
          : ""}
      </ssk-dynamic-table>
    `;
  },
};
export const ExpandableRowsTable: Story = {
  args: {
    testId: "test-id",
    ".columnsWidth": ["78px", "300px", "150px", "80px", "auto"],
    ".height": "600px",
  },
  render: (args) => {
    const [{}, updateArgs] = useArgs();

    const toggleExpand = (index: number) => {
      if (expandedRows.has(index)) {
        expandedRows.delete(index);
      } else {
        expandedRows.add(index);
      }
      updateArgs({});
    };

    return html`
      <style>
        .content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;

          padding: 2rem 0;
          gap: 8px;
          box-sizing: border-box;
        }
        .expand-button {
          cursor: pointer;
          background: none;
          border: none;
        }
      </style>
      <ssk-dynamic-table ${spread(args)}>
        <ssk-header-cell slot="headers"></ssk-header-cell>
        <ssk-header-cell
          slot="headers"
          sortable
          sortDirection="asc"
          align="left"
        >
          First Name
        </ssk-header-cell>
        <ssk-header-cell slot="headers" sortable>Last Name</ssk-header-cell>
        <ssk-header-cell slot="headers">Age</ssk-header-cell>
        <ssk-header-cell slot="headers">Action</ssk-header-cell>

        <ssk-table-cell align="left">
          <ssk-icon
            class="expand-button"
            @click=${() => toggleExpand(0)}
            iconName=${
              expandedRows.has(0)
                ? "outline-chevron-up"
                : "outline-chevron-down"
            }
          ></ssk-icon>
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

        <!-- Expanded content row -->

        <ssk-table-row expanded=${expandedRows.has(0)} padding="none" borderBottom="none">
          <ssk-dynamic-table
              columnsWidth='["78px", "300px", "150px", "80px", "auto"]'
              height="auto"
              backgroundColor="#f9fafb"
              >
                <ssk-table-cell></ssk-table-cell>
                <ssk-table-cell align="left">Text</ssk-table-cell>
                <ssk-table-cell>Text</ssk-table-cell>
                <ssk-table-cell>Text</ssk-table-cell>
                <ssk-table-cell>Text</ssk-table-cell>

                <ssk-table-cell></ssk-table-cell>
                <ssk-table-cell align="left">Text</ssk-table-cell>
                <ssk-table-cell>Text</ssk-table-cell>
                <ssk-table-cell>Text</ssk-table-cell>
                <ssk-table-cell>Text</ssk-table-cell>
          </ssk-dynamic-table>
        </ssk-table-row>
    
        <ssk-table-cell align="left"></ssk-icon>
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

        <ssk-table-cell align="left">
          <ssk-icon
            class="expand-button"
            @click=${() => toggleExpand(2)}
            iconName=${
              expandedRows.has(2)
                ? "outline-chevron-up"
                : "outline-chevron-down"
            }
          ></ssk-icon>
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

        <!-- Expanded content row -->
        <ssk-table-row expanded=${expandedRows.has(2)}> 
          Expanded Row Content 
        </ssk-table-row> 

        <ssk-table-cell align="left">
          <ssk-icon
            class="expand-button"
            @click=${() => toggleExpand(3)}
            iconName=${
              expandedRows.has(3)
                ? "outline-chevron-up"
                : "outline-chevron-down"
            }
          ></ssk-icon>
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

        <!-- Expanded content row -->
        <ssk-table-row expanded=${expandedRows.has(3)}> 
          Expanded Row Content 
        </ssk-table-row> 

        <ssk-pagination
          slot="footer"
          showrowspage
          showRowsPerPage
          totalPages="10"
        ></ssk-pagination>
      </ssk-dynamic-table>
    `;
  },
};

type TableData = {
  firstName: string;
  lastName: string;
  age: number;
};
