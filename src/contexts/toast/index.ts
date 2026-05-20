import { createContext, provide } from "@lit/context";
import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import "../../components/toast";
export type ToastData = {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  timeout: number;
  testId?: string;
};

export interface ToastStore {
  addToast: (toast: Partial<ToastData>) => string;
  removeToast: (id: string) => void;
  toasts: ToastData[];
  clearToasts: () => void;
}

export const toastContext = createContext<ToastStore>("ssk-toast-context");

/**
 * Sellsuki Toast Provider — DS 3.0
 *
 * Hosts the global toast queue and renders `<ssk-toast>` notifications in a
 * fixed top-center stack above page content. Place once near the root of the
 * app — any descendant can dispatch toasts by consuming the `toastContext`
 * via `addToast({ title, message, type })`.
 *
 * Reach for this when you need transient feedback (save success, network
 * error, validation hint). For persistent inline messages prefer
 * `<ssk-alert>`; for blocking dialogs use `<ssk-modal>`.
 *
 * @example
 *   <ssk-toast-provider>
 *     <ssk-app-shell>...</ssk-app-shell>
 *   </ssk-toast-provider>
 *
 * @slot - App content that may dispatch toasts
 */
export class ToastProvider extends LitElement {
  /**
   * Toast queue store provided to descendants via Lit context. Replace the
   * default no-op stub with a reactive implementation (e.g. from your app
   * store) so descendant components can call `addToast` / `removeToast`.
   */
  @provide({ context: toastContext })
  @property({ attribute: false })
  toast: ToastStore = {
    toasts: [],
    addToast: () => "",
    removeToast: () => {},
    clearToasts: () => {},
  };

  private poller?: NodeJS.Timeout;

  connectedCallback() {
    super.connectedCallback();

    this.poller = setInterval(() => {
      this.requestUpdate();
    }, 100);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.poller) {
      clearInterval(this.poller);
    }
  }

  render() {
    return html`
      <slot></slot>
      <div id="toasts-container">
        ${this.toast.toasts.map(
          (toast) => html`
            <ssk-toast
              testId=${toast.testId}
              heading=${toast.title}
              content=${toast.message}
              type=${toast.type}
              @close=${() => {
                this.toast.removeToast(toast.id);
                this.requestUpdate();
              }}
              width="60dvw"
            ></ssk-toast>
          `,
        )}
      </div>
    `;
  }

  static styles = css`
    #toasts-container {
      position: fixed;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      background-color: transparent;
      width: 60dvw;
      height: 100dvh;
      pointer-events: none;

      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    ssk-toast {
      pointer-events: auto;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-toast-provider": ToastProvider;
  }
}

if (!customElements.get("ssk-toast-provider")) {
  customElements.define("ssk-toast-provider", ToastProvider);
}
