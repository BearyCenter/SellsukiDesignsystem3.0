import { consume } from "@lit-labs/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { State, stateContext } from "./types";

@customElement("ssk-sidebar-item")
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

  render() {
    const isActive = this.state?.selectedItems.includes(this.key);

    return html`
      <div
        class="sidebar-menu-container ${isActive ? "active" : ""} ${this
          .disabled
          ? "disabled"
          : ""} 
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
      !this.state.selectedItems.includes(this.key)
    );
  }

  static styles = css`
    .sidebar-menu-container {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      background-color: var(--background-color);
      color: var(--color);
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
      padding: var(--padding);
      margin: var(--margin);
      gap: var(--gap);
      border-radius: var(--rounded);
      border-color: var(--border-color);
      border-width: var(--border-width);
    }

    .sidebar-menu-container:hover {
      background-color: var(--background-color-hover);
      color: var(--color-hover);
    }

    .sidebar-menu-container.active {
      background-color: var(--background-color-active);
      color: var(--color-active);
    }

    .sidebar-menu-container.disabled {
      cursor: not-allowed;
      background-color: var(--background-color-disabled);
      color: var(--color-disabled);
      border-color: var(--border-color-disabled);
    }

    .sidebar-menu-container .prefix,
    .sidebar-menu-container .postfix,
    .sidebar-menu-container slot {
      display: flex;
      align-items: center;
    }

    .sidebar-menu-container slot {
      margin-right: auto;
    }

    .sidebar-menu-container .prefix {
      width: auto;

      color: var(--color-prefix);
    }

    .sidebar-menu-container.active .prefix {
      width: auto;

      color: var(--color-active);
    }

    .collapsed-content {
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
    }

    .collapsed-content .prefix {
      align-items: center;
      position: relative;
    }

    .collapsed-content .badge {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      overflow: hidden;
      position: absolute;
      top: 0;
      right: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-sidebar-item": SidebarItems;
  }
}
