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

/**
 * Sellsuki Tab Button — DS 3.0
 *
 * Single tab trigger used inside `<ssk-tab-header>`. Two visual
 * variants: `inline` (underlined text, default) and `button` (pill).
 * The `active` boolean drives the selected styling; emit a `click` and
 * let the parent set `active` to flip between tabs.
 *
 * Must be a direct child of `<ssk-tab-header>`. Slot the label as the
 * default child; pair with an `<ssk-icon>` in the slot for icon-and-text
 * tabs.
 *
 * @example
 *   <ssk-tab-header variant="inline">
 *     <ssk-tab-button active>ทั้งหมด</ssk-tab-button>
 *     <ssk-tab-button>รอยืนยัน</ssk-tab-button>
 *     <ssk-tab-button>จัดส่งแล้ว</ssk-tab-button>
 *   </ssk-tab-header>
 *
 * @slot - Tab label
 */
export class TabButton extends LitElement {
  static registeredName = "ssk-tab-button";

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  /**
   * Stable `data-testid` attribute applied to the tab trigger for E2E test selectors.
   */
  @property({ type: String })
  testId?: string;

  /**
   * Visual style — must match the parent `<ssk-tab-header variant>`. `inline` is underlined text, `button` is a pill.
   */
  @property({ type: String })
  variant: "inline" | "button" = "inline";

  /**
   * Tab text size — must match the parent `<ssk-tab-header size>`. Defaults to `md`.
   */
  @property({ type: String })
  size: "sm" | "md" = "md";

  /**
   * Optional fixed width (any CSS length). Leave unset to auto-size to the label content.
   */
  @property({ type: String })
  width?: string | undefined;

  /**
   * Brand accent for the active underline / text color — falls back to `--fg-brand-primary` from `<ssk-app-shell-provider>` brand context. Pass an explicit `ColorRole` to override.
   */
  @property({ type: String })
  color?: ColorRole | ColorName = "primary.500";

  /**
   * When `true`, applies selected styling (underline for `inline`, surface-tinted pill for `button`). Parent `<ssk-tab-header>` typically owns this state and flips it in response to click events.
   */
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
      --font-size: var(--font-size-p, 20px);
      --gap: 8px;
      --padding: 8px 16px;
      --rounded: 8px;
    }

    .size-md {
      --font-size: var(--font-size-button, 18px);
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
      font-weight: var(--font-weight-medium, 500);
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

if (!customElements.get("ssk-tab-button")) {
  customElements.define("ssk-tab-button", TabButton);
}
