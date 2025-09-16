import { spread } from "@open-wc/lit-helpers";
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/widget-table";
import { WidgetTable } from "../../../src/elements/widget-table";
import { baseArgsTypes } from "../helper";

const onSortAction = action('table-sort');
const onCellClickAction = action('cell-click');
const onActionClickAction = action('action-click');
const onLoadDataAction = action('load-data');

// Mock column configurations
const mockTableColumns = [
    {
        title: "ID",
        dataIndex: "id",
        sortable: true,
        type: 'text',
        sortIcons: {
            neutral: 'solid-chevron-sort',
            asc: 'solid-chevron-sort-up',
            desc: 'solid-chevron-sort-down',
            color: 'primary'
        },
    },
    {
        title: "Image",
        dataIndex: "imageUrl",
        type: "image",
        align: "center"
    },
    {
        title: "Product",
        dataIndex: "productInfo",
        type: "textsubtext",
        width: "100px;"
    },
    {
        title: "Pricing",
        dataIndex: "pricing",
        sortable: true,
        type: 'text',
    },
    {
        title: "Status",
        dataIndex: "statusInfo",
        type: "badge"
    },
    {
        title: "Note",
        dataIndex: "note",
        type: "text"
    },
    {
        title: "Action",
        dataIndex: "action",
        align: "center",
        type: "action-icon",
        icon: {
            name: 'outline-pencil-square',
            color: 'primary'
        }
    },
];

const mockTableData = [
    {
        id: "SSKU0003C", imageUrl: "https://i.pravatar.cc/40?u=3", productInfo: { text: "Product Name C JHKSDKSDS", subtext: "ID: SSKU0003C", colors: { text: 'primary', subtext: 'warning' } }, pricing: "300.000.0000 00000", note: "note 001", statusInfo: {
            text: 'Active',
            themeColor: 'success',
            icon: 'outline-check-circle'
        }
    },
    {
        id: "SSKU0001A", imageUrl: "https://i.pravatar.cc/40?u=1", productInfo: { text: "Product Name A", subtext: "ID: SSKU0001A" }, pricing: "100.00", note: { text: 'สินค้าโปรโมชั่น', color: 'danger' }, statusInfo: {
            text: 'Active',
            themeColor: 'success',
        }
    },
    {
        id: "SSKU0005E", imageUrl: "https://i.pravatar.cc/40?u=5", productInfo: { text: "Product Name E", subtext: "ID: SSKU0005E" }, pricing: "500.00", note: "note 002", action: { name: 'outline-play-circle', color: 'success' }
        , statusInfo: {
            text: 'Active',
            themeColor: 'success',
        }
    },
    {
        id: "SSKU0002B", imageUrl: "https://i.pravatar.cc/40?u=2", productInfo: { text: "Product Name B", subtext: "ID: SSKU0002B" }, pricing: "200.00", note: "note 003", statusInfo: {
            text: 'Inactive',
            themeColor: 'gray',
            icon: 'outline-minus-circle'
        }
    },
    {
        id: "SSKU0004D", imageUrl: "https://i.pravatar.cc/40?u=4", productInfo: { text: "Product Name D", subtext: "ID: SSKU0004D", colors: { text: 'error', subtext: 'warning' } }, pricing: "400.00", note: { text: 'สินค้าปกติ', color: 'success' }, statusInfo: {
            text: 'Pending',
            themeColor: 'warning'
        }
    },
    { id: "SSKU0006B", imageUrl: "https://i.pravatar.cc/40?u=2", productInfo: { text: "Product Name B", subtext: "ID: SSKU0002B" }, pricing: "200.00", note: "note 005", statusInfo: "Active" },
    { id: "SSKU0007D", imageUrl: "https://i.pravatar.cc/40?u=4", productInfo: { text: "Product Name D", subtext: "ID: SSKU0004D" }, pricing: "400.00", note: "note 006", statusInfo: "Active" },
    {
        id: "SSKU0008B", imageUrl: "https://i.pravatar.cc/40?u=2", productInfo: { text: "Product Name B", subtext: "ID: SSKU0002B" }, pricing: "200.00", note: "note 007", statusInfo: {
            text: 'Faild',
            themeColor: 'error'
        }
    },
    {
        id: "SSKU0009D", imageUrl: "https://i.pravatar.cc/40?u=4", productInfo: { text: "Product Name D", subtext: "ID: SSKU0004D", colors: { text: 'warning', subtext: 'success' } }, pricing: "400.00", note: "note 008", statusInfo: {
            text: 'Faild',
            themeColor: 'error'
        }
    },
    { id: "SSKU0010D", imageUrl: "https://i.pravatar.cc/40?u=4", productInfo: { text: "Product Name D", subtext: "ID: SSKU0004D" }, pricing: "400.00", note: { text: 'สินค้าหมด', color: 'warning' }, statusInfo: "Inactive" },
    { id: "SSKU0011B", imageUrl: "https://i.pravatar.cc/40?u=2", productInfo: { text: "Product Name B", subtext: "ID: SSKU0002B" }, pricing: "200.00", note: "note 010", statusInfo: "Inactive" },
    { id: "SSKU0012D", imageUrl: "https://i.pravatar.cc/40?u=4", productInfo: { text: "Product Name D", subtext: "ID: SSKU0004D" }, pricing: "400.00", note: "note 011", statusInfo: "Inactive" },
];


