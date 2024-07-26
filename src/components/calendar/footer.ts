import { getMonth, getYear } from "date-fns";
import { html } from "lit";

const shouldDisplayGoToday = (
  displayGoToday: boolean,
  month: string,
  year: string,
) => {
  return (
    displayGoToday &&
    (parseInt(month, 10) !== getMonth(new Date()) + 1 ||
      parseInt(year, 10) !== getYear(new Date()))
  );
};

export const renderFooter = (
  displayGoToday: boolean,
  displayOk: boolean,
  month: string,
  year: string,
  goTodayFn: Function,
) => {
  return displayGoToday || displayOk
    ? html`<div class="footer">
      <div class="go-today">
        ${
          shouldDisplayGoToday(displayGoToday, month, year)
            ? html` <slot @click=${goTodayFn} name="footer-today"></slot> `
            : null
        }
      </div>

        ${
          displayOk
            ? html` <div class="ok">
                <slot name="footer-ok"></slot>
              </div>`
            : null
        }
      </div>
    </div>`
    : null;
};
