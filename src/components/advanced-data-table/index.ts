import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

// ── Public types ───────────────────────────────────────────────────────────

export interface ADTColumn {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  render?: (value: unknown, row: ADTRow) => TemplateResult | string;
}

export interface ADTRow {
  id: string;
  expandContent?: TemplateResult | string;
  [key: string]: unknown;
}

export interface ADTSortChangeEvent {
  key: string;
  dir: "asc" | "desc";
}

export interface ADTPageChangeEvent {
  page: number;
}

export interface ADTSelectionChangeEvent {
  selected: string[];
}

export interface ADTBulkActionEvent {
  action: string;
  selected: string[];
}

// ── Component ──────────────────────────────────────────────────────────────

export class AdvancedDataTable extends LitElement {
  static registeredName = "ds-advanced-data-table";

  @property({ type: Array }) columns: ADTColumn[] = [];
  @property({ type: Array }) rows: ADTRow[] = [];
  @property({ type: Boolean }) loading = false;
  @property({ type: String, attribute: "empty-message" }) emptyMessage = "No data";
  @property({ type: Number }) page = 1;
  @property({ type: Number, attribute: "page-size" }) pageSize = 20;
  @property({ type: Number }) total = 0;
  @property({ type: Array, attribute: "page-size-options" })
    pageSizeOptions: number[] = [10, 20, 50, 100];
  @property({ type: Boolean }) selectable = false;
  @property({ type: Boolean }) expandable = false;
  @property({ type: String, attribute: "sort-key" }) sortKey = "";
  @property({ type: String, attribute: "sort-dir" }) sortDir: "asc" | "desc" = "asc";
  @property({ type: String, attribute: "test-id" }) testId?: string;

  @state() private _selected = new Set<string>();
  @state() private _expanded = new Set<string>();

  // ── Selection ────────────────────────────────────────────────────────────

  private get _allSelected() {
    return this.rows.length > 0 && this.rows.every(r => this._selected.has(r.id));
  }

  private get _someSelected() {
    return this.rows.some(r => this._selected.has(r.id)) && !this._allSelected;
  }

  private _toggleAll() {
    if (this._allSelected) {
      this.rows.forEach(r => this._selected.delete(r.id));
    } else {
      this.rows.forEach(r => this._selected.add(r.id));
    }
    this._selected = new Set(this._selected);
    this._emitSelection();
  }

  private _toggleRow(id: string) {
    if (this._selected.has(id)) {
      this._selected.delete(id);
    } else {
      this._selected.add(id);
    }
    this._selected = new Set(this._selected);
    this._emitSelection();
  }

  private _emitSelection() {
    this.dispatchEvent(new CustomEvent<ADTSelectionChangeEvent>("selection-change", {
      detail: { selected: [...this._selected] },
      bubbles: true,
      composed: true,
    }));
  }

  // ── Sort ─────────────────────────────────────────────────────────────────

  private _onSort(key: string) {
    const dir = this.sortKey === key && this.sortDir === "asc" ? "desc" : "asc";
    this.sortKey = key;
    this.sortDir = dir;
    this.dispatchEvent(new CustomEvent<ADTSortChangeEvent>("sort-change", {
      detail: { key, dir },
      bubbles: true,
      composed: true,
    }));
  }

  // ── Expand ───────────────────────────────────────────────────────────────

  private _toggleExpand(id: string) {
    if (this._expanded.has(id)) {
      this._expanded.delete(id);
    } else {
      this._expanded.add(id);
    }
    this._expanded = new Set(this._expanded);
  }

  // ── Pagination ───────────────────────────────────────────────────────────

  private get _totalPages() {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  private _goTo(page: number) {
    if (page < 1 || page > this._totalPages) return;
    this.dispatchEvent(new CustomEvent<ADTPageChangeEvent>("page-change", {
      detail: { page },
      bubbles: true,
      composed: true,
    }));
  }

  private _onPageSizeChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.dispatchEvent(new CustomEvent("page-size-change", {
      detail: { pageSize: Number(select.value) },
      bubbles: true,
      composed: true,
    }));
  }

  // ── Bulk action ──────────────────────────────────────────────────────────

  private _onBulkAction(action: string) {
    this.dispatchEvent(new CustomEvent<ADTBulkActionEvent>("bulk-action", {
      detail: { action, selected: [...this._selected] },
      bubbles: true,
      composed: true,
    }));
  }

  private _clearSelection() {
    this._selected = new Set();
    this._emitSelection();
  }

  // ── Render helpers ───────────────────────────────────────────────────────

