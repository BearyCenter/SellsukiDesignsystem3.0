import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, eventOptions, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import "../../elements/icon";
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
  hidden = false;

  @property({ type: Boolean })
  hideCloseButton = false;

  @eventOptions({ capture: false, once: false, passive: true })
  private close(e: Event) {
    redispatchEvents(e, this, "close");
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = html`
      <style>
        :host {
          --width: ${parseVariables(
            cssVar("width", this.width),
            this.width,
            "100%",
          )};

          --background-color-footer: ${parseVariables(
            cssVar("colors", "background", 200),
            "#fff",
          )};

          --border-color: ${parseVariables(
            cssVar("colors", "border", 100),
            "#ddd",
          )};
        }
      </style>
    `;

    const footerSlotExists = this.querySelector('[slot="footer"]');

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.container, ":host")}
      ${additionalCss}

      <div class="backdrop">
        <div class="container" data-testid=${this.testId || nothing}>
          <div class="header">
            <span class="title">
              <slot name="header"></slot>
            </span>
            <ssk-icon
              ?hidden=${this.hideCloseButton}
              name="outline-x-mark"
              @click=${this.close}
            ></ssk-icon>
          </div>
          <div class="body">
            <slot name="body"></slot>
          </div>
          ${footerSlotExists ? html`<slot name="footer"></slot>` : nothing}
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      position: fixed;
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

    :host([hidden]) {
      opacity: 0;
      visibility: hidden;
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
    }

    .header {
      padding: 16px;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1em;
    }

    .title {
      font-size: 28px;
      font-weight: 500;
    }

    .body {
      padding: 16px;
      font-size: 24px;
      font-weight: 400;
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
