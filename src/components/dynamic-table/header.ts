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
    return html`
      <style>
        .table-header-cell {
          justify-content: ${this.align === "left"
          ? "flex-start"
          : this.align === "center"
          ? "center"
          : "flex-end"};

        /* --down-arrow-color, --up-arrow-color */
          ${this.sortDirection === "asc"
          ? css`
              --down-arrow-color: var(--ssk-colors-info-500);
            `
          : this.sortDirection === "desc"
          ? css`
              --up-arrow-color: var(--ssk-colors-info-500);
            `
          : nothing}

        }
      </style>

      <div class="table-header-cell">
        <slot></slot>
        ${this.sortDirection ?? this.sortable
          ? html`<ssk-icon
              name="solid-chevron-sort"
              color="gray.400"
              style="cursor: pointer"
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
