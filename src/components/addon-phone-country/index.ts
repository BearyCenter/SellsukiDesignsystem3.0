import { css, html, LitElement, nothing } from "lit";
import { BaseAttributes } from "../../types/base-attributes";
import { customElement, property } from "lit/decorators.js";
import "../../elements/icon";
import "../../components/dropdown";
import { Size } from "../../main";

@customElement("ssk-addon-phone-country")
export class AddonPhoneCountry extends LitElement implements BaseAttributes {
  static registeredName = "ssk-addon-phone-country";

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  @property({ type: String })
  size: Size = "md";

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Array })
  countries: { code: string; name?: string; phoneCode?: string }[] = [];

  @property({ type: Array })
  allowedCountries: string[] = [];

  @property({ type: String })
  value: string = "";

  @property({ type: String })
  placeholder: string = "Select a country";
  private inputBuffer: string = "";
  private valueOption: string = "";

  private typingTimeout: NodeJS.Timeout | null = null;

  private getDecreasedSize(currentSize: Size): Size {
    const sizeOrder: Size[] = [
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "2xl",
      "3xl",
      "4xl",
    ];
    const currentIndex = sizeOrder.indexOf(currentSize);
    if (currentIndex > 0) {
      return sizeOrder[currentIndex - 1];
    }
    return currentSize;
  }

  private _handleChange(code: string) {
    const selectedCountry = this.countries.find(
      (country) => country.code === code,
    );

    if (selectedCountry) {
      this.value = code;
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: {
            value: this.value,
            country: selectedCountry,
          },
        }),
      );
    }
  }

  private getFilteredCountries() {
    let filtered = this.countries;

    if (this.allowedCountries.length > 0) {
      filtered = filtered.filter((country) =>
        this.allowedCountries.includes(country.code),
      );
    }

    filtered.sort((a, b) => {
      const nameA = a.name?.toLowerCase() || "";
      const nameB = b.name?.toLowerCase() || "";
      if (nameA === nameB) {
        return a.code.localeCompare(b.code);
      }
      return nameA.localeCompare(nameB);
    });

    return filtered;
  }

  private _handleKeydown(event: KeyboardEvent) {
    const dropdown = this.shadowRoot?.querySelector("ssk-dropdown");
    if (!dropdown) return;

    const options = dropdown.querySelectorAll("ssk-dropdown-option");
    if (!options.length) return;

    let index = Array.from(options).findIndex(
      (option) => option.getAttribute("value") === this.valueOption,
    );

    let newValue: string | undefined;

    switch (event.key) {
      case "ArrowDown":
        index = (index + 1) % options.length;
        newValue = options[index]?.getAttribute("value") || this.valueOption;
        break;
      case "ArrowUp":
        index = (index - 1 + options.length) % options.length;
        newValue = options[index]?.getAttribute("value") || this.valueOption;
        break;
      case "Enter":
        if (dropdown.state?.isOpened) {
          this._handleChange(this.valueOption);
          dropdown.state.isOpened = false;
          dropdown.requestUpdate();
        }
        break;
      case "Escape":
        if (dropdown.state?.isOpened) {
          this.valueOption = this.value;
          this.requestUpdate();
          dropdown.state.isOpened = false;
          dropdown.requestUpdate();
        }
        return;
      default:
        const char = event.key.toLowerCase();
        this.inputBuffer += char;
        this.debounceSearch();
        return;
    }

    if (newValue && newValue !== this.valueOption) {
      this.valueOption = newValue;
      this.requestUpdate();
    }

    const selectedOption = dropdown.querySelector(
      `[value="${this.valueOption}"]`,
    );
    if (selectedOption) {
      selectedOption.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }

  private debounceSearch() {
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => {
      const match = this.countries.find(
        (c) =>
          c.name?.toLowerCase().startsWith(this.inputBuffer) ||
          c.code.toLowerCase().startsWith(this.inputBuffer),
      );
      if (match) {
        this.valueOption = match.code;
        const dropdown = this.shadowRoot?.querySelector("ssk-dropdown");
        const selectedOption = dropdown?.querySelector(
          `[value="${this.valueOption}"]`,
        );
        if (selectedOption) {
          selectedOption.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
        this.requestUpdate();
      }
      this.inputBuffer = "";
    }, 200);
  }

  firstUpdated() {
    this.valueOption = this.value || "";
    this.requestUpdate();

    document.addEventListener("click", this._handleDocumentClick);

    const parentInput = this.closest("ssk-input");
    if (parentInput) {
      this.style.borderRight = "1px solid var(--ssk-colors-border-100)";
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this._handleDocumentClick);
  }

  private _handleDocumentClick = (event: MouseEvent) => {
    const component = this.shadowRoot?.querySelector(".phone-addon");
    if (component && !component.contains(event.target as Node)) {
      this.valueOption = this.value;
      this.requestUpdate();
    }
  };

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("value") && this.value !== this.valueOption) {
      this.valueOption = this.value;
      this.requestUpdate();
    }
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    const selectedCountry = this.countries.find(
      (country) => country.code === this.value,
    );
    const filteredCountries = this.getFilteredCountries();
    const iconSize = this.getDecreasedSize(this.size);

    return html`
      <div
        class="${this.disabled ? "disabled" : ""}"
        data-testid=${this.testId || nothing}
      >
        <ssk-dropdown
          optionsWidth="auto"
          optionsAlign="left"
          size=${this.size}
          role="combobox"
          @keydown=${this._handleKeydown}
        >
          <div
            class="phone-addon"
            slot="selected"
            tabindex="0"
            data-testid="${this.testId}-selected"
          >
            ${selectedCountry
              ? html`
                  <ssk-country-icon
                    name=${selectedCountry.code}
                  ></ssk-country-icon>
                  <span>
                    ${selectedCountry.phoneCode
                      ? `${selectedCountry.phoneCode}`
                      : `${selectedCountry.code}`}
                  </span>
                  <ssk-icon
                    size=${iconSize}
                    name="outline-chevron-down"
                  ></ssk-icon>
                `
              : this.placeholder}
          </div>
          ${filteredCountries.map(
            (country, index) => html`
              <ssk-dropdown-option
                key=${country.code}
                value=${country.code}
                id="option-${index}"
                role="option"
                aria-selected="${this.valueOption === country.code}"
                tabindex="${this.valueOption === country.code ? "0" : "-1"}"
                @click=${() => this._handleChange(country.code)}
              >
                <ssk-country-icon
                  name=${country.code}
                  slot="prefix"
                ></ssk-country-icon>
                <span>
                  ${country.name ? `${country.name}` : nothing}
                  ${country.phoneCode ? `(${country.phoneCode})` : nothing}
                  ${!country.name && !country.phoneCode
                    ? country.code
                    : nothing}
                </span>
              </ssk-dropdown-option>
            `,
          )}
        </ssk-dropdown>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .disabled {
      pointer-events: none;
    }

    ssk-dropdown-option {
      --white-space: normal;
      --rounded: 0px;
      --background-color-hover: var(--ssk-colors-gray-200);
    }

    ssk-dropdown-option[aria-selected="true"] {
      background-color: var(--ssk-colors-primary-100);
      --color: var(--ssk-colors-primary-500);
    }

    ssk-dropdown-option[aria-selected="true"]:hover {
      --color-hover: var(--ssk-colors-primary-500) !important;
      --background-color-hover: var(--ssk-colors-primary-100) !important;
    }

    .phone-addon {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0.3em;
      gap: 0.333em;
      outline: none;
    }
  `;
}
declare global {
  interface HTMLElementTagNameMap {
    "ssk-addon-phone-country": AddonPhoneCountry;
  }
}
