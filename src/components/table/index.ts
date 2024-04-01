import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit/context";
import "../../../src/elements/badge";
import { themeContext } from "../../contexts/theme";
import { redispatchEvents } from "../../helpers/lit";
import {
    ColorName,
    ColorRole,
    FontFamilyGroup,
    FontWeight,
    Size,
    Theme,
    cssVar,
    parseThemeToCssVariables,
    parseVariables,
} from "../../types/theme";
import { c } from "vitest/dist/reporters-5f784f42.js";

interface Header {
    text: string;
    value?: string; 
}

interface RowData {
    [key: string]: string;
}

@customElement("ssk-table")
export class Table extends LitElement {
    static registeredName = "ssk-table";

    @consume({ context: themeContext, subscribe: true })
    @property({ attribute: false })
    public theme?: Theme;

    // BaseAttributes
    @property({ type: String })
    testId?: string;

    // ThemeValue
    @property({ type: String })
    themeColor: ColorRole | ColorName = "primary";
    @property({ type: String })
    color?: ColorRole | ColorName;
    @property({ type: String })
    backgroundColor?: string | undefined;

    @property({ type: String })
    size: Size = "md";
    @property({ type: String })
    padding?: Size;
    @property({ type: String })
    fontSize?: string | undefined;
    @property({ type: String })
    gap?: string | undefined;
    @property({ type: String })
    rounded?: string | undefined;
    @property({ type: String })
    margin?: string | undefined;

    // font
    @property({ type: String })
    fontFamilyGroup: FontFamilyGroup = "sans";
    @property({ type: String })
    fontWeight: FontWeight = "normal";

    @property({ type: String })
    borderWidth?: string | undefined;
    @property({ type: String })
    height?: string | undefined;

    @property({ type: Array })
    headers: Header[] = [];

    @property({ type: Array })
    itemValue: RowData[] = [];

    @property({ type: Boolean }) 
    showFooter: boolean = false;

    @property({ type: Array }) 
    selectedRows: number[] = [];

    @property({ type: Boolean })
    selectEnabled: boolean = false;

    @property({ type: Boolean })
    selectAll: boolean = false;

    @property({ type: Boolean })
    min = false;

    @property({ type: Boolean })
    fullWidth = false;

    toggleSelectAll() {
        this.selectAll = !this.selectAll;
        if (this.selectAll) {
            this.selectedRows = Array.from({ length: this.itemValue.length }, (_, index) => index);
        } else {
            this.selectedRows = [];
        }
    }

    toggleSelect(rowIndex: number) {
        if (this.selectEnabled) {
            const index = this.selectedRows.indexOf(rowIndex);
            if (index === -1) {
                this.selectedRows = [...this.selectedRows, rowIndex];
            } else {
                this.selectedRows = this.selectedRows.filter(i => i !== rowIndex);
            }
        }
    }

    renderHeader(header: Header): TemplateResult {
        if (header.value) {
            console.log(header.value);
            return html`<th><slot name="${header.value}"></slot></th>`;
        } else {
            return html`<th>${header.text}</th>`;
        }
    }
  

