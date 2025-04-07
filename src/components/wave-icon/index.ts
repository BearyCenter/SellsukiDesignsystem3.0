import { consume } from "@lit/context";
import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import {
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
  Size,
  Theme,
} from "../../types/theme";
import "../../../src/components/misc-icon";

@customElement("ssk-wave-icon")
export class WaveIcon extends LitElement {
  static registeredName = "ssk-wave-icon";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: Boolean })
  hidden = false;

  @property({ type: String })
  iconName: string = "outline-question-mark-circle";

  @property({ type: String })
  themeColor: string = "black";

  @state()
  // NOTE: In design system, fixed XL size of misc icon
  _size: Size = "xl";

  // NOTE: In design system, fixed opacity in each wave circle
  @state()
  _waveOpacityConfig: number[] = [0.45, 0.35, 0.25, 0.15, 0.05, 0.025];

  // NOTE: In design system, distance of first circle is 2.5rem (40px) and next distance of each circle is 4rem (64px)
  // waveSizeConfig is distances of each wave circle from the center, in rem.
  // - The first circle is 2.5rem from the center (equivalent to 40px in the design system).
  // - Subsequent circles are spaced 4rem (64px) apart from the previous one, cumulatively from the center.
  //   e.g., the second circle is 2.5rem + 4rem = 6.5rem from the center.
  @state()
  _waveSizeConfig: number[] = [2.5, 6.5, 10.5, 14.5, 18.5, 22.5];

  @state()
  _iconSizeMap: { [key: string]: number } = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
  };

  render() {
    if (this.hidden) {
      return nothing;
    }

    const _themeColor = parseVariables(
      cssVar("colors", this.themeColor, 500),
      this.themeColor,
      cssVar("colors", "primary", 500),
    );

    const waveContainerSize = `calc(${this._iconSizeMap[this._size]}px + ${
      this._waveSizeConfig[this._waveSizeConfig.length - 1]
    }rem)`;

    return html` <style>
        :host {
          --container-size: ${waveContainerSize};
          --theme-color: ${_themeColor};
      </style>

      <div class="container">
        <div class="icon-wave-container">
          ${this.renderWave()}

          <div class="icon-wrapper">
            <div class="icon-container">
              <ssk-misc-icon
                iconname=${this.iconName}
                size=${this._size}
                themecolor=${this.themeColor}
              />
            </div>
          </div>
        </div>
        <div class="slot-container">
          <slot />
        </div>
      </div>`;
  }

  renderWave() {
    return html`${this._waveSizeConfig.map(
      (circleSize, index) =>
        html`<div
          class="wave"
          style="--circle-opacity:${this._waveOpacityConfig[
            index
          ]}; --circle-size: calc(${`${
            this._iconSizeMap[this._size]
          }px + ${circleSize}rem`});"
        />`,
    )}`;
  }

  static styles = css`
    :host {
      display: inline-block;
    }

    .container {
      position: relative;
    }

    .slot-container {
      position: absolute;
      justify-self: anchor-center;
      top: 62%;
    }

    .icon-wave-container {
      position: relative;
      display: flex;
      justify-content: center;
      width: var(--container-size);
      height: var(--container-size);
    }

    .icon-wrapper {
      display: flex;
      justify-content: center;
      z-index: 0;
    }

    .wave {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid var(--theme-color);
      border-radius: 50%;
      opacity: var(--circle-opacity);
      width: var(--circle-size);
      height: var(--circle-size);
      z-index: 0;
    }

    .icon-container {
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-wave-icon": WaveIcon;
  }
}
