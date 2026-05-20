import { consume, provide } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";

import "../../elements/icon";
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

import { createContext } from "@lit/context";
export type DropdownState = {
  setValue: (value: string, el: HTMLElement) => void;
  clearValue?: () => void;
  isOpened?: boolean;
  disabled?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  value?: string | string[];
  multiSelect?: boolean;
  showClearButton?: boolean;
  isSelected?: string[];
  hideCheckIcon?: boolean;
  hideErrorIcon?: boolean;
  hideSuccessIcon?: boolean;
  size?: Size;
};

export const valueContext = createContext<DropdownState>(
  "ssk-dropdown-context"
);

/**
 * Dropdown / select container. Slots a trigger (`slot="selected"`) and
 * a list of `<ssk-dropdown-option>` children. Supports single-select,
 * multi-select, search filter, loading state, and clear button.
 *
 * @fires change - Fires when the selection changes (option picked or
 *   selection cleared). `detail` is the current value: `string` (single),
 *   `string[]` (multi-select), or `{ value: string | string[] }` on
 *   programmatic clear.
 */
export class Dropdown extends LitElement {
  static registeredName = "ssk-dropdown";

  private static currentOpenDropdown: Dropdown | null = null;

  /**
   * Active theme injected via Lit context by `<ssk-theme-provider>`. Resolves
   * the brand token set (sellsuki / patona / oc2plus) — do not set manually.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  /**
   * Stable hook for end-to-end tests. Rendered as `data-testid` on the root
   * container so Playwright / Cypress can locate the dropdown reliably.
   */
  // BaseAttributes
  @property({ type: String })
  testId?: string;

  /**
   * Brand colour role used for the active outline, hover wash, and selected
   * option highlight. Defaults to `info` and falls back to the brand context
   * when unset.
   */
  // ThemeValue
  @property({ type: String })
  themeColor: ColorRole | ColorName = "info";

  /**
   * Trigger height + font scale. Steps: `3xs`, `2xs`, `xs`, `sm`, `md`, `lg`,
   * `xl`, `2xl`–`9xl`. Defaults to `md` (40px trigger height).
   */
  @property({ type: String })
  size: Size = "md";

  /**
   * Font-family group token used for the trigger label and option text.
   * Defaults to `sans`; switch to `serif` or `display` for branded contexts.
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
   * Explicit width for the dropdown shell — any CSS length (e.g. `240px`,
   * `100%`). Defaults to `auto`, which sizes to the trigger content.
   */
  @property({ type: String })
  width?: string | undefined;

  /**
   * Floating field label rendered above the trigger. Leave unset to omit the
   * label row entirely.
   */
  // dropdown specific
  @property({ type: String })
  label: string | undefined;

  /**
   * Helper / hint text shown below the trigger. Switches to the error / success
   * colour token when `error` or `success` is true.
   */
  @property({ type: String })
  helperText: string | undefined;

  /**
   * Form-control name forwarded to native form serialization. Use when the
   * dropdown participates in a `<form>` submit.
   */
  @property({ type: String })
  name: string | undefined;

  /**
   * Current selection — `string` in single-select, `string[]` in multi-select.
   * Controlled-state contract: pair with the `change` event to update from
   * the parent.
   */
  @property({ type: String, attribute: false })
  value: string | string[] = "";

  /**
   * Validation status shortcut — `"error"` or `"success"` styles the trigger
   * border and helper text accordingly. Prefer the boolean `error` / `success`
   * props for new code.
   */
  @property({ type: String })
  status: "error" | "success" | undefined;

  /**
   * When true, the trigger is non-interactive and styled muted — clicks and
   * keyboard focus are blocked.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Hide the entire dropdown from layout (returns `nothing`). Cheaper than
   * unmounting when you toggle visibility frequently.
   */
  @property({ type: Boolean })
  hidden = false;

  /**
   * Error state — colours the border red and tints the helper text. Pair with
   * `helperText` to surface a validation message.
   */
  @property({ type: Boolean })
  error = false;

  /**
   * Success state — colours the border green and shows a check icon in the
   * trigger. Mutually exclusive with `error` in practice.
   */
  @property({ type: Boolean })
  success = false;

  /**
   * Renders a skeleton placeholder for the trigger (and label, if set) while
   * options load asynchronously.
   */
  @property({ type: Boolean })
  loading = false;

  /**
   * Reveal a search input above the option list that filters slotted options
   * by text content. Useful for long lists (>10 items).
   */
  @property({ type: Boolean })
  search = false;

