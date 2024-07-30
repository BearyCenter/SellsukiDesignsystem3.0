import { consume } from "@lit/context";
import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Size, Theme, themeContext } from "../../main";
import "../calendar";
import "../../elements/input";
import "../../elements/input/addon";
import "../../elements/icon";
import { redispatchEvents } from "../../helpers/lit";
import { format, isValid, parse } from "date-fns";

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
  @property({ type: String })
  value: string | undefined;
  @property({ type: Boolean })
  noRange = false;
  @property({ type: String })
  format = "dd/MM/yyyy";

  @property({ type: Boolean })
  hideClearValue = false;

  @state()
  _hideCalendar: boolean = true;
  @state()
  _isFocus: boolean = false;
  @state()
  _cDateFrom: number | undefined;
  @state()
  _cMonth: string | undefined;
  @state()
  _cYear: string | undefined;

  private handleIcon() {
    if (this.value && this._isFocus) {
      this.value = "";
      this._hideCalendar = true;
    } else {
      this._hideCalendar = !this._hideCalendar;
    }
  }

  private updateValue(e: any, redispatch: boolean = false) {
    this.value = e.srcElement.value;
    this.convertStrToDate(this.value);

    if (redispatch) {
      this._hideCalendar = true;
      redispatchEvents(e, this);
    }
  }

  private handleOnFocus() {
    this._isFocus = true;
  }

  private handleOnBlur() {
    this._isFocus = false;
  }

  private handleDateFrom(v?: number) {
    if (v) {
      const dateFrom = new Date(v);
      this.value = format(dateFrom, this.format);
    }
  }

  private convertStrToDate(v?: string) {
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

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this.convertStrToDate(this.value);
  }

  protected updated(): void {
    this.convertStrToDate(this.value);
  }
  render() {
    if (this.hidden) {
      return nothing;
    }

    const goTodaySlot = this.querySelector('[slot="today"]');
    const okSlot = this.querySelector('[slot="ok"]');

    return html`<div>
      <ssk-input
        .value=${this.value}
        label=${this.label}
        helperText=${this.error ? this.helperText : ""}
        .error=${this.error}
        placeholder=${this.placeholder}
        name=${this.name}
        size=${this.size}
        @change=${(e: any) => this.updateValue(e, true)}
        @input=${(e: any) => this.updateValue(e, true)}
        @focus=${this.handleOnFocus.bind(this)}
        @blur=${this.handleOnBlur.bind(this)}
        autoComplete="off"
      >
        <ssk-input-addon slot="postfix" @click=${this.handleIcon.bind(this)}>
          ${this.value && this._isFocus
            ? html`<ssk-icon name="outline-x-circle"></ssk-icon>`
            : html`<ssk-icon name="outline-calendar-days"></ssk-icon> `}
        </ssk-input-addon>
      </ssk-input>
      <ssk-calendar
        .hidden=${this._hideCalendar}
        size=${this.size}
        noRange=${this.noRange}
        .dateFrom=${this._cDateFrom}
        month=${this._cMonth}
        year=${this._cYear}
        displayGoToday=${!!goTodaySlot}
        displayOk=${!!okSlot}
        @date-from-changed=${(e: any) =>
          okSlot ? nothing : this.handleDateFrom(e.detail?.value)}
        @date-to-changed=${(e: any) => console.log(e.detail?.value)}
      >
        ${goTodaySlot
          ? html`<slot name="today" slot="footer-today"></slot>`
          : nothing}
        ${okSlot ? html`<slot name="ok" slot="footer-ok"></slot>` : nothing}
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
