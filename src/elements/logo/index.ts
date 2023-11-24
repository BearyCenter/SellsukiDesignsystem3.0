import { LitElement, css, html, nothing } from "lit";
import { ThemeValue } from "../../types/base-attributes";
import { themeContext } from "../../contexts/theme";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit-labs/context";
import {
  Size,
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";
import { ifDefined } from "lit/directives/if-defined.js";

@customElement("ssk-logo")
export class Logo extends LitElement implements ThemeValue {
  static registeredName = "ssk-logo";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // ThemeValue
  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  themeColor: string = "primary";
  @property({ type: String })
  borderColor?: string;
  @property({ type: String })
  margin?: string;
  @property({ type: String })
  borderWidth?: string;
  @property({ type: String })
  width?: string | undefined;
  @property({ type: String })
  height?: string | undefined;

  @property({ type: String })
  boxSize?: string | undefined;
  @property({ type: Boolean })
  hidden = false;

  // Avatar Attributes
  @property({ type: String })
  src?: string;
  @property({ type: String })
  alt?: string;

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = `
    width: ${parseVariables(
      cssVar("width", this.width),
      cssVar("width", this.size),
      this.width,
      this.boxSize,
      "auto",
    )};
    height: ${parseVariables(
      cssVar("height", this.height),
      cssVar("height", this.size),
      this.height,
      this.boxSize,
      "auto",
    )};
    --margin: ${parseVariables(cssVar("margin", this.margin))};
    border-width:  ${parseVariables(
      cssVar("border-width", this.borderWidth),
      this.borderWidth,
      "0px",
    )};
    border-color: ${parseVariables(
      cssVar("border-color", this.borderColor),
      this.borderColor,
      "transparent",
    )};
    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.logo, "logo")}
      <style>
        img{
          ${additionalCss};
        }
      </style>
      ${this.src
        ? html`
            <img src="${ifDefined(this.src)}" alt="${ifDefined(this.alt)}" />
          `
        : nothing}
    `;
  }

  static styles = css`
    img {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin: var(--margin);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-logo": Logo;
  }
}
