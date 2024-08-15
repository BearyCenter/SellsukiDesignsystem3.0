// import { LitElement, html, css } from 'lit';
// import { customElement, property } from 'lit/decorators.js';
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ThemeValue } from "../../types/base-attributes";
import { consume } from "@lit/context";
import { Size, Theme, themeContext } from "../../main";
// import { consume } from "@lit/context";
// import "../../../src/elements/badge";
// import { themeContext } from "../../contexts/theme";
// import {
//   ColorName,
//   ColorRole,
//   FontFamilyGroup,
//   FontWeight,
//   Size,
//   Theme,
//   parseThemeToCssVariables,
// } from "../../types/theme";

@customElement("ssk-progress-bar")
export class ProgressBar extends LitElement implements ThemeValue {
  static registeredName = "ssk-progress-bar";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String })
  size: Size = "md";

  @property({ type: Number })
  progress = 60;

  render() {
    console.log("dddddd >>", this.progress);
    return html`
      <div class="progress-bar">
        <div class="progress-bar__fill" style="width: ${this.progress}%;">
          ${this.progress}% Loading data...
        </div>
      </div>
    `;
  }

  static styles = css`
    .progress-bar {
      width: 100%;
      background-color: #f3f3f3;
      border-radius: 4px;
      overflow: hidden;
      height: 24px;
      font-family: Arial, sans-serif;
      font-size: 12px;
      color: #333;
    }

    .progress-bar__fill {
      height: 100%;
      background-color: #2196f3;
      text-align: center;
      line-height: 24px;
      color: white;
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