  private _sortIcon(key: string) {
    if (this.sortKey !== key) {
      return html`<span class="sort-icon neutral">↕</span>`;
    }
    return html`<span class="sort-icon active">${this.sortDir === "asc" ? "↑" : "↓"}</span>`;
  }

  private _renderSkeletonRows() {
    return Array.from({ length: this.pageSize > 5 ? 5 : this.pageSize }, (_, i) => html`
      <tr key=${i} class="skeleton-row">
        ${this.selectable ? html`<td><div class="skel skel-check"></div></td>` : nothing}
        ${this.expandable ? html`<td></td>` : nothing}
        ${this.columns.map(() => html`
          <td><div class="skel" style="width:${60 + Math.random() * 40}%"></div></td>
        `)}
      </tr>
    `);
  }

  private _renderCell(col: ADTColumn, row: ADTRow) {
    const value = row[col.key];
    if (col.render) {
      const rendered = col.render(value, row);
      return html`${rendered}`;
    }
    return html`${value ?? "—"}`;
  }

  private _renderRow(row: ADTRow) {
    const isSelected = this._selected.has(row.id);
    const isExpanded = this._expanded.has(row.id);

    return html`
      <tr class="data-row ${isSelected ? "selected" : ""}">
        ${this.selectable ? html`
          <td class="col-check">
            <input
              type="checkbox"
              class="row-check"
              .checked=${isSelected}
              @change=${() => this._toggleRow(row.id)}
              aria-label="Select row"
            />
          </td>
        ` : nothing}
        ${this.expandable ? html`
          <td class="col-expand">
            ${row.expandContent ? html`
              <button
                class="expand-btn ${isExpanded ? "expanded" : ""}"
                @click=${() => this._toggleExpand(row.id)}
                aria-label="${isExpanded ? "Collapse row" : "Expand row"}"
                aria-expanded=${isExpanded}
              >▶</button>
            ` : nothing}
          </td>
        ` : nothing}
        ${this.columns.map(col => html`
          <td class="align-${col.align ?? "left"}">${this._renderCell(col, row)}</td>
        `)}
      </tr>
      ${isExpanded && row.expandContent ? html`
        <tr class="expand-row">
          <td colspan=${this.columns.length + (this.selectable ? 1 : 0) + (this.expandable ? 1 : 0)}>
            <div class="expand-content">${row.expandContent}</div>
          </td>
        </tr>
      ` : nothing}
    `;
  }

  private _renderBulkBar() {
    if (!this.selectable || this._selected.size === 0) return nothing;
    return html`
      <div class="bulk-bar" role="toolbar" aria-label="Bulk actions">
        <span class="bulk-count">${this._selected.size} selected</span>
        <div class="bulk-actions">
          <slot name="bulk-actions" @click=${(e: Event) => {
            const btn = (e.target as HTMLElement).closest("[data-action]") as HTMLElement | null;
            if (btn?.dataset.action) this._onBulkAction(btn.dataset.action);
          }}></slot>
        </div>
        <button class="bulk-clear" @click=${this._clearSelection}>Clear</button>
      </div>
    `;
  }

  private _renderPagination() {
    if (this.total === 0) return nothing;
    const start = Math.min((this.page - 1) * this.pageSize + 1, this.total);
    const end = Math.min(this.page * this.pageSize, this.total);
    return html`
      <div class="pagination-bar">
        <div class="page-info">${start}–${end} of ${this.total}</div>
        <div class="page-size-wrap">
          <label class="page-size-label">Rows per page</label>
          <select class="page-size-select" @change=${this._onPageSizeChange} .value=${String(this.pageSize)}>
            ${this.pageSizeOptions.map(n => html`
              <option value=${n} ?selected=${n === this.pageSize}>${n}</option>
            `)}
          </select>
        </div>
        <div class="page-nav">
          <button class="page-btn" ?disabled=${this.page <= 1} @click=${() => this._goTo(1)} aria-label="First page">«</button>
          <button class="page-btn" ?disabled=${this.page <= 1} @click=${() => this._goTo(this.page - 1)} aria-label="Previous page">‹</button>
          <span class="page-current">${this.page} / ${this._totalPages}</span>
          <button class="page-btn" ?disabled=${this.page >= this._totalPages} @click=${() => this._goTo(this.page + 1)} aria-label="Next page">›</button>
          <button class="page-btn" ?disabled=${this.page >= this._totalPages} @click=${() => this._goTo(this._totalPages)} aria-label="Last page">»</button>
        </div>
      </div>
    `;
  }

