import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { State, stateContext } from "./sidebar";

/**
 * Sellsuki Sidebar Item — DS 3.0
 *
 * Single clickable nav row inside `<ssk-sidebar>` / `<ssk-sidebar-group>`.
 * Tracks active state by `key` against the sidebar's `selectedItems`
 * context, or accept a manual `actived` boolean override. The `prefix`
 * slot is always rendered (icon stays visible when the sidebar collapses
 * to icon-only mini mode); the default slot only renders when expanded.
 *
 * Must be a direct child of `<ssk-sidebar>`, `<ssk-sidebar-list>`, or
 * `<ssk-sidebar-group>`. For grouped items use a `<ssk-sidebar-group>`
 * wrapper.
 *
 * @example
 *   <ssk-sidebar-item key="orders">
 *     <ssk-icon slot="prefix" name="solid-shopping-cart"></ssk-icon>
 *     คำสั่งซื้อ
 *   </ssk-sidebar-item>
 *
 * @slot        - Label text (hidden when sidebar is collapsed)
 * @slot prefix - Leading icon (always visible)
 */
export class SidebarItems extends LitElement {
  static registeredName = "ssk-sidebar-item";

  @consume({ context: stateContext, subscribe: true })
  @property({ attribute: false })
  private state?: State;

  // BaseAttributes
  /**
   * Stable `data-testid` attribute applied to the item container for E2E test selectors.
   */
  @property({ type: String })
  testId?: string;

  /**
   * Stable identifier used by the parent `<ssk-sidebar>` to track active selection via the `selectedItems` array. Must be unique within the sidebar.
   */
  @property({ type: String })
  key: string = "";

  /**
   * Label text shown when the sidebar is expanded. Prefer slotting text content instead for richer markup; this prop is a convenience for simple labels.
   */
  @property({ type: String })
  label?: string | undefined;
  /**
   * Renders disabled — clicks and keyboard focus are ignored, and the item shows the `--bg-disabled` / `--text-disabled` palette.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Manual override for the active state — when set, ignores `<ssk-sidebar>` context tracking. Leave `undefined` to let the parent sidebar control via its `selectedItems` array.
   */
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
      border-radius: var(--radius-md, 8px);
      font-size: var(--font-size-p, 20px);
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
