import { consume, createContext, provide } from "@lit/context";
import { css, html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import {
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
  Theme,
} from "../../types/theme";

export type TableState = {
  sortingColumnId?: string;
  stripedBackgroundColor?: string;
  selectable?: boolean;
  selectedRows: string[];
  toggleRow: (rowKey: string) => void;
};

export const dynamicTableContext = createContext<TableState>(
  "ssk-custom-table-context"
);

/**
 * Grid-based dynamic table. Composes user-provided header cells and row
 * cells via slots; provides selection, striped rows, and scroll detection.
 *
 * @fires scrollend - Fires when the table body has scrolled to the
 *   bottom (or is not scrollable). Useful for infinite-scroll / load-more
 *   triggers. `detail: undefined`.
 */
export class DynamicTable extends LitElement {
  static registeredName = "ssk-dynamic-table";

  /**
   * Theme object consumed from the ancestor `<ssk-theme-provider>` via Lit
   * context. Set automatically — components rarely assign this directly.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  /**
   * Sets `data-testid` on the table container for stable selectors in E2E
   * and visual tests.
   */
  @property({ type: String })
  testId?: string;

  /**
   * When true, the table renders nothing. Prefer the standard
   * `hidden` HTML attribute over toggling at the parent.
   */
  @property({ type: Boolean })
  hidden = false;

  /**
   * Fixed table height (e.g. `"480px"`). When set, the body scrolls
   * internally and `scrollend` becomes the trigger for load-more flows.
   */
  @property({ type: String })
  height?: string;

  /**
   * Per-column track widths for the underlying CSS grid (e.g.
   * `["48px", "1fr", "200px"]`). Length should match the number of slotted
   * `[slot="headers"]` elements; falls back to `1fr` for each column.
   */
  @property({ type: Array })
  columnsWidth?: string[];

  /**
   * Override the table body background color — accepts a palette name
   * (e.g. `"gray"`) or any CSS color. Header background is controlled
   * separately by `stripedBackgroundColor`.
   */
  @property({ type: String })
  backgroundColor?: string;

  /**
   * Background applied to the header row AND to every other body row
   * (zebra striping). Accepts a palette name or any CSS color.
   */
  @property({ type: String })
  stripedBackgroundColor?: string;

  /**
   * Enables row selection — renders a leading checkbox column and the
   * bulk-action toolbar (slot `bulk-actions`) once at least one row is
   * checked. Listen to `selection-change` for the updated id list.
   */
  @property({ type: Boolean })
  selectable = false;

  /**
   * Controlled list of currently selected row keys. Updates propagate to
   * the table context so each `<ssk-table-row>` knows its own state.
   * Empty array clears all selections.
   */
  @property({ type: Array })
  selectedRows: string[] = [];

  @state() private _selectedRows: string[] = [];

  /**
   * Lit context value provided to descendant `<ssk-table-row>` /
   * `<ssk-table-cell>` / `<ssk-header-cell>` elements. Carries selection
   * state and the `toggleRow` callback — usually managed by the table itself.
   */
  @provide({ context: dynamicTableContext })
  @property({ attribute: false })
  state: TableState = {
    sortingColumnId: undefined,
    stripedBackgroundColor: this.stripedBackgroundColor,
    selectable: false,
    selectedRows: [],
    toggleRow: (rowKey: string) => {
      const next = this._selectedRows.includes(rowKey)
        ? this._selectedRows.filter(k => k !== rowKey)
        : [...this._selectedRows, rowKey];
      this._selectedRows = next;
      this.state = { ...this.state, selectedRows: next };
      this.dispatchEvent(new CustomEvent("selection-change", {
        detail: { selectedRows: next },
        bubbles: true,
        composed: true,
      }));
    },
  };

  willUpdate(changed: Map<string | number | symbol, unknown>) {
    if (changed.has("selectable") || changed.has("selectedRows")) {
      this._selectedRows = this.selectedRows;
      this.state = {
        ...this.state,
        selectable: this.selectable,
        selectedRows: this._selectedRows,
      };
    }
  }

  private _handleBulkActionClick = (e: Event) => {
    const target = e.target as HTMLElement;
    const actionEl = target.closest("[data-action]");
    if (!actionEl) return;
    this.dispatchEvent(new CustomEvent("bulk-action", {
      detail: {
        action: actionEl.getAttribute("data-action"),
        selectedRows: this._selectedRows,
      },
      bubbles: true,
      composed: true,
    }));
  };

  updated() {
    requestAnimationFrame(() => this.checkScrollEnd());
  }

  private checkScrollEnd() {
    const table = this.renderRoot?.querySelector(".table") as HTMLElement;
    if (!table) return;

    const isScrollable = table.scrollHeight > table.clientHeight;
    const isScrolledToEnd =
      table.scrollTop + table.clientHeight >= table.scrollHeight - 1;

    if (!isScrollable || isScrolledToEnd) {
      this.dispatchEvent(new CustomEvent("scrollend", { bubbles: true }));
    }
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    // get from columnsWidth or search from slot named = "headers"
    const baseColumnsCount =
      this.columnsWidth?.length ||
      this.querySelectorAll("[slot='headers']")?.length ||
      0;
    const columnsCount = baseColumnsCount;

    const baseWidths = this.columnsWidth ?? Array(columnsCount).fill("1fr");
    const allWidths = this.selectable ? ["40px", ...baseWidths] : baseWidths;
    const tableTemplateColumns = allWidths.join(" ");

    let stripedSelector = [];
    for (let i = 1; i <= columnsCount; i++) {
      stripedSelector.push(
        `::slotted(:nth-child(${columnsCount * 2}n + ${i}))`
      );
    }

    let additionalStyle = html`
      <style>
        :host {
          --table-template-column: ${tableTemplateColumns};
          --table-padding: 16px 24px;
          --table-gap: 8px;

          --table-background-color: ${parseVariables(
            cssVar("colors", this.backgroundColor),
            cssVar("colors", this.backgroundColor, 50),
            this.backgroundColor,
            cssVar("colors", "white", 50)
          )};

          --table-background-color-header: ${parseVariables(
            cssVar("colors", this.stripedBackgroundColor),
            cssVar("colors", this.stripedBackgroundColor, 50),
            this.stripedBackgroundColor,
            cssVar("colors", "gray", 50)
          )};

          --table-background-color-striped: ${parseVariables(
            cssVar("colors", this.stripedBackgroundColor),
            cssVar("colors", this.stripedBackgroundColor, 50),
            this.stripedBackgroundColor
          )};

          --table-border-color: ${parseVariables(
            cssVar("colors", "fiord", 100)
          )};

          --table-height: ${this.height || "auto"};
          --table-overflow-x: unset;
          --table-overflow-y: auto;
        }

        ${stripedSelector.join(", ")} {
          --table-background-color: var(--table-background-color-striped);
        }
      </style>
    `;

    return html`${parseThemeToCssVariables(
        this.theme?.components?.table,
        ":host"
      )}
      ${additionalStyle}

      <div class="table-container" data-testid=${this.testId || nothing}>
        ${this.selectable && this._selectedRows.length > 0 ? html`
          <div class="bulk-action-bar">
            <span class="bulk-count">${this._selectedRows.length} selected</span>
            <slot name="bulk-actions" @click=${this._handleBulkActionClick}></slot>
          </div>
        ` : nothing}
        <div class="table" @scrollend=${this.checkScrollEnd}>
          <slot name="headers"></slot>
          <slot></slot>
        </div>
        <div class="footer-spaner">
          <div class="placeholder">
            <slot name="placeholder"></slot>
          </div>
          <slot name="footer"></slot>
        </div>
      </div>`;
  }

  static styles = css`
    :host {
      display: block;
      height: var(--table-height);
      overflow: unset;
    }

    .table-container {
      display: grid;
      grid-template-rows: auto 1fr;
      background-color: var(--table-background-color);
      height: var(--table-height);
    }

    .table {
      display: grid;
      grid-template-columns: var(--table-template-column);
      overflow-x: var(--table-overflow-x);
      overflow-y: var(--table-overflow-y);
    }

    .footer-spaner {
      display: grid;
      grid-template-rows: 1fr auto;
    }

    .bulk-action-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: var(--bg-brand-secondary, #e0f2fe);
      border-bottom: 1px solid var(--stroke-primary, #e5e7eb);
    }

    .bulk-count {
      font-size: var(--font-size-label, 20px);
      font-family: var(--font-label, sans-serif);
      color: var(--fg-brand-primary, #0ea5e9);
      font-weight: var(--font-weight-medium, 500);
      margin-right: auto;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-dynamic-table": DynamicTable;
  }
}

if (!customElements.get("ssk-dynamic-table")) {
  customElements.define("ssk-dynamic-table", DynamicTable);
}
