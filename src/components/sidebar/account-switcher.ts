import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import "../../elements/icon";
import "../../elements/avatar";

export interface SidebarAccount {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
}

export class SidebarAccountSwitcher extends LitElement {
  static registeredName = "ssk-sidebar-account-switcher";

  @property({ type: Object })
  account?: SidebarAccount;

  @property({ type: Array })
  accounts: SidebarAccount[] = [];

  @property({ type: Boolean })
  expanded = false;

  @property({ type: String, attribute: "test-id" })
  testId?: string;

  @state() private _open = false;

  private _toggle = (e: MouseEvent) => {
    e.stopPropagation();
    if (this.accounts.length <= 1) return;
    this._open = !this._open;
  };

  private _handleOutsideClick = () => {
    this._open = false;
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("click", this._handleOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("click", this._handleOutsideClick);
  }

  private _selectAccount(acc: SidebarAccount) {
    this.dispatchEvent(new CustomEvent("account-change", {
      detail: acc,
      bubbles: true,
      composed: true,
    }));
    this._open = false;
  }

  render() {
    const current = this.account;
    if (!current) return nothing;

    return html`
      <div class="switcher ${this.expanded ? "expanded" : ""}" data-testid=${this.testId ?? nothing} @click=${this._toggle}>
        <ssk-avatar
          class="avatar"
          src=${current.avatar ?? ""}
          alt=${current.name}
          shape="circle"
          size="md"
        ></ssk-avatar>

        ${this.expanded ? html`
          <div class="info">
            <span class="name">${current.name}</span>
            ${current.role ? html`<span class="role">${current.role}</span>` : nothing}
          </div>
          ${this.accounts.length > 1 ? html`
            <ssk-icon name=${this._open ? "outline-chevron-up" : "outline-chevron-down"} size="sm"></ssk-icon>
          ` : nothing}
        ` : nothing}

        ${this._open && this.expanded ? html`
          <div class="menu" @click=${(e: Event) => e.stopPropagation()}>
            ${this.accounts.map(acc => html`
              <div
                class="menu-item ${acc.id === current.id ? "active" : ""}"
                @click=${() => this._selectAccount(acc)}
              >
                <ssk-avatar src=${acc.avatar ?? ""} alt=${acc.name} shape="circle" size="sm"></ssk-avatar>
                <div class="menu-info">
                  <span class="menu-name">${acc.name}</span>
                  ${acc.role ? html`<span class="menu-role">${acc.role}</span>` : nothing}
                </div>
                ${acc.id === current.id ? html`<ssk-icon name="outline-check" size="sm"></ssk-icon>` : nothing}
              </div>
            `)}
          </div>
        ` : nothing}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .switcher {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px;
      border-radius: var(--radius-md, 8px);
      cursor: pointer;
      transition: background-color 0.15s ease;
      position: relative;
    }

    .switcher:hover {
      background-color: var(--bg-primary-hover, #f3f4f6);
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .name {
      font-size: var(--font-size-label, 20px);
      font-family: var(--font-p, sans-serif);
      font-weight: var(--font-weight-semibold, 600);
      color: var(--text-primary, #111827);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .role {
      font-size: var(--font-size-caption, 18px);
      font-family: var(--font-caption, sans-serif);
      color: var(--text-secondary, #6b7280);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .menu {
      position: absolute;
      bottom: calc(100% + 4px);
      left: 0;
      right: 0;
      background: var(--bg-primary, #fff);
      border: 1px solid var(--stroke-primary, #e5e7eb);
      border-radius: var(--radius-md, 8px);
      box-shadow: var(--elevation-sm, 0px 1px 2px 0px #0000000d);
      padding: 4px;
      z-index: 10;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      border-radius: var(--radius-sm, 6px);
      cursor: pointer;
      transition: background-color 0.15s ease;
    }

    .menu-item:hover {
      background-color: var(--bg-primary-hover, #f3f4f6);
    }

    .menu-item.active {
      background-color: var(--bg-brand-secondary, #e0f2fe);
    }

    .menu-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .menu-name {
      font-size: var(--font-size-label, 20px);
      font-family: var(--font-label, sans-serif);
      font-weight: var(--font-weight-medium, 500);
      color: var(--text-primary, #111827);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .menu-role {
      font-size: var(--font-size-caption, 18px);
      font-family: var(--font-caption, sans-serif);
      color: var(--text-secondary, #6b7280);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-sidebar-account-switcher": SidebarAccountSwitcher;
  }
}

if (!customElements.get("ssk-sidebar-account-switcher")) {
  customElements.define("ssk-sidebar-account-switcher", SidebarAccountSwitcher);
}
