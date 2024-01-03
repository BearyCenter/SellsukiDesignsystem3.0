import { consume } from "@lit-labs/context";
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

@customElement("ssk-container")
export class Container extends LitElement {
  static registeredName = "ssk-container";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  // ThemeValue
  @property({ type: String })
  themeColor: ColorRole | ColorName = "background";
  @property({ type: String })
  color?: ColorRole | ColorName;
  @property({ type: String })
  backgroundColor?: ColorRole | ColorName;

  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  rounded?: string | undefined;

  @property({ type: String })
  borderWidth?: string | undefined;
  @property({ type: String })
  borderColor?: ColorRole | ColorName | undefined;
  @property({ type: String })
  borderStyle?: string | undefined;

  // font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  @property({ type: String })
  width?: string | undefined;
  @property({ type: String })
  height?: string | undefined;

  @property({ type: String })
  padding?: Size;

  @property({ type: String })
  variant: BadgeVariants = "solid";
  @property({ type: Boolean })
  hidden = false;

  @property({ type: String })
  cursor?: string | undefined;

  @property({ type: String })
  align?: "center" | "start" | "end" = "center";
  @property({ type: String })
  gap?: string | undefined;

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = html`
      <style>
        div {
          --font-size: ${parseVariables(
            cssVar("font-size", this.size),
            "1rem"
          )};
          --font-family: ${parseVariables(
            cssVar("font-family", this.fontFamilyGroup)
          )};
          --font-weight: ${parseVariables(
            cssVar("font-weight", this.fontWeight)
          )};

          --rounded: ${parseVariables(cssVar("rounded", this.rounded), "8px")};
          --cursor: ${parseVariables(this.cursor, "default")};

          --background-color: ${parseVariables(
            cssVar("colors", this.backgroundColor, 50),
            cssVar("colors", this.backgroundColor),
            this.backgroundColor,
            cssVar("colors", this.themeColor, 50)
          )};
          --border-color: ${parseVariables(
            cssVar("colors", this.borderColor, 400),
            cssVar("colors", this.borderColor),
            this.borderColor,
            cssVar("colors", this.themeColor, 400)
          )};
          --border-width: ${parseVariables(
            cssVar("border-width", this.borderWidth),
            "1px"
          )};
          --border-style: ${parseVariables(
            cssVar("border-style", this.borderStyle),
            "solid"
          )};

          --width: ${parseVariables(cssVar("width", this.width), "auto")};
          --height: ${parseVariables(cssVar("height", this.height), "auto")};

          --padding: ${parseVariables(
            cssVar("padding", this.padding),
            this.padding,
            "1em"
          )};

          --color: ${parseVariables(
            cssVar("colors", this.color, 800),
            cssVar("colors", this.color),
            this.color,
            "inherit"
          )};

          --gap: ${parseVariables(cssVar("gap", this.gap), "1em")};

          --align: ${this.align};
        }
      </style>
    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.container, ":host")}
      ${additionalCss}

      <div data-testid=${this.testId || nothing}>
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    div {
      display: flex;
      flex-direction: column;
      align-items: var(--align);
      justify-content: center;

      background-color: var(--background-color);
      color: var(--color);

      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);

      border-style: var(--border-style);
      border-radius: var(--rounded);
      border-color: var(--border-color);
      border-width: var(--border-width);

      cursor: var(--cursor);

      width: var(--width);
      height: var(--height);

      padding: var(--padding);
      gap: var(--gap);
    }
  `;
}

declare global {
  interface HTMLElementContainerNameMap {
    "ssk-container": Container;
  }
}
