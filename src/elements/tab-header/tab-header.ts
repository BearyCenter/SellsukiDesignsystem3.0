import { consume } from "@lit/context";
import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import {
  ColorName,
  ColorRole,
  parseThemeToCssVariables,
  Theme,
} from "../../types/theme";

export class TabHeader extends LitElement {
  static registeredName = "ssk-tab-header";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  @property({ type: String })
  variant: "inline" | "button" = "inline";

  @property({ type: String })
  align: "left" | "center" | "right" = "left";

  @property({ type: String })
  size: "sm" | "md" = "md";

  @property({ type: String })
  color?: ColorRole | ColorName = "primary.500";

  render() {
    return html`
      ${parseThemeToCssVariables(this.theme?.components?.tab, ":host")}
      <div
        class="header-container variant-${this.variant} size-${this
          .size} align-${this.align}"
      >
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    .size-sm {
      --font-size: 20px;
    }

    .size-md {
      --font-size: 24px;
    }

    .align-left {
      --align: flex-start;
    }

    .align-center {
      --align: center;
    }

    .align-right {
      --align: flex-end;
    }

    .header-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: var(--align);
      gap: var(--gap);
      font-size: var(--font-size);
    }

    .header-container.variant-button {
      padding: 4px;
      background-color: var(--bg-secondary, #f3f4f6);
      gap: 4px;
      border-radius: 12px;
      box-shadow: 0px 3px 2px rgba(17, 24, 39, 0.04),
        0px 1px 1px rgba(17, 24, 39, 0.08), 0px 0px 1px rgba(17, 24, 39, 0.09),
        0px 0px 0px rgba(17, 24, 39, 0.09);
    }

    .header-container.variant-inline {
      border-bottom: 1px solid var(--stroke-primary, #e5e7eb);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-tab-header": TabHeader;
  }
}

if (!customElements.get("ds-tab-header")) {
  customElements.define("ds-tab-header", TabHeader);
}
if (!customElements.get("ssk-tab-header")) {
  customElements.define("ssk-tab-header", class extends TabHeader {});
}
