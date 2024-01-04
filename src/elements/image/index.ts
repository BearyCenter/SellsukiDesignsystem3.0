import { consume } from "@lit-labs/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
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

/**
 * @slot - This element has a slot
 * @csspart text
 */
@customElement("ssk-image")
export class Image extends LitElement implements ThemeValue {
  static registeredName = "ssk-image";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String })
  themeColor: ColorRole | ColorName = "";
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
  borderStyle?:
    | "solid"
    | "dashed"
    | "dotted"
    | "double"
    | "groove"
    | "ridge"
    | "inset"
    | "outset"
    | "none"
    | "hidden"
    | undefined;

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

  @property({ type: String })
  alt?: string | undefined;

  @property({ type: String })
  src?: string | undefined;

  @property({ type: String })
  fallbackSrc?: string | undefined;

  @property({ type: String })
  boxSize?: string | undefined;

  @property({ type: String })
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down" | undefined;

  onImageError() {
    this.src = this.fallbackSrc;
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = `
      --padding: ${parseVariables(
        cssVar("padding", this.padding),
        cssVar("padding", this.size)
      )};
      --margin: ${parseVariables(
        cssVar("margin", this.margin),
        cssVar("margin", this.size)
      )};

      width: ${parseVariables(
        cssVar("width", this.width),
        cssVar("width", this.size),
        this.width,
        this.boxSize,
        "auto"
      )};
      height: ${parseVariables(
        cssVar("height", this.height),
        cssVar("height", this.size),
        this.height,
        this.boxSize,
        "auto"
      )};

      object-fit: ${this.objectFit};

      border-radius: ${parseVariables(cssVar("rounded", this.rounded), "0px")};
      border-style: ${parseVariables(this.borderStyle, "solid")};
      border-width: ${parseVariables(
        cssVar("border-width", this.borderWidth),
        this.borderWidth,
        "0px"
      )};
      border-color: ${parseVariables(
        cssVar("border-color", this.borderColor),
        this.borderColor,
        "transparent"
      )};

    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.image, "img")}

      <style>
        :host {
          display: inherit;
        }

        img {
          ${additionalCss};
        }

        picture {
          height: 100%;
          width: 100%;
        }
      </style>

      <img
        src="${ifDefined(this.src)}"
        alt="${this.alt ?? this.src ?? ""}"
        @error="${this.onImageError}"
      />
    `;
  }

  static styles = css`
    img {
      padding: var(--padding);
      margin: var(--margin);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-image": Image;
  }
}
