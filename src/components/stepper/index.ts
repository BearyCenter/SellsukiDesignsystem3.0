import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { consume } from "@lit/context";
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
} from "../../types/theme";
import "../../../src/elements/icon";

@customElement("ssk-stepper")
export class Stepper extends LitElement {
    static registeredName = "ssk-stepper";

    // @property({ type: Number }) activeIndex = 0;

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

    @property({ type: String })
    status?: "waiting" | "finished" | "in-progress" | "error";

    @property({ type: String })
    labels?: string = "1";

    @property({ type: Boolean })
    disabled = false;

    @property({ type: Number }) value = 0;

    @property({ type: Array })
    steps = [] = [
        {
        title: '1',
        content: 'This is the first step.',
        },
        {
        title: '2',
        content: 'This is the second step.',
        },
        {
        title: '3',
        content: 'This is the third step.',
        },
        {
        title: '4',
        content: 'This is the 4 step.',
        },
    ];

    @property({ type: Number })
    currentStep = 0;

    @property({ type: Number })
    activeIndex = 0;

    // @property({ type: Boolean })
    // disabled = false;

    @property({ type: Boolean })
    hidden = false;

    @property({ type: Number })
    percent: number;

    constructor() {
        super();
    this.percent = 100;  // Initialize here
    // this.percent = this.percent * 2;
    }

    render() {
        if (this.hidden) {
            return nothing;
        }

        let additionalCss = `
            --background-color: ${parseVariables(
                cssVar("colors", "primary", 500),
            )};
        `;

        // const iconName = this.status === "error" ? "solid-x-mark" : this.status === "finished" ? "solid-check" : null;

        let iconName = ``;
        let iconColor = ``;
        let iconSize =``;

        switch (this.status) {
            case "waiting":

                additionalCss += `
                    --color:  ${parseVariables(cssVar("colors", "gray", 400))};
                    --background-color: ${parseVariables(cssVar("colors", "white", 50))};
                    --border: 1px solid #6B7280;
                    --font-family: ${parseVariables(
                        cssVar("font-family", this.fontFamilyGroup),
                    )};
                    --font-weight: ${parseVariables(cssVar("font-weight", 500))};
                    --font-size: ${parseVariables(
                        cssVar("font-size", "24px"),
                    )};
                    --line-height: ${parseVariables(
                        cssVar("line-height", "24px"),
                    )};
                `;

            break;

            case "finished":
                iconName = "solid-check";
                iconColor = "#FFFFFF";
                iconSize = "sm";

                additionalCss += `
                    --background-color: ${parseVariables(cssVar("colors", "secondary", 500))};
                `;

                this.disabled = true

            break;

            case "in-progress":

                additionalCss += `
                    --color:  ${parseVariables(cssVar("colors", "white", 50))};
                    --background-color: ${parseVariables(cssVar("colors", "primary", 500))};
                `;
                
            break;

            case "error":

                iconName = "solid-x-mark";
                iconColor = "#E11D48";
                iconSize = "md";

                additionalCss += `
                    --background-color: ${parseVariables(cssVar("colors", "white", 50))};
                    --border: 1px solid #E11D48;
                `;

                this.disabled = true

            break;    
        }
        
        return html`
            ${parseThemeToCssVariables(this.theme?.components?.stepper, ":host")}

            <style>
                div {
                    ${additionalCss};
                }
            </style>
                ${this.steps.map((step, index) => html`
                <div class="step ${index === this.currentStep ? 'active' : index < this.currentStep ? 'finished' : ''} " style="display: flex; gap: 5px;">
                    <div class="container">
                        <div class="stepper">
                            <svg class="progress-circle" style="--progress-percent:${this.percent};">
                                <circle class="circle" cx="20" cy="26" r="16"></circle>
                                <circle class="bar" cx="20" cy="26" r="18"></circle>
                                <foreignObject x="4" y="10" width="32" height="32">
                                    <div class="circle-content">
                                    ${index < this.currentStep ? html`<ssk-icon name="solid-check" themeColor="white"></ssk-icon>` : html`<div class="title">${step.title}</div>`}
                                    </div>
                                </foreignObject>
                            </svg>
                        </div>
                    </div>
                                            <div class="text">
                                            ${index === this.currentStep ?  html`
                                            <p>
                                            In Progress
                                            </p>
                                            <p>
                                            This is a description
                                            </p>
                                            ` 
                                            : index < this.currentStep ? 
                                            html`
                                                <p>
                                                Finished
                                                </p>
                                                <p>
                                                This is a description
                                                </p>` 
                                            : html`
                                                <p>
                                                Waiting
                                                </p>
                                                <p>
                                                This is a description.
                                                </p>`}
                                        </div>
                        `)}
                        </div>

                        <div class="actions">
                        <button @click=${this.previousStep}>Previous</button>
                        <button @click=${this.nextStep}>Next</button>
                        </div>

                    </div>
                `;
    }

    handleStepClick(index: number) {
        this.activeIndex = index;
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
        }
    }

    nextStep() {
        if (this.currentStep <= this.steps.length ) {
            this.currentStep++;
        }
    }

    static styles = css`
    .progress-circle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        position: relative;
        background: transparent;    
        display: flex; 
        justify-content: center; 
        align-items: center;
    }

    .circle-content{
        display: flex; 
        justify-content: center; 
        align-items: center;
        border: 1px solid #6B7280;
        border-radius: 50%;
        color: #9CA3AF;
        width: 30px;
        height: 30px;
        font-size: 24px;
        font-weight: 500;
        // font-family: var(--font-family);
    }

    .step.active .circle-content{
        display: flex; 
        justify-content: center; 
        align-items: center;
        border: 1px solid transparent;
        border-radius: 50%;
        background-color: #32A9FF;
        color: white;
        width: 30px;
        height: 30px;
    }

    .step.finished .circle-content{
        display: flex; 
        justify-content: center; 
        align-items: center;
        border: 1px solid transparent;
        border-radius: 50%;
        background-color:  #F97316; 
        width: 30px;
        height: 30px;
    }

    .step.active .progress-circle .bar {
        fill: none;
        stroke: #32A9FF;
        stroke-width: 2;
        background: transparent;
        stroke-dasharray: calc(var(--progress-percent) / 100 * 100.48) 1000;
        // Todo: add ตำแหน่งของจุดเริ่ม stroke
        // stroke-dashoffset: -76;
    }

    .progress-circle .circle {
        width: 30px;
        height: 30px;
        fill: white;
        border: 1px solid #6B7280;
        border-radius: 50%;
        background-color: white;
    }

    .step.active .circle {
        border: 0px;
        background-color: #32A9FF;
        color: white;
    }
    
    .progress-circle .bar {
        fill: none;
        background: transparent;
    }

    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ssk-stepper": Stepper;
    }
}