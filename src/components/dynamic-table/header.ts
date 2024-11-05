import { consume } from "@lit/context";
import { css, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { dynamicTableContext, TableState } from "./table";

@customElement("ssk-header-cell")
export class HeaderCell extends LitElement {
  static registeredName = "ssk-header-cell";

  @consume({ context: dynamicTableContext, subscribe: true })
  @property({ attribute: false })
  public tableState?: TableState;

  @property({ type: Boolean })
  sortable = false;

  @property({ type: String })
  sortDirection?: "asc" | "desc";

  @property({ type: String })
  spacing = "md";

  private handleSortIconClick() {
    this.dispatchEvent(
      new CustomEvent("sort-changed", {
        detail: {
          order: this.sortDirection === "asc" ? "desc" : "asc",
        },
      })
    );
  }

  render() {
    let iconName = "";
    let cursor = "pointer";

    if (this.sortDirection === "asc") {
      iconName = "solid-bars-arrow-up";
    } else if (this.sortDirection === "desc") {
      iconName = "solid-bars-arrow-down";
    } else if (this.sortable) {
      iconName = "solid-bars-3-bottom-left";
    } else {
      cursor = "default";
    }

    return html`
      <div class="table-header-cell">
        <slot></slot>
        ${iconName
          ? html`<ssk-icon
              name="${iconName}"
              style="cursor: ${cursor}"
              on:click=${this.handleSortIconClick}
            ></ssk-icon>`
          : nothing}
      </div>
    `;
  }

  static styles = css`
    .table-header-cell {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: var(--table-spacing);
      padding: var(--table-spacing);
      border-bottom: 1px solid var(--table-border-color);
      height: 100%;
      box-sizing: border-box;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-header-cell": HeaderCell;
  }
}
