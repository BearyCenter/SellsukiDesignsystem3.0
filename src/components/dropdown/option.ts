import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import "../../../src/elements/checkbox";
import "../../elements/icon";
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
 * Sellsuki Dropdown Option — DS 3.0
 *
 * Single selectable row inside `<ssk-dropdown>`. Reads selection state from
 * the parent dropdown context and reports clicks back through it. In
 * multi-select mode it renders an `<ssk-checkbox>`; in single-select it
 * just highlights when chosen.
 *
 * Must be a direct child of `<ssk-dropdown>` (alongside one
 * `<ssk-dropdown-button>` trigger). Slot the visible label in the default
 * slot.
 *
 * @example
 *   <ssk-dropdown-option value="paid">ชำระแล้ว</ssk-dropdown-option>
 *
 * @slot - Option label
 */
export class DropdownOption extends LitElement {
  static registeredName = "ssk-dropdown-option";

  /**
   * Shared dropdown state consumed from the parent `<ssk-dropdown>` via Lit
   * context — used to read selection and report clicks back. Internal — never
   * set this from outside.
   */
  @consume({ context: valueContext, subscribe: true })
  @property({ attribute: false })
  public state?: DropdownState;

  /**
   * Active theme injected via Lit context by `<ssk-theme-provider>`. Resolves
   * the brand token set (sellsuki / patona / oc2plus) — do not set manually.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  /**
   * Stable hook for end-to-end tests. Rendered as `data-testid` on the option
   * row so each pick target can be located reliably.
   */
  // BaseAttributes
  @property({ type: String })
  testId?: string;

  /**
   * Brand colour role used for the selected check icon. Defaults to `primary`
   * and falls back to the brand context when unset.
   */
  // ThemeValue
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  /**
   * Optional foreground colour role override for the option label. Leave unset
   * to inherit `themeColor`.
   */
  @property({ type: String })
  color?: ColorRole | ColorName;

  /**
   * Row height + font scale. Falls back to the parent dropdown's `size` when
   * that is set; defaults to `md`.
   */
  @property({ type: String })
  size: Size = "md";

  /**
   * Font-family group token used for the option label text. Defaults to
   * `sans`; switch to `serif` or `display` for branded contexts.
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
   * Stable identifier emitted to the parent dropdown on click — surfaces in
   * the `change` event payload. Required for selection to work.
   */
  @property({ type: String })
  value: string = "";

  /**
   * When true, the option is non-interactive and styled muted — clicks are
   * ignored and the row no longer reports back via context.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  private handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (!this.state) return;
    if (this.disabled) return;
    this.state.setValue(this.value, this);
  };

  

  render() {
    if (this.hidden) {
      return nothing;
    }
    const smallSizes = new Set<Size>(["3xs", "2xs", "xs", "sm"]);
    const currentSize = this.state?.size ?? this.size;
    const iconSize = smallSizes.has(currentSize as Size) ? "sm" : "md";

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.dropdown, ":host")}
      <style>
      :host {
        --color-disabled: ${parseVariables(cssVar("colors", "gray", 400))};
      }
    </style>

      <span
        class="container"
        @click=${this.handleClick}
        data-testid=${this.testId || nothing}
      >
        <slot name="prefix"></slot>
        <span class="label">
          <slot></slot>
        </span>
        <span class="postfix">
          <slot name="postfix">
            ${this.state?.multiSelect === false && !this.state?.hideCheckIcon && this.state?.isSelected?.includes(this.value)
              ? html`<ssk-icon color=${this.disabled ? "gray.400" : "info"} name="outline-check" size=${iconSize}></ssk-icon>`
              : nothing}
          </slot>
        </span>
      </span>
    `;
  }

  static styles = css`
    .container {
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-gap: 0.5em;
      padding: 0.32em 8px;

      color: var(--color);

      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);

      border-radius: var(--rounded);

      cursor: pointer;

      transition: background-color 0.2s ease-in-out;
    }

    .container:hover {
      background-color: var(--bg-primary-hover, #f9fafb);
      color: var(--color-hover);
    }
    .container:active {
      background-color: var(--background-color);
      color: var(--text-primary, #111827);
    }
    :host([disabled]) .container:hover {
      background-color: transparent;
      color: var(--color-disabled);
    }

    :host([disabled]) .container {
      cursor: not-allowed;
      color: var(--color-disabled);
    }

    .label {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5em;
        white-space: var(--white-space, normal);
        overflow-wrap: break-word;
    }
    

    .postfix {
      margin-left: auto;
      display: flex;
      align-items: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-dropdown-option": DropdownOption;
  }
}

if (!customElements.get("ssk-dropdown-option")) {
  customElements.define("ssk-dropdown-option", DropdownOption);
}
