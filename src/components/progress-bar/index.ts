import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import {
  ColorName,
  ColorRole,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
  Size,
  Theme,
} from "../../types/theme";

/**
 * Sellsuki Progress Bar — DS 3.0
 *
 * Horizontal fill bar that reports progress 0–100 with a status-aware
 * color (`in-progress` / `success` / `error`) and an optional label
 * positioned above, below, or to the right. `styleOfProgress` switches the
 * trailing indicator between a percentage text and a status icon.
 *
 * Reach for `<ssk-progress-bar>` for determinate operations whose
 * percentage is known (file upload, multi-step form). For unknown
 * duration loading use `<ssk-spinner>`. For discrete steps use
 * `<ssk-stepper>`.
 *
 * @example
 *   <ssk-progress-bar value="72" status="in-progress" label="กำลังอัปโหลด..."></ssk-progress-bar>
 */
export class ProgressBar extends LitElement {
  static registeredName = "ssk-progress-bar";

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  /**
   * Brand accent for the in-progress fill color — falls back to `--fg-brand-primary` from `<ssk-app-shell-provider>` brand context. Pass an explicit `ColorRole` to override.
   */
  @property({ type: String })
  themeColor: ColorRole | ColorName = "";

  /**
   * Optional override for the label text color (`ColorRole` or `ColorName`). Leave unset to use `--text-secondary`.
   */
  @property({ type: String })
  color?: ColorRole | ColorName;

  /**
   * Visual height scale — `xs` / `sm` / `md` / `lg` / `xl`. Controls bar height, label font size, and line height via design tokens. Defaults to `md`.
   */
  @property({ type: String })
  size: Size = "md";

  /**
   * Override the bar width (any CSS length). Defaults to `370px` when unset.
   */
  @property({ type: String })
  width?: string | undefined;

  /**
   * Current progress percent (0–100). Values at or under 1 render a hairline so the bar remains visible at the start.
   */
  @property({ type: Number })
  value = 0;

  /**
   * Where the label sits relative to the bar — `top`, `bottom` (default), or `right` (inline beside the fill).
   */
  @property({ type: String })
  labelPosition: "top" | "bottom" | "right" = "bottom";

  /**
   * Status tone — `in-progress` (brand fill), `success` (green at 100%), or `error` (red regardless of value). Drives both fill color and the trailing indicator (DONE / ERROR / `%`).
   */
  @property({ type: String })
  status: "in-progress" | "error" | "success" = "in-progress";

  /**
   * Trailing indicator style — `text` (default, shows `%` / `DONE` / `ERROR`) or `icon` (check-circle / x-circle for success/error states).
   */
  @property({ type: String })
  styleOfProgress: "text" | "icon" = "text";

  /**
   * Label text shown next to the bar. Defaults to `"Loading Data..."` — override with a localized string for production UI.
   */
  @property({ type: String })
  label: string = "Loading Data...";

  render() {
    if (this.hidden) {
      return nothing;
    }

    const progressWidth = this.value <= 1 ? '2' : `${this.value}`;

    let fillClass = "";

    if (this.themeColor) {
      fillClass = this.themeColor;
    }

    switch (this.status) {
      case "success":
        if (this.value === 100) {
          fillClass = "success";
        } else {
          fillClass = "in-progress";
        }
        break;
      case "error":
        fillClass = "error";
        break;
      default:
        fillClass = "in-progress";
        break;
    }

    const additionalStyles = this.theme ? `
      --font-size: ${parseVariables(cssVar("font-size", this.size))};
      --line-height: ${parseVariables(cssVar("line-height", this.size))};
      --height: ${parseVariables(cssVar("height", this.size))};
      --progress-bar-fill-color: ${parseVariables(cssVar("colors", this.themeColor, 500), "#2196f3")};
      --progress-bar-fill-success-color: ${parseVariables(cssVar("colors", "success"), "#059669")};
      --progress-bar-fill-error-color: ${parseVariables(cssVar("colors", "error"), "#E11D48")};
      --progress-bar-background-color: ${parseVariables(cssVar("colors", "background"), "#e5e7eb")};
      --color: ${parseVariables(cssVar("colors", this.color, 600),this.color)};
    ` : '';

    return html`
    ${parseThemeToCssVariables(this.theme?.components?.progressBar, ":host")}

      <div class="progress-container ${this.labelPosition}" style="${additionalStyles}">
        ${this.labelPosition === "top" ? this.renderLabel() : ""}
        <div class="progress-bar">
          <div class="progress-bar__fill ${fillClass}" style="
          width: ${progressWidth}%;
          "></div>
        </div>
        ${this.labelPosition === "right" || this.labelPosition === "bottom" ? this.renderLabel() : ""}
      </div>
    `;
  }

