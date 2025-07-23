/// v5 ได้ แต่ติดปัญระยะห่างระหว่างไอเท็ม มันอิงตามขนาด กว้าง สูง เช่นกว้าง 2*16 =32
import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import "../../elements/divider";
import "../../elements/icon";

import {
    Theme,
    cssVar,
    parseThemeToCssVariables,
    parseVariables,
} from "../../types/theme";

// GridItem interface will now ONLY store ID, X, Y
export interface GridItem {
    id: number;
    x: number;
    y: number;
}

// Internal representation of an item, including its calculated w/h and element reference
interface InternalGridItemData extends GridItem {
    w: number; // Grid units (calculated from actualWidth)
    h: number; // Grid units (calculated from actualHeight)
    actualWidth: number; // Store actual pixel width read from element
    actualHeight: number; // Store actual pixel height read from element
    element: HTMLElement; // Reference to the actual DOM element
}


@customElement("ssk-grid")
export class Grid extends LitElement {
    static registeredName = "ssk-grid";

    @consume({ context: themeContext, subscribe: true })
    @property({ attribute: false })
    public theme?: Theme;

    @property({ type: String })
    testId?: string;

    // --- GAP PROPERTY ---
    @property({ type: String, attribute: "gap" })
    gap = "16px"; // Default gap changed to 16px as requested

    // --- GRID ITEM SIZE ---
    @property({ type: Number, attribute: "grid-item-size" })
    gridItemSize = 72; // Default gridItemSize

    @property({ type: Number, attribute: "max-columns" })
    maxColumns = 12;

    @property({ type: Array })
    items: GridItem[] = []; // This prop now holds only id, x, y

    @query('slot')
    _slot!: HTMLSlotElement;

    private _draggedItem: HTMLElement | null = null;
    private _offsetX = 0;
    private _offsetY = 0;

    // Internal array to hold calculated item data (including w/h and element ref)
    private _internalItemsData: InternalGridItemData[] = [];
    private _itemIdToInternalDataMap = new Map<number, InternalGridItemData>();


    firstUpdated() {
        this._updateInternalGridDataFromSlottedElements(); // Initial data extraction and layout
        this._setupDragAndDrop();

        this._slot.addEventListener('slotchange', () => {
            this._updateInternalGridDataFromSlottedElements(); // Update data and relayout on slot changes
            this._setupDragAndDrop();         // Must re-setup because element references might change
        });
    }

    updated(changedProperties: Map<string, any>) {
        // If items (x,y) change, or layout properties (gap, gridItemSize, maxColumns) change
        if (changedProperties.has('items') || changedProperties.has('gap') || changedProperties.has('gridItemSize') || changedProperties.has('maxColumns')) {
            this._updateInternalGridDataFromSlottedElements();
        }
    }
private _updateInternalGridDataFromSlottedElements() {
        if (!this._slot) {
            console.warn("ssk-grid: Slot element not found during _updateInternalGridDataFromSlottedElements.");
            return;
        }

        const currentSlottedElements = Array.from(this._slot.assignedElements({ flatten: true }) as HTMLElement[]);

        this._internalItemsData = [];
        this._itemIdToInternalDataMap.clear();
        // ไม่ต้องใช้ gapPx ในการคำนวณ w/h ที่นี่แล้ว เพราะ w/h จะอ้างอิงจาก gridItemSize โดยตรง
        currentSlottedElements.forEach(el => {
            const id = Number(el.dataset.id);

            const actualWidth = el.offsetWidth;
            const actualHeight = el.offsetHeight;

            if (isNaN(id) || actualWidth <= 0 || actualHeight <= 0) {
                console.warn('ssk-grid: Slotted item missing valid data-id or has zero dimensions, skipping:', el);
                return;
            }
            const w = Math.round(actualWidth / this.gridItemSize);
            const h = Math.round(actualHeight / this.gridItemSize);

            const calculatedW = Math.max(1, w);
            const calculatedH = Math.max(1, h);
            const existingItemData = this.items.find(item => item.id === id);

            const internalData: InternalGridItemData = {
                id: id,
                x: existingItemData ? existingItemData.x : 0,
                y: existingItemData ? existingItemData.y : 0,
                w: calculatedW,
                h: calculatedH,
                actualWidth: actualWidth,
                actualHeight: actualHeight,
                element: el
            };
            this._internalItemsData.push(internalData);
            this._itemIdToInternalDataMap.set(id, internalData);
        });
        this._layoutGridItems();
    }

