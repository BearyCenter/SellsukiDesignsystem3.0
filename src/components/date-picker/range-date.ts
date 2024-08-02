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
import { format, isValid, parse } from "date-fns";

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

      this._hideCalendar = true;
      this._isClear = false;
      this.error = false;
    } else {
      this._hideCalendar = !this._hideCalendar;
    }
  }

  private async updateValue(e: any) {
    this.valueFrom = e.srcElement.value;

    this._isClear = true;
    this._hideCalendar = true;
    await this.handleChangedDateFrom(e.srcElement.value);

    if (this.valueFrom) {
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: {
            valueFrom: this.error
              ? this.valueFrom
              : parse(e.srcElement.value, "dd-MM-yyyy", new Date()),
            valueTo: this.valueTo,
          },
        }),
      );
    }
  }

  private handleOnBlur() {
    this._hideCalendar = true;
  }

  private handleDateFrom(v?: number) {
    if (v) {
      const dateFrom = new Date(v);
      this.valueFrom = dateFrom;

      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { valueTo: this.valueTo, valueFrom: this.valueFrom },
        }),
      );
    }
  }

  private handleDateTo(v?: number) {
    if (v) {
      const dateTo = new Date(v);
      this.valueTo = dateTo;

      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { valueTo: this.valueTo, valueFrom: this.valueFrom },
        }),
      );
    }
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
    this.error = false;
  }

  private handleClickOutside(_e: MouseEvent) {
    this._isClear = false;
  }

  firstUpdated() {
    window.addEventListener("click", this.handleClickOutside.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener("click", this.handleClickOutside.bind(this));
  }

  protected updated(): void {
    if (!this.valueFrom) {
      this._sValueFrom = "";
      return;
    }
    if (isValid(this.valueFrom)) {
      this._sValueFrom = format(this.valueFrom, this.format);
      this.handleChangedDateFrom(this._sValueFrom);
    }

    if (!this.valueTo) {
      this._sValueTo = "";
      return;
    }
    if (isValid(this.valueTo)) {
      this._sValueTo = format(this.valueTo, this.format);
      this.handleChangedDateTo(this._sValueTo);
    }
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
          @input=${(e: any) => this.updateValue(e)}
          @change=${(e: any) => this.updateValue(e)}
          @blur=${this.handleOnBlur}
          autoComplete="off"
        >
          <ssk-input-addon slot="center">
            <ssk-icon name="solid-arrow-long-right"></ssk-icon>
          </ssk-input-addon>
          <ssk-input-addon slot="postfix" @click=${this.handleIcon.bind(this)}>
            ${this._isClear
              ? html`<ssk-icon name="outline-x-circle"></ssk-icon>`
              : html`<ssk-icon name="outline-calendar-days"></ssk-icon> `}
          </ssk-input-addon>
        </ssk-input-range>
        <div class="calendar-container">
          <ssk-calendar
            .hidden=${this._hideCalendar}
            .dateFrom=${this._cDateFrom}
            .dateTo=${this._cDateTo}
            size=${this.size}
            month=${this._cMonthFrom}
            year=${this._cYearFrom}
            rangeDate
            ?disabledNext=${this._cNoNext}
            ?displayGoToday=${this.displayGoToday}
            ?displayOk=${this.displayOk}
            @date-from-changed=${(e: any) =>
              this.handleDateFrom(e.detail?.value)}
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
                @date-to-changed=${(e: any) =>
                  this.handleDateTo(e.detail?.value)}
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
    ssk-icon {
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
