import { LitElement, css, html, nothing } from "lit"; 
import { property } from "lit/decorators.js"; 
import { Size } from "../../types/theme";  

/**
 * Sellsuki Skeleton — DS 3.0
 *
 * Animated placeholder block that signals "content is loading" without
 * spinning. Three shapes — `capsule` (default, rounded line for text),
 * `circle` (avatar / icon), `square` (image / card thumbnail). Size via
 * the `size` token or explicit `width` + `height`; `animationDuration` is
 * milliseconds for one shimmer cycle.
 *
 * Reach for `<ssk-skeleton>` to reserve layout space before data arrives —
 * lists, cards, table rows. For indeterminate inline loading (button,
 * inside an icon spot) use `<ssk-spinner>`. Several built-in components
 * (`<ssk-card>`, `<ssk-expandable-card>`) already render their own
 * skeleton layout when `loading` is true.
 *
 * @example
 *   <ssk-skeleton skeletonShape="capsule" width="240px" height="20px"></ssk-skeleton>
 *   <ssk-skeleton skeletonShape="circle" size="lg"></ssk-skeleton>
 */
export class Skeleton extends LitElement {   
  static registeredName = "ssk-skeleton";    

  /**
   * Stable `data-testid` on the skeleton block for E2E/QA selectors. Useful
   * when asserting that a loading state mounted before data arrives.
   */
  @property({ type: String })
  testId?: string;

  /**
   * Geometry of the placeholder — `capsule` (default, rounded line for
   * text), `circle` (avatar / icon spot), or `square` (image / card
   * thumbnail with `radius-xs` corners).
   */
  @property({ type: String })
  skeletonShape: "capsule" | "circle" | "square" = "capsule";

  /**
   * Size token from the `Size` scale (`3xs` … `9xl`) — drives both width and
   * height from the lookup table. Leave unset and use explicit `width` /
   * `height` for non-square geometry (e.g. text lines).
   */
  @property({ type: String })
  size?: Size;

  /**
   * Explicit width as any CSS length (e.g. `"240px"`, `"60%"`). Overrides
   * the width derived from `size`. Pair with `height` for fully custom
   * dimensions.
   */
  @property({ type: String })
  width?: string;

  /**
   * Explicit height as any CSS length (e.g. `"20px"`, `"4rem"`). Overrides
   * the height derived from `size`.
   */
  @property({ type: String })
  height?: string;

  /**
   * Duration of one shimmer cycle in milliseconds. Defaults to `800` (a slow,
   * unhurried pulse); reduce for high-energy loading, increase for ambient
   * placeholders.
   */
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
      background-color: var(--bg-disabled, #e5e7eb);
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
      border-radius: var(--radius-xs, 4px);
    }

    .capsule {
      border-radius: var(--radius-full, 9999px);
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

if (!customElements.get("ssk-skeleton")) {
  customElements.define("ssk-skeleton", Skeleton);
}
