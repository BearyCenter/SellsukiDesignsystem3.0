import { consume } from "@lit/context";
import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
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
 * Visual density: controls vertical padding (and therefore navbar height).
 * - comfortable: 12px padding — current default (~64px with 40px avatar)
 * - default:     8px 12px padding — modern web standard (~56px)
 * - compact:     6px 10px padding — dense laptop UI (~48px)
 * - auto:        compact <1280px, default ≥1280px, compact <=640px
 */
export type Density = "comfortable" | "default" | "compact" | "auto";

export class TopNavbar extends LitElement implements ThemeValue {
  static registeredName = "ssk-top-navbar";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // ThemeValue
  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  color?: ColorRole | ColorName;
  @property({ type: String })
  margin?: string | undefined;
  @property({ type: String })
  padding?: Size;
  @property({ type: String })
  gap?: string | undefined = "md";

  /** Visual density — see {@link Density}. Default `comfortable` keeps backward compat. */
  @property({ type: String })
  density: Density = "comfortable";

  // Font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight: FontWeight = "normal";
  @property({ type: String })
  fontSize?: string | undefined;

  render() {
    return html`
      ${parseThemeToCssVariables(this.theme?.components?.topNavbar, ":host")}
      <style>
        :host {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: space-between;
          align-items: center;

          --color: ${parseVariables(cssVar("colors", this.color), this.color)};
          --font-family: ${parseVariables(
            cssVar("font-family", this.fontFamilyGroup)
          )};
          --font-weight: ${parseVariables(
            cssVar("font-weight", this.fontWeight)
          )};
          --font-size: ${parseVariables(
            cssVar("font-size", this.fontSize),
            cssVar("font-size", this.size)
          )};
          --margin: ${parseVariables(cssVar("margin", this.margin))};
          --gap: ${parseVariables(
            cssVar("spacing", this.gap),
            cssVar("padding", this.size)
          )};

          --border-color: ${parseVariables(cssVar("colors", "gray", 200))};
          --gap: ${parseVariables(cssVar("spacing", this.gap))};
        }
      </style>

      <div class="container density-${this.density}">
        <span><slot name="left"></slot></span>
        <span><slot></slot></span>
        <span><slot name="right"></slot></span>
      </div>
    `;
  }

  static styles = css`
    .container {
      display: grid;
      grid-template-columns: auto 1fr auto;

      width: 100%;
      gap: var(--gap);
      padding: 12px;
      margin: var(--margin);
      gap: var(--gap);
      color: var(--color);
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);

      border-bottom: 1px solid var(--border-color);
    }

    /* ── Density variants ─────────────────────────────────── */
    .container.density-comfortable {
      padding: 12px;
    }

    .container.density-default {
      padding: 8px 12px;
    }

    .container.density-compact {
      padding: 6px 10px;
    }

    /* auto: compact on small viewports, default on laptops, comfortable on large */
    .container.density-auto {
      padding: 8px 12px;
    }
    @media (max-width: 1279px) {
      .container.density-auto {
        padding: 6px 10px;
      }
    }
    @media (max-width: 640px) {
      .container.density-auto,
      .container.density-default,
      .container.density-comfortable {
        padding: 6px 10px;
      }
    }

    span {
      display: flex;
      align-items: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-top-navbar": TopNavbar;
  }
}

if (!customElements.get("ssk-top-navbar")) {
  customElements.define("ssk-top-navbar", TopNavbar);
}
