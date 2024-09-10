import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/pagination";
import "../../../src/elements/badge";
import "../../../src/elements/text";
import { Pagination } from "../../../src/components/pagination";
import { AutoLitProperty, baseArgsTypes, genericEvents } from "../helper";

type PaginationDefault = AutoLitProperty<Pagination> & { labels: string };

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Pagination",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html` <ssk-pagination ${spread({ ...args })}> </ssk-pagination> `;
  },

  argTypes: {
    currentPage: {
      description: "Show the current page list",
      control: {
        type: "number",
      },
    },
    totalPages: {
      description: "Show total number of pages",
      control: {
        type: "number",
      },
    },
    "?showRowsPage": {
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
    "?showRowsPerPage": {
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
    "?showGoToPage": {
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
    "?showBtnPage": {
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
    ".selectedItems": {
      description: "Array of selected items",
      control: {
        type: "array",
      },
      defaultValue: [10, 20, 30, 40],
    },
    "@click": {
      action: "@click",
      table: {
        category: "Events props",
      },
    },
    "@page-changed": {
      action: "@page-changed",
      table: {
        category: "Events props",
      },
    },
    ...baseArgsTypes,
  },
} satisfies Meta<PaginationDefault>;

export default meta;

type Story = StoryObj<PaginationDefault>;

export const Default: Story = {
  args: {
    ".selectedItems": [10, 20, 50, 100],
    "?showRowsPage": true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=42%3A915&mode=dev",
    },
  },
};
