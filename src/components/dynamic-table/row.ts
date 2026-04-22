import { consume } from "@lit/context";
import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { dynamicTableContext, TableState } from "./table";
import {
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
  Size,
  Theme,
} from "../../types/theme";

export class TableRow extends LitElement {
  static registeredName = "ssk-table-row";

  @consume({ context: dynamicTableContext, subscribe: true })
  @property({ attribute: false })
  public tableState?: TableState;
  public theme?: Theme;

  @property({ type: String })
  padding?: Size;
  @property({ type: String })
  borderBottom?: string;
  @property({ type: Boolean, reflect: true })
  expanded = undefined;
  render() {
    let additionalCss = html`
      <style>
        :host {
            --padding: ${parseVariables(
          cssVar("padding", this.padding),
          this.padding,"var(--table-padding)"
        )};
            --border-bottom: ${parseVariables(
          cssVar("border-bottom",this.borderBottom),
          this.borderBottom,"1px solid var(--table-border-color)"
        )};
      </style>
    `;

    return html`${parseThemeToCssVariables(
        this.theme?.components?.row,
        ":host"
      )}
      <style>
        div {
            ${additionalCss};
        }
      </style>
      <div class="table-table-row">
        <slot></slot>
      </div> `;
  }

  static styles = css`
    :host {
      display: contents;
    }

    :host([expanded="false"]) {
      display: none;
    }

    .table-table-row {
      grid-column: 1 / -1;

      padding: var(--padding);
      gap: var(--table-gap);
      border-bottom: var(--border-bottom);
      height: 100%;

      box-sizing: border-box;
      align-items: center;

      background-color: var(--table-background-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-table-row": TableRow;
  }
}

if (!customElements.get("ds-table-row")) {
  customElements.define("ds-table-row", TableRow);
}
if (!customElements.get("ssk-table-row")) {
  customElements.define("ssk-table-row", TableRow);
}
