import { consume } from "@lit/context";
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

@customElement("ssk-dropdown-v2")
export class DropdownV2 extends LitElement {
  static registeredName = "ssk-dropdown-v2";

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

  @property({ type: String })
  optionsAnchor: "top" | "bottom" = "bottom";

  @property({ type: String })
  optionsAlign: "left" | "right" = "right";

  @property({ type: String })
  optionsWidth: "auto" | "fit" = "fit";

  @property({ type: Boolean })
  required = false;

  private hover = false;

  private opened = false;

  private handleMouseClick = (e: MouseEvent) => {
    e.stopPropagation();

    if (this.disabled) {
      return;
    }

    this.opened = !this.opened;
    this.requestUpdate();
  };

  private handleMouseClickOutside = (_e: MouseEvent) => {
    this.opened = false;
    this.requestUpdate();
  };

  private handleMouseEnter() {
    this.hover = true;
    this.requestUpdate();
  }

  private handleMouseLeave() {
    this.hover = false;
    this.requestUpdate();
  }

  firstUpdated() {
    window.addEventListener("click", this.handleMouseClickOutside);
  }

  disconnectedCallback() {
    window.removeEventListener("click", this.handleMouseClickOutside);
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
      : parseVariables(cssVar("colors", this.themeColor, 100));
  }
  getFontColor() {
    return this.hover
      ? parseVariables(cssVar("colors", this.themeColor, 500))
      : parseVariables(cssVar("colors", "text", 500));
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
        <div
          class="dropdown-container"
          @mouseenter=${this.handleMouseEnter}
          @mouseleave=${this.handleMouseLeave}
          @click=${this.handleMouseClick}
        >
          <slot name="selected"></slot>
        </div>
        <ssk-dropdown-options-container-v2 .hidden=${this.opened}>
          <slot></slot>
        </ssk-dropdown-options-container-v2>
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
    "ssk-dropdown-v2": DropdownV2;
  }
}
