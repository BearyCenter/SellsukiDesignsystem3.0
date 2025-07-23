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
        /* สไตล์สำหรับ grid-item ที่จะใช้กับ slotted content */
        .grid-item {
            position: absolute; /* กำหนดโดย JavaScript ของ ssk-grid */
            background-color: #2196f3;
            color: white;
            font-weight: bold;
            font-size: 14px;
            border-radius: 6px;
            cursor: grab;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 0 3px 6px rgba(0,0,0,0.2);
            transition: box-shadow 0.3s ease;
            user-select: none;
            box-sizing: border-box; /* ทำให้ padding ไม่เพิ่มขนาดรวมของ item */
            text-align: center;
            border: 1px solid rgba(255,255,255,0.3);
        }

        .grid-item:active {
            cursor: grabbing;
            box-shadow: 0 8px 16px rgba(0,0,0,0.3);
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

// export const StaticItems: Story = {
//     args: {
//         gap: "16px",      // กำหนด gap ที่นี่
//         gridItemSize: 72, // กำหนด gridItemSize ที่นี่
//         maxColumns: 12,
//     },
//     render: (args) => {
//         // items array มีแค่ id, x, y
//         const items = [
//             { id: 1, x: 0, y: 0 },
//             { id: 2, x: 2, y: 0 },
//             { id: 3, x: 5, y: 0 },
//             { id: 4, x: 9, y: 0 },
//             { id: 5, x: 0, y: 3 },
//             { id: 6, x: 3, y: 3 },
//             { id: 7, x: 6, y: 3 },
//             { id: 8, x: 9, y: 3 },
//             { id: 9, x: 0, y: 5 },
//     ];

//         return html`
//         <ssk-grid .items=${items} ${spread(args)}>
//             <div class="grid-item" data-id="1" data-width="2" data-height="2" style="background-color: #f44336;">
//                 <h3>2x2</h3><p>Item 1</p>
//             </div>
//             <div class="grid-item" data-id="2" data-width="3" data-height="1" style="background-color: #e91e63;">
//                 <h3>3x1</h3><p>Item 2</p>
//             </div>
//             <div class="grid-item" data-id="3" data-width="1" data-height="2" style="background-color: #9c27b0;">
//                 <h3>1x2</h3><p>Item 3</p>
//             </div>
//             <div class="grid-item" data-id="4" data-width="1" data-height="1" style="background-color:rgb(244, 244, 244); color:red;">
//                 <h3>1x1</h3><p>Item 4</p>
//             </div>
//             <div class="grid-item" data-id="5" data-width="3" data-height="2" style="background-color:rgb(244, 244, 244); color:red;">
//                 <h3>2x3</h3><p>Item 5</p>
//             </div>
//             <div class="grid-item" data-id="6" data-width="3" data-height="2" style="background-color:rgb(244, 244, 244); color:red;">
//                 <h3>2x3</h3><p>Item 6</p>
//             </div>
//             <div class="grid-item" data-id="7" data-width="3" data-height="2" style="background-color:rgb(244, 244, 244); color:red;">
//                 <h3>2x3</h3><p>Item 7</p>
//             </div>
//             <div class="grid-item" data-id="8" data-width="3" data-height="2" style="background-color:rgb(244, 244, 244); color:red;">
//                 <h3>2x3</h3><p>Item 8</p>
//             </div>
//             <div data-id="9" data-width="3" data-height="2" style="background-color:rgb(62, 201, 47); color:red;">
//                 <h3>2x3s</h3><p>Item 8</p>
//             </div>
//         </ssk-grid>
//         `;
//     },
// };
// export const StaticItems: Story = {
//     args: {
//         gap: "32px",      // กำหนด gap ที่นี่
//         gridItemSize: 72, // กำหนด gridItemSize ที่นี่
//         maxColumns: 12,
//     },
//     render: (args) => {
//         const baseSizePx = args.gridItemSize; // 72px

//         // **สำคัญ: Items array มีแค่ id, x, y เท่านั้น**
//         const items = [
//             { id: 1, x: 0, y: 0 }, // Item 1: 2x2
//             { id: 2, x: 2, y: 0 }, // Item 2: 3x1
//             { id: 3, x: 5, y: 0 }, // Item 3: 1x2
//             { id: 4, x: 9, y: 0 }, // Item 4: 1x1
//             { id: 5, x: 0, y: 3 }, // Item 5: 3x2 (แก้ไขตำแหน่ง Y เดิม: 3, เปลี่ยนจาก 2x3 เพื่อให้พอดีกับภาพตัวอย่าง)
//             { id: 6, x: 3, y: 3 }, // Item 6: 3x2
//             { id: 7, x: 6, y: 3 }, // Item 7: 3x2
//             { id: 8, x: 9, y: 3 }, // Item 8: 3x2
//             { id: 9, x: 0, y: 5 }, // Item 9: 3x2 (แก้ไข ID และตำแหน่ง Y เดิม: 5)
//         ];

//         return html`
//         <ssk-grid .items=${items} ${spread(args)}>
//             <div class="grid-item" data-id="1" style="
//                 background-color: #f44336;
//                 width: ${baseSizePx * 2}px; /* 2 units wide = 144px */
//                 height: ${baseSizePx * 2}px; /* 2 units high = 144px */
//             ">
//                 <h3>2x2</h3><p>Item 1</p>
//             </div>
//             <div class="grid-item" data-id="2" style="
//                 background-color: #e91e63;
//                 width: ${baseSizePx * 3}px; /* 3 units wide = 216px */
//                 height: ${baseSizePx * 1}px; /* 1 unit high = 72px */
//             ">
//                 <h3>3x1</h3><p>Item 2</p>
//             </div>
//             <div class="grid-item" data-id="3" style="
//                 background-color: #9c27b0;
//                 width: ${baseSizePx * 1}px; /* 1 unit wide = 72px */
//                 height: ${baseSizePx * 2}px; /* 2 units high = 144px */
//             ">
//                 <h3>1x2</h3><p>Item 3</p>
//             </div>
//             <div class="grid-item" data-id="4" style="
//                 background-color:rgb(244, 244, 244); color:red;
//                 width: ${baseSizePx * 1}px; /* 1 unit wide = 72px */
//                 height: ${baseSizePx * 1}px; /* 1 unit high = 72px */
//             ">
//                 <h3>1x1</h3><p>Item 4</p>
//             </div>
//             <div class="grid-item" data-id="5" style="
//                 background-color: orange; /* เปลี่ยนสีเพื่อความชัดเจน */
//                 width: ${baseSizePx * 3}px; /* 3 units wide = 216px */
//                 height: ${baseSizePx * 2}px; /* 2 units high = 144px */
//             ">
//                 <h3>3x2</h3><p>Item 5</p>
//             </div>
//             <div class="grid-item" data-id="6" style="
//                 background-color: darkgoldenrod; /* เปลี่ยนสีเพื่อความชัดเจน */
//                 width: ${baseSizePx * 3}px;
//                 height: ${baseSizePx * 2}px;
//             ">
//                 <h3>3x2</h3><p>Item 6</p>
//             </div>
//             <div class="grid-item" data-id="7" style="
//                 background-color: peru; /* เปลี่ยนสีเพื่อความชัดเจน */
//                 width: ${baseSizePx * 3}px;
//                 height: ${baseSizePx * 2}px;
//             ">
//                 <h3>3x2</h3><p>Item 7</p>
//             </div>
//             <div class="grid-item" data-id="8" style="
//                 background-color: chocolate; /* เปลี่ยนสีเพื่อความชัดเจน */
//                 width: ${baseSizePx * 3}px;
//                 height: ${baseSizePx * 2}px;
//             ">
//                 <h3>3x2</h3><p>Item 8</p>
//             </div>
//             <div class="grid-item" data-id="9" style="
//                 background-color: saddlebrown; /* เปลี่ยนสีเพื่อความชัดเจน */
//                 width: ${baseSizePx * 3}px;
//                 height: ${baseSizePx * 2}px;
//             ">
//                 <h3>3x2</h3><p>Item 9</p>
//             </div>
//         </ssk-grid>
//         `;
//     },
// };

// export const StaticItems2: Story = {
//     args: {
//         gap: "32x",
//         gridItemSize: 72,
//         maxColumns: 12,
//     },
//     render: (args) => {
//         const items = [
//             { id: 1, x: 0, y: 0 },
//             { id: 2, x: 2, y: 0 },
//             { id: 3, x: 5, y: 0 },
//             { id: 4, x: 9, y: 0 },
//             { id: 5, x: 0, y: 3 },
//             { id: 6, x: 3, y: 3 },
//             { id: 7, x: 6, y: 3 },
//             { id: 8, x: 9, y: 3 },
//             { id: 9, x: 0, y: 5 },
//         ];

//         return html`
//         <ssk-grid .items=${items} ${spread(args)}>
//             <div class="grid-item" data-id="1" data-width="2" data-height="2" style="background-color: #f44336;">
//                 <h3>2x2</h3><p>Item 1</p>
//             </div>
//             <div class="grid-item" data-id="2" data-width="3" data-height="1" style="background-color: #e91e63;">
//                 <h3>3x1</h3><p>Item 2</p>
//             </div>
//             <div class="grid-item" data-id="3" data-width="1" data-height="2" style="background-color: #9c27b0;">
//                 <h3>1x2</h3><p>Item 3</p>
//             </div>
//             <div class="grid-item" data-id="4" data-width="1" data-height="1" style="background-color:rgb(244, 244, 244); color:red;">
//                 <h3>1x1</h3><p>Item 4</p>
//             </div>
//             <div class="grid-item" data-id="5" data-width="3" data-height="2" style="background-color:rgb(244, 244, 244); color:red;">
//                 <h3>3x2</h3><p>Item 5</p>
//             </div>
//             <div class="grid-item" data-id="6" data-width="3" data-height="2" style="background-color:rgb(244, 244, 244); color:red;">
//                 <h3>3x2</h3><p>Item 6</p>
//             </div>
//             <div class="grid-item" data-id="7" data-width="3" data-height="2" style="background-color:rgb(244, 244, 244); color:red;">
//                 <h3>3x2</h3><p>Item 7</p>
//             </div>
//             <div class="grid-item" data-id="8" data-width="3" data-height="2" style="background-color:rgb(244, 244, 244); color:red;">
//                 <h3>3x2</h3><p>Item 8</p>
//             </div>
//             <div class="grid-item" data-id="9" data-width="3" data-height="2" style="background-color:rgb(62, 201, 47); color:red;">
//                 <h3>3x2</h3><p>Item 9</p>
//             </div>
//             <div class="grid-item" data-id="1"  style="height:144px; width:144px;background-color: #f44336;">
//                 <h3>2x2</h3><p>Item 1</p>
//             </div>
//         </ssk-grid>
//         `;
//     },
// };


export const StaticItems: Story = {
    args: {
        gap: "16px", // ตั้งค่า gap เป็น 16px ตามที่ต้องการ
        gridItemSize: 72, // Base unit size for grid positioning
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

        return html`
        <ssk-grid .items=${items} ${spread(args)}>
            <div class="grid-item" data-id="1" data-width="2" data-height="2" style="width:144px; height:144px; background-color: #f44336;">
                <h3>2x2 (144x144px)</h3><p>Item 1</p>
            </div>
            <div class="grid-item" data-id="2" style="width:216px; height:72px; background-color: #e91e63;">
                <h3>3x1 (216x72px)</h3><p>Item 2</p>
            </div>
            <div class="grid-item" data-id="3" style="width:72px; height:144px; background-color: #9c27b0;">
                <h3>1x2 (72x144px)</h3><p>Item 3</p>
            </div>
            <div class="grid-item" data-id="4"  style="width:72px; height:72px; background-color:rgb(244, 244, 244); color:red;">
                <h3>1x1 (72x72px)</h3><p>Item 4</p>
            </div>
            <div class="grid-item" data-id="5"  style="width:216px; height:144px; background-color:rgb(244, 244, 244); color:red;">
                <h3>3x2 (216x144px)</h3><p>Item 5</p>
            </div>
            <div class="grid-item" data-id="6"  style="width:216px; height:144px; background-color:rgb(244, 244, 244); color:red;">
                <h3>3x2 (216x144px)</h3><p>Item 6</p>
            </div>
            <div class="grid-item" data-id="7"  style="width:216px; height:144px; background-color:rgb(244, 244, 244); color:red;">
                <h3>3x2 (216x144px)</h3><p>Item 7</p>
            </div>
            <div class="grid-item" data-id="8"  style="width:216px; height:144px; background-color:rgb(244, 244, 244); color:red;">
                <h3>3x2 (216x144px)</h3><p>Item 8</p>
            </div>
            <div class="grid-item" data-id="9" style="width:288px; height:144px; background-color:rgb(62, 201, 47); color:red;">
                <h3>3x2 (216x144px)</h3><p>Item 9</p>
            </div>
        </ssk-grid>
        `;
    },
};

export const RandomItems: Story = {
    args: {
        gap: "10px",
        gridItemSize: 60,
        maxColumns: 12,
    },
    render: (args) => {
        const items = [];
        let currentX = 0;
        let currentY = 0;
        let idCounter = 1;
        let rowMaxHeight = 0;
        const numberOfItems = 25; // จำนวนไอเท็มที่ต้องการสร้าง

        for (let i = 0; i < numberOfItems; i++) {
            const w = Math.floor(Math.random() * 3) + 1; // กว้าง 1 ถึง 3 หน่วย
            const h = Math.floor(Math.random() * 3) + 1; // สูง 1 ถึง 3 หน่วย

            if (currentX + w > args.maxColumns) {
                currentX = 0;
                currentY += rowMaxHeight;
                rowMaxHeight = 0;
            }

            items.push({
                id: idCounter,
                x: currentX,
                y: currentY,
                w,
                h,
            });

            currentX += w;
            rowMaxHeight = Math.max(rowMaxHeight, h);
            idCounter++;
        }

        return html`
        <ssk-grid .items=${items} ${spread(args)}>
            ${items.map(
                (item) => html`
                <div class="grid-item"
                    data-id="${item.id}"
                    data-width="${item.w}"   data-height="${item.h}"  style="background-color: hsl(${item.id * 15 % 360}, 75%, 55%);">
                    <h4>${item.w} x ${item.h}</h4>
                    <p>ID: ${item.id}</p>
                </div>
                `
            )}
        </ssk-grid>
        `;
    },
};