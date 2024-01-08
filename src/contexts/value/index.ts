import { createContext, provide } from "@lit-labs/context";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

export type Value = {
  value: string;
  setValue: (value: string) => void;
};

export const valueContext = createContext<Value>("ssk-value-context");

@customElement("ssk-value-provider")
export class ValueProvider extends LitElement {
  static registeredName = "ssk-dropdown";

  @provide({ context: valueContext })
  @property({ attribute: false })
  vault: Value = {
    value: "",
    setValue: (value: string) => {
      this.vault.value = value;
      this.requestUpdate();
    },
  };

  render() {
    return html`<slot></slot>`;
  }

  static styles = css`
    :host {
      font-family: var(--ssk-font-family-sans);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-value-provider": ValueProvider;
  }
}
