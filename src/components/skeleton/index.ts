import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Size, SkeletonSize } from "../../types/theme";

@customElement("ssk-skeleton")
export class Skeleton extends LitElement {
  static registeredName = "ssk-skeleton";

  @property({ type: String })
  skeletonShape: "rectangle" | "circle" | "square" = "rectangle";

  @property({ type: String })
  skeletonSize: SkeletonSize = "xs";


    // private skeletonSize: Record<SkeletonSize, Size> = {
    //   "3xs": "3xs",
    //   "2xs": "2xs",
    //   xs: "xs",
    //   md: "md",
    //   xl: "xl",
    //   "2xl": "2xl",
    //   "3xl": "3xl",
    //   "4xl": "4xl",
    //   "5xl": "5xl",
    //   "6xl": "6xl",
    //   "7xl": "7xl",
    //   "8xl": "8xl",
    //   "9xl": "9xl",
    // };

  render() {
    return html`
      <div 
        class="skeleton-item ${this.skeletonShape} ${this.skeletonSize}"
      >
        ${this.renderSkeletonContent()}
      </div>
    `;
  }

  private renderSkeletonContent() {
    switch (this.skeletonShape) {
      case 'circle':
        return html`<div class="circle-content"></div>`;
      case 'square':
        return html`<div class="square-content"></div>`;
      case 'rectangle':
      default:
        return html`<div class="rectangle-content"></div>`;
    }
  }

  static styles = css`
    .skeleton-item {
      position: relative;
      overflow: hidden;
      background-color: #e0e0e0;
    }

    .skeleton-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg, 
        transparent, 
        rgba(255, 255, 255, 0.3), 
        transparent
      );
      animation: loading 1.5s infinite;
    }

    @keyframes loading {
      0% {
        left: -100%;
      }
      100% {
        left: 100%;
      }
    }

    .circle {
      border-radius: 50%;
      width: 100%;
      max-width: 80px;
    }

    .square {
      border-radius: 4px;
      width: 100%;
    }

    .rectangle {
      border-radius: 999px;
      min-width: 332px;
      width: 100%;
    }

    /* Size definitions */
    .3xs { 
      height: 8px;
      width: 8px;
    }
    .2xs { 
      height: 16px; 
      width: 16px;
    }
    .xs { 
      height: 20px; 
      width: 20px;
    }
    .md { 
      height: 24px; 
      width: 24px;
    }
    .xl { 
      height: 32px; 
      width: 32px;
    }
    .2xl { 
      height: 40px; 
      width: 40px;
    }
    .3xl { 
      height: 48px;
      width: 48x;}
    .4xl { 
      height: 56px;
      width: 56x;
      }
    .5xl { 
      height: 64px;
      width: 64px;
    }
    .6xl { 
      height: 72px;
      width: 72px;
    }
    .7xl { 
      height: 80px; 
      width: 80px;
    }
    .8xl { 
      height: 96px;
      width: 96px;
    }
    .9xl { 
      height: 128px;
      width: 128px;
    }

    .circle-content, 
    .square-content, 
    .rectangle-content {
      width: 100%;
      height: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-skeleton": Skeleton;
  }
}