import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { redispatchEvents } from "../../helpers/lit";
import { ThemeValue } from "../../types/base-attributes";
import {
  ColorName,
  ColorRole,
  Size,
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";

/**
 * Sellsuki Radio — DS 3.0
 *
 * Single radio button. Renders the dot + slotted label and reports
 * selection to a parent `<ssk-radio-group>` (preferred) or to a custom
 * group via the `name` attribute. Emits `change` when selected.
 *
 * Reach for `<ssk-radio>` only when you need fine-grained layout
 * control inside a custom radio group. For the common case (an options
 * array → mutually exclusive picker) use `<ssk-radio-group>` directly.
 * For multi-select use `<ssk-checkbox>`; for instant-apply on/off use
 * `<ssk-toggle>`.
 *
 * @example
 *   <ssk-radio name="lang" value="th">ไทย</ssk-radio>
 *   <ssk-radio name="lang" value="en">English</ssk-radio>
 *
 * @slot - Label text
 */
export class Radio extends LitElement implements ThemeValue {
  static registeredName = "ssk-radio";

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

  /**
   * Brand accent for the checked / hover state. Defaults to `primary`.
   */
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  /**
   * Override for the label text color.
   */
  @property({ type: String })
  color?: ColorRole | ColorName = "";
  /**
   * Override for the unchecked dot background. Defaults to `transparent`.
   */
  @property({ type: String })
  backgroundColor?: string | undefined = "transparent";
  /**
   * Override for the dot border color when unchecked.
   */
  @property({ type: String })
  borderColor?: string | undefined;

  /**
   * Visual size — controls dot dimensions and label font size. Defaults to `md`.
   */
  @property({ type: String })
  size: Size = "md";
  /**
   * Override for the label font size (CSS length).
   */
  @property({ type: String })
  fontSize?: string | undefined;
  /**
   * Override for the dot-to-label gap.
   */
  @property({ type: String })
  gap?: string | undefined;
  /**
   * Override for the dot border radius. Defaults to 50% (circle).
   */
  @property({ type: String })
  rounded?: string | undefined;
  /**
   * Override for the dot width (CSS length).
   */
  @property({ type: String })
  width?: string | undefined;
  /**
   * Override for the dot height (CSS length).
   */
  @property({ type: String })
  height?: string | undefined;

  // radio specific
  /**
   * When set, the element renders nothing — use for conditional show/hide.
   */
  @property({ type: Boolean })
  hidden = false;
  /**
   * Label text rendered next to the radio. Ignored when a `slot="label"` child is provided.
   */
  @property({ type: String })
  label?: string | undefined;
  /**
   * Current checked state — typically managed by a parent `<ssk-radio-group>`.
   */
  @property({ type: Boolean })
  checked = false;
  /**
   * Indeterminate state. Rarely useful on radios; kept for API symmetry with `<ssk-checkbox>`.
   */
  @property({ type: Boolean })
  indeterminate = false;
  /**
   * When set, the radio is non-interactive and rendered with disabled styling.
   */
  @property({ type: Boolean })
  disabled = false;

  render() {
    if (this.hidden) {
      return nothing;
    }

    const labelSlot = this.querySelector('[slot="label"]');
    let additionalCss = `
    --active-100: ${parseVariables(cssVar("colors", this.themeColor, 100))};
    --active-500: ${parseVariables(cssVar("colors", this.themeColor, 500))};
    --disabled-200: ${parseVariables(cssVar("colors", "gray", 200))};
    --disabled-300: ${parseVariables(cssVar("colors", "gray", 300))};
    --disabled-400: ${parseVariables(cssVar("colors", "gray", 400))};
    --border-radius: ${parseVariables(cssVar("rounded", this.rounded), "50%")};
    --border-radius: 50%;
    --width: 0.5em;
    --height: 0.5em;
    --gap: ${parseVariables(cssVar("spacing", this.size), "1em")};
    --font-size: ${parseVariables(cssVar("font-size", this.size))};
    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.radio, "input")}
      <style>
        div,
        input {
            ${additionalCss};
          }
      </style>
      <div class="radio-wrapper">
        <input
          type="radio"
          id="radio"
          data-testid=${this.testId || nothing}
          .disabled=${this.disabled}
          .checked=${this.checked}
          @change=${(e: Event) => this._onChange(e)}
        />
        <label for="radio">
          ${labelSlot ? html`<slot name="label"></slot>` : this.label}
        </label>
      </div>
    `;
  }

  private _onChange(e: Event) {
    this.checked = (e.target as HTMLInputElement).checked;
    redispatchEvents(e, this);
  }

  static styles = css`
    @supports (-webkit-appearance: none) or (-moz-appearance: none) {
      .radio-wrapper input[type="radio"] {
        --background-color: var(--bg-primary, #fff);
        --checked-color: var(--fg-white, #fff);

        --border-color: var(--disabled-200);
        -moz-appearance: none;
        appearance: none;
        height: var(--height);
        width: var(--width);
        font-size: var(--font-size);
        outline: none;
        display: inline-block;
        position: relative;
        cursor: pointer;
        border: calc(0.1 * var(--width)) solid var(--border-color);
        border-radius: var(--border-radius);
        background-color: var(--background-color);
        vertical-align: middle;
      }

      .radio-wrapper input[type="radio"]:checked {
        --border-color: var(--active-500);
      }

      .radio-wrapper input[type="radio"] + label {
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        cursor: pointer;
        margin-left: calc(0.2 * var(--font-size));
        font-size: var(--font-size);
        gap: 0.2em;
      }

      .radio-wrapper input[type="radio"]:hover:not(:disabled) {
        --border-color: var(--active-500);
        box-shadow: 0 0 0 calc(0.1 * var(--width)) var(--active-100);
      }

      .radio-wrapper input[type="radio"]:checked::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: calc(0.65 * var(--height));
        width: calc(0.65 * var(--width));
        background-color: var(--active-500);
        border-radius: var(--border-radius);
      }

      .radio-wrapper input[type="radio"]:disabled {
        --background-color: var(--disabled-200);
        --border-color: var(--disabled-300);
        cursor: not-allowed;
        opacity: 0.9;
      }

      .radio-wrapper input[type="radio"]:disabled:checked,
      input[type="radio"]:disabled:indeterminate {
        --checked-color: var(--disabled-400);
        --active-500: var(--disabled-300);
      }

      .radio-wrapper input[type="radio"]:disabled + label {
        cursor: not-allowed;
      }
    }
    .radio-wrapper * {
      box-sizing: inherit;
    }
    .radio-wrapper *:before,
    .radio-wrapper *:after {
      box-sizing: inherit;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-radio": Radio;
  }
}

if (!customElements.get("ssk-radio")) {
  customElements.define("ssk-radio", Radio);
}
