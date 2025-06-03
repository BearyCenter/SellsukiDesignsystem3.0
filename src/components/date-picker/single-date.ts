import { consume } from "@lit/context";
import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  ColorName,
  ColorRole,
  cssVar,
  parseVariables,
  Size,
  Theme,
  themeContext,
} from "../../main";
import "../calendar";
import "../../elements/input";
import "../../elements/icon";
import { format, isValid, parse } from "date-fns";
import { convertToAD, convertToBE, getMonthString } from "./util";

type LocaleKey = "en" | "fr" | "th";
@customElement("ssk-date-picker")
export class DatePicker extends LitElement {
  static registeredName = "ssk-date-picker";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  @property({ type: String })
  color?: ColorRole | ColorName;
  @property({ type: String })
  testId?: string;
  @property({ type: String })
  size: Size = "md";

  @property({ type: String })
  label?: string;
  @property({ type: String })
  placeholder?: string;
  @property({ type: String })
  helperText: string | undefined;
  @property({ type: Boolean })
  error = false;
  @property({ type: String })
  name: string | undefined;
  @property({ type: Boolean })
  hidden = false;
  @property({ type: Date })
  value: Date | undefined;
  @property({ type: Boolean })
  rangeDate = false;
  @property({ type: String })
  format = "dd/MM/yyyy";

  @property({ type: Boolean })
  displayGoToday = false;
  @property({ type: Boolean })
  displayOk = false;
  @property({ type: Boolean })
  showTime = false;
  @property({ type: String })
  timeFormat: "hms" | "hm" | "timeEvery30" = "hms";
  @property({ type: String })
  locale: LocaleKey = "th";
  @property({ type: String })
  alignCalendar?: "left" | "right" = "left";
  @property({ type: String })
  widthCalendar?: string | undefined = "fit-content";

  @property({ type: Function })
  disabledDate?: (date: number) => boolean;

  @property({ type: Array })
  disabledYears?: number[];
  @property({ type: Number })
  minYear?: number;
  @property({ type: Number })
  maxYear?: number;

  @state()
  _hideCalendar: boolean = true;
  @state()
  _isClear: boolean = false;
  @state()
  _isFocus: boolean = false;
  @state()
  _cDateFrom: number | undefined;
  @state()
  _cMonth: string | undefined;
  @state()
  _cYear: string | undefined;
  @state()
  _sValue: string | undefined;
  @state()
  _timeFrom: number | undefined;

  private handleIcon() {
    if (this._isClear) {
      this.value = undefined;
      this._sValue = "";
      this._timeFrom = undefined;
      this._hideCalendar = true;
      this._isClear = false;

      this.dispatchEvent(
        new CustomEvent("change", {
          detail: {
            valueFrom: this.value,
          },
        }),
      );
    }
  }

  private validateStringDate(v?: string): boolean {
    if (v) {
      const sDate = parse(v, this.format, new Date());
      if (sDate.getFullYear().toString().length === 4) {
        return isValid(sDate);
      }
    }
    return false;
  }

  private getConvertedYearValue(value: string): string {
    if (this.locale === "th") {
      const yearMatch = value.match(/\b(\d{4})\b/);
      if (yearMatch) {
        const yearInBE = parseInt(yearMatch[0], 10);
        const yearInAD = convertToAD(yearInBE);
        value = value.replace(yearInBE.toString(), yearInAD.toString());
      }
    }
    return value;
  }

