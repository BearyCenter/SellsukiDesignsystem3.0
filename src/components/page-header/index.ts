import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import "../../elements/icon";

export class PageHeader extends LitElement {
  static registeredName = "ds-page-header";

  @property({ type: String }) title = "";
  @property({ type: String }) subtitle = "";
  @property({ type: Boolean, attribute: "show-back" }) showBack = false;
  @property({ type: String, attribute: "back-label" }) backLabel = "Back";
  @property({ type: String, attribute: "test-id" }) testId?: string;

  private _onBack() {
    this.dispatchEvent(new CustomEvent("back", { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="page-header" data-testid=${this.testId ?? nothing}>
        <div class="top-row">
          <slot name="breadcrumb"></slot>
        </div>
        <div class="main-row">
          <div class="left">
            ${this.showBack
              ? html`
                  <button class="back-btn" @click=${this._onBack} aria-label=${this.backLabel}>
                    <ssk-icon name="outline-arrow-left" size="md"></ssk-icon>
                  </button>
                `
              : nothing}
            <div class="title-group">
              <h1 class="title">${this.title}</h1>
              ${this.subtitle
                ? html`<p class="subtitle">${this.subtitle}</p>`
                : nothing}
            </div>
          </div>
          <div class="actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .page-header {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 16px 24px;
      background: var(--bg-primary, #f9fafb);
      border-bottom: 1px solid var(--stroke-primary, #e5e7eb);
    }

    .top-row {
      display: flex;
      align-items: center;
      min-height: 0;
    }

    .top-row:empty {
      display: none;
    }

    slot[name="breadcrumb"]::slotted(*) {
      font-size: var(--font-size-caption, 18px);
      color: var(--text-secondary, #6b7280);
    }

    .main-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .left {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }

    .back-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: 1px solid var(--stroke-primary, #e5e7eb);
      border-radius: var(--radius-md, 8px);
      background: var(--bg-primary, #f9fafb);
      color: var(--icon-primary, #6b7280);
      cursor: pointer;
      flex-shrink: 0;
      transition: background 0.15s ease, color 0.15s ease;
    }

    .back-btn:hover {
      background: var(--bg-primary-hover, #f3f4f6);
      color: var(--icon-dark, #111827);
    }

    .back-btn:focus-visible {
      outline: 2px solid var(--stroke-brand-solid, #0ea5e9);
      outline-offset: 2px;
    }

    .title-group {
      min-width: 0;
    }

    .title {
      margin: 0;
      font-family: var(--font-h1, "DB HeaventRounded", sans-serif);
      font-size: 24px;
      font-weight: var(--font-weight-bold, 700);
      color: var(--text-primary, #1f2937);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.3;
    }

    .subtitle {
      margin: 2px 0 0;
      font-family: var(--font-p, "DB HeaventRounded", sans-serif);
      font-size: var(--font-size-caption, 18px);
      color: var(--text-secondary, #6b7280);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.4;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    slot[name="actions"]::slotted(*) {
      flex-shrink: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ds-page-header": PageHeader;
    "ssk-page-header": PageHeader;
  }
}

if (!customElements.get("ds-page-header")) {
  customElements.define("ds-page-header", PageHeader);
}
if (!customElements.get("ssk-page-header")) {
  customElements.define("ssk-page-header", PageHeader);
}
