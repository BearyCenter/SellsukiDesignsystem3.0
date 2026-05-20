import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { consume } from "@lit/context";
import "../../../src/elements/badge";
import "../../../src/components/dropdown";
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

/**
 * Pagination control — page-number buttons, prev/next/first/last arrows,
 * optional rows-per-page selector and "go to page" input.
 *
 * @fires page-changed - Fires when the current page changes via any
 *   pagination control (page number click, prev/next/first/last, or
 *   go-to input). `detail: { page: number }`.
 * @fires rows-per-page-changed - Fires when the user picks a new value
 *   from the rows-per-page dropdown. `detail: { rowsPerPage: number }`.
 */
export class Pagination extends LitElement {
  static registeredName = "ssk-pagination";

  /**
   * Theme object consumed from the ancestor `<ssk-theme-provider>` via Lit
   * context. Set automatically — components rarely assign this directly.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  /**
   * Sets `data-testid` on the pagination container for stable selectors
   * in E2E and visual tests.
   */
  @property({ type: String })
  testId?: string;

  // ThemeValue
  /**
   * Brand-context accent applied to the active page button background.
   * Accepts a semantic role (`"primary"`) or a palette name. Defaults to `"primary"`.
   */
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  /**
   * Foreground (text) color for the active page button. Defaults to `"white"`.
   */
  @property({ type: String })
  color?: string = "white";
  /**
   * Override for the container background. Use sparingly — defaults to
   * `--bg-primary`.
   */
  @property({ type: String })
  backgroundColor?: string | undefined;

  /**
   * Density / typography size step — `"xs" | "sm" | "md" | "lg" | "xl"`.
   * Drives button font-size and padding. Defaults to `"sm"` (compact).
   */
  @property({ type: String })
  size: Size = "sm";
  /**
   * Padding step override. Falls back to the `size` value when unset.
   */
  @property({ type: String })
  padding?: Size;
  /**
   * Explicit font-size token for button / label text. Must resolve to
   * >= 18px per DS 3.0 minimum.
   */
  @property({ type: String })
  fontSize?: string | undefined;
  /**
   * Column gap between pagination controls (page list, prev/next, etc.).
   */
  @property({ type: String })
  gap?: string | undefined;
  /**
   * Corner radius token applied to page buttons and the container.
   */
  @property({ type: String })
  rounded?: string | undefined;
  /**
   * Outer margin applied to the pagination container.
   */
  @property({ type: String })
  margin?: string | undefined;

  // font
  /**
   * Font-family group token — `"sans"` (default UI), `"serif"`, `"mono"`.
   */
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  /**
   * Font-weight token for button labels — `"normal"`, `"medium"`,
   * `"semibold"`, `"bold"`.
   */
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  /**
   * Override for page-button border width (e.g. `"1px"`).
   */
  @property({ type: String })
  borderWidth?: string | undefined;
  /**
   * Fixed height for the container (e.g. `"40px"`).
   */
  @property({ type: String })
  height?: string | undefined;

  /**
   * Current page (1-indexed). Controlled — listen to `page-changed` and
   * update from the parent. Defaults to `1`.
   */
  @property({ type: Number })
  currentPage = 1;
  /**
   * Total number of pages. Used to bound the prev/next/last navigation
   * and to render the trailing ellipsis + last-page button.
   */
  @property({ type: Number })
  totalPages = 1;
  /**
   * Rows per page — bound to the rows-per-page dropdown when
   * `showRowsPerPage` is true. Listen to `rows-per-page-changed`.
   */
  @property({ type: Number })
  rowsPerPage = 10;

  /**
   * Index of the first item visible on the current page — used by the
   * "Showing X to Y of Z" label. Caller supplies this (table integration).
   */
  @property({ type: Number })
  startItems = 1;
  /**
   * Index of the last item visible on the current page — used by the
   * "Showing X to Y of Z" label.
   */
  @property({ type: Number })
  endItems = 10;
  /**
   * Total item count across all pages — used by the "Showing X to Y of Z"
   * label. Defaults to `100`.
   */
  @property({ type: Number })
  allItems = 100;

  /**
   * Options shown in the rows-per-page dropdown. Defaults to
   * `[10, 20, 50, 100]`.
   */
  @property({ type: Array })
  selectedItems: number[] = [10, 20, 50, 100];

  /**
   * Shows the "Showing X to Y of Z items" label on the left side of the
   * pagination row.
   */
  @property({ type: Boolean, attribute: "showrowspage" })
  showRowsPage: boolean = false;
  /**
   * Shows the rows-per-page dropdown selector.
   */
  @property({ type: Boolean, attribute: "showrowsperpage" })
  showRowsPerPage: boolean = false;
  /**
   * Shows the "Go to" numeric page-jump input on the right side.
   */
  @property({ type: Boolean, attribute: "showgotopage" })
  showGoToPage: boolean = false;
  /**
   * Shows the first-page / last-page double-chevron buttons in addition
   * to the prev/next single-chevrons.
   */
  @property({ type: Boolean, attribute: "showbtnpage" })
  showBtnPage: boolean = false;

