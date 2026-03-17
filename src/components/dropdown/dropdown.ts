import { consume, provide } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
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
  value?: string | string[];
  multiSelect?: boolean;
  showClearButton?: boolean;
  isSelected?: string[];
};

export const valueContext = createContext<DropdownState>(
  "ssk-dropdown-context"
);

@customElement("ssk-dropdown")
export class Dropdown extends LitElement {
  static registeredName = "ssk-dropdown";

  private static currentOpenDropdown: Dropdown | null = null;

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  // ThemeValue
  @property({ type: String })
  themeColor: ColorRole | ColorName = "background";

  @property({ type: String })
  size: Size = "md";

  // font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight?: FontWeight;

  @property({ type: String })
  width?: string | undefined;

  // dropdown specific
  @property({ type: String })
  label: string | undefined;

  @property({ type: String })
  helperText: string | undefined;

  @property({ type: String })
  name: string | undefined;

  @property({ type: String, attribute: false })
  value: string | string[] = "";

  @property({ type: String })
  status: "error" | "success" | undefined;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  hidden = false;

  @property({ type: Boolean })
  error = false;

  @property({ type: Boolean })
  search = false;

  @property({ type: String })
  optionsAnchor: "top" | "bottom" | "left" | "right" = "bottom";

  @property({ type: String })
  optionsAlign: "left" | "right" = "right";

  @property({ type: String })
  optionsWidth: "auto" | "fit" = "fit";

  @property({ type: Boolean })
  required = false;

  @property({ type: Number })
  maxOptionsHeight: number = 248;

  @property({ type: Boolean })
  multiSelect = false;

  @property({ type: Array })
  isSelected: string[] = [];

  @property({ type: Boolean, reflect: true })
  clearValue: boolean = false;

  @property({ type: Boolean })
  allowUnselect: boolean = false;

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
        })
      );
    },

    isOpened: false,
    disabled: this.disabled,
    isError: this.error,
    multiSelect: this.multiSelect,
    value: [],
    isSelected: this.isSelected,
  };

  @property({ type: Boolean, reflect: true })
  forceOpen = undefined;

  private clearSelection() {
    this.value = this.multiSelect ? [] : "";
    this.isSelected = [];
    this.state = { ...this.state, value: this.value, isOpened: false, isSelected: [] };

    this.requestUpdate();
    this.dispatchEvent(new CustomEvent("change", { detail: { value: this.value } }));
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
      if (spaceLeft < optionsWidth) {
        align = "right";
      }
    } else if (this.optionsAlign === "right") {
      if (spaceRight < optionsWidth) {
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

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.dropdown, ":host")}

      <style>
        :host {
          --color: ${parseVariables(cssVar("colors", "text", 500))};
          --color-disabled: ${parseVariables(cssVar("colors", "text", 300))};

          --color-helper: ${parseVariables(cssVar("colors", "text", 300))};

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

          --border-color: ${parseVariables(cssVar("colors", "border", 50))};
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

      <div class="container ${this.error ? "error" : ""}" id="container">
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
      border: 1px solid var(--ssk-colors-gray-200);
      padding: 0.5em 0.25em;
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
      font-weight: 200;
      color: var(--color-helper);
    }

    .error {
      label.helper {
        color: var(--color-helper-error);
      }
    }

    div.container > label > span {
      color: red;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-dropdown": Dropdown;
  }
}
