import Croppie from "croppie";
import "croppie/croppie.css";
import { LitElement, css, html } from "lit";
import { property, state } from "lit/decorators.js";

export class ImageCropper extends LitElement {
  @property({ type: String }) src = "";
  @property({ type: Number }) maskSize = 200;
  @property({ type: Number }) maskPadding = 20;
  @property({ type: Number }) maxExportSize?: number;
  @property({ type: Boolean }) fitToMask = false;

  private croppieInstance?: Croppie;
  @state() private containerId = `croppie-${Math.random()
    .toString(36)
    .substring(2, 10)}`;

  createRenderRoot() {
    return this; // Use light DOM so Croppie CSS works
  }

  render() {
    return html`<div class="crop-container">
      <div id="${this.containerId}"></div>
    </div>`;
  }

  updated() {
    if (this.croppieInstance) {
      this.croppieInstance.destroy();
    }

    const el = this.querySelector(`#${this.containerId}`) as HTMLElement;
    if (!el || !this.src) return;

    const size = this.maskSize;

    this.croppieInstance = new Croppie(el, {
      viewport: {
        width: size,
        height: size,
        type: "circle",
      },
      boundary: {
        width: size + this.maskPadding * 2,
        height: size + this.maskPadding * 2,
      },
      showZoomer: false,
      enableZoom: true,
      enableResize: false,
      enableOrientation: false,
      enforceBoundary: true,
    });

    this.croppieInstance.bind({ url: this.src }).then(() => {
      if (!this.fitToMask) return;
      const img = el.querySelector("img") as HTMLImageElement;
      if (!img?.naturalWidth || !img?.naturalHeight) return;

      // Calculate zoom to fill the mask
      const scaleX = size / img.naturalWidth;
      const scaleY = size / img.naturalHeight;
      const zoom = Math.max(scaleX, scaleY);

      this.croppieInstance!.setZoom(zoom);
    });
  }

  public async crop(
    format: "jpeg" | "png" | "webp" = "png"
  ): Promise<string | null> {
    if (!this.croppieInstance) return null;

    // First, get result at natural Croppie crop size (no override)
    const base64 = await this.croppieInstance.result({
      type: "base64",
      format,
      circle: false,
      size: "original", // get the viewport crop size as-is
    });

    // If no scaling needed
    if (!this.maxExportSize) return base64 as string;

    // Resize manually using canvas
    const img = new Image();
    img.src = base64 as string;
    await img.decode();

    const maxSize = this.maxExportSize;
    let { width, height } = img;

    if (width > maxSize || height > maxSize) {
      const scale = maxSize / Math.max(width, height);
      width = Math.floor(width * scale);
      height = Math.floor(height * scale);
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, width, height);

    return canvas.toDataURL(`image/${format}`);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.croppieInstance?.destroy();
  }

  static styles = css`
    :host {
      display: block;
    }
    .crop-container {
      overflow: hidden;
      height: 100%;
    }
  `;
}

if (!customElements.get("ssk-image-cropper")) {
  customElements.define("ssk-image-cropper", ImageCropper);
}
