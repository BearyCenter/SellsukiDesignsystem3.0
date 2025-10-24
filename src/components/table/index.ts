import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit/context";
import "../../../src/components/pagination";
import "../../../src/elements/checkbox";
import "../../../src/elements/icon";
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

interface Column {
  title: string;
  dataIndex?: string;
  align?: "left" | "center" | "right";
  width?: string;
  sortable?: boolean;
  sortDirection?: "asc" | "desc";
  onSort?: (direction: "asc" | "desc") => void;
  sortIcons?: { asc: string; desc: string; neutral: string; color: string; };
}

interface RowData {
  [key: string]: any;
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
  columns: Column[] = [];

  @property({ type: Array })
  data: RowData[] = [];

  @property({ type: Boolean })
  showPaginationFooter: boolean = false;

  @property({ type: Array })
  selectedRows: number[] = [];

  @property({ type: Boolean })
  showCheckbox: boolean = false;

  @property({ type: Boolean })
  selectAll: boolean = false;

  @property({ type: Number })
  rowsPerPage: number = 10;

  @property({ type: Number })
  currentPage: number = 1;

  @property({ type: Boolean })
  showPageNavigation: boolean = false;

  @property({ type: Boolean })
  showRowsPerPageSelector: boolean = false;

  @property({ type: Boolean })
  showPageButtons: boolean = false;

  @property({ type: Boolean })
  showGoToPageInput: boolean = false;

  @property({ type: Number })
  totalPaginationPages: number = 0;

  @property({ type: Number })
  maxVisiblePageButtons: number = 0;

  @property({ type: Boolean })
  min = false;

  @property({ type: Object })
  customCell: {
    [dataIndex: string]: {
      render: (value: any, record: any, rowIndex: number) => string;
      onClick?: (value: any, record: any, rowIndex: number) => void;
      onChange?: (value: any, record: any, rowIndex: number) => void;
    };
  } = {};

