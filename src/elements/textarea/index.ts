import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { redispatchEvents } from "../../helpers/lit";
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
@customElement("ssk-textarea")
export class Textarea extends LitElement {
  static registeredName = "ssk-textarea";

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

  // font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  @property({ type: String })
  width?: string | undefined;

  // textarea specific
  @property({ type: String })
  label: string | undefined;

  @property({ type: String })
  helperText: string | undefined;

  @property({ type: String })
  name: string | undefined;

  @property({ type: String })
  value: string | undefined;

  @property({ type: String })
  placeholder: string | undefined;

  @property({ type: String })
  status: "error" | "success" | undefined;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  hidden = false;

  @property({ type: Number })
  rows = 2;

  @property({ type: Number })
  limit?: number;

  @property({ type: Boolean })
  error = false;

  @property({ type: Boolean })
  required = false;

  @property({ type: String })
  minHeight?: string | undefined;
  @property({ type: String })
  minWidth?: string | undefined;

  @property({ type: String })
  resize: "none" | "both" | "horizontal" | "vertical" = "both";

  @property({ type: Boolean })
  tagsEnabled = false;

  @property({ type: Array })
  tags: string[] = [];

  totalChars: number = 0;

  updateValue(e: any, redispatch: boolean = false) {
    this.value = e.srcElement.value;
    if (redispatch) {
      redispatchEvents(e, this);
    }
  }
  
  calculateTotalChars() {
    const tagsChars = this.tags.reduce((acc, item) => acc + item.trim().length, 0);
    const valueChars = this.value?.length || 0;
    this.totalChars = tagsChars + valueChars;
  }

  render() {
    if (this.hidden) {
      return nothing;
    }
    this.calculateTotalChars();
    return html`
      ${parseThemeToCssVariables(this.theme?.components?.textarea, ":host")}

      <style>
        :host {
          --color: ${parseVariables(
            cssVar("colors", this.color),
            cssVar("colors", this.color, 700),
            this.color,
            cssVar("colors", "text", 700)
          )};
          --color-disabled: ${parseVariables(cssVar("colors", "text", 300))};

          --color-helper: ${parseVariables(
            cssVar("colors", this.color),
            cssVar("colors", this.color, 300),
            this.color,
            cssVar("colors", "text", 300)
          )};

          --background-color-disabled: ${parseVariables(
            cssVar("colors", "border", 50)
          )};

          --border-color: ${parseVariables(cssVar("colors", "border", 100))};
          --border-color-active: ${parseVariables(
            cssVar("colors", this.themeColor, 600)
          )};
          --border-color-disabled: ${parseVariables(
            cssVar("colors", "border", 100)
          )};

          --outline-color-active: ${parseVariables(
            cssVar("colors", this.themeColor, 200)
          )};

          --font-family: ${parseVariables(
            cssVar("font-family", this.fontFamilyGroup)
          )};
          --font-weight: ${parseVariables(
            cssVar("font-weight", this.fontWeight)
          )};
          --font-size: ${parseVariables(cssVar("font-size", this.size))};
          --line-height: ${parseVariables(cssVar("font-size", this.size))};

          --gap: ${parseVariables(cssVar("spacing", this.size))};
          --rounded: ${parseVariables(cssVar("rounded", this.size))};

          --width: ${parseVariables(cssVar("width", this.width), "auto")};

          --color-error: ${parseVariables(cssVar("colors", "error", 600))};
          --color-helper-error: ${parseVariables(
            cssVar("colors", "error", 600)
          )};
          --border-color-error: ${parseVariables(
            cssVar("colors", "error", 600)
          )};
          --outline-color-error: ${parseVariables(
            cssVar("colors", "error", 300)
          )};
          --min-height: ${parseVariables(cssVar("min-height", this.minHeight))};
          --min-width: ${parseVariables(cssVar("min-width", this.minWidth))};
          --resize: ${this.resize};

          --color-tag: ${parseVariables(cssVar("colors", this.themeColor, 500))};
          --border-color-tag: ${parseVariables(cssVar("colors", this.themeColor, 100))};
          --background-color-tag: ${parseVariables(cssVar("colors", this.themeColor, 50))};
        }
      </style>

      <div class="container ${this.error ? "error" : ""}">
        <label for="textarea">
          ${this.label} ${this.required ? html`<span>*</span>` : nothing}
        </label>
        ${this.tagsEnabled
          ? html`
          <div class="wrapper">
            <div class="content">
              <ul>
              ${this.tags.map(
                (tag) => html`
                  <li>
                    ${tag}
                    <ssk-icon name="solid-x-mark" size="xs" @click=${() => this.removeTag(tag)}></ssk-icon>
                  </li>`
              )}
                <textarea
                  data-testid=${this.testId || nothing}
                  name=${this.name || ""}
                  spellcheck="false"
                  rows=${this.rows}
                  placeholder=${this.placeholder || ""}
                  maxlength=${this.limit!}
                  @input=${this.handleTagInput}
                  @keyup=${this.addTag}
                  .tags=${this.tags}
                ></textarea>
              </ul>
              <div class="footer ${this.helperText || this.limit ? "" : "hidden"}" style="margin-top: -16px;">
                <label class="helper">${this.helperText}</label>
                <label class="helper ${this.limit ? "" : "hidden"}">
                  (${this.totalChars}/${this.limit})
                </label>
              </div>
            </div>
          </div>`
          : html`
        <textarea
          id="textarea"
          data-testid=${this.testId || nothing}
          placeholder=${this.placeholder || ""}
          name=${this.name || ""}
          .value=${this.value || ""}
          ?disabled=${this.disabled}
          @input=${this.updateValue}
          @change=${(e: any) => this.updateValue(e, true)}
          rows=${this.rows}
          maxlength=${this.limit!}
        ></textarea>
        <div class="footer ${this.helperText || this.limit ? "" : "hidden"}">
          <label class="helper">${this.helperText}</label>
          <label class="helper ${this.limit ? "" : "hidden"}">
            (${this.value?.length || 0}/${this.limit})
          </label>
        </div>
      `}
      </div>
    `;
}
  handleTagInput(e: KeyboardEvent) {
    const target = e.target as HTMLTextAreaElement;
    const newValue = target.value;
    if (newValue.length > (this.limit ?? 0) - this.totalChars) {
      target.value = newValue.slice(0, (this.limit ?? 0) - this.totalChars);
    }
  }

