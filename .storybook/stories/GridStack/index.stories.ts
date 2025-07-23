import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/grid-stack";
import { Grid } from "../../../src/components/grid-stack";
import "../../../src/elements/button";
import "../../../src/elements/icon";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type GridStoryArgs = AutoLitProperty<Grid>;

const meta: Meta<GridStoryArgs> = {
    title: "Example/GridStack",
    tags: ["autodocs"],
    render: (args) => {
        const items = [
            { id: 1, x: 0, y: 0 },
        ];

        const calculatePixelSize = (gridUnits: number, itemSize: number): string => {
            if (gridUnits <= 0) return '0px';
            return `${(gridUnits * itemSize)}px`;
        };

        return html`
        <style>
            .widget-a {
                background-color:rgb(219, 216, 216);
                width: 232px;
                height: 144px;
                color: black;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
            }
        </style>
        <ssk-grid-stack .items=${items} ${spread(args)}>
            <div class="grid-item" data-id="1"
            style="background-color:transparent;
            width: ${calculatePixelSize(3, args.gridItemSize)};
            height: ${calculatePixelSize(2, args.gridItemSize)};
            ">
                <div class="widget-a">
                    <h3>Widget</h3><p>3x2 (Default)</p>
                </div>
            </div>
        </ssk-grid-stack>
        `;
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
    decorators: [
        (story) => html`
        <style>
        .grid-item {
            position: absolute;
            color: white;
            font-weight: bold;
            font-size: 14px;
            border-radius: 6px;
            cursor: grab;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: box-shadow 0.3s ease;
            user-select: none;
            box-sizing: border-box;
            text-align: center;
        }

        .grid-item:active {
            cursor: grabbing;
        }
        </style>
        ${story()}
        `,
    ],
};

export default meta;

type Story = StoryObj<GridStoryArgs>;

export const BasicGrid: Story = {
    args: {},
    ...baseArgsTypes,
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=24642-38098&t=3hx9kkCIh7ETZkq6-0",
        },
    },
};

