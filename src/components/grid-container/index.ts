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

@customElement("ssk-grid-container")
export class GridContainer extends LitElement {
    static registeredName = "ssk-grid-container";

    @consume({ context: themeContext, subscribe: true })
    @property({ attribute: false })
    public theme?: Theme;

    // BaseAttributes
    @property({ type: String })
    testId?: string;

    @property({ type: String, attribute: "grid-template-columns" })
    gridTemplateColumns?: string;

    @property({ type: String, attribute: "grid-template-rows" })
    gridTemplateRows?: string;

    @property({ type: String, attribute: "gap" })
    gap = "8px"; // ช่องว่างเริ่มต้น 8px

    @property({ type: String, attribute: "align-items" })
    alignItems = "stretch"; // Default grid items

    @property({ type: String, attribute: "justify-items" })
    justifyItems = "stretch"; // Default grid items

    @property({ type: String, attribute: "padding" })
    padding = "16px"; // Padding รอบ grid container

    @property({ type: Number, attribute: "max-columns" })
    maxColumns = 12; // Default maximum columns to 12

    @query('slot')
    _slot!: HTMLSlotElement;

    private _draggedItem: HTMLElement | null = null; //เก็บ Reference ไปยัง HTML Element ที่กำลังถูกลากอยู่.
    private _dropZone: HTMLElement | null = null; // เก็บ Reference ไปยัง HTML Element ก่อน ที่รายการที่ถูกลากจะถูกแทรกเข้ามา. ถ้าเป็น null หมายถึงจะถูกเพิ่มไปที่ส่วนท้าย.

    firstUpdated() {
        // component is first updated
        this.setupDragAndDrop();

        // Listen for slot changes to re-apply drag and drop setup if children change
        this._slot.addEventListener('slotchange', this.setupDragAndDrop.bind(this));
    }

    private setupDragAndDrop() {
        // Get all direct children of the slot that are elements
        const slottedElements = this._slot.assignedElements({ flatten: true }) as HTMLElement[];

        slottedElements.forEach(item => {
            // ตรวจสอบ item ว่าสามารถลากได้
            item.setAttribute('draggable', 'true');

            // Remove existing listeners to prevent duplicates
            item.removeEventListener('dragstart', this.handleDragStart);
            item.removeEventListener('dragover', this.handleDragOver);
            item.removeEventListener('dragleave', this.handleDragLeave);
            item.removeEventListener('drop', this.handleDrop);
            item.removeEventListener('dragend', this.handleDragEnd);

            // Add event listeners, binding 'this' to the component instance
            item.addEventListener('dragstart', this.handleDragStart.bind(this));
            item.addEventListener('dragover', this.handleDragOver.bind(this));
            item.addEventListener('dragleave', this.handleDragLeave.bind(this));
            item.addEventListener('drop', this.handleDrop.bind(this));
            item.addEventListener('dragend', this.handleDragEnd.bind(this));
        });
    }

