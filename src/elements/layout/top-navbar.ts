import { consume } from "@lit-labs/context";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { BaseAttributes, ThemeValue } from "../../types/base-attributes";
import { themeContext } from "../../contexts/theme";
import { Size, Theme } from "../../types/theme";
import {
  ColorName,
  ColorRole,
  FontFamilyGroup,
  FontWeight,
  cssVar,
  parseVariables,
} from "../../types/theme";

@customElement("ssk-top-navbar")
export class TopNavbar
  extends LitElement
  implements ThemeValue, BaseAttributes
{
  static registeredName = "ssk-top-navbar";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  size: Size = "md";

  // Top navbar Attributes
  @property({ type: String })
  leftImgSrc?: string;
  @property({ type: String })
  rightImgSrc?: string;

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
  fontWeight: FontWeight = "normal";

  render() {
    return html`
      <style>
        :host {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: space-between;
          align-items: center;

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
          --border-color: ${parseVariables(
            cssVar("colors", this.borderColor),
            cssVar("colors", "border", 200),
            this.borderColor
          )};
          --font-family: ${parseVariables(
            cssVar("font-family", this.fontFamilyGroup)
          )};
          --font-weight: ${parseVariables(
            cssVar("font-weight", this.fontWeight)
          )};
        }
      </style>

      <div class="left-section">
        <slot name="left-icons"></slot>
        ${this.leftImgSrc
          ? html`<img class="logo-image" src="${this.leftImgSrc}" alt="Logo" />`
          : html``}
      </div>

      <div class="right-section">
        <slot name="right-icons"></slot>
        ${this.rightImgSrc
          ? html`<img
              class="profile-image"
              src="${this.rightImgSrc}"
              alt="Logo"
            />`
          : html``}
      </div>
    `;
  }

  static styles = css`
    .left-section,
    .right-section {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .icon-container,
    .right-icons {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .icon,
    .text {
      width: 24px;
      height: 24px;
      position: relative;
    }

    .profile-image {
      width: 40px;
      height: 40px;
      border-radius: 100px;
    }

    .logo-image {
      height: 40px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-top-navbar": TopNavbar;
  }
}
