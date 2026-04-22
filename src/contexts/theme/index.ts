import "../../assets/global.css";
import { createContext, provide } from "@lit/context";
import { LitElement, PropertyValues, css, html } from "lit";
import { property } from "lit/decorators.js";
import { Theme, parseThemeToCssVariables } from "../../types/theme";
import { defaultTheme } from "./default";
import { Brand, injectSemanticTokens } from "./semantic-tokens";
export * from "./default";
export * from "./semantic-tokens";

export const themeContext = createContext<Theme>("ssk-theme-context");

export class ThemeProvider extends LitElement {
  @provide({ context: themeContext })
  @property({ attribute: false })
  theme: Theme = defaultTheme;

  @property({ type: String })
  brand?: Brand;

  updated(changed: PropertyValues) {
    if (changed.has("brand") && this.brand) {
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

if (!customElements.get("ds-theme-provider")) {
  customElements.define("ds-theme-provider", ThemeProvider);
}
if (!customElements.get("ssk-theme-provider")) {
  customElements.define("ssk-theme-provider", ThemeProvider);
}
