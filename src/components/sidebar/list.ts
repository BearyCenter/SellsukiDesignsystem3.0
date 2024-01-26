import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ssk-sidebar-list")
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
