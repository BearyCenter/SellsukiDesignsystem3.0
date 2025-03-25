import { LitElement, css, html } from "lit";
import { customElement,  } from "lit/decorators.js";


@customElement("ssk-skeleton")
export class Skeleton extends LitElement {
  static registeredName = "ssk-skeleton";

  render() {
    return html`
      <div> this is for skeleton </div>
    `;
  }

  static styles = css`
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-skeleton": Skeleton;
  }
}
