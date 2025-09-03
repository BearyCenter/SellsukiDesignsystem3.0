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
import { sectionItem } from "../../../src/elements/widget-user-detail";
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