import { consume, createContext, provide } from "@lit/context";
import { css, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
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
};

export const dynamicTableContext = createContext<TableState>(
  "ssk-custom-table-context"
);

@customElement("ssk-dynamic-table")
export class DynamicTable extends LitElement {
  static registeredName = "ssk-dynamic-table";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  @property({ type: Boolean })
  hidden = false;

  @property({ type: String })
  height?: string;

  @property({ type: Array })
  columnsWidth?: string[];

  @property({ type: String })
  backgroundColor?: string;

  @property({ type: String })
  stripedBackgroundColor?: string;

  @provide({ context: dynamicTableContext })
  @property({ attribute: false })
  state: TableState = {
    sortingColumnId: undefined,
    stripedBackgroundColor: this.stripedBackgroundColor,
  };

  render() {
    if (this.hidden) {
      return nothing;
    }

    // get from columnsWidth or search from slot named = "headers"
    const columnsCount =
      this.columnsWidth?.length ||
      this.querySelectorAll("[slot='headers']")?.length ||
      0;

    const tableTemplateColumns = this.columnsWidth
      ? this.columnsWidth?.join(" ")
      : `repeat(${columnsCount}, 1fr)`;

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
        <div class="table">
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
      overflow: hidden;
    }

    .table-container {
      display: grid;
      grid-template-rows: auto 1fr;
      background-color: var(--table-background-color);
      border-style: solid;
      border-width: 1px;
      border-color: var(--table-border-color);
      height: var(--table-height);
    }

    .table {
      display: grid;
      grid-template-columns: var(--table-template-column);
      overflow: auto;
    }

    .footer-spaner {
      display: grid;
      grid-template-rows: 1fr auto;
    }

    .placeholder {
      border-bottom: 1px solid var(--table-border-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-dynamic-table": DynamicTable;
  }
}
