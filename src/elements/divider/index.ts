import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
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
 * Sellsuki Divider — DS 3.0
 *
 * Horizontal rule that can carry an optional centered label (e.g. "OR",
 * "หรือ"). Uses the `--stroke-secondary` token for the line and respects
 * font tokens for the inset label, so it never falls below the 18px text
 * minimum.
 *
 * Reach for `<ssk-divider>` to separate form sections, paginated lists,
 * or "or-continue-with" auth flows. For decorative spacing without a
 * line, prefer CSS gap / `--space-stack` tokens.
 *
 * @example
 *   <ssk-divider></ssk-divider>
 *   <ssk-divider>หรือ</ssk-divider>
 *
 * @slot - Optional inline label centered on the line
 * @csspart text - The label text element
 */
export class Divider extends LitElement implements ThemeValue {
  static registeredName = "ssk-divider";

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  /**
   * Brand accent for the line color. Defaults to `gray` (`--stroke-secondary`). Pass a palette
   * role (e.g. `"primary"`) for a tinted divider above section headings.
   */
  @property({ type: String })
  themeColor: ColorRole | ColorName = "gray";
  /**
   * Override for both the line and the inset label color.
   */
  @property({ type: String })
  color?: ColorRole | ColorName;
  /**
   * Background color override for the divider strip (rare — typically handled by the surrounding container).
   */
  @property({ type: String })
  backgroundColor?: string | undefined;
  /**
   * Border color override (any CSS color or palette token). Use when the divider needs to match
   * a custom container's stroke exactly.
   */
  @property({ type: String })
  borderColor?: string | undefined;

  /**
   * Size token — `xs`–`xl`. Affects label font-size and the gap around the inset label.
   */
  @property({ type: String })
  size: Size = "md";
  /**
   * Inner padding token (`xs`–`xl`) — controls the vertical thickness of the line band.
   */
  @property({ type: String })
  padding?: Size;
  /**
   * Override label font-size (any CSS length). DS 3.0 floor is 18px; the divider label inherits
   * the `--font-size-caption` step by default.
   */
  @property({ type: String })
  fontSize?: string | undefined;
  /**
   * Override label line-height (any CSS length / unitless number).
   */
  @property({ type: String })
  lineHeight?: string | undefined;
  /**
   * Gap between the inset label and the surrounding lines (any CSS length).
   */
  @property({ type: String })
  gap?: string | undefined;
  /**
   * Outer margin override (any CSS length). Prefer parent layout gap.
   */
  @property({ type: String })
  margin?: string | undefined;

  // font
  /**
   * Font family group used by the inset label — `sans` (default) or `mono`.
   */
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  /**
   * Font weight token for the inset label. Defaults to `normal`.
   */
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  // divider specific
  /**
   * When set, the divider renders nothing (returns `nothing`) — use for conditional show/hide without DOM teardown.
   */
  @property({ type: Boolean })
  hidden = false;
  /**
   * Layout direction — `horizontal` (default, full-width line) or `vertical` (column separator).
   * Vertical dividers ignore the `label` slot.
   */
  @property({ type: String })
  orientation: "horizontal" | "vertical" = "horizontal";
  /**
   * Optional inline label centered on the line (e.g. `"OR"`, `"หรือ"`). Slotted content takes
   * precedence if both are supplied; horizontal orientation only.
   */
  @property({ type: String })
  label?: string | undefined;

  render() {
    if (this.hidden) {
      return nothing;
    }

    let textCss = `
    --text-color: ${parseVariables(
      cssVar("colors", this.color, 500),
      cssVar("colors", this.themeColor, 500)
    )};
    
    --text-divider-gap: ${parseVariables(
      cssVar("spacing", this.gap),
      cssVar("spacing", this.size)
    )};
    --font-size: ${parseVariables(
      cssVar("font-size", this.fontSize),
      cssVar("font-size", this.size)
    )};`;

    let additionalCss = `
    background-color: ${parseVariables(
      cssVar("colors", this.color),
      cssVar("colors", this.color, 200),
      this.color,
      cssVar("colors", this.themeColor, 200),
      cssVar("colors", "white", 200)
    )};
      
      padding: ${parseVariables(
        cssVar("padding", this.padding),
        cssVar("padding", this.size)
      )};

      margin: ${parseVariables(
        cssVar("margin", this.margin),
        cssVar("margin", this.size)
      )};
      `;

    if (this.orientation === "vertical") {
      additionalCss += `
        height: 100%;
        width: min-content;
        margin-top: 0;
        margin-bottom: 0;
      `;
    }

    if (this.orientation === "horizontal") {
      additionalCss += `
        width: 100%;
        height: min-content;
        margin-left: 0;
        margin-right: 0;
      `;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.divider, "div")}

      <style>
        .notext-divider {
          ${additionalCss}
        }

        .text-divider {
          ${textCss}
          display: flex;
          align-items: center;
          font-size: var(--font-size);
          color: var(--text-color);

          &:before, &:after {
            content: "";
            ${textCss}
            ${additionalCss}
          }

          &:before {
            margin-right: var(--text-divider-gap);
          }

          &:after {
            margin-left: var(--text-divider-gap);
          }
        }
      </style>
      <div
        class="${this.orientation == "horizontal" && this.label
          ? "text-divider"
          : "notext-divider"}"
      >
        ${this.orientation == "horizontal" && this.label ? this.label : null}
      </div>
    `;
  }

  static styles = css`
    div {
      box-sizing: border-box;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-divider": Divider;
  }
}

if (!customElements.get("ssk-divider")) {
  customElements.define("ssk-divider", Divider);
}
