import type { Meta, StoryObj } from "@storybook/web-components";
import { action } from "@storybook/addon-actions";
import { html } from "lit";
import "../../../src/components/advanced-data-table";
import type { ADTColumn, ADTRow } from "../../../src/components/advanced-data-table";

const sampleColumns: ADTColumn[] = [
  { key: "name",     label: "Name",     sortable: true,  width: "200px" },
  { key: "category", label: "Category", sortable: true },
  { key: "price",    label: "Price",    sortable: true,  align: "right",
    render: (v) => html`<span style="font-weight:600">฿${Number(v).toLocaleString()}</span>` },
  { key: "status",   label: "Status",
    render: (v) => {
      const color = v === "active" ? "var(--bg-success-solid)" : "var(--bg-disabled)";
      return html`<span style="display:inline-block;padding:2px 10px;border-radius:999px;background:${color};color:#fff;font-size:16px">${v}</span>`;
    }
  },
  { key: "stock",    label: "Stock",    align: "right",  sortable: true },
];

const makeRows = (count: number): ADTRow[] =>
  Array.from({ length: count }, (_, i) => ({
    id:       String(i + 1),
    name:     `Product ${i + 1}`,
    category: ["Electronics", "Clothing", "Food", "Sports"][i % 4],
    price:    Math.floor(Math.random() * 9000) + 1000,
    status:   i % 3 === 0 ? "inactive" : "active",
    stock:    Math.floor(Math.random() * 500),
    expandContent: html`<div style="color:var(--text-secondary)">SKU: PRD-${String(i + 1).padStart(5, "0")} · Last updated: ${new Date().toLocaleDateString()}</div>`,
  }));

const sampleRows = makeRows(10);

const meta = {
  title: "Components/Data/AdvancedDataTable",
  tags: ["autodocs"],
  render: (args: Record<string, unknown>) => html`
    <ds-advanced-data-table
      .columns=${sampleColumns}
      .rows=${sampleRows}
      .loading=${args.loading as boolean}
      .selectable=${args.selectable as boolean}
      .expandable=${args.expandable as boolean}
      .total=${args.total as number}
      .page=${args.page as number}
      .pageSize=${args.pageSize as number}
      .sortKey=${args.sortKey as string}
      .sortDir=${args.sortDir as "asc" | "desc"}
      empty-message=${args.emptyMessage as string}
      @sort-change=${action("sort-change")}
      @page-change=${action("page-change")}
      @page-size-change=${action("page-size-change")}
      @selection-change=${action("selection-change")}
      @bulk-action=${action("bulk-action")}
    >
      <button slot="bulk-actions" data-action="export" style="padding:4px 12px;border:1px solid #e5e7eb;border-radius:6px;background:#fff;cursor:pointer;font-size:18px">Export</button>
      <button slot="bulk-actions" data-action="delete" style="padding:4px 12px;border:1px solid #fca5a5;border-radius:6px;background:#fff;color:#dc2626;cursor:pointer;font-size:18px">Delete</button>
    </ds-advanced-data-table>
  `,
  argTypes: {
    loading:      { control: "boolean", table: { category: "State" } },
    selectable:   { control: "boolean", table: { category: "Props" } },
    expandable:   { control: "boolean", table: { category: "Props" } },
    total:        { control: "number",  table: { category: "Pagination" } },
    page:         { control: "number",  table: { category: "Pagination" } },
    pageSize:     { control: "number",  table: { category: "Pagination" } },
    emptyMessage: { control: "text",    table: { category: "State" } },
    sortKey:      { control: "text",    table: { category: "Sort" } },
    sortDir: {
      options: ["asc", "desc"],
      control: { type: "inline-radio" },
      table: { category: "Sort" },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    loading:      false,
    selectable:   false,
    expandable:   false,
    total:        100,
    page:         1,
    pageSize:     10,
    sortKey:      "",
    sortDir:      "asc",
    emptyMessage: "No data",
  },
};

export const WithSelectionAndBulkActions: Story = {
  args: {
    ...Default.args,
    selectable: true,
  },
};

export const WithExpandableRows: Story = {
  args: {
    ...Default.args,
    expandable: true,
  },
};

export const FullFeatured: Story = {
  args: {
    ...Default.args,
    selectable: true,
    expandable: true,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const Empty: Story = {
  render: () => html`
    <ds-advanced-data-table
      .columns=${sampleColumns}
      .rows=${[]}
      total=${0}
      empty-message="No products found. Try adjusting your filters."
    ></ds-advanced-data-table>
  `,
};

export const SortedByPrice: Story = {
  args: {
    ...Default.args,
    sortKey: "price",
    sortDir: "desc",
    total:   50,
    page:    2,
  },
};
