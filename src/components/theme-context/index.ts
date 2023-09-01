import { createContext, provide } from "@lit-labs/context";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Theme } from "../../types/theme";
import { defaultTheme } from "./default";
export * from "./default";

export const themeContext = createContext<Theme>("ssk-theme");

@customElement("ssk-theme-provider")
export class ThemeProvider extends LitElement {
  @provide({ context: themeContext })
  @property({
    attribute: true,
  })
  theme: Theme = defaultTheme;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-theme-provider": ThemeProvider;
  }
}
