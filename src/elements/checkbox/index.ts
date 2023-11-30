import { consume } from "@lit-labs/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { ThemeValue } from "../../types/base-attributes";
import {
  ColorName,
  ColorRole,
  FontFamilyGroup,
  FontWeight,
  cssVar,
  parseVariables,
  parseThemeToCssVariables,
  Size,
  Theme,
} from "../../types/theme";

type Options = {
  label: string;
  value: string;
  disabled?: boolean;
};
@customElement("ssk-checkbox")
export class Checkbox extends LitElement implements ThemeValue {
  static registeredName = "ssk-checkbox";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  @property({ type: String })
  color?: ColorRole | ColorName = "";
  @property({ type: String })
  backgroundColor?: string | undefined = "transparent";
  @property({ type: String })
  borderColor?: string | undefined;

  @property({ type: String })
  size: Size = "sm";
  @property({ type: String })
  padding?: Size;
  @property({ type: String })
  fontSize?: string | undefined;
  @property({ type: String })
  lineHeight?: string | undefined;
  @property({ type: String })
  gap?: string | undefined;
  @property({ type: String })
  rounded?: string | undefined;
  @property({ type: String })
  margin?: string | undefined;

  // font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  @property({ type: String })
  borderWidth?: string | undefined;
  @property({ type: String })
  boxShadow?: string | undefined;
  @property({ type: String })
  dropShadow?: string | undefined;
  @property({ type: String })
  width?: string | undefined;
  @property({ type: String })
  height?: string | undefined;
  @property({ type: String })
  minWidth?: string | undefined;
  @property({ type: String })
  minHeight?: string | undefined;
  @property({ type: String })
  maxWidth?: string | undefined;
  @property({ type: String })
  maxHeight?: string | undefined;

  // checkbox specific
  @property({ type: Boolean })
  hidden = false;
  @property({ type: String })
  label?: string | undefined;
  @property({ type: Boolean })
  checked = false;
  @property({ type: String })
  value: string | undefined;
  @property({ type: Boolean })
  disabled = false;
  @property({ type: Array<Options> })
  options?: Options[] | undefined;

  render() {
    if (this.hidden) {
      return nothing;
    }

    const additionalCss = `
    --active-100:  ${parseVariables(cssVar("colors", this.themeColor, 100))};
    --active-500:  ${parseVariables(cssVar("colors", this.themeColor, 500))};
    --disabled-200:  ${parseVariables(cssVar("colors", "gray", 200))};
    --disabled-300:  ${parseVariables(cssVar("colors", "gray", 300))};
    --disabled-400:  ${parseVariables(cssVar("colors", "gray", 400))};

    --border-radius: ${parseVariables(cssVar("rounded", this.rounded), "20%")};
    --width: ${parseVariables(
      cssVar("width", this.width),
      cssVar("width", this.size),
      this.width,
      "auto"
    )};
    --height: ${parseVariables(
      cssVar("height", this.height),
      cssVar("height", this.size),
      this.height,
      "auto"
    )};
    --font-size: ${parseVariables(
      cssVar("font-size", this.fontSize),
      cssVar("font-size", this.size)
    )};`;

    const groupCheckbox = html` <div class="group-checkbox-wrapper">
      <input
        type="checkbox"
        value=${this.value}
        .disabled=${this.disabled}
        .checked=${this.checked}
      />
      <label for="checkbox">${this.label}</label>
      <div class="child-checkbox">
        ${this.options?.map((o) => {
          return html`
            <input type="checkbox" value=${o.value} .disabled=${o.disabled} />
            <label for="checkbox">${o.label}</label>
          `;
        })}
      </div>
    </div>`;

    const checkbox = html`<div class="checkbox-wrapper">
      <input
        type="checkbox"
        value=${this.value}
        .disabled=${this.disabled}
        .checked=${this.checked}
      />
      <label for="checkbox">${this.label}</label>
    </div>`;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.checkbox, "input")}

      <style>
        div, input {
          ${additionalCss}
        }
      </style>
      ${this.options && this.options?.length > 0 ? groupCheckbox : checkbox}
    `;
  }

  static styles = css`
    @supports (-webkit-appearance: none) or (-moz-appearance: none) {
      .checkbox-wrapper input[type="checkbox"] {
        --background-color: #fff;
        --checked-color: #fff;

        --border-color: var(--disabled-200);
        -moz-appearance: none;
        appearance: none;
        height: var(--height);
        width: var(--width);
        outline: none;
        display: inline-block;
        position: relative;
        cursor: pointer;
        border: 2px solid var(--border-color);
        border-radius: var(--border-radius);
        background-color: var(--background-color);
        vertical-align: middle;
      }
      .checkbox-wrapper input[type="checkbox"] + label {
        display: inline-block;
        cursor: pointer;
        margin-left: 4px;
        font-size: var(--font-size);
      }

      .checkbox-wrapper input[type="checkbox"]:hover:not(:disabled) {
        --border-color: var(--active-500);
        box-shadow: 0 0 0 2px var(--active-100);
      }

      .checkbox-wrapper input[type="checkbox"]:checked {
        --background-color: var(--active-500);
        --border-color: var(--active-500);
      }
      .checkbox-wrapper input[type="checkbox"]:checked::before {
        content: "";
        position: absolute;
        top: 45%;
        left: 25%;
        width: 65%;
        height: 10%;
        background: var(--checked-color);
        transform: rotate(-45deg);
      }
      .checkbox-wrapper input[type="checkbox"]:checked::after {
        content: "";
        position: absolute;
        top: 55%;
        left: 10%;
        width: 35%;
        height: 10%;
        background: var(--checked-color);
        transform: rotate(45deg);
      }

      .checkbox-wrapper input[type="checkbox"]:disabled {
        --background-color: var(--disabled-200);
        --border-color: var(--disabled-300);
        cursor: not-allowed;
        opacity: 0.9;
      }
      .checkbox-wrapper input[type="checkbox"]:disabled:checked {
        --checked-color: var(--disabled-400);
      }
      .checkbox-wrapper input[type="checkbox"]:disabled + label {
        cursor: not-allowed;
      }
    }

    .checkbox-wrapper * {
      box-sizing: inherit;
    }
    .checkbox-wrapper *:before,
    .checkbox-wrapper *:after {
      box-sizing: inherit;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-checkbox": Checkbox;
  }
}
