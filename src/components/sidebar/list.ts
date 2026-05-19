import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";

/**
 * Sellsuki Sidebar List — DS 3.0
 *
 * Vertical container that stacks `<ssk-sidebar-item>` and
 * `<ssk-sidebar-group>` children with consistent gap. Use it as the body
 * of `<ssk-sidebar>` to keep spacing aligned with the rest of the design
 * system; without it, items render directly against the sidebar edges.
 *
 * Must be a direct child of `<ssk-sidebar>`.
 *
 * @example
 *   <ssk-sidebar>
 *     <ssk-sidebar-header>...</ssk-sidebar-header>
 *     <ssk-sidebar-list>
 *       <ssk-sidebar-item key="home">หน้าแรก</ssk-sidebar-item>
 *       <ssk-sidebar-item key="orders">คำสั่งซื้อ</ssk-sidebar-item>
 *     </ssk-sidebar-list>
 *   </ssk-sidebar>
 *
 * @slot - Sidebar items / groups
 */
export class SidebarList extends LitElement {
  static registeredName = "ssk-sidebar-list";

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  render() {
    return html`<div class="list"><slot></slot></div>`;
  }

  static styles = css`
    .list {
      display: grid;
      grid-auto-flow: row;
      gap: 4px;
      padding: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-sidebar-list": SidebarList;
  }
}

if (!customElements.get("ssk-sidebar-list")) {
  customElements.define("ssk-sidebar-list", SidebarList);
}
