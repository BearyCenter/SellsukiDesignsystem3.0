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

type ActionType = 'none' | 'button' | 'dropdown';

export interface DropdownItem {
  label: string;
  value: string;
}

export class WidgetTitle extends LitElement implements Widget, ThemeValue {
    static registeredName = 'ssk-widget-title'
    
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
    widgetWidth: string = '6'

    @property({ type: String })
    widgetHeight: string = '1'

    private _defaultWidth = '6'
    private _defaultHeight = '1'
    // property data
    @property({ type: String }) titleText = "title";
    @property({ type: String }) subText = "subText";
    @property({ type: String })
    get buttonText() {
    return this._buttonText;
    }
    set buttonText(v: string) {
    const next = (v ?? '').toString().slice(0, 15);
    const old = this._buttonText;
    if (next !== old) {
        this._buttonText = next;
        this.requestUpdate('buttonText', old);
    }
    }
    private _buttonText = 'buttonText';
    @property({ type: String }) buttonColor = "primary";
    @property({ type: String }) buttonVariant = "outline";
    @property({ type: String }) buttonIcon = "solid-arrow-right-circle";
    @property({ type: Array }) 
    public dropdownOptions: DropdownItem[] = [];
    private selectedValue = ""

    // property ควบคุมการแสดง
    @property({ type: Boolean }) showSubtext = true;
    @property({ type: Boolean }) showButtonText = true;
    @property({ type: Boolean }) showButtonIcon = true;
    @property({ type: String })  actionType: ActionType = 'none';
    @property({ type: Boolean }) disabledButton = false;
    
    @state()
    private isTitleClamped = false;
    
    @query('.title-wrapper')
    private titleWrapperEl!: HTMLDivElement;

    @state()
    private isSubtextClamped = false;

    @query('.subtext-wrapper')
    private subtextWrapperEl!: HTMLDivElement;

    private boundCheckTitleEllipsis = this.checkTitleEllipsis.bind(this);

    connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this.boundCheckTitleEllipsis);
   }

    disconnectedCallback() {
        window.removeEventListener('resize', this.boundCheckTitleEllipsis);
        super.disconnectedCallback();
    }
  
    firstUpdated() {
        this.checkTitleEllipsis();
    }

    updated(changedProperties: PropertyValues) {
        if (changedProperties.has('titleText') || changedProperties.has('subText') || changedProperties.has('widgetWidth')) {
            this.checkAllEllipsis();
        }
    }

    private checkAllEllipsis() {
        this.checkTitleEllipsis();
        this.checkSubtextEllipsis();
    }

    private checkTitleEllipsis() {
        requestAnimationFrame(() => {
            if (this.titleWrapperEl) {
                const isClamped = this.titleWrapperEl.scrollHeight > this.titleWrapperEl.offsetHeight;
                if (isClamped !== this.isTitleClamped) {
                    this.isTitleClamped = isClamped;
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
            (this.widgetWidth == '12' && this.widgetHeight == '1') ||
            (this.widgetWidth == '8' && this.widgetHeight == '1') ||
            (this.widgetWidth == '6' && this.widgetHeight == '1')
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
        const heightValue = parseInt(this.getHeight(), 10);
        const calculatedWidth = (widthValue * 88) - 32;
        const calculatedHeight = (heightValue * 88) - 32;
        return {
        width: `${calculatedWidth}px`,
        height: `${calculatedHeight}px`
        };
    }

    private handleButtonClick(e: Event) {
        e.stopPropagation();
        const event = new CustomEvent('click-button', {
        bubbles: true,
        composed: true
        });
        this.dispatchEvent(event);
    }

    private onSelectItemDropDownPrimary = (e: Event) => {
        const value = (e as any)?.detail?.value ?? (e.target as HTMLSelectElement)?.value;
        this.selectedValue = value;
        this.requestUpdate();

        const selectedData = this.dropdownOptions.find(option => option.value === value);
        const event = new CustomEvent('click-dropdown', {
            detail: selectedData,
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(event);
        };
 
    private renderTitle() {
        const titleContent = html`
            <div>
                <ssk-text size="2xl" color="gray.800" fontWeight="bold">
                    <div class="title-wrapper">${this.titleText}</div>
                </ssk-text>
            </div>
        `;

        if (this.isTitleClamped) {
            return html`
                <ssk-tooltip size="sm" hideclosebutton themecolor="black" color="white">
                    ${titleContent}
                    <div slot="content" class="tooltip-name">
                        <ssk-text color="white" size="sx" >${this.titleText}</ssk-text>
                    </div>
                </ssk-tooltip>
            `;
        }
        return titleContent;
    }

    private renderSubtext() {
        const subtextContent = html`
            <div>
                <ssk-text size="md" color="gray.500">
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

    private renderAction() {
        switch (this.actionType) {
        case 'button':
            return this.showButtonText || this.showButtonIcon
            ? html`
                <div>
                    <ssk-button
                    variant="${this.buttonVariant}"
                    themecolor="${this.buttonColor}"
                    size="md"
                    @click=${this.handleButtonClick}
                    .disabled=${this.disabledButton}>
                    ${this.showButtonIcon
                        ? html`<ssk-icon
                            slot="prefix"
                            name="${this.buttonIcon}"
                            size="md">
                        </ssk-icon>`
                        : nothing}
                    ${this.showButtonText ? this.buttonText : nothing}
                    </ssk-button>
                </div>
                `
            : nothing;
        case 'dropdown':
            return html`
                <div >
                    <ssk-dropdown
                        size="md"
                        width="150px"
                        optionsWidth="auto"
                        hover
                        value=${this.selectedValue}
                        @change=${this.onSelectItemDropDownPrimary}
                        >
                        <ssk-dropdown-button slot="selected">
                            <ssk-dropdown-preview :value=${this.selectedValue}>
                                 ${this.selectedValue ? this.selectedValue : this.dropdownOptions?.[0]?.value}
                            </ssk-dropdown-preview>
                        </ssk-dropdown-button>
                        <div class="options-container">
                            ${this.dropdownOptions.map((item, index) => html`
                            <ssk-dropdown-option
                                .value=${item.value}
                                data-index=${index}
                            >
                                ${item.value ?? item.label}
                            </ssk-dropdown-option>
                            `)}
                        </div>
                    </ssk-dropdown>
                <div>
            `;
        default:
            return null;
        }
    }

    render() {
    return html`
      ${parseThemeToCssVariables(
        this.theme?.components?.WidgetTitle,
        ':host'
      )}
      <div class="container" style=${styleMap(this.getContainerStyles())}
        data-testid=${this.testId || nothing}
        .showButtonText=${this.showButtonText}
        .showButtonIcon=${this.showButtonIcon}
        .titleText=${this.titleText}
        .subText=${this.subText}
        .buttonColor=${this.buttonColor}
        .buttonVariant=${this.buttonVariant}
        .buttonIcon=${this.buttonIcon}
        .dropdownOptions=${this.dropdownOptions}
        >
        <div class="title-style">
            <div class="text-content ${this.showSubtext ? 'has-subtext' : ''}">
                <div class="title">
                    ${this.renderTitle()}
                </div>
                ${this.showSubtext
                    ? html`
                    <div class="subtext">
                        ${this.renderSubtext()}
                    </div>
                    `
                    : nothing
                }
            </div>
            <div class="action-content">  
                <div>
                    ${this.renderAction()}
                </div>
            </div>
        </div>
      </div>
    `
  }

    static styles = css`
        .container {
            background: var(--bg-primary, #ffffff);
            height: 144px;
            display: grid;
            box-sizing: border-box;
        }
        .title-style {
            display: flex;
            align-items: center;
        }
            
        .action-content {
            flex: 0 0 auto;
            margin-left: auto;
            display: flex;
            margin-left: 16px;
            justify-content: flex-end;         
        }
            
        .text-content {
            min-width: 0;
            display: flex;
            align-items: center;
            grid-template-columns: 1fr 1fr; 
            min-width: 0; 
            flex: 1 1 auto; 
        }
        
        .text-content.has-subtext .title {
            flex: 0 0 auto;
            max-width: 50%;
            min-width: 0;
            padding-left: 8px;
            padding-right: 16px;
        }

        .text-content.has-subtext .subtext {
            flex: 1 1 auto;
            padding-top: 4px;
            min-width: 0;
        }

        .text-content:not(.has-subtext) .title {
            flex: 1 1 auto;
            min-width: 0;
        }

        .title-wrapper,
        .subtext-wrapper {
            min-width: 0;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.2;
            white-space: normal;
            word-break: break-word;
        }

        .options-container {
            display: flex;
            flex-direction: column;
            gap: 0.125em;
            max-height: 180px;
        }
    `
}

declare global {
    interface HTMLElementTagNameMap {
        'ssk-widget-title': WidgetTitle
    }
}

if (!customElements.get("ssk-widget-title")) {
  customElements.define("ssk-widget-title", WidgetTitle);
}