const sortData = (data, dataIndex, direction = 'asc') => {
    return [...data].sort((a, b) => {
        let valA = a[dataIndex];
        let valB = b[dataIndex];

        if (dataIndex === 'productInfo') {
            valA = a.productInfo?.text ?? '';
            valB = b.productInfo?.text ?? '';
        }

        if (dataIndex === 'pricing') {
            valA = parseFloat(valA);
            valB = parseFloat(valB);
        }

        const comparison = typeof valA === 'number' && typeof valB === 'number'
            ? valA - valB
            : String(valA).localeCompare(String(valB));

        return direction === 'asc' ? comparison : -comparison;
    });
};


type WidgetTableArgs = WidgetTable;

const meta = {
    title: "Example/WidgetTable",
    tags: ["autodocs"],
    render: ({ ...args }) => {
        return html`
        <ssk-widget-table
            ${spread(args)}
            .showDescription=${args.showDescription}
            .showButtonIcon=${args.showButtonIcon}
            .disabledButton=${args.disabledButton}
            .showBadge=${args.showBadge}
            .tableColumns=${args.tableColumns}
            .tableData=${args.tableData}
            .totalItems=${args.totalItems}
            .currentPage=${args.currentPage}
            .rowsPerPage=${args.rowsPerPage}
            @table-sort=${(e: CustomEvent) => onSortAction(e.detail)}
            @button-click=${(e: CustomEvent) => onCellClickAction(e.detail)}
            @action-click=${(e: CustomEvent) => onActionClickAction(e.detail)}
            @load-data=${(e: CustomEvent) => onLoadDataAction(e.detail)}>
        </ssk-widget-table>
    `;
    },
    args: {
        testId: 'storybook-widget-table',
        label: "Dashboard Overview",
        description: "Summary of key metrics",
        showDescription: true,
        showButtonIcon: true,
        showBadge: true,
        buttonText: "View Report",
        buttonIcon: "outline-eye",
        badgeText: "+5.2%",
        totalItems: 0,
        currentPage: 1,
        rowsPerPage: 10,
    },
    argTypes: {
        label: { control: "text", table: { category: "Data" } },
        description: { control: "text", table: { category: "Data" } },
        tableColumns: {
            control: "object",
            description: "Configuration array for the table columns.",
            table: { category: "Data" },
        },
        tableData: {
            control: "object",
            description: "Data array for the table rows.",
            table: { category: "Data" },
        },
        buttonText: { control: "text", table: { category: "Data" } },
        badgeText: { control: "text", table: { category: "Data" } },

        totalItems: {
            control: "number",
            description: "Total number of items for server-side pagination. Set to 0 for client-side.",
            table: { category: "Pagination" }
        },
        currentPage: { control: "number", table: { category: "Pagination" } },
        rowsPerPage: { control: "number", table: { category: "Pagination" } },

        showDescription: { control: "boolean", table: { category: "Display Control" } },
        showButtonIcon: { control: "boolean", table: { category: "Display Control" } },
        disabledButton: { control: "boolean", table: { category: "Display Control" } },
        showBadge: { control: "boolean", table: { category: "Display Control" } },

        widgetWidth: {
            control: { type: 'select' },
            options: ['8', '12'],
            table: { category: "Style & Layout" },
        },
        buttonColor: { control: "text", table: { category: "Style & Layout" } },
        buttonVariant: {
            control: { type: 'select' },
            options: ['outline', 'solid', 'ghost', 'solid-light'],
            table: { category: "Style & Layout" },
        },
        buttonIcon: { control: "text", table: { category: "Style & Layout" } },
        badgeColor: { control: "text", table: { category: "Style & Layout" } },
        badgeIcon: { control: "text", table: { category: "Style & Layout" } },
        testId: { control: 'text', table: { category: 'Testing' } },
        ...baseArgsTypes,
    },
} satisfies Meta<WidgetTableArgs>;

