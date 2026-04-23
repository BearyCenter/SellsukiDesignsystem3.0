import { consume } from "@lit/context";
import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import {
  ColorName,
  ColorRole,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
  Theme,
} from "../../types/theme";

export class TabButton extends LitElement {
  static registeredName = "ssk-tab-button";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  @property({ type: String })
  variant: "inline" | "button" = "inline";

  @property({ type: String })
  size: "sm" | "md" = "md";

  @property({ type: String })
  width?: string | undefined;

  @property({ type: String })
  color?: ColorRole | ColorName = "primary.500";

  @property({ type: Boolean })
  active = false;

  render() {
    return html`
      ${parseThemeToCssVariables(this.theme?.components?.tab, ":host")}
      <style>
        :host {
          --width: ${parseVariables(
            cssVar("width", this.width),
            this.width,
            "auto"
          )};
          --color: ${parseVariables(
            cssVar("colors", this.color, 500),
            cssVar("colors", this.color),
            this.color
          )};
        }
      </style>
      <div
        class="tab-button variant-${this.variant} size-${this.size} ${this
          .active
          ? "active"
          : ""}"
      >
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    :host {
      width: var(--width);
    }

    .size-sm {
      --font-size: 20px;
      --gap: 8px;
      --padding: 8px 16px;
      --rounded: 8px;
    }

    .size-md {
      --font-size: 24px;
      --gap: 8px;
      --padding: 8px 16px;
      --rounded: 8px;
    }

    .tab-button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: var(--gap);
      padding: var(--padding);
      font-size: var(--font-size);
      color: var(--text-secondary, #6b7280);
      cursor: pointer;
    }

    .tab-button.variant-button {
      padding: var(--padding);
    }

    .active {
      font-weight: 500;
    }

    .tab-button.variant-button.active {
      background-color: var(--bg-primary, #fff);
      color: var(--text-primary, #111827);
      border-radius: var(--rounded);
      box-shadow: 0px 3px 2px rgba(17, 24, 39, 0.04),
        0px 1px 1px rgba(17, 24, 39, 0.08), 0px 0px 1px rgba(17, 24, 39, 0.09),
        0px 0px 0px rgba(17, 24, 39, 0.09);
    }

    .tab-button.variant-inline.active {
      border-bottom: 3px solid var(--color);
      margin-bottom: -1px;
      color: var(--color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-tab-button": TabButton;
  }
}

if (!customElements.get("ds-tab-button")) {
  customElements.define("ds-tab-button", TabButton);
}
if (!customElements.get("ssk-tab-button")) {
  customElements.define("ssk-tab-button", class extends TabButton {});
}
