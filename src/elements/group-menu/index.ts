import { LitElement, html, css } from "lit";
import { ThemeValue } from "../../types/base-attributes";
import { themeContext } from "../../contexts/theme";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit-labs/context";
import {
  Theme,
  Size,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";

@customElement("ssk-group-menu")
export class GroupMenu extends LitElement implements ThemeValue {
  static registeredName = "ssk-group-menu";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // ThemeValue
  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  themeColor: string = "primary";
  @property({ type: String })
  borderColor?: string;
  @property({ type: String })
  margin?: string;
  @property({ type: String })
  borderWidth?: string;
  @property({ type: String })
  width?: string | undefined;
  @property({ type: String })
  height?: string | undefined;
  @property({ type: String })
  gap?: string | undefined;

  @property({ type: String })
  boxSize?: string | undefined;
  @property({ type: Boolean })
  hidden = false;

  // GroupMenu Attributes
  @property({ type: Array })
  items: Array<{ label: string; icon?: string; onClick?: () => void }> = [];

  render() {
    if (this.hidden) {
      return null;
    }

    let additionalCss = `
    width: ${parseVariables(
      cssVar("width", this.width),
      cssVar("width", this.size),
      this.width,
      this.boxSize,
      "auto",
    )};
    height: ${parseVariables(
      cssVar("height", this.height),
      cssVar("height", this.size),
      this.height,
      this.boxSize,
      "auto",
    )};
    --margin: ${parseVariables(cssVar("margin", this.margin))};
    --gap: ${parseVariables(
      cssVar("spacing", this.gap),
      cssVar("spacing", this.size),
    )};
    border-width:  ${parseVariables(
      cssVar("border-width", this.borderWidth),
      this.borderWidth,
      "0px",
    )};
    border-color: ${parseVariables(
      cssVar("border-color", this.borderColor),
      this.borderColor,
      "transparent",
    )};
  `;

    return html`
      ${parseThemeToCssVariables(
        this.theme?.components?.groupMenu,
        "groupMenu",
      )}
      <style>
        div {
          ${additionalCss}
        }
      </style>
      <div>${this.items.map((item) => html` <p>${item}</p> `)}</div>
    `;
  }

  static styles = css`
    div {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin: var(--margin);
      gap: var(--gap);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-group-menu": GroupMenu;
  }
}