    private _layoutGridItems() {
        let maxBottom = 0;
        const gapPx = parseFloat(this.gap);

        for (const itemData of this._internalItemsData) {
            const el = itemData.element;


            const left = gapPx + (itemData.x * (this.gridItemSize + gapPx));
            const top = gapPx + (itemData.y * (this.gridItemSize + gapPx));

            const width = (itemData.w * this.gridItemSize);
            const height = (itemData.h * this.gridItemSize);

            el.style.position = 'absolute';
            el.style.left = `${left}px`;
            el.style.top = `${top}px`;
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;

            maxBottom = Math.max(maxBottom, top + height);
            el.classList.add('grid-item');
        }

        this.style.height = `${maxBottom + gapPx}px`; // ensure grid container expands to fit content plus bottom gap
    }

    private _setupDragAndDrop() {
        // First, remove listeners from all elements that were previously tracked
        this._internalItemsData.forEach(itemData => {
            itemData.element.removeEventListener('mousedown', this._handleMouseDownBound);
        });

        // Then, add listeners to all currently mapped slotted elements
        this._internalItemsData.forEach(itemData => {
            itemData.element.addEventListener('mousedown', this._handleMouseDownBound);
        });

        // Global listeners on document for dragging behavior
        document.removeEventListener('mousemove', this._handleMouseMoveBound);
        document.removeEventListener('mouseup', this._handleMouseUpBound);

        document.addEventListener('mousemove', this._handleMouseMoveBound);
        document.addEventListener('mouseup', this._handleMouseUpBound);
    }

    private _handleMouseDownBound = this._handleMouseDown.bind(this);
    private _handleMouseMoveBound = this._handleMouseMove.bind(this);
    private _handleMouseUpBound = this._handleMouseUp.bind(this);

    private _handleMouseDown(e: MouseEvent) {
        const target = e.currentTarget as HTMLElement;
        const itemId = Number(target.dataset.id);
        const internalItemData = this._itemIdToInternalDataMap.get(itemId);
        if (!internalItemData) return; // Must have associated data to be draggable

        if (e.button !== 0) return; // Only respond to left-click

        this._draggedItem = target;
        this._offsetX = e.offsetX;
        this._offsetY = e.offsetY;
        this._draggedItem.style.zIndex = '1000'; 
        this._draggedItem.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)'; 
        this._draggedItem.style.cursor = 'grabbing';

