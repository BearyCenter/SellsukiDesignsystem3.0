import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import {
  ColorName,
  ColorRole,
  Size,
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";

export class Spinner extends LitElement {
  static registeredName = "ssk-spinner";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  // ThemeValue
  @property({ type: String })
  color: ColorRole | ColorName = "primary";

  @property({ type: String })
  size: Size = "md";

  @property({ type: Boolean })
  hidden = false;

  render() {
    if (this.hidden) {
      return nothing;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.spinner, ":host")}

      <style>
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .spinner {
          animation: spin 1s linear infinite;
          transform-origin: center center;
          display: block;
          width: ${parseVariables(cssVar("width", this.size), this.size)};
          height: ${parseVariables(cssVar("width", this.size), this.size)};
          color: ${parseVariables(
            cssVar("colors", this.color),
            cssVar("colors", this.color, 500),
            this.color
          )};
        }
      </style>

      <span class="spinner" data-testid=${this.testId || nothing}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            clip-path="url(#paint0_angular_8367_55592_clip_path)"
            data-figma-skip-parse="true"
          >
            <g transform="matrix(0.06 0 0 0.0430189 60 60)">
              <foreignObject
                x="-1417.98"
                y="-1417.98"
                width="2835.97"
                height="2835.97"
                ><div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style="background:conic-gradient(from 90deg,rgba(50, 169, 255, 0) 0deg,rgba(50, 169, 255, 0) 0.036deg, currentColor 360deg);height:100%;width:100%;opacity:1"
                ></div
              ></foreignObject>
            </g>
          </g>
          <path
            d="M114 60C117.314 60 120.031 57.3069 119.7 54.0098C118.722 44.2594 115.366 34.8642 109.888 26.6658C103.295 16.7988 93.9246 9.10849 82.961 4.56723C71.9974 0.02597 59.9334 -1.16223 48.2946 1.15288C36.6557 3.468 25.9647 9.18244 17.5736 17.5736C9.18244 25.9647 3.468 36.6557 1.15288 48.2946C-1.16223 59.9334 0.0259702 71.9974 4.56723 82.961C9.10849 93.9246 16.7988 103.295 26.6658 109.888C34.8642 115.366 44.2594 118.722 54.0098 119.7C57.3069 120.031 60 117.314 60 114C60 110.686 57.3033 108.039 54.0155 107.626C46.6426 106.699 39.5565 104.069 33.3326 99.9105C25.4391 94.6362 19.2868 87.1397 15.6538 78.3688C12.0208 69.598 11.0702 59.9468 12.9223 50.6357C14.7744 41.3246 19.346 32.7718 26.0589 26.0589C32.7718 19.346 41.3246 14.7744 50.6357 12.9223C59.9468 11.0702 69.598 12.0208 78.3688 15.6538C87.1397 19.2868 94.6362 25.4391 99.9105 33.3326C104.069 39.5565 106.699 46.6426 107.626 54.0155C108.039 57.3033 110.686 60 114 60Z"
            data-figma-gradient-fill="{&#34;type&#34;:&#34;GRADIENT_ANGULAR&#34;,&#34;stops&#34;:[{&#34;color&#34;:{&#34;r&#34;:0.19607843458652496,&#34;g&#34;:0.66274511814117432,&#34;b&#34;:1.0,&#34;a&#34;:0.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:0.19607843458652496,&#34;g&#34;:0.66274511814117432,&#34;b&#34;:1.0,&#34;a&#34;:0.0},&#34;position&#34;:9.9999997473787516e-05},{&#34;color&#34;:{&#34;r&#34;:0.19607843458652496,&#34;g&#34;:0.66274511814117432,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:1.0}],&#34;stopsVar&#34;:[{&#34;color&#34;:{&#34;r&#34;:0.19607843458652496,&#34;g&#34;:0.66274511814117432,&#34;b&#34;:1.0,&#34;a&#34;:0.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:0.19607843458652496,&#34;g&#34;:0.66274511814117432,&#34;b&#34;:1.0,&#34;a&#34;:0.0},&#34;position&#34;:9.9999997473787516e-05},{&#34;color&#34;:{&#34;r&#34;:0.19607843458652496,&#34;g&#34;:0.66274511814117432,&#34;b&#34;:1.0,&#34;a&#34;:1.0},&#34;position&#34;:1.0}],&#34;transform&#34;:{&#34;m00&#34;:120.0,&#34;m01&#34;:8.9752763055873930e-14,&#34;m02&#34;:-9.4493145675732942e-14,&#34;m10&#34;:-6.0638580474167009e-14,&#34;m11&#34;:86.037734985351562,&#34;m12&#34;:16.981132507324219},&#34;opacity&#34;:1.0,&#34;blendMode&#34;:&#34;NORMAL&#34;,&#34;visible&#34;:true}"
          />
          <defs>
            <clipPath id="paint0_angular_8367_55592_clip_path">
              <path
                d="M114 60C117.314 60 120.031 57.3069 119.7 54.0098C118.722 44.2594 115.366 34.8642 109.888 26.6658C103.295 16.7988 93.9246 9.10849 82.961 4.56723C71.9974 0.02597 59.9334 -1.16223 48.2946 1.15288C36.6557 3.468 25.9647 9.18244 17.5736 17.5736C9.18244 25.9647 3.468 36.6557 1.15288 48.2946C-1.16223 59.9334 0.0259702 71.9974 4.56723 82.961C9.10849 93.9246 16.7988 103.295 26.6658 109.888C34.8642 115.366 44.2594 118.722 54.0098 119.7C57.3069 120.031 60 117.314 60 114C60 110.686 57.3033 108.039 54.0155 107.626C46.6426 106.699 39.5565 104.069 33.3326 99.9105C25.4391 94.6362 19.2868 87.1397 15.6538 78.3688C12.0208 69.598 11.0702 59.9468 12.9223 50.6357C14.7744 41.3246 19.346 32.7718 26.0589 26.0589C32.7718 19.346 41.3246 14.7744 50.6357 12.9223C59.9468 11.0702 69.598 12.0208 78.3688 15.6538C87.1397 19.2868 94.6362 25.4391 99.9105 33.3326C104.069 39.5565 106.699 46.6426 107.626 54.0155C108.039 57.3033 110.686 60 114 60Z"
              />
            </clipPath>
          </defs>
        </svg>
      </span>
    `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-spinner": Spinner;
  }
}

if (!customElements.get("ds-spinner")) {
  customElements.define("ds-spinner", Spinner);
}
if (!customElements.get("ssk-spinner")) {
  customElements.define("ssk-spinner", class extends Spinner {});
}
