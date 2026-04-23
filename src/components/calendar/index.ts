import { LitElement, html, css, nothing, PropertyValues } from "lit";
import {
  format,
  startOfDay,
  parse,
  addDays,
  endOfMonth,
  getDay,
  getMonth,
  getYear,
  addMonths,
  addYears,
  subMonths,
  subYears,
  subDays,
  Day,
} from "date-fns";
import { enUS, fr, th } from "date-fns/locale";
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
import "./cell";
import "../../elements/text";
import "../../elements/icon";
import "../../elements/button";
import "../../elements/divider";
import { renderFooter } from "./footer";
import "../time";

const locales = { en: enUS, fr, th };

type LocaleKey = "en" | "fr" | "th";
type typeDay = {
  isCurrentMonth?: boolean;
  hover: boolean;
  title: number;
  date: number;
};

export class Calendar extends LitElement {
  static registeredName = "ssk-calendar";

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

  // Calendar props
  @property({ type: String })
  month: string = "";
  @property({ type: String })
  year: string = "";
  @property({ type: String })
  locale: LocaleKey = "th";
  @property({ type: String })
  todayText: string = "ตอนนี้";
  @property({ type: String })
  okText: string = "ตกลง";
  @property({ type: String })
  footerStyle: "between" | "middle" | "right" = "between";

  @property({ type: Boolean })
  rangeDate = false;
  @property({ type: Boolean })
  disableYearChange = false;
  @property({ type: Boolean })
  disableMonthChange = false;
  @property({ type: Boolean })
  displayGoToday = false;
  @property({ type: Boolean })
  displayOk = false;
  @property({ type: Boolean })
  disabledPrev = false;
  @property({ type: Boolean })
  disabledNext = false;

  @property({ type: Number })
  dateTo?: number;
  @property({ type: Number })
  dateFrom?: number;
  @property({ type: Number })
  hoveredDate?: number;
  @property({ type: Number })
  maxRange = 0;

  @property({ type: Function })
  disabledDate?: (date: number) => boolean;

  @property({ type: Array })
  dayNamesOfTheWeek: Array<string> = [];
  @property({ type: Array })
  yearsList: Array<number> = [];
  @property({ type: Array })
  daysOfMonth: Array<Array<number | typeDay>> = [];
  @property({ type: Array })
  monthsList: Array<string> = [];
  @property({ type: Boolean })
  hidden = false;
  @property({ type: Boolean })
  showTime = false;
  @property({ type: Number })
  timeFrom?: number;
  @property({ type: Number })
  timeTo?: number;

  @property({ type: String })
  timeFormat: "hms" | "hm" | "timeEvery30" = "hms";
  @property()
  currentTimeTarget: "dateFrom" | "dateTo" = "dateFrom";

  @property({ type: Array })
  disabledYears?: number[] | number | undefined;
  @property({ type: Number })
  minYear?: number;
  @property({ type: Number })
  maxYear?: number;

  @state()
  _currentDate: Date = startOfDay(Date.now());
  @state()
  _monthChangeDropdown: Boolean = false;
  @state()
  _yearChangeDropdown: Boolean = false;
  @state()
  _yearIndex: number = 0;
  @state()
  _chunkYearList: number[][] = [];
  @state()
  _selectedFrom: number | undefined = this.dateFrom;
  @state()
  _selectedTo: number | undefined = this.dateTo;

  updated(properties: PropertyValues) {
    if (properties.has("locale")) {
      this.localeChanged();
    }
    if (properties.has("year") || properties.has("month")) {
      this.yearAndMonthChanged(this.year, this.month);
    }
  }

  async firstUpdated() {
    document.addEventListener("click", this.handleClickOutside.bind(this));

    this.setYears(1930, 2100);
    this.setMonths();
    await this.updateComplete;

    if (this.dateFrom !== undefined) {
      this._selectedFrom = this.dateFrom;
    }
    if (this.dateTo !== undefined) {
      this._selectedTo = this.dateTo;
    }

    if (!this.disableYearChange) {
      this._chunkYearList = this.chunkedYearsList(this.yearsList);
      this._yearIndex = this.calcCurrentYearIndex(
        +this.year,
        this._chunkYearList,
      );
    }
  }

