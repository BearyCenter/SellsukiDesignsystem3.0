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

/**
 * Sellsuki Download File — DS 3.0
 *
 * File-row UI for in-progress / completed downloads: a label area with
 * leading and trailing icon slots, a close button, and a footer slot
 * typically used for a `<ssk-progress-bar>` while bytes transfer.
 *
 * Reach for this when you need a uniform download card inside a list,
 * drawer, or upload widget. For free-form file metadata use `<ssk-card>`;
 * for just the progress visual use `<ssk-progress-bar>` directly.
 *
 * @example
 *   <ssk-download-file size="md">
 *     <ssk-icon slot="icon-slot-prefix" name="outline-document"></ssk-icon>
 *     <span slot="label-name">report-2026-05.pdf</span>
 *     <ssk-progress-bar slot="footer" value="72"></ssk-progress-bar>
 *   </ssk-download-file>
 *
 * @slot label-name         - File name text
 * @slot icon-slot-prefix   - Leading file-type icon
 * @slot icon-slot-postfix  - Trailing action icon (download / pause)
 * @slot footer             - Progress bar or status row below the label
 */
export class DownloadFile extends LitElement {
  static registeredName = "ssk-download-file";

  /**
   * Active theme injected via Lit context by `<ssk-theme-provider>`. Resolves
   * the brand token set (sellsuki / patona / oc2plus) — do not set manually.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  /**
   * Brand colour role applied to label and accent areas. Defaults to empty —
   * falls back to neutral gray, or to the brand context when set.
   */
  @property({ type: String })
  themeColor: ColorRole | ColorName = "";
  /**
   * Optional foreground colour role override for the file label. Leave unset
   * to inherit `themeColor`.
   */
  @property({ type: String })
  color?: ColorRole | ColorName;

  /**
   * Row size preset — `sm`, `md`, `lg`. Drives icon size and internal padding.
   * Defaults to `md`.
   */
  // ThemeValue
  @property({ type: String })
  size: Size = "md";
  /**
   * Margin token override (any CSS length). Defaults to `auto` so the row
   * centers inside narrow containers.
   */
  @property({ type: String })
  margin?: string;
  /**
   * Padding size token override that maps to the internal container padding.
   * Leave unset to use the `size`-derived default.
   */
  @property({ type: String })
  padding?: Size;
  /**
   * Border-radius token override (e.g. `sm`, `md`, `lg`). Defaults to `8px`.
   */
  @property({ type: String })
  rounded?: string | undefined;
  /**
   * Explicit width for the file row (any CSS length). Defaults to `100%` so
   * the row fills its parent container.
   */
  @property({ type: String })
  width?: string = "100%";

  /**
   * Font-family group token used for the file name label. Defaults to `sans`;
   * switch to `serif` or `display` for branded contexts.
   */
  // Font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  /**
   * Optional font-size override (any CSS length) for the label slot. Leave
   * unset to use the size-derived default (`--font-size-p`, 20px).
   */
  @property({ type: String })
  fontSize?: string | undefined;

  /**
   * Hide the file row from layout (returns `nothing`). Cheaper than
   * unmounting when toggling visibility frequently.
   */
  // attributes
  @property({ type: Boolean })
  hidden = false;

  /**
   * Fallback file name string used when the `label-name` slot is empty.
   * Defaults to `"File Name"` — override per row in production.
   */
  @property({ type: String })
  label?: string = "File Name";
  /**
   * Hide the trailing close (x-mark) button. Use when the row represents a
   * completed download with no cancel/dismiss affordance.
   */
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
      background-color: var(--bg-primary, #ffffff);
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

if (!customElements.get("ssk-download-file")) {
  customElements.define("ssk-download-file", DownloadFile);
}
