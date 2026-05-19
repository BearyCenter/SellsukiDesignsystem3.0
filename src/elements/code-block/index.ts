import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import { themeContext } from "../../contexts/theme";

// DES-2047: only the langs/themes referenced here become Vite chunks.
// Previously `import { codeToHtml } from "shiki"` pulled in the full bundle
// (100+ language files, ~22 MB unpacked). Unknown values fall back to
// plaintext / github-light.
const LANG_LOADERS: Record<string, () => Promise<unknown>> = {
  typescript: () => import("shiki/langs/typescript.mjs"),
  ts: () => import("shiki/langs/typescript.mjs"),
  javascript: () => import("shiki/langs/javascript.mjs"),
  js: () => import("shiki/langs/javascript.mjs"),
  tsx: () => import("shiki/langs/tsx.mjs"),
  jsx: () => import("shiki/langs/jsx.mjs"),
  css: () => import("shiki/langs/css.mjs"),
  scss: () => import("shiki/langs/scss.mjs"),
  html: () => import("shiki/langs/html.mjs"),
  json: () => import("shiki/langs/json.mjs"),
  yaml: () => import("shiki/langs/yaml.mjs"),
  markdown: () => import("shiki/langs/markdown.mjs"),
  md: () => import("shiki/langs/markdown.mjs"),
  bash: () => import("shiki/langs/bash.mjs"),
  sh: () => import("shiki/langs/bash.mjs"),
  python: () => import("shiki/langs/python.mjs"),
  py: () => import("shiki/langs/python.mjs"),
  go: () => import("shiki/langs/go.mjs"),
  rust: () => import("shiki/langs/rust.mjs"),
};

const THEME_LOADERS: Record<string, () => Promise<unknown>> = {
  "github-light": () => import("shiki/themes/github-light.mjs"),
  "github-dark": () => import("shiki/themes/github-dark.mjs"),
  "vitesse-light": () => import("shiki/themes/vitesse-light.mjs"),
  "vitesse-dark": () => import("shiki/themes/vitesse-dark.mjs"),
};

let highlighterPromise: Promise<HighlighterCore> | null = null;
const loadedLangs = new Set<string>();
const loadedThemes = new Set<string>();

function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [],
      langs: [],
      engine: createJavaScriptRegexEngine(),
    });
  }
  return highlighterPromise;
}

async function highlight(
  code: string,
  lang: string | undefined,
  theme: string,
): Promise<string> {
  const langKey = lang && LANG_LOADERS[lang] ? lang : "plaintext";
  const themeKey = THEME_LOADERS[theme] ? theme : "github-light";
  const h = await getHighlighter();

  if (langKey !== "plaintext" && !loadedLangs.has(langKey)) {
    // shiki's loadLanguage/loadTheme accept a Promise<{default: LanguageRegistration}>
    // but the type only documents the unwrapped form — cast to satisfy TS.
    await h.loadLanguage(LANG_LOADERS[langKey]() as unknown as never);
    loadedLangs.add(langKey);
  }
  if (!loadedThemes.has(themeKey)) {
    await h.loadTheme(THEME_LOADERS[themeKey]() as unknown as never);
    loadedThemes.add(themeKey);
  }

  return h.codeToHtml(code, { lang: langKey, theme: themeKey });
}
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

/**
 * Sellsuki Code Block — DS 3.0
 *
 * Syntax-highlighted code surface. Renders source text with the Shiki
 * highlighter (Vite-friendly chunked language loaders — only the langs
 * referenced inside the component become bundles). Supports TypeScript,
 * JavaScript, JSX/TSX, CSS, SCSS, HTML, JSON, YAML, Markdown, bash,
 * Python, Go, and Rust today; unknown languages fall back to plain text.
 *
 * Reach for `<ssk-code-block>` for documentation pages, error stack traces,
 * onboarding snippets — anywhere developers need to read code, not just
 * any monospaced text. For one-liner inline keystrokes use a `<kbd>` or
 * the `<ssk-tag>` element.
 *
 * @example
 *   <ssk-code-block lang="typescript" theme="github-light">
 *     const order = await fetchOrder("1024");
 *   </ssk-code-block>
 */
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
      this._highlightedHtml = await highlight(
        this.code,
        this.language,
        this.shikiTheme,
      );
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

if (!customElements.get("ssk-code-block")) {
  customElements.define("ssk-code-block", CodeBlock);
}
