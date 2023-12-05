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

@customElement("ssk-menu-items")
export class MenuItems extends LitElement implements ThemeValue {
  static registeredName = "ssk-menu-items";

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
  label?: string | undefined;
  @property({ type: Boolean })
  disabled = false;
  @property({ type: Boolean })
  active = false;
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
    --background-color-hover: ${parseVariables(
      cssVar("colors", this.themeColor, 200),
    )};
    --background-color-active: ${parseVariables(
      cssVar("colors", this.themeColor, 600),
    )};
    --background-color-disabled: ${parseVariables(
      cssVar("colors", "gray", 100),
    )};
    --color: var(--color);
    --color-hover: var(--color);
    --color-active:  ${parseVariables(
      cssVar("colors", this.color),
      cssVar("colors", this.color),
      this.color,
      cssVar("colors", "white", 200),
    )};
    --color-disabled: ${parseVariables(cssVar("colors", "gray", 400))};

    --border-color: ${parseVariables(cssVar("colors", this.themeColor, 500))};
    --border-color-disabled: var(--background-color-disabled);
    --border-width: 0px;
    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.menu, "menu-items")}
      <style>
        .menu-container {
          ${additionalCss};
        }
      </style>

      <div
        class="menu-container ${this.active ? "active" : ""} ${this.disabled
          ? "disabled"
          : ""}
        "
        data-testid=${this.testId || nothing}
        @click=${(e: Event) => redispatchEvents(e, this)}
      >
        ${this.min
          ? html`<slot name="prefix"></slot>`
          : html`
              <div class="prefix">
                <slot name="prefix"></slot>
              </div>
              <slot></slot>
              <div class="postfix">
                <slot name="postfix"></slot>
              </div>
            `}
      </div>
    `;
  }

  static styles = css`
    .menu-container {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      background-color: var(--background-color);
      color: var(--color);
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
      padding: var(--padding);
      margin: var(--margin);
      gap: var(--gap);
      border-radius: var(--rounded);
      border-color: var(--border-color);
      border-width: var(--border-width);
    }

    .menu-container:hover {
      background-color: var(--background-color-hover);
      color: var(--color-hover);
    }

    .menu-container.active {
      background-color: var(--background-color-active);
      color: var(--color-active);
    }

    .menu-container.disabled {
      cursor: not-allowed;
      background-color: var(--background-color-disabled);
      color: var(--color-disabled);
      border-color: var(--border-color-disabled);
    }

    .menu-container .prefix,
    .menu-container .postfix,
    .menu-container slot {
      display: flex;
      align-items: center;
    }

    .menu-container slot {
      margin-right: auto;
    }

    .menu-container .prefix {
      width: auto;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-menu-items": MenuItems;
  }
}
