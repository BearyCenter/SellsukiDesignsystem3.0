import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/grid-container";
import { GridContainer } from "../../../src/components/grid-container";
import "../../../src/elements/button";
import "../../../src/elements/icon";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type GridContainerStoryArgs = AutoLitProperty<GridContainer>;

const meta: Meta<GridContainerStoryArgs> = {
    title: "Example/GridContainer",
    tags: ["autodocs"],
    render: (args) => {
        return html`
        <ssk-grid-container ${spread(args)}>
            <div class="grid-item">
                <h3>Widget 1</h3>
                <p>This widget displays key performance indicators.</p>
                <ssk-button ssk-button>View Details</ssk-button>
            </div>
            <div class="grid-item">
                <h3>Widget 2</h3>
                <p>Here's a list of recent activities and notifications.</p>
                <ssk-button>Configure</ssk-button>
            </div>
            <div class="grid-item">
                <h3>Widget 3</h3>
                <p>A simple form for quick data entry.</p>
                <ssk-button>Add Item</ssk-button>
            </div>
        </ssk-grid-container>
        `;
    },
    argTypes: {
        gridTemplateColumns: {
            description: "Defines the columns of the grid (e.g., '1fr 1fr 1fr', 'repeat(3, 1fr)')",
            control: "text",
            table: {
                category: "Props",
            },
        },
        gridTemplateRows: {
            description: "Defines the rows of the grid (e.g., 'auto 1fr', '100px auto')",
            control: "text",
            table: {
                category: "Props",
            },
        },
        gap: {
            description: "Sets the gap between grid items (e.g., '16px', '1rem')",
            control: "text",
            table: {
                category: "Props",
            },
        },
        // alignItems: {
        //     description: "Aligns grid items along the column axis (start, end, center, stretch)",
        //     control: { type: "select" },
        //     options: ["stretch", "start", "end", "center"],
        //     table: {
        //         category: "Props",
        //     },
        // },
        // justifyItems: {
        //     description: "Aligns grid items along the row axis (start, end, center, stretch)",
        //     control: { type: "select" },
        //     options: ["stretch", "start", "end", "center"],
        //     table: {
        //         category: "Props",
        //     },
        // },
        padding: {
            description: "Padding around the entire grid container (e.g., '24px', '1rem 2rem')",
            control: "text",
            table: {
                category: "Props",
            },
        },
        testId: {
            description: "The test ID for the grid container",
            control: "text",
            table: {
                category: "Props",
            },
        },
        ...baseArgsTypes,
    },
    decorators: [
        (story) => html`
        <style>
            .sb-main-padded {
                background-color: var(--theme-colors-background-200, #f0f2f5);
                padding: 20px;
            }
            .grid-item {
                background-color: #ffffff;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                padding: 20px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                justify-content: space-between;
                align-items: flex-start;
            }
            .grid-item h3 {
                margin-top: 0;
                margin-bottom: 5px;
                color: #333;
            }
            .grid-item p {
                color: #666;
                flex-grow: 1;
            }
            .default-size-grid-item {
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                font-size: 14px;
                font-weight: bold;
                background-color: #e3f2fd;
                border: 1px solid #90caf9;
                border-radius: 4px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                color: #2196f3; /* Blue text */
                padding: 0;
            }
        </style>
        ${story()}
        `,
    ],
};

export default meta;

type Story = StoryObj<GridContainerStoryArgs>;

export const BasicGrid: Story = {
    args: {
        padding: "16px",
        gap: "16px"
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1253-75169&mode=design&t=pTwjadNPUzRZF6jG-0", // Placeholder URL
        },
    },
};

export const TwoColumnLayout: Story = {
    args: {
        ...BasicGrid.args,
        gap: "16px",
        padding: "0px",
    },
    render: (args) => {
        return html`
        <ssk-grid-container ${spread(args)}>
            <div class="grid-item">
                <h3>Side Panel</h3>
                <p>This area can be used for navigation or quick links.</p>
                <ul>
                    <li>Dashboard</li>
                    <li>Settings</li>
                    <li>Reports</li>
                </ul>
            </div>
            <div class="grid-item">
                <h3>Main Content Area</h3>
                <p>This is the primary display area for detailed information.</p>
                ${Array(5)
                        .fill(0)
                        .map(
                            (_, i) => html`<p>Detailed content line ${i + 1} for this section.</p>`,
                        )}
                <ssk-button>Load More</ssk-button>
            </div>
        </ssk-grid-container>
        `;
    },
};

