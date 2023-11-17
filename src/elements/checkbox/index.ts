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
  Size,
  Theme,
} from "../../types/theme";
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
  size: Size = "md";
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
  @property({ type: Boolean })
  indeterminate = false;
  @property({ type: Boolean })
  disabled = false;

  render() {
    if (this.hidden) {
      return nothing;
    }

    return html`
      <style></style>
      <div class="checkbox-wrapper">
        <input id="checkbox" type="checkbox" />
        <label for="checkbox"><slot></slot></label>
      </div>
    `;
  }

  static styles = css`
    @supports (-webkit-appearance: none) or (-moz-appearance: none) {
      .checkbox-wrapper input[type="checkbox"] {
        --active: #275efe;
        --active-inner: #fff;
        --focus: 2px rgba(39, 94, 254, 0.3);
        --border: #bbc1e1;
        --border-hover: #275efe;
        --background: #fff;
        --disabled: #f6f8ff;
        --disabled-inner: #e1e6f9;
        -webkit-appearance: none;
        -moz-appearance: none;
        height: var(--height);
        width: var(--width);
        outline: none;
        display: inline-block;
        vertical-align: top;
        position: relative;
        margin: 0;
        cursor: pointer;
        border: 1px solid var(--bc, var(--border));
        background: var(--b, var(--background));
        transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
      }
      .checkbox-wrapper input[type="checkbox"]:after {
        content: "";
        display: block;
        left: 0;
        top: 0;
        position: absolute;
        transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),
          opacity var(--d-o, 0.2s);
      }
      .checkbox-wrapper input[type="checkbox"]:checked {
        --b: var(--color-500);
        --bc: var(--color-500);
        --d-o: 0.3s;
        --d-t: 0.6s;
        --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
      }
      .checkbox-wrapper input[type="checkbox"]:disabled {
        --b: var(--disabled);
        cursor: not-allowed;
        opacity: 0.9;
      }
      .checkbox-wrapper input[type="checkbox"]:disabled:checked {
        --b: var(--disabled-inner);
        --bc: var(--border);
      }
      .checkbox-wrapper input[type="checkbox"]:disabled + label {
        cursor: not-allowed;
      }
      .checkbox-wrapper
        input[type="checkbox"]:hover:not(:checked):not(:disabled) {
        --bc: var(--border-hover);
      }
      .checkbox-wrapper input[type="checkbox"]:focus {
        box-shadow: 0 0 0 3px var(--color-200);
      }
      .checkbox-wrapper input[type="checkbox"]:not(.switch) {
        width: 21px;
      }
      .checkbox-wrapper input[type="checkbox"]:not(.switch):after {
        opacity: var(--o, 0);
      }
      .checkbox-wrapper input[type="checkbox"]:not(.switch):checked {
        --o: 1;
      }
      .checkbox-wrapper input[type="checkbox"] + label {
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
        margin-left: 4px;
      }

      .checkbox-wrapper input[type="checkbox"]:not(.switch) {
        border-radius: var(--border-radius, 3px);
      }
      .checkbox-wrapper input[type="checkbox"]:not(.switch):after {
        width: 30%;
        height: 60%;
        border: 2px solid var(--color);
        border-top: 0;
        border-left: 0;
        left: 33%;
        top: 7%;
        transform: rotate(var(--r, 20deg));
      }
      .checkbox-wrapper input[type="checkbox"]:not(.switch):checked {
        --r: 43deg;
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
