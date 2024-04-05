import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit/context";
import "../../../src/components/pagination";
import "../../../src/elements/checkbox";
import { themeContext } from "../../contexts/theme";
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
import { unsafeHTML } from "lit/directives/unsafe-html.js";

interface Header {
  name: string;
  text: string;
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
  size: Size = "sm";
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

  @property({ type: Number })
  rowsPerPage: number = 10;

  @property({ type: Number })
  currentPage: number = 1;

  @property({ type: Boolean })
  showRowPerPage: boolean = false;

  @property({ type: Boolean })
  showBtnPage: boolean = false;
  
  @property({ type: Boolean })
  showGoToPage: boolean = false;

  @property({ type: Boolean })
  min = false;

  @property({ type: Boolean })
  fullWidth = false;

  toggleSelectAll() {
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      this.selectedRows = Array.from(
        { length: this.itemValue.length },
        (_, index) => index
      );
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
        this.selectedRows = this.selectedRows.filter((i) => i !== rowIndex);
      }
    }
  }
  updatedPage(event: CustomEvent) {
    const newRowsPerPage = event.detail.rowsPerPage;
    this.rowsPerPage = newRowsPerPage;
  }

  handlePageChanged(event: CustomEvent) {
    const newPage = event.detail.page;
    this.currentPage = newPage;
  }

  renderHeader(header: Header): TemplateResult {
    const selectedTemplate = this.querySelector(
      `template#header-${header.name}`
    );
    const tempHTML = selectedTemplate?.innerHTML.replace(
      "{{text}}",
      header.text
    );

    if (selectedTemplate) {
      return html`<th>${unsafeHTML(tempHTML)}</th>`;
    } else {
      return html`<th>${header.text}</th>`;
    }
  }

  renderBody(row: RowData, rowIndex: number): TemplateResult[] {
    const content = [
      ...(this.selectEnabled
        ? [
            html`
              <td>
                <ssk-checkbox
                  .checked="${this.selectedRows.includes(rowIndex)}"
                  @change="${() => this.toggleSelect(rowIndex)}">
                </ssk-checkbox>
              </td>
            `,
          ]
        : []),
      ...this.headers.map((header) => {
        let value = row[header.name] || "";

        const selectedTemplate = this.querySelector(
          `template#content-${header.name}`
        );
        const tempHTML = selectedTemplate?.innerHTML.replace(
          "{{value}}",
          value
        );

        if (selectedTemplate) {
          return html`<td>${unsafeHTML(tempHTML)}</td>`;
        } else {
          return html`<td>${value}</td>`;
        }
      }),
    ];
    return content;
  }
  renderPaginationControls() {
    const totalPages = Math.ceil(this.itemValue.length / this.rowsPerPage);

    const startIndex = (this.currentPage - 1) * this.rowsPerPage + 1;

    let endIndex = this.currentPage * this.rowsPerPage;
    endIndex = Math.min(endIndex, this.itemValue.length);

    if (this.itemValue.length === 0) {
      endIndex = 0;
    }
    return html`
      <ssk-pagination
        totalPages="${totalPages}"
        currentPage="${this.currentPage}"
        startItems="${startIndex}"
        endItems="${endIndex}"
        allItems="${this.itemValue.length}"
        @page-changed="${this.handlePageChanged}"
        @rows-per-page-changed="${this.updatedPage}"
        ?showBtnPage="${this.showBtnPage}"
        ?showrowsperpage="${this.showRowPerPage}"
        ?showGoToPage="${this.showGoToPage}"
      ></ssk-pagination>
    `;
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = Math.min(
      startIndex + this.rowsPerPage,
      this.itemValue.length
    );
    let additionalCss = html`
      <style>
        :host {
          --background-color: ${parseVariables(cssVar("colors", "gray", 50))};

          --color: ${parseVariables(cssVar("colors", "gray", 500))};

          --color-title: ${parseVariables(
            cssVar("colors", "text", "800"),
            "black"
          )};

          --border-color: ${parseVariables(cssVar("colors", "fiord", 100))};

          --font-family: ${parseVariables(
            cssVar("font-family", this.fontFamilyGroup),
          )};
          --font-weight: ${parseVariables(
            cssVar("font-weight", this.fontWeight),
          )};

          --font-size: ${parseVariables(cssVar("font-size", this.size))};
          --line-height: ${parseVariables(cssVar("font-size", this.size))};
        }
      </style>
    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.table, ":host")}
      <style>
        div {
            ${additionalCss};
        }
      </style>
      <div class="container" data-testid=${this.testId || nothing}>
        <table>
          <thead>
            <tr>
              ${this.selectEnabled
                ? html`<th>
                    <ssk-checkbox
                     .checked="${this.selectAll}"
                      @change="${this.toggleSelectAll}"
                      ?disabled="${!this.selectEnabled}">
                    </ssk-checkbox>
                  </th>`
                : nothing}
              ${this.headers.map((header) => this.renderHeader(header))}
            </tr>
          </thead>
          <tbody>
            ${this.itemValue.slice(startIndex, endIndex).map(
              (row, index) =>
                html`<tr>
                  ${this.renderBody(row, startIndex + index)}
                </tr>`
            )}
          </tbody>
        </table>
        <div class="${this.showFooter ? "show" : "footer"}">
          ${this.renderPaginationControls()}
        </div>
      </div>
    `;
  }

  static styles = css`
    table {
      border: 1px solid var(--border-color);
      border-collapse: collapse;
      width: 100%;
    }
    th {
      background-color: var(--background-color);
      border-top: 1px solid var(--border-color);
      border-left: none;
      border-right: none;
      border-bottom: 1px solid var(--border-color);
      padding: 12px;
      text-align: left;
      color: var(--color);
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
    }
    td {
      background-color: #ffffff;
      border-top: 1px solid var(--border-color);
      border-left: none;
      border-right: none;
      border-bottom: 1px solid var(--border-color);
      padding: 12px;
      text-align: left;
      color: var(--color);
      font-size: 24px;
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
    }
    .footer {
      display: none;
    }
    .show {
      text-align: center;
      border-top: 1px solid var(--border-color);
      width: calc(100% - 10px);
      box-sizing: border-box;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-table": Table;
  }
}
