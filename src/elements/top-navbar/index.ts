import { consume } from "@lit-labs/context";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ThemeValue } from "../../types/base-attributes";
import { themeContext } from "../../contexts/theme";
import { Size, Theme, parseThemeToCssVariables } from "../../types/theme";
import {
  ColorName,
  ColorRole,
  FontFamilyGroup,
  FontWeight,
  cssVar,
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
    let additionalCss = `
    --color: ${parseVariables(cssVar("colors", this.color), this.color)};
    --font-family: ${parseVariables(
      cssVar("font-family", this.fontFamilyGroup),
    )};
    --font-weight: ${parseVariables(cssVar("font-weight", this.fontWeight))};
    --font-size: ${parseVariables(
      cssVar("font-size", this.fontSize),
      cssVar("font-size", this.size),
    )};
    --padding: ${parseVariables(
      cssVar("padding", this.padding),
      cssVar("padding", this.size),
    )};
    --margin: ${parseVariables(cssVar("margin", this.margin))};
    --gap: ${parseVariables(
      cssVar("spacing", this.gap),
      cssVar("padding", this.size),
    )};
    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.topNavbar, ":host")}
      <style>
        :host {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: space-between;
          align-items: center;
          ${additionalCss};
        }
      </style>

      <div class="left-container">
        <slot name="left-slot"></slot>
      </div>
      <div class="center-container">
        <slot name="center-slot"></slot>
      </div>
      <div class="right-container">
        <slot name="right-slot"></slot>
      </div>
    `;
  }

  static styles = css`
    .left-container,
    .center-container,
    .right-container {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: var(--padding);
      margin: var(--margin);
      gap: var(--gap);
      color: var(--color);
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
    }

    .center-container {
      flex: 1;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-top-navbar": TopNavbar;
  }
}
