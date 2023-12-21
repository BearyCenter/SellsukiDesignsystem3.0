import { consume } from "@lit-labs/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { ThemeValue } from "../../types/base-attributes";
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
import { SidebarAttributes } from "./types";

@customElement("ssk-sidebar-list")
export class SidebarList
  extends LitElement
  implements ThemeValue, SidebarAttributes
{
  static registeredName = "ssk-sidebar-list";

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
  color?: ColorRole | ColorName;
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
  label1?: string | undefined;
  @property({ type: String })
  label2?: string | undefined;
  @property({ type: Boolean })
  collapsed = false;
  @property({ type: Boolean })
  hidden = false;

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

    --background-color: ${
      this.collapsed
        ? "transparent"
        : parseVariables(cssVar("colors", this.themeColor, 100))
    };

    --color: var(--color);

    --border-color: ${parseVariables(cssVar("colors", this.themeColor, 500))};
    --border-width: 0px;
    `;

    return html`
      ${parseThemeToCssVariables(
        this.theme?.components?.sidebar,
        ".sidebar-list-container",
      )}
      <style>
        .sidebar-list-container {
          ${additionalCss};
        }
      </style>

      <div class="sidebar-list-container" data-testid=${this.testId || nothing}>
        ${this.collapsed
          ? html` <div class="collapsed-content">
              <slot name="prefix"></slot>
            </div>`
          : html`
              <div class="prefix">
                <slot name="prefix"></slot>
              </div>
              <div class="postfix">
                <div class="label1">${this.label1}</div>
                <div class="label2">${this.label2}</div>
              </div>
            `}
      </div>
    `;
  }

  static styles = css`
    .sidebar-list-container {
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

    .sidebar-list-container .prefix {
      display: flex;
      align-items: center;
    }

    .sidebar-list-container .postfix {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-right: auto;
    }

    .collapsed-content {
      display: flex;
      align-items: center;
    }

    .sidebar-list-container .label1 {
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
    }
    .sidebar-list-container .label2 {
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-sidebar-list": SidebarList;
  }
}
