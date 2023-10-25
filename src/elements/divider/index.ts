import { consume } from "@lit-labs/context";
import { LitElement, css, html } from "lit";
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

@customElement("ssk-divider")
export class Divider extends LitElement implements ThemeValue {
  static registeredName = "ssk-divider";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String })
  themeColor: ColorRole | ColorName = "gray";
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

  // divider specific
  @property({ type: Boolean })
  hidden = false;
  @property({ type: String })
  orientation: "horizontal" | "vertical" = "horizontal";

  render() {
    if (this.hidden) {
      return html``;
    }

    let additionalCss = `
      background-color: ${parseVariables(
        cssVar("colors", this.color),
        cssVar("colors", this.color, 200),
        this.color,
        cssVar("colors", this.themeColor, 200),
        cssVar("colors", "white", 200),
      )};
      
      padding: ${parseVariables(
        cssVar("padding", this.padding),
        cssVar("padding", this.size),
      )};

      margin: ${parseVariables(
        cssVar("margin", this.margin),
        cssVar("margin", this.size),
      )};
      `;

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
      ${parseThemeToCssVariables(this.theme?.components?.divider, "div")}

      <style>
        div {
          ${additionalCss};
        }
      </style>
      <div></div>
    `;
  }

  static styles = css`
    div {
      box-sizing: border-box;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-divider": Divider;
  }
}
