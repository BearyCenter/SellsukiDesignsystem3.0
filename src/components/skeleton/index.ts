import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { SkeletonSize } from "../../types/theme";

@customElement("ssk-skeleton")
export class Skeleton extends LitElement {
  static registeredName = "ssk-skeleton";

  @property({ type: String })
  skeletonShape: "rectangle" | "circle" | "square" = "rectangle";

  @property({ type: String })
  skeletonSize: SkeletonSize = "md";

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

    /* Size definitions */
    .xs3 {
      height: 8px;
      width: 8px;
    }
    .xs2 {
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
    .xl2 {
      height: 40px;
      width: 40px;
    }
    .xl3 {
      height: 48px;
      width: 48px;
    }
    .xl4 {
      height: 56px;
      width: 56px;
    }
    .xl5 {
      height: 64px;
      width: 64px;
    }
    .xl6 {
      height: 72px;
      width: 72px;
    }
    .xl7 {
      height: 80px;
      width: 80px;
    }
    .xl8 {
      height: 96px;
      width: 96px;
    }
    .xl9 {
      height: 128px;
      width: 128px;
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
      min-width: 332px;
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