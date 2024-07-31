import { consume } from "@lit/context";
import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Size, Theme, themeContext } from "../../main";
import "../calendar";
import "../../elements/input";
import "../../elements/input/addon";
import "../../elements/icon";
import { format, isValid, parse, toDate } from "date-fns";

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
  singleDate = false;
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
  _cMonth: string | undefined;
  @state()
  _cYear: string | undefined;
  @state()
  _sValue: string | undefined;

  private handleIcon() {
    if (this.value && this._isClear) {
      this.value = undefined;
      this._sValue = undefined;
      this._hideCalendar = true;
      this._isClear = false;
      this.error = false;
    } else {
      this._hideCalendar = !this._hideCalendar;
    }
  }

  private async updateValue(e: any) {
    this.value = e.srcElement.value;

    this._isClear = true;
    this._hideCalendar = true;
    await this.handleChangedDate(e.srcElement.value);

    if (this.value) {
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: {
            value: this.error
              ? this.value
              : parse(e.srcElement.value, "dd-MM-yyyy", new Date()),
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
      this.value = dateFrom;

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
        this._cMonth = (vDateFrom.getMonth() + 1).toString().padStart(2, "0");
        this._cYear = vDateFrom.getFullYear().toString();
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
    if (!this.value) {
      this._sValue = "";
      return;
    }
    if (isValid(this.value)) {
      this._sValue = format(this.value, this.format);
      this.handleChangedDate(this._sValue);
    }
  }

  render() {
    if (this.hidden) {
      return nothing;
    }
    const footerSlot = this.querySelector('[slot="footer"]');

    const cld = this.shadowRoot?.querySelector(".date-picker > ssk-calendar");
    if (this.singleDate) cld?.setAttribute("singleDate", "");
    if (this.displayGoToday) cld?.setAttribute("displayGoToday", "");
    if (this.displayOk) cld?.setAttribute("displayOk", "");

    return html`<div class="date-picker">
      <ssk-input
        .value=${this._sValue}
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
        <ssk-input-addon slot="postfix" @click=${this.handleIcon.bind(this)}>
          ${this._isClear
            ? html`<ssk-icon name="outline-x-circle"></ssk-icon>`
            : html`<ssk-icon name="outline-calendar-days"></ssk-icon> `}
        </ssk-input-addon>
      </ssk-input>
      <ssk-calendar
        .hidden=${this._hideCalendar}
        .dateFrom=${this._cDateFrom}
        size=${this.size}
        month=${this._cMonth}
        year=${this._cYear}
        @date-from-changed=${(e: any) => this.handleDateFrom(e.detail?.value)}
      >
        ${footerSlot
          ? html`<slot name="footer" slot="footer"></slot>`
          : nothing}
      </ssk-calendar>
    </div> `;
  }
  static styles = css`
    ssk-icon {
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-date-picker": DatePicker;
  }
}
