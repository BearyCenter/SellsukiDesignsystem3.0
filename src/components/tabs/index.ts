import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { consume } from "@lit/context";
import "../../../src/elements/badge";
import { themeContext } from "../../contexts/theme";
import {
  ColorName,
  ColorRole,
  FontFamilyGroup,
  FontWeight,
  Size,
  TabSize,
  TabWidth,
  TabVariants,
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";

/**
 * Tabs — horizontal label strip plus slotted content per tab. Supports
 * `inline` (underline) and `button` (pill) variants.
 *
 * @fires change - Fires when the user clicks a different tab label.
 *   `detail: { label: string; index: number }`.
 */
export class Tabs extends LitElement {
  static registeredName = "ssk-tabs";

  /**
   * Index of the currently active tab — emits `change` when the user clicks a different label. Parent owns this state; pass it back via this prop to update the selected tab.
   */
  @property({ type: Number }) activeIndex = 0;

  // -----------
  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  /**
   * Stable `data-testid` attribute applied to the tab strip for E2E test selectors.
   */
  @property({ type: String })
  testId?: string;

  // ThemeValue
  /**
   * Brand accent for the active-tab indicator — falls back to `--fg-brand-primary` from `<ssk-app-shell-provider>` brand context. Pass an explicit `ColorRole` to override.
   */
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  /**
   * Optional override for the tab label text color. Leave unset to use `--text-primary` / `--text-secondary`.
   */
  @property({ type: String })
  color?: ColorRole | ColorName;
  /**
   * Optional surface color behind the tab strip (any CSS color).
   */
  @property({ type: String })
  backgroundColor?: string | undefined;

  /**
   * Visual size scale — `xs` / `sm` / `md` / `lg` / `xl`. Drives font size, padding, and radius via `--font-size-*` and spacing tokens. Defaults to `md`.
   */
  @property({ type: String })
  size: Size = "md";
  /**
   * Override the padding token — accepts the same `xs`–`xl` scale as `size`. Leave unset to inherit from `size`.
   */
  @property({ type: String })
  padding?: Size;
  /**
   * Override the tab font size (any CSS length). Stay above 18px (`--font-size-caption`) for the DS 3.0 minimum.
   */
  @property({ type: String })
  fontSize?: string | undefined;
  /**
   * Override the gap between tab labels (any CSS length).
   */
  @property({ type: String })
  gap?: string | undefined;
  /**
   * Override the corner radius for `button` variant pills (any CSS length).
   */
  @property({ type: String })
  rounded?: string | undefined;
  /**
   * Override the outer margin around the tab strip (any CSS shorthand).
   */
  @property({ type: String })
  margin?: string | undefined;

  // font
  /**
   * Font family group — `sans` (default body face) or `mono` for fixed-width labels.
   */
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  /**
   * Font weight token for tab labels — typically `normal` (inactive) with `medium` applied automatically to the active tab.
   */
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  /**
   * Override the active-tab indicator border width (any CSS length).
   */
  @property({ type: String })
  borderWidth?: string | undefined;
  /**
   * Override the tab strip height (any CSS length). Leave unset to use the size-bound default.
   */
  @property({ type: String })
  height?: string | undefined;

  /**
   * Array of tab label strings rendered as the clickable triggers. Pair each label with a matching `slot="content-slot-<index>"` for its panel content.
   */
  @property({ type: Array })
  labels: string[] = [];

  /**
   * Visual style — `inline` for underlined text tabs (in-page section switching) or `button` for surface-tinted pill tabs (filter chips). Defaults to `inline`.
   */
  @property({ type: String })
  variant: TabVariants = "inline";

  /**
   * Whether each tab spans available width — `"true"` stretches tabs to fill the strip; `"false"` (default) sizes them to content.
   */
  @property({ type: String })
  widthTab: TabWidth = "false";

  /**
   * Tab height preset — `sm` (44px inline / 36px button) or `md` (56px inline / 44px button). Defaults to `md`.
   */
  @property({ type: String })
  tabSize: TabSize = "md";

  /**
   * When `true`, renders compact icon-only tabs without labels — pair with badge slots for terse layouts.
   */
  @property({ type: Boolean })
  min = false;

  /**
   * When `true`, the entire tab strip stretches to fill the available horizontal space.
   */
  @property({ type: Boolean })
  fullWidth = false;

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = `
               --padding: ${parseVariables(cssVar("padding", this.tabSize))};
                --margin: ${parseVariables(
                  cssVar("4px"),
                  cssVar("margin", this.tabSize),
                )};
                --width: ${parseVariables(
                  cssVar("4px"),
                  cssVar("width", this.widthTab),
                )};
            `;

    const primaryColor = parseVariables(cssVar("colors", "primary", 500));

    switch (this.variant) {
      case "inline":
        if (this.tabSize == "sm") {
          additionalCss = `
                    --height: 44px;
                    --min-width: 96px;
                    --font-size: ${parseVariables(
                      cssVar("font-size", this.tabSize),
                    )};
                    `;
        } else if (this.tabSize == "md") {
          additionalCss = `
                    --height: 56px;
                    --min-width: 105px;
                    --font-size: ${parseVariables(
                      cssVar("font-size", this.tabSize),
                    )};
                    `;
        }

        if (this.widthTab == "true") {
          additionalCss += `
                        --width: 100%;
                    `;
        }

        additionalCss += `
                    --color: ${parseVariables(
                      cssVar("colors", "background", 500),
                    )};
                    --color-active: ${parseVariables(
                      cssVar("colors", "primary", 500),
                    )};
                    --color-hover: ${parseVariables(
                      cssVar("colors", "gray", 400),
                    )};

                    --background-color: ${parseVariables(
                      cssVar("colors", "white", 50),
                    )};
                    --background-color-active: ${parseVariables(
                      cssVar("colors", "white", 50),
                    )};
                    --background-color-hover: ${parseVariables(
                      cssVar("colors", "white", 50),
                    )};

                    --border-bottom-color-tabs:${parseVariables(
                      cssVar("colors", "gray", 200),
                    )};
                    --border-bottom: ${parseVariables("0px")};
                   --border-bottom-active: ${parseVariables(
                     `4px solid ${primaryColor}`,
                   )};
                    --border-bottom-color-hover:  ${parseVariables(
                      cssVar("colors", "gray", 200),
                    )};

                    --font-weight: var(--font-weight-normal, 400);
                    --font-weight-active: 500;
                    --font-weight-hover: 400;
                    `;
        break;

      case "button":
        if (this.tabSize == "sm") {
          additionalCss = `
                    --height: 36px;
                    --min-width: 96px;
                    --font-size: ${parseVariables(
                      cssVar("font-size", this.tabSize),
                    )};
                    `;
        } else if (this.tabSize == "md") {
          additionalCss = `
                    --height: 44px;
                    --min-width: 105px;
                    --font-size: ${parseVariables(
                      cssVar("font-size", this.tabSize),
                    )};
                    `;
        }

        if (this.widthTab == "true") {
          additionalCss += `
                            --width: 100%;
                    `;
        }

        additionalCss += `
                    --margin: 4px;

                    --color: ${parseVariables(cssVar("colors", "gray", 400))};
                    --color-active: ${parseVariables(
                      cssVar("colors", "gray", 800),
                    )};
                    --color-hover: ${parseVariables(
                      cssVar("colors", "gray", 800),
                    )};

                    --background-color: ${parseVariables(
                      cssVar("colors", "gray", 50),
                    )};
                    --background-color-active: ${parseVariables(
                      cssVar("colors", "white", 50),
                    )};
                    --background-color-hover: ${parseVariables(
                      cssVar("colors", "primary", 50),
                    )};

                    --border-bottom: ${parseVariables("0px")};
                    --border-radius: 10px;
                    
                    --box-shadow: ${parseVariables("0px 2px 3px #ccc")};
                    
                    --font-weight: var(--font-weight-normal, 400);
                    --font-weight-active: 500;
                    --font-weight-hover: 400;
                `;
        break;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.tab, ":host")}

      <style>
        div {
            ${additionalCss};
        }
      </style>

      <div class="tabs" data-testid=${this.testId || nothing}>
        ${this.renderTabs()}
      </div>
      <div class="tab-content" data-testid=${this.testId ? `${this.testId}.content` : nothing}">
        ${this.renderTabContent()}
      </div>
    `;
  }

  renderTabs() {
    return html`
      ${this.labels.map(
        (title, index) => html`
          <div
            class="tab ${this.activeIndex === index ? "active" : ""}"
            @click=${() => this.handleTabClick(index)}
          >
            ${title}
            <div class="tab-badge">
              <slot name="badge-slot-${index}" .index=${index}></slot>
            </div>
          </div>
        `,
      )}
    `;
  }

  renderTabContent() {
    return html`
      <slot
        name="content-slot-${this.activeIndex}"
        .index=${this.activeIndex}
      ></slot>
    `;
  }

  handleTabClick(index: number) {
    this.activeIndex = index;
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { 
          label: this.labels[index], 
          index,
         },
      }),
    );
  }

  static styles = css`
    .tab {
      height: var(--height);
      width: var(--width);
      min-width: var(--min-width);
      padding: 0 1rem;
      cursor: pointer;
      border-bottom: var(--border-bottom);
      background-color: var(--background-color);
      font-weight: var(--font-weight);
      font-family: var(--font-family);
      text-align: center;
      justify-content: center;
      display: flex;
      align-items: center;
      color: var(--color);
      border-radius: var(--border-radius);
      margin: var(--margin);
      font-size: var(--font-size);
    }

    .tabs {
      display: flex;
      flex-direction: row;
      background-color: var(--background-color);
      border-radius: var(--border-radius);
      border-bottom: 1px solid var(--border-bottom-color-tabs);
    }

    .tab:hover {
      color: var(--color-hover);
      background-color: var(--background-color-hover);
      border-bottom: 4px solid var(--border-bottom-color-hover);
      font-weight: var(--font-weight-hover);
    }

    .tab.active {
      font-weight: var(--font-weight-active);
      color: var(--color-active);
      background-color: var(--background-color-active);
      border-bottom: var(--border-bottom-active);
      box-shadow: var(--box-shadow);
    }

    .tab-badge {
      margin-left: 8px;
    }

    .tab-content {
      padding: 1rem 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-tabs": Tabs;
  }
}

if (!customElements.get("ssk-tabs")) {
  customElements.define("ssk-tabs", Tabs);
}