        e.preventDefault(); // Prevent default browser drag behavior
    }

    private _handleMouseMove(e: MouseEvent) {
        if (!this._draggedItem) return;

        const gridRect = this.getBoundingClientRect(); 
        const gapPx = parseFloat(this.gap);

        // Calculate mouse position relative to the grid's content area (inside padding)
        const moveX = e.clientX - gridRect.left - this._offsetX - gapPx;
        const moveY = e.clientY - gridRect.top - this._offsetY - gapPx;

        this._draggedItem.style.left = `${moveX}px`;
        this._draggedItem.style.top = `${moveY}px`;
    }

    private _handleMouseUp(e: MouseEvent) {
        if (!this._draggedItem) return;

        const draggedItemElement = this._draggedItem;
        this._draggedItem = null; 
        draggedItemElement.style.zIndex = '';
        draggedItemElement.style.boxShadow = '0 3px 6px rgba(0,0,0,0.2)';
        draggedItemElement.style.cursor = 'grab';

        const gridRect = this.getBoundingClientRect();
        const gapPx = parseFloat(this.gap);

        // Final mouse position relative to the grid's content area (inside padding)
        // This is the top-left corner of the dragged item at the mouse-up

        // const finalItemPixelX = e.clientX - gridRect.left - this._offsetX; 
        // const finalItemPixelY = e.clientY - gridRect.top - this._offsetY;

        const finalItemContentX = (e.clientX - gridRect.left - this._offsetX) - gapPx; // Position relative to content start
        const finalItemContentY = (e.clientY - gridRect.top - this._offsetY) - gapPx; // Position relative to content start

        // Get the internal data for the dragged item
        const draggedItemId = Number(draggedItemElement.dataset.id);
        const draggedInternalData = this._itemIdToInternalDataMap.get(draggedItemId);

        if (!draggedInternalData) {
            console.warn('ssk-grid: Dragged item data not found in internal map for ID:', draggedItemId);
            return;
        }

        // let snappedCol = Math.round((finalItemPixelX - gapPx) / (this.gridItemSize + gapPx));
        // let snappedRow = Math.round((finalItemPixelY - gapPx) / (this.gridItemSize + gapPx));
        let snappedCol = Math.round(finalItemContentX / (this.gridItemSize + gapPx));
        let snappedRow = Math.round(finalItemContentY / (this.gridItemSize + gapPx));

        const wUnits = draggedInternalData.w;
        const hUnits = draggedInternalData.h;

        // Clamp snapped position to grid boundaries
        if (snappedCol < 0) snappedCol = 0;
        // Clamp to maxColumns - wUnits to ensure the item does not overflow based on its grid unit size
        if (snappedCol + wUnits > this.maxColumns) snappedCol = this.maxColumns - wUnits;
        if (snappedRow < 0) snappedRow = 0;

        // Find the final row: try to place at snappedRow, but push down if collision occurs
        let finalYRow = snappedRow;
        while (this._checkCollision(draggedInternalData, snappedCol, finalYRow)) { // Pass internal data
            finalYRow++; // Move down one row if collision
        }

        // Calculate final pixel position for the item's top-left corner
        const snappedX = gapPx + (snappedCol * (this.gridItemSize + gapPx));
        const snappedY = gapPx + (finalYRow * (this.gridItemSize + gapPx));

        draggedItemElement.style.left = `${snappedX}px`;
        draggedItemElement.style.top = `${snappedY}px`;

        // Update the position in the original `this.items` array (ONLY x,y)
        const originalGridItem = this.items.find(item => item.id === draggedItemId);
        if (originalGridItem) {
            originalGridItem.x = snappedCol;
            originalGridItem.y = finalYRow;
        } else {
            // If original item not found, it's a new item or not tracked by `items` prop
            // We should add it to `this.items` to keep state consistent.
            this.items = [...this.items, { id: draggedItemId, x: snappedCol, y: finalYRow }];
        }

        // Update the internal data's position
        draggedInternalData.x = snappedCol;
        draggedInternalData.y = finalYRow;

        this._layoutGridItems(); // Re-layout all items to ensure consistency

        // Dispatch event with updated item data
        this.dispatchEvent(new CustomEvent('grid-item-moved', {
            detail: {
                // Return a combined object with updated x,y and the w,h from internal data
                movedGridItemData: { 
                    id: draggedInternalData.id,
                    x: draggedInternalData.x,
                    y: draggedInternalData.y,
                    w: draggedInternalData.w, // Now derived from actual dimensions
                    h: draggedInternalData.h, // Now derived from actual dimensions
                    actualWidth: draggedInternalData.actualWidth, 
                    actualHeight: draggedInternalData.actualHeight
                }, 
                newPosition: { col: snappedCol, row: finalYRow },
                draggedElement: draggedItemElement
            },
            bubbles: true,
            composed: true
        }));
    }

    private _checkCollision(
        testItemData: InternalGridItemData,
        testCol: number,
        testRow: number
    ): boolean {
        const gapPx = parseFloat(this.gap);
        const EPSILON = 0.001;

        // Calculate pixel position for the item being tested (includes gap for cell positioning)
        const testX = gapPx + (testCol * (this.gridItemSize + gapPx));
        const testY = gapPx + (testRow * (this.gridItemSize + gapPx));

        // MODIFICATION: Dimensions of the item being tested based on its calculated grid units, WITHOUT inner gaps.
        const testWidth = (testItemData.w * this.gridItemSize);
        const testHeight = (testItemData.h * this.gridItemSize);

        const testRect = {
            left: testX,
            top: testY,
            right: testX + testWidth,
            bottom: testY + testHeight
        };

        for (let otherItemData of this._internalItemsData) {
            if (otherItemData.id === testItemData.id) continue;

            // Calculate other item's pixel position (includes gap for cell positioning)
            const otherX = gapPx + (otherItemData.x * (this.gridItemSize + gapPx));
            const otherY = gapPx + (otherItemData.y * (this.gridItemSize + gapPx));

            // MODIFICATION: Dimensions of the other item based on its stored grid units, WITHOUT inner gaps.
            const otherWidth = (otherItemData.w * this.gridItemSize);
            const otherHeight = (otherItemData.h * this.gridItemSize);

            const otherRect = {
                left: otherX,
                top: otherY,
                right: otherX + otherWidth,
                bottom: otherY + otherHeight
            };

            const overlap = !(
                testRect.right <= otherRect.left + EPSILON ||
                testRect.left >= otherRect.right - EPSILON ||
                testRect.bottom <= otherRect.top + EPSILON ||
                testRect.top >= otherRect.bottom - EPSILON
            );

            if (overlap) return true;
        }
        return false;
    }

    render() {
        const gapPx = parseFloat(this.gap); // Use parsed gap for padding too

        const additionalCss = html`
        <style>
        :host {
            --grid-gap: ${parseVariables( // Expose gap as CSS var
                cssVar("spacing", this.gap),
                this.gap,
                "16px", // Default for CSS var fallback (changed to 16px)
            )};
            --grid-item-size: ${this.gridItemSize}px;
        }
        </style>
        `;

        return html`
        ${parseThemeToCssVariables(this.theme?.components?.container, ":host")}
        ${additionalCss}

        <div
            class="grid-container"
            data-testid=${this.testId || nothing}
            style="
            padding: ${gapPx}px;
            "
        >
            <slot></slot>
        </div>
        `;
    }

    static styles = css`
    :host {
        display: block;
        position: relative;
        box-sizing: border-box;
        background: none;
        user-select: none;
    }

    .grid-container {
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        min-height: 300px; /* Ensure visibility even if no items */
        margin:0;
    }

    ::slotted(.grid-item) {
        position: absolute; /* Managed by JavaScript */
        background-color: #2196f3;
        color: white;
        font-weight: bold;
        font-size: 14px;
        border-radius: 6px;
        cursor: grab;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 3px 6px rgba(0,0,0,0.2);
        transition: box-shadow 0.3s ease;
        box-sizing: border-box; /* Ensure padding/border is included in the calculated size */

         margin: 0 !important; /* Force no external margins */
        padding: 0 !important; /* Force no external padding on the item itself */
        border: none !important; /* Ensure no borders are adding to size */
        outline: none !important; /* Remove any focus outlines */
    }
    ::slotted(.grid-item > *) {
        margin: 0; /* Remove default margins from direct children like h3, p */
        padding: 0; /* Remove default padding from direct children */
    }
    ::slotted(.grid-item:active) {
        cursor: grabbing;
        box-shadow: 0 8px 16px rgba(0,0,0,0.3);
    }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ssk-grid": Grid;
    }
}



// v6=== แบบไม่มี gap ขนากถูก แต่ต้องมี marrgin ระหว่างกัน>
// import { consume } from "@lit/context";
// import { LitElement, css, html, nothing } from "lit";
// import { customElement, property, query } from "lit/decorators.js";
// import { themeContext } from "../../contexts/theme";
// import "../../elements/divider";
// import "../../elements/icon";

// import {
//     Theme,
//     cssVar,
//     parseThemeToCssVariables,
//     parseVariables,
// } from "../../types/theme";

// // GridItem interface will now ONLY store ID, X, Y
// export interface GridItem {
//     id: number;
//     x: number;
//     y: number;
// }

// // Internal representation of an item, including its calculated w/h and element reference
// interface InternalGridItemData extends GridItem {
//     w: number; // Grid units (calculated from actualWidth)
//     h: number; // Grid units (calculated from actualHeight)
//     actualWidth: number; // Store actual pixel width read from element
//     actualHeight: number; // Store actual pixel height read from element
//     element: HTMLElement; // Reference to the actual DOM element
// }


// @customElement("ssk-grid")
// export class Grid extends LitElement {
//     static registeredName = "ssk-grid";

//     @consume({ context: themeContext, subscribe: true })
//     @property({ attribute: false })
//     public theme?: Theme;

//     @property({ type: String })
//     testId?: string;

//     // --- GAP PROPERTY ---
//     @property({ type: String, attribute: "gap" })
//     gap = "0px"; // MODIFICATION: Default gap changed to 0px for no spacing

//     // --- GRID ITEM SIZE ---
//     @property({ type: Number, attribute: "grid-item-size" })
//     gridItemSize = 88; // Default gridItemSize

//     @property({ type: Number, attribute: "max-columns" })
//     maxColumns = 12;

//     @property({ type: Array })
//     items: GridItem[] = []; // This prop now holds only id, x, y

//     @query('slot')
//     _slot!: HTMLSlotElement;

//     private _draggedItem: HTMLElement | null = null;
//     private _offsetX = 0;
//     private _offsetY = 0;

//     // Internal array to hold calculated item data (including w/h and element ref)
//     private _internalItemsData: InternalGridItemData[] = [];
//     private _itemIdToInternalDataMap = new Map<number, InternalGridItemData>();


//     firstUpdated() {
//         this._updateInternalGridDataFromSlottedElements(); // Initial data extraction and layout
//         this._setupDragAndDrop();

//         this._slot.addEventListener('slotchange', () => {
//             this._updateInternalGridDataFromSlottedElements(); // Update data and relayout on slot changes
//             this._setupDragAndDrop();         // Must re-setup because element references might change
//         });
//     }

//     updated(changedProperties: Map<string, any>) {
//         // If items (x,y) change, or layout properties (gap, gridItemSize, maxColumns) change
//         if (changedProperties.has('items') || changedProperties.has('gap') || changedProperties.has('gridItemSize') || changedProperties.has('maxColumns')) {
//             // Need to re-read w/h from DOM if structure of slotted elements *might* have changed due to `items` prop indirectly
//             // It's safer to always re-run the full update cycle here.
//             this._updateInternalGridDataFromSlottedElements();
//         }
//     }
//     private _updateInternalGridDataFromSlottedElements() {
//         if (!this._slot) {
//             console.warn("ssk-grid: Slot element not found during _updateInternalGridDataFromSlottedElements.");
//             return;
//         }

//         const currentSlottedElements = Array.from(this._slot.assignedElements({ flatten: true }) as HTMLElement[]);

//         this._internalItemsData = [];
//         this._itemIdToInternalDataMap.clear();
//         currentSlottedElements.forEach(el => {
//             const id = Number(el.dataset.id);

//             const actualWidth = el.offsetWidth;
//             const actualHeight = el.offsetHeight;

//             if (isNaN(id) || actualWidth <= 0 || actualHeight <= 0) {
//                 console.warn('ssk-grid: Slotted item missing valid data-id or has zero dimensions, skipping:', el);
//                 return;
//             }

//             const w = Math.round(actualWidth / this.gridItemSize);
//             const h = Math.round(actualHeight / this.gridItemSize);

//             const calculatedW = Math.max(1, w);
//             const calculatedH = Math.max(1, h);

//             const existingItemData = this.items.find(item => item.id === id);

//             const internalData: InternalGridItemData = {
//                 id: id,
//                 x: existingItemData ? existingItemData.x : 0,
//                 y: existingItemData ? existingItemData.y : 0,
//                 w: calculatedW,
//                 h: calculatedH,
//                 actualWidth: actualWidth,
//                 actualHeight: actualHeight,
//                 element: el
//             };
//             this._internalItemsData.push(internalData);
//             this._itemIdToInternalDataMap.set(id, internalData);
//         });
//         this._layoutGridItems();
//     }

//     private _layoutGridItems() {
//         let maxBottom = 0;
//         // const gapPx = parseFloat(this.gap); // No need for gapPx if gap is always 0


//         for (const itemData of this._internalItemsData) {
//             const el = itemData.element;

//             // MODIFICATION: Calculate position with NO GAP
//             // Position = (column index * gridItemSize)

//             const left = itemData.x * this.gridItemSize;
//             const top = itemData.y * this.gridItemSize;

//             const width = (itemData.w * this.gridItemSize);
//             const height = (itemData.h * this.gridItemSize);

//             el.style.position = 'absolute';
//             el.style.left = `${left}px`;
//             el.style.top = `${top}px`;
//             el.style.width = `${width}px`;
//             el.style.height = `${height}px`;

//             maxBottom = Math.max(maxBottom, top + height);
//             el.classList.add('grid-item');
//         }

//         // MODIFICATION: Grid container height based on maxBottom, no extra gap
//         this.style.height = `${maxBottom}px`;
//     }

//     private _setupDragAndDrop() {
//         // First, remove listeners from all elements that were previously tracked
//         this._internalItemsData.forEach(itemData => {
//             itemData.element.removeEventListener('mousedown', this._handleMouseDownBound);
//         });

//         // Then, add listeners to all currently mapped slotted elements
//         this._internalItemsData.forEach(itemData => {
//             itemData.element.addEventListener('mousedown', this._handleMouseDownBound);
//         });

//         // Global listeners on document for dragging behavior
//         document.removeEventListener('mousemove', this._handleMouseMoveBound);
//         document.removeEventListener('mouseup', this._handleMouseUpBound);

//         document.addEventListener('mousemove', this._handleMouseMoveBound);
//         document.addEventListener('mouseup', this._handleMouseUpBound);
//     }

//     private _handleMouseDownBound = this._handleMouseDown.bind(this);
//     private _handleMouseMoveBound = this._handleMouseMove.bind(this);
//     private _handleMouseUpBound = this._handleMouseUp.bind(this);

//     private _handleMouseDown(e: MouseEvent) {
//         const target = e.currentTarget as HTMLElement;
//         const itemId = Number(target.dataset.id);
//         const internalItemData = this._itemIdToInternalDataMap.get(itemId);
//         if (!internalItemData) return;

//         if (e.button !== 0) return;

//         this._draggedItem = target;
//         this._offsetX = e.offsetX;
//         this._offsetY = e.offsetY;
//         this._draggedItem.style.zIndex = '1000';
//         // this._draggedItem.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
//         this._draggedItem.style.cursor = 'grabbing';

//         e.preventDefault();
//     }

//     private _handleMouseMove(e: MouseEvent) {
//         if (!this._draggedItem) return;

//         const gridRect = this.getBoundingClientRect();
//         // No gapPx subtraction here, as drag position is relative to actual grid's 0,0
//         const moveX = e.clientX - gridRect.left - this._offsetX;
//         const moveY = e.clientY - gridRect.top - this._offsetY;

//         this._draggedItem.style.left = `${moveX}px`;
//         this._draggedItem.style.top = `${moveY}px`;
//     }

//     private _handleMouseUp(e: MouseEvent) {
//         if (!this._draggedItem) return;

//         const draggedItemElement = this._draggedItem;
//         this._draggedItem = null;
//         draggedItemElement.style.zIndex = '';
//         // draggedItemElement.style.boxShadow = '0 3px 6px rgba(0,0,0,0.2)';
//         draggedItemElement.style.cursor = 'grab';

//         const gridRect = this.getBoundingClientRect();
//         // No gapPx here, as we are snapping to actual pixel grid without gaps
//         const finalItemPixelX = e.clientX - gridRect.left - this._offsetX;
//         const finalItemPixelY = e.clientY - gridRect.top - this._offsetY;

//         const draggedItemId = Number(draggedItemElement.dataset.id);
//         const draggedInternalData = this._itemIdToInternalDataMap.get(draggedItemId);

//         if (!draggedInternalData) {
//             console.warn('ssk-grid: Dragged item data not found in internal map for ID:', draggedItemId);
//             return;
//         }

//         // MODIFICATION: Calculate snappedCol/Row by dividing by gridItemSize ONLY
//         let snappedCol = Math.round(finalItemPixelX / this.gridItemSize);
//         let snappedRow = Math.round(finalItemPixelY / this.gridItemSize);

//         const wUnits = draggedInternalData.w;
//         const hUnits = draggedInternalData.h;

//         // Clamp snapped position to grid boundaries
//         if (snappedCol < 0) snappedCol = 0;
//         // Clamp to maxColumns - wUnits to ensure the item does not overflow based on its grid unit size
//         if (snappedCol + wUnits > this.maxColumns) snappedCol = this.maxColumns - wUnits;
//         if (snappedRow < 0) snappedRow = 0;

//         // Find the final row: try to place at snappedRow, but push down if collision occurs
//         let finalYRow = snappedRow;
//         while (this._checkCollision(draggedInternalData, snappedCol, finalYRow)) {
//             finalYRow++; // Move down one row if collision
//         }

//         // MODIFICATION: Calculate final pixel position with NO GAP
//         const snappedX = snappedCol * this.gridItemSize;
//         const snappedY = finalYRow * this.gridItemSize;

//         draggedItemElement.style.left = `${snappedX}px`;
//         draggedItemElement.style.top = `${snappedY}px`;

//         const originalGridItem = this.items.find(item => item.id === draggedItemId);
//         if (originalGridItem) {
//             originalGridItem.x = snappedCol;
//             originalGridItem.y = finalYRow;
//         } else {
//             this.items = [...this.items, { id: draggedItemId, x: snappedCol, y: finalYRow }];
//         }

//         draggedInternalData.x = snappedCol;
//         draggedInternalData.y = finalYRow;

//         this._layoutGridItems();

//         this.dispatchEvent(new CustomEvent('grid-item-moved', {
//             detail: {
//                 movedGridItemData: {
//                     id: draggedInternalData.id,
//                     x: draggedInternalData.x,
//                     y: draggedInternalData.y,
//                     w: draggedInternalData.w,
//                     h: draggedInternalData.h,
//                     actualWidth: draggedInternalData.actualWidth,
//                     actualHeight: draggedInternalData.actualHeight
//                 },
//                 newPosition: { col: snappedCol, row: finalYRow },
//                 draggedElement: draggedItemElement
//             },
//             bubbles: true,
//             composed: true
//         }));
//     }

//     private _checkCollision(
//         testItemData: InternalGridItemData,
//         testCol: number,
//         testRow: number
//     ): boolean {
//         // const gapPx = parseFloat(this.gap); // Not needed for collision if no gap
//         const EPSILON = 0.001;

//         // MODIFICATION: Calculate pixel position with NO GAP
//         const testX = testCol * this.gridItemSize;
//         const testY = testRow * this.gridItemSize;

//         const testWidth = (testItemData.w * this.gridItemSize);
//         const testHeight = (testItemData.h * this.gridItemSize);

//         const testRect = {
//             left: testX,
//             top: testY,
//             right: testX + testWidth,
//             bottom: testY + testHeight
//         };

//         for (let otherItemData of this._internalItemsData) {
//             if (otherItemData.id === testItemData.id) continue;

//             // MODIFICATION: Calculate other item's pixel position with NO GAP
//             const otherX = otherItemData.x * this.gridItemSize;
//             const otherY = otherItemData.y * this.gridItemSize;

//             const otherWidth = (otherItemData.w * this.gridItemSize);
//             const otherHeight = (otherItemData.h * this.gridItemSize);

//             const otherRect = {
//                 left: otherX,
//                 top: otherY,
//                 right: otherX + otherWidth,
//                 bottom: otherY + otherHeight
//             };

//             const overlap = !(
//                 testRect.right <= otherRect.left + EPSILON ||
//                 testRect.left >= otherRect.right - EPSILON ||
//                 testRect.bottom <= otherRect.top + EPSILON ||
//                 testRect.top >= otherRect.bottom - EPSILON
//             );

//             if (overlap) return true;
//         }
//         return false;
//     }

//     render() {
//         // const gapPx = parseFloat(this.gap); // No need for gapPx for padding if gap is 0

//         const additionalCss = html`
//         <style>
//         :host {
//             --grid-gap: ${parseVariables( // Still expose as CSS var, but value is 0
//             cssVar("spacing", this.gap),
//             this.gap,
//             "0px", // Default for CSS var fallback (changed to 0px)
//         )};
//             --grid-item-size: ${this.gridItemSize}px;
//         }
//         </style>
//         `;

