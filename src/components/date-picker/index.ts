import { consume } from "@lit/context";
import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Size, Theme, themeContext } from "../../main";
import "../calendar";
import "../../elements/input";
import "../../elements/input/addon";
import "../../elements/icon";
import { redispatchEvents } from "../../helpers/lit";
import { format } from "date-fns";

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

  private handleIcon() {
    if (this.value) {
      this.value = "";
    } else {
      this._hideCalendar = !this._hideCalendar;
    }
  }

  private updateValue(e: any, redispatch: boolean = false) {
    this.value = e.srcElement.value;
    if (redispatch) {
      redispatchEvents(e, this);
    }
  }

  private handleOnBlur() {
    this._hideCalendar = true;
  }

  private handleDateFrom(v?: number) {
    if (v) {
      const dateFrom = new Date(v);
      this.value = format(dateFrom, this.format);
    }
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    if (this.value) {
    }
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
        helperText=${this.helperText}
        placeholder=${this.placeholder}
        name=${this.name}
        size=${this.size}
        @change=${(e: any) => this.updateValue(e, true)}
        @blur=${this.handleOnBlur.bind(this)}
        autoComplete="off"
      >
        <ssk-input-addon slot="postfix" @click=${this.handleIcon.bind(this)}>
          ${this.value
            ? html`<ssk-icon name="outline-x-circle"></ssk-icon>`
            : html`<ssk-icon name="outline-calendar-days"></ssk-icon> `}
        </ssk-input-addon>
      </ssk-input>
      <ssk-calendar
        .hidden=${this._hideCalendar}
        size=${this.size}
        noRange=${this.noRange}
        displayGoToday=${!!goTodaySlot}
        displayOk=${!!okSlot}
        @date-from-changed=${(e: any) => this.handleDateFrom(e.detail?.value)}
        @date-to-changed=${(e: any) => console.log(e.detail?.value)}
      >
        <slot name="today" slot="footer-today"></slot>
        <slot name="ok" slot="footer-ok"></slot>
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
