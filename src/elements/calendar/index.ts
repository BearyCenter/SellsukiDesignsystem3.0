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
  Day,
} from "date-fns";
import { enUS, fr, th } from "date-fns/locale";
import { customElement, property, state } from "lit/decorators.js";
import { consume } from "@lit/context";
import { Theme, themeContext } from "../../main";
import "./cell";
import "../text";
import "../icon";

const locales = { en: enUS, fr, th };
type LocaleKey = "en" | "fr" | "th";
type typeDay = {
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
  prev?: Boolean;
  @property({ type: Boolean })
  next?: Boolean;
  @property({ type: Boolean })
  noRange = false;
  @property({ type: Boolean })
  narrow = false;
  @property({ type: Boolean })
  enableYearChange = false;
  @property({ type: Boolean })
  enableMonthChange = false;
  @property({ type: Boolean })
  displayGoToday = false;

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
        date: parseInt(format(startDateFn, "t"), 10),
        title: parseInt(format(startDateFn, "d"), 10),
      };
      columns.push(columnFn);

      if (dayNumberFn === lastDayOfWeek) {
        for (let i = columns.length; i < lastDayOfWeek + 1; i += 1) {
          columns.unshift(0);
        }
        rows.push(columns.slice());
        columns = [];
      }

      startDateFn = addDays(startDateFn, 1);
      startDateString = format(startDateFn, "dd/MM/yyyy");

      if (startDateString === endDateString) {
        const endColumnFn = {
          hover: false,
          date: parseInt(format(startDateFn, "t"), 10),
          title: parseInt(format(startDateFn, "d"), 10),
        };
        columns.push(endColumnFn);
        for (let i = columns.length; i <= lastDayOfWeek; i += 1) {
          columns.push(0);
        }
        rows.push(columns.slice());
        columns = [];
      }
    }
    this.daysOfMonth = rows;
  }

  private computeCurrentMonthName(month: string, year: string) {
    if (month && year) {
      const dateFn = parse(`${month}/${year}`, "MM/yyyy", new Date());
      return format(dateFn, "MMMM", { locale: locales[this.locale] });
    }
    return "";
  }

  private tdIsEnabled(day?: typeDay) {
    if (day) {
      return "enabled";
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

  private handleDateHovered(event: any) {
    if (!this.noRange) {
      this.hoveredDate = event.detail.date;
      this.dispatchEvent(
        new CustomEvent("hovered-date-changed", {
          detail: { value: this.hoveredDate },
        }),
      );
    }
  }

  private handleNextMonth() {
    const tbody = this.shadowRoot?.querySelector(".tbody");
    const monthName = this.shadowRoot?.querySelector(".monthName > div");
    tbody?.classList.add("withTransition");
    tbody?.classList.add("moveToLeft");
    monthName?.classList.add("withTransition");
    monthName?.classList.add("moveToLeft");

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

    setTimeout(() => {
      tbody?.classList.remove("withTransition");
      tbody?.classList.add("moveToRight");
      tbody?.classList.remove("moveToLeft");
      monthName?.classList.remove("withTransition");
      monthName?.classList.add("moveToRight");
      monthName?.classList.remove("moveToLeft");

      setTimeout(() => {
        tbody?.classList.add("withTransition");
        tbody?.classList.remove("moveToRight");
        monthName?.classList.add("withTransition");
        monthName?.classList.remove("moveToRight");
        setTimeout(() => {
          tbody?.classList.remove("withTransition");
          monthName?.classList.remove("withTransition");
        }, 100);
      }, 100);
    }, 100);
  }

  private handlePrevMonth() {
    const tbody = this.shadowRoot?.querySelector(".tbody");
    const monthName = this.shadowRoot?.querySelector(".monthName > div");
    tbody?.classList.add("withTransition");
    tbody?.classList.add("moveToRight");
    monthName?.classList.add("withTransition");
    monthName?.classList.add("moveToRight");

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

    setTimeout(() => {
      tbody?.classList.remove("withTransition");
      tbody?.classList.add("moveToLeft");
      tbody?.classList.remove("moveToRight");
      monthName?.classList.remove("withTransition");
      monthName?.classList.add("moveToLeft");
      monthName?.classList.remove("moveToRight");

      setTimeout(() => {
        tbody?.classList.add("withTransition");
        tbody?.classList.remove("moveToLeft");
        monthName?.classList.add("withTransition");
        monthName?.classList.remove("moveToLeft");
        setTimeout(() => {
          monthName?.classList.remove("withTransition");
          monthName?.classList.remove("withTransition");
        }, 100);
      }, 100);
    }, 100);
  }

  private setYears(from: number, to: number) {
    const yearsList = [];
    for (let i = from; i <= to; i += 1) {
      yearsList.push(i);
    }
    this.yearsList = yearsList;
  }

  async firstUpdated() {
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
    setTimeout(() => {
      this.setYears(1930, 2100);
    });
    await this.updateComplete;
    // if (this.enableYearChange) {
    //   const paperDropdownMenu = this.shadowRoot?.querySelector(
    //     ".year-change",
    //   ) as any;
    //   paperDropdownMenu?.updateStyles({
    //     "--paper-input-container-underline_-_display": "none",
    //     "--paper-input-container-shared-input-style_-_font-weight": "500",
    //     "--paper-input-container-shared-input-style_-_text-align": "right",
    //     "--paper-input-container-shared-input-style_-_font-size": "20px",
    //     "--paper-input-container_-_width": "75px",
    //     "--paper-input-container_-_padding": "0",
    //     "--paper-input-container-shared-input-style_-_color":
    //       "var(--paper-datatable-navigation-bar-text-color, rgba(0, 0, 0, .54))",
    //     "--paper-input-container-input-color":
    //       "var(--paper-datatable-navigation-bar-text-color, rgba(0, 0, 0, .54))",
    //     "--disabled-text-color":
    //       "var(--paper-datatable-navigation-bar-text-color, rgba(0, 0, 0, .54))",
    //   });
    // }
    // if (this.enableMonthChange) {
    //   const paperDropdownMenu = this.shadowRoot?.querySelector(
    //     ".month-change",
    //   ) as any;
    //   paperDropdownMenu?.updateStyles({
    //     "--paper-input-container-underline_-_display": "none",
    //     "--paper-input-container-shared-input-style_-_font-weight": "500",
    //     "--paper-input-container-shared-input-style_-_text-align": "center",
    //     "--paper-input-container-shared-input-style_-_font-size": "20px",
    //     "--paper-input-container_-_width": "75px",
    //     "--paper-input-container_-_padding": "0",
    //     "--paper-input-container-shared-input-style_-_color":
    //       "var(--paper-datatable-navigation-bar-text-color, rgba(0, 0, 0, .54))",
    //     "--paper-input-container-input-color":
    //       "var(--paper-datatable-navigation-bar-text-color, rgba(0, 0, 0, .54))",
    //     "--disabled-text-color":
    //       "var(--paper-datatable-navigation-bar-text-color, rgba(0, 0, 0, .54))",
    //   });
    // }
  }

  private enableYearChangeChanged(enableYearChange: boolean) {
    this.enableYearChange = enableYearChange;
  }

  // private handleYearListChanged({ detail }: any) {
  //   this.year = detail.value;
  // }

  // private handleMonthListChanged({ detail }: any) {
  //   this.month = detail.value;
  // }

  private goToday() {
    this.month = `0${getMonth(new Date()) + 1}`.slice(-2);
    this.year = `${getYear(new Date())}`;
  }

  private shouldDisplayGoToday(
    displayGoToday: boolean,
    month: string,
    year: string,
  ) {
    return (
      displayGoToday &&
      (parseInt(month, 10) !== getMonth(new Date()) + 1 ||
        parseInt(year, 10) !== getYear(new Date()))
    );
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    return html`
      <div class="calendar-container" data-testid=${this.testId || nothing}>
        <div class="monthName layout horizontal center">
          ${this.prev || this.narrow || this.enableYearChange
            ? html`<ssk-icon
                name="outline-chevron-left"
                @click="${this.handlePrevMonth.bind(this)}"
              ></ssk-icon>`
            : null}
          <div class="flex layout horizontal center center-justified">
            <div>
              <ssk-text>
                ${this.computeCurrentMonthName(this.month, this.year)}
                ${this.year}
              </ssk-text>
            </div>
          </div>
          ${this.next || this.narrow || this.enableYearChange
            ? html`<ssk-icon
                name="outline-chevron-right"
                @click="${this.handleNextMonth.bind(this)}"
              ></ssk-icon>`
            : null}
        </div>

        <div class="table">
          <div class="thead">
            <div class="tr">
              ${this.dayNamesOfTheWeek &&
              this.dayNamesOfTheWeek.map(
                (dayNameOfWeek) =>
                  html`<div class="th">
                    <ssk-text>${dayNameOfWeek}</ssk-text>
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
                  (dayOfMonth: typeDay) => html` <div
                    class="td ${this.tdIsEnabled(dayOfMonth)}"
                  >
                    ${dayOfMonth
                      ? html`
                          <ssk-cell
                            .disabledDays="${this.disabledDays}"
                            .min="${this.min}"
                            .max="${this.max}"
                            .month="${this.month}"
                            .hoveredDate="${this.hoveredDate}"
                            .dateTo="${this.dateTo}"
                            .dateFrom="${this.dateFrom}"
                            .day="${dayOfMonth}"
                            ?isCurrentDate="${this.isCurrentDate(dayOfMonth)}"
                            @date-is-hovered="${this.handleDateHovered.bind(
                              this,
                            )}"
                            @date-is-selected="${this.handleDateSelected.bind(
                              this,
                            )}"
                          ></ssk-cell>
                        `
                      : null}
                  </div>`,
                )}
              </div>`,
            )}
          </div>
        </div>
        <div class="go-today">
          ${this.shouldDisplayGoToday(
            this.displayGoToday,
            this.month,
            this.year,
          )
            ? html` <span @tap=${this.goToday}>Aujourd'hui</span> `
            : null}
        </div>
      </div>
    `;
  }

  static styles = css`
    div.calendar-container {
      width: fit-content;
      background-color: white;
    }

    div.table {
      display: table;
      border-collapse: collapse;
      table-layout: fixed;
      margin-top: 10px;
    }

    div.th {
      display: table-cell;
      line-height: 20px;
      font-weight: 400;
      color: var(--lit-datepicker-day-names-text, rgb(117, 117, 117));
      font-size: 11px;
      width: 38px;
      padding: 0;
      margin: 0;
      text-align: center;
    }

    div.tr {
      display: table-row;
      height: 38px;
    }

    div.td {
      display: table-cell;
      padding: 0;
      width: 38px;
      margin: 0;
    }

    .monthName {
      text-align: center;
      display: flex;
      align-content: space-between;
      flex-wrap: wrap;
    }

    .monthName::first-letter {
      text-transform: uppercase;
    }

    .monthName > div > div {
      margin-right: 8px;
      height: 30px;
    }

    paper-listbox {
      max-height: 200px;
    }

    div.tbody {
      transition: all 0ms;
      transform: translateX(0);
      height: 235px;
    }

    .withTransition {
      transition: all 100ms;
    }

    .moveToLeft {
      transform: translateX(-274px);
    }

    .moveToRight {
      transform: translateX(274px);
    }

    .withTransition td,
    .moveToLeft td,
    .moveToRight td {
      border: none;
    }

    paper-dropdown-menu {
      width: 75px;
      padding: 0;
      height: auto;
    }

    .go-today {
      text-align: center;
      text-decoration: underline;
      font-size: 10px;
      color: var(--lit-datepicker-today-shortcut, rgb(0, 150, 136));
      height: 11px;
    }
    .go-today span {
      cursor: pointer;
    }
    .month-change {
      min-width: 130px;
    }

    .monthName paper-icon-button {
      width: 30px;
      height: 30px;
      padding: 0px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-calendar": Calendar;
  }
}
