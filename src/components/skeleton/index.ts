import { LitElement, css, html, nothing } from "lit"; 
import { customElement, property } from "lit/decorators.js"; 
import { SkeletonSize } from "../../types/theme";  

@customElement("ssk-skeleton") 
export class Skeleton extends LitElement {   
  static registeredName = "ssk-skeleton";    

  @property({ type: String })
  testId?: string;

  @property({ type: String })
  skeletonShape: "rectangle" | "circle" | "square" = "rectangle";    

  @property({ type: String })
  skeletonSize?: SkeletonSize;

  @property({ type: String })
  width?: string;

  @property({ type: String })
  height?: string;

  @property({ type: Number })
  animationDuration: number = 800;

  render() {
    if (this.hidden) {
      return nothing;
    }

    const dynamicStyles = {
      width: this.width || this.getSizeWidth(),
      height: this.height || this.getSizeHeight(),
    };

    const durationInSeconds = this.animationDuration / 1000;

    return html`
      <div 
        class="skeleton-item ${this.skeletonShape} ${this.skeletonSize}"
        style="width: ${dynamicStyles.width}; height: ${dynamicStyles.height}; --skeleton-animation-duration: ${durationInSeconds}s;"
        data-testid=${this.testId || nothing}
      >
        ${this.renderSkeletonContent()}
      </div>
    `;
  }

  private getSizeWidth(): string {
    const sizeWidths = {
      'xs3': '8px',
      'xs2': '16px',
      'xs': '20px',
      'md': '24px',
      'xl': '32px',
      'xl2': '40px',
      'xl3': '48px',
      'xl4': '56px',
      'xl5': '64px',
      'xl6': '72px',
      'xl7': '80px',
      'xl8': '96px',
      'xl9': '128px'
    };
    return this.skeletonSize ? (sizeWidths[this.skeletonSize] || '24px') : '24px';
  }

  private getSizeHeight(): string {
    const sizeHeights = {
      'xs3': '8px',
      'xs2': '16px',
      'xs': '20px',
      'md': '24px',
      'xl': '32px',
      'xl2': '40px',
      'xl3': '48px',
      'xl4': '56px',
      'xl5': '64px',
      'xl6': '72px',
      'xl7': '80px',
      'xl8': '96px',
      'xl9': '128px'
    };
    return this.skeletonSize ? (sizeHeights[this.skeletonSize] || '24px') : '24px';
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
      animation: loading var(--skeleton-animation-duration, 0.8s) infinite;
    }

    @keyframes loading {
      0% {
        left: -100%;
      }
      100% {
        left: 100%;
      }
    }

    /* Shape specific styles */
    .circle {
      border-radius: 50%;
    }

    .square {
      border-radius: 4px;
    }

    .rectangle {
      border-radius: 999px;
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