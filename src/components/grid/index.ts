// // /// Final Version: w/h from data-attributes, gap controlled by component ใช้อันนี้ไปก่อน
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
//     w: number; // Calculated width in grid units (read from data-width)
//     h: number; // Calculated height in grid units (read from data-height)
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
//     gap = "32px"; // Default gap

//     // --- GRID ITEM SIZE ---
//     @property({ type: Number, attribute: "grid-item-size" })
//     gridItemSize = 72; // Default gridItemSize

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

//     /**
//      * Reads `data-id`, `data-width`, `data-height` from slotted elements
//      * and combines with `x`, `y` from `this.items` to create internal data.
//      */
//     private _updateInternalGridDataFromSlottedElements() {
//         if (!this._slot) {
//             console.warn("ssk-grid: Slot element not found during _updateInternalGridDataFromSlottedElements.");
//             return;
//         }

//         const currentSlottedElements = Array.from(this._slot.assignedElements({ flatten: true }) as HTMLElement[]);
        
//         this._internalItemsData = []; // Clear previous data
//         this._itemIdToInternalDataMap.clear();

//         currentSlottedElements.forEach(el => {
//             const id = Number(el.dataset.id);
//             const w = Number(el.dataset.width);
//             const h = Number(el.dataset.height);

//             if (isNaN(id) || isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
//                 console.warn('ssk-grid: Slotted item missing valid data-id, data-width, or data-height attributes, skipping:', el);
//                 return;
//             }

//             // Find existing GridItem data (from this.items prop) for initial x, y
//             // If the item exists in `this.items`, use its x,y. Otherwise, default to 0,0.
//             const existingItemData = this.items.find(item => item.id === id);
            
//             const internalData: InternalGridItemData = {
//                 id: id,
//                 x: existingItemData ? existingItemData.x : 0,
//                 y: existingItemData ? existingItemData.y : 0,
//                 w: w, // Use w from data-width
//                 h: h, // Use h from data-height
//                 element: el
//             };
//             this._internalItemsData.push(internalData);
//             this._itemIdToInternalDataMap.set(id, internalData);
//         });

//         this._layoutGridItems(); // Layout after internal data is updated
//     }

//     /**
//      * Lays out Grid Items based on their data in `_internalItemsData`, `gap`, and `gridItemSize`.
//      */
//     private _layoutGridItems() {
//         let maxBottom = 0;
//         const gapPx = parseFloat(this.gap);

//         for (const itemData of this._internalItemsData) { // Iterate through internal data
//             const el = itemData.element;

//             // Calculate pixel position and size based on item's units and gap
//             const left = itemData.x * (this.gridItemSize + gapPx);
//             const top = itemData.y * (this.gridItemSize + gapPx);

//             const width = itemData.w * this.gridItemSize + (itemData.w > 1 ? (itemData.w - 1) * gapPx : 0);
//             const height = itemData.h * this.gridItemSize + (itemData.h > 1 ? (itemData.h - 1) * gapPx : 0);

//             el.style.position = 'absolute';
//             el.style.left = `${left}px`;
//             el.style.top = `${top}px`;
//             el.style.width = `${width}px`;
//             el.style.height = `${height}px`;

//             maxBottom = Math.max(maxBottom, top + height);

//             el.classList.add('grid-item');
//         }

//         // Set container height, accounting for the bottom gap of the last row
//         this.style.height = `${maxBottom + gapPx}px`; 
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
//         if (!internalItemData) return; // Must have associated data to be draggable
        
//         if (e.button !== 0) return; // Only respond to left-click

//         this._draggedItem = target;
//         this._offsetX = e.offsetX;
//         this._offsetY = e.offsetY;
//         this._draggedItem.style.zIndex = '1000'; 
//         this._draggedItem.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)'; 
//         this._draggedItem.style.cursor = 'grabbing';

//         e.preventDefault(); // Prevent default browser drag behavior
//     }

//     private _handleMouseMove(e: MouseEvent) {
//         if (!this._draggedItem) return;

