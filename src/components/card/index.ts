import { LitElement, css, html } from "lit";
import { customElement,  } from "lit/decorators.js";

@customElement("ssk-card")
export class Card extends LitElement {
  static registeredName = "ssk-card";

  render() {
    return html`
      <div> this is for new component here </div>
    `;
  }

  static styles = css`
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-card": Card;
  }
}
