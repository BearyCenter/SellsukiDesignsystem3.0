import { consume, provide } from "@lit-labs/context";
import { LitElement, PropertyValueMap, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { BaseAttributes, ThemeValue } from "../../types/base-attributes";
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
import { SidebarAttributes, State, stateContext } from "./types";
export * from "./group";
export * from "./header";
export * from "./items";
export * from "./types";

@customElement("ssk-sidebar")
export class Sidebar
  extends LitElement
  implements ThemeValue, BaseAttributes, SidebarAttributes
{
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

  @provide({ context: stateContext })
  @property({ attribute: false })
  state: State = {
    expanded: false,
    selectedItems: this.selectedItems,
    expandedGroups: this.expandedGroups,
    setExpanded: (expanded: boolean) => {
      this.state = {
        ...this.state,
        expanded,
      };
      this.expanded = expanded;

      this.dispatchEvent(
        new CustomEvent("expanded-changed", {
          detail: this.state,
          bubbles: true,
          composed: true,
        })
      );
    },
    setSelectedItem: (key: string, selected: boolean) => {
      if (selected) {
        this.state.selectedItems.push(key);
      } else {
        this.state.selectedItems = this.state.selectedItems.filter(
          (item) => item !== key
        );
      }

      this.state = {
        ...this.state,
        selectedItems: [...new Set(this.state.selectedItems)],
      };
      this.selectedItems = this.state.selectedItems;

      this.dispatchEvent(
        new CustomEvent("selected-changed", {
          detail: this.state,
          bubbles: true,
          composed: true,
        })
      );
    },
    setExpandedGroup: (key: string, collapsed: boolean) => {
      if (collapsed) {
        this.state.expandedGroups.push(key);
      } else {
        this.state.expandedGroups = this.state.expandedGroups.filter(
          (item) => item !== key
        );
      }

      this.state = {
        ...this.state,
        expandedGroups: [...new Set(this.state.expandedGroups)],
      };
      this.expandedGroups = this.state.expandedGroups;

      this.dispatchEvent(
        new CustomEvent("collapsed-changed", {
          detail: this.state,
          bubbles: true,
          composed: true,
        })
      );

      console.log(this.state);
    },
  };

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.willUpdate(_changedProperties);
    this.state = {
      ...this.state,
      expanded: this.expanded,
      selectedItems: this.selectedItems,
      expandedGroups: this.expandedGroups,
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

          --border-color: ${parseVariables(cssVar("colors", "gray", 200))};
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
    .sidebar {
      display: grid;
      grid-template-rows: auto 1fr auto;
      height: 100%;
      width: 256px;
      box-sizing: border-box;
      overflow-x: hidden;
      padding: var(--padding);
      transition: width 0.3s ease;
      gap: 0.5em;
      border-right: 1px solid var(--border-color);
      background-color: var(--ssk-colors-background-50);
    }

    .sidebar.collapsed {
      width: 92px;
    }

    .footer {
      margin-top: auto;
      border-top: 1px solid var(--border-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-sidebar": Sidebar;
  }
}
