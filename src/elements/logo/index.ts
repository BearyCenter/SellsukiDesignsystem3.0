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
   * Explicit brand override. When set, takes precedence over the inherited
   * brandContext value. Use this when a logo needs to render a different
   * brand than the surrounding shell (rare — e.g. cross-brand showcase).
   */
  @property({ type: String })
  brand?: Brand;

  // ThemeValue
  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  themeColor: string = "primary";
  @property({ type: String })
  borderColor?: string;
  @property({ type: String })
  margin?: string;
  @property({ type: String })
  borderWidth?: string;
  @property({ type: String })
  width?: string | undefined;
  @property({ type: String })
  height?: string | undefined;
  @property({ type: String })
  gap?: string | undefined = "0.2em";
  @property({ type: String })
  boxSize?: string | undefined;
  @property({ type: Boolean })
  hidden = false;

  // Logo Attributes
  @property({ type: Boolean })
  fullLogo = false;

  @property({ type: String })
  srcLogo?: string;
  @property({ type: String })
  altLogo?: string;

  @property({ type: String })
  srcLogoName?: string;
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
