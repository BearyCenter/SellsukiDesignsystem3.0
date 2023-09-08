import { consume } from "@lit-labs/context";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { until } from "lit/directives/until.js";
import { I18nStore, i18nContext } from "../context-i18n";

@customElement("ssk-translate")
export class Translate extends LitElement {
  static registeredName = "ssk-translate";

  @consume({ context: i18nContext, subscribe: true })
  @property({ attribute: false })
  public i18n?: I18nStore;

  @property({ type: String })
  key: string = "";

  // override the lang from the context
  @property({ type: String })
  lang: string = "";

  @property({ type: Object })
  fallbackLang: string = "";

  render() {
    return html`${until(
      this.i18n?.get(this.key, this.lang, this.fallbackLang)
    )}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-translate": Translate;
  }
}
