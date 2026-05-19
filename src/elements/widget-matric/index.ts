import { consume } from '@lit/context'
import { LitElement, css, html, nothing, PropertyValues } from 'lit'
import { property, state, query } from 'lit/decorators.js'
import { themeContext } from '../../contexts/theme'
import { ThemeValue } from '../../types/base-attributes'
import { styleMap } from 'lit/directives/style-map.js' 
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
 * Sellsuki Widget Matric — DS 3.0
 *
 * Dashboard KPI / stat tile. Renders a large headline value (e.g.
 * "฿128,450") with a small `label` above ("ยอดขายวันนี้") and an
 * optional `subText` delta below ("↗ 12.5% vs เมื่อวาน"). Default grid
 * size is 4×2 units. Token-aware: the value typically uses
 * `--font-size-h2`, the label `--font-size-label`, and the delta
 * `--font-size-caption`.
 *
 * Reach for `<ssk-widget-matric>` for the headline numbers row of a
 * dashboard — revenue, orders, conversion rate. For multi-series charts
 * use `<ssk-line-chart>` / `<ssk-bar-chart>`. For user-profile cards use
 * `<ssk-widget-user-detail>`.
 *
 * @example
 *   <ssk-widget-matric
 *     label="ยอดขายวันนี้"
 *     value="฿128,450"
 *     subText="↗ 12.5% vs เมื่อวาน"
 *   ></ssk-widget-matric>
 */
export class WidgetMatric extends LitElement implements Widget, ThemeValue {
  static registeredName = 'ssk-widget-matric'

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme

  // ThemeValue
  @property({ type: String })
  size: Size = 'md'
  @property({ type: String })
  color?: ColorRole | ColorName
  @property({ type: String })
  margin?: string | undefined
  @property({ type: String })
  padding?: Size
  @property({ type: String })
  gap?: string | undefined = 'md'

  @property({ type: String })
  testId?: string

  // Font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = 'sans'
  @property({ type: String })
  fontWeight: FontWeight = 'normal'
  @property({ type: String })
  fontSize?: string | undefined

  @property({ type: String })
  widgetWidth: string = '4'

  @property({ type: String })
  widgetHeight: string = '2'

  private _defaultWidth = '3'
  private _defaultHeight = '2'
  // Data props — empty by default so unset widgets don't render placeholder
  // text or stock-photo URLs in production. Pair each visible region with
  // its show* flag below, OR slot in your own content via the named slots.
  @property({ type: String }) label = "";
  @property({ type: String }) subText = "";
  @property({ type: String }) badgeText = "";
  @property({ type: String }) badgeColor = "success";
  @property({ type: String }) badgeIcon = "";
  @property({ type: String }) iconLeftColor = "gray";
  @property({ type: String }) iconLeft = "";
  @property({ type: String }) imgUrl = "";
  @property({ type: String }) imgAlt = "";
  @property({ type: String }) buttonColor = "primary";
  @property({ type: String }) buttonVariant = "outline";
  @property({ type: String }) buttonIcon = "";
  @property({ type: String }) iconRightColor = "gray";
  @property({ type: String }) iconRight = "";

  // property ควบคุมการแสดง
  @property({ type: Boolean }) showSubtext = true;
  @property({ type: Boolean }) showImage = false;
  @property({ type: Boolean }) showIconLeft = false;
  @property({ type: Boolean }) showButtonIcon = false;
  @property({ type: Boolean }) showBadge = false;
  @property({ type: Boolean }) showIconRight = false;

  @state()
  private isLabelClamped = false;

  @query('.label-wrapper')
  private labelWrapperEl!: HTMLDivElement;

  @state()
  private isSubtextClamped = false;

  @query('.subtext-wrapper')
  private subtextWrapperEl!: HTMLDivElement;

