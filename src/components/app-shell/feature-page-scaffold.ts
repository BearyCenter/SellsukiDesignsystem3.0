import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";

/**
 * Sellsuki Feature Page Scaffold — DS 3.0
 *
 * Standard four-zone grid for a feature page inside `<ssk-app-shell>` /
 * `<ssk-default-shell>`: `header`, `filters`, `content` (default slot), and
 * `footer`. Empty slots collapse automatically. Pair with `<ssk-page-header>`
 * in the `header` slot for the canonical title + breadcrumb layout.
 *
 * Reach for this when you want a consistent feature-page rhythm without
 * laying out grid rows yourself. For a custom layout (split view, dashboard
 * grid) just put your own elements inside `<ssk-app-shell>` directly.
 *
 * @example
 *   <ssk-feature-page-scaffold full-height>
 *     <ssk-page-header slot="header" title="คำสั่งซื้อ"></ssk-page-header>
 *     <ssk-input slot="filters" placeholder="ค้นหา..."></ssk-input>
 *     <ssk-table>...</ssk-table>
 *     <div slot="footer"><ssk-pagination></ssk-pagination></div>
 *   </ssk-feature-page-scaffold>
 *
 * @slot          - Page body content
 * @slot header   - Title / breadcrumb area (typically `<ssk-page-header>`)
 * @slot filters  - Filter / search toolbar
 * @slot footer   - Pagination / action bar
 */
export class FeaturePageScaffold extends LitElement {
  static registeredName = "ssk-feature-page-scaffold";

  /**
   * Outer padding applied to all four zones (any CSS length). Defaults to `24px` — match the DS 3.0 `--space-page-*` page rhythm.
   */
  @property({ type: String })
  padding = "24px";

  /**
   * Stretch the scaffold to fill its parent's height so the `content` slot scrolls inside `<ssk-app-shell>`. Off by default.
   */
  @property({ type: Boolean, attribute: "full-height" })
  fullHeight = false;

  /**
   * Stable `data-testid` attribute applied to the scaffold wrapper for E2E test selectors.
   */
  @property({ type: String, attribute: "test-id" })
  testId?: string;

  render() {
    return html`
      <style>
        :host {
          --scaffold-padding: ${this.padding};
        }
      </style>
      <div class="scaffold ${this.fullHeight ? "full-height" : ""}" data-testid=${this.testId ?? nothing}>
        <div class="page-header">
          <slot name="header"></slot>
        </div>
        <div class="page-filters">
          <slot name="filters"></slot>
        </div>
        <div class="page-content">
          <slot></slot>
        </div>
        <div class="page-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      --scaffold-padding: 24px;
    }

    .scaffold {
      display: grid;
      grid-template-rows: auto auto 1fr auto;
      gap: 16px;
      padding: var(--scaffold-padding);
      box-sizing: border-box;
    }

    .scaffold.full-height {
      height: 100%;
      min-height: 0;
    }

    .page-header:empty,
    .page-filters:empty,
    .page-footer:empty {
      display: none;
    }

    .page-content {
      min-height: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-feature-page-scaffold": FeaturePageScaffold;
  }
}

if (!customElements.get("ssk-feature-page-scaffold")) {
  customElements.define("ssk-feature-page-scaffold", FeaturePageScaffold);
}