  disconnectedCallback() {
    document.removeEventListener("click", this.handleClickOutside.bind(this));
  }

  private handleClickOutside(_e: MouseEvent) {
    var popoverMonth = this.shadowRoot?.querySelector(
      "div.popup-change.month",
    ) as HTMLDivElement;

    var popoverYear = this.shadowRoot?.querySelector(
      "div.popup-change.year",
    ) as HTMLDivElement;

    var dropdown = this.shadowRoot?.querySelector(
      "div.dropdown",
    ) as HTMLDivElement;

    if (
      !_e.composedPath().includes(popoverMonth) &&
      !_e.composedPath().includes(popoverYear)
    ) {
      const popupIsOpen = this._monthChangeDropdown || this._yearChangeDropdown;
      if (popupIsOpen) {
        this._monthChangeDropdown = false;
        this._yearChangeDropdown = false;
      }
    }

    if (_e.composedPath().includes(dropdown)) {
      this._yearChangeDropdown = true;
    }
  }

  private isCurrentDate(dayOfMonth: typeDay) {
    const dayDate = dayOfMonth.date;
    return dayDate === this._currentDate.getTime();
  }
  private isMonthDisabled(month: string): boolean {
    const year = parseInt(this.year, 10);
    const dateToCheck = new Date(year, parseInt(month) - 1, 1);
    return this.checkDisabled(dateToCheck.getTime());
  }

  private isCurrentMonth(month: string): boolean {
    const currentMonth = (getMonth(this._currentDate) + 1)
      .toString()
      .padStart(2, "0");
    return month === currentMonth;
  }

  private isCurrentYear(year: number): boolean {
    const currentYear = getYear(this._currentDate);
    return year === currentYear;
  }

  private localeChanged() {
    if (locales[this.locale]) {
      const dayNamesOfTheWeek = [];
      let i = 0;
      for (i; i < 7; i += 1) {
        const dayAsDay: Day = i as Day;
        dayNamesOfTheWeek.push(
          locales[this.locale].localize.day(dayAsDay, { width: "short" }),
        );
      }

      const firstDayOfWeek = locales[this.locale].options?.weekStartsOn ?? 0;
      const tmp = dayNamesOfTheWeek.slice().splice(0, firstDayOfWeek);
      const newDayNamesOfTheWeek = dayNamesOfTheWeek
        .slice()
        .splice(firstDayOfWeek, dayNamesOfTheWeek.length)
        .concat(tmp);
      this.dayNamesOfTheWeek = newDayNamesOfTheWeek;
    }
  }

  private yearAndMonthChanged(year: string, month: string) {
    let monthMinus = month;
    monthMinus = monthMinus.substring(monthMinus.length - 2);
    let startDateString = `01/${monthMinus}/${year}`;
    let startDateFn = parse(startDateString, "dd/MM/yyyy", new Date());
    const endDateFn = endOfMonth(startDateFn);
    const endDateString = format(endDateFn, "dd/MM/yyyy");

    const firstDayOfWeek = locales[this.locale].options?.weekStartsOn ?? 0;

    const rows = [];
    let columns = [];

    const lastDayOfWeek = 6;

    while (startDateString !== endDateString) {
      let dayNumberFn = getDay(startDateFn) - firstDayOfWeek;
      if (dayNumberFn < 0) {
        dayNumberFn = 6;
      }

      const columnFn: typeDay = {
        hover: false,
        isCurrentMonth: true,
        date: startDateFn.getTime(),
        title: startDateFn.getDate(),
      };
      columns.push(columnFn);

      if (dayNumberFn === lastDayOfWeek) {
        for (let i = columns.length; i < lastDayOfWeek + 1; i += 1) {
          const firstDateOfMonth = (columns[0] as typeDay).title
            .toString()
            .padStart(2, "0");
          const firstDateString = `${
            monthMinus + "/" + firstDateOfMonth + "/" + year
          }`;
          const firstDateSub = subDays(firstDateString, 1);

          const prevDate: typeDay = {
            hover: false,
            isCurrentMonth: false,
            date: firstDateSub.getTime(),
            title: firstDateSub.getDate(),
          };
          columns.unshift(prevDate);
        }
        rows.push(columns.slice());
        columns = [];
      }

      startDateFn = addDays(startDateFn, 1);
      startDateString = format(startDateFn, "dd/MM/yyyy");

      if (startDateString === endDateString) {
        const endColumnFn: typeDay = {
          hover: false,
          isCurrentMonth: true,
          date: startDateFn.getTime(),
          title: startDateFn.getDate(),
        };
        columns.push(endColumnFn);
        for (let i = columns.length; i <= lastDayOfWeek; i += 1) {
          const lastDateOfMonth = (columns[columns.length - 1] as typeDay)
            .title;
          const lastDateString = `${
            monthMinus + "/" + lastDateOfMonth + "/" + year
          }`;
          const lastDatePlus = addDays(lastDateString, 1);
          const nextDate: typeDay = {
            hover: false,
            isCurrentMonth: false,
            date: lastDatePlus.getTime(),
            title: lastDatePlus.getDate(),
          };

          columns.push(nextDate);
        }
        rows.push(columns.slice());
        columns = [];
      }
    }
    this.daysOfMonth = rows;
  }

