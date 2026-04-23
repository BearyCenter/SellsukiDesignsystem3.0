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

export class WidgetTable extends LitElement implements Widget, ThemeValue {
  static registeredName = 'ssk-widget-table'

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme

  @property({ type: String }) size: Size = 'md'
  @property({ type: String }) color?: ColorRole | ColorName
  @property({ type: String }) margin?: string | undefined
  @property({ type: String }) padding?: Size
  @property({ type: String }) gap?: string | undefined = 'md'
  @property({ type: String }) testId?: string
  @property({ type: String }) fontFamilyGroup: FontFamilyGroup = 'sans'
  @property({ type: String }) fontWeight: FontWeight = 'normal'
  @property({ type: String }) fontSize?: string | undefined

  @property({ type: String }) widgetWidth: string = '8'
  @property({ type: String }) widgetHeight: string = '8'

  private defaultWidth = '8'
  private defaultHeight = '8'

  @property({ type: String }) label = "";
  @property({ type: String }) description = "";
  @property({ type: String }) badgeText = "";
  @property({ type: String }) badgeColor = "success";
  @property({ type: String }) badgeIcon = "";
  @property({ type: Boolean }) showBadge = false;
  @property({ type: Boolean }) showDescription = false;

  @property({ type: String }) buttonColor = "primary";
  @property({ type: String }) buttonVariant = "outline";
  @property({ type: String }) buttonIcon = "";
  @property({ type: String }) buttonText = "";
  @property({ type: Boolean }) disabledButton = false;
  @property({ type: Boolean }) showButtonIcon = false;

  @property({ type: Array }) public tableColumns: any[] = [];
  @property({ type: Array }) public tableData: any[] = [];
  @property({ type: Number }) totalItems = 0;
  @property({ type: Number }) currentPage = 1;
  @property({ type: Number }) rowsPerPage = 10;

  @property({ type: String }) emptyImage = '';

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

            return `<div style="color: ${finalColor}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 24px;">${text}</div>`;
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
                <div style="color: ${mainColorValue}; font-size: 24px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${text}</div>
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
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
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
      background-color: #ffffff;
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

if (!customElements.get("ds-widget-table")) {
  customElements.define("ds-widget-table", WidgetTable);
}
if (!customElements.get("ssk-widget-table")) {
  customElements.define("ssk-widget-table", class extends WidgetTable {});
}
