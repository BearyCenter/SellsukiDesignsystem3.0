import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { themeContext } from "../../contexts/theme";
import {
  brandContext,
  getBrandAssets,
  type Brand,
} from "../../contexts/theme/brand-assets";
import { ThemeValue } from "../../types/base-attributes";
import {
  Size,
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";

/**
 * Sellsuki Logo — DS 3.0
 *
 * Brand wordmark. Inherits the active brand from
 * `<ssk-app-shell-provider>` / `<ssk-theme-provider>` via `brandContext`,
 * so dropping `<ssk-logo>` into a sellsuki-themed shell automatically
 * renders the sellsuki mark. Override via the explicit `brand`
 * attribute (`sellsuki` | `patona` | `oc2plus`) for cross-brand
 * showcases.
 *
 * Reach for `<ssk-logo>` in navbar branding, login screens, footers, and
 * marketing splash pages. For a colored icon tile use
 * `<ssk-misc-icon>`; for a country flag use `<ssk-country-icon>`.
 *
 * @example
 *   <ssk-logo size="md"></ssk-logo>
 *   <ssk-logo brand="patona" size="lg"></ssk-logo>
 */
export class Logo extends LitElement implements ThemeValue {
  static registeredName = "ssk-logo";

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  /**
   * Brand inherited from the nearest <ssk-app-shell-provider> /
   * <ssk-theme-provider>. Overridable by the `brand` attribute below.
   */
  @consume({ context: brandContext, subscribe: true })
  @property({ attribute: false })
  private _inheritedBrand?: Brand;

  /**
   * Explicit brand override (`sellsuki` / `patona` / `oc2plus`). When set, takes precedence over
   * the inherited `brandContext`. Use only for cross-brand showcases — the logo otherwise picks
   * up the host shell's brand automatically.
   */
  @property({ type: String })
  brand?: Brand;

  // ThemeValue
  /**
   * Logo size step — `xs`–`xl`. Maps to a square pixel box. Defaults to `md`.
   */
  @property({ type: String })
  size: Size = "md";
  /**
   * Brand accent for the optional logo border tint. Defaults to `primary`.
   */
  @property({ type: String })
  themeColor: string = "primary";
  /**
   * Border color override (any CSS color or palette token). Pair with `borderWidth`.
   */
  @property({ type: String })
  borderColor?: string;
  /**
   * Outer margin override (any CSS length). Prefer parent layout gap.
   */
  @property({ type: String })
  margin?: string;
  /**
   * Border width (any CSS length). Defaults to `0px` — set to draw a framed logo plate.
   */
  @property({ type: String })
  borderWidth?: string;
  /**
   * Explicit width override (any CSS length, e.g. `"160px"` for navbar branding).
   */
  @property({ type: String })
  width?: string | undefined;
  /**
   * Explicit height override (any CSS length).
   */
  @property({ type: String })
  height?: string | undefined;
  /**
   * Gap between the mark and wordmark when `fullLogo` is set (any CSS length). Defaults to `0.2em`.
   */
  @property({ type: String })
  gap?: string | undefined = "0.2em";
  /**
   * Shorthand for equal width and height (any CSS length). Useful for square brand tiles.
   */
  @property({ type: String })
  boxSize?: string | undefined;
  /**
   * When set, the logo renders nothing (returns `nothing`) — use for conditional show/hide without DOM teardown.
   */
  @property({ type: Boolean })
  hidden = false;

  // Logo Attributes
  /**
   * When set, renders the full brand wordmark (mark + name); otherwise renders the compact mark only.
   * Use `fullLogo` in login screens and footers, the mark-only form in tight navbars.
   */
  @property({ type: Boolean })
  fullLogo = false;

  /**
   * Explicit URL override for the logo mark image. Leave unset to use the brand's default mark
   * asset resolved from `brand` / `brandContext`.
   */
  @property({ type: String })
  srcLogo?: string;
  /**
   * Alternative text for the logo mark image. Falls back to `"<brand name> logo"`.
   */
  @property({ type: String })
  altLogo?: string;

  /**
   * Explicit URL override for the wordmark image (used when `fullLogo` is set). Falls back to the
   * brand's default wordmark asset.
   */
  @property({ type: String })
  srcLogoName?: string;
  /**
   * Alternative text for the wordmark image. Falls back to `"<brand name> wordmark"`.
   */
  @property({ type: String })
  altLogoName?: string;

  private _resolveAssets() {
    const brand = this.brand ?? this._inheritedBrand;
    const assets = getBrandAssets(brand);
    return {
      mark:      this.srcLogo     ?? assets.logoMark,
      full:      this.srcLogoName ?? assets.logoFull,
      altMark:   this.altLogo     ?? `${assets.displayName} logo`,
      altFull:   this.altLogoName ?? `${assets.displayName} wordmark`,
    };
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = `
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
    --margin: ${parseVariables(cssVar("margin", this.margin))};
    --gap: ${parseVariables(
      cssVar("spacing", this.gap),
      cssVar("spacing", this.size)
    )};
    border-width:  ${parseVariables(
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

    const assets = this._resolveAssets();

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.logo, "img")}
      <style>
        img,div{
          ${additionalCss};
        }
      </style>
      ${this.fullLogo
        ? this.srcLogoName
          ? html`
              <div>
                <img
                  src="${ifDefined(this.srcLogo)}"
                  alt="${ifDefined(this.altLogo)}"
                />
                <img
                  src="${ifDefined(this.srcLogoName)}"
                  alt="${ifDefined(this.altLogoName)}"
                />
              </div>
            `
          : html`
              <div>
                <img
                  src="${ifDefined(assets.full)}"
                  alt="${ifDefined(assets.altFull)}"
                />
              </div>
            `
        : html`
            <div>
              <img
                src="${ifDefined(assets.mark)}"
                alt="${ifDefined(assets.altMark)}"
              />
            </div>
          `}
    `;
  }

  static styles = css`
    img {
      justify-content: center;
      cursor: pointer;
      margin: var(--margin);
    }
    div {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin: var(--margin);
      gap: 0.2em;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-logo": Logo;
  }
}

if (!customElements.get("ssk-logo")) {
  customElements.define("ssk-logo", Logo);
}
