import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
// Side-effect imports — register the building blocks so consumers only need
// to import `ssk-default-shell` and get the whole shell registered too.
import "../sidebar";
import "../dropdown";
import "../../elements/avatar";
import "../../elements/button";
import "../../elements/icon";
import "../../elements/input";
import "../../elements/logo";
import "../../elements/top-navbar";
import "./index";
import "./provider";
import "./feature-page-scaffold";
import type { AppShellBrand } from "./provider";

/**
 * Single menu entry rendered inside the default sidebar.
 */
export type DefaultShellMenuItem = {
  /** Stable key, emitted in `menu-select` events. */
  key: string;
  /** Visible label. */
  label: string;
  /** Icon name (see ssk-icon catalog). Optional. */
  icon?: string;
  /** Disabled items render greyed-out and ignore clicks. */
  disabled?: boolean;
};

/**
 * Grouping for menu items — equivalent to one `<ssk-sidebar-group>`.
 */
export type DefaultShellMenuGroup = {
  /** Stable key (used as the `<ssk-sidebar-group key>`). */
  key: string;
  /** Group heading shown above the items. */
  label: string;
  /** Items inside the group. */
  items: DefaultShellMenuItem[];
};

/**
 * Preset app shell that bundles `<ssk-app-shell-provider>` +
 * `<ssk-app-shell>` + a default `<ssk-top-navbar>` + a default
 * `<ssk-sidebar>` + a `<ssk-feature-page-scaffold>` body wrapper into a
 * single high-level component. Pass menu data + branding props, slot in
 * page content, and skip the layout wiring.
 *
 * This is the **preset** wrapper. If you need full control over layout
 * — different navbar shape, custom sidebar tree, multi-region grids —
 * compose `<ssk-app-shell>` directly with its named slots instead.
 *
 * ### Vs. `<ssk-pattern-*>` page patterns
 *
 * `<ssk-default-shell>` is the **vibe-code starter** — ~85% of its rendered
 * tree is composed of real `<ssk-*>` components, so AI vibe-code agents and
 * product apps can emit short, readable consumer code. Pair it with body-area
 * `<ssk-*>` components (`<ssk-page-header>`, `<ssk-widget-matric>`,
 * `<ssk-table>`, `<ssk-tabs>`, …) instead of hand-rolled HTML/CSS.
 *
 * `<ssk-pattern-order-management>` / `<ssk-pattern-product-list>` are
 * **visual references** — hand-rolled HTML/CSS that pixel-match the DS 2.0
 * demo quality bar (~35-40% ssk-* tags). Drop them in to show the Designer
 * team's intended look; do not copy their inline class names into consumer
 * code. See `src/patterns/types.ts` for the two-track philosophy explanation.
 *
 * ### Quick start
 *
 * ```html
 * <ssk-default-shell
 *   brand="sellsuki"
 *   company-name="Sellsuki Co., Ltd."
 *   company-branch="สาขา รัชดาภิเษก"
 *   user-avatar="https://..."
 *   .menu=${[
 *     { key: "dashboard", label: "Dashboard", items: [
 *       { key: "overview", label: "ภาพรวม", icon: "outline-building-storefront" },
 *       { key: "orders",   label: "ออเดอร์",  icon: "outline-inbox-stack" },
 *     ]},
 *     { key: "product", label: "Product", items: [
 *       { key: "list",     label: "รายการสินค้า", icon: "outline-shopping-bag" },
 *     ]},
 *   ]}
 *   .footerItems=${[
 *     { key: "support", label: "Support", icon: "outline-user-group" },
 *     { key: "setting", label: "Setting", icon: "outline-cog-8-tooth" },
 *   ]}
 *   selected-key="overview"
 *   @menu-select=${(e) => console.log("clicked", e.detail.key)}
 * >
 *   <ssk-page-header slot="header" title="ภาพรวมร้าน"></ssk-page-header>
 *   <div>your page content</div>
 * </ssk-default-shell>
 * ```
 *
 * ### Slots (escape hatches)
 *
 * - `navbar-left`, `navbar-center`, `navbar-right` — replace the
 *   corresponding navbar region (hamburger+logo / search / bell+grid+user).
 * - `sidebar-header` — replace the account-switcher block.
 * - `sidebar-menu` — replace the prop-driven menu tree (ignores `.menu`).
 * - `sidebar-footer` — replace the footer item list (ignores `.footerItems`).
 * - default — page body, rendered inside `<ssk-feature-page-scaffold>`.
 *
 * @fires menu-select - Sidebar item clicked. `detail: { key: string }` — the
 *   `key` of the `DefaultShellMenuItem` (or footer item) the user activated.
 * @fires sidebar-toggle - Hamburger / collapse icon clicked. `detail:
 *   { collapsed: boolean }` — the *new* collapsed state.
 * @fires search-input - Search field value changed (every keystroke). `detail:
 *   { value: string }` — current text.
 * @fires search-submit - Search field committed (Enter pressed). `detail:
 *   { value: string }` — text at submit time.
 * @fires notifications-click - Bell icon in the right cluster was clicked.
 *   `detail: undefined`.
 * @fires appgrid-click - App-grid (3×3 dots) icon was clicked. `detail:
 *   undefined`.
 * @fires user-click - User avatar in the right cluster was clicked. `detail:
 *   undefined`.
 */
