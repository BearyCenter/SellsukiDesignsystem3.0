import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { redispatchEvents } from "../../helpers/lit";
import { ThemeValue } from "../../types/base-attributes";
import {
  ColorName,
  ColorRole,
  Size,
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";

export type GroupCheckbox = {
  defaultValue?: string[];
  options: checkboxOptions[];
};

export type checkboxOptions = {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  value: string;
};
export class Checkbox extends LitElement implements ThemeValue {
  static registeredName = "ssk-checkbox";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

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
  fontSize?: string | undefined;
  @property({ type: String })
  gap?: string | undefined;
  @property({ type: String })
  rounded?: string | undefined;

  // checkbox specific
  @property({ type: Boolean })
  hidden = false;
  @property({ type: String })
  label?: string | undefined;
  @property({ type: Boolean, reflect: true })
  checked = false;
  @property({ type: Boolean })
  indeterminate = false;
  @property({ type: Boolean })
  disabled = false;
  @property({ type: Object })
  group?: GroupCheckbox | undefined;

  // checkbox state
  @state()
  _isGroupCheckbox: boolean = false;
  @state()
  _checked: boolean = false;
  @state()
  _groupOptions: checkboxOptions[] = [];

  firstUpdated(changedProperties: Map<PropertyKey, unknown>) {
    super.firstUpdated(changedProperties);

    this._isGroupCheckbox = !!this.group;
    this._checked = this.checked;
    if (this.group?.defaultValue) {
      this._setGroupChecked(this.group?.defaultValue);
    }
  }

  updated(changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties);

    this._updateCheckboxState();
    if (changedProperties.has("checked")) {
      this._checked = this.checked;
    }
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    const isRenderGroupCheckbox = this.group
      ? html`
          <div class="group-checkbox">
            ${this._groupOptions.map(
              (g) => html`<div class="checkbox-wrapper">
                <input
                  type="checkbox"
                  data-testid=${this.testId
                    ? this.testId + "-" + g.value
                    : nothing}
                  .disabled=${!!g.disabled}
                  .checked=${!!g.checked}
                  value=${g.value}
                  @change=${(e: Event) => this._onChangeGroup(e)}
                />
                <label for="checkbox">${g.label}</label>
              </div>`,
            )}
          </div>
        `
      : nothing;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.checkbox, "input")}

      <style>
        div,
        input {
          --active-100: ${parseVariables(
            cssVar("colors", this.themeColor, 100),
          )};
          --active-500: ${parseVariables(
            cssVar("colors", this.themeColor, 500),
          )};
          --disabled-200: ${parseVariables(cssVar("colors", "gray", 200))};
          --disabled-300: ${parseVariables(cssVar("colors", "gray", 300))};
          --disabled-400: ${parseVariables(cssVar("colors", "gray", 400))};
          --border-radius: ${parseVariables(
            cssVar("rounded", this.rounded),
            "20%",
          )};
          --width: 0.7085em;
          --height: 0.7085em;
          --font-size: ${parseVariables(
            cssVar("font-size", this.fontSize),
            cssVar("font-size", this.size),
          )};
          --color: ${parseVariables(
            cssVar("colors", this.color, 500),
            cssVar("colors", this.color),
            this.color,
          )};
        }
      </style>
      <div class="checkbox-wrapper">
        <input
          type="checkbox"
          data-testid=${this.testId || nothing}
          .disabled=${this.disabled}
          .checked=${this._checked}
          @change=${(e: Event) => this._onChange(e)}
        />
        <label for="checkbox">${this.label}</label>
      </div>
      ${isRenderGroupCheckbox}
    `;
  }

  private _updateCheckboxState() {
    const checkbox = this.shadowRoot?.querySelector("input");

    const isCheckedAll = this._groupOptions.every((o) => o.checked);
    const isNotCheck = this._groupOptions.every((o) => !o.checked);

    let checked = this._isGroupCheckbox ? isCheckedAll : this.checked;
    let indeterminate = this._isGroupCheckbox
      ? !isCheckedAll && !isNotCheck
      : this.indeterminate;
    if (checkbox) {
      if (this._isGroupCheckbox) this._checked = checked;
      checkbox.indeterminate = indeterminate;
    }
  }

  private _setGroupChecked(value: string[]) {
    if (this.group) {
      this._groupOptions = this.group?.options.map((o) => {
        const checked = value.includes(o.value) ? true : false;

        return {
          ...o,
          checked,
        };
      });
    }
  }

  private _onChangeGroup(e: Event) {
    const groupCheckList = this._filterCheckedList(
      (e.target as HTMLInputElement).value,
      (e.target as HTMLInputElement).checked,
    );

    this._setGroupChecked(groupCheckList);
  }

  private _onChange(e: Event) {
    this._checked = (e.target as HTMLInputElement).checked;
    this.checked = this._checked;
    const groupList = this._groupOptions.map((o) => o.value);
    this._setGroupChecked(this._checked ? groupList : []);

    redispatchEvents(e, this);
  }

  private _filterCheckedList(value: string, checked: boolean): string[] {
    const list = this._groupOptions
      .map((o) => (o.value === value ? { ...o, checked } : o))
      .filter((o) => o.checked)
      .map((o) => o.value);

    return list;
  }

  static styles = css`
    @supports (-webkit-appearance: none) or (-moz-appearance: none) {
      .checkbox-wrapper input[type="checkbox"] {
        --background-color: var(--bg-primary, #fff);
        --checked-color: var(--fg-white, #fff);

        --border-color: var(--disabled-200);
        -moz-appearance: none;
        appearance: none;
        height: var(--height);
        width: var(--width);
        font-size: var(--font-size);
        outline: none;
        display: inline-block;
        position: relative;
        cursor: pointer;
        border: calc(0.1 * var(--width)) solid var(--border-color);
        border-radius: var(--border-radius);
        background-color: var(--background-color);
        vertical-align: middle;
      }
      .checkbox-wrapper input[type="checkbox"] + label {
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
        margin-left: calc(0.2 * var(--font-size));
        font-size: var(--font-size);
        color: var(--color);
      }

      .checkbox-wrapper input[type="checkbox"]:hover:not(:disabled) {
        --border-color: var(--active-500);
        box-shadow: 0 0 0 calc(0.1 * var(--width)) var(--active-100);
      }

      .checkbox-wrapper input[type="checkbox"]:checked,
      input[type="checkbox"]:indeterminate {
        --background-color: var(--active-500);
        --border-color: var(--active-500);
      }

      .checkbox-wrapper input[type="checkbox"]:indeterminate::before {
        content: "";
        position: absolute;
        top: 45%;
        left: 20%;
        width: 65%;
        height: 10%;
        background: var(--checked-color);
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
      .checkbox-wrapper input[type="checkbox"]:disabled:checked,
      input[type="checkbox"]:disabled:indeterminate {
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
    .group-checkbox {
      margin-left: 2em;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-checkbox": Checkbox;
  }
}

if (!customElements.get("ssk-checkbox")) {
  customElements.define("ssk-checkbox", Checkbox);
}
