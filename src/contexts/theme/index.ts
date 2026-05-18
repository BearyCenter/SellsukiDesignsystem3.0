import "../../assets/global.css";
import { createContext, provide } from "@lit/context";
import { LitElement, PropertyValues, css, html } from "lit";
import { property } from "lit/decorators.js";
import { Theme, parseThemeToCssVariables } from "../../types/theme";
import { brandContext, DEFAULT_BRAND } from "./brand-assets";
import { defaultTheme } from "./default";
import { Brand, injectSemanticTokens } from "./semantic-tokens";
export * from "./brand-assets";
export * from "./default";
export * from "./semantic-tokens";

export const themeContext = createContext<Theme>("ssk-theme-context");

/**
 * Core DS 3.0 theme provider. Wrap your application root with this to:
 * - publish a `Theme` object on Lit context (consumed by components like
 *   `<ssk-code-block>`, `<ssk-button>`, etc.)
 * - apply the default theme's CSS variables to `:host`
 * - install the global scrollbar styles + `--ssk-font-family-sans`
 * - optionally inject semantic brand tokens (via the `brand` prop)
 *
 * **When to use vs `<ssk-app-shell-provider>`:**
 * - Use **`<ssk-theme-provider>`** when you need the full theme context and
 *   only deal with strict `Brand` values (`"ccs3" | "patona" | "oc2plus"`).
 *   This is the wrapper Storybook stories use internally.
 * - Use **`<ssk-app-shell-provider brand="...">`** for vibe-code outputs and
 *   product app shells where you want to pass a friendly brand name like
 *   `"shipmunk"` or `"sellsuki"`. See {@link AppShellProvider} for the
 *   friendly-name → strict mapping.
 * - The two are composable: wrap `<ssk-app-shell-provider>` inside
 *   `<ssk-theme-provider>` to get both the full theme context and the
 *   friendly brand-name layer.
 *
 * Neither provider is deprecated. The earlier MCP `get_brand_rules` claim
 * that "ssk-theme-provider is deprecated" was a catalog bug — see
 * `DS3_VIBECODE_PRODUCTION_PLAN.md` §10.1 for the audit.
 */
export class ThemeProvider extends LitElement {
  @provide({ context: themeContext })
  @property({ attribute: false })
  theme: Theme = defaultTheme;

  @property({ type: String })
  brand?: Brand;

  /**
   * Brand exposed to descendants via Lit context. Mirrors `brand` prop, but
   * always has a defined value (DEFAULT_BRAND fallback) so consumers don't
   * have to handle undefined.
   */
  @provide({ context: brandContext })
  @property({ attribute: false })
  resolvedBrand: Brand = DEFAULT_BRAND;

  updated(changed: PropertyValues) {
    if (changed.has("brand") && this.brand) {
      this.resolvedBrand = this.brand;
      injectSemanticTokens(this.brand);
    }
  }

  render() {
    return html`${parseThemeToCssVariables(this.theme, ":host")} <slot></slot>`;
  }

  static styles = css`
    :host {
      --scrollbar-size: 6px;
      --scrollbar-color-trumb: var(--ssk-colors-gray-500);
      --scrollbar-color-trumb-hover: var(--ssk-colors-gray-600);

      --scrollbar-color-track: var(--ssk-colors-fiord-100);
      font-family: var(--ssk-font-family-sans);
      display: inherit;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-theme-provider": ThemeProvider;
  }
}

if (!customElements.get("ssk-theme-provider")) {
  customElements.define("ssk-theme-provider", ThemeProvider);
}
