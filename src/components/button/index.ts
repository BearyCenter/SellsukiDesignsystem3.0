import { consume } from "@lit-labs/context";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  ButtonVariants,
  ColorName,
  ColorRole,
  FontFamilyGroup,
  Size,
  Theme,
  getComponentThemeColor,
  getComponentThemeFontFamily,
  getComponentThemeSize,
} from "../../types/theme";
import { themeContext } from "../theme-context";

/**
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("ssk-button")
export class Button extends LitElement {
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String })
  variant: ButtonVariants = "solid";

  @property({ type: Boolean })
  loading = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  hidden = false;

  @property({ type: String })
  size: Size = "md";

  @property({ type: String })
  padding: Size = "md";

  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";

  // font group
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";

  @property({ type: String })
  fontWeight = "400";

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
