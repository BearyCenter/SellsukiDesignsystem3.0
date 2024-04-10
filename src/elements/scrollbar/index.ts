import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import {
  Size,
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";

/**
 * @slot - This element has a slot
 * @csspart scrollbar
 */
@customElement("ssk-scrollbar")
export class Scrollbar extends LitElement {
  static registeredName = "ssk-scrollbar";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String })
  size: Size = "md";

  @property({ type: String })
  width?: string | undefined;
  @property({ type: String })
  height?: string | undefined;

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = `
    --thump-width: ${parseVariables(cssVar("width", this.size), "6px")};
    --content-height: ${parseVariables(
      cssVar("height", this.height),
      this.height,
      "auto",
    )};
    --content-width: ${parseVariables(
      cssVar("width", this.width),
      this.width,
      "auto",
    )};
    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.scrollbar, ":host")}
      <style>
        div {
          ${additionalCss};
        }
      </style>
      <div id="scrollbar" class="scrollbar">
          <slot class="ss"></slot>
        </div>
      </div>
    `;
  }

  static styles = css`
    .scrollbar {
      position: relative;
      overflow: auto;
      width: var(--content-width);
      height: var(--content-height);
    }

    ::-webkit-scrollbar {
      width: var(--thump-width);
      height: var(--thump-width);
    }

    ::-webkit-scrollbar-track {
      background: var(--ssk-colors-fiord-100);
      border-radius: 8px;
    }

    ::-webkit-scrollbar-thumb {
      background: var(--ssk-colors-gray-500);
      border-radius: 8px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: var(--ssk-colors-gray-600);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-scrollbar": Scrollbar;
  }
}
