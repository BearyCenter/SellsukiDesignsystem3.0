import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/grid-container";
import { Grid, GridItem } from "../../../src/components/grid-container";
import "../../../src/elements/button";
import "../../../src/elements/icon";
import "../../../src/elements/widget-example"
import { AutoLitProperty, baseArgsTypes } from "../helper";

type GridStoryArgs = AutoLitProperty<Grid>;

const meta: Meta<GridStoryArgs> = {
    title: "Example/GridContainer",
    tags: ["autodocs"],
    component: 'ssk-grid-container',
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

export const BasicGridWithSlots: Story = {
    name: "Basic Grid (Slots)",
    args: {
        maxColumns: 12,
        gridItemSize: 88,
    },
    render: (args) => html`
        <div>
            <ssk-grid-container .maxColumns=${args.maxColumns} .gridItemSize=${args.gridItemSize}>
                <div gs-x="0" gs-y="0" gs-w="3" gs-h="2" style="width:100%; height:100%">
                    <ssk-widget-example></ssk-widget-example>
                </div>
            </ssk-grid-container>
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
            <ssk-grid-container .maxColumns=${args.maxColumns} .gridItemSize=${args.gridItemSize}>
                <div gs-x="0" gs-y="0" gs-w="3" gs-h="2" style="width:100%; height:100%">
                    <ssk-widget-example></ssk-widget-example>
                </div>
                <div gs-x="3" gs-y="0" gs-w="3" gs-h="2" style="width:100%; height:100%">
                    <ssk-widget-example></ssk-widget-example>
                </div>
                <div gs-x="6" gs-y="0" gs-w="3" gs-h="2" style="width:100%; height:100%">
                    <ssk-widget-example></ssk-widget-example>
                </div>
                <div gs-x="9" gs-y="0" gs-w="3" gs-h="2" style="width:100%; height:100%">
                    <ssk-widget-example></ssk-widget-example>
                </div>
                <div gs-x="0" gs-y="2" gs-w="4" gs-h="4" style="width:100%; height:100%">
                    <ssk-widget-example></ssk-widget-example>
                </div>
                <div gs-x="4" gs-y="2" gs-w="4" gs-h="4" style="width:100%; height:100%">
                    <ssk-widget-example></ssk-widget-example>
                </div>
                <div gs-x="8" gs-y="2" gs-w="4" gs-h="4" style="width:100%; height:100%">
                    <ssk-widget-example></ssk-widget-example>
                </div>
                <div gs-x="0" gs-y="6" gs-w="8" gs-h="4" style="width:100%; height:100%">
                    <ssk-widget-example></ssk-widget-example>
                </div>
                <div gs-x="8" gs-y="6" gs-w="4" gs-h="4" style="width:100%; height:100%">
                    <ssk-widget-example></ssk-widget-example>
                </div>
                <div gs-x="0" gs-y="10" gs-w="6" gs-h="4" style="width:100%; height:100%">
                    <ssk-widget-example></ssk-widget-example>
                </div>
                <div gs-x="6" gs-y="10" gs-w="6" gs-h="4" style="width:100%; height:100%">
                    <ssk-widget-example></ssk-widget-example>
                </div>
                <div gs-x="0" gs-y="14" gs-w="12" gs-h="8" style="width:100%; height:100%">
                    <ssk-widget-example></ssk-widget-example>
                </div>
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
    },

    render: (args) => {
        return html`
        <div>
            <ssk-grid-container .maxColumns=${args.maxColumns} .gridItemSize=${args.gridItemSize}>
                <div class="test" gs-x="0" gs-y="0" gs-w="2" gs-h="2" style="width:100%; height:100%">
                    <ssk-widget-example></ssk-widget-example></div>
                <div gs-x="2" gs-y="0" gs-w="2" gs-h="2" style="width:100%; height:100%">
                    <ssk-widget-example></ssk-widget-example>
                </div>
                <div gs-x="0" gs-y="0" gs-w="1" gs-h="1" style="background:green; width:100%; height:100%; color: #fff; text-align: center;">item</div>
                <div gs-x="0" gs-y="3" gs-w="4" gs-h="2" style="width:100%; height:100%">
                    <ssk-widget-example></ssk-widget-example>
                </div>
                <div gs-x="6" gs-y="3" gs-w="3" gs-h="2" style="width:100%; height:100%">
                    <ssk-widget-example></ssk-widget-example>
                </div>
                <div gs-x="0" gs-y="3" gs-w="8" gs-h="4" style="width:100%; height:100%">
                    <ssk-widget-example></ssk-widget-example>
                </div>
            </ssk-grid-container>
        </div>
        `;
    },
};