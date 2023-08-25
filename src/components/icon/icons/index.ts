import { consume } from "@lit-labs/context";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  ColorName,
  ColorRole,
  FontFamilyGroup,
  FontWeight,
  Size,
  Theme,
} from "../../../types/theme";
import {
  ThemeValue,
  parseThemeValueComponentCss,
} from "../../../types/theme-value";
import { themeContext } from "../../theme-context";

@customElement("ssk-icon-<%= variant %>-<%= name %>")
export class Button extends LitElement implements ThemeValue {
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  @property({ type: String })
  color?: ColorRole | ColorName;
  @property({ type: String })
  backgroundColor?: string | undefined;
  @property({ type: String })
  borderColor?: string | undefined;

  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  padding?: Size;
  @property({ type: String })
  fontSize?: string | undefined;
  @property({ type: String })
  lineHeight?: string | undefined;
  @property({ type: String })
  gap?: string | undefined;
  @property({ type: String })
  rounded?: string | undefined;
  @property({ type: String })
  margin?: string | undefined;

  // font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  @property({ type: String })
  borderWidth?: string | undefined;
  @property({ type: String })
  boxShadow?: string | undefined;
  @property({ type: String })
  dropShadow?: string | undefined;
  @property({ type: String })
  width?: string | undefined;
  @property({ type: String })
  height?: string | undefined;
  @property({ type: String })
  minWidth?: string | undefined;
  @property({ type: String })
  minHeight?: string | undefined;
  @property({ type: String })
  maxWidth?: string | undefined;
  @property({ type: String })
  maxHeight?: string | undefined;

  @property({ type: Boolean })
  hidden = false;

  // Event
  @property({ type: Function })
  onClick?: () => void;

  render() {
    if (this.hidden) {
      return html``;
    }

    return html`
      <style>
        svg {
          ${parseThemeValueComponentCss(this.theme, "icon", this)}
        }
      </style>

      <%= content %>
    `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-icon-<%= variant %>-<%= name %>": Button;
  }
}
