import { LitElement, html, nothing, css } from "lit";
import { ThemeValue } from "../../types/base-attributes";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit-labs/context";
import { themeContext } from "../../contexts/theme";
import {
  Size,
  Theme,
  FontFamilyGroup,
  FontWeight,
  parseThemeToCssVariables,
  parseVariables,
  cssVar,
} from "../../types/theme";

export type Type = "default" | "info" | "error" | "warning" | "success";
@customElement("ssk-alert")
export class Alert extends LitElement implements ThemeValue {
  static registeredName = "ssk-alert";
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // ThemeValue
  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  margin?: string;
  @property({ type: String })
  padding?: Size;
  @property({ type: String })
  rounded?: string | undefined;
  @property({ type: String })
  width?: string | undefined;

  // Font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontSize?: string | undefined;

  // Alert attributes
  @property({ type: Boolean })
  hidden = false;
  @property({ type: String })
  type: Type = "default";
  @property({ type: String })
  message?: string | undefined;
  @property({ type: String })
  topic?: string | undefined;

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = `
    --margin: ${parseVariables(cssVar("margin", this.margin), "auto")};
    --padding: ${parseVariables(cssVar("padding", this.padding), "0.75em")};
    --border-color: ${parseVariables(
      cssVar("border-color", this.type, 500),
      cssVar("border-color", "gray", 200),
    )};
    --width: ${parseVariables(cssVar("width", this.width), "100%")};
    --rounded: ${parseVariables(cssVar("rounded", this.rounded), "8px")};
    --background-color: ${parseVariables(
      cssVar("border-color", this.type, 50),
      "#fff",
    )};
    --color: ${parseVariables(cssVar("colors", "gray", 500))};
    --font-family: ${parseVariables(
      cssVar("font-family", this.fontFamilyGroup),
    )};
    --font-size: ${parseVariables(
      cssVar("font-size", this.fontSize),
      cssVar("font-size", this.size),
    )};
    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.alert, ":host")}
      <style>
        div {${additionalCss}}
      </style>

      <div class="container">
        <div class="icon">
          <slot name="icon-slot"></slot>
        </div>
        <div class="detail">
          <div class="alert-title">${this.topic}</div>
          <div class="alert-message">${this.message}</div>
        </div>
      </div>
    `;
  }

  static styles = css`
    .detail {
      margin-left: 0.75rem;

      .alert-title,
      .alert-message {
        font-family: var(--font-family);
        font-size: var(--font-size);
      }

      .alert-message {
        color: var(--color);
      }

      .alert-title {
        font-weight: 500;
      }
    }
    .container {
      display: flex;
      width: var(--width);
      height: auto;
      margin: var(--margin);
      padding: var(--padding);
      border: 1px solid var(--border-color);
      border-radius: var(--rounded);
      background-color: var(--background-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-alert": Alert;
  }
}
