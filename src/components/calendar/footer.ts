import { getMonth, getYear } from "date-fns";
import { html, nothing } from "lit";

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
  okFn: Function,
) => {
  const onlyOk =
    !shouldDisplayGoToday(displayGoToday, month, year) && displayOk;

  const emptyFooter =
    !shouldDisplayGoToday(displayGoToday, month, year) && !displayOk;

  return displayGoToday || displayOk
    ? html`
        <style>
          .footer {
            border-top: 1px solid var(--ssk-colors-gray-200);
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 1rem;
          }

          .flex-end {
            justify-content: end;
          }
        </style>

        ${emptyFooter
          ? nothing
          : html` <div class="footer ${onlyOk ? "flex-end" : null}">
              ${shouldDisplayGoToday(displayGoToday, month, year)
                ? html` <slot @click=${goTodayFn} name="footer-today"></slot> `
                : null}
              ${displayOk
                ? html` <slot @click=${okFn} name="footer-ok"></slot> `
                : null}
            </div>`}
      `
    : null;
};
