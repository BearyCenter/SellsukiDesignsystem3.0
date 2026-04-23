import { LitElement, css, html, nothing } from "lit"; 
import { property } from "lit/decorators.js"; 
import { Size } from "../../types/theme";  

export class Skeleton extends LitElement {   
  static registeredName = "ssk-skeleton";    

  @property({ type: String })
  testId?: string;

  @property({ type: String })
  skeletonShape: "capsule" | "circle" | "square" = "capsule";    

  @property({ type: String })
  size?: Size;

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
        class="skeleton-item ${this.skeletonShape} ${this.size}"
        style="width: ${dynamicStyles.width}; height: ${dynamicStyles.height}; --skeleton-animation-duration: ${durationInSeconds}s;"
        data-testid=${this.testId || nothing}
      >
        ${this.renderSkeletonContent()}
      </div>
    `;
  }

  private getSizeWidth(): string {
    const sizeWidths = {
      '3xs': '8px',
      '2xs': '16px',
      'xs': '20px',
      'md': '24px',
      'xl': '32px',
      '2xl': '40px',
      '3xl': '48px',
      '4xl': '56px',
      '5xl': '64px',
      '6xl': '72px',
      '7xl': '80px',
      '8xl': '96px',
      '9xl': '128px'
    };
    return this.size ? sizeWidths[this.size as keyof typeof sizeWidths] : '24px';
  }

  private getSizeHeight(): string {
    const sizeHeights = {
      '3xs': '8px',
      '2xs': '16px',
      'xs': '20px',
      'md': '24px',
      'xl': '32px',
      '2xl': '40px',
      '3xl': '48px',
      '4xl': '56px',
      '5xl': '64px',
      '6xl': '72px',
      '7xl': '80px',
      '8xl': '96px',
      '9xl': '128px'
    };
    return this.size ? sizeHeights[this.size as keyof typeof sizeHeights] : '24px';
  }

  private renderSkeletonContent() {
    switch (this.skeletonShape) {
      case 'circle':
        return html`<div class="circle-content"></div>`;
      case 'square':
        return html`<div class="square-content"></div>`;
      case 'capsule':
      default:
        return html`<div class="capsule-content"></div>`;
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

    .circle {
      border-radius: 50%;
    }

    .square {
      border-radius: 4px;
    }

    .capsule {
      border-radius: 999px;
    }

    .circle-content,
    .square-content,
    .capsule-content {
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

if (!customElements.get("ds-skeleton")) {
  customElements.define("ds-skeleton", Skeleton);
}
if (!customElements.get("ssk-skeleton")) {
  customElements.define("ssk-skeleton", class extends Skeleton {});
}