  private computeMonthName(month: string, mFormat: string) {
    if (month) {
      const dateFn = parse(`${month}`, "MM", new Date());
      return format(dateFn, mFormat, { locale: locales[this.locale] });
    }
    return "";
  }

  private computeYearName(year: string, yFormat: string) {
    if (year) {
      let dateFn = parse(`${year}`, "yyyy", new Date());
      if (this.locale === "th") {
        dateFn = new Date(dateFn.setFullYear(dateFn.getFullYear() + 543));
      }

      return format(dateFn, yFormat, { locale: locales[this.locale] });
    }
    return "";
  }

  private updateDateWithTime(
    date: number | undefined,
    time: number | undefined,
  ): number | undefined {
    if (date === undefined || time === undefined) {
      return date;
    }

    const updatedDate = new Date(date);
    const timeDate = new Date(time);
    updatedDate.setHours(timeDate.getHours());
    updatedDate.setMinutes(timeDate.getMinutes());
    updatedDate.setSeconds(timeDate.getSeconds());

    return updatedDate.getTime();
  }

  private dispatchDateEvents() {
    if (this.displayOk) return;

    this.dispatchEvent(
      new CustomEvent("date-changed", {
        detail: {
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
        },
      }),
    );
  }

  private handleDateSelected({ detail }: any) {
    const { date } = detail;
    if (this.rangeDate) {
      if (this.dateFrom && this.dateTo) {
        this.dateFrom = date;
        this.dateTo = undefined;
        this._selectedFrom = date;
        this._selectedTo = undefined;
        this.hoveredDate = undefined;
        this.timeFrom = date;
        this.timeTo = undefined;
        this.currentTimeTarget = "dateFrom";
        this.dispatchEvent(
          new CustomEvent("hovered-date-changed", {
            detail: { value: this.hoveredDate },
          }),
        );
      } else if (!this.dateFrom || (this.dateFrom && date < this.dateFrom)) {
        this.dateFrom = date;
        this._selectedFrom = date;
      } else if (!this.dateTo || (this.dateTo && date > this.dateTo)) {
        this.dateTo = date;
        this._selectedTo = date;
        this.timeTo = date;
        this.currentTimeTarget = "dateTo";
      }
    } else {
      this.dateFrom = date;
      this._selectedFrom = date;
    }

    this.dateFrom = this.updateDateWithTime(this.dateFrom, this.timeFrom);
    this.dateTo = this.updateDateWithTime(this.dateTo, this.timeTo);

    this.dispatchDateEvents();
  }

  private handleTimeUpdate(event: { detail: { value: number } }) {
    const updatedTime = event.detail.value;

    if (this.currentTimeTarget === "dateFrom") {
      this.timeFrom = updatedTime;
      this.dateFrom = this.updateDateWithTime(this.dateFrom, updatedTime);
    } else if (this.currentTimeTarget === "dateTo") {
      this.timeTo = updatedTime;
      this.dateTo = this.updateDateWithTime(this.dateTo, updatedTime);
    }

    this.dispatchEvent(
      new CustomEvent("time-updated", {
        detail: {
          timeFrom: this.timeFrom,
          timeTo: this.timeTo,
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
        },
      }),
    );
    this.dispatchDateEvents();
  }

