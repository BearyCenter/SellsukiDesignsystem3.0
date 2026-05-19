import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
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

/**
 * Sellsuki Input — DS 3.0
 *
 * Text input field with token-driven styling. Renders an optional
 * `label`, `helperText`, and validation `error` / `success` state, plus
 * `prefix` / `postfix` slots for inline icons or units. Emits standard
 * `input` / `change` events; size respects the `--font-size-p` body
 * token so values never fall below DS 3.0's 18px minimum.
 *
 * Reach for `<ssk-input>` for any single-line text entry — search bars,
 * form fields, inline editors. For multi-line text use
 * `<ssk-textarea>`. For from-to ranges use `<ssk-input-range>`. For
 * fixed-affix labels (currency / domain prefix) wrap in
 * `<ssk-input-addon>`.
 *
 * @example
 *   <ssk-input
 *     label="ชื่อร้านค้า"
 *     placeholder="กรอกชื่อร้านค้า"
 *     helperText="ตั้งชื่อให้ลูกค้าจดจำได้ง่าย"
 *   ></ssk-input>
 *
 * @slot prefix  - Leading icon inside the field
 * @slot postfix - Trailing icon / clear button inside the field
 */
export class Input extends LitElement {
  static registeredName = "ssk-input";

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  /**
   * Stable `data-testid` attribute applied to the rendered `<input>` for E2E test selectors.
   */
  @property({ type: String })
  testId?: string;

  // ThemeValue
  /**
   * Brand accent applied to the focus ring and active border. Defaults to `primary`.
   */
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  /**
   * Override for the input text color. Falls back to `--text-primary` when unset.
   */
  @property({ type: String })
  color?: ColorRole | ColorName;
  /**
   * Override for the input field background. Falls back to `--bg-primary`.
   */
  @property({ type: String })
  backgroundColor?: string | undefined;

  /**
   * Visual size of the input — controls font size, padding, and border radius. Defaults to `md`.
   */
  @property({ type: String })
  size: Size = "md";

  // font
  /**
   * Font family group used for the input text. Defaults to `sans`.
   */
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  /**
   * Font weight for the input text. Defaults to `normal`.
   */
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  /**
   * Explicit width of the field (any CSS length, e.g. `"320px"` or `"100%"`). Defaults to `auto`.
   */
  @property({ type: String })
  width?: string | undefined;

  // input specific
  /**
   * Label rendered above the input. Pair with `required` to append a red asterisk.
   */
  @property({ type: String })
  label: string | undefined;

  /**
   * Helper or error text rendered below the input. Switches to error styling when `error` is set.
   */
  @property({ type: String })
  helperText: string | undefined;

  /**
   * Form-field `name` attribute submitted with the parent form.
   */
  @property({ type: String })
  name: string | undefined;

  /**
   * Native input type — `text`, `number`, `password`, `email`, `tel`, or `url`. Defaults to `text`.
   */
  @property({ type: String })
  type: "text" | "number" | "password" | "email" | "tel" | "url" = "text";

  /**
   * Current value of the field. Updated on every keystroke; bind two-way via `@input` / `@change`.
   */
  @property({ type: String })
  value: string | undefined;

  /**
   * Placeholder text shown when the field is empty.
   */
  @property({ type: String })
  placeholder: string | undefined;

  /**
   * Validation status — `error` or `success`. Drives footer color independently of `error`.
   */
  @property({ type: String })
  status: "error" | "success" | undefined;

  /**
   * When set, the field is non-interactive and rendered with disabled styling.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * When set, the element renders nothing (returns `nothing`) — use for conditional show/hide without DOM teardown.
   */
  @property({ type: Boolean })
  hidden = false;

  /**
   * When set, the input renders with red border and error-tinted helper text. Pair with `helperText` for the message.
   */
  @property({ type: Boolean })
  error = false;

  /**
   * Maximum number of characters accepted (maps to native `maxlength`). Combine with `showLimit` for a counter.
   */
  @property({ type: Number })
  limit: number | undefined;

  /**
   * When set, displays a `(current/limit)` character counter in the footer. Requires `limit` to be set.
   */
  @property({ type: Boolean })
  showLimit = false;

  /**
   * When set, appends a red `*` after the label to mark the field as required.
   */
  @property({ type: Boolean })
  required = false;

  /**
   * Native `autocomplete` attribute. Defaults to `on`; set `off` for sensitive fields (passwords, OTP).
   */
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
        <span class="label">
          <label for="input">
            ${this.label}
            ${this.required ? html`<span class="required">*</span>` : nothing}
          </label>
          <slot name="label"></slot>
        </span>
        <div class=${`input-container ${this.disabled ? "disabled" : ""}`}>
          <input
            id="input"
            data-testid=${this.testId || nothing}
            maxlength=${ifDefined(this.limit)}
            placeholder=${this.placeholder || ""}
            name=${this.name || ""}
            .value=${this.value || ""}
            ?disabled=${this.disabled}
            autocomplete=${this.autoComplete}
            .type=${this.type}
            @input=${this.updateValue}
            @change=${(e: any) => this.updateValue(e, true)}
          />
          <slot name="prefix"></slot>
          <slot name="postfix"></slot>
        </div>
        <div class="footer ${this.helperText || this.limit ? "" : "hidden"}">
          <label
            class="helper"
            data-testid=${this.testId
              ? `${this.testId}.error-message`
              : nothing}
            >${this.helperText}</label
          >
          ${this.showLimit
            ? html`<label class="helper ${this.limit ? "" : "hidden"}"
                >(${this.value?.length || 0}/${this.limit})</label
              >`
            : nothing}
        </div>
      </div>
    `;
  }

  updateValue(e: any, redispatch: boolean = false) {
    this.value = e.srcElement.value;
    if (redispatch) {
      redispatchEvents(e, this);
    }
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

    ::slotted([slot="prefix"]) {
      grid-area: prefix;
    }

    ::slotted([slot="postfix"]) {
      grid-area: postfix;
    }

    span.label {
      display: flex;
      align-items: flex-start;
      gap: 0.25em;
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

    span.required {
      color: red;
    }

    label.helper {
      font-size: 0.75em;
      line-height: 0.75em;
      font-weight: var(--font-weight-normal, 400);
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

if (!customElements.get("ssk-input")) {
  customElements.define("ssk-input", Input);
}
