import "../../assets/global.css";
import { createContext, provide } from "@lit/context";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Theme, parseThemeToCssVariables } from "../../types/theme";
import { defaultTheme } from "./default";
export * from "./default";

export const themeContext = createContext<Theme>("ssk-theme-context");

@customElement("ssk-theme-provider")
export class ThemeProvider extends LitElement {
  @provide({ context: themeContext })
  @property({ attribute: false })
  theme: Theme = defaultTheme;

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
