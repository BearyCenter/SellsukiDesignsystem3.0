import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";

export class AppShell extends LitElement {
  static registeredName = "ds-app-shell";

  @property({ type: String, attribute: "navbar-height" })
  navbarHeight = "60px";

  @property({ type: String, attribute: "sidebar-width" })
  sidebarWidth = "256px";

  @property({ type: String, attribute: "sidebar-collapsed-width" })
  sidebarCollapsedWidth = "72px";

  @property({ type: Boolean, attribute: "sidebar-collapsed", reflect: true })
  sidebarCollapsed = false;

  @property({ type: Boolean, attribute: "no-sidebar" })
  noSidebar = false;

  @property({ type: Boolean, attribute: "no-navbar" })
  noNavbar = false;

  @property({ type: String, attribute: "test-id" })
  testId?: string;

  render() {
    const currentSidebarWidth = this.sidebarCollapsed
      ? this.sidebarCollapsedWidth
      : this.sidebarWidth;

    return html`
      <style>
        :host {
          --app-shell-navbar-height: ${this.navbarHeight};
          --app-shell-sidebar-width: ${currentSidebarWidth};
        }
      </style>
      <div
        class="app-shell ${this.noNavbar ? "no-navbar" : ""} ${this.noSidebar ? "no-sidebar" : ""}"
        data-testid=${this.testId ?? ""}
      >
        ${!this.noNavbar ? html`
          <header class="navbar">
            <slot name="navbar"></slot>
          </header>
        ` : ""}

        <div class="body">
          ${!this.noSidebar ? html`
            <aside class="sidebar">
              <slot name="sidebar"></slot>
            </aside>
          ` : ""}

          <main class="content">
            <slot></slot>
          </main>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      --app-shell-navbar-height: 60px;
      --app-shell-sidebar-width: 256px;
    }

    .app-shell {
      display: grid;
      grid-template-rows: var(--app-shell-navbar-height) 1fr;
      height: 100%;
      background: var(--bg-primary, #fff);
    }

    .app-shell.no-navbar {
      grid-template-rows: 1fr;
    }

    .navbar {
      grid-row: 1;
      background: var(--bg-primary, #fff);
      border-bottom: 1px solid var(--stroke-primary, #e5e7eb);
      z-index: 20;
      position: sticky;
      top: 0;
    }

    .body {
      display: grid;
      grid-template-columns: var(--app-shell-sidebar-width) 1fr;
      overflow: hidden;
      transition: grid-template-columns 0.25s ease;
    }

    .app-shell.no-sidebar .body {
      grid-template-columns: 1fr;
    }

    .sidebar {
      background: var(--bg-primary, #fff);
      border-right: 1px solid var(--stroke-primary, #e5e7eb);
      overflow-y: auto;
      overflow-x: hidden;
      height: 100%;
    }

    .content {
      overflow-y: auto;
      overflow-x: hidden;
      background: var(--bg-secondary, #f9fafb);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ds-app-shell": AppShell;
    "ssk-app-shell": AppShell;
  }
}

if (!customElements.get("ds-app-shell")) {
  customElements.define("ds-app-shell", AppShell);
}
if (!customElements.get("ssk-app-shell")) {
  customElements.define("ssk-app-shell", class extends AppShell {});
}
