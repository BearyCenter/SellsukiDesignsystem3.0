import { consume } from '@lit/context'
import { LitElement, css, html, nothing, PropertyValues } from 'lit'
import { property, state, query } from 'lit/decorators.js'
import { themeContext } from '../../contexts/theme'
import { ThemeValue } from '../../types/base-attributes'
import { styleMap } from 'lit/directives/style-map.js'
import { repeat } from 'lit/directives/repeat.js'
import {
  ColorName,
  ColorRole,
  FontFamilyGroup,
  FontWeight,
  Size,
  Theme,
} from '../../types/theme'
import { Widget } from '../../types/widget'

export interface sectionItem {
  id: string | number;
  label: string;
  description: string;
  showButton?: boolean;
  buttonIcon?: string;
  buttonColor?: string;
  showTooltip?: boolean;
  tooltipText?: string;
  disabledButton?: boolean;
}

/**
 * Sellsuki Widget User Detail — DS 3.0
 *
 * Dashboard user-profile card. Renders an avatar (`imgUrl`, shape
 * `circle` / `rounded` / `square`), a label + subText pair, an optional
 * CTA button, and a vertical list of `sectionItem` rows underneath —
 * each row supports its own per-row button and tooltip.
 *
 * Default grid size is 4×3 units. Reach for `<ssk-widget-user-detail>`
 * to surface "active user", "top seller", or "support agent on duty"
 * tiles in a dashboard. For just a KPI value use `<ssk-widget-matric>`;
 * for a bare user portrait use `<ssk-avatar>`.
 *
 * @example
 *   <ssk-widget-user-detail
 *     label="ชญานี ศ."
 *     subText="ผู้ดูแลร้าน"
 *     imgUrl="/u/123.jpg"
 *     buttonText="ดูโปรไฟล์"
 *   ></ssk-widget-user-detail>
 */
export class WidgetUserDetail extends LitElement implements Widget, ThemeValue {
  static registeredName = 'ssk-widget-user-detail'

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme

  /**
   * Size step — `xs`–`xl`. Used for token-derived spacing; the headline label is fixed at `--font-size-h4`.
   */
  @property({ type: String }) size: Size = 'md'
  /**
   * Text color override for the label / subText pair.
   */
  @property({ type: String }) color?: ColorRole | ColorName
  /**
   * Outer margin override (any CSS length). Prefer parent dashboard grid gap.
   */
  @property({ type: String }) margin?: string | undefined
  /**
   * Inner padding token (`xs`–`xl`). Defaults to the built-in 24px container padding.
   */
  @property({ type: String }) padding?: Size
  /**
   * Gap between header and row list (any CSS length or token). Defaults to `md`.
   */
  @property({ type: String }) gap?: string | undefined = 'md'
  /**
   * Stable `data-testid` attribute applied to the widget container for E2E test selectors.
   */
  @property({ type: String }) testId?: string
  /**
   * Font family group inherited by widget content — `sans` (default) or `mono`.
   */
  @property({ type: String }) fontFamilyGroup: FontFamilyGroup = 'sans'
  /**
   * Font weight token inherited by widget content. Defaults to `normal`.
   */
  @property({ type: String }) fontWeight: FontWeight = 'normal'
  /**
   * Override font-size for slotted content (any CSS length). DS 3.0 floor is 18px.
   */
  @property({ type: String }) fontSize?: string | undefined

  /**
   * Dashboard grid width in column units. Locked to `4` (the standard user-detail tile width).
   */
  @property({ type: String }) widgetWidth: string = '4'
  /**
   * Dashboard grid height in row units (`3`, `4`, or `6`). Controls how many `rowItems` are rendered:
   * `3` → 2 rows, `4` → 4 rows, `6` → 7 rows. Defaults to `3`.
   */
  @property({ type: String }) widgetHeight: string = '3'

  private _defaultWidth = '4'
  private _defaultHeight = '3'

  /**
   * Primary user / entity label — bold, single-line clamp (e.g. user display name).
   */
  @property({ type: String }) label = "";
  /**
   * Secondary line under the label — typically a role or tagline (e.g. `"ผู้ดูแลร้าน"`).
   */
  @property({ type: String }) subText = "";
  /**
   * Theme color role for the trailing action button. Defaults to `primary`.
   */
  @property({ type: String }) buttonColor = "primary";
  /**
   * Variant of the trailing action button — `ghost` (default), `solid`, `outline`, etc.
   */
  @property({ type: String }) buttonVariant = "ghost";
  /**
   * Prefix icon for the trailing action button. Defaults to `"solid-arrow-right-circle"`.
   */
  @property({ type: String }) buttonIcon = "solid-arrow-right-circle";
  /**
   * Trailing action button label — truncated to 5 characters for compact display next to the avatar.
   */
  @property({ type: String }) buttonText = "";
  /**
   * Avatar image URL. Use a square portrait; rendered through `<ssk-avatar>` for initials fallback.
   */
  @property({ type: String }) imgUrl = "";
  /**
   * Avatar shape — `circle` (default), `rounded` (8px squircle), or `square`.
   */
  @property({ type: String }) imageShape = "circle";
  /**
   * When set (default), renders the secondary `subText` line. Set `false` to suppress.
   */
  @property({ type: Boolean }) showSubtext = true;
  /**
   * When set, renders the leading avatar (`imgUrl` + `imageShape`). Otherwise the avatar is hidden.
   */
  @property({ type: Boolean }) showImage = false;
  /**
   * When set (default), renders the trailing action button. Set `false` to hide it.
   */
  @property({ type: Boolean }) showButtonIcon = true;
  /**
   * When set, wraps the trailing action button in a tooltip showing `buttonTooltipText` on hover.
   */
  @property({ type: Boolean }) showButtonTooltip = false;
  /**
   * Tooltip body text shown when `showButtonTooltip` is set. Defaults to `"More details"`.
   */
  @property({ type: String }) buttonTooltipText = 'More details';
  /**
   * When set, the trailing button is rendered non-interactive (disabled styling, ignored clicks).
   */
  @property({ type: Boolean }) disabledButton = false;

