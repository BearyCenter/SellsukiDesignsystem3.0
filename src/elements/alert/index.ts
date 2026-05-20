import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { eventOptions, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { redispatchEvents } from "../../helpers/lit";
import { ThemeValue } from "../../types/base-attributes";

import {
  FontFamilyGroup,
  Size,
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";

export type Type = "default" | "info" | "error" | "warning" | "success";
/**
 * Sellsuki Alert — DS 3.0
 *
 * Persistent inline status banner with a status icon, optional `topic`
 * title + `message` body, and a dismiss button. Five tones —
 * `default`, `info`, `success`, `warning`, `error` — each mapping to the
 * semantic background + foreground tokens.
 *
 * Reach for `<ssk-alert>` for in-page status messages that the user
 * should see while interacting with surrounding content (validation
 * summary, configuration warning, success confirmation that should stay
 * until next action). For transient feedback use `<ssk-toast>`; for
 * blocking confirmation use `<ssk-modal>`.
 *
 * @example
 *   <ssk-alert
 *     type="warning"
 *     topic="ข้อมูลไม่ครบ"
 *     message="กรุณากรอกที่อยู่จัดส่งก่อนดำเนินการต่อ"
 *   ></ssk-alert>
 */
export class Alert extends LitElement implements ThemeValue {
  static registeredName = "ssk-alert";
  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Tints
   * the alert surface and border to the active brand palette.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // ThemeValue
  /**
   * Padding / typography scale — accepts `xs` / `sm` / `md` / `lg` / `xl`.
   * Defaults to `md`; bump to `lg` for hero / empty-state banners.
   */
  @property({ type: String })
  size: Size = "md";
  /**
   * Outer margin around the alert as any CSS length (e.g. `"16px"`,
   * `"0 0 24px"`). Defaults to `auto`; usually let the parent layout
   * control spacing instead.
   */
  @property({ type: String })
  margin?: string;
  /**
   * Inner padding override on the `size` token scale. Leave unset to derive
   * padding from `size`; set explicitly for dense / spacious variants.
   */
  @property({ type: String })
  padding?: Size;
  /**
   * Corner radius as any CSS length (e.g. `"8px"`, `"var(--radius-md)"`).
   * Defaults to `8px` — pair with `0` for full-bleed page banners.
   */
  @property({ type: String })
  rounded?: string | undefined;
  /**
   * Alert width as any CSS length (e.g. `"100%"`, `"480px"`). Defaults to
   * `auto` (shrink-to-fit); set `"100%"` for inline form-level banners.
   */
  @property({ type: String })
  width?: string = "auto";

  // Font
  /**
   * Font family group — `sans` (default) or `serif`. Inherits brand font
   * stack from the active theme.
   */
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  /**
   * Override the computed font size with any CSS length (must stay ≥ 18px per
   * DS 3.0 minimum). Leave unset to derive font size from `size`.
   */
  @property({ type: String })
  fontSize?: string | undefined;

  // Alert attributes
  /**
   * When `true` the alert renders nothing — used to hide it after the
   * user dismisses via the close button or once the condition resolves.
   */
  @property({ type: Boolean })
  hidden = false;
  /**
   * Tone of the alert — `default`, `info`, `success`, `warning`, `error`.
   * Drives the border, background tint, and (slot-provided) icon color.
   */
  @property({ type: String })
  type: Type = "default";
  /**
   * Body message rendered under the topic. One or two short sentences;
   * for richer markup put content into the default slot instead.
   */
  @property({ type: String })
  message?: string | undefined;
  /**
   * Bold leading title on the alert (e.g. "ข้อมูลไม่ครบ"). Omit for a
   * single-line message-only banner.
   */
  @property({ type: String })
  topic?: string | undefined;
  /**
   * Hides the trailing `X` close affordance. Enable when the alert state is
   * derived purely from validation/system status and shouldn't be dismissed
   * by the user.
   */
  @property({ type: Boolean })
  hideCloseButton = false;

  @eventOptions({ capture: false, once: false, passive: true })
  private close(e: Event) {
    redispatchEvents(e, this, "close");
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = `
    --margin: ${parseVariables(cssVar("margin", this.margin), "auto")};
    --padding: ${parseVariables(cssVar("padding", this.padding), "0.75em")};
    --border-color: ${parseVariables(
      cssVar("border-color", this.type, 500),
      cssVar("border-color", "gray", 200)
    )};
    --width: ${parseVariables(cssVar("width", this.width), "auto")};
    --rounded: ${parseVariables(cssVar("rounded", this.rounded), "8px")};
    --background-color: ${parseVariables(
      cssVar("border-color", this.type, 50),
      "#fff"
    )};
    --color: ${parseVariables(cssVar("colors", "gray", 500))};
    --font-family: ${parseVariables(
      cssVar("font-family", this.fontFamilyGroup)
    )};
    --font-size: ${parseVariables(
      cssVar("font-size", this.fontSize),
      cssVar("font-size", this.size)
    )};
    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.alert, ":host")}
      <style>
        div {${additionalCss}}
      </style>

      <div class="container">
        <div class="icon">
          <slot name="icon-slot"></slot>
        </div>
        <div class="alert-content">
          <div class="detail">
            <div class="alert-title">${this.topic}</div>
            <div class="alert-message">${this.message}</div>
          </div>
        </div>
        <div
          class="close${this.hideCloseButton ? "-hide" : ""}"
          @click=${this.close}
        ></div>
        <div class="alert-footer">
          <slot name="close-button-slot"></slot>
          <slot name="ok-button-slot"></slot>
        </div>
      </div>
    `;
  }

  static styles = css`
    .detail {
      margin-left: 0.75rem;

      .alert-title,
      .alert-message {
        font-family: var(--font-family);
        font-size: var(--font-size);
      }

      .alert-message {
        color: var(--color);
      }

      .alert-title {
        font-weight: var(--font-weight-medium, 500);
      }
    }

    .close {
      cursor: pointer;
      padding-right: 0.75em;
      grid-column: 3;
      grid-row: 1;
    }
    .close:before,
    .close:after {
      content: "";
      position: absolute;
      height: 0.967em;
      width: 0.1em;
      background-color: var(--color);
    }
    .close:before {
      transform: rotate(45deg);
    }
    .close:after {
      transform: rotate(-45deg);
    }

    .close-hide {
      display: none;
    }

    .alert-footer {
      display: flex;
      grid-column: 2;
      grid-row: 3;
    }

    .container {
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-template-rows: repeat(3, auto);
      gap: 0.5em;
      width: var(--width);
      height: auto;
      margin: var(--margin);
      padding: var(--padding);
      border: 1px solid var(--border-color);
      border-radius: var(--rounded);
      background-color: var(--background-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-alert": Alert;
  }
}

if (!customElements.get("ssk-alert")) {
  customElements.define("ssk-alert", Alert);
}