export const DashboardLayout: Story = {
    args: {
        ...BasicGrid.args,
        gap: "16px",
        padding: "0px",
    },
    render: (args) => {
        return html`
        <ssk-grid-container ${spread(args)}>
            <div class="grid-item" style="grid-column: span 12; grid-row: span 2; background-color: #e3f2fd;">
                <h2>Dashboard Header</h2>
                <p>Welcome, User! Here's an overview of your data.</p>
            </div>
            <div class="grid-item" style="grid-column: span 1; grid-row: span 1;">
                <h3>Sales Chart</h3>
                <p>Visual representation of monthly sales.</p>
                <img src="https://placehold.co/150x100/ADD8E6/000000?text=Chart" alt="Sales Chart Placeholder" style="max-width: 100%; height: auto; border-radius: 4px;">
            </div>
            <div class="grid-item">
                <h3>Recent Activity</h3>
                <ul>
                    <li>New order #12345</li>
                    <li>User 'Jane Doe' logged in</li>
                    <li>Report generated for Q2</li>
                </ul>
            </div>
            <div class="grid-item">
                <h3>Quick Stats</h3>
                <p>Total Users: <strong>1,200</strong></p>
                <p>Active Projects: <strong>15</strong></p>
            </div>
                <div class="grid-item" style="grid-column: 1 / span 3; background-color: #e8f5e9;">
                <p>Dashboard Footer - &copy; 2025 Your Company</p>
            </div>
        </ssk-grid-container>
        `;
    },
};

export const DefaultSizeGrid: Story = {
    args: {
        gap: "16px",
        padding: "16px",
    },
    render: (args) => {
        return html`
        <ssk-grid-container ${spread(args)}>
            <div class="default-size-grid-item" style="grid-column: span 1; grid-row: span 1;">
                1:1
            </div>
            <div class="default-size-grid-item" style="grid-column: span 1; grid-row: span 2;">
                1:2
            </div>
            <div class="default-size-grid-item" style="grid-column: span 2; grid-row: span 2;">
                2:2
            </div>
            <div class="default-size-grid-item" style="grid-column: span 1; grid-row: span 3;">
                1:3
            </div>
            <div class="default-size-grid-item" style="grid-column: span 1; grid-row: span 4;">
                1:4
            </div>
            <div class="default-size-grid-item" style="grid-column: span 2; grid-row: span 3;">
                2:3
            </div>
            <div class="default-size-grid-item" style="grid-column: span 4; grid-row: span 4;">
                4:4
            </div>
            <div class="default-size-grid-item" style="grid-column: span 4; grid-row: span 6;">
                4:6
            </div>
        </ssk-grid-container>
        `;
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1253-75169&mode=design&t=pTwjadNPUzRZF6jG-0", // Placeholder URL
        },
    },
};

// export const MaxColumnsGrid: Story = {
//     args: {
//         gridTemplateColumns: "repeat(12, 1fr)",
//         gridTemplateRows: "minmax(188px, auto)",
//         gap: "16px",
//         padding: "0px",
//     },
//     render: (args) => {
//         return html`
//         <ssk-grid-container ${spread(args)}>
//             ${Array(15)
//                 .fill(0)
//                 .map(
//                     (_, i) => html`
//                 <div class="default-size-grid-item" style="height: 88px;">
//                     ${i + 1}
//                 </div>
//                 `,
//                     )}
//         </ssk-grid-container>
//         <p style="text-align: center; margin-top: 20px; font-size: 14px; color: #555;">
//             This grid displays exactly 12 columns. Items will wrap to a new line if there are more than 12.
//         </p>
//         `;
//     },
//     parameters: {
//         design: {
//             type: "figma",
//             url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1253-75169&mode=design&t=pTwjadNPUzRZF6jG-0", // Placeholder URL
//         },
//     },
// };

