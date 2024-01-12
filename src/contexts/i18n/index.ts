import { createContext, provide } from "@lit/context";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { IdbI18nStore } from "./idb";
;

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

@customElement("ssk-i18n-provider")
export class I18nProvider extends LitElement {
  @provide({ context: i18nContext })
  @property({ attribute: false })
  store: I18nStore = new IdbI18nStore();

  @property({ attribute: true })
  lang: string = "en";

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
