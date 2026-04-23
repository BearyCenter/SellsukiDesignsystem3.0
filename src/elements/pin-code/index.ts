import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
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
import { redispatchEvents } from "../../helpers/lit";

export class PinCode extends LitElement {
  static registeredName = "ssk-pin-code";

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
  @property({ type: String })
  height?: string | undefined;

  // pin-code specific
  @property({ type: Number })
  length = 3;

  @property({ type: String })
  type: "text" | "number" = "number";

  @property({ type: String })
  value: string = "";

  @property({ type: String })
  placeholder: string | undefined;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  hidden = false;

  @property({ type: Boolean })
  error = false;

  render() {
    if (this.hidden) {
      return nothing;
    }

    return html` ${parseThemeToCssVariables(
        this.theme?.components.pinCode,
        ":host",
      )}

      <style>
        :host {
          --color: ${parseVariables(
            cssVar("colors", this.color),
            cssVar("colors", this.color, 700),
            this.color,
            cssVar("colors", "text", 700),
          )};
          --border-color: ${parseVariables(cssVar("colors", "border", 100))};
          --border-color-active: ${parseVariables(
            cssVar("colors", this.themeColor, 600),
          )};
          --font-family: ${parseVariables(
            cssVar("font-family", this.fontFamilyGroup),
          )};
          --font-weight: ${parseVariables(
            cssVar("font-weight", this.fontWeight),
          )};
          --font-size: ${parseVariables(cssVar("font-size", this.size))};
          --line-height: ${parseVariables(cssVar("font-size", this.size))};

          --gap: ${parseVariables(cssVar("spacing", this.size))};
          --rounded: ${parseVariables(cssVar("rounded", this.size))};

          --color-error: ${parseVariables(cssVar("colors", "error", 600))};
          --border-color-error: ${parseVariables(
            cssVar("colors", "error", 600),
          )};

          --outline-color-error: ${parseVariables(
            cssVar("colors", "error", 300),
          )};

          --width: ${parseVariables(
            cssVar("width", this.size),
            cssVar("width", this.width),
            "auto",
          )};
          --height: ${parseVariables(
            cssVar("height", this.size),
            cssVar("height", this.height),
            "auto",
          )};
        }
      </style>

      <input
        id="code"
        hidden
        .value=${this.value}
        @input=${this.updateValue}
        @change=${this.updateValue}
      />
      <div class="container">
        ${Array(this.length)
          .fill(0)
          .map((_, index) => {
            const inputId = `code-${index}`;

            return html`
              <input
                id=${inputId}
                data-testid=${this.testId || nothing}
                .type=${this.type}
                .value=${this.value.split("")[index] || ""}
                placeholder=${this.placeholder || ""}
                maxlength="1"
                minlength="1"
                class="${this.error ? "error" : ""}"
                ?disabled=${this.disabled}
                @input=${this.handleInput}
                @keydown=${this.handleKeyDown}
                @paste=${this.handlePaste}
              />
            `;
          })}
      </div>`;
  }

  updateValue(e: any, redispatch: boolean = false) {
    let newValue = "";
    const Inputs =
      this.shadowRoot!.querySelectorAll<HTMLInputElement>('[id^="code-"]');
    Inputs.forEach((input) => (newValue += input.value));

    this.value = newValue;

    this.dispatchEvent(new CustomEvent("change", { detail: this.value, bubbles: true, composed: true }));

    if (redispatch) {
      redispatchEvents(e, this);
    }
  }

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 1) {
      input.value = input.value.slice(0, 1);
    }
    this.updateValue(input);
    if (input.value && input.value.length === 1) {
      this.handleInputFocus(input);
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (this.type === "number" && (event.key === "e" || event.key === "E")) {
      event.preventDefault();
    }
    if (event.key === "Backspace" && !input.value) {
      this.handleInputBlur(input);
    }
  }

  handleInputFocus(currentInput: HTMLInputElement) {
    const inputs = Array.from(
      this.shadowRoot!.querySelectorAll<HTMLInputElement>('[id^="code-"]'),
    );
    const currentIndex = inputs.indexOf(currentInput);
    const nextIndex = currentIndex + 1;

    if (nextIndex < inputs.length) {
      const nextInput = inputs[nextIndex];
      nextInput.focus();
    }
  }

  handleInputBlur(currentInput: HTMLInputElement) {
    const inputs = Array.from(
      this.shadowRoot!.querySelectorAll<HTMLInputElement>('[id^="code-"]'),
    );
    const currentIndex = inputs.indexOf(currentInput);
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      const prevInput = inputs[prevIndex];
      prevInput.focus();
    }
  }

  handlePaste(e: ClipboardEvent) {
    const pastedText = e.clipboardData?.getData("text/plain") || "";
    const pastedChars = pastedText.split("");

    const remainingInputs = Array.from(
      this.shadowRoot!.querySelectorAll<HTMLInputElement>('[id^="code-"]'),
    ).filter((input) => !input.value);

    for (
      let i = 0;
      i < Math.min(pastedChars.length, remainingInputs.length);
      i++
    ) {
      const input = remainingInputs[i];
      input.value = pastedChars[i];
      this.updateValue(input);

      const nextInput = this.shadowRoot!.getElementById(
        `code-${i + 1}`,
      ) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  static styles = css`
    div {
      display: flex;
      gap: var(--gap);
      box-sizing: border-box;
    }

    input {
      color: var(--color);
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
      overflow: hidden;
      border-style: solid;
      border-radius: var(--rounded);
      border: 1px solid var(--border-color);
      text-align: center;
      width: var(--width);
      height: 64px;
    }

    input:focus {
      outline: none;
    }

    input:focus::placeholder {
      color: transparent;
    }

    input.error {
      border-color: var(--border-color-error);
      outline: 4px solid var(--outline-color-error);
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type="number"] {
      -moz-appearance: textfield;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-pin-code": PinCode;
  }
}

if (!customElements.get("ds-pin-code")) {
  customElements.define("ds-pin-code", PinCode);
}
if (!customElements.get("ssk-pin-code")) {
  customElements.define("ssk-pin-code", class extends PinCode {});
}