export const DraggableGrid: Story = {
    args: {
        // gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
        // gridTemplateRows: "minmax(100px, auto)",
        gap: "16px",
        padding: "8px",
    },
    render: (args) => {
        const initialItems = [
            // { id: 'full-item-1', content: 'Item 1' },
            // { id: 'full-item-2', content: 'Item 2' },
            // { id: 'full-item-3', content: 'Item 3' },
            // { id: 'full-item-4', content: 'Item 4' },
            // { id: 'full-item-5', content: 'Item 5' },
            // { id: 'full-item-6', content: 'Item 6' },
            // { id: 'full-item-7', content: 'Item 7' },
            // { id: 'full-item-8', content: 'Item 8' },
            // { id: 'full-item-9', content: 'Item 9' },
            // { id: 'full-item-10', content: 'Item 10' },
            // { id: 'full-item-11', content: 'Item 11' },
            // { id: 'full-item-12', content: 'Item 12' },
            { id: 'full-item-span-2', content: 'Item 1', colSpan: 1 ,rowSpan: 2},
            { id: 'full-item-span-3', content: 'Item 2', colSpan: 1 ,rowSpan: 1},
            { id: 'full-item-span-4', content: 'Item 3', colSpan: 1 ,rowSpan: 1},
            { id: 'full-item-span-5', content: 'Item 4', colSpan: 1 ,rowSpan: 1},
            { id: 'full-item-span-6', content: 'Item 5', colSpan: 1 ,rowSpan: 1},
            { id: 'full-item-span-7', content: 'Item 6', colSpan: 1 ,rowSpan: 1},
            { id: 'full-item-span-5', content: 'Item 7', colSpan: 1 ,rowSpan: 1},
            { id: 'full-item-span-8', content: 'Item 8', colSpan: 1 ,rowSpan: 1},
            { id: 'full-item-span-4', content: 'Item 9', colSpan: 1 ,rowSpan: 1},
            { id: 'full-item-span-10', content: 'Item 10', colSpan: 1 ,rowSpan: 1},
            { id: 'full-item-span-2', content: 'Item 11', colSpan: 1 ,rowSpan: 1},
            { id: 'full-item-span-12', content: 'Item 12', colSpan: 1 ,rowSpan: 1},
            { id: 'full-item-span-12', content: 'Item 13', colSpan: 1 ,rowSpan: 1},
        ];

        const handleReordered = (e: CustomEvent) => {
            console.log('Grid reordered:', e.detail.newOrder);
        };

       return html`
        <ssk-grid-container ${spread(args)} @grid-reordered=${handleReordered} style="min-height: 600px; border: 2px dashed #ccc; padding: 10px;">
            ${initialItems.map(item => html`
            <div
                id="${item.id}"
                class="grid-item default-size-grid-item"
                style="height: ${item.rowSpan ? `${item.rowSpan * 88 + (item.rowSpan - 1) * 10}px` : '88px'};
                ${item.colSpan ? `grid-column: span ${item.colSpan};` : ''}
                ${item.rowSpan ? `grid-row: span ${item.rowSpan};` : ''}
                "
            >
                ${item.content}
            </div>
            `)}
        </ssk-grid-container>
        `;
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1253-75169&mode=design&t=pTwjadNPUzRZF6jG-0", // Placeholder URL
        },
    },
};

