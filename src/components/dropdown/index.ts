import { consume, provide } from "@lit-labs/context";
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
import "./option";
import "./preview";
import { Value, valueContext } from "./value";

@customElement("ssk-dropdown")
export class Dropdown extends LitElement {
  static registeredName = "ssk-dropdown";

  @provide({ context: valueContext })
  @property({ attribute: false })
  vault: Value = {
    setValue: (value: string) => {
      if (this.value === value) {
        return;
      }

      this.value = value;
      this.showOptions = false;

      this.requestUpdate();

      this.dispatchEvent(new Event("change"));
    },
  };

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  // ThemeValue
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  @property({ type: String })
  color?: ColorRole | ColorName;
  @property({ type: String })
  backgroundColor?: string | undefined;

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
  hidden = false;

  @property({ type: Boolean })
  error = false;

  @property({ type: Boolean })
  search = false;

  private onSearch = (e: Event) => {
    const input = e.target as HTMLInputElement;
    console.log(input.value);
  };

  private showOptions = false;

  private setupOnClickContainer = (e: MouseEvent) => {
    e.stopPropagation();

    if (this.disabled || this.showOptions) {
      return;
    }

    this.showOptions = true;
    this.requestUpdate();
  };

  private setupClickOutside = (_e: MouseEvent) => {
    this.showOptions = false;
    this.requestUpdate();
  };

  firstUpdated() {
    window.addEventListener("click", this.setupClickOutside);
    this.shadowRoot
      ?.getElementById("dropdown")
      ?.addEventListener("click", this.setupOnClickContainer);
  }

  disconnectedCallback() {
    window.removeEventListener("click", this.setupClickOutside);
    this.shadowRoot
      ?.getElementById("dropdown")
      ?.removeEventListener("click", this.setupOnClickContainer);
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.dropdown, ":host")}

      <style>
        :host {
          --color: ${parseVariables(
            cssVar("colors", this.color),
            cssVar("colors", this.color, 500),
            this.color,
            cssVar("colors", "text", 500)
          )};
          --color-disabled: ${parseVariables(cssVar("colors", "text", 300))};

          --color-helper: ${parseVariables(
            cssVar("colors", this.color),
            cssVar("colors", this.color, 300),
            this.color,
            cssVar("colors", "text", 300)
          )};

          --background-color: ${parseVariables(
            cssVar("colors", this.backgroundColor),
            cssVar("colors", this.backgroundColor, 50),
            this.backgroundColor,
            cssVar("colors", "background", 50)
          )};

          --background-color-hover: ${parseVariables(
            cssVar("colors", this.themeColor, 50)
          )};

          --background-color-disabled: ${parseVariables(
            cssVar("colors", "border", 50)
          )};

          --border-color: ${parseVariables(cssVar("colors", "border", 100))};
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

          --gap: ${parseVariables(cssVar("spacing", this.size))};
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

          --width: ${parseVariables(cssVar("width", this.width), "auto")};
        }
      </style>

      <div class="container ${this.error ? "error" : ""}" id="container">
        <label>${this.label}</label>
        <div class="dropdown-container">
          <div
            id="dropdown"
            class=${`dropdown ${this.disabled ? "disabled" : ""}`}
          >
            <span class="label-value" data-testid=${this.testId || nothing}>
              <slot name="selected"></slot>
            </span>
            <ssk-icon name="outline-chevron-down"></ssk-icon>
          </div>

          <div class="options-container ${this.showOptions ? "show" : ""}">
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

    div.container {
      display: flex;
      flex-direction: column;
      width: var(--width);
      gap: 0.25em;
    }

    div.dropdown-container {
      position: relative;
    }

    div.dropdown {
      display: grid;
      grid-template-columns: 1fr auto;
      /* overflow: hidden; */
      align-items: center;

      border-style: solid;
      transition: background-color 0.2s ease-in-out;
      background-color: var(--background-color);

      border-radius: var(--rounded);
      border: 1px solid var(--border-color);
      padding: 0 0.5em;

      gap: var(--gap);
      cursor: pointer;
    }

    div.dropdown.disabled {
      background-color: var(--background-color-disabled);
      border-color: var(--border-color-disabled);
      color: var(--color-disabled);
    }

    div.dropdown:focus-within {
      border-color: var(--border-color-active);
      outline: 4px solid var(--outline-color-active);
    }

    span.label-value {
      display: flex;
      align-items: baseline;
      justify-content: start;

      /* remove all style */
      border: none;
      outline: none;
      background-color: transparent;
      padding: 0.25em 0;
      margin: 0;
    }

    span.label-value.disabled {
      background-color: var(--background-color-disabled);
      border-color: var(--border-color-disabled);
      cursor: not-allowed;
      color: var(--color-disabled);
    }

    div.options-container {
      display: none;
      box-sizing: border-box;

      position: absolute;
      z-index: 4;
      top: 50px;
      left: 0;
      width: 100%;
      background-color: var(--background-color);
      border-radius: var(--rounded);
      border: 1px solid var(--border-color);
      padding: 0.5em 0.25em;
      overflow-x: hidden;

      color: var(--color);

      max-height: 0px;
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
      div.dropdown {
        border-color: var(--border-color-error);
        outline: 4px solid var(--outline-color-error);
      }

      label.helper {
        color: var(--color-helper-error);
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-dropdown": Dropdown;
  }
}
