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

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  /**
   * Stable `data-testid` attribute applied to the code-block root for E2E test selectors.
   */
  @property({ type: String })
  testId?: string;

  // ThemeValue
  /**
   * Semantic tone — `background` (default). Drives default background tint when `backgroundColor` is unset.
   */
  @property({ type: String })
  themeColor: ColorRole | ColorName = "background";
  /**
   * Override for the code text color (rare — Shiki themes generally drive token colors).
   */
  @property({ type: String })
  color?: ColorRole | ColorName;
  /**
   * Background color override for the code surface. Falls back to a `themeColor`-tinted background.
   */
  @property({ type: String })
  backgroundColor?: ColorRole | ColorName;

  /**
   * Size step — `xs`–`xl`. Controls the code font-size; DS 3.0 floor is 18px.
   */
  @property({ type: String })
  size: Size = "md";
  /**
   * Border radius override (any CSS length). Defaults to `8px`.
   */
  @property({ type: String })
  rounded?: string | undefined;

  /**
   * Border width (any CSS length). Defaults to `1px`.
   */
  @property({ type: String })
  borderWidth?: string | undefined;
  /**
   * Border color (palette role or token). Defaults to a `themeColor`-matched stroke.
   */
  @property({ type: String })
  borderColor?: ColorRole | ColorName | undefined;
  /**
   * CSS `border-style` — `solid` (default), `dashed`, etc.
   */
  @property({ type: String })
  borderStyle?: string | undefined;

  // font
  /**
   * Font family group — typically `mono` for code. Defaults to `sans`; set `mono` for proper code rendering.
   */
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  /**
   * Font weight token for the code. Defaults to `normal`.
   */
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  /**
   * Explicit width (any CSS length). Defaults to `auto`.
   */
  @property({ type: String })
  width?: string | undefined;
  /**
   * Explicit height (any CSS length). Defaults to `auto`.
   */
  @property({ type: String })
  height?: string | undefined;

  /**
   * Inner padding token (`xs`–`xl`) or any CSS length. Defaults to `1em`.
   */
  @property({ type: String })
  padding?: Size;

  /**
   * Visual variant — `solid` (default), `outline`, or `subtle`. Affects background / border interplay.
   */
  @property({ type: String })
  variant: BadgeVariants = "solid";
  /**
   * When set, the code block renders nothing (returns `nothing`) — use for conditional show/hide without DOM teardown.
   */
  @property({ type: Boolean })
  hidden = false;

  /**
   * Source language for syntax highlighting — `typescript` / `ts`, `javascript` / `js`, `tsx`,
   * `jsx`, `css`, `scss`, `html`, `json`, `yaml`, `markdown` / `md`, `bash` / `sh`, `python` / `py`,
   * `go`, `rust`. Unknown values fall back to plain text.
   */
  @property({ type: String })
  language?: string | undefined;
  /**
   * When set, hides the floating copy-to-clipboard button in the top-right corner. Counter-intuitive
   * — the legacy semantics treat the prop as "hide" rather than "show"; defaults to `false` (shown).
   */
  @property({ type: Boolean })
  copyButton = false;
  /**
   * Source string to highlight and display. Multi-line strings are preserved verbatim.
   */
  @property({ type: String })
  code: string = "";
  /**
   * Shiki theme name — `github-light` (default), `github-dark`, `vitesse-light`, or `vitesse-dark`.
   * Unknown values fall back to `github-light`.
   */
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
