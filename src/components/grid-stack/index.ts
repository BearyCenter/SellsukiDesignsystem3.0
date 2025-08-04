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

export interface GridItem {
    id: number;
    x: number;
    y: number;
}

interface InternalGridItemData extends GridItem {
    w: number;
    h: number;
    actualWidth: number;
    actualHeight: number;
    element: HTMLElement;
}

@customElement("ssk-grid-stack")
export class Grid extends LitElement {
    static registeredName = "ssk-grid-stack";

    @consume({ context: themeContext, subscribe: true })
    @property({ attribute: false })
    public theme?: Theme;

    @property({ type: String })
    testId?: string;

    @property({ type: String, attribute: "gap" })
    gap = "0px";

    @property({ type: Number, attribute: "grid-item-size" })
    gridItemSize = 88;

    @property({ type: Number, attribute: "max-columns" })
    maxColumns = 12;

    @property({ type: Array })
    items: GridItem[] = [];

    @query('slot')
    _slot!: HTMLSlotElement;

    private draggedItem: HTMLElement | null = null;
    private offsetX = 0;
    private offsetY = 0;

    // Internal array to hold calculated item data (including w/h and element ref)
    private internalItemsData: InternalGridItemData[] = [];
    private itemIdToInternalDataMap = new Map<number, InternalGridItemData>();


    firstUpdated() {
        this.updateGridItemsFromSlot(); // Initial data extraction and layout
        this.initializeDragAndDrop();

        this._slot.addEventListener('slotchange', () => {
            this.updateGridItemsFromSlot(); // Update data and relayout on slot changes
            this.initializeDragAndDrop();         // Must re-setup because element references might change
        });
    }

    updated(changedProperties: Map<string, any>) {
        if (changedProperties.has('maxColumns')) {
            if (this.maxColumns < 3) {
                this.maxColumns = 3;
            }
            this.reflowGridLayout();
        }

        if (changedProperties.has('items') || changedProperties.has('gap') || changedProperties.has('gridItemSize')) {
            this.updateGridItemsFromSlot();
        }
    }
    
