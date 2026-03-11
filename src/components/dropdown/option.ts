import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../../src/elements/checkbox";
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

  private handleClick = () => {
    if (this.state && this.state.multiSelect === false) {
      this.state.isSelected = [this.value];
      this.state.setValue(this.value, this);
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent("select", { detail: this.value }));
    }
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
        <slot name="postfix"></slot>
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
      background-color: var(--background-color-hover);
      color: var(--color-hover);
    }
    .container:active {
      background-color: var(--background-color);
      color: var(--font-color);
    }

    .label {
      white-space: var(--white-space, normal);
  overflow-wrap: break-word;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-dropdown-option": DropdownOption;
  }
}
