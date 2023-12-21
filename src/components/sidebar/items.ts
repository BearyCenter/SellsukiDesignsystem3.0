import { consume } from "@lit-labs/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { redispatchEvents } from "../../helpers/lit";
import { ThemeValue } from "../../types/base-attributes";
import {
  ColorName,
  ColorRole,
  FontFamilyGroup,
  FontWeight,
  MenuVariants,
  Size,
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";
import { SidebarAttributes } from "./types";

@customElement("ssk-sidebar-items")
export class SidebarItems
  extends LitElement
  implements ThemeValue, SidebarAttributes
{
  static registeredName = "ssk-sidebar-items";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  // ThemeValue
  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  themeColor: string = "primary";
  @property({ type: String })
  margin?: string;
  @property({ type: String })
  width?: string | undefined;
  @property({ type: String })
  height?: string | undefined;
  @property({ type: String })
  gap?: string | undefined;
  @property({ type: String })
  rounded?: string | undefined;
  @property({ type: String })
  color?: ColorRole | ColorName = "black";
  @property({ type: String })
  fontSize?: string | undefined;
  @property({ type: String })
  padding?: string;

  // font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  @property({ type: String })
  label?: string | undefined;
  @property({ type: Boolean })
  disabled = false;
  @property({ type: Boolean })
  active = false;
  @property({ type: String })
  variant: MenuVariants = "outline";
  @property({ type: Boolean })
  collapsed = false;
  @property({ type: Boolean })
  hidden = false;

  @state()
  _isActive: boolean = false;

  updated(changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has("active")) {
      // Update the local state when the 'active' property changes
      this._isActive = this.active;
    }
  }

  render() {
    if (this.hidden) {
      return null;
    }

    let additionalCss = `
    --font-weight: ${parseVariables(cssVar("font-weight", this.fontWeight))};
    --font-size: ${parseVariables(
      cssVar("font-size", this.fontSize),
      cssVar("font-size", this.size),
    )};
    --padding: ${parseVariables(
      cssVar("padding", this.padding),
      cssVar("padding", this.size),
    )};
    --margin: ${parseVariables(cssVar("margin", this.margin))};
    --gap: ${parseVariables(
      cssVar("spacing", this.gap),
      cssVar("spacing", this.size),
    )};

    --rounded: ${parseVariables(
      cssVar("rounded", this.rounded),
      cssVar("rounded", this.size),
    )};

    --background-color: transparent;
    --background-color-hover: ${parseVariables(
      cssVar("colors", this.themeColor, 100),
    )};
    --background-color-disabled: ${parseVariables(
      cssVar("colors", "gray", 100),
    )};
    --color: ${parseVariables(cssVar("colors", this.color, 900))};
    --color-prefix: ${parseVariables(cssVar("colors", this.color, 400))};
    --color-hover: var(--color);
   
    --color-disabled: ${parseVariables(cssVar("colors", "gray", 400))};

    --border-color: ${parseVariables(cssVar("colors", this.themeColor, 500))};
    --border-color-disabled: var(--background-color-disabled);
    --border-width: 0px;
    `;

    switch (this.variant) {
      case "solid":
        additionalCss += `
        --background-color-active: ${parseVariables(
          cssVar("colors", this.themeColor, 600),
        )};
        --color-active:  ${parseVariables(
          cssVar("colors", this.color),
          cssVar("colors", this.color),
          this.color,
          cssVar("colors", "white", 200),
        )};
       `;
        break;

      case "outline":
        additionalCss += `
        --background-color-active: ${parseVariables(
          cssVar("colors", this.themeColor, 100),
        )};
        --color-active: ${parseVariables(
          cssVar("colors", this.themeColor, 600),
        )};
          `;
        break;
    }

    return html`
      ${parseThemeToCssVariables(
        this.theme?.components?.sidebar,
        ".sidebar-menu-container",
      )}
      <style>
        .sidebar-menu-container {
          ${additionalCss};
        }
      </style>

      <div
        class="sidebar-menu-container ${this._isActive ? "active" : ""} ${this
          .disabled
          ? "disabled"
          : ""} 
        "
        data-testid=${this.testId || nothing}
        @click=${(e: Event) => this._onClick(e)}
      >
        ${this.collapsed
          ? html` <div class="collapsed-content">
              <slot name="prefix"></slot>
              <slot name="badge"></slot>
            </div>`
          : html`
              <div class="prefix">
                <slot name="prefix"></slot>
              </div>
              <slot></slot>
              <div class="postfix">
                <slot name="badge"></slot>
                <slot name="postfix"></slot>
              </div>
            `}
      </div>
    `;
  }

  private _onClick(e: Event) {
    if (this._isActive) {
      redispatchEvents(e, this);
      return;
    }

    const sidebarItems = document.querySelectorAll("ssk-sidebar-items");
    sidebarItems.forEach((item) => {
      if (item !== this) {
        item._isActive = false;
      }
    });

    this._isActive = !this._isActive;
    redispatchEvents(e, this);
  }

  static styles = css`
    .sidebar-menu-container {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      background-color: var(--background-color);
      color: var(--color);
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
      padding: var(--padding);
      margin: var(--margin);
      gap: var(--gap);
      border-radius: var(--rounded);
      border-color: var(--border-color);
      border-width: var(--border-width);
    }

    .sidebar-menu-container:hover {
      background-color: var(--background-color-hover);
      color: var(--color-hover);
    }

    .sidebar-menu-container.active {
      background-color: var(--background-color-active);
      color: var(--color-active);
    }

    .sidebar-menu-container.disabled {
      cursor: not-allowed;
      background-color: var(--background-color-disabled);
      color: var(--color-disabled);
      border-color: var(--border-color-disabled);
    }

    .sidebar-menu-container .prefix,
    .sidebar-menu-container .postfix,
    .sidebar-menu-container slot {
      display: flex;
      align-items: center;
    }

    .sidebar-menu-container slot {
      margin-right: auto;
    }

    .sidebar-menu-container .prefix {
      width: auto;

      color: var(--color-prefix);
    }

    .sidebar-menu-container.active .prefix {
      width: auto;

      color: var(--color-active);
    }

    .collapsed-content {
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
    }

    .collapsed-content .prefix {
      align-items: center;
      position: relative;
    }

    .collapsed-content .badge {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      overflow: hidden;
      position: absolute;
      top: 0;
      right: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-sidebar-items": SidebarItems;
  }
}
