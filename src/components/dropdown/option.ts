import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
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
  parseThemeToCssVariables,
} from "../../types/theme";
import { DropdownState, valueContext } from "./dropdown";

@customElement("ssk-dropdown-option")
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

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.dropdown, ":host")}

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
              ? html`<ssk-icon color=${this.disabled ? "gray" : "info"} name="outline-check"></ssk-icon>`
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
      padding: 0.25em 0.5em;

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
      background-color: var(--ssk-colors-gray-50);
      color: var(--color-hover);
    }
    .container:active {
      background-color: var(--background-color);
      color: var(--ssk-colors-black-900);
    }
    :host([disabled]) .container:hover {
      background-color: transparent;
      color: var(--color);
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
