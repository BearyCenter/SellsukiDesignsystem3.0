import { consume } from "@lit/context";
import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
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
 * Sellsuki Heading — DS 3.0
 *
 * Semantic heading text. Maps `size` to the `--font-size-h*` heading
 * tokens (44 / 36 / 28 / 24 / 20 px for h1–h5) and applies the matching
 * font weights. Use only for **real headings** — page title, modal
 * title, section title. For UI labels and body text use `<ssk-text>` so
 * the heading hierarchy stays meaningful for AT users.
 *
 * @example
 *   <ssk-heading size="3xl">ภาพรวมยอดขาย</ssk-heading>
 *   <ssk-heading size="2xl" color="background.900">รายละเอียดออเดอร์</ssk-heading>
 *
 * @slot - Heading text
 * @csspart text - The rendered heading element
 */
export class Heading extends LitElement {
  static registeredName = "ssk-heading";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String })
  themeColor: ColorRole | ColorName = "";
  @property({ type: String })
  color?: ColorRole | ColorName = "background.900";

  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  padding?: Size;
  @property({ type: String })
  fontSize?: string | undefined;
  @property({ type: String })
  lineHeight?: string | undefined;
  @property({ type: String })
  margin?: string | undefined;

  // font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight: FontWeight = "normal";

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
      cssVar("font-family", this.fontFamilyGroup)
    )};
    --font-weight: ${parseVariables(cssVar("font-weight", this.fontWeight))};
    --font-size: ${parseVariables(
      cssVar("font-size", this.fontSize),
      cssVar("font-size", this.size)
    )};
    --line-height: ${parseVariables(
      cssVar("line-height", this.lineHeight),
      cssVar("font-size", this.size)
    )};

    --padding: ${parseVariables(
      cssVar("padding", this.padding),
      cssVar("padding", this.size)
    )};
    --margin: ${parseVariables(
      cssVar("margin", this.margin),
      cssVar("margin", this.size)
    )};
    --color: ${parseVariables(
      cssVar("colors", this.color),
      cssVar("colors", this.themeColor),
      cssVar("colors", this.color, 700),
      this.color
    )}
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
        "h1, h2, h3, h4, h5"
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

if (!customElements.get("ssk-heading")) {
  customElements.define("ssk-heading", Heading);
}
