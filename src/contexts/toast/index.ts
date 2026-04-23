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

export class ToastProvider extends LitElement {
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

if (!customElements.get("ds-toast-provider")) {
  customElements.define("ds-toast-provider", ToastProvider);
}
if (!customElements.get("ssk-toast-provider")) {
  customElements.define("ssk-toast-provider", class extends ToastProvider {});
}
