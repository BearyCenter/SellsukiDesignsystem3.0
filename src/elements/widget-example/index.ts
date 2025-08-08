import { consume } from "@lit/context";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { ThemeValue } from "../../types/base-attributes";
import {
    ColorName,
    ColorRole,
    FontFamilyGroup,
    FontWeight,
    Size,
    Theme,
    parseThemeToCssVariables,
} from "../../types/theme";

@customElement("ssk-widget-example")
export class WidgetExample extends LitElement implements ThemeValue {
    static registeredName = "ssk-widget-example";

    @consume({ context: themeContext, subscribe: true })
    @property({ attribute: false })
    public theme?: Theme;

    // ThemeValue
    @property({ type: String })
    size: Size = "md";
    @property({ type: String })
    color?: ColorRole | ColorName;
    @property({ type: String })
    margin?: string | undefined;
    @property({ type: String })
    padding?: Size;
    @property({ type: String })
    gap?: string | undefined = "md";

    @property({ type: String })
    testId?: string;

    // Font
    @property({ type: String })
    fontFamilyGroup: FontFamilyGroup = "sans";
    @property({ type: String })
    fontWeight: FontWeight = "normal";
    @property({ type: String })
    fontSize?: string | undefined;

    render() {
        return html`
        ${parseThemeToCssVariables(this.theme?.components?.widgetexample, ":host")}
        <div class="container">
            <div>
                <p class="text-style">Widget Label</p>
            </div>
        </div>
    `;
    }

    static styles = css`
        .container {
            background: #ffff;
            padding: 8px;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            height: -webkit-fill-available;
        }
        .text-style {
            color: #1F2937;
            font-size: 24px;
            text-align: center;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ssk-widget-example": WidgetExample;
    }
}
