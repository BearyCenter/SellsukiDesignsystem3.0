import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/widget-grid";
import { Grid, GridItem } from "../../../src/components/widget-grid";
import "../../../src/elements/button";
import "../../../src/elements/icon";
import "../../../src/elements/widget-example"
import "../../../src/elements/widget-matric"
import "../../../src/elements/widget-user-detail"
import "../../../src/elements/widget-title"
import "../../../src/elements/widget-table"
import { sectionItem } from "../../../src/elements/widget-user-detail";
import { DropdownItem } from "../../../src/elements/widget-title";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type GridStoryArgs = AutoLitProperty<Grid>;

const meta: Meta<GridStoryArgs> = {
    title: "Example/WidgetGrid",
    tags: ["autodocs"],
    component: 'ssk-widget-grid',
    args: {
        maxColumns: 12,
        gridItemSize: 88
    },
    argTypes: {
        testId: {
            description: "Test ID for the grid container",
            control: "text",
            table: { category: "Props" },
        },
        maxColumns: {
            description: "Maximum number of columns the grid can have.",
            control: "number",
            table: { category: "Props" },
        },
        draggable: { control: "boolean", table: { category: "Props" } },
        ...baseArgsTypes,
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=24171-22186&p=f&t=ne6O48TKBkOMq58D-0",
        },
    },
};

export default meta;

type Story = StoryObj<GridStoryArgs>;
const comprehensiveMockItems: sectionItem[] = [
    {
        id: 'comp-1',
        label: 'Status',
        description: 'Completed',
        showButton: true,
        buttonIcon: 'solid-check-circle',
        buttonColor: 'success',
        showTooltip: true,
        tooltipText: 'Mark as pending'
    },
    {
        id: 'comp-2',
        label: 'Very Long Label to Showcase Ellipsis Truncation text',
        description: 'This is a very long description to showcase how the text truncates',
        showButton: false,
    }
];
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


const dropdownOptions: DropdownItem[] = [
    {
        label: "day",
        value: "รายวัน",
    },
    {
        label: "week",
        value: "รายสัปดาห์",
    },
    {
        label: "month",
        value: "รายเดือน",
    },
    {
        label: "year",
        value: "รายปี",
    },
    {
        label: "3year",
        value: "3ปี",
    },
    {
        label: "test",
        value: "Dog and Cat Festival Winter Season 2025",
    }
];

export const BasicGridWithSlots: Story = {
    name: "Basic Grid (Slots)",
    args: {
        maxColumns: 12,
        gridItemSize: 88,
    },
    render: (args) => html`
        <div>
            <ssk-widget-grid .maxColumns=${args.maxColumns} .gridItemSize=${args.gridItemSize}>
                <ssk-widget-example x="0" y="0" widgetWidth="3" widgetHeight="2"></ssk-widget-example>
            </ssk-widget-grid>
        </div>
    `,
};

