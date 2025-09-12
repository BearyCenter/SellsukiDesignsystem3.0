import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";



export type StyleCard = "outlined" | "elevated";
export type TypeCard = "stacked" | "horizontal";

@customElement("ssk-card")
export class Card extends LitElement {
  static registeredName = "ssk-card";
  // BaseAttributes
  @property({ type: String })
  testId?: string;


  @property({ type: String })
  title: string = "";
  @property({ type: String })
  subTitle: string | undefined;
  @property({ type: String })
  description: string | undefined;
  @property({ type: String })
  productImage: string | undefined;

  @property({ type: String }) 
  icons = "";

  
  // Layout props
  @property({ type: String })
  type: TypeCard = "stacked";
  @property({ type: String })
  styleCard: StyleCard = "outlined";
  @property({ type: String }) 
    width = "280px";
  @property({ type: String }) 
    height = "auto";
  @property({ type: Boolean }) 
    loading = false;


  render() {

    const contentSlotExists = this.querySelector('[slot="content"]');
    this.style.setProperty("--card-width", this.width);

    

    if (this.loading) {
      return html`
        <div class="card ${this.styleCard}" data-testid=${this.testId || nothing} style="--card-width: ${this.width}">
            ${this.type === "stacked" ? html`
            <div class="card-content ${this.type}">
                <div class="media-section ${this.type}">
                    <ssk-skeleton skeletonShape="square" width="100%" height="210px"></ssk-skeleton>
                </div>
                <div class="content-section ${this.type}">
                    <div class="content-section-header ${this.type}">
                        <ssk-skeleton  width="70%" height="24px"></ssk-skeleton>
                    </div>
                    <div class="content-section-price ${this.type}">
                        <ssk-skeleton  width="100%" height="24px"></ssk-skeleton>
                    </div>
                </div>
                <div class="content-slot">
                    <ssk-skeleton  width="100%" height="24px"></ssk-skeleton>
                </div>
            </div>
            ` : html`
            <div class="card-content ${this.type}">
                <div class="icons">
                    <ssk-skeleton  width="24px" height="24px"></ssk-skeleton>
                </div>
                <div class="media-section ${this.type}">
                    <ssk-skeleton skeletonShape="square" width="56px" height="56px"></ssk-skeleton>
                </div>
                <div class="content-section ${this.type}">
                    <div class="content-section-header ${this.type}">
                        <ssk-skeleton  width="100%" height="20px"></ssk-skeleton>
                    </div>
                    <div class="content-section-price ${this.type}">
                        <ssk-skeleton  width="50%" height="20px"></ssk-skeleton>
                    </div>
                </div>
                <div class="content-slot">
                    <ssk-skeleton  width="100%" height="24px"></ssk-skeleton>
                </div>
            </div>
            `}
        </div>
      `;
    }
    
    return html`
      <div class="card ${this.styleCard}" data-testid=${this.testId || nothing} style="--card-width: ${this.width}">
        ${this.type === "stacked" ? html`
          <div class="card-content ${this.type}">
              <div class="media-section ${this.type}">
                  ${this.productImage ? html`
                  <img src="${this.productImage}" alt="${this.title || ''}" />
                  ` : html`
                  <div class="image-placeholder ${this.type}"></div>
                  `}
              </div>
              <div class="content-section ${this.type} ">
                      <div class="content-section-header ${this.type}">
                          <ssk-text size="sm">
                          <span class="content-section-text">${this.title}</span>
                          </ssk-text>
                      </div>
                      <div class="content-section-price ${this.type}">
                          <ssk-text color="aerospace-orange.500" size="md">${this.subTitle}</ssk-text>
                      </div>
              </div>
                  ${contentSlotExists ? html`<slot name="content"></slot>` : nothing}
          </div>
          ` : html`
          <div class="card-content ${this.type}">
              <div class="icons">
                  <slot name="${this.icons}"></slot>
              </div>

              <div class="media-section ${this.type}">
                  ${this.productImage ? html`
                  <img src="${this.productImage}" alt="${this.title || ''}" />
                  ` : html`
                  <div class="image-placeholder ${this.type}"></div>
                  `}
                  </div>
              <div class="content-section ${this.type}">
                  <div class="icons">
                      <slot name="icon"></slot>
                  </div>
                  <div class="content-section-header ${this.type}">
                      <ssk-text size="sm"> <span class="content-section-text">${this.title}</span></ssk-text>
                  </div>
                  <div class="content-section-price ${this.type}">
                      <ssk-text size="xs" color="gray.500">${this.description}</ssk-text>
                  </div>
                  <div class="content-section-description ${this.type}">
                      <ssk-text color="aerospace-orange.500" size="md">${this.subTitle}</ssk-text>
                  </div>
                  
              </div>
              <div class="content-slot">
                  ${contentSlotExists ? html`<slot name="content"></slot>` : nothing}
              </div>
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
      border: 1px solid var(--ssk-colors-gray-300);
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

    .content-section-text {
      white-space: pre-wrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    
    /* --- stacked layout --- */

    .card-content.stacked {
      width: 100%;
    display: flex;
    flex-direction: column;
    }

      .media-section.stacked {
    width: 100%;
    }

    .media-section.stacked img {
    aspect-ratio: 4 / 3;
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;   
    border-radius: 8px 8px 0 0;
    }

    .image-placeholder.stacked {
    aspect-ratio: 4 / 3;
    width: 100%;
    height: auto;
    background-color: #E5E7EB;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px 8px 0 0;
    }


    .content-section.stacked {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 16px 12px;
      height: 100%;
    }

    .content-section-header.stacked {
    align-items: center;
    }

    .content-section-price.stacked {
    align-items: center;
    }
    
    /* --- Horizontal layout --- */

    .card-content.horizontal {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
        padding: 10px 12px;
      
    }
    .content-section.horizontal {
      width: 100%;
    }

    .media-section.horizontal {
    width: 56px;
    height: 56px;
    overflow: hidden;
    flex-shrink: 0;
    }

    .media-section.horizontal img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    }

    .image-placeholder.horizontal {
    width: 100%;
    height: 100%;
    background-color: #E5E7EB;
    display: flex;
    align-items: center;
    justify-content: center;
    }

    .content-section-header.horizontal {
    margin-bottom: 4px;
    align-items: center;
    }
    .content-section-description.horizontal {
    margin-bottom: 4px;
    align-items: center;
    }

    .content-section-price.horizontal {
    align-items: center;
    }
  
  `;
}
  declare global {
    interface HTMLElementTagNameMap {
      "ssk-card": Card;
    }
  }