  get restrictedTotalPages(): number {
      const calculatedPages = 
          this.totalPaginationPages > 0
              ? Math.ceil(this.totalPaginationPages / this.rowsPerPage)
              : Math.ceil(this.data.length / this.rowsPerPage);
              
      if (this.maxVisiblePageButtons > 0 && this.maxVisiblePageButtons < calculatedPages) {
          return this.maxVisiblePageButtons;
      }
      
      return calculatedPages;
  }
  toggleSelectAll() {
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      this.selectedRows = Array.from(
        { length: this.data.length },
        (_, index) => index,
      );
    } else {
      this.selectedRows = [];
    }
  }

  toggleSelect(rowIndex: number) {
    if (this.showCheckbox) {
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

    const totalPages =
      this.totalPaginationPages > 0
        ? Math.ceil(this.totalPaginationPages / this.rowsPerPage)
        : Math.ceil(this.data.length / newRowsPerPage);
    const firstVisibleItem = (this.currentPage - 1) * this.rowsPerPage + 1;
    this.currentPage = Math.ceil(firstVisibleItem / newRowsPerPage);

    if (this.currentPage > totalPages) {
      this.currentPage = totalPages;
    }

    this.rowsPerPage = newRowsPerPage;

    this.dispatchEvent(
      new CustomEvent("load-data", {
        detail: { page: this.currentPage, rowsPerPage: this.rowsPerPage },
      }),
    );
  }

  handlePageChanged(event: CustomEvent) {
    const newPage = event.detail.page;
    this.currentPage = newPage;

    this.dispatchEvent(
      new CustomEvent("load-data", {
        detail: { page: this.currentPage, rowsPerPage: this.rowsPerPage },
      }),
    );
  }

  handleSort(col: Column) {
    if (col.sortable && col.onSort) {
      const newDirection = col.sortDirection === "asc" ? "desc" : "asc";
      col.onSort(newDirection);

      this.data = [...this.data].sort((a, b) => {
        const aValue = a[col.dataIndex || ""];
        const bValue = b[col.dataIndex || ""];
        if (aValue < bValue) return newDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return newDirection === "asc" ? 1 : -1;
        return 0;
      });

      col.sortDirection = newDirection;
    }
  }

  renderHeader(col: Column): TemplateResult {
    let iconName: string;
    let iconColor: string = '';

    if (col.sortIcons) {
      if (col.sortDirection === 'asc') {
        iconName = col.sortIcons.asc;
        iconColor = col.sortIcons.color || '';
      } else if (col.sortDirection === 'desc') {
        iconName = col.sortIcons.desc;
        iconColor = col.sortIcons.color || '';
      } else {
        iconName = col.sortIcons.neutral;
      }
    } else {
      iconName = 'solid-bars-arrow-down';
    }

    return html`
      <th
        style="text-align: ${col.align || "left"}; width: ${col.width ||
        "auto"};"
      >
        <div class="header-content">
          ${col.title}
          ${col.sortable
            ? html` <span
                class="header-icon"
                @click="${() => this.handleSort(col)}"
              >
                <ssk-icon
                  name="${iconName}"
                  size="sm"
                  color="${iconColor}"
                ></ssk-icon>
              </span>`
            : nothing}
        </div>
      </th>
    `;
  }

  renderBody(row: RowData, rowIndex: number): TemplateResult[] {
    const content = [
      ...(this.showCheckbox
        ? [
            html`
              <td class="checkbox-content">
                <ssk-checkbox
                  .checked="${this.selectedRows.includes(rowIndex)}"
                  @change="${() => this.toggleSelect(rowIndex)}"
                >
                </ssk-checkbox>
              </td>
            `,
          ]
        : []),
      ...this.columns.map((col) => {
        const cellValue = row[col.dataIndex || ""];
        const customCellFunction = this.customCell[col.dataIndex || ""];
        const { render, onClick, onChange } = customCellFunction || {};

        return html`
          <td
            style="text-align: ${col.align || "left"}; width: ${col.width ||
            "auto"};"
          >
            ${render
              ? html`${this.renderHTML(
                  render(cellValue, row, rowIndex),
                  col.align,
                  onClick
                    ? () => {
                        onClick(cellValue, row, rowIndex);
                        this.dispatchEvent(
                          new CustomEvent(`cell-click`, {
                            detail: { cellValue, row, rowIndex },
                          }),
                        );
                      }
                    : undefined,
                  onChange
                    ? (event: Event) => {
                        const newValue = (event.target as HTMLInputElement)
                          .value;
                        onChange(newValue, row, rowIndex);
                        this.dispatchEvent(
                          new CustomEvent(`cell-change`, {
                            detail: { newValue, row, rowIndex },
                          }),
                        );
                      }
                    : undefined,
                )}`
              : cellValue}
          </td>
        `;
      }),
    ];
    return content;
  }

  renderHTML(
    content: string,
    align: "left" | "center" | "right" = "left",
    onClick?: () => void,
    onChange?: (event: Event) => void,
  ): TemplateResult {
    return html`<div
      style="text-align: ${align};"
      .innerHTML="${content}"
      @click="${onClick || nothing}"
      @input="${onChange || nothing}"
    ></div>`;
  }

  renderPaginationControls() {
    const totalPages = this.restrictedTotalPages; 

    let startIndex = (this.currentPage - 1) * this.rowsPerPage + 1;
    if (this.data.length === 0 || isNaN(startIndex)) {
      startIndex = 0;
    }

    let endIndex;
    const isPaginatedByTotal = this.totalPaginationPages > 0;

    if (isPaginatedByTotal) {
      endIndex = Math.min(this.currentPage * this.rowsPerPage, this.totalPaginationPages);
    } else {
      endIndex = this.currentPage * this.rowsPerPage;
      endIndex = Math.min(endIndex, this.data.length);
    }
    const displayAllItems = this.totalPaginationPages > 0 
        ? this.totalPaginationPages 
        : this.data.length;

    if (this.data.length === 0) {
      endIndex = 0;
    }
    if (this.currentPage > totalPages) {
        this.currentPage = totalPages;
    }
    return html`
      <ssk-pagination
        totalPages="${totalPages || 1}"
        currentPage="${this.currentPage}"
        startItems="${startIndex}"
        endItems="${endIndex}"
        allItems="${displayAllItems}"
        @page-changed="${this.handlePageChanged}"
        @rows-per-page-changed="${this.updatedPage}"
        ?showRowsPage="${this.showPageNavigation}"
        ?showBtnPage="${this.showPageButtons}"
        ?showrowsperpage="${this.showRowsPerPageSelector}"
        ?showGoToPage="${this.showGoToPageInput}"
        dropdownAnchor="top"
      ></ssk-pagination>
    `;
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    const hasItems = this.data.length > 0;
    const isPaginated = this.totalPaginationPages !== 0;

    const startIndex = isPaginated
      ? 0
      : (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = isPaginated
      ? this.data.length
      : Math.min(startIndex + this.rowsPerPage, this.data.length);

    let additionalCss = html`
      <style>
        :host {
          --background-color: ${parseVariables(
            cssVar("colors", this.themeColor),
            cssVar("colors", this.themeColor, 50),
            cssVar("colors", "gray", 50),
          )};

          --color: ${parseVariables(
            cssVar("colors", this.color),
            cssVar("colors", this.color, 500),
            this.color,
            cssVar("colors", "gray", 500),
          )};

          --color-title: ${parseVariables(
            cssVar("colors", this.color),
            cssVar("colors", this.color, 800),
            this.color,
            cssVar("colors", "text", 800),
          )};

          --border-color: ${parseVariables(cssVar("colors", "fiord", 100))};
          --border-color-table: ${parseVariables(
            cssVar("colors", "fiord", 100),
          )};
          --font-family: ${parseVariables(
            cssVar("font-family", this.fontFamilyGroup),
          )};
          --font-weight: ${parseVariables(
            cssVar("font-weight", this.fontWeight),
          )};

          --font-size: ${parseVariables(
            cssVar("font-size", this.fontSize),
            cssVar("font-size", this.size),
          )};
          --line-height: ${parseVariables(cssVar("font-size", this.size))};
          --border-style: solid;
          --border-width: 1px;

          --height-table: auto;
          tbody {
            display: ${hasItems ? "block" : "none"};
          }
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
        <table class="table-scroll">
          <thead>
            <tr>
              ${this.showCheckbox
                ? html`<th class="checkbox-content">
                    <ssk-checkbox
                      .checked="${this.selectAll}"
                      @change="${this.toggleSelectAll}"
                      ?disabled="${!this.showCheckbox}"
                    >
                    </ssk-checkbox>
                  </th>`
                : nothing}
              ${this.columns.map((col) => this.renderHeader(col))}
            </tr>
          </thead>
          <tbody>
            ${this.data.slice(startIndex, endIndex).map(
              (row, index) =>
                html`<tr>
                  ${this.renderBody(row, startIndex + index)}
                </tr>`,
            )}
          </tbody>
        </table>
      </div>
      ${!hasItems ? html`<slot name="empty-content"></slot>` : nothing}
      <div class="${this.showPaginationFooter ? "show" : "footer"}">
        ${this.renderPaginationControls()}
      </div>
    `;
  }

  static styles = css`
    table {
      border-style: var(--border-style);
      border-width: var(--border-width);
      border-color: var(--border-color-table);
      border-collapse: collapse;
      width: 100%;
      table-layout: fixed;
    }

    thead,
    tbody {
      display: block;
    }

    tbody {
      overflow-y: auto;
      height: var(--height-table);
    }

    tr {
      display: table;
      width: 100%;
      table-layout: fixed;
    }

    th,
    td {
      background-color: #ffffff;
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
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    th {
      color: var(--color-title);
      background-color: var(--background-color);
    }

    .footer {
      display: none;
    }

    .show {
      text-align: center;
      border-top: 1px solid var(--border-color);
      width: 100%;
      box-sizing: border-box;
    }

    .header-content {
      display: inline-flex;
      align-items: center;
      height: 100%;
    }

    .header-icon {
      margin-top: 5px;
      cursor: pointer;
      margin-left: 5px;
    }

    .checkbox-content {
      width: 70px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-table": Table;
  }
}
