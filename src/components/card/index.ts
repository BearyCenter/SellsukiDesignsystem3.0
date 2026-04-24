import { LitElement, html, css, nothing } from "lit";
import { property } from "lit/decorators.js";
import { ColorName, ColorRole } from "../../types/theme";



export type VariantCard = "outlined" | "elevated";
export type TypeCard = "stacked" | "horizontal";

export class Card extends LitElement {
  static registeredName = "ssk-card";

  // BaseAttributes
  @property({ type: String })
  testId?: string;
  @property({ type: String })
  color?: ColorRole | ColorName = "aerospace-orange.500";
  
  // CardAttributes
  @property({ type: String })
  title: string = "";
  @property({ type: String })
  subtitle: string | undefined;
  @property({ type: String })
  description: string | undefined;
  @property({ type: String })
  image: string | undefined;


  
  // LayoutAttributes
  @property({ type: String })
  type: TypeCard = "stacked";
  @property({ type: String })
  variant: VariantCard = "outlined";
  @property({ type: String }) 
    width = "";
  @property({ type: Boolean }) 
    loading = false;


  render() {
    const contentSlotExists = this.querySelector('[slot="content"]');
    const iconSlotExists = this.querySelector('[slot="icon"]');
    const footerSlotExists = this.querySelector('[slot="footer"]');
    const hasContent = this.title || this.subtitle || this.description;
    const defaultWidth = this.width || (this.type === "horizontal" ? "376px" : "280px");
    this.style.setProperty("--card-width", defaultWidth);

    if (this.loading) {
      return html`
        <div class="card ${this.variant}" data-testid=${this.testId || nothing} style="--card-width: ${defaultWidth}">
            ${this.type === "stacked" ? html`
            <div class="card-content ${this.type}">
                <div class="card-media-section ${this.type}">
                    <ssk-skeleton skeletonShape="square" width="100%" height="210px"></ssk-skeleton>
                </div>
                <div class="skeleton-content-section ${this.type}">
                    <div class="card-skeleton-title ${this.type}">
                        <ssk-skeleton  width="70%" height="20px"></ssk-skeleton>
                    </div>
                    <div class="card-skeleton-subtitle ${this.type}">
                        <ssk-skeleton  width="94%" height="20px"></ssk-skeleton>
                    </div>
                </div>
            </div>
            ` : html`
            <div class="skeleton-card-content ${this.type}">
                <div class="card-media-section ${this.type}">
                    <ssk-skeleton skeletonShape="square" width="56px" height="56px"></ssk-skeleton>
                </div>
                <div class="skeleton-content-section ${this.type}">
                    <div class="card-skeleton-title ${this.type}">
                        <ssk-skeleton  width="65.4%" height="20px"></ssk-skeleton>
                    </div>
                    <div class="card-skeleton-subtitle ${this.type}">
                        <ssk-skeleton  width="29%" height="18px"></ssk-skeleton>
                    </div>
                </div>
            </div>
            `}
        </div>
      `;
    }
    
    return html`
      <div class="card ${this.variant}" data-testid=${this.testId || nothing} style="--card-width: ${defaultWidth}">
        ${this.type === "stacked" ? html`
          <div class="card-content ${this.type}">
              <div class="card-media-section ${this.type}">
                  ${this.image ? html`
                  <img src="${this.image}" alt="${this.title || ''}" />
                  ` : html`
                  <div class="card-image-placeholder ${this.type}"></div>
                  `}
              </div>
              ${hasContent ? html`
                <div class="content-section ${this.type} ">
                        <div class="card-title ${this.type}">
                            <ssk-text size="sm" style="width: 100%;">
                            <span class="card-text-section two-line">${this.title}</span>
                            </ssk-text>
                        </div>
                        <div class="card-subtitle ${this.type}">
                            <ssk-text color="${this.color}" size="md"> 
                              <span class="card-text-section one-line">${this.subtitle}</span>
                            </ssk-text>
                        </div>
                </div>
              ` : nothing}
              ${contentSlotExists ? html`<slot name="content"></slot>` : nothing}
          </div>
          ` : html`
          <div class="card-content ${this.type}">
              ${iconSlotExists ? html`
              <div class="icons">
                  <slot name="icon"></slot>
              </div>
              ` : nothing}

              <div class="card-media-section ${this.type}">
                  ${this.image ? html`
                  <img src="${this.image}" alt="${this.title || ''}" />
                  ` : html`
                  <div class="card-image-placeholder ${this.type}"></div>
                  `}
              </div>
              ${hasContent? html` 
                <div class="content-section ${this.type}">
                    <div class="card-title ${this.type}">
                        <ssk-text size="sm"  height="100%"> 
                          <span class="card-text-section two-line">${this.title}</span>
                        </ssk-text>
                    </div>
                    <div class="card-subtitle ${this.type}">
                        <ssk-text size="xs" color="gray.500"> 
                          <span class="card-text-section one-line">${this.description}</span>
                        </ssk-text>
                    </div>
                    <div class="card-description ${this.type}">
                        <ssk-text color="${this.color}" size="md">
                          <span class="card-text-section one-line">${this.subtitle}</span>
                        </ssk-text>
                    </div>
                </div>
              ` : nothing}
              ${contentSlotExists ? html`<slot name="content"></slot>` : nothing}
              ${footerSlotExists ? html`<slot name="footer"></slot>` : nothing}
              
          </div>
        `}
      </div>
    `;
  }

