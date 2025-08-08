import { consume } from '@lit/context'
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { themeContext } from '../../contexts/theme'
import '../../elements/divider'
import '../../elements/icon'
import { GridStack, GridStackElement } from 'gridstack'
import gridstackStyles from 'gridstack/dist/gridstack.min.css?inline'
const gridstackSheet = new CSSStyleSheet()
gridstackSheet.replaceSync(gridstackStyles)

import { Theme, parseThemeToCssVariables } from '../../types/theme'

export interface GridItem {
  id: number
  x: number
  y: number
  w?: number
  h?: number
  content?: string
}

@customElement('ssk-grid-container')
export class Grid extends LitElement {
  static registeredName = 'ssk-grid-container'

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme

  @property({ type: String })
  testId?: string

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
    gridstackSheet,
    css`
      :host {
        display: block;
      }
      .grid-stack {
        width: var(--grid-width);
      }
    `
  ]
  firstUpdated() {
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

    const gridstackRoot = this.renderRoot.querySelector('.grid-stack')
    gridstackRoot?.replaceChildren()
    this.slottedChildren.forEach((child) => {
      if (child instanceof HTMLElement) {
        const myDiv = document.createElement('div')
        myDiv.className = 'grid-stack-item'
        myDiv.setAttribute('gs-x', child.getAttribute('gs-x') || '0')
        myDiv.setAttribute('gs-y', child.getAttribute('gs-y') || '0')
        myDiv.setAttribute('gs-w', child.getAttribute('gs-w') || '1')
        myDiv.setAttribute('gs-h', child.getAttribute('gs-h') || '1')
        myDiv.setAttribute('gs-no-resize', 'true')
        const contentDiv = document.createElement('div')
        contentDiv.className = 'grid-stack-item-content'
        contentDiv.appendChild(child)
        myDiv.appendChild(contentDiv)
        this.grid?.makeWidget(myDiv)
      }
    })
  }

  render() {
    const width = this.gridItemSize * this.maxColumns
    return html`
      ${parseThemeToCssVariables(
        this.theme?.components?.gridcontainer,
        ':host'
      )}
      <div class="grid-stack" style="--grid-width: ${width}px"></div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ssk-grid-container': Grid
  }
}
