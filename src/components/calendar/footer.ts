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
  footerStyle: string,
  displayGoToday: boolean,
  displayOk: boolean,
  month: string,
  year: string,
  size: string,
  themeColor: string,
  todayText: string,
  okText: string,
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
            padding: 0.5rem 1rem;
          }

          .between {
            justify-content: space-between;
          }

          .middle {
            justify-content: center;
            gap: 0.5rem;
          }

          .right {
            justify-content: end;
            gap: 0.5rem;
          }

          .left {
            justify-content: start;
            gap: 0.5rem;
          }

          .left.flex-end {
            justify-content: start;
          }
          .between.flex-end,
          .right.flex-end {
            justify-content: end;
          }
        </style>

        ${emptyFooter
          ? nothing
          : html` <div
              class="footer ${footerStyle} ${onlyOk ? "flex-end" : null}"
            >
              ${shouldDisplayGoToday(displayGoToday, month, year)
                ? html`
                    <ssk-button
                      @click=${goTodayFn}
                      size=${size}
                      variant="ghost"
                      themeColor=${themeColor}
                    >
                      ${todayText}
                    </ssk-button>
                  `
                : null}
              ${displayOk
                ? html`
                    <ssk-button
                      @click=${okFn}
                      size=${size}
                      themeColor=${themeColor}
                    >
                      ${okText}
                    </ssk-button>
                  `
                : null}
            </div>`}
      `
    : null;
};
