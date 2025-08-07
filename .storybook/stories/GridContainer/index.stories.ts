import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/grid-container";
import { Grid, GridItem } from "../../../src/components/grid-container"; // Import GridItem interface
// import '../src/components/grid-container/gs/gridstack.css';
// import '../../../src/components/grid-container/gs/gridstack.css'
import "../../../src/elements/button";
import "../../../src/elements/icon";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type GridStoryArgs = AutoLitProperty<Grid>;

const meta: Meta<GridStoryArgs> = {
    title: "Example/GridContainer",
    tags: ["autodocs"],
    component: 'ssk-grid-container',
    args: {
        maxColumns: 12,
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
        // ...
    },
};

export default meta;

type Story = StoryObj<GridStoryArgs>;

export const BasicGridWithSlots: Story = {
    name: "Basic Grid (Slots)",
    args: {
        maxColumns: 12,
    },
    render: (args) => html`
        <style>
            .widget-content {
                background-color: #f0f0f0;
                color: black;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                border-radius: 5px;
            }
        </style>
        <ssk-grid-container .maxColumns=${args.maxColumns}>
            <div class="grid-stack-item" data-gs-x="0" data-gs-y="0" data-gs-w="3" data-gs-h="2">
                <div class="grid-stack-item-content">
                    <div class="widget-content">
                        <h3>Widget</h3><p>3x2</p>
                    </div>
                </div>
            </div>
            <div class="grid-stack-item" data-gs-x="3" data-gs-y="0" data-gs-w="1" data-gs-h="1">
                <div class="grid-stack-item-content">
                    <div class="widget-content">
                        <h3>1x1</h3>
                    </div>
                </div>
            </div>
        </ssk-grid-container>
    `,
};

// --- Story 3: Full Size Grid with Property ---
export const FullSizeGrid: Story = {
    args: {
        maxColumns: 12,
    },
    render: (args) => {
        const items: GridItem[] = [
            { id: 1, x: 0, y: 0, w: 3, h: 2, content: `<div class="widget-a"><h3>Widget 1</h3><p>3:2</p></div>` },
            { id: 2, x: 3, y: 0, w: 3, h: 2, content: `<div class="widget-a"><h3>Widget 2</h3><p>3:2</p></div>` },
            { id: 3, x: 6, y: 0, w: 3, h: 2, content: `<div class="widget-a"><h3>Widget 3</h3><p>3:2</p></div>` },
            { id: 4, x: 9, y: 0, w: 3, h: 2, content: `<div class="widget-a"><h3>Widget 4</h3><p>3:2</p></div>` },
            { id: 5, x: 0, y: 2, w: 4, h: 4, content: `<div class="widget-b"><h3>Widget 5</h3><p>4:4</p></div>` },
            { id: 6, x: 4, y: 2, w: 4, h: 4, content: `<div class="widget-b"><h3>Widget 6</h3><p>4:4</p></div>` },
            { id: 7, x: 8, y: 2, w: 4, h: 4, content: `<div class="widget-b"><h3>Widget 7</h3><p>4:4</p></div>` },
            { id: 8, x: 0, y: 6, w: 8, h: 4, content: `<div class="widget-c"><h3>Widget 8</h3><p>8:4</p></div>` },
            { id: 9, x: 8, y: 6, w: 4, h: 4, content: `<div class="widget-b"><h3>Widget 9</h3><p>4:4</p></div>` },
            { id: 10, x: 0, y: 10, w: 6, h: 4, content: `<div class="widget-d"><h3>Widget 10</h3><p>6:4</p></div>` },
            { id: 11, x: 6, y: 10, w: 6, h: 4, content: `<div class="widget-d"><h3>Widget 11</h3><p>6:4</p></div>` },
            { id: 12, x: 0, y: 14, w: 12, h: 8, content: `<div class="widget-e"><h3>Widget 12</h3><p>12:8</p></div>` },
        ];

        return html`
        <style>
        .widget-a, .widget-b, .widget-c, .widget-d, .widget-e {
            background-color:rgb(219, 216, 216);
            color: black;
            height: 100%;
        }
        </style>
        <ssk-grid-container .items=${items} .maxColumns=${args.maxColumns}></ssk-grid-container>
        `;
    },
};

// --- Story 4: Static Items with Property ---
export const StaticItems: Story = {
    args: {
        maxColumns: 12,
    },
    render: (args) => {
        const items: GridItem[] = [
            { id: 1, x: 0, y: 0, w: 2, h: 2, content: `<div class="a"><h3>2:2</h3><p>Item 1</p></div>` },
            { id: 2, x: 2, y: 0, w: 3, h: 3, content: `<div class="b"><h3>3:3</h3><p>Item 2</p></div>` },
            { id: 3, x: 5, y: 0, w: 1, h: 2, content: `<div class="c"><h3>1:2</h3><p>Item 3</p></div>` },
            { id: 4, x: 9, y: 0, w: 3, h: 2, content: `<div class="e"><h3>3:2</h3><p>Item 4</p></div>` },
            { id: 5, x: 0, y: 3, w: 3, h: 2, content: `<div class="e"><h3>3:2</h3><p>Item 5</p></div>` },
            { id: 6, x: 3, y: 3, w: 3, h: 2, content: `<div class="e"><h3>3:2</h3><p>Item 6</p></div>` },
            { id: 7, x: 6, y: 3, w: 3, h: 2, content: `<div class="e"><h3>3:2</h3><p>Item 7</p></div>` },
            { id: 8, x: 9, y: 3, w: 3, h: 2, content: `<div class="e"><h3>3:2</h3><p>Item 8</p></div>` },
            { id: 9, x: 0, y: 5, w: 4, h: 2, content: `<div class="f"><h3>4:2</h3><p>Item 9</p></div>` },
            { id: 10, x: 0, y: 7, w: 4, h: 2, content: `<div class="f"><h3>4:2</h3><p>Item 10</p></div>` },
        ];

        return html`
        <style>
        .a, .b, .c, .e, .f {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .a { background-color: blue; }
        .b { background-color: #e91e63; }
        .c { background-color: #9c27b0; }
        .e { background-color: rgb(15, 189, 202); }
        .f { background-color: rgb(164, 236, 123); }
        </style>
        <ssk-grid-container .items=${items} .maxColumns=${args.maxColumns}>
        </ssk-grid-container>
        `;
    },
};
export const ItemsSlot: Story = {
    args: {
        maxColumns: 12,
    },
    render: (args) => {
        return html`
        <ssk-grid-container>
            <div class="grid-stack-item" gs-x="0" gs-y="0" gs-w="2" gs-h="1">
                <div class="grid-stack-item-content">Item A</div>
            </div>
            <div class="grid-stack-item" gs-x="2" gs-y="0" gs-w="1" gs-h="2">
                <div class="grid-stack-item-content">Item B</div>
            </div>
        </ssk-grid-container>
        `;
    },
};