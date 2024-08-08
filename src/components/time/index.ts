import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit/context";
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

@customElement("ssk-time")
export class Time extends LitElement {
  static registeredName = "ssk-time";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  // ThemeValue
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  @property({ type: String })
  color?: string = "white";
  @property({ type: String })
  backgroundColor?: string | undefined;

  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  padding?: Size;
  @property({ type: String })
  rounded?: string | undefined;

  // Time props
  @property({ type: Number })
  selectedHour: number = new Date().getHours();

  @property({ type: Number })
  selectedMinute: number = new Date().getMinutes();

  @property({ type: Number })
  selectedSecond: number = new Date().getSeconds();

  @property({ type: Boolean })
  hidden = false;

  private handleHourClick(hour: number) {
    this.selectedHour = hour;
    this.requestUpdate();
  }

  private handleMinuteClick(minute: number) {
    this.selectedMinute = minute;
    this.requestUpdate();
  }

  private handleSecondClick(second: number) {
    this.selectedSecond = second;
    this.requestUpdate();
  }

  private handleConfirm() {
    const selectedTime = {
      hour: this.selectedHour,
      minute: this.selectedMinute,
      second: this.selectedSecond,
    };
    this.dispatchEvent(
      new CustomEvent("time-confirmed", { detail: selectedTime }),
    );
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = `
    --padding: ${parseVariables(cssVar("padding", this.size), this.padding)};
  `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.time, "host")}

      <style>
        div {
          ${additionalCss}
        }
      </style>

      <div class="container">
        <div class="time" data-testid=${this.testId || nothing}>
          <ui class="column">
            ${Array.from({ length: 24 }).map(
              (_, i) => html`
                <li
                  class="item ${this.selectedHour === i ? "selected" : ""}"
                  @click=${() => this.handleHourClick(i)}
                >
                  ${String(i).padStart(2, "0")}
                </li>
              `,
            )}
          </ui>
          <div class="divider"></div>
          <ui class="column">
            ${Array.from({ length: 60 }).map(
              (_, i) => html`
                <li
                  class="item ${this.selectedMinute === i ? "selected" : ""}"
                  @click=${() => this.handleMinuteClick(i)}
                >
                  ${String(i).padStart(2, "0")}
                </li>
              `,
            )}
          </ui>
          <div class="divider"></div>
          <ui class="column">
            ${Array.from({ length: 60 }).map(
              (_, i) => html`
                <li
                  class="item ${this.selectedSecond === i ? "selected" : ""}"
                  @click=${() => this.handleSecondClick(i)}
                >
                  ${String(i).padStart(2, "0")}
                </li>
              `,
            )}
          </ui>
        </div>
        <div class="actions">
          <button class="button secondary" @click=${() => this.handleConfirm()}>
            ตอนนี้
          </button>
          <button class="button primary" @click=${() => this.handleConfirm()}>
            ตกลง
          </button>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      color: var(--text-color, #000);
    }

    .container {
      width: 100%;
    }

    .time {
      display: flex;
      justify-content: space-around;
      padding: var(--padding);
      padding-left: 0.2rem;
      padding-right: 0.2rem;
    }

    .column {
      padding: 0px 0px 0px 5px;
      width: 100%;
      max-height: 320px;
      overflow-y: auto;
      text-align: center;
    }

    .divider {
      border-left: 1px solid var(--ssk-colors-gray-200);
      height: auto;
    }

    .item {
      padding: 5px;
      cursor: pointer;
      list-style: none;
    }

    .item:hover {
      background-color: #e6f7ff;
      color: #1890ff;
      border-radius: 4px;
    }

    .item.selected {
      background-color: #007bff;
      color: #fff;
      border-radius: 4px;
    }

    .actions {
      border-top: 1px solid var(--ssk-colors-gray-200);
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 1rem;
    }

    .button {
      padding: 5px 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .button.primary {
      background-color: #007bff;
      color: #fff;
    }

    .button.secondary {
      background-color: #f1f1f1;
      color: #000;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-time": Time;
  }
}
