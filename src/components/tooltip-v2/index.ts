import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
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

@customElement("ssk-tooltip")
export class TooltipV2 extends LitElement implements ThemeValue {
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

    --close-button-display: ${this.hideCloseButton ? "none" : "block"};
    `;

    if (this.hideArrow) {
      additionalCss += `
       --arrow-visible: hidden;
      `;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.tooltip, "div")}

      <style>
        div {
          ${additionalCss}
        }
      </style>

      <div class="tooltip ${this.trigger}" @click=${this._handleClickable}>
        <div class="tooltip-wrapper">
          <div class="content ">
            <div class="label">
              <ssk-text size=${this.size}>${this.label}</ssk-text>
            </div>
            <div class="close-button">
              <ssk-icon
                ?hidden=${this.hideCloseButton}
                size=${this.size}
                name="outline-x-mark"
                @click=${this._close}
              ></ssk-icon>
            </div>
            <div class="slot">
              <slot name="content"></slot>
            </div>
          </div>
        </div>

        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      position: static;
      width: 100%;
    }

    .tooltip {
      display: block;
      position: static;
      width: 100%;
    }

    .tooltip-wrapper {
      position: absolute;
      visibility: hidden;
    }

    .tooltip.hover:hover .content {
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
      position: relative;
      display: grid;
      gap: 0.25rem;
      grid-template-columns: auto auto;
    }

    .close-button {
      display: var(--close-button-display);
    }

    ssk-icon {
      cursor: pointer;
      float: right;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-tooltip-v2": TooltipV2;
  }
}
