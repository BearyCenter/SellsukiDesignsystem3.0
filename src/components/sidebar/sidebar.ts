import { consume } from "@lit-labs/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { BaseAttributes, ThemeValue } from "../../types/base-attributes";
import {
  ColorName,
  ColorRole,
  FontFamilyGroup,
  FontWeight,
  Size,
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";
import { SidebarGroup } from "./group";
import { SidebarItems } from "./items";
import { SidebarAttributes } from "./types";

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
  color?: ColorRole | ColorName;
  @property({ type: String })
  backgroundColor?: string | undefined;
  @property({ type: String })
  borderColor?: string | undefined;
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontSize?: string | undefined;
  @property({ type: String })
  fontWeight: FontWeight = "normal";
  @property({ type: String })
  padding?: Size;

  @property({ type: Boolean })
  collapsed: boolean = false;

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has("collapsed")) {
      const isCollapsed = this.collapsed;
      console.log(isCollapsed);

      const groups = Array.from(
        this.querySelectorAll("ssk-sidebar-group"),
      ) as SidebarGroup[];
      groups.forEach((group) => {
        group.collapsed = isCollapsed;
      });

      const items = Array.from(
        this.querySelectorAll("ssk-sidebar-items"),
      ) as SidebarItems[];
      items.forEach((item) => {
        item.collapsed = isCollapsed;
      });

      const lists = Array.from(
        this.querySelectorAll("ssk-sidebar-list"),
      ) as SidebarGroup[];
      lists.forEach((list) => {
        list.collapsed = isCollapsed;
      });
    }
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = `
    --font-family: ${parseVariables(
      cssVar("font-family", this.fontFamilyGroup),
    )};
    --font-weight: ${parseVariables(cssVar("font-weight", this.fontWeight))};
    --font-size: ${parseVariables(
      cssVar("font-size", this.fontSize),
      cssVar("font-size", this.size),
    )};

    --padding: ${parseVariables(
      cssVar("padding", this.padding),
      cssVar("padding", this.size),
    )};
    
    --border-color: ${parseVariables(cssVar("colors", "gray", 200))};
    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.sidebar, ".sidebar")}

      <style>
        .sidebar {
          ${additionalCss};
        }
      </style>

      <div class="sidebar ${this.collapsed ? "collapsed" : ""}">
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
      width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
      padding: var(--padding);
      transition: width 0.3s ease;
      gap: 0.5em;
      border-right: 1px solid var(--border-color);
    }

    .sidebar.collapsed {
      width: 6em;
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