export const FullSizeGrid: Story = {
    args: {
        maxColumns: 12,
    },
    render: (args) => {
        const items = [
            { id: 1, x: 0, y: 0 },
            { id: 2, x: 3, y: 0 },
            { id: 3, x: 6, y: 0 },
            { id: 4, x: 9, y: 0 },
            { id: 5, x: 0, y: 2 },
            { id: 6, x: 4, y: 2 },
            { id: 7, x: 8, y: 2 },
            { id: 8, x: 0, y: 6 },
            { id: 9, x: 8, y: 6 },
            { id: 10, x: 0, y: 10 },
            { id: 11, x: 6, y: 10 },
            { id: 12, x: 0, y: 14 },
        ];

        const calculatePixelSize = (gridUnits: number, itemSize: number): string => {
            if (gridUnits <= 0) return '0px';
            return `${(gridUnits * itemSize)}px`;
        };

        return html`
        <style>
        .widget-a {
            background-color:rgb(219, 216, 216);
            width: 232px;
            height: 144px;
            color: black;
        }
        .widget-b {
            background-color:rgb(219, 216, 216);
            width: 320px;
            height: 320px;
            color: black;
        }
        .widget-c {
            background-color:rgb(219, 216, 216);
            width: 672px;
            height: 320px;
            color: black;
        }
        .widget-d {
            background-color:rgb(219, 216, 216);
            width: 496px;
            height: 320px;
            color: black;
        }
        .widget-e {
            background-color:rgb(219, 216, 216);
            width: 1024px;
            height: 672px;
            color: black;
        }
        </style>
        <ssk-grid-stack .items=${items} .maxColumns=${args.maxColumns}>
            <div class="grid-item" data-id="1" 
            style="background-color:transparent; 
            width: ${calculatePixelSize(3, args.gridItemSize)}; 
            height: ${calculatePixelSize(2, args.gridItemSize)};
            ">
                <div class="widget-a">
                    <h3>Widget 1</h3><p>3:2</p>
                </div>
            </div>
            <div class="grid-item" data-id="2" 
            style="background-color:transparent; 
            width: ${calculatePixelSize(3, args.gridItemSize)}; 
            height: ${calculatePixelSize(2, args.gridItemSize)};
            ">
                <div class="widget-a">
                    <h3>Widget 2</h3><p>3:2</p>
                </div>
            </div>
            <div class="grid-item" data-id="3" 
            style="background-color:transparent; 
            width: ${calculatePixelSize(3, args.gridItemSize)}; 
            height: ${calculatePixelSize(2, args.gridItemSize)};
            ">
                <div class="widget-a">
                    <h3>Widget 3</h3><p>3:2</p>
                </div>
            </div>
            <div class="grid-item" data-id="4" 
            style="background-color:transparent; 
            width: ${calculatePixelSize(3, args.gridItemSize)}; 
            height: ${calculatePixelSize(2, args.gridItemSize)};
            ">
                <div class="widget-a">
                    <h3>Widget 4</h3><p>3:2</p>
                </div>
            </div>
            <div class="grid-item" data-id="5" 
                style="background-color:transparent; 
                        width: ${calculatePixelSize(4, args.gridItemSize)}; 
                        height: ${calculatePixelSize(4, args.gridItemSize)};">
                <div class="widget-b">
                    <h3>Widget 5</h3><p>4:4</p>
                </div>
            </div>
            <div class="grid-item" data-id="6" 
                style="background-color:transparent; 
                        width: ${calculatePixelSize(4, args.gridItemSize)}; 
                        height: ${calculatePixelSize(4, args.gridItemSize)};">
                <div class="widget-b">
                    <h3>Widget 6</h3><p>4:4</p>
                </div>
            </div>
            <div class="grid-item" data-id="7" 
                style="background-color:transparent; 
                        width: ${calculatePixelSize(4, args.gridItemSize)}; 
                        height: ${calculatePixelSize(4, args.gridItemSize)};">
                <div class="widget-b">
                    <h3>Widget 7</h3><p>4:4</p>
                </div>
            </div>
            <div class="grid-item" data-id="8" 
            style="background-color: transparent; 
            width: ${calculatePixelSize(8, args.gridItemSize)}; 
            height: ${calculatePixelSize(4, args.gridItemSize)};">
                <div class="widget-c">
                    <h3>Widget 8</h3><p>8:4</p>
                </div>
            </div>
            <div class="grid-item" data-id="9" 
                style="background-color:transparent; 
                        width: ${calculatePixelSize(4, args.gridItemSize)}; 
                        height: ${calculatePixelSize(4, args.gridItemSize)};">
                <div class="widget-b">
                    <h3>Widget 9</h3><p>4:4</p>
                </div>
            </div>
            <div class="grid-item" data-id="10" 
                style="background-color:transparent; 
                        width: ${calculatePixelSize(6, args.gridItemSize)}; 
                        height: ${calculatePixelSize(4, args.gridItemSize)};">
                <div class="widget-d">
                    <h3>Widget 10</h3><p>6:4</p>
                </div>
            </div>
            <div class="grid-item" data-id="11" 
                style="background-color:transparent; 
                        width: ${calculatePixelSize(6, args.gridItemSize)}; 
                        height: ${calculatePixelSize(4, args.gridItemSize)};">
                <div class="widget-d">
                    <h3>Widget 11</h3><p>6:4</p>
                </div>
            </div>
            <div class="grid-item" data-id="12" 
                style="background-color:transparent; 
                        width: ${calculatePixelSize(12, args.gridItemSize)}; 
                        height: ${calculatePixelSize(8, args.gridItemSize)};">
                <div class="widget-e">
                    <h3>Widget 12</h3><p>12:8</p>
                </div>
            </div>
        </ssk-grid-stack>
        `;
    },
};