export const FullSizeGrid: Story = {
    args: {
        maxColumns: 12,
        gridItemSize: 88,
    },
    render: (args) => {
        return html`
        <div>
            <ssk-widget-grid .maxColumns=${args.maxColumns} .gridItemSize=${args.gridItemSize}>
                <ssk-widget-example x="0" y="0" widgetWidth="3" widgetHeight="2"></ssk-widget-example>
                <ssk-widget-example x="3" y="0" widgetWidth="3" widgetHeight="2"></ssk-widget-example>
                <ssk-widget-example x="6" y="0" widgetWidthw="3" widgetHeight="2"></ssk-widget-example>
                <ssk-widget-example x="9" y="0" widgetWidth="3" widgetHeight="2"></ssk-widget-example>
                <ssk-widget-example x="0" y="2" widgetWidth="4" widgetHeight="4"></ssk-widget-example>
                <ssk-widget-example x="4" y="2" widgetWidth="4" widgetHeight="4"></ssk-widget-example>
                <ssk-widget-example x="8" y="2" widgetWidth="4" widgetHeight="4"></ssk-widget-example>
                <ssk-widget-example x="0" y="6" widgetWidth="8" widgetHeight="4"></ssk-widget-example>
                <ssk-widget-example x="8" y="6" widgetWidth="4" widgetHeight="4"></ssk-widget-example>
                <ssk-widget-example x="0" y="10" widgetWidth="6" widgetHeight="4"></ssk-widget-example>
                <ssk-widget-example x="6" y="10" widgetWidth="6" widgetHeight="4"></ssk-widget-example>
                <ssk-widget-example x="0" y="14" widgetWidth="12" widgetHeight="8"></ssk-widget-example>
            </ssk-widget-grid>
        </div>
        `;
    },
};
export const ItemsSlot: Story = {
    name: "Grid Item (Slot)",
    args: {
        maxColumns: 10,
        gridItemSize: 88,
        testId: "grid-container-slot",
        draggable: false
    },

    render: (args) => {
        return html`
        <div>
            <ssk-widget-grid .maxColumns=${args.maxColumns} .gridItemSize=${args.gridItemSize} .draggable="${args.draggable}">
                <ssk-widget-example x="0" y="0" widgetWidth="2" widgetHeight="2"></ssk-widget-example>
                <ssk-widget-example x="2" y="0" widgetWidth="3" widgetHeight="2"></ssk-widget-example>
                <ssk-widget-example x="0" y="0" widgetWidth="1" widgetHeight="1"></ssk-widget-example>
                <ssk-widget-example x="0" y="3" widgetWidth="4" widgetHeight="2"></ssk-widget-example>
                <ssk-widget-example x="6" y="3" widgetWidth="3" widgetHeight="2"></ssk-widget-example>
                <ssk-widget-example x="0" y="3" widgetWidth="8" widgetHeight="4"></ssk-widget-example>
            </ssk-widget-grid>
        </div>
        `;
    },
};
export const TestWidgetMatric: Story = {
    name: "Widget Matric & User Detail",
    args: {
        maxColumns: 12,
        gridItemSize: 88,
        testId: "grid-container-slot",
    },

    render: (args) => {
        return html`
        <div>
            <ssk-widget-grid .maxColumns=${args.maxColumns} .gridItemSize=${args.gridItemSize}>
                <ssk-widget-matric x="0" y="0" widgetWidth="3" widgetHeight="2" label="1,250,000" subtext="Total Sales" badgetext="3.25%" showbadge="true"></ssk-widget-matric>
                <ssk-widget-matric x="2" y="0" widgetWidth="6" widgetHeight="2" label="View Details" subtext="Click the button" showsubtext="true" showiconleft="true" showbuttonicon="true" .buttonicon="solid-arrow-right-circle"></ssk-widget-matric>
                <ssk-widget-user-detail 
                    x="0" 
                    y="2" 
                    widgetWidth="4" 
                    widgetHeight="3" 
                    label="Project Alpha" 
                    subtext="Last updated 2 hours ago" 
                    showImage="true" 
                    imgUrl="https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
                    .rowItems=${comprehensiveMockItems}>
                </ssk-widget-user-detail>
            </ssk-widget-grid>
        </div>
        `;
    },
};

export const TestWidgetTitle: Story = {
    name: "Widget Matric & WidgetTitle",
    args: {
        maxColumns: 12,
        gridItemSize: 88,
        testId: "grid-container-slot",
    },

    render: (args) => {
        return html`
        <div>
            <ssk-widget-grid .maxColumns=${args.maxColumns} .gridItemSize=${args.gridItemSize}>
                <ssk-widget-title titletext="Dashboard" subtext="สรุปยอดขายประจำปี" buttontext="Filters" showsubtext="true" showbuttontext="true" buttonicon="outline-funnel" actiontype="dropdown" .dropdownOptions=${dropdownOptions} widgetwidth="12"></ssk-widget-title>
                <ssk-widget-matric x="0" y="0" widgetWidth="4" widgetHeight="2" label="1,250,000" subtext="Total Sales" badgetext="3.25%" showbadge="true"></ssk-widget-matric>
                <ssk-widget-matric x="0" y="0" widgetWidth="4" widgetHeight="2" label="1,250,000" subtext="Total Sales" badgetext="3.25%" showbadge="true"></ssk-widget-matric>
                <ssk-widget-matric x="0" y="0" widgetWidth="4" widgetHeight="2" label="1,250,000" subtext="Total Sales" badgetext="3.25%" showbadge="true"></ssk-widget-matric>
            </ssk-widget-grid>
        </div>
        `;
    },
};

export const TestWidgetTable: Story = {
    name: "Widget Matric & Widget Table",
    args: {
        maxColumns: 12,
        gridItemSize: 88,
        testId: "grid-container-slot",
    },

    render: (args) => {
        return html`
        <div>
            <ssk-widget-grid .maxColumns=${args.maxColumns} .gridItemSize=${args.gridItemSize}>
                <ssk-widget-matric x="0" y="0" widgetWidth="3" widgetHeight="2" label="1,250,000" subtext="Total Sales" badgetext="3.25%" showbadge="true"></ssk-widget-matric>
                <ssk-widget-table x="0" y="3" widgetWidth="8" widgetHeight="8"
                label="Recent Orders" description="Last 5 orders received" showdescription="false" showbuttonicon="true" showbadge="true" buttontext="View Report" buttonicon="outline-eye" badgetext="+5.2%" totalitems="0" currentpage="1" rowsperpage="10" .tableColumns=${mockTableColumns} .tableData=${mockTableData}>
                </ssk-widget-table>
                </ssk-widget-grid>
        </div>
        `;
    },
};