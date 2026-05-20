import { consume } from "@lit/context";
import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { dynamicTableContext, TableState } from "./table";

/**
 * Sellsuki Table Cell — DS 3.0
 *
 * Single cell inside `<ssk-table>` / `<ssk-table-row>`. Honors the parent
 * table's padding (`--space-table-cell-x`, `--space-table-cell-y`) and
 * border tokens; the `align` prop controls horizontal alignment
 * (`left` / `center` / `right`). Use `<ssk-text>` or
 * `<ssk-date-display>` etc. inside to keep typography on-system.
 *
 * Must be used inside an `<ssk-table-row>` / `<ssk-table>`. Default
 * alignment is `center`; reach for `left` for text columns and `right`
 * for numeric/currency columns.
 *
 * @example
 *   <ssk-table-cell align="right">
 *     <ssk-text>฿1,250</ssk-text>
 *   </ssk-table-cell>
 *
 * @slot - Cell content (text, badge, icon, button)
 */
export class TableCell extends LitElement {
  static registeredName = "ssk-table-cell";

  /**
   * Selection state shared by the parent `<ssk-dynamic-table>` via Lit
   * context. Read-only from the cell's perspective.
   */
  @consume({ context: dynamicTableContext, subscribe: true })
  @property({ attribute: false })
  public tableState?: TableState;

  /**
   * Horizontal alignment of the cell's content — `"left"` for text columns,
   * `"right"` for numeric / currency columns, `"center"` (default) for
   * status badges and icons.
   */
  @property({ type: String })
  align: "left" | "center" | "right" = "center";

  render() {
    return html`
      <style>
        .table-table-cell {
          justify-content: ${this.align === "left"
            ? "flex-start"
            : this.align === "center"
            ? "center"
            : "flex-end"};
        }
      </style>
      <div class="table-table-cell">
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    .table-table-cell {
      display: flex;
      padding: var(--table-padding);
      gap: var(--table-gap);
      border-bottom: 1px solid var(--table-border-color);
      height: 100%;
      box-sizing: border-box;
      align-items: center;

      background-color: var(--table-background-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-table-cell": TableCell;
  }
}

if (!customElements.get("ssk-table-cell")) {
  customElements.define("ssk-table-cell", TableCell);
}
