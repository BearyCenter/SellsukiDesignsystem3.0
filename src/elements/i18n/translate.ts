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

  /**
   * Translation store consumed via Lit context from a `<ssk-i18n-provider>`
   * ancestor. Set manually only in standalone tests.
   */
  @consume({ context: i18nContext, subscribe: true })
  @property({ attribute: false })
  public i18n?: I18nStore;

  /**
   * Translation key resolved against the provider's store (e.g.
   * `"nav.orders"`). Renders the string for the active locale, or the
   * `fallbackLang` value on miss.
   */
  @property({ type: String })
  key: string = "";

  /**
   * Override the active language for this instance only (e.g. force English
   * inside a Thai-default app). Leave empty to inherit from the provider.
   */
  @property({ type: String })
  lang: string = "";

  /**
   * Fallback BCP-47 tag used if `lang` (or the provider's locale) has no
   * translation for `key`. Leave empty to return the key itself on miss.
   */
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
