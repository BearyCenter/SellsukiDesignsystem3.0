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
import { DropdownState, valueContext } from "./dropdown";

/**
 * Sellsuki Dropdown Preview — DS 3.0
 *
 * Read-only chip that mirrors the current value of an `<ssk-dropdown>`.
 * Useful inside summary rows or filter bars where you want to surface the
 * selected option without offering a re-open affordance.
 *
 * Consumes the parent dropdown's context — must be placed inside (or
 * within the same subtree as) an `<ssk-dropdown>` provider. For an
 * interactive trigger use `<ssk-dropdown-button>`.
 */
export class DropdownPreview extends LitElement {
  static registeredName = "ssk-dropdown-preview";

  /**
   * Shared dropdown state consumed from the surrounding `<ssk-dropdown>` via
   * Lit context. Used to read the current value for display. Internal — never
   * set this from outside.
   */
  @consume({ context: valueContext, subscribe: true })
  @property({ attribute: false })
  public vault?: DropdownState;

  /**
   * Active theme injected via Lit context by `<ssk-theme-provider>`. Resolves
   * the brand token set (sellsuki / patona / oc2plus) — do not set manually.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  /**
   * Stable hook for end-to-end tests. Rendered as `data-testid` on the preview
   * chip so it can be located reliably.
   */
  // BaseAttributes
  @property({ type: String })
  testId?: string;

  /**
   * Brand colour role used for accent styling. Defaults to `primary` and falls
   * back to the brand context when unset.
   */
  // ThemeValue
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  /**
   * Optional foreground colour role override. Leave unset to inherit
   * `themeColor`.
   */
  @property({ type: String })
  color?: ColorRole | ColorName;

  /**
   * Preview chip font scale. Falls back to the parent dropdown's `size` when
   * that is set; defaults to `md`.
   */
  @property({ type: String,reflect: true })
  size: Size = "md";

  /**
   * Font-family group token used for the preview label. Defaults to `sans`;
   * switch to `serif` or `display` for branded contexts.
   */
  // font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  /**
   * Optional font-weight token override (`light`, `normal`, `medium`, `bold`).
   * Leave unset to inherit the size-default weight.
   */
  @property({ type: String })
  fontWeight?: FontWeight;

  /**
   * Static value rendered inside the chip. When unset, the default slot
   * content is shown instead (useful for icon + text composition).
   */
  @property({ type: String })
  value?: string = "";

  /**
   * When true, the preview chip is rendered in the muted disabled colour. The
   * chip is non-interactive either way — this only affects styling.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  render() {
    if (this.hidden) {
      return nothing;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.dropdown, ":host")}
      <style>
      :host {
        --color-disabled: ${parseVariables(cssVar("colors", "gray", 400))};
      }
    </style>

      <span class="container" data-testid=${this.testId || nothing}>
        <slot name="prefix"></slot>
        <span class="label">
          <slot></slot>
        </span>
        <slot name="postfix"></slot>
      </span>
    `;
  }

  static styles = css`
    .container {
      display: grid;
      grid-auto-flow: column;
      align-items: center;
      gap: 8px;
      padding: 0.2em 0;

      color: var(--color);

      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
    }

    :host([size="sm"]) .container {
      padding: 4px 0;
    }

    .label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    :host([disabled]) .container {
      color: var(--color-disabled);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-dropdown-preview": DropdownPreview;
  }
}

if (!customElements.get("ssk-dropdown-preview")) {
  customElements.define("ssk-dropdown-preview", DropdownPreview);
}
