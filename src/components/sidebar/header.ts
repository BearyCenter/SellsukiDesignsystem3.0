import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { Theme, parseThemeToCssVariables } from "../../types/theme";
import { State, stateContext } from "./sidebar";

/**
 * Sellsuki Sidebar Header — DS 3.0
 *
 * Top area of `<ssk-sidebar>` reserved for the product logo, app title, or
 * collapse-toggle. Renders the default slot when the sidebar is expanded
 * and the `mini` slot (typically a compact icon-only mark) when it
 * collapses, so the brand stays visible at both widths.
 *
 * Must be a direct child of `<ssk-sidebar>` — it consumes the sidebar's
 * `expanded` state via context.
 *
 * @example
 *   <ssk-sidebar-header>
 *     <ssk-logo brand="sellsuki" size="md"></ssk-logo>
 *     <ssk-logo slot="mini" brand="sellsuki" size="sm"></ssk-logo>
 *   </ssk-sidebar-header>
 *
 * @slot      - Header shown when sidebar is expanded
 * @slot mini - Header shown when sidebar is collapsed
 */
export class SidebarHeader extends LitElement {
  static registeredName = "ssk-sidebar-header";

  @consume({ context: stateContext, subscribe: true })
  @property({ attribute: false })
  private state?: State;

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  render() {
    if (this.hidden) {
      return null;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.sidebar, ":host")}

      <div
        class="sidebar-header-container"
        data-testid=${this.testId || nothing}
      >
        ${this.state?.expanded
          ? html` <slot></slot> `
          : html` <slot name="mini"></slot> `}
      </div>
    `;
  }

  static styles = css`
    .sidebar-header-container {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      color: var(--color);
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);

      padding: 0;
      gap: 8px;
      border-radius: var(--radius-md, 8px);
      border-color: var(--border-color);
      border-width: var(--border-width);
    }

    .sidebar-header-container .prefix {
      display: flex;
      align-items: center;
    }

    .sidebar-header-container .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-right: auto;

      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-sidebar-header": SidebarHeader;
  }
}

if (!customElements.get("ssk-sidebar-header")) {
  customElements.define("ssk-sidebar-header", SidebarHeader);
}
