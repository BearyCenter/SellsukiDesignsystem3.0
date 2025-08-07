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
import { c } from "vitest/dist/reporters-5f784f42.js";
import { th } from "date-fns/locale";

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

    slottedChildren: Node[] = [];

    constructor() {
        super();
        this.slottedChildren = [...this.childNodes];
    }
    

    private grid: GridStack | null = null;

   
    static styles = [
        gridstackSheet, // <--- style gridstack.css
        css`
            :host {
                display: block;
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
                acceptWidgets: function(el) { return true },
            }, grid);
        }

        const gridstackRoot = this.renderRoot.querySelector('.grid-stack') // Clear existing children
        gridstackRoot?.replaceChildren();
        this.slottedChildren.forEach((child) => {
                if (child instanceof HTMLElement) {
                    console.log("Adding child to slot", child);
                    const myDiv = document.createElement('div');
                    myDiv.className = "grid-stack-item";
                    myDiv.setAttribute('gs-x', child.getAttribute('gs-x') || '0');
                    myDiv.setAttribute('gs-y', child.getAttribute('gs-y') || '0');
                    myDiv.setAttribute('gs-w', child.getAttribute('gs-w') || '1');
                    myDiv.setAttribute('gs-h', child.getAttribute('gs-h') || '1');
                    const contentDiv = document.createElement('div');
                    contentDiv.className = "grid-stack-item-content";
                    contentDiv.appendChild(child);
                    myDiv.appendChild(contentDiv);
                    this.grid?.makeWidget(myDiv);
                }
        });

        
        const config = { attributes: false, childList: true, subtree: false };
        const callback = (mutationList, observer) => {
            for (const mutation of mutationList) {
                if (mutation.type === "childList") {
                    console.log("A child node has been added or removed.");
                    this.updateChildren();
                } 
            }
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(this, config);
    }

    SetupDragIn(elements: HTMLElement[]) {
        console.log("Setting up drag in");
        GridStack.setupDragIn(elements, { helper: this.myClone })
    }

    myClone(el: HTMLElement): HTMLElement {
      return el.cloneNode(true) as HTMLElement;

    }

    updateChildren() {
        this.slottedChildren = [...this.childNodes];
        console.log("Updating children", this.slottedChildren);
        this.slottedChildren.forEach((child) => {
            if (child instanceof HTMLElement) {
                console.log("Adding child to slot", child);
                const myDiv = document.createElement('div');
                myDiv.className = "grid-stack-item";
                myDiv.setAttribute('gs-x', child.getAttribute('gs-x') || '0');
                myDiv.setAttribute('gs-y', child.getAttribute('gs-y') || '0');
                myDiv.setAttribute('gs-w', child.getAttribute('gs-w') || '1');
                myDiv.setAttribute('gs-h', child.getAttribute('gs-h') || '1');
                const contentDiv = document.createElement('div');
                contentDiv.className = "grid-stack-item-content";
                contentDiv.appendChild(child.cloneNode(true) as HTMLElement);
                myDiv.appendChild(contentDiv);
                this.grid?.makeWidget(myDiv);
            }
        });
    }


    updated() {
        // console.log("Updated grid with slotted children", ...this.childNodes);
        // const gridstackRoot = this.renderRoot.querySelector('.grid-stack') // Clear existing children
        // gridstackRoot?.replaceChildren();
        // this.slottedChildren.forEach((child) => {
        //         if (child instanceof HTMLElement) {
        //             console.log("Adding child to slot", child);
        //             const myDiv = document.createElement('div');
        //             myDiv.className = "grid-stack-item";
        //             myDiv.setAttribute('gs-x', child.getAttribute('gs-x') || '0');
        //             myDiv.setAttribute('gs-y', child.getAttribute('gs-y') || '0');
        //             myDiv.setAttribute('gs-w', child.getAttribute('gs-w') || '1');
        //             myDiv.setAttribute('gs-h', child.getAttribute('gs-h') || '1');
        //             const contentDiv = document.createElement('div');
        //             contentDiv.className = "grid-stack-item-content";
        //             contentDiv.appendChild(child);
        //             myDiv.appendChild(contentDiv);
        //             this.grid?.makeWidget(myDiv);
        //         }
        // });
    }



    render() {
        

        return html`
        ${parseThemeToCssVariables(this.theme?.components?.gridcontainer, ":host")}
            <div class="grid-stack"></div>
        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "ssk-grid-container": Grid;
    }
}