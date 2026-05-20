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
 * Sellsuki Container — DS 3.0
 *
 * Token-aware box: a thin wrapper that exposes `--space-container-x`,
 * `--space-container-y`, radius, border, background, and font tokens as
 * a single element. No built-in title / image conventions — slot whatever
 * you need inside.
 *
 * Reach for `<ssk-container>` when you want a styled panel without the
 * semantic structure of `<ssk-card>` (which assumes title + subtitle +
 * image). Common uses: form section wrappers, toolbar groups, ad-hoc
 * surface tiles. For dashboard KPI tiles use `<ssk-widget-matric>`. For
 * product-list cards use `<ssk-card>`.
 *
 * @example
 *   <ssk-container rounded="8px" borderColor="primary" padding="md">
 *     <ssk-heading level="4">ตั้งค่าทั่วไป</ssk-heading>
 *     <ssk-input label="ชื่อร้านค้า"></ssk-input>
 *   </ssk-container>
 *
 * @slot - Container body
 */
export class Container extends LitElement {
  static registeredName = "ssk-container";

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  /**
   * Stable `data-testid` attribute applied to the container root for E2E test selectors.
   */
  @property({ type: String })
  testId?: string;

  // ThemeValue
  /**
   * Semantic tone — `background` (default), `primary`, `success`, etc. Drives the default
   * background tint when `backgroundColor` is unset.
   */
  @property({ type: String })
  themeColor: ColorRole | ColorName = "background";
  /**
   * Text color inside the container (any CSS color or palette token).
   */
  @property({ type: String })
  color?: ColorRole | ColorName;
  /**
   * Explicit background color override (palette role or token). Falls back to a `themeColor`-tinted background.
   */
  @property({ type: String })
  backgroundColor?: ColorRole | ColorName;

  /**
   * Size step — `xs`–`xl`. Affects default font-size; padding is controlled separately by `padding`.
   */
  @property({ type: String })
  size: Size = "md";
  /**
   * Border radius override (any CSS length). Defaults to `8px`.
   */
  @property({ type: String })
  rounded?: string | undefined;

  /**
   * Border width (any CSS length). Defaults to `1px`.
   */
  @property({ type: String })
  borderWidth?: string | undefined;
  /**
   * Border color (palette role or token). Defaults to a `themeColor`-matched stroke.
   */
  @property({ type: String })
  borderColor?: ColorRole | ColorName | undefined;
  /**
   * CSS `border-style` — `solid` (default), `dashed`, `dotted`, etc.
   */
  @property({ type: String })
  borderStyle?: string | undefined;

  // font
  /**
   * Font family group inherited by slotted content — `sans` (default) or `mono`.
   */
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  /**
   * Font weight token inherited by slotted content. Defaults to `normal`.
   */
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  /**
   * Explicit width (any CSS length, e.g. `"320px"` or `"100%"`). Defaults to `auto`.
   */
  @property({ type: String })
  width?: string | undefined;
  /**
   * Explicit height (any CSS length). Defaults to `auto`.
   */
  @property({ type: String })
  height?: string | undefined;

  /**
   * Inner padding token (`xs`–`xl`) or any CSS length. Defaults to `1em`. Prefer the
   * `--space-container-x` / `--space-container-y` rhythm via tokens.
   */
  @property({ type: String })
  padding?: Size;

  /**
   * Visual variant — `solid` (default), `outline`, or `subtle`. Affects the interplay between
   * background and border tokens.
   */
  @property({ type: String })
  variant: BadgeVariants = "solid";
  /**
   * When set, the container renders nothing (returns `nothing`) — use for conditional show/hide without DOM teardown.
   */
  @property({ type: Boolean })
  hidden = false;

  /**
   * CSS cursor override — set `"pointer"` when the entire container is clickable.
   */
  @property({ type: String })
  cursor?: string | undefined;

  /**
   * Cross-axis alignment of slotted children — `center` (default), `start` (left/top), or `end` (right/bottom).
   */
  @property({ type: String })
  align?: "center" | "start" | "end" = "center";
  /**
   * Gap between slotted children (any CSS length). Defaults to `1em`. Prefer `--space-stack` / `--space-row` tokens.
   */
  @property({ type: String })
  gap?: string | undefined;

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = html`
      <style>
        div {
          --font-size: ${parseVariables(
            cssVar("font-size", this.size),
            "1rem"
          )};
          --font-family: ${parseVariables(
            cssVar("font-family", this.fontFamilyGroup)
          )};
          --font-weight: ${parseVariables(
            cssVar("font-weight", this.fontWeight)
          )};

          --rounded: ${parseVariables(cssVar("rounded", this.rounded), "8px")};
          --cursor: ${parseVariables(this.cursor, "default")};

          --background-color: ${parseVariables(
            cssVar("colors", this.backgroundColor, 50),
            cssVar("colors", this.backgroundColor),
            this.backgroundColor,
            cssVar("colors", this.themeColor, 50)
          )};
          --border-color: ${parseVariables(
            cssVar("colors", this.borderColor, 400),
            cssVar("colors", this.borderColor),
            this.borderColor,
            cssVar("colors", this.themeColor, 400)
          )};
          --border-width: ${parseVariables(
            cssVar("border-width", this.borderWidth),
            "1px"
          )};
          --border-style: ${parseVariables(
            cssVar("border-style", this.borderStyle),
            "solid"
          )};

          --width: ${parseVariables(cssVar("width", this.width), "auto")};
          --height: ${parseVariables(cssVar("height", this.height), "auto")};

          --padding: ${parseVariables(
            cssVar("padding", this.padding),
            this.padding,
            "1em"
          )};

          --color: ${parseVariables(
            cssVar("colors", this.color, 800),
            cssVar("colors", this.color),
            this.color,
            "inherit"
          )};

          --gap: ${parseVariables(cssVar("gap", this.gap), "1em")};

          --align: ${this.align};
        }
      </style>
    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.container, ":host")}
      ${additionalCss}

      <div data-testid=${this.testId || nothing}>
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    div {
      display: flex;
      flex-direction: column;
      align-items: var(--align);
      justify-content: center;

      background-color: var(--background-color);
      color: var(--color);

      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);

      border-style: var(--border-style);
      border-radius: var(--rounded);
      border-color: var(--border-color);
      border-width: var(--border-width);

      cursor: var(--cursor);

      width: var(--width);
      height: var(--height);

      padding: var(--padding);
      gap: var(--gap);
    }
  `;
}

declare global {
  interface HTMLElementContainerNameMap {
    "ssk-container": Container;
  }
}

if (!customElements.get("ssk-container")) {
  customElements.define("ssk-container", Container);
}
