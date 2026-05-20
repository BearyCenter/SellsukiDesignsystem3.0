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
 * Sellsuki Tag — DS 3.0
 *
 * Interactive chip — like a badge but designed for user actions
 * (filterable, dismissible). Three variants (`solid`, `solid-light`,
 * `outline`) and the same theme color roles as `<ssk-badge>`. Slot in
 * a leading icon plus the label; pair with a trailing close icon to
 * make it removable.
 *
 * Reach for `<ssk-tag>` when the chip is clickable (filter pill, keyword
 * tag, applied filter that can be removed). For purely informational
 * status pills use `<ssk-badge>` (read-only). For inline action use
 * `<ssk-button variant="ghost" size="sm">`.
 *
 * @example
 *   <ssk-tag themeColor="brand" variant="solid-light">
 *     ค้นหา: "กระเป๋า"
 *     <ssk-icon slot="postfix" name="solid-x-mark"></ssk-icon>
 *   </ssk-tag>
 *
 * @slot - Tag label
 */
export class Tag extends LitElement {
  static registeredName = "ssk-tag";

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  /**
   * Stable `data-testid` attribute applied to the tag wrapper for E2E test selectors.
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
   * Override for the tag text color. Falls back to a tone-matched fg.
   */
  @property({ type: String })
  color?: ColorRole | ColorName;

  /**
   * Tag size — `xs`–`xl`. Controls font-size and padding via tokens.
   */
  @property({ type: String })
  size: Size = "md";
  /**
   * Override border-radius (any CSS length). Defaults to `8px` for the squared-pill tag shape
   * (vs. badge's fully-rounded `9999px`).
   */
  @property({ type: String })
  rounded?: string | undefined;

  // font
  /**
   * Font family group — `sans` (default) or `mono`.
   */
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  /**
   * Font weight token (`normal` / `medium` / `bold`). Defaults to `normal`.
   */
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  /**
   * Explicit tag width (any CSS length). Leave unset to size from content.
   */
  @property({ type: String })
  width?: string | undefined;

  /**
   * Visual variant — `solid` (filled), `outline` (transparent + colored border), or `subtle`
   * (tinted background). Pair with `themeColor` for tone.
   */
  @property({ type: String })
  variant: BadgeVariants = "solid";
  /**
   * When set, the tag renders nothing (returns `nothing`) — use for conditional show/hide without DOM teardown.
   */
  @property({ type: Boolean })
  hidden = false;

  /**
   * CSS cursor override — set `"pointer"` when the tag is clickable (filter chip, navigation tag).
   * Defaults to `"default"`.
   */
  @property({ type: String })
  cursor?: string | undefined;

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = `
      --font-size: ${parseVariables(cssVar("font-size", this.size), "1rem")};
      --font-family: ${parseVariables(
        cssVar("font-family", this.fontFamilyGroup),
      )};
      --font-weight: ${parseVariables(cssVar("font-weight", this.fontWeight))};

      --rounded: ${parseVariables(cssVar("rounded", this.rounded), "8px")};
      --cursor: ${parseVariables(this.cursor, "default")};
    `;

    switch (this.variant) {
      case "solid":
        additionalCss += `
        --background-color: ${parseVariables(
          cssVar("colors", this.themeColor, 500),
        )};
        --border-color: ${parseVariables(
          cssVar("colors", this.themeColor, 500),
        )};
        --border-width: 0px;

        --color: ${parseVariables(
          cssVar("colors", this.color, 200),
          cssVar("colors", this.color),
          this.color,
          cssVar("colors", "white", 100),
        )};
          `;
        break;

      case "outline":
        additionalCss += `
        --background-color: ${parseVariables(cssVar("colors", "white", 100))};
        --border-color: ${parseVariables(
          cssVar("colors", this.themeColor, 500),
        )};
        --border-width: 1px;

        --color: ${parseVariables(cssVar("colors", this.themeColor, 500))};
          `;
        break;

      case "subtle":
        additionalCss += `
        --background-color: ${parseVariables(
          cssVar("colors", this.themeColor, 50),
        )};
        --border-color: ${parseVariables(
          cssVar("colors", this.themeColor, 100),
        )};
        --border-width: 1px;

        --color:  ${parseVariables(cssVar("colors", this.themeColor, 500))};
          `;
        break;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.tag, ":host")}

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

      cursor: var(--cursor);

      padding: 0 0.5em;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-tag": Tag;
  }
}

if (!customElements.get("ssk-tag")) {
  customElements.define("ssk-tag", Tag);
}
