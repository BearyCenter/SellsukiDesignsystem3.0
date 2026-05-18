/**
 * <ssk-pattern-product-list>
 *
 * Product List page pattern — VISUAL REFERENCE for the DS 2.0 Vibe Code Demo
 * quality bar. Renders 4 stat cards, status tabs, product table (thumbnail /
 * name+SKU / category / price / stock / status), search, filter/export,
 * pagination, and a populated sidebar — all behind a brand-aware
 * <ssk-app-shell-provider>.
 *
 * ⚠ Like Pattern #1, this is hand-rolled HTML + CSS with sprinkled ssk-*
 *   primitives (~34% ssk-* tags). For real product code use
 *   `<ssk-default-shell>` + ssk-* body components instead — see
 *   `src/patterns/types.ts` top-of-file comment for the two-track philosophy.
 *
 * Scaffolded 2026-05-18 to validate Pattern SoT's scale claim — the
 * structural skeleton mirrors Pattern #1 (Order Management) so effort can
 * be measured against the ≤30%-of-pattern-#1 target. Look for
 * `🎨 DESIGNER TODO` markers throughout this file + mock.ts for the spots
 * the Designer team should refine before declaring the pattern shipped.
 */

import { LitElement, css, html, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import "../../components/app-shell";
import "../../components/app-shell/provider";
import "../../components/page-header";
import "../../components/pagination";
import "../../components/sidebar";
import "../../contexts/theme";
import "../../elements/avatar";
import "../../elements/badge";
import "../../elements/button";
import "../../elements/heading";
import "../../elements/icon";
import "../../elements/image";
import "../../elements/input";
import "../../elements/logo";
import "../../elements/tag";
import "../../elements/text";
import "../../elements/top-navbar";
import { register } from "../registry";
import type { Brand, PatternMetadata } from "../types";
import {
  productListMock,
  type ProductListData,
  type ProductRow,
  type ProductStatus,
  type StatCard,
  type StatusTab,
} from "./mock";

const TAG_NAME = "ssk-pattern-product-list" as const;

const fmtBaht = (n: number): string =>
  "฿" + n.toLocaleString("th-TH", { minimumFractionDigits: 0 });

/**
 * 🎨 DESIGNER TODO: confirm stock-indicator color thresholds.
 * Current heuristic: 0 → danger, 1-5 → warning, else neutral text.
 */
const stockToTone = (n: number): "danger" | "warning" | "neutral" => {
  if (n === 0) return "danger";
  if (n <= 5) return "warning";
  return "neutral";
};

const statusToTone = (
  s: ProductStatus,
): "success" | "warning" | "info" | "danger" | "neutral" => {
  switch (s) {
    case "เผยแพร่":   return "success";
    case "ฉบับร่าง":  return "neutral";
    case "สต็อกต่ำ":  return "warning";
    case "หมดสต็อก":  return "danger";
    case "ระงับ":     return "danger";
  }
};

export class ProductListPattern extends LitElement {
  static registeredName = TAG_NAME;

  static metadata: PatternMetadata<ProductListData> = {
    name: "product-list",
    tagName: TAG_NAME,
    description:
      "Product list dashboard — 4 KPI stat cards, status tab filter, product table with thumbnail/name/SKU/category/price/stock/status, search, filter/export, pagination",
    defaultData: productListMock,
    // Mirrors Pattern #1's contract — same structural floor for scale-claim
    // validation. Adjust upward only if a real design requirement appears.
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
  data?: ProductListData;

  /**
   * Static helper used by the contract test + ds3-mcp to obtain the rendered
   * HTML signature without instantiating a DOM element. Implementation lives
   * at the bottom of this file (mirroring Pattern #1's pattern).
   */
  static toHtmlString(brand: Brand, data?: ProductListData): string {
    return toHtmlString(brand, data ?? productListMock);
  }

  // Styles copied from Pattern #1 (Order Management) verbatim — the layout
  // skeleton is identical. Any future stat/table/tab/toolbar visual change
  // should land in BOTH patterns until we extract a shared CSS module.
  // 🎨 DESIGNER TODO: optionally extract these into src/patterns/_shell.css.
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
    .product-cell {
      display: flex;
      align-items: center;
      gap: var(--space-row, 12px);
      min-width: 220px;
    }
    .product-thumb {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-sm, 4px);
      object-fit: cover;
      background: var(--bg-secondary, #f3f4f6);
    }
    .product-name { font-weight: 600; color: var(--text-primary, #111827); }
    .product-sku {
      font-family: var(--font-mono, ui-monospace, monospace);
      font-size: var(--font-size-caption, 18px);
      color: var(--text-secondary, #6b7280);
    }
    .product-id {
      font-family: var(--font-mono, ui-monospace, monospace);
      color: var(--fg-brand-primary, #0ea5e9);
      font-size: var(--font-size-p, 20px);
      white-space: nowrap;
    }
    td.amount { text-align: right; font-weight: 600; }
    td.stock { text-align: right; font-variant-numeric: tabular-nums; }
    td.stock.warning { color: var(--fg-warning-primary, #d97706); font-weight: 600; }
    td.stock.danger  { color: var(--fg-danger-primary,  #e11d48); font-weight: 600; }
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
  `;

  protected render(): TemplateResult {
    const d = this.data ?? productListMock;
    const totalPages = Math.ceil(d.pagination.total / d.pagination.pageSize);

    return html`
      <ssk-app-shell-provider brand=${this.brand}>
        <ssk-app-shell style="height: 100%; display: block;">
          ${this._renderNavbar(d)}
          ${this._renderSidebar(d)}
          <div class="page">
            ${this._renderHeader(d)}
            ${this._renderStats(d)}
            ${this._renderProductPanel(d, totalPages)}
          </div>
        </ssk-app-shell>
      </ssk-app-shell-provider>
    `;
  }

  private _renderNavbar(d: ProductListData): TemplateResult {
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

  private _renderSidebar(d: ProductListData): TemplateResult {
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

  private _renderHeader(d: ProductListData): TemplateResult {
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

  private _renderStats(d: ProductListData): TemplateResult {
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
          ${arrow} ${Math.abs(s.deltaPct)}% vs last week
        </div>
      </div>
    `;
  }

  private _renderProductPanel(
    d: ProductListData,
    totalPages: number,
  ): TemplateResult {
    return html`
      <div class="panel">
        <div class="toolbar">
          <ssk-heading level="4">รายการสินค้า</ssk-heading>
          <div class="toolbar-actions">
            <!-- 🎨 DESIGNER TODO: Filter UX. Dropdown? Slide-over drawer?
                 Pattern #1 uses a button placeholder, refine here. -->
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
                <th>Product ID</th>
                <th>สินค้า</th>
                <th>หมวดหมู่</th>
                <th style="text-align:right;">ราคา</th>
                <th style="text-align:right;">สต็อก</th>
                <th>สถานะ</th>
                <th>อัพเดตล่าสุด</th>
              </tr>
            </thead>
            <tbody>
              ${d.products.map((p) => this._renderProductRow(p))}
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

  private _renderProductRow(p: ProductRow): TemplateResult {
    const stockTone = stockToTone(p.stock);
    const statusTone = statusToTone(p.status);
    return html`
      <tr>
        <td><span class="product-id">${p.id}</span></td>
        <td>
          <div class="product-cell">
            <!-- 🎨 DESIGNER TODO: thumbnail UX (placeholder vs slot vs icon fallback) -->
            <img class="product-thumb" src=${p.imageUrl} alt="" loading="lazy" />
            <div>
              <div class="product-name">${p.name}</div>
              <div class="product-sku">${p.sku}</div>
            </div>
          </div>
        </td>
        <td><ssk-tag variant="subtle">${p.category}</ssk-tag></td>
        <td class="amount">${fmtBaht(p.price)}</td>
        <td class="stock ${stockTone === "neutral" ? "" : stockTone}">${p.stock}</td>
        <td>
          <ssk-badge themeColor=${statusTone} variant="subtle">${p.status}</ssk-badge>
        </td>
        <td class="date">${p.updatedAt}</td>
      </tr>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: ProductListPattern;
  }
}

if (!customElements.get(TAG_NAME)) {
  customElements.define(TAG_NAME, ProductListPattern);
}

register(ProductListPattern as unknown as Parameters<typeof register>[0]);

// HTML stringifier — mirrors render() output as a flat string for contract
// tests + ds3-mcp. Kept in this file (rather than a separate to-html-string.ts)
// because Pattern #1's split has not yet shown a maintenance benefit; if both
// patterns grow large we can extract to a shared helper.
function toHtmlString(brand: Brand, data: ProductListData): string {
  const arrow = (t: "up" | "down") => (t === "up" ? "↗" : "↘");
  const trendCls = (t: "up" | "down") => (t === "up" ? "up" : "down");
  const fmtTab = (t: StatusTab, active: boolean) =>
    `<button class="tab" role="tab" aria-selected="${active}" data-tab="${t.key}">${t.label}<span class="tab-count">${t.count}</span></button>`;
  const fmtStat = (s: StatCard) =>
    `<div class="stat"><div class="stat-row"><span class="stat-label">${s.label}</span><ssk-icon name="${s.iconName}" style="color: var(--fg-brand-primary);"></ssk-icon></div><div class="stat-value">${s.value}</div><div class="stat-delta ${trendCls(s.trend)}">${arrow(s.trend)} ${Math.abs(s.deltaPct)}% vs last week</div></div>`;
  const fmtRow = (p: ProductRow) => {
    const stockTone = stockToTone(p.stock);
    const statusTone = statusToTone(p.status);
    return `<tr><td><span class="product-id">${p.id}</span></td><td><div class="product-cell"><img class="product-thumb" src="${p.imageUrl}" alt="" loading="lazy" /><div><div class="product-name">${p.name}</div><div class="product-sku">${p.sku}</div></div></div></td><td><ssk-tag variant="subtle">${p.category}</ssk-tag></td><td class="amount">${fmtBaht(p.price)}</td><td class="stock ${stockTone === "neutral" ? "" : stockTone}">${p.stock}</td><td><ssk-badge themeColor="${statusTone}" variant="subtle">${p.status}</ssk-badge></td><td class="date">${p.updatedAt}</td></tr>`;
  };
  const fmtSidebar = (i: { key: string; label: string; iconName: string; badge?: number; active?: boolean }) =>
    `<ssk-sidebar-item key="${i.key}"${i.active ? " actived" : ""}><ssk-icon slot="prefix" name="${i.iconName}"></ssk-icon>${i.label}</ssk-sidebar-item>`;
  const totalPages = Math.ceil(data.pagination.total / data.pagination.pageSize);

  return `<ssk-app-shell-provider brand="${brand}"><ssk-app-shell style="height: 100%; display: block;"><div slot="navbar" class="navbar"><div class="navbar-left"><ssk-logo></ssk-logo><span class="navbar-title">${data.brandHeaderLabel}</span></div><div class="navbar-right"><ssk-input placeholder="${data.searchPlaceholder}" style="width: 320px;"></ssk-input><ssk-avatar shape="circle" size="md">${data.userInitials}</ssk-avatar></div></div><ssk-sidebar slot="sidebar" expanded width="100%" style="height:100%;"><ssk-sidebar-group label="เมนูหลัก" key="main" expanded>${data.sidebar.map(fmtSidebar).join("")}</ssk-sidebar-group></ssk-sidebar><div class="page"><ssk-page-header title="${data.pageTitle}" subtitle="${data.pageSubtitle}"><ssk-button slot="actions" variant="solid" tone="brand"><ssk-icon slot="leading" name="outline-plus"></ssk-icon>${data.primaryActionLabel}</ssk-button></ssk-page-header><section class="stats">${data.stats.map(fmtStat).join("")}</section><div class="panel"><div class="toolbar"><ssk-heading level="4">รายการสินค้า</ssk-heading><div class="toolbar-actions"><ssk-button variant="outline" tone="brand"><ssk-icon slot="leading" name="outline-funnel"></ssk-icon>Filter</ssk-button><ssk-button variant="outline" tone="brand"><ssk-icon slot="leading" name="outline-arrow-down-tray"></ssk-icon>Export</ssk-button></div></div><div class="tabs" role="tablist">${data.statusTabs.map((t, i) => fmtTab(t, i === 0)).join("")}</div><div class="table-wrap"><table><thead><tr><th>Product ID</th><th>สินค้า</th><th>หมวดหมู่</th><th style="text-align:right;">ราคา</th><th style="text-align:right;">สต็อก</th><th>สถานะ</th><th>อัพเดตล่าสุด</th></tr></thead><tbody>${data.products.map(fmtRow).join("")}</tbody></table></div><div class="footer"><ssk-pagination currentPage="${data.pagination.page}" totalPages="${totalPages}" rowsPerPage="${data.pagination.pageSize}" allItems="${data.pagination.total}" showrowsperpage></ssk-pagination></div></div></div></ssk-app-shell></ssk-app-shell-provider>`;
}
