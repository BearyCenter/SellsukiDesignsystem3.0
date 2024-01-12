import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
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
import { Value, valueContext } from "./dropdown";

@customElement("ssk-dropdown-option")
export class DropdownOption extends LitElement {
  static registeredName = "ssk-dropdown-option";

  @consume({ context: valueContext, subscribe: true })
  @property({ attribute: false })
  public vault?: Value;

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

  private handleClick = () => {
    this.vault?.setValue(this.value, this);
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
      </span>
    `;
  }

  static styles = css`
    .container {
      display: grid;
      grid-template-columns: auto 1fr;
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
    }

    .label {
      white-space: nowrap;
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
