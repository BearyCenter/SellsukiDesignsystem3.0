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
} from '../../types/theme'
import { Widget } from '../../types/widget'

/**
 * Widget-table — dashboard widget that wraps `<ssk-table>` with a
 * label / description / badge / action-button header. Implements the
 * `Widget` interface so it can be placed inside `<ssk-widget-grid>`.
 *
 * @fires action-click - Fires when an `action-icon` cell in the wrapped
 *   table is clicked. `detail: { record: unknown; rowIndex: number }`.
 * @fires table-sort - Fires when a sortable column header is clicked.
 *   `detail: { dataIndex: string; direction: "asc" | "desc" }`.
 * @fires load-data - Re-emitted from the inner `<ssk-table>` when the
 *   user changes page / rows-per-page. `detail: { page: number;
 *   rowsPerPage: number }`.
 */
export class WidgetTable extends LitElement implements Widget, ThemeValue {
  static registeredName = 'ssk-widget-table'

  /**
   * Theme object consumed from the ancestor `<ssk-theme-provider>` via Lit
   * context. Set automatically — components rarely assign this directly.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme

  /**
   * Density / typography size step — `"xs" | "sm" | "md" | "lg" | "xl"`.
   * Drives header / body text scale. Defaults to `"md"`.
   */
  @property({ type: String }) size: Size = 'md'
  /**
   * Foreground color override applied to body text. Accepts a semantic
   * role or palette name.
   */
  @property({ type: String }) color?: ColorRole | ColorName
  /**
   * Outer margin applied to the widget container.
   */
  @property({ type: String }) margin?: string | undefined
  /**
   * Padding step inside the widget container.
   */
  @property({ type: String }) padding?: Size
  /**
   * Gap between header rows (title / badge / description). Defaults to `"md"`.
   */
  @property({ type: String }) gap?: string | undefined = 'md'
  /**
   * Sets `data-testid` on the widget root for stable selectors in E2E tests.
   */
  @property({ type: String }) testId?: string
  /**
   * Font-family group token — `"sans"` (default UI), `"serif"`, `"mono"`.
   */
  @property({ type: String }) fontFamilyGroup: FontFamilyGroup = 'sans'
  /**
   * Font-weight token for header / body — `"normal"`, `"medium"`,
   * `"semibold"`, `"bold"`.
   */
  @property({ type: String }) fontWeight: FontWeight = 'normal'
  /**
   * Explicit font-size token override. Must resolve to >= 18px per DS 3.0.
   */
  @property({ type: String }) fontSize?: string | undefined

  /**
   * Widget grid width in grid-track units, used by `<ssk-widget-grid>`.
   * Valid combos are `"8"` (wide) or `"12"` (full row). Defaults to `"8"`.
   */
  @property({ type: String }) widgetWidth: string = '8'
  /**
   * Widget grid height in grid-track units. Must be `"8"` to maintain
   * the canonical 672px widget height. Defaults to `"8"`.
   */
  @property({ type: String }) widgetHeight: string = '8'

  private defaultWidth = '8'
  private defaultHeight = '8'

  /**
   * Widget title shown in the header. Truncated at 120 characters; a
   * tooltip appears on hover when clamped by the container.
   */
  @property({ type: String }) label = "";
  /**
   * Subtitle / supporting copy shown beneath the title when
   * `showDescription` is true. Truncated at 120 characters with a hover
   * tooltip for clamped text.
   */
  @property({ type: String }) description = "";
  /**
   * Text rendered inside the header `<ssk-badge>` when `showBadge` is true.
   * Trimmed at 15 characters.
   */
  @property({ type: String }) badgeText = "";
  /**
   * Semantic role for the header badge — `"success"` (default),
   * `"warning"`, `"danger"`, `"info"`, or any palette name.
   */
  @property({ type: String }) badgeColor = "success";
  /**
   * Icon name (from `<ssk-icon>` set) rendered before the badge text.
   */
  @property({ type: String }) badgeIcon = "";
  /**
   * Reveals the header status badge to the right of the title.
   */
  @property({ type: Boolean }) showBadge = false;
  /**
   * Reveals the description / subtitle row beneath the title.
   */
  @property({ type: Boolean }) showDescription = false;

