import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import {
  ButtonVariants,
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
 * @csspart button - The button
 */
@customElement("ssk-button")
export class Button extends LitElement {
  static registeredName = "ssk-button";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  // ThemeValue
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
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

  // button specific
  @property({ type: String })
  variant: ButtonVariants = "solid";
  @property({ type: Boolean })
  disabled = false;
  @property({ type: Boolean })
  hidden = false;

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

      --gap: ${parseVariables(
        cssVar("spacing", this.gap),
        cssVar("spacing", this.size)
      )};
      --padding: ${parseVariables(
        cssVar("padding", this.padding),
        cssVar("padding", this.size)
      )};
      --margin: ${parseVariables(
        cssVar("margin", this.margin),
        cssVar("margin", this.size)
      )};

      --rounded: ${parseVariables(
        cssVar("rounded", this.rounded),
        cssVar("rounded", this.size)
      )};

      --border-width: ${parseVariables(
        cssVar("border-width", this.borderWidth),
        "1px"
      )};

    `;

    switch (this.variant) {
      case "solid":
        additionalCss += `
        --background-color: ${parseVariables(
          cssVar("colors", this.themeColor, 500)
        )};
        --background-color-hover: ${parseVariables(
          cssVar("colors", this.themeColor, 700)
        )};
        --background-color-active: ${parseVariables(
          cssVar("colors", this.themeColor, 600)
        )};
        --background-color-disabled: ${parseVariables(
          cssVar("colors", "gray", 100)
        )};
        --color: ${parseVariables(
          cssVar("colors", this.color, 200),
          cssVar("colors", this.color),
          this.color,
          cssVar("colors", "white", 200)
        )};
        --color-hover: var(--color);
        --color-active: var(--color);
        --color-disabled: ${parseVariables(cssVar("colors", "gray", 400))};

        --border-color: ${parseVariables(
          cssVar("colors", this.themeColor, 500)
        )};
        --border-color-disabled: var(--background-color-disabled);
        --border-width: 0px;
          `;
        break;

      case "outline":
        additionalCss += `
        --background-color: ${parseVariables(cssVar("colors", "white", 200))};
        --background-color-hover: ${parseVariables(
          cssVar("colors", "white", 200)
        )};
        --background-color-active: ${parseVariables(
          cssVar("colors", "white", 200)
        )};
        --background-color-disabled: ${parseVariables(
          cssVar("colors", "white", 200)
        )};
        --color: ${parseVariables(cssVar("colors", this.themeColor, 500))};
        --color-hover: ${parseVariables(
          cssVar("colors", this.themeColor, 700)
        )};
        --color-active: ${parseVariables(
          cssVar("colors", this.themeColor, 600)
        )};
        --color-disabled: ${parseVariables(cssVar("colors", "gray", 400))};

        --border-color: ${parseVariables(
          cssVar("colors", this.themeColor, 500)
        )};
        --border-color-disabled: ${parseVariables(
          cssVar("colors", "gray", 400)
        )};
        --border-width: 1px;
          `;
        break;

      case "ghost":
        additionalCss += `
        --background-color: transparent;
        --background-color-hover: ${parseVariables(
          cssVar("colors", this.themeColor, 200)
        )};
        --background-color-active: ${parseVariables(
          cssVar("colors", this.themeColor, 100)
        )};
        --background-color-disabled: ${parseVariables(
          cssVar("colors", "white", 200)
        )};
        --color: ${parseVariables(cssVar("colors", this.themeColor, 500))};
        --color-hover: ${parseVariables(
          cssVar("colors", this.themeColor, 700)
        )};
        --color-active: ${parseVariables(
          cssVar("colors", this.themeColor, 600)
        )};
        --color-disabled: ${parseVariables(cssVar("colors", "gray", 400))};

        --border-color: ${parseVariables(
          cssVar("colors", this.themeColor, 500)
        )};
        --border-color-disabled: ${parseVariables(
          cssVar("colors", "gray", 400)
        )};
        --border-width: 0px;
          `;
        break;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.button, "button")}

      <style>
        button {
          ${additionalCss};
        }
      </style>

      <button data-testid=${this.testId || nothing} .disabled=${this.disabled}>
        <slot name="prefix"></slot>
        <slot></slot>
        <slot name="postfix"></slot>
      </button>
    `;
  }

  static styles = css`
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      border-style: solid;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      background-color: var(--background-color);
      color: var(--color);
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
      padding: var(--padding);
      margin: var(--margin);
      gap: var(--gap);
      border-radius: var(--rounded);
      border-color: var(--border-color);
      border-width: var(--border-width);
    }

    button:hover:enabled {
      background-color: var(--background-color-hover);
      color: var(--color-hover);
    }

    button:active:enabled {
      background-color: var(--background-color-active);
      color: var(--color-active);
    }

    button:disabled {
      cursor: not-allowed;
      background-color: var(--background-color-disabled);
      color: var(--color-disabled);
      border-color: var(--border-color-disabled);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-button": Button;
  }
}
