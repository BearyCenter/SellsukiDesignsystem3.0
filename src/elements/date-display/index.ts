import { consume } from "@lit/context";
import dayjs from "dayjs";
import "dayjs/locale/de";
import "dayjs/locale/en";
import "dayjs/locale/fr";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { ColorName, ColorRole, Size, Theme } from "../../types/theme";

dayjs.extend(localizedFormat);
dayjs.extend(buddhistEra);

/**
 * Sellsuki Date Display — DS 3.0
 *
 * Locale-aware date / time formatter. Renders an ISO date string (or any
 * dayjs-parseable value) using the configured locale (`th` default,
 * `en`, `fr`, `de`). Thai locale uses the Buddhist Era calendar (พ.ศ.)
 * via the buddhistEra dayjs plugin. Override the output with
 * `dateFormat` and/or `timeFormat` tokens.
 *
 * Reach for `<ssk-date-display>` in tables, activity logs, and detail
 * panes — anywhere a timestamp string needs consistent locale rendering
 * without manual `Intl.DateTimeFormat` plumbing. Pair with a `caption`
 * font size context (`--font-size-caption`) for timestamps in tables.
 *
 * @example
 *   <ssk-date-display date="2026-05-19T10:24:00Z" locale="th"></ssk-date-display>
 *   <ssk-date-display date=${order.createdAt} dateFormat="DD MMM BBBB" timeFormat="HH:mm"></ssk-date-display>
 */
export class DateDisplay extends LitElement {
  static registeredName = "ssk-date-display";

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  /**
   * Stable `data-testid` attribute applied to the date wrapper for E2E test selectors.
   */
  @property({ type: String })
  testId?: string;

  // ThemeValue
  /**
   * Brand accent — currently unused for visual styling; reserved for future status tinting.
   */
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  /**
   * Text color for both date and time lines. Defaults to `gray.500` for muted, table-friendly timestamps.
   */
  @property({ type: String })
  color?: ColorRole | ColorName = "gray.500";

  /**
   * Size step for the primary date line — `xs`–`xl`. The time line is rendered one step smaller.
   */
  @property({ type: String })
  size: Size = "md";

  /**
   * When set, the date display renders nothing (returns `nothing`) — use for conditional show/hide without DOM teardown.
   */
  @property({ type: Boolean })
  hidden = false;

  /**
   * Date value — accepts any dayjs-parseable input (ISO string, RFC 2822, JS `Date.toString()`).
   * Required for output; an undefined value renders an empty/invalid date.
   */
  @property({ type: String })
  date: string | undefined;

  /**
   * Output locale — `th` (default, Buddhist Era), `en`, `fr`, or `de`. Drives the default
   * `dateFormat` / `timeFormat` if those aren't explicitly set.
   */
  @property({ type: String })
  locale: string = "th";

  // to override locale
  /**
   * Override dayjs date format string (e.g. `"DD MMM BBBB"` for Thai BE, `"YYYY-MM-DD"` for ISO).
   * Takes precedence over the locale default.
   */
  @property({ type: String })
  dateFormat: string | undefined;

  /**
   * Override dayjs time format string (e.g. `"HH:mm"` 24-hour, `"hh:mm A"` 12-hour). Takes
   * precedence over the locale default.
   */
  @property({ type: String })
  timeFormat: string | undefined;

  private smallerSizeMap: Record<Size, Size> = {
    xs: "10px",
    sm: "xs",
    md: "sm",
    lg: "md",
    xl: "lg",
    "2xl": "xl",
  };

  localeDateFormat: Record<string, string> = {
    th: "D MMM BBBB",
    en: "MMM DD, YYYY",
    fr: "DD MMMM YYYY",
    de: "DD.MM.YYYY",
  };

  localeTimeFormat: Record<string, string> = {
    th: "HH:mm",
    en: "hh:mm A",
    fr: "HH:mm",
    de: "HH:mm",
  };

  formatDate(date?: string, locale: string = "th"): string {
    dayjs.locale(locale);
    return dayjs(date).format(this.dateFormat ?? this.localeDateFormat[locale]);
  }

  formatTime(date?: string, locale: string = "th"): string {
    dayjs.locale(locale);
    return dayjs(date).format(this.localeTimeFormat[locale]);
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    return html`
      <div class="date-display" data-testid=${this.testId || nothing}>
        <ssk-text size=${this.size} color=${this.color}>
          ${this.formatDate(this.date, this.locale)}
        </ssk-text>
        <ssk-text size=${this.smallerSizeMap[this.size]} color=${this.color}>
          ${this.formatTime(this.date, this.locale)}
        </ssk-text>
      </div>
    `;
  }

  static styles = css`
    .date-display {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-date-display": DateDisplay;
  }
}

if (!customElements.get("ssk-date-display")) {
  customElements.define("ssk-date-display", DateDisplay);
}
