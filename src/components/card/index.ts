import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Size } from "../../types/theme";



export type StyleCard = "outlined" | "elevated";
export type TypeCard = "stacked" | "horizontal";

@customElement("ssk-card")
export class Card extends LitElement {
  static registeredName = "ssk-card";
  // BaseAttributes
  @property({ type: String })
  testId?: string;


  @property({ type: String })
  productName: string | undefined;
  @property({ type: String })
  productPrice: string | undefined;
  @property({ type: String })
  productImage: string | undefined;
  @property({ type: String }) 
  icons = "";



  //นเขียนขึ้นมาก่อนเพราะไม่แน่ใจว่าตรง slot สามารถใส่ อะไรเข้าไปได้บ้าง
  @property({ type: String })
  productDescription: string | undefined;
  @property({ type: String })
  productCategory: string | undefined;
  @property({ type: String })
  productStock: string | undefined;
  // Layout props
  @property({ type: String })
  type: TypeCard = "stacked";
  @property({ type: String })
  styleCard: StyleCard = "outlined";
  @property({ type: String })
  size: Size = "md";
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
                        <ssk-skeleton size=${this.size} width="70%" height="24px"></ssk-skeleton>
                    </div>
                    <div class="content-section-price ${this.type}">
                        <ssk-skeleton size=${this.size} width="100%" height="24px"></ssk-skeleton>
                    </div>
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
                        <ssk-skeleton size=${this.size} width="100%" height="20px"></ssk-skeleton>
                    </div>
                    <div class="content-section-price ${this.type}">
                        <ssk-skeleton size=${this.size} width="50%" height="20px"></ssk-skeleton>
                    </div>
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
                  <img src="${this.productImage}" alt="${this.productName || ''}" />
                  ` : html`
                  <div class="image-placeholder ${this.type}"></div>
                  `}
              </div>
              <div class="content-section ${this.type}">
                      <div class="content-section-header ${this.type}">
                          <ssk-text size=${this.size}>${this.productName}</ssk-text>
                      </div>
                      <div class="content-section-price ${this.type}">
                          <ssk-text size=${this.size}>${this.productPrice}</ssk-text>
                      </div>
              </div>
                  ${contentSlotExists ? html`<slot name="content"></slot>` : nothing}
          </div>
          ` : html`
          <div class="card-content ${this.type}">
              <div class="icons">
                  <slot name="icon"></slot>
              </div>

              <div class="media-section ${this.type}">
                  ${this.productImage ? html`
                  <img src="${this.productImage}" alt="${this.productName || ''}" />
                  ` : html`
                  <div class="image-placeholder ${this.type}"></div>
                  `}
                  </div>
              <div class="content-section ${this.type}">
                  <div class="icons">
                      <slot name="icon"></slot>
                  </div>
                  <div class="content-section-header ${this.type}">
                      <ssk-text size=${this.size}>${this.productName}</ssk-text>
                  </div>
                  <div class="content-section-description ${this.type}">
                      <ssk-text size=${this.size}>${this.productDescription}</ssk-text>
                  </div>
                  <div class="content-section-price ${this.type}">
                      <ssk-text size=${this.size}>${this.productPrice}</ssk-text>
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
      width: var(--card-width, 280px);
    }

    .card {
      background-color: #FFFFFF;
      border-radius: 8px;
      width: 100%;

    }
    .card.outlined {
      border: 1px solid var(--ssk-colors-gray-300);
      box-shadow: none;
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
      padding: 16px 12px;
      height: 100%;
    }

    .content-section-header.stacked {
    margin-bottom: 4px;
    align-items: center;
    }

    .content-section-price.stacked {
    display: flex
    justify-content: space-between;
    align-items: center;
    }
    
    /* --- Horizontal layout --- */

    .card-content.horizontal {
        display: flex !important;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    }
  
  `;
}
  declare global {
    interface HTMLElementTagNameMap {
      "ssk-card": Card;
    }
  }

