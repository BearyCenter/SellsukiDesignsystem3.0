import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import {
  BadgeVariants,
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
 * Sellsuki Badge — DS 3.0
 *
 * Small status pill for compact one-word labels — order status, count,
 * label tone. Supports semantic colors via `themeColor` (brand / success
 * / warning / danger / info) and three variants (`solid`, `solid-light`,
 * `outline`).
 *
 * Reach for `<ssk-badge>` for table-cell status indicators, list-item
 * status pills, or unread-count chips. For removable / interactive chips
 * use `<ssk-tag>`; for full-width inline messages use `<ssk-alert>`.
 *
 * @example
 *   <ssk-badge themeColor="success" variant="solid-light">ชำระแล้ว</ssk-badge>
 *   <ssk-badge themeColor="danger">หมดสต็อก</ssk-badge>
 *
 * @slot - Badge label text
 */
export class Badge extends LitElement {
  static registeredName = "ssk-badge";

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  /**
   * Stable `data-testid` attribute applied to the badge wrapper for E2E test selectors.
   */
  @property({ type: String })
  testId?: string;

  // ThemeValue
  /**
   * Semantic tone — `primary` (brand), `success`, `warning`, `danger`, `info`, or any palette role.
   * Controls background / border / text colors across variants.
   */
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  /**
   * Override for the badge text color. Falls back to a tone-matched fg.
   */
  @property({ type: String })
  color?: ColorRole | ColorName;

  /**
   * Badge size — `xs` (compact dot) through `xl`. Controls font-size and inner padding via tokens.
   */
  @property({ type: String })
  size: Size = "md";
  /**
   * Override border-radius (any CSS length). Defaults to fully rounded (`9999px`) for pill shape.
   */
  @property({ type: String })
  rounded?: string | undefined;

  // font
  /**
   * Font family group — `sans` (default) or `mono`. Maps to `--font-caption` family tokens.
   */
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  /**
   * Font weight token (`normal` / `medium` / `bold`). Defaults to `normal`.
   */
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  /**
   * Explicit badge width (any CSS length). Leave unset to size from the label content.
   */
  @property({ type: String })
  width?: string | undefined;

  // button specific
  /**
   * Visual variant — `solid` (filled brand), `outline` (transparent + colored border), or
   * `subtle` (tinted background, no border). Pair with `themeColor` for tone.
   */
  @property({ type: String })
  variant: BadgeVariants = "solid";
  /**
   * When set, the badge renders nothing (returns `nothing`) — use for conditional show/hide without DOM teardown.
   */
  @property({ type: Boolean })
  hidden = false;

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = `
      --font-size: ${parseVariables(cssVar("font-size", this.size), "1rem")};
      --font-family: ${parseVariables(
        cssVar("font-family", this.fontFamilyGroup)
      )};
      --font-weight: ${parseVariables(cssVar("font-weight", this.fontWeight))};

      --rounded: ${parseVariables(cssVar("rounded", this.rounded), "9999px")};
    `;

    switch (this.variant) {
      case "solid":
        additionalCss += `
        --background-color: ${parseVariables(
          cssVar("colors", this.themeColor, 500)
        )};
        --border-color: ${parseVariables(
          cssVar("colors", this.themeColor, 500)
        )};
        --border-width: 0px;

        --color: ${parseVariables(
          cssVar("colors", this.color, 200),
          cssVar("colors", this.color),
          this.color,
          cssVar("colors", "white", 100)
        )};
          `;
        break;

      case "outline":
        additionalCss += `
        --background-color: ${parseVariables(cssVar("colors", "white", 100))};
        --border-color: ${parseVariables(
          cssVar("colors", this.themeColor, 500)
        )};
        --border-width: 1px;

        --color: ${parseVariables(cssVar("colors", this.themeColor, 500))};
          `;
        break;

      case "subtle":
        additionalCss += `
        --background-color: ${parseVariables(
          cssVar("colors", this.themeColor, 50)
        )};
        --border-color: ${parseVariables(
          cssVar("colors", this.themeColor, 100)
        )};
        --border-width: 1px;

        --color:  ${parseVariables(cssVar("colors", this.themeColor, 500))};
          `;
        break;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.badge, ":host")}

      <style>
        span {
          ${additionalCss};
        }
      </style>

      <span data-testid=${this.testId || nothing}>
        <slot></slot>
      </span>
    `;
  }

  static styles = css`
    :host {
      display: flex;
    }

    span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.25em;
      white-space: nowrap;

      background-color: var(--background-color);
      color: var(--color);

      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);

      border-style: solid;
      border-radius: var(--rounded);
      border-color: var(--border-color);
      border-width: var(--border-width);

      padding: 0 0.5em;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-badge": Badge;
  }
}

if (!customElements.get("ssk-badge")) {
  customElements.define("ssk-badge", Badge);
}
