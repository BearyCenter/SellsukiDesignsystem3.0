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

type Type = "default" | "info" | "error" | "warning" | "success";
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
  fontWeight: FontWeight = "normal";
  @property({ type: String })
  fontSize?: string | undefined;

  // Alert attributes
  @property({ type: Boolean })
  hidden = false;
  @property({ type: String })
  type: Type = "default";

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = `
    --margin: ${parseVariables(
      cssVar("margin", this.margin),
      cssVar("padding", this.size),
    )};
    --padding: ${parseVariables(
      cssVar("padding", this.padding),
      cssVar("padding", this.size),
    )};
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
        <div class="alert-header">dddd</div>
        <div class="alert-description">ddddsssssssssdd</div>
      </div>
    `;
  }

  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: var(--width);
      height: auto;
      margin: var(--margin);
      padding: var(--padding);
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
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
