import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ThemeValue } from "../../types/base-attributes";
import { consume } from "@lit/context";
import { cssVar, parseThemeToCssVariables, parseVariables, Size, Theme, themeContext } from "../../main";

@customElement("ssk-progress-bar")
export class ProgressBar extends LitElement implements ThemeValue {
  static registeredName = "ssk-progress-bar";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String })
  size: Size = "md";

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
    if (this.hidden) {
      return nothing;
    }

    const style = `
      --font-size: ${parseVariables(cssVar("font-size", this.size))};
      --line-height: ${parseVariables(cssVar("line-height", this.size))};
      --height: ${parseVariables(cssVar("height", this.size))};
    `;

    const progressWidth = this.value <= 1 ? '2' : `${this.value}`;

    return html`
    ${parseThemeToCssVariables(this.theme?.components?.progressBar, ":host")}

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
    let percentageStyle = "";

    if (this.status === "success" || this.value === 100) {
      percentageStyle = "color: #1F2937;";
    } else if (this.status === "error") {
      percentageStyle = "color: #E11D48;";
    }

    return html`
      <div class="text">
        <div class="label">
            ${this.label}
        </div>
        <div class="percentage" style="${percentageStyle}">
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
      min-width: 400px;
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
      height: var(--height, 8px);
    }

    .progress-bar__fill {
      border-radius: 8px;
      text-align: center;
      line-height: 24px;
      color: white;
      height: 100%;
      background-color: var(--fill-color, #2196f3);
      transition: background-color 0.3s ease-in-out, width 0.2s ease-in-out;
      }

    .progress-bar__fill.success {
      background-color: #059669;
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
