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

  @consume({ context: i18nContext, subscribe: true })
  @property({ attribute: false })
  public i18n?: I18nStore;

  @property({ type: String })
  key: string = "";

  @property({ type: Object })
  data: object = {};

  // override the lang from the context
  @property({ type: String })
  lang: string = "";

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
