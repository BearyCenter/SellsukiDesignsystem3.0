import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import "../../../src/elements/heading";
import "../../../src/elements/text";

export class DrawerHeader extends LitElement {
  @property({ type: String }) title = "";
  @property({ type: String }) description = "";

  @property({ type: Boolean }) hideCloseButton = false;

  close() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="header">
        <div class="top">
          <ssk-heading level="1"> ${this.title} </ssk-heading>

          <div class="action">
            <slot></slot>
          </div>

          <div class="close-button ${this.hideCloseButton ? "hide" : ""}">
            <ssk-icon
              ?hidden=${this.hideCloseButton}
              name="outline-x-mark"
              @click=${this.close}
            ></ssk-icon>
          </div>
        </div>

        <ssk-text color="background.600" fontWeight="normal">
          ${this.description}
        </ssk-text>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .header {
      display: flex;
      flex-direction: column;
    }

    .top {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto auto;
      gap: 1rem;
      align-items: center;
      line-break: anywhere;
    }

    .close-button {
      cursor: pointer;
    }

    .close-button.hide {
      display: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-drawer-header": DrawerHeader;
  }
}

if (!customElements.get("ssk-drawer-header")) {
  customElements.define("ssk-drawer-header", DrawerHeader);
}
