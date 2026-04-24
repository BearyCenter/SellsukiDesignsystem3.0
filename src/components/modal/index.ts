import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { eventOptions, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import "../../elements/divider";
import "../../elements/icon";

import { redispatchEvents } from "../../helpers/lit";
import {
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";

export class Modal extends LitElement {
  static registeredName = "ssk-modal";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  @property({ type: String })
  width?: string | undefined;

  @property({ type: Boolean })
  show = false;

  @property({ type: Boolean })
  hideCloseButton = false;

  @property({ type: Boolean })
  hideDivider = true;

  @eventOptions({ capture: false, once: false, passive: true })
  private close(e: Event) {
    redispatchEvents(e, this, "close");
  }

  render() {
    let additionalCss = html`
      <style>
        :host {
          --width: ${parseVariables(
            cssVar("width", this.width),
            this.width,
            "100%",
          )};

          --background-color-footer: ${parseVariables(
            cssVar("colors", "white", 200),
          )};

          --border-color: ${parseVariables(
            cssVar("colors", "background", 300),
            "#ddd",
          )};

          --header-display: flex;
          --header-justify-content: space-between;

          --padding-body: 16px;
          --body-display: flex;
          --body-justify-content: flex-start;

          --footer-display: flex;
          --footer-justify-content: flex-end;
        }
      </style>
    `;

    if (this.show) {
      this.classList.add("show-modal");
    } else {
      this.classList.remove("show-modal");
    }

    const bodySlotExists = this.querySelector('[slot="body"]');
    const footerSlotExists = this.querySelector('[slot="footer"]');

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.container, ":host")}
      ${additionalCss}

      <div class="backdrop">
        <div
          class="container ${this.hideDivider ? "" : "divider"}"
          data-testid=${this.testId || nothing}
        >
          <div class="close-button${this.hideCloseButton ? "-hide" : ""}">
            <ssk-icon
              ?hidden=${this.hideCloseButton}
              name="outline-x-mark"
              @click=${this.close}
            >
            </ssk-icon>
          </div>

          <div class="header">
            <span class="title">
              <slot name="header"></slot>
            </span>
          </div>

          ${bodySlotExists
            ? html`<div class="body">
                <div class="body-slot">
                  <slot name="body"></slot>
                </div>
              </div>`
            : nothing}
          ${footerSlotExists
            ? html`<div class="footer">
                <slot name="footer"></slot>
              </div>`
            : nothing}
        </div>
      </div>
    `;
  }

  static styles = css`
    :host(.show-modal) {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: var(--z-index-modal, 1000);
      overflow: hidden;
      visibility: visible;
      opacity: 1;
      transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
    }

    :host {
      opacity: 0;
      visibility: hidden;
      display: block;
      position: fixed;
    }

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: var(--z-index-modal, 1000);
    }

    .container {
      position: relative;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      overflow: hidden;
      width: var(--width);
      display: grid;
      grid-template-rows: auto 1fr auto;
      max-width: calc(100dvw - var(--padding-container, 24px));
      max-height: calc(100dvh - var(--padding-container, 24px));
    }

    .divider > .header,
    .divider > .body {
      margin: var(--divider-margin);
      border-bottom: 1px solid var(--border-color);
    }

    .header {
      padding: 16px;
      display: var(--header-display, flex);
      justify-content: var(--header-justify-content, space-between);
      align-items: center;
      gap: 1em;
    }

    .title {
      font-size: 28px;
      font-weight: 500;
      width: 100%;
    }

    .body {
      min-height: 0;
      overflow: hidden;
    }

    .body-slot {
      padding: var(--padding-body);
      font-size: 24px;
      font-weight: 400;
      display: var(--body-display);
      justify-content: var(--body-justify-content);
      overflow: auto;
      height: 100%;
      box-sizing: border-box;
    }

    .footer {
      padding: 16px;
      background-color: var(--background-color-footer);
      display: var(--footer-display);
      justify-content: var(--footer-justify-content);
      gap: 0.5rem;
    }

    .close-button {
      position: absolute;
      top: 0px;
      right: 0px;
      cursor: pointer;
      padding: 16px;
      position: absolute;
      right: 0;
    }

    .close-button-hide {
      display: none;
    }

    ssk-icon {
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementModalNameMap {
    "ssk-modal": Modal;
  }
}

if (!customElements.get("ssk-modal")) {
  customElements.define("ssk-modal", Modal);
}
