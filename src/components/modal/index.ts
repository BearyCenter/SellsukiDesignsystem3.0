import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, eventOptions, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import "../../elements/icon";
import "../../elements/divider";

import { redispatchEvents } from "../../helpers/lit";
import {
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";

@customElement("ssk-modal")
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
            cssVar("colors", "border", 100),
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

    const bodySlotExists = this.querySelector('[slot="body"]');
    const footerSlotExists = this.querySelector('[slot="footer"]');

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.container, ":host")}
      ${additionalCss}

      <div class="backdrop">
        <div class="container" data-testid=${this.testId || nothing}>
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
              ${
                this.hideDivider
                  ? nothing
                  : html`<ssk-divider size="xs"></ssk-divider>`
              }
          ${
            bodySlotExists
              ? html`<div class="body">
                    <slot name="body"></slot>
                  </div>
                  ${this.hideDivider
                    ? nothing
                    : html`<ssk-divider size="xs"></ssk-divider>`} `
              : nothing
          }
          ${
            footerSlotExists
              ? html`<div class="footer"><slot name="footer"></slot></div>`
              : nothing
          }
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host([show]) {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
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
      z-index: 1000;
    }

    .container {
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      overflow: hidden;
      width: var(--width);
      position: relative;
    }

    .header {
      padding: 16px;
      display: var(--header-display);
      justify-content: var(--header-justify-content);
      align-items: center;
      gap: 1em;
    }

    .title {
      font-size: 28px;
      font-weight: 500;
    }

    .body {
      padding: var(--padding-body);
      font-size: 24px;
      font-weight: 400;
      display: var(--body-display);
      justify-content: var(--body-justify-content);
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
      right: 1em;
      top: 1em;
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
