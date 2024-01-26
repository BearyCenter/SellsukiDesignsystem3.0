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
  placement: Placement = "top";
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
    --content-visible: visible;
    --content-bg-color: ${parseVariables(
      cssVar("colors", this.themeColor, 500),
      "#111827",
    )};
    --content-color: ${parseVariables(
      cssVar("colors", this.color),
      this.color,
    )};

    --padding: ${parseVariables(cssVar("padding", this.size))};

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
          --content-top: none;
          --content-bottom: 140%;
          --content-left: 50%;
          --content-right: none;
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
          --content-top: none;
          --content-bottom: 140%;
          --content-left: 0;
          --content-right: none;
          --content-transform: translateX(-50%);
  
          --arrow-top: none;
          --arrow-bottom: 0px;
          --arrow-left: 90%;
          --arrow-right: none;
          --arrow-transform: translateY(100%) translateX(-50%) rotate(180deg);
          `;
        break;

      case "topleft":
        additionalCss += `
          --content-top: none;
          --content-bottom: 140%;
          --content-left: none;
          --content-right: 0;
          --content-transform: translateX(50%);
  
          --arrow-top: none;
          --arrow-bottom: 0px;
          --arrow-left: none;
          --arrow-right: 90%;
          --arrow-transform: translateY(100%) translateX(50%) rotate(180deg);
            `;
        break;

      case "bottom":
        additionalCss += `
          --content-top: 140%;
          --content-bottom: none;
          --content-left: 50%;
          --content-right: none;
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
          --content-top: 140%;
          --content-bottom: none;
          --content-left: 0;
          --content-right: none;
          --content-transform: translateX(-50%);
  
          --arrow-top: 0px;
          --arrow-bottom: none;
          --arrow-left: 90%;
          --arrow-right: none;
          --arrow-transform: translateY(-100%) translateX(-50%) rotate(0deg);
            `;
        break;
      case "bottomleft":
        additionalCss += `
          --content-top: 140%;
          --content-bottom: none;
          --content-left: none;
          --content-right: 0;
          --content-transform: translateX(50%);
  
          --arrow-top: 0px;
          --arrow-bottom: none;
          --arrow-left: none;
          --arrow-right: 90%;
          --arrow-transform: translateY(-100%) translateX(50%) rotate(0deg);
        `;
        break;
      case "left":
        additionalCss += `
          --content-top: 50%;
          --content-bottom: none;
          --content-left: none;
          --content-right: 100%;
          --content-transform: translateY(-50%) translateX(-10%);
      
          --arrow-top: 50%;
          --arrow-bottom: none;
          --arrow-left: none;
          --arrow-right: 2%;
          --arrow-transform: translateY(-50%) translateX(100%) rotate(90deg);
        `;
        break;

      case "lefttop":
        additionalCss += `
          --content-top: none;
          --content-bottom: none;
          --content-left: none;
          --content-right: 100%;
          --content-transform: translateY(-5%) translateX(-10%);
      
          --arrow-top: none;
          --arrow-bottom: 85%;
          --arrow-left: none;
          --arrow-right: 2%;
          --arrow-transform: translateX(100%) rotate(90deg);
        `;
        break;
      case "leftbottom":
        additionalCss += `
          --content-top: 50%;
          --content-bottom: none;
          --content-left: none;
          --content-right: 100%;
          --content-transform: translateY(-90%) translateX(-10%);
      
          --arrow-top: 90%;
          --arrow-bottom: none;
          --arrow-left: none;
          --arrow-right: 2%;
          --arrow-transform: translateY(-50%) translateX(100%) rotate(90deg);
          `;
        break;
      case "right":
        additionalCss += `
          --content-top: 50%;
          --content-bottom: none;
          --content-left: 100%;
          --content-right: none;
          --content-transform: translateY(-50%) translateX(10%);

          --arrow-top: 50%;
          --arrow-bottom: none;
          --arrow-left: -5%;
          --arrow-right: none;
          --arrow-transform: translateY(-50%) rotate(-90deg);
        `;
        break;

      case "righttop":
        additionalCss += `
          --content-top: none;
          --content-bottom: none;
          --content-left: 100%;
          --content-right: none;
          --content-transform: translateY(-5%) translateX(10%);

          --arrow-top: none;
          --arrow-bottom: 90%;
          --arrow-left: -5%;
          --arrow-right: none;
          --arrow-transform: translateY(100%) rotate(-90deg);
          `;
        break;

      case "rightbottom":
        additionalCss += `
          --content-top: 50%;
          --content-bottom: none;
          --content-left: 100%;
          --content-right: none;
          --content-transform: translateY(-90%) translateX(10%);

          --arrow-top: 85%;
          --arrow-bottom: none;
          --arrow-left: -5%;
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

      <div class="tooltip">
        <div class="tooltip-content">
          <div class="arrow"></div>
          <slot name="content"></slot>
        </div>
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    :host {
      position: relative;
      display: inline-block;
    }

    .tooltip {
      position: relative;
      display: inline-block;
    }

    .tooltip:hover .tooltip-content {
      --content-visible: visible;
    }

    .tooltip:hover .arrow {
      --content-visible: visible;
    }

    .tooltip .tooltip-content {
      visibility: var(--content-visible);

      position: absolute;
      background-color: var(--content-bg-color);
      color: var(--content-color);
      border-radius: 4px;
      z-index: 1;
      display: flex;
      padding: var(--padding);
      flex-direction: column;
      align-items: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);

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
      width: 16px;
      height: 16px;
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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-tooltip": Tooltip;
  }
}