export const StaticItems: Story = {
    args: {
        maxColumns: 8,
    },
    render: (args) => {
        const items = [
            { id: 1, x: 0, y: 0 },
            { id: 2, x: 2, y: 0 },
            { id: 3, x: 5, y: 0 },
            { id: 4, x: 9, y: 0 },
            { id: 5, x: 0, y: 3 },
            { id: 6, x: 3, y: 3 },
            { id: 7, x: 6, y: 3 },
            { id: 8, x: 9, y: 3 },
            { id: 9, x: 0, y: 5 },
            { id: 10, x: 0, y: 7 },
        ];

        const calculatePixelSize = (gridUnits: number, itemSize: number): string => {
            if (gridUnits <= 0) return '0px';
            return `${(gridUnits * itemSize)}px`;
        };

        return html`
        <style>
        .a {
            background-color: blue;
            width: 144px;
            height: 144px;
        }
        .b {
            background-color: #e91e63;
            width: 232px;
            height: 56px;
        }
        .c {
            background-color: #9c27b0;
            width: 56px;
            height: 144px;
        }
        .d {
            background-color: rgb(224, 30, 30);
            width: 56px;
            height: 56px;
        }
        .e {
            background-color: rgb(15, 189, 202);
            width: 232px;
            height: 144px;
        }
        .f {
            background-color: rgb(164, 236, 123);
            width: 320px;
            height: 144px;
        }
        </style>
        <ssk-grid-stack .items=${items}
        .maxColumns=${args.maxColumns}
        >
            <div class="grid-item" data-id="1" 
            style="background-color:transparent; 
            width: ${calculatePixelSize(2, args.gridItemSize)}; 
            height: ${calculatePixelSize(2, args.gridItemSize)};
            ">
                <div class="a">
                    <h3>2x2</h3><p>Item 1</p>
                </div>
            </div>
            <div class="grid-item" data-id="2" 
                style="background-color:transparent; 
                        width: ${calculatePixelSize(3, args.gridItemSize)}; 
                        height: ${calculatePixelSize(1, args.gridItemSize)};">
                <div class="b">
                    <h3>3:1</h3><p>Item 2</p>
                </div>
            </div>
            <div class="grid-item" data-id="3" 
            style="background-color: transparent; 
            width: ${calculatePixelSize(1, args.gridItemSize)}; 
            height: ${calculatePixelSize(2, args.gridItemSize)};">
                <div class="c">
                    <h3>1x2</h3><p>Item 3</p>
                </div>
            </div>
            <div class="grid-item" data-id="5" 
            style="background-color:transparent;
            width: ${calculatePixelSize(3, args.gridItemSize)}; 
            height: ${calculatePixelSize(2, args.gridItemSize)};">
                <div class="e">
                    <h3>3:2</h3><p>Item 5</p>
                </div>
            </div>
            <div class="grid-item" data-id="6" 
            style="background-color:transparent; 
            width: ${calculatePixelSize(3, args.gridItemSize)}; 
            height: ${calculatePixelSize(2, args.gridItemSize)};">
                <div class="e">
                    <h3>3:2</h3><p>Item 6</p>
                </div>
            </div>
            <div class="grid-item" data-id="7" 
            style="background-color:transparent;
            width: ${calculatePixelSize(3, args.gridItemSize)}; 
            height: ${calculatePixelSize(2, args.gridItemSize)};">
                <div class="e">
                    <h3>3:2</h3><p>Item 7</p>
                </div>
            </div>
            <div class="grid-item" data-id="8" 
            style="background-color:transparent;
            width: ${calculatePixelSize(3, args.gridItemSize)}; 
            height: ${calculatePixelSize(2, args.gridItemSize)};">
                <div class="e">
                    <h3>3:2</h3><p>Item 8</p>
                </div>
            </div>
            <div class="grid-item" data-id="9" 
            style="background-color:transparent;
            width: ${calculatePixelSize(4, args.gridItemSize)}; 
            height: ${calculatePixelSize(2, args.gridItemSize)};">
                <div class="f">
                    <h3>4:2</h3><p>Item 9</p>
                </div>
            </div>
        </ssk-grid-stack>
        `;
    },
};