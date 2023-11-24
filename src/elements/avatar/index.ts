import { LitElement, css, html, nothing } from "lit";
import { ThemeValue } from "../../types/base-attributes";
import { themeContext } from "../../contexts/theme";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit-labs/context";
import {
  FontFamilyGroup,
  FontWeight,
  Size,
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";
import { ifDefined } from "lit/directives/if-defined.js";

@customElement("ssk-avatar")
export class Avatar extends LitElement implements ThemeValue {
  static registeredName = "ssk-avatar";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // ThemeValue
  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  themeColor: string = "primary";
  @property({ type: String })
  color?: string;
  @property({ type: String })
  backgroundColor?: string;
  @property({ type: String })
  borderColor?: string;
  @property({ type: String })
  margin?: string;
  @property({ type: String })
  padding?: Size;
  @property({ type: String })
  rounded?: string;
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

  // Font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight: FontWeight = "normal";
  @property({ type: String })
  fontSize?: string | undefined;

  // Avatar Attributes
  @property({ type: String })
  src?: string;
  @property({ type: String })
  initials?: string;
  @property({ type: String })
  alt?: string;
  @property({ type: String })
  shape?: "circle" | "rounded" = "rounded";
  @property({ type: String })
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down" | undefined;

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
    --color: ${parseVariables(cssVar("colors", this.color), this.color)};
    --background-color: ${parseVariables(
      cssVar("colors", this.backgroundColor),
      this.backgroundColor,
    )};
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
    border-radius: ${
      this.shape === "circle"
        ? "50%"
        : parseVariables(cssVar("rounded", this.rounded), "8px")
    };
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
    object-fit: ${this.objectFit};
    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.avatar, "img,div")}
      <style>
        img,div{
          ${additionalCss};
        }
      </style>
      ${this.src
        ? html`
            <img src="${ifDefined(this.src)}" alt="${ifDefined(this.alt)}" />
          `
        : html` <div>${this.initials}</div>`}
    `;
  }

  static styles = css`
    :host {
      display: inline-block;
      overflow: hidden;
    }

    img,
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    img {
      margin: var(--margin);
      color: var(--color);
    }

    div {
      text-align: center;
      background-color: var(--background-color);
      color: var(--color);
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      word-wrap: break-word;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-avatar": Avatar;
  }
}
