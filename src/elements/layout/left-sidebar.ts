import { consume } from "@lit-labs/context";
import { LitElement, html } from "lit";
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
import "./group-menu";

@customElement("ssk-left-sidebar")
export class LeftSidebar
  extends LitElement
  implements ThemeValue, BaseAttributes
{
  static registeredName = "ssk-left-sidebar";

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
  fontWeight: FontWeight = "normal";

  // Toggle state
  @property({ type: Boolean })
  isOpen = true;

  render() {
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          width: ${this.isOpen ? "240px" : "0"};
          min-width: 0;
          height: 100vh;
          overflow-x: hidden;
          transition: 0.5s;
          background-color: ${parseVariables(
            cssVar("colors", this.backgroundColor),
            cssVar("colors", "background", 200),
            this.backgroundColor
          )};
          color: ${parseVariables(
            cssVar("colors", this.color),
            cssVar("colors", "text", 400),
            this.color
          )};
          border: 1px solid
            ${parseVariables(
              cssVar("colors", this.borderColor),
              cssVar("colors", "border", 200),
              this.borderColor
            )};
          font-family: ${parseVariables(
            cssVar("font-family", this.fontFamilyGroup)
          )};
          font-weight: ${parseVariables(
            cssVar("font-weight", this.fontWeight)
          )};
        }

        .header {
          padding: 16px;
        }

        .footer {
          padding: 16px;
          margin-top: auto;
          background-color: ${parseVariables(
            cssVar("colors", this.backgroundColor),
            cssVar("colors", "background", 200),
            this.backgroundColor
          )};
          color: ${parseVariables(
            cssVar("colors", this.color),
            cssVar("colors", "text", 400),
            this.color
          )};
          font-family: ${parseVariables(
            cssVar("font-family", this.fontFamilyGroup)
          )};
          font-weight: ${parseVariables(
            cssVar("font-weight", this.fontWeight)
          )};
        }
      </style>

      <div class="header">
        <slot name="header"></slot>
        <slot name="divider-header"></slot>
      </div>

      <div class="footer">
        <slot name="divider-footer"></slot>
        <slot name="footer"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-left-sidebar": LeftSidebar;
  }
}
