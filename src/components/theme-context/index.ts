import { createContext, provide } from "@lit-labs/context";
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
export const loggerContext = createContext("logger");

@customElement("s-theme-provider")
class ThemeProvider extends LitElement {
  @provide({ context: loggerContext })
  render() {
    return html`...`;
  }
}
