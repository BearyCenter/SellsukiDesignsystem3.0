import { consume } from "@lit-labs/context";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  ButtonVariants,
  ColorName,
  ColorRole,
  FontFamilyGroup,
  FontWeight,
  Size,
  Theme,
  getComponentThemeColor,
} from "../../types/theme";
import {
  ThemeValue,
  parseThemeValueComponentCss,
} from "../../types/theme-value";
import { themeContext } from "../theme-context";

/**
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("ssk-button")
export class Button extends LitElement implements ThemeValue {
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  @property({ type: String })
  color?: ColorRole | ColorName;
  @property({ type: String })
  backgroundColor?: string | undefined;
  @property({ type: String })
  borderColor?: string | undefined;

  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  padding?: Size;
  @property({ type: String })
  fontSize?: string | undefined;
  @property({ type: String })
  lineHeight?: string | undefined;
  @property({ type: String })
  gap?: string | undefined;
  @property({ type: String })
  rounded?: string | undefined;
  @property({ type: String })
  margin?: string | undefined;

  // font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  @property({ type: String })
  borderWidth?: string | undefined;
  @property({ type: String })
  boxShadow?: string | undefined;
  @property({ type: String })
  dropShadow?: string | undefined;
  @property({ type: String })
  width?: string | undefined;
  @property({ type: String })
  height?: string | undefined;
  @property({ type: String })
  minWidth?: string | undefined;
  @property({ type: String })
  minHeight?: string | undefined;
  @property({ type: String })
  maxWidth?: string | undefined;
  @property({ type: String })
  maxHeight?: string | undefined;

  // button specific
  @property({ type: String })
  variant: ButtonVariants = "solid";

  @property({ type: Boolean })
  loading = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  hidden = false;

  // Event
  @property({ type: Function })
  onClick?: () => void;

  render() {
    if (this.hidden) {
      return html``;
    }

    return html`
      <style>

        button {
          ${parseThemeValueComponentCss(this.theme, "button", this)}
          border: none;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;

        }

        button:hover {
          background-color: ${getComponentThemeColor(
          this.theme,
          "button",
          "colors",
          this.themeColor,
          "400"
        )};
        }

        button:active {
          background-color: ${getComponentThemeColor(
          this.theme,
          "button",
          "colors",
          this.themeColor,
          "300"
        )};
        }

        button:disabled {
          background-color: ${getComponentThemeColor(
          this.theme,
          "button",
          "colors",
          "gray",
          "300"
        )};
          color: ${getComponentThemeColor(
          this.theme,
          "button",
          "colors",
          "gray",
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
