import { consume } from "@lit/context";
import { css, html, LitElement, nothing } from "lit";
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
import { format, isValid, parse, toDate } from "date-fns";

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
      this.valueFrom = toDate(format(value, this.format)); // must be date or number

      this.dispatchEvent(
        new CustomEvent("change", {
          detail: {
            valueFrom: toDate(format(value, this.format)),
            valueTo: this.valueTo,
          },
        }),
      );
    }
  }

  private async updateValueTo({ detail }: any) {
    const value = detail.originalEvent.target.value;
    this._isClear = true;

    if (this.validateStringDate(value)) {
      this.valueTo = toDate(format(value, this.format)); // must be date or number

      this.dispatchEvent(
        new CustomEvent("change", {
          detail: {
            valueTo: toDate(format(value, this.format)),
            valueFrom: this.valueFrom,
          },
        }),
      );
    }
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

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { valueTo: this.valueTo, valueFrom: this.valueFrom },
      }),
    );
  }

  private handleDateTo({ detail }: any) {
    const dateTo = new Date(detail.value);
    this.valueTo = isValid(dateTo) ? dateTo : undefined;

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
        this._cMonthFrom = (vDateFrom.getMonth() + 1)
          .toString()
          .padStart(2, "0");
        this._cYearFrom = vDateFrom.getFullYear().toString();
      }
      this.error = !validDate;
      return;
    }
    this.error = false;
  }

  private handleChangedDateTo(v?: string) {
    if (v) {
      const vDateTo = parse(v, this.format, new Date());

      const validDate = isValid(vDateTo);
      if (validDate) {
        const dfTime = vDateTo.getTime();
        this._cDateTo = dfTime;
        this._cMonthTo = (vDateTo.getMonth() + 1).toString().padStart(2, "0");
        this._cYearTo = vDateTo.getFullYear().toString();
      }
      this.error = !validDate;
      return;
    }
    this._cDateTo = undefined;
    this.error = false;
  }

  private handleClickOutside(_e: MouseEvent) {
    this._isClear = false;

    const hasValue = this.valueFrom && this.valueTo;
    if (hasValue && !this._isFocus && !this._hideCalendar) {
      this._hideCalendar = true;
    }
  }

  firstUpdated() {
    window.addEventListener("click", this.handleClickOutside.bind(this));

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
    window.removeEventListener("click", this.handleClickOutside.bind(this));
  }

  protected updated(): void {
    this._sValueFrom = this.valueFrom
      ? format(this.valueFrom, this.format)
      : undefined;
    this._sValueTo = this.valueTo
      ? format(this.valueTo, this.format)
      : undefined;

    this.handleChangedDateFrom(this._sValueFrom);
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
    const hasRange =
      this._cMonthFrom != this._cMonthTo || this._cYearFrom != this._cYearTo;

    if (hasRange) {
      this._cNoNext = true;
      this._cNoPrev = true;
    } else {
      this._cNoNext = false;
      this._cNoPrev = false;
    }

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
          <ssk-calendar
            .hidden=${this._hideCalendar}
            .dateFrom=${this.valueFrom?.getTime()}
            .dateTo=${this.valueTo?.getTime()}
            size=${this.size}
            month=${this._cMonthFrom}
            year=${this._cYearFrom}
            rangeDate
            ?disabledNext=${this._cNoNext}
            ?displayGoToday=${this.displayGoToday}
            ?displayOk=${this.displayOk}
            @date-from-changed=${this.handleDateFrom.bind(this)}
            @date-to-changed=${this.handleDateTo.bind(this)}
          >
            ${footerSlot
              ? html`<slot name="footer" slot="footer"></slot>`
              : nothing}
          </ssk-calendar>
          ${hasRange
            ? html`<ssk-calendar
                .hidden=${this._hideCalendar}
                .dateFrom=${this._cDateFrom}
                .dateTo=${this._cDateTo}
                size=${this.size}
                month=${this._cMonthTo}
                year=${this._cYearTo}
                rangeDate
                ?disabledPrev=${this._cNoPrev}
                ?displayGoToday=${this.displayGoToday}
                ?displayOk=${this.displayOk}
                @date-from-changed=${this.handleDateFrom.bind(this)}
                @date-to-changed=${this.handleDateTo.bind(this)}
              >
                ${footerSlot
                  ? html`<slot name="footer" slot="footer"></slot>`
                  : nothing}
              </ssk-calendar>`
            : null}
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
