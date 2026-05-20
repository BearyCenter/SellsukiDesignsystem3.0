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

/**
 * Brand-friendly wrapper for product-level apps and vibe-code outputs.
 *
 * Accepts the eight Sellsuki product brand names (`sellsuki`, `patona`,
 * `shipmunk`, `akita`, `sellsukipay`, `sukispace`, `oc2plus`, `ccs3`) and
 * maps them to the three underlying DS 3.0 brands via {@link BRAND_MAP}, then
 * calls {@link injectSemanticTokens} so descendants pick up the correct
 * brand-tinted tokens. Also publishes the resolved brand via Lit context so
 * `<ssk-logo>` and other brand-aware components can render the right asset.
 *
 * **When to use vs `<ssk-theme-provider>`:**
 * - Use **`<ssk-app-shell-provider brand="...">`** for vibe-code outputs,
 *   product app shells, and anywhere you want to pass a friendly brand name.
 *   This is the wrapper validated by `runContract()` / `vibecode-contract`.
 * - Use **`<ssk-theme-provider>`** when you need the full theme context
 *   (drives `themeContext` consumers like `<ssk-code-block>`, applies the
 *   default theme's CSS variables to `:host`, and brings in the global
 *   scrollbar / font-family base). Storybook stories wrap with this one.
 * - The two are composable: `<ssk-theme-provider>` can wrap
 *   `<ssk-app-shell-provider>` if you want both the full theme context and
 *   friendly brand-name mapping in the same tree.
 *
 * Neither provider is deprecated. The earlier MCP `get_brand_rules` claim
 * that "ssk-theme-provider is deprecated" was a catalog bug — see
 * `DS3_VIBECODE_PRODUCTION_PLAN.md` §10.1 for the audit.
 */
export class AppShellProvider extends LitElement {
  static registeredName = "ssk-app-shell-provider";

  /**
   * Friendly product brand name — one of `sellsuki`, `patona`, `shipmunk`, `akita`, `sellsukipay`,
   * `sukispace`, `oc2plus`, or `ccs3`. Mapped to a strict DS 3.0 `Brand` via {@link BRAND_MAP}
   * and applied via {@link injectSemanticTokens}.
   */
  @property({ type: String })
  brand: AppShellBrand = "sellsuki";

  /**
   * Underlying DS 3.0 Brand exposed to descendants via Lit context. Drives
   * <ssk-logo> brand-asset resolution and any future brand-aware component.
   */
  @provide({ context: brandContext })
  @property({ attribute: false })
  tokenBrand: Brand = "ccs3";

  /**
   * Stable `data-testid` attribute applied to the host wrapper for E2E test selectors.
   */
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
