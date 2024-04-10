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
