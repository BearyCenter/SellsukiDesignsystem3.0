import { consume } from "@lit/context";
import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";
import { until } from "lit/directives/until.js";
import { I18nStore, i18nContext } from "../../contexts/i18n";

/**
 * Sellsuki I18n Translate — DS 3.0
 *
 * Renders a translated string from the `<ssk-i18n-provider>` store by
 * `key`. Async — Lit's `until` directive renders nothing until the store
 * resolves. Optional `lang` / `fallbackLang` props override the
 * provider's active language for a single instance.
 *
 * Reach for `<ssk-i18n-translate>` for plain key → text lookups. For
 * messages that interpolate runtime values use `<ssk-i18n-template>`.
 *
 * @example
 *   <ssk-i18n-translate key="nav.orders"></ssk-i18n-translate>
 *   <ssk-i18n-translate key="cta.save" lang="en" fallbackLang="th"></ssk-i18n-translate>
 */
export class Translate extends LitElement {
  static registeredName = "ssk-i18n-translate";

  @consume({ context: i18nContext, subscribe: true })
  @property({ attribute: false })
  public i18n?: I18nStore;

  @property({ type: String })
  key: string = "";

  // override the lang from the context
  @property({ type: String })
  lang: string = "";

  @property({ type: String })
  fallbackLang: string = "";

  render() {
    return html`${until(
      this.i18n?.get(this.key, this.lang, this.fallbackLang)
    )}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-i18n-translate": Translate;
  }
}

if (!customElements.get("ssk-i18n-translate")) {
  customElements.define("ssk-i18n-translate", Translate);
}
