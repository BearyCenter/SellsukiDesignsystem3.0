import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import "../../../src/elements/checkbox";
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
  fontWeight: FontWeight = "normal";

  @property({ type: String })
  value: string = "";

  private isSelected: boolean = false;

  private handleClick = (event: MouseEvent) => {
    event.stopPropagation();
    if (this.state) {
      let isCurrentlySelected = false;

      if (typeof this.state.value === 'string') {
          isCurrentlySelected = this.state.value.split(',').includes(this.value);
      }
      if (Array.isArray(this.state.value)) {
          isCurrentlySelected = this.state.value.includes(this.value);
      }

      this.isSelected = this.state.multiSelect ? !isCurrentlySelected : true;

      this.state?.setValue(this.value, this);

      this.requestUpdate();
    }
    this.dispatchEvent(new CustomEvent('select', { detail: this.value }));
  };

  private get gridTemplateColumns() {
    return this.state?.multiSelect ? "auto auto 1fr" : "auto auto 1fr";
  }

  render() {
    if (this.hidden) {
      return nothing;
    }
    const multiSelect = this.state?.multiSelect;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.dropdown, ":host")}

      <span
        class="container"
        @click=${this.handleClick}
        style="grid-template-columns: ${this.gridTemplateColumns};"
        data-testid=${this.testId || nothing}
      >
      ${multiSelect 
        ? html`<ssk-checkbox
            .checked="${this.isSelected}"
            @click="${(e: MouseEvent) => {
              e.stopPropagation();
              this.handleClick(e);
            }}"
          ></ssk-checkbox>`
        : nothing}

        <slot name="prefix"></slot>
        <span class="label">
          <slot></slot>
        </span>
        <slot name="postfix"></slot>
      </span>
    `;
  }

  static styles = css`
    .container {
      display: grid;
      grid-gap: 0.25em;
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
      background-color: var(--background-color-hover);
      color: var(--color-hover);
    }
    .container:active {
      background-color: var(--background-color);
      color: var(--font-color);
    }

    .label {
      white-space: var(--white-space, nowrap);
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-dropdown-option": DropdownOption;
  }
}
