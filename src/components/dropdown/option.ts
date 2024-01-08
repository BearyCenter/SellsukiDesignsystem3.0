import { consume } from "@lit-labs/context";
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

@customElement("ssk-dropdown-option")
export class DropdownOption extends LitElement {
  static registeredName = "ssk-dropdown-option";

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

  render() {
    if (this.hidden) {
      return nothing;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.dropdown, ":host")}

      <span data-testid=${this.testId || nothing}>
        <slot></slot>
      </span>
    `;
  }

  static styles = css`
    span {
      display: flex;
      align-items: center;
      justify-content: start;
      gap: 0.5em;
      padding: 0.25em 0.5em;

      background-color: var(--background-color);
      color: var(--color);

      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);

      border-radius: var(--rounded);

      cursor: pointer;
    }

    span:hover {
      background-color: var(--background-color-hover);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-dropdown-option": DropdownOption;
  }
}