    //new3
    // renderBody(row: RowData, rowIndex: number): TemplateResult[] {
    //     const content = [
    //         ...(this.selectEnabled ? [html`
    //             <td>
    //                 <input type="checkbox" .checked="${this.selectedRows.includes(rowIndex)}" @change="${() => this.toggleSelect(rowIndex)}">
    //             </td>
    //         `] : []),
    //         ...this.headers.map(header => {
    //             const key = header.value || header.text.toLowerCase();
    //             let value = row[key];
    //             console.log('aaa',value)
    //             console.log('bbb',key);
    //             // if (key === 'pricing') {
    //             //     value = `$${parseFloat(value).toFixed(2)}`;
    //             // }
    //             if (key === 'id') {
    //                 return html`<td> <slot name="${key}">${value}</slot</td>`;
    //             }
    //             return html`<td>${value}</td>`;
    //         })
    //     ];
    //     return content;
    // }
    // new 4
    // renderBody(row: RowData, rowIndex: number): TemplateResult[] {
    //     const content = [
    //         ...(this.selectEnabled ? [html`
    //             <td>
    //                 <input type="checkbox" .checked="${this.selectedRows.includes(rowIndex)}" @change="${() => this.toggleSelect(rowIndex)}">
    //             </td>
    //         `] : []),
    //         ...this.headers.map(header => {
    //             const key = header.value || header.text.toLowerCase();
    //             let value = row[key] || '';
    //             if (key === 'image') {
    //                 return html`
    //                     <td>
    //                         <div slot="image">
    //                             <img src="https://placehold.co/72x72" alt="Product Image">
    //                         </div>
    //                     </td>
    //                 `;
    //             }
    //             return html`<td>${value}</td>`;
    //         })
    //     ];
    //     return content;
    // }
    renderBody(row: RowData, rowIndex: number): TemplateResult[] {
        const content = [
            ...(this.selectEnabled ? [html`
                <td>
                    <input type="checkbox" .checked="${this.selectedRows.includes(rowIndex)}" @change="${() => this.toggleSelect(rowIndex)}">
                </td>
            `] : []),
            ...this.headers.map(header => {
                const key = header.value || header.text.toLowerCase();
                let value = row[key] || '';
                if (key) {
                    return html`
                        <td>
                            <slot name="${key}">${value}</slot>
                        </td>
                    `;
                } else {
                    return html`<td>${value}</td>`;
                }
            })
        ];
        return content;
        // ${this.itemValue.map((row, index) => html`<tr>${this.renderBody(row, index)}</tr>`)}
    }
    renderSlotOrContent(key: string, value: any) {
        if (this.querySelector(`[slot="${key}"]`)) {
            return html`<slot name="${key}">${value}</slot>`;
        } else {
            return html`<td>${value}</td>`;
        }
        // ${this.itemValue.map(i => html`
        //     <tr>
        //         ${Object.keys(i).map(key => html`
        //             ${this.renderSlotOrContent(key, i[key])}
        //         `)}
        //     </tr>
        // `)}
    }

    render() {
        if (this.hidden) {
            return nothing;
        }
    
        let additionalCss = html`
        <style>
            :host {
                --background-color: ${parseVariables(
                    cssVar("colors", "background", 50),
                    "white"
                )};
    
                --color-title: ${parseVariables(
                    cssVar("colors", "text", "800"),
                    "black"
                )};
        
                --color-content: ${parseVariables(
                    cssVar("colors", "text", "400"),
                    "black"
                )};
            }
        </style>
        `;
    
        return html`
            ${parseThemeToCssVariables(this.theme?.components?.container, ":host")}
            <style>
                div {
                    ${additionalCss};
                }
            </style>
            <table class="container" data-testid=${this.testId || nothing}>
                <thead>
                    <tr>
                        ${this.selectEnabled ? html`<th>
                            <input type="checkbox" .checked="${this.selectAll}" @change="${this.toggleSelectAll}" ?disabled="${!this.selectEnabled}">
                        </th>` : nothing}
                        ${this.headers.map(
                            (header) => this.renderHeader(header)
                        )}
                    </tr>
                </thead>
                <tbody>
                    ${this.itemValue.map((row, index) => html`<tr>${this.renderBody(row, index)}</tr>`)}
                </tbody>
                <tfoot class="${this.showFooter ? 'show' : 'footer'}">
                    <tr>
                        <td colspan="${this.headers.length + 1}">Row per page:</td>
                    </tr>
                </tfoot>
            </table>
        `;
    }

    static styles = css`
    table {
        border: 1px solid #ccc;
        border-collapse: collapse;
        width: 100%;
    }
    thead {
        background-color: #f9fafb
    }

    th,
    td {
        border-top: 1px solid #ccc; 
        border-left: none; 
        border-right: none; 
        border-bottom: 1px solid #ccc; 
        padding: 12px;
        text-align: left;
    }
    .footer {
        display: none;
    }
    .show {
        display: table-footer-group;
    }
    `;

}

declare global {
    interface HTMLElementTagNameMap {
        "ssk-table": Table;
    }
}