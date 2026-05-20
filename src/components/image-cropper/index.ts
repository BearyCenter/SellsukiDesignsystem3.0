import Croppie from "croppie";
import "croppie/croppie.css";
import { LitElement, css, html } from "lit";
import { property, state } from "lit/decorators.js";

/**
 * Image cropper backed by Croppie — circle or square crop mask with
 * pinch/scroll zoom. Call `crop()` to extract the cropped base64 image.
 *
 * @fires ready - Fires after the image has loaded and Croppie has
 *   initialised (post-`bind`). Use this to enable a "Crop" button.
 *   `detail: undefined`.
 */
export class ImageCropper extends LitElement {
  static registeredName = "ssk-image-cropper";

  /**
   * Image source URL or data URI to be loaded into the cropper. Changing this
   * tears down the current Croppie instance and re-initialises with the new
   * image; listen for `ready` to know when the new image is ready to crop.
   */
  @property({ type: String }) src = "";
  /**
   * Crop mask shape — `circle` (default) for avatars or `square` for product
   * thumbnails. Changing this re-binds Croppie.
   */
  @property({ type: String }) shape: "circle" | "square" = "circle";
  /**
   * Mask side length in pixels (also the natural crop output size). Defaults
   * to `200`. Pair with `maxExportSize` to downscale on export.
   */
  @property({ type: Number, attribute: "mask-size" }) maskSize = 200;
  /**
   * Extra space (in px) around the mask inside the cropper boundary. Larger
   * padding gives users more room to drag and zoom. Defaults to `20`.
   */
  @property({ type: Number, attribute: "mask-padding" }) maskPadding = 20;
  /**
   * Optional ceiling for the longest edge of the exported image (in px).
   * When set, `crop()` resizes the result on a canvas to fit; leave unset to
   * export at native crop resolution.
   */
  @property({ type: Number, attribute: "max-export-size" }) maxExportSize?: number;
  /**
   * On `bind`, zoom in so the source image fills the mask completely. Useful
   * when source images are smaller than the mask. Defaults to `false`.
   */
  @property({ type: Boolean, attribute: "fit-to-mask" }) fitToMask = false;
  /**
   * Stable hook for end-to-end tests. Rendered as `data-testid` on the crop
   * container so Playwright / Cypress can locate it reliably.
   */
  @property({ type: String, attribute: "test-id" }) testId?: string;

  private croppieInstance?: Croppie;
  @state() private containerId = `croppie-${Math.random()
    .toString(36)
    .substring(2, 10)}`;

  createRenderRoot() {
    return this; // Use light DOM so Croppie CSS works
  }

  render() {
    return html`<div class="crop-container" data-testid=${this.testId ?? ""}>
      <div id="${this.containerId}"></div>
    </div>`;
  }

  updated(changed: Map<string, unknown>) {
    const reinitKeys = ["src", "shape", "maskSize", "maskPadding"];
    const needsReinit = reinitKeys.some(k => changed.has(k));
    if (!needsReinit) return;

    if (this.croppieInstance) {
      this.croppieInstance.destroy();
      this.croppieInstance = undefined;
    }

    const el = this.querySelector(`#${this.containerId}`) as HTMLElement;
    if (!el || !this.src) return;

    const size = this.maskSize;

    this.croppieInstance = new Croppie(el, {
      viewport: {
        width: size,
        height: size,
        type: this.shape,
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
      if (this.fitToMask) {
        const img = el.querySelector("img") as HTMLImageElement;
        if (img?.naturalWidth && img?.naturalHeight) {
          const scaleX = size / img.naturalWidth;
          const scaleY = size / img.naturalHeight;
          this.croppieInstance!.setZoom(Math.max(scaleX, scaleY));
        }
      }
      this.dispatchEvent(new CustomEvent("ready", { bubbles: true, composed: true }));
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

declare global {
  interface HTMLElementTagNameMap {
    "ssk-image-cropper": ImageCropper;
  }
}

if (!customElements.get("ssk-image-cropper")) {
  customElements.define("ssk-image-cropper", ImageCropper);
}
