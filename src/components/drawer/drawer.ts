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

export class Drawer extends LitElement {
  static registeredName = "ssk-drawer";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String }) testId?: string;
  @property({ type: String }) width: string = "480px";
  @property({ type: String }) headerPadding?: string = "24px";
  @property({ type: String }) bodyPadding?: string = "24px";
  @property({ type: String }) side: "left" | "right" = "left";
  @property({ type: Boolean }) show = false;
  @property({ type: Boolean }) hideDivider = false;

  @eventOptions({ capture: false, once: false, passive: true })
  private close(e: Event) {
    redispatchEvents(e, this, "close");
  }

  render() {
    const headerSlot = this.querySelector('[slot="header"]');
    const footerSlot = this.querySelector('[slot="footer"]');

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.container, ":host")}
      <style>
        :host {
          --drawer-width: ${parseVariables(
            cssVar("width", this.width),
            this.width,
            "480px"
          )};

          --divider: ${this.hideDivider
            ? "none"
            : "1px solid var(--stroke-primary, #e5e7eb)"};
          --divider-margin: ${this.hideDivider ? "0" : "-1px"};

          --header-padding: ${parseVariables(
            cssVar("padding", this.headerPadding),
            this.headerPadding,
            "0px"
          )};

          --body-padding: ${parseVariables(
            cssVar("padding", this.bodyPadding),
            this.bodyPadding,
            "0px"
          )};
        }
      </style>

      <div class="backdrop ${this.show ? "show" : ""}" @click=${this.close}>
        <div
          class="drawer ${this.side} ${this.show ? "slide-in" : "slide-out"}"
          @click=${(e: Event) => e.stopPropagation()}
          data-testid=${this.testId || nothing}
        >
          ${headerSlot
            ? html`<div class="header">
                <slot name="header"></slot>
              </div>`
            : nothing}

          <div class="body">
            <slot name="body"></slot>
          </div>

          ${footerSlot
            ? html`<div class="footer">
                <slot name="footer"></slot>
              </div>`
            : nothing}
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      position: fixed;
      inset: 0;
      z-index: 1000;
      pointer-events: none;
    }

    .backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      pointer-events: none;
    }

    .backdrop.show {
      opacity: 1;
      pointer-events: auto;
    }

    .drawer {
      position: fixed;
      display: grid;
      grid-template-areas:
        "header close-button"
        "body body"
        "footer footer";
      grid-template-columns: 1fr auto;
      grid-template-rows: auto 1fr auto;
      top: 0;
      bottom: 0;
      width: var(--drawer-width);
      background-color: var(--bg-primary, #ffffff);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      overflow-y: auto;
      transition: transform 0.3s ease-in-out;
      pointer-events: auto;
    }

    .drawer.left {
      left: 0;
      transform: translateX(-100%);
    }

    .drawer.right {
      right: 0;
      transform: translateX(100%);
    }

    .drawer.slide-in.left {
      transform: translateX(0%);
    }

    .drawer.slide-in.right {
      transform: translateX(0%);
    }

    .drawer.slide-out.left {
      transform: translateX(-100%);
    }

    .drawer.slide-out.right {
      transform: translateX(100%);
    }

    .header {
      grid-area: header;
      display: flex;
      justify-content: space-between;
      gap: 0.5em;
      padding: var(--header-padding);
      border-bottom: var(--divider);
      margin-bottom: var(--divider-margin);
    }

    .body {
      grid-area: body;
      padding: var(--body-padding);
      font-size: var(--font-size-caption,18px);
    }

    .footer {
      grid-area: footer;
      padding: 16px;
      display: flex;
      justify-content: flex-end;
      gap: 0.5em;
      border-top: var(--divider);
      margin-top: var(--divider-margin);
    }

    ssk-icon {
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-drawer": Drawer;
  }
}

if (!customElements.get("ssk-drawer")) {
  customElements.define("ssk-drawer", Drawer);
}
