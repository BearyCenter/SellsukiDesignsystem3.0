import { consume } from "@lit-labs/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { themeContext } from "../../contexts/theme";
import { ThemeValue } from "../../types/base-attributes";
import {
  FontFamilyGroup,
  FontWeight,
  Size,
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";

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
  padding?: Size;

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
  label?: string;
  @property({ type: String })
  alt?: string;
  @property({ type: String })
  shape?: "circle" | "rounded" = "rounded";
  @property({ type: String })
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down" | undefined;

  private initialism = (label: string) => {
    if (!label) {
      return "?";
    }

    if (label.length <= 2) {
      return label.toUpperCase();
    }

    // Split the name into words
    const words = name.split(" ");

    // Get the initials of each word
    const initials = words.map((word) => word.charAt(0).toUpperCase());

    // Concatenate the initials to form the shortened name
    const shortenedName = initials.join("");

    return shortenedName;
  };

  render() {
    if (this.hidden) {
      return nothing;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.avatar, ":host")}
      <style>
        :host {
          --padding: ${parseVariables(
            cssVar("padding", this.padding),
            this.padding,
            cssVar("padding", this.size)
          )};

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

          --color: ${parseVariables(cssVar("colors", this.color), this.color)};
          --background-color: ${parseVariables(
            cssVar("colors", this.themeColor, 500)
          )};
          --width: ${parseVariables(cssVar("width", this.size), "auto")};

          --border-radius: ${this.shape === "circle" ? "50%" : "8px"};

          --object-fit: ${this.objectFit};
        }
      </style>
      <span>
        ${this.src
          ? html`<img
              src="${ifDefined(this.src)}"
              alt="${ifDefined(this.alt)}"
            />`
          : html`<div>${this.initialism(this.label)}</div>`}
      </span>
    `;
  }

  static styles = css`
    :host {
      display: inline-block;
      overflow: hidden;
    }

    span {
      display: inline-block;
      overflow: hidden;
      aspect-ratio: auto 1/1;
      width: var(--width);
      padding: var(--padding);
      border-radius: var(--border-radius);
    }

    img,
    div {
      width: 100%;
      height: 100%;
    }

    img {
      object-fit: var(--object-fit);
    }

    div {
      display: grid;
      place-items: center;
      background-color: var(--background-color);
      color: var(--color);
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      word-wrap: break-word;
      text-overflow: clip;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-avatar": Avatar;
  }
}
