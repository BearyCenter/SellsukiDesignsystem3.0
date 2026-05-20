import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";

/**
 * Sellsuki App Shell — DS 3.0
 *
 * Top-level page chrome: a CSS grid that lays out a sticky top navbar, a
 * collapsible left sidebar, and a scrollable content area. Slot in the
 * navbar / sidebar bodies; use the default slot for the page content. The
 * `sidebar-collapsed` attribute reflects so consumers can animate icon-only
 * mini mode.
 *
 * Reach for `<ssk-app-shell>` when you need full layout control. For most
 * product code prefer `<ssk-default-shell>` — it composes app-shell plus
 * the theme + brand providers and accepts a typed `menu` array so you
 * don't hand-roll sidebar markup.
 *
 * @example
 *   <ssk-app-shell sidebar-width="256px">
 *     <ssk-top-navbar slot="navbar">...</ssk-top-navbar>
 *     <ssk-sidebar slot="sidebar">...</ssk-sidebar>
 *     <ssk-feature-page-scaffold>...</ssk-feature-page-scaffold>
 *   </ssk-app-shell>
 *
 * @slot         - Main page content (scrollable)
 * @slot navbar  - Top navigation bar
 * @slot sidebar - Left sidebar nav
 */
export class AppShell extends LitElement {
  static registeredName = "ssk-app-shell";

  /**
   * Height of the sticky top navbar row (any CSS length). Defaults to `60px` — matches the DS 3.0 `<ssk-top-navbar>` spec.
   */
  @property({ type: String, attribute: "navbar-height" })
  navbarHeight = "60px";

  /**
   * Width of the left sidebar column when expanded (any CSS length). Defaults to `256px`.
   */
  @property({ type: String, attribute: "sidebar-width" })
  sidebarWidth = "256px";

  /**
   * Width of the left sidebar column when collapsed into icon-only mini mode (any CSS length). Defaults to `72px`.
   */
  @property({ type: String, attribute: "sidebar-collapsed-width" })
  sidebarCollapsedWidth = "72px";

  /**
   * Reflects collapsed state — when true the body grid shrinks to `sidebarCollapsedWidth`. Attribute is reflected so consumers can animate the icon-only transition with CSS.
   */
  @property({ type: Boolean, attribute: "sidebar-collapsed", reflect: true })
  sidebarCollapsed = false;

  /**
   * Hide the sidebar slot entirely and let `content` span full width — use on pages that don't need a left nav (sign-in, marketing).
   */
  @property({ type: Boolean, attribute: "no-sidebar" })
  noSidebar = false;

  /**
   * Hide the navbar slot entirely and let the body span the full grid height — use for full-bleed flows without top chrome.
   */
  @property({ type: Boolean, attribute: "no-navbar" })
  noNavbar = false;

  /**
   * Stable `data-testid` attribute applied to the shell root for E2E test selectors.
   */
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
    "ssk-app-shell": AppShell;
  }
}

if (!customElements.get("ssk-app-shell")) {
  customElements.define("ssk-app-shell", AppShell);
}
