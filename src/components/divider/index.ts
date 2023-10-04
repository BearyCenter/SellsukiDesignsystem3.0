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

@customElement("ssk-divider")
export class Divider extends LitElement implements ThemeValue {
  static registeredName = "ssk-divider";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String })
  themeColor: ColorRole | ColorName = "";
  @property({ type: String })
  color?: ColorRole | ColorName = "gray.200";
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

  // divider specific
  @property({ type: Boolean })
  hidden = false;
  @property({ type: String })
  orientation: "horizontal" | "vertical" = "horizontal";

  render() {
    if (this.hidden) {
      return html``;
    }

    let additionalCss = "";

    if (this.orientation === "vertical") {
      additionalCss += `
        height: 100%;
        width: min-content;
        margin-top: 0;
        margin-bottom: 0;
      `;
    }

    if (this.orientation === "horizontal") {
      additionalCss += `
        width: 100%;
        height: min-content;
        margin-left: 0;
        margin-right: 0;
      `;
    }

    return html`
      <style>
        div {
          ${parseThemeValueComponentCss(this.theme, "divider", this)};
          ${additionalCss};

          box-sizing: border-box;
          background-color: var(--color);
        }
      </style>
      <div></div>
    `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-divider": Divider;
  }
}
