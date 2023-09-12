import { consume } from "@lit-labs/context";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  ColorName,
  ColorRole,
  FontFamilyGroup,
  FontWeight,
  Size,
  Theme,
} from "../../types/theme";
import {
  ThemeValue,
  parseThemeValueComponentCss,
} from "../../types/theme-value";
import { themeContext } from "../context-theme";

/**
 * @slot - This element has a slot
 * @csspart text
 */
@customElement("ssk-text")
export class Text extends LitElement implements ThemeValue {
  static registeredName = "ssk-text";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String })
  themeColor: ColorRole | ColorName = "";
  @property({ type: String })
  color?: ColorRole | ColorName = "black.900";
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

  // text specific
  @property({ type: Boolean })
  hidden = false;

  @property({ type: Boolean })
  italic = false;

  @property({ type: Boolean })
  underline = false;

  @property({ type: Boolean })
  strike = false;

  @property({ type: String })
  align?: "left" | "center" | "right" | "justify" | undefined;

  @property({ type: String })
  transform?: "uppercase" | "lowercase" | "capitalize" | undefined;

  render() {
    if (this.hidden) {
      return html``;
    }

    let additionalCss = "";
    let textDecorations = [];

    if (this.italic) {
      additionalCss += "font-style: italic;";
    }

    if (this.underline) {
      textDecorations.push("underline");
    }

    if (this.strike) {
      textDecorations.push("line-through");
    }

    if (this.transform) {
      additionalCss += `text-transform: ${this.transform};`;
    }

    if (this.align) {
      additionalCss += `text-align: ${this.align};`;
    }

    return html`
      <style>
        p {
          ${parseThemeValueComponentCss(this.theme, "text", this)}
          ${additionalCss}

          ${textDecorations.length > 0
          ? `text-decoration: ${textDecorations.join(" ")};`
          : ""}
        }
      </style>
      <p><slot > </slot></p>
    `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-text": Text;
  }
}
