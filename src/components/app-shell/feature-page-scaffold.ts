import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";

export class FeaturePageScaffold extends LitElement {
  static registeredName = "ds-feature-page-scaffold";

  @property({ type: String })
  padding = "24px";

  @property({ type: Boolean, attribute: "full-height" })
  fullHeight = false;

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
    "ds-feature-page-scaffold": FeaturePageScaffold;
    "ssk-feature-page-scaffold": FeaturePageScaffold;
  }
}

if (!customElements.get("ds-feature-page-scaffold")) {
  customElements.define("ds-feature-page-scaffold", FeaturePageScaffold);
}
if (!customElements.get("ssk-feature-page-scaffold")) {
  customElements.define("ssk-feature-page-scaffold", FeaturePageScaffold);
}
