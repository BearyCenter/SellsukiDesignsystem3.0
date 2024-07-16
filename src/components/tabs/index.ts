import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
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

@customElement("ssk-tabs")
export class Tabs extends LitElement {
  static registeredName = "ssk-tabs";

  @property({ type: Number }) activeIndex = 0;

  // -----------
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  // ThemeValue
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  @property({ type: String })
  color?: ColorRole | ColorName;
  @property({ type: String })
  backgroundColor?: string | undefined;

  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  padding?: Size;
  @property({ type: String })
  fontSize?: string | undefined;
  @property({ type: String })
  gap?: string | undefined;
  @property({ type: String })
  rounded?: string | undefined;
  @property({ type: String })
  margin?: string | undefined;

  // font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  @property({ type: String })
  borderWidth?: string | undefined;
  @property({ type: String })
  height?: string | undefined;

  @property({ type: Array })
  labels: string[] = [];

  @property({ type: String })
  variant: TabVariants = "inline";

  @property({ type: String })
  widthTab: TabWidth = "false";

  @property({ type: String })
  tabSize: TabSize = "md";

  @property({ type: Boolean })
  min = false;

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

                    --border-bottom-tabs:${parseVariables("1px solid #D1D5DB")};
                    --border-bottom: ${parseVariables("0px")};
                   --border-bottom-active: ${parseVariables(
                     `4px solid ${primaryColor}`,
                   )};
                    --border-bottom-hover: ${parseVariables(
                      "4px solid #D1D5DB",
                    )};

                    --font-weight: 400;
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
                    
                    --font-weight: 400;
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

      <div class="tabs" data-testid=${this.renderTabs()}>
        ${this.renderTabs()}
      </div>
      <div class="tab-content" data-testid=${this.renderTabContent()}>
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
      border-bottom: var(--border-bottom-tabs);
    }

    .tab:hover {
      color: var(--color-hover);
      background-color: var(--background-color-hover);
      border-bottom: var(--border-bottom-hover);
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
