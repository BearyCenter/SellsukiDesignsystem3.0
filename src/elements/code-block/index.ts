import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { codeToHtml } from "shiki";
import { themeContext } from "../../contexts/theme";
import {
  BadgeVariants,
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

export class CodeBlock extends LitElement {
  static registeredName = "ssk-code-block";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  // ThemeValue
  @property({ type: String })
  themeColor: ColorRole | ColorName = "background";
  @property({ type: String })
  color?: ColorRole | ColorName;
  @property({ type: String })
  backgroundColor?: ColorRole | ColorName;

  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  rounded?: string | undefined;

  @property({ type: String })
  borderWidth?: string | undefined;
  @property({ type: String })
  borderColor?: ColorRole | ColorName | undefined;
  @property({ type: String })
  borderStyle?: string | undefined;

  // font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  @property({ type: String })
  width?: string | undefined;
  @property({ type: String })
  height?: string | undefined;

  @property({ type: String })
  padding?: Size;

  @property({ type: String })
  variant: BadgeVariants = "solid";
  @property({ type: Boolean })
  hidden = false;

  @property({ type: String })
  language?: string | undefined;
  @property({ type: Boolean })
  copyButton = false;
  @property({ type: String })
  code: string = "";
  @property({ type: String, attribute: "shiki-theme" })
  shikiTheme: string = "github-light";

  @state() private _highlightedHtml = "";

  private async _doHighlight() {
    if (!this.code) {
      this._highlightedHtml = "";
      return;
    }
    try {
      this._highlightedHtml = await codeToHtml(this.code, {
        lang: (this.language as any) ?? "plaintext",
        theme: this.shikiTheme as any,
      });
    } catch {
      this._highlightedHtml = `<pre><code>${this.code.replace(/</g, "&lt;")}</code></pre>`;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._doHighlight();
  }

  updated(changed: Map<string | number | symbol, unknown>) {
    if (changed.has("code") || changed.has("language") || changed.has("shikiTheme")) {
      this._doHighlight();
    }
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = html`
      <style>
        @import "../../assets/global.css";
        div {
          --scrollbar-size: 4px;
          --font-size: ${parseVariables(
            cssVar("font-size", this.size),
            "1rem",
          )};
          --font-family: ${parseVariables(
            cssVar("font-family", this.fontFamilyGroup),
          )};
          --font-weight: ${parseVariables(
            cssVar("font-weight", this.fontWeight),
          )};

          --rounded: ${parseVariables(cssVar("rounded", this.rounded), "8px")};

          --background-color: ${parseVariables(
            cssVar("colors", this.backgroundColor, 50),
            cssVar("colors", this.backgroundColor),
            this.backgroundColor,
            cssVar("colors", this.themeColor, 50),
          )};
          --border-color: ${parseVariables(
            cssVar("colors", this.borderColor, 400),
            cssVar("colors", this.borderColor),
            this.borderColor,
            cssVar("colors", this.themeColor, 400),
          )};
          --border-width: ${parseVariables(
            cssVar("border-width", this.borderWidth),
            "1px",
          )};
          --border-style: ${parseVariables(
            cssVar("border-style", this.borderStyle),
            "solid",
          )};

          --width: ${parseVariables(cssVar("width", this.width), "auto")};
          --height: ${parseVariables(cssVar("height", this.height), "auto")};

          --padding: ${parseVariables(
            cssVar("padding", this.padding),
            this.padding,
            "1em",
          )};

          --color: ${parseVariables(
            cssVar("colors", this.color, 800),
            cssVar("colors", this.color),
            this.color,
            "inherit",
          )};
        }
      </style>
    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.container, ":host")}
      ${additionalCss}

      <div class="container" id="contain" data-testid=${this.testId || nothing}>
        <div class="right">
          <ssk-button
            id="copyButton"
            variant="ghost"
            themeColor="black"
            .hidden=${this.copyButton}
            @click=${() => this.clickCopy()}
            ><ssk-icon name="outline-document-duplicate"></ssk-icon
          ></ssk-button>
        </div>
        <div class="scroll shiki-wrapper">
          ${this._highlightedHtml
            ? unsafeHTML(this._highlightedHtml)
            : html`<pre><code>${this.code}</code></pre>`}
        </div>
      </div>
    `;
  }

  private async clickCopy() {
    await navigator.clipboard.writeText(this.code);
  }

  static styles = [
    css`
      pre {
        margin: 0;
      }

      code {
        font-size: var(--font-size);
        font-family: var(--font-family);
      }

      .container {
        flex-direction: column;
        justify-content: center;

        background-color: var(--background-color);
        color: var(--color);

        font-size: var(--font-size);
        font-family: var(--font-family);
        font-weight: var(--font-weight);
        line-height: var(--line-height);

        border-style: var(--border-style);
        border-radius: var(--rounded);
        border-color: var(--border-color);
        border-width: var(--border-width);

        width: var(--width);
        height: var(--height);

        padding: var(--padding);
        position: relative;
      }

      .scroll {
        overflow-x: scroll;
      }

      .right {
        position: absolute;
        z-index: 2;
        right: 1.25em;
        top: 1.25em;
        cursor: pointer;
        opacity: 0.7;
      }

      .shiki-wrapper pre {
        margin: 0;
        background: transparent !important;
      }

      .shiki-wrapper code {
        font-size: var(--font-size);
        font-family: var(--font-family);
      }
    `,
  ];
}

declare global {
  interface HTMLElementContainerNameMap {
    "ssk-code-block": CodeBlock;
  }
}

if (!customElements.get("ds-code-block")) {
  customElements.define("ds-code-block", CodeBlock);
}
if (!customElements.get("ssk-code-block")) {
  customElements.define("ssk-code-block", CodeBlock);
}
