import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit/context";
import { themeContext } from "../../contexts/theme";
import {
    ColorName,
    ColorRole,
    FontFamilyGroup,
    FontWeight,
    Size,
    Theme,
    parseThemeToCssVariables,
} from "../../types/theme";

@customElement("ssk-stepper")
export class Stepper extends LitElement {
    static registeredName = "ssk-stepper";

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

    render() {
        if (this.hidden) {
            return nothing;
        }

        let additionalCss = `
            `;

        return html`
            ${parseThemeToCssVariables(this.theme?.components?.tab, ":host")}

            <style>
                div {
                    ${additionalCss};
                }
            </style>

            <div class="circle">
            </div>

            `;
    }

    static styles = css`
        .circle{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: #0000FF;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ssk-stepper": Stepper;
    }
}