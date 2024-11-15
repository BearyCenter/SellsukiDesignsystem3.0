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

  @property({ type: String })
  align: "left" | "center" | "right" = "center";

  @property({ type: Boolean })
  sortable = false;

  @property({ type: String })
  sortDirection?: "asc" | "desc";

  private handleSortIconClick() {
    this.dispatchEvent(
      new CustomEvent("sort-changed", {
        detail: {
          sortDirection: this.sortDirection === "asc" ? "desc" : "asc",
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
      <div
        class="table-header-cell"
        style="justify-content: ${this.align === "left"
          ? "flex-start"
          : this.align === "center"
          ? "center"
          : "flex-end"}"
      >
        <slot></slot>
        ${iconName
          ? html`<ssk-icon
              name="${iconName}"
              style="cursor: ${cursor}"
              @click=${this.handleSortIconClick}
            ></ssk-icon>`
          : nothing}
      </div>
    `;
  }

  static styles = css`
    :host {
      background-color: inherit;

      position: sticky;
      top: 0;
    }

    .table-header-cell {
      display: flex;
      padding: var(--table-padding);
      gap: var(--table-gap);
      border-bottom: 1px solid var(--table-border-color);
      height: 100%;
      box-sizing: border-box;
      align-items: center;

      background-color: var(--table-background-color-header);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-header-cell": HeaderCell;
  }
}
