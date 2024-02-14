import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { redispatchEvents } from "../../helpers/lit";
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
export class Input extends LitElement {
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

  @property({ type: String })
  status: "error" | "success" | undefined;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  hidden = false;

  @property({ type: Boolean })
  error = false;

  @property({ type: Number })
  limit: number | undefined;

  @property({ type: Boolean })
  showLimit = false;

  @property({ type: Boolean })
  required = false;

  @property({ type: String })
  autoComplete: "on" | "off" = "on";

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
            cssVar("colors", this.color, 700),
            this.color,
            cssVar("colors", "text", 700),
          )};
          --color-disabled: ${parseVariables(cssVar("colors", "text", 300))};

          --color-helper: ${parseVariables(
            cssVar("colors", this.color),
            cssVar("colors", this.color, 300),
            this.color,
            cssVar("colors", "text", 300),
          )};

          --background-color-disabled: ${parseVariables(
            cssVar("colors", "border", 50),
          )};

          --border-color: ${parseVariables(cssVar("colors", "border", 100))};
          --border-color-active: ${parseVariables(
            cssVar("colors", this.themeColor, 600),
          )};
          --border-color-disabled: ${parseVariables(
            cssVar("colors", "border", 100),
          )};

          --outline-color-active: ${parseVariables(
            cssVar("colors", this.themeColor, 200),
          )};

          --font-family: ${parseVariables(
            cssVar("font-family", this.fontFamilyGroup),
          )};
          --font-weight: ${parseVariables(
            cssVar("font-weight", this.fontWeight),
          )};
          --font-size: ${parseVariables(cssVar("font-size", this.size))};
          --line-height: ${parseVariables(cssVar("font-size", this.size))};

          --gap: ${parseVariables(cssVar("spacing", this.size))};
          --rounded: ${parseVariables(cssVar("rounded", this.size))};

          --color-error: ${parseVariables(cssVar("colors", "error", 600))};
          --color-helper-error: ${parseVariables(
            cssVar("colors", "error", 600),
          )};
          --border-color-error: ${parseVariables(
            cssVar("colors", "error", 600),
          )};
          --outline-color-error: ${parseVariables(
            cssVar("colors", "error", 300),
          )};

          --width: ${parseVariables(cssVar("width", this.width), "auto")};
        }
      </style>

      <div class="container ${this.error ? "error" : ""}">
        <label for="input">
          ${this.label} ${this.required ? html`<span>*</span>` : nothing}</label
        >
        <div class=${`input-container ${this.disabled ? "disabled" : ""}`}>
          <slot name="prefix" class="prefix-control"></slot>
          <input
            id="input"
            data-testid=${this.testId || nothing}
            maxlength=${this.limit}
            placeholder=${this.placeholder || ""}
            name=${this.name || ""}
            .value=${this.value || ""}
            ?disabled=${this.disabled}
            autocomplete=${this.autoComplete}
            .type=${this.type}
            @input=${this.updateValue}
            @change=${this.updateValue}
          />
          <slot name="postfix" class="postfix-control"></slot>
        </div>
        <div
          class="footer ${this.helperText || this.showLimit ? "" : "hidden"}"
        >
          ${this.helperText
            ? html`<label class="helper">${this.helperText}</label>`
            : nothing}
          ${this.showLimit
            ? html`<label class="helper"
                >(${this.value?.length || 0}/${this.limit})</label
              >`
            : nothing}
        </div>
      </div>
    `;
  }

  updateValue(e: any) {
    this.value = e.srcElement.value;
    redispatchEvents(e, this);
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

    div.container {
      display: flex;
      flex-direction: column;
      width: var(--width);
      gap: 0.25em;
    }

    div.input-container {
      display: grid;
      grid-template-areas: "prefix input postfix";
      grid-template-columns: auto 1fr auto;
      overflow: hidden;
      align-items: center;

      border-style: solid;
      transition: background-color 0.2s ease-in-out;
      background-color: var(--background-color);

      border-radius: var(--rounded);
      border: 1px solid var(--border-color);

      gap: var(--gap);
    }

    div.input-container.disabled {
      background-color: var(--background-color-disabled);
      border-color: var(--border-color-disabled);
      color: var(--color-disabled);
    }

    div.input-container:focus-within {
      border-color: var(--border-color-active);
      outline: 4px solid var(--outline-color-active);
    }

    slot[name="prefix"] {
      grid-area: prefix;
    }

    slot[name="postfix"] {
      grid-area: postfix;
    }

    input {
      grid-area: input;
      display: flex;
      align-items: center;
      justify-content: center;

      /* remove all style */
      border: none;
      outline: none;
      background-color: transparent;
      padding: 0.25em 0;
      margin: 0;
    }

    input:disabled {
      background-color: var(--background-color-disabled);
      border-color: var(--border-color-disabled);
      cursor: not-allowed;
      color: var(--color-disabled);
    }

    .footer {
      display: flex;
      justify-content: space-between;
    }

    div.container > label > span {
      color: red;
    }

    label.helper {
      font-size: 0.75em;
      line-height: 0.75em;
      font-weight: 200;
      color: var(--color-helper);
    }

    .error {
      div.input-container {
        border-color: var(--border-color-error);
        outline: 4px solid var(--outline-color-error);
      }

      label.helper {
        color: var(--color-helper-error);
      }
    }

    div.input-control {
      padding-left: 2em;
      padding-right: 2em;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-input": Input;
  }
}
