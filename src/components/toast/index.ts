import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { eventOptions, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import "../../elements/icon";
import { redispatchEvents } from "../../helpers/lit";
import {
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";

export class Toast extends LitElement {
  static registeredName = "ssk-toast";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String })
  testId?: string;

  @property({ type: String })
  width?: string | undefined;

  @property({ type: Boolean })
  hidden = false;

  @property({ type: Boolean })
  hideCloseButton = false;

  @property({ type: String })
  heading?: string | undefined;

  @property({ type: String })
  content?: string | undefined;

  @property({ type: String })
  type: "success" | "error" | "warning" | "info" = "info";

  @eventOptions({ capture: false, once: false, passive: true })
  private close(e: Event) {
    redispatchEvents(e, this, "close");
  }

  static iconMap = {
    success: "outline-check-circle",
    error: "outline-exclamation-circle",
    warning: "outline-exclamation-circle",
    info: "outline-information-circle",
  };

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
            "auto"
          )};

          --background-color: ${parseVariables(
            cssVar("colors", "background", 50),
            "white"
          )};

          --color-title: ${parseVariables(
            cssVar("colors", "text", "800"),
            "black"
          )};

          --color-content: ${parseVariables(
            cssVar("colors", "text", "400"),
            "black"
          )};
        }
      </style>
    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.container, ":host")}
      ${additionalCss}

      <span class="container" data-testid=${this.testId || nothing}>
        <ssk-icon
          name=${Toast.iconMap[this.type]}
          color=${this.type}
          class="icon"
        ></ssk-icon>

        <span class="body">
          <span class="text">
            <span class="title">${this.heading || nothing}</span>
            <span class="content">${this.content || nothing}</span>
          </span>
          <slot></slot>
        </span>

        <ssk-icon
          ?hidden=${this.hideCloseButton}
          name="outline-x-mark"
          @click=${this.close}
          cursor="pointer"
        ></ssk-icon>
      </span>
    `;
  }

  static styles = css`
    .container {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 16px;

      padding: 16px;
      border-radius: 8px;
      background-color: var(--background-color);
      width: var(--width);

      /* add some shadow */
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }

    .body {
      display: flex;
      flex-direction: column;
      gap: 8px;
      justify-content: space-between;
    }

    .text {
      display: flex;
      gap: 8px;
    }

    .title {
      font-size: var(--font-size-h4, 24px);
      font-weight: 500;
      color: var(--color-title);
    }

    .content {
      font-size: var(--font-size-h4, 24px);
      font-weight: 400;
      color: var(--color-content);
    }
  `;
}

declare global {
  interface HTMLElementToastNameMap {
    "ssk-toast": Toast;
  }
}

if (!customElements.get("ssk-toast")) {
  customElements.define("ssk-toast", Toast);
}