  renderLabel() {
    let percentageStyle = "";

    switch (true) {
      case this.status === "error":
        percentageStyle = "color: var(--fg-danger-primary, #E11D48);";
        break;

      case this.status === "success" && this.value === 100:
      case this.value === 100:
        percentageStyle = "color: var(--text-primary, #1F2937);";
        break;

      default:
        percentageStyle = "";
        break;
    }

    return html`
      <div class="text">
        <div class="label">
            ${this.label}
        </div>
        <div class="percentage" style="${percentageStyle}">
        ${this.value === 100 && this.status === "success"
        ? (this.styleOfProgress === "icon"
          ? html`<ssk-icon name="solid-check-circle" color="#059669"></ssk-icon>`
          : "DONE")
        : this.status === "error"
          ? (this.styleOfProgress === "icon"
            ? html`<ssk-icon name="solid-x-circle" style="color: var(--fg-danger-primary, #E11D48)"></ssk-icon>`
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
      font-family: var(--font-p);
      font-size: var(--font-size, 24px);
      font-weight: var(--font-weight-normal, 400);
      line-height: var(--line-height, 24px);
      text-align: left;
      color: var(--text-secondary, #6B7280);
    }
    
    .label {
      white-space: nowrap;
      color: var(--color);
    }

    .percentage {
      display: flex;
    }

    .progress-container .text {
      display: flex;
      justify-content: space-between;
    }

    progress-container.top,
    progress-container.bottom
    {
      width: var(--width, 370px);
    }

    .progress-container.top .text,
    .progress-container.bottom .text {
      width: var(--width, 370px);
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

    // .progress-bar {
    //   width: var(--width, 370px);
    //   background-color: #e5e7eb;
    //   border-radius: var(--radius-xs, 4px);
    //   overflow: hidden;
    //   height: var(--height, 8px);
    // }

    // .progress-bar__fill {
    //   border-radius: var(--radius-md, 8px);
    //   text-align: center;
    //   line-height: 24px;
    //   color: white;
    //   height: 100%;
    //   background-color: var(--colors, #2196f3);
    //   transition: background-color 0.3s ease-in-out, width 0.2s ease-in-out;
    //   }

    // .progress-bar__fill.success {
    //   background-color: var(--colors, #059669);
    // }

    // .progress-bar__fill.error {
    //   background-color: var(--colors, #e11d48);
    // }

    .progress-bar {
      width: var(--width, 370px);
      background-color: var(--progress-bar-background-color, #e5e7eb);
      border-radius: var(--radius-xs, 4px);
      overflow: hidden;
      height: var(--height, 8px);
    }

    .progress-bar__fill {
      border-radius: var(--radius-md, 8px);
      text-align: center;
      line-height: 24px;
      color: white;
      height: 100%;
      background-color: var(--progress-bar-fill-color);
      transition: background-color 0.3s ease-in-out, width 0.2s ease-in-out;
    }

    .progress-bar__fill.success {
      background-color: var(--progress-bar-fill-success-color);
    }

    .progress-bar__fill.error {
      background-color: var(--progress-bar-fill-error-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-progress-bar": ProgressBar;
  }
}

if (!customElements.get("ssk-progress-bar")) {
  customElements.define("ssk-progress-bar", ProgressBar);
}
