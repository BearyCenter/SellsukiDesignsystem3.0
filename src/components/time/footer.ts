import { html, nothing } from "lit";

export const renderFooter = (
  footerStyle: string,
  displayNow: boolean,
  displayOk: boolean,
  size: string,
  themeColor: string,
  nowText: string,
  okText: string,
  nowFn: Function,
  okFn: Function,
) => {
  const onlyOk = !displayNow && displayOk;
  const emptyFooter = !displayNow && !displayOk;

  return displayNow || displayOk
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
              ${displayNow
                ? html`
                    <ssk-button
                      @click=${nowFn}
                      size=${size}
                      variant="ghost"
                      themeColor=${themeColor}
                    >
                      ${nowText}
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
