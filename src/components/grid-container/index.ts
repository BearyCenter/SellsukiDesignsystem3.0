import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import "../../elements/divider";
import "../../elements/icon";
import { GridStack, GridStackElement, GridStackWidget } from "./gs/gridstack"
// import './gs/gridstack.min.css';
// import './gs/gridstack.css';
import gridstackStyles from './gs/gridstack.css?inline'; 
const gridstackSheet = new CSSStyleSheet();
gridstackSheet.replaceSync(gridstackStyles);


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
    w?: number;
    h?: number;
    content?: string;
}

@customElement("ssk-grid-container")
export class Grid extends LitElement {
    static registeredName = "ssk-grid-container";

    @consume({ context: themeContext, subscribe: true })
    @property({ attribute: false })
    public theme?: Theme;

    @property({ type: String })
    testId?: string;

    @property({ type: String, attribute: "gap" })
    gap = "16px";

    @property({ type: Number, attribute: "grid-item-size" })
    gridItemSize = 88;

    @property({ type: Number, attribute: "max-columns" })
    maxColumns = 12;

    @property({ type: Array })
    items: GridItem[] = [];


    private grid: GridStack | null = null;

    @query('slot') private _slot!: HTMLSlotElement;
   
    static styles = [
        gridstackSheet, // <--- style gridstack.css
        css`
            :host {
                display: block;
            }
            .grid-stack-item-content {
                background-color: var(--grid-item-background, rgb(188, 111, 24));
                color: var(--grid-item-color, white);
            }
            ::slotted(.grid-stack-item-content) {
                background-color: var(--grid-item-background, rgb(188, 111, 24));
                color: var(--grid-item-color, white);
            }
        `
    ];
    firstUpdated() {
        const grid = this.renderRoot?.querySelector('.grid-stack') as GridStackElement | undefined;
        if (grid) {
            this.grid = GridStack.init({
                float: false,
                column: this.maxColumns,
                cellHeight: this.gridItemSize,
                margin: 16,
            }, grid);
            // Check if there are items to load
            if (this.items && this.items.length > 0) {
                const widgets: GridStackWidget[] = this.items.map(item => ({
                    x: item.x,
                    y: item.y,
                    w: item.w || 1, 
                    h: item.h || 1,
                    content: item.content || `Item ${item.id}`,
                }));
                this.grid.load(widgets);
            }
        }
    }


    // firstUpdated() {
    //     //v1
    //     // const grid = this.renderRoot?.querySelector('.grid-stack') as GridStackElement | undefined;

    //     // // รอ slot render ก่อนเรียก init
    //     // const slottedElements = this._slot.assignedElements({ flatten: true });
        
    //     // if (grid && slottedElements.length > 0) {
    //     //     // Initialize GridStack
    //     //     this.grid = GridStack.init({
    //     //     float: false,
    //     //     column: this.maxColumns,
    //     //     cellHeight: this.gridItemSize,
    //     //     margin: 16,
    //     //     }, grid);
    //     // }
        

    //     // //v2
    //     // const grid = this.renderRoot?.querySelector('.grid-stack');
    //     // // wait for slotted content
    //     // requestAnimationFrame(() => {
    //     //     const GridStack = (window as any).GridStack;
    //     //     if (GridStack && grid) {
    //     //         this.grid = GridStack.init({
    //     //         column: this.maxColumns,
    //     //         float: false,
    //     //         cellHeight: this.gridItemSize,
    //     //         margin: parseInt(this.gap),
    //     //         }, grid);
    //     //     } else {
    //     //         console.warn("GridStack is not available");
    //     //     }
    //     // });

    // }

    render() {
        return html`
        ${parseThemeToCssVariables(this.theme?.components?.gridcontainer, ":host")}
            <div class="grid-stack">
                <slot></slot>
            </div>
        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "ssk-grid-container": Grid;
    }
}