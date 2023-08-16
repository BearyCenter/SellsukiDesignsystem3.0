import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("s-button")
export class Button extends LitElement {
  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0;

  @property({ type: "solid" | "outline" | "ghost" })
  @property({ type: Boolean })
  loading = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  hidden = false;

  render() {
    if (this.hidden) {
      return html``;
    }

    return html`
      <div
        class="StateDefaultLoadingFalseDisableFalseSkeletonFalseSizeLargeTypeSolidContentTextTextOnly"
        style="width: 100%; height: 100%; padding-left: 16px; padding-right: 16px; padding-top: 8px; padding-bottom: 8px; background: #1769E2; border-radius: 8px; justify-content: center; align-items: center; gap: 8px; display: inline-flex"
      >
        <div
          class="ButtonLabel"
          style="text-align: center; color: white; font-size: 24px; font-family: DB HeaventRounded; font-weight: 400; line-height: 24px; word-wrap: break-word"
        >
          Button
        </div>
      </div>
    `;
  }

  private _onClick() {
    this.count++;
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.lit:hover {
      filter: drop-shadow(0 0 2em #325cffaa);
    }

    .card {
      padding: 2em;
    }

    .read-the-docs {
      color: #888;
    }

    ::slotted(h1) {
      font-size: 3.2em;
      line-height: 1.1;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "s-button": Button;
  }
}
