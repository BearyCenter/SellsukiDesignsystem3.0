import { consume } from '@lit/context'
import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
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

@customElement('ssk-widget-matric')
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
    // property data
  @property({ type: String }) label = "Label Subtext";
  @property({ type: String }) subtext = "Subtext";
  @property({ type: String }) badgetext = "3.25%";
  @property({ type: String }) badgecolor = "success";
  @property({ type: String }) badgeicon = "solid-arrow-up-right";
  @property({ type: String }) iconleftcolor = "gray";
  @property({ type: String }) iconleft = "outline-ellipsis-horizontal-circle";
  @property({ type: String }) imgurl = "https://fastly.picsum.photos/id/216/200/300.jpg?hmac=c3OXbiUxWPMgwnaFpX8ZAfBL5TZzWjnof6mb4OwuSPs";
  @property({ type: String }) buttoncolor = "primary";
  @property({ type: String }) buttonvariant = "outline";
  @property({ type: String }) buttonicon = "solid-arrow-right-circle";
  @property({ type: String }) iconrightcolor = "gray";
  @property({ type: String }) iconright = "outline-ellipsis-horizontal-circle";

  // property ควบคุมการแสดง
  @property({ type: Boolean }) showSubtext = true
  @property({ type: Boolean }) showImage = false
  @property({ type: Boolean }) showMiscIconLeft = true
  @property({ type: Boolean }) showButtonIcon =true
  @property({ type: Boolean }) showBadge = false
  @property({ type: Boolean }) showMiscIconRight = false

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

  private truncateText(text: string, maxLength: number): string {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
 }
 private formatNumberWithCommas(value: string): string {
    const num = parseFloat(value);
    if (isNaN(num)) {
      return value;
    }
    return num.toLocaleString();
 }
 private getContainerStyles() {
    const widthValue = parseInt(this.getWidth(), 10);
    const calculatedWidth = (widthValue * 88) - 32;
    return {
      width: `${calculatedWidth}px`,
    };
  }

  private renderLabel() {
    const formattedLabel = this.formatNumberWithCommas(this.label);
    const maxLength = 8;
    const isTruncated = formattedLabel.length > maxLength;

    if (isTruncated) {
      // show tooltip
      return html`
        <ssk-tooltip size="sm" hideclosebutton themecolor="black" color="white">
          <ssk-text size="2xl" color="gray.800" fontWeight="bold">
            ${this.truncateText(formattedLabel, maxLength)}
          </ssk-text>
          <div slot="content" class="tooltip-name">
            <ssk-text color="white" size="sx">${formattedLabel}</ssk-text>
          </div>
        </ssk-tooltip>
      `;
    } else {
      return html`
        <ssk-text size="2xl" color="gray.800" fontWeight="bold">
          ${formattedLabel}
        </ssk-text>
      `;
    }
  }

  render() {
    return html`
      ${parseThemeToCssVariables(
        this.theme?.components?.WidgetMatric,
        ':host'
      )}
      <div class="container" style=${styleMap(this.getContainerStyles())}>
        <div class="matric-style">
            <div class="matric-left">
                ${this.showImage
                ? html`
                    <div>
                        <ssk-image src="${this.imgurl}" alt="demo image" width="56px" height="56px"></ssk-image>
                    </div>
                    `
                : this.showMiscIconLeft
                    ? html`
                        <div>
                            <ssk-misc-icon
                            iconname="${this.iconleft}"
                            size="sm"
                            themecolor="${this.iconleftcolor}"
                            variant="light"
                            ></ssk-misc-icon>
                        </div>
                        `
                    : nothing
                }
                
                <div>
                    <div>
                        ${this.renderLabel()}
                    </div>
                    ${this.showSubtext
                        ? html`
                        <div style="padding-top:8px;">
                            <ssk-text size="md" color="background.600">
                            ${this.subtext}
                            </ssk-text>
                        </div>
                        `
                        : nothing
                    }
                </div>
            </div>
            <div class="matric-right">
                ${this.showBadge
                    ? html`
                        <div>
                            <ssk-badge
                            variant="subtle"
                            size="sm"
                            themecolor="${this.badgecolor}">
                                <ssk-icon
                                    name="${this.badgeicon}"
                                    themeColor="${this.badgecolor}"
                                    size="sm"
                                ></ssk-icon>${this.badgetext}
                            </ssk-badge>
                        </div>
                        `
                    : this.showButtonIcon
                    ? html`
                        <div>
                            <ssk-button 
                            variant="${this.buttonvariant}"
                            themecolor="${this.buttoncolor}"
                            size="sm">
                            <ssk-icon slot="prefix"
                            name="${this.buttonicon}"
                            size="sm">
                            </ssk-icon>
                            </ssk-button>
                        </div>
                        `
                    : this.showMiscIconRight
                    ? html`
                        <div>
                            <ssk-misc-icon
                            iconname="${this.iconright}"
                            size="sm"
                            themecolor="${this.iconrightcolor}"
                            variant="light"
                            ></ssk-misc-icon>
                        </div>
                        `
                    : nothing
                }
            </div>
        </div>
      </div>
    `
  }


  static styles = css`
    .container {
        background: #ffff;
        padding: 16px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        height: 144px;
        display: grid;
        box-sizing: border-box; 
    }
    .text-style {
        color: #1f2937;
        font-size: 24px;
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
    }
    .matric-right {
        margin-left: auto;
    }
    .label-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 150px;
        display: block;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'ssk-widget-matric': WidgetMatric
  }
}