export const DraggableGridFullControl: Story = {
    args: {
        // gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
        // gridTemplateRows: "repeat(auto-fit, minmax(100px, 1fr))",
        gap: "16px",
        padding: "8px",
    },
    render: (args) => {
        const initialItems = [
            { id: 'full-item-1', content: 'Item 1' },
            { id: 'full-item-2', content: 'Item 2' },
            { id: 'full-item-3', content: 'Item 3' },
            { id: 'full-item-4', content: 'Item 4' },
            { id: 'full-item-5', content: 'Item 5' },
            { id: 'full-item-6', content: 'Item 6' },
            { id: 'full-item-7', content: 'Item 7' },
            { id: 'full-item-8', content: 'Item 8' },
            { id: 'full-item-9', content: 'Item 9' },
            { id: 'full-item-10', content: 'Item 10' },
            { id: 'full-item-11', content: 'Item 11' },
            { id: 'full-item-12', content: 'Item 12' },
            { id: 'full-item-span-2', content: 'Span 2 Columns', colSpan: 2 },
            { id: 'full-item-span-3', content: 'Span 3 Columns', colSpan: 3 },
            { id: 'full-item-span-4', content: 'Span 4 Columns', colSpan: 4 },
            { id: 'full-item-span-5', content: 'Span 5 Columns', colSpan: 5 },
            { id: 'full-item-span-6', content: 'Span 6 Columns', colSpan: 6 },
            { id: 'full-item-13', content: 'Item 13' },
            { id: 'full-item-span-7', content: 'Span 7 Columns', colSpan: 7 },
            { id: 'full-item-span-5', content: 'Span 5 Columns', colSpan: 5 },
            { id: 'full-item-span-8', content: 'Span 8 Columns', colSpan: 8 },
            { id: 'full-item-span-4', content: 'Span 4 Columns', colSpan: 4 },
            { id: 'full-item-span-10', content: 'Span 10 Columns', colSpan: 10 },
            { id: 'full-item-span-2', content: 'Span 2 Columns', colSpan: 2 },
            { id: 'full-item-span-12', content: 'Span 12 Columns', colSpan: 12 },
        ];

        const handleReordered = (e: CustomEvent) => {
            console.log('Grid reordered (Full Control):', e.detail.newOrder);
        };

        return html`
        <ssk-grid-container ${spread(args)} @grid-reordered=${handleReordered} style="min-height: 600px; border: 2px dashed #ccc;">
            ${initialItems.map(item => html`
            <div
                id="${item.id}"
                class="grid-item default-size-grid-item"
                style="height: 88px; ${item.colSpan ? `grid-column: span ${item.colSpan};` : ''}"
            >
                ${item.content}
            </div>
            `)}
        </ssk-grid-container>
        <p style="text-align: center; margin-top: 20px; font-size: 14px; color: #555;">
            This grid allows dragging and dropping items into any position, including empty spaces.
            Items with different column spans are included.
        </p>
        `;
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1253-75169&mode=design&t=pTwjadNPUzRZF6jG-0", // Placeholder URL
        },
    },
};
export const DraggableGridFullControlHgieht: Story = {
    args: {
        // gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
        // gridTemplateRows: "repeat(auto-fit, minmax(100px, 1fr))",
        gap: "16px",
        padding: "8px",
    },
    render: (args) => {
        const initialItems = [
            { id: 'full-item-1', content: 'Item 1' },
            { id: 'full-item-2', content: 'Item 2' },
            { id: 'full-item-3', content: 'Item 3' },
            { id: 'full-item-4', content: 'Item 4' },
            { id: 'full-item-5', content: 'Item 5' },
            { id: 'full-item-6', content: 'Item 6' },
            { id: 'full-item-7', content: 'Item 7' },
            { id: 'full-item-8', content: 'Item 8' },
            { id: 'full-item-9', content: 'Item 9' },
            { id: 'full-item-10', content: 'Item 10' },
            { id: 'full-item-11', content: 'Item 11' },
            { id: 'full-item-12', content: 'Item 12' },
            { id: 'full-item-row-span-6', content: 'Span 2 Columns 2 Rows', rowSpan: 2, colSpan: 3 },
            { id: 'full-item-span-2', content: 'Span 2 Columns', colSpan: 2 },
            { id: 'full-item-span-3', content: 'Span 3 Columns', colSpan: 3 },
            { id: 'full-item-span-4', content: 'Span 4 Columns', colSpan: 4 },
            { id: 'full-item-span-5', content: 'Span 5 Columns', colSpan: 5 },
            { id: 'full-item-span-6', content: 'Span 6 Columns', colSpan: 6 },
            { id: 'full-item-row-span-2', content: 'Span 2 Rows', rowSpan: 2 },
            { id: 'full-item-row-span-3', content: 'Span 3 Rows', rowSpan: 3 },
            { id: 'full-item-row-span-4', content: 'Span 4 Rows', rowSpan: 4 },
            { id: 'full-item-row-span-5', content: 'Span 5 Rows', rowSpan: 5 },
            { id: 'full-item-row-span-6', content: 'Span 2 Columns 6 Rows', rowSpan: 6, colSpan: 2 },
            { id: 'full-item-row-span-6', content: 'Span 6 Columns 6 Rows', rowSpan: 6, colSpan: 6 },
            { id: 'full-item-row-span-7', content: 'Span 12 Columns 1 Rows ', rowSpan: 1, colSpan: 12 },
        ];

        const handleReordered = (e: CustomEvent) => {
            console.log('Grid reordered (Full Control):', e.detail.newOrder);
        };

        return html`
        <ssk-grid-container ${spread(args)} @grid-reordered=${handleReordered} style="min-height: 600px; border: 2px dashed #ccc; padding: 10px;">
            ${initialItems.map(item => html`
            <div
                id="${item.id}"
                class="grid-item default-size-grid-item"
                style="height: ${item.rowSpan ? `${item.rowSpan * 88 + (item.rowSpan - 1) * 10}px` : '88px'};
                ${item.colSpan ? `grid-column: span ${item.colSpan};` : ''}
                ${item.rowSpan ? `grid-row: span ${item.rowSpan};` : ''}
                "
            >
                ${item.content}
            </div>
            `)}
        </ssk-grid-container>
        `;
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1253-75169&mode=design&t=pTwjadNPUzRZF6jG-0",
        },
    },
};