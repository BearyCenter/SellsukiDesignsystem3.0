import { consume } from "@lit-labs/context";
import { LitElement, TemplateResult, css, html, nothing } from "lit";
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

const levelToSize: Record<1 | 2 | 3 | 4 | 5, Size> = {
  1: "4xl",
  2: "3xl",
  3: "2xl",
  4: "xl",
  5: "lg",
};

/**
 * @slot - This element has a slot
 * @csspart text
 */
@customElement("ssk-heading")
export class Heading extends LitElement implements ThemeValue {
  static registeredName = "ssk-heading";

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

  @property({ type: Number })
  level: 1 | 2 | 3 | 4 | 5 = 1;

  static headings: Record<1 | 2 | 3 | 4 | 5, TemplateResult> = {
    1: html`<h1><slot /></h1>`,
    2: html`<h2><slot /></h2>`,
    3: html`<h3><slot /></h3>`,
    4: html`<h4><slot /></h4>`,
    5: html`<h5><slot /></h5>`,
  };

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = `
    --font-family: ${parseVariables(
      cssVar("font-family", this.fontFamilyGroup),
    )};
    --font-weight: ${parseVariables(cssVar("font-weight", this.fontWeight))};
    --font-size: ${parseVariables(
      cssVar("font-size", this.fontSize),
      cssVar("font-size", this.size),
    )};
    --line-height: ${parseVariables(
      cssVar("line-height", this.lineHeight),
      cssVar("font-size", this.size),
    )};

    --padding: ${parseVariables(
      cssVar("padding", this.padding),
      cssVar("padding", this.size),
    )};
    --margin: ${parseVariables(
      cssVar("margin", this.margin),
      cssVar("margin", this.size),
    )};
    `;

    if (this.italic) {
      additionalCss += "font-style: italic;";
    }

    let textDecorations = [];
    if (this.underline) {
      textDecorations.push("underline");
    }
    if (this.strike) {
      textDecorations.push("line-through");
    }
    if (textDecorations.length > 0) {
      additionalCss += `text-decoration: ${textDecorations.join(" ")};`;
    }

    if (this.transform) {
      additionalCss += `text-transform: ${this.transform};`;
    }

    if (this.align) {
      additionalCss += `text-align: ${this.align};`;
    }

    this.size = levelToSize[this.level];

    return html`
      ${parseThemeToCssVariables(
        this.theme?.components?.heading,
        "h1, h2, h3, h4, h5",
      )}

      <style>
        h1, h2, h3, h4, h5 {
          ${additionalCss};
        }
      </style>

      ${Heading.headings[this.level]}
    `;
  }

  static styles = css`
    h1,
    h2,
    h3,
    h4,
    h5 {
      background-color: var(--background-color);
      color: var(--color);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
      padding: var(--padding);
      margin: var(--margin);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-heading": Heading;
  }
}
