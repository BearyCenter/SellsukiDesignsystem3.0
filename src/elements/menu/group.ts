import { LitElement, html, css, nothing } from "lit";
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
  ColorRole,
  ColorName,
  FontFamilyGroup,
  FontWeight,
} from "../../types/theme";
import { redispatchEvents } from "../../helpers/lit";

@customElement("ssk-menu-group")
export class MenuGroup extends LitElement implements ThemeValue {
  static registeredName = "ssk-menu-group";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  // ThemeValue
  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  themeColor: string = "primary";
  @property({ type: String })
  margin?: string;
  @property({ type: String })
  width?: string | undefined;
  @property({ type: String })
  height?: string | undefined;
  @property({ type: String })
  gap?: string | undefined;
  @property({ type: String })
  rounded?: string | undefined;
  @property({ type: String })
  color?: ColorRole | ColorName;
  @property({ type: String })
  fontSize?: string | undefined;
  @property({ type: String })
  padding?: string;

  // font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  @property({ type: Boolean })
  hidden = false;
  @property({ type: String })
  header?: string | undefined;
  @property({ type: Boolean })
  isOpen = false;
  @property({ type: Boolean })
  min = false;

  render() {
    if (this.hidden) {
      return null;
    }
    let additionalCss = `
    --font-weight: ${parseVariables(cssVar("font-weight", this.fontWeight))};
    --font-size: ${parseVariables(
      cssVar("font-size", this.fontSize),
      cssVar("font-size", this.size),
    )};
    --padding: ${parseVariables(
      cssVar("padding", this.padding),
      cssVar("padding", this.size),
    )};
    --margin: ${parseVariables(cssVar("margin", this.margin))};
    --gap: ${parseVariables(
      cssVar("spacing", this.gap),
      cssVar("padding", this.size),
    )};

    --rounded: ${parseVariables(
      cssVar("rounded", this.rounded),
      cssVar("rounded", this.size),
    )};

    --background-color: transparent;
    --color: ${parseVariables(cssVar("colors", this.color))};
    --border-color: ${parseVariables(cssVar("colors", this.themeColor, 500))};
    --border-width: 0px;
    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.menu, "menu-group")}
      <style>
        .menu-header {
          ${additionalCss};
        }
      </style>

      <div class="section">
        ${this.min
          ? html`<slot></slot>`
          : html`
              <div
                class="menu-header"
                @click=${(e: Event) => {
                  this.isOpen = !this.isOpen;
                  redispatchEvents(e, this);
                }}
              >
                <div class="header-content">${this.header}</div>
                <slot name=${this.isOpen ? "icon-open" : "icon-closed"}></slot>
              </div>
              ${this.isOpen ? html` <slot></slot> ` : nothing}
            `}
      </div>
    `;
  }

  static styles = css`
    .section {
      display: flex;
      flex-direction: column;
    }

    .menu-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
      background-color: var(--background-color);
      color: var(--color);
      cursor: pointer;
      padding: var(--padding);
      margin: var(--margin);
      gap: var(--gap);
      border-radius: var(--rounded);
      border-color: var(--border-color);
      border-width: var(--border-width);
      padding-bottom: 0;
    }

    .menu-header .header-content {
      flex: 1;
    }

    .menu-header slot {
      margin-right: auto;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-menu-group": MenuGroup;
  }
}
