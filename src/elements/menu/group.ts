import { consume } from "@lit/context";
import { LitElement, TemplateResult, css, html, nothing, svg } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { redispatchEvents } from "../../helpers/lit";
import { ThemeValue } from "../../types/base-attributes";
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
 * Sellsuki Menu Group — DS 3.0
 *
 * Wrapper around a list of `<ssk-menu-items>` rows that adds a section
 * heading and a uniform gap between entries. Use inside a dropdown menu,
 * popover, or `<ssk-drawer>` body to organize related actions under a
 * shared label.
 *
 * Must contain `<ssk-menu-items>` children. For navigation-style nav
 * groups use `<ssk-sidebar-group>` (sidebar-aware behavior with
 * collapse / icon-only mini mode).
 *
 * @example
 *   <ssk-menu-group label="การจัดการ">
 *     <ssk-menu-items>แก้ไข</ssk-menu-items>
 *     <ssk-menu-items>ลบ</ssk-menu-items>
 *   </ssk-menu-group>
 *
 * @slot - `<ssk-menu-items>` children
 */
export class MenuGroup extends LitElement implements ThemeValue {
  static registeredName = "ssk-menu-group";

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  /**
   * Stable `data-testid` attribute applied to the group header for E2E test selectors.
   */
  @property({ type: String })
  testId?: string;

  // ThemeValue
  /**
   * Visual density of the group header — `xs` / `sm` / `md` / `lg` / `xl`. Drives padding, font size, gap, and radius via design tokens. Defaults to `md`.
   */
  @property({ type: String })
  size: Size = "md";
  /**
   * Brand accent for the group header border — falls back to `--fg-brand-primary` from `<ssk-app-shell-provider>` brand context. Pass an explicit `ColorRole` to override.
   */
  @property({ type: String })
  themeColor: string = "primary";
  /**
   * Override the outer margin around the group (any CSS shorthand).
   */
  @property({ type: String })
  margin?: string;
  /**
   * Override the group width (any CSS length). Leave unset to stretch to the parent.
   */
  @property({ type: String })
  width?: string | undefined;
  /**
   * Override the group height (any CSS length). Leave unset to fit content.
   */
  @property({ type: String })
  height?: string | undefined;
  /**
   * Override the gap between the header label and the chevron icon (any CSS length).
   */
  @property({ type: String })
  gap?: string | undefined;
  /**
   * Override the corner radius for the header (any CSS length). Defaults to the size-bound `--radius-*` token.
   */
  @property({ type: String })
  rounded?: string | undefined;
  /**
   * Optional override for the header text color (`ColorRole` or `ColorName`). Leave unset to use `--text-primary`.
   */
  @property({ type: String })
  color?: ColorRole | ColorName;
  /**
   * Override the header font size (any CSS length). Stay above 18px (`--font-size-caption`) for the DS 3.0 minimum.
   */
  @property({ type: String })
  fontSize?: string | undefined;
  /**
   * Override the header padding (any CSS shorthand).
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
   * Font weight token for the header label — typically `normal` or `medium`.
   */
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  /**
   * When `true`, the group is omitted from the rendered tree entirely.
   */
  @property({ type: Boolean })
  hidden = false;
  /**
   * Heading text shown for the group. Use a short noun phrase (e.g. "การจัดการ", "บัญชี").
   */
  @property({ type: String })
  header?: string | undefined;
  /**
   * When `true`, slotted `<ssk-menu-items>` children are visible; when `false`, only the header chevron shows. Clicking the header toggles this state.
   */
  @property({ type: Boolean })
  isOpen = false;
  /**
   * When `true`, hides the group header entirely and renders slotted children inline — used inside compact dropdowns or icon-only contexts.
   */
  @property({ type: Boolean })
  min = false;
  /**
   * When `true`, suppresses the chevron icon on the header — useful for groups that should always stay open.
   */
  @property({ type: Boolean })
  hiddenIcon = false;

  private svgs: Record<string, TemplateResult> = {
    "solid-chevron-up": svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clip-rule="evenodd"/>
    </svg>
  `,
    "solid-chevron-down": svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd"/>
    </svg>
  `,
  };

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
      cssVar("padding", this.size)
    )};

    --rounded: ${parseVariables(
      cssVar("rounded", this.rounded),
      cssVar("rounded", this.size)
    )};

    --background-color: transparent;
    --color: ${parseVariables(cssVar("colors", this.color))};
    --border-color: ${parseVariables(cssVar("colors", this.themeColor, 500))};
    --border-width: 0px;
    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.menu, ".menu-header")}
      <style>
        .menu-header {
          ${additionalCss};
        }
      </style>

      ${this.min
        ? html`<slot></slot>`
        : html`
            <div
              class="menu-header"
              @click=${(e: Event) => {
                this.isOpen = !this.isOpen;
                redispatchEvents(e, this);
              }}
            >
              <div class="header-content">${this.header}</div>
              ${!this.hiddenIcon
                ? this.isOpen
                  ? this.svgs["solid-chevron-up"]
                  : this.svgs["solid-chevron-down"]
                : nothing}
            </div>
            ${this.isOpen ? html` <slot></slot> ` : nothing}
          `}
    `;
  }

  static styles = css`
    .menu-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
      background-color: var(--background-color);
      color: var(--color);
      cursor: pointer;
      padding: var(--padding);
      margin: var(--margin);
      gap: var(--gap);
      border-radius: var(--rounded);
      border-color: var(--border-color);
      border-width: var(--border-width);
      padding-bottom: 0;
    }

    .header-content {
      flex: 1;
    }

    svg {
      height: 1em;
      width: 1em;
      margin-right: auto;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-menu-group": MenuGroup;
  }
}

if (!customElements.get("ssk-menu-group")) {
  customElements.define("ssk-menu-group", MenuGroup);
}
