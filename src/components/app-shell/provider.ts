import { provide } from "@lit/context";
import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { brandContext } from "../../contexts/theme/brand-assets";
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
  static registeredName = "ssk-app-shell-provider";

  @property({ type: String })
  brand: AppShellBrand = "sellsuki";

  /**
   * Underlying DS 3.0 Brand exposed to descendants via Lit context. Drives
   * <ssk-logo> brand-asset resolution and any future brand-aware component.
   */
  @provide({ context: brandContext })
  @property({ attribute: false })
  tokenBrand: Brand = "ccs3";

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
    this.tokenBrand = tokenBrand;
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
    "ssk-app-shell-provider": AppShellProvider;
  }
}

if (!customElements.get("ssk-app-shell-provider")) {
  customElements.define("ssk-app-shell-provider", AppShellProvider);
}