//         const gridRect = this.getBoundingClientRect(); 
//         const gapPx = parseFloat(this.gap);

//         // Calculate mouse position relative to the grid's padding box
//         // We subtract gapPx here because the grid-container has padding equal to gapPx
//         const moveX = e.clientX - gridRect.left - this._offsetX - gapPx;
//         const moveY = e.clientY - gridRect.top - this._offsetY - gapPx;

//         this._draggedItem.style.left = `${moveX}px`;
//         this._draggedItem.style.top = `${moveY}px`;
//     }

//     private _handleMouseUp(e: MouseEvent) {
//         if (!this._draggedItem) return;

//         const draggedItemElement = this._draggedItem;
//         this._draggedItem = null; 
//         draggedItemElement.style.zIndex = '';
//         draggedItemElement.style.boxShadow = '0 3px 6px rgba(0,0,0,0.2)';
//         draggedItemElement.style.cursor = 'grab';

//         const gridRect = this.getBoundingClientRect();
//         const gapPx = parseFloat(this.gap);
//         // Final mouse position relative to the grid's padding box
//         const finalMouseX = e.clientX - gridRect.left - this._offsetX - gapPx;
//         const finalMouseY = e.clientY - gridRect.top - this._offsetY - gapPx;

//         // Get the internal data for the dragged item (source of truth for w,h)
//         const draggedItemId = Number(draggedItemElement.dataset.id);
//         const draggedInternalData = this._itemIdToInternalDataMap.get(draggedItemId);

//         if (!draggedInternalData) {
//             console.warn('ssk-grid: Dragged item data not found in internal map for ID:', draggedItemId);
//             return;
//         }

//         const wUnits = draggedInternalData.w; // Use w from internal data
//         const hUnits = draggedInternalData.h; // Use h from internal data

//         // Snap to grid based on effective cell unit (gridItemSize + gapPx)
//         let snappedCol = Math.round(finalMouseX / (this.gridItemSize + gapPx));
//         let snappedRow = Math.round(finalMouseY / (this.gridItemSize + gapPx));

//         // Clamp snapped position to grid boundaries
//         if (snappedCol < 0) snappedCol = 0;
//         if (snappedCol + wUnits > this.maxColumns) snappedCol = this.maxColumns - wUnits;
//         if (snappedRow < 0) snappedRow = 0;

//         // Find the final row: try to place at snappedRow, but push down if collision occurs
//         let finalYRow = snappedRow;
//         while (this._checkCollision(draggedInternalData, snappedCol, finalYRow)) { // Pass internal data
//             finalYRow++; // Move down one row if collision
//         }

//         // Calculate final pixel position for the item's top-left corner
//         const snappedX = snappedCol * (this.gridItemSize + gapPx);
//         const snappedY = finalYRow * (this.gridItemSize + gapPx);

//         draggedItemElement.style.left = `${snappedX}px`;
//         draggedItemElement.style.top = `${snappedY}px`;

//         // Update the position in the original `this.items` array (ONLY x,y)
//         const originalGridItem = this.items.find(item => item.id === draggedItemId);
//         if (originalGridItem) {
//             originalGridItem.x = snappedCol;
//             originalGridItem.y = finalYRow;
//         } else {
//              // If original item not found, it's a new item or not tracked by `items` prop
//              // We should add it to `this.items` to keep state consistent.
//             this.items = [...this.items, { id: draggedItemId, x: snappedCol, y: finalYRow }];
//         }
        
//         // Update the internal data's position
//         draggedInternalData.x = snappedCol;
//         draggedInternalData.y = finalYRow;
        
//         this._layoutGridItems(); // Re-layout all items to ensure consistency

