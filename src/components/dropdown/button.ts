import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { Size, Theme } from "../../types/theme";
import { DropdownState, valueContext } from "./dropdown";
import "../../elements/icon";

/**
 * Sellsuki Dropdown Button — DS 3.0
 *
 * Trigger element for `<ssk-dropdown>` — the box users click to open the
 * option list. Reflects the dropdown's state (open / disabled / error /
 * success / multi-select clear icon) via consumed context. Slot in the
 * current value label.
 *
 * Must be a direct child of `<ssk-dropdown>` — it consumes the parent's
 * shared context and cannot be used standalone. For a plain action button
 * use `<ssk-button>`.
 *
 * @example
 *   <ssk-dropdown>
 *     <ssk-dropdown-button>เลือกสถานะ</ssk-dropdown-button>
 *     <ssk-dropdown-option value="paid">ชำระแล้ว</ssk-dropdown-option>
 *   </ssk-dropdown>
 *
 * @slot - Current value / placeholder label
 */
export class DropdownButton extends LitElement {
  static registeredName = "ssk-dropdown-button";

  /**
   * Shared dropdown state consumed from the parent `<ssk-dropdown>` via Lit
   * context. Drives open/disabled/error/success/multi-select clear behavior.
   * Internal — never set this from outside.
   */
  @consume({ context: valueContext, subscribe: true })
  @property({ attribute: false })
  public state?: DropdownState;

  /**
   * Active theme injected via Lit context by `<ssk-theme-provider>`. Resolves
   * the brand token set (sellsuki / patona / oc2plus) — do not set manually.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  /**
   * Stable hook for end-to-end tests. Rendered as `data-testid` on the trigger
   * button so Playwright / Cypress can locate it reliably.
   */
  // BaseAttributes
  @property({ type: String })
  testId?: string;

  /**
   * Trigger height + icon scale. Falls back to the parent dropdown's `size`
   * when that is set, otherwise defaults to `md`.
   */
  @property({ type: String })
  size: Size = "md";

  /**
   * Hide the trailing chevron icon — useful when the trigger sits inline with
   * other affordances or already conveys its open state visually.
   */
  @property({ type: Boolean })
  hideChevron = false;


  private handleClearClick = (e: MouseEvent) => {
    e.stopPropagation();
    this.state?.clearValue?.();
  };

  render() {
    if (this.hidden) {
      return nothing;
    }
    const smallSizes = new Set<Size>(["3xs", "2xs", "xs", "sm"]);
    const currentSize = this.state?.size ?? this.size;
    const iconSize = smallSizes.has(currentSize as Size) ? "sm" : "md";
    return html`
      <button
        class=${`dropdown ${this.state?.disabled ? "disabled" : ""} ${
          this.state?.isOpened ? "active" : ""
        } ${this.state?.isError ? "error" : ""} ${this.state?.isSuccess ? "success" : ""}`}
        data-testid=${this.testId || nothing}
      >
        <span class="label-value">
          <slot></slot>
        </span>
       <div class="icons">
        ${this.state?.multiSelect === true && (this.state?.value?.length ?? 0) > 0
          ? html`<ssk-icon color="gray" name="outline-x-circle" @click=${this.handleClearClick} size=${iconSize}></ssk-icon>`
          : nothing}
        ${this.state?.isSuccess && !this.state?.hideSuccessIcon
          ? html`<ssk-icon color="success.600" name="outline-check-circle" size=${iconSize}></ssk-icon>`
          : nothing}
        ${this.state?.isError && !this.state?.hideErrorIcon
          ? html`<ssk-icon color="red" name="outline-exclamation-circle" size=${iconSize}></ssk-icon>`
          : nothing}
        ${this.hideChevron
          ? nothing
          : html`<ssk-icon color="gray" name=${this.state?.isOpened ? "outline-chevron-up" : "outline-chevron-down"} size=${iconSize}></ssk-icon>`
        }
</div>
      </button>
    `;
  }

  static styles = css`
    :host {
      display: inherit;
    }

    .dropdown {
      display: flex;
      justify-content: space-between;
      /* overflow: hidden; */
      align-items: center;
      width: 100%;

      border-style: solid;
      transition: background-color 0.2s ease-in-out;
      background-color: var(--background-color);

      border-radius: var(--rounded);
      border: 1px solid var(--border-color);
      padding: 0 1.2em;

      gap: var(--gap);
      cursor: pointer;
    }

    .dropdown:hover:not(.disabled):not(.error):not(.success) {
      border: 1px solid var(--stroke-secondary, #d1d5db);
    }

    .dropdown.disabled {
      background-color: var(--background-color-disabled);
      border-color: var(--border-color-disabled);
      color: var(--color-disabled);
    }

    .dropdown.active {
      border-color: var(--border-color-active);
      outline: 4px solid var(--outline-color-active);
    }

    .dropdown.error {
      border-color: var(--border-color-error);
      outline: 4px solid var(--outline-color-error);
    }

    .dropdown.success {
      border-color: var(--border-color-success);
      outline: 4px solid var(--outline-color-success);
    }

    span.label-value {
      display: flex;
      align-items: baseline;
      justify-content: start;

      /* remove all style */
      border: none;
      outline: none;
      background-color: transparent;
      padding: 0.25em 0;
      margin: 0;
    }

    span.label-value.disabled {
      background-color: var(--background-color-disabled);
      border-color: var(--border-color-disabled);
      cursor: not-allowed;
      color: var(--color-disabled);
    }
      .icons {
      display: flex;
      align-items: center;
      gap: 0.25em;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-dropdown-button": DropdownButton;
  }
}

if (!customElements.get("ssk-dropdown-button")) {
  customElements.define("ssk-dropdown-button", DropdownButton);
}
