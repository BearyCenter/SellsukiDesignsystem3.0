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

/**
 * Sellsuki Sidebar — DS 3.0
 *
 * Vertical navigation container that hosts `<ssk-sidebar-header>`,
 * `<ssk-sidebar-list>`, `<ssk-sidebar-group>`, and `<ssk-sidebar-item>`
 * children. Provides a shared context tracking `expanded` (full vs.
 * icon-only mini), `selectedItems`, and `expandedGroups`. Emits
 * `expanded-changed`, `selected-changed`, and `group-changed` events so
 * parent shells can persist the nav state.
 *
 * Typically rendered in the `sidebar` slot of `<ssk-app-shell>` (or
 * configured automatically by `<ssk-default-shell>` from a `menu` array).
 *
 * @example
 *   <ssk-sidebar ?expanded=${this.expanded} .selectedItems=${["orders"]}>
 *     <ssk-sidebar-header>
 *       <ssk-logo brand="sellsuki"></ssk-logo>
 *     </ssk-sidebar-header>
 *     <ssk-sidebar-list>
 *       <ssk-sidebar-item key="orders">คำสั่งซื้อ</ssk-sidebar-item>
 *     </ssk-sidebar-list>
 *   </ssk-sidebar>
 */
export class Sidebar extends LitElement {
  static registeredName = "ssk-sidebar";

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  /**
   * Visual density of nav items — `xs` / `sm` / `md` / `lg` / `xl`. Controls row padding and font tokens applied to child items. Defaults to `md`.
   */
  @property({ type: String })
  size: Size = "md";

  // ThemeValue
  /**
   * Brand accent for the active nav row highlight — falls back to `--fg-brand-primary` from `<ssk-app-shell-provider>` brand context. Pass an explicit `ColorRole` to override.
   */
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";

  /**
   * Override the outer padding token — accepts the same `xs`–`xl` scale as `size`. Leave unset to inherit from `size`.
   */
  @property({ type: String })
  padding?: Size;

  /**
   * When `true`, the sidebar renders at full width with labels visible; when `false`, it collapses to a 92px icon-only mini rail. Toggling fires `expanded-changed`.
   */
  @property({ type: Boolean })
  expanded: boolean = false;

  /**
   * Array of currently-selected item keys — child `<ssk-sidebar-item>`s match against this list to render their active state. The sidebar emits `selected-items-changed` rather than mutating this directly.
   */
  @property({ type: Array })
  selectedItems: string[] = [];

  /**
   * Array of currently-open `<ssk-sidebar-group>` keys. The sidebar emits `expanded-groups-changed` on header click rather than mutating this directly.
   */
  @property({ type: Array })
  expandedGroups: string[] = [];

  /**
   * Expanded-state width of the sidebar (any CSS length). Defaults to `256px`. Collapsed width is fixed at 92px.
   */
  @property({ type: String })
  width?: string = "256px";

  /**
   * Shared context exposed to descendant sidebar components — tracks `expanded`, `selectedItems`, `expandedGroups`, and provides setter callbacks. Not authored by callers.
   */
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
    "ssk-sidebar": Sidebar;
  }
}

if (!customElements.get("ssk-sidebar")) {
  customElements.define("ssk-sidebar", Sidebar);
}
