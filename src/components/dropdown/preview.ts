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
import { DropdownState, valueContext } from "./dropdown";

export class DropdownPreview extends LitElement {
  static registeredName = "ssk-dropdown-preview";

  @consume({ context: valueContext, subscribe: true })
  @property({ attribute: false })
  public vault?: DropdownState;

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

  @property({ type: String,reflect: true })
  size: Size = "md";

  // font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight?: FontWeight;

  @property({ type: String })
  value?: string = "";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  render() {
    if (this.hidden) {
      return nothing;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.dropdown, ":host")}
      <style>
      :host {
        --color-disabled: ${parseVariables(cssVar("colors", "gray", 400))};
      }
    </style>

      <span class="container" data-testid=${this.testId || nothing}>
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
      grid-auto-flow: column;
      align-items: center;
      gap: 8px;
      padding: 0.2em 0;

      color: var(--color);

      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
    }

    :host([size="sm"]) .container {
      padding: 4px 0;
    }

    .label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    :host([disabled]) .container {
      color: var(--color-disabled);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-dropdown-preview": DropdownPreview;
  }
}

if (!customElements.get("ssk-dropdown-preview")) {
  customElements.define("ssk-dropdown-preview", DropdownPreview);
}
