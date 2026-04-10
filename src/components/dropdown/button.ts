import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { Size, Theme } from "../../types/theme";
import { DropdownState, valueContext } from "./dropdown";
import "../../elements/icon";

export class DropdownButton extends LitElement {
  static registeredName = "ssk-dropdown-button";

  @consume({ context: valueContext, subscribe: true })
  @property({ attribute: false })
  public state?: DropdownState;

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  @property({ type: String })
  size: Size = "md";

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
      border: 1px solid var(--ssk-colors-gray-300);
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
