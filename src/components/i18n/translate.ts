import { consume } from "@lit-labs/context";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { I18nStore, i18nContext } from "../context-i18n";

@customElement("ssk-translate")
export class Button extends LitElement {
  static registeredName = "ssk-button";

  @consume({ context: i18nContext, subscribe: true })
  @property({ attribute: false })
  public i18n?: I18nStore;

  @property({ type: String })
  key: string = "";

  // override the lang from the context
  @property({ type: String })
  lang: string = "";

  render() {
    return html`${this.i18n?.get(this.key, this.lang)}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-translate": Button;
  }
}
