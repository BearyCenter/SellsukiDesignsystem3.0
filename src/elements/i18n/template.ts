import { consume } from "@lit/context";
import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";
import { until } from "lit/directives/until.js";
import { I18nStore, i18nContext } from "../../contexts/i18n";

/**
 * Sellsuki I18n Template — DS 3.0
 *
 * Renders a translated message that contains placeholders (e.g.
 * `"Hello {name}"`). Resolves the `key` against the
 * `<ssk-i18n-provider>` store, then interpolates the `data` object.
 * Async — uses Lit's `until` directive while the store resolves.
 *
 * Reach for `<ssk-i18n-template>` when the message has runtime values to
 * inject. For plain key lookup use `<ssk-i18n-translate>`. Both require
 * a `<ssk-i18n-provider>` ancestor.
 *
 * @example
 *   <ssk-i18n-template
 *     key="order.greeting"
 *     .data=${{ name: "ชญานี", count: 3 }}
 *   ></ssk-i18n-template>
 */
export class Template extends LitElement {
  static registeredName = "ssk-i18n-template";

  /**
   * Translation store consumed via Lit context from a `<ssk-i18n-provider>`
   * ancestor. Set manually only in standalone tests.
   */
  @consume({ context: i18nContext, subscribe: true })
  @property({ attribute: false })
  public i18n?: I18nStore;

  /**
   * Translation key resolved against the provider's store (e.g.
   * `"order.greeting"`). The store renders the matching template with
   * `data` interpolated into `{placeholder}` slots.
   */
  @property({ type: String })
  key: string = "";

  /**
   * Plain object of named values interpolated into the resolved template
   * (e.g. `{ name: "ชญานี", count: 3 }` for `"Hello {name}, you have {count} orders"`).
   */
  @property({ type: Object })
  data: object = {};

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
      this.i18n?.render(this.key, this.lang, this.data, this.fallbackLang)
    )}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-i18n-template": Template;
  }
}

if (!customElements.get("ssk-i18n-template")) {
  customElements.define("ssk-i18n-template", Template);
}