//         // Dispatch event with updated item data
//         this.dispatchEvent(new CustomEvent('grid-item-moved', {
//             detail: {
//                 // Return a combined object with updated x,y and the w,h from internal data
//                 movedGridItemData: { 
//                     id: draggedInternalData.id,
//                     x: draggedInternalData.x,
//                     y: draggedInternalData.y,
//                     w: draggedInternalData.w,
//                     h: draggedInternalData.h
//                 }, 
//                 newPosition: { col: snappedCol, row: finalYRow },
//                 draggedElement: draggedItemElement
//             },
//             bubbles: true,
//             composed: true
//         }));
//     }

//     private _checkCollision(
//         testItemData: InternalGridItemData, // Receives InternalGridItemData directly
//         testCol: number,
//         testRow: number
//     ): boolean {
//         const gapPx = parseFloat(this.gap);
//         const EPSILON = 0.001; // Small value for floating point precision

//         // Calculate pixel dimensions for the item being tested at its potential new position
//         const testX = testCol * (this.gridItemSize + gapPx);
//         const testY = testRow * (this.gridItemSize + gapPx);
//         // Calculate width/height including internal gaps
//         const testWidth = testItemData.w * this.gridItemSize + (testItemData.w > 1 ? (testItemData.w - 1) * gapPx : 0);
//         const testHeight = testItemData.h * this.gridItemSize + (testItemData.h > 1 ? (testItemData.h - 1) * gapPx : 0);

//         const testRect = {
//             left: testX,
//             top: testY,
//             right: testX + testWidth,
//             bottom: testY + testHeight
//         };

//         for (let otherItemData of this._internalItemsData) { // Iterate through internal data
//             // Do not check collision with itself
//             if (otherItemData.id === testItemData.id) continue;

//             // Calculate other item's actual pixel position and size
//             const otherX = otherItemData.x * (this.gridItemSize + gapPx);
//             const otherY = otherItemData.y * (this.gridItemSize + gapPx);
//             const otherWidth = otherItemData.w * this.gridItemSize + (otherItemData.w > 1 ? (otherItemData.w - 1) * gapPx : 0);
//             const otherHeight = otherItemData.h * this.gridItemSize + (otherItemData.h > 1 ? (otherItemData.h - 1) * gapPx : 0);

//             const otherRect = {
//                 left: otherX,
//                 top: otherY,
//                 right: otherX + otherWidth,
//                 bottom: otherY + otherHeight
//             };

//             // Check for overlap, using EPSILON to tolerate minor floating point inaccuracies
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
//         const gapPx = parseFloat(this.gap); // Use parsed gap for padding too

//         const additionalCss = html`
//         <style>
//         :host {
//             --grid-gap: ${parseVariables( // Expose gap as CSS var
//                 cssVar("spacing", this.gap),
//                 this.gap,
//                 "32px", // Default for CSS var fallback
//             )};
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
//             padding: ${gapPx}px; /* Apply padding around the grid content area, using gap value */
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
//         margin:0;
//     }

//     ::slotted(.grid-item) {
//         position: absolute; /* Managed by JavaScript */
//         background-color: #2196f3;
//         color: white;
//         font-weight: bold;
//         font-size: 14px;
//         border-radius: 6px;
//         cursor: grab;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         box-shadow: 0 3px 6px rgba(0,0,0,0.2);
//         transition: box-shadow 0.3s ease;
//         box-sizing: border-box;
//     }

//     ::slotted(.grid-item:active) {
//         cursor: grabbing;
//         box-shadow: 0 8px 16px rgba(0,0,0,0.3);
//     }
//     `;
// }

// declare global {
//     interface HTMLElementTagNameMap {
//         "ssk-grid": Grid;
//     }
// }


