import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
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
    CardSize,
} from "../../types/theme";

export class CardSelect extends LitElement {
    static registeredName = "ssk-card-select";

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
    size: Size = "md";
    @property({ type: String })
    rounded?: string | undefined;

    @property({ type: String })
    cardSize: CardSize = "md";
    @property({ type: Boolean })
    disabled = false;
    @property({ type: Boolean })
    selected = false;
    // font
    @property({ type: String })
    fontFamilyGroup: FontFamilyGroup = "sans";
    @property({ type: String })
    fontWeight: FontWeight = "normal";

    @property({ type: String })
    width?: string | undefined;

    @property({ type: Boolean })
    hidden = false;

    @property({ type: Number })
    index = 0;
    
    private handleClick() {
        if (!this.disabled) {
            this.selected = !this.selected;
            this.dispatchEvent(new CustomEvent("card-click", {
                detail: { index: this.index },
                bubbles: true,
                composed: true
            }));
        }
    }

    render() {
        if (this.hidden) {
            return nothing;
        }
        
        let additionalCss = `
        --font-size: ${parseVariables(cssVar("font-size", this.size), "1rem")};
        --font-family: ${parseVariables(
            cssVar("font-family", this.fontFamilyGroup)
        )};
        --font-weight: ${parseVariables(cssVar("font-weight", this.fontWeight))};

        --rounded: ${parseVariables(cssVar("rounded", this.rounded), "8px")};
        --height: 9.5rem;
        --width: 15.34 rem;
        `;

        switch (this.cardSize) {
        case "md":
            additionalCss += `
            --background-color: ${parseVariables(cssVar("colors", "white", 100))};
            --background-color-hover: ${parseVariables(
                cssVar("colors", this.themeColor, 700),
            )};
            --background-color-active: ${parseVariables(
                cssVar("colors", this.themeColor, 600),
            )};
            --background-color-disabled: ${parseVariables(
                cssVar("colors", "gray", 100),
            )};
            --border-color: ${parseVariables(
                cssVar("colors", "gray", 100),
            )};
            --border-color-hover: ${parseVariables(
                cssVar("colors", this.themeColor, 500)
            )};
            --border-color-shodow: ${parseVariables(
                cssVar("colors", this.themeColor, 100)
            )};
            --border-width: 1px;
            --color: ${parseVariables(cssVar("colors", "black", 400))};
            --color-hover: ${parseVariables(cssVar("colors", this.themeColor, 500))};
            --height: 6.5rem;
            --width: 13.2rem;
            `;
            break;

        case "sm":
            additionalCss += `
            --background-color: ${parseVariables(cssVar("colors", "white", 100))};
            --background-color-hover: ${parseVariables(
                cssVar("colors", this.themeColor, 700),
            )};
            --background-color-active: ${parseVariables(
                cssVar("colors", this.themeColor, 600),
            )};
            --background-color-disabled: ${parseVariables(
                cssVar("colors", "gray", 100),
            )};
            --border-color: ${parseVariables(
                cssVar("colors", "gray", 100),
            )};
            --border-color-hover: ${parseVariables(
                cssVar("colors", this.themeColor, 500)
            )};
            --border-color-shodow: ${parseVariables(
                cssVar("colors", this.themeColor, 100)
            )};
            --border-width: 1px;
            --color: ${parseVariables(cssVar("colors", "black", 400))};
            --color-hover: ${parseVariables(cssVar("colors", this.themeColor, 500))};
            --height: 6.0rem;
            --width: 12.8rem;
            `;
            break;
    }

        return html`
        ${parseThemeToCssVariables(this.theme?.components?.cardSelect, ":host")}

        <style>
            div {
            ${additionalCss};
            }
        </style>

        <div class="container ${this.selected ? 'selected' : ''} ${this.disabled ? 'disabled' : ''}" id="contain" data-testid=${this.testId || nothing} .disabled=${this.disabled} @click=${this.handleClick}>
            <div class="icon-right">
                ${this.selected ? html`<ssk-icon name="solid-check-circle" size="sm"></ssk-icon>` : nothing}
            </div>
            <slot></slot>
        </div>
        `;
    }

    static styles = css`
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;

            background-color: var(--background-color);
            color: var(--color);

            font-size: var(--font-size);
            font-family: var(--font-family);
            font-weight: var(--font-weight);
            line-height: var(--line-height);

            border-style: solid;
            border-radius: var(--rounded);
            border-color: var(--border-color);
            border-width: var(--border-width);
            padding: 1.5rem 1rem;
            height: var(--height);
            width: var(--width);
        }
        .container:hover:not(.disabled), .container.selected:not(.disabled) {
            cursor:pointer;
            color: var(--color-hover);
            border-color: var(--border-color-hover);
            box-shadow: 0px 1px 2px 0px rgba(156, 163, 175, 0.25), 0px 0px 0px 4px var(--border-color-shodow);
        }
        .container:disabled {
            cursor: not-allowed;
            background-color: var(--background-color-disabled);
            color: var(--color-disabled);
            border-color: var(--border-color-disabled);
        }
        .icon-right {
            position: absolute;
            right: 1rem;
            top: 0.5rem;
        }
        
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ssk-card-select": CardSelect;
    }
}

if (!customElements.get("ds-card-select")) {
  customElements.define("ds-card-select", CardSelect);
}
if (!customElements.get("ssk-card-select")) {
  customElements.define("ssk-card-select", CardSelect);
}
