import { LitElement, html, css, nothing } from "lit";
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
import { SidebarAttributes } from ".";

@customElement("ssk-sidebar-group")
export class SidebarGroup extends LitElement implements SidebarAttributes {
  static registeredName = "ssk-sidebar-group";

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

  @property({ type: String })
  label?: string | undefined;
  @property({ type: Boolean })
  isOpen = false;
  @property({ type: Boolean })
  collapsed = false;
  @property({ type: Boolean })
  hiddenIcon = false;
  @property({ type: Boolean })
  hidden = false;

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
      ${parseThemeToCssVariables(
        this.theme?.components?.sidebar,
        ".sidebar-group-header",
      )}
      <style>
        .sidebar-group-header {
          ${additionalCss};
        }
      </style>

      ${this.collapsed
        ? html`<slot></slot>`
        : html`
            <div
              class="sidebar-group-header"
              @click=${(e: Event) => {
                this.isOpen = !this.isOpen;
                redispatchEvents(e, this);
              }}
            >
              <div class="header-content">${this.label}</div>
              ${!this.hiddenIcon
                ? this.isOpen
                  ? html`<ssk-icon
                      name="solid-chevron-up"
                      size="${this.size}"
                    ></ssk-icon>`
                  : html`<ssk-icon
                      name="solid-chevron-down"
                      size="${this.size}"
                    ></ssk-icon>`
                : nothing}
            </div>
            ${this.isOpen ? html` <slot></slot> ` : nothing}
          `}
    `;
  }

  static styles = css`
    .sidebar-group-header {
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

    .header-content {
      flex: 1;
    }

    svg {
      height: 1em;
      width: 1em;
      margin-right: auto;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-sidebar-group": SidebarGroup;
  }
}
