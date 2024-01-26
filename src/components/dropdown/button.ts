import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { Size, Theme } from "../../types/theme";
import { DropdownState, valueContext } from "./dropdown";

@customElement("ssk-dropdown-button")
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

  render() {
    if (this.hidden) {
      return nothing;
    }

    return html`
      <button
        class=${`dropdown ${this.state?.disabled ? "disabled" : ""} ${
          this.state?.isOpened ? "active" : ""
        } ${this.state?.isError ? "error" : ""}`}
      >
        <span class="label-value" data-testid=${this.testId || nothing}>
          <slot></slot>
        </span>
        ${this.hideChevron
          ? nothing
          : html`<ssk-icon name="outline-chevron-down"></ssk-icon>`}
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
      padding: 0 0.5em;

      gap: var(--gap);
      cursor: pointer;
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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-dropdown-button": DropdownButton;
  }
}
