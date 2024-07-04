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
  trigger: Trigger = "click";
  @property({ type: String })
  label: string = "";
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
      "#fff",
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
          --content-right: ${this.right ? this.right : "125%"};
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
          --content-top: ${this.top ? this.top : "-15%"};
          --content-bottom: ${this.bottom ? this.bottom : "none"};
          --content-left: ${this.left ? this.left : "none"};
          --content-right: ${this.right ? this.right : "125%"};
          --content-transform: translateY(-5%) translateX(10%);
      
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
          --content-top: ${this.top ? this.top : "60%"};
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

    const contentSlotExists = this.querySelector('[slot="content"]');

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.tooltip, "div")}

      <style>
        div {
          ${additionalCss}
        }
      </style>

      <div class="tooltip ${this.trigger}" @click=${this._handleClickable}>
        <div class="content tooltip-${this.placement}">
          <div class="label"><ssk-text>${this.label}</ssk-text></div>
          <div class="close-button${this.hideCloseButton ? "-hide" : ""}">
            <ssk-icon
              ?hidden=${this.hideCloseButton}
              size=${this.size}
              name="outline-x-mark"
              @click=${this._close}
            ></ssk-icon>
          </div>
          ${contentSlotExists ? html`<slot name="content"></slot>` : nothing}
        </div>
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    .tooltip {
      position: relative;
    }

    .tooltip.hover:hover .content {
      --content-visible: visible;
    }

    .tooltip.hover:hover .arrow {
      --content-visible: visible;
    }

    .tooltip .content {
      visibility: var(--content-visible);

      width: max-content;
      position: relative;
      background-color: var(--content-bg-color);
      color: var(--content-color);
      border-radius: var(--rounded);
      z-index: 1;
      padding: var(--padding);
      box-shadow: 0px 3px 6px 0px var(--ssk-colors-gray-300);
    }

    .tooltip .content::after {
      position: absolute;
      visibility: var(--arrow-visible);

      content: "";
      border-width: 5px;
      border-style: solid;
    }

    /* tooltip top */
    .tooltip .tooltip-top {
      bottom: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
    }

    .tooltip .tooltip-top::after {
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-color: var(--content-bg-color) transparent transparent transparent;
    }

    /* tooltip topleft */
    .tooltip .tooltip-topleft {
      bottom: calc(100% + 10px);
      left: 50%;
      transform: translateX(-10%);
      position: absolute;
    }

    .tooltip .tooltip-topleft::after {
      top: 100%;
      left: 10%;
      margin-left: -5px;
      border-color: var(--content-bg-color) transparent transparent transparent;
    }

    /* tooltip topright */
    .tooltip .tooltip-topright {
      bottom: calc(100% + 10px);
      left: 50%;
      transform: translateX(-90%);
      position: absolute;
    }

    .tooltip .tooltip-topright::after {
      top: 100%;
      left: 90%;
      margin-left: -5px;
      border-color: var(--content-bg-color) transparent transparent transparent;
    }

    /* tooltip bottom */
    .tooltip .tooltip-bottom {
      top: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
    }

    .tooltip .tooltip-bottom::after {
      bottom: 100%;
      left: 50%;
      margin-left: -5px;
      border-color: transparent transparent var(--content-bg-color) transparent;
    }

    /* tooltip bottomleft */
    .tooltip .tooltip-bottomleft {
      top: calc(100% + 10px);
      left: 50%;
      transform: translateX(-10%);
      position: absolute;
    }

    .tooltip .tooltip-bottomleft::after {
      bottom: 100%;
      left: 10%;
      margin-left: -5px;
      border-color: transparent transparent var(--content-bg-color) transparent;
    }

    /* tooltip bottomright */
    .tooltip .tooltip-bottomright {
      top: calc(100% + 10px);
      left: 50%;
      transform: translateX(-90%);
      position: absolute;
    }

    .tooltip .tooltip-bottomright::after {
      bottom: 100%;
      left: 90%;
      margin-left: -5px;
      border-color: transparent transparent var(--content-bg-color) transparent;
    }

    /* tooltip left */
    .tooltip .tooltip-left {
      top: 50%;
      right: calc(100% + 10px);
      transform: translateY(-50%);
      position: absolute;
    }

    .tooltip .tooltip-left::after {
      left: 100%;
      top: calc(50% - 4px);
      margin-left: 0;
      border-color: transparent transparent transparent var(--content-bg-color);
    }

    /* tooltip lefttop */
    .tooltip .tooltip-lefttop {
      top: 50%;
      right: calc(100% + 10px);
      transform: translateY(-30%);
      position: absolute;
    }

    .tooltip .tooltip-lefttop::after {
      left: 100%;
      top: calc(30% - 4px);
      margin-left: 0;
      border-color: transparent transparent transparent var(--content-bg-color);
    }

    /* tooltip leftbottom */
    .tooltip .tooltip-leftbottom {
      top: 50%;
      right: calc(100% + 10px);
      transform: translateY(-70%);
      position: absolute;
    }

    .tooltip .tooltip-leftbottom::after {
      left: 100%;
      top: calc(70% - 4px);
      margin-left: 0;
      border-color: transparent transparent transparent var(--content-bg-color);
    }

    /* tooltip right */
    .tooltip .tooltip-right {
      top: 50%;
      left: calc(100% + 10px);
      transform: translateY(-50%);
      position: absolute;
    }

    .tooltip .tooltip-right::after {
      right: 100%;
      top: calc(50% - 4px);
      margin-left: 0;
      border-color: transparent var(--content-bg-color) transparent transparent;
    }

    /* tooltip righttop */
    .tooltip .tooltip-righttop {
      top: 50%;
      left: calc(100% + 10px);
      transform: translateY(-30%);
      position: absolute;
    }

    .tooltip .tooltip-righttop::after {
      right: 100%;
      top: calc(30% - 4px);
      margin-left: 0;
      border-color: transparent var(--content-bg-color) transparent transparent;
    }

    /* tooltip rightbottom */
    .tooltip .tooltip-rightbottom {
      top: 50%;
      left: calc(100% + 10px);
      transform: translateY(-70%);
      position: absolute;
    }

    .tooltip .tooltip-rightbottom::after {
      right: 100%;
      top: calc(70% - 4px);
      margin-left: 0;
      border-color: transparent var(--content-bg-color) transparent transparent;
    }

    .content {
      display: grid;
      grid-template-columns: auto auto;
    }

    .close-button-hide {
      display: none;
    }

    ssk-icon {
      cursor: pointer;
      float: right;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-tooltip": Tooltip;
  }
}
