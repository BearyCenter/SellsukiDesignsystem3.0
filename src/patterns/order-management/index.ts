/**
 * <ssk-pattern-order-management>
 *
 * Order Management dashboard pattern — VISUAL REFERENCE for the DS 2.0 Vibe
 * Code Demo quality bar (https://sellsukidesignsystemv12-2bee.vercel.app/).
 * Renders stat cards, status tabs, order table, search, filter/export,
 * pagination, and a fully populated sidebar — all behind a brand-aware
 * <ssk-app-shell-provider>.
 *
 * ⚠ This pattern is intentionally implemented as hand-rolled HTML + CSS with
 *   sprinkled ssk-* primitives (~39% ssk-* tags vs ~61% raw div/table/button).
 *   It exists to PIXEL-MATCH the DS 2.0 visual demo, not to be the shape AI
 *   vibe-code agents emit into consumer code.
 *
 *   For actual product code, use the composition track instead:
 *     <ssk-default-shell brand="..." .menu={...}>
 *       <ssk-page-header slot="header" title="..."></ssk-page-header>
 *       <ssk-widget-matric label="..." value="..."></ssk-widget-matric>
 *       <ssk-table>...</ssk-table>
 *     </ssk-default-shell>
 *
 *   Do NOT copy this file's inline class names (.stat, .navbar, .tab, …)
 *   into consumer code — they are internal to this pattern's CSS and may
 *   change without notice.
 *
 *   See `src/patterns/types.ts` top-of-file comment + plan §11 for the
 *   two-track philosophy explanation.
 *
 * Side-effect imports below ensure every <ssk-*> dependency this pattern emits
 * is registered with the custom-element registry. Without these, consumers
 * (ds3-preview, AI vibecode previews) would see un-upgraded HTML elements.
 */

