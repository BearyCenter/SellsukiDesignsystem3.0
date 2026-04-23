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

export class DateDisplay extends LitElement {
  static registeredName = "ssk-date-display";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  // ThemeValue
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  @property({ type: String })
  color?: ColorRole | ColorName = "gray.500";

  @property({ type: String })
  size: Size = "md";

  @property({ type: Boolean })
  hidden = false;

  @property({ type: String })
  date: string | undefined;

  @property({ type: String })
  locale: string = "th";

  // to override locale
  @property({ type: String })
  dateFormat: string | undefined;

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

if (!customElements.get("ds-date-display")) {
  customElements.define("ds-date-display", DateDisplay);
}
if (!customElements.get("ssk-date-display")) {
  customElements.define("ssk-date-display", class extends DateDisplay {});
}
