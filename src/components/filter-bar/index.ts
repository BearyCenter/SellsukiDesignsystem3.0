import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import "../../elements/icon";

export interface FilterBarChangeEvent {
  search: string;
}

export class FilterBar extends LitElement {
  static registeredName = "ssk-filter-bar";

  @property({ type: String, attribute: "test-id" }) testId?: string;
  @property({ type: String }) placeholder = "Search...";
  @property({ type: String }) search = "";
  @property({ type: Boolean, attribute: "show-search" }) showSearch = true;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) size: "sm" | "md" | "lg" = "md";

  @state() private _searchValue = "";

  connectedCallback() {
    super.connectedCallback();
    this._searchValue = this.search;
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has("search")) {
      this._searchValue = this.search;
    }
  }

  private _onSearchInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this._searchValue = input.value;
    this._emitChange();
  }

  private _onClear() {
    this._searchValue = "";
    this._emitChange();
    const input = this.shadowRoot?.querySelector<HTMLInputElement>(".search-input");
    input?.focus();
  }

  private _emitChange() {
    this.dispatchEvent(
      new CustomEvent<FilterBarChangeEvent>("filter-change", {
        detail: { search: this._searchValue },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div
        class="filter-bar size-${this.size} ${this.disabled ? "disabled" : ""}"
        data-testid=${this.testId ?? nothing}
      >
        ${this.showSearch ? this._renderSearch() : nothing}
        <div class="filters">
          <slot name="filters"></slot>
        </div>
        <div class="actions">
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }

  private _renderSearch() {
    return html`
      <div class="search-wrapper">
        <ssk-icon class="search-icon" name="outline-magnifying-glass" size="sm"></ssk-icon>
        <input
          class="search-input"
          type="text"
          .value=${this._searchValue}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          aria-label=${this.placeholder}
          @input=${this._onSearchInput}
        />
        ${this._searchValue
          ? html`
              <button
                class="clear-btn"
                @click=${this._onClear}
                aria-label="Clear search"
                ?disabled=${this.disabled}
              >
                <ssk-icon name="outline-x-mark" size="sm"></ssk-icon>
              </button>
            `
          : nothing}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .filter-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .filter-bar.disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* Search */
    .search-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      min-width: 220px;
      flex: 1 1 220px;
    }

    .search-icon {
      position: absolute;
      left: 10px;
      color: var(--icon-primary, #6b7280);
      pointer-events: none;
    }

    .search-input {
      width: 100%;
      border: 1px solid var(--stroke-primary, #e5e7eb);
      border-radius: var(--radius-md, 8px);
      background: var(--bg-primary, #f9fafb);
      color: var(--text-primary, #1f2937);
      font-family: var(--font-p, "DB HeaventRounded", sans-serif);
      font-size: var(--font-size-p, 20px);
      outline: none;
      transition: border-color 0.15s ease;
      box-sizing: border-box;
    }

    .search-input::placeholder {
      color: var(--text-placeholder, #9ca3af);
    }

    .search-input:focus {
      border-color: var(--stroke-brand-solid, #0ea5e9);
      box-shadow: 0 0 0 3px var(--stroke-brand-lighter, #e0f2fe);
    }

    .search-input:disabled {
      background: var(--bg-disabled, #e5e7eb);
      color: var(--text-disabled, #9ca3af);
      cursor: not-allowed;
    }

    /* Size variants */
    .size-sm .search-input {
      height: 36px;
      padding: 0 32px 0 34px;
      font-size: var(--font-size-caption, 18px);
    }

    .size-md .search-input {
      height: 40px;
      padding: 0 36px 0 36px;
    }

    .size-lg .search-input {
      height: 44px;
      padding: 0 40px 0 40px;
    }

    .clear-btn {
      position: absolute;
      right: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      padding: 2px;
      cursor: pointer;
      color: var(--icon-primary, #6b7280);
      border-radius: var(--radius-sm, 6px);
      transition: color 0.15s ease;
    }

    .clear-btn:hover {
      color: var(--icon-dark, #111827);
    }

    .clear-btn:focus-visible {
      outline: 2px solid var(--stroke-brand-solid, #0ea5e9);
    }

    /* Slots */
    .filters {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .filters:empty {
      display: none;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: auto;
    }

    .actions:empty {
      display: none;
    }

    slot[name="filters"]::slotted(*),
    slot[name="actions"]::slotted(*) {
      flex-shrink: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-filter-bar": FilterBar;
  }
}

if (!customElements.get("ssk-filter-bar")) {
  customElements.define("ssk-filter-bar", FilterBar);
}