export class DefaultShell extends LitElement {
  static registeredName = "ssk-default-shell";

  // ── Brand ────────────────────────────────────────────────────────────
  /**
   * Friendly product brand name forwarded to the internal `<ssk-app-shell-provider>` — one of
   * `sellsuki`, `patona`, `shipmunk`, `akita`, `sellsukipay`, `sukispace`, `oc2plus`, `ccs3`.
   * Drives the injected semantic tokens for every descendant of this shell.
   */
  @property({ type: String })
  brand: AppShellBrand = "sellsuki";

  // ── Company / user identity ──────────────────────────────────────────
  /**
   * Company / workspace name shown in the sidebar account-switcher header. Leave empty to skip the header block.
   */
  @property({ type: String, attribute: "company-name" })
  companyName = "";

  /**
   * Secondary line under the company name (typically a branch or location). Rendered with `--fg-brand-primary` accent.
   */
  @property({ type: String, attribute: "company-branch" })
  companyBranch = "";

  /**
   * URL of the company avatar image rendered alongside `companyName` in the sidebar header.
   */
  @property({ type: String, attribute: "company-avatar" })
  companyAvatar = "";

  /**
   * URL of the user avatar shown at the right end of the navbar. Required for the `user-click` icon to render.
   */
  @property({ type: String, attribute: "user-avatar" })
  userAvatar = "";

  /**
   * Accessible label for the user avatar (used as `alt`). Falls back to `"user"` when omitted.
   */
  @property({ type: String, attribute: "user-name" })
  userName = "";

  // ── Logo (navbar left) ───────────────────────────────────────────────
  /**
   * URL of the brand mark rendered at the left edge of the navbar. Leave empty to omit the logo cluster.
   */
  @property({ type: String, attribute: "logo-src" })
  logoSrc = "";

  /**
   * Accessible alt text for the brand mark image. Defaults to empty — set for non-decorative logos.
   */
  @property({ type: String, attribute: "logo-alt" })
  logoAlt = "";

  /**
   * URL of the wordmark image rendered next to the brand mark. When set, the logo switches to full (mark + wordmark) layout.
   */
  @property({ type: String, attribute: "logo-name-src" })
  logoNameSrc = "";

  /**
   * Accessible alt text for the wordmark image. Pair with `logoNameSrc`.
   */
  @property({ type: String, attribute: "logo-name-alt" })
  logoNameAlt = "";

  // ── Search (navbar center) ───────────────────────────────────────────
  /**
   * Show the centered search input in the navbar. Toggle off for product flows that don't need global search.
   */
  @property({ type: Boolean, attribute: "show-search" })
  showSearch = true;

