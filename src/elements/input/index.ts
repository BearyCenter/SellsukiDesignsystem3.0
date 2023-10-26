import { consume } from "@lit-labs/context";
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

@customElement("ssk-input")
export class Input extends LitElement implements ThemeValue, BaseAttributes {
  static registeredName = "ssk-input";

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

  // Event
  @property({ attribute: false })
  onChange?: (event: Event) => void;

  render() {
    if (this.hidden) {
      return html``;
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
          --color-helper: ${parseVariables(
            cssVar("colors", this.color),
            cssVar("colors", "text", 300),
            this.color,
          )};

          --background-color-disabled: ${parseVariables(
            cssVar("colors", "text", 50),
          )};

          --outline-color: ${parseVariables(
            cssVar("colors", this.borderColor),
            cssVar("colors", "border", 200),
            this.borderColor,
          )};
          --outline-color-disabled: var(--background-color-disabled);
          --outline-color-active: ${parseVariables(
            cssVar("colors", this.borderColor),
            cssVar("colors", this.themeColor, 300),
            this.borderColor,
          )};

          --font-family: ${parseVariables(
            cssVar("font-family", this.fontFamilyGroup),
          )};
          --font-weight: ${parseVariables(
            cssVar("font-weight", this.fontWeight),
          )};
          --font-size: ${parseVariables(
            cssVar("font-size", this.fontSize),
            cssVar("font-size", this.size),
          )};
          --line-height: ${parseVariables(
            cssVar("line-height", this.lineHeight),
            cssVar("font-size", this.size),
          )};

          --gap: ${parseVariables(
            cssVar("spacing", this.gap),
            cssVar("spacing", this.size),
          )};
          --padding: ${parseVariables(
            cssVar("padding", this.padding),
            cssVar("padding", this.size),
          )};
          --margin: ${parseVariables(
            cssVar("margin", this.margin),
            cssVar("margin", this.size),
          )};

          --rounded: ${parseVariables(
            cssVar("rounded", this.rounded),
            cssVar("rounded", this.size),
          )};

          --border-width: ${parseVariables(
            cssVar("border-width", this.borderWidth),
            "1px",
          )};
        }
      </style>

      <div>
        <label for="input">${this.label}</label>
        <input
          id="input"
          data-testid=${this.testId || nothing}
          placeholder=${this.placeholder || ""}
          name=${this.name || ""}
          value=${this.value || ""}
          ?disabled=${this.disabled}
          type=${this.type}
          @change=${this.onChange}
        />
        ${this.helperText
          ? html`<label class="helper">${this.helperText}</label>`
          : nothing}
      </div>
    `;
  }

  static styles = css`
    div,
    label,
    input {
      color: var(--color);
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
    }

    div {
      padding: var(--padding);
      margin: var(--margin);
      gap: var(--gap);
    }

    input {
      display: flex;
      align-items: center;
      justify-content: center;
      border-style: solid;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      padding: 0.1em 0.5em;
      background-color: var(--background-color);

      border-radius: var(--rounded);
      outline-color: var(--outline-color);
      border-width: var(--border-width);
    }

    input:enabled {
      outline-color: var(--outline-color-active);
      outline-width: var(--border-width);
    }

    input:disabled {
      cursor: not-allowed;
      background-color: var(--background-color-disabled);
      color: var(--color-disabled);
      outline-color: var(--outline-color-disabled);
    }

    label.helper {
      font-size: 0.75em;
      line-height: 0.75em;
      font-weight: 200;
      color: var(--color-helper);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-input": Input;
  }
}
