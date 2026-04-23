import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";

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

if (!customElements.get("ds-sidebar-list")) {
  customElements.define("ds-sidebar-list", SidebarList);
}
if (!customElements.get("ssk-sidebar-list")) {
  customElements.define("ssk-sidebar-list", class extends SidebarList {});
}