  static styles = css`

  :host {
      display: block;
    }

    .card {
      background-color: #FFFFFF;
      border-radius: 8px;
      width: var(--card-width);
    }

    .card.outlined {
      border: 1px solid var(--stroke-primary, #e5e7eb);
    }

    .card.elevated {
      border: none;
      box-shadow: 
         0px 1px 2px 0px #11182712,
         0px 3px 3px 0px #1118270D,
         0px 7px 4px 0px #11182708,
         0px 12px 5px 0px #11182703,
         0px 19px 5px 0px #11182700;

    }

    .card-text-section {
      white-space: pre-line;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      }

    .card-text-section.one-line {
      -webkit-line-clamp: 1;
    }

    .card-text-section.two-line {
      -webkit-line-clamp: 2;
    }



    /* --- stacked layout --- */

    .card-content.stacked {
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    .card-media-section.stacked {
      width: 100%;
    }

    .card-media-section.stacked img {
      aspect-ratio: 4 / 3;
      width: 100%;
      height: auto;
      object-fit: cover;
      display: block;   
      border-radius: 8px 8px 0 0;
    }

    .card-image-placeholder.stacked {
      aspect-ratio: 4 / 3;
      width: 100%;
      height: auto;
      background-color: var(--stroke-secondary, #d1d5db);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px 8px 0 0;
    }


    .content-section.stacked {
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 12px 16px;
      justify-content: space-between;
      flex: 1;
      min-height: 94px;
      box-sizing: border-box;
      width: 100%;
    }

    .card-title.stacked {
      display: flex;
      flex:1;
      align-items: center;
      width: 100%;
    }

    .card-subtitle.stacked {
      justify-content: center;
      width: 100%;
    }
    
    /* --- Horizontal layout --- */

    .card-content.horizontal {
      height: 122px;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 12px;
      padding:  12px 16px;
      box-sizing: border-box;
    }
    
    .icons {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      cursor: pointer;
    }
    
    .content-section.horizontal {
      width: 100%;
      height: 100%;
      flex-direction: column;
      justify-content: center;
      display: flex;
      gap: 4px;
      overflow: hidden;
    }

    .card-media-section.horizontal {
      width: 56px;
      height: 56px;
      overflow: hidden;
      flex-shrink: 0;
    }

    .card-media-section.horizontal img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
      box-sizing: border-box;
      border: 1px solid var(--stroke-primary, #e5e7eb);
    }

    .card-image-placeholder.horizontal {
      width: 100%;
      height: 100%;
      background-color: var(--stroke-secondary, #d1d5db);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      box-sizing: border-box;
      border: 1px solid var(--stroke-primary, #e5e7eb);
    }


    /* --- Skeleton layout stacked --- */

    .skeleton-content-section.stacked {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 16px 12px;
      height: 100%;
    }
    .card-skeleton-title.stacked {
      align-items: center;
    }
    .card-skeleton-subtitle.stacked {
      align-items: center;
    }

    /* --- Skeleton layout horizontal --- */

    .skeleton-card-content.horizontal {
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      min-height: 122px;
      box-sizing: border-box;
    }

    .skeleton-content-section.horizontal {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    
  `;
}
  declare global {
    interface HTMLElementTagNameMap {
      "ssk-card": Card;
    }
  }

if (!customElements.get("ssk-card")) {
  customElements.define("ssk-card", Card);
}
