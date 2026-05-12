import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import {
  ButtonVariants,
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
 * Semantic tone of the button — communicates intent rather than color.
 * - `brand`   (default) — primary action
 * - `danger`            — destructive action (replaces legacy `error`)
 * - `success` / `warning` / `info` — informational tones
 *   (button-specific tokens pending UXUI spec — see DES-2013;
 *    current values fall back to generic `--bg-{tone}-solid`)
 */
export type ButtonTone = "brand" | "danger" | "success" | "warning" | "info";

const DEPRECATED_PROPS_WARNED = new WeakSet<Button>();
const LEGACY_THEME_COLOR_TO_TONE: Record<string, ButtonTone> = {
  primary: "brand",
  error: "danger",
  danger: "danger",
  success: "success",
  warning: "warning",
  info: "info",
};

/**
 * Sellsuki Button — DS 3.0
 *
 * @example
 *   <ssk-button variant="solid" tone="brand">Save</ssk-button>
 *   <ssk-button variant="outline" tone="danger">Delete</ssk-button>
 *   <ssk-button variant="ghost" tone="brand" disabled>Loading…</ssk-button>
 *
 * @slot          - Default slot for label
 * @slot prefix   - Prefix icon
 * @slot postfix  - Postfix icon
 * @csspart button - The button element
 */
export class Button extends LitElement {
  static registeredName = "ssk-button";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String }) testId?: string;

  // ── Primary API (DS 3.0) ───────────────────────────────────────────────────
  /** Visual variant of the button. */
  @property({ type: String, reflect: true })
  variant: ButtonVariants = "solid";

  /** Semantic tone of the button. */
  @property({ type: String, reflect: true })
  tone: ButtonTone = "brand";

  /** Size of the button. */
  @property({ type: String })
  size: Size = "md";

  // ── Layout (legitimate API — sizing/spacing only) ──────────────────────────
  @property({ type: String }) padding?: Size;
  @property({ type: String }) gap?: string;
  @property({ type: String }) rounded?: string;
  @property({ type: String }) margin?: string;
  @property({ type: String }) width?: string;
  @property({ type: String }) height?: string;
  @property({ type: String }) minWidth?: string;
  @property({ type: String }) minHeight?: string;
  @property({ type: String }) maxWidth?: string;
  @property({ type: String }) maxHeight?: string;

  // ── Font (token-bound — keep) ──────────────────────────────────────────────
  @property({ type: String }) fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String }) fontWeight: FontWeight = "normal";

  // ── State ──────────────────────────────────────────────────────────────────
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) hidden = false;

  // ── Deprecated escape-hatch props (Stage 1 soft deprecation) ───────────────
  // Removed in DS 3.4.0. Use `tone` + `variant` instead. See DES-2011.

  /** @deprecated Use `tone="..."` instead. Will be removed in DS 3.4.0. */
  @property({ type: String })
  themeColor?: ColorRole | ColorName;

  /** @deprecated Use `tone="..."` for color theming. Will be removed in DS 3.4.0. */
  @property({ type: String })
  color?: ColorRole | ColorName;

  /** @deprecated Use `tone="..."` instead. Bypasses brand-switching. Will be removed in DS 3.4.0. */
  @property({ type: String })
  backgroundColor?: string;

  /** @deprecated Use `variant="outline"` + `tone="..."`. Will be removed in DS 3.4.0. */
  @property({ type: String })
  borderColor?: string;

  /** @deprecated Use `size="..."` (token-bound). Below 18px violates DS 3.0 minimum. Will be removed in DS 3.4.0. */
  @property({ type: String })
  fontSize?: string;

  /** @deprecated Bound to `size`. Will be removed in DS 3.4.0. */
  @property({ type: String })
  lineHeight?: string;

  /** @deprecated Bound to `variant`. Will be removed in DS 3.4.0. */
  @property({ type: String })
  borderWidth?: string;

  /** @deprecated Use elevation tokens via `theme.components.button`. Will be removed in DS 3.4.0. */
  @property({ type: String })
  boxShadow?: string;

  /** @deprecated Use elevation tokens. Will be removed in DS 3.4.0. */
  @property({ type: String })
  dropShadow?: string;

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  protected willUpdate(changed: Map<string, unknown>): void {
    super.willUpdate(changed);
    // Bridge legacy `themeColor` → `tone` (only when tone unchanged from default)
    if (this.themeColor && this.tone === "brand") {
      const mapped = LEGACY_THEME_COLOR_TO_TONE[this.themeColor as string];
      if (mapped) this.tone = mapped;
    }
  }

  protected updated(changed: Map<string, unknown>): void {
    super.updated(changed);
    this._warnDeprecated();
  }

  private _warnDeprecated(): void {
    if (DEPRECATED_PROPS_WARNED.has(this)) return;
    const used: string[] = [];
    if (this.backgroundColor !== undefined) used.push("backgroundColor");
    if (this.borderColor !== undefined) used.push("borderColor");
    if (this.fontSize !== undefined) used.push("fontSize");
    if (this.lineHeight !== undefined) used.push("lineHeight");
    if (this.borderWidth !== undefined) used.push("borderWidth");
    if (this.boxShadow !== undefined) used.push("boxShadow");
    if (this.dropShadow !== undefined) used.push("dropShadow");
    if (this.color !== undefined) used.push("color");
    if (this.themeColor !== undefined) used.push("themeColor");
    if (used.length === 0) return;
    DEPRECATED_PROPS_WARNED.add(this);
    // eslint-disable-next-line no-console
    console.warn(
      `[ssk-button] Deprecated prop(s) used: ${used.join(", ")}. ` +
        `Use \`variant\` + \`tone\` instead — e.g. tone="danger" replaces themeColor="error". ` +
        `These props will be removed in DS 3.4.0. See Jira DES-2011.`,
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  render() {
    if (this.hidden) return nothing;

    // Layout-only sizing — colors come from CSS attribute selectors below
    const sizingCss = `
      --width: ${parseVariables(cssVar("width", this.width))};
      --font-family: ${parseVariables(cssVar("font-family", this.fontFamilyGroup))};
      --font-weight: ${parseVariables(cssVar("font-weight", this.fontWeight))};
      --font-size: ${parseVariables(
        cssVar("font-size", this.fontSize),
        cssVar("font-size", this.size),
        "--font-size-button",
      )};
      --line-height: ${parseVariables(
        cssVar("line-height", this.lineHeight),
        cssVar("font-size", this.size),
      )};
      --gap: ${parseVariables(
        cssVar("spacing", this.gap),
        cssVar("spacing", this.size),
      )};
      --padding: ${parseVariables(
        cssVar("padding", this.padding),
        cssVar("padding", this.size),
      )};
      --margin: ${parseVariables(
        cssVar("margin", this.margin),
        cssVar("margin", this.size),
      )};
      --rounded: ${parseVariables(
        cssVar("rounded", this.rounded),
        cssVar("rounded", this.size),
      )};
    `;

    // Backward-compat overrides for deprecated props (warned via _warnDeprecated)
    let legacyOverrides = "";
    if (this.backgroundColor) legacyOverrides += `--_btn-bg:${this.backgroundColor};`;
    if (this.borderColor) legacyOverrides += `--_btn-border:${this.borderColor};`;
    if (this.borderWidth) legacyOverrides += `--_btn-border-width:${this.borderWidth};`;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.button, "button")}
      <style>
        button {
          ${sizingCss}
          ${legacyOverrides}
        }
      </style>
      <button
        part="button"
        data-testid=${this.testId || nothing}
        .disabled=${this.disabled}
      >
        <div>
          <slot name="prefix"></slot>
          <slot></slot>
          <slot name="postfix"></slot>
        </div>
      </button>
    `;
  }

  // ── Styles (Option C: composable variant × tone via attribute selectors) ───

  static styles = css`
    /* ── Default: variant="solid" tone="brand" ────────────────────────────── */
    :host {
      display: inline-block;
      --_btn-bg:              var(--button-solid-bg);
      --_btn-bg-hover:        var(--button-solid-bg-hover);
      --_btn-bg-disabled:     var(--button-solid-bg-disable, var(--bg-disabled));
      --_btn-fg:              var(--button-solid-fg);
      --_btn-fg-hover:        var(--button-solid-fg-hover);
      --_btn-fg-disabled:     var(--text-disabled);
      --_btn-border:          var(--button-solid-border);
      --_btn-border-hover:    var(--button-solid-border-hover);
      --_btn-border-disabled: transparent;
      --_btn-border-width:    0px;
      --_btn-opacity-disabled: 0.5;
      --_btn-outline:         var(--bg-brand-solid);
      --_btn-outline-width:   4px;
    }

    /* ── Variant: outline ────────────────────────────────────────────────── */
    :host([variant="outline"]) {
      --_btn-bg:              transparent;
      --_btn-bg-hover:        var(--bg-brand-primary);
      --_btn-bg-disabled:     transparent;
      --_btn-fg:              var(--button-outline-fg);
      --_btn-fg-hover:        var(--button-outline-fg-hover);
      --_btn-border:          var(--button-outline-border);
      --_btn-border-hover:    var(--button-outline-border-hover);
      --_btn-border-disabled: var(--stroke-disabled);
      --_btn-border-width:    1px;
      --_btn-opacity-disabled: 1;
    }

    /* ── Variant: ghost ──────────────────────────────────────────────────── */
    :host([variant="ghost"]) {
      --_btn-bg:              transparent;
      --_btn-bg-hover:        var(--bg-brand-primary);
      --_btn-bg-disabled:     transparent;
      --_btn-fg:              var(--button-ghost-fg);
      --_btn-fg-hover:        var(--button-ghost-fg-hover);
      --_btn-border:          transparent;
      --_btn-border-hover:    transparent;
      --_btn-border-disabled: transparent;
      --_btn-border-width:    0px;
      --_btn-opacity-disabled: 1;
    }

    /* ── Variant: solid-light ────────────────────────────────────────────── */
    :host([variant="solid-light"]) {
      --_btn-bg:              var(--button-solid-light-bg);
      --_btn-bg-hover:        var(--button-solid-light-bg-hover);
      --_btn-bg-disabled:     var(--bg-disabled);
      --_btn-fg:              var(--button-solid-light-fg);
      --_btn-fg-hover:        var(--button-solid-light-fg-hover);
      --_btn-border:          var(--button-solid-light-border);
      --_btn-border-hover:    var(--button-solid-light-border-hover);
      --_btn-border-disabled: var(--stroke-disabled);
      --_btn-border-width:    1px;
      --_btn-opacity-disabled: 1;
    }

    /* ── Tone: danger × variants (full Figma spec) ───────────────────────── */
    :host([tone="danger"]) {
      --_btn-outline: var(--bg-danger-solid);
    }
    :host([tone="danger"][variant="solid"]) {
      --_btn-bg:              var(--button-solid-danger-bg);
      --_btn-bg-hover:        var(--button-solid-danger-bg-hover);
      --_btn-bg-disabled:     var(--button-solid-danger-bg-disable);
      --_btn-fg:              var(--button-solid-danger-fg);
      --_btn-fg-hover:        var(--button-solid-danger-fg-hover);
      --_btn-border:          var(--button-solid-danger-border);
      --_btn-border-hover:    var(--button-solid-danger-border-hover);
    }
    :host([tone="danger"][variant="outline"]) {
      --_btn-bg-hover:        var(--bg-danger-primary);
      --_btn-fg:              var(--button-outline-danger-fg);
      --_btn-fg-hover:        var(--button-outline-danger-fg-hover);
      --_btn-border:          var(--button-outline-danger-border);
      --_btn-border-hover:    var(--button-outline-danger-border-hover);
    }
    :host([tone="danger"][variant="ghost"]) {
      --_btn-bg-hover:        var(--bg-danger-primary);
      --_btn-fg:              var(--button-ghost-danger-fg);
      --_btn-fg-hover:        var(--button-ghost-danger-fg-hover);
    }
    :host([tone="danger"][variant="solid-light"]) {
      --_btn-bg:              var(--button-solid-light-danger-bg);
      --_btn-bg-hover:        var(--button-solid-light-danger-bg-hover);
      --_btn-fg:              var(--button-solid-light-danger-fg);
      --_btn-fg-hover:        var(--button-solid-light-danger-fg-hover);
      --_btn-border:          var(--button-solid-light-danger-border);
      --_btn-border-hover:    var(--button-solid-light-danger-border-hover);
    }

    /* ── Tone: success/warning/info — fallback to generic semantic ───────── */
    /* Pending UXUI button-specific spec — see DES-2013 */
    :host([tone="success"][variant="solid"]) {
      --_btn-bg:              var(--bg-success-solid);
      --_btn-bg-hover:        var(--bg-success-solid-hover);
      --_btn-fg:              var(--fg-white);
      --_btn-fg-hover:        var(--fg-white);
      --_btn-border:          var(--bg-success-solid);
      --_btn-border-hover:    var(--bg-success-solid-hover);
      --_btn-outline:         var(--bg-success-solid);
    }
    :host([tone="warning"][variant="solid"]) {
      --_btn-bg:              var(--bg-warning-solid);
      --_btn-bg-hover:        var(--bg-warning-solid-hover);
      --_btn-fg:              var(--fg-white);
      --_btn-fg-hover:        var(--fg-white);
      --_btn-border:          var(--bg-warning-solid);
      --_btn-border-hover:    var(--bg-warning-solid-hover);
      --_btn-outline:         var(--bg-warning-solid);
    }
    :host([tone="info"][variant="solid"]) {
      --_btn-bg:              var(--bg-info-solid);
      --_btn-bg-hover:        var(--bg-info-solid-hover);
      --_btn-fg:              var(--fg-white);
      --_btn-fg-hover:        var(--fg-white);
      --_btn-border:          var(--bg-info-solid);
      --_btn-border-hover:    var(--bg-info-solid-hover);
      --_btn-outline:         var(--bg-info-solid);
    }

    :host([tone="success"][variant="outline"]) {
      --_btn-bg-hover:        var(--bg-success-primary);
      --_btn-fg:              var(--fg-success-primary);
      --_btn-fg-hover:        var(--fg-success-primary);
      --_btn-border:          var(--stroke-success-solid);
      --_btn-border-hover:    var(--stroke-success-solid);
    }
    :host([tone="warning"][variant="outline"]) {
      --_btn-bg-hover:        var(--bg-warning-primary);
      --_btn-fg:              var(--fg-warning-primary);
      --_btn-fg-hover:        var(--fg-warning-primary);
      --_btn-border:          var(--stroke-warning-solid);
      --_btn-border-hover:    var(--stroke-warning-solid);
    }
    :host([tone="info"][variant="outline"]) {
      --_btn-bg-hover:        var(--bg-info-primary);
      --_btn-fg:              var(--text-info);
      --_btn-fg-hover:        var(--text-info);
      --_btn-border:          var(--stroke-info-solid);
      --_btn-border-hover:    var(--stroke-info-solid);
    }

    :host([tone="success"][variant="ghost"]) {
      --_btn-bg-hover:        var(--bg-success-primary);
      --_btn-fg:              var(--fg-success-primary);
      --_btn-fg-hover:        var(--fg-success-primary);
    }
    :host([tone="warning"][variant="ghost"]) {
      --_btn-bg-hover:        var(--bg-warning-primary);
      --_btn-fg:              var(--fg-warning-primary);
      --_btn-fg-hover:        var(--fg-warning-primary);
    }
    :host([tone="info"][variant="ghost"]) {
      --_btn-bg-hover:        var(--bg-info-primary);
      --_btn-fg:              var(--text-info);
      --_btn-fg-hover:        var(--text-info);
    }

    /* ── Element styles ──────────────────────────────────────────────────── */
    button {
      display: inline-block;
      box-sizing: border-box;
      border-style: solid;
      cursor: pointer;
      transition:
        background-color 0.2s ease-in-out,
        color 0.2s ease-in-out,
        border-color 0.2s ease-in-out;
      background-color: var(--_btn-bg);
      color: var(--_btn-fg);
      font-family: var(--font-family);
      font-size: var(--font-size);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
      padding: var(--padding);
      margin: var(--margin);
      border-radius: var(--rounded);
      border-color: var(--_btn-border);
      border-width: var(--_btn-border-width);
      width: var(--width);
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--gap);
    }

    ::slotted([slot="prefix"]) {
      display: flex;
      align-items: center;
      order: 0;
    }

    ::slotted([slot="postfix"]) {
      display: flex;
      align-items: center;
      order: 2;
    }

    ::slotted(:not([slot])) {
      order: 1;
      flex-grow: 1;
      text-align: center;
    }

    button:hover:enabled {
      background-color: var(--_btn-bg-hover);
      color: var(--_btn-fg-hover);
      border-color: var(--_btn-border-hover);
    }

    button:active:enabled {
      background-color: var(--_btn-bg-hover);
      color: var(--_btn-fg-hover);
      outline-width: var(--_btn-outline-width);
      outline-color: color-mix(in srgb, var(--_btn-outline), transparent 50%);
      outline-style: solid;
    }

    button:disabled {
      cursor: not-allowed;
      background-color: var(--_btn-bg-disabled);
      color: var(--_btn-fg-disabled);
      border-color: var(--_btn-border-disabled);
      opacity: var(--_btn-opacity-disabled);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-button": Button;
  }
}

if (!customElements.get("ssk-button")) {
  customElements.define("ssk-button", Button);
}
