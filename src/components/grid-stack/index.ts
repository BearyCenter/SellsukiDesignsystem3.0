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
        // If items (x,y) change, or layout properties (gap, gridItemSize, maxColumns) change
        if (changedProperties.has('items') || changedProperties.has('gap') || changedProperties.has('gridItemSize') || changedProperties.has('maxColumns')) {
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

        // Check for collisions
        const collidedItems = this.findCollidingItems(draggedInternalData, snappedCol, snappedRow);

        // Update position
        draggedInternalData.x = snappedCol;
        draggedInternalData.y = snappedRow;

        const existingItem = this.items.find(i => i.id === draggedItemId);
        if (existingItem) {
            existingItem.x = snappedCol;
            existingItem.y = snappedRow;
        } else {
            this.items = [...this.items, {
                id: draggedItemId,
                x: snappedCol,
                y: snappedRow
            }];
        }

        for (const item of collidedItems) {
            this.shiftItemRightOrDown(item, snappedRow);
        }

        // update position
        this.positionGridItems();

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
                newPosition: { col: draggedInternalData.x, row: draggedInternalData.y },
                draggedElement: draggedItemElement
            },
            bubbles: true,
            composed: true
        }));
    }
    private findCollidingItems(
        testItemData: InternalGridItemData,
        testCol: number,
        testRow: number
    ): InternalGridItemData[] {
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

        const collided: InternalGridItemData[] = [];

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

            if (overlap) collided.push(otherItemData);
        }

        return collided;
    }

    private shiftItemRightOrDown(item: InternalGridItemData, startRow: number) {
        let row = startRow;

        while (true) {
            // Check if the item can fit in the current row
            for (let col = 0; col <= this.maxColumns - item.w; col++) {
                if (!this.detectCollision(item, col, row)) {
                    // Update internal and items[]
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