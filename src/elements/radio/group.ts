import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { ThemeValue } from "../../types/base-attributes";
import { redispatchEvents } from "../../helpers/lit";
import {
    ColorName,
    ColorRole,
    Size,
    Theme,
    cssVar,
    parseThemeToCssVariables,
    parseVariables,
} from "../../types/theme";

export type GroupRadio = {
    defaultValue?: string[];
    options: radioOptions[];
};

export type radioOptions = {
    label: string;
    checked?: boolean;
    disabled?: boolean;
    value: string;
};
@customElement("ssk-radio-group")
export class RadioGroup extends LitElement implements ThemeValue {
    static registeredName = "ssk-radio-group";

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
    @property({ type: String })
    width?: string | undefined;
    @property({ type: String })
    height?: string | undefined;

    // radio specific
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
    @property({ type: Object })
    group?: GroupRadio | undefined;

    // radio state
    @state()
    _isGroupRadio: boolean = false;
    @state()
    _checked: boolean = false;
    @state()
    _groupOptions: radioOptions[] = [];

    firstUpdated(changedProperties: Map<PropertyKey, unknown>) {
        super.firstUpdated(changedProperties);

        this._isGroupRadio = !!this.group;
        this._checked = this.checked;
        if (this.group?.defaultValue) {
            this._setGroupChecked(this.group?.defaultValue);
        }
    }

    updated(changedProperties: Map<PropertyKey, unknown>) {
        super.updated(changedProperties);

        this._updateRadioState();
    }

    render() {
        if (this.hidden) {
            return nothing;
        }

        let additionalCss = `
        --active-100: ${parseVariables(
            cssVar("colors", this.themeColor, 100)
        )};
            --active-500: ${parseVariables(
            cssVar("colors", this.themeColor, 500)
        )};
            --disabled-200: ${parseVariables(cssVar("colors", "gray", 200))};
            --disabled-300: ${parseVariables(cssVar("colors", "gray", 300))};
            --disabled-400: ${parseVariables(cssVar("colors", "gray", 400))};
            --border-radius: ${parseVariables(
            cssVar("rounded", this.rounded),
            "50%"
        )};
            --border-radius: 50%;
            --width: 0.5em;
            --height: 0.5em;
            --gap: ${parseVariables(cssVar("spacing", this.size), "1em")};
            --font-size: ${parseVariables(cssVar("font-size", this.size))};`

        return html`
        ${parseThemeToCssVariables(this.theme?.components?.radio, ":host")}

        <style>
            input {
                ${additionalCss};
            }
        </style>
        <div class="group-radio">
        <label>${this.label}</label>
            ${this._groupOptions.map(
            (g) => html`<div class="radio-wrapper">
                <input
                    type="radio"
                    id="radio"
                    name="radioGroup"
                    data-testid=${this.testId ? this.testId + "-" + g.value: nothing}
                    .disabled=${!!g.disabled}
                    .checked=${!!g.checked}
                    value=${g.value}
                    @change=${(e: any) => this._onChangeGroup(e)}
                />
                <label for="radio">${g.label}</label>
            </div>`
        )}
        </div>
    `;
    }
    private _onChangeGroup(e: any) {
        const selectedValue = e.srcElement.value;
        this._groupOptions = this._groupOptions.map((option) => ({
            ...option,
            checked: option.value === selectedValue,
        }));
        redispatchEvents(e, this);
      }

    private _updateRadioState() {
        const radio = this.shadowRoot?.querySelector("input");

        const isCheckedAll = this._groupOptions.every((o) => o.checked);
        const isNotCheck = this._groupOptions.every((o) => !o.checked);

        let checked = this._isGroupRadio ? isCheckedAll : this.checked;
        let indeterminate = this._isGroupRadio
            ? !isCheckedAll && !isNotCheck
            : this.indeterminate;
        if (radio) {
            if (this._isGroupRadio) this._checked = checked;
            radio.indeterminate = indeterminate;
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


    static styles = css`
    @supports (-webkit-appearance: none) or (-moz-appearance: none) {
    .radio-wrapper input[type="radio"] {
        --background-color: #fff;
        --checked-color: #fff;

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
      .radio-wrapper {
        margin-right: 1em;
      }
      .radio-wrapper input[type="radio"]:checked {
        --border-color: var(--active-500);
      }

      .radio-wrapper input[type="radio"] + label {
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
        margin-left: calc(0.2 * var(--font-size));
        font-size: var(--font-size);
      }

      .radio-wrapper input[type="radio"]:hover:not(:disabled) {
        --border-color: var(--active-500);
        box-shadow: 0 0 0 calc(0.1 * var(--width)) var(--active-100);
      }

      .radio-wrapper input[type="radio"]:checked::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: calc(0.65 * var(--height));
        width:  calc(0.65 * var(--width));
        background-color: var(--active-500);
        border-radius: var(--border-radius);
      }

      .radio-wrapper input[type="radio"]:disabled {
        --background-color: var(--disabled-200);
        --border-color: var(--disabled-300);
        cursor: not-allowed;
        opacity: 0.9;
      }

      .radio-wrapper input[type="radio"]:disabled:checked,
      input[type="radio"]:disabled:indeterminate {
        --checked-color: var(--disabled-400);
        --active-500: var(--disabled-300);
      }

      .radio-wrapper input[type="radio"]:disabled + label {
        cursor: not-allowed;
      }
    }
    .radio-wrapper * {
      box-sizing: inherit;
    }
    .radio-wrapper *:before,
    .radio-wrapper *:after {
      box-sizing: inherit;
    }
    .group-radio {
        display: flex;
        align-items: center;
        margin-left: 2em;
    }
  `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ssk-radio-group": RadioGroup;
    }
}