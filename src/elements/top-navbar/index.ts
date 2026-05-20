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
 * Sellsuki Top Navbar — DS 3.0
 *
 * Horizontal bar designed for the `navbar` slot of `<ssk-app-shell>` /
 * `<ssk-default-shell>`. Lays out children with `space-between` so left
 * (logo, breadcrumbs) and right (user menu, notifications) ends settle
 * automatically. Applies the standard `--space-row` gap and font tokens.
 *
 * Reach for `<ssk-top-navbar>` for the global page chrome bar above the
 * sidebar / main content. For section-level page titles use
 * `<ssk-page-header>` inside the page body. For vertical nav use
 * `<ssk-sidebar>`.
 *
 * @example
 *   <ssk-app-shell>
 *     <ssk-top-navbar slot="navbar">
 *       <ssk-logo brand="sellsuki"></ssk-logo>
 *       <ssk-avatar label="ชญานี ศ."></ssk-avatar>
 *     </ssk-top-navbar>
 *   </ssk-app-shell>
 *
 * @slot - Navbar content (left + right halves)
 */
export class TopNavbar extends LitElement implements ThemeValue {
  static registeredName = "ssk-top-navbar";

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // ThemeValue
  /**
   * Visual density of the navbar — `xs` / `sm` / `md` / `lg` / `xl`. Drives the default font size, padding, and gap via design tokens. Defaults to `md`.
   */
  @property({ type: String })
  size: Size = "md";
  /**
   * Optional override for the navbar text color (`ColorRole` or `ColorName`). Leave unset to use `--text-primary`.
   */
  @property({ type: String })
  color?: ColorRole | ColorName;
  /**
   * Override the outer margin around the navbar (any CSS shorthand).
   */
  @property({ type: String })
  margin?: string | undefined;
  /**
   * Override the navbar padding token — accepts the same `xs`–`xl` scale as `size`. Leave unset to inherit from `size`.
   */
  @property({ type: String })
  padding?: Size;
  /**
   * Gap between slotted left / center / right groups — accepts the `xs`–`xl` spacing scale. Defaults to `md`.
   */
  @property({ type: String })
  gap?: string | undefined = "md";

  // Font
  /**
   * Font family group — `sans` (default body face) or `mono` for fixed-width labels.
   */
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  /**
   * Font weight token for navbar text — typically `normal` (default) or `medium`.
   */
  @property({ type: String })
  fontWeight: FontWeight = "normal";
  /**
   * Override the navbar font size (any CSS length). Stay above 18px (`--font-size-caption`) for the DS 3.0 minimum.
   */
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

      <div class="container">
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
