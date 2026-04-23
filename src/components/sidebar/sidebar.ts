import { consume, createContext, provide } from "@lit/context";
import { LitElement, PropertyValueMap, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import {
  ColorName,
  ColorRole,
  Size,
  Theme,
  cssVar,
  deepFlattenCssVar,
  parseKvToCssVariables,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";

export type State = {
  expanded: boolean; // sidebar expanded to show labels
  selectedItems: string[]; // selected items
  expandedGroups: string[]; // collapsed groups
  setExpanded: (expanded: boolean) => void;
  setSelectedItem: (key: string, selected: boolean) => void;
  setExpandedGroup: (key: string, collapsed: boolean) => void;
};

export const stateContext = createContext<State>("ssk-sidebar-state-context");

export class Sidebar extends LitElement {
  static registeredName = "ssk-sidebar";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  size: Size = "md";

  // ThemeValue
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";

  @property({ type: String })
  padding?: Size;

  @property({ type: Boolean })
  expanded: boolean = false;

  @property({ type: Array })
  selectedItems: string[] = [];

  @property({ type: Array })
  expandedGroups: string[] = [];

  @property({ type: String })
  width?: string = "256px";

  @provide({ context: stateContext })
  @property({ attribute: false })
  state: State = {
    expanded: this.expanded,
    selectedItems: this.selectedItems,
    expandedGroups: this.expandedGroups,
    setExpanded: (expanded: boolean) => {
      // this.state = {
      //   ...this.state,
      //   expanded,
      // };
      // this.expanded = expanded;

      this.dispatchEvent(
        new CustomEvent("expanded-changed", {
          detail: expanded,
          bubbles: true,
          composed: true,
        })
      );
    },
    setSelectedItem: (key: string, selected: boolean) => {
      // if (selected) {
      //   this.state.selectedItems.push(key);
      // } else {
      //   this.state.selectedItems = this.state.selectedItems.filter(
      //     (item) => item !== key
      //   );
      // }

      // this.state = {
      //   ...this.state,
      //   selectedItems: [...new Set(this.state.selectedItems)],
      // };
      // this.selectedItems = this.state.selectedItems;

      this.dispatchEvent(
        new CustomEvent("selected-items-changed", {
          detail: {
            key,
            selected,
          },
          bubbles: true,
          composed: true,
        })
      );
    },
    setExpandedGroup: (key: string, expanded: boolean) => {
      // if (collapsed) {
      //   this.state.expandedGroups.push(key);
      // } else {
      //   this.state.expandedGroups = this.state.expandedGroups.filter(
      //     (item) => item !== key
      //   );
      // }

      // this.state = {
      //   ...this.state,
      //   expandedGroups: [...new Set(this.state.expandedGroups)],
      // };
      // this.expandedGroups = this.state.expandedGroups;

      this.dispatchEvent(
        new CustomEvent("expanded-groups-changed", {
          detail: {
            key,
            expanded,
          },
          bubbles: true,
          composed: true,
        })
      );
    },
  };

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.willUpdate(_changedProperties);
    this.state = {
      ...this.state,
      expanded: this.expanded,
      selectedItems: this.selectedItems || [],
      expandedGroups: this.expandedGroups || [],
    };
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.sidebar, ".sidebar")}
      ${parseKvToCssVariables(
        deepFlattenCssVar(this.theme?.colors[this.themeColor], "colors-theme"),
        ":host"
      )}

      <style>
        :host {
          --padding: ${parseVariables(
            cssVar("padding", this.padding),
            cssVar("padding", this.size)
          )};

          --border-color: var(--stroke-primary, #e5e7eb);

          --expanded-width: ${parseVariables(
            cssVar("width", this.width),
            this.width,
            "auto"
          )};
        }
      </style>

      <div class="sidebar ${this.expanded ? "" : "collapsed"}">
        <div class="header">
          <slot name="header"></slot>
        </div>

        <div class="content">
          <slot></slot>
        </div>

        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .sidebar {
      display: grid;
      grid-template-rows: auto 1fr auto;
      min-width: 256px;
      height: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
      padding: 12px 18px;
      gap: 8px;
      border-right: 1px solid var(--border-color);
      background-color: var(--bg-primary, #fff);
      transition: min-width 0.2s ease-out;
      width: var(--expanded-width);
    }

    .sidebar.collapsed {
      min-width: 92px;
      width: 92px;
    }

    .content,
    .footer {
      display: flex;
      flex-direction: column;
    }

    .footer {
      margin-top: auto;
      border-top: 1px solid var(--border-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ds-sidebar": Sidebar;
    "ssk-sidebar": Sidebar;
  }
}

if (!customElements.get("ds-sidebar")) {
  customElements.define("ds-sidebar", Sidebar);
}
if (!customElements.get("ssk-sidebar")) {
  customElements.define("ssk-sidebar", class extends Sidebar {});
}