//version เปลี่ยนเป็นกำหนดขนาดขากstyle
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
            w: number; // Still keep for grid units (from data-width) for snapping/maxColumns logic
            h: number; // Still keep for grid units (from data-height)
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
            gap = "32px"; // Default gap changed to 16px as requested

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
                    // Need to re-read w/h from DOM if structure of slotted elements *might* have changed due to `items` prop indirectly
                    // It's safer to always re-run the full update cycle here.
                    this._updateInternalGridDataFromSlottedElements();
                }
            }

            /**
             * Reads `data-id`, `data-width`, `data-height` from slotted elements
             * and combines with `x`, `y` from `this.items` to create internal data.
             * MODIFIED: Reads actualWidth/Height from offsetWidth/offsetHeight.
             */
            private _updateInternalGridDataFromSlottedElements() {
                if (!this._slot) {
                    console.warn("ssk-grid: Slot element not found during _updateInternalGridDataFromSlottedElements.");
                    return;
                }

                const currentSlottedElements = Array.from(this._slot.assignedElements({ flatten: true }) as HTMLElement[]);
                
                this._internalItemsData = []; // Clear previous data
                this._itemIdToInternalDataMap.clear();

                currentSlottedElements.forEach(el => {
                    const id = Number(el.dataset.id);
                    
                    // --- MODIFICATION: Read actualWidth/Height from DOM element's offsetWidth/offsetHeight ---
                    const actualWidth = el.offsetWidth;  // Get actual rendered width
                    const actualHeight = el.offsetHeight; // Get actual rendered height

                    // Keep data-width/height for grid unit logic (snapping, maxColumns).
                    // Fallback to 1 if not explicitly provided, assuming 1x1 unit if no data-width/height.
                    const w = Number(el.dataset.width || '1'); 
                    const h = Number(el.dataset.height || '1'); 

                    if (isNaN(id) || actualWidth <= 0 || actualHeight <= 0) {
                        console.warn('ssk-grid: Slotted item missing valid data-id or has zero dimensions, skipping:', el);
                        return;
                    }

                    // Find existing GridItem data (from this.items prop) for initial x, y
                    const existingItemData = this.items.find(item => item.id === id);
                    
                    const internalData: InternalGridItemData = {
                        id: id,
                        x: existingItemData ? existingItemData.x : 0,
                        y: existingItemData ? existingItemData.y : 0,
                        w: w, // Keep w/h units for grid logic
                        h: h,
                        actualWidth: actualWidth,  // Store actual pixel width
                        actualHeight: actualHeight, // Store actual pixel height
                        element: el
                    };
                    this._internalItemsData.push(internalData);
                    this._itemIdToInternalDataMap.set(id, internalData);
                });

                this._layoutGridItems(); // Layout after internal data is updated
            }

            /**
             * Lays out Grid Items based on their data in `_internalItemsData`, `gap`, and `gridItemSize`.
             * MODIFIED: Item size is purely based on actualWidth/Height. Gap is applied as a fixed spacing.
             */
            private _layoutGridItems() {
                let maxBottom = 0;
                const gapPx = parseFloat(this.gap);

                for (const itemData of this._internalItemsData) { // Iterate through internal data
                    const el = itemData.element;

                    // Calculate pixel position:
                    // Position = grid_padding + (index_of_cell * (gridItemSize + gap_between_cells))
                    // This ensures 16px padding on left/top and 16px gap between items.
                    const left = gapPx + (itemData.x * (this.gridItemSize + gapPx));
                    const top = gapPx + (itemData.y * (this.gridItemSize + gapPx));

                    // --- MODIFICATION: Use actualWidth/Height read from the element ---
                    const width = itemData.actualWidth;
                    const height = itemData.actualHeight;

                    el.style.position = 'absolute';
                    el.style.left = `${left}px`;
                    el.style.top = `${top}px`;
                    el.style.width = `${width}px`;
                    el.style.height = `${height}px`;

                    // Calculate maxBottom for grid container height
                    // maxBottom needs to account for the item's position + its height + the bottom gap/padding
                    maxBottom = Math.max(maxBottom, top + height);

                    el.classList.add('grid-item');
                }

                // Set container height, accounting for the final row's content and the bottom padding.
                // The total height should be maxBottom (which includes the item's height and its preceding gaps/padding)
                // PLUS the 'gapPx' for the bottom padding.
                this.style.height = `${maxBottom + gapPx}px`; 
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
                // We subtract gridRect.left/top (element's position) and then the full 'gapPx'
                // because the effective origin of our grid content is after the left/top padding.
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
                const finalMouseX = e.clientX - gridRect.left - this._offsetX - gapPx;
                const finalMouseY = e.clientY - gridRect.top - this._offsetY - gapPx;

                // Get the internal data for the dragged item (source of truth for w,h, actualWidth, actualHeight)
                const draggedItemId = Number(draggedItemElement.dataset.id);
                const draggedInternalData = this._itemIdToInternalDataMap.get(draggedItemId);

                if (!draggedInternalData) {
                    console.warn('ssk-grid: Dragged item data not found in internal map for ID:', draggedItemId);
                    return;
                }

                const wUnits = draggedInternalData.w; // Use w from internal data (from data-width)
                const hUnits = draggedInternalData.h; // Use h from internal data (from data-height)

                // Snap to grid based on effective cell unit (gridItemSize + gapPx)
                // This calculates which grid cell the mouse pointer is closest to.
                let snappedCol = Math.round(finalMouseX / (this.gridItemSize + gapPx));
                let snappedRow = Math.round(finalMouseY / (this.gridItemSize + gapPx));

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
                // Position = grid_padding + (index_of_cell * (gridItemSize + gap_between_cells))
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
                            w: draggedInternalData.w,
                            h: draggedInternalData.h,
                            actualWidth: draggedInternalData.actualWidth, // Include actual pixel dimensions
                            actualHeight: draggedInternalData.actualHeight
                        }, 
                        newPosition: { col: snappedCol, row: finalYRow },
                        draggedElement: draggedItemElement
                    },
                    bubbles: true,
                    composed: true
                }));
            }

            /**
             * Checks for collision between the `testItem` and all other items in the grid.
             * Dimensions are based on their actualWidth/Height from `_internalItemsData`.
             */
            private _checkCollision(
                testItemData: InternalGridItemData, // Receives InternalGridItemData directly
                testCol: number,
                testRow: number
            ): boolean {
                const gapPx = parseFloat(this.gap);
                const EPSILON = 0.001; // Small value for floating point precision

                // Calculate pixel dimensions for the item being tested at its potential new position
                // Position = grid_padding + (index_of_cell * (gridItemSize + gap_between_cells))
                const testX = gapPx + (testCol * (this.gridItemSize + gapPx));
                const testY = gapPx + (testRow * (this.gridItemSize + gapPx));
                // --- MODIFICATION: Use actualWidth/Height of testItem ---
                const testWidth = testItemData.actualWidth;
                const testHeight = testItemData.actualHeight;

                const testRect = {
                    left: testX,
                    top: testY,
                    right: testX + testWidth,
                    bottom: testY + testHeight
                };

                for (let otherItemData of this._internalItemsData) { // Iterate through internal data
                    // Do not check collision with itself
                    if (otherItemData.id === testItemData.id) continue;

                    // Calculate other item's actual pixel position and size
                    const otherX = gapPx + (otherItemData.x * (this.gridItemSize + gapPx));
                    const otherY = gapPx + (otherItemData.y * (this.gridItemSize + gapPx));
                    // --- MODIFICATION: Use actualWidth/Height of otherItem ---
                    const otherWidth = otherItemData.actualWidth;
                    const otherHeight = otherItemData.actualHeight;

                    const otherRect = {
                        left: otherX,
                        top: otherY,
                        right: otherX + otherWidth,
                        bottom: otherY + otherHeight
                    };

                    // Check for overlap, using EPSILON to tolerate minor floating point inaccuracies
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
                    /* Apply full gap as padding around the grid content area */
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
                /*
                * สำคัญ: หากคุณกำหนด width/height ใน style ของ slotted element โดยตรง
                * คุณอาจต้องลบค่า width/height ที่กำหนดใน CSS นี้ออก
                * หรือตรวจสอบให้แน่ใจว่า style ที่กำหนดใน HTML มีความสำคัญสูงกว่า (inline style)
                */
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