  /**
   * Rows displayed beneath the user header. Each item supplies its own `label` / `description` and
   * optional per-row button + tooltip. The list is truncated to fit the current `widgetHeight`.
   */
  @property({ type: Array })
  public rowItems: sectionItem[] = [];

  @state()
  private clampedStates: Map<string | number, { label: boolean; description: boolean }> = new Map();

  @state() private isLabelClamped = false;

  @state() private isSubtextClamped = false;

  @query('.label-wrapper') private labelWrapperEl!: HTMLDivElement;
  @query('.subtext-wrapper') private subtextWrapperEl!: HTMLDivElement;

  connectedCallback() { super.connectedCallback(); window.addEventListener('resize', () => this.checkAllEllipsis()); }
  disconnectedCallback() { window.removeEventListener('resize', () => this.checkAllEllipsis()); super.disconnectedCallback(); }
  firstUpdated() { this.checkAllEllipsis(); }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('rowItems') || changedProperties.has('label') || changedProperties.has('subText')) {
      this.checkAllEllipsis();
    }
  }

  private checkAllEllipsis() {
    requestAnimationFrame(() => {
      if (this.labelWrapperEl) {
        const isClamped = this.labelWrapperEl.scrollWidth > this.labelWrapperEl.clientWidth;
        if (isClamped !== this.isLabelClamped) this.isLabelClamped = isClamped;
      }
      if (this.subtextWrapperEl) {
        const isClamped = this.subtextWrapperEl.scrollWidth > this.subtextWrapperEl.clientWidth;
        if (isClamped !== this.isSubtextClamped) this.isSubtextClamped = isClamped;
      }

      const newClampedStates = new Map(this.clampedStates);
      let hasChanged = false;

      this.renderRoot.querySelectorAll('.bottom-section').forEach(sectionEl => {
        const id = sectionEl.getAttribute('data-id');
        if (!id) return;

        const labelEl = sectionEl.querySelector('.bottom-label-wrapper');
        const descEl = sectionEl.querySelector('.description-wrapper');
        const currentState = newClampedStates.get(id) || { label: false, description: false };

        const isLabelClamped = labelEl ? labelEl.scrollWidth > labelEl.clientWidth : false;
        const isDescClamped = descEl ? descEl.scrollWidth > descEl.clientWidth : false;

        if (currentState.label !== isLabelClamped || currentState.description !== isDescClamped) {
          hasChanged = true;
          newClampedStates.set(id, { label: isLabelClamped, description: isDescClamped });
        }
      });

      if (hasChanged) {
        this.clampedStates = newClampedStates;
      }
    });
  }

  isValidSize(): boolean { if ((this.widgetWidth == '4' && this.widgetHeight == '3') || (this.widgetWidth == '4' && this.widgetHeight == '4') || (this.widgetWidth == '4' && this.widgetHeight == '6')) return true; return false }
  getWidth(): string { return this.isValidSize() ? this.widgetWidth : this._defaultWidth }
  getHeight(): string { return this.isValidSize() ? this.widgetHeight : this._defaultHeight }
  getSize(): string[] { return [this.getWidth(), this.getHeight()] }
  private getContainerStyles() { const heightValue = parseInt(this.getHeight(), 10); const calculatedHeight = (heightValue * 88) - 32; return { height: `${calculatedHeight}px` }; }
  private handleButtonClick(e: Event) {
    e.stopPropagation();
    const event = new CustomEvent('click-button', { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }

  private handleButtonItemClick(item: sectionItem) {
    const event = new CustomEvent('click-row-icon', {
      detail: { item: item },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  private renderTextWithTooltip(text: string, wrapperClass: string, isClamped: boolean, textSize: Size = 'md', color?: ColorName | ColorRole, fontWeight?: FontWeight) {
    const textContent = html`<ssk-text size=${textSize} .color=${color} .fontWeight=${fontWeight}><div class=${wrapperClass}>${text}</div></ssk-text>`;
    if (isClamped) {
      return html`<ssk-tooltip size="sm" hideclosebutton themecolor="black" color="white">${textContent}<div slot="content"><ssk-text color="white" size="sx">${text}</ssk-text></div></ssk-tooltip>`;
    }
    return textContent;
  }

  private get maxItemsToShow(): number {
    switch (this.widgetHeight) {
      case '4': return 4;
      case '6': return 7;
      case '3':
      default: return 2;
    }
  }

  private get truncatedButtonText(): string {
    return this.buttonText.slice(0, 5);
  }

  render() {
    const mainButtonTemplate = html`
      <ssk-button 
        variant="${this.buttonVariant}" 
        themecolor="${this.buttonColor}" 
        size="sm" 
        @click=${this.handleButtonClick} 
        .disabled=${this.disabledButton}
      >
        ${this.buttonIcon ? html`<ssk-icon slot="prefix" name="${this.buttonIcon}" size="xs"></ssk-icon>` : nothing}
        ${this.truncatedButtonText}
      </ssk-button>
      `;
    const itemsToRender = this.rowItems.slice(0, this.maxItemsToShow);

    return html`
      <div class="container" style=${styleMap(this.getContainerStyles())} data-testid=${this.testId || nothing}>
        <div class="widget-style">
            <div class="widget-item-left">
                ${this.showImage ? html`<ssk-avatar src="${this.imgUrl}" shape="${this.imageShape}"></ssk-avatar>` : nothing}
                <div class="text-content">
                    ${this.renderTextWithTooltip(this.label, 'label-wrapper', this.isLabelClamped, 'xl', 'gray.800', 'bold')}
                    ${this.showSubtext ? html`<div style="padding-top:0px;">${this.renderTextWithTooltip(this.subText, 'subtext-wrapper', this.isSubtextClamped, 'xs', 'gray.500',)}</div>` : nothing}
                </div>
            </div>
            <div class="widget-item-right">
                ${this.showButtonIcon ? html`<div>${this.showButtonTooltip ? html`<ssk-tooltip size="sm" hideclosebutton themecolor="black" color="white">${mainButtonTemplate}<div slot="content"><ssk-text color="white" size="sx">${this.buttonTooltipText}</ssk-text></div></ssk-tooltip>` : mainButtonTemplate}</div>` : nothing}
            </div>
        </div>

        <div class="bottom-items-container">
            ${repeat(itemsToRender, (item) => item.id, (item) => {
      const clamped = this.clampedStates.get(String(item.id)) || { label: false, description: false };

      const bottomButtonIconTemplate = html`
          <ssk-button 
            variant="ghost" 
            themecolor=${item.buttonColor} 
            size="xs" 
            .disabled=${item.disabledButton} 
            @click=${() => {this.handleButtonItemClick(item);}}>
                <ssk-icon slot="prefix" name=${item.buttonIcon || 'outline-ellipsis-horizontal-circle'} size="xs"></ssk-icon>
          </ssk-button>
                `;

      return html`
                <div class="bottom-section" data-id=${item.id}>
                    ${this.renderTextWithTooltip(item.label, 'bottom-label-wrapper', clamped.label, 'xs', 'gray.500')}
                    
                    <div class="bottom-section-content">
                        <div class="bottom-left">
                            ${this.renderTextWithTooltip(item.description, 'description-wrapper', clamped.description, 'sm', 'gray.800', 'bold')}
                        </div>
                        <div class="bottom-right">
                            ${item.showButton ? html`
                                ${item.showTooltip ? html`
                                    <ssk-tooltip size="sm" hideclosebutton themecolor="black" color="white">
                                        ${bottomButtonIconTemplate}
                                        <div slot="content"><ssk-text color="white" size="sx">${item.tooltipText}</ssk-text></div>
                                    </ssk-tooltip>
                                ` : bottomButtonIconTemplate}
                            ` : nothing}
                        </div>
                    </div>
                </div>
                `;
    })}
        </div>
      </div>
    `;
  }

  static styles = css`
    .container {
        background: var(--bg-primary, #ffffff);
        padding: 24px;
        border: 1px solid var(--stroke-primary, #e5e7eb);
        border-radius: var(--radius-md, 8px);
        width: 320px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        box-sizing: border-box;
    }
    .widget-style {
        display: flex;
        gap: 16px;
        align-items: center;
    }
    .widget-item-left { 
      display: flex; 
      gap: 16px; 
      min-width: 0; 
      flex: 1; 
      align-items: center; 
    }
    .widget-item-left ssk-avatar {
      flex-shrink: 0;
    }
    .widget-item-right { 
      margin-left: auto; 
    }
    .text-content { 
        min-width: 0;
        flex: 1;
    }
    .label-wrapper, .subtext-wrapper, .bottom-label-wrapper, .description-wrapper {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1.2;
    }

    .bottom-items-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .bottom-section {
        display: flex;
        flex-direction: column;
        gap: 0;
    }
    .bottom-section-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
    }
    .bottom-left { min-width: 0; flex: 1;}
    .bottom-right { flex-shrink: 0; }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'ssk-widget-user-detail': WidgetUserDetail
  }
}

if (!customElements.get("ssk-widget-user-detail")) {
  customElements.define("ssk-widget-user-detail", WidgetUserDetail);
}
