import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { portal } from "lit-modal-portal";
import { customElement, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { Theme } from "../../types/theme";

@customElement("ssk-dropdown-options-container-v2")
export class DropdownOptionsContainerV2 extends LitElement {
  static registeredName = "ssk-dropdown-options-container-v2";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  // createRenderRoot() {
  //   const root = document.getElementById("overlay-container");
  //   return root ?? this;
  // }

  render() {
    if (this.hidden) {
      return nothing;
    }

    const root = document.getElementById("overlay-container") ?? this;
    //   return root ?? this;

    return html`
      ${portal(
        html`<div
          class="options-container"
          data-testid=${this.testId || nothing}
        >
          aaa a
          <slot></slot>
        </div>`,
        root
      )}
    `;
  }

  static styles = css`
    .options-container {
      display: flex;
      flex-direction: column;
      gap: 0.125em;
      box-sizing: border-box;

      position: absolute;
      z-index: 4;
      left: 0;
      background-color: var(--options-background-color, #fff);
      box-shadow: 0px 19px 5px 0px rgba(17, 24, 39, 0),
        0px 12px 5px 0px rgba(17, 24, 39, 0.01),
        0px 7px 4px 0px rgba(17, 24, 39, 0.03),
        0px 3px 3px 0px rgba(17, 24, 39, 0.05),
        0px 1px 2px 0px rgba(17, 24, 39, 0.07),
        0px 0px 0px 0px rgba(17, 24, 39, 0.09);
      border-radius: var(--rounded);
      border: 1px solid var(--ssk-colors-gray-200);
      padding: 0.5em 0.25em;
      overflow-x: hidden;

      color: var(--color);
      width: var(--dropdown-width, auto);

      max-height: 0px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-dropdown-options-container-v2": DropdownOptionsContainerV2;
  }
}
