import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { redispatchEvents } from "../../helpers/lit";
import {
  ColorName,
  ColorRole,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
  Size,
  Theme,
  FontFamilyGroup
} from "../../types/theme";

export class DownloadFile extends LitElement {
  static registeredName = "ssk-download-file";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String })
  themeColor: ColorRole | ColorName = "";
  @property({ type: String })
  color?: ColorRole | ColorName;

  // ThemeValue
  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  margin?: string;
  @property({ type: String })
  padding?: Size;
  @property({ type: String })
  rounded?: string | undefined;
  @property({ type: String })
  width?: string = "100%";

  // Font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontSize?: string | undefined;

  // attributes
  @property({ type: Boolean })
  hidden = false;

  @property({ type: String })
  label?: string = "File Name";
  @property({ type: Boolean })
  hideCloseButton = false;

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = `
    --margin: ${parseVariables(cssVar("margin", this.margin), "auto")};
    --border-color: ${parseVariables(cssVar("border-color", "gray", 200))};
    --width: ${parseVariables(cssVar("width", this.width), "100%")};
    --rounded: ${parseVariables(cssVar("rounded", this.rounded), "8px")};
    --color: ${parseVariables(cssVar("colors", "gray", 500))};
    --font-family: ${parseVariables(
      cssVar("font-family", this.fontFamilyGroup)
    )};
    --font-size: ${parseVariables(cssVar("font-size", this.size))};
    `;

    const iconSize = this.size === "lg" ? "md" : this.size === "md" ? "xs" : this.size;
    const containerPadding = this.size === "lg" ? "16px" : this.size === "md" ? "8px" : "8px";
    const downloadBar = this.size === "lg" ? "16px" : this.size === "md" ? "8px" : "8px";

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.downloadFile, ":host")}
      <style>
        div {${additionalCss}}
      </style>
      <div class="container-bar" style="padding: ${containerPadding};">
        <div class="bar-top">
          <div class="bar-top-item">
            <slot name="icon-slot-prefix"></slot>
            <div class="lable-style">
              <slot name="label-name"></slot>
            </div>
          </div>
          <div class="bar-top-item-right">
              <slot name="icon-slot-postfix"></slot>
              <ssk-icon
                class="close-button${this.hideCloseButton ? "-hide" : ""}"
                ?hidden=${this.hideCloseButton}
                name="solid-x-mark"
                size=${iconSize}
                color="gray.500"
                style= "cursor:pointer"
                @click=${(e: Event) => redispatchEvents(e, this)}
              ></ssk-icon>
          </div>
        </div>
        <div style="padding-top: ${downloadBar};">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  static styles = css`
    .container-bar {
      width: 418px;
      background-color: #ffffff;
      border: 1px solid var(--border-color);
      border-radius: var(--rounded)
    }
    .bar-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .bar-top-item {
      display: flex;
      align-items: center;
    }
    .bar-top-item-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .lable-style {
      padding: 0 16px 0;
      font-size: var(--font-size-p,20px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 310px;
      display: block;
    }
    .close-button-hide {
      display: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-download-file": DownloadFile;
  }
}

if (!customElements.get("ds-download-file")) {
  customElements.define("ds-download-file", DownloadFile);
}
if (!customElements.get("ssk-download-file")) {
  customElements.define("ssk-download-file", class extends DownloadFile {});
}