  /**
   * Compact mode — reduces button height and padding for dense toolbars.
   */
  @property({ type: Boolean })
  min = false;

  /**
   * When true, the pagination container stretches to fill the parent's
   * width; otherwise it sizes to content.
   */
  @property({ type: Boolean })
  fullWidth = false;

  /**
   * Anchor direction for the rows-per-page dropdown popup. `"top"` opens
   * upward (typical when pagination sits at the page bottom) — `"bottom"`
   * is the default.
   */
  @property({ type: String })
  dropdownAnchor: "top" | "bottom" = "bottom";

  renderPageNumbers() {
    const pages: Array<number | string> = [];
    let numVisiblePages = 5;

    if (this.currentPage <= 4 || this.currentPage > this.totalPages - 3) {
      numVisiblePages = 6;
    }

    let currentVisiblePages = numVisiblePages;
    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(currentVisiblePages / 2),
    );

    let endPage = Math.min(startPage + currentVisiblePages - 1, this.totalPages);

    if (startPage === 1) {
      endPage = Math.min(currentVisiblePages, this.totalPages);
    } else if (endPage === this.totalPages) {
      startPage = Math.max(1, this.totalPages - currentVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < this.totalPages) {
      if (endPage < this.totalPages - 1) {
        pages.push("...");
      }
      pages.push(this.totalPages);
    }

    return pages.map((page) => {
      if (typeof page === "number") {
        return html`
          <li>
            <a
              href="javascript:void(0);"
              class="${this.currentPage === page ? "active" : ""}"
              @click="${() => this.changePage(page)}"
            >
              ${page}
            </a>
          </li>
        `;
      } else {
        return html`
          <li>
            <a href="javascript:void(0);"> ... </a>
          </li>
        `;
      }
    });
  }

  changePage(page: number) {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.dispatchEvent(
        new CustomEvent("page-changed", {
          detail: { page },
        }),
      );
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }

  goToPage() {
    const inputElement =
      this.shadowRoot?.querySelector<HTMLInputElement>("#myInput");
    if (inputElement) {
      const pageNumber = parseInt(inputElement.value);
      if (
        !isNaN(pageNumber) &&
        pageNumber >= 1 &&
        pageNumber <= this.totalPages
      ) {
        this.changePage(pageNumber);
      }
    }
  }

  handleInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^0-9]/g, "");
  }

  goToLastPage() {
    this.changePage(this.totalPages);
  }

  goToPreviousPage() {
    if (this.currentPage <= this.totalPages) {
      this.changePage(this.currentPage - 1);
    }
  }

  goToFirstPage() {
    this.changePage(1);
  }

  handleRowsPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = parseInt(target.value);
    if (!isNaN(value)) {
      this.rowsPerPage = value;
      this.dispatchEvent(
        new CustomEvent("rows-per-page-changed", {
          detail: { rowsPerPage: this.rowsPerPage },
        }),
      );
    } else {
      this.rowsPerPage = this.allItems;
      this.dispatchEvent(
        new CustomEvent("rows-per-page-changed", {
          detail: { rowsPerPage: this.rowsPerPage },
        }),
      );
    }
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = html`
      <style>
        :host {
            --padding: ${parseVariables(
          cssVar("padding", this.padding),
          this.padding,
          cssVar("padding", this.size),
        )};

            --font-family: ${parseVariables(
          cssVar("font-family", this.fontFamilyGroup),
        )};
            --font-weight: ${parseVariables(
          cssVar("font-weight", this.fontWeight),
        )};
        --font-size: ${parseVariables(cssVar("font-size", this.size))};

            --color: ${parseVariables(
          cssVar("colors", this.color),
          this.color,
        )};
        --color-btn: ${parseVariables(cssVar("colors", "gray", 500))};
        --color-border: ${parseVariables(cssVar("colors", "gray", 200))};
        --background-color: ${parseVariables(
          cssVar("colors", this.themeColor, 500),
        )};
            )};
      </style>
    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.pagination, ":host")}
      <style>
        div {
            ${additionalCss};
        }
      </style>
      <div class="container" data-testid=${this.testId || nothing}>
        <div class="row-pre-page">
          <div class="${this.showRowsPage ? "showing-item" : "noRowsPerPage"}">
            <p>
              Showing ${this.startItems} to ${this.endItems} of ${this.allItems}
              Items
            </p>
          </div>
          <div
            class="${this.showRowsPerPage
              ? "showRowsPerPages"
              : "noRowsPerPage"}"
          >
            <p>Row Per Page :</p>
          </div>
          <div
            class="${this.showRowsPerPage ? "select-group" : "noRowsPerPage"}"
          >
            <ssk-dropdown
              @change="${(e: Event) => this.handleRowsPerPageChange(e)}"
              .optionsAnchor="${this.dropdownAnchor}"
            >
              <ssk-dropdown-button slot="selected">
                <ssk-dropdown-preview :value="${this.rowsPerPage}">
                  ${this.rowsPerPage}
                </ssk-dropdown-preview>
              </ssk-dropdown-button>
              ${this.selectedItems?.map(
                (value) => html`
                  <ssk-dropdown-option .value="${value}">
                    ${value}
                  </ssk-dropdown-option>
                `,
              )}
            </ssk-dropdown>
          </div>
        </div>

        <div class="page-and-number">
          <button
            class="${this.showBtnPage ? "button-page" : "noRowsPerPage"}"
            @click="${this.goToFirstPage}"
            ?disabled="${this.currentPage === 1}"
          >
            <ssk-icon
              class="icon-double"
              name="outline-chevron-double-left"
              size="sm"
            ></ssk-icon>
          </button>
          <button class="button" @click="${this.goToPreviousPage}">
            <ssk-icon name="outline-chevron-left" size="sm"></ssk-icon>
          </button>
          <ul class="pagination">
            ${this.renderPageNumbers()}
          </ul>
          <button class="button" @click="${this.goToNextPage}">
            <ssk-icon name="outline-chevron-right" size="sm"></ssk-icon>
          </button>
          <button
            class="${this.showBtnPage ? "button-page" : "noRowsPerPage"}"
            @click="${this.goToLastPage}"
            ?disabled="${this.currentPage === this.totalPages}"
          >
            <ssk-icon
              class="icon-double"
              name="outline-chevron-double-right"
              size="sm"
            ></ssk-icon>
          </button>
        </div>
        <div class="${this.showGoToPage ? "input-container" : "noRowsPerPage"}">
          <labe>Go to: </labe>
          <input
            type="text"
            id="myInput"
            @input="${this.handleInput}"
            autocomplete="off"
          />
          <ssk-icon
            class="go-icon"
            name="outline-arrow-right"
            size="sm"
            @click="${this.goToPage}"
          ></ssk-icon>
        </div>
      </div>
    `;
  }

  static styles = css`
    .container,
    .button,
    .button-page .links,
    .link {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      padding: 0 16px;
      border-radius: var(--radius-none, 0px);
      column-gap: 5px;
      background-color: var(--bg-primary, #ffffff);
      width: 100%;
      box-sizing: border-box;
    }
    .button,
    .button-page {
      border: none;
    }
    .button:disabled,
    .button-page:disabled {
      color: var(--text-disabled, #9ca3af);
      pointer-events: none;
    }
    .button,
    .button-page,
    .link {
      height: 40px;
      width: 40px;
      font-size: var(--font-size-p,20px);
      color: var(--color-btn);
      background-color: var(--bg-primary, #ffffff);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm, 6px);
      cursor: pointer;
      margin-left: 3px;
      margin-right: 3px;
    }
    .links {
      column-gap: 12px;
    }
    .link {
      font-weight: var(--font-weight-medium, 500);
      text-decoration: none;
    }
    .button:hover,
    .button-page:hover,
    .link:hover {
      background-color: var(--background-color);
      color: var(--color);
    }
    .link.active {
      background-color: var(--background-color);
      color: var(--color);
    }
    .form-control {
      margin-left: 6px;
      height: 40px;
      width: 90px;
      border-radius: var(--radius-sm, 6px);
      font-size: var(--font-size-caption,18px);
      padding-left: 5px;
      padding-right: 5px;
    }

    .pagination {
      display: flex;
      justify-content: center;
      list-style: none;
      padding: 0;
    }

    .pagination li {
      margin: 0 2px;
    }

    .pagination li a {
      text-decoration: none;
      color: var(--color-btn);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm, 6px);
      height: 40px;
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--font-size);
    }

    .pagination li a.active {
      border-color: var(--background-color);
      background-color: var(--background-color);
      color: var(--color);
    }

    .row-pre-page {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .page-and-number {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-grow: 1;
    }

    .showing-item {
      margin-right: 20px;
      font-size: var(--font-size);
    }
    .input-container {
      display: flex;
      align-items: center;
      font-size: var(--font-size);
    }
    #myInput {
      font-size: var(--font-size);
      padding: 5px;
      border: 1px solid var(--color-border);
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      box-sizing: border-box;
      margin-left: 3px;
      height: 40px;
      width: 40px;
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      text-align: center;
    }
    .go-icon {
      padding: 5px;
      border: 1px solid var(--color-border);
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      box-sizing: border-box;
      background-color: var(--bg-primary, #ffffff);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 40px;
    }
    .showRowsPerPages {
      display: flex;
      font-size: var(--font-size);
    }
    .noRowsPerPage {
      display: none;
    }
    .select-group {
      box-sizing: border-box;
      margin-left: 5px;
    }
    .icon-double {
      margin-top: 4px;
    }

    ssk-dropdown {
      --border-color: var(--color-border);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-pagination": Pagination;
  }
}

if (!customElements.get("ssk-pagination")) {
  customElements.define("ssk-pagination", Pagination);
}
