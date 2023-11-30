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
  @property({ type: Boolean })
  private isHeaderOpen: boolean = true;

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
      <div>
        <div class="header" @click=${this.toggleHeader}>
          Header Group ${this.isHeaderOpen ? "▼" : "►"}
        </div>
        ${this.isHeaderOpen ? this.renderItemList() : ""}
      </div>
    `;
  }

  private renderItemList() {
    return html`
      <div class="item-list">
        ${this.items.map(
          (item) => html`
            <div class="item" @click=${item.onClick}>
              ${item.icon ? html`<span>${item.icon}</span>` : ""}
              <span>${item.label}</span>
            </div>
          `,
        )}
      </div>
    `;
  }

  private toggleHeader() {
    this.isHeaderOpen = !this.isHeaderOpen;
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

    .header {
      font-weight: bold;
      margin-bottom: 8px;
      user-select: none; /* Prevent text selection on header */
      cursor: pointer;
    }

    .item-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .item {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-group-menu": GroupMenu;
  }
}
