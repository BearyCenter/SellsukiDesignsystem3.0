import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ThemeValue } from "../../types/base-attributes";
import { consume } from "@lit/context";
import { Size, Theme, themeContext } from "../../main";

@customElement("ssk-progress-bar")
export class ProgressBar extends LitElement implements ThemeValue {
  static registeredName = "ssk-progress-bar";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String })
  size: "md" | "sm" = "md";

  @property({ type: Number })
  progress = 10;

  @property({ type: String })
  labelPosition: "top" | "bottom" | "right" = "top";

  @property({ type: String })
  status: "in-progress" | "error" | "success" = "in-progress";

  @property({ type: String })
  styleOfProgress: "text" | "icon" = "text";

  render() {
    return html`
      <div class="progress-container ${this.labelPosition}">
        ${this.labelPosition === "top" ? this.renderLabel() : ""}
        <div class="progress-bar">
          <div class="progress-bar__fill ${this.status}" 
              style="width: ${this.progress}%; ${this.progress === 100 ? 'background-color: ##059669;' : ''}">
          </div>
        </div>
        ${this.labelPosition === "right" || this.labelPosition === "bottom" ? this.renderLabel() : ""}
      </div>
    `;
  }

  renderLabel() {
    return html`
      <div class="text">
        <div class="label">Loading Data...</div>
        <div class="percentage">
          ${this.status === "success"
        ? this.styleOfProgress === "icon"
          ? html`<ssk-icon name="solid-check-circle" color="#059669"></ssk-icon>`
          : html`<span style="color: ${this.progress === 100 ? '#1F2937' : 'inherit'};">DONE</span>`
        : this.status === "error"
          ? this.styleOfProgress === "icon"
            ? html`<ssk-icon name="solid-x-circle" color="#E11D48"></ssk-icon>`
            : html`<span style="color: #E11D48;">ERROR</span>`
          : `${this.progress}%`}
        </div>
      </div>
    `;
  }

  static styles = css`
    .progress-container {
      min-width: 370px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    
    .progress-container.right {
      flex-direction: row;
      align-items: center;
    }

    .text {
      font-family: DB HeaventRounded;
      font-size: 24px;
      font-weight: 400;
      line-height: 24px;
      text-align: left;
      color: #6B7280;
    }

    .label {
      white-space: nowrap;
    }

    .progress-container .text {
      display: flex;
      justify-content: space-between;
    }

    .progress-container.top .text {
      width: 370px;
      margin: 0 0 8px 0;
    }

    .progress-container.bottom .text {
      width: 370px;
      margin: 8px 0 0 0;
    }

    .progress-container .text .percentage .percentage .error {
      color: #E11D48;
    }

    .progress-bar__fill {
      height: 100%;
      background-color: #2196f3; /* Default color for in-progress */
      transition: width 0.2s ease-in-out;
    }

    .progress-bar__fill.error {
      background-color: #e11d48;
    }

    .progress-bar__fill.success {
      background-color: #059669;
    }

    .progress-container.right .text {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
    }

    .progress-container.right .text .percentage {
      padding: 0 8px;
    }

    .progress-bar {
      width: 370px;
      background-color: #e5e7eb;
      border-radius: 4px;
      overflow: hidden;
      height: 8px;
    }

    .progress-bar__fill {
      height: 100%;
      background-color: #2196f3;
      text-align: center;
      line-height: 24px;
      color: white;
      border-radius: 8px;
      transition: width 0.2s ease-in-out;
    }
  `;
}

// Register the element globally
declare global {
  interface HTMLElementTagNameMap {
    "ssk-progress-bar": ProgressBar;
  }
}
