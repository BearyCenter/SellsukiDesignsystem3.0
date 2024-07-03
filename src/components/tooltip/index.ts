import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { ThemeValue } from "../../types/base-attributes";
import { consume } from "@lit/context";
import {
  ColorName,
  ColorRole,
  Size,
  Theme,
  parseThemeToCssVariables,
  parseVariables,
  cssVar,
} from "../../types/theme";

export type Placement =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "topleft"
  | "topright"
  | "bottomleft"
  | "bottomright"
  | "lefttop"
  | "leftbottom"
  | "righttop"
  | "rightbottom";

export type Trigger = "hover" | "click";
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
  placement: Placement = "top";
  @property({ type: Boolean })
  hideArrow = false;
  @property({ type: Boolean })
  hideCloseButton = false;
  @property({ type: String })
  trigger: Trigger = "hover";
  @property({ type: String })
  left?: string;
  @property({ type: String })
  right?: string;
  @property({ type: String })
  top?: string;
  @property({ type: String })
  bottom?: string;

  @state()
  _isOpen: boolean = false;

  private _handleVisibleTooltip(): string {
    if (this.trigger === "hover") return "hidden";
    return this._isOpen ? "visible" : "hidden";
  }

  private _handleClickable() {
    if (this.trigger === "click" && !this._isOpen) this._isOpen = true;
  }

  private _close(e: Event) {
    e.stopPropagation();
    this._isOpen = false;
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = `
    --content-visible: ${this._handleVisibleTooltip()};
    --content-bg-color: ${parseVariables(
      cssVar("colors", this.themeColor, 500),
      "#111827",
    )};
    --content-color: ${parseVariables(
      cssVar("colors", this.color),
      this.color,
    )};

    --padding: ${parseVariables(cssVar("padding", this.size))};
    --rounded: ${parseVariables(cssVar("rounded", this.size))};

    --arrow-visible: var(--content-visible);
    `;

    if (this.hideArrow) {
      additionalCss += `
       --arrow-visible: hidden;
      `;
    }

    switch (this.placement) {
      case "top":
        additionalCss += `
          --content-top: ${this.top ? this.top : "none"};
          --content-bottom: ${this.bottom ? this.bottom : "140%"};
          --content-left: ${this.left ? this.left : "50%"};
          --content-right: ${this.right ? this.right : "none"};
          --content-transform: translateX(-50%);

          --arrow-top: none;
          --arrow-bottom: 0px;
          --arrow-left: 50%;
          --arrow-right: none;
          --arrow-transform: translateY(100%) translateX(-50%) rotate(180deg);
        `;
        break;

      case "topright":
        additionalCss += `
          --content-top: ${this.top ? this.top : "none"};
          --content-bottom: ${this.bottom ? this.bottom : "140%"};
          --content-left: ${this.left ? this.left : "none"};
          --content-right: ${this.right ? this.right : "30%"};
          --content-transform: none;
  
          --arrow-top: none;
          --arrow-bottom: 0px;
          --arrow-left: 85%;
          --arrow-right: none;
          --arrow-transform: translateY(100%) translateX(-50%) rotate(180deg);
          `;
        break;

      case "topleft":
        additionalCss += `
          --content-top: ${this.top ? this.top : "none"};
          --content-bottom: ${this.bottom ? this.bottom : "140%"};
          --content-left: ${this.left ? this.left : "30%"};
          --content-right: ${this.right ? this.right : "none"};
          --content-transform: none;
  
          --arrow-top: none;
          --arrow-bottom: 0px;
          --arrow-left: none;
          --arrow-right: 85%;
          --arrow-transform: translateY(100%) translateX(50%) rotate(180deg);
            `;
        break;

      case "bottom":
        additionalCss += `
          --content-top: ${this.top ? this.top : "140%"};
          --content-bottom: ${this.bottom ? this.bottom : "none"};
          --content-left: ${this.left ? this.left : "50%"};
          --content-right: ${this.right ? this.right : "none"};
          --content-transform: translateX(-50%);
  
          --arrow-top: 0px;
          --arrow-bottom: none;
          --arrow-left: 50%;
          --arrow-right: none;
          --arrow-transform: translateY(-100%) translateX(-50%) rotate(0deg);
          `;
        break;

      case "bottomright":
        additionalCss += `
          --content-top: ${this.top ? this.top : "140%"};
          --content-bottom: ${this.bottom ? this.bottom : "none"};
          --content-left: ${this.left ? this.left : "0"};
          --content-right: ${this.right ? this.right : "none"};
          --content-transform: translateX(-50%);
  
          --arrow-top: 0px;
          --arrow-bottom: none;
          --arrow-left: 85%;
          --arrow-right: none;
          --arrow-transform: translateY(-100%) translateX(-50%) rotate(0deg);
            `;
        break;
      case "bottomleft":
        additionalCss += `
          --content-top: ${this.top ? this.top : "140%"};
          --content-bottom: ${this.bottom ? this.bottom : "none"};
          --content-left: ${this.left ? this.left : "none"};
          --content-right: ${this.right ? this.right : "0"};
          --content-transform: translateX(50%);
  
          --arrow-top: 0px;
          --arrow-bottom: none;
          --arrow-left: none;
          --arrow-right: 85%;
          --arrow-transform: translateY(-100%) translateX(50%) rotate(0deg);
        `;
        break;
      case "left":
        additionalCss += `
          --content-top: ${this.top ? this.top : "50%"};
          --content-bottom: ${this.bottom ? this.bottom : "none"};
          --content-left: ${this.left ? this.left : "none"};
          --content-right: ${this.right ? this.right : "125%"};
          --content-transform: translateY(-50%) translateX(10%);
      
          --arrow-top: 50%;
          --arrow-bottom: none;
          --arrow-left: none;
          --arrow-right: 0.3rem;
          --arrow-transform: translateY(-50%) translateX(100%) rotate(90deg);
        `;
        break;

      case "lefttop":
        additionalCss += `
          --content-top: ${this.top ? this.top : "none"};
          --content-bottom: ${this.bottom ? this.bottom : "none"};
          --content-left: ${this.left ? this.left : "none"};
          --content-right: ${this.right ? this.right : "120%"};
          --content-transform: translateY(-5%) translateX(10%);
      
          --arrow-top: none;
          --arrow-bottom: 50%;
          --arrow-left: none;
          --arrow-right: 0.3rem;
          --arrow-transform: translateX(100%) rotate(90deg);
        `;
        break;
      case "leftbottom":
        additionalCss += `
          --content-top: ${this.top ? this.top : "none"};
          --content-bottom: ${this.bottom ? this.bottom : "none"};
          --content-left: ${this.left ? this.left : "-145%"};
          --content-right: ${this.right ? this.right : "none"};
          --content-transform: none;
      
          --arrow-top: 55%;
          --arrow-bottom: none;
          --arrow-left: none;
          --arrow-right: 0.3rem;
          --arrow-transform: translateX(100%) rotate(90deg);
          `;
        break;
      case "right":
        additionalCss += `
          --content-top: ${this.top ? this.top : "50%"};
          --content-bottom: ${this.bottom ? this.bottom : "none"};
          --content-left: ${this.left ? this.left : "100%"};
          --content-right: ${this.right ? this.right : "none"};
          --content-transform: translateY(-50%) translateX(10%);

          --arrow-top: 50%;
          --arrow-bottom: none;
          --arrow-left: -0.7rem;
          --arrow-right: none;
          --arrow-transform: translateY(-50%) rotate(-90deg);
        `;
        break;

      case "righttop":
        additionalCss += `
          --content-top: ${this.top ? this.top : "none"};
          --content-bottom: ${this.bottom ? this.bottom : "none"};
          --content-left: ${this.left ? this.left : "100%"};
          --content-right: ${this.right ? this.right : "none"};
          --content-transform: translateY(-5%) translateX(10%);

          --arrow-top: none;
          --arrow-bottom: 75%;
          --arrow-left: -0.7rem;
          --arrow-right: none;
          --arrow-transform: translateY(100%) rotate(-90deg);
          `;
        break;

      case "rightbottom":
        additionalCss += `
          --content-top: ${this.top ? this.top : "50%"};
          --content-bottom: ${this.bottom ? this.bottom : "none"};
          --content-left: ${this.left ? this.left : "100%"};
          --content-right: ${this.right ? this.right : "none"};
          --content-transform: translateY(-90%) translateX(10%);

          --arrow-top: 50%;
          --arrow-bottom: none;
          --arrow-left: -0.7rem;
          --arrow-right: none;
          --arrow-transform: translateY(50%) rotate(-90deg);
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

      <div class="tooltip ${this.trigger}" @click=${this._handleClickable}>
        <div class="tooltip-content">
          <div class="content">
            <slot name="content"></slot>
            <div class="close-button${this.hideCloseButton ? "-hide" : ""}">
              <ssk-icon
                ?hidden=${this.hideCloseButton}
                size=${this.size}
                name="outline-x-mark"
                @click=${this._close}
              ></ssk-icon>
            </div>
          </div>
          <div class="arrow"></div>
        </div>
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    .tooltip {
      position: relative;
    }

    .tooltip.hover:hover .tooltip-content {
      --content-visible: visible;
    }

    .tooltip.hover:hover .arrow {
      --content-visible: visible;
    }

    .tooltip .tooltip-content {
      visibility: var(--content-visible);

      width: max-content;
      position: absolute;
      background-color: var(--content-bg-color);
      color: var(--content-color);
      border-radius: var(--rounded);
      z-index: 1;
      padding: var(--padding);
      box-shadow: 0px 3px 6px 0px var(--ssk-colors-gray-300);

      top: var(--content-top);
      bottom: var(--content-bottom);
      left: var(--content-left);
      right: var(--content-right);
      transform: var(--content-transform);
    }

    .arrow {
      position: absolute;
      visibility: var(--arrow-visible);

      z-index: 1;
      display: block;
      pointer-events: none;

      overflow: hidden;

      background: var(--content-bg-color);
      width: 16px;
      height: 8px;
      clip-path: path(
        "M 0 8 A 4 4 0 0 0 2.82842712474619 6.82842712474619 L 6.585786437626905 3.0710678118654755 A 2 2 0 0 1 9.414213562373096 3.0710678118654755 L 13.17157287525381 6.82842712474619 A 4 4 0 0 0 16 8 Z"
      );

      top: var(--arrow-top);
      bottom: var(--arrow-bottom);
      left: var(--arrow-left);
      right: var(--arrow-right);
      transform: var(--arrow-transform);
    }

    .content {
      display: grid;
      grid-template-columns: auto auto;
    }

    .close-button {
    }

    .close-button-hide {
      display: none;
    }

    ssk-icon {
      cursor: pointer;
      float: right;
      top: var(--padding);
      right: var(--padding);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-tooltip": Tooltip;
  }
}
