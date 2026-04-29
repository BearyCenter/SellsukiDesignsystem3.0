import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
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
import "../../elements/button";
import "../../elements/text";
import "../../elements/divider";
import { renderFooter } from "./footer";
import { toZonedTime, formatInTimeZone } from "date-fns-tz";
import { enUS, fr, th } from "date-fns/locale";
import { renderColumn } from "./column";

const timeZones = {
  en: "Europe/London",
  fr: "Europe/Paris",
  th: "Asia/Bangkok",
};

const typeTime = {
  hms: "HH:mm:ss",
  hm: "HH:mm",
  timeEvery30: "HH:mm a",
};

const locales = { en: enUS, fr, th };

type LocaleKey = "en" | "fr" | "th";
type TypeTime = "hms" | "hm" | "timeEvery30";

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
  @property({ type: String })
  locale: LocaleKey = "th";
  @property({ type: String })
  nowText: string = "ตอนนี้";
  @property({ type: String })
  okText: string = "ตกลง";
  @property({ type: String })
  footerStyle: "between" | "middle" | "right" | "left" = "between";
  @property({ type: Boolean })
  displayGoNow = false;
  @property({ type: Boolean })
  displayOk = false;
  @property({ type: Number })
  value?: number;

  @state()
  _selectedHour: number | null = null;

  @state()
  _selectedMinute: number | null = null;

  @state()
  _selectedSecond: number | null = null;

  @property({ type: Boolean })
  hidden = false;

  @property({ type: String })
  maxHeight?: string = "320px";

  @property({ type: String })
  format: TypeTime = "hms";

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has("value") && this.value !== undefined) {
      const date = new Date(this.value);
      const zonedTime = toZonedTime(date, timeZones[this.locale]);
      this._selectedHour = zonedTime.getHours();
      this._selectedMinute = zonedTime.getMinutes();
      this._selectedSecond = zonedTime.getSeconds();
    }
  }

  private handleTimeClick(unit: "hour" | "minute" | "second", value: number) {
    (this as any)[`_selected${unit.charAt(0).toUpperCase() + unit.slice(1)}`] =
      value;

    if (!this.displayOk) {
      this.dispatchTimeChangedEvent();
    }

    this.requestUpdate();
  }

  private handleOk() {
    this.dispatchTimeChangedEvent();
  }

  private dispatchTimeChangedEvent() {
    const { _selectedHour, _selectedMinute, _selectedSecond } = this;
    const unixTimestamp = this.convertToUnixTimestamp({
      hour: _selectedHour ?? 0,
      minute: _selectedMinute ?? 0,
      second: _selectedSecond ?? 0,
    });

    this.dispatchEvent(
      new CustomEvent("time-changed", {
        detail: { value: unixTimestamp },
      }),
    );
  }

  private goToNow() {
    const now = toZonedTime(new Date(), timeZones[this.locale]);
    this._selectedHour = now.getHours();
    this._selectedMinute = now.getMinutes();
    this._selectedSecond = now.getSeconds();
    this.dispatchTimeChangedEvent();
    this.requestUpdate();
  }

  private convertToUnixTimestamp(time: {
    hour: number;
    minute: number;
    second: number;
  }) {
    const now = this.value ? new Date(this.value) : new Date();
    now.setHours(time.hour);
    now.setMinutes(time.minute);
    now.setSeconds(time.second);
    now.setMilliseconds(0);

    const zonedTime = toZonedTime(now, timeZones[this.locale]);

    return zonedTime.getTime();
  }

  private renderTimeEvery30() {
    const intervals = Array.from({ length: 24 * 2 }, (_, i) => {
      const hour = Math.floor(i / 2);
      const minute = (i % 2) * 30;
      const formattedTime = formatInTimeZone(
        new Date().setHours(hour, minute, 0),
        timeZones[this.locale],
        typeTime.timeEvery30,
        { locale: locales[this.locale] },
      );
      return { hour, minute, formattedTime };
    });

    return html`
      ${renderColumn(
        intervals.map(({ hour, minute, formattedTime }) => ({
          label: formattedTime,
          value: hour * 100 + minute,
        })),
        (this._selectedHour ?? 0) * 100 + (this._selectedMinute ?? 0),
        this.size,
        (value: number) => {
          this._selectedHour = Math.floor(value / 100);
          this._selectedMinute = value % 100;
          this.dispatchTimeChangedEvent();
        },
      )}
    `;
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = html`
      <style>
        @import "../../assets/global.css";
        :host {
          --scrollbar-color-track: transparent;
          --scrollbar-color-trumb: white;

          --padding: ${parseVariables(
            cssVar("padding", this.size),
            this.padding,
          )};

          --500-colors: ${parseVariables(
            cssVar("colors", this.themeColor, 600),
          )};

          --max-height: ${parseVariables(cssVar("max-height", this.maxHeight))};
        }

        *:hover::-webkit-scrollbar-thumb {
          background: var(--text-secondary, #6b7280);
          border-radius: var(--radius-md, 8px);
        }
      </style>
    `;

    const hoursOptions = Array.from({ length: 24 }, (_, i) => ({
      label: String(i).padStart(2, "0"),
      value: i,
    }));
    const minutesOptions = Array.from({ length: 60 }, (_, i) => ({
      label: String(i).padStart(2, "0"),
      value: i,
    }));

    const handleHourClick = (value: number) =>
      this.handleTimeClick("hour", value);
    const handleMinuteClick = (value: number) =>
      this.handleTimeClick("minute", value);
    const handleSecondClick = (value: number) =>
      this.handleTimeClick("second", value);

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.time, ":host")}
      ${additionalCss}

      <div class="container">
        <div class="time">
          ${this.format === "timeEvery30"
            ? this.renderTimeEvery30()
            : html`
                ${renderColumn(
                  hoursOptions,
                  this._selectedHour ?? -1,
                  this.size,
                  handleHourClick,
                )}
                <ssk-divider orientation="vertical" size="xs"></ssk-divider>
                ${renderColumn(
                  minutesOptions,
                  this._selectedMinute ?? -1,
                  this.size,
                  handleMinuteClick,
                )}
                ${this.format === "hms"
                  ? html`
                      <ssk-divider
                        orientation="vertical"
                        size="xs"
                      ></ssk-divider>
                      ${renderColumn(
                        Array.from({ length: 60 }, (_, i) => ({
                          label: String(i).padStart(2, "0"),
                          value: i,
                        })),
                        this._selectedSecond ?? -1,
                        this.size,
                        handleSecondClick,
                      )}
                    `
                  : nothing}
              `}
        </div>
        ${renderFooter(
          this.footerStyle,
          this.displayGoNow,
          this.displayOk,
          this.size,
          this.themeColor,
          this.nowText,
          this.okText,
          this.goToNow.bind(this),
          this.handleOk.bind(this),
        )}
      </div>
    `;
  }

  static styles = css`
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
      max-height: var(--max-height, 320px);
      overflow-y: auto;
      text-align: center;
    }

    .item {
      padding: 5px;
      cursor: pointer;
      list-style: none;
    }

    .item:hover {
      background-color: var(--500-colors);
      border-radius: var(--radius-xs, 4px);
    }

    .item:not(.hovered):hover span {
      color: white;
    }

    .item.selected {
      background-color: var(--500-colors);
      color: white;
      border-radius: var(--radius-xs, 4px);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-time": Time;
  }
}

if (!customElements.get("ssk-time")) {
  customElements.define("ssk-time", Time);
}
