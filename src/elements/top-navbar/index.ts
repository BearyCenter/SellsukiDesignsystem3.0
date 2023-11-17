import { consume } from "@lit-labs/context";
import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { BaseAttributes, ThemeValue } from "../../types/base-attributes";
import { themeContext } from "../../contexts/theme";
import { Size, Theme, parseThemeToCssVariables } from "../../types/theme";
import {
  ColorName,
  ColorRole,
  FontFamilyGroup,
  FontWeight,
  cssVar,
  parseVariables,
} from "../../types/theme";
import { redispatchEvents } from "../../helpers/lit";

@customElement("ssk-top-navbar")
export class TopNavbar
  extends LitElement
  implements ThemeValue, BaseAttributes
{
  static registeredName = "ssk-top-navbar";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  testId?: string;

  // ThemeValue
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  @property({ type: String })
  color?: ColorRole | ColorName;
  @property({ type: String })
  backgroundColor?: string | undefined;
  @property({ type: String })
  borderColor?: string | undefined;
  @property({ type: String })
  margin?: string | undefined;
  @property({ type: String })
  padding?: Size;
  @property({ type: String })
  gap?: string | undefined = "md";
  @property({ type: String })
  rounded?: string | undefined;
  @property({ type: String })
  borderWidth?: string | undefined;
  @property({ type: String })
  lineHeight?: string | undefined;

  // Font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight: FontWeight = "normal";
  @property({ type: String })
  fontSize?: string | undefined;

  // Top navbar Attributes
  // level
  @property({ type: Number })
  level: 2 | 4 = 2;
  @property({ type: String })
  leftImgSrc?: string;
  @property({ type: String })
  rightImgSrc?: string;
  @property({ type: String })
  placeholder?: string | undefined;
  @property({ type: String })
  value?: string | undefined;
  @property({ type: String })
  type?: "text" | "hidden" = "text";

  static headings: Record<2 | 4, (instance: TopNavbar) => TemplateResult> = {
    2: (instance) => html` <div>
        <slot name="left-col"></slot>
        ${instance.leftImgSrc
          ? html`<img
              class="logo-image"
              src="${instance.leftImgSrc}"
              alt="Logo"
            />`
          : nothing}
        <input
          id="input"
          data-testid=${instance.testId || nothing}
          placeholder=${instance.placeholder || ""}
          name="search"
          .value=${instance.value || ""}
          .type=${instance.type}
          @input=${(e: Event) => redispatchEvents(e, instance)}
          @change=${(e: Event) => redispatchEvents(e, instance)}
        />
      </div>

      <div>
        <slot name="right-col"></slot>
        ${instance.rightImgSrc
          ? html`<img
              class="profile-image"
              src="${instance.rightImgSrc}"
              alt="Logo"
            />`
          : nothing}
      </div>`,
    4: (instance) => html`<div>
        <slot name="left-col"></slot>
        ${instance.leftImgSrc
          ? html`<img
              class="logo-image"
              src="${instance.leftImgSrc}"
              alt="Logo"
            />`
          : nothing}
        <input
          id="input"
          data-testid=${instance.testId || nothing}
          placeholder=${instance.placeholder || ""}
          name="search"
          .value=${instance.value || ""}
          .type=${instance.type}
          @input=${(e: Event) => redispatchEvents(e, instance)}
          @change=${(e: Event) => redispatchEvents(e, instance)}
        />
      </div>

      <div>
        <slot name="right-col"></slot>
      </div>`,
  };

  render() {
    let additionalCss = `
    --color: ${parseVariables(cssVar("colors", this.color), this.color)};
    --background-color: ${parseVariables(
      cssVar("colors", this.backgroundColor),
      cssVar("colors", "background", 200),
      this.backgroundColor
    )};
    --border-color: ${parseVariables(
      cssVar("colors", this.borderColor),
      cssVar("colors", "border", 200),
      this.borderColor
    )};
    --font-family: ${parseVariables(
      cssVar("font-family", this.fontFamilyGroup)
    )};
    --font-weight: ${parseVariables(cssVar("font-weight", this.fontWeight))};
    --font-size: ${parseVariables(
      cssVar("font-size", this.fontSize),
      cssVar("font-size", this.size)
    )};

    --outline-color: ${parseVariables(
      cssVar("colors", this.borderColor),
      cssVar("colors", "border", 200),
      this.borderColor
    )};

    --line-height: ${parseVariables(
      cssVar("line-height", this.lineHeight),
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

    --border-width: ${parseVariables(
      cssVar("border-width", this.borderWidth),
      "1px"
    )};
    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.topNavbar, ":host")}
      <style>
        :host {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: space-between;
          align-items: center;
          ${additionalCss};
        }
      </style>

      ${TopNavbar.headings[this.level](this)}
    `;
  }

  static styles = css`
    div,
    input {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: var(--padding);
      margin: var(--margin);
      gap: var(--gap);
      color: var(--color);
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
    }

    input {
      justify-content: center;
      border-style: solid;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      padding: 0.1em 0.5em;
      background-color: var(--background-color);
      border-radius: var(--rounded);
      outline-color: var(--outline-color);
      border-width: var(--border-width);
    }

    .profile-image {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .logo-image {
      height: 40px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-top-navbar": TopNavbar;
  }
}
