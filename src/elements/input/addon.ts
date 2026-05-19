import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { BaseAttributes, ThemeValue } from "../../types/base-attributes";
import {
  ColorName,
  ColorRole,
  FontFamilyGroup,
  FontWeight,
  Size,
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";

/**
 * Sellsuki Input Addon — DS 3.0
 *
 * Single-row form field that pairs an `<ssk-input>` with a leading
 * and/or trailing addon — a fixed visual prefix or suffix (currency
 * code, unit label, helper icon button) outside the input border.
 * Renders the input's own `label` + `helperText` above and below.
 *
 * Reach for `<ssk-input-addon>` when you need a tightly bound annotation
 * (e.g. "https://" prefix, ".com" suffix, "฿" currency, kg unit). For a
 * trigger button + input combo (search submit) build it from
 * `<ssk-input>` + `<ssk-button>` inside `<ssk-input-addon>`'s slots.
 *
 * @example
 *   <ssk-input-addon label="ราคา">
 *     <span slot="prefix">฿</span>
 *     <span slot="postfix">บาท</span>
 *   </ssk-input-addon>
 *
 * @slot prefix  - Leading visual addon
 * @slot postfix - Trailing visual addon
 */
export class InputAddon
  extends LitElement
  implements ThemeValue, BaseAttributes
{
  static registeredName = "ssk-input-addon";

  /**
   * Active theme injected via Lit context. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  /**
   * Stable `data-testid` attribute for E2E test selectors.
   */
  @property({ type: String })
  testId?: string;

  // ThemeValue
  /**
   * Brand color used to tint the addon background.
   */
  @property({ type: String })
  themeColor?: ColorRole | ColorName;
  /**
   * Override for the addon text color. Defaults to `inherit` so the addon adopts the parent input's color.
   */
  @property({ type: String })
  color?: ColorRole | ColorName = "inherit";

  /**
   * Visual size — must match the parent `<ssk-input>`'s size to render flush. Defaults to `md`.
   */
  @property({ type: String })
  size: Size = "md";

  // font
  /**
   * Font family group used for the addon text. Defaults to `sans`.
   */
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  /**
   * Font weight for the addon text. Defaults to `normal`.
   */
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  /**
   * Explicit width override for the addon block. Auto-sized to slotted content when unset.
   */
  @property({ type: String })
  width?: string | undefined;

  // input specific
  /**
   * Reserved — prefer setting `label` on the parent `<ssk-input>` instead of the addon.
   */
  @property({ type: String })
  label: string | undefined;

  /**
   * Reserved — prefer setting `helperText` on the parent `<ssk-input>` instead of the addon.
   */
  @property({ type: String })
  helperText: string | undefined;

  /**
   * Form-field `name` — typically left unset; the parent `<ssk-input>` owns the submitted name.
   */
  @property({ type: String })
  name: string | undefined;

  /**
   * Native input type forwarded if the addon hosts its own field. Defaults to `text`.
   */
  @property({ type: String })
  type: "text" | "number" | "password" | "email" | "tel" | "url" = "text";

  /**
   * Bound value when the addon hosts its own input. Usually left unset.
   */
  @property({ type: String })
  value: string | undefined;

  /**
   * Placeholder text when the addon renders an inner input.
   */
  @property({ type: String })
  placeholder: string | undefined;

  /**
   * When set, the addon is rendered with disabled styling and ignores clicks.
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * When set, the element renders nothing — use for conditional show/hide.
   */
  @property({ type: Boolean })
  hidden = false;

  get hasPrefix(): boolean {
    return this.getAttribute("slot") === "prefix";
  }

  get hasPostfix(): boolean {
    return this.getAttribute("slot") === "postfix";
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.input, ":host")}

      <style>
        :host {
          --color: ${parseVariables(
            cssVar("colors", this.color),
            cssVar("colors", "text", 400),
            this.color,
          )};

          --background-color: ${parseVariables(
            cssVar("colors", this.themeColor, 500),
          )};
          --background-color-disabled: ${parseVariables(
            cssVar("colors", "text", 50),
          )};

          --font-family: ${parseVariables(
            cssVar("font-family", this.fontFamilyGroup),
          )};
          --font-weight: ${parseVariables(
            cssVar("font-weight", this.fontWeight),
          )};
          --font-size: ${parseVariables(cssVar("font-size", this.size))};
          --line-height: ${parseVariables(cssVar("font-size", this.size))};
          --rounded: ${parseVariables(cssVar("rounded", this.size))};
        }
      </style>

      <div
        class="addon ${this.hasPrefix ? "prefix" : ""} ${this.hasPostfix
          ? "postfix"
          : ""}"
      >
        <slot class="prefix-control"></slot>
      </div>
    `;
  }

  static styles = css`
    :host {
      height: 100%;
    }

    div.addon {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--background-color);
      color: var(--color);
      height: 100%;
      padding: 0 0.333em;
    }

    div.prefix {
      border-top-left-radius: var(--rounded);
      border-bottom-left-radius: var(--rounded);
    }

    div.postfix {
      border-top-right-radius: var(--rounded);
      border-bottom-right-radius: var(--rounded);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-input-addon": InputAddon;
  }
}

if (!customElements.get("ssk-input-addon")) {
  customElements.define("ssk-input-addon", InputAddon);
}