  render() {
    const isEmpty = !this.loading && this.rows.length === 0;
    const colSpan = this.columns.length + (this.selectable ? 1 : 0) + (this.expandable ? 1 : 0);

    return html`
      <div class="adt-root" data-testid=${this.testId ?? nothing}>
        ${this._renderBulkBar()}
        <div class="table-wrap">
          <table class="adt-table">
            <thead>
              <tr>
                ${this.selectable ? html`
                  <th class="col-check">
                    <input
                      type="checkbox"
                      class="row-check"
                      .checked=${this._allSelected}
                      .indeterminate=${this._someSelected}
                      @change=${this._toggleAll}
                      aria-label="Select all rows"
                    />
                  </th>
                ` : nothing}
                ${this.expandable ? html`<th class="col-expand"></th>` : nothing}
                ${this.columns.map(col => html`
                  <th
                    class="align-${col.align ?? "left"} ${col.sortable ? "sortable" : ""}"
                    style=${col.width ? `width:${col.width}` : ""}
                    @click=${col.sortable ? () => this._onSort(col.key) : nothing}
                    aria-sort=${col.sortable && this.sortKey === col.key
                      ? (this.sortDir === "asc" ? "ascending" : "descending")
                      : "none"}
                  >
                    <span class="th-label">${col.label}</span>
                    ${col.sortable ? this._sortIcon(col.key) : nothing}
                  </th>
                `)}
              </tr>
            </thead>
            <tbody>
              ${this.loading
                ? this._renderSkeletonRows()
                : isEmpty
                  ? html`
                      <tr>
                        <td class="empty-cell" colspan=${colSpan}>
                          <div class="empty-state">
                            <span class="empty-icon">📋</span>
                            <span class="empty-msg">${this.emptyMessage}</span>
                          </div>
                        </td>
                      </tr>
                    `
                  : repeat(this.rows, r => r.id, r => this._renderRow(r))
              }
            </tbody>
          </table>
        </div>
        ${this._renderPagination()}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      font-family: var(--font-p, "DB HeaventRounded", sans-serif);
      font-size: var(--font-size-p, 20px);
      color: var(--text-primary, #1f2937);
    }

    /* ── Bulk bar ──────────────────────────────────────────────────────── */
    .bulk-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px;
      background: var(--bg-brand-primary, #f0f9ff);
      border: 1px solid var(--stroke-brand, #7dd3fc);
      border-radius: var(--radius-md, 8px) var(--radius-md, 8px) 0 0;
      font-size: var(--font-size-caption, 18px);
    }

    .bulk-count {
      font-weight: var(--font-weight-semibold, 600);
      color: var(--text-brand-primary, #0ea5e9);
      min-width: max-content;
    }

    .bulk-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
    }

    .bulk-clear {
      margin-left: auto;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--text-secondary, #6b7280);
      font-family: inherit;
      font-size: inherit;
      padding: 4px 8px;
      border-radius: var(--radius-sm, 6px);
    }

    .bulk-clear:hover {
      color: var(--text-primary, #1f2937);
      background: var(--bg-primary-hover, #f3f4f6);
    }

    /* ── Table wrap ────────────────────────────────────────────────────── */
    .table-wrap {
      overflow-x: auto;
      border: 1px solid var(--stroke-primary, #e5e7eb);
      border-radius: var(--radius-md, 8px);
    }

    .bulk-bar + .table-wrap {
      border-top: none;
      border-radius: 0 0 var(--radius-md, 8px) var(--radius-md, 8px);
    }

    /* ── Table ─────────────────────────────────────────────────────────── */
    .adt-table {
      width: 100%;
      border-collapse: collapse;
      table-layout: auto;
    }

    /* ── Header ────────────────────────────────────────────────────────── */
    thead {
      background: var(--bg-secondary, #f3f4f6);
    }

    th {
      padding: 12px 16px;
      font-size: var(--font-size-caption, 18px);
      font-weight: var(--font-weight-semibold, 600);
      color: var(--text-secondary, #6b7280);
      border-bottom: 1px solid var(--stroke-primary, #e5e7eb);
      white-space: nowrap;
      user-select: none;
    }

    th.sortable {
      cursor: pointer;
    }

    th.sortable:hover {
      background: var(--bg-primary-hover, #e5e7eb);
      color: var(--text-primary, #1f2937);
    }

    .th-label {
      vertical-align: middle;
    }

    .sort-icon {
      margin-left: 4px;
      font-size: 14px;
      vertical-align: middle;
    }

    .sort-icon.neutral {
      opacity: 0.35;
    }

    .sort-icon.active {
      color: var(--text-brand-primary, #0ea5e9);
    }

    /* ── Body ──────────────────────────────────────────────────────────── */
    td {
      padding: 12px 16px;
      border-bottom: 1px solid var(--stroke-primary, #e5e7eb);
      vertical-align: middle;
    }

    .data-row:last-child td {
      border-bottom: none;
    }

    .data-row:hover td {
      background: var(--bg-quaternary, #f9fafb);
    }

    .data-row.selected td {
      background: var(--bg-brand-primary, #f0f9ff);
    }

    /* ── Alignment ─────────────────────────────────────────────────────── */
    .align-left   { text-align: left; }
    .align-center { text-align: center; }
    .align-right  { text-align: right; }

    /* ── Checkbox col ──────────────────────────────────────────────────── */
    .col-check { width: 48px; padding: 12px; text-align: center; }

    .row-check {
      width: 16px;
      height: 16px;
      cursor: pointer;
      accent-color: var(--button-solid-bg, #0ea5e9);
    }

    /* ── Expand col ────────────────────────────────────────────────────── */
    .col-expand { width: 40px; text-align: center; padding: 8px; }

    .expand-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      color: var(--icon-primary, #6b7280);
      border-radius: var(--radius-sm, 6px);
      font-size: 12px;
      transition: transform 0.15s ease, color 0.15s ease;
    }

    .expand-btn.expanded {
      transform: rotate(90deg);
      color: var(--text-brand-primary, #0ea5e9);
    }

    .expand-row td {
      padding: 0;
      border-bottom: 1px solid var(--stroke-primary, #e5e7eb);
    }

    .expand-content {
      padding: 16px;
      background: var(--bg-quaternary, #f9fafb);
      font-size: var(--font-size-caption, 18px);
    }

    /* ── Skeleton ──────────────────────────────────────────────────────── */
    .skeleton-row td { border-bottom: 1px solid var(--stroke-primary, #e5e7eb); }

    .skel {
      height: 18px;
      border-radius: var(--radius-sm, 6px);
      background: linear-gradient(90deg, var(--bg-disabled, #e5e7eb) 25%, var(--bg-secondary, #f3f4f6) 50%, var(--bg-disabled, #e5e7eb) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.4s infinite;
    }

    .skel-check { width: 16px; height: 16px; }

    @keyframes shimmer {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* ── Empty state ───────────────────────────────────────────────────── */
    .empty-cell { text-align: center; padding: 48px 16px; }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .empty-icon { font-size: 32px; }

    .empty-msg {
      color: var(--text-secondary, #6b7280);
      font-size: var(--font-size-caption, 18px);
    }

    /* ── Pagination ────────────────────────────────────────────────────── */
    .pagination-bar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 16px;
      padding: 12px 4px 0;
      font-size: var(--font-size-caption, 18px);
      color: var(--text-secondary, #6b7280);
      flex-wrap: wrap;
    }

    .page-info { min-width: max-content; }

    .page-size-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .page-size-select {
      border: 1px solid var(--stroke-primary, #e5e7eb);
      border-radius: var(--radius-sm, 6px);
      padding: 4px 8px;
      font-family: inherit;
      font-size: inherit;
      background: var(--bg-primary, #f9fafb);
      color: var(--text-primary, #1f2937);
      cursor: pointer;
    }

    .page-nav {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .page-current {
      min-width: 60px;
      text-align: center;
      color: var(--text-primary, #1f2937);
    }

    .page-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: 1px solid var(--stroke-primary, #e5e7eb);
      border-radius: var(--radius-sm, 6px);
      background: var(--bg-primary, #f9fafb);
      color: var(--text-primary, #1f2937);
      cursor: pointer;
      font-size: 14px;
      transition: background 0.15s ease;
    }

    .page-btn:hover:not(:disabled) {
      background: var(--bg-primary-hover, #f3f4f6);
    }

    .page-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .page-btn:focus-visible {
      outline: 2px solid var(--stroke-brand-solid, #0ea5e9);
      outline-offset: 2px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ds-advanced-data-table": AdvancedDataTable;
    "ssk-advanced-data-table": AdvancedDataTable;
  }
}

if (!customElements.get("ds-advanced-data-table")) {
  customElements.define("ds-advanced-data-table", AdvancedDataTable);
}
if (!customElements.get("ssk-advanced-data-table")) {
  customElements.define("ssk-advanced-data-table", AdvancedDataTable);
}
