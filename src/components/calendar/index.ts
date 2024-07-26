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
import { customElement, property, state } from "lit/decorators.js";
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
import { renderFooter } from "./footer";

const locales = { en: enUS, fr, th };

type LocaleKey = "en" | "fr" | "th";
type typeDay = {
  isCurrentMonth?: boolean;
  hover: boolean;
  title: number;
  date: number;
};

@customElement("ssk-calendar")
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
  month: string = "01";
  @property({ type: String })
  year: string = "1997";
  @property({ type: String })
  locale: LocaleKey = "th";
  @property({ type: String })
  defaultAs = "today";

  @property({ type: Boolean })
  noRange = false;
  @property({ type: Boolean })
  enableYearChange = false;
  @property({ type: Boolean })
  enableMonthChange = false;
  @property({ type: Boolean })
  displayGoToday = false;
  @property({ type: Boolean })
  displayOk = false;

  @property({ type: Number })
  min = 0;
  @property({ type: Number })
  max = 0;
  @property({ type: Number })
  dateTo?: number;
  @property({ type: Number })
  dateFrom?: number;
  @property({ type: Number })
  hoveredDate?: number;
  @property({ type: Number })
  maxRange = 0;

  @property({ type: Array })
  disabledDays?: Array<number>;
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

  @state()
  _currentDate: Number = parseInt(format(startOfDay(Date.now()), "t"), 10);
  @state()
  _monthChangeDropdown: Boolean = false;
  @state()
  _yearChangeDropdown: Boolean = false;
  @state()
  _yearIndex: number = 0;
  @state()
  _chunkYearList: number[][] = [];

  updated(properties: PropertyValues) {
    if (properties.has("locale")) {
      this.localeChanged();
    }
    if (properties.has("enableYearChange")) {
      this.enableYearChangeChanged(this.enableYearChange);
    }
    if (properties.has("year")) {
      this.dispatchEvent(
        new CustomEvent("year-changed", { detail: { value: this.year } }),
      );
    }

    if (properties.has("year") || properties.has("month")) {
      this.yearAndMonthChanged(this.year, this.month);
    }
  }

  async firstUpdated() {
    this.setYears(1930, 2100);
    this.setMonths();
    await this.updateComplete;

    if (this.enableYearChange) {
      this._chunkYearList = this.chunkedYearsList(this.yearsList);
      this._yearIndex = this.calcCurrentYearIndex(
        +this.year,
        this._chunkYearList,
      );
    }
    if (this.enableMonthChange) {
    }
  }

  private isCurrentDate(dayOfMonth: typeDay) {
    const dayDate = dayOfMonth.date;
    return dayDate === this._currentDate;
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
        date: parseInt(format(startDateFn, "t"), 10),
        title: parseInt(format(startDateFn, "d"), 10),
      };
      columns.push(columnFn);

      if (dayNumberFn === lastDayOfWeek) {
        for (let i = columns.length; i < lastDayOfWeek + 1; i += 1) {
          const firstDateOfMonth = (columns[0] as typeDay).title;
          const firstDateString = `${
            monthMinus + "/0" + firstDateOfMonth + "/" + year
          }`;
          const firstDateSub = subDays(firstDateString, 1);
          const prevDate: typeDay = {
            hover: false,
            isCurrentMonth: false,
            date: parseInt(format(firstDateSub, "t"), 10),
            title: parseInt(format(firstDateSub, "d"), 10),
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
          date: parseInt(format(startDateFn, "t"), 10),
          title: parseInt(format(startDateFn, "d"), 10),
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
            date: parseInt(format(lastDatePlus, "t"), 10),
            title: parseInt(format(lastDatePlus, "d"), 10),
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

  private handleDateSelected({ detail }: any) {
    const { date } = detail;
    if (!this.noRange) {
      if (this.dateFrom && this.dateTo) {
        this.dateFrom = date;
        this.dateTo = undefined;
        this.hoveredDate = undefined;
        this.dispatchEvent(
          new CustomEvent("hovered-date-changed", {
            detail: { value: this.hoveredDate },
          }),
        );
      } else if (
        !this.dateFrom ||
        (this.dateFrom && date < this.dateFrom) ||
        (this.maxRange > 0 && date - this.dateFrom > this.maxRange * 24 * 3600)
      ) {
        this.dateFrom = date;
      } else if (!this.dateTo || (this.dateTo && date > this.dateTo)) {
        this.dateTo = date;
      }
    } else {
      this.dateFrom = date;
    }
    this.dispatchEvent(
      new CustomEvent("date-from-changed", {
        detail: { value: this.dateFrom },
      }),
    );
    this.dispatchEvent(
      new CustomEvent("date-to-changed", { detail: { value: this.dateTo } }),
    );
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
    const monthPlusString = format(monthPlusDate, "MM", {
      locale: locales[this.locale],
    });

    this.month = monthPlusString;
    if (this.month === "01") {
      const year = parse(this.year, "yyyy", new Date());
      const yearPlusDate = addYears(year, 1);
      const yearPlusString = format(yearPlusDate, "yyyy", {
        locale: locales[this.locale],
      });
      this.year = yearPlusString;
    }
    this.dispatchEvent(new CustomEvent("next-month"));
  }

  private handlePrevMonth() {
    const month = parse(this.month, "MM", new Date());
    const monthMinusDate = subMonths(month, 1);
    const monthMinusString = format(monthMinusDate, "MM", {
      locale: locales[this.locale],
    });

    this.month = monthMinusString;
    if (this.month === "12") {
      const year = parse(this.year, "yyyy", new Date());
      const yearMinusDate = subYears(year, 1);
      const yearMinusString = format(yearMinusDate, "yyyy", {
        locale: locales[this.locale],
      });
      this.year = yearMinusString;
    }
    this.dispatchEvent(new CustomEvent("prev-month"));
  }

  private handlePrevYear() {
    const year = parse(this.year, "yyyy", new Date());
    const yearMinusMonth = subYears(year, 1);
    const yearMinusString = format(yearMinusMonth, "yyyy", {
      locale: locales[this.locale],
    });

    this.year = yearMinusString;
  }

  private handleNextYear() {
    const year = parse(this.year, "yyyy", new Date());
    const yearPlusMonth = addYears(year, 1);
    const yearPlusString = format(yearPlusMonth, "yyyy", {
      locale: locales[this.locale],
    });

    this.year = yearPlusString;
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

  private enableYearChangeChanged(enableYearChange: boolean) {
    this.enableYearChange = enableYearChange;
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
    this.month = `0${getMonth(new Date()) + 1}`.slice(-2);
    this.year = getYear(new Date()).toString();
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

  private calcCurrentYearIndex(year: number, chunkList: number[][]): number {
    const index = chunkList.findIndex((chunk) => chunk.includes(year));
    return index;
  }

  private calcYearString(yList: number[]): string {
    const firstY = yList[0];
    const lastY = yList[yList.length - 1];
    return `${firstY} - ${lastY}`;
  }

  render() {
    let additionalCss = `
    --padding: ${parseVariables(cssVar("padding", this.size), this.padding)};
    --rounded: ${parseVariables(cssVar("rounded", this.size), this.rounded)};
    --600-colors: ${parseVariables(cssVar("colors", this.themeColor, 600))};
    --cell-width: calc(var(--padding) * 2);
    `;

    if (this.hidden) {
      return nothing;
    }

    const renderMonthDropdown = html`
      <div class="dropdown">
        ${this.monthsList.map(
          (m) =>
            html`<div
              class="item ${this.month === m ? "currently" : null}"
              @click=${() => this.handleMonthChanged(m)}
            >
              <ssk-text size=${this.size}
                >${this.computeMonthName(m, "MMM")}</ssk-text
              >
            </div>`,
        )}
      </div>
    `;
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
            (y) =>
              html`<div
                class="item ${+this.year === y ? "currently" : null}"
                @click=${() => this.handleYearChanged(y)}
              >
                <ssk-text size=${this.size}>${y}</ssk-text>
              </div>`,
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
        <div class="calendar" data-testid=${this.testId || nothing}>
          <div class="monthName layout horizontal center">
            ${this.enableYearChange
              ? html`<div class="left-arrow">
                  <ssk-icon
                    size="sm"
                    class="icon"
                    name="outline-chevron-double-left"
                    @click="${this.handlePrevYear.bind(this)}"
                  ></ssk-icon>
                  <ssk-icon
                    size="sm"
                    class="icon"
                    name="outline-chevron-left"
                    @click="${this.handlePrevMonth.bind(this)}"
                  ></ssk-icon>
                </div>`
              : null}
            <div>
              <div class="title">
                ${this.enableMonthChange
                  ? html`<div
                      class="popup-change"
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
                ${this.enableYearChange
                  ? html`<div
                      class="popup-change"
                      @click=${this.toggleYearChangeDropdown.bind(this)}
                    >
                      <ssk-text size=${this.size}>
                        <span>${this.year}</span>
                      </ssk-text>
                    </div> `
                  : html` <ssk-text size=${this.size}>
                      ${this.year}
                    </ssk-text>`}
                ${this._monthChangeDropdown ? renderMonthDropdown : null}
                ${this._yearChangeDropdown ? renderYearDropdown() : null}
              </div>
            </div>
            ${this.enableYearChange
              ? html`
                  <div class="right-arrow">
                    <ssk-icon
                      size="sm"
                      class="icon"
                      name="outline-chevron-right"
                      @click="${this.handleNextMonth.bind(this)}"
                    ></ssk-icon>
                    <ssk-icon
                      size="sm"
                      class="icon"
                      name="outline-chevron-double-right"
                      @click="${this.handleNextYear.bind(this)}"
                    ></ssk-icon>
                  </div>
                `
              : null}
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
                              .disabledDays="${this.disabledDays}"
                              .themeColor=${this.themeColor}
                              .min="${this.min}"
                              .max="${this.max}"
                              .month="${this.month}"
                              .hoveredDate="${this.hoveredDate}"
                              .dateTo="${this.dateTo}"
                              .dateFrom="${this.dateFrom}"
                              .day="${dayOfMonth}"
                              .size=${this.size}
                              ?isCurrentDate="${this.isCurrentDate(dayOfMonth)}"
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
        ${renderFooter(
          this.displayGoToday,
          this.displayOk,
          this.month,
          this.year,
          this.goToday,
        )}
      </div>
    `;
  }

  static styles = css`
    .container {
      width: fit-content;
      background-color: white;
      border: 1px solid var(--ssk-colors-gray-200);
      border-radius: var(--rounded);
      position: absolute;
    }

    .calendar {
      padding: var(--padding);
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
      color: var(--600-colors);
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
      width: 0.3em;
      height: 0.3em;
      background-color: var(--600-colors);
      border-radius: 50%;
    }

    .dropdown {
      position: absolute;
      background: white;
      border: 1px solid var(--ssk-colors-gray-200);
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
      padding: 0.5rem 1rem;
      border-radius: var(--rounded);
    }

    .dropdown > .header {
      grid-column: span 3;
      display: flex;
      justify-content: space-between;
    }

    .dropdown > .item:hover {
      background: var(--600-colors);
    }

    .left-arrow,
    .right-arrow {
      display: flex;
    }

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

    .footer {
      border-top: 1px solid var(--ssk-colors-gray-200);
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 1rem;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-calendar": Calendar;
  }
}
