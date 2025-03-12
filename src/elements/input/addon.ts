import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { BaseAttributes, ThemeValue } from "../../types/base-attributes";
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

@customElement("ssk-input-addon")
export class InputAddon
  extends LitElement
  implements ThemeValue, BaseAttributes
{
  static registeredName = "ssk-input-addon";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  // ThemeValue
  @property({ type: String })
  themeColor?: ColorRole | ColorName;
  @property({ type: String })
  color?: ColorRole | ColorName = "inherit";

  @property({ type: String })
  size: Size = "md";

  // font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  @property({ type: String })
  width?: string | undefined;

  // input specific
  @property({ type: String })
  label: string | undefined;

  @property({ type: String })
  helperText: string | undefined;

  @property({ type: String })
  name: string | undefined;

  @property({ type: String })
  type: "text" | "number" | "password" | "email" | "tel" | "url" = "text";

  @property({ type: String })
  value: string | undefined;

  @property({ type: String })
  placeholder: string | undefined;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  hidden = false;

  get hasPrefix(): boolean {
    return this.getAttribute("slot") === "prefix";
  }

  get hasPostfix(): boolean {
    return this.getAttribute("slot") === "postfix";
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.input, ":host")}

      <style>
        :host {
          --color: ${parseVariables(
            cssVar("colors", this.color),
            cssVar("colors", "text", 400),
            this.color,
          )};

          --background-color: ${parseVariables(
            cssVar("colors", this.themeColor, 500),
          )};
          --background-color-disabled: ${parseVariables(
            cssVar("colors", "text", 50),
          )};

          --font-family: ${parseVariables(
            cssVar("font-family", this.fontFamilyGroup),
          )};
          --font-weight: ${parseVariables(
            cssVar("font-weight", this.fontWeight),
          )};
          --font-size: ${parseVariables(cssVar("font-size", this.size))};
          --line-height: ${parseVariables(cssVar("font-size", this.size))};
          --rounded: ${parseVariables(cssVar("rounded", this.size))};
        }
      </style>

      <div
        class="addon ${this.hasPrefix ? "prefix" : ""} ${this.hasPostfix
          ? "postfix"
          : ""}"
      >
        <slot class="prefix-control"></slot>
      </div>
    `;
  }

  static styles = css`
    :host {
      height: 100%;
    }

    div.addon {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--background-color);
      color: var(--color);
      height: 100%;
      padding: 0 0.333em;
    }

    div.prefix {
      border-top-left-radius: var(--rounded);
      border-bottom-left-radius: var(--rounded);
    }

    div.postfix {
      border-top-right-radius: var(--rounded);
      border-bottom-right-radius: var(--rounded);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-input-addon": InputAddon;
  }
}