  /**
   * Placeholder text for the navbar search input. Defaults to Thai `"ค้นหา"` — localize per product.
   */
  @property({ type: String, attribute: "search-placeholder" })
  searchPlaceholder = "ค้นหา";

  /**
   * Two-way bound value of the search input. Updates on every keystroke; emits `search-input` and (on Enter) `search-submit`.
   */
  @property({ type: String, attribute: "search-value" })
  searchValue = "";

  // ── Right-cluster icons ──────────────────────────────────────────────
  /**
   * Show the notification bell icon in the navbar right cluster. Emits `notifications-click` when activated.
   */
  @property({ type: Boolean, attribute: "show-notifications" })
  showNotifications = true;

  /**
   * Show the 3×3 app-grid switcher icon in the navbar right cluster. Emits `appgrid-click` when activated.
   */
  @property({ type: Boolean, attribute: "show-app-grid" })
  showAppGrid = true;

  // ── Layout ───────────────────────────────────────────────────────────
  /**
   * Reflects collapsed state of the sidebar — toggled by the hamburger button. When true the sidebar renders in icon-only mini mode and fires `sidebar-toggle`.
   */
  @property({ type: Boolean, attribute: "sidebar-collapsed", reflect: true })
  sidebarCollapsed = false;

  /**
   * Expanded sidebar column width forwarded to `<ssk-app-shell>` (any CSS length). Defaults to `256px`.
   */
  @property({ type: String, attribute: "sidebar-width" })
  sidebarWidth = "256px";

  /**
   * Navbar row height forwarded to `<ssk-app-shell>` (any CSS length). Defaults to `64px` — matches the DS 3.0 navbar spec.
   */
  @property({ type: String, attribute: "navbar-height" })
  navbarHeight = "64px";

  // ── Menu data (prop-driven mode) ─────────────────────────────────────
  /**
   * Sidebar menu tree — array of `DefaultShellMenuGroup` (`{ key, label, items: DefaultShellMenuItem[] }`)
   * where each item has `{ key, label, icon?, disabled? }`. Set this for prop-driven rendering, or override
   * via the `sidebar-menu` slot for full markup control.
   */
  @property({ type: Array })
  menu: DefaultShellMenuGroup[] = [];

  /**
   * Footer item list rendered below the sidebar menu — array of `DefaultShellMenuItem` (`{ key, label, icon?, disabled? }`).
   * Clicks emit `menu-select` with the item's key. Override via the `sidebar-footer` slot.
   */
  @property({ type: Array })
  footerItems: DefaultShellMenuItem[] = [];

  /**
   * Key of the currently active menu item — drives the `actived` highlight in the sidebar. Updates on `menu-select` so consumers can persist state externally.
   */
  @property({ type: String, attribute: "selected-key" })
  selectedKey = "";

  /**
   * Keys of the currently expanded menu groups. Defaults to an empty array, in which case all groups expand. Updated on `expanded-groups-changed` from the sidebar.
   */
  @property({ type: Array })
  expandedGroups: string[] = [];

  // ── Render ───────────────────────────────────────────────────────────
  render() {
    return html`
      <ssk-app-shell-provider brand=${this.brand}>
        <ssk-app-shell
          navbar-height=${this.navbarHeight}
          sidebar-width=${this.sidebarWidth}
          ?sidebar-collapsed=${this.sidebarCollapsed}
        >
          <ssk-top-navbar slot="navbar">
            <slot name="navbar-left" slot="left">
              ${this._renderNavbarLeft()}
            </slot>

            <slot name="navbar-center">${this._renderSearch()}</slot>

            <slot name="navbar-right" slot="right">
              ${this._renderNavbarRight()}
            </slot>
          </ssk-top-navbar>

          <ssk-sidebar
            slot="sidebar"
            ?expanded=${!this.sidebarCollapsed}
            width="100%"
            .selectedItems=${this.selectedKey ? [this.selectedKey] : []}
            .expandedGroups=${this.expandedGroups.length
              ? this.expandedGroups
              : this.menu.map((g) => g.key)}
            @selected-items-changed=${this._onMenuSelect}
            @expanded-groups-changed=${this._onGroupToggle}
          >
            <slot name="sidebar-header" slot="header">
              ${this._renderSidebarHeader()}
            </slot>

            <slot name="sidebar-menu">${this._renderMenu()}</slot>

            <slot name="sidebar-footer" slot="footer">
              ${this._renderSidebarFooter()}
            </slot>
          </ssk-sidebar>

          <ssk-feature-page-scaffold full-height>
            <slot></slot>
          </ssk-feature-page-scaffold>
        </ssk-app-shell>
      </ssk-app-shell-provider>
    `;
  }