  /**
   * Theme color applied to the header action button. Accepts a semantic
   * role or palette name. Defaults to `"primary"`.
   */
  @property({ type: String }) buttonColor = "primary";
  /**
   * Button variant — `"outline"` (default), `"solid"`, `"ghost"`, `"link"`.
   */
  @property({ type: String }) buttonVariant = "outline";
  /**
   * Icon name rendered as the button's prefix.
   */
  @property({ type: String }) buttonIcon = "";
  /**
   * Label text for the header action button. Truncated at 15 characters.
   */
  @property({ type: String }) buttonText = "";
  /**
   * When true, the header action button is disabled — pointer events are
   * blocked and the button is dimmed.
   */
  @property({ type: Boolean }) disabledButton = false;
  /**
   * Reveals the header action button. Despite the name, this toggles the
   * entire button (not just its icon).
   */
  @property({ type: Boolean }) showButtonIcon = false;

  /**
   * Column definitions forwarded to the wrapped `<ssk-table>`. Each
   * column may carry a `type` (`"image" | "text" | "textsubtext" | "badge" |
   * "action-icon"`) that maps to a built-in cell renderer; otherwise the
   * value is rendered as-is.
   */
  @property({ type: Array }) public tableColumns: any[] = [];
  /**
   * Row data forwarded to the wrapped `<ssk-table>`. Empty array reveals
   * the `emptyImage` placeholder instead of the table body.
   */
  @property({ type: Array }) public tableData: any[] = [];
  /**
   * Server-side total row count forwarded to the wrapped table for
   * controlled pagination. Defaults to `0` (client-side).
   */
  @property({ type: Number }) totalItems = 0;
  /**
   * Current page (1-indexed) forwarded to the wrapped table. Listen to
   * `load-data` to fetch the next slice. Defaults to `1`.
   */
  @property({ type: Number }) currentPage = 1;
  /**
   * Rows per page forwarded to the wrapped table. Defaults to `10`.
   */
  @property({ type: Number }) rowsPerPage = 10;

  /**
   * Image URL displayed in the empty-state placeholder. Defaults to
   * `/Blank.svg` when unset.
   */
  @property({ type: String }) emptyImage = '';

  /**
   * Caps the number of numeric page buttons in the table's pagination
   * footer. `0` (default) = no cap.
   */
  @property({ type: Number }) maxVisiblePageButtons: number = 0;

  @state() private internalTableData: any[] = [];

  @state() private activeSortColumn: string | null = null;

  @state() private activeSortDirection: 'asc' | 'desc' = 'asc';

  @state() private isLabelClamped = false;

  @state() private isSubtextClamped = false;

  @query('.title-wrapper') private labelWrapperEl!: HTMLDivElement;
  @query('.subtext-wrapper') private subtextWrapperEl!: HTMLDivElement;

  constructor() {
    super();
  }

  connectedCallback() { super.connectedCallback(); window.addEventListener('resize', () => this.checkAllEllipsis()); }
  disconnectedCallback() { window.removeEventListener('resize', () => this.checkAllEllipsis()); super.disconnectedCallback(); }
  firstUpdated() { this.checkAllEllipsis(); }

  willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('tableData')) {
      this.internalTableData = this.tableData
      const initialSortColumn = this.tableColumns?.find(c => c.sortDirection === 'asc' || c.sortDirection === 'desc');
      if (initialSortColumn && this.activeSortColumn === null) {
        this.activeSortColumn = initialSortColumn.dataIndex;
        this.activeSortDirection = initialSortColumn.sortDirection;
      }
    }
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('label') || changedProperties.has('description')) {
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
    });
  }

  isValidSize(): boolean { if ((this.widgetWidth == '8' && this.widgetHeight == '8') || (this.widgetWidth == '12' && this.widgetHeight == '8')) return true; return false }
  getWidth(): string { return this.isValidSize() ? this.widgetWidth : this.defaultWidth }
  getHeight(): string { return this.isValidSize() ? this.widgetHeight : this.defaultHeight }
  getSize(): string[] { return [this.getWidth(), this.getHeight()] }

  private getContainerStyles() { const widthValue = parseInt(this.getWidth(), 10); const calculatedWidth = (widthValue * 88) - 32; return { width: `${calculatedWidth}px` }; }
  
  private handleButtonClick(e: Event) {
    e.stopPropagation();
    const event = new CustomEvent('button-click', { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }
  
  private handleActionIconClick(record: any, rowIndex: any) {
    this.dispatchEvent(new CustomEvent('action-click', {
      detail: { record, rowIndex },
      bubbles: true,
      composed: true
    }));

  }

  private renderTextWithTooltip(text: string, wrapperClass: string, isClamped: boolean, textSize: Size = 'md', color?: ColorName | ColorRole, fontWeight?: FontWeight) {
    const textContent = html`<ssk-text size=${textSize} .color=${color} .fontWeight=${fontWeight}><div class=${wrapperClass}>${text}</div></ssk-text>`;
    if (isClamped) {
      return html`<ssk-tooltip size="sm" hideclosebutton themecolor="black" color="white">${textContent}<div slot="content"><ssk-text color="white" size="sx">${text}</ssk-text></div></ssk-tooltip>`;
    }
    return textContent;
  }

  private renderBadgeText() {
    let maxLength: number;
    maxLength = 15;

    if (this.badgeText && this.badgeText.length > maxLength) {
      return this.badgeText.slice(0, maxLength);
    }

    return this.badgeText;
  }
  private renderLabelText() {
    let maxLength: number;
    maxLength = 120;

    if (this.label && this.label.length > maxLength) {
      return this.label.slice(0, maxLength);
    }

    return this.label;
  }

  private renderSubText() {
    let maxLength: number;
    maxLength = 120;

    if (this.description && this.description.length > maxLength) {
      return this.description.slice(0, maxLength);
    }

    return this.description;
  }

  private get truncatedButtonText(): string {
    return this.buttonText.slice(0, 15);
  }

  private handleSort(dataIndex: string, direction: 'asc' | 'desc') {
    this.activeSortColumn = dataIndex;
    this.activeSortDirection = direction;

    this.dispatchEvent(new CustomEvent('table-sort', {
      detail: { dataIndex, direction },
      bubbles: true,
      composed: true
    }));
  }

  private handleLoadDataTable(e: CustomEvent) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('load-data', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  private get processedColumns() {
    if (!this.tableColumns) {
      return [];
    }
    return this.tableColumns.map(col => {
      const newCol = { ...col };
      if (newCol.sortable && newCol.dataIndex) {
        newCol.onSort = (direction: 'asc' | 'desc') => this.handleSort(newCol.dataIndex, direction);

        if (newCol.dataIndex === this.activeSortColumn) {
          newCol.sortDirection = this.activeSortDirection;
        } else {
          delete newCol.sortDirection;
        }
      }
      return newCol;
    });
  }

  private getColorValue(colorName: string): string {
    if (!this.theme || !colorName) {
      return 'inherit';
    }

    const parts = colorName.split('.');
    let colorValue: any = this.theme.colors;

    try {
      for (const part of parts) {
        if (colorValue === undefined) return 'inherit';
        colorValue = colorValue[part];
      }

      if (typeof colorValue === 'object' && colorValue !== null) {
        if (colorValue['DEFAULT']) return colorValue['DEFAULT'];
        if (colorValue['500']) return colorValue['500']; // เฉดสีตั้งต้นที่ใช้บ่อย
        const firstKey = Object.keys(colorValue)[0];
        return firstKey ? colorValue[firstKey] : 'inherit';
      }

      return typeof colorValue === 'string' ? colorValue : 'inherit';
    } catch (error) {
      return 'inherit';
    }
  }

  private get customCellConfig() {
    const config: { [key: string]: any } = {};

    if (!this.tableColumns) {
      return config;
    }

    this.tableColumns.forEach(column => {
      if (!column.dataIndex || !column.type) {
        return;
      }

      let renderFunction;
      switch (column.type) {
        case 'image':
          renderFunction = (value: string) =>
            `<ssk-image src="${value}" width="48px" height="48px"></ssk-image>`
          break;
        case 'text':
          const defaultTextColor = (column as any).color || 'gray.800';

          renderFunction = (value: string | { text: string; color?: string }) => {
            let text = '';
            let color = defaultTextColor;

            if (typeof value === 'object' && value !== null && 'text' in value) {
              text = value.text;
              color = value.color || defaultTextColor;
            } else {
              text = String(value ?? '');
            }

            const finalColor = this.getColorValue(color);

            return `<div style="color: ${finalColor}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: var(--font-size-p, 20px);">${text}</div>`;
          };
          break;
        case 'textsubtext':
          const defaultMainColor = (column as any).colors?.text || 'gray.800';
          const defaultSubColor = (column as any).colors?.subtext || 'gray.500';

          renderFunction = (value: { text: string; subtext: string; colors?: { text?: string; subtext?: string } }) => {
            const text = value?.text || '';
            const subtext = value?.subtext || '';

            const mainColorName = value?.colors?.text || defaultMainColor;
            const subColorName = value?.colors?.subtext || defaultSubColor;

            const mainColorValue = this.getColorValue(mainColorName);
            const subColorValue = this.getColorValue(subColorName);

            return `
              <div>
                <div style="color: ${mainColorValue}; font-size: var(--font-size-p, 20px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${text}</div>
                <div style="color: ${subColorValue}; font-size: var(--font-size-caption,18px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${subtext}</div>
              </div>
            `;
          };
          break;
        case 'badge':
          renderFunction = (value: string | { text: string; themeColor?: string; icon?: string }) => {
            let text = '';
            let themeColor = '';
            let icon = '';

            if (typeof value === 'object' && value !== null && 'text' in value) {
              text = value.text;
              themeColor = value.themeColor || '';
              icon = value.icon || '';
            } else {
              text = String(value ?? '');
            }

            const iconTemplate = icon ? `<ssk-icon name="${icon}" size="sm"></ssk-icon>` : '';

            return `<ssk-badge variant="subtle" size="sm" themeColor="${themeColor}">${iconTemplate}${text}</ssk-badge>`;
          };
          break;
        case 'action-icon':
            renderFunction = (value: any, _record: any, _rowIndex: any) => {
              const columnIconConfig = (column as any).icon;
              const rowIconConfig = (typeof value === 'object' && value !== null) ? value : null;
              const iconName = rowIconConfig?.name || columnIconConfig?.name || '';
              const iconThemeColor = rowIconConfig?.color || columnIconConfig?.color;

              return `<ssk-icon name="${iconName}" size="lg" themeColor="${iconThemeColor}" style="cursor: pointer;"></ssk-icon>`;
            };

            config[column.dataIndex] = {
              render: renderFunction,
              onClick: (_value: any, record: any, rowIndex: any) => this.handleActionIconClick(record, rowIndex)
          };
          return;
      }
      if (renderFunction) {
        config[column.dataIndex] = { render: renderFunction };
      }
    });

    return config;
  }

  render() {
    const imgTable = this.emptyImage || '/Blank.svg'; 
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

    const subtextDisplay = html`
      <ssk-text size="md" color="gray.500">
        <div class="subtext-wrapper">${this.renderSubText()}</div>
      </ssk-text>
    `;

    const subTextTemplate = this.isSubtextClamped
      ? html`
          <ssk-tooltip size="sm" hideclosebutton themecolor="black" color="white">
            ${subtextDisplay}
            <div slot="content" style="width: 300px; padding: 0px 8px; white-space: normal; overflow-wrap: break-word;">
              <ssk-text color="white" size="sx">${this.renderSubText()}</ssk-text>
            </div>
          </ssk-tooltip>
        `
      : subtextDisplay;

    const hasColumns = this.tableColumns && this.tableColumns.length > 0;
    const hasDataRows = this.internalTableData && this.internalTableData.length > 0;

    const tableContent = hasDataRows
      ? html`
          <ssk-table
            themecolor="gray.50"
            .columns=${this.processedColumns}
            .data=${this.internalTableData}
            .customCell=${this.customCellConfig}
            .totalPaginationPages=${this.totalItems}
            .currentPage=${this.currentPage}
            .rowsPerPage=${this.rowsPerPage}
            @load-data=${this.handleLoadDataTable}
            ?showPaginationFooter=${true}
            ?showPageNavigation=${true}
            .maxVisiblePageButtons=${this.maxVisiblePageButtons} 
          >
          </ssk-table>
        `
      : html`
        <ssk-table
          themecolor="gray.50"
          .columns=${this.processedColumns}
          .data=${this.internalTableData}
          .customCell=${this.customCellConfig}
          ?showPaginationFooter=${false}
          ?showPageNavigation=${false}
          .maxVisiblePageButtons=${this.maxVisiblePageButtons} 
          >
          <div slot="empty-content">
            <div class="content">
              <img src="${imgTable}" alt="No data available" class="empty-image"/>
            </div>
          </div>
        </ssk-table>
      `


    return html`
      <div class="container" style=${styleMap(this.getContainerStyles())} data-testid=${this.testId || nothing}>
      
      <div class="widget-style">
        <div class="widget-item-left">
            <div class="header-top-row">
                <div class="title-container">
                    ${this.renderTextWithTooltip(this.renderLabelText(), 'title-wrapper', this.isLabelClamped, 'xl', 'gray.800', 'bold')}
                </div>
                
                ${this.showBadge ? html`
                  <ssk-badge
                      variant="subtle"
                      size="sm"
                      themecolor="${this.badgeColor}">
                          <ssk-icon
                              name="${this.badgeIcon}"
                              themeColor="${this.badgeColor}"
                              size="sm"
                          ></ssk-icon>
                          <label>${this.renderBadgeText()}</label>
                  </ssk-badge>
              ` : nothing}
            </div>
            <div class="subtext-container">
                ${this.showDescription ? subTextTemplate : nothing}
            </div>
        </div>
            <div class="widget-item-right">
                ${this.showButtonIcon ? html`<div>${mainButtonTemplate}</div>` : nothing}
            </div>
      </div>
        <div class="table-style">
          ${hasColumns ? tableContent : nothing}
        </div>
      </div>
    `;
  }

  static styles = css`
    .container {
      background: var(--bg-primary, #ffffff);
      border: 1px solid var(--stroke-primary, #e5e7eb);
      border-radius: var(--radius-md, 8px);
      height: 672px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }
    .widget-style {
      display: flex;
      gap: 16px;
      align-items: center;
      padding: 24px;
    }
    .widget-item-left { 
      display: flex; 
      min-width: 0; 
      flex: 1; 
      flex-direction: column;
      align-items: flex-start;
    }
    .header-top-row {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }
    .title-container {
      min-width: 0;
    }
    .header-top-row ssk-badge {
      flex-shrink: 0;
    }
    .subtext-container {
      width: 100%;
      min-width: 0;
    }
    .widget-item-right { 
      margin-left: auto; 
    }
    .text-content { 
      min-width: 0;
      flex: 1;
    }
    .title-wrapper, .subtext-wrapper {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.2;
    }
    .table-style {
      padding: 0;
      box-sizing: border-box;
      width: 100%;
      flex: 1;
      min-height: 0;
    }
    .table-style ssk-table {
      --height-table: 408px;
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 500px;
      background-color: var(--bg-primary, #ffffff);
    }
  .truncate-cell-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
  }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'ssk-widget-table': WidgetTable
  }
}

if (!customElements.get("ssk-widget-table")) {
  customElements.define("ssk-widget-table", WidgetTable);
}
