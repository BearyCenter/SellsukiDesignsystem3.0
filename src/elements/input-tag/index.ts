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

@customElement("ssk-input-tag")
export class Inputtag extends LitElement {
    static registeredName = "ssk-input-tag";

    @consume({ context: themeContext, subscribe: true })
    @property({ attribute: false })
    public theme?: Theme;

    @property({ type: String })
    testId?: string;

    @property({ type: String })
    themeColor: ColorRole | ColorName = "primary";
    @property({ type: String })
    color?: ColorRole | ColorName;
    @property({ type: String })
    backgroundColor?: string | undefined;

    @property({ type: String })
    size: Size = "md";

    @property({ type: String })
    fontFamilyGroup: FontFamilyGroup = "sans";
    @property({ type: String })
    fontWeight: FontWeight = "normal";

    @property({ type: String })
    width?: string | undefined;

    @property({ type: String })
    label: string | undefined;

    @property({ type: String })
    helperText: string | undefined;

    @property({ type: String })
    name: string | undefined;

    @property({ type: String })
    placeholder: string | undefined;

    @property({ type: Boolean })
    hidden = false;

    @property({ type: Number })
    limit?: number;

    @property({ type: Boolean })
    required = false;

    @property({ type: String })
    minHeight?: string | undefined;
    @property({ type: String })
    minWidth?: string | undefined;

    @property({ type: Array })
    tags: string[] = [];

    @property({ type: Boolean })
    multiline = false;

    totalChars: number = 0;

    calculateTotalChars() {
        const tagsChars = this.tags.reduce((acc, item) => acc + item.trim().length, 0);
        this.totalChars = tagsChars;
    }


    render() {
        if (this.hidden) {
            return nothing;
        }
        this.calculateTotalChars(); 

        return html`
    ${parseThemeToCssVariables(this.theme?.components?.inputtag, ":host")}

    <style>
        :host {
            --color: ${parseVariables(
            cssVar("colors", this.color),
            cssVar("colors", this.color, 700),
            this.color,
            cssVar("colors", "text", 700)
        )};

            --color-helper: ${parseVariables(
            cssVar("colors", this.color),
            cssVar("colors", this.color, 300),
            this.color,
            cssVar("colors", "text", 300)
        )};

            --border-color: ${parseVariables(cssVar("colors", "border", 100))};
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
            --min-height: ${parseVariables(cssVar("min-height", this.minHeight))};
            --min-width: ${parseVariables(cssVar("min-width", this.minWidth))};

            --color-tag: ${parseVariables(cssVar("colors", this.themeColor, 500))};
            --border-color-tag: ${parseVariables(cssVar("colors", this.themeColor, 100))};
            --background-color-tag: ${parseVariables(cssVar("colors", this.themeColor, 50))};

            --min-width: ${parseVariables(cssVar("colors", this.themeColor, 50))};
            --min-width-multiline: ${this.multiline ? '80px' : 'auto'};

            --white-space: ${this.multiline ? 'pre-wrap' : 'nowrap'};
            --word-wrap: ${this.multiline ? 'break-word' : 'normal'};
            --flex-wrap: ${this.multiline ? 'wrap' : 'nowrap'};
            --overflow-wrap: ${this.multiline ? 'visible' : 'auto'};
            --overflow-inline: ${this.multiline ? 'hidden' : 'visible'};
        }
    </style>
    <div class="container">
        <label for="input">
            ${this.label} ${this.required ? html`<span>*</span>` : nothing}
        </label>
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
                    <input 
                        type="text"
                        spellcheck="false"
                        data-testid=${this.testId || nothing}
                        name=${this.name || ""}
                        placeholder=${this.placeholder || ""}
                        maxlength=${this.limit && this.limit > 0 ? this.limit - this.totalChars : ""}
                        @input=${this.handleTagInput}
                        @keydown=${this.addTag}
                        @change=${(e: any) => this.handleTagInput(e, true)}
                        .tags=${this.tags}
                        ?multiline=${this.multiline}
                    >
                </ul>
            </div>
            <div class="footer ${this.helperText || this.limit ? "" : "hidden"}" style="margin-top: 6px;">
                <label class="helper">${this.helperText}</label>
                <label class="helper ${this.limit ? "" : "hidden"}">
                    (${this.totalChars}/${this.limit})
                </label>
            </div>
        </div>
    </div>
    `;
    }

    handleTagInput(e: Event, redispatch: boolean = false) {
        const target = e.target as HTMLInputElement;
        const newValue = target.value;
        if (this.limit && this.limit > 0 && newValue.length > (this.limit - this.totalChars)) {
            target.value = newValue.slice(0, this.limit - this.totalChars);
        }
        if (redispatch) {
            redispatchEvents(e, this);
        }
    }

    addTag(e: KeyboardEvent) {
        if (e.key === "Enter") {
            if (!this.multiline) {
                e.preventDefault();
            }

            const target = e.target as HTMLInputElement;
            let tag = target.value.trim();
            if (tag.length >= 1 && tag.length <= 21) {
                if (!this.tags.includes(tag)) {
                    this.tags = [...this.tags, tag];
                    this.dispatchEvent(new CustomEvent('change', { detail: this.tags }));
                }
                target.value = "";
                this.calculateTotalChars();
            }
        }
    }

    removeTag(tag: string) {
        this.tags = this.tags.filter((item) => item !== tag);
        this.calculateTotalChars();
        this.dispatchEvent(new CustomEvent('change', { detail: this.tags }));
    }

    static styles = css`
    div, label, input {
        font-size: var(--font-size);
        font-family: var(--font-family);
        font-weight: var(--font-weight);
        line-height: var(--line-height);
    }

    input {
        display: flex;
        align-items: center;
        padding: 0.25em 0.5em;
        border-style: solid;
        transition: background-color 0.2s ease-in-out;
        background-color: var(--background-color);
        border-radius: var(--rounded);
        border: 1px solid var(--border-color);
        gap: var(--gap);
        min-height: var(--min-height);
        min-width: var(--min-width);
        resize: none;
        white-space: var(--white-space);
        word-wrap: var(--word-wrap);
        overflow-x: scroll;
        overflow-y: hidden;
        flex: 1;
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

    .content {
        display: flex;
        flex-wrap: var(--flex-wrap);
        padding: 8px 16px;
        border-radius: var(--rounded);
        border: 1px solid var(--border-color);
        align-items: center;
        overflow-x: var(--overflow-wrap);
    }

    .content ul {
        display: flex;
        flex-wrap: var(--flex-wrap);
        padding: 0;
        margin: 0;
        list-style: none;
        align-items: center;
        gap: 8px;
        flex: 1;
        overflow: var(--overflow-inline);
    }

    .content ul li {
        color: var(--color-tag);
        margin: 0;
        padding: 0 8px;
        border-radius: 8px;
        background: var(--background-color-tag);
        border: 1px solid var(--border-color-tag);
        display: flex;
        align-items: center;
        height: 1em;
        line-height: 1em;
    }

    .content ul li ssk-icon {
        margin-left: 8px;
        cursor: pointer;
        justify-content: center;
    }

    .content ul input {
        flex: 1;
        padding: 0;
        border: none;
        outline: none;
        resize: none;
        overflow: auto;
        white-space: var(--white-space);
        font-size: var(--font-size);
        font-family: var(--font-family);
        font-weight: var(--font-weight);
        line-height: var(--line-height);
        margin: 0;
        box-sizing: border-box;
    }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ssk-input-tag": Inputtag;
    }
}
