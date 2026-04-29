import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
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

export class Textarea extends LitElement {
  static registeredName = "ssk-textarea";

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

  // textarea specific
  @property({ type: String })
  label: string | undefined;

  @property({ type: String })
  helperText: string | undefined;

  @property({ type: String })
  name: string | undefined;

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

  @property({ type: Number })
  rows = 2;

  @property({ type: Number })
  limit?: number;

  @property({ type: Boolean })
  error = false;

  @property({ type: Boolean })
  required = false;

  @property({ type: String })
  minHeight?: string | undefined;
  @property({ type: String })
  minWidth?: string | undefined;

  @property({ type: String })
  resize: "none" | "both" | "horizontal" | "vertical" = "both";

  updateValue(e: any, redispatch: boolean = false) {
    this.value = e.srcElement.value;
    if (redispatch) {
      redispatchEvents(e, this);
    }
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.textarea, ":host")}

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

          --width: ${parseVariables(cssVar("width", this.width), "auto")};

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
          --min-height: ${parseVariables(cssVar("min-height", this.minHeight))};
          --min-width: ${parseVariables(cssVar("min-width", this.minWidth))};
          --resize: ${this.resize};
        }
      </style>

      <div class="container ${this.error ? "error" : ""}">
        <label for="textarea">
          ${this.label} ${this.required ? html`<span>*</span>` : nothing}
        </label>
        <textarea
          id="textarea"
          data-testid=${this.testId || nothing}
          placeholder=${this.placeholder || ""}
          name=${this.name || ""}
          .value=${this.value || ""}
          ?disabled=${this.disabled}
          @input=${this.updateValue}
          @change=${(e: any) => this.updateValue(e, true)}
          rows=${this.rows}
          maxlength=${this.limit!}
        ></textarea>
        <div class="footer ${this.helperText || this.limit ? "" : "hidden"}">
          <label
            class="helper"
            data-testid=${this.testId
              ? `${this.testId}.error-message`
              : nothing}
          >
            ${this.helperText}
          </label>
          <label class="helper ${this.limit ? "" : "hidden"}">
            (${this.value?.length || 0}/${this.limit})
          </label>
        </div>
      </div>
    `;
  }

  static styles = css`
    div,
    label,
    textarea {
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

    div.container > label > span {
      color: red;
    }

    textarea {
      display: grid;
      grid-template-areas: "prefix textarea postfix";
      grid-template-columns: auto 1fr auto;
      overflow: auto;
      align-items: center;
      padding: 0.25em 0.5em;
      /* margin: 0.125em 0; */

      border-style: solid;
      transition: background-color 0.2s ease-in-out;
      background-color: var(--background-color);

      border-radius: var(--rounded);
      border: 1px solid var(--border-color);

      gap: var(--gap);
      min-height: var(--min-height);
      min-width: var(--min-width);
      resize: var(--resize);
    }

    textarea:disabled {
      background-color: var(--background-color-disabled);
      border-color: var(--border-color-disabled);
      color: var(--color-disabled);
    }

    textarea:focus {
      border-color: var(--border-color-active);
      outline: 4px solid var(--outline-color-active);
    }

    .footer {
      display: flex;
      justify-content: space-between;
    }

    label.helper {
      font-size: 0.75em;
      line-height: 0.75em;
      font-weight: var(--font-weight-normal, 400);
      color: var(--color-helper);
    }

    .error {
      textarea {
        border-color: var(--border-color-error);
        outline: 4px solid var(--outline-color-error);
      }

      label.helper {
        color: var(--color-helper-error);
      }
    }

    .hidden {
      display: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-textarea": Textarea;
  }
}

if (!customElements.get("ssk-textarea")) {
  customElements.define("ssk-textarea", Textarea);
}
