import { consume } from "@lit/context";
import { LitElement, TemplateResult, css, html, nothing, svg } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { redispatchEvents } from "../../helpers/lit";
import { ThemeValue } from "../../types/base-attributes";
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
  @property({ type: Boolean })
  hiddenIcon = false;

  private svgs: Record<string, TemplateResult> = {
    "solid-chevron-up": svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clip-rule="evenodd"/>
    </svg>
  `,
    "solid-chevron-down": svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd"/>
    </svg>
  `,
  };

  render() {
    if (this.hidden) {
      return null;
    }
    let additionalCss = `
    --font-weight: ${parseVariables(cssVar("font-weight", this.fontWeight))};
    --font-size: ${parseVariables(
      cssVar("font-size", this.fontSize),
      cssVar("font-size", this.size)
    )};
    --padding: ${parseVariables(
      cssVar("padding", this.padding),
      cssVar("padding", this.size)
    )};
    --margin: ${parseVariables(cssVar("margin", this.margin))};
    --gap: ${parseVariables(
      cssVar("spacing", this.gap),
      cssVar("padding", this.size)
    )};

    --rounded: ${parseVariables(
      cssVar("rounded", this.rounded),
      cssVar("rounded", this.size)
    )};

    --background-color: transparent;
    --color: ${parseVariables(cssVar("colors", this.color))};
    --border-color: ${parseVariables(cssVar("colors", this.themeColor, 500))};
    --border-width: 0px;
    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.menu, ".menu-header")}
      <style>
        .menu-header {
          ${additionalCss};
        }
      </style>

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
              ${!this.hiddenIcon
                ? this.isOpen
                  ? this.svgs["solid-chevron-up"]
                  : this.svgs["solid-chevron-down"]
                : nothing}
            </div>
            ${this.isOpen ? html` <slot></slot> ` : nothing}
          `}
    `;
  }

  static styles = css`
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
    "ssk-menu-group": MenuGroup;
  }
}

if (!customElements.get("ds-menu-group")) {
  customElements.define("ds-menu-group", MenuGroup);
}
if (!customElements.get("ssk-menu-group")) {
  customElements.define("ssk-menu-group", MenuGroup);
}