  private boundCheckLabelEllipsis = this.checkLabelEllipsis.bind(this);

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this.boundCheckLabelEllipsis);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.boundCheckLabelEllipsis);
    super.disconnectedCallback();
  }
  
  firstUpdated() {
    this.checkLabelEllipsis();
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('label') || changedProperties.has('subText') || changedProperties.has('widgetWidth')) {
        this.checkAllEllipsis();
    }
  }

  private checkAllEllipsis() {
    this.checkLabelEllipsis();
    this.checkSubtextEllipsis();
  }

  private checkLabelEllipsis() {
    requestAnimationFrame(() => {
        if (this.labelWrapperEl) {
            const isClamped = this.labelWrapperEl.scrollHeight > this.labelWrapperEl.offsetHeight;
            if (isClamped !== this.isLabelClamped) {
                this.isLabelClamped = isClamped;
            }
        }
    });
  }

  private checkSubtextEllipsis() {
    requestAnimationFrame(() => {
        if (this.subtextWrapperEl) {
            const isClamped = this.subtextWrapperEl.scrollHeight > this.subtextWrapperEl.offsetHeight;
            if (isClamped !== this.isSubtextClamped) {
                this.isSubtextClamped = isClamped;
            }
        }
    });
  }

  isValidSize(): boolean {
     if (
      (this.widgetWidth == '3' && this.widgetHeight == '2') ||
      (this.widgetWidth == '4' && this.widgetHeight == '2') ||
      (this.widgetWidth == '6' && this.widgetHeight == '2')
    )
      return true
    return false
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

 private getContainerStyles() {
    const widthValue = parseInt(this.getWidth(), 10);
    const calculatedWidth = (widthValue * 88) - 32;
    return {
      width: `${calculatedWidth}px`,
    };
  }

  private handleButtonClick(e: Event) {
    e.stopPropagation();
    const event = new CustomEvent('click', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);

  }

  private renderLabel() {
     const labelContent = html`
        <div>
            <ssk-text size="2xl" color="gray.800" fontWeight="bold">
                <div class="label-wrapper">${this.label}</div>
            </ssk-text>
        </div>
      `;

      if (this.isLabelClamped) {
        return html`
            <ssk-tooltip size="sm" hideclosebutton themecolor="black" color="white">
                ${labelContent}
                <div slot="content" class="tooltip-name">
                    <ssk-text color="white" size="sx">${this.label}</ssk-text>
                </div>
            </ssk-tooltip>
        `;
      }
      return labelContent;
  }

   private renderSubtext() {
      const subtextContent = html`
        <div>
            <ssk-text size="md" color="background.600">
                <div class="subtext-wrapper">${this.subText}</div>
            </ssk-text>
        </div>
      `;

      if (this.isSubtextClamped) {
        return html`
            <ssk-tooltip size="sm" hideclosebutton themecolor="black" color="white">
                ${subtextContent}
                <div slot="content" class="tooltip-name">
                    <ssk-text color="white" size="sx">${this.subText}</ssk-text>
                </div>
            </ssk-tooltip>
        `;
      }
      return subtextContent;
  }

   private renderBadgeText() {
    let maxLength: number;
    switch (this.widgetWidth) {
        case '3':
            maxLength = 5;
            break;
        case '4':
            maxLength = 10;
            break;
        case '6':
            maxLength = 15;
            break;
        default:
            return this.badgeText;
    }

    if (this.badgeText && this.badgeText.length > maxLength) {
        return this.badgeText.slice(0, maxLength);
    }

    return this.badgeText;
  }

  render() {
    return html`
      ${parseThemeToCssVariables(
        this.theme?.components?.WidgetMatric,
        ':host'
      )}
      <div class="container" style=${styleMap(this.getContainerStyles())}
        data-testid=${this.testId || nothing}
        .showImage=${this.showImage}
        .showIconLeft=${this.showIconLeft}
        .showBadge=${this.showBadge}
        .showButtonIcon=${this.showButtonIcon}
        .showIconRight=${this.showIconRight}
        .label=${this.label}
        .subText=${this.subText}
        .badgeText=${this.badgeText}
        .badgeColor=${this.badgeColor}
        .badgeIcon=${this.badgeIcon}
        .iconLeftColor=${this.iconLeftColor}
        .iconLeft=${this.iconLeft}
        .imgUrl=${this.imgUrl}
        .buttonColor=${this.buttonColor}
        .buttonVariant=${this.buttonVariant}
        .buttonIcon=${this.buttonIcon}
        .iconRightColor=${this.iconRightColor}
        .iconRight=${this.iconRight}
        >
        <div class="matric-style">
            <div class="matric-left">
                <slot name="left">
                    ${this.showImage && this.imgUrl
                    ? html`
                        <div>
                            <ssk-image src="${this.imgUrl}" alt="${this.imgAlt}" width="56px" height="56px"></ssk-image>
                        </div>
                        `
                    : this.showIconLeft && this.iconLeft
                        ? html`
                            <div>
                                <ssk-misc-icon
                                iconname="${this.iconLeft}"
                                size="sm"
                                themecolor="${this.iconLeftColor}"
                                variant="light"
                                ></ssk-misc-icon>
                            </div>
                            `
                        : nothing
                    }
                </slot>

                <div class="text-content">
                    <div>
                        ${this.renderLabel()}
                    </div>
                    ${this.showSubtext
                        ? html`
                        <div style="padding-top:8px;">
                            ${this.renderSubtext()}
                        </div>
                        `
                        : nothing
                    }
                </div>
            </div>
            <div class="matric-right">
                <slot name="right">
                    ${this.showBadge && this.badgeText
                        ? html`
                            <div>
                                <ssk-badge
                                variant="subtle"
                                size="sm"
                                themecolor="${this.badgeColor}">
                                    ${this.badgeIcon
                                        ? html`<ssk-icon
                                            name="${this.badgeIcon}"
                                            themeColor="${this.badgeColor}"
                                            size="sm"
                                        ></ssk-icon>`
                                        : nothing
                                    }
                                    <label>${this.renderBadgeText()}</label>
                                </ssk-badge>
                            </div>
                            `
                        : this.showButtonIcon && this.buttonIcon
                        ? html`
                            <div>
                                <ssk-button
                                variant="${this.buttonVariant}"
                                themecolor="${this.buttonColor}"
                                size="sm"
                                @click=${this.handleButtonClick}>
                                <ssk-icon slot="prefix"
                                name="${this.buttonIcon}"
                                size="sm">
                                </ssk-icon>
                                </ssk-button>
                            </div>
                            `
                        : this.showIconRight && this.iconRight
                        ? html`
                            <div>
                                <ssk-misc-icon
                                iconname="${this.iconRight}"
                                size="sm"
                                themecolor="${this.iconRightColor}"
                                variant="light"
                                ></ssk-misc-icon>
                            </div>
                            `
                        : nothing
                    }
                </slot>
            </div>
        </div>
      </div>
    `
  }


  static styles = css`
    .container {
        background: var(--bg-primary, #ffffff);
        padding: 16px;
        border: 1px solid var(--stroke-primary, #e5e7eb);
        border-radius: var(--radius-md, 8px);
        height: 144px;
        display: grid;
        box-sizing: border-box;
    }
    .text-style {
        color: var(--text-primary, #1f2937);
        font-size: var(--font-size-p, 20px);
        text-align: center;
    }
    .matric-style {
        display: flex;
        gap: 16px;
        align-items: center;
    }
    .matric-left {
        display: flex;
        gap: 16px;
        align-items: center;
        min-width: 0;
        flex: 1;
    }
    .matric-right {
        margin-left: auto;
    }
    .label-wrapper {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.2;
        white-space: normal;
        word-break: break-word;
    }
    .subtext-wrapper {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.2;
        white-space: normal;
        word-break: break-word;
    }
    .text-content {
        min-width: 0;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'ssk-widget-matric': WidgetMatric
  }
}

if (!customElements.get("ssk-widget-matric")) {
  customElements.define("ssk-widget-matric", WidgetMatric);
}