  /**
   * Preferred placement of the option popover relative to the trigger. Auto-
   * flips when there is not enough viewport space. Defaults to `bottom`.
   */
  @property({ type: String })
  optionsAnchor: "top" | "bottom" | "left" | "right" = "bottom";

  /**
   * Horizontal alignment of the option popover when anchored top / bottom.
   * Defaults to `right`; auto-flips when overflow would occur.
   */
  @property({ type: String })
  optionsAlign: "left" | "right" = "right";

  /**
   * Width strategy for the option popover. `fit` matches the trigger width
   * (default); `auto` sizes to the longest option label.
   */
  @property({ type: String })
  optionsWidth: "auto" | "fit" = "fit";

  /**
   * Mark the field as required — renders a red `*` next to the label. Does
   * not enforce validation on submit; pair with form-level validation.
   */
  @property({ type: Boolean })
  required = false;

  /**
   * Maximum height (px) for the option popover before it scrolls. Defaults to
   * `248`px which fits roughly 6 standard-sized options.
   */
  @property({ type: Number })
  maxOptionsHeight: number = 248;

  /**
   * Switch to multi-select mode — options render `<ssk-checkbox>`, the trigger
   * stays open after a pick, and `change.detail` is a `string[]` of selected
   * values.
   */
  @property({ type: Boolean })
  multiSelect = false;

  /**
   * Array of selected option `value`s mirrored to children for highlight
   * styling. Updated internally on `setValue` — rarely set from outside.
   */
  @property({ type: Array })
  isSelected: string[] = [];

  /**
   * Imperative trigger — set to `true` to clear the current selection. Resets
   * back to `false` after the clear completes so callers can re-trigger it.
   */
  @property({ type: Boolean, reflect: true })
  clearValue: boolean = false;

  /**
   * In single-select mode, allow clicking the currently selected option to
   * unselect it (clearing `value` back to `""`). Defaults to `false`.
   */
  @property({ type: Boolean })
  allowUnselect: boolean = false;

  /**
   * Hide the check icon next to the selected single-select option. Useful when
   * the slotted option content already conveys its own selected state.
   */
  @property({ type: Boolean })
  hideCheckIcon: boolean = false;

  /**
   * Hide the error icon rendered in the trigger when `error` is true. The
   * border colour still reflects the error state.
   */
  @property({ type: Boolean })
  hideErrorIcon: boolean = false;

  /**
   * Hide the success icon rendered in the trigger when `success` is true. The
   * border colour still reflects the success state.
   */
  @property({ type: Boolean })
  hideSuccessIcon: boolean = false;

  /**
   * Shared state object provided to child `<ssk-dropdown-button>`,
   * `<ssk-dropdown-option>`, and `<ssk-dropdown-preview>` via Lit context.
   * Internal — do not set from outside.
   */
  @provide({ context: valueContext })
  @property({ attribute: false })

  state: DropdownState = {
    clearValue: () => {
      this.clearSelection();
    },
    setValue: (value: string) => {
      if (this.multiSelect) {
        const selected = Array.isArray(this.value) ? this.value : [];
        const v = value as string;

        this.value = selected.includes(v)
          ? selected.filter(v2 => v2 !== v)
          : [...selected, v];

      } else {
        const isSame = this.value === value;

        if (isSame && this.allowUnselect) {
          this.value = "";
        } else {
          this.value = value;
        }
      }

      this.state = {
        ...this.state,
        value: this.value,
        isSelected: Array.isArray(this.value)
          ? this.value
          : this.value
            ? [this.value]
            : [],
        isOpened: this.multiSelect ? true : false
      };

      this.dispatchEvent(
        new CustomEvent("change", {
          detail: this.value,
          bubbles: true,
          composed: true,
        })
      );
    },

    isOpened: false,
    disabled: this.disabled,
    isError: this.error,
    isSuccess: this.success,
    multiSelect: this.multiSelect,
    value: [],
    isSelected: this.isSelected,
    isLoading: this.loading,
    size: this.size,
  };

  /**
   * Pin the option popover open regardless of clicks — useful for Storybook
   * stories and inline demos. When set, outside-click dismissal is disabled.
   */
  @property({ type: Boolean, reflect: true })
  forceOpen = undefined;

  @state() private _searchQuery = "";

  private _handleSearchInput = (e: Event) => {
    this._searchQuery = (e.target as HTMLInputElement).value.toLowerCase();
    this._filterOptions();
  };