    private handleDragStart(e: DragEvent) {
        this._draggedItem = e.target as HTMLElement;
        this._draggedItem.classList.add('dragging');
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', this._draggedItem.id || 'dragged-item');
        }
    }

    private handleDragOver(e: DragEvent) {
        e.preventDefault(); // Allow dropping
        const target = e.target as HTMLElement;
        const gridContainerDiv = this.shadowRoot?.querySelector('.grid-container') as HTMLElement;
        const container = this; // The host element where Light DOM children live

        this.cleanupDragAndDropVisuals(); // Clear all highlights first

        this._dropZone = null; // Reset dropZone for each dragover

        const itemsInOrder = Array.from(container.children).filter(
            child => child.classList.contains('grid-item') && child !== this._draggedItem
        ) as HTMLElement[];

        let foundInsertionPoint = false;

        for (const item of itemsInOrder) {
            const itemRect = item.getBoundingClientRect();
            const isMouseBeforeItem = (e.clientX < itemRect.left + itemRect.width / 2) ||
                (e.clientY < itemRect.top + itemRect.height / 2 && e.clientX < itemRect.right); // More robust vertical check

            if (isMouseBeforeItem) {
                this._dropZone = item;
                item.classList.add('drop-zone-hover-before');
                foundInsertionPoint = true;
                break;
            }
        }

        if (!foundInsertionPoint) {
            gridContainerDiv?.classList.add('drop-container-hover');
            this._dropZone = null;
        }
    }

    private handleDragLeave(e: DragEvent) {
        this.cleanupDragAndDropVisuals();
    }

    private handleDrop(e: DragEvent) {
        e.preventDefault();
        const container = this;

        if (this._draggedItem) {
            if (this._draggedItem.parentNode === container) {
                if (this._dropZone) {
                    container.insertBefore(this._draggedItem, this._dropZone);
                } else {
                    container.appendChild(this._draggedItem);
                }

                this.dispatchEvent(new CustomEvent('grid-reordered', {
                    detail: {
                        newOrder: Array.from(container.children).map(child => (child as HTMLElement).id || child.textContent?.trim()),
                        draggedItem: this._draggedItem,
                        dropZone: this._dropZone ? (this._dropZone.id || this._dropZone.textContent?.trim()) : 'end-of-grid'
                    },
                    bubbles: true,
                    composed: true
                }));
            }
        }
        this.cleanupDragAndDrop();
    }

    private handleDragEnd(e: DragEvent) {
        this.cleanupDragAndDrop();
    }

    private cleanupDragAndDrop() {
        if (this._draggedItem) {
            this._draggedItem.classList.remove('dragging');
            this._draggedItem = null;
        }
        this.cleanupDragAndDropVisuals();
    }

    private cleanupDragAndDropVisuals() {
        // Clear all drop zone highlights on all items
        const container = this;
        Array.from(container.children).forEach(child => {
            (child as HTMLElement).classList.remove('drop-zone-hover-before'); // Removed drop-zone-hover-after
        });
        // Clear container highlight
        this.shadowRoot?.querySelector('.grid-container')?.classList.remove('drop-container-hover');
        this._dropZone = null; // Reset dropZone
    }


    render() {
        // Changed defaultGridTemplateColumns to directly use maxColumns for fixed 12 columns
        const defaultGridTemplateColumns = `repeat(${this.maxColumns}, 1fr)`;
        const defaultGridTemplateRows = "minmax(88px, auto)";

        const defaultGridItemBaseSize = 88;

        let additionalCss = html`
        <style>
        :host {
            --grid-template-columns: ${parseVariables(
                cssVar("grid-template-columns", this.gridTemplateColumns),
                this.gridTemplateColumns,
                defaultGridTemplateColumns,
            )};
            --grid-template-rows: ${parseVariables(
                cssVar("grid-template-rows", this.gridTemplateRows),
                this.gridTemplateRows,
                defaultGridTemplateRows,
            )};
            --grid-gap: ${parseVariables(
                cssVar("spacing", this.gap),
                this.gap,
                "8px",
            )};
            --grid-align-items: ${this.alignItems};
            --grid-justify-content: ${this.justifyItems};
            --grid-padding: ${parseVariables(
                cssVar("spacing", this.padding),
                this.padding,
                "16px",
            )};

            --grid-item-default-size: ${defaultGridItemBaseSize}px;
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
            grid-template-columns: var(--grid-template-columns);
            grid-template-rows: var(--grid-template-rows);
            gap: var(--grid-gap);
            align-items: var(--grid-align-items);
            justify-items: var(--grid-justify-items); /* Corrected property name for grid alignment */
            padding: var(--grid-padding);
            margin: 0 auto; /* Keep margin: 0 auto; for centering */
            "
        >
        <slot></slot>
        </div>
    `;
    }

    static styles = css`
    :host {
        display: block;
    }

    .grid-container {
        display: grid;
        width: 100%;
        height: 100%;
        min-height: 300px;
        box-sizing: border-box;
    }

    .dragging {
        opacity: 0.5;
        border: 2px dashed #007bff;
    }

    .drop-zone-hover-before {
        border-top: 4px solid #007bff;
    }

    .drop-container-hover {
        outline: 2px dashed #007bff;
        outline-offset: -4px;
    }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ssk-grid-container": GridContainer;
    }
}
