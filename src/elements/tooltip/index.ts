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
              --arrow-transform: translateY(-50%) translateX(0%) rotate(-90deg);
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
        <div class="arrow"></div>
        <div class="tooltip-content">
          <slot name="content"></slot>
        </div>
      </div>
      <div class="ss">
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
      visibility: var(--content-visible);

      position: absolute;
      background-color: #333;
      color: #fff;
      padding: 8px;
      border-radius: 4px;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      top: var(--content-top);
      bottom: var(--content-bottom);
      left: var(--content-left);
      right: var(--content-right);
      transform: var(--content-transform);
    }

    .ss:hover .tooltip {
      --content-visible: visible;
      background: red;
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

      background: red;
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
