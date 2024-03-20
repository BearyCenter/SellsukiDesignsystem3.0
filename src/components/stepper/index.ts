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
    this.percent = 60;  // Initialize here
    this.percent = this.percent * 3.6;
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
                    <div class="stepper">
                        <div class="steps">
                            ${this.steps.map((step, index) => html`
                                <div class="step ${index === this.currentStep ? 'active' : index < this.currentStep ? 'finished' : ''} " style="display: flex; gap: 5px;">
                                    <div class="container">
                                        <div class="circle-inprogress" style="--percent-deg:${this.percent}deg;">
                                            <div class="circle-outer">
                                            <div class="circle">
                                                ${index < this.currentStep ? html`<ssk-icon name="solid-check" themeColor="white"></ssk-icon>` : html`<div class="title">${step.title}</div>`}
                                            </div>
                                            </div>
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
                                </div>
                        `)}
                        </div>

                        <div class="actions">
                        <button @click=${this.previousStep}>Previous</button>
                        <button @click=${this.nextStep}>Next</button>
                        </div>
                    </div>
                `;

                // <div class="circle ${this.currentStep === 1 ? this.status = "error" : this.currentStep === 2 ? this.status = "finished" : this.status === "waiting" }" >
                //         <ssk-icon 
                //             size=${iconSize}
                //             id="myIcon" 
                //             color=${iconColor} 
                //             name=${iconName}/>
                //         </ssk-icon>
                //         <p class="label-status ${this.disabled? "disabled": ""}" > 
                //             ${this.labels}
                //         </p>
                //         ${this.currentStep}
                //     </div>



                    // <div class="stepper">
                    //     <div class="steps" style="display: flex;">
                    //         ${this.steps.map((step, index) => html`
                    //             <div class="step ${index === this.currentStep ? 'active' : index < this.currentStep ? 'finished' : ''}">
                    //                     <div class="circle">
                    //                         ${index < this.currentStep ? html`<ssk-icon name="solid-check" themeColor="white"></ssk-icon>` : html`<div class="title">${step.title}</div>`}
                    //                     </div>
                    //             </div>
                    //     `)}
                    //     </div>

                    //     <div class="actions">
                    //     <button @click=${this.previousStep}>Previous</button>
                    //     <button @click=${this.nextStep}>Next</button>
                    //     </div>
                    // </div>


                // <slot class="label" name="label-step-slot"></slot>

                // --------------- version that change to show with status ----------------
                // <div class="circle">
                //         <ssk-icon 
                //             size=${iconSize}
                //             id="myIcon" 
                //             color=${iconColor} 
                //             name=${iconName}/>
                //         </ssk-icon>
                //         <p class="label-status ${this.disabled? "disabled": ""}" > 
                //             ${this.labels}
                //         </p>
                //         ${this.currentStep}
                //     </div>

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
        .divider {
            width: 50%;
            border-top: 1px solid black;
            margin: 1rem auto;
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .circle {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 32px;
            height: 32px;
            border: 1px solid #6B7280;
            border-radius: 50%;
            background-color: white;
        }

        .step.active .circle-inprogress {
            width: 37px;
            height: 37px;
            display: flex;
            border-radius: 50%;
            background: conic-gradient(#32A9FF var(--percent-deg, 0deg), white 0deg);
            stroke: red;
            stroke-width: 20px;
            justify-content: center;
            align-items: center;
        }

        .step.active .circle-outer{
            width: 34px;
            height: 34px;
            display: flex;
            border-radius: 50%;
            background: white;
            justify-content: center;
            align-items: center;
        }

        .step.active .circle {
            border: 0px;
            background-color: #32A9FF;
            color: white;
        }

        .step.finished .circle {
            border: 0px;
            background-color:  #F97316; 
        }
        
        .label-status {
            color: var(--color);
            font-size: var(--font-size);
            font-family: var(--font-family);
            font-weight: var(--font-weight);
        }
        .label-status.disabled {
            display: none;
        }        
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ssk-stepper": Stepper;
    }
}