import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { ThemeValue } from "../../types/base-attributes";
import { consume } from "@lit-labs/context";
import {
  ColorName,
  ColorRole,
  Size,
  Theme,
  parseThemeToCssVariables,
  parseVariables,
  cssVar,
} from "../../types/theme";

type Placement =
  | "t"
  | "b"
  | "l"
  | "r"
  | "tl"
  | "tr"
  | "bl"
  | "br"
  | "lt"
  | "lb"
  | "rt"
  | "rb";
type Trigger = "click" | "hover";

@customElement("ssk-tooltip")
export class Tooltip extends LitElement implements ThemeValue {
  static registeredName = "ssk-tooltip";

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
  color?: ColorRole | ColorName = "white";
  @property({ type: Boolean })
  hidden = false;

  // Tooltip Attributes
  @property({ type: String })
  placement: Placement = "b";
  @property({ type: Boolean })
  hideArrow = false;
  @property({ type: Boolean })
  hideCloseButton = true;
  @property({ type: String })
  trigger: Trigger = "hover";

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = `
    --content-visible: hidden;
    --content-left: 50%;
    --content-transform: translateX(-50%);

    --arrow-rotate: 0deg;
    --arrow-margin-left: 5px;
    --arrow-visible: var(--content-visible);

    --padding: ${parseVariables(cssVar("padding", this.size))};

    --content-bg-color: ${parseVariables(
      cssVar("colors", this.themeColor, 500),
      "#111827",
    )};
    --content-color: ${parseVariables(
      cssVar("colors", this.color),
      this.color,
    )};;
    `;

    if (this.hideArrow) {
      additionalCss += `
       --arrow-visible: hidden;
      `;
    }
    switch (this.placement) {
      case "t":
        additionalCss += `
        --content-bottom: 160%;
        --arrow-top: 100%;
        --arrow-left: 50%;
        `;
        break;
      case "tl":
        additionalCss += `
          --content-bottom: 160%;
          --content-left: 100%;
          --arrow-top: 100%;
          --arrow-left: 10%;
          `;
        break;
      case "tr":
        additionalCss += `
            --content-bottom: 160%;
            --content-left: 0;
            --arrow-top: 100%;
            --arrow-left: 85%;
            `;
        break;
      case "b":
        additionalCss += `
        --content-bottom: -350%;
        --arrow-top: -13%;
        --arrow-left: 50%;
        --arrow-rotate: 180deg;
        `;
        break;

      case "bl":
        additionalCss += `
          --content-bottom: -350%;
          --content-left: 100%;
          --arrow-top: -13%;
          --arrow-left: 10%;
          --arrow-rotate: 180deg;
          `;
        break;
      case "br":
        additionalCss += `
          --content-bottom: -350%;
          --content-left: 0;
          --arrow-top: -13%;
          --arrow-left: 85%;
          --arrow-rotate: 180deg;
            `;
        break;
      case "r":
        additionalCss += `
            --content-bottom: none;
            --content-left: 120%;
            --content-right: none;

            --arrow-top: 45%;
            --arrow-left: none;
            --arrow-right: 100%;
            --arrow-rotate: 90deg;

            --content-transform: translateY(-50%);
              `;
        break;
      case "rt":
        additionalCss += `
              --content-bottom: none;
              --content-left: 120%;
              --content-right: none;
  
              --arrow-top: 20%;
              --arrow-left: none;
              --arrow-right: 100%;
              --arrow-rotate: 90deg;
  
              --content-transform: translateY(-50%);
                `;
        break;
      case "rb":
        additionalCss += `
              --content-bottom: none;
              --content-left: 120%;
              --content-right: none;
  
              --arrow-top: 70%;
              --arrow-left: none;
              --arrow-right: 100%;
              --arrow-rotate: 90deg;
  
              --content-transform: translateY(-50%);
                `;
        break;
      case "l":
        additionalCss += `
              --content-bottom: none;
              --content-left: none;
              --content-right: 120%;

              --arrow-top: 45%;
              --arrow-left: 100%;
              --arrow-right: none;
              --arrow-rotate: -90deg;
              --arrow-margin-left: 0;
              --content-transform: translateY(-50%);
                `;
        break;

      case "lt":
        additionalCss += `
                --content-bottom: none;
                --content-left: none;
                --content-right: 120%;
  
                --arrow-top: 20%;
                --arrow-left: 100%;
                --arrow-right: none;
                --arrow-rotate: -90deg;
                --arrow-margin-left: 0;
                --content-transform: translateY(-50%);
                  `;
        break;
      case "lb":
        additionalCss += `
                  --content-bottom: none;
                  --content-left: none;
                  --content-right: 120%;
    
                  --arrow-top: 70%;
                  --arrow-left: 100%;
                  --arrow-right: none;
                  --arrow-rotate: -90deg;
                  --arrow-margin-left: 0;
                  --content-transform: translateY(-50%);
                    `;
        break;
      default:
        break;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.tooltip, "div")}

      <style>
        div {
          ${additionalCss}
        }
      </style>

      <div class="tooltip">
        <slot></slot>
          <div class="tool-tip-content">
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    .tooltip {
      position: relative;
      display: inline-block;
    }

    .tooltip .tool-tip-content {
      visibility: var(--content-visible);
      background-color: var(--content-bg-color);
      color: var(--content-color);
      border-radius: 8px;
      padding: var(--padding);
      position: absolute;
      z-index: 1;

      height: auto;
      width: auto;
      margin: 0;
      bottom: var(--content-bottom);
      left: var(--content-left);
      right: var(--content-right);
      transform: var(--content-transform);
    }

    .tooltip .tool-tip-content::after {
      content: " ";
      position: absolute;
      top: var(--arrow-top);
      left: var(--arrow-left);
      right: var(--arrow-right);

      margin-left: var(--arrow-margin-left);
      border-width: 5px;
      border-style: solid;
      visibility: var(--arrow-visible);
      transform: rotate(var(--arrow-rotate));
      border-color: var(--content-bg-color) transparent transparent transparent;
    }

    .tooltip:hover .tool-tip-content {
      --content-visible: visible;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-tooltip": Tooltip;
  }
}
