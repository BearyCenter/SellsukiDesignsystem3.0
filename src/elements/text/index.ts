import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
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
 * Sellsuki Text — DS 3.0
 *
 * Token-aware body text element. Maps `size` to body / label / caption /
 * button tokens (never to a heading token — those are reserved for
 * `<ssk-heading>`). Color via the semantic palette
 * (`text-primary` / `text-secondary` / `text-disabled` ...) and tone
 * roles (`info`, `success`, `warning`, `danger`).
 *
 * Reach for `<ssk-text>` for all body content, list-item labels, table
 * cell text, captions, and helper text. The DS 3.0 floor is 18px
 * (`--font-size-caption`) — `<ssk-text>` never renders below it.
 * For real headings (page title, section heading) use `<ssk-heading>`.
 *
 * @example
 *   <ssk-text size="md">ออเดอร์นี้ถูกบันทึกเรียบร้อยแล้ว</ssk-text>
 *   <ssk-text size="sm" color="gray.500">2026-05-19 10:24</ssk-text>
 *
 * @slot - Text content
 * @csspart text - The rendered text element
 */
export class Text extends LitElement {
  static registeredName = "ssk-text";

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  /**
   * Brand accent color — falls back to the current `--fg-brand-primary` from
   * `<ssk-app-shell-provider>` brand context. Pass an explicit `ColorRole` to override.
   */
  @property({ type: String })
  themeColor: ColorRole | ColorName = "";
  /**
   * Text color. Accepts a semantic role (e.g. `text-primary`, `text-secondary`) or a palette
   * token (e.g. `gray.500` for caption timestamps, `background.900` for primary body text).
   */
  @property({ type: String })
  color?: ColorRole | ColorName = "background.900";

  /**
   * Body size step — `xs`–`2xl`. Maps to `--font-size-caption` / `-p` / `-label` / `-button`
   * (never to a heading token; those are reserved for `<ssk-heading>`). DS 3.0 floor is 18px.
   */
  @property({ type: String })
  size: Size = "md";
  /**
   * Override padding token — accepts the same scale as `size`.
   */
  @property({ type: String })
  padding?: Size;
  /**
   * Explicit CSS font-size override. AVOID — DS 3.0 floor is 18px and Tailwind sizes are forbidden.
   * Prefer `size` so the value stays token-aligned.
   */
  @property({ type: String })
  fontSize?: string | undefined;
  /**
   * Explicit CSS line-height override (any CSS length / unitless number).
   */
  @property({ type: String })
  lineHeight?: string | undefined;
  /**
   * Outer margin override (any CSS length). Prefer parent layout gap when possible.
   */
  @property({ type: String })
  margin?: string | undefined;

  // font
  /**
   * Font family group — `sans` (default) or `mono`. Maps to `--font-p` family tokens.
   */
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  /**
   * Font weight token (`normal` / `medium` / `bold`). Defaults to `normal`.
   */
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  // text specific
  /**
   * When set, the text renders nothing (returns `nothing`) — use for conditional show/hide without DOM teardown.
   */
  @property({ type: Boolean })
  hidden = false;

  /**
   * Renders the text in italic style — use for emphasized body copy, citations.
   */
  @property({ type: Boolean })
  italic = false;

  /**
   * Underlines the text. Combine with `strike` for combined decorations.
   */
  @property({ type: Boolean })
  underline = false;

  /**
   * Renders strike-through — use for prices, deprecated values. Combine with `underline` for combined decorations.
   */
  @property({ type: Boolean })
  strike = false;

  /**
   * Horizontal text alignment — `left` (default), `center`, `right`, `justify`.
   */
  @property({ type: String })
  align?: "left" | "center" | "right" | "justify" | undefined;

  /**
   * Letter-case transform — `uppercase`, `lowercase`, or `capitalize` (title case).
   */
  @property({ type: String })
  transform?: "uppercase" | "lowercase" | "capitalize" | undefined;

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = `
    --font-family: ${parseVariables(
      cssVar("font-family", this.fontFamilyGroup)
    )};
    --font-weight: ${parseVariables(cssVar("font-weight", this.fontWeight))};
    --font-size: ${parseVariables(
      cssVar("font-size", this.fontSize),
      cssVar("font-size", this.size)
    )};
    --line-height: ${parseVariables(
      cssVar("line-height", this.lineHeight),
      cssVar("font-size", this.size)
    )};

    --padding: ${parseVariables(
      cssVar("padding", this.padding),
      cssVar("padding", this.size)
    )};
    --margin: ${parseVariables(
      cssVar("margin", this.margin),
      cssVar("margin", this.size)
    )};
    ${
      this.color
        ? `--color: ${parseVariables(
            cssVar("colors", this.color, 500),
            cssVar("colors", this.color),
            this.color
          )};`
        : "--color: currentColor;"
    }
    `;

    if (this.italic) {
      additionalCss += "font-style: italic;";
    }

    let textDecorations = [];
    if (this.underline) {
      textDecorations.push("underline");
    }
    if (this.strike) {
      textDecorations.push("line-through");
    }
    if (textDecorations.length > 0) {
      additionalCss += `text-decoration: ${textDecorations.join(" ")};`;
    }

    if (this.transform) {
      additionalCss += `text-transform: ${this.transform};`;
    }

    if (this.align) {
      additionalCss += `text-align: ${this.align};`;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.text, "p")}

      <style>
        p {
          ${additionalCss};
        }
      </style>
      <p><slot></slot></p>
    `;
  }

  static styles = css`
    p {
      color: var(--color);
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
      padding: var(--padding);
      margin: var(--margin);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-text": Text;
  }
}

if (!customElements.get("ssk-text")) {
  customElements.define("ssk-text", Text);
}