export default meta;

type Story = StoryObj<WidgetTableArgs>;

export const Default: Story = {
    name: "Default with Table",
    args: {
        label: "Recent Orders",
        description: "Last 5 orders received",
        tableColumns: mockTableColumns,
        tableData: mockTableData,
    },
};

export const ExampleSortableTable: Story = {
    name: "Example Sortable Table",
    args: {
        label: "Interactive Inventory",
        description: "Click on the 'ID' or 'Pricing' headers to sort the table live.",
        tableColumns: mockTableColumns,
        tableData: mockTableData,
    },
    render: (args) => {
        const handleSortAndUpdate = (e: CustomEvent) => {
            const { dataIndex, direction } = e.detail;
            onSortAction(e.detail);

            const widget = e.currentTarget as WidgetTable;
            const sortedData = sortData(widget.tableData, dataIndex, direction);

            const updatedColumns = widget.tableColumns.map(col => {
                const { sortDirection, ...rest } = col;
                return rest.dataIndex === dataIndex ? { ...rest, sortDirection: direction } : rest;
            });

            widget.tableData = sortedData;
            widget.tableColumns = updatedColumns;
        };

        return html`
        <ssk-widget-table
            ${spread(args)}
            .tableData=${args.tableData}
            .tableColumns=${args.tableColumns}
            .disabledButton=${args.disabledButton}
            @table-sort=${handleSortAndUpdate}
            @cell-click=${(e: CustomEvent) => onCellClickAction(e.detail)}
            @action-click=${(e: CustomEvent) => onActionClickAction(e.detail)}>
        </ssk-widget-table>`;

    },
};

export const NoTable: Story = {
    name: "No Table Displayed",
    args: {
        label: "Simple Widget",
        description: "This widget does not have table data.",
        tableColumns: mockTableColumns,
        tableData: [],
    },
};

export const StaticWideLayout: Story = {
    name: "Wide Layout (8:8)",
    args: {
       label: "Default Customer List",
        description: "Displaying all customers",
        tableColumns: mockTableColumns.map(col => ({
            ...col,
            sortDirection: col.dataIndex === 'id' ? 'asc' : undefined,
        })),
        tableData: sortData(mockTableData, 'id', 'asc'),
    },
};

export const WideLayout: Story = {
    name: "Wide Layout (8:12)",
    args: {
        widgetWidth: '12',
        label: "Full-Width Customer List",
        description: "Displaying all customers",
        disabledButton: false,
        tableColumns: mockTableColumns,
        tableData: [...mockTableData, ...mockTableData],
    },
};