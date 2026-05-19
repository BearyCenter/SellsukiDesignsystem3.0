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

/**
 * Sellsuki Textarea — DS 3.0
 *
 * Multi-line text input with token-driven styling, an optional `label`
 * and `helperText`, and validation `error` / `success` states. Resizes
 * via the standard `rows` attribute or the `height` prop.
 *
 * Reach for `<ssk-textarea>` for free-form longer-than-one-line input
 * (order notes, address line 2, customer feedback, comment composer).
 * For single-line text use `<ssk-input>`. For rich text editing use a
 * dedicated editor — DS 3.0 does not ship one.
 *
 * @example
 *   <ssk-textarea
 *     label="หมายเหตุ"
 *     placeholder="ระบุข้อความเพิ่มเติม..."
 *     rows="4"
 *   ></ssk-textarea>
 */
export class Textarea extends LitElement {
  static registeredName = "ssk-textarea";

  /**
   * Active theme injected via Lit context. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  /**
   * Stable `data-testid` attribute for E2E selectors.
   */
  @property({ type: String })
  testId?: string;

  // ThemeValue
  /**
   * Brand accent for the focus ring and active border. Defaults to `primary`.
   */
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  /**
   * Override for the textarea text color.
   */
  @property({ type: String })
  color?: ColorRole | ColorName;
  /**
   * Override for the textarea background color.
   */
  @property({ type: String })
  backgroundColor?: string | undefined;

  /**
   * Visual size — controls font size, padding, border radius. Defaults to `md`.
   */
  @property({ type: String })
  size: Size = "md";

  // font
  /**
   * Font family group. Defaults to `sans`.
   */
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  /**
   * Font weight. Defaults to `normal`.
   */
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  /**
   * Overall width of the textarea (CSS length). Defaults to `auto`.
   */
  @property({ type: String })
  width?: string | undefined;

  // textarea specific
  /**
   * Label rendered above the textarea. Appends `*` when `required` is set.
   */
  @property({ type: String })
  label: string | undefined;

  /**
   * Helper / error text shown below the textarea.
   */
  @property({ type: String })
  helperText: string | undefined;

  /**
   * Form-field `name` attribute submitted with the parent form.
   */
  @property({ type: String })
  name: string | undefined;

  /**
   * Current text value. Updated on every keystroke.
   */
  @property({ type: String })
  value: string | undefined;

  /**
   * Placeholder text shown when the textarea is empty.
   */
  @property({ type: String })
  placeholder: string | undefined;

  /**
   * Validation status — `error` or `success`.
   */
  @property({ type: String })
  status: "error" | "success" | undefined;

  /**
   * When set, the textarea is non-interactive and rendered with disabled styling.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * When set, the element renders nothing — use for conditional show/hide.
   */
  @property({ type: Boolean })
  hidden = false;

  /**
   * Number of visible text rows (native `rows` attribute). Defaults to 2.
   */
  @property({ type: Number })
  rows = 2;

  /**
   * Maximum number of characters accepted. Displays a `(current/limit)` counter in the footer.
   */
  @property({ type: Number })
  limit?: number;

  /**
   * When set, the textarea renders with red border and error-tinted helper text.
   */
  @property({ type: Boolean })
  error = false;

  /**
   * When set, appends a red `*` after the label.
   */
  @property({ type: Boolean })
  required = false;

  /**
   * Minimum height override (CSS length).
   */
  @property({ type: String })
  minHeight?: string | undefined;
  /**
   * Minimum width override (CSS length).
   */
  @property({ type: String })
  minWidth?: string | undefined;

  /**
   * User-resize direction. Defaults to `both`; use `none` to lock the box.
   */
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