  private toggleMonthChangeDropdown() {
    this._monthChangeDropdown = !this._monthChangeDropdown;
    if (this._yearChangeDropdown) this._yearChangeDropdown = false;
  }

  private toggleYearChangeDropdown() {
    this._yearChangeDropdown = !this._yearChangeDropdown;
    if (this._monthChangeDropdown) this._monthChangeDropdown = false;
  }

  private handleNextMonth() {
    const month = parse(this.month, "MM", new Date());
    const monthPlusDate = addMonths(month, 1);
    this.month = format(monthPlusDate, "MM");

    if (this.month === "01") {
      const year = parse(this.year, "yyyy", new Date());
      const yearPlusDate = addYears(year, 1);
      const yearPlusString = format(yearPlusDate, "yyyy", {
        locale: locales[this.locale],
      });
      this.year = yearPlusString;
      this.dispatchEvent(
        new CustomEvent("next-year", { detail: { value: this.year } }),
      );
    }
    this.dispatchEvent(
      new CustomEvent("next-month", { detail: { value: this.month } }),
    );
  }

  private handlePrevMonth() {
    const month = parse(this.month, "MM", new Date());
    const monthMinusDate = subMonths(month, 1);
    this.month = format(monthMinusDate, "MM");

    if (this.month === "12") {
      const year = parse(this.year, "yyyy", new Date());
      const yearMinusDate = subYears(year, 1);
      const yearMinusString = format(yearMinusDate, "yyyy", {
        locale: locales[this.locale],
      });
      this.year = yearMinusString;
      this.dispatchEvent(
        new CustomEvent("prev-year", { detail: { value: this.year } }),
      );
    }
    this.dispatchEvent(
      new CustomEvent("prev-month", { detail: { value: this.month } }),
    );
  }

  private handlePrevYear() {
    const year = parse(this.year, "yyyy", new Date());
    const yearMinusMonth = subYears(year, 1);
    const yearMinusString = format(yearMinusMonth, "yyyy", {
      locale: locales[this.locale],
    });

    this.year = yearMinusString;
    this.dispatchEvent(
      new CustomEvent("prev-year", { detail: { value: this.year } }),
    );
  }

  private handleNextYear() {
    const year = parse(this.year, "yyyy", new Date());
    const yearPlusMonth = addYears(year, 1);
    const yearPlusString = format(yearPlusMonth, "yyyy", {
      locale: locales[this.locale],
    });

    this.year = yearPlusString;
    this.dispatchEvent(
      new CustomEvent("next-year", { detail: { value: this.year } }),
    );
  }

  private handlePrevScopeYearIndex() {
    if (this._yearIndex > 0) this._yearIndex = this._yearIndex - 1;
  }

  private handleNextScopeYearIndex() {
    if (this._yearIndex < this._chunkYearList.length - 1)
      this._yearIndex = this._yearIndex + 1;
  }

  private setYears(from: number, to: number) {
    if (this.yearsList.length === 0) {
      const yearsList = [];
      for (let i = from; i <= to; i += 1) {
        yearsList.push(i);
      }
      this.yearsList = yearsList;
      if (!this.year) {
        this.year = getYear(new Date()).toString();
      }
      return;
    }

    if (!this.year) {
      this.year = this.yearsList[0].toString();
    }
  }

  private setMonths() {
    if (this.monthsList.length === 0) {
      this.monthsList = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];
    }

