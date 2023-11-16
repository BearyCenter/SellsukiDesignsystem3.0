import { consume } from "@lit-labs/context";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  parseVariables,
  cssVar,
  ColorName,
  ColorRole,
  FontFamilyGroup,
  FontWeight,
} from "../../types/theme";
import { themeContext } from "../../contexts/theme";
import { Size, Theme } from "../../types/theme";
import { BaseAttributes, ThemeValue } from "../../types/base-attributes";

interface MenuItem {
  title: string;
  path: string;
  icon: string;
}

@customElement("ssk-group-menu")
export class GroupMenu
  extends LitElement
  implements ThemeValue, BaseAttributes
{
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  fontSize?: string | undefined;

  // font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  // ThemeValue
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  @property({ type: String })
  color?: ColorRole | ColorName;
  @property({ type: String })
  backgroundColor?: string | undefined;

  @property({ type: Object })
  items: MenuItem[] = [];
  @property({ type: String })
  labelGroup?: string | undefined;
  // Toggle state
  @property({ type: Boolean })
  isGroupOpen = false;

  private toggleGroupmenu() {
    this.isGroupOpen = !this.isGroupOpen;
  }

  render() {
    return html`
      <style>
        :host {
          --font-family: ${parseVariables(
          cssVar("font-family", this.fontFamilyGroup)
        )};
          --font-weight: ${parseVariables(
          cssVar("font-weight", this.fontWeight)
        )};
          --font-size: ${parseVariables(
          cssVar("font-size", this.fontSize),
          cssVar("font-size", this.size)
        )};
          --color: ${parseVariables(
          cssVar("colors", this.color),
          cssVar("colors", "text", 400),
          this.color
        )};
          --background-color: ${parseVariables(
          cssVar("colors", this.backgroundColor),
          cssVar("colors", "background", 200),
          this.backgroundColor
        )};
        }

        .group-menu {
          display: flex;
          align-items: center;
          padding: 8px;
          cursor: pointer;
        }

        .icon {
          margin-left: auto;
          font-size: var(--icon-size, 16px);
        }

        .sub-items {
          flex-direction: column;
          display: ${this.isGroupOpen || !this.labelGroup || !this.items.length
          ? "flex"
          : "none"};
          cursor: pointer;
          transition: color 0.3s ease-in-out;
        }

        .dropdown-link {
          display: flex;
          align-items: center;
          padding: 8px;
          cursor: pointer;
          color: var(--color);
          font-size: var(--font-size);
          font-family: var(--font-family);
          font-weight: var(--font-weight);
          text-decoration: none;
          border-radius: 8px;
          transition: background-color 0.3s ease-in-out;
        }

        .dropdown-link:hover {
          background-color:${parseVariables(
          cssVar("colors", this.themeColor, 300),
          this.themeColor
        )};

        .dropdown-link:active {
          background-color:${parseVariables(
          cssVar("colors", this.themeColor),
          this.themeColor
        )};

        p {
          background-color: var(--background-color);
          color: var(--color);
          font-size: var(--font-size);
          font-family: var(--font-family);
          font-weight: var(--font-weight);
          line-height: var(--line-height);
          padding: var(--padding);
          margin: var(--margin);
        }

        .sidebar-label {
          margin-left: 1rem;
          color: var(--color);
          font-size: var(--font-size);
          font-family: var(--font-family);
          font-weight: var(--font-weight);
          text-decoration: none;
        }
      </style>

      ${this.items && this.labelGroup
        ? html`
            <div class="group-menu" @click="${this.toggleGroupmenu}">
              <p>${this.labelGroup}</p>
              ${this.items
                ? html`
                    <div class="icon">
                      <ssk-icon
                        name="${this.isGroupOpen
                          ? "solid-chevron-up"
                          : "solid-chevron-down"}"
                      ></ssk-icon>
                    </div>
                  `
                : html``}
            </div>
          `
        : html``}
      ${this.items
        ? html`
            <div class="sub-items">
              ${this.items?.map(
                (item: any, index: number) => html`
                  <a class="dropdown-link" href=${item.path} key=${index}>
                    <ssk-icon name="${item.icon}"></ssk-icon>
                    <span class="sidebar-label">${item.title}</span>
                  </a>
                `
              )}
            </div>
          `
        : html``}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-group-menu": GroupMenu;
  }
}
