import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { themeContext } from "../../contexts/theme";
import { ThemeValue } from "../../types/base-attributes";
import {
  FontFamilyGroup,
  FontWeight,
  Size,
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";

/**
 * Sellsuki Avatar — DS 3.0
 *
 * User / entity portrait. Renders an `src` image if provided; otherwise
 * falls back to up-to-two-character initials derived from the `label`
 * prop, on a brand-colored background. Two shapes — `circle` and
 * `rounded` (default) — and the standard `size` token (xs–2xl).
 *
 * Reach for `<ssk-avatar>` for user rows, list-item leading visuals,
 * comment authors, navbar profile menus. For a free-form image use
 * `<ssk-image>`. For colored icon tiles use `<ssk-misc-icon>`.
 *
 * Note: avatar initials at xs/sm sizes intentionally use 10–12px text —
 * an explicit DS 3.0 exception to the 18px text minimum because the
 * glyph is visual UI, not body content.
 *
 * @example
 *   <ssk-avatar src="/u/123.jpg" label="ชญานี ศ." size="md"></ssk-avatar>
 *   <ssk-avatar label="John Doe" shape="circle"></ssk-avatar>
 */
export class Avatar extends LitElement implements ThemeValue {
  static registeredName = "ssk-avatar";

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // ThemeValue
  /**
   * Avatar diameter — `xs` (24px), `sm` (32px), `md` (40px), `lg` (56px), `xl` (72px), `2xl`.
   * Defaults to `md`. At `xs`/`sm` the initials fallback intentionally renders below the 18px
   * minimum (visual UI exception).
   */
  @property({ type: String })
  size: Size = "md";
  /**
   * Brand accent used for the initials-fallback background — falls back to the current
   * `--fg-brand-primary` from `<ssk-app-shell-provider>` brand context. Pass an explicit
   * `ColorRole` (e.g. `"success"`) to override for status-tinted avatars.
   */
  @property({ type: String })
  themeColor: string = "primary";
  /**
   * Initials text color (only used in the fallback). Defaults to `white` for contrast on the
   * brand background.
   */
  @property({ type: String })
  color?: string = "white";
  /**
   * Inner padding token override (same `xs`–`xl` scale as `size`).
   */
  @property({ type: String })
  padding?: Size;

  /**
   * Explicit box size override — accepts the `xs`–`xl` scale or a CSS length. Use when the
   * `size` prop doesn't match the surrounding visual rhythm.
   */
  @property({ type: String })
  boxsize?: Size;

  /**
   * When set, the avatar renders nothing (returns `nothing`) — use for conditional show/hide without DOM teardown.
   */
  @property({ type: Boolean })
  hidden = false;

  // Font
  /**
   * Font family group for the initials fallback — `sans` (default) or `mono`.
   */
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  /**
   * Font weight token for the initials fallback. Defaults to `normal`.
   */
  @property({ type: String })
  fontWeight: FontWeight = "normal";
  /**
   * Explicit initials font-size override. Avoid when possible — initials size is derived from `size`.
   */
  @property({ type: String })
  fontSize?: string | undefined;

  // Avatar Attributes
  /**
   * Image URL. When set, an `<img>` is rendered; otherwise the initials fallback is shown using
   * the first one or two letters of `label`.
   */
  @property({ type: String })
  src?: string;
  /**
   * Display name used to derive initials when `src` is missing. Multi-word labels render the
   * first character of each word (max 2). Also used as the accessible image label when `alt` is unset.
   */
  @property({ type: String })
  label?: string;
  /**
   * Explicit alternative text for the rendered `<img>`. Falls back to `label` for AT users.
   */
  @property({ type: String })
  alt?: string;
  /**
   * Outline shape — `rounded` (default, 8px squircle) or `circle` (fully round). Use `circle`
   * for user portraits, `rounded` for entity / org / shop avatars.
   */
  @property({ type: String })
  shape?: "circle" | "rounded" = "rounded";
  /**
   * CSS `object-fit` for the rendered image — `cover` (default suggestion for portraits),
   * `contain` (preserve aspect, may letterbox), `fill`, `none`, or `scale-down`.
   */
  @property({ type: String })
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down" | undefined;

  private initialism = (label?: string) => {
    if (!label) {
      return "?";
    }

    if (label.length <= 2) {
      return label.toUpperCase();
    }

    // Get the initials of each word
    const initials = label
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase());

    // Concatenate the initials to form the shortened name
    const shortenedName = initials.join("");

    return shortenedName;
  };

  render() {
    if (this.hidden) {
      return nothing;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.avatar, ":host")}
      <style>
        :host {
          --padding: ${parseVariables(
            cssVar("padding", this.padding),
            this.padding,
            cssVar("padding", this.size)
          )};

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

          --color: ${parseVariables(cssVar("colors", this.color), this.color)};
          --background-color: ${parseVariables(
            cssVar("colors", this.themeColor, 500)
          )};
          --width: ${parseVariables(
            cssVar("width", this.size),
            cssVar("width", this.boxsize),
            this.boxsize,
            "auto"
          )};

          --border-radius: ${this.shape === "circle" ? "50%" : "8px"};

          --object-fit: ${this.objectFit};
        }
      </style>
      <span>
        ${this.src
          ? html`<img
              src="${ifDefined(this.src)}"
              alt="${ifDefined(this.alt)}"
            />`
          : html`<div>${this.initialism(this.label)}</div>`}
      </span>
    `;
  }

  static styles = css`
    :host {
      display: inherit;

      overflow: hidden;
    }

    span {
      display: inline-block;
      overflow: hidden;
      aspect-ratio: auto 1/1;
      width: var(--width);
      padding: var(--padding);
      border-radius: var(--border-radius);
    }

    img,
    div {
      width: 100%;
      height: 100%;
    }

    img {
      object-fit: var(--object-fit);
    }

    div {
      display: grid;
      place-items: center;
      background-color: var(--background-color);
      color: var(--color);
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      word-wrap: break-word;
      text-overflow: clip;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-avatar": Avatar;
  }
}

if (!customElements.get("ssk-avatar")) {
  customElements.define("ssk-avatar", Avatar);
}
