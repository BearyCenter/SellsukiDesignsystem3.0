import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import "../../../src/elements/text";
import { themeContext } from "../../contexts/theme";
import { ThemeValue } from "../../types/base-attributes";

import {
  ColorName,
  ColorRole,
  Size,
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
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
  label: string = "";
  @property({ type: String })
  areaPosition: string = "100%";
  @property({ type: String })
  maxWidth?: string = "max-content";

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
      "#111827"
    )};
    --content-color: ${parseVariables(
      cssVar("colors", this.color),
      this.color,
      "#fff"
    )};

    --padding: ${parseVariables(cssVar("padding", this.size))};
    --rounded: ${parseVariables(cssVar("rounded", this.size))};

    --arrow-visible: var(--content-visible);
    --area-position: ${this.areaPosition};
    --tooltip-max-width: ${this.maxWidth};
    `;

    if (this.hideArrow) {
      additionalCss += `
       --arrow-visible: hidden;
      `;
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
          <div
            class="content-wrapper${this.hideCloseButton
              ? ""
              : "-with-close-button"}"
          >
            <div class="label">
              <ssk-text color="${this.color}" size=${this.size}
                >${this.label}</ssk-text
              >
            </div>
            ${contentSlotExists ? html`<slot name="content"></slot>` : nothing}
          </div>
          <div
            @click=${this._close}
            class="close-button${this.hideCloseButton ? "-hide" : ""}"
          >
            <ssk-icon
              ?hidden=${this.hideCloseButton}
              size=${this.size}
              name="outline-x-mark"
            ></ssk-icon>
          </div>
        </div>
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    :host {
      max-width: 100%;
    }

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
      max-width: var(--tooltip-max-width);
      position: relative;
      background-color: var(--content-bg-color);
      color: var(--content-color);
      border-radius: var(--rounded);
      z-index: 1;
      box-shadow: 0px 3px 6px 0px var(--ssk-colors-gray-300);
    }

    .content-wrapper {
      padding: var(--padding);
    }

    .content-wrapper-with-close-button {
      padding: var(--padding) 0 var(--padding) var(--padding);
      display: flex;
      flex-direction: column;
      justify-content: center;
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
      bottom: calc(var(--area-position) + 10px);
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
      bottom: calc(var(--area-position) + 10px);
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
      bottom: calc(var(--area-position) + 10px);
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
      top: calc(var(--area-position) + 10px);
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
      top: calc(var(--area-position) + 10px);
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
      top: calc(var(--area-position) + 10px);
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
      right: calc(var(--area-position) + 10px);
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
      right: calc(var(--area-position) + 10px);
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
      right: calc(var(--area-position) + 10px);
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
      left: calc(var(--area-position) + 10px);
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
      left: calc(var(--area-position) + 10px);
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
      left: calc(var(--area-position) + 10px);
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

    .close-button {
      width: 44px;
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .close-button-hide {
      display: none;
    }

    ssk-icon {
      float: right;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-tooltip": Tooltip;
  }
}

if (!customElements.get("ssk-tooltip")) {
  customElements.define("ssk-tooltip", Tooltip);
}