import { LitElement, css, html, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import "../../components/app-shell";
import "../../components/app-shell/provider";
import "../../components/card";
import "../../contexts/theme";
import "../../components/page-header";
import "../../components/pagination";
import "../../components/sidebar";
import "../../elements/avatar";
import "../../elements/badge";
import "../../elements/button";
import "../../elements/heading";
import "../../elements/icon";
import "../../elements/input";
import "../../elements/logo";
import "../../elements/tag";
import "../../elements/text";
import "../../elements/top-navbar";
import { register } from "../registry";
import type { Brand, PatternMetadata } from "../types";
import {
  orderManagementMock,
  type OrderManagementData,
  type OrderRow,
  type OrderStatus,
  type StatCard,
  type StatusTab,
} from "./mock";

const TAG_NAME = "ssk-pattern-order-management" as const;

const fmtBaht = (n: number): string =>
  "฿" + n.toLocaleString("th-TH", { minimumFractionDigits: 0 });

const statusToTone = (
  s: OrderStatus,
): "success" | "warning" | "info" | "danger" | "neutral" => {
  switch (s) {
    case "ชำระแล้ว":     return "success";
    case "สำเร็จ":         return "success";
    case "กำลังจัดส่ง":  return "info";
    case "รอชำระ":         return "warning";
    case "ยกเลิก":         return "danger";
  }
};

export class OrderManagementPattern extends LitElement {
  static registeredName = TAG_NAME;

  static metadata: PatternMetadata<OrderManagementData> = {
    name: "order-management",
    tagName: TAG_NAME,
    description:
      "Order list dashboard — 4 KPI stat cards, status tab filter, order table, search, filter/export, pagination",
    defaultData: orderManagementMock,
    richness: {
      requiresAppShell: true,
      minStatCards: 4,
      minTableRows: 5,
      requiresPagination: true,
      requiresSearch: true,
      requiresTabs: true,
    },
  };

  /** Brand attribute applied to the wrapping <ssk-app-shell-provider>. */
  @property({ type: String })
  brand: Brand = "ccs3";

  /** Optional data override. Falls back to defaultData when undefined. */
  @property({ attribute: false })
  data?: OrderManagementData;

  /**
   * Static helper used by the contract test + ds3-mcp to obtain the rendered
   * HTML signature without instantiating a DOM element. Implementation lives
   * in `to-html-string.ts` to keep the runtime element bundle lean.
   */
  static toHtmlString(brand: Brand, data?: OrderManagementData): string {
    return toHtmlString(brand, data ?? orderManagementMock);
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      font-family: var(--font-p, sans-serif);
      color: var(--text-primary, #111827);
    }
    .page {
      padding: var(--space-page-y, 24px) var(--space-page-x, 24px);
      background: var(--bg-quaternary, #f8fafc);
      min-height: 100%;
      box-sizing: border-box;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: var(--space-stack, 16px);
      margin-bottom: var(--space-section, 24px);
    }
    .stat {
      padding: var(--space-container-x, 20px);
      background: var(--bg-primary, #fff);
      border: 1px solid var(--stroke-secondary, #e5e7eb);
      border-radius: var(--radius-lg, 12px);
      box-shadow: var(--elevation-sm, 0 1px 3px rgba(0, 0, 0, 0.08));
    }
    .stat-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .stat-label {
      font-size: var(--font-size-label, 20px);
      color: var(--text-secondary, #6b7280);
    }
    .stat-value {
      margin-top: var(--space-cluster, 8px);
      font-size: var(--font-size-h2, 36px);
      font-weight: var(--weight-h3, 700);
      color: var(--text-primary, #111827);
    }
    .stat-delta {
      margin-top: 4px;
      font-size: var(--font-size-caption, 18px);
    }
    .stat-delta.up   { color: var(--fg-success-primary, #059669); }
    .stat-delta.down { color: var(--fg-danger-primary,  #e11d48); }

    .panel {
      background: var(--bg-primary, #fff);
      border: 1px solid var(--stroke-secondary, #e5e7eb);
      border-radius: var(--radius-lg, 12px);
      overflow: hidden;
    }
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-container-y, 16px) var(--space-container-x, 20px);
      border-bottom: 1px solid var(--stroke-secondary, #e5e7eb);
      gap: var(--space-row, 12px);
    }
    .toolbar-actions { display: flex; gap: var(--space-cluster, 8px); }

    .tabs {
      display: flex;
      gap: var(--space-cluster, 8px);
      padding: var(--space-row, 12px) var(--space-container-x, 20px);
      border-bottom: 1px solid var(--stroke-secondary, #e5e7eb);
      overflow-x: auto;
    }
    .tab {
      display: inline-flex;
      align-items: center;
      gap: var(--space-cluster, 8px);
      padding: var(--space-cluster, 8px) var(--space-stack, 16px);
      border-radius: var(--radius-full, 9999px);
      font-family: var(--font-label, sans-serif);
      font-size: var(--font-size-label, 20px);
      font-weight: var(--weight-button, 600);
      background: transparent;
      color: var(--text-secondary, #6b7280);
      border: 1px solid var(--stroke-secondary, #e5e7eb);
      cursor: pointer;
      white-space: nowrap;
    }
    .tab[aria-selected="true"] {
      background: var(--bg-brand-secondary, #e0f2fe);
      color: var(--fg-brand-primary, #0ea5e9);
      border-color: var(--fg-brand-primary, #0ea5e9);
    }
    .tab-count {
      padding: 2px var(--space-cluster, 8px);
      border-radius: var(--radius-full, 9999px);
      background: var(--bg-secondary, #f3f4f6);
      font-size: var(--font-size-caption, 18px);
    }

    .table-wrap { overflow-x: auto; }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--font-size-p, 20px);
    }
    thead tr {
      background: var(--bg-secondary, #f9fafb);
      text-align: left;
    }
    th, td {
      padding: var(--space-table-cell-y, 14px) var(--space-table-cell-x, 20px);
      border-bottom: 1px solid var(--stroke-secondary, #e5e7eb);
    }
    th {
      font-size: var(--font-size-label, 20px);
      font-weight: var(--weight-button, 600);
      color: var(--text-secondary, #6b7280);
    }
    .order-id {
      font-family: var(--font-mono, ui-monospace, monospace);
      color: var(--fg-brand-primary, #0ea5e9);
      font-size: var(--font-size-p, 20px);
      white-space: nowrap;
    }
    td.amount { text-align: right; font-weight: 600; }
    td.date   { color: var(--text-secondary, #6b7280); }

    .footer {
      padding: var(--space-container-y, 16px) var(--space-container-x, 20px);
      border-top: 1px solid var(--stroke-secondary, #e5e7eb);
    }

    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      padding: 0 var(--space-page-x, 24px);
      background: var(--bg-primary, #fff);
      border-bottom: 1px solid var(--stroke-secondary, #e5e7eb);
    }
    .navbar-left  { display: flex; align-items: center; gap: var(--space-row, 12px); }
    .navbar-right { display: flex; align-items: center; gap: var(--space-stack, 16px); }
    .navbar-title {
      font-size: var(--font-size-label, 20px);
      font-weight: var(--weight-button, 600);
      color: var(--text-primary, #111827);
    }

    .sidebar-pad     { padding: var(--space-row, 12px); }
    .sidebar-section {
      padding: var(--space-cluster, 8px) var(--space-stack, 16px);
      font-size: var(--font-size-caption, 18px);
      font-weight: var(--weight-button, 600);
      color: var(--text-secondary, #6b7280);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
  `;

  protected render(): TemplateResult {
    const d = this.data ?? orderManagementMock;
    const totalPages = Math.ceil(d.pagination.total / d.pagination.pageSize);

    return html`
      <ssk-app-shell-provider brand=${this.brand}>
        <ssk-app-shell style="height: 100%; display: block;">
          ${this._renderNavbar(d)}
          ${this._renderSidebar(d)}
          <div class="page">
            ${this._renderHeader(d)}
            ${this._renderStats(d)}
            ${this._renderOrderPanel(d, totalPages)}
          </div>
        </ssk-app-shell>
      </ssk-app-shell-provider>
    `;
  }

  private _renderNavbar(d: OrderManagementData): TemplateResult {
    return html`
      <div slot="navbar" class="navbar">
        <div class="navbar-left">
          <ssk-logo></ssk-logo>
          <span class="navbar-title">${d.brandHeaderLabel}</span>
        </div>
        <div class="navbar-right">
          <ssk-input
            placeholder=${d.searchPlaceholder}
            style="width: 320px;"
          ></ssk-input>
          <ssk-avatar shape="circle" size="md">${d.userInitials}</ssk-avatar>
        </div>
      </div>
    `;
  }

  private _renderSidebar(d: OrderManagementData): TemplateResult {
    return html`
      <ssk-sidebar slot="sidebar" expanded width="100%" style="height:100%;">
        <ssk-sidebar-group label="เมนูหลัก" key="main" expanded>
          ${d.sidebar.map(
            (item) => html`
              <ssk-sidebar-item
                key=${item.key}
                ?actived=${item.active === true}
              >
                <ssk-icon slot="prefix" name=${item.iconName}></ssk-icon>
                ${item.label}
              </ssk-sidebar-item>
            `,
          )}
        </ssk-sidebar-group>
      </ssk-sidebar>
    `;
  }

  private _renderHeader(d: OrderManagementData): TemplateResult {
    // Use canonical <ssk-page-header> (h4 24px) — DS 3.0 inline page header
    // standard, fits embedded preview contexts. See CLAUDE.md "Page title
    // (most pages) → --font-size-h4 via <ssk-page-header>".
    return html`
      <ssk-page-header
        title=${d.pageTitle}
        subtitle=${d.pageSubtitle}
      >
        <ssk-button slot="actions" variant="solid" tone="brand">
          <ssk-icon slot="leading" name="outline-plus"></ssk-icon>
          ${d.primaryActionLabel}
        </ssk-button>
      </ssk-page-header>
    `;
  }

  private _renderStats(d: OrderManagementData): TemplateResult {
    return html`
      <section class="stats">
        ${d.stats.map((s) => this._renderStatCard(s))}
      </section>
    `;
  }

  private _renderStatCard(s: StatCard): TemplateResult {
    const trend = s.trend === "up" ? "up" : "down";
    const arrow = s.trend === "up" ? "↗" : "↘";
    return html`
      <div class="stat">
        <div class="stat-row">
          <span class="stat-label">${s.label}</span>
          <ssk-icon
            name=${s.iconName}
            style="color: var(--fg-brand-primary);"
          ></ssk-icon>
        </div>
        <div class="stat-value">${s.value}</div>
        <div class="stat-delta ${trend}">
          ${arrow} ${Math.abs(s.deltaPct)}% vs yesterday
        </div>
      </div>
    `;
  }

  private _renderOrderPanel(
    d: OrderManagementData,
    totalPages: number,
  ): TemplateResult {
    return html`
      <div class="panel">
        <div class="toolbar">
          <ssk-heading level="4">รายการออเดอร์</ssk-heading>
          <div class="toolbar-actions">
            <ssk-button variant="outline" tone="brand">
              <ssk-icon slot="leading" name="outline-funnel"></ssk-icon>
              Filter
            </ssk-button>
            <ssk-button variant="outline" tone="brand">
              <ssk-icon
                slot="leading"
                name="outline-arrow-down-tray"
              ></ssk-icon>
              Export
            </ssk-button>
          </div>
        </div>

        <div class="tabs" role="tablist">
          ${d.statusTabs.map((t, i) => this._renderTab(t, i === 0))}
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>ลูกค้า</th>
                <th>ช่องทาง</th>
                <th style="text-align:right;">ยอดเงิน</th>
                <th>สถานะ</th>
                <th>วันที่</th>
              </tr>
            </thead>
            <tbody>
              ${d.orders.map((o) => this._renderOrderRow(o))}
            </tbody>
          </table>
        </div>

        <div class="footer">
          <ssk-pagination
            .currentPage=${d.pagination.page}
            .totalPages=${totalPages}
            .rowsPerPage=${d.pagination.pageSize}
            .allItems=${d.pagination.total}
            showrowsperpage
          ></ssk-pagination>
        </div>
      </div>
    `;
  }

  private _renderTab(t: StatusTab, active: boolean): TemplateResult {
    return html`
      <button
        class="tab"
        role="tab"
        aria-selected=${active ? "true" : "false"}
        data-tab=${t.key}
      >
        ${t.label}
        <span class="tab-count">${t.count}</span>
      </button>
    `;
  }

  private _renderOrderRow(o: OrderRow): TemplateResult {
    const tone = statusToTone(o.status);
    return html`
      <tr>
        <td><span class="order-id">${o.id}</span></td>
        <td>${o.customer}</td>
        <td><ssk-tag variant="subtle">${o.channel}</ssk-tag></td>
        <td class="amount">${fmtBaht(o.amount)}</td>
        <td>
          <ssk-badge themeColor=${tone} variant="subtle">${o.status}</ssk-badge>
        </td>
        <td class="date">${o.date}</td>
      </tr>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: OrderManagementPattern;
  }
}

if (!customElements.get(TAG_NAME)) {
  customElements.define(TAG_NAME, OrderManagementPattern);
}

register(OrderManagementPattern as unknown as Parameters<typeof register>[0]);

// Lazy-loaded HTML stringifier — pulled in only when contract test or MCP need it.
function toHtmlString(brand: Brand, data: OrderManagementData): string {
  // Minimal stringifier: emits the same tag tree as render() but without Lit's
  // runtime. Used for contract validation; not for production rendering.
  const arrow = (t: "up" | "down") => (t === "up" ? "↗" : "↘");
  const trendCls = (t: "up" | "down") => (t === "up" ? "up" : "down");
  const fmtTab = (t: StatusTab, active: boolean) =>
    `<button class="tab" role="tab" aria-selected="${active}" data-tab="${t.key}">${t.label}<span class="tab-count">${t.count}</span></button>`;
  const fmtStat = (s: StatCard) =>
    `<div class="stat"><div class="stat-row"><span class="stat-label">${s.label}</span><ssk-icon name="${s.iconName}" style="color: var(--fg-brand-primary);"></ssk-icon></div><div class="stat-value">${s.value}</div><div class="stat-delta ${trendCls(s.trend)}">${arrow(s.trend)} ${Math.abs(s.deltaPct)}% vs yesterday</div></div>`;
  const fmtRow = (o: OrderRow) =>
    `<tr><td><span class="order-id">${o.id}</span></td><td>${o.customer}</td><td><ssk-tag variant="subtle">${o.channel}</ssk-tag></td><td class="amount">${fmtBaht(o.amount)}</td><td><ssk-badge themeColor="${statusToTone(o.status)}" variant="subtle">${o.status}</ssk-badge></td><td class="date">${o.date}</td></tr>`;
  const fmtSidebar = (i: { key: string; label: string; iconName: string; badge?: number; active?: boolean }) =>
    `<ssk-sidebar-item key="${i.key}"${i.active ? " actived" : ""}><ssk-icon slot="prefix" name="${i.iconName}"></ssk-icon>${i.label}</ssk-sidebar-item>`;
  const totalPages = Math.ceil(data.pagination.total / data.pagination.pageSize);

  return `<ssk-app-shell-provider brand="${brand}"><ssk-app-shell style="height: 100%; display: block;"><div slot="navbar" class="navbar"><div class="navbar-left"><ssk-logo></ssk-logo><span class="navbar-title">${data.brandHeaderLabel}</span></div><div class="navbar-right"><ssk-input placeholder="${data.searchPlaceholder}" style="width: 320px;"></ssk-input><ssk-avatar shape="circle" size="md">${data.userInitials}</ssk-avatar></div></div><ssk-sidebar slot="sidebar" expanded width="100%" style="height:100%;"><ssk-sidebar-group label="เมนูหลัก" key="main" expanded>${data.sidebar.map(fmtSidebar).join("")}</ssk-sidebar-group></ssk-sidebar><div class="page"><ssk-page-header title="${data.pageTitle}" subtitle="${data.pageSubtitle}"><ssk-button slot="actions" variant="solid" tone="brand"><ssk-icon slot="leading" name="outline-plus"></ssk-icon>${data.primaryActionLabel}</ssk-button></ssk-page-header><section class="stats">${data.stats.map(fmtStat).join("")}</section><div class="panel"><div class="toolbar"><ssk-heading level="4">รายการออเดอร์</ssk-heading><div class="toolbar-actions"><ssk-button variant="outline" tone="brand"><ssk-icon slot="leading" name="outline-funnel"></ssk-icon>Filter</ssk-button><ssk-button variant="outline" tone="brand"><ssk-icon slot="leading" name="outline-arrow-down-tray"></ssk-icon>Export</ssk-button></div></div><div class="tabs" role="tablist">${data.statusTabs.map((t, i) => fmtTab(t, i === 0)).join("")}</div><div class="table-wrap"><table><thead><tr><th>Order ID</th><th>ลูกค้า</th><th>ช่องทาง</th><th style="text-align:right;">ยอดเงิน</th><th>สถานะ</th><th>วันที่</th></tr></thead><tbody>${data.orders.map(fmtRow).join("")}</tbody></table></div><div class="footer"><ssk-pagination currentPage="${data.pagination.page}" totalPages="${totalPages}" rowsPerPage="${data.pagination.pageSize}" allItems="${data.pagination.total}" showrowsperpage></ssk-pagination></div></div></div></ssk-app-shell></ssk-app-shell-provider>`;
}
