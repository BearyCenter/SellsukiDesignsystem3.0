import { consume } from "@lit/context";
import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
  Size,
  Theme,
  themeContext,
} from "../../main";
import "../calendar";
import "../../elements/input";
import "../../elements/icon";
import {
  addMonths,
  addYears,
  format,
  isValid,
  parse,
  subMonths,
  subYears,
  toDate,
} from "date-fns";
import { getMonthString } from "./util";

@customElement("ssk-range-date-picker")
export class RangeDatePicker extends LitElement {
  static registeredName = "ssk-range-date-picker";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
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
  valueFrom: Date | undefined;
  @property({ type: Date })
  valueTo: Date | undefined;
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

  @state()
  _hideCalendar: boolean = true;
  @state()
  _isClear: boolean = false;
  @state()
  _isFocus: boolean = false;
  @state()
  _cDateFrom: number | undefined;
  @state()
  _cDateTo: number | undefined;
  @state()
  _cMonthFrom: string | undefined;
  @state()
  _cYearFrom: string | undefined;
  @state()
  _cMonthTo: string | undefined;
  @state()
  _cYearTo: string | undefined;
  @state()
  _sValueFrom: string | undefined;
  @state()
  _sValueTo: string | undefined;
  @state()
  _cNoNext: boolean = false;
  @state()
  _cNoPrev: boolean = false;
  @state()
  _timeFrom: number | undefined;
  @state()
  _timeTo: number | undefined;
  @state()
  _timeTarget: "dateFrom" | "dateTo" = "dateFrom";

