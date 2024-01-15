import { consume } from "@lit/context";
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

@customElement("ssk-top-navbar")
export class TopNavbar extends LitElement implements ThemeValue {
  static registeredName = "ssk-top-navbar";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // ThemeValue
  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  color?: ColorRole | ColorName;
  @property({ type: String })
  margin?: string | undefined;
  @property({ type: String })
  padding?: Size;
  @property({ type: String })
  gap?: string | undefined = "md";

  // Font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight: FontWeight = "normal";
  @property({ type: String })
  fontSize?: string | undefined;

  render() {
    return html`
      ${parseThemeToCssVariables(this.theme?.components?.topNavbar, ":host")}
      <style>
        :host {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: space-between;
          align-items: center;

          --color: ${parseVariables(cssVar("colors", this.color), this.color)};
          --font-family: ${parseVariables(
            cssVar("font-family", this.fontFamilyGroup)
          )};
          --font-weight: ${parseVariables(
            cssVar("font-weight", this.fontWeight)
          )};
          --font-size: ${parseVariables(
            cssVar("font-size", this.fontSize),
            cssVar("font-size", this.size)
          )};
          --margin: ${parseVariables(cssVar("margin", this.margin))};
          --gap: ${parseVariables(
            cssVar("spacing", this.gap),
            cssVar("padding", this.size)
          )};

          --border-color: ${parseVariables(cssVar("colors", "gray", 200))};
          --gap: ${parseVariables(cssVar("spacing", this.gap))};
        }
      </style>

      <div class="container">
        <span><slot name="left"></slot></span>
        <span><slot></slot></span>
        <span><slot name="right"></slot></span>
      </div>
    `;
  }

  static styles = css`
    .container {
      display: grid;
      grid-template-columns: auto 1fr auto;

      width: 100%;
      gap: var(--gap);
      padding: 12px;
      margin: var(--margin);
      gap: var(--gap);
      color: var(--color);
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);

      border-bottom: 1px solid var(--border-color);
    }

    span {
      display: flex;
      align-items: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-top-navbar": TopNavbar;
  }
}
