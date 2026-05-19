import { createContext, provide } from "@lit/context";
import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";
import { IdbI18nStore } from "./idb";

export type I18nData = {
  [key: string]: { [lang: string]: string };
};

export interface I18nStore {
  currentLang: string;
  getVersion: () => Promise<number>;
  setVersion: (version: number) => Promise<void>;
  bulkSet: (data: I18nData) => Promise<void>;
  set: (key: string, lang: string, value: string) => Promise<void>;
  sets: (key: string, values: { [lang: string]: string }) => Promise<void>;
  get: (key: string, lang: string, fallbackLang?: string) => Promise<string>;
  getAll: () => Promise<I18nData>;
  render: (
    key: string,
    lang: string,
    metadata: any,
    fallbackLang?: string
  ) => Promise<string>;
  clear: () => Promise<void>;
}

export const i18nContext = createContext<I18nStore>("ssk-i18n-context");

/**
 * Sellsuki I18n Provider — DS 3.0
 *
 * Provides a translation store (IndexedDB-backed by default) to descendants via
 * Lit context. Wrap any subtree that contains `<ssk-i18n-translate>` or
 * `<ssk-i18n-template>` so they can resolve keys against the active language.
 *
 * Use this when your app needs runtime translation lookup with cached
 * messages. For static text, just write the string directly — the Provider
 * is only needed once translations are loaded asynchronously.
 *
 * @example
 *   <ssk-i18n-provider lang="th">
 *     <ssk-i18n-translate key="order.total"></ssk-i18n-translate>
 *   </ssk-i18n-provider>
 *
 * @slot - Content that needs translation context
 */
export class I18nProvider extends LitElement {
  @provide({ context: i18nContext })
  @property({ attribute: false })
  store: I18nStore = new IdbI18nStore();

  @property({ attribute: true })
  lang: string = "en";

  @property({ attribute: true, type: Number })
  lastUpdate: number = 0;

  render() {
    this.store.currentLang = this.lang;

    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-i18n-provider": I18nProvider;
  }
}

if (!customElements.get("ssk-i18n-provider")) {
  customElements.define("ssk-i18n-provider", I18nProvider);
}
