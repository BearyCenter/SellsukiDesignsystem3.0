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
    console.log(stripedSelector.join(", "));
    let additionalStyle = html`
      <style>
        :host {
          --columns-count: ${columnsCount};
          --table-template-column: ${tableTemplateColumns};

          --table-spacing: ${parseVariables(cssVar("spacing", "md"))};

          --table-background-color: ${parseVariables(
            cssVar("colors", this.backgroundColor),
            cssVar("colors", this.backgroundColor, 50),
            this.backgroundColor,
            cssVar("colors", "white", 50)
          )};

          --table-background-color-striped: ${parseVariables(
            cssVar("colors", this.stripedBackgroundColor),
            cssVar("colors", this.stripedBackgroundColor, 50),
            this.stripedBackgroundColor,
            cssVar("colors", "gray", 50)
          )};

          --table-border-color: ${parseVariables(
            cssVar("colors", "fiord", 100)
          )};
        }

        ${stripedSelector.join(", ")} {
          background-color: var(--table-background-color-striped);
        }
      </style>
    `;

    return html`${parseThemeToCssVariables(
        this.theme?.components?.table,
        ":host"
      )}
      ${additionalStyle}

      <div class="table-container" data-testid=${this.testId || nothing}>
        <slot name="headers"></slot>

        <slot></slot>
      </div>`;
  }

  static styles = css`
    .table-container {
      display: grid;
      grid-template-columns: var(--table-template-column);
      border-style: solid;
      border-width: 1px;
      border-color: var(--table-border-color);
      background-color: var(--table-background-color);
    }

    /* Style for header row */
    ::slotted([slot="headers"]) {
      background-color: var(
        --table-background-color-striped,
        --table-background-color
      );
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-dynamic-table": DynamicTable;
  }
}
