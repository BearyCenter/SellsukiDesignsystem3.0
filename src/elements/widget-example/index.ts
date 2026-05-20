import { consume } from '@lit/context'
import { LitElement, css, html } from 'lit'
import { property } from 'lit/decorators.js'
import { themeContext } from '../../contexts/theme'
import { ThemeValue } from '../../types/base-attributes'
import {
  ColorName,
  ColorRole,
  FontFamilyGroup,
  FontWeight,
  Size,
  Theme,
  parseThemeToCssVariables
} from '../../types/theme'
import { Widget } from '../../types/widget'

/**
 * Sellsuki Widget Example — DS 3.0
 *
 * Minimal reference implementation of the `Widget` interface. Two-by-two
 * grid cell that demonstrates the contract every dashboard widget must
 * satisfy: declares `widgetWidth` / `widgetHeight` in grid units,
 * implements `isValidSize()` / `getWidth()` / `getHeight()`, and
 * consumes the theme + size tokens like any DS 3.0 element.
 *
 * Use this as the starting template when authoring new dashboard widgets;
 * for production stat tiles reach for `<ssk-widget-matric>`, for section
 * titles use `<ssk-widget-title>`, for user profile cards use
 * `<ssk-widget-user-detail>`.
 *
 * @example
 *   <ssk-widget-example widgetWidth="2" widgetHeight="2"></ssk-widget-example>
 */
export class WidgetExample extends LitElement implements Widget, ThemeValue {
  static registeredName = 'ssk-widget-example'

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme

  // ThemeValue
  /**
   * Size step — `xs`–`xl`. Reference value only in this scaffold; real widgets bind to specific tokens.
   */
  @property({ type: String })
  size: Size = 'md'
  /**
   * Reference text color — unused by the scaffold render but kept to satisfy the `ThemeValue` contract.
   */
  @property({ type: String })
  color?: ColorRole | ColorName
  /**
   * Outer margin reference (any CSS length).
   */
  @property({ type: String })
  margin?: string | undefined
  /**
   * Inner padding reference (`xs`–`xl`).
   */
  @property({ type: String })
  padding?: Size
  /**
   * Gap reference (any CSS length or token).
   */
  @property({ type: String })
  gap?: string | undefined = 'md'

  /**
   * Stable `data-testid` attribute for E2E test selectors.
   */
  @property({ type: String })
  testId?: string

  // Font
  /**
   * Font family group reference — `sans` (default) or `mono`.
   */
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = 'sans'
  /**
   * Font weight reference token.
   */
  @property({ type: String })
  fontWeight: FontWeight = 'normal'
  /**
   * Font-size reference (any CSS length).
   */
  @property({ type: String })
  fontSize?: string | undefined

  /**
   * Dashboard grid width in column units. Defaults to `2` for this scaffold; real widgets override.
   */
  @property({ type: String })
  widgetWidth: string = '2'

  /**
   * Dashboard grid height in row units. Defaults to `2` for this scaffold; real widgets override.
   */
  @property({ type: String })
  widgetHeight: string = '2'

  private _defaultWidth = '2'
  private _defaultHeight = '2'

  isValidSize(): boolean {
    return true
  }

  getWidth(): string {
    return this.isValidSize() ? this.widgetWidth : this._defaultWidth
  }

  getHeight(): string {
    return this.isValidSize() ? this.widgetHeight : this._defaultHeight
  }

  getSize(): string[] {
    return [this.getWidth(), this.getHeight()]
  }

  render() {
    return html`
      ${parseThemeToCssVariables(
        this.theme?.components?.widgetexample,
        ':host'
      )}
      <div class="container">
        <div>
          <p class="text-style">
            Widget ${this.widgetWidth} x ${this.widgetHeight}
          </p>
        </div>
      </div>
    `
  }

  static styles = css`
    .container {
      background: var(--bg-primary, #ffffff);
      padding: 8px;
      border: 1px solid var(--stroke-primary, #e5e7eb);
      border-radius: var(--radius-md, 8px);
      height: -webkit-fill-available;
    }
    .text-style {
      color: var(--text-primary, #1f2937);
      font-size: var(--font-size-p, 20px);
      text-align: center;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'ssk-widget-example': WidgetExample
  }
}

if (!customElements.get("ssk-widget-example")) {
  customElements.define("ssk-widget-example", WidgetExample);
}
