import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { State, stateContext } from "./sidebar";

/**
 * Sellsuki Sidebar Group — DS 3.0
 *
 * Collapsible heading row inside `<ssk-sidebar>` that groups several
 * `<ssk-sidebar-item>` children under a shared label. Clicking the header
 * toggles the group's expanded state via the sidebar's shared context; the
 * label disappears automatically when the sidebar collapses to icon-only
 * mini mode.
 *
 * Must be a direct child of `<ssk-sidebar>` / `<ssk-sidebar-list>`.
 * Provide a stable `key` so the sidebar can persist which groups are open.
 *
 * @example
 *   <ssk-sidebar-group key="reports" label="รายงาน">
 *     <ssk-sidebar-item key="sales">ยอดขาย</ssk-sidebar-item>
 *     <ssk-sidebar-item key="traffic">การเข้าชม</ssk-sidebar-item>
 *   </ssk-sidebar-group>
 *
 * @slot - `<ssk-sidebar-item>` children
 */
export class SidebarGroup extends LitElement {
  static registeredName = "ssk-sidebar-group";

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
  expanded?: boolean = undefined;

  render() {
    let isOpen = this.state?.expandedGroups.includes(this.key);

    if (this.expanded !== undefined) {
      isOpen = this.expanded;
    }

    return html`
      ${this.state?.expanded
        ? html`
            <div
              class="sidebar-group-header"
              @click=${(_e: Event) => {
                this.state?.setExpandedGroup(this.key, !isOpen);
              }}
            >
              <div class="header-content">${this.label}</div>
              <ssk-icon
                name=${isOpen ? "solid-chevron-up" : "solid-chevron-down"}
                size="1em"
              ></ssk-icon>
            </div>

            ${isOpen ? html`<slot></slot>` : nothing}
          `
        : html`<slot></slot>`}
    `;
  }

  static styles = css`
    .sidebar-group-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: var(--font-size-caption,18px);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
      background-color: var(--background-color);
      color: var(--text-secondary, #9ca3af);
      cursor: pointer;
      padding: var(--padding);
      margin: var(--margin);
      gap: var(--gap);
      border-radius: var(--rounded);
      border-color: var(--border-color);
      border-width: var(--border-width);
      padding-bottom: 0;
    }

    .header-content {
      flex: 1;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-sidebar-group": SidebarGroup;
  }
}

if (!customElements.get("ssk-sidebar-group")) {
  customElements.define("ssk-sidebar-group", SidebarGroup);
}