    private updateGridItemsFromSlot() {
        if (!this._slot) {
            return;
        }

        const currentSlottedElements = Array.from(this._slot.assignedElements({ flatten: true }) as HTMLElement[]);

        this.internalItemsData = [];
        this.itemIdToInternalDataMap.clear();
        currentSlottedElements.forEach(el => {
            const id = Number(el.dataset.id);

            const actualWidth = el.offsetWidth;
            const actualHeight = el.offsetHeight;

            if (isNaN(id) || actualWidth <= 0 || actualHeight <= 0) {
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
            this.internalItemsData.push(internalData);
            this.itemIdToInternalDataMap.set(id, internalData);
        });
        this.positionGridItems();
    }

    private positionGridItems() {
        let maxBottom = 0;
        for (const itemData of this.internalItemsData) {
            const el = itemData.element;

            const left = itemData.x * this.gridItemSize;
            const top = itemData.y * this.gridItemSize;

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

        this.style.height = `${maxBottom}px`;
    }

    private initializeDragAndDrop() {
        this.internalItemsData.forEach(itemData => {
            itemData.element.removeEventListener('mousedown', this.handleMouseDownBound);
        });

        this.internalItemsData.forEach(itemData => {
            itemData.element.addEventListener('mousedown', this.handleMouseDownBound);
        });

        document.removeEventListener('mousemove', this.handleMouseMoveBound);
        document.removeEventListener('mouseup', this.handleMouseUpBound);

        document.addEventListener('mousemove', this.handleMouseMoveBound);
        document.addEventListener('mouseup', this.handleMouseUpBound);
    }

    private handleMouseDownBound = this.onMouseDown.bind(this);
    private handleMouseMoveBound = this.onMouseMove.bind(this);
    private handleMouseUpBound = this.onMouseUp.bind(this);

    private onMouseDown(e: MouseEvent) {
        const target = e.currentTarget as HTMLElement;
        const itemId = Number(target.dataset.id);
        const internalItemData = this.itemIdToInternalDataMap.get(itemId);
        if (!internalItemData) return;

        if (e.button !== 0) return;

        this.draggedItem = target;
        this.offsetX = e.offsetX;
        this.offsetY = e.offsetY;
        this.draggedItem.style.zIndex = '1000';
        this.draggedItem.style.cursor = 'grabbing';

        e.preventDefault();
    }

    private onMouseMove(e: MouseEvent) {
        if (!this.draggedItem) return;

        const gridRect = this.getBoundingClientRect();
        const moveX = e.clientX - gridRect.left - this.offsetX;
        const moveY = e.clientY - gridRect.top - this.offsetY;

        this.draggedItem.style.left = `${moveX}px`;
        this.draggedItem.style.top = `${moveY}px`;
    }
    
    private detectCollision(
        testItemData: InternalGridItemData,
        testCol: number,
        testRow: number
    ): InternalGridItemData | null {
        const testX = testCol * this.gridItemSize;
        const testY = testRow * this.gridItemSize;
        const testWidth = testItemData.w * this.gridItemSize;
        const testHeight = testItemData.h * this.gridItemSize;

        const testRect = {
            left: testX,
            top: testY,
            right: testX + testWidth,
            bottom: testY + testHeight
        };

        for (let otherItemData of this.internalItemsData) {
            if (otherItemData.id === testItemData.id) continue;

            const otherX = otherItemData.x * this.gridItemSize;
            const otherY = otherItemData.y * this.gridItemSize;
            const otherWidth = otherItemData.w * this.gridItemSize;
            const otherHeight = otherItemData.h * this.gridItemSize;

            const otherRect = {
                left: otherX,
                top: otherY,
                right: otherX + otherWidth,
                bottom: otherY + otherHeight
            };

            const overlap = !(
                testRect.right <= otherRect.left ||
                testRect.left >= otherRect.right ||
                testRect.bottom <= otherRect.top ||
                testRect.top >= otherRect.bottom 
            );

            if (overlap) return otherItemData;
        }
        return null;
    }

    private onMouseUp(e: MouseEvent) {
        if (!this.draggedItem) return;

        const draggedItemElement = this.draggedItem;
        this.draggedItem = null;
        draggedItemElement.style.zIndex = '';
        draggedItemElement.style.cursor = 'grab';

        const gridRect = this.getBoundingClientRect();
        const finalItemPixelX = e.clientX - gridRect.left - this.offsetX;
        const finalItemPixelY = e.clientY - gridRect.top - this.offsetY;

        const draggedItemId = Number(draggedItemElement.dataset.id);
        const draggedInternalData = this.itemIdToInternalDataMap.get(draggedItemId);
        if (!draggedInternalData) return;

        let snappedCol = Math.round(finalItemPixelX / this.gridItemSize);
        let snappedRow = Math.round(finalItemPixelY / this.gridItemSize);

        const wUnits = draggedInternalData.w;

        snappedCol = Math.max(0, Math.min(this.maxColumns - wUnits, snappedCol));
        snappedRow = Math.max(0, snappedRow);

        let newPos = { col: snappedCol, row: snappedRow };
        
        let collidingItem: InternalGridItemData | null = null;
        for (let r = 0; r < draggedInternalData.h; r++) {
            for (let c = 0; c < draggedInternalData.w; c++) {
                collidingItem = this.detectCollision(draggedInternalData, newPos.col + c, newPos.row + r);
                if (collidingItem) {
                    break;
                }
            }
            if (collidingItem) break;
        }

        // Remove the dragged item from the list temporarily to find a new position
        const otherItems = this.internalItemsData.filter(item => item.id !== draggedInternalData.id);

        if (collidingItem) {
            // Find a spot to "insert" the dragged item
            // Check for a perfect spot first (same size item)
            if (draggedInternalData.w === collidingItem.w && draggedInternalData.h === collidingItem.h) {
                // Swap positions
                const tempX = draggedInternalData.x;
                const tempY = draggedInternalData.y;
                
                draggedInternalData.x = collidingItem.x;
                draggedInternalData.y = collidingItem.y;

                collidingItem.x = tempX;
                collidingItem.y = tempY;

                const existingDragged = this.items.find(i => i.id === draggedItemId);
                if (existingDragged) {
                    existingDragged.x = draggedInternalData.x;
                    existingDragged.y = draggedInternalData.y;
                }
                const existingCollided = this.items.find(i => i.id === collidingItem.id);
                if (existingCollided) {
                    existingCollided.x = collidingItem.x;
                    existingCollided.y = collidingItem.y;
                }
            } else {
                // If sizes are different, just place the dragged item and let reflow push the others down
                draggedInternalData.x = newPos.col;
                draggedInternalData.y = newPos.row;

                const existingDragged = this.items.find(i => i.id === draggedItemId);
                if (existingDragged) {
                    existingDragged.x = draggedInternalData.x;
                    existingDragged.y = draggedInternalData.y;
                }
            }
        } else {
            // No collision, just update position
            draggedInternalData.x = newPos.col;
            draggedInternalData.y = newPos.row;

            const existingItem = this.items.find(i => i.id === draggedItemId);
            if (existingItem) {
                existingItem.x = newPos.col;
                existingItem.y = newPos.row;
            } else {
                this.items = [...this.items, {
                    id: draggedItemId,
                    x: newPos.col,
                    y: newPos.row
                }];
            }
        }
        
        this.reflowGridLayout();

        this.dispatchEvent(new CustomEvent('grid-item-moved', {
            detail: {
                movedGridItemData: {
                    id: draggedInternalData.id,
                    x: draggedInternalData.x,
                    y: draggedInternalData.y,
                    w: draggedInternalData.w,
                    h: draggedInternalData.h,
                    actualWidth: draggedInternalData.actualWidth,
                    actualHeight: draggedInternalData.actualHeight
                },
                newPosition: newPos,
                draggedElement: draggedItemElement
            },
            bubbles: true,
            composed: true
        }));
    }
    
    // ค้นหาตำแหน่งว่างในกริดสำหรับไอเท็มที่กำหนด
    private findAvailablePosition(itemToPlace: InternalGridItemData): { col: number; row: number } | null {
        for (let row = 0; row < Infinity; row++) {
            for (let col = 0; col <= this.maxColumns - itemToPlace.w; col++) {
                let isFree = true;
                for (let h = 0; h < itemToPlace.h; h++) {
                    for (let w = 0; w < itemToPlace.w; w++) {
                        const testItem = { ...itemToPlace, x: col, y: row };
                        const collision = this.detectCollision(testItem, col + w, row + h);
                        if (collision) {
                            isFree = false;
                            break;
                        }
                    }
                    if (!isFree) break;
                }
                
                if (isFree) {
                    return { col, row };
                }
            }
        }
        return null;
    }
    
    private reflowGridLayout() {
        const sortedItems = [...this.internalItemsData].sort((a, b) => a.y - b.y || a.x - b.x);

        const newGridState: InternalGridItemData[] = [];
        const occupiedCells = new Set<string>();

        for (const item of sortedItems) {
            let foundPosition = false;
            for (let row = 0; row < Infinity; row++) {
                for (let col = 0; col <= this.maxColumns - item.w; col++) {
                    let isFree = true;
                    for (let h = 0; h < item.h; h++) {
                        for (let w = 0; w < item.w; w++) {
                            if (occupiedCells.has(`${col + w}-${row + h}`)) {
                                isFree = false;
                                break;
                            }
                        }
                        if (!isFree) break;
                    }

                    if (isFree) {
                        item.x = col;
                        item.y = row;
                        newGridState.push(item);
                        for (let h = 0; h < item.h; h++) {
                            for (let w = 0; w < item.w; w++) {
                                occupiedCells.add(`${col + w}-${row + h}`);
                            }
                        }
                        foundPosition = true;
                        break;
                    }
                }
                if (foundPosition) break;
            }
        }
        
        this.internalItemsData = newGridState;
        this.items = newGridState.map(i => ({ id: i.id, x: i.x, y: i.y }));
        this.positionGridItems();
    }


    private shiftItemRightOrDown(item: InternalGridItemData, startRow: number) {
        let row = startRow;

        while (true) {
            for (let col = 0; col <= this.maxColumns - item.w; col++) {
                if (!this.detectCollision(item, col, row)) {
                    const existing = this.items.find(i => i.id === item.id);
                    if (existing) {
                        existing.x = col;
                        existing.y = row;
                    }

                    item.x = col;
                    item.y = row;

                    return;
                }
            }
            row += 1;
        }
    }

    render() {

        const additionalCss = html`
        <style>
        :host {
            --grid-gap: ${parseVariables(
            cssVar("spacing", this.gap),
            this.gap,
            "0px",
        )};
            --grid-item-size: ${this.gridItemSize}px;
        }
        </style>
        `;

        return html`
        ${parseThemeToCssVariables(this.theme?.components?.gridstack, ":host")}
        ${additionalCss}

        <div
            class="grid-container"
            data-testid=${this.testId || nothing}
            style="padding: 0px;"
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
        margin:0;
    }

    ::slotted(.grid-item) {
        position: absolute;
        color: white;
        font-weight: bold;
        font-size: 14px;
        border-radius: 6px;
        cursor: grab;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: box-shadow 0.3s ease;
        box-sizing: border-box;
        transition: all 0.25s ease-in-out;
    }
    ::slotted(.grid-item > *) {
        margin: 0;
        padding: 0;
    }
    ::slotted(.grid-item:active) {
        cursor: grabbing;
    }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ssk-grid-stack": Grid;
    }
}