  private handleDateParsing(value: string): void {
    let parsedDate: Date;

    if (this.showTime) {
      parsedDate = parse(value, this.format, new Date());
      if (isValid(parsedDate)) {
        this.value = parsedDate;
        this._timeFrom = parsedDate.getTime();
      } else {
        return;
      }
    } else {
      parsedDate = parse(value, this.format, new Date());
      if (isValid(parsedDate)) {
        this.value = parsedDate;
      } else {
        return;
      }
    }

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          valueFrom: this.value,
        },
      }),
    );
  }

  private updateInputValue(_e: Event) {
    const target = _e.target as HTMLSelectElement;
    const value = this.getConvertedYearValue(target.value);
    this._isClear = true;

    if (value.length === this.format.length && this.validateStringDate(value)) {
      this.handleDateParsing(value);
    }
  }

  private updateInputValueChange(_e: Event) {
    const target = _e.target as HTMLSelectElement;
    const value = this.getConvertedYearValue(target.value);
    this._isClear = true;

    if (value.length === this.format.length && this.validateStringDate(value)) {
      this.handleDateParsing(value);
    } else {
      this._sValue = "";
    }
  }

  private handleOnBlur() {
    this._isFocus = false;
  }

  private handleOnFocus() {
    this._isFocus = true;
    this._hideCalendar = false;
  }

  private handleDate(v?: number) {
    if (v) {
      const dateFrom = new Date(v);
      this.value = isValid(dateFrom) ? dateFrom : undefined;
      if (this.value && this.showTime && /HH|mm|ss/.test(this.format)) {
        this._timeFrom = this.value.getTime();
      }

      if (this.displayOk) this._hideCalendar = true;
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { value: this.value },
        }),
      );
    }
  }

  private handleChangedDate(v?: string) {
    if (v) {
      const vDateFrom = parse(v, this.format, new Date());
      const validDate = isValid(vDateFrom);
      if (validDate) {
        const dfTime = vDateFrom.getTime();
        this._cDateFrom = dfTime;
        this._cMonth = getMonthString(vDateFrom);
        this._cYear = vDateFrom.getFullYear().toString();

        if (this.showTime && /HH|mm|ss/.test(this.format)) {
          this._timeFrom = vDateFrom.getTime();
        }
      }
    }
  }

  private handleClickOutside(_e: MouseEvent, targetDiv: HTMLDivElement) {
    if (!_e.composedPath().includes(targetDiv)) {
      this._isClear = false;

      if (!this._isFocus && !this._hideCalendar) {
        this._hideCalendar = true;
      }
    } else {
      if (!this.displayGoToday || !this.displayOk) this._hideCalendar = false;
    }
  }

  firstUpdated() {
    if (!this._cMonth) {
      // set default

      const currentMonth = getMonthString(new Date());
      this._cMonth = currentMonth;
    }

    var popover = this.shadowRoot?.querySelector(
      "div.calendar-container",
    ) as HTMLDivElement;

    document.addEventListener("click", (event) =>
      this.handleClickOutside(event, popover),
    );

    this.updateChangeValue();
  }

  disconnectedCallback() {
    document.removeEventListener("click", () =>
      this.handleClickOutside.bind(this),
    );
  }

  protected updated(): void {
    this.updateChangeValue();
  }

  private updateChangeValue(): void {
    let formattedValue: string | undefined;

    if (this.value) {
      formattedValue = format(this.value, this.format);

      if (this.locale === "th") {
        const year = this.value.getFullYear();
        const beYear = convertToBE(this.value);

        this._sValue = formattedValue.replace(year.toString(), beYear);
      } else {
        this._sValue = formattedValue;
      }
    } else {
      this._sValue = undefined;
    }

    this.handleChangedDate(formattedValue);
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = `
      --rounded: ${parseVariables(cssVar("rounded", this.size))};
      --width-calender:${this.widthCalendar};
    `;

    const footerSlot = this.querySelector('[slot="footer"]');

    return html`
      <style>
        div {
          ${additionalCss}
        }
      </style>

      <div class="date-picker">
        <ssk-input
          .value=${this._sValue}
          label=${this.label}
          helperText=${this.error ? this.helperText : ""}
          .error=${this.error}
          placeholder=${this.placeholder}
          name=${this.name}
          size=${this.size}
          @input=${this.updateInputValue.bind(this)}
          @change=${this.updateInputValueChange.bind(this)}
          @blur=${this.handleOnBlur}
          @focus=${this.handleOnFocus}
          autoComplete="off"
          color=${this.color}
        >
          <ssk-input-addon slot="postfix" @click=${this.handleIcon.bind(this)}>
          <div class="icon-style">
            ${this.error 
              ? html`<ssk-icon name="outline-exclamation-circle" themecolor="error"></ssk-icon>` 
              : nothing}
            ${this._isClear
              ? html`<ssk-icon class="clear" name="outline-x-circle"></ssk-icon>`
              : html`<ssk-icon name="outline-calendar-days"></ssk-icon>`}
          </div>
          </ssk-input-addon>
        </ssk-input>
        <div
          class="calendar-container ${this.alignCalendar === "right"
            ? "right"
            : "left"} ${this._hideCalendar ? "hidden" : ""}"
        >
          <ssk-calendar
            .hidden=${this._hideCalendar}
            .dateFrom=${this._cDateFrom}
            .timeFrom=${this._timeFrom}
            timeFormat=${this.timeFormat}
            size=${this.size}
            month=${this._cMonth}
            year=${this._cYear}
            ?showTime=${this.showTime}
            ?rangeDate=${this.rangeDate}
            ?displayGoToday=${this.displayGoToday}
            ?displayOk=${this.displayOk}
            @date-changed=${(e: any) => this.handleDate(e.detail?.dateFrom)}
            locale=${this.locale}
            themeColor=${this.themeColor}
            .disabledDate=${this.disabledDate}
            .disabledYears=${this.disabledYears}
            .minYear=${this.minYear}
            .maxYear=${this.maxYear}
          >
            ${footerSlot
              ? html`<slot name="footer" slot="footer"></slot>`
              : nothing}
          </ssk-calendar>
        </div>
      </div>
    `;
  }
  static styles = css`
    ssk-icon.clear {
      cursor: pointer;
    }

    .calendar-container {
      position: absolute;
      background-color: white;
      border: 1px solid var(--ssk-colors-gray-200);
      border-radius: var(--rounded);
      z-index: 9;
      width: var(--width-calender);
    }

    .hidden {
      border: 0;
    }

    .calendar-container.left {
      left: 1rem;
    }

    .calendar-container.right {
      right: 1rem;
    }
    .icon-style {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-date-picker": DatePicker;
  }
}
