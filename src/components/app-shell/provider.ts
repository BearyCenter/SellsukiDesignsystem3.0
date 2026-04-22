import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { Brand, injectSemanticTokens } from "../../contexts/theme/semantic-tokens";

export type AppShellBrand = "sellsuki" | "patona" | "shipmunk" | "akita" | "sellsukipay" | "sukispace" | "oc2plus" | "ccs3";

const BRAND_MAP: Record<AppShellBrand, Brand> = {
  sellsuki:    "ccs3",
  patona:      "patona",
  shipmunk:    "ccs3",
  akita:       "ccs3",
  sellsukipay: "ccs3",
  sukispace:   "ccs3",
  oc2plus:     "oc2plus",
  ccs3:        "ccs3",
};

export class AppShellProvider extends LitElement {
  static registeredName = "ds-app-shell-provider";

  @property({ type: String })
  brand: AppShellBrand = "sellsuki";

  @property({ type: String, attribute: "test-id" })
  testId?: string;

  connectedCallback() {
    super.connectedCallback();
    this._applyBrand();
  }

  willUpdate(changed: Map<string | number | symbol, unknown>) {
    if (changed.has("brand")) {
      this._applyBrand();
    }
  }

  private _applyBrand() {
    const tokenBrand = BRAND_MAP[this.brand] ?? "ccs3";
    injectSemanticTokens(tokenBrand);
  }

  render() {
    return html`<slot></slot>`;
  }

  static styles = css`
    :host {
      display: contents;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ds-app-shell-provider": AppShellProvider;
    "ssk-app-shell-provider": AppShellProvider;
  }
}

if (!customElements.get("ds-app-shell-provider")) {
  customElements.define("ds-app-shell-provider", AppShellProvider);
}
if (!customElements.get("ssk-app-shell-provider")) {
  customElements.define("ssk-app-shell-provider", AppShellProvider);
}