//         return html`
//         ${parseThemeToCssVariables(this.theme?.components?.container, ":host")}
//         ${additionalCss}

//         <div
//             class="grid-container"
//             data-testid=${this.testId || nothing}
//             style="
//             padding: 0px; /* MODIFICATION: Set padding to 0px */
//             "
//         >
//             <slot></slot>
//         </div>
//         `;
//     }

//     static styles = css`
//     :host {
//         display: block;
//         position: relative;
//         box-sizing: border-box;
//         background: none;
//         user-select: none;
//     }

//     .grid-container {
//         position: relative;
//         width: 100%;
//         height: 100%;
//         box-sizing: border-box;
//         /*min-height: 300px;*/
//         margin:0;
//     }

//     ::slotted(.grid-item) {
//         position: absolute;
//         background-color: #2196f3;
//         color: white;
//         font-weight: bold;
//         font-size: 14px;
//         border-radius: 6px;
//         cursor: grab;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         transition: box-shadow 0.3s ease;
//         box-sizing: border-box; /* Ensure padding/border is included in the calculated size */

//          margin: 0 !important; /* Force no external margins */
//         padding: 0 !important; /* Force no external padding on the item itself */
//         border: none !important; /* Ensure no borders are adding to size */
//         outline: none !important; /* Remove any focus outlines */
//     }
//     ::slotted(.grid-item > *) {
//         margin: 0; /* Remove default margins from direct children like h3, p */
//         padding: 0; /* Remove default padding from direct children */
//     }
//     ::slotted(.grid-item:active) {
//         cursor: grabbing;
//     }
//     `;
// }

// declare global {
//     interface HTMLElementTagNameMap {
//         "ssk-grid": Grid;
//     }
// }