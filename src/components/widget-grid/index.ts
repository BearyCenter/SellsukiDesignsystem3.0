import { consume } from '@lit/context'
import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { themeContext } from '../../contexts/theme'
import '../../elements/divider'
import '../../elements/icon'
import { GridStack, GridStackElement } from 'gridstack'
import gridstackStyles from 'gridstack/dist/gridstack.min.css?inline'

import { Theme, parseThemeToCssVariables } from '../../types/theme'
import { Widget } from '../../types/widget'

export interface GridItem {
  id: number
  x: number
  y: number
  w?: number
  h?: number
  content?: string
}

@customElement('ssk-widget-grid')
export class Grid extends LitElement {
  static registeredName = 'ssk-widget-grid'

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme

  @property({ type: String })
  testId?: string

  @property({ type: Boolean, attribute: 'draggable' })
  draggable = true;

  @property({ type: String, attribute: 'gap' })
  gap = '16px'

  @property({ type: Number, attribute: 'grid-item-size' })
  gridItemSize = 88

  @property({ type: Number, attribute: 'max-columns' })
  maxColumns = 12

  @property({ type: Array })
  items: GridItem[] = []

  slottedChildren: Node[] = []

  constructor() {
    super()
    this.slottedChildren = [...this.childNodes]
  }

  private grid: GridStack | null = null

  static styles = [
    css`
      :host {
        display: block;
      }
      .grid-stack {
        width: var(--grid-width);
      }

      .grid-stack > .grid-stack-item > .grid-stack-item-content {
        overflow: visible !important;
      }
    `,
    unsafeCSS(gridstackStyles)
  ]

  firstUpdated() {
    this.slottedChildren = [...this.childNodes]
    const grid = this.renderRoot?.querySelector('.grid-stack') as
      | GridStackElement
      | undefined
    if (grid) {
      this.grid = GridStack.init(
        {
          float: false,
          column: this.maxColumns,
          cellHeight: this.gridItemSize,
          margin: 16
        },
        grid
      )
    }

    if (!this.draggable) {
      this.grid?.disable();
    }

    const gridstackRoot = this.renderRoot.querySelector('.grid-stack')
    gridstackRoot?.replaceChildren()
    this.slottedChildren.forEach((child) => {
      if (child instanceof HTMLElement) {
        try {
          let size = (child as unknown as Widget).getSize()
          const gridItem = document.createElement('div')
          gridItem.className = 'grid-stack-item'
          gridItem.setAttribute('gs-x', child.getAttribute('x') || '0')
          gridItem.setAttribute('gs-y', child.getAttribute('y') || '0')
          gridItem.setAttribute('gs-w', size[0] || '1')
          gridItem.setAttribute('gs-h', size[1] || '1')
          gridItem.setAttribute('gs-no-resize', 'true')
          const gridContent = document.createElement('div')
          gridContent.className = 'grid-stack-item-content'
          gridContent.appendChild(child)
          gridItem.appendChild(gridContent)
          this.grid?.makeWidget(gridItem)
        } catch (e) {}
      }
    })
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('draggable') && this.grid) {
      if (this.draggable) {
        this.grid.enable();
      } else {
        this.grid.disable();
      }
    }
  }

  render() {
    const width = this.gridItemSize * this.maxColumns
    return html`
      ${parseThemeToCssVariables(
        this.theme?.components?.widgetgrid,
        ':host'
      )}
      <div class="grid-stack" style="--grid-width: ${width}px"></div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ssk-widget-grid': Grid
  }
}
