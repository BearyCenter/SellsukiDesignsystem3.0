import { consume } from "@lit/context";
import { css, html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { cssVar, parseVariables, Theme } from "../../types/theme";
import "../../../src/components/misc-icon";

// NOTE: In design system, distance of first circle is 2.5rem (40px) and next distance of each circle is 4rem (64px)
// waveSizeConfig is distances of each wave circle from the center, in rem.
// - The first circle is 2.5rem from the center (equivalent to 40px in the design system).
// - Subsequent circles are spaced 4rem (64px) apart from the previous one, cumulatively from the center.
//   e.g., the second circle is 2.5rem + 4rem = 6.5rem from the center.
const _waveSizeConfig: number[] = [2.5, 6.5, 10.5, 14.5, 18.5, 22.5];

// NOTE: In design system, fixed opacity in each wave circle
const _waveOpacityConfig: number[] = [1, 0.85, 0.7, 0.55, 0.4, 0.25];
const _iconSizeMap: { [key: string]: number } = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};

/**
 * Sellsuki Wave Icon — DS 3.0
 *
 * Animated radar-ping icon: an `<ssk-icon>` centered inside concentric
 * pulsing rings (six rings with cascading opacity 1 → 0.25). Conveys
 * "active / live / new" presence without text.
 *
 * Reach for `<ssk-wave-icon>` for live-status indicators (live chat,
 * realtime alerts, new-feature pulse). For a static decorative tile use
 * `<ssk-misc-icon>`; for a tiny count badge use `<ssk-badge>`.
 *
 * @example
 *   <ssk-wave-icon
 *     iconName="solid-bell"
 *     themeColor="brand"
 *     size="xl"
 *   ></ssk-wave-icon>
 */
export class WaveIcon extends LitElement {
  static registeredName = "ssk-wave-icon";

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Maps
   * brand tokens onto the central icon and wave color; rarely set manually.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  /**
   * When `true` the wave icon renders nothing — useful for conditionally
   * suppressing the animation while keeping the slot in place.
   */
  @property({ type: Boolean })
  hidden = false;

  /**
   * Name of the heroicons glyph rendered in the center (e.g.
   * `"solid-bell"`, `"outline-megaphone"`). Defaults to a question-mark
   * placeholder — set this to the icon that represents the live activity.
   */
  @property({ type: String })
  iconName: string = "outline-question-mark-circle";

  /**
   * Brand color token used for both the icon tile and the wave rings unless
   * `iconColor` / `waveColor` override them. Falls back to `primary` from the
   * active brand context if unset.
   */
  @property({ type: String })
  themeColor: string = "black";

  /**
   * Optional override for the central icon's color token, independent of the
   * wave rings. Leave unset to inherit from `themeColor`.
   */
  @property({ type: String })
  iconColor?: string;

  /**
   * Optional override for the wave ring color, independent of the icon.
   * Leave unset to inherit from `themeColor`.
   */
  @property({ type: String })
  waveColor?: string;

  /**
   * Diameter step for the central icon — `sm` (32) / `md` (40) / `lg` (48) /
   * `xl` (56). Wave ring spacing scales from this base; defaults to `xl`.
   */
  @property({ type: String })
  size: string = "xl";

  render() {
    if (this.hidden) {
      return nothing;
    }

    const waveColor = parseVariables(
      cssVar("colors", this.waveColor),
      cssVar("colors", this.waveColor, 500),
      this.waveColor,
      cssVar("colors", this.themeColor, 500),
      cssVar("colors", "primary", 500)
    );

    const basePx =
      _iconSizeMap[this.size as keyof typeof _iconSizeMap] ??
      _iconSizeMap["xl"];

    const waveContainerSize = `calc(${basePx}px + ${
      _waveSizeConfig[_waveSizeConfig.length - 1]
    }rem)`;

    return html` <style>
        :host {
          --container-size: ${waveContainerSize};
          --theme-color: ${waveColor};
      </style>

      <div class="container">
        <div class="icon-wave-container">
          ${this.renderWave()}

          <div class="icon-wrapper">
            <div class="icon-container">
              <ssk-misc-icon
                iconname=${this.iconName}
                size=${this.size}
                themecolor=${this.themeColor}
                iconcolor=${this.iconColor}
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
    const basePx =
      _iconSizeMap[this.size as keyof typeof _iconSizeMap] ??
      _iconSizeMap["xl"];

    return html`${_waveSizeConfig.map(
      (circleSize, index) =>
        html`<div
          class="wave"
          style="--circle-opacity:${_waveOpacityConfig[
            index
          ]}; --circle-size: calc(${`${basePx}px + ${circleSize}rem`});"
        />`
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

if (!customElements.get("ssk-wave-icon")) {
  customElements.define("ssk-wave-icon", WaveIcon);
}
