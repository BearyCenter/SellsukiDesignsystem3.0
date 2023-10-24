import { consume } from "@lit-labs/context";
import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { BaseAttributes, ThemeValue } from "../../types/base-attributes";
import {
  ButtonVariants,
  ColorName,
  ColorRole,
  FontFamilyGroup,
  FontWeight,
  Size,
  Theme,
} from "../../types/theme";
import { themeContext } from "../context-theme";

/**
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("ssk-button")
export class Button extends LitElement implements ThemeValue, BaseAttributes {
  static registeredName = "ssk-button";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

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
  @property({ attribute: false })
  onClick?: () => void;

  render() {
    if (this.hidden) {
      return html``;
    }

    // split css into variants
    let additionalCss = "";

    if (this.variant === "solid") {
      additionalCss += `
      button:hover:enabled {
        background: linear-gradient(
          to top,
          rgba(255, 255, 255, 0.2),
          rgba(255, 255, 255, 0.2)
        ) var(--background-color);
      }

      button:active:enabled  {
        background: linear-gradient(
          to top,
          rgba(255, 255, 255, 0.3),
          rgba(255, 255, 255, 0.3)
        ) var(--background-color);
      }

      button:disabled {
        background-color: ${getComponentThemeColor(
          this.theme,
          "button",
          "colors",
          "gray",
          "200"
        )};
        color: ${getComponentThemeColor(
          this.theme,
          "button",
          "colors",
          "gray",
          "300"
        )};
      }
      `;

      if (this.loading) {
        additionalCss += `
        button {
          background: linear-gradient(
            to top,
            rgba(255, 255, 255, 0.3),
            rgba(255, 255, 255, 0.3)
          ) var(--background-color);
        }
        `;
      }
    }

    if (this.variant === "outline") {
      additionalCss += `
      button {
        background-color: transparent;
        border-width: max(1px, calc(var(--border-width)));
        border-color: var(--background-color);
        color: var(--background-color);
      }

      button:hover:enabled {
        background: linear-gradient(
          to top,
          rgba(255, 255, 255, 0.2),
          rgba(255, 255, 255, 0.2)
        ) var(--background-color);
      }

      button:active:enabled  {
        background: linear-gradient(
          to top,
          rgba(255, 255, 255, 0.3),
          rgba(255, 255, 255, 0.3)
        ) var(--background-color);
      }

      button:disabled {
        background-color: transparent;
        border-color: ${getComponentThemeColor(
          this.theme,
          "button",
          "colors",
          "gray",
          "200"
        )};
        color: ${getComponentThemeColor(
          this.theme,
          "button",
          "colors",
          "gray",
          "200"
        )};
      }
      `;
    }

    if (this.variant === "ghost") {
      additionalCss += `

      button {
        background-color: transparent;
        border: none;
        color: var(--background-color);
      }

      button:hover:enabled {
        background-color: ${getComponentThemeColor(
          this.theme,
          "button",
          "colors",
          this.backgroundColor || this.themeColor,
          "100"
        )};
      }

      button:active:enabled  {
        background-color: ${getComponentThemeColor(
          this.theme,
          "button",
          "colors",
          this.backgroundColor || this.themeColor,
          "200"
        )};
      }

      button:disabled {
        background-color: transparent;
        color: ${getComponentThemeColor(
          this.theme,
          "button",
          "colors",
          "gray",
          "200"
        )};
      }
      `;

      if (this.loading) {
        additionalCss += `
        button {
          background: linear-gradient(
            to top,
            rgba(255, 255, 255, 0.3),
            rgba(255, 255, 255, 0.3)
          ) var(--background-color);
        }
        `;
      }
    }

    return html`
      <style>
        button {
          display: flex;
          align-items: center;
          border-style: solid;
          border-width: 0;
          ${parseThemeValueComponentCss(this.theme, "button", this)};
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
        }

        button:disabled {
          cursor: not-allowed;
        }

        ${additionalCss}
      </style>

      <button
        data-testid=${this.testId || nothing}
        .disabled=${this.disabled}
        @click=${!this.loading && this.onClick}
      >
        ${this.loading
          ? svg`<svg width="1em" height="1em" stroke="currentColor" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_V8m1{transform-origin:center;animation:spinner_zKoa 2s linear infinite}.spinner_V8m1 circle{stroke-linecap:round;animation:spinner_YpZS 1.5s ease-in-out infinite}@keyframes spinner_zKoa{100%{transform:rotate(360deg)}}@keyframes spinner_YpZS{0%{stroke-dasharray:0 150;stroke-dashoffset:0}47.5%{stroke-dasharray:42 150;stroke-dashoffset:-16}95%,100%{stroke-dasharray:42 150;stroke-dashoffset:-59}}</style><g class="spinner_V8m1"><circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"></circle></g></svg>`
          : html`<slot name="prefix"></slot>`}
        <slot></slot>
        <slot name="postfix"></slot>
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
