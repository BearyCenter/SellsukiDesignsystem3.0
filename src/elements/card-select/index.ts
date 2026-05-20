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

/**
 * Selectable card — toggle-style card with a check icon indicator,
 * intended for option pickers (e.g. shipping method, plan tier).
 *
 * @fires card-click - Fires when the user clicks the card and it is not
 *   disabled. `detail: { index: number }` — the card's `index` prop.
 *   The internal `selected` state is also toggled on click.
 */
export class CardSelect extends LitElement {
    static registeredName = "ssk-card-select";

    /**
     * Active theme injected via Lit context by `<ssk-theme-provider>`. Resolves
     * the brand token set (sellsuki / patona / oc2plus) — do not set manually.
     */
    @consume({ context: themeContext, subscribe: true })
    @property({ attribute: false })
    public theme?: Theme;

    /**
     * Stable hook for end-to-end tests. Rendered as `data-testid` on the card
     * container so Playwright / Cypress can locate it reliably.
     */
    // BaseAttributes
    @property({ type: String })
    testId?: string;

    /**
     * Brand colour role used for the selected border, hover wash, and check
     * icon. Defaults to `primary` and falls back to the brand context.
     */
    // ThemeValue
    @property({ type: String })
    themeColor: ColorRole | ColorName = "primary";
    /**
     * Optional foreground colour role override for the card label and icon.
     * Leave unset to inherit `themeColor`.
     */
    @property({ type: String })
    color?: ColorRole | ColorName;

    /**
     * Font-size scale token for slotted text. Steps mirror DS sizes
     * (`xs`–`9xl`); defaults to `md`.
     */
    @property({ type: String })
    size: Size = "md";
    /**
     * Border-radius token override (e.g. `sm`, `md`, `lg`). Defaults to the
     * card-default radius (`8px`).
     */
    @property({ type: String })
    rounded?: string | undefined;

    /**
     * Card physical footprint preset — `sm` (~12.8 × 6.0 rem) or `md`
     * (~13.2 × 6.5 rem). Drives width, height, and internal padding.
     */
    @property({ type: String })
    cardSize: CardSize = "md";
    /**
     * When true, the card is non-interactive and styled muted — clicks are
     * ignored and `card-click` is not emitted.
     */
    @property({ type: Boolean })
    disabled = false;
    /**
     * Whether the card is currently in the selected state — drives the
     * highlighted border and the trailing check-circle icon. Toggled
     * internally on click; bind explicitly when wrapped by `<ssk-card-group>`.
     */
    @property({ type: Boolean })
    selected = false;
    /**
     * Font-family group token used for slotted label text. Defaults to `sans`;
     * switch to `serif` or `display` for branded contexts.
     */
    // font
    @property({ type: String })
    fontFamilyGroup: FontFamilyGroup = "sans";
    /**
     * Font-weight token for slotted label text. Defaults to `normal`; raise to
     * `medium` or `bold` for emphasis.
     */
    @property({ type: String })
    fontWeight: FontWeight = "normal";

    /**
     * Explicit width for the card (any CSS length). Leave unset to use the
     * `cardSize` preset width.
     */
    @property({ type: String })
    width?: string | undefined;

    /**
     * Hide the card from layout (returns `nothing`). Cheaper than unmounting
     * when toggling visibility frequently.
     */
    @property({ type: Boolean })
    hidden = false;

    /**
     * Position index within a `<ssk-card-group>` parent — emitted in the
     * `card-click` event payload so the group can resolve which card was
     * picked. Defaults to `0`.
     */
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

if (!customElements.get("ssk-card-select")) {
  customElements.define("ssk-card-select", CardSelect);
}
