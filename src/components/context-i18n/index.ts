import { createContext, provide } from "@lit-labs/context";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { IdbI18nStore } from "./idb";

export interface I18nStore {
  getVersion: () => Promise<number>;
  setVersion: (version: number) => Promise<void>;
  set: (key: string, lang: string, value: string) => Promise<void>;
  sets: (key: string, values: { [lang: string]: string }) => Promise<void>;
  get: (key: string, lang: string) => Promise<string>;
  render: (key: string, lang: string, metadata: any) => Promise<string>;
  clear: () => Promise<void>;
}

export const i18nContext = createContext<I18nStore>("ssk-i18n-context");

@customElement("ssk-i18n-provider")
export class I18nProvider extends LitElement {
  @provide({ context: i18nContext })
  @property({
    attribute: true,
  })
  store: I18nStore = new IdbI18nStore();

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-i18n-provider": I18nProvider;
  }
}
