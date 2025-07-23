import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/grid"; // ตรวจสอบพาธให้ถูกต้อง
import { Grid } from "../../../src/components/grid"; // ตรวจสอบพาธให้ถูกต้อง
import "../../../src/elements/button";
import "../../../src/elements/icon";
import { AutoLitProperty, baseArgsTypes } from "../helper"; // ตรวจสอบพาธให้ถูกต้อง

type GridStoryArgs = AutoLitProperty<Grid>;
interface GridItem {
    id: number;
    x: number;
    y: number;
}
const meta: Meta<GridStoryArgs> = {
    title: "Example/Grid",
    tags: ["autodocs"],
    render: (args) => {
        // ฟังก์ชัน render หลักนี้จะถูกแทนที่ด้วยฟังก์ชัน render ของแต่ละ Story ย่อย
        // เพื่อให้สามารถกำหนด items ของแต่ละ Story ได้อย่างอิสระ
        return html`
        <ssk-grid ${spread(args)}>
            </ssk-grid>
        `;
    },
    argTypes: {
        gap: {
            description: "Sets the gap between grid items (e.g., '16px', '1rem'). Set to '0px' for no gap.",
            control: "text",
            table: { category: "Props" },
        },
        gridItemSize: {
            description: "Base size in pixels for a 1x1 grid item.",
            control: "number",
            table: { category: "Props" },
        },
        maxColumns: {
            description: "Maximum number of columns the grid can have.",
            control: "number",
            table: { category: "Props" },
        },
        testId: {
            description: "Test ID for the grid container",
            control: "text",
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
            box-sizing: border-box; /* ทำให้ padding ไม่เพิ่มขนาดรวมของ item */
            text-align: center;
            border: 1px solid rgba(255,255,255,0.3);
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

export const FullSizeGrid: Story = {
    args: {
        gap: "8px",
        gridItemSize: 44,
        maxColumns: 12,
    },
    render: (args) => {
        const items = [];
        let currentY = 0;
        let currentX = 0;
        let rowMaxHeight = 0; // เก็บความสูงสูงสุดของแถวปัจจุบัน
        let idCounter = 1;

        // สร้าง items ที่มีขนาด 1x1, 2x2, ... จนถึง 12x12
        for (let size = 1; size <= 12; size++) {
            // คำนวณว่าไอเท็มปัจจุบันจะวางพอในคอลัมน์ที่เหลือหรือไม่
            if (currentX + size > args.maxColumns) {
                currentX = 0; // ขึ้นบรรทัดใหม่
                currentY += rowMaxHeight; // ขยับลงเท่ากับความสูงสูงสุดของแถวก่อนหน้า
                rowMaxHeight = 0; // รีเซ็ตความสูงสูงสุดของแถวใหม่
            }

            // เพิ่ม item เข้าไปในรายการ
            items.push({
                id: idCounter,
                x: currentX,
                y: currentY,
                w: size,
                h: size,
            });

            // อัปเดตตำแหน่ง x สำหรับไอเท็มถัดไป
            currentX += size;
            // อัปเดตความสูงสูงสุดของแถวปัจจุบัน
            rowMaxHeight = Math.max(rowMaxHeight, size);
            idCounter++;
        }

        return html`
        <ssk-grid .items=${items} ${spread(args)}>
            ${items.map(
                (item) => html`
                <div class="grid-item"
                    data-id="${item.id}"
                    data-width="${item.w}"   data-height="${item.h}"  style="background-color: hsl(${item.id * 30 % 360}, 70%, 60%);">
                    <h3>${item.w} x ${item.h}</h3>
                    <p>Item ID: ${item.id}</p>
                </div>
                `
            )}
        </ssk-grid>
        `;
    },
};
export const CustomSizeItems: Story = {
    args: {
        gap: "8px",
        gridItemSize: 44,
        maxColumns: 12,
    },
    render: (args) => {
        const items = [];
        let currentX = 0;
        let currentY = 0;
        let id = 1;
        let rowMaxHeight = 0;

        const sizes = [
            [2, 3], [2, 3], [2, 3], [2, 3],
            [2, 4], [2, 4], [2, 4],
            [2, 6], [2, 6],
            [3, 2], [3, 2], [3, 2],
            [4, 1], [4, 1],
            [6, 5],
            [12, 2],
            [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1],
        ];

        for (const [w, h] of sizes) {
            if (currentX + w > args.maxColumns) {
                currentX = 0;
                currentY += rowMaxHeight;
                rowMaxHeight = 0;
            }

            items.push({
                id,
                x: currentX,
                y: currentY,
                w,
                h,
            });

            currentX += w;
            rowMaxHeight = Math.max(rowMaxHeight, h);
            id++;
        }

        return html`
        <ssk-grid .items=${items} ${spread(args)}>
            ${items.map(
                (item) => html`
                <div class="grid-item"
                    data-id="${item.id}"
                    data-width="${item.w}"
                    data-height="${item.h}"
                    style="background-color: hsl(${item.id * 20 % 360}, 70%, 60%);">
                    <h3>${item.w} x ${item.h}</h3>
                    <p>ID: ${item.id}</p>
                </div>
                `
            )}
        </ssk-grid>
        `;
    },
};

// v5
export const StaticItems: Story = {
    args: {
        gap: "16px",
        gridItemSize: 72,
        maxColumns: 12,
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
        ];
        const calculatePixelSize = (gridUnits: number, itemSize: number): string => {
            if (gridUnits <= 0) return '0px';
            return `${(gridUnits * itemSize)}px`; // Removed (gridUnits - 1) * gapSize
        };

        const gapPx = parseFloat(args.gap || "16px"); // ยังคงต้องส่งค่า gap ไปให้ ssk-grid เพื่อใช้ในการจัดตำแหน่ง

        return html`
       <ssk-grid .items=${items} ${spread(args)}>
            <div class="grid-item" data-id="1" 
                 style="background-color: #f44336; 
                        width: ${calculatePixelSize(2, args.gridItemSize)}; 
                        height: ${calculatePixelSize(2, args.gridItemSize)};">
                <h3>2x2</h3><p>Item 1</p>
            </div>
            <div class="grid-item" data-id="2" 
                style="background-color: #e91e63; 
                        width: ${calculatePixelSize(3, args.gridItemSize)}; 
                        height: ${calculatePixelSize(1, args.gridItemSize)};">
                <h3>3x1</h3><p>Item 2</p>
            </div>
            <div class="grid-item" data-id="3" 
                 style="background-color: #9c27b0; 
                        width: ${calculatePixelSize(1, args.gridItemSize)}; 
                        height: ${calculatePixelSize(2, args.gridItemSize)};">
                <h3>1x2</h3><p>Item 3</p>
            </div>
            <div class="grid-item" data-id="4" 
                 style="background-color:rgb(244, 244, 244); color:red; 
                        width: ${calculatePixelSize(1, args.gridItemSize)}; 
                        height: ${calculatePixelSize(1, args.gridItemSize)};">
                <h3>1x1</h3><p>Item 4</p>
            </div>
            <div class="grid-item" data-id="5" 
                 style="background-color:rgb(244, 244, 244); color:red; 
                        width: ${calculatePixelSize(3, args.gridItemSize)}; 
                        height: ${calculatePixelSize(2, args.gridItemSize)};">
                <h3>3x2</h3><p>Item 5</p>
            </div>
            <div class="grid-item" data-id="6" 
                 style="background-color:rgb(244, 244, 244); color:red; 
                        width: ${calculatePixelSize(3, args.gridItemSize)}; 
                        height: ${calculatePixelSize(2, args.gridItemSize)};">
                <h3>3x2</h3><p>Item 6</p>
            </div>
            <div class="grid-item" data-id="7" 
                 style="background-color:rgb(244, 244, 244); color:red; 
                        width: ${calculatePixelSize(3, args.gridItemSize)}; 
                        height: ${calculatePixelSize(2, args.gridItemSize)};">
                <h3>3x2</h3><p>Item 7</p>
            </div>
            <div class="grid-item" data-id="8" 
                 style="background-color:rgb(244, 244, 244); color:red; 
                        width: ${calculatePixelSize(3, args.gridItemSize)}; 
                        height: ${calculatePixelSize(2, args.gridItemSize)};">
                <h3>3x2</h3><p>Item 8</p>
            </div>
            <div class="grid-item" data-id="9" 
                style="background-color:rgb(62, 201, 47); color:red; 
                        width: ${calculatePixelSize(4, args.gridItemSize)}; 
                        height: ${calculatePixelSize(2, args.gridItemSize)};">
                <h3>4x2</h3><p>Item 9</p>
            </div>
        </ssk-grid>
        `;
    },
};

// export const StaticItems: Story = {
//     args: {
//         gap: "0px", // MODIFICATION: Set gap to 0px explicitly in story args
//         gridItemSize: 88,
//         maxColumns: 12,
//     },
//     render: (args) => {
//         const items = [
//             { id: 1, x: 0, y: 0 },
//             { id: 2, x: 2, y: 0 }, // Item 2's x should be 2, directly next to item 1 (w=2)
//             { id: 3, x: 5, y: 0 }, // Item 3's x should be 5
//             { id: 4, x: 9, y: 0 }, // Item 4's x should be 9
//             { id: 5, x: 0, y: 3 },
//             { id: 6, x: 3, y: 3 },
//             { id: 7, x: 6, y: 3 },
//             { id: 8, x: 9, y: 3 },
//             { id: 9, x: 0, y: 5 },
//             { id: 10, x: 0, y: 7 },
//         ];

//         const calculatePixelSize = (gridUnits: number, itemSize: number): string => {
//             if (gridUnits <= 0) return '0px';
//             return `${(gridUnits * itemSize)}px`;
//         };

//         return html`
//         <style>
//         .a {
//             background-color: blue;
//             width: 144px;
//             height: 144px;
//         }
//         .b {
//             background-color: #e91e63;
//             width: 232px;
//             height: 56px;
//         }
//         .c {
//             background-color: #9c27b0;
//             width: 56px;
//             height: 144px;
//         }
//         .d {
//             background-color: rgb(224, 30, 30);
//             width: 56px;
//             height: 56px;
//         }
//         .e {
//             background-color: rgb(15, 189, 202);
//             width: 232px;
//             height: 144px;
//         }
//         .f {
//             background-color: rgb(164, 236, 123);
//             width: 320px;
//             height: 144px;
//         }
//         </style>
//         <ssk-grid .items=${items} ${spread(args)}>
//             <div class="grid-item" data-id="1" 
//             style="background-color:rgb(255, 255, 255); 
//             width: ${calculatePixelSize(2, args.gridItemSize)}; 
//             height: ${calculatePixelSize(2, args.gridItemSize)};
//             ">
//                 <div class="a">
//                     <h3>2x2</h3><p>Item 1</p>
//                 </div>
//             </div>
//             <div class="grid-item" data-id="2" 
//                 style="background-color:rgb(255, 255, 255); 
//                         width: ${calculatePixelSize(3, args.gridItemSize)}; 
//                         height: ${calculatePixelSize(1, args.gridItemSize)};">
//                 <div class="b">
//                     <h3>3:1</h3><p>Item 2</p>
//                 </div>
//             </div>
//             <div class="grid-item" data-id="3" 
//             style="background-color:rgb(255, 255, 255); 
//             width: ${calculatePixelSize(1, args.gridItemSize)}; 
//             height: ${calculatePixelSize(2, args.gridItemSize)};">
//                 <div class="c">
//                     <h3>1x2</h3><p>Item 3</p>
//                 </div>
//             </div>
//             <div data-id="4" 
//             style="background-color:rgb(255, 255, 255); 
//             width: ${calculatePixelSize(1, args.gridItemSize)}; 
//             height: ${calculatePixelSize(1, args.gridItemSize)};">
//                 <div class="d">
//                     <h3>1x1</h3><p>Item 4</p>
//                 </div>
//             </div>
//             <div class="grid-item" data-id="5" 
//             style="background-color:rgb(255, 255, 255);
//             width: ${calculatePixelSize(3, args.gridItemSize)}; 
//             height: ${calculatePixelSize(2, args.gridItemSize)};">
//                 <div class="e">
//                     <h3>3:2</h3><p>Item 5</p>
//                 </div>
//             </div>
//             <div class="grid-item" data-id="6" 
//             style="background-color:rgb(255, 255, 255); 
//             width: ${calculatePixelSize(3, args.gridItemSize)}; 
//             height: ${calculatePixelSize(2, args.gridItemSize)};">
//                 <div class="e">
//                     <h3>3:2</h3><p>Item 6</p>
//                 </div>
//             </div>
//             <div class="grid-item" data-id="7" 
//             style="background-color:rgb(255, 255, 255);
//             width: ${calculatePixelSize(3, args.gridItemSize)}; 
//             height: ${calculatePixelSize(2, args.gridItemSize)};">
//                 <div class="e">
//                     <h3>3:2</h3><p>Item 7</p>
//                 </div>
//             </div>
//             <div class="grid-item" data-id="8" 
//             style="background-color:rgb(255, 255, 255);
//             width: ${calculatePixelSize(3, args.gridItemSize)}; 
//             height: ${calculatePixelSize(2, args.gridItemSize)};">
//                 <div class="e">
//                     <h3>3:2</h3><p>Item 8</p>
//                 </div>
//             </div>
//             <div class="grid-item" data-id="9" 
//             style="background-color:rgb(255, 255, 255);
//             width: ${calculatePixelSize(4, args.gridItemSize)}; 
//             height: ${calculatePixelSize(2, args.gridItemSize)};">
//                 <div class="f">
//                     <h3>4:2</h3><p>Item 9</p>
//                 </div>
//             </div>
//             <div data-id="10" 
//             style="background-color:rgb(255, 255, 255); 
//             width: ${calculatePixelSize(1, args.gridItemSize)}; 
//             height: ${calculatePixelSize(1, args.gridItemSize)};">
//                 <div class="d">
//                     <h3>1x1</h3><p>Item 10</p>
//                 </div>
//             </div>
//         </ssk-grid>
//         `;
//     },
// };