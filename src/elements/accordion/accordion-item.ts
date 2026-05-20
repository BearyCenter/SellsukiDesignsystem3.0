import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
/**
 * Single collapsible item inside `<ssk-accordion>` — header (slot
 * `title` or `title` attr) plus body content via default slot.
 *
 * @fires accordion-toggle - Fires when the user clicks the header.
 *   `detail: { id: string }` — the item's `id` prop. Parent `<ssk-accordion>`
 *   listens to decide which items to open/close.
 */
export class AccordionItem extends LitElement {
  static registeredName = "ssk-accordion-item";

  /**
   * Stable identifier used by the parent `<ssk-accordion>` to decide which item to open/close in response to `accordion-toggle`. Must be unique within the accordion.
   */
  @property({ type: String })
  id = "";
  /**
   * Header text shown in the trigger row. For rich markup, slot content into the `title` slot instead and leave this empty.
   */
  @property({ type: String })
  title = "";
  /**
   * When `true`, the panel content is visible. The parent `<ssk-accordion>` owns this state and flips it in response to `accordion-toggle` based on its `mode` (`single` / `multiple`).
   */
  @property({ type: Boolean, reflect: true })
  open = false;
  /**
   * Horizontal alignment of the header text — `left` (default), `center`, or `right`. The parent `<ssk-accordion>` syncs this from its own `align` prop.
   */
  @property({ type: String, reflect: true })
  align: "left" | "center" | "right" = "left";

  handleToggle() {
    this.dispatchEvent(
      new CustomEvent("accordion-toggle", {
        detail: { id: this.id },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div class="header" @click=${this.handleToggle}>
        <span class="header-text">
          <slot name="title">${this.title}</slot>
        </span>
        ${this.open
          ? html`<slot name="icon-open"></slot>`
          : html`<slot name="icon-close"></slot>`}
      </div>
      <div class="content" ?hidden=${!this.open}>
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      border-radius: var(--radius-sm, 6px);
      border: 1px solid var(--border-color, #ccc);
      margin-bottom: 0.5rem;
      overflow: hidden;
      color: var(--color, #000);
      font-family: var(--font-family, sans-serif);
      font-weight: var(--font-weight, normal);
      font-size: var(--font-size, 1rem);
    }

    .header {
      cursor: pointer;
      padding: var(--padding, 1rem);
      background-color: var(--background-color, white);
      color: inherit;
      font-weight: inherit;
      font-family: inherit;
      font-size: inherit;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-text {
      flex-grow: 1;
      text-align: left;
      font-weight: var(--font-weight-medium, 500);
    }

    :host([align="center"]) .header-text {
      text-align: center;
    }

    :host([align="right"]) .header-text {
      text-align: right;
    }

    ::slotted([slot="icon"]) {
      transition: transform 0.2s ease;
    }

    .content {
      padding: 0.2rem;
      background-color: var(--background-color, white);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-accordion-item": AccordionItem;
  }
}

if (!customElements.get("ssk-accordion-item")) {
  customElements.define("ssk-accordion-item", AccordionItem);
}
