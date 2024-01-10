import { consume } from "@lit-labs/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { Theme, parseThemeToCssVariables } from "../../types/theme";
import { State, stateContext } from "./types";

@customElement("ssk-sidebar-header")
export class SidebarList extends LitElement {
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

  @property({ type: String })
  label1?: string | undefined;
  @property({ type: String })
  label2?: string | undefined;

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
        <div class="prefix">
          <slot name="prefix"></slot>
        </div>

        ${this.state?.expanded
          ? html`
              <div class="content">
                <div class="label1">${this.label1}</div>
                <div class="label2">${this.label2}</div>
              </div>
            `
          : nothing}
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
      background-color: var(--ssk-colors-theme-200);
      color: var(--color);
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);

      padding: var(--padding);
      margin: var(--margin);

      gap: 8px;
      border-radius: 8px;
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
    "ssk-sidebar-header": SidebarList;
  }
}
