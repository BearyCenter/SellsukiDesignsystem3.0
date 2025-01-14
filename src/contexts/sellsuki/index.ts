import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../assets/global.css";
import "../../main";
import {
  I18nStore,
  IdbI18nStore,
  InMemoryToastStore,
  STORE_UPDATED_EVENT,
  ToastStore,
} from "../../main";

@customElement("ssk-provider")
export class SellsukiProvider extends LitElement {
  @property({ attribute: false })
  toastStore: ToastStore = new InMemoryToastStore();

  @property({ attribute: false })
  i18nStore: I18nStore = new IdbI18nStore();

  @property({ attribute: false, type: String })
  i18nDefaultLang: string = "en";

  private i18nStoreUpdated: number = 0;

  connectedCallback(): void {
    super.connectedCallback();

    globalThis.addEventListener(STORE_UPDATED_EVENT, this.handleStoreUpdated);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    globalThis.removeEventListener(
      STORE_UPDATED_EVENT,
      this.handleStoreUpdated
    );
  }

  private handleStoreUpdated() {
    this.i18nStoreUpdated = Date.now();
  }

  render() {
    return html`<div id="overlay-container" class="overlay"></div>
      <ssk-toast-provider .toast=${this.toastStore}>
        <ssk-i18n-provider
          .store=${this.i18nStore}
          lang=${this.i18nDefaultLang}
          .lastUpdate=${this.i18nStoreUpdated}
        >
          <slot></slot>
        </ssk-i18n-provider>
      </ssk-toast-provider>`;
  }

  static styles = css`
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      pointer-events: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-provider": SellsukiProvider;
  }
}
