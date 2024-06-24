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
  isOpened?: boolean;
  disabled?: boolean;
  isError?: boolean;
};

export const valueContext = createContext<DropdownState>(
  "ssk-dropdown-context"
);

@customElement("ssk-dropdown")
export class Dropdown extends LitElement {
  static registeredName = "ssk-dropdown";

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
  fontWeight: FontWeight = "normal";

  @property({ type: String })
  width?: string | undefined;

  // dropdown specific
  @property({ type: String })
  label: string | undefined;

  @property({ type: String })
  helperText: string | undefined;

  @property({ type: String })
  name: string | undefined;

  @property({ type: String })
  value: string | undefined;

  @property({ type: String })
  status: "error" | "success" | undefined;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  hover = false;

  @property({ type: Boolean })
  hidden = false;

  @property({ type: Boolean })
  error = false;

  @property({ type: Boolean })
  search = false;

  @property({ type: String })
  optionsAnchor: "top" | "bottom" = "bottom";

  @property({ type: String })
  optionsAlign: "left" | "right" = "right";

  @property({ type: String })
  optionsWidth: "auto" | "fit" = "fit";

  @property({ type: Boolean })
  required = false;

  @property({ type: Boolean })
  hideOptions = false;

  @provide({ context: valueContext })
  @property({ attribute: false })
  state: DropdownState = {
    setValue: (value: string) => {
      if (this.value === value) {
        return;
      }

      this.value = value;
      this.state.isOpened = false;

      this.requestUpdate();

      this.dispatchEvent(new Event("change"));
    },
    isOpened: false,
    disabled: this.disabled,
    isError: this.error,
  };

  protected willUpdate(
    changedProperties: Map<string | number | symbol, unknown>
  ): void {
    if (changedProperties.has("disabled")) {
      this.state.disabled = this.disabled;
    }

    if (changedProperties.has("error")) {
      this.state.isError = this.error;
    }
  }

  private setupOnClickContainer = (e: MouseEvent) => {
    e.stopPropagation();

    if (this.disabled) {
      return;
    }

    this.state.isOpened = !this.state.isOpened;
    this.requestUpdate();
  };

  private setupClickOutside = (_e: MouseEvent) => {
    this.state.isOpened = false;
    this.requestUpdate();
  };

  firstUpdated() {
    window.addEventListener("click", this.setupClickOutside);
  }

  disconnectedCallback() {
    window.removeEventListener("click", this.setupClickOutside);
  }

  getBackgroundColor() {
    return this.hover
      ? parseVariables(cssVar("colors", "background", 50))
      : parseVariables(
          cssVar("colors", this.themeColor, 50),
          cssVar("colors", "background", 50)
        );
  }
  getBorderColor() {
    return this.hover
      ? parseVariables(cssVar("colors", "border", 50))
      : parseVariables(
          cssVar("colors", this.themeColor, 100)
        );
  }
  getFontColor() {
    return this.hover
      ? parseVariables(cssVar("colors", this.themeColor, 500))
      : parseVariables(
          cssVar("colors", "text", 500)
        );
  }

  render() {
    const backgroundColor = this.getBackgroundColor();
    const borderColor = this.getBorderColor();
    const fontColor = this.getFontColor();

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

          --background-color: ${backgroundColor};

          --background-color-hover: ${parseVariables(
            cssVar("colors", this.themeColor, 50)
          )};

          --background-color-disabled: ${parseVariables(
            cssVar("colors", "border", 50)
          )};

          --border-color: ${borderColor};
          --font-color: ${fontColor};
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
          <slot name="selected" @click=${this.setupOnClickContainer}></slot>

          ${this.hideOptions
            ? nothing
            : html` <div
                class="options-container ${this.state.isOpened
                  ? "show"
                  : ""} ${this.optionsAnchor} ${this.optionsAlign} ${this
                  .optionsWidth}"
              >
                <slot></slot>
              </div>`}
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
      border-radius: var(--rounded);
      border: 1px solid var(--border-color);
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
      left: 0;
      right: auto;
    }

    div.options-container.right {
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
      max-height: 344px;
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
