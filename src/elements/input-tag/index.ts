import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
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

/**
 * Tag input — text field that converts the entered value into a pill
 * "tag" on Enter, with click-to-remove.
 *
 * @fires change - Fires when a tag is added (Enter pressed on a non-empty,
 *   non-duplicate value) or removed (close icon clicked). `detail:
 *   string[]` — the current `tags` array.
 */
export class Inputtag extends LitElement {
    static registeredName = "ssk-input-tag";

    /**
     * Active theme injected via Lit context. Not authored by callers.
     */
    @consume({ context: themeContext, subscribe: true })
    @property({ attribute: false })
    public theme?: Theme;

    /**
     * Stable `data-testid` attribute for E2E selectors.
     */
    @property({ type: String })
    testId?: string;

    /**
     * Brand accent applied to tag pills (background, border, text). Defaults to `primary`.
     */
    @property({ type: String })
    themeColor: ColorRole | ColorName = "primary";
    /**
     * Override for the input text color.
     */
    @property({ type: String })
    color?: ColorRole | ColorName;
    /**
     * Override for the field background color.
     */
    @property({ type: String })
    backgroundColor?: string | undefined;

    /**
     * Visual size — controls font, padding, and pill dimensions. Defaults to `md`.
     */
    @property({ type: String })
    size: Size = "md";

    /**
     * Font family group. Defaults to `sans`.
     */
    @property({ type: String })
    fontFamilyGroup: FontFamilyGroup = "sans";
    /**
     * Font weight. Defaults to `normal`.
     */
    @property({ type: String })
    fontWeight: FontWeight = "normal";

    /**
     * Overall width of the input (CSS length). Defaults to `auto`.
     */
    @property({ type: String })
    width?: string | undefined;

    /**
     * Label rendered above the input. Appends `*` when `required` is set.
     */
    @property({ type: String })
    label: string | undefined;

    /**
     * Helper text rendered below the input.
     */
    @property({ type: String })
    helperText: string | undefined;

    /**
     * Form-field `name` attribute submitted with the parent form.
     */
    @property({ type: String })
    name: string | undefined;

    /**
     * Placeholder text shown when the field is empty.
     */
    @property({ type: String })
    placeholder: string | undefined;

    /**
     * When set, the element renders nothing — use for conditional show/hide.
     */
    @property({ type: Boolean })
    hidden = false;

    /**
     * Maximum total characters across all tags. Displays a `(used/limit)` counter when set.
     */
    @property({ type: Number })
    limit?: number;

    /**
     * When set, appends a red `*` after the label.
     */
    @property({ type: Boolean })
    required = false;

    /**
     * Minimum height override (CSS length).
     */
    @property({ type: String })
    minHeight?: string | undefined;
    /**
     * Minimum width override (CSS length).
     */
    @property({ type: String })
    minWidth?: string | undefined;

    /**
     * Current array of committed tag strings. Updated when Enter is pressed or a pill close icon is clicked.
     */
    @property({ type: Array })
    tags: string[] = [];

    /**
     * When set, tags wrap onto multiple lines instead of horizontally scrolling.
     */
    @property({ type: Boolean })
    multiline = false;

    /**
     * Maximum number of characters allowed per individual tag. Excess characters are sliced on commit.
     */
    @property({ type: Number })
    maxTagLength?: number;

    /**
     * Current value of the in-progress (not-yet-committed) tag text.
     */
    @property({ type: String })
    value: string = "";

    /**
     * Internal — cumulative character count across all tags, recomputed by `calculateTotalChars()`.
     * Drives the `(N/limit)` counter and the per-tag `maxlength` budget.
     */
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
                        .value=${this.value}
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
        let newValue = target.value;

        if (this.maxTagLength && newValue.length > this.maxTagLength) {
            newValue = newValue.slice(0, this.maxTagLength);
        }

        target.value = newValue;
        this.value = newValue;

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

            if (this.maxTagLength && tag.length > this.maxTagLength) {
                tag = tag.slice(0, this.maxTagLength);
            }

            if (tag.length >= 1) {
                if (!this.tags.includes(tag)) {
                    this.tags = [...this.tags, tag];
                    this.dispatchEvent(new CustomEvent('change', { detail: this.tags, bubbles: true, composed: true }));
                }
                target.value = "";
                this.calculateTotalChars();
            }
        }
    }

    removeTag(tag: string) {
        this.tags = this.tags.filter((item) => item !== tag);
        this.calculateTotalChars();
        this.dispatchEvent(new CustomEvent('change', { detail: this.tags, bubbles: true, composed: true }));
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
        font-weight: var(--font-weight-normal, 400);
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
        border-radius: var(--radius-md, 8px);
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

if (!customElements.get("ssk-input-tag")) {
  customElements.define("ssk-input-tag", Inputtag);
}