  private _filterOptions() {
    const slot = this.shadowRoot?.querySelector("slot:not([name])") as HTMLSlotElement | null;
    if (!slot) return;
    slot.assignedElements().forEach((el) => {
      const text = el.textContent?.toLowerCase() ?? "";
      (el as HTMLElement).style.display = this._searchQuery === "" || text.includes(this._searchQuery) ? "" : "none";
    });
  }

  private _resetSearch() {
    this._searchQuery = "";
    this._filterOptions();
  }

  private clearSelection() {
    this.value = this.multiSelect ? [] : "";
    this.isSelected = [];
    this.state = { ...this.state, value: this.value, isOpened: false, isSelected: [] };
    this._resetSearch();

    this.requestUpdate();
    this.dispatchEvent(new CustomEvent("change", { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  protected willUpdate(
    changedProperties: Map<string | number | symbol, unknown>
  ): void {
    if (changedProperties.has("disabled")) {
      this.state = { ...this.state, disabled: this.disabled };
    }

    if (changedProperties.has("error")) {
      this.state = { ...this.state, isError: this.error };
    }

    if (changedProperties.has("success")) {
      this.state = { ...this.state, isSuccess: this.success };
    }

    if (changedProperties.has("loading")) {
      this.state = { ...this.state, isLoading: this.loading };
    }

    if (changedProperties.has("value")) {
      this.state = { ...this.state, value: this.value || "" };
    }

    if (changedProperties.has("multiSelect")) {
      this.state = { ...this.state, multiSelect: this.multiSelect };
    }

    if (changedProperties.has("clearValue") && this.clearValue) {
      this.clearSelection();
      this.clearValue = false;
    }
    if (changedProperties.has("hideCheckIcon")) {
      this.state = { ...this.state, hideCheckIcon: this.hideCheckIcon };
    }
    if (changedProperties.has("hideErrorIcon")) {
      this.state = { ...this.state, hideErrorIcon: this.hideErrorIcon };
    }
    if (changedProperties.has("hideSuccessIcon")) {
      this.state = { ...this.state, hideSuccessIcon: this.hideSuccessIcon };
    }
    if (changedProperties.has("size")) {
      this.state = { ...this.state, size: this.size };
    }
  }

  private handleClickContainer = (e: MouseEvent) => {
    e.stopPropagation();

    if (this.forceOpen !== undefined) {
      return;
    }

    if (this.disabled) {
      return;
    }
    // Close the currently open dropdown if it's not this one
    if (Dropdown.currentOpenDropdown && Dropdown.currentOpenDropdown !== this) {
      Dropdown.currentOpenDropdown.state = { ...Dropdown.currentOpenDropdown.state, isOpened: false };
    }

    this.state = { ...this.state, isOpened: !this.state.isOpened };
    Dropdown.currentOpenDropdown = this.state.isOpened ? this : null;

    if (this.state.isOpened) {
      requestAnimationFrame(this.updateOptionsPosition);
    }
  };

  private scrollHandler = () => {
    if (this.state.isOpened) {
      this.updateOptionsPosition();
    }
  };

  private handleClickOutside = (_e: MouseEvent) => {
    if (this.forceOpen !== undefined) {
      return;
    }

    this.state = { ...this.state, isOpened: false };
    Dropdown.currentOpenDropdown = null;
    this._resetSearch();
  };

  firstUpdated() {
    window.addEventListener("click", this.handleClickOutside);
    window.addEventListener("scroll", this.scrollHandler, true);

    const resizeObserver = new ResizeObserver(() => {
      if (this.state.isOpened || this.forceOpen) {
        this.updateOptionsPosition();
      }
    });

    resizeObserver.observe(document.body);
    this.addEventListener("disconnected", () => {
      resizeObserver.disconnect();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener("click", this.handleClickOutside);
    window.removeEventListener("scroll", this.scrollHandler, true);

    if (Dropdown.currentOpenDropdown === this) {
      Dropdown.currentOpenDropdown = null;
    }
  }

  // update position on attribute changed
  updated() {
    this.updateOptionsPosition();
  }

  private calculatePosition() {
    const container = this.shadowRoot?.querySelector(".dropdown-container");
    const options = this.shadowRoot?.querySelector(".options-container");

    if (!container || !options)
      return { anchor: this.optionsAnchor, align: this.optionsAlign };

    const containerRect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const optionsHeight = this.maxOptionsHeight + 6; // max-height of options
    const optionsWidth = options.getBoundingClientRect().width;

    // Calculate vertical position
    const spaceBelow = viewportHeight - containerRect.bottom;
    const spaceAbove = containerRect.top;
    const spaceRight = viewportWidth - containerRect.right;
    const spaceLeft = containerRect.left;
    let anchor = this.optionsAnchor;

    if (this.optionsAnchor === "top") {
      if (spaceAbove < optionsHeight) {
        anchor = "bottom";
      }
    } else if (this.optionsAnchor === "bottom") {
      if (spaceBelow < optionsHeight) {
        anchor = "top";
      }
    } else if (this.optionsAnchor === "left") {
      if (spaceRight < optionsWidth) {
        anchor = "right";
      }
    } else if (this.optionsAnchor === "right") {
      if (spaceLeft < optionsWidth) {
        anchor = "left";
      }
    }

    // Calculate horizontal position
    
    let align = this.optionsAlign;

    if (anchor === "left" || anchor === "right") {
      return { anchor, align: "" }; 
    }

    if (this.optionsAlign === "left") {
      if (spaceRight < optionsWidth) {
        align = "right";
      }
    } else if (this.optionsAlign === "right") {
      if (spaceLeft < optionsWidth) {
        align = "left";
      }
    }

    return { anchor, align };
  }

  private updateOptionsPosition = () => {
    if (!(this.state.isOpened || this.forceOpen)) return;

    const { anchor, align } = this.calculatePosition();
    const options = this.shadowRoot?.querySelector(".options-container");

    if (options) {
      options.className = `options-container show ${anchor} ${align ? `align-${align}` : ""} ${this.optionsWidth}`;
    }
  };

  render() {
    if (this.hidden) {
      return nothing;
    }

   
    if (this.loading) {
      const sizes = ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"];
      const diff = sizes.includes(this.size) ? sizes.indexOf(this.size) - sizes.indexOf("md") : 0;
      const height = `${40 + diff * 4}px`;
        return html`
        <div class="container" style="--width: ${this.width ?? "auto"};">
          ${this.label
            ? html`<ssk-skeleton width="24.5%" height="14px" skeletonShape="capsule"></ssk-skeleton>`
            : nothing}
          <div class="loading-button" style="height: ${height};">
            <div class="loading-text">
              <ssk-skeleton width="47.5%" height="12px" skeletonShape="capsule"></ssk-skeleton>
            </div>
            <ssk-skeleton width="24px" height="24px" skeletonShape="circle"></ssk-skeleton>
          </div>
        </div>
      `;
      }
    

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.dropdown, ":host")}

      <style>
        :host {
          --color: ${parseVariables(cssVar("colors", "text", 500))};
          --color-disabled: ${parseVariables(cssVar("colors", "text", 300))};

          --color-helper: ${parseVariables(cssVar("colors", "gray", 500))};

          --options-background-color: ${parseVariables(
            cssVar("colors", "background", 50)
          )};

          --background-color: ${parseVariables(
            cssVar("colors", "background", 50)
          )};

          --background-color-hover: ${parseVariables(
            cssVar("colors", this.themeColor, 50)
          )};

          --background-color-disabled: ${parseVariables(
            cssVar("colors", "border", 50)
          )};

          --border-color: ${parseVariables(cssVar("colors", "gray", 200))};
          --font-color: ${parseVariables(
            cssVar("colors", this.themeColor, 500)
          )};
          --border-color-active: ${parseVariables(
            cssVar("colors", this.themeColor, 600)
          )};
          --border-color-disabled: ${parseVariables(
            cssVar("colors", "border", 100)
          )};

          --outline-color-active: ${parseVariables(
            cssVar("colors", this.themeColor, 200)
          )};

          --font-family: ${parseVariables(
            cssVar("font-family", this.fontFamilyGroup)
          )};
          --font-weight: ${parseVariables(
            cssVar("font-weight", this.fontWeight)
          )};
          --font-size: ${parseVariables(cssVar("font-size", this.size))};
          --line-height: ${parseVariables(cssVar("font-size", this.size))};

          --gap: ${parseVariables(cssVar("spacing", this.size), "1em")};
          --rounded: ${parseVariables(cssVar("rounded", this.size))};

          --color-error: ${parseVariables(cssVar("colors", "error", 600))};
          --color-helper-error: ${parseVariables(
            cssVar("colors", "error", 600)
          )};
          --border-color-error: ${parseVariables(
            cssVar("colors", "error", 600)
          )};
          --outline-color-error: ${parseVariables(
            cssVar("colors", "error", 300)
          )};

          --color-success: ${parseVariables(cssVar("colors", "success", 600))};
          --color-helper-success: ${parseVariables(
            cssVar("colors", "success", 600)
          )};
          --border-color-success: ${parseVariables(
            cssVar("colors", "success", 600)
          )};
          

          --width: ${parseVariables(
            cssVar("width", this.width),
            this.width,
            "auto"
          )};

          --overflow-options: auto;
        }

        div.options-container.show {
          max-height: ${this.maxOptionsHeight}px;
        }
      </style>
     
      <div class="container ${this.error ? "error" : ""} ${this.success ? "success" : ""}" id="container">
        ${this.label
          ? html` <label
              >${this.label}
              ${this.required ? html`<span>*</span>` : nothing}</label
            >`
          : nothing}
        <div class="dropdown-container">
          <slot name="selected" @click=${this.handleClickContainer}></slot>

          <div
            class="options-container ${this.state.isOpened || this.forceOpen
              ? "show"
              : ""}  ${this.optionsWidth}"
            @click=${(e: Event) => e.stopPropagation()}
          >
            ${this.search ? html`
              <div class="search-box">
                <input
                  class="search-input"
                  type="text"
                  placeholder="Search..."
                  .value=${this._searchQuery}
                  @input=${this._handleSearchInput}
                  @click=${(e: Event) => e.stopPropagation()}
                />
              </div>
            ` : nothing}
            <slot></slot>
          </div>
        </div>
        ${this.helperText
          ? html`<label class="helper">${this.helperText}</label>`
          : nothing}
      </div>
    `;
  }

  static styles = css`
    div,
    label {
      color: var(--color);
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
    }

    div.container,
    :host {
      display: flex;
      flex-direction: column;
      width: var(--width);
      gap: 0.25em;
    }

    div.dropdown-container {
      position: relative;
      cursor: pointer;
    }

    div.options-container {
      display: none;
      box-sizing: border-box;

      position: absolute;
      z-index: 4;
      left: 0;
      background-color: var(--options-background-color);
      box-shadow: 0px 19px 5px 0px rgba(17, 24, 39, 0),
        0px 12px 5px 0px rgba(17, 24, 39, 0.01),
        0px 7px 4px 0px rgba(17, 24, 39, 0.03),
        0px 3px 3px 0px rgba(17, 24, 39, 0.05),
        0px 1px 2px 0px rgba(17, 24, 39, 0.07),
        0px 0px 0px 0px rgba(17, 24, 39, 0.09);
      border-radius: var(--rounded);
      border: 1px solid var(--stroke-primary, #e5e7eb);
      padding: 0.17em 0.17em;
      overflow-x: hidden;

      width: 100%;

      color: var(--color);

      max-height: 0px;
    }

    div.options-container.bottom {
      top: calc(100% + 6px);
    }

    div.options-container.top {
      bottom: calc(100% + 6px);
    }
    
    div.options-container.left {
      right: calc(100% + 6px);
      left: auto;
      top: 0;
    }

    div.options-container.right {
      left: calc(100% + 6px);
      right: auto;
      top: 0;
    }

  div.options-container.align-left {
    left: 0;
    right: auto;
  }

  div.options-container.align-right {
    right: 0;
    left: auto;
  }

    div.options-container.auto {
      width: max-content;
    }

    div.options-container.fit {
      width: 100%;
    }

    div.options-container.show {
      display: flex;
      flex-direction: column;
      gap: 0.125em;
      overflow: var(--overflow-options);
    }

    label.helper {
      font-size: 0.75em;
      line-height: 0.75em;
      font-weight: var(--font-weight-normal, 400);
      color: var(--color-helper);
    }

    .error {
      label.helper {
        color: var(--color-helper-error);
      }
    }

    .success {
      label.helper {
        color: var(--color-helper-success);
      }
    }

    div.container > label > span {
      color: red;
    }

    div.loading-button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid var(--stroke-primary, #e5e7eb);
      border-radius: var(--radius-md, 8px);
      padding: 0 1em;
      height: var(--loading-height, 40px);
      box-sizing: border-box;
    }
  div.loading-text {
    flex: 1;
    overflow: hidden;
  }

  .search-box {
    padding: 0.25em 0.25em 0.375em;
    flex-shrink: 0;
  }

  .search-input {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid var(--stroke-primary, #e5e7eb);
    border-radius: var(--radius-sm, 6px);
    padding: 0.375em 0.625em;
    font-size: var(--font-size);
    font-family: var(--font-family);
    color: var(--color);
    background: var(--bg-primary, #fff);
    outline: none;
    transition: border-color 0.15s ease;
  }

  .search-input:focus {
    border-color: var(--border-color-active, #0ea5e9);
  }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-dropdown": Dropdown;
  }
}

if (!customElements.get("ssk-dropdown")) {
  customElements.define("ssk-dropdown", Dropdown);
}
