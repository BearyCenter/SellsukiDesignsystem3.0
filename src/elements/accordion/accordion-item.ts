import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
@customElement("ssk-accordion-item")
export class AccordionItem extends LitElement {
  static registeredName = "ssk-accordion-item";

  @property({ type: String })
  id = "";
  @property({ type: String })
  title = "";
  @property({ type: Boolean, reflect: true })
  open = false;
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
      border-radius: 6px;
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
      font-weight: 500;
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
      background-color: var(--content-background-color, white);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-accordion-item": AccordionItem;
  }
}
