import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { State, stateContext } from "./sidebar";

export class SidebarItems extends LitElement {
  static registeredName = "ssk-sidebar-item";

  @consume({ context: stateContext, subscribe: true })
  @property({ attribute: false })
  private state?: State;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  @property({ type: String })
  key: string = "";

  @property({ type: String })
  label?: string | undefined;
  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  actived?: boolean = undefined;

  render() {
    let isActive = this.state?.selectedItems.includes(this.key);

    if (this.actived !== undefined) {
      isActive = this.actived;
    }

    return html`
      <div
        class="sidebar-item-container ${isActive ? "active" : ""} ${this
          .disabled
          ? "disabled"
          : ""} ${this.state?.expanded ? "expanded" : ""}
        "
        data-testid=${this.testId || nothing}
        @click=${(e: Event) => this.handleClick(e)}
      >
        <div class="prefix">
          <slot name="prefix"></slot>
        </div>
        ${this.state?.expanded ? html`<slot></slot>` : nothing}
      </div>
    `;
  }

  private handleClick(_e: Event) {
    if (this.disabled) {
      return;
    }

    this.state?.setSelectedItem(
      this.key,
      !this.state.selectedItems.includes(this.key),
    );
  }

  static styles = css`
    .sidebar-item-container {
      display: grid;
      grid-template-columns: auto;
      align-items: center;

      padding: 12px 16px;
      cursor: pointer;
      border-radius: 8px;
      font-size: 24px;
    }

    .sidebar-item-container.expanded {
      grid-template-columns: 24px auto;
      gap: 12px;
      white-space: nowrap;
      text-overflow: clip;
      overflow: hidden;
    }

    .sidebar-item-container:hover {
      background-color: var(--bg-brand-secondary, #e0f2fe);
      color: var(--color-hover);
    }

    .sidebar-item-container.active {
      background-color: var(--bg-brand-secondary, #e0f2fe);
      color: var(--fg-brand-primary, #0ea5e9);

      .prefix {
        color: var(--fg-brand-primary, #0ea5e9);
      }
    }

    .sidebar-item-container.disabled {
      cursor: not-allowed;
      background-color: var(--bg-disabled, #f3f4f6);
      color: var(--text-disabled, #9ca3af);
      border-color: var(--text-disabled, #9ca3af);

      .prefix {
        color: var(--text-disabled, #9ca3af);
      }
    }

    .prefix {
      display: grid;
      place-items: center;
      color: var(--text-secondary, #6b7280);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-sidebar-item": SidebarItems;
  }
}

if (!customElements.get("ssk-sidebar-item")) {
  customElements.define("ssk-sidebar-item", SidebarItems);
}