  addTag(e: KeyboardEvent) {
    if (e.key === "Enter") {
      const target = e.target as HTMLTextAreaElement;
      let tag = target.value.trim();
      if (tag.length >= 1 && tag.length <= 21) {
        if (!this.tags.includes(tag)) {
          this.tags = [...this.tags, tag];
        }
        target.value = ""; 
        this.calculateTotalChars();
      }
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter((item) => item !== tag);
    this.calculateTotalChars();
  }

  static styles = css`
    div,
    label,
    textarea {
      color: var(--color);
      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
    }

    div.container {
      display: flex;
      flex-direction: column;
      width: var(--width);
      gap: 0.25em;
    }

    div.container > label > span {
      color: red;
    }

    textarea {
      display: grid;
      grid-template-areas: "prefix textarea postfix";
      grid-template-columns: auto 1fr auto;
      overflow: hidden;
      align-items: center;
      padding: 0.25em 0.5em;
      /* margin: 0.125em 0; */

      border-style: solid;
      transition: background-color 0.2s ease-in-out;
      background-color: var(--background-color);

      border-radius: var(--rounded);
      border: 1px solid var(--border-color);

      gap: var(--gap);
      min-height: var(--min-height);
      min-width: var(--min-width);
      resize: var(--resize);
    }

    textarea:disabled {
      background-color: var(--background-color-disabled);
      border-color: var(--border-color-disabled);
      color: var(--color-disabled);
    }

    textarea:focus {
      border-color: var(--border-color-active);
      outline: 4px solid var(--outline-color-active);
    }

    .footer {
      display: flex;
      justify-content: space-between;
    }

    label.helper {
      font-size: 0.75em;
      line-height: 0.75em;
      font-weight: 200;
      color: var(--color-helper);
    }

    .error {
      textarea {
        border-color: var(--border-color-error);
        outline: 4px solid var(--outline-color-error);
      }

      label.helper {
        color: var(--color-helper-error);
      }
    }

    .hidden {
      display: none;
    }

    .wrapper {
      width: var(--width);
    }

    .wrapper :where(.title, li, li i,) {
      display: flex;
      align-items: center;
    }

    .content ul {
      display: flex;
      flex-wrap: wrap;
      padding: 8px 16px;
      border-radius: var(--rounded);
      border: 1px solid var(--border-color);
    }

    .content ul li {
      color: var(--color-tag);
      margin: 2px 8px 14px 2px;
      list-style: none;
      border-radius: 8px;
      background: var(--background-color-tag);
      padding: 0px 8px;
      border: 1px solid var(--border-color-tag);
      width: auto;
      height: 1em;
    }

    .content ul li ssk-icon {
      margin-left: 8px;
      cursor: pointer;
      justify-content: center;
    }

    .content ul textarea {
      flex: 1;
      padding: 0px;
      border: none;
      outline: none;
      resize: none;
      overflow: hidden;
      white-space: pre-wrap;
      word-wrap: break-word;

      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);
    }

    .wrapper {
      justify-content: space-between;
    }

  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-textarea": Textarea;
  }
}
