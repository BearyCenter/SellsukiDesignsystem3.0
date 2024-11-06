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
    :host {
      background-color: inherit;
    }

    .table-table-cell {
      display: flex;
      padding: var(--table-spacing);
      border-bottom: 1px solid var(--table-border-color);
      height: 100%;
      box-sizing: border-box;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-table-cell": TableCell;
  }
}
