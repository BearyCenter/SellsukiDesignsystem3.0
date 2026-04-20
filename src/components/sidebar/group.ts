import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { State, stateContext } from "./sidebar";

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
      color: var(--ssk-colors-text-400);
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

if (!customElements.get("ds-sidebar-group")) {
  customElements.define("ds-sidebar-group", SidebarGroup);
}
if (!customElements.get("ssk-sidebar-group")) {
  customElements.define("ssk-sidebar-group", SidebarGroup);
}
