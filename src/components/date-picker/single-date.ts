import { consume } from "@lit/context";
import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Size, Theme, themeContext } from "../../main";
import "../calendar";
import "../../elements/input";
import "../../elements/icon";
import { format, isValid, parse } from "date-fns";
import { getMonthString } from "./util";

@customElement("ssk-date-picker")
export class DatePicker extends LitElement {
  static registeredName = "ssk-date-picker";

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
    if (this.value && this._isClear) {
      this.value = undefined;
      this._sValue = undefined;
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

  private updateValue(_e: Event) {
    const target = _e.target as HTMLSelectElement;
    const value = target.value;
    this._isClear = true;

    if (this.validateStringDate(value)) {
      if (this.showTime) {
        const parsedDate = parse(value, this.format, new Date());
        if (isValid(parsedDate)) {
          this.value = parsedDate;
          this._timeFrom = parsedDate.getTime();
        } else {
          return;
        }
      } else {
        const date = parse(value, this.format, new Date());
        if (isValid(date)) {
          this.value = date;
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
      return;
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
    this._sValue = this.value ? format(this.value, this.format) : undefined;
    this.handleChangedDate(this._sValue);
  }

  disconnectedCallback() {
    document.removeEventListener("click", () =>
      this.handleClickOutside.bind(this),
    );
  }

  protected updated(): void {
    this._sValue = this.value ? format(this.value, this.format) : undefined;
    this.handleChangedDate(this._sValue);
  }

  render() {
    if (this.hidden) {
      return nothing;
    }
    const footerSlot = this.querySelector('[slot="footer"]');

    return html`<div class="date-picker">
      <ssk-input
        .value=${this._sValue}
        label=${this.label}
        helperText=${this.error ? this.helperText : ""}
        .error=${this.error}
        placeholder=${this.placeholder}
        name=${this.name}
        size=${this.size}
        @input=${this.updateValue.bind(this)}
        @change=${this.updateValue.bind(this)}
        @blur=${this.handleOnBlur}
        @focus=${this.handleOnFocus}
        autoComplete="off"
      >
        <ssk-input-addon slot="postfix" @click=${this.handleIcon.bind(this)}>
          ${this._isClear
            ? html`<ssk-icon class="clear" name="outline-x-circle"></ssk-icon>`
            : html`<ssk-icon name="outline-calendar-days"></ssk-icon> `}
        </ssk-input-addon>
      </ssk-input>
      <div class="calendar-container">
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
        >
          ${footerSlot
            ? html`<slot name="footer" slot="footer"></slot>`
            : nothing}
        </ssk-calendar>
      </div>
    </div> `;
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
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-date-picker": DatePicker;
  }
}
