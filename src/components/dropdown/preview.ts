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

@customElement("ssk-dropdown-preview")
export class DropdownPreview extends LitElement {
  static registeredName = "ssk-dropdown-preview";

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
  value?: string = "";

  render() {
    if (this.hidden) {
      return nothing;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.dropdown, ":host")}

      <span class="container" data-testid=${this.testId || nothing}>
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
      grid-auto-flow: column;
      gap: 0.5em;
      padding: 0;

      color: var(--color);

      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
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
    "ssk-dropdown-preview": DropdownPreview;
  }
}
