import { consume } from "@lit/context";
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { dynamicTableContext, TableState } from "./table";

@customElement("ssk-table-cell")
export class TableCell extends LitElement {
  static registeredName = "ssk-table-cell";

  @consume({ context: dynamicTableContext, subscribe: true })
  @property({ attribute: false })
  public tableState?: TableState;

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
