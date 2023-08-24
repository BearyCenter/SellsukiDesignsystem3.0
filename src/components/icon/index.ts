import { consume } from "@lit-labs/context";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  ColorName,
  ColorRole,
  Size,
  Theme,
  getComponentThemeColor,
  getComponentThemeFontFamily,
  getComponentThemeSize,
} from "../../types/theme";
import { ThemeValue } from "../../types/theme-value";
import { themeContext } from "../theme-context";

@customElement("ssk-icon-<%= iconName %>")
export class Button extends LitElement implements ThemeValue {
  themeColor: string;
  backgroundColor?: string | undefined;
  borderColor?: string | undefined;
  fontSize?: string | undefined;
  lineHeight?: string | undefined;
  gap?: string | undefined;
  rounded?: string | undefined;
  margin?: string | undefined;
  fontFamilyGroup?: string | undefined;
  fontWeight?: string | undefined;
  borderWidth?: string | undefined;
  boxShadow?: string | undefined;
  dropShadow?: string | undefined;
  width?: string | undefined;
  height?: string | undefined;
  minWidth?: string | undefined;
  minHeight?: string | undefined;
  maxWidth?: string | undefined;
  maxHeight?: string | undefined;

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: Boolean })
  hidden = false;

  @property({ type: String })
  size: Size = "md";

  @property({ type: String })
  padding: Size = "md";

  // font color
  @property({ type: String })
  color: ColorRole | ColorName = "white";

  // onClick
  @property({ type: Function })
  onClick?: () => void;

  render() {
    if (this.hidden) {
      return html``;
    }

    return html`
      <style>
        button {
          background-color: ${getComponentThemeColor(
            this.theme,
            "button",
            "colors",
            this.themeColor,
            "500"
          )};
          color: ${getComponentThemeColor(
            this.theme,
            "button",
            "colors",
            this.color,
            "100"
          )};
          border: none;
          border-radius: ${getComponentThemeSize(
            this.theme,
            "button",
            "rounded",
            this.size
          )};
          padding: ${getComponentThemeSize(
            this.theme,
            "button",
            "padding",
            this.padding || this.size
          )};
          font-size: ${getComponentThemeSize(
            this.theme,
            "button",
            "fontSize",
            this.size
          )};
          line-height: ${getComponentThemeSize(
            this.theme,
            "button",
            "lineHeight",
            this.size
          )};
          font-family: ${getComponentThemeFontFamily(
            this.theme,
            "button",
            this.fontFamilyGroup,
            this.size
          )};
          font-weight: ${this.fontWeight};
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
        }

        button:hover {
          background-color: ${getComponentThemeColor(
            this.theme,
            "button",
            "colors",
            this.themeColor,
            "600"
          )};
        }

        button:active {
          background-color: ${getComponentThemeColor(
            this.theme,
            "button",
            "colors",
            this.themeColor,
            "700"
          )};
        }

        button:disabled {
          background-color: ${getComponentThemeColor(
            this.theme,
            "button",
            "colors",
            this.themeColor,
            "300"
          )};
          color: ${getComponentThemeColor(
            this.theme,
            "button",
            "colors",
            this.color,
            "500"
          )};
          cursor: not-allowed;
        }
      </style>

      <button .disabled=${this.disabled || this.loading} @click=${this.onClick}>
        ${this.loading
          ? html`<span>Loading...</span>`
          : html`<slot name="prefix" />
              <slot />
              <slot name="postfix" />`}
      </button>
    `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-button": Button;
  }
}
