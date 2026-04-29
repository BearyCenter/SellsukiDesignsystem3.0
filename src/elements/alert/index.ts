import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { eventOptions, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { redispatchEvents } from "../../helpers/lit";
import { ThemeValue } from "../../types/base-attributes";

import {
  FontFamilyGroup,
  Size,
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";

export type Type = "default" | "info" | "error" | "warning" | "success";
export class Alert extends LitElement implements ThemeValue {
  static registeredName = "ssk-alert";
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // ThemeValue
  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  margin?: string;
  @property({ type: String })
  padding?: Size;
  @property({ type: String })
  rounded?: string | undefined;
  @property({ type: String })
  width?: string = "auto";

  // Font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontSize?: string | undefined;

  // Alert attributes
  @property({ type: Boolean })
  hidden = false;
  @property({ type: String })
  type: Type = "default";
  @property({ type: String })
  message?: string | undefined;
  @property({ type: String })
  topic?: string | undefined;
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

    let additionalCss = `
    --margin: ${parseVariables(cssVar("margin", this.margin), "auto")};
    --padding: ${parseVariables(cssVar("padding", this.padding), "0.75em")};
    --border-color: ${parseVariables(
      cssVar("border-color", this.type, 500),
      cssVar("border-color", "gray", 200)
    )};
    --width: ${parseVariables(cssVar("width", this.width), "auto")};
    --rounded: ${parseVariables(cssVar("rounded", this.rounded), "8px")};
    --background-color: ${parseVariables(
      cssVar("border-color", this.type, 50),
      "#fff"
    )};
    --color: ${parseVariables(cssVar("colors", "gray", 500))};
    --font-family: ${parseVariables(
      cssVar("font-family", this.fontFamilyGroup)
    )};
    --font-size: ${parseVariables(
      cssVar("font-size", this.fontSize),
      cssVar("font-size", this.size)
    )};
    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.alert, ":host")}
      <style>
        div {${additionalCss}}
      </style>

      <div class="container">
        <div class="icon">
          <slot name="icon-slot"></slot>
        </div>
        <div class="alert-content">
          <div class="detail">
            <div class="alert-title">${this.topic}</div>
            <div class="alert-message">${this.message}</div>
          </div>
        </div>
        <div
          class="close${this.hideCloseButton ? "-hide" : ""}"
          @click=${this.close}
        ></div>
        <div class="alert-footer">
          <slot name="close-button-slot"></slot>
          <slot name="ok-button-slot"></slot>
        </div>
      </div>
    `;
  }

  static styles = css`
    .detail {
      margin-left: 0.75rem;

      .alert-title,
      .alert-message {
        font-family: var(--font-family);
        font-size: var(--font-size);
      }

      .alert-message {
        color: var(--color);
      }

      .alert-title {
        font-weight: var(--font-weight-medium, 500);
      }
    }

    .close {
      cursor: pointer;
      padding-right: 0.75em;
      grid-column: 3;
      grid-row: 1;
    }
    .close:before,
    .close:after {
      content: "";
      position: absolute;
      height: 0.967em;
      width: 0.1em;
      background-color: var(--color);
    }
    .close:before {
      transform: rotate(45deg);
    }
    .close:after {
      transform: rotate(-45deg);
    }

    .close-hide {
      display: none;
    }

    .alert-footer {
      display: flex;
      grid-column: 2;
      grid-row: 3;
    }

    .container {
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-template-rows: repeat(3, auto);
      gap: 0.5em;
      width: var(--width);
      height: auto;
      margin: var(--margin);
      padding: var(--padding);
      border: 1px solid var(--border-color);
      border-radius: var(--rounded);
      background-color: var(--background-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-alert": Alert;
  }
}

if (!customElements.get("ssk-alert")) {
  customElements.define("ssk-alert", Alert);
}
