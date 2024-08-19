import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ThemeValue } from "../../types/base-attributes";
import { consume } from "@lit/context";
import { Theme, themeContext } from "../../main";

@customElement("ssk-progress-bar")
export class ProgressBar extends LitElement implements ThemeValue {
  static registeredName = "ssk-progress-bar";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String })
  size: "md" | "sm" = "md";

  @property({ type: Number })
  value = 0;

  @property({ type: String })
  labelPosition: "top" | "bottom" | "right" = "top";

  @property({ type: String })
  status: "in-progress" | "error" | "success" = "in-progress";

  @property({ type: String })
  styleOfProgress: "text" | "icon" = "text";

  @property({ type: String })
  label: string = "Loading Data...";

  render() {
    const isMd = this.size === "md";

    const style = `
      --min-width: ${isMd ? "400px" : "400px"};
      --font-size: ${isMd ? "24px" : "20px"};
      --line-height: ${isMd ? "24px" : "20px"};
      --progress-bar-height: ${isMd ? "8px" : "4px"};
    `;

    const progressWidth = this.value <= 1 ? '2' : `${this.value}`;

    return html`
      <div class="progress-container ${this.labelPosition}" style="${style}">
        ${this.labelPosition === "top" ? this.renderLabel() : ""}
        <div class="progress-bar">
          <div class="progress-bar__fill ${this.status}" style="
          width: ${progressWidth}%;
          "></div>
        </div>
        ${this.labelPosition === "right" || this.labelPosition === "bottom" ? this.renderLabel() : ""}
      </div>
    `;
  }

  renderLabel() {
    return html`
      <div class="text">
        <div class="label">
            ${this.label}
        </div>
        <div class="percentage">
          ${this.status === "success"
        ? (this.styleOfProgress === "icon"
          ? html`<ssk-icon name="solid-check-circle" color="#059669"></ssk-icon>`
          : "DONE")
        : this.status === "error"
          ? (this.styleOfProgress === "icon"
            ? html`<ssk-icon name="solid-x-circle" color="#E11D48"></ssk-icon>`
            : "ERROR")
          : `${this.value}%`}
        </div>
      </div>
    `;
  }

  static styles = css`
    .progress-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-width: var(--min-width, 370px);
    }
    
    .progress-container.right {
      flex-direction: row;
      align-items: center;
    }

    .text {
      font-family: 'DB HeaventRounded';
      font-size: var(--font-size, 24px);
      font-weight: 400;
      line-height: var(--line-height, 24px);
      text-align: left;
      color: #6B7280;
    }

    .label {
      white-space: nowrap;
    }

    .percentage {
      display : flex;
    }

    .progress-container .text {
      display: flex;
      justify-content: space-between;
    }

    .progress-container.top .text,
    .progress-container.bottom .text {
      width: 370px;
    }

    .progress-container.top .text {
      margin: 0 0 8px 0;
    }

    .progress-container.bottom .text {
      margin: 8px 0 0 0;
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
      height: var(--progress-bar-height, 8px);
    }

    .progress-bar__fill {
      height: 100%;
      background-color: var(--fill-color, #2196f3);
      transition: width 0.2s ease-in-out;
      border-radius: 8px;
      text-align: center;
      line-height: 24px;
      color: white;
    }

    .progress-bar__fill.error {
      background-color: #e11d48;
    }

    .progress-bar__fill.success {
      background-color: #059669;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-progress-bar": ProgressBar;
  }
}
