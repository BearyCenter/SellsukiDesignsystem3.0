import { consume } from "@lit-labs/context";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ButtonVariants, Theme } from "../../types/theme";
import { themeContext } from "../theme-context";

/**
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("ssk-button")
export class Button extends LitElement {
  @property({ type: String })
  variant: ButtonVariants = "solid";

  @property({ type: Boolean })
  loading = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  hidden = false;

  @property({
    reflect: true,
    converter: {
      toAttribute: (value, t) => {
        console.log("toAttribute", value, t);
        return value;
      },
    },
  })
  padding = "8px 16px";

  // onClick
  @property({ type: Function })
  onClick?: () => void;

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  render() {
    if (this.hidden) {
      return html``;
    }

    return html`
      <style>
        button {
          background-color: ${this.theme?.colors.primary?.["500"]};
          color: ${this.theme?.colors.black?.["800"]};
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
          padding: ${this.padding};
        }

        button:hover {
          background-color: ${this.theme?.colors.primary?.["600"]};
        }

        button:active {
          background-color: ${this.theme?.colors.primary?.["700"]};
        }

        button:disabled {
          background-color: ${this.theme?.colors.gray?.["300"]};
          color: ${this.theme?.colors.gray?.["500"]};
          cursor: not-allowed;
        }
      </style>

      <button .disabled=${this.disabled || this.loading} @click=${this.onClick}>
        ${this.loading
          ? html`<span>Loading...</span>`
          : html`<slot name="prefix" />
              <slot />
              <slot name="postfix" />`}
      </button>
    `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-button": Button;
  }
}