  // ── Default region renderers ─────────────────────────────────────────
  private _renderNavbarLeft() {
    return html`
      <div class="navbar-cluster">
        <ssk-button
          variant="ghost"
          size="sm"
          @click=${this._onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <ssk-icon name="outline-bars-3-center-left"></ssk-icon>
        </ssk-button>
        ${this.logoSrc || this.logoNameSrc
          ? html`
              <ssk-logo
                srcLogo=${this.logoSrc || nothing}
                altLogo=${this.logoAlt || nothing}
                srcLogoName=${this.logoNameSrc || nothing}
                altLogoName=${this.logoNameAlt || nothing}
                ?fullLogo=${!!this.logoNameSrc}
              ></ssk-logo>
            `
          : nothing}
      </div>
    `;
  }

  private _renderSearch() {
    if (!this.showSearch) return nothing;
    return html`
      <ssk-input
        placeholder=${this.searchPlaceholder}
        .value=${this.searchValue}
        @input=${this._onSearchInput}
        @keydown=${this._onSearchKeydown}
      >
        <ssk-icon name="outline-magnifying-glass" slot="prefix"></ssk-icon>
      </ssk-input>
    `;
  }

  private _renderNavbarRight() {
    return html`
      <div class="navbar-cluster">
        ${this.showNotifications
          ? html`<ssk-icon
              name="outline-bell"
              role="button"
              tabindex="0"
              @click=${this._onNotificationsClick}
            ></ssk-icon>`
          : nothing}
        ${this.showAppGrid
          ? html`<ssk-icon
              name="solid-point-3x3"
              role="button"
              tabindex="0"
              @click=${this._onAppGridClick}
            ></ssk-icon>`
          : nothing}
        ${this.userAvatar
          ? html`<ssk-avatar
              src=${this.userAvatar}
              alt=${this.userName || "user"}
              shape="circle"
              size="md"
              role="button"
              tabindex="0"
              @click=${this._onUserClick}
            ></ssk-avatar>`
          : nothing}
      </div>
    `;
  }

  private _renderSidebarHeader() {
    if (!this.companyName && !this.companyAvatar) return nothing;
    return html`
      <style>
        .ds-company-header {
          display: grid;
          grid-template-areas: "avatar name" "avatar branch";
          grid-template-columns: min-content 1fr;
          align-items: center;
          gap: 0 12px;
        }
        .ds-company-header .ds-avatar { grid-area: avatar; }
        .ds-company-header .ds-name {
          grid-area: name;
          font-size: var(--font-size-p, 20px);
          color: var(--text-primary, #111827);
          text-align: start;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-weight: 600;
        }
        .ds-company-header .ds-branch {
          grid-area: branch;
          font-size: var(--font-size-caption, 18px);
          color: var(--fg-brand-primary, #0ea5e9);
          text-align: start;
        }
      </style>
      <ssk-sidebar-header>
        ${this.companyAvatar
          ? html`<ssk-avatar
              src=${this.companyAvatar}
              alt=${this.companyName || "company"}
              shape="circle"
              padding="16px 0"
              slot="mini"
            ></ssk-avatar>`
          : nothing}
        <ssk-dropdown themeColor="primary" width="full" hideChevron>
          <ssk-dropdown-button slot="selected">
            <div class="ds-company-header">
              ${this.companyAvatar
                ? html`<ssk-avatar
                    class="ds-avatar"
                    src=${this.companyAvatar}
                    alt=${this.companyName || "company"}
                    shape="circle"
                  ></ssk-avatar>`
                : nothing}
              <label class="ds-name">${this.companyName}</label>
              ${this.companyBranch
                ? html`<label class="ds-branch">${this.companyBranch}</label>`
                : nothing}
            </div>
          </ssk-dropdown-button>
          <slot name="company-actions"></slot>
        </ssk-dropdown>
      </ssk-sidebar-header>
    `;
  }

