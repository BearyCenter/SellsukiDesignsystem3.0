import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../assets/global.css";
import {
  I18nStore,
  IdbI18nStore,
  InMemoryToastStore,
  STORE_UPDATED_EVENT,
  Theme,
  ToastStore,
} from "../../main";
import "../i18n";
import "../theme";
import { defaultTheme } from "../theme";
import "../toast";

@customElement("ssk-provider")
export class SellsukiProvider extends LitElement {
  @property({ attribute: false })
  theme: Theme = defaultTheme;

  @property({ attribute: false })
  toastStore: ToastStore = new InMemoryToastStore();

  @property({ attribute: false })
  i18nStore: I18nStore = new IdbI18nStore();

  @property({ attribute: false, type: String })
  i18nDefaultLang: string = "en";

  private i18nStoreUpdated: number = 0;

  connectedCallback(): void {
    super.connectedCallback();

    window.addEventListener(STORE_UPDATED_EVENT, this.handleStoreUpdated);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    window.removeEventListener(STORE_UPDATED_EVENT, this.handleStoreUpdated);
  }

  attributeChangedCallback() {
    global["sskToastProvider"] = this.toastStore;
    global["sskI18nStore"] = this.i18nStore;
  }

  private handleStoreUpdated() {
    this.i18nStoreUpdated = Date.now();
  }

  render() {
    return html`<ssk-theme-provider .theme=${this.theme}>
      <ssk-toast-provider .toast=${this.toastStore}>
        <ssk-i18n-provider
          .store=${this.i18nStore}
          lang=${this.i18nDefaultLang}
          .lastUpdate=${this.i18nStoreUpdated}
        >
          <slot></slot>
        </ssk-i18n-provider>
      </ssk-toast-provider>
    </ssk-theme-provider>`;
  }

  static styles = css`
    :host {
      font-family: var(--ssk-font-family-sans);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-provider": SellsukiProvider;
  }

  var sskToastProvider: ToastStore | undefined;
  var sskI18nStore: I18nStore | undefined;
}