  private handleIcon() {
    const hasValue = this.valueFrom || this.valueTo;
    if (hasValue && this._isClear) {
      this.valueFrom = undefined;
      this.valueTo = undefined;

      this._sValueFrom = undefined;
      this._sValueTo = undefined;
      this._isClear = false;
      this._hideCalendar = true;
      this.error = false;
      this._timeFrom = undefined;
      this._timeTo = undefined;
      this._timeTarget = "dateFrom";
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

  private async updateValueFrom({ detail }: any) {
    const value = detail.originalEvent.target.value;
    this._isClear = true;

    if (this.validateStringDate(value)) {
      if (this.showTime) {
        const parsedDate = parse(value, this.format, new Date());
        if (isValid(parsedDate)) {
          this.valueFrom = parsedDate;
          this._timeFrom = parsedDate.getTime();
        } else {
          this.error = true;
          return;
        }
      } else {
        this.valueFrom = toDate(format(value, this.format));
      }

      this.dispatchEvent(
        new CustomEvent("change", {
          detail: {
            valueFrom: this.valueFrom,
            valueTo: this.valueTo,
          },
        }),
      );
      this.error = false;
      return;
    }
    this.error = true;
  }

  private async updateValueTo({ detail }: any) {
    const value = detail.originalEvent.target.value;
    this._isClear = true;

    if (this.validateStringDate(value)) {
      if (this.showTime) {
        const parsedDate = parse(value, this.format, new Date());
        if (isValid(parsedDate)) {
          this.valueTo = parsedDate;
          this._timeTo = parsedDate.getTime();
        } else {
          this.error = true;
          return;
        }
      } else {
        this.valueTo = toDate(format(value, this.format));
      }

      this.dispatchEvent(
        new CustomEvent("change", {
          detail: {
            valueTo: this.valueTo,
            valueFrom: this.valueFrom,
          },
        }),
      );
      this.error = false;
      return;
    }
    this.error = true;
  }

  private handleClickFrom() {
    this._timeTarget = "dateFrom";
  }

  private handleClickTo() {
    this._timeTarget = "dateTo";
  }

  private handleOnBlur() {
    this._isFocus = false;
  }

  private handleOnFocus() {
    this._isFocus = true;
    this._hideCalendar = false;
  }

  private handleDateFrom({ detail }: any) {
    const dateFrom = new Date(detail.value);
    this.valueFrom = isValid(dateFrom) ? dateFrom : undefined;

    if (this.valueFrom && getMonthString(this.valueFrom) === this._cMonthTo) {
      const nextMonth = parse(this._cMonthTo, "MM", new Date());
      // handle month
      this._cMonthFrom = getMonthString(this.valueFrom);
      this._cMonthTo = format(addMonths(nextMonth, 1), "MM");
    }

    if (this.valueFrom && this.showTime && /HH|mm|ss/.test(this.format)) {
      this._timeFrom = this.valueFrom.getTime();
      this._timeTarget = "dateFrom";
    }
  }

  private handleDateTo({ detail }: any) {
    const dateTo = new Date(detail.value);
    this.valueTo = isValid(dateTo) ? dateTo : undefined;
    if (this.valueTo && this.showTime && /HH|mm|ss/.test(this.format)) {
      this._timeTo = this.valueTo.getTime();
      this._timeTarget = "dateTo";
    }
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { valueTo: this.valueTo, valueFrom: this.valueFrom },
      }),
    );
  }

  private handleChangedDateFrom(v?: string) {
    if (v) {
      const vDateFrom = parse(v, this.format, new Date());
      const validDate = isValid(vDateFrom);
      if (validDate) {
        const dfTime = vDateFrom.getTime();
        this._cDateFrom = dfTime;
        this._cMonthFrom = getMonthString(vDateFrom);
        this._cYearFrom = vDateFrom.getFullYear().toString();

        if (this.showTime && /HH|mm|ss/.test(this.format)) {
          this._timeFrom = vDateFrom.getTime();
        }
      }
    }
  }

  private handleChangedDateTo(v?: string) {
    if (v) {
      const vDateTo = parse(v, this.format, new Date());
      const validDate = isValid(vDateTo);
      if (validDate) {
        const dfTime = vDateTo.getTime();
        this._cDateTo = dfTime;
        this._cMonthTo = getMonthString(vDateTo);
        this._cYearTo = vDateTo.getFullYear().toString();

        if (this.showTime && /HH|mm|ss/.test(this.format)) {
          this._timeTo = vDateTo.getTime();
        }
      }
    }
  }

  handlePrevMonth({ detail }: any) {
    const month = parse(detail.value, "MM", new Date());
    const monthPlusDate = addMonths(month, 1);

    this._cMonthFrom = detail.value;
    this._cMonthTo = format(monthPlusDate, "MM");

    if (this._cMonthFrom === "11") {
      this._cYearTo = this._cYearFrom;
    }
  }

  handleNextMonth({ detail }: any) {
    const month = parse(detail.value, "MM", new Date());
    const monthMinusDate = subMonths(month, 1);

    this._cMonthFrom = format(monthMinusDate, "MM");
    this._cMonthTo = detail.value;

    if (this._cMonthTo === "02") {
      this._cYearFrom = this._cYearTo;
    }
  }

  setYearFrom({ detail }: any) {
    const value = detail.value;

    if (this._cYearFrom !== this._cYearTo) {
      const year = parse(value, "yyyy", new Date());
      const yearPlus = addYears(year, 1);
      this._cYearTo = format(yearPlus, "yyyy");
    }
    this._cYearFrom = value;
  }

  setYearTo({ detail }: any) {
    const value = detail.value;

    if (this._cYearFrom !== this._cYearTo) {
      const year = parse(value, "yyyy", new Date());
      const yearMinus = subYears(year, 1);
      this._cYearFrom = format(yearMinus, "yyyy");
    }

    this._cYearTo = value;
  }

  private handleClickOutside(_e: MouseEvent, targetDiv: HTMLDivElement) {
    if (!_e.composedPath().includes(targetDiv)) {
      this._isClear = false;

      const hasValue = this.valueFrom && this.valueTo;
      if (hasValue && !this._isFocus && !this._hideCalendar) {
        this._hideCalendar = true;
      }
    } else {
      this._hideCalendar = false;
    }
  }

  protected firstUpdated() {
    var popover = this.shadowRoot?.querySelector(
      "div.calendar-container",
    ) as HTMLDivElement;

    document.addEventListener("click", (event) =>
      this.handleClickOutside(event, popover),
    );

    this._sValueFrom = this.valueFrom
      ? format(this.valueFrom, this.format)
      : undefined;
    this._sValueTo = this.valueTo
      ? format(this.valueTo, this.format)
      : undefined;

    this.handleChangedDateFrom(this._sValueFrom);
    this.handleChangedDateTo(this._sValueTo);
  }

  disconnectedCallback() {
    document.removeEventListener("click", () =>
      this.handleClickOutside.bind(this),
    );
  }

  protected updated(properties: PropertyValues): void {
    // handle month and year change
    if (properties.has("_cMonthFrom") && properties.has("_cMonthTo")) return;
    if (properties.has("_cYearFrom") && properties.has("_cYearTo")) return;
    if (properties.has("_cYearFrom") || properties.has("_cYearTo")) {
      if (properties.has("_cYearFrom")) {
        this._cYearTo = this._cYearFrom;
      }
      if (properties.has("_cYearTo")) {
        this._cYearFrom = this._cYearTo;
      }
      return;
    }

    const monthFromEqualMonthTo =
      (this.valueFrom && getMonthString(this.valueFrom)) ===
      (this.valueTo && getMonthString(this.valueTo));

    this._sValueFrom = this.valueFrom
      ? format(this.valueFrom, this.format)
      : undefined;
    this._sValueTo = this.valueTo
      ? format(this.valueTo, this.format)
      : undefined;

    this.handleChangedDateFrom(this._sValueFrom);
    if (monthFromEqualMonthTo) return;

    this.handleChangedDateTo(this._sValueTo);
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = `
        --rounded: ${parseVariables(cssVar("rounded", this.size))};
    `;

    const footerSlot = this.querySelector('[slot="footer"]');

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.calendar, "div")}

      <style>
        div {
          ${additionalCss}
        }
      </style>

      <div class="date-picker">
        <ssk-input-range
          .valueFrom=${this._sValueFrom}
          .valueTo=${this._sValueTo}
          label=${this.label}
          helperText=${this.error ? this.helperText : ""}
          .error=${this.error}
          placeholder=${this.placeholder}
          name=${this.name}
          size=${this.size}
          @value-from-change=${this.updateValueFrom.bind(this)}
          @value-to-change=${this.updateValueTo.bind(this)}
          @input-from-click="${this.handleClickFrom.bind(this)}"
          @input-to-click="${this.handleClickTo.bind(this)}"
          @blur=${this.handleOnBlur.bind(this)}
          @focus=${this.handleOnFocus.bind(this)}
          autoComplete="off"
        >
          <ssk-input-addon slot="center">
            <ssk-icon name="solid-arrow-long-right"></ssk-icon>
          </ssk-input-addon>
          <ssk-input-addon slot="postfix" @click=${this.handleIcon.bind(this)}>
            ${this._isClear
              ? html`<ssk-icon
                  class="clear"
                  name="outline-x-circle"
                ></ssk-icon>`
              : html`<ssk-icon name="outline-calendar-days"></ssk-icon> `}
          </ssk-input-addon>
        </ssk-input-range>
        <div class="calendar-container">
          ${this.showTime
            ? html`<ssk-calendar
                .hidden=${this._hideCalendar}
                .dateFrom=${this.valueFrom?.getTime()}
                .dateTo=${this.valueTo?.getTime()}
                .timeFrom=${this._timeFrom}
                .timeTo=${this._timeTo}
                size=${this.size}
                month=${this._cMonthFrom}
                year=${this._cYearFrom}
                timeFormat=${this.timeFormat}
                currentTimeTarget=${this._timeTarget}
                showTime
                rangeDate
                ?displayGoToday=${this.displayGoToday}
                ?displayOk=${this.displayOk}
                @date-from-changed=${this.handleDateFrom.bind(this)}
                @date-to-changed=${this.handleDateTo.bind(this)}
              >
                >
                ${footerSlot
                  ? html`<slot name="footer" slot="footer"></slot>`
                  : nothing}
              </ssk-calendar>`
            : html` <ssk-calendar
                  .hidden=${this._hideCalendar}
                  .dateFrom=${this.valueFrom?.getTime()}
                  .dateTo=${this.valueTo?.getTime()}
                  size=${this.size}
                  month=${this._cMonthFrom}
                  year=${this._cYearFrom}
                  rangeDate
                  disabledNext
                  ?displayGoToday=${this.displayGoToday}
                  ?displayOk=${this.displayOk}
                  @date-from-changed=${this.handleDateFrom.bind(this)}
                  @date-to-changed=${this.handleDateTo.bind(this)}
                  @prev-month="${this.handlePrevMonth.bind(this)}"
                  @prev-year="${this.setYearFrom.bind(this)}"
                >
                  >
                  ${footerSlot
                    ? html`<slot name="footer" slot="footer"></slot>`
                    : nothing}
                </ssk-calendar>
                <ssk-calendar
                  .hidden=${this._hideCalendar}
                  .dateFrom=${this.valueFrom?.getTime()}
                  .dateTo=${this.valueTo?.getTime()}
                  size=${this.size}
                  month=${this._cMonthTo}
                  year=${this._cYearTo}
                  rangeDate
                  disabledPrev
                  ?displayGoToday=${this.displayGoToday}
                  ?displayOk=${this.displayOk}
                  @date-from-changed=${this.handleDateFrom.bind(this)}
                  @date-to-changed=${this.handleDateTo.bind(this)}
                  @next-month="${this.handleNextMonth.bind(this)}"
                  @next-year="${this.setYearTo.bind(this)}"
                >
                  >
                  ${footerSlot
                    ? html`<slot name="footer" slot="footer"></slot>`
                    : nothing}
                </ssk-calendar>`}
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
      display: flex;
      background-color: white;
      border: 1px solid var(--ssk-colors-gray-200);
      border-radius: var(--rounded);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-range-date-picker": RangeDatePicker;
  }
}
