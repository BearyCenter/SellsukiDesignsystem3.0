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

/**
 * Sellsuki Tab Header — DS 3.0
 *
 * Horizontal tab strip that hosts `<ssk-tab-button>` children. Two
 * variants — `inline` (underlined text) and `button` (pill row) — plus
 * `align` control (left / center / right). Use the `--font-size-label`
 * (20px) token for tab text — never below the 18px minimum.
 *
 * Reach for `<ssk-tab-header>` for in-page section switching (order
 * status filter, settings categories). For routing-style nav between
 * pages prefer `<ssk-sidebar>`; for vertical FAQ-style disclosure use
 * `<ssk-accordion>`.
 *
 * @example
 *   <ssk-tab-header variant="inline" align="left">
 *     <ssk-tab-button active>ทั้งหมด</ssk-tab-button>
 *     <ssk-tab-button>รอยืนยัน</ssk-tab-button>
 *     <ssk-tab-button>จัดส่งแล้ว</ssk-tab-button>
 *   </ssk-tab-header>
 *
 * @slot - `<ssk-tab-button>` children
 */
export class TabHeader extends LitElement {
  static registeredName = "ssk-tab-header";

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  /**
   * Stable `data-testid` attribute applied to the header container for E2E test selectors.
   */
  @property({ type: String })
  testId?: string;

  /**
   * Visual style — `inline` for underlined text tabs (default, in-page section switching) or `button` for surface-tinted pill tabs (filter chips).
   */
  @property({ type: String })
  variant: "inline" | "button" = "inline";

  /**
   * Horizontal alignment of the slotted `<ssk-tab-button>` children — `left` (default), `center`, or `right`.
   */
  @property({ type: String })
  align: "left" | "center" | "right" = "left";

  /**
   * Tab text size — `sm` uses `--font-size-p` (20px) and `md` (default) uses `--font-size-button` (18px). Both stay above the 18px DS 3.0 minimum.
   */
  @property({ type: String })
  size: "sm" | "md" = "md";

  /**
   * Brand accent for the active-tab indicator — falls back to `--fg-brand-primary` from `<ssk-app-shell-provider>` brand context. Pass an explicit `ColorRole` to override.
   */
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
      --font-size: var(--font-size-p, 20px);
    }

    .size-md {
      --font-size: var(--font-size-button, 18px);
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
      border-radius: var(--radius-lg, 12px);
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

if (!customElements.get("ssk-tab-header")) {
  customElements.define("ssk-tab-header", TabHeader);
}
