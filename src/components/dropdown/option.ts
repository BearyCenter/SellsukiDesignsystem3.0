import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import "../../../src/elements/checkbox";
import "../../elements/icon";
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
import { DropdownState, valueContext } from "./dropdown";

export class DropdownOption extends LitElement {
  static registeredName = "ssk-dropdown-option";

  @consume({ context: valueContext, subscribe: true })
  @property({ attribute: false })
  public state?: DropdownState;

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
  size: Size = "md";

  // font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight?: FontWeight;

  @property({ type: String })
  value: string = "";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  private handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (!this.state) return;
    if (this.disabled) return;
    this.state.setValue(this.value, this);
  };

  

  render() {
    if (this.hidden) {
      return nothing;
    }
    const smallSizes = new Set<Size>(["3xs", "2xs", "xs", "sm"]);
    const currentSize = this.state?.size ?? this.size;
    const iconSize = smallSizes.has(currentSize as Size) ? "sm" : "md";

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.dropdown, ":host")}
      <style>
      :host {
        --color-disabled: ${parseVariables(cssVar("colors", "gray", 400))};
      }
    </style>

      <span
        class="container"
        @click=${this.handleClick}
        data-testid=${this.testId || nothing}
      >
        <slot name="prefix"></slot>
        <span class="label">
          <slot></slot>
        </span>
        <span class="postfix">
          <slot name="postfix">
            ${this.state?.multiSelect === false && !this.state?.hideCheckIcon && this.state?.isSelected?.includes(this.value)
              ? html`<ssk-icon color=${this.disabled ? "gray.400" : "info"} name="outline-check" size=${iconSize}></ssk-icon>`
              : nothing}
          </slot>
        </span>
      </span>
    `;
  }

  static styles = css`
    .container {
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-gap: 0.5em;
      padding: 0.32em 8px;

      color: var(--color);

      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);

      border-radius: var(--rounded);

      cursor: pointer;

      transition: background-color 0.2s ease-in-out;
    }

    .container:hover {
      background-color: var(--bg-primary-hover, #f9fafb);
      color: var(--color-hover);
    }
    .container:active {
      background-color: var(--background-color);
      color: var(--text-primary, #111827);
    }
    :host([disabled]) .container:hover {
      background-color: transparent;
      color: var(--color-disabled);
    }

    :host([disabled]) .container {
      cursor: not-allowed;
      color: var(--color-disabled);
    }

    .label {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5em;
        white-space: var(--white-space, normal);
        overflow-wrap: break-word;
    }
    

    .postfix {
      margin-left: auto;
      display: flex;
      align-items: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-dropdown-option": DropdownOption;
  }
}

if (!customElements.get("ssk-dropdown-option")) {
  customElements.define("ssk-dropdown-option", DropdownOption);
}
