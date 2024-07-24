import { LitElement, html, css, PropertyValues } from "lit";
import { startOfDay, getTime } from "date-fns";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit/context";
import { Size, Theme, themeContext } from "../../main";
import "../../elements/text";

type typeDay = {
  title: number;
  date: number;
};
@customElement("ssk-cell")
export class Cell extends LitElement {
  static registeredName = "ssk-calendar";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  @property({ type: String })
  size: Size = "sm";

  // Cell props
  @property({ type: Object })
  day?: typeDay;

  @property({ type: Boolean })
  selected = false;
  @property({ type: Boolean })
  hovered = false;
  @property({ type: Boolean })
  disabled = false;
  @property({ type: Boolean })
  isCurrentDate = false;

  @property({ type: Number })
  dateTo?: number;

  @property({ type: Number })
  dateFrom?: number;
  @property({ type: Number })
  hoveredDate?: number;
  @property({ type: Number })
  min: number = 0;
  @property({ type: Number })
  max: number = 0;

  @property({ type: String })
  month?: string;

  @property({ type: Array })
  disabledDays: Array<number> = [];

  updated(properties: PropertyValues) {
    if (
      properties.has("dateFrom") ||
      properties.has("dateTo") ||
      properties.has("hoveredDate") ||
      properties.has("day")
    ) {
      this.dateChanged(this.dateFrom, this.dateTo, this.hoveredDate, this.day);
    }
  }

  dateChanged(
    dateFrom: number = 0,
    dateTo: number = 0,
    hoveredDate: number = 0,
    day?: typeDay,
  ) {
    this.selected = false;
    this.hovered = false;

    if (day) {
      if (
        getTime(startOfDay(dateFrom * 1000)) / 1000 === day.date ||
        getTime(startOfDay(dateTo * 1000)) / 1000 === day.date
      ) {
        this.selected = true;
      }
      if (
        ((hoveredDate === day.date || day.date < hoveredDate) &&
          day.date > dateFrom &&
          !dateTo &&
          !Number.isNaN(dateFrom) &&
          dateFrom !== undefined &&
          !this.selected) ||
        (day.date > dateFrom && day.date < dateTo)
      ) {
        this.hovered = true;
      }
    }
  }

  handleTap() {
    if (!this.disabled) {
      this.dispatchEvent(
        new CustomEvent("date-is-selected", {
          detail: { date: this.day?.date },
        }),
      );
    }
  }

  handleHover() {
    this.dispatchEvent(
      new CustomEvent("date-is-hovered", {
        detail: { date: this.day?.date },
      }),
    );
  }

  isSelected(selected: boolean) {
    if (selected) {
      return "selected";
    }
    return "";
  }

  isHovered(hovered: boolean) {
    if (hovered) {
      return "hovered";
    }
    return "";
  }

  isEnabled(min: number, max: number, disabledDays: number[], day?: typeDay) {
    this.disabled = false;
    if (disabledDays && day && day.date) {
      if (
        day.date < min ||
        day.date > max ||
        disabledDays.findIndex((disabledDay) => disabledDay === day.date) !== -1
      ) {
        this.disabled = true;
        return "disabled";
      }
    }
    return "";
  }

  render() {
    return html`
      <div
        @click="${this.handleTap.bind(this)}"
        @mouseover="${this.handleHover.bind(this)}"
        class="day ${this.isCurrentDate
          ? "currentDate"
          : null} ${this.isSelected(this.selected)} ${this.isHovered(
          this.hovered,
        )} ${this.isEnabled(
          this.min,
          this.max,
          this.disabledDays,
          this.day,
        )} ${this.day?.date === this.dateFrom
          ? "date-from"
          : this.day?.date === this.dateTo
          ? "date-to"
          : ""} ${this.dateTo === undefined ? "single-selected" : ""}"
      >
        <div class="currentDayMarker">
          <ssk-text
            size=${this.size}
            color="${this.selected ? "white" : "black"}"
          >
            ${this.day ? this.day.title : null}
          </ssk-text>
        </div>
        ${this.selected && this.hovered
          ? html`<div class="hover-extension"></div>`
          : null}
        <div class="inner-selected"></div>
      </div>
    `;
  }

  static styles = css`
    :host {
      font-family: Roboto;
      display: block;
      width: 38px;
    }

    .day {
      height: 2.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .day:not(.disabled):hover {
      background: var(--lit-datepicker-cell-hover, #1b8bf5);
      cursor: pointer;
      border-radius: 50%;
    }

    .day.hovered {
      background: var(--lit-datepicker-cell-hovered, #d9f2ff) !important;
    }

    .day.selected {
      background: var(--lit-datepicker-cell-selected, #d9f2ff) !important;
    }

    .day .currentDayMarker {
      position: relative;
      z-index: 2;
    }

    .day.selected .inner-selected {
      width: 100%;
      height: 100%;
      background: #1b8bf5;
      border-radius: 50%;
      position: absolute;
      z-index: 1;
    }

    .day.date-from.selected {
      border-radius: 50% 0 0 50%;
    }

    .day.date-to.selected {
      border-radius: 0 50% 50% 0;
    }

    .day.single-selected.selected {
      border-radius: 50%;
    }

    .day.selected .hover-extension {
      position: absolute;
      left: 50%;
      right: -50%;
      top: 0;
      bottom: 0;
      background: var(--lit-datepicker-cell-hovered, #d9f2ff) !important;
    }

    .day.currentDate .currentDayMarker {
      position: relative;
      width: auto;
      height: auto;
      font-weight: var(--current-day-font-weight, bold);
      border-radius: 50%;
    }

    .day.currentDate .currentDayMarker::after {
      content: "";
      position: absolute;
      bottom: -0.1rem;
      left: 50%;
      transform: translateX(-50%);
      width: 0.25rem;
      height: 0.25rem;
      background-color: #1b8bf5;
      border-radius: 50%;
    }

    .day:not(.disabled).day.hovered {
      border-radius: initial;
    }

    .day.disabled {
      opacity: 0.4;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-cell": Cell;
  }
}
