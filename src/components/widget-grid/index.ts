import { LitElement, css, html, unsafeCSS } from 'lit'
import { property } from 'lit/decorators.js'
import { GridStack, GridStackElement } from 'gridstack'
import gridstackStyles from 'gridstack/dist/gridstack.min.css?inline'

import { Widget } from '../../types/widget'

export interface GridItem {
  id: number
  x: number
  y: number
  w?: number
  h?: number
  content?: string
}

export class WidgetGrid extends LitElement {
  static registeredName = 'ds-widget-grid'

  @property({ type: String })
  testId?: string

  @property({ type: Boolean, attribute: 'draggable' })
  draggable = true

  @property({ type: String, attribute: 'gap' })
  gap = '16px'

  @property({ type: Number, attribute: 'grid-item-size' })
  gridItemSize = 88

  @property({ type: Number, attribute: 'max-columns' })
  maxColumns = 12

  @property({ type: Array })
  items: GridItem[] = []

  private _slottedChildren: Node[] = []
  private _grid: GridStack | null = null

  constructor() {
    super()
    this._slottedChildren = [...this.childNodes]
  }

  static styles = [
    css`
      :host { display: block; }
      .grid-stack { width: var(--grid-width); }
      .grid-stack > .grid-stack-item > .grid-stack-item-content {
        overflow: visible !important;
      }
    `,
    unsafeCSS(gridstackStyles),
  ]

  firstUpdated() {
    this._slottedChildren = [...this.childNodes]
    const gridEl = this.renderRoot?.querySelector('.grid-stack') as GridStackElement | undefined
    if (gridEl) {
      this._grid = GridStack.init(
        {
          float: false,
          column: this.maxColumns,
          cellHeight: this.gridItemSize,
          margin: 16,
        },
        gridEl
      )

      this._grid.on('change', (_: Event, items: unknown) => {
        this.dispatchEvent(new CustomEvent('grid-change', {
          detail: { items },
          bubbles: true,
          composed: true,
        }))
      })
    }

    if (!this.draggable) {
      this._grid?.disable()
    }

    const gridRoot = this.renderRoot.querySelector('.grid-stack')
    gridRoot?.replaceChildren()

    this._slottedChildren.forEach((child) => {
      if (!(child instanceof HTMLElement)) return
      try {
        const size = (child as unknown as Widget).getSize()
        const gridItem = document.createElement('div')
        gridItem.className = 'grid-stack-item'
        gridItem.setAttribute('gs-x', child.getAttribute('x') ?? '0')
        gridItem.setAttribute('gs-y', child.getAttribute('y') ?? '0')
        gridItem.setAttribute('gs-w', size[0] ?? '1')
        gridItem.setAttribute('gs-h', size[1] ?? '1')
        gridItem.setAttribute('gs-no-resize', 'true')
        const gridContent = document.createElement('div')
        gridContent.className = 'grid-stack-item-content'
        gridContent.appendChild(child)
        gridItem.appendChild(gridContent)
        this._grid?.makeWidget(gridItem)
      } catch {
        // widget doesn't implement Widget interface — skip
      }
    })
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties)
    if (changedProperties.has('draggable') && this._grid) {
      if (this.draggable) {
        this._grid.enable()
      } else {
        this._grid.disable()
      }
    }
  }

  render() {
    const width = this.gridItemSize * this.maxColumns
    return html`
      <div
        class="grid-stack"
        data-testid=${this.testId ?? ''}
        style="--grid-width: ${width}px"
      ></div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-widget-grid': WidgetGrid
    'ssk-widget-grid': WidgetGrid
  }
}

if (!customElements.get('ds-widget-grid')) { customElements.define('ds-widget-grid', WidgetGrid) }
if (!customElements.get('ssk-widget-grid')) { customElements.define('ssk-widget-grid', WidgetGrid) }
