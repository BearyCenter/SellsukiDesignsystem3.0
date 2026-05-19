import { consume } from "@lit/context";
import { css, html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { redispatchEvents } from "../../helpers/lit";
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

/**
 * Sellsuki Input Range — DS 3.0
 *
 * Paired "from–to" text input for numeric or date ranges. Renders two
 * input fields under a shared label with a dash divider and reports the
 * combined `{from, to}` pair on change.
 *
 * Reach for `<ssk-input-range>` when both ends of a range are
 * user-typed (price range filter, date range, weight range). For
 * single-value entry use `<ssk-input>`. For a slider-based numeric
 * range, build it from native `<input type="range">` inside an
 * `<ssk-container>` (no dedicated component yet).
 *
 * @example
 *   <ssk-input-range
 *     label="ช่วงราคา"
 *     placeholderFrom="0"
 *     placeholderTo="1000"
 *   ></ssk-input-range>
 */
export class InputRange extends LitElement {
  static registeredName = "ssk-input-range";

  /**
   * Active theme injected via Lit context. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  /**
   * Stable `data-testid` attribute applied to both inner inputs for E2E selectors.
   */
  @property({ type: String })
  testId?: string;

  /**
   * Brand accent for the focus ring and active border. Defaults to `primary`.
   */
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  /**
   * Override for the input text color. Falls back to `--text-primary`.
   */
  @property({ type: String })
  color?: ColorRole | ColorName;
  /**
   * Override for the field background color.
   */
  @property({ type: String })
  backgroundColor?: string | undefined;

  /**
   * Visual size — controls font size, padding, and border radius. Defaults to `md`.
   */
  @property({ type: String })
  size: Size = "md";

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
   * Overall width of the range field (CSS length). Defaults to `auto`.
   */
  @property({ type: String })
  width?: string | undefined;

  /**
   * Label rendered above both inputs. Appends `*` if `required` is set.
   */
  @property({ type: String })
  label: string | undefined;

  /**
   * Helper / error text shown below the range. Tinted red when `error` is set.
   */
  @property({ type: String })
  helperText: string | undefined;

  /**
   * Form-field `name`; emitted on both `from` and `to` inputs.
   */
  @property({ type: String })
  name: string | undefined;

  /**
   * Placeholder for the lower-bound (`from`) input.
   */
  @property({ type: String })
  placeholderFrom: string | undefined;
  /**
   * Placeholder for the upper-bound (`to`) input.
   */
  @property({ type: String })
  placeholderTo: string | undefined;

  /**
   * When set, the element renders nothing — use for conditional show/hide.
   */
  @property({ type: Boolean })
  hidden = false;

  /**
   * Maximum number of characters in each input. Maps to native `maxlength`.
   */
  @property({ type: Number })
  limit?: number;
  /**
   * Native input type for both fields. Defaults to `text`; use `number` for numeric ranges.
   */
  @property({ type: String })
  type: "text" | "number" | "password" | "email" | "tel" | "url" = "text";
  /**
   * When set, both inputs render with red border and the helper text turns red.
   */
  @property({ type: Boolean })
  error = false;

  /**
   * When set, appends a red `*` after the label.
   */
  @property({ type: Boolean })
  required = false;
  /**
   * When set, both inputs are non-interactive and rendered with disabled styling.
   */
  @property({ type: Boolean })
  disabled = false;
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
   * Current value of the lower-bound (`from`) input. Updated on every keystroke.
   */
  @property({ type: String })
  valueFrom: string | undefined;
  /**
   * Current value of the upper-bound (`to`) input. Updated on every keystroke.
   */
  @property({ type: String })
  valueTo: string | undefined;

  updateValueFrom(e: any) {
    this.valueFrom = e.srcElement.value;
    redispatchEvents(e, this, "value-from-input");
  }

  updateValueTo(e: any) {
    this.valueTo = e.srcElement.value;
    redispatchEvents(e, this, "value-to-input");
  }

  updateChangeFrom(e: any) {
    this.valueFrom = e.srcElement.value;
    redispatchEvents(e, this, "value-from-change");
  }

  updateChangeTo(e: any) {
    this.valueTo = e.srcElement.value;
    redispatchEvents(e, this, "value-to-change");
  }

  updateClickFrom(e: any) {
    redispatchEvents(e, this, "input-from-click");
  }

  updateClickTo(e: any) {
    redispatchEvents(e, this, "input-to-click");
  }

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
            cssVar("colors", this.color, 800),
            this.color,
            cssVar("colors", "text", 800)
          )};
          --color-disabled: ${parseVariables(cssVar("colors", "text", 300))};
          --color-helper: ${parseVariables(
            cssVar("colors", this.color),
            cssVar("colors", this.color, 300),
            this.color,
            cssVar("colors", "text", 300)
          )};
          --color-error: ${parseVariables(cssVar("colors", "error", 600))};
          --color-helper-error: ${parseVariables(
            cssVar("colors", "error", 600)
          )};

          --background-color-disabled: ${parseVariables(
            cssVar("colors", "border", 50)
          )};
          --border-color: ${parseVariables(
            cssVar("colors", this.color, 100),
            cssVar("colors", "border", 100)
          )};
          --border-color-active: ${parseVariables(
            cssVar("colors", this.themeColor, 600)
          )};
          --border-color-disabled: ${parseVariables(
            cssVar("colors", "border", 100)
          )};
          --border-color-error: ${parseVariables(
            cssVar("colors", "error", 600)
          )};

          --outline-color-active: ${parseVariables(
            cssVar("colors", this.themeColor, 200)
          )};
          --outline-color-error: ${parseVariables(
            cssVar("colors", "error", 300)
          )};

          --font-family: ${parseVariables(
            cssVar("font-family", this.fontFamilyGroup)
          )};
          --font-weight: ${parseVariables(
            cssVar("font-weight", this.fontWeight)
          )};
          --font-size: ${parseVariables(cssVar("font-size", this.size))};
          --line-height: ${parseVariables(cssVar("font-size", this.size))};
          --gap: ${parseVariables(cssVar("spacing", this.size))};
          --rounded: ${parseVariables(cssVar("rounded", this.size))};

          --width: ${parseVariables(cssVar("width", this.width), "auto")};
          --min-height: ${parseVariables(cssVar("min-height", this.minHeight))};
          --min-width: ${parseVariables(cssVar("min-width", this.minWidth))};
        }
      </style>

      <div class="container ${this.error ? "error" : ""}">
        <label for="input">
          ${this.label}
          ${this.required ? html`<span class="required">*</span>` : nothing}
        </label>
        <div class=${`input-container ${this.disabled ? "disabled" : ""}`}>
          <slot name="prefix"></slot>
          <input
            id="input-from"
            data-testid=${this.testId || nothing}
            placeholder=${this.placeholderFrom || ""}
            name=${this.name || ""}
            .value=${this.valueFrom || ""}
            ?disabled=${this.disabled}
            autocomplete="off"
            @input=${this.updateValueFrom.bind(this)}
            @change=${this.updateChangeFrom.bind(this)}
            @click=${this.updateClickFrom.bind(this)}
          />
          <slot name="center"></slot>
          <input
            id="input-to"
            data-testid=${this.testId || nothing}
            placeholder=${this.placeholderTo || ""}
            name=${this.name || ""}
            .value=${this.valueTo || ""}
            ?disabled=${this.disabled}
            autocomplete="off"
            @input=${this.updateValueTo.bind(this)}
            @change=${this.updateChangeTo.bind(this)}
            @click=${this.updateClickTo.bind(this)}
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
      min-width: 10%;
    }

    div.container {
      display: flex;
      flex-direction: column;
      width: var(--width);
      gap: 0.25em;
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

    div.input-container.disabled {
      background-color: var(--background-color-disabled);
      border-color: var(--border-color-disabled);
      color: var(--color-disabled);
    }

    div.input-container:focus-within {
      border-color: var(--border-color-active);
      outline: 4px solid var(--outline-color-active);
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

    ::slotted([slot="prefix"]) {
      grid-area: prefix;
    }

    ::slotted([slot="postfix"]) {
      grid-area: postfix;
    }

    ::slotted([slot="center"]) {
      grid-area: center;
    }

    input#input-from {
      grid-area: input-from;
    }

    input#input-to {
      grid-area: input-to;
    }

    input#input-from,
    input#input-to {
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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-input-range": InputRange;
  }
}

if (!customElements.get("ssk-input-range")) {
  customElements.define("ssk-input-range", InputRange);
}
