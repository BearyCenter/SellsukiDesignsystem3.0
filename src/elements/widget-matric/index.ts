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
  @property({ type: String }) label = "Label";
  @property({ type: String }) subText = "subText";
  @property({ type: String }) badgeText = "3.25%";
  @property({ type: String }) badgeColor = "success";
  @property({ type: String }) badgeIcon = "solid-arrow-up-right";
  @property({ type: String }) iconLeftColor = "gray";
  @property({ type: String }) iconLeft = "outline-ellipsis-horizontal-circle";
  @property({ type: String }) imgUrl = "https://fastly.picsum.photos/id/216/200/300.jpg?hmac=c3OXbiUxWPMgwnaFpX8ZAfBL5TZzWjnof6mb4OwuSPs";
  @property({ type: String }) buttonColor = "primary";
  @property({ type: String }) buttonVariant = "outline";
  @property({ type: String }) buttonIcon = "solid-arrow-right-circle";
  @property({ type: String }) iconRightColor = "gray";
  @property({ type: String }) iconRight = "outline-ellipsis-horizontal-circle";

  // property ควบคุมการแสดง
  @property({ type: Boolean }) showSubtext = true;
  @property({ type: Boolean }) showImage = false;
  @property({ type: Boolean }) showIconLeft = false;
  @property({ type: Boolean }) showButtonIcon = false;
  @property({ type: Boolean }) showBadge = false;
  @property({ type: Boolean }) showIconRight = false;
  @property({ type: Boolean }) showTooltipLabel = true;
  @property({ type: Boolean }) showTooltipSubtext = false;

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

      if (this.showTooltipLabel) {
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

      if (this.showTooltipSubtext) {
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
        .showTooltipLabel=${this.showTooltipLabel}
        .showTooltipSubtext=${this.showTooltipSubtext}
        >
        <div class="matric-style">
            <div class="matric-left">
                ${this.showImage
                ? html`
                    <div>
                        <ssk-image src="${this.imgUrl}" alt="demo image" width="56px" height="56px"></ssk-image>
                    </div>
                    `
                : this.showIconLeft
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
                ${this.showBadge
                    ? html`
                        <div>
                            <ssk-badge
                            variant="subtle"
                            size="sm"
                            themecolor="${this.badgeColor}">
                                <ssk-icon
                                    name="${this.badgeIcon}"
                                    themeColor="${this.badgeColor}"
                                    size="sm"
                                ></ssk-icon>${this.badgeText}
                            </ssk-badge>
                        </div>
                        `
                    : this.showButtonIcon
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
                    : this.showIconRight
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
