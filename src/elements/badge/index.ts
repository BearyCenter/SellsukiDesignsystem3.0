import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import {
  BadgeVariants,
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

@customElement("ssk-badge")
export class Badge extends LitElement {
  static registeredName = "ssk-badge";

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
  size: Size = "md";
  @property({ type: String })
  rounded?: string | undefined;

  // font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  @property({ type: String })
  width?: string | undefined;

  // button specific
  @property({ type: String })
  variant: BadgeVariants = "solid";
  @property({ type: Boolean })
  hidden = false;

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = `
      --font-size: ${parseVariables(cssVar("font-size", this.size), "1rem")};
      --font-family: ${parseVariables(
        cssVar("font-family", this.fontFamilyGroup),
      )};
      --font-weight: ${parseVariables(cssVar("font-weight", this.fontWeight))};

      --rounded: ${parseVariables(cssVar("rounded", this.rounded), "9999px")};
    `;

    switch (this.variant) {
      case "solid":
        additionalCss += `
        --background-color: ${parseVariables(
          cssVar("colors", this.themeColor, 500),
        )};
        --border-color: ${parseVariables(
          cssVar("colors", this.themeColor, 500),
        )};
        --border-width: 0px;

        --color: ${parseVariables(
          cssVar("colors", this.color, 200),
          cssVar("colors", this.color),
          this.color,
          cssVar("colors", "white", 100),
        )};
          `;
        break;

      case "outline":
        additionalCss += `
        --background-color: ${parseVariables(cssVar("colors", "white", 100))};
        --border-color: ${parseVariables(
          cssVar("colors", this.themeColor, 500),
        )};
        --border-width: 1px;

        --color: ${parseVariables(cssVar("colors", this.themeColor, 500))};
          `;
        break;

      case "subtle":
        additionalCss += `
        --background-color: ${parseVariables(
          cssVar("colors", this.themeColor, 50),
        )};
        --border-color: ${parseVariables(
          cssVar("colors", this.themeColor, 100),
        )};
        --border-width: 1px;

        --color:  ${parseVariables(cssVar("colors", this.themeColor, 500))};
          `;
        break;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.badge, ":host")}

      <style>
        span {
          ${additionalCss};
        }
      </style>

      <span data-testid=${this.testId || nothing}>
        <slot></slot>
      </span>
    `;
  }

  static styles = css`
    span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.25em;

      background-color: var(--background-color);
      color: var(--color);

      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);

      border-style: solid;
      border-radius: var(--rounded);
      border-color: var(--border-color);
      border-width: var(--border-width);

      padding: 0 0.5em;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-badge": Badge;
  }
}
