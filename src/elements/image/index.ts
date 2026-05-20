import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { themeContext } from "../../contexts/theme";
import { ThemeValue } from "../../types/base-attributes";
import {
  ColorName,
  ColorRole,
  FontFamilyGroup,
  FontWeight,
  Size,
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";

/**
 * Sellsuki Image — DS 3.0
 *
 * Token-aware `<img>` wrapper. Accepts an `src`, optional `alt`, and the
 * standard sizing / radius / border tokens so images stay on-system
 * (consistent rounded corners, optional stroked frame, predictable
 * `object-fit` behavior).
 *
 * Reach for `<ssk-image>` for product photos, banners, illustrations.
 * For user / entity portraits prefer `<ssk-avatar>` (handles initials
 * fallback). For decorative colored tiles use `<ssk-misc-icon>`.
 *
 * @example
 *   <ssk-image src="/img/product.jpg" alt="กระเป๋าหนัง" rounded="md" width="240px"></ssk-image>
 *
 * @slot - Caption / overlay content (rare)
 * @csspart text - Optional caption element
 */
export class Image extends LitElement implements ThemeValue {
  static registeredName = "ssk-image";

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  /**
   * Brand accent — used for tinted border or fallback background. Falls back to the current
   * `--fg-brand-primary` from `<ssk-app-shell-provider>` brand context.
   */
  @property({ type: String })
  themeColor: ColorRole | ColorName = "";
  /**
   * Overlay caption / text color when slotted content is rendered above the image.
   */
  @property({ type: String })
  color?: ColorRole | ColorName;
  /**
   * Background color shown behind transparent PNGs / GIFs (any CSS color or palette token).
   */
  @property({ type: String })
  backgroundColor?: string | undefined;
  /**
   * Border color around the image frame (any CSS color or palette token). Pair with `borderWidth`.
   */
  @property({ type: String })
  borderColor?: string | undefined;

  /**
   * Sizing token used when explicit width/height aren't set — `xs`–`xl`.
   */
  @property({ type: String })
  size: Size = "md";
  /**
   * Inner padding token (`xs`–`xl`).
   */
  @property({ type: String })
  padding?: Size;
  /**
   * Caption font-size override (any CSS length). Avoid when possible — prefer slotted `<ssk-text>`.
   */
  @property({ type: String })
  fontSize?: string | undefined;
  /**
   * Caption line-height override (any CSS length / unitless number).
   */
  @property({ type: String })
  lineHeight?: string | undefined;
  /**
   * Gap between image and slotted caption (any CSS length).
   */
  @property({ type: String })
  gap?: string | undefined;
  /**
   * Border radius override (any CSS length). Defaults to `0px`; pass `"md"` / `"8px"` for rounded
   * product cards.
   */
  @property({ type: String })
  rounded?: string | undefined;
  /**
   * Outer margin (any CSS length). Prefer parent layout gap when possible.
   */
  @property({ type: String })
  margin?: string | undefined;

  // font
  /**
   * Font family group used by slotted caption text — `sans` (default) or `mono`.
   */
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  /**
   * Font weight token for slotted caption text. Defaults to `normal`.
   */
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  /**
   * Border width (any CSS length). Defaults to `0px` — set to draw a framed image.
   */
  @property({ type: String })
  borderWidth?: string | undefined;
  /**
   * CSS `border-style` — `solid` (default), `dashed`, `dotted`, etc.
   */
  @property({ type: String })
  borderStyle?:
    | "solid"
    | "dashed"
    | "dotted"
    | "double"
    | "groove"
    | "ridge"
    | "inset"
    | "outset"
    | "none"
    | "hidden"
    | undefined;

  /**
   * CSS `box-shadow` override — prefer DS 3.0 `--elevation-*` tokens via inline CSS for design-system rhythm.
   */
  @property({ type: String })
  boxShadow?: string | undefined;
  /**
   * CSS `filter: drop-shadow(...)` override — for soft shadows that follow transparent edges.
   */
  @property({ type: String })
  dropShadow?: string | undefined;
  /**
   * Explicit image width (any CSS length, e.g. `"240px"` or `"100%"`).
   */
  @property({ type: String })
  width?: string | undefined;
  /**
   * Explicit image height (any CSS length).
   */
  @property({ type: String })
  height?: string | undefined;
  /**
   * Minimum width constraint (any CSS length).
   */
  @property({ type: String })
  minWidth?: string | undefined;
  /**
   * Minimum height constraint (any CSS length).
   */
  @property({ type: String })
  minHeight?: string | undefined;
  /**
   * Maximum width constraint (any CSS length).
   */
  @property({ type: String })
  maxWidth?: string | undefined;
  /**
   * Maximum height constraint (any CSS length).
   */
  @property({ type: String })
  maxHeight?: string | undefined;

  // text specific
  /**
   * When set, the image renders nothing (returns `nothing`) — use for conditional show/hide without DOM teardown.
   */
  @property({ type: Boolean })
  hidden = false;

  /**
   * Alternative text for screen readers. Falls back to `src` when unset — provide a meaningful
   * description for accessibility (empty `""` only for decorative images).
   */
  @property({ type: String })
  alt?: string | undefined;

  /**
   * Image URL. When the load fails, `fallbackSrc` is substituted if provided.
   */
  @property({ type: String })
  src?: string | undefined;

  /**
   * Fallback URL used when the primary `src` errors out — e.g. a placeholder product image.
   */
  @property({ type: String })
  fallbackSrc?: string | undefined;

  /**
   * Shorthand for equal width and height (any CSS length). Useful for square thumbnails.
   */
  @property({ type: String })
  boxSize?: string | undefined;

  /**
   * CSS `object-fit` — `cover` (fill the box, crop overflow), `contain` (preserve aspect ratio,
   * letterbox), `fill`, `none`, or `scale-down`. Defaults to native browser behavior.
   */
  @property({ type: String })
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down" | undefined;

  onImageError() {
    this.src = this.fallbackSrc;
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = `
      --padding: ${parseVariables(
        cssVar("padding", this.padding),
        cssVar("padding", this.size)
      )};
      --margin: ${parseVariables(
        cssVar("margin", this.margin),
        cssVar("margin", this.size)
      )};

      width: ${parseVariables(
        cssVar("width", this.width),
        cssVar("width", this.size),
        this.width,
        this.boxSize,
        "auto"
      )};
      height: ${parseVariables(
        cssVar("height", this.height),
        cssVar("height", this.size),
        this.height,
        this.boxSize,
        "auto"
      )};

      object-fit: ${this.objectFit};

      border-radius: ${parseVariables(
        cssVar("rounded", this.rounded),
        this.rounded,
        "0px"
      )};
      border-style: ${parseVariables(this.borderStyle, "solid")};
      border-width: ${parseVariables(
        cssVar("border-width", this.borderWidth),
        this.borderWidth,
        "0px"
      )};
      border-color: ${parseVariables(
        cssVar("border-color", this.borderColor),
        this.borderColor,
        "transparent"
      )};

    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.image, "img")}

      <style>
        :host {
          display: inherit;
        }

        img {
          ${additionalCss};
        }

        picture {
          height: 100%;
          width: 100%;
        }
      </style>

      <img
        src="${ifDefined(this.src)}"
        alt="${this.alt ?? this.src ?? ""}"
        @error="${this.onImageError}"
      />
    `;
  }

  static styles = css`
    img {
      padding: var(--padding);
      margin: var(--margin);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-image": Image;
  }
}

if (!customElements.get("ssk-image")) {
  customElements.define("ssk-image", Image);
}
