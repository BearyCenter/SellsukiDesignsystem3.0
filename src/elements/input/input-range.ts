import { consume } from "@lit/context";
import { css, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  ColorName,
  ColorRole,
  cssVar,
  FontFamilyGroup,
  FontWeight,
  parseThemeToCssVariables,
  parseVariables,
  Size,
  Theme,
  themeContext,
} from "../../main";

@customElement("ssk-input-range")
export class InputRange extends LitElement {
  static registeredName = "ssk-input-range";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String })
  testId?: string;

  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  @property({ type: String })
  color?: ColorRole | ColorName;
  @property({ type: String })
  backgroundColor?: string | undefined;

  @property({ type: String })
  size: Size = "md";

  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  @property({ type: String })
  width?: string | undefined;

  @property({ type: String })
  label: string | undefined;

  @property({ type: String })
  helperText: string | undefined;

  @property({ type: String })
  name: string | undefined;

  @property({ type: String })
  placeholder: string | undefined;

  @property({ type: Boolean })
  hidden = false;

  @property({ type: Number })
  limit?: number;

  @property({ type: Boolean })
  required = false;
  @property({ type: Boolean })
  disabled = false;
  @property({ type: String })
  minHeight?: string | undefined;
  @property({ type: String })
  minWidth?: string | undefined;
  @property({ type: String })
  valueFrom: string | undefined;
  @property({ type: String })
  valueTo: string | undefined;

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

          --color-helper: ${parseVariables(
            cssVar("colors", this.color),
            cssVar("colors", this.color, 300),
            this.color,
            cssVar("colors", "text", 300),
          )};

          --border-color: ${parseVariables(cssVar("colors", "border", 100))};
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
          --min-height: ${parseVariables(cssVar("min-height", this.minHeight))};
          --min-width: ${parseVariables(cssVar("min-width", this.minWidth))};

          --color-tag: ${parseVariables(
            cssVar("colors", this.themeColor, 500),
          )};
          --border-color-tag: ${parseVariables(
            cssVar("colors", this.themeColor, 100),
          )};
          --background-color-tag: ${parseVariables(
            cssVar("colors", this.themeColor, 50),
          )};
        }
      </style>

      <div class="container">
        <label for="input">
          ${this.label} ${this.required ? html`<span>*</span>` : nothing}
        </label>
        <div class=${`input-container ${this.disabled ? "disabled" : ""}`}>
          <slot name="prefix"></slot>
          <input
            id="input-from"
            data-testid=${this.testId || nothing}
            placeholder=${this.placeholder || ""}
            name=${this.name || ""}
            .value=${this.valueFrom || ""}
            ?disabled=${this.disabled}
            autocomplete="off"
          />
          <slot name="center"></slot>
          <input
            id="input-to"
            data-testid=${this.testId || nothing}
            placeholder=${this.placeholder || ""}
            name=${this.name || ""}
            .value=${this.valueTo || ""}
            ?disabled=${this.disabled}
            autocomplete="off"
          />
          <slot name="postfix"></slot>
        </div>
        <div class="footer ${this.helperText || this.limit ? "" : "hidden"}">
          <label class="helper">${this.helperText}</label>
        </div>
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

    div.container {
      display: flex;
      flex-direction: column;
      width: var(--width);
      gap: 0.25em;
    }

    div.container > label > span {
      color: red;
    }

    ::slotted([slot="prefix"]) {
      grid-area: prefix;
    }

    ::slotted([slot="postfix"]) {
      grid-area: postfix;
    }

    ::slotted([slot="center"]) {
      grid-area: center;
    }

    div.input-container {
      display: grid;
      grid-template-areas: "prefix input-from center input-to postfix";
      grid-template-columns: auto 1fr auto 1fr auto;
      overflow: hidden;
      align-items: center;
      border-style: solid;
      transition: background-color 0.2s ease-in-out;
      background-color: var(--background-color);

      border-radius: var(--rounded);
      border: 1px solid var(--border-color);

      gap: var(--gap);
    }

    input#input-from {
      grid-area: input-from;
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

    input#input-to {
      grid-area: input-to;
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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-input-range": InputRange;
  }
}