  private _renderMenu() {
    if (!this.menu.length) return nothing;
    return html`
      <ssk-sidebar-list>
        ${this.menu.map(
          (group) => html`
            <ssk-sidebar-group label=${group.label} key=${group.key}>
              ${group.items.map(
                (item) => html`
                  <ssk-sidebar-item
                    key=${item.key}
                    ?disabled=${!!item.disabled}
                    ?actived=${item.key === this.selectedKey}
                  >
                    ${item.icon
                      ? html`<ssk-icon
                          slot="prefix"
                          name=${item.icon}
                        ></ssk-icon>`
                      : nothing}
                    ${item.label}
                  </ssk-sidebar-item>
                `
              )}
            </ssk-sidebar-group>
          `
        )}
      </ssk-sidebar-list>
    `;
  }

  private _renderSidebarFooter() {
    if (!this.footerItems.length) return nothing;
    return html`${this.footerItems.map(
      (item) => html`
        <ssk-sidebar-item
          key=${item.key}
          ?disabled=${!!item.disabled}
          @click=${() =>
            this.dispatchEvent(
              new CustomEvent("menu-select", {
                detail: { key: item.key },
                bubbles: true,
                composed: true,
              })
            )}
        >
          ${item.icon
            ? html`<ssk-icon slot="prefix" name=${item.icon}></ssk-icon>`
            : nothing}
          ${item.label}
        </ssk-sidebar-item>
      `
    )}`;
  }

  // ── Event handlers ───────────────────────────────────────────────────
  private _onToggleSidebar = () => {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.dispatchEvent(
      new CustomEvent("sidebar-toggle", {
        detail: { collapsed: this.sidebarCollapsed },
        bubbles: true,
        composed: true,
      })
    );
  };

  private _onSearchInput = (e: Event) => {
    const value = (e.target as HTMLInputElement | null)?.value ?? "";
    this.searchValue = value;
    this.dispatchEvent(
      new CustomEvent("search-input", {
        detail: { value },
        bubbles: true,
        composed: true,
      })
    );
  };

  private _onSearchKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      this.dispatchEvent(
        new CustomEvent("search-submit", {
          detail: { value: this.searchValue },
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  private _onNotificationsClick = () =>
    this.dispatchEvent(
      new CustomEvent("notifications-click", { bubbles: true, composed: true })
    );
  private _onAppGridClick = () =>
    this.dispatchEvent(
      new CustomEvent("appgrid-click", { bubbles: true, composed: true })
    );
  private _onUserClick = () =>
    this.dispatchEvent(
      new CustomEvent("user-click", { bubbles: true, composed: true })
    );

  private _onMenuSelect = (e: Event) => {
    const detail = (e as CustomEvent<{ key: string; selected: boolean }>).detail;
    if (detail?.selected) {
      this.selectedKey = detail.key;
      this.dispatchEvent(
        new CustomEvent("menu-select", {
          detail: { key: detail.key },
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  private _onGroupToggle = (e: Event) => {
    const detail = (e as CustomEvent<{ key: string; expanded: boolean }>).detail;
    if (!detail) return;
    const next = new Set(this.expandedGroups);
    if (detail.expanded) {
      next.add(detail.key);
    } else {
      next.delete(detail.key);
    }
    this.expandedGroups = [...next];
  };

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    .navbar-cluster {
      display: flex;
      align-items: center;
      gap: 12px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-default-shell": DefaultShell;
  }
}

if (!customElements.get("ssk-default-shell")) {
  customElements.define("ssk-default-shell", DefaultShell);
}