    if (!this.month) {
      this.month = this.monthsList[0];
    }
  }

  private handleYearChanged(y: number) {
    this.year = `${y}`;
    this.toggleYearChangeDropdown();
  }

  private handleMonthChanged(m: string) {
    this.month = m;
    this.toggleMonthChangeDropdown();
  }

  private goToday() {
    this.month = `${getMonth(new Date()) + 1}`.padStart(2, "0").slice(-2);
    this.year = getYear(new Date()).toString();
  }

  private handleOk() {
    if (this.showTime !== undefined) {
      this._selectedFrom = this.updateDateWithTime(
        this._selectedFrom,
        this.timeFrom,
      );
      this._selectedTo = this.updateDateWithTime(this._selectedTo, this.timeTo);
    }

    this.dispatchEvent(
      new CustomEvent("date-changed", {
        detail: {
          dateFrom: this._selectedFrom,
          dateTo: this._selectedTo,
        },
      }),
    );
  }

  private chunkedYearsList(yList: number[]): number[][] {
    const chunkedArrays = []; // To store the chunked arrays

    let startIndex = 0; // Starting index for each chunk
    while (startIndex < yList.length) {
      const chunk = yList.slice(startIndex, startIndex + 12); // Get the chunk of 12 elements
      chunkedArrays.push(chunk); // Add the chunk to the result array
      startIndex += 12; // Increment the starting index for the next chunk
    }

    return chunkedArrays;
  }

  private checkDisabled(date: number) {
    const dd = this.disabledDate && this.disabledDate(date);
    const year = getYear(date);
    const isYearDisabled = Array.isArray(this.disabledYears)
      ? this.disabledYears.includes(year)
      : this.disabledYears === year;
    const isOutsideRange =
      (this.minYear !== undefined && year < this.minYear) ||
      (this.maxYear !== undefined && year > this.maxYear);

    return dd || isYearDisabled || isOutsideRange;
  }

  private calcCurrentYearIndex(year: number, chunkList: number[][]): number {
    const index = chunkList.findIndex((chunk) => chunk.includes(year));
    return index;
  }

  private calcYearString(yList: number[]): string {
    const firstY = this.computeYearName(yList[0].toString(), "yyyy");
    const lastY = this.computeYearName(
      yList[yList.length - 1].toString(),
      "yyyy",
    );
    return `${firstY} - ${lastY}`;
  }

  render() {
    const footerSlot = this.querySelector('[slot="footer"]');
    let additionalCss = `
    --padding: ${parseVariables(cssVar("padding", this.size), this.padding)};
    --rounded: ${parseVariables(cssVar("rounded", this.size), this.rounded)};

    --500-colors: ${parseVariables(cssVar("colors", this.themeColor, 500))};
    --cell-width: calc(var(--padding) * 2);
    `;

    switch (this.daysOfMonth.length) {
      case 4:
        additionalCss += `--max: 12;`;
        break;

      case 5:
        additionalCss += `--max: 14;`;
        break;

      case 6:
        additionalCss += `--max: 16;`;
        break;
    }

    if (this.hidden) {
      return nothing;
    }

    const renderMonthDropdown = () => html`<div class="dropdown">
      ${this.monthsList.map(
        (m) =>
          html`<div
            class="item 
            ${this.month === m ? "selected" : null} 
            ${this.isCurrentMonth(m) ? "currently" : null}
            ${this.isMonthDisabled(m) ? "disabled" : ""}"
            @click=${() =>
              !this.isMonthDisabled(m) && this.handleMonthChanged(m)}
          >
            <ssk-text size=${this.size}>
              <span>${this.computeMonthName(m, "MMM")}</span>
            </ssk-text>
          </div>`,
      )}
    </div>`;

    const renderYearDropdown = () => {
      const yearScope = this.calcYearString(
        this._chunkYearList[this._yearIndex],
      );

      return html`
        <div class="dropdown">
          <div class="header">
            <ssk-icon
              size="sm"
              class="icon"
              name="outline-chevron-double-left"
              @click="${this.handlePrevScopeYearIndex.bind(this)}"
            ></ssk-icon>

            <ssk-text size=${this.size}>${yearScope}</ssk-text>

            <ssk-icon
              size="sm"
              class="icon"
              name="outline-chevron-double-right"
              @click="${this.handleNextScopeYearIndex.bind(this)}"
            ></ssk-icon>
          </div>
          ${this._chunkYearList[this._yearIndex].map(
            (y) => html`
              <div
                class="item 
                  ${+this.year === y ? "selected" : null}
                  ${this.isCurrentYear(y) ? "currently" : null}
                  ${this.checkDisabled(new Date(y, 0, 1).getTime())
                  ? "disabled"
                  : ""}
                "
                @click=${() =>
                  !this.checkDisabled(new Date(y, 0, 1).getTime()) &&
                  this.handleYearChanged(y)}
              >
                <ssk-text size=${this.size}>
                  <span>${this.computeYearName(y.toString(), "yyyy")}</span>
                </ssk-text>
              </div>
            `,
          )}
        </div>
      `;
    };

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.calendar, "div")}

      <style>
        div {
          ${additionalCss}
        }
      </style>

      <div class="container">
        <div class="main-content">
          <div class="calendar" data-testid=${this.testId || nothing}>
            <div class="monthName layout horizontal center">
              <div class="left-arrow">
                ${!this.disabledPrev && !this.disableYearChange
                  ? html`<ssk-icon
                      size="sm"
                      class="icon"
                      name="outline-chevron-double-left"
                      @click="${this.handlePrevYear.bind(this)}"
                    ></ssk-icon>`
                  : null}
                ${!this.disabledPrev && !this.disableMonthChange
                  ? html`<ssk-icon
                      size="sm"
                      class="icon"
                      name="outline-chevron-left"
                      @click="${this.handlePrevMonth.bind(this)}"
                    ></ssk-icon>`
                  : null}
              </div>
              <div class="title">
                ${!this.disableMonthChange
                  ? html`<div
                      class="popup-change month"
                      @click=${this.toggleMonthChangeDropdown.bind(this)}
                    >
                      <ssk-text size=${this.size}>
                        <span>
                          ${this.computeMonthName(this.month, "MMMM")}
                        </span>
                      </ssk-text>
                    </div> `
                  : html`<ssk-text size=${this.size}>
                      ${this.computeMonthName(this.month, "MMMM")}
                    </ssk-text>`}
                ${!this.disableYearChange
                  ? html`<div
                      class="popup-change year"
                      @click=${this.toggleYearChangeDropdown.bind(this)}
                    >
                      <ssk-text size=${this.size}>
                        <span> ${this.computeYearName(this.year, "yyyy")}</span>
                      </ssk-text>
                    </div> `
                  : html` <ssk-text size=${this.size}>
                      ${this.computeYearName(this.year, "yyyy")}
                    </ssk-text>`}
                ${this._monthChangeDropdown ? renderMonthDropdown() : null}
                ${this._yearChangeDropdown ? renderYearDropdown() : null}
              </div>
              <div class="right-arrow">
                ${!this.disabledNext && !this.disableMonthChange
                  ? html`<ssk-icon
                      size="sm"
                      class="icon"
                      name="outline-chevron-right"
                      @click="${this.handleNextMonth.bind(this)}"
                    ></ssk-icon>`
                  : null}
                ${!this.disabledNext && !this.disableYearChange
                  ? html`<ssk-icon
                      size="sm"
                      class="icon"
                      name="outline-chevron-double-right"
                      @click="${this.handleNextYear.bind(this)}"
                    ></ssk-icon>`
                  : null}
              </div>
            </div>

            <div class="table">
              <div class="thead">
                <div class="tr">
                  ${this.dayNamesOfTheWeek &&
                  this.dayNamesOfTheWeek.map(
                    (dayNameOfWeek) =>
                      html`<div class="th">
                        <ssk-text size=${this.size}>${dayNameOfWeek}</ssk-text>
                      </div>`,
                  )}
                </div>
              </div>
              <div class="tbody">
                ${this.daysOfMonth &&
                this.daysOfMonth.map(
                  (week: any) => html` <div class="tr">
                    ${week &&
                    week.map(
                      (dayOfMonth: typeDay) => html` <div class="td">
                        ${dayOfMonth.isCurrentMonth
                          ? html`
                              <ssk-cell
                                .themeColor=${this.themeColor}
                                .month="${this.month}"
                                .disabled=${this.checkDisabled(dayOfMonth.date)}
                                .hoveredDate="${this.hoveredDate}"
                                .dateTo="${this.dateTo}"
                                .dateFrom="${this.dateFrom}"
                                .day="${dayOfMonth}"
                                .size=${this.size}
                                ?isCurrentDate="${this.isCurrentDate(
                                  dayOfMonth,
                                )}"
                                @date-is-selected="${this.handleDateSelected.bind(
                                  this,
                                )}"
                              ></ssk-cell>
                            `
                          : html`
                              <div class="non-current-month">
                                <ssk-text size=${this.size} color="gray.300"
                                  >${dayOfMonth.title}</ssk-text
                                >
                              </div>
                            `}
                      </div>`,
                    )}
                  </div>`,
                )}
              </div>
            </div>
          </div>

          ${this.showTime
            ? html` <ssk-divider orientation="vertical" size="xs"></ssk-divider>
                <div class="time-container">
                  <ssk-time
                    size=${this.size}
                    locale=${this.locale}
                    format=${this.timeFormat}
                    themeColor=${this.themeColor}
                    .value=${this.currentTimeTarget === "dateFrom"
                      ? this.timeFrom
                      : this.timeTo}
                    @time-changed="${this.handleTimeUpdate.bind(this)}"
                  >
                  </ssk-time>
                </div>`
            : nothing}
        </div>
        ${footerSlot
          ? html`<slot name="footer"></slot>`
          : renderFooter(
              this.footerStyle,
              this.displayGoToday,
              this.displayOk,
              this.month,
              this.year,
              this.size,
              this.themeColor,
              this.todayText,
              this.okText,
              this.goToday,
              this.handleOk,
            )}
      </div>
    `;
  }

  static styles = css`
    .container {
      width: fit-content;
      display: grid;
      grid-template-rows: 1fr auto;
    }

    .main-content {
      display: flex;
    }

    .calendar {
      padding: var(--padding);
    }

    .time-container {
      width: calc(var(--padding) * 10);
    }

    ssk-time {
      --max-height: calc(var(--padding) * var(--max));
    }

    .title {
      position: relative;
      display: flex;
      gap: 0.5rem;
    }

    .icon,
    .title > .popup-change {
      cursor: pointer;
    }

    .popup-change:hover span {
      color: var(--500-colors);
    }

    /* Dropdown year and month */
    .dropdown {
      position: absolute;
      background: var(--bg-primary, #fff);
      border: 1px solid var(--stroke-primary, #e5e7eb);
      border-radius: var(--rounded);
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      padding: calc(var(--padding) - 5%);
      z-index: 3;
    }

    .dropdown > .item {
      cursor: pointer;
      padding: 0.25rem 1rem;
      border-radius: var(--rounded);
    }

    .dropdown > .header {
      grid-column: span 3;
      display: flex;
      justify-content: space-between;
    }

    .dropdown > .item:hover {
      background: var(--500-colors);
    }
    .dropdown > .item:hover span,
    .selected span {
      color: white;
    }

    .left-arrow,
    .right-arrow {
      display: flex;
    }

    .currently {
      position: relative;
      width: auto;
      height: auto;
      border-radius: 50%;
    }

    .currently::after {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 0.25em;
      height: 0.25em;
      bottom: 10%;
      background-color: var(--500-colors);
      border-radius: 50%;
    }

    .selected {
      background-color: var(--500-colors);
    }

    .selected.currently::after {
      background-color: white;
    }

    /* Calendar body */
    .table {
      display: table;
      border-collapse: collapse;
      table-layout: fixed;
      margin-top: 10px;
    }

    .th {
      display: table-cell;
      width: var(--cell-width);
      text-align: center;
    }

    .tr {
      display: table-row;
      height: 2rem;
    }

    .td {
      display: table-cell;
      width: var(--cell-width);
    }

    .non-current-month {
      height: 2.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: not-allowed;
    }

    .monthName {
      text-align: center;
      display: flex;
      justify-content: space-between;
    }

    .monthName::first-letter {
      text-transform: uppercase;
    }

    div.tbody {
      transition: all 0ms;
      transform: translateX(0);
    }
    .disabled {
      cursor: not-allowed;
      pointer-events: none;
    }
    .disabled span {
      color: #b3b3b3;
    }
    .selected.disabled {
      background-color: white;
      color: lightgray;
      cursor: not-allowed;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-calendar": Calendar;
  }
}

if (!customElements.get("ds-calendar")) {
  customElements.define("ds-calendar", Calendar);
}
if (!customElements.get("ssk-calendar")) {
  customElements.define("ssk-calendar", class extends Calendar {});
}
