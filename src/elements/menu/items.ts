import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { redispatchEvents } from "../../helpers/lit";
import { ThemeValue } from "../../types/base-attributes";
import {
  ColorName,
  ColorRole,
  FontFamilyGroup,
  FontWeight,
  MenuVariants,
  Size,
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";

/**
 * Sellsuki Menu Items — DS 3.0
 *
 * Single clickable row inside a `<ssk-menu-group>` / dropdown menu /
 * popover. Three variants (`solid`, `light`, `outline`) and standard
 * size tokens; emits `click` to its parent menu container.
 *
 * Reach for `<ssk-menu-items>` for action rows inside dropdown menus
 * (kebab menu, account menu, bulk-action picker). For sidebar nav rows
 * use `<ssk-sidebar-item>` (sidebar context awareness).
 *
 * @example
 *   <ssk-menu-group label="ออเดอร์">
 *     <ssk-menu-items>
 *       <ssk-icon slot="prefix" name="solid-pencil"></ssk-icon>
 *       แก้ไข
 *     </ssk-menu-items>
 *   </ssk-menu-group>
 *
 * @slot        - Label text
 * @slot prefix - Leading icon
 */
export class MenuItems extends LitElement implements ThemeValue {
  static registeredName = "ssk-menu-items";

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  /**
   * Stable `data-testid` attribute applied to the menu row for E2E test selectors.
   */
  @property({ type: String })
  testId?: string;

  // ThemeValue
  /**
   * Visual density of the menu row — `xs` / `sm` / `md` / `lg` / `xl`. Drives padding, font size, gap, and radius via design tokens. Defaults to `md`.
   */
  @property({ type: String })
  size: Size = "md";
  /**
   * Brand accent for hover and active backgrounds — falls back to `--fg-brand-primary` from `<ssk-app-shell-provider>` brand context. Pass an explicit `ColorRole` to override.
   */
  @property({ type: String })
  themeColor: string = "primary";
  /**
   * Override the outer margin around the row (any CSS shorthand).
   */
  @property({ type: String })
  margin?: string;
  /**
   * Override the row width (any CSS length). Leave unset to stretch to the parent menu.
   */
  @property({ type: String })
  width?: string | undefined;
  /**
   * Override the row height (any CSS length). Leave unset to fit content.
   */
  @property({ type: String })
  height?: string | undefined;
  /**
   * Override the gap between the prefix slot, label, and postfix slot (any CSS length).
   */
  @property({ type: String })
  gap?: string | undefined;
  /**
   * Override the corner radius (any CSS length). Defaults to the size-bound `--radius-*` token.
   */
  @property({ type: String })
  rounded?: string | undefined;
  /**
   * Optional override for the label text color (`ColorRole` or `ColorName`). Leave unset to inherit from the menu.
   */
  @property({ type: String })
  color?: ColorRole | ColorName;
  /**
   * Override the label font size (any CSS length). Stay above 18px (`--font-size-caption`) for the DS 3.0 minimum.
   */
  @property({ type: String })
  fontSize?: string | undefined;
  /**
   * Override the row padding (any CSS shorthand).
   */
  @property({ type: String })
  padding?: string;

  // font
  /**
   * Font family group — `sans` (default body face) or `mono` for fixed-width labels.
   */
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  /**
   * Font weight token for the row label — typically `normal` or `medium`.
   */
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  /**
   * Visual style — `solid` for filled active highlight, `light` for tinted, `outline` for bordered. Defaults to `solid`.
   */
  @property({ type: String })
  variant: MenuVariants = "solid";
  /**
   * When `true`, the row is omitted from the rendered tree entirely.
   */
  @property({ type: Boolean })
  hidden = false;
  /**
   * Label text shown for the row. Prefer slotting text content instead for richer markup; this prop is a convenience for simple labels.
   */
  @property({ type: String })
  label?: string | undefined;
  /**
   * Renders disabled — clicks are ignored and the row shows the `--bg-disabled` / `--text-disabled` palette.
   */
  @property({ type: Boolean })
  disabled = false;
  /**
   * When `true`, the row renders with the active highlight (selected state). The parent menu typically owns this state.
   */
  @property({ type: Boolean })
  active = false;
  /**
   * When `true`, renders only the prefix slot (compact icon-only row) — used inside collapsed sidebars or dense menu rails.
   */
  @property({ type: Boolean })
  min = false;

  render() {
    if (this.hidden) {
      return null;
    }
    let additionalCss = `
    --font-weight: ${parseVariables(cssVar("font-weight", this.fontWeight))};
    --font-size: ${parseVariables(
      cssVar("font-size", this.fontSize),
      cssVar("font-size", this.size)
    )};
    --padding: ${parseVariables(
      cssVar("padding", this.padding),
      cssVar("padding", this.size)
    )};
    --margin: ${parseVariables(cssVar("margin", this.margin))};
    --gap: ${parseVariables(
      cssVar("spacing", this.gap),
      cssVar("spacing", this.size)
    )};

    --rounded: ${parseVariables(
      cssVar("rounded", this.rounded),
      cssVar("rounded", this.size)
    )};

    --background-color: transparent;
    --background-color-hover: ${parseVariables(
      cssVar("colors", this.themeColor, 100)
    )};
    --background-color-disabled: ${parseVariables(
      cssVar("colors", "gray", 100)
    )};
    --color: var(--color);
    --color-hover: var(--color);
   
    --color-disabled: ${parseVariables(cssVar("colors", "gray", 400))};

    --border-color: ${parseVariables(cssVar("colors", this.themeColor, 500))};
    --border-color-disabled: var(--background-color-disabled);
    --border-width: 0px;
    `;

    switch (this.variant) {
      case "solid":
        additionalCss += `
        --background-color-active: ${parseVariables(
          cssVar("colors", this.themeColor, 600)
        )};
        --color-active:  ${parseVariables(
          cssVar("colors", this.color),
          cssVar("colors", this.color),
          this.color,
          cssVar("colors", "white", 200)
        )};
       `;
        break;

      case "outline":
        additionalCss += `
        --background-color-active: ${parseVariables(
          cssVar("colors", this.themeColor, 100)
        )};
        --color-active: ${parseVariables(
          cssVar("colors", this.themeColor, 600)
        )};
          `;
        break;
    }

    return html`
      ${parseThemeToCssVariables(
        this.theme?.components?.menu,
        ".menu-container"
      )}
      <style>
        .menu-container {
          ${additionalCss};
        }
      </style>

      <div
        class="menu-container ${this.active ? "active" : ""} ${this.disabled
          ? "disabled"
          : ""}
        "
        data-testid=${this.testId || nothing}
        @click=${(e: Event) => redispatchEvents(e, this)}
      >
        ${this.min
          ? html`<slot name="prefix"></slot>`
          : html`
              <div class="prefix">
                <slot name="prefix"></slot>
              </div>
              <slot></slot>
              <div class="postfix">
                <slot name="postfix"></slot>
              </div>
            `}
      </div>
    `;
  }

  static styles = css`
    .menu-container {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      background-color: var(--background-color);
      color: var(--color);
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
      padding: var(--padding);
      margin: var(--margin);
      gap: var(--gap);
      border-radius: var(--rounded);
      border-color: var(--border-color);
      border-width: var(--border-width);
    }

    .menu-container:hover {
      background-color: var(--background-color-hover);
      color: var(--color-hover);
    }

    .menu-container.active {
      background-color: var(--background-color-active);
      color: var(--color-active);
    }

    .menu-container.disabled {
      cursor: not-allowed;
      background-color: var(--background-color-disabled);
      color: var(--color-disabled);
      border-color: var(--border-color-disabled);
    }

    .menu-container .prefix,
    .menu-container .postfix,
    .menu-container slot {
      display: flex;
      align-items: center;
    }

    .menu-container slot {
      margin-right: auto;
    }

    .menu-container .prefix {
      width: auto;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-menu-items": MenuItems;
  }
}

if (!customElements.get("ssk-menu-items")) {
  customElements.define("ssk-menu-items", MenuItems);
